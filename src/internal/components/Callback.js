import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PendingTasksContext } from "../context/PendingTasksProvider";
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import "./Callback.css"

function Callback() {
  const navigate = useNavigate();
  const {loading,setLoading} = useContext(PendingTasksContext);
  useEffect(() => {
    const fetchToken = async () => {
      // console.log('Fetching token...');
      const queryParams = new URLSearchParams(window.location.search);
      const code = queryParams.get('code');
      // console.log('Code:', code);
      if (code) {
        try {
          setLoading(true);
          const response = await axios.get(`http://localhost:4000/dev/callback?code=${code}`);
          const accessToken = response.data;
          localStorage.setItem('accessToken', accessToken);
          // console.log('Access token:', accessToken);
          navigate('/asana-internal/defect-fixing'); // Navigate to the tasks page
        } catch (error) {
          console.error('Error during authentication:', error);
        }finally{
          setLoading(false)
        }
      } else {
        console.error('No authorization code found in query params');
        setLoading(false);
      }
    };

    fetchToken();
  }, [navigate,setLoading]);


  return (
<div className='loader-container'>
  <div className='loading'>
    {loading ? <ClipLoader color="#ffffff" /> : null}
    {loading ? <div className='overlay'></div> : null}
  </div>
</div>

  );
}

export default Callback;

