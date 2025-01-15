import { useCallback, useState } from 'react';
import { API } from 'aws-amplify';
import Swal from 'sweetalert2';

// Single mapping object for frontend display and backend values
const roleMapping = {
  Sales: 'sales', // Frontend: Sales -> Backend: sales
  Admin: 'operation', // Frontend: Admin -> Backend: operation
  Owner: 'owner' // Frontend: Owner -> Backend: owner
};

export const useRoleManagement = (onRoleUpdateSuccess) => {
  const [updatingRole, setUpdatingRole] = useState(null);

  // Get role options for the dropdown based on the current user's role
  const getRoleOptions = useCallback(
    (currentRole, userRole) => {
      let roles = [];
      if (userRole === 'owner') {
        roles = ['Sales', 'Admin', 'Owner']; // Frontend display values
      } else if (userRole === 'operation') {
        roles = ['Sales'];
      }

      // Filter out the current role
      return roles.filter(role => roleMapping[role] !== currentRole);
    },
    [] // No dependencies needed since roleMapping is static
  );

  // Handle role change and update the backend
  const handleRoleChange = useCallback(
    async (cognitoId, newRoleDisplay, currentMember) => {
      try {
        const newRoleBackend = roleMapping[newRoleDisplay]; // Convert frontend display to backend value

        const result = await Swal.fire({
          title: 'Change Role',
          text: `Are you sure you want to change this user's role to ${newRoleDisplay}?`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#30afbc',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, change it!'
        });

        if (result.isConfirmed) {
          setUpdatingRole(cognitoId);

          const updatePayload = {
            body: {
              institution: 'awsaiapp',
              cognitoId,
              userName: currentMember.userName,
              emailId: currentMember.emailId,
              phoneNumber: currentMember.phoneNumber,
              country: currentMember.country || '',
              balance: currentMember.balance || '',
              status: currentMember.status,
              role: newRoleBackend, // Use the backend value here
              userType: currentMember.userType || 'member'
            }
          };

          try {
            await API.put('clients', '/user/update-member/awsaiapp', updatePayload);

            // Show success message
            await Swal.fire({
              icon: 'success',
              title: 'Updated!',
              text: 'User role has been updated successfully.',
              showConfirmButton: false,
              timer: 1500
            });

            // Refresh the data
            if (typeof onRoleUpdateSuccess === 'function') {
              onRoleUpdateSuccess();
            }
          } catch (apiError) {
            console.error('API Error:', apiError);
            throw new Error(apiError.response?.data?.message || 'Failed to update role');
          }
        }
      } catch (error) {
        console.error('Error updating role:', error);
        await Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: error.message || 'Failed to update user role.',
          confirmButtonColor: '#30afbc'
        });
      } finally {
        setUpdatingRole(null);
      }
    },
    [onRoleUpdateSuccess] // onRoleUpdateSuccess is a dependency
  );

  return {
    updatingRole,
    getRoleOptions,
    handleRoleChange,
    roleMapping // Exporting roleMapping for use in the component
  };
};