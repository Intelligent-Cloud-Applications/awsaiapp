import React, { useContext, useCallback, useState, useRef, useEffect } from 'react';
import Context from "../../../context/Context";
import { Table, Button, TextInput, Dropdown } from 'flowbite-react';
import { API } from 'aws-amplify';
import { FiSearch, FiFilter, FiChevronDown, FiChevronUp, FiUsers, FiCheckCircle, FiClock, FiTrendingUp, FiCheck, FiMail, FiPhone, FiShield } from 'react-icons/fi';
import Swal from 'sweetalert2';

const formatEpochToReadableDate = (epochDate) => {
  const date = isNaN(epochDate) ? new Date(parseFloat(epochDate)) : new Date(epochDate);
  if (!isNaN(date.getTime())) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  return '';
};

const AdminMemberlist = () => {
  const { util, userData } = useContext(Context);
  const utilRef = useRef(util);

  // State management
  const [members, setMembers] = useState([]);
  const [memberData, setMemberData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(7);
  const [searchQuery, setSearchQuery] = useState('');
  const [updatingRole, setUpdatingRole] = useState(null);
  const [sortField, setSortField] = useState('userName');
  const [sortDirection, setSortDirection] = useState('asc');
  const [searchField, setSearchField] = useState('name');
  const [activeSort, setActiveSort] = useState(null);
  const dropdownRef = useRef(null);
  const [columnWidths, setColumnWidths] = useState({
    userName: 200,
    emailId: 250,
    phoneNumber: 150,
    role: 120,
    joiningDate: 150,
    status: 100,
    delivered: 100,
    inprogress: 100
  });
  const [resizing, setResizing] = useState(null);

  // Keep util reference updated
  useEffect(() => {
    utilRef.current = util;
  }, [util]);

  // Data fetching function
  const fetchData = useCallback(async (institution = 'awsaiapp') => {
    try {
      utilRef.current.setLoader(true);
      const memberResponse = await API.get('clients', `/user/list-members/${institution}`);
      
      const filteredData = memberResponse
        .filter(member => member.userType === 'member' || member.userType === 'admin')
        .sort((a, b) => new Date(b.joiningDate) - new Date(a.joiningDate));

      const institutionResponse = await API.get('clients', '/admin/list-institution');
      
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

      const updatedMembers = filteredData.map(member => {
        const { delivered = 0, inprogress = 0 } = statusCount[member.cognitoId] || {};
        return { ...member, delivered, inprogress };
      });

      setMembers(updatedMembers);
      setMemberData(updatedMembers);
    } catch (error) {
      console.error('Error fetching data:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to fetch member data',
      });
    } finally {
      utilRef.current.setLoader(false);
    }
  }, []);

  // Get role options based on user role
  const getRoleOptions = useCallback((currentRole) => {
    if (userData.role === 'owner') {
      return ['sales', 'operation', 'owner'].filter(role => role !== currentRole);
    }
    if (userData.role === 'operation') {
      return ['sales'].filter(role => role !== currentRole);
    }
    return [];
  }, [userData.role]);

  // Handle role change
  const handleRoleChange = useCallback(async (cognitoId, newRole, currentMember) => {
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

        const myInit = {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
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

        await API.put(apiName, path, myInit);

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
      console.error('Error updating role:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: error.response?.data?.error || 'Failed to update user role.',
      });
    } finally {
      setUpdatingRole(null);
    }
  }, [fetchData]);

  // Handle sorting
  const handleSort = useCallback((field) => {
    setSortDirection(current => 
      sortField === field ? (current === 'asc' ? 'desc' : 'asc') : 'asc'
    );
    setSortField(field);
    setCurrentPage(1);
  }, [sortField]);

  // Combined filter and sort function
  const handleFilterAndSort = useCallback(() => {
    let filteredData = [...members];

    // Apply search filter
    if (searchQuery) {
      filteredData = filteredData.filter(member => {
        const query = searchQuery.toLowerCase();
        switch (searchField) {
          case 'name':
            return member.userName?.toLowerCase().includes(query);
          case 'email':
            return member.emailId?.toLowerCase().includes(query);
          case 'phone':
            return member.phoneNumber?.toLowerCase().includes(query);
          case 'role':
            return member.role?.toLowerCase().includes(query);
          default:
            return false;
        }
      });
    }

    // Apply sorting
    filteredData.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      // Handle special cases
      if (sortField === 'delivered' || sortField === 'inprogress') {
        aValue = parseInt(aValue) || 0;
        bValue = parseInt(bValue) || 0;
      } else if (sortField === 'joiningDate') {
        aValue = new Date(isNaN(a.joiningDate) ? parseFloat(a.joiningDate) : a.joiningDate).getTime();
        bValue = new Date(isNaN(b.joiningDate) ? parseFloat(b.joiningDate) : b.joiningDate).getTime();
      } else if (typeof aValue === 'string' && typeof bValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (aValue === null || aValue === undefined) return sortDirection === 'asc' ? -1 : 1;
      if (bValue === null || bValue === undefined) return sortDirection === 'asc' ? 1 : -1;

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    setMemberData(filteredData);
  }, [members, searchQuery, searchField, sortField, sortDirection]);

  // Effect for filtering and sorting
  useEffect(() => {
    handleFilterAndSort();
  }, [handleFilterAndSort]);

  // Initial data fetch
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMembers = memberData.slice(indexOfFirstItem, indexOfLastItem);

  // Update startResizing function with proper initialization
  const startResizing = (field, e) => {
    e.stopPropagation();
    const tableContainer = e.currentTarget.closest('.overflow-auto');
    const tableRect = tableContainer.getBoundingClientRect();
    const headerCell = e.currentTarget.closest('th');
    const headerRect = headerCell.getBoundingClientRect();

    // Create the resizing line with proper initial position
    const resizeLine = document.createElement('div');
    resizeLine.className = 'absolute top-0 w-0.5 bg-cyan-500 shadow-sm transition-transform duration-75 ease-out no-select';
    resizeLine.style.height = `${tableContainer.scrollHeight}px`;
    resizeLine.style.left = `${headerRect.right - tableRect.left}px`;
    resizeLine.style.zIndex = '50';
    tableContainer.appendChild(resizeLine);

    // Add no-select class to prevent text selection
    tableContainer.classList.add('no-select');

    setResizing({
      field,
      startX: e.clientX,
      startWidth: columnWidths[field],
      resizeLine,
      tableContainer,
      initialLeft: headerRect.right - tableRect.left,
      minLeft: headerRect.left - tableRect.left,
      maxLeft: tableRect.width - 10 // 10px buffer from right edge
    });
  };

  // Update handleMouseMove with proper constraints
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (resizing) {
        const { 
          field, 
          startX, 
          startWidth, 
          resizeLine, 
          tableContainer, 
          initialLeft,
          minLeft,
          maxLeft 
        } = resizing;

        // Column-specific constraints
        const constraints = {
          userName: { min: 180, max: 300 },    // Name column
          emailId: { min: 200, max: 400 },     // Email column
          phoneNumber: { min: 130, max: 200 }  // Phone number column
        };

        // Calculate movement within column constraints
        const movement = e.clientX - startX;
        const minWidth = constraints[field].min;
        const maxWidth = constraints[field].max;
        const widthMovement = Math.max(minWidth - startWidth, Math.min(maxWidth - startWidth, movement));

        // Calculate new position with boundaries
        const newPosition = Math.max(
          minLeft + minWidth,
          Math.min(
            initialLeft + widthMovement,
            maxLeft
          )
        );

        // Update resize line position with smooth animation
        if (resizeLine) {
          resizeLine.style.left = `${newPosition}px`;
          resizeLine.style.transition = 'left 0.1s ease-out';
        }

        // Update column width based on constrained movement
        const newWidth = Math.max(
          constraints[field].min,
          Math.min(
            constraints[field].max,
            startWidth + widthMovement
          )
        );

        setColumnWidths(prev => ({
          ...prev,
          [field]: newWidth
        }));
      }
    };

    const handleMouseUp = () => {
      if (resizing) {
        const { resizeLine, tableContainer } = resizing;
        if (resizeLine && tableContainer) {
          // Remove no-select class
          tableContainer.classList.remove('no-select');

          // Fade out and remove the resize line
          resizeLine.style.opacity = '0';
          resizeLine.style.transition = 'opacity 0.2s ease-out';
          setTimeout(() => {
            if (tableContainer.contains(resizeLine)) {
              tableContainer.removeChild(resizeLine);
            }
          }, 200);
        }
        setResizing(null);
      }
    };

    if (resizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      if (resizing) {
        resizing.tableContainer?.classList.remove('no-select');
      }
    };
  }, [resizing]);

  // Update TableHeader component with improved resize handle
  const TableHeader = ({ field, children, className }) => (
    <Table.HeadCell 
      className={`!p-3 cursor-pointer group bg-gray-50/80 relative ${className}`}
      onClick={() => handleSort(field)}
      style={{ width: `${columnWidths[field]}px` }}
    >
      <div className="flex items-center gap-1.5 justify-between">
        {children}
        <div className="flex flex-col opacity-50 group-hover:opacity-100 transition-opacity">
          <FiChevronUp 
            className={`h-2.5 w-2.5 -mb-0.5 ${sortField === field && sortDirection === 'asc' ? 'text-cyan-600' : 'text-gray-400'}`}
          />
          <FiChevronDown 
            className={`h-2.5 w-2.5 ${sortField === field && sortDirection === 'desc' ? 'text-cyan-600' : 'text-gray-400'}`}
          />
        </div>
      </div>
      {['userName', 'emailId', 'phoneNumber'].includes(field) && (
        <div 
          className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize group/resizer hover:bg-cyan-500/20 transition-colors duration-200"
          onMouseDown={(e) => startResizing(field, e)}
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-8 opacity-0 group-hover/resizer:opacity-100 transition-opacity duration-200">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-4 bg-cyan-500/20 rounded-full" />
          </div>
        </div>
      )}
    </Table.HeadCell>
  );

  // Add this useEffect for click outside handling
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        const dropdown = document.querySelector('.absolute.right-0.mt-1');
        if (dropdown) {
          dropdown.classList.add('hidden');
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed inset-0 lg:ml-64 bg-gray-50/50">
      <div className="flex flex-col h-full">
        {/* Main Container */}
        <div className="flex-1 p-4 pt-24 overflow-hidden">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[
              { 
                label: 'Total Members', 
                value: members.length,
                icon: <FiUsers className="w-6 h-6 text-cyan-600" />,
                trend: '+12% from last month',
                sortConfig: { field: 'userName', direction: 'asc' }
              },
              { 
                label: 'Active Members', 
                value: members.filter(m => m.status === 'Active').length,
                icon: <FiCheckCircle className="w-6 h-6 text-green-600" />,
                trend: '+5% from last month',
                sortConfig: { field: 'status', direction: 'asc', filterValue: 'Active' }
              },
              { 
                label: 'Inactive Members', 
                value: members.filter(m => m.status !== 'Active').length,
                icon: <FiClock className="w-6 h-6 text-red-600" />,
                trend: '-2% from last month',
                sortConfig: { field: 'status', direction: 'desc', filterValue: 'Inactive' }
              },
              { 
                label: 'Total Delivered', 
                value: members.reduce((acc, curr) => acc + (parseInt(curr.delivered) || 0), 0),
                icon: <FiTrendingUp className="w-6 h-6 text-blue-600" />,
                trend: '+8% from last month',
                sortConfig: { field: 'delivered', direction: 'desc' }
              }
            ].map((stat, index) => (
              <div
                key={index}
                onClick={() => {
                  setSortField(stat.sortConfig.field);
                  setSortDirection(stat.sortConfig.direction);
                  setActiveSort(index);
                  if (stat.sortConfig.filterValue) {
                    const filtered = members.filter(member => 
                      stat.sortConfig.filterValue === 'Active' 
                        ? member.status === 'Active'
                        : member.status !== 'Active'
                    );
                    setMemberData(filtered);
                  } else {
                    handleFilterAndSort();
                  }
                  setCurrentPage(1);
                }}
                className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 p-4 cursor-pointer ${
                  activeSort === index ? 'ring-1 ring-cyan-500 shadow-md' : ''
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <h3 className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</h3>
                    <p className="text-xs text-cyan-600 mt-1">{stat.trend}</p>
                  </div>
                  <div className="p-2 bg-gray-50 rounded-lg">
                    {stat.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Table Container */}
          <div className="bg-white rounded-lg shadow-sm flex flex-col h-[calc(100vh-20rem)]">
            {/* Header Section */}
            <div className="p-5 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="relative flex items-center w-[600px] gap-2">
                  {/* Search Input */}
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiSearch className="h-3.5 w-3.5 text-gray-400" />
                    </div>
                    <TextInput
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search members..."
                      className="w-full !pl-9 !py-2 !text-sm !bg-white !border-gray-200 hover:!border-gray-300 focus:!border-gray-300 focus:!ring-1 focus:!ring-cyan-100 focus:!border-cyan-200 !rounded-lg"
                      sizing="sm"
                    />
                  </div>

                  {/* Filter Button */}
                  <div className="relative" ref={dropdownRef}>
                    <Button 
                      size="sm"
                      className="!px-3 !py-2 !bg-white !border !border-gray-200 hover:!border-gray-300 focus:!outline-none focus:!ring-0 focus:!border-gray-300 !text-gray-700 !font-normal !rounded-lg !h-[36px]"
                      onClick={(e) => {
                        const button = e.currentTarget;
                        const dropdown = button.nextElementSibling;
                        if (dropdown) {
                          dropdown.classList.toggle('hidden');
                        }
                      }}
                    >
                      <div className="flex items-center gap-2 min-w-[100px]">
                        <div className="flex items-center gap-1.5">
                          <FiFilter className="h-3.5 w-3.5 text-gray-400" />
                          <span className="text-sm text-gray-600">Filter:</span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          {searchField.charAt(0).toUpperCase() + searchField.slice(1)}
                        </span>
                        <FiChevronDown className="h-3.5 w-3.5 text-gray-400 ml-auto" />
                      </div>
                    </Button>

                    {/* Dropdown Menu */}
                    <div className="absolute right-0 mt-1 hidden z-[100]">
                      <div className="bg-white rounded-lg shadow-lg border border-gray-200 py-1 min-w-[140px]">
                        {['name', 'email', 'phone', 'role'].map((field) => (
                          <button
                            key={field}
                            onClick={() => {
                              setSearchField(field);
                              const dropdown = document.querySelector('.absolute.right-0.mt-1');
                              if (dropdown) {
                                dropdown.classList.add('hidden');
                              }
                            }}
                            className={`w-full text-left py-2 px-3 hover:bg-gray-50 focus:outline-none focus:ring-0 focus:border-0 transition-colors duration-200 ${
                              searchField === field ? 'bg-gray-50 font-medium text-gray-900' : 'text-gray-600'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              {field === 'name' && <FiUsers className="h-3.5 w-3.5 text-gray-400" />}
                              {field === 'email' && <FiMail className="h-3.5 w-3.5 text-gray-400" />}
                              {field === 'phone' && <FiPhone className="h-3.5 w-3.5 text-gray-400" />}
                              {field === 'role' && <FiShield className="h-3.5 w-3.5 text-gray-400" />}
                              <span className="text-sm">
                                {field.charAt(0).toUpperCase() + field.slice(1)}
                              </span>
                              {searchField === field && (
                                <FiCheck className="h-3.5 w-3.5 text-gray-900 ml-auto" />
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Table with proper overflow handling */}
            <div className="flex-1 overflow-auto relative">
              <Table className="table-fixed w-full">
                <Table.Head className="sticky top-0 z-10">
                  <TableHeader field="userName">
                    <div className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</div>
                  </TableHeader>
                  <TableHeader field="emailId">
                    <div className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Email Address</div>
                  </TableHeader>
                  <TableHeader field="phoneNumber">
                    <div className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Phone Number</div>
                  </TableHeader>
                  <TableHeader field="role">
                    <div className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Role</div>
                  </TableHeader>
                  <TableHeader field="joiningDate">
                    <div className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Joining Date</div>
                  </TableHeader>
                  <TableHeader field="status">
                    <div className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</div>
                  </TableHeader>
                  <TableHeader field="delivered">
                    <div className="text-xs font-semibold text-gray-600 uppercase tracking-wider text-center">Delivered</div>
                  </TableHeader>
                  <TableHeader field="inprogress">
                    <div className="text-xs font-semibold text-gray-600 uppercase tracking-wider text-center">Progress</div>
                  </TableHeader>
                </Table.Head>
                <Table.Body className="divide-y divide-gray-100">
                  {currentMembers.map((member) => (
                    <Table.Row key={member.cognitoId} className="hover:bg-gray-50/50 transition-colors duration-150">
                      <Table.Cell style={{ width: `${columnWidths.userName}px` }} className="!p-4">
                        <div className="flex items-center gap-3">
                          <div className="flex-shrink-0 h-9 w-9 rounded-full bg-cyan-50 flex items-center justify-center">
                            <span className="text-cyan-600 text-sm font-medium">
                              {member.userName.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="font-medium text-gray-900 text-[13px] truncate" title={member.userName}>
                              {member.userName}
                            </div>
                          </div>
                        </div>
                      </Table.Cell>
                      <Table.Cell style={{ width: `${columnWidths.emailId}px` }} className="!p-4">
                        <div className="min-w-0">
                          <div className="truncate text-[13px] text-gray-600" title={member.emailId}>
                            {member.emailId}
                          </div>
                        </div>
                      </Table.Cell>
                      <Table.Cell style={{ width: `${columnWidths.phoneNumber}px` }} className="!p-4">
                        <div className="min-w-0">
                          <div className="truncate text-[13px] text-gray-600" title={member.phoneNumber}>
                            {member.phoneNumber}
                          </div>
                        </div>
                      </Table.Cell>
                      <Table.Cell style={{ width: `${columnWidths.role}px` }} className="!p-4">
                        {getRoleOptions(member.role).length > 0 ? (
                          <Dropdown
                            label={
                              <span className="px-2.5 py-1 text-[13px] font-medium text-gray-700 hover:bg-gray-50 rounded-md border border-gray-200 truncate block max-w-[120px] focus:outline-none focus:ring-0">
                                {member.role || 'Set Role'} 
                                {updatingRole === member.cognitoId && '...'}
                              </span>
                            }
                            dismissOnClick={true}
                            disabled={updatingRole === member.cognitoId}
                            inline={true}
                            theme={{
                              floating: {
                                target: "w-fit focus:outline-none focus:ring-0",
                                base: "bg-white rounded-lg shadow-lg border border-gray-200 z-50",
                                item: {
                                  base: "py-2 px-3 hover:bg-gray-50 focus:outline-none focus:ring-0 focus:bg-gray-50 text-sm text-gray-700 cursor-pointer w-full text-left",
                                  icon: "h-3.5 w-3.5 text-gray-400"
                                }
                              }
                            }}
                          >
                            {getRoleOptions(member.role).map((role) => (
                              <Dropdown.Item 
                                key={role}
                                onClick={() => handleRoleChange(member.cognitoId, role, member)}
                                className={`${member.role === role ? 'bg-gray-50' : ''} 
                                  ${role === 'owner' ? 'text-blue-600' : 
                                    role === 'operation' ? 'text-green-600' : 
                                    role === 'sales' ? 'text-orange-600' : 'text-gray-600'}
                                  focus:outline-none focus:ring-0`}
                              >
                                {role.charAt(0).toUpperCase() + role.slice(1)}
                              </Dropdown.Item>
                            ))}
                          </Dropdown>
                        ) : (
                          <span className="px-2.5 py-1 text-[13px] text-gray-500 truncate block">
                            {member.role || 'No Role'}
                          </span>
                        )}
                      </Table.Cell>
                      <Table.Cell style={{ width: `${columnWidths.joiningDate}px` }} className="!p-4">
                        <div className="truncate text-[13px] text-gray-600" title={formatEpochToReadableDate(member.joiningDate)}>
                          {formatEpochToReadableDate(member.joiningDate)}
                        </div>
                      </Table.Cell>
                      <Table.Cell style={{ width: `${columnWidths.status}px` }} className="!p-4">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium truncate
                          ${member.status === "Active" 
                            ? "bg-green-50 text-green-600" 
                            : "bg-red-50 text-red-600"}`}
                        >
                          {member.status}
                        </span>
                      </Table.Cell>
                      <Table.Cell style={{ width: `${columnWidths.delivered}px` }} className="!p-4 text-center">
                        <span className="text-[13px] font-medium text-gray-700">{member.delivered || '0'}</span>
                      </Table.Cell>
                      <Table.Cell style={{ width: `${columnWidths.inprogress}px` }} className="!p-4 text-center">
                        <span className="text-[13px] font-medium text-gray-700">{member.inprogress || '0'}</span>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>

            {/* Footer with Pagination */}
            <div className="p-4 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, memberData.length)} of {memberData.length} results
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    color="gray"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  >
                    Previous
                  </Button>
                  <Button
                    size="sm"
                    color="gray"
                    disabled={indexOfLastItem >= memberData.length}
                    onClick={() => setCurrentPage(prev => prev + 1)}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMemberlist;