import React from "react";
import { useState } from "react";
import Navbar from "../components/Home/Navbar";
import { motion } from "framer-motion";
import LoginPic from "../utils/loginPic.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
  };
  return (
    <>
      <Navbar />
      <div
        className="flex flex-row max800:flex-col justify-center items-center max800:pt-10 bg-[#F0F0F0] min-h-screen
     max670:pt-[5rem] max670:px-6"
      >
        {/* card */}
        <div className="flex flex-col sm:flex-row m-5 max600:mx-5 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] rounded-xl pt-10 h-full">
          <div className="bg-[#0091A0] text-white shadow-md px-20 py-20 md:w-[30vw] mx-auto rounded-l-xl">
            <div className="flex flex-col items-center justify-around">
              <motion.img
               initial={{ opacity: 0, x: -20 }} 
               animate={{ opacity: 1, x: 0 }} 
               transition={{ duration: 0.5 }}
                src={LoginPic}
                alt=""
                className="max800:w-full sm:h-[80%] rounded-full md:mb-4"
              />
              <div>
                <h2 className="text-base sm:text-lg md:text-7xl font-semibold pt-10 w-full">
                  Let's Get Started
                </h2>
              </div>
            </div>
          </div>

          <div className="w-full mx-auto px-10 py-8  border bg-white md:w-[30vw] rounded-r-xl">
            <h2 className=" max406:text-3xl max670:text-9xl md:text-15xl font-semibold mb-4 w-full text-center text-[#274B4F]">
              Login
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5 h-full">
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm mb-2 font-semibold"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-gray-700 text-sm mb-2 font-semibold"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <p
                className="font-[600] text-sm mt-3 cursor-pointer text-green-500"
                onClick={() => {
                  // Navigate("/forgotpassword");
                }}
              >
                Forgot Password?
              </p>
              <div className="text-center pt-10">
                <button
                  type="submit"
                  className="bg-[#30AFBC] hover:bg-[#5EC4CE] text-white py-2 px-4 rounded w-full"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
};

export default Login;
