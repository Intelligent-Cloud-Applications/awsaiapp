import React from 'react';
import PropTypes from 'prop-types';
import { formatEpochToReadableDate } from '../utils/dateUtils';
import { FiChevronDown, FiChevronUp, FiMail, FiPhone, FiCalendar, FiActivity } from 'react-icons/fi';
import CustomDropDown from './CustomDropDown';

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
      className={`bg-white transition-all duration-200 ease-in-out w-full ${
        expanded ? 'shadow-sm' : ''
      }`}
    >
      {/* Header - Always visible */}
      <div 
        className="py-3 cursor-pointer select-none"
        onClick={() => onToggle(member.cognitoId)}
        role="button"
        aria-expanded={expanded}
      >
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-cyan-50 flex items-center justify-center">
            <span className="text-cyan-600 text-sm font-medium">
              {member.userName.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0 flex-1">
                <h3 className="font-medium text-gray-900 text-sm truncate pr-2">
                  {member.userName}
                </h3>
                <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
                  <FiMail className="h-3.5 w-3.5 flex-shrink-0" />
                  <span className="truncate">
                    {member.emailId}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${statusColor}`}>
                  {member.status}
                </span>
                {expanded ? (
                  <FiChevronUp className="h-4 w-4 text-gray-400" />
                ) : (
                  <FiChevronDown className="h-4 w-4 text-gray-400" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Content */}
      {expanded && (
        <div className="border-t border-gray-200">
          <div className="divide-y divide-gray-200">
            {/* Contact Info */}
            <div className="py-3 space-y-2">
              <div className="flex items-center gap-2">
                <FiPhone className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
                <span className="text-xs text-gray-900 truncate">{member.phoneNumber}</span>
              </div>
              <div className="flex items-center gap-2">
                <FiCalendar className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
                <span className="text-xs text-gray-900 truncate">
                  {formatEpochToReadableDate(member.joiningDate)}
                </span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-medium text-gray-500 flex-shrink-0">Role</span>
                {getRoleOptions(member.role, userData.role).length > 0 ? (
                  <div className="flex justify-end flex-1 min-w-0">
                    <CustomDropDown
                      label={member.role === 'sale' ? 'Sale' : 
                             member.role === 'operation' ? 'Admin' : 
                             member.role === 'owner' ? 'Owner' : 'Set Role'}
                      disabled={updatingRole === member.cognitoId}
                      isLoading={updatingRole === member.cognitoId}
                      options={getRoleOptions(member.role, userData.role).map(role => ({
                        value: role,
                        label: role === 'sale' ? 'Sale' : 
                               role === 'operation' ? 'Admin' : 
                               role === 'owner' ? 'Owner' : role,
                        color: role === 'owner' ? 'text-blue-600' : 
                               role === 'operation' ? 'text-green-600' : 
                               role === 'sale' ? 'text-orange-600' : 'text-gray-600'
                      }))}
                      selectedValue={member.role}
                      onSelect={(option) => handleRoleChange(member.cognitoId, option.value, member)}
                    />
                  </div>
                ) : (
                  <span className="text-xs text-gray-900 truncate flex-1 text-right">
                    {member.role || 'No Role'}
                  </span>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="py-3">
              <div className="flex items-center gap-2 mb-2">
                <FiActivity className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
                <span className="text-xs font-medium text-gray-900">Activity Stats</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-2 bg-gray-50 rounded-lg text-center">
                  <span className="block text-[10px] font-medium text-gray-500 mb-0.5">
                    Delivered
                  </span>
                  <span className="text-base font-semibold text-gray-900">
                    {member.delivered || '0'}
                  </span>
                </div>
                <div className="p-2 bg-gray-50 rounded-lg text-center">
                  <span className="block text-[10px] font-medium text-gray-500 mb-0.5">
                    In Progress
                  </span>
                  <span className="text-base font-semibold text-gray-900">
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