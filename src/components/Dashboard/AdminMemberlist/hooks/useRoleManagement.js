import { useCallback, useState } from 'react';
import { API } from 'aws-amplify';
import Swal from 'sweetalert2';

// Updated role mapping
const roleMapping = {
  'Sale': 'sales',      // Frontend: Sale -> Backend: sales
  'Admin': 'operation'  // Frontend: Admin -> Backend: operation
};

export const useRoleManagement = (onRoleUpdateSuccess) => {
  const [updatingRole, setUpdatingRole] = useState(null);

  // Get role options for the dropdown based on the current user's role
  const getRoleOptions = useCallback(
    (currentRole, userRole) => {
      // If user is Admin (operation) or the member is owner, return empty array to disable role changing
      if (userRole === 'operation' || currentRole === 'owner') {
        return [];
      }

      // For owner, show available roles except current one
      if (userRole === 'owner') {
        const roles = ['Sale', 'Admin'];
        const currentDisplayRole = currentRole === 'sales' ? 'Sale' : 
                                 currentRole === 'operation' ? 'Admin' : '';
        return roles.filter(role => role !== currentDisplayRole);
      }

      return [];
    },
    [] // No dependencies needed since roleMapping is static
  );

  // Handle role change and update the backend
  const handleRoleChange = useCallback(
    async (cognitoId, newRoleDisplay, currentMember) => {
      console.log('Updating role:', { cognitoId, newRoleDisplay, currentMember }); // Debug log

      const newRoleBackend = roleMapping[newRoleDisplay];
      console.log('Mapped backend role:', newRoleBackend); // Debug log

      if (!newRoleBackend) {
        console.error('Invalid role mapping for:', newRoleDisplay);
        return;
      }

      try {
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

          console.log('Update payload:', updatePayload); // Debug log

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