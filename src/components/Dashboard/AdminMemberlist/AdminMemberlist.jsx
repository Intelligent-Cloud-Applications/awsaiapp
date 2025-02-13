import React, { useContext, useEffect, useState } from 'react';
import Context from "../../../context/Context";
import { Table, Pagination } from 'flowbite-react';
import { formatEpochToReadableDate } from './utils/dateUtils';
import { useRoleManagement } from './hooks/useRoleManagement';
import { useTableManagement } from './hooks/useTableManagement';
import { useDataFetching } from './hooks/useDataFetching';
import StatsGrid from './components/StatsGrid';
import SearchAndFilter from './components/SearchAndFilter';
import TableHeader from './components/TableHeader';
import MobileTableCard from './components/MobileTableCard';
import CustomDropDown from './components/CustomDropDown';

const AdminMemberlist = () => {
  const { util, userData } = useContext(Context);
  const [expandedRow, setExpandedRow] = useState(null);

  // Custom hooks
  const { fetchData } = useDataFetching(util.setLoader);
  const { updatingRole, getRoleOptions, handleRoleChange } = useRoleManagement(() => {
    fetchData().then(members => setData(members));
  });
  const {
    currentPage,
    searchQuery,
    searchField,
    sortField,
    sortDirection,
    columnWidths,
    activeSort,
    totalPages,
    currentData,
    filteredAndSortedData,
    setCurrentPage,
    handleSort,
    handleSearch,
    handleSearchFieldChange,
    handleStatClick,
    startResizing,
    setData
  } = useTableManagement([]);

  // Initial data fetch
  useEffect(() => {
    const loadData = async () => {
      const members = await fetchData();
      setData(members);
    };
    loadData();
  }, [fetchData, setData]);

  // Calculate stats
  const stats = {
    total_members: filteredAndSortedData.length,
    active_members: filteredAndSortedData.filter(m => m.status === 'Active').length,
    inactive_members: filteredAndSortedData.filter(m => m.status !== 'Active').length,
    total_delivered: filteredAndSortedData.reduce((acc, curr) => acc + (parseInt(curr.delivered) || 0), 0)
  };

  // Toggle expanded row for mobile view
  const toggleExpandedRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  // Updated pagination theme
  const paginationTheme = {
    pages: {
      base: "xs:mt-0 mt-2 inline-flex items-center -space-x-px rounded-md shadow-sm",
      showIcon: "inline-flex",
      previous: {
        base: "ml-0 relative inline-flex items-center rounded-l-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-cyan-50 hover:text-cyan-600 focus:z-20 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-colors duration-150",
        icon: "h-4 w-4"
      },
      next: {
        base: "relative inline-flex items-center rounded-r-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-cyan-50 hover:text-cyan-600 focus:z-20 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-colors duration-150",
        icon: "h-4 w-4"
      },
      selector: {
        base: "relative inline-flex items-center border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-cyan-50 hover:text-cyan-600 focus:z-20 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-colors duration-150",
        active: "z-10 bg-cyan-50 border-cyan-500 text-cyan-600 hover:bg-cyan-100",
        disabled: "opacity-50 cursor-not-allowed hover:bg-white hover:text-gray-500"
      }
    }
  };

  return (
    <div className="fixed inset-0 lg:ml-64 bg-gray-50/50 overflow-hidden">
      <div className="flex flex-col h-full max-h-screen">
        {/* Main Container */}
        <div className="flex-1 p-2 sm:p-4 md:p-6 pt-16 sm:pt-20 md:pt-24 overflow-y-auto">
          {/* Stats Grid */}
          <div className="mb-4 md:mb-6">
            <StatsGrid
              stats={stats}
              onStatClick={handleStatClick}
              activeSort={activeSort}
            />
          </div>

          {/* Table Container */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col h-[calc(100vh-16rem)]">
            {/* Header Section */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-col lg:flex-row justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900">Member List</h1>
                  <p className="mt-2 text-sm text-gray-600">
                    Manage and monitor member activities
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <SearchAndFilter
                    searchQuery={searchQuery}
                    onSearchChange={handleSearch}
                    searchField={searchField}
                    onSearchFieldChange={handleSearchFieldChange}
                  />
                </div>
              </div>
            </div>

            {/* Desktop View */}
            <div className="hidden md:block flex-1 overflow-hidden">
              {/* Table Wrapper */}
              <div className="h-full flex flex-col">
                {/* Vertical Scroll Container */}
                <div className="flex-1 overflow-y-auto scrollbar scrollbar-w-3 scrollbar-thumb-rounded-full scrollbar-thumb-gray-400 hover:scrollbar-thumb-gray-500 scrollbar-track-gray-200">
                  {/* Horizontal Scroll Container */}
                  <div className="min-w-[1000px]">
                    <div className="overflow-x-auto scrollbar scrollbar-h-3 scrollbar-thumb-rounded-full scrollbar-thumb-gray-400 hover:scrollbar-thumb-gray-500 scrollbar-track-gray-200">
                      <Table className="w-full table-fixed">
                        <Table.Head className="sticky top-0 bg-white z-10">
                          <TableHeader
                            field="userName"
                            width={columnWidths.userName}
                            sortField={sortField}
                            sortDirection={sortDirection}
                            onSort={handleSort}
                            onResize={startResizing}
                            isResizable
                          >
                            <div className="text-sm font-medium text-gray-600">Name</div>
                          </TableHeader>
                          <TableHeader
                            field="emailId"
                            width={columnWidths.emailId}
                            sortField={sortField}
                            sortDirection={sortDirection}
                            onSort={handleSort}
                            onResize={startResizing}
                            isResizable
                          >
                            <div className="text-sm font-medium text-gray-600">Email Address</div>
                          </TableHeader>
                          <TableHeader
                            field="phoneNumber"
                            width={columnWidths.phoneNumber}
                            sortField={sortField}
                            sortDirection={sortDirection}
                            onSort={handleSort}
                            onResize={startResizing}
                            isResizable
                          >
                            <div className="text-sm font-medium text-gray-600">Phone Number</div>
                          </TableHeader>
                          <TableHeader
                            field="role"
                            width={columnWidths.role}
                            sortField={sortField}
                            sortDirection={sortDirection}
                            onSort={handleSort}
                          >
                            <div className="text-sm font-medium text-gray-600">Role</div>
                          </TableHeader>
                          <TableHeader
                            field="joiningDate"
                            width={columnWidths.joiningDate}
                            sortField={sortField}
                            sortDirection={sortDirection}
                            onSort={handleSort}
                          >
                            <div className="text-sm font-medium text-gray-600">Joining Date</div>
                          </TableHeader>
                          <TableHeader
                            field="status"
                            width={columnWidths.status}
                            sortField={sortField}
                            sortDirection={sortDirection}
                            onSort={handleSort}
                          >
                            <div className="text-sm font-medium text-gray-600">Status</div>
                          </TableHeader>
                          <TableHeader
                            field="delivered"
                            width={columnWidths.delivered}
                            sortField={sortField}
                            sortDirection={sortDirection}
                            onSort={handleSort}
                          >
                            <div className="text-sm font-medium text-gray-600 text-center">Delivered</div>
                          </TableHeader>
                          <TableHeader
                            field="inprogress"
                            width={columnWidths.inprogress}
                            sortField={sortField}
                            sortDirection={sortDirection}
                            onSort={handleSort}
                          >
                            <div className="text-sm font-medium text-gray-600 text-center">Progress</div>
                          </TableHeader>
                        </Table.Head>
                        <Table.Body className="divide-y divide-gray-[2px]">
                          {currentData.map((member) => (
                            <Table.Row key={member.cognitoId} className="hover:bg-gray-50 transition-all duration-200">
                              <Table.Cell style={{ width: `${columnWidths.userName}px` }} className="p-4">
                                <div className="flex items-center gap-3">
                                  <div className="flex-shrink-0 h-9 w-9 rounded-lg bg-cyan-50 flex items-center justify-center">
                                    <span className="text-cyan-600 text-sm font-medium">
                                      {member.userName.charAt(0).toUpperCase()}
                                    </span>
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <div className="text-sm font-medium text-gray-900 truncate" title={member.userName}>
                                      {member.userName}
                                    </div>
                                  </div>
                                </div>
                              </Table.Cell>
                              <Table.Cell style={{ width: `${columnWidths.emailId}px` }} className="p-4">
                                <div className="min-w-0">
                                  <div className="truncate text-[13px] text-gray-600" title={member.emailId}>
                                    {member.emailId}
                                  </div>
                                </div>
                              </Table.Cell>
                              <Table.Cell style={{ width: `${columnWidths.phoneNumber}px` }} className="p-4">
                                <div className="min-w-0">
                                  <div className="truncate text-[13px] text-gray-600" title={member.phoneNumber}>
                                    {member.phoneNumber}
                                  </div>
                                </div>
                              </Table.Cell>
                              <Table.Cell style={{ width: `${columnWidths.role}px` }} className="p-4">
                                <div className="flex items-center">
                                  {getRoleOptions(member.role, userData.role).length > 0 ? (
                                    <div className="flex-shrink-0">
                                      <CustomDropDown
                                        label={member.role === 'sales' ? 'Sale' : 
                                               member.role === 'operation' ? 'Admin' :
                                               member.role === 'owner' ? 'Owner' : 'Set Role'}
                                        disabled={updatingRole === member.cognitoId || member.role === 'owner'}
                                        isLoading={updatingRole === member.cognitoId}
                                        options={getRoleOptions(member.role, userData.role).map(role => ({
                                          value: role,
                                          label: role,
                                          color: role === 'Admin' ? 'text-green-600' : 'text-orange-600'
                                        }))}
                                        selectedValue={member.role === 'sales' ? 'Sale' : 
                                                      member.role === 'operation' ? 'Admin' : ''}
                                        onSelect={(option) => {
                                          console.log('Selected option:', option); // Debug log
                                          handleRoleChange(member.cognitoId, option.value, member);
                                        }}
                                      />
                                    </div>
                                  ) : (
                                    <span className="px-3 py-2 text-sm text-gray-500 truncate">
                                      {member.role === 'sales' ? 'Sale' : 
                                       member.role === 'operation' ? 'Admin' :
                                       member.role === 'owner' ? 'Owner' : 'No Role'}
                                    </span>
                                  )}
                                </div>
                              </Table.Cell>
                              <Table.Cell style={{ width: `${columnWidths.joiningDate}px` }} className="p-4">
                                <div className="truncate text-[13px] text-gray-600" title={formatEpochToReadableDate(member.joiningDate)}>
                                  {formatEpochToReadableDate(member.joiningDate)}
                                </div>
                              </Table.Cell>
                              <Table.Cell style={{ width: `${columnWidths.status}px` }} className="p-4">
                                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium truncate
                                  ${member.status === "Active" 
                                    ? "bg-green-50 text-green-600" 
                                    : "bg-red-50 text-red-600"}`}
                                >
                                  {member.status}
                                </span>
                              </Table.Cell>
                              <Table.Cell style={{ width: `${columnWidths.delivered}px` }} className="p-4 text-center">
                                <span className="text-[13px] font-medium text-gray-700">{member.delivered || '0'}</span>
                              </Table.Cell>
                              <Table.Cell style={{ width: `${columnWidths.inprogress}px` }} className="p-4 text-center">
                                <span className="text-[13px] font-medium text-gray-700">{member.inprogress || '0'}</span>
                              </Table.Cell>
                            </Table.Row>
                          ))}
                        </Table.Body>
                      </Table>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile View */}
            <div className="block md:hidden flex-1 overflow-hidden">
              <div className="h-full overflow-y-auto">
                <div className="px-4 divide-y divide-gray-200">
                  {currentData.map((member) => (
                    <div key={member.cognitoId} className="w-full">
                      <MobileTableCard
                        member={member}
                        expanded={expandedRow === member.cognitoId}
                        onToggle={toggleExpandedRow}
                        getRoleOptions={getRoleOptions}
                        handleRoleChange={handleRoleChange}
                        updatingRole={updatingRole}
                        userData={userData}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer with Pagination - Mobile Optimized */}
            <div className="px-4 py-3 sm:px-6 sm:py-4 flex flex-col sm:flex-row justify-between items-center gap-3 border-t border-gray-200">
              <div className="text-xs sm:text-sm text-gray-600 bg-gray-50 px-3 py-1.5 sm:py-2 rounded-lg order-2 sm:order-1 w-full sm:w-auto text-center sm:text-left">
                Showing <span className="font-medium text-gray-900">{(currentPage - 1) * 7 + 1}-{Math.min(currentPage * 7, filteredAndSortedData.length)}</span> of <span className="font-medium text-gray-900">{filteredAndSortedData.length}</span>
              </div>

              <div className="flex-shrink-0 order-1 sm:order-2 w-full sm:w-auto">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                  showIcons
                  theme={paginationTheme}
                  className="flex justify-center sm:justify-end"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMemberlist;