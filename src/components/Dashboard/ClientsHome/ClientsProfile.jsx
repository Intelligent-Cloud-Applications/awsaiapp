import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';

const ClientsProfile = ({ institution }) => {
  console.log("Shreetam", institution)
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
    if (!institution) return; // Ensure institution is defined

    // Fetch client details
    const fetchClientAndOwnerDetails = async () => {
      try {
        const [templateResponse, response] = await Promise.all([
          API.get("clients", `/user/development-form/get-user/${institution}`),
          API.get("clients", `/user/list-members/${institution}`)
        ]);
  
        const owner = response.find(member => member.role === 'owner');
        const formattedDate = owner 
          ? new Date(owner.joiningDate).toLocaleDateString("en-US", {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }) 
          : 'Joining Date';
  
        setClientData({
          institutionid: templateResponse.institutionid || 'Institution ID',
          Query_Address: templateResponse.Query_Address || 'Address',
          Query_WebLink: templateResponse.Query_WebLink || 'Website URL',
          Query_EmailId: templateResponse.Query_EmailId || 'Email',
          logoUrl: templateResponse.logoUrl || 'https://via.placeholder.com/150',
          userName: owner?.userName || 'Owner Name',
          phoneNumber: owner?.phoneNumber || 'Phone Number',
          joiningDate: formattedDate
        });
      } catch (error) {
        console.error("Error fetching details:", error);
      }
    };
  
    fetchClientAndOwnerDetails();
  }, [institution]);

  // Utility functions
  const censorEmail = (email) => {
    const [name, domain] = email.split('@');
    const censoredName = name.slice(0, 3) + 'xxxxxx';
    return `${censoredName}@${domain}`;
  };

  const censorPhoneNumber = (phone) => {
    if (!phone) return 'Phone Number Not Available';

    // Identify the length of the country code (usually 1-3 digits)
    const countryCodeMatch = phone.match(/^\+\d{1,3}/);
    if (!countryCodeMatch) return 'Invalid Phone Number';

    const countryCode = countryCodeMatch[0];
    const numberWithoutCountryCode = phone.slice(countryCode.length);

    if (numberWithoutCountryCode.length < 3) {
      return 'Invalid Phone Number';
    }

    const visibleStart = numberWithoutCountryCode.slice(0, 2);
    const visibleEnd = numberWithoutCountryCode.slice(-1);
    const censoredMiddle = 'x'.repeat(numberWithoutCountryCode.length - 3);

    return `${countryCode}${visibleStart}${censoredMiddle}${visibleEnd}`;
  }

  return (
    <div className="mt-8 bg-white rounded-md shadow-2xl overflow-hidden sm:flex max-w-4xl mx-auto h-[32rem] hover:shadow-xl w-[70vw]">
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
  );
}

export default ClientsProfile;
