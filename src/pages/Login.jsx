import React, { useState } from 'react';
import { Auth, API } from 'aws-amplify';
import Navbar from '../components/Home/Navbar';
import EmailIcon from '../utils/Assets/Dashboard/images/SVG/EmailIcon.svg';
import LockIcon from '../utils/Assets/Dashboard/images/SVG/LockIcon.svg';
import GoogleIcon from '../utils/png/Google.png';
import FacebookIcon from '../utils/png/Facebook.png';
import LoginPng from '../utils/Assets/Login.png';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await Auth.signIn(formData.email, formData.password);
      const response = await API.get('clients', '/self/read-self/awsaiapp');
      console.log('User Profile:', response);

    } catch (error) {
      console.error('Login error:', error);
      setError('Incorrect email or password');
    }
  };

  const handleGoogleLogin = async () => {
    // Add Google authentication logic here
  };

  const handleFacebookLogin = async () => {
    // Add Facebook authentication logic here
  };

  return (
    <>
      <Navbar />
      <div className=" bg-[#f7f7f7] flex justify-center items-center h-[100vh]">
        <div className="flex max767:flex-col h-[35rem]">
          <div className=" mobile1 flex flex-col justify-evenly items-center Inter bg-[#30AFBC] p-8 rounded-tl-[2rem] rounded-bl-[2rem] shadow-md w-[30rem] max767:bg-transparent max1050:w-[48vw]" style={{ boxShadow: '0 9px 14px rgba(48, 175, 188, 0.5)' }}>
            <img src={LoginPng} alt="" />
            <h1 className='font-[900] text-[2rem] max767:text-[5vw] text-white Laila max767:text-black'>Let’s Get Started</h1>
          </div>

          <div className=" mobile2 Inter flex flex-col justify-evenly bg-white p-8 rounded-tr-[2rem] rounded-br-[2rem] shadow-md w-[30rem] max1050:w-[48vw]" style={{ boxShadow: '12px 9px 14px rgba(48, 175, 188, 0.5)' }}>
            <h2 className="Inter text-center text-2xl font-semibold mb-4">Login</h2>
            <form className='flex flex-col items-center' onSubmit={handleLogin}>
              <div className="mb-4 relative flex items-center">
                <img
                  src={EmailIcon}
                  alt="Email Icon"
                  className="absolute left-3 top-3 pointer-events-none w-[1rem] h-[1rem]"
                />
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="Inter pl-10 w-[20rem] p-2 border rounded-[0.5rem] mb-2"
                  placeholder="Email"
                />
              </div>
              <div className="mb-2 relative flex items-center">
                <img
                  src={LockIcon}
                  alt="Lock Icon"
                  className="absolute left-3 top-3 h-[1rem] w-[1rem] pointer-events-none"
                />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="Inter pl-10 w-[20rem] p-2 border rounded-[0.5rem]"
                  placeholder="Password"
                />
              </div>
              <div className="w-[20rem] mb-6">
                <a href="/forgot-password" className="text-[#017E2B] text-[0.8rem] font-[600] hover:underline">
                  Forgot Password?
                </a>
              </div>
              <button
                type="submit"
                className="w-[20rem] bg-[#30AFBC] text-[1.1rem] text-white p-2 rounded-[0.5rem] max767:bg-white max767:text-[#30AFBC] max767:text-[1.2rem] max767:font-bold"
              >
                Login
              </button>

              <div className='flex flex-row items-center justify-center mt-[4rem] mb-[1rem]'>
                <div className=" w-[6rem] bg-[#000000] h-[0.09rem] mr-1"></div>
                <p className='font-bold'> OR </p>
                <div className=" w-[6rem] bg-[#000000] h-[0.09rem] ml-1"></div>
              </div>

              <button
                onClick={handleGoogleLogin}
                className="border w-[20rem] mb-2 p-1 rounded-[2rem] mt-2 flex items-center justify-start gap-[4rem] max767:bg-white"
              >
                <img
                  src={GoogleIcon}
                  alt="Google Icon"
                  className=" w-6 h-6 ml-4"
                />
                <div >Continue with Google</div>
              </button>
              <button
                onClick={handleFacebookLogin}
                className="border w-[20rem] p-1 rounded-[2rem] mt-2 flex items-center justify-start gap-[4rem] max767:bg-white"
              >
                <img
                  src={FacebookIcon}
                  alt="Facebook Icon"
                  className="w-6 h-6 ml-4"
                />
                <div className="text-center">Continue with Facebook</div>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
};

export default Login;
