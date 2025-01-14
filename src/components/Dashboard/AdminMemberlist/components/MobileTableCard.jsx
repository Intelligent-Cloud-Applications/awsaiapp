import React from 'react';
import PropTypes from 'prop-types';
import { formatEpochToReadableDate } from '../utils/dateUtils';
import { Dropdown } from 'flowbite-react';
import { FiChevronDown, FiChevronUp, FiMail, FiPhone, FiCalendar, FiActivity } from 'react-icons/fi';

const MobileTableCard = ({ 
  member, 
  expanded, 
  onToggle, 
  getRoleOptions,
  handleRoleChange,
  updatingRole,
  userData
}) => {
  const statusColor = member.status === "Active" 
    ? "bg-green-50 text-green-600 border-green-100" 
    : "bg-red-50 text-red-600 border-red-100";

  return (
    <div 
      className={`bg-white rounded-xl border border-gray-100 transition-all duration-200 ease-in-out ${
        expanded ? 'shadow-sm' : 'hover:border-gray-200'
      }`}
    >
      {/* Header - Always visible */}
      <div 
        className="p-4 cursor-pointer select-none"
        onClick={() => onToggle(member.cognitoId)}
        role="button"
        aria-expanded={expanded}
      >
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 h-11 w-11 rounded-full bg-cyan-50 flex items-center justify-center">
            <span className="text-cyan-600 text-base font-medium">
              {member.userName.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <div>
                <h3 className="font-medium text-gray-900 text-sm truncate">
                  {member.userName}
                </h3>
                <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
                  <FiMail className="h-3.5 w-3.5 flex-shrink-0" />
                  <span className="truncate overflow-hidden overflow-ellipsis whitespace-nowrap max-w-[120px]">
                    {member.emailId}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusColor}`}>
                  {member.status}
                </span>
                {expanded ? (
                  <FiChevronUp className="h-5 w-5 text-gray-400" />
                ) : (
                  <FiChevronDown className="h-5 w-5 text-gray-400" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Content */}
      {expanded && (
        <div className="border-t border-gray-100">
          <div className="divide-y divide-gray-100">
            {/* Contact Info */}
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <FiPhone className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-900">{member.phoneNumber}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiCalendar className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-900">
                    {formatEpochToReadableDate(member.joiningDate)}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">Role</span>
                  {getRoleOptions(member.role, userData.role).length > 0 ? (
                    <Dropdown
                      label={
                        <span className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg border border-gray-200 inline-flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-cyan-500/20">
                          {member.role || 'Set Role'} 
                          {updatingRole === member.cognitoId && '...'}
                          <FiChevronDown className="h-4 w-4 text-gray-400 ml-1" />
                        </span>
                      }
                      dismissOnClick={true}
                      disabled={updatingRole === member.cognitoId}
                      inline={true}
                      theme={{
                        floating: {
                          target: "w-fit focus:outline-none focus:ring-2 focus:ring-cyan-500/20",
                          base: "bg-white rounded-lg shadow-lg border border-gray-200 z-50",
                          item: {
                            base: "py-2 px-3 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:bg-gray-50 text-sm text-gray-700 cursor-pointer w-full text-left",
                            icon: "h-3.5 w-3.5 text-gray-400"
                          }
                        }
                      }}
                    >
                      {getRoleOptions(member.role, userData.role).map((role) => (
                        <Dropdown.Item 
                          key={role}
                          onClick={() => handleRoleChange(member.cognitoId, role, member)}
                          className={`${member.role === role ? 'bg-cyan-50' : ''} 
                            ${role === 'owner' ? 'text-blue-600' : 
                              role === 'operation' ? 'text-green-600' : 
                              role === 'sales' ? 'text-orange-600' : 'text-gray-600'}
                            focus:outline-none focus:ring-2 focus:ring-cyan-500/20`}
                        >
                          {role.charAt(0).toUpperCase() + role.slice(1)}
                        </Dropdown.Item>
                      ))}
                    </Dropdown>
                  ) : (
                    <span className="text-sm text-gray-900">
                      {member.role || 'No Role'}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <FiActivity className="h-4 w-4 text-gray-400" />
                <span className="text-sm font-medium text-gray-900">Activity Stats</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 rounded-lg text-center min-w-[120px]">
                  <span className="block text-xs font-medium text-gray-500 mb-1 truncate">
                    Delivered
                  </span>
                  <span className="text-lg font-semibold text-gray-900 truncate">
                    {member.delivered || '0'}
                  </span>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg text-center min-w-[120px]">
                  <span className="block text-xs font-medium text-gray-500 mb-1 truncate">
                    In Progress
                  </span>
                  <span className="text-lg font-semibold text-gray-900 truncate">
                    {member.inprogress || '0'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

MobileTableCard.propTypes = {
  member: PropTypes.shape({
    cognitoId: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    emailId: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string,
    role: PropTypes.string,
    joiningDate: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    status: PropTypes.string.isRequired,
    delivered: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    inprogress: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }).isRequired,
  expanded: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  getRoleOptions: PropTypes.func.isRequired,
  handleRoleChange: PropTypes.func.isRequired,
  updatingRole: PropTypes.string,
  userData: PropTypes.shape({
    role: PropTypes.string.isRequired
  }).isRequired
};

export default MobileTableCard;