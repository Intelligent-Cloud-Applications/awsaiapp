import React from 'react';
import Navbar from '../../Home/Navbar';
import ButtonGroup from '../../../Common/DashboardNav/ButtonGroup';

const ClientsProfile = () => {
  return (
    <div className="flex h-screen">
      {/* Left Banner */}
      <div className="w-1/6">
        {/* You can add content for the left side here */}
      </div>
      {/* Main Content */}
      <div className="w-5/6 bg-[#f0f0f0] p-6">
        <Navbar />
        <div className="mt-20">
          <ButtonGroup />
        </div>
        {/* Profile Card */}
        <div className="mt-8 bg-white rounded-md shadow-2xl overflow-hidden sm:flex max-w-4xl mx-auto h-[32rem] transform transition duration-500 hover:scale-105 hover:shadow-xl">
          {/* Left Section with Gradient Background */}
          <div className="sm:w-1/3 bg-gradient-to-br from-[#30afbc] to-[#64d5db] p-10 flex flex-col items-center justify-center">
            <img
              className="h-40 w-40 rounded-full border-4 border-white object-cover shadow-lg"
              src="https://via.placeholder.com/150"
              alt="Institute Logo"
            />
            <h2 className="mt-6 text-white text-4xl font-extrabold">HappyPrancer</h2>
            <p className="mt-2 text-white text-lg italic">Owner: PK</p>
          </div>
          {/* Right Section with Information */}
          <div className="sm:w-2/3 p-10 flex flex-col justify-center bg-[#fafafa]">
            <div className="mb-6">
              <h3 className="text-3xl font-semibold text-gray-800 border-b-2 border-gray-200 pb-2">Owner Details</h3>
              <div className="mt-8 space-y-6">
                <div className="flex justify-between text-gray-700">
                  <span className="font-semibold">Phone:</span>
                  <span className="text-gray-900">+91 8249675567</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span className="font-semibold">Address:</span>
                  <span className="text-gray-900">C52, Banpur, Khordha, Odisha, India, 752031</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span className="font-semibold">Date of Join:</span>
                  <span className="text-gray-900">January 1, 2023</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span className="font-semibold">Membership:</span>
                  <span className="text-gray-900">Premium</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span className="font-semibold">Website:</span>
                  <a href="https://happyprancer.com/" className="text-teal-600 hover:underline">https://happyprancer.com</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientsProfile;
