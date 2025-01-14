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
import { Dropdown } from 'flowbite-react';

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
          <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 flex flex-col h-[calc(100vh-5rem)] sm:h-[calc(100vh-50rem)] md:h-[calc(100vh-15rem)]">
            {/* Header Section */}
            <div className="p-3 sm:p-4 md:p-5 border-b border-gray-100 flex-shrink-0">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <SearchAndFilter
                  searchQuery={searchQuery}
                  onSearchChange={handleSearch}
                  searchField={searchField}
                  onSearchFieldChange={handleSearchFieldChange}
                />
              </div>
            </div>

            {/* Mobile View */}
            <div className="block md:hidden overflow-y-auto flex-1 px-3 py-2">
              <div className="space-y-3">
                {currentData.map((member) => (
                  <MobileTableCard
                    key={member.cognitoId}
                    member={member}
                    expanded={expandedRow === member.cognitoId}
                    onToggle={toggleExpandedRow}
                    getRoleOptions={getRoleOptions}
                    handleRoleChange={handleRoleChange}
                    updatingRole={updatingRole}
                    userData={userData}
                  />
                ))}
              </div>
            </div>

            {/* Desktop View */}
            <div className="hidden md:block flex-1 overflow-hidden">
              <div className="overflow-y-auto h-full">
                <div className="overflow-x-auto min-w-[1000px]">
                  <Table className="w-full">
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
                        <div className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</div>
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
                        <div className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Email Address</div>
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
                        <div className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Phone Number</div>
                      </TableHeader>
                      <TableHeader
                        field="role"
                        width={columnWidths.role}
                        sortField={sortField}
                        sortDirection={sortDirection}
                        onSort={handleSort}
                      >
                        <div className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Role</div>
                      </TableHeader>
                      <TableHeader
                        field="joiningDate"
                        width={columnWidths.joiningDate}
                        sortField={sortField}
                        sortDirection={sortDirection}
                        onSort={handleSort}
                      >
                        <div className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Joining Date</div>
                      </TableHeader>
                      <TableHeader
                        field="status"
                        width={columnWidths.status}
                        sortField={sortField}
                        sortDirection={sortDirection}
                        onSort={handleSort}
                      >
                        <div className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</div>
                      </TableHeader>
                      <TableHeader
                        field="delivered"
                        width={columnWidths.delivered}
                        sortField={sortField}
                        sortDirection={sortDirection}
                        onSort={handleSort}
                      >
                        <div className="text-xs font-semibold text-gray-600 uppercase tracking-wider text-center">Delivered</div>
                      </TableHeader>
                      <TableHeader
                        field="inprogress"
                        width={columnWidths.inprogress}
                        sortField={sortField}
                        sortDirection={sortDirection}
                        onSort={handleSort}
                      >
                        <div className="text-xs font-semibold text-gray-600 uppercase tracking-wider text-center">Progress</div>
                      </TableHeader>
                    </Table.Head>
                    <Table.Body className="divide-y divide-gray-100">
                      {currentData.map((member) => (
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
                            {getRoleOptions(member.role, userData.role).length > 0 ? (
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
                                {getRoleOptions(member.role, userData.role).map((role) => (
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
              </div>
            </div>

            {/* Footer with Pagination */}
            <div className="py-3 sm:py-4 flex flex-col sm:flex-row justify-between items-center px-4 sm:px-5 w-full gap-3 sm:gap-4 border-t border-gray-100 flex-shrink-0 bg-white rounded-b-xl">
              <div className="text-sm text-gray-600 bg-gray-50/50 px-4 py-2 rounded-lg order-2 sm:order-1">
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