import React from 'react';
import "./AsanaHome.css";

function Home() {
  const handleLogin = () => {
    window.location.href = 'https://2rlj51hdi1.execute-api.us-east-1.amazonaws.com/dev/login'; // Your backend URL for login
  };

  return (
    <div className='outer-container'>
      <div className='inner-container'>
          <img src="/wpcomplogo.jpg" alt='company-logo' className='comp-logo'/>
          <p>Let's work together to spark new ideas and make the impossible happen. With dedication and teamwork, today we'll achieve our tasks and set new standards.</p>
          <button onClick={handleLogin} className='btn-login-asana'>
            <img src="/asanalogo.png" alt='asana-logo'/>
            <span>Login with Asana</span>

          </button>
      </div>
    </div>
  );
}

export default Home;
