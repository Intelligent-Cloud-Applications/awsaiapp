"use client";
import React, { useContext, useState, useEffect, useRef } from "react";
import Context from "../../../context/Context";
import { Button, Pagination, Table } from "flowbite-react";
import { FiSearch } from "react-icons/fi";
import { FaFileExport, FaFileImport } from "react-icons/fa";
// import { MdDeleteForever } from 'react-icons/md';
import { API } from "aws-amplify";
import Swal from "sweetalert2";
import UserModal from "./UserModal";
import { CSVUpload } from "../../UploadFile/CSVUpload";
import { handleExportExcel } from "../../UploadFile/DownloadCsvButton";
import "./MembersList.css"

function NewMemberList({ tempInstitution }) {
  const [members, setMembers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isResponsive, setIsResponsive] = useState(false);
  // const [selectedIndices, setSelectedIndices] = useState([]);
  // eslint-disable-next-line no-unused-vars
  // const [selectedMember, setSelectedMember] = useState([]);
  const membersPerPage = 7;
  const { util, user, userData } = useContext(Context);
  // eslint-disable-next-line no-unused-vars
  const [memberData, setMemberData] = useState([]);
  const [isEditUser, setIsEditUser] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMemberDetails, setSelectedMemberDetails] = useState(null);
  const [isLoader, setisLoader] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const Ctx = useContext(Context);
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      setIsResponsive(window.innerWidth < 1030);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    let institution;
    if (user.profile.tempinstitutionName === "awsaiapp") {
      institution = userData.tempinstitutionName;
    } else {
      institution = userData.tempinstitutionName || tempInstitution;
    }
    const fetchData = async (institution) => {
      try {
        if (isLoader === false) {
          util.setLoader(true);
          setisLoader(true);
        }
        const data = await API.get(
          "clients",
          `/user/list-members/${institution}`
        );
        const filteredData = data.filter(
          (member) => member.userType === "member"
        );
        console.log(filteredData);
        setMembers(filteredData);
        setMemberData(filteredData);
      } catch (error) {
        console.error("Error fetching the members:", error);
      }

      util.setLoader(false);
    };

    fetchData(institution); // Pass institution to fetchData
  }, [
    userData,
    tempInstitution,
    user.profile.tempinstitutionName,
    util,
    isLoader,
  ]);

  const fetchData = async (institution) => {
    try {
      util.setLoader(true);
      const data = await API.get(
        "clients",
        `/user/list-members/${institution}`
      );
      const filteredData = data.filter(
        (member) => member.userType === "member"
      );
      console.log(filteredData);
      setMembers(filteredData); // Update members state
      setMemberData(filteredData); // Update memberData state
    } catch (error) {
      console.error("Error fetching the members:", error);
    } finally {
      util.setLoader(false);
    }
  };

  const handleUpdateUser = async (formData) => {
    let institution =
      user.profile.institutionName === "awsaiapp"
        ? userData.institutionName
        : userData.institutionName || tempInstitution;

    util.setLoader(true);

    const apiName = "clients";
    const path = `/user/update-member/awsaiapp`;
    const myInit = {
      body: {
        cognitoId: formData.cognitoId,
        institution: formData.institution,
        userName: formData.userName,
        emailId: formData.emailId,
        phoneNumber: formData.phoneNumber,
        country: formData.country,
        zpoints: formData.zpoints,
        zPoints: formData.zPoints,
        status: formData.status,
        balance: formData.balance,
        product: formData.product,
        joiningDate: new Date(formData.joiningDate).getTime(),
      },
    };

    try {
      // Update the user via API
      await API.put(apiName, path, myInit);

      // Display success alert
      Swal.fire({
        icon: "success",
        title: "User Updated",
      });

      // Fetch and update the member list
      await fetchData(institution); // Refresh the data

      // Close modal and reset states
      setIsEditUser(false);
      setSelectedMemberDetails(null);
      setIsModalOpen(false);
    } catch (e) {
      console.error("Error in updating user:", e);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while updating the user.",
      });
    } finally {
      util.setLoader(false);
    }
  };

  function formatEpochToReadableDate(epochDate) {
    const date = isNaN(epochDate)
      ? new Date(parseFloat(epochDate))
      : new Date(epochDate);
    if (!isNaN(date.getTime())) {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      return `${day}-${month}-${year}`;
    }
    return "";
  }

  const startIndex = (currentPage - 1) * membersPerPage;
  useEffect(() => {
    setCurrentPage(1); // Reset to the first page when search query or filter changes
  }, [searchQuery, filter]);

  const filteredMembers = members.filter((member) => {
    const matchesSearchQuery =
      member.userName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.phoneNumber?.toLowerCase().includes(searchQuery.toLowerCase());

    if (filter === "All") return matchesSearchQuery;
    if (filter === "Active")
      return member.status === "Active" && matchesSearchQuery;
    return member.status !== "Active" && matchesSearchQuery;
  });

  const selectedMembers = filteredMembers.slice(
    startIndex,
    startIndex + membersPerPage
  );
  const totalPages = Math.ceil(filteredMembers.length / membersPerPage);

  const handleDeleteMember = async (institutionToDelete) => {
    let institution = institutionToDelete.institution;

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
            institution: institution,
            cognitoId: institutionToDelete.cognitoId,
          },
        };

        try {
          // Call the delete API
          await API.del(apiName, path, myInit);

          // Display success notification
          Swal.fire({
            icon: "success",
            title: "User Deleted",
          });

          // Fetch updated member list after deletion
          await fetchData(institution);

          // Reset modal and selection states
          // setSelectedIndices([]);
          // setSelectedMember([]);
          setIsModalOpen(false);
        } catch (error) {
          console.error("Error deleting member:", error);

          // Display error notification
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "An error occurred while deleting the member.",
          });
        } finally {
          util.setLoader(false);
        }
      }
    });
  };

  // const handleDeleteSelected = async () => {
  //   let institution;
  //   if (user.profile.institutionName === "awsaiapp") {
  //     institution = userData.institutionName;
  //   } else {
  //     institution = userData.institutionName || tempInstitution;
  //   }
  //   Swal.fire({
  //     title: "Delete Users",
  //     text: "Are you sure you want to delete the selected users?",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonText: "Delete",
  //     cancelButtonText: "Cancel",
  //   }).then(async (result) => {
  //     if (result.isConfirmed) {
  //       setIsModalOpen(false);
  //       util.setLoader(true);
  //       const apiName = "clients";
  //       const path = "/user/delete-members";
  //       try {
  //         // Delete each selected member
  //         for (const cognitoId of selectedMember) {
  //           const myInit = {
  //             body: {
  //               institution: institution,
  //               cognitoId: cognitoId,
  //             },
  //           };
  //           await API.del(apiName, path, myInit);
  //         }

  //         // Update member data and state
  //         const updatedMemberData = memberData.filter(
  //           (member) => !selectedMember.includes(member.cognitoId)
  //         );
  //         setMemberData(updatedMemberData);
  //         setMembers(updatedMemberData); // Update members state
  //         Swal.fire({
  //           icon: "success",
  //           title: "Users Deleted",
  //         });
  //       } catch (error) {
  //         console.error("Error deleting members:", error);
  //         Swal.fire({
  //           icon: "error",
  //           title: "Error",
  //           text: "An error occurred while deleting the members.",
  //         });
  //       } finally {
  //         fetchData(institution);
  //         util.setLoader(false);
  //       }
  //     }
  //   });
  // };

  // const handleCheckboxChange = (index) => {
  //   setSelectedIndices((prevSelected) => {
  //     const newSelected = prevSelected.includes(index)
  //       ? prevSelected.filter((i) => i !== index)
  //       : [...prevSelected, index];

  //     const newSelectedMembers = newSelected.map(i => selectedMembers[i]?.id);
  //     setSelectedMember(newSelectedMembers);

  //     return newSelected;
  //   });
  // };

  // const showIcons = (index) => {
  //   const isSelected = selectedIndices.includes(index);
  //   return (
  //     <div style={{ width: '24px' }}>
  //       {isSelected ? (
  //         <MdDeleteForever
  //           className="inline-block cursor-pointer text-red-600"
  //           size={20}
  //           onClick={() =>
  //             // selectedIndices.length > 1
  //             //   ? handleDeleteSelected():
  //               handleDeleteMember(selectedMembers[index].cognitoId)
  //           }
  //         />
  //       ) : (
  //         <MdDeleteForever
  //           className="inline-block"
  //           size={20}
  //           style={{ visibility: 'hidden' }}
  //         />
  //       )}
  //     </div>
  //   );
  // };

  const handleNameClick = (member) => {
    setSelectedMemberDetails(member);
    setIsModalOpen(true);
  };

  //upload csv
  const fileInputRef = useRef(null);
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    } else {
      console.error("File input ref is not attached.");
    }
  };

  const handleCSVFile = async (e) => {
    const file = e.target.files[0];
    let institution;
    if (user.profile.institutionName === "awsaiapp") {
      institution = userData.institutionName;
    } else {
      institution = userData.institutionName || tempInstitution;
    }

    fetchData(institution); // Pass institution to fetchData
    if (file) {
      try {
        util.setLoader(true); // Set loader to true before uploading
        const isProd = process.env.REACT_APP_STAGE === "PROD";
        const fileNameForBucket = isProd
          ? "member-creation-with-cognito-id-and-default-password"
          : "institution-utils";
        await CSVUpload(file, institution, fileNameForBucket); // Await CSV upload
      } catch (error) {
        console.error("Error uploading file:", error);
      } finally {
        util.setLoader(false); // Set loader to false after uploading, whether success or failure
      }
    } else {
      console.error("No file selected.");
    }
  };

  // Utility function to censor email
  const censorEmail = (email) => {
    const [name, domain] = email.split("@");
    const censoredName = name.slice(0, 3) + "xxxxxx";
    return `${censoredName}@${domain}`;
  };

  // Utility function to censor phone number
  const censorPhoneNumber = (phone) => {
    if (!phone) return "Phone Number Not Available";

    // Identify the length of the country code (usually 1-3 digits)
    const countryCodeMatch = phone.match(/^\+\d{1,3}/);
    if (!countryCodeMatch) return "Invalid Phone Number";

    const countryCode = countryCodeMatch[0];
    const numberWithoutCountryCode = phone.slice(countryCode.length);

    if (numberWithoutCountryCode.length < 3) {
      return "Invalid Phone Number";
    }

    const visibleStart = numberWithoutCountryCode.slice(0, 2);
    const visibleEnd = numberWithoutCountryCode.slice(-1);
    const censoredMiddle = "x".repeat(numberWithoutCountryCode.length - 3);

    return `${countryCode}${visibleStart}${censoredMiddle}${visibleEnd}`;
  };
  //custom theme for pagination
  const customTheme = {
    pages: {
      base: "xs:mt-0 mt-2 inline-flex items-center -space-x-px",
      showIcon: "inline-flex",
      previous: {
        base: "ml-0 rounded-l-md border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-[#30afbc] hover:text-white dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 hover:dark:bg-[#30afbc] hover:dark:text-white",
        icon: "h-5 w-5 text-gray-500 hover:text-white",
      },
      next: {
        base: "rounded-r-md border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-[#30afbc] hover:text-white dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 hover:dark:bg-[#30afbc] hover:dark:text-white",
        icon: "h-5 w-5 text-gray-500 hover:text-white",
      },
      selector: {
        base: "w-12 border border-gray-300 bg-white py-2 leading-tight text-gray-500 hover:bg-[#30afbc] hover:text-white dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 hover:dark:bg-[#30afbc] hover:dark:text-white",
        active: "bg-[#30afbc] text-white hover:bg-[#30afbc] hover:text-white",
        disabled: "cursor-not-allowed opacity-50",
      },
    },
  };

  return (
    <>
      {screenWidth > 1023 ? (
        <div className="wholeTable">
          <div className="mx-[6.8%] flex items-center justify-between bg-white px-5 rounded-t-md [@media(max-width:1260px)]:flex-col">
            {/* Left: Filter Buttons */}
            <div className="flex gap-4 py-4">
              <Button
                onClick={() => setFilter("All")}
                className={`flex items-center justify-center py-0 px-2 h-[3rem] text-sm rounded-md ${filter === "All"
                  ? "bg-[#30afbc] text-white"
                  : "bg-white border border-gray-200 text-gray-700"
                  } hover:bg-[#30afbc] hover:text-white active:bg-[#30afbc]`}
                style={{ minWidth: "80px" }}
              >
                All ({members.length})
              </Button>
              <Button
                onClick={() => setFilter("Active")}
                className={`flex items-center justify-center py-0 px-2 h-[3rem] text-sm rounded-md ${filter === "Active"
                  ? "bg-[#30afbc] text-white"
                  : "bg-white border border-gray-200 text-gray-700"
                  } hover:bg-[#30afbc] hover:text-white active:bg-[#30afbc]`}
                style={{ minWidth: "70px" }}
              >
                Active ({members.filter((m) => m.status === "Active").length})
              </Button>
              <Button
                onClick={() => setFilter("Inactive")}
                className={`flex items-center justify-center py-0 px-2 h-[3rem] text-sm rounded-md ${filter === "Inactive"
                  ? "bg-[#30afbc] text-white"
                  : "bg-white border border-gray-200 text-gray-700"
                  } hover:bg-[#30afbc] hover:text-white active:bg-[#30afbc]`}
                style={{ minWidth: "70px" }}
              >
                Inactive (
                {members.filter((m) => m.status !== "Active").length})
              </Button>
            </div>
            {/* Center: Search Bar */}
            <form className="flex items-center mx-4 w-[30rem] border border-gray rounded-md">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FiSearch
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <input
                  type="search"
                  id="default-search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-md bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Quick search Members"
                  required
                />
              </div>
            </form>
            {/* Right: Import and Export Buttons */}
            <div className="flex items-center gap-4 [@media(max-width:1260px)]:my-2">
              <Button
                onClick={handleButtonClick}
                className="flex items-center justify-center py-0 px-2 h-[3rem] text-sm rounded-md bg-[#30afbc] text-white hover:bg-[#30afbc] hover:text-white active:bg-[#30afbc]"
                style={{ minWidth: "70px" }}
              >
                <FaFileImport className="mr-2 mt-[0.20rem]" />
                Upload CSV
                <input
                  type="file"
                  accept=".csv, .xls, .xlsx"
                  onChange={handleCSVFile}
                  className="hidden"
                  ref={fileInputRef}
                  id="CSVFileInput"
                />
              </Button>
              <Button
                onClick={() =>
                  handleExportExcel(
                    user,
                    userData,
                    tempInstitution,
                    members,
                    filter
                  )
                }
                className="flex items-center justify-center py-0 px-2 h-[3rem] text-sm rounded-md bg-[#30afbc] text-white hover:bg-[#30afbc] hover:text-white active:bg-[#30afbc]"
                style={{ minWidth: "70px" }}
              >
                <FaFileExport className="mr-2 mt-[0.20rem]" />
                Export CSV
              </Button>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white mx-auto rounded-b-md table">
            <div className={`overflow-x-auto w-full mb-4 max-h-[600px] md:max-h-[600px] overflow-y-auto ${isResponsive ? "px-2" : ""
              }`}>
              <Table hoverable className="w-full text-sm text-left text-gray-500">
                <Table.Head>
                  {/* <Table.HeadCell className="p-2">
              </Table.HeadCell> */}
                  <Table.HeadCell className="px-6 py-2 text-center text-xs font-medium text-gray-500 uppercase">
                    Name
                  </Table.HeadCell>
                  <Table.HeadCell className="px-6 py-2 text-center text-xs font-medium text-gray-500 uppercase">
                    Email
                  </Table.HeadCell>
                  <Table.HeadCell className="px-6 py-2 text-center text-xs font-medium text-gray-500 uppercase">
                    Phone Number
                  </Table.HeadCell>
                  <Table.HeadCell className="px-6 py-2 text-center text-xs font-medium text-gray-500 uppercase">
                    Joining Date
                  </Table.HeadCell>
                  <Table.HeadCell className="px-6 py-2 text-center text-xs font-medium text-gray-500 uppercase">
                    Status
                  </Table.HeadCell>
                  <Table.HeadCell className="px-6 py-2 text-center text-xs font-medium text-gray-500 uppercase">
                    Due
                  </Table.HeadCell>
                  <Table.HeadCell className="px-6 py-2 text-center text-xs font-medium text-gray-500 uppercase">
                    Product
                  </Table.HeadCell>
                  {/* <Table.HeadCell className="px-6 py-2 text-right text-xs font-medium text-gray-500 uppercase">
              </Table.HeadCell> */}
                </Table.Head>
                <Table.Body className="divide-y">
                  {selectedMembers.map((member, index) => (
                    <Table.Row
                      key={member.id}
                      className="hover:bg-gray-200 cursor-pointer"
                      onClick={() => handleNameClick(member)}
                    >
                      {/* <Table.Cell
                    className="p-2 bg-white"
                    onClick={(e) => e.stopPropagation()} // Prevent row click when checkbox is clicked
                  >
                    <Checkbox
                      className='bg-gray-300 border border-gray-700'
                      id={`checkbox-${index}`}
                      checked={selectedIndices.includes(index)}
                      onChange={() => handleCheckboxChange(index)}
                    />
                  </Table.Cell> */}
                      <Table.Cell className="whitespace-nowrap text-sm font-medium text-gray-900 hover:underline text-center bg-white">
                        {member.userName}
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap text-sm text-gray-500 text-center bg-white">
                        {member.emailId ? Ctx.userData.role === "operation" ? censorEmail(member.emailId) : member.emailId : "None"}
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap text-sm text-gray-500 text-center bg-white">
                        {member.phoneNumber
                          ? Ctx.userData.role === "operation" ? censorPhoneNumber(member.phoneNumber) : member.phoneNumber
                          : "None"}
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap text-sm text-gray-500 text-center bg-white">
                        {member.joiningDate
                          ? formatEpochToReadableDate(member.joiningDate)
                          : ""}
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap text-sm text-gray-500 text-center bg-white">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${member.status === "Active"
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                            } `}
                        >
                          {member.status}
                        </span>
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap text-sm text-gray-500 text-center bg-white">
                        {member.balance || "0"}
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap text-sm text-gray-500 text-center bg-white">
                        {member.product}
                      </Table.Cell>
                      {/* <Table.Cell className="whitespace-nowrap text-sm text-gray-500 text-right bg-white"
                    style={{ width: '24px' }}
                    onClick={(e) => e.stopPropagation()}>
                    {showIcons(index)}
                  </Table.Cell> */}
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>
            <div className="py-2 flex justify-between items-center px-4">
              {/* Dynamic "Showing X-Y of Z" */}
              <div className="text-sm text-gray-600">
                Showing{" "}
                <strong>
                  {startIndex + 1}-{startIndex + selectedMembers.length}
                </strong>{" "}
                of <strong>{filteredMembers.length}</strong>
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                className="flex justify-end"

                theme={customTheme}
              />
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="mt-5 px-4">
            <div className="flex flex-wrap items-center gap-4 mt-4 md:mt-0 buttonTop">
              <Button
                onClick={handleButtonClick}
                className="flex items-center justify-center py-1 px-3 h-10 text-sm rounded-md bg-[#30afbc] text-white hover:bg-[#30afbc] hover:text-white active:bg-[#30afbc] w-full sm:w-auto"
              >
                <FaFileImport className="mr-2 mt-[0.20rem]" />
                Upload CSV
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleCSVFile}
                  className="hidden"
                  ref={fileInputRef}
                  id="CSVFileInput"
                />
              </Button>
              <Button
                onClick={() =>
                  handleExportExcel(
                    user,
                    userData,
                    tempInstitution,
                    members,
                    filter
                  )
                }
                className="flex items-center justify-center py-1 px-3 h-10 text-sm rounded-md bg-[#30afbc] text-white hover:bg-[#30afbc] hover:text-white active:bg-[#30afbc] w-full sm:w-auto"
              >
                <FaFileExport className="mr-2 mt-[0.20rem]" />
                Export CSV
              </Button>
            </div>
            <div className="flex flex-col gap-3">
              <form className="flex items-center border border-gray rounded-md">
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FiSearch
                      className="w-5 h-5 text-gray-500"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    type="search"
                    id="small-screen-search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-md"
                    placeholder="Quick search Members"
                  />
                </div>
              </form>

              <div className="flex gap-2 justify-around buttonTop">
                {["All", "Active", "Inactive"].map((status) => (
                  <Button
                    key={status}
                    onClick={() => setFilter(status)}
                    className={`flex items-center justify-center py-1 px-2 text-xs rounded-md ${filter === status
                      ? "bg-[#30afbc] text-white"
                      : "bg-white border border-gray-200 text-gray-700"
                      }`}
                  >
                    {status} (
                    {status === "All"
                      ? members.length
                      : members.filter((m) => m.status === status).length}
                    )
                  </Button>
                ))}
              </div>
            </div>

            <div className="bg-white max-w-full mx-auto rounded-md p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {selectedMembers.map((member) => (
                  <div
                    key={member.id}
                    className="border rounded-lg shadow-md p-4 hover:shadow-lg transition cursor-pointer"
                    onClick={() => handleNameClick(member)}
                  >
                    <div className="flex flex-col gap-2">

                      <div className="text-lg font-semibold text-gray-800 text-center hover:underline">
                        {member.userName}
                      </div>


                      <div className="text-sm text-gray-600">
                        <strong>Email:</strong>{" "}
                        {member.emailId ? Ctx.userData.role === "operation" ? censorEmail(member.emailId) : member.emailId : "None"}
                      </div>

                      <div className="text-sm text-gray-600">
                        <strong>Phone:</strong>{" "}
                        {member.phoneNumber
                          ? Ctx.userData.role === "operation" ? censorPhoneNumber(member.phoneNumber) : member.phoneNumber
                          : "None"}
                      </div>


                      <div className="text-sm text-gray-600">
                        <strong>Joining Date:</strong>{" "}
                        {member.joiningDate
                          ? formatEpochToReadableDate(member.joiningDate)
                          : "N/A"}
                      </div>

                      <div className="text-sm">
                        <strong>Status:</strong>{" "}
                        <span
                          className={`px-2 py-1 inline-block text-xs font-medium rounded-full ${member.status === "Active"
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                            }`}
                        >
                          {member.status}
                        </span>
                      </div>

                      <div className="text-sm text-gray-600">
                        <strong>Due:</strong> {member.balance || "0"}
                      </div>

                      <div className="text-sm text-gray-600">
                        <strong>Product:</strong> {member.product || "N/A"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>


            <div className="flex justify-between items-center mt-4 max600:mb-[7rem]">
              <span className="text-sm text-gray-600">
                Page <strong>{currentPage}</strong> of{" "}
                <strong>{totalPages}</strong>
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    currentPage > 1 && setCurrentPage(currentPage - 1)
                  }
                  disabled={currentPage === 1}
                  className={`px-2 py-1 text-xs font-medium rounded ${currentPage === 1
                    ? "bg-gray-200 text-gray-500"
                    : "bg-[#30afbc] text-white hover:bg-[#28a2ab]"
                    }`}
                >
                  Previous
                </button>
                <button
                  onClick={() =>
                    currentPage < totalPages && setCurrentPage(currentPage + 1)
                  }
                  disabled={currentPage === totalPages}
                  className={`px-2 py-1 text-xs font-medium rounded ${currentPage === totalPages
                    ? "bg-gray-200 text-gray-500"
                    : "bg-[#30afbc] text-white hover:bg-[#28a2ab]"
                    }`}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      <UserModal
        member={selectedMemberDetails}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isEditUser={isEditUser}
        onSave={handleUpdateUser}
        handleDeleteMember={() => handleDeleteMember(selectedMemberDetails)}
      />
    </>
  );
}

export default NewMemberList;
