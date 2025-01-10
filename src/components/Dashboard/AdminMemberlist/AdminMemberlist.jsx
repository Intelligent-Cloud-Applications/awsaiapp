import React, { useContext, useEffect, useState, useCallback, useRef } from 'react';
import Context from "../../../context/Context";
import { Table, Pagination, Button, Dropdown } from 'flowbite-react';
import { API } from 'aws-amplify';
import { FiSearch } from 'react-icons/fi';
import Swal from 'sweetalert2';

const AdminMemberlist = () => {
  const { util, userData } = useContext(Context);
  const utilRef = useRef(util);  // Reference to util to avoid infinite loading

  const [members, setMembers] = useState([]);
  const [memberData, setMemberData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(7); // Items per page
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All'); // New state for status filter
  const [updatingRole, setUpdatingRole] = useState(null);

  useEffect(() => {
    utilRef.current = util; // Keep util updated in the ref
  }, [util]);

  // Fetching data function
  const fetchData = useCallback(async (institution = 'awsaiapp') => {
    try {
      utilRef.current.setLoader(true);
      const memberResponse = await API.get('clients', `/user/list-members/${institution}`);
      
      // Filter and sort the data
      const filteredData = memberResponse
        .filter(member => member.userType === 'member' || member.userType === 'admin')
        .sort((a, b) => new Date(b.joiningDate) - new Date(a.joiningDate));

      const institutionResponse = await API.get('clients', '/admin/list-institution');
      
      // Process status counts
      const statusCount = institutionResponse.reduce((acc, item) => {
        const { createdBy, isDelivered, isFormFilled } = item;
        if (createdBy) {
          if (!acc[createdBy]) {
            acc[createdBy] = { delivered: 0, inprogress: 0 };
          }
          if (isDelivered) {
            acc[createdBy].delivered += 1;
          } else if (isFormFilled && !isDelivered) {
            acc[createdBy].inprogress += 1;
          }
        }
        return acc;
      }, {});

      // Update member data with status counts
      const updatedMembers = filteredData.map(member => {
        const { delivered = 0, inprogress = 0 } = statusCount[member.cognitoId] || {};
        return { ...member, delivered, inprogress };
      });

      // Update both states
      setMembers(updatedMembers);
      setMemberData(updatedMembers);
      
      // Apply current filter
      if (filterStatus !== 'All') {
        const filtered = updatedMembers.filter(member => 
          filterStatus === 'Active' 
            ? member.status === 'Active'
            : member.status !== 'Active'
        );
        setMemberData(filtered);
      }

    } catch (error) {
      console.error('Error fetching the members or institution data:', error);
    } finally {
      utilRef.current.setLoader(false);
    }
  }, [filterStatus]); // Add filterStatus as dependency

  useEffect(() => {
    fetchData();  // Call fetchData on component mount
  }, [fetchData]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  function formatEpochToReadableDate(epochDate) {
    const date = isNaN(epochDate) ? new Date(parseFloat(epochDate)) : new Date(epochDate);
    if (!isNaN(date.getTime())) {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      return `${day}-${month}-${year}`;
    }
    return '';
  }

  // Filter the member data based on the selected status
  const handleFilterStatus = (status) => {
    setFilterStatus(status);

    if (status === 'All') {
      setMemberData(members);
    } else if (status === 'Active') {
      const activeMembers = members.filter((member) => member.status === 'Active');
      setMemberData(activeMembers);
    } else if (status === 'Inactive') {
      // Show all members whose status is not 'Active'
      const inactiveMembers = members.filter((member) => member.status !== 'Active');
      setMemberData(inactiveMembers);
    }

    setCurrentPage(1); // Reset pagination to page 1 after filtering
  };


  const handleSearch = useCallback(() => {
    const filteredData = members.filter((member) =>
      member.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.emailId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.phoneNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setMemberData(filteredData);
    setCurrentPage(1);
  }, [members, searchQuery]);

  useEffect(() => {
    handleSearch();  // Call handleSearch whenever searchQuery changes
  }, [searchQuery, handleSearch]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMembers = memberData.slice(indexOfFirstItem, indexOfLastItem);

  // Custom theme for pagination
  const customTheme = {
    pages: {
      base: "xs:mt-0 mt-2 inline-flex items-center -space-x-px",
      showIcon: "inline-flex",
      previous: {
        base: "ml-0 rounded-l-md border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-[#30afbc] hover:text-white dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 hover:dark:bg-[#30afbc] hover:dark:text-white",
        icon: "h-5 w-5 text-gray-500 hover:text-white"
      },
      next: {
        base: "rounded-r-md border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-[#30afbc] hover:text-white dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 hover:dark:bg-[#30afbc] hover:dark:text-white",
        icon: "h-5 w-5 text-gray-500 hover:text-white"
      },
      selector: {
        base: "w-12 border border-gray-300 bg-white py-2 leading-tight text-gray-500 hover:bg-[#30afbc] hover:text-white dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 hover:dark:bg-[#30afbc] hover:dark:text-white",
        active: "bg-[#30afbc] text-white hover:bg-[#30afbc] hover:text-white",
        disabled: "cursor-not-allowed opacity-50"
      }
    }
  };

  // Define available roles based on user's role
  const getRoleOptions = (currentRole) => {
    // If current user is owner, they can assign any role
    if (userData.role === 'owner') {
      return ['sales', 'operation', 'owner'];
    }
    // If current user is operation, they can only assign sales role
    if (userData.role === 'operation') {
      return ['sales'];
    }
    // Return empty array if user doesn't have permission
    return [];
  };

  // Handle role change with confirmation
  const handleRoleChange = async (cognitoId, newRole) => {
    try {
      const result = await Swal.fire({
        title: 'Change Role',
        text: `Are you sure you want to change this user's role to ${newRole}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#30afbc',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, change it!'
      });

      if (result.isConfirmed) {
        setUpdatingRole(cognitoId);
        const apiName = "clients";
        const path = `/user/update-member/awsaiapp`;

        // Find the current member to preserve their data
        const currentMember = memberData.find(m => m.cognitoId === cognitoId);
        
        const myInit = {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          response: true, // Enable response handling
          body: {
            institution: 'awsaiapp',
            cognitoId: cognitoId,
            userName: currentMember.userName,
            emailId: currentMember.emailId,
            phoneNumber: currentMember.phoneNumber,
            country: currentMember.country || '',
            balance: currentMember.balance || '',
            status: currentMember.status,
            role: newRole
          },
        };

        try {
          const response = await API.put(apiName, path, myInit);
          
          if (response && response.Attributes) {
            const updatedMembers = members.map(member => 
              member.cognitoId === cognitoId 
                ? { ...member, role: newRole }
                : member
            );
            setMembers(updatedMembers);
            setMemberData(updatedMembers);

            Swal.fire({
              icon: 'success',
              title: 'Updated!',
              text: 'User role has been updated.',
              didClose: () => {
                fetchData(); 
              }
            });
          }
        } catch (error) {
          let errorMessage = 'Failed to update user role.';
          if (error.response) {
            errorMessage = error.response.data?.error || errorMessage;
          }
          console.error('Error updating role:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: errorMessage,
          });
        }
      }
    } catch (error) {
      console.error('Error in role update process:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'An unexpected error occurred.',
      });
    } finally {
      setUpdatingRole(null);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center mt-[-4rem] mx-[4rem] max1300:mt-[-16px] shadow-xl rounded-[0] bg-[#e6e4e4] lg:ml-[9%]">
      {/* Table container with reduced width */}
      <div className="w-full max-w-6xl shadow-lg rounded-md overflow-hidden bg-white">
        <div className="flex justify-between items-center p-4">
          {/* Filter buttons */}
          <div className="flex gap-4">
            <Button
              onClick={() => handleFilterStatus('All')}
              className={`flex items-center justify-center py-0 px-2 h-8 text-sm rounded-md ${filterStatus === 'All' ? 'bg-[#30afbc] text-white' : 'bg-white border border-gray-200 text-gray-700'} hover:bg-[#30afbc] hover:text-white active:bg-[#30afbc]`}
              style={{ minWidth: '70px' }}
            >
              All ({members.length})
            </Button>
            <Button
              onClick={() => handleFilterStatus('Active')}
              className={`flex items-center justify-center py-0 px-2 h-8 text-sm rounded-md ${filterStatus === 'Active' ? 'bg-[#30afbc] text-white' : 'bg-white border border-gray-200 text-gray-700'} hover:bg-[#30afbc] hover:text-white active:bg-[#30afbc]`}
              style={{ minWidth: '70px' }}
            >
              Active ({members.filter(m => m.status === 'Active').length})
            </Button>
            <Button
              onClick={() => handleFilterStatus('Inactive')}
              className={`flex items-center justify-center py-0 px-2 h-8 text-sm rounded-md ${filterStatus === 'Inactive' ? 'bg-[#30afbc] text-white' : 'bg-white border border-gray-200 text-gray-700'} hover:bg-[#30afbc] hover:text-white active:bg-[#30afbc]`}
              style={{ minWidth: '70px' }}
            >
              Inactive ({members.filter(m => m.status !== 'Active').length})
            </Button>
          </div>
          {/* Search bar */}
          <form className="flex items-center w-[30rem] border border-gray rounded-md">
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
                placeholder="Quick search Members"
                required
              />
            </div>
          </form>
        </div>
        <Table striped>
          <Table.Head className="border-t border-b border-gray rounded-none">
            <Table.HeadCell className="px-6 py-2 text-center text-xs font-medium text-black uppercase" style={{ borderRadius: 0 }}>
              Name
            </Table.HeadCell>
            <Table.HeadCell className="px-6 py-2 text-center text-xs font-medium text-black uppercase rounded-none">
              Email Address
            </Table.HeadCell>
            <Table.HeadCell className="px-6 py-2 text-center text-xs font-medium text-black uppercase rounded-none">
              Phone Number
            </Table.HeadCell>
            <Table.HeadCell className="px-6 py-2 text-center text-xs font-medium text-black uppercase rounded-none">
              Role
            </Table.HeadCell>
            <Table.HeadCell className="px-6 py-2 text-center text-xs font-medium text-black uppercase rounded-none">
              Date of Joining
            </Table.HeadCell>
            <Table.HeadCell className="px-6 py-2 text-center text-xs font-medium text-black uppercase rounded-none">
              Status
            </Table.HeadCell>
            <Table.HeadCell className="px-6 py-2 text-center text-xs font-medium text-black uppercase rounded-none">
              Delivered
            </Table.HeadCell>
            <Table.HeadCell className="px-6 py-2 text-center text-xs font-medium text-black uppercase rounded-none">
              In Progress
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {currentMembers.map((member) => (
              <Table.Row key={member.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap text-sm font-medium text-gray-900 hover:underline text-center bg-white">
                  {member.userName}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap text-sm text-gray-500 text-center bg-white">{member.emailId}</Table.Cell>
                <Table.Cell className="whitespace-nowrap text-sm text-gray-500 text-center bg-white">{member.phoneNumber}</Table.Cell>
                <Table.Cell className="whitespace-nowrap text-sm text-gray-500 text-center bg-white">
                  {getRoleOptions(member.role).length > 0 ? (
                    <Dropdown
                      label={
                        <span className="px-2 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md border border-gray-300">
                          {member.role || 'Set Role'} 
                          {updatingRole === member.cognitoId && '...'}
                        </span>
                      }
                      dismissOnClick={true}
                      disabled={updatingRole === member.cognitoId}
                      inline={true}
                    >
                      {getRoleOptions(member.role).map((role) => (
                        <Dropdown.Item 
                          key={role}
                          onClick={() => handleRoleChange(member.cognitoId, role)}
                          className={`${member.role === role ? 'bg-gray-100' : ''} 
                            ${role === 'owner' ? 'text-blue-600' : 
                              role === 'operation' ? 'text-green-600' : 
                              role === 'sales' ? 'text-orange-600' : 'text-gray-600'}`}
                        >
                          {role.charAt(0).toUpperCase() + role.slice(1)}
                        </Dropdown.Item>
                      ))}
                    </Dropdown>
                  ) : (
                    <span className="px-2 py-1 text-sm text-gray-500">
                      {member.role || 'No Role'}
                    </span>
                  )}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap text-sm text-gray-500 text-center bg-white">{member.joiningDate ? formatEpochToReadableDate(member.joiningDate) : ''}</Table.Cell>
                <Table.Cell className="whitespace-nowrap text-sm text-gray-500 text-center bg-white"><span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${member.status === "Active" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"} `}
                >
                  {member.status}
                </span></Table.Cell>
                <Table.Cell className="whitespace-nowrap text-sm text-gray-500 text-center bg-white">{member.delivered}</Table.Cell>
                <Table.Cell className="whitespace-nowrap text-sm text-gray-500 text-center bg-white">{member.inprogress}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-3 bg-gray-50">
          <span className="text-sm text-gray-700">
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, memberData.length)} of {memberData.length} results
          </span>
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(memberData.length / itemsPerPage)}
            onPageChange={handlePageChange}
            theme={customTheme}
          />
        </div>
      </div>

    </div>
  );
};

export default AdminMemberlist;