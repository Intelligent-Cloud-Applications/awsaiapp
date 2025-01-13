import React from 'react';
import { Dropdown } from 'flowbite-react';
import PropTypes from 'prop-types';

const RoleDropdown = ({ 
  member, 
  updatingRole, 
  getRoleOptions, 
  onRoleChange 
}) => {
  const roleOptions = getRoleOptions(member.role);

  if (roleOptions.length === 0) {
    return (
      <span className="px-2 py-1 text-sm text-gray-500">
        {member.role || 'No Role'}
      </span>
    );
  }

  return (
    <Dropdown
      label={
        <span className="px-2 py-1 text-sm font-medium text-gray-700  rounded-md border border-gray-300">
          {member.role || 'Set Role'} 
          {updatingRole === member.cognitoId && '...'}
        </span>
      }
      dismissOnClick={true}
      disabled={updatingRole === member.cognitoId}
      inline={true}
    >
      {roleOptions.map((role) => (
        <Dropdown.Item 
          key={role}
          onClick={() => onRoleChange(member.cognitoId, role)}
          className={`${member.role === role ? 'bg-white hover:bg-white' : ''} 
            ${role === 'owner' ? 'text-blue-600' : 
              role === 'operation' ? 'text-green-600' : 
              role === 'sales' ? 'text-orange-600' : 'text-gray-600'}`}
        >
          {role.charAt(0).toUpperCase() + role.slice(1)}
        </Dropdown.Item>
      ))}
    </Dropdown>
  );
};

RoleDropdown.propTypes = {
  member: PropTypes.shape({
    cognitoId: PropTypes.string.isRequired,
    role: PropTypes.string,
  }).isRequired,
  updatingRole: PropTypes.string,
  getRoleOptions: PropTypes.func.isRequired,
  onRoleChange: PropTypes.func.isRequired,
};

export default React.memo(RoleDropdown); 