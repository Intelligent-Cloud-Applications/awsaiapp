"use client";
import React, { useContext, useState, useEffect } from 'react';
import Navbar from '../../Home/Navbar';
import Context from "../../../context/Context";
import { Button, Checkbox, Pagination, Table } from "flowbite-react";
import { FiSearch } from 'react-icons/fi';
import { FaFileExport, FaFileImport } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import { API } from 'aws-amplify';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import Swal from 'sweetalert2';
import UserModal from './UserModal';
import ButtonGroup from '../../../Common/DashboardNav/ButtonGroup';

function NewMemberList() {
  const [members, setMembers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndices, setSelectedIndices] = useState([]);
  const [selectedMember, setSelectedMember] = useState([]);
  const membersPerPage = 7;
  const { util } = useContext(Context);
  const [memberData, setMemberData] = useState([]);
  // const [isEditUser, setIsEditUser] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMemberDetails, setSelectedMemberDetails] = useState(null);


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await API.get("clients", `/user/list-members/happyprancer`);
      console.log(data)
      setMembers(data);
      setMemberData(data);
    } catch (error) {
      console.error('Error fetching the members:', error);
    }
  };

  function formatEpochToReadableDate(epochDate) {
    const date = isNaN(epochDate) ? new Date(parseFloat(epochDate)) : new Date(epochDate);
    if (!isNaN(date.getTime())) {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      return `${year}-${month}-${day}`;
    }
    return '';
  }

  const startIndex = (currentPage - 1) * membersPerPage;
  const filteredMembers = members.filter(member => {
    const matchesSearchQuery = (
      member.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.phoneNumber?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filter === 'All') return matchesSearchQuery;
    if (filter === 'Active') return member.status === 'Active' && matchesSearchQuery;
    return member.status !== 'Active' && matchesSearchQuery;
  });

  const selectedMembers = filteredMembers.slice(startIndex, startIndex + membersPerPage);
  const totalPages = Math.ceil(filteredMembers.length / membersPerPage);

  const handleDeleteMember = async (cognitoId) => {
    Swal.fire({
      title: "Delete User",
      text: "Are you sure you want to delete this user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        util.setLoader(true);

        const apiName = "clients";
        const path = "/user/delete-member";
        const myInit = {
          body: {
            institution: "happyprancer",
            cognitoId: cognitoId,
          },
        };

        try {
          await API.del(apiName, path, myInit);
          const updatedMemberData = memberData.filter(
            (member) => member.cognitoId !== cognitoId
          );
          setMemberData(updatedMemberData);
          setMembers(updatedMemberData); // Update members state
          Swal.fire({
            icon: "success",
            title: "User Deleted",
          });
        } catch (error) {
          console.error("Error deleting member:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "An error occurred while deleting the member.",
          });
        } finally {
          setSelectedIndices([])
          setSelectedMember([])
          fetchData();
          util.setLoader(false);
        }
      }
    });
  };

  const handleDeleteSelected = async () => {
    Swal.fire({
      title: "Delete Users",
      text: "Are you sure you want to delete the selected users?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        util.setLoader(true); // Show loader

        const apiName = "clients";
        const path = "/user/delete-members";

        try {
          // Delete each selected member
          for (const cognitoId of selectedMember) {
            const myInit = {
              body: {
                institution: "happyprancer",
                cognitoId: cognitoId,
              },
            };
            await API.del(apiName, path, myInit);
          }

          // Update member data and state
          const updatedMemberData = memberData.filter(
            (member) => !selectedMember.includes(member.cognitoId)
          );
          setMemberData(updatedMemberData);
          setMembers(updatedMemberData); // Update members state
          Swal.fire({
            icon: "success",
            title: "Users Deleted",
          });
        } catch (error) {
          console.error("Error deleting members:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "An error occurred while deleting the members.",
          });
        } finally {
          fetchData();
          util.setLoader(false);
        }
      }
    });
  };

  const handleCheckboxChange = (index) => {
    setSelectedIndices((prevSelected) => {
      const newSelected = prevSelected.includes(index)
        ? prevSelected.filter((i) => i !== index)
        : [...prevSelected, index];

      const newSelectedMembers = newSelected.map(i => selectedMembers[i]?.id);
      setSelectedMember(newSelectedMembers);

      return newSelected;
    });
  };

  const showIcons = (index) => {
    const isSelected = selectedIndices.includes(index);
    return (
      <div style={{ width: '24px' }}>
        {isSelected ? (
          <MdDeleteForever
            className="inline-block cursor-pointer text-red-600"
            size={20}
            onClick={() =>
              selectedIndices.length > 1
                ? handleDeleteSelected()
                : handleDeleteMember(selectedMembers[index].cognitoId)
            }
          />
        ) : (
          <MdDeleteForever
            className="inline-block"
            size={20}
            style={{ visibility: 'hidden' }}
          />
        )}
      </div>
    );
  };

  function handleExportCSV() {
    const instituteName = "happyprancer";
    const filteredData = members.filter((member) => {
      if (filter === 'All') return true;
      if (filter === 'Active') return member.status === 'Active';
      if (filter === 'Inactive') return member.status !== 'Active';
      return true;
    });

    const csvData = filteredData.map((member) => {
      const phoneNumber = member.phoneNumber ? parsePhoneNumberFromString(member.phoneNumber)?.formatInternational() : '';

      return {
        Name: member.userName,
        Email: member.emailId,
        Phone: phoneNumber,
        JoiningDate: formatEpochToReadableDate(member.joiningDate),
        Country: member.country,
        Attendance: member.zpoints || 0,
        Status: member.status,
        Due: member.balance,
        Product: member.product,
      };
    });

    const csvContent = [
      [
        "Name",
        "Email",
        "Phone",
        "Joining Date",
        "Country",
        "Attendance",
        "Status",
        "Due",
        "Product"
      ],
      ...csvData.map(member => [
        member.Name,
        member.Email,
        member.Phone,
        member.JoiningDate,
        member.Country,
        member.Attendance,
        member.Status,
        member.Due,
        member.Product
      ])
    ];

    const csvString = csvContent
      .map(e => e.join(","))
      .join("\n");

    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });

    // Constructing the file name
    const fileName = `${instituteName} Members List - ${filter} - ${filteredData.length}.csv`;

    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", fileName);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }


  const handleNameClick = (member) => {
    setSelectedMemberDetails(member);
    setIsModalOpen(true);
  };


  return (
    <div className="flex h-screen">
      {/* Left Banner */}
      <div className="w-1/6">
        {/* <LeftBanner /> */}
      </div>
      {/* Main Content */}
      <div className="w-5/6 bg-[#e6e4e4] p-4">
        <Navbar />
        <div className="mt-20">
          {/* Navigation buttons */}
          <ButtonGroup/>
          {/* Filtering Buttons */}
          <div className="mt-5">
            <div className="flex items-center justify-between bg-white h-12 px-5 rounded-t-md">
              {/* Left: Filter Buttons */}
              <div className="flex gap-4">
                <Button
                  onClick={() => setFilter('All')}
                  className={`flex items-center justify-center py-0 px-2 h-8 text-sm rounded-md ${filter === 'All' ? 'bg-[#30afbc] text-white' : 'bg-white border border-gray-200 text-gray-700'} hover:bg-[#30afbc] hover:text-white active:bg-[#30afbc]`}
                  style={{ minWidth: '70px' }}
                >
                  All ({members.length})
                </Button>
                <Button
                  onClick={() => setFilter('Active')}
                  className={`flex items-center justify-center py-0 px-2 h-8 text-sm rounded-md ${filter === 'Active' ? 'bg-[#30afbc] text-white' : 'bg-white border border-gray-200 text-gray-700'} hover:bg-[#30afbc] hover:text-white active:bg-[#30afbc]`}
                  style={{ minWidth: '70px' }}
                >
                  Active ({members.filter(m => m.status === 'Active').length})
                </Button>
                <Button
                  onClick={() => setFilter('Inactive')}
                  className={`flex items-center justify-center py-0 px-2 h-8 text-sm rounded-md ${filter === 'Inactive' ? 'bg-[#30afbc] text-white' : 'bg-white border border-gray-200 text-gray-700'} hover:bg-[#30afbc] hover:text-white active:bg-[#30afbc]`}
                  style={{ minWidth: '70px' }}
                >
                  Inactive ({members.filter(m => m.status !== 'Active').length})
                </Button>
              </div>
              {/* Center: Search Bar */}
              <form className="flex items-center mx-4 w-[30rem] border border-gray rounded-md">
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FiSearch className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" />
                  </div>
                  <input
                    type="search"
                    id="default-search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-md bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Quick search for anything"
                    required
                  />
                </div>
              </form>
              {/* Right: Import and Export Buttons */}
              <div className="flex items-center gap-4">
                <Button
                  // onClick={handleImportCSV}
                  className="flex items-center justify-center py-0 px-2 h-8 text-sm rounded-md bg-[#30afbc] text-white hover:bg-[#30afbc] hover:text-white active:bg-[#30afbc]"
                  style={{ minWidth: '70px' }}
                >
                  <FaFileImport className="mr-2 mt-[0.20rem]" />
                  Import CSV
                </Button>
                <Button
                  onClick={handleExportCSV}
                  className="flex items-center justify-center py-0 px-2 h-8 text-sm rounded-md bg-[#30afbc] text-white hover:bg-[#30afbc] hover:text-white active:bg-[#30afbc]"
                  style={{ minWidth: '70px' }}
                >
                  <FaFileExport className="mr-2 mt-[0.20rem]" />
                  Export CSV
                </Button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white max-w-full mx-auto rounded-b-md">
            <div className="overflow-x-auto">
              <Table hoverable className="min-w-full">
                <Table.Head>
                  <Table.HeadCell className="p-2">
                    {/* <Checkbox /> */}
                  </Table.HeadCell>
                  <Table.HeadCell className="px-6 py-2 text-center text-xs font-medium text-gray-500 uppercase">Name / Phone No / E-Mail</Table.HeadCell>
                  <Table.HeadCell className="px-6 py-2 text-center text-xs font-medium text-gray-500 uppercase">Joining Date</Table.HeadCell>
                  <Table.HeadCell className="px-6 py-2 text-center text-xs font-medium text-gray-500 uppercase">Country</Table.HeadCell>
                  <Table.HeadCell className="px-6 py-2 text-center text-xs font-medium text-gray-500 uppercase">Attendance</Table.HeadCell>
                  <Table.HeadCell className="px-6 py-2 text-center text-xs font-medium text-gray-500 uppercase">Status</Table.HeadCell>
                  <Table.HeadCell className="px-6 py-2 text-center text-xs font-medium text-gray-500 uppercase">Due</Table.HeadCell>
                  <Table.HeadCell className="px-6 py-2 text-center text-xs font-medium text-gray-500 uppercase">Product</Table.HeadCell>
                  <Table.HeadCell className="px-6 py-2 text-right text-xs font-medium text-gray-500 uppercase">
                  </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                  {selectedMembers.map((member, index) => (
                    <Table.Row
                      key={member.id}
                      className="hover:bg-gray-200 cursor-pointer"
                      onClick={() => handleNameClick(member)}
                    >
                      <Table.Cell
                        className="p-2 bg-white"
                        onClick={(e) => e.stopPropagation()} // Prevent row click when checkbox is clicked
                      >
                        <Checkbox
                          className='bg-gray-300 border border-gray-700'
                          id={`checkbox-${index}`}
                          checked={selectedIndices.includes(index)}
                          onChange={() => handleCheckboxChange(index)}
                        />
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap text-sm font-medium text-gray-900 hover:underline text-center bg-white">
                        {member.userName}
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap text-sm text-gray-500 text-center bg-white">
                        {member.joiningDate ? formatEpochToReadableDate(member.joiningDate) : ''}
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap text-sm text-gray-500 text-center bg-white">
                        {member.country}
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap text-sm text-gray-500 text-center bg-white">
                        {member.zpoints || 0}
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap text-sm text-gray-500 text-center bg-white">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${member.status === "Active" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"} `}
                        >
                          {member.status}
                        </span>
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap text-sm text-gray-500 text-center bg-white">
                        {member.balance}
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap text-sm text-gray-500 text-center bg-white">
                        {member.product}
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap text-sm text-gray-500 text-right bg-white" style={{ width: '24px' }}>
                        {showIcons(index)}
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>
            <div className="py-2 flex justify-between items-center px-4">
              {/* Dynamic "Showing X-Y of Z" */}
              <div className="text-sm text-gray-600">
                Showing {startIndex + 1}-{startIndex + selectedMembers.length} of {filteredMembers.length}
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                className="flex justify-end"
              />
            </div>
          </div>
        </div>
      </div>
      <UserModal
        member={selectedMemberDetails}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export default NewMemberList;
