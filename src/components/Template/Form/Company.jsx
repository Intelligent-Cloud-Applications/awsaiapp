import React, { useState } from "react";
import upload from "../../../utils/png/upload.png";

function Company({ clients, companyName, setCompanyName, PrimaryColor, setPrimaryColor, SecondaryColor, setSecondaryColor, logo, setLogo }) {
  // const [companyName, setCompanyName] = useState("");
  // const [domainName, setDomainName] = useState("");
  const [isCompanyInputVisible, setCompanyInputVisible] = useState(false);
  // const [isDomainInputVisible, setDomainInputVisible] = useState(false);
  // const [companyLineColor, setCompanyLineColor] = useState("#939393");
  // const [domainLineColor, setDomainLineColor] = useState("#939393");
  // const [logoUrl, setLogoUrl] = useState(null);
  const [companyLineColor, setCompanyLineColor] = useState("#939393");
  // const [domainLineColor, setDomainLineColor] = useState("#939393");
  


  const handleCompanyInputChange = (e) => {
    setCompanyName(e.target.value);
  };



  const toggleCompanyInputVisibility = () => {
    setCompanyInputVisible(true);
    setCompanyLineColor("#000000"); // Change company line color to black on click
  
     
  };

  // const toggleDomainInputVisibility = () => {
  //   setDomainLineColor("#000000"); // Change domain line color to black on click
  //   setCompanyInputVisible(false); // Hide company input when domain input is clicked
  //   setCompanyLineColor("#939393"); // Reset company line color
  // };

  //color
  // const [PrimaryColor, setPrimaryColor] = useState("#1B7571");

  const handleColorChange1 = (e) => {
    setPrimaryColor(e.target.value);
  };
  // const [SecondaryColor, setSecondaryColor] = useState("#000000");

  const handleColorChange2 = (e) => {
    setSecondaryColor(e.target.value);
  };

  //file
  const [selectedFile, setSelectedFile] = useState(null);
  const [isFileOptionVisible, setFileOptionVisible] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file instanceof File && (file.type.startsWith('image/') || file.type.startsWith('video/') || file.type.startsWith('audio/'))) {
      setLogo(file);
      setSelectedFile(URL.createObjectURL(file));
      }
  };

  const handleUploadImageClick = () => {
    const element = document.getElementById('yourElementId');
    element?.click();
  };

  const handleUploadImageMouseEnter = () => {
    setFileOptionVisible(true);
  };

  const handleUploadImageMouseLeave = () => {
    setFileOptionVisible(false);
  };

  return (
    <div className="px-8">
      <h1 className="font-medium text-7xl">COMPANY PROFILE</h1>
      <h5 class="w-[28rem] max950:w-[17rem]  text-[#939393]">
        Company profile, design preferences, and essential details for creating
        a tailored website experience.
        {/* {clients.map((client, index) => (
          <li key={index}>{client.amount}</li> // Adjust 'name' to the property you want to display
        ))} */}
      </h5>

      <div className="relative mt-6">
        <h5
          className="w-[28rem] text-[#939393] relative cursor-pointer py-1"
          onClick={toggleCompanyInputVisibility}
        >
          {isCompanyInputVisible ? (
            <input
              type="text"
              value={companyName}
              onChange={handleCompanyInputChange}
              className="w-[28rem] text-black border-none outline-none bg-transparent "
              placeholder="Enter Company Name"
              autoFocus
            />
          ) : (
            <span>{companyName || "Company Name"}</span>
          )}
        </h5>
        <div
          className="absolute left-0 right-0 bottom-0 h-[1.5px]"
          style={{ backgroundColor: companyLineColor }}
        ></div>
      </div>
      <div className="relative mt-6">
        
        {/* <div
          className="absolute left-0 right-0 bottom-0 h-[1.5px]"
          style={{ backgroundColor: domainLineColor }}
        ></div> */}
      </div>

      <div className="mt-8">
        <h4 className=" text-[#939393]">Choose Your Theme Color</h4>
        <div className="flex gap-8">
          <input
            type="color"
            value={PrimaryColor}
            onChange={handleColorChange1}
            class="rounded-full h-12 w-12 cursor-pointer border-none outline-none"
            alt=""
          />

          <input
            type="color"
            value={SecondaryColor}
            onChange={handleColorChange2}
            className="rounded-xl h-12 w-12 cursor-pointer border-none outline-none"
          />
        </div>
      </div>
      <div className="border border-black w-[15rem] h-[12rem] mt-6 relative">
        {!selectedFile ? (
          <label
            htmlFor="fileInput"
            className="cursor-pointer"
            onMouseEnter={handleUploadImageMouseEnter}
            onMouseLeave={handleUploadImageMouseLeave}
          >
            <img
              src={upload}
              alt="Upload"
              className="ml-[3.5rem] mt-10 w-[7rem] "
              onClick={handleUploadImageClick}
            />
            {isFileOptionVisible && (
              <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center">
                <input
                  type="file"
                  id="fileInput"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <h4 className="text-white ">Choose your file</h4>
              </div>
            )}
            <h4 className="text-[#939393] ml-[60px] text-[15px]">Upload your logo</h4>
          </label>
        ) : (
          <label
            htmlFor="fileInput"
            className="cursor-pointer"
            onMouseEnter={handleUploadImageMouseEnter}
            onMouseLeave={handleUploadImageMouseLeave}
          >
            <img
              src={selectedFile}
              alt="Uploaded"
              className="absolute top-0 left-0 w-[100%] h-[100%] cursor-pointer"
              onClick={handleUploadImageClick}
            />
            {isFileOptionVisible && (
              <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center">
                <input
                  type="file"
                  id="fileInput"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <h4 className="text-white">Choose your file</h4>
              </div>
            )}
          </label>
        )}
      </div>
    </div>
  );
}

export default Company;