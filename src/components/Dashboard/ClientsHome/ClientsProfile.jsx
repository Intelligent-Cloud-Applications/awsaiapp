import React, { useState, useEffect } from 'react';
import Navbar from '../../Home/Navbar';
import ButtonGroup from '../../../Common/DashboardNav/ButtonGroup';
import { API } from 'aws-amplify';

const ClientsProfile = () => {
  const [clientData, setClientData] = useState({
    institutionid: '',
    Query_Address: '',
    Query_WebLink: '',
    Query_EmailId: '',
    logoUrl: '',
    userName: '',
    phoneNumber: '',
    joiningDate: ''
  });

  useEffect(() => {
    // Fetch client details
    const fetchClientDetails = async () => {
      try {
        const templateResponse = await API.get(
          "clients",
          `/user/development-form/get-user/happyprancer`
        );
        // Set the state with the correct attribute names
        setClientData({
          institutionid: templateResponse.institutionid || 'Institution ID',
          Query_Address: templateResponse.Query_Address || 'Address',
          Query_WebLink: templateResponse.Query_WebLink || 'Website URL',
          Query_EmailId: templateResponse.Query_EmailId || 'Email',
          logoUrl: templateResponse.logoUrl || 'https://via.placeholder.com/150'
        });
      } catch (error) {
        console.error("Error fetching client details:", error);
      }
    };

    // Fetch owner details
    const fetchOwnerDetails = async () => {
      try {
        const response = await API.get("clients", `/user/list-members/happyprancer`);
        console.log("ghegeg",response)
        // Filter through the array to find the owner
        const owner = response.find(member => member.role === 'owner'); // Adjusted for `userType` instead of `role`
        if (owner) {
          const formattedDate = new Date(owner.joiningDate).toLocaleDateString("en-US", {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });
    
          // Update state with owner data
          setClientData(prevData => ({
            ...prevData,
            userName: owner.userName || 'Owner Name',
            phoneNumber: owner.phoneNumber || 'Phone Number',
            joiningDate: formattedDate || 'Joining Date'
          }));
        } else {
          console.warn("Owner not found in the response.");
        }
      } catch (error) {
        console.error("Error fetching owner details:", error);
      }
    };
    fetchClientDetails();
    fetchOwnerDetails();
  }, []);

  // Utility function to censor email
const censorEmail = (email) => {
  const [name, domain] = email.split('@');
  const censoredName = name.slice(0, 3) + 'xxxxxx';
  return `${censoredName}@${domain}`;
};

// Utility function to censor phone number
const censorPhoneNumber = (phone) => {
  if (!phone) return 'Phone Number Not Available';
  const visibleStart = phone.slice(0, 4);
  const visibleEnd = phone.slice(-1);
  return `${visibleStart}xxxxxx${visibleEnd}`;
};

  return (
    <div className="flex h-screen">
      {/* Left Banner */}
      <div className="w-1/6">
        {/* You can add content for the left side here */}
      </div>
      {/* Main Content */}
      <div className="w-5/6 bg-[#f0f0f0] p-4">
        <Navbar />
        <div className="mt-20">
          <ButtonGroup />
        </div>
        {/* Profile Card */}
        <div className="mt-8 bg-white rounded-md shadow-2xl overflow-hidden sm:flex max-w-4xl mx-auto h-[32rem] transform transition duration-500 hover:scale-105 hover:shadow-xl">
          {/* Left Section with Gradient Background */}
          <div className="sm:w-1/3 bg-gradient-to-br from-[#30afbc] to-[#64d5db] p-10 flex flex-col items-center justify-center">
            <div className="h-40 w-40 rounded-full border-4 border-white bg-white flex items-center justify-center shadow-lg">
              <img
                className="h-full w-full object-contain"
                src={clientData.logoUrl}
                alt="Institute Logo"
              />
            </div>
            <h2 className="mt-6 text-white text-4xl font-extrabold">{clientData.institutionid}</h2>
            <p className="mt-2 text-white text-lg italic">Owner: {clientData.userName}</p>
          </div>
          {/* Right Section with Information */}
          <div className="sm:w-2/3 p-10 flex flex-col justify-center bg-[#fafafa]">
            <div className="mb-6">
              <h3 className="text-3xl font-semibold text-gray-800 border-b-2 border-gray-200 pb-2">Owner Details</h3>
              <div className="mt-8 space-y-6">
                <div className="flex justify-between text-gray-700">
                  <span className="font-semibold">Phone:</span>
                  <span className="text-gray-900">{censorPhoneNumber(clientData.phoneNumber)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span className="font-semibold">Email:</span>
                  <span className="text-gray-900">{censorEmail(clientData.Query_EmailId)}</span> 
                </div>
                <div className="flex justify-between text-gray-700">
                  <span className="font-semibold">Address:</span>
                  <span className="text-gray-900">{clientData.Query_Address}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span className="font-semibold">Date of Join:</span>
                  <span className="text-gray-900">{clientData.joiningDate}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span className="font-semibold">Membership:</span>
                  <span className="text-gray-900">Premium</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span className="font-semibold">Website:</span>
                  <a href={clientData.Query_WebLink} className="text-teal-600 hover:underline">{clientData.Query_WebLink}</a>
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
