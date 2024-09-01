import React, { useState } from "react";
import upload from "../../../utils/png/upload.png";
import "../../../pages/Template.css";

function Company({
  clients,
  companyName,
  setCompanyName,
  PrimaryColor,
  setPrimaryColor,
  SecondaryColor,
  setSecondaryColor,
  logo,
  setLogo,
  LightPrimaryColor,
  setLightPrimaryColor,
  LightestPrimaryColor,
  setLightestPrimaryColor,
  selectedFile,
  setSelectedFile,
  CSVFile,
  setCSVFile,
}) {
  const [isCompanyInputVisible, setCompanyInputVisible] = useState(false);
  const [companyLineColor, setCompanyLineColor] = useState("#939393");
  const [isFileOptionVisible, setFileOptionVisible] = useState(false);

  const handleCompanyInputChange = (e) => {
    setCompanyName(e.target.value);
  };

  const toggleCompanyInputVisibility = () => {
    setCompanyInputVisible(true);
    setCompanyLineColor("#000000"); // Change company line color to black on click
  };

  const handleColorChange1 = (e) => {
    setPrimaryColor(e.target.value);
  };

  const handleColorChange2 = (e) => {
    setSecondaryColor(e.target.value);
  };

  const handleColorChange3 = (e) => {
    setLightPrimaryColor(e.target.value);
  };

  const handleColorChange4 = (e) => {
    setLightestPrimaryColor(e.target.value);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileSizeMB = file.size / (1024 * 1024);
      if (fileSizeMB > 4) {
        alert("File size exceeds 4MB. Please choose a smaller file.");
        return;
      }
    }
    if (file instanceof File && (file.type.startsWith("image/") || file.type.startsWith("video/") || file.type.startsWith("audio/"))) {
      setLogo(file);
      setSelectedFile(URL.createObjectURL(file));
    }
  };

  const handleUploadImageClick = () => {
    const element = document.getElementById("fileInput");
    element?.click();
  };

  const handleUploadImageMouseEnter = () => {
    setFileOptionVisible(true);
  };

  const handleUploadImageMouseLeave = () => {
    setFileOptionVisible(false);
  };

  const handleCSVFlie = (e) => {
    const file = e.target.files[0];
    setCSVFile(file);
  }
  const shortenFileName1 = (file) => {
    if (!file || !file.name) return '';
    const maxLength = 15;
    const fileName = file.name;
    if (fileName.length > maxLength) {
      return `${fileName.substring(0, maxLength)}...`;
    }
    return fileName;
  };

  return (
    <div className="mx-auto max-w-[800px] company" style={{ overflowY: 'auto', maxHeight: '745px' }}>
      <h1 className="font-medium text-7xl comphead">Tell Us About Your Company</h1>
      <h5 className="w-[28rem] max950:w-[17rem] text-[#939393]">
        Company profile, design preferences, and essential details for creating a tailored website experience.
      </h5>

      <div className="relative mt-6 hidden">
        <h5
          className="w-[28rem] text-[#939393] relative cursor-pointer py-1"
          onClick={toggleCompanyInputVisibility}
        >
          {isCompanyInputVisible ? (
            <input
              type="text"
              value={companyName}
              onChange={handleCompanyInputChange}
              className="w-[28rem] text-black border-none outline-none bg-transparent"
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

      <div className="mt-8">
        <h4 className="text-[#939393]">Choose Your Theme Color</h4>
        <div className="flex gap-8">
          <input
            type="color"
            value={PrimaryColor}
            onChange={handleColorChange1}
            className="rounded-full h-12 w-12 cursor-pointer border-none outline-none colorbox"
          />

          <input
            type="color"
            value={SecondaryColor}
            onChange={handleColorChange2}
            className="rounded-xl h-12 w-12 cursor-pointer border-none outline-none colorbox"
          />
          <input
            type="color"
            value={LightPrimaryColor}
            onChange={handleColorChange3}
            className="rounded-xl h-12 w-12 cursor-pointer border-none outline-none colorbox"
          />
          <input
            type="color"
            value={LightestPrimaryColor}
            onChange={handleColorChange4}
            className="rounded-xl h-12 w-12 cursor-pointer border-none outline-none colorbox"
          />
        </div>
      </div>

      <div className="border border-black w-[15rem] h-[12rem] mt-6 relative boxtoselect">
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
              className="ml-[3.5rem] mt-10 w-[7rem]"
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
      <div className="relative flex items-center mt-6 ">
        <h2 className='font-bold'>Member List</h2>
        <div className='mr-16'></div>
        <input
          type="file"
          accept=".csv, .xls, .xlsx"
          // onChange={(e) => handleImageChange(setSubscriptionBg, e)}
          onChange={handleCSVFlie}
          className="hidden"
          id="CSVFileInput"
        />
        <label
          htmlFor="CSVFileInput"
          className="w-[150px] h-[25px] border border-[#3f3e3e] flex items-center justify-center cursor-pointer relative"
          style={{
            borderColor: 'cement',
            borderWidth: '2px',
            borderStyle: 'solid',
            backgroundColor: '#D9D9D9',
          }}
        >
          <span
            className={`block text-[#000000] font-inter text-[14px] ${CSVFile ? 'hidden' : 'block'
              }`}
          >
            Choose File
          </span>
          <div
            className={`absolute top-0 left-0 right-0 bottom-0 flex items-center justify-between px-2 truncate ${CSVFile ? 'block' : 'hidden'
              }`}
          >
            <span className="text-[#636262]">
              {shortenFileName1(CSVFile)}
            </span>
            <span
              onClick={() => setCSVFile(null)}
              className="text-[#3b9d33] cursor-pointer"
            >
              Change
            </span>
          </div>
        </label>
      </div>
      <p className='text-[18px] text-[#ff0000] mb-[3rem]'>
        ( *Upload a .csv/.xsl/.xsls file here it should have the Columns institution, phoneNumber, emailId, userName, country, joiningDate, status:Active or Inactive)
      </p>

    </div>
  );
}

export default Company;
