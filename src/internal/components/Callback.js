import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PendingTasksContext } from "../context/PendingTasksProvider";
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import { checkUserWorkspaceMembership } from "../services/AsanaService";
import "./Callback.css";
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import default CSS for react-toastify

function Callback() {
  const navigate = useNavigate();
  const { loading, setLoading } = useContext(PendingTasksContext);

  useEffect(() => {
    const fetchTokenAndVerifyUser = async () => {
      const queryParams = new URLSearchParams(window.location.search);
      const code = queryParams.get('code');
      if (code) {
        try {
          setLoading(true);
          const response = await axios.get(`http://localhost:4000/callback?code=${code}`);
          const accessToken = response.data;
          localStorage.setItem('accessToken', accessToken);

          const isWorkspaceUser = await checkUserWorkspaceMembership(accessToken);

          if (isWorkspaceUser) {
            navigate('/asana-internal/defect-fixing'); // Navigate to the tasks page if user is a workspace member
          } else {
            toast.error('User is not a member of the workspace'); // Show error as toast notification
            navigate('/asana-internal/error');
          }
        } catch (error) {
          toast.error('Error during authentication or fetching user details'); // Show error as toast notification
        } finally {
          setLoading(false);
        }
      } else {
        toast.error('No authorization code found in query params'); // Show error as toast notification
        setLoading(false);
      }
    };

    fetchTokenAndVerifyUser();
  }, [navigate, setLoading]);


  return (
    <>
      <ToastContainer />
      <div className='loader-container'>
        <div className='loading'>
          {loading ? <ClipLoader color="#ffffff" /> : null}
          {loading ? <div className='overlay'></div> : null}
        </div>
      </div>
    </>

  );
}

export default Callback;

