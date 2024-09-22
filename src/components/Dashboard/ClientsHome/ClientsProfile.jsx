import React, { useContext, useState, useEffect, useCallback } from 'react';
import { API, Storage } from 'aws-amplify'; // Make sure Storage is imported
import { FaPencilAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import Context from "../../../context/Context";

const ClientsProfile = ({ institution }) => {
  const [logo, setLogo] = useState(null); // Actual file selected by the user
  const [selectedFile, setSelectedFile] = useState(null); // URL for preview purposes
  const { util } = useContext(Context);
  const [clientData, setClientData] = useState({
    institutionid: '',
    Query_Address: '',
    Query_WebLink: '',
    Query_EmailId: '',
    logoUrl: '',
    userName: '',
    phoneNumber: '',
    joiningDate: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const fetchClientAndOwnerDetails = useCallback(async () => {
    if (!institution) return; // Ensure institution is defined

    try {
      util.setLoader(true);
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
        PrimaryColor: templateResponse.PrimaryColor,
        SecondaryColor: templateResponse.SecondaryColor,
        LightPrimaryColor: templateResponse.LightPrimaryColor,
        LightestPrimaryColor: templateResponse.LightestPrimaryColor,
        Query_PhoneNumber: templateResponse.Query_PhoneNumber,
        Facebook: templateResponse.Facebook,
        Instagram: templateResponse.Instagram,
        YTLink: templateResponse.YTLink,
        UpiId: templateResponse.UpiId,
        Footer_Link_1: templateResponse.Footer_Link_1,
        Footer_Link_2: templateResponse.Footer_Link_2,
        InstructorBg: templateResponse.InstructorBg,
        SubscriptionBg: templateResponse.SubscriptionBg,
        userName: templateResponse.userName || "Owner Name",
        country: templateResponse.country || "India",
        cognitoId: owner?.cognitoId || '',
        phoneNumber: owner?.phoneNumber || 'Phone Number',
        joiningDate: formattedDate
      });
      setSelectedFile(templateResponse.logoUrl); // Set logo preview
    } catch (error) {
      console.error("Error fetching details:", error);
    }
    util.setLoader(false);
  }, [institution, util]); // Add institution and util to the dependency array

  useEffect(() => {
    fetchClientAndOwnerDetails();
  }, [fetchClientAndOwnerDetails]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClientData({ ...clientData, [name]: value });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileSizeMB = file.size / (1024 * 1024);
      if (fileSizeMB > 4) {
        alert("File size exceeds 4MB. Please choose a smaller file.");
        return;
      }
      if (file.type.startsWith("image/")) {
        setLogo(file);
        setSelectedFile(URL.createObjectURL(file)); // Show preview
      }
    }
  };

  const handleSaveChanges = async () => {
    setIsSaving(true);

    try {
      // Upload the logo if a new one was selected
      let logoUrl = clientData.logoUrl;
      if (logo) {
        const response = await Storage.put(`${institution}/images/${logo.name}`, logo, {
          contentType: logo.type,
        });
        logoUrl = await Storage.get(response.key);

        // Split the URL to remove the query string (if any)
        logoUrl = logoUrl.split('?')[0];
      }

      // If the logo URL exists, update the company information using the company API
      if (clientData.logoUrl || logoUrl) {
        const logoPayload = {
          institutionid: institution,
          companyName: institution,
          PrimaryColor: clientData.PrimaryColor,
          SecondaryColor: clientData.SecondaryColor,
          logoUrl: logoUrl || clientData.logoUrl, // Use updated logo URL if available
          LightPrimaryColor: clientData.LightPrimaryColor,
          LightestPrimaryColor: clientData.LightestPrimaryColor,
        };

        await API.put("clients", "/user/development-form/company", { body: logoPayload });
      }

      // If email or address is present, update contact information using the contact API
      if (clientData.Query_EmailId || clientData.Query_Address) {
        const contactPayload = {
          institutionid: institution,
          Query_EmailId: clientData.Query_EmailId,
          Query_Address: clientData.Query_Address,
          country: clientData.country,
          userName: clientData.userName,
          Query_PhoneNumber: clientData.Query_PhoneNumber,
          Facebook: clientData.Facebook,
          Instagram: clientData.Instagram,
          YTLink: clientData.YTLink,
          UpiId: clientData.UpiId,
          Footer_Link_1: clientData.Footer_Link_1,
          Footer_Link_2: clientData.Footer_Link_2,
          InstructorBg: clientData.InstructorBg,
          SubscriptionBg: clientData.SubscriptionBg,
        };

        await API.put("clients", "/user/development-form/contact", { body: contactPayload });
      }

      Swal.fire({ icon: "success", title: "Changes Saved" });
    } catch (error) {
      console.error("Error saving details:", error);
      Swal.fire({ icon: "error", title: "Error", text: "An error occurred while saving." });
    } finally {
      setIsSaving(false);
      setIsEditing(false);
      fetchClientAndOwnerDetails(); // Refresh the data after saving
    }
  };

  const generateWebsiteLink = (institutionid) => {
    if (institutionid === "happyprancer") {
      return "happyprancer.com";
    } else if (institutionid === "bworkz") {
      return "https://bworkzlive.com/";
    } else {
      return `${institutionid}.happyprancer.com`;
    }
  };


  return (
    <div className="relative mt-8 bg-white rounded-md shadow-2xl overflow-hidden sm:flex max-w-4xl mx-auto h-[32rem] hover:shadow-xl w-[70vw]">
      <div className="sm:w-1/3 bg-gradient-to-br from-[#30afbc] to-[#64d5db] p-10 flex flex-col items-center justify-center">
        <div className="h-40 w-40 rounded-full border-4 border-white bg-white flex items-center justify-center shadow-lg relative">
          <img
            className="h-full w-full object-contain rounded-full"
            src={selectedFile}
            alt="Institute Logo"
          />
          {isEditing && (
            <>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="logoUpload"
              />
              <label
                htmlFor="logoUpload"
                className="absolute bottom-2 right-1 bg-gray-700 p-2 rounded-full cursor-pointer"
              >
                <FaPencilAlt className="text-white" size={16} />
              </label>
            </>
          )}
        </div>
        <h2 className="mt-6 text-white text-4xl font-extrabold">{clientData.institutionid}</h2>
        <p className="mt-2 text-white text-lg italic">Owner: {isEditing ? (
          <input
            type="text"
            name="userName"
            value={clientData.userName}
            onChange={handleInputChange}
            className="text-black w-full"
          />
        ) : clientData.userName}</p>
      </div>
      <div className="sm:w-2/3 p-10 flex flex-col justify-center bg-[#fafafa]">
        <button
          onClick={isEditing ? handleSaveChanges : () => setIsEditing(true)}
          className={`absolute top-3 right-3 ${isSaving ? 'bg-gray-400' : 'bg-[#30afbc]'} text-white rounded-lg p-2 hover:bg-[#64d5db] transition-all`}
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : isEditing ? 'Save' : 'Edit'}
        </button>
        <div className="mb-6">
          <h3 className="text-3xl font-semibold text-gray-800 border-b-2 border-gray-200 pb-2">Owner Details</h3>
          <div className="mt-8 space-y-6">
            <div className="flex justify-between text-gray-700">
              <span className="font-semibold">Phone:</span>
              <span className="text-gray-900">{clientData.phoneNumber}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span className="font-semibold">Email:</span>
              {isEditing ? (
                <input
                  type="text"
                  name="Query_EmailId"
                  value={clientData.Query_EmailId}
                  onChange={handleInputChange}
                  className="text-black w-full h-8 ml-4"
                />
              ) : (
                <span className="text-gray-900">{clientData.Query_EmailId}</span>
              )}
            </div>
            <div className="flex justify-between text-gray-700">
              <span className="font-semibold">Address:</span>
              {isEditing ? (
                <input
                  type="text"
                  name="Query_Address"
                  value={clientData.Query_Address}
                  onChange={handleInputChange}
                  className="text-black w-full h-8"
                />
              ) : (
                <span className="text-gray-900">{clientData.Query_Address}</span>
              )}
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
              <a href={`https://${generateWebsiteLink(clientData.institutionid)}`} className="text-teal-600 hover:underline">
                {generateWebsiteLink(clientData.institutionid)}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientsProfile;