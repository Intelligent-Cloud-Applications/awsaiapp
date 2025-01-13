import { useState, useCallback } from 'react';
import { API } from 'aws-amplify';
import Swal from 'sweetalert2';

export const useRoleManagement = (fetchData) => {
  const [updatingRole, setUpdatingRole] = useState(null);

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
        
        await fetchData();

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

  return { updatingRole, handleRoleChange };
}; 