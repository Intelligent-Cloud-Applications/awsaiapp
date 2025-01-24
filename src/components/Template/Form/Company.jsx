import React from "react";
import "../../../pages/Template.css";
import { Label, TextInput, FileInput } from 'flowbite-react';
import theme from "../../../theme";

function Company({
  clients,
  companyName,
  setCompanyName,
  companyDescription,
  setCompanyDescription,
  institutionId,
  setinstitutionId,
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
  setInstitutionFormat,
  institutionFormat,

}) {



  const handleInstitutionFormatChange = (e) => {
    setInstitutionFormat(e.target.value);
  };
  const handleCompanyInputChange = (e) => {
    const inputValue = e.target.value; // Get the value from the event
    setCompanyName(inputValue);  // Set the state with the input value    
    const noSpaces = inputValue.replace(/\s+/g, ''); // Removes all white spaces from the input value
    const id = Math.floor(Math.random() * 9000) + 1000; // Generate a random 4-digit number
    const newid = noSpaces + id;  // Combine the two parts to form the new ID

    setinstitutionId(newid);  // Update the institution ID state
    console.log("newid", institutionId);  // Log the new ID, not the outdated institutionId state

  };

  const handleCompanyDescriptionChange = (e) => {
    const inputValue = e.target.value; // Get the value from the event
    setCompanyDescription(inputValue);  // Set the state with the input value    
  };

  const handleColorChange1 = (e) => {
    setPrimaryColor(e.target.value);
    const generatedTheme = theme(PrimaryColor);
    setSecondaryColor(generatedTheme.secondary);
    setLightPrimaryColor(generatedTheme.accent);
    setLightestPrimaryColor(generatedTheme.background);
  };


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileSizeMB = file.size / (1024 * 1024);
      if (fileSizeMB > 4) {
        alert("File size exceeds 4MB. Please choose a smaller file.");
        return;
      }

      const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/svg+xml"];
      if (file instanceof File && validTypes.includes(file.type)) {
        setLogo(file);
        setSelectedFile(URL.createObjectURL(file));
      } else {
        alert("Invalid file type. Please select a JPG, JPEG, PNG, or SVG file.");
        setLogo(null);
        setSelectedFile(null);
        event.target.value = "";
      }
    }
  };

  const handleSecondarycolor = (e) => {
    setSecondaryColor(e.target.value);
  };
  const handleLightcolor = (e) => {
    setLightPrimaryColor(e.target.value);
  };
  const handleLitestcolor = (e) => {
    setLightestPrimaryColor(e.target.value);
  };

  // const handleCSVFlie = (e) => {
  //   const file = e.target.files[0];
  //   setCSVFile(file);
  // }
  // const shortenFileName1 = (file) => {
  //   if (!file || !file.name) return '';
  //   const maxLength = 15;
  //   const fileName = file.name;
  //   if (fileName.length > maxLength) {
  //     return `${fileName.substring(0, maxLength)}...`;
  //   }
  //   return fileName;
  // };

  return (
    <div className=" w-full h-[auto] mb-[2rem]">
      <h1 className="font-medium text-7xl comphead text-center">Company Profile</h1>
      <h5 className="text-[#939393] text-center">
        Company profile, design preferences, and essential details for creating a tailored website experience.
      </h5>
      {/* <h5 className="w-[28rem] max950:w-[17rem] text-[#939393]">
        Company profile, design preferences, and essential details for creating a tailored website experience.
      </h5> */}
      {/* 
      <div className="relative mt-6 px-[1px] mr-10">
        <div className="mb-2 block">
          <Label
            htmlFor="institutionid"
            color="gray"
            value="Institution ID"
          />
          <span className="text-red-500 ml-1">*</span>
        </div>
        <TextInput
          id="institutionid"
          placeholder="Enter institution ID"
          required
          value={institutionId}
          sizing="sm"
          helperText="This input will only accept lowercase letters and numbers. No spaces or uppercase letters will be allowed.it wil not chnageble later"
          onChange={handleinstitutionIdInputChange}
          style={{
            borderColor: "#D1D5DB",
            backgroundColor: "#F9FAFB",
            borderRadius: "8px",
          }}
        />

      </div> */}

      <div className="flex justify-center [@media(max-width:1024px)]:flex-none [@media(max-width:1024px)]:justify-start">
        <div className="w-[50%] p-8 [@media(max-width:1024px)]:w-full [@media(max-width:1024px)]:p-0 [@media(max-width:1024px)]:mb-5">
          <div className="relative mt-2 px-[1px] mr-10 text-[24px]">
            <div className="mb-2 block">
              <Label
                htmlFor="companyName"
                color="gray"
                value="Company Name"
                className="font-medium text-xl"
              />
              <span className="text-red-500 ml-1">*</span>
            </div>
            <TextInput
              id="companyName"
              placeholder="Enter company Name"
              required
              value={companyName}
              sizing="sm"
              onChange={handleCompanyInputChange}
              style={{
                borderColor: "#D1D5DB",
                backgroundColor: "#F9FAFB",
                borderRadius: "8px",
                width: "30rem",
                ...(window.matchMedia("(max-width: 1024px)").matches && {
                  width: "100%",
                }),
              }}
            />
          </div>
          <div className="relative mt-2 px-[1px] mr-10 text-[24px]">
            <div className="mb-2 block">
              <Label
                htmlFor="companyDescription"
                color="gray"
                value="Company Description"
                className="font-medium text-xl"
              />
              <span className="text-red-500 ml-1">*</span>
            </div>
            <TextInput
              id="companyDescription"
              placeholder="Enter company Description"
              required
              value={companyDescription}
              sizing="sm"
              onChange={handleCompanyDescriptionChange}
              style={{
                borderColor: "#D1D5DB",
                backgroundColor: "#F9FAFB",
                borderRadius: "8px",
                width: "30rem",
                ...(window.matchMedia("(max-width: 1024px)").matches && {
                  width: "100%",
                }),
              }}
            />
          </div>
          <div className="mt-2">
            <div className="mb-2 block">
              <Label
                color="gray"
                value="Choose Your Theme Color"
                className="font-medium text-xl"
              />
              <span className="text-red-500 ml-1">*</span>
            </div>
            <div className="flex gap-8">
              <input
                type="color"
                value={PrimaryColor}
                onChange={handleColorChange1}
                className="rounded-xl h-12 w-12 cursor-pointer border-none outline-none colorbox"
              />

              <input
                type="color"
                value={SecondaryColor}
                onChange={handleSecondarycolor}
                className="rounded-xl h-12 w-12 cursor-pointer border-none outline-none colorbox"
              />
              <input
                type="color"
                value={LightPrimaryColor}
                onChange={handleLightcolor}
                className="rounded-xl h-12 w-12 cursor-pointer border-none outline-none colorbox"
              />
              <input
                type="color"
                value={LightestPrimaryColor}
                onChange={handleLitestcolor}
                className="rounded-xl h-12 w-12 cursor-pointer border-none outline-none colorbox"
              />
            </div>
          </div>
          {/* <div className="mt-4">
        <label className="block text-[#939393] mb-2">Select Institution Type</label>
        <select
          value={institutionType}
          onChange={handleInstitutionTypeChange}
          className="w-[28rem] max950:w-[17rem] bg-white border border-[#939393] rounded-md p-2"
        >
          <option value="DanceStudio">Dance Studio</option>
          <option value="Dentist">Dentist</option>
        </select>
      </div> */}

          {/* Dropdown for Institution Format */}
          <div className="mt-4">
            <div className="mb-2 block">
              <Label
                color="gray"
                value="Select Institution Format"
                className="font-medium text-xl"
              />
              <span className="text-red-500 ml-1">*</span>
            </div>
            <select
              value={institutionFormat}
              onChange={handleInstitutionFormatChange}
              className="w-[30rem] max950:w-[17rem] bg-white border border-[#939393] rounded-md p-2 [@media(max-width:1024px)]:w-full"
            >
              <option value="Online_Classes">Online Classes</option>
              <option value="Inperson_Classes">Inperson Classes</option>
              <option value="Hybrid_Classes">Hybrid Classes</option>
            </select>
          </div>

          <div className="max-w-md relative mt-4">
            <div className="mb-2 block">
              <Label
                htmlFor="fileInput"
                value="Logo Upload File"
                className="font-medium text-xl"
              />
              <span className="text-red-500 ml-1">*</span>
            </div>
            <FileInput
              id="fileInput"
              onChange={handleFileChange}
              helperText={selectedFile ? selectedFile.name : "It’s the logo of the company"}
              style={{
                borderColor: "#D1D5DB",
                backgroundColor: "#F9FAFB",
                borderRadius: "8px",
                width: "30rem",
                ...(window.matchMedia("(max-width: 1024px)").matches && {
                  width: "100%",
                }),
              }}
            />

          </div>
          {/* <div className="relative flex items-center mt-4 ">
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
      </p> */}

        </div>
      </div>
    </div>
  );
}

export default Company;
