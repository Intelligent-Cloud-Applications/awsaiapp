import { useCallback, useRef } from 'react';
import { API } from 'aws-amplify';
import Swal from 'sweetalert2';

export const useDataFetching = (setLoader) => {
  const loaderRef = useRef(setLoader);

  // Keep loader reference updated
  loaderRef.current = setLoader;

  const fetchData = useCallback(async (institution = 'awsaiapp') => {
    try {
      loaderRef.current(true);

      // Fetch member data
      const memberResponse = await API.get('clients', `/user/list-members/${institution}`);
      
      // Filter and sort members
      const filteredMembers = memberResponse
        .filter(member => member.userType === 'member' || member.userType === 'admin')
        .sort((a, b) => new Date(b.joiningDate) - new Date(a.joiningDate));

      // Fetch institution data
      const institutionResponse = await API.get('clients', '/admin/list-institution');

      // Calculate status counts for each member
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

      // Combine member data with status counts
      const updatedMembers = filteredMembers.map(member => {
        const { delivered = 0, inprogress = 0 } = statusCount[member.cognitoId] || {};
        return { ...member, delivered, inprogress };
      });

      return updatedMembers;
    } catch (error) {
      console.error('Error fetching data:', error);
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to fetch member data',
      });
      return [];
    } finally {
      loaderRef.current(false);
    }
  }, []);

  return { fetchData };
}; 