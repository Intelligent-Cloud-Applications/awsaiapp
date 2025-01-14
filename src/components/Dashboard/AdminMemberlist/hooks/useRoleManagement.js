import { useCallback, useState } from 'react';
import { API } from 'aws-amplify';
import Swal from 'sweetalert2';

/**
 * Custom hook for managing user roles
 * @param {Function} onRoleUpdateSuccess - Callback function to execute after successful role update
 * @returns {Object} Role management methods and state
 */
export const useRoleManagement = (onRoleUpdateSuccess) => {
  const [updatingRole, setUpdatingRole] = useState(null);

  const getRoleOptions = useCallback((currentRole, userRole) => {
    if (userRole === 'owner') {
      return ['sales', 'operation', 'owner'].filter(role => role !== currentRole);
    }
    if (userRole === 'operation') {
      return ['sales'].filter(role => role !== currentRole);
    }
    return [];
  }, []);

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
            role: newRole,
            userType: currentMember.userType || 'member'
          }
        };

        try {
          await API.put('clients', '/user/update-member/awsaiapp', updatePayload);
          
          // First show success message
          await Swal.fire({
            icon: 'success',
            title: 'Updated!',
            text: 'User role has been updated successfully.',
            showConfirmButton: false,
            timer: 1500
          });

          // Then refresh the data
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
  }, [onRoleUpdateSuccess]);

  return {
    updatingRole,
    getRoleOptions,
    handleRoleChange
  };
}; 