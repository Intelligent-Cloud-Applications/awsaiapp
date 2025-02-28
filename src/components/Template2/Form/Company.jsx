import React from "react";
import "../../../pages/Template.css";
import { Label, TextInput, FileInput } from 'flowbite-react';
import theme from "../../../theme";

function Company({
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
}) {

  const handleCompanyInputChange = (e) => {
    const inputValue = e.target.value; // Get the value from the event
    setCompanyName(inputValue);  // Set the state with the input value

    const noSpaces = inputValue.replace(/\s+/g, ''); // Removes all white spaces from the input value
    const id = Math.floor(Math.random() * 9000) + 1000; // Generate a random 4-digit number
    const newid = noSpaces + id;  // Combine the two parts to form the new ID

    setinstitutionId(newid);  // Update the institution ID state

    console.log("newid", institutionId);  // Log the new ID, not the outdated institutionId state
  };

  const handleCompanyDescriptionInputChange = (e) => {
    setCompanyDescription(e.target.value);
  };
  // const handleinstitutionIdInputChange = (e) => {
  //   const value = e.target.value.toLowerCase();
  //   const validValue = value.replace(/[^a-z0-9]/g, '');
  //   setinstitutionId(validValue);
  // };

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

  return (
    <div className=" w-full h-[auto] mb-[2rem]" style={{ overflowY: 'auto' }}>
      <h1 className="font-medium text-7xl comphead text-center">Company Profile</h1>
      <h5 className="text-[#939393] text-center">
        Company profile, design preferences, and essential details for creating a tailored website experience.
      </h5>
      {/* <div className="relative mt-6 px-[1px] mr-10">
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
        <div className="w-[60%] p-8 [@media(max-width:1024px)]:w-full [@media(max-width:1024px)]:p-0 [@media(max-width:1024px)]:mb-5">
          <div className="relative mt-2 px-[1px] mr-10 text-[24px]">
            <div className="mb-2 block">
              <Label htmlFor="companyName" color="gray" value="Company Name" className='font-medium text-xl' />
              <span className="text-red-500 ml-1">*</span>
            </div>
            <TextInput
              id="companyName"
              placeholder="Enter company Name"
              required
              value={companyName}
              onChange={handleCompanyInputChange}
              style={{
                borderColor: "#D1D5DB",
                backgroundColor: "#F9FAFB",
                borderRadius: "8px",
              }}
            />
          </div>
          <div className="relative mt-2 px-[1px] mr-10">
            <div className="mb-2 block">
              <Label
                htmlFor="companyDescription"
                color="gray"
                value="Company Description"
                className='font-medium text-xl'
              />
              <span className="text-red-500 ml-1">*</span>
            </div>
            <TextInput
              id="companyDescription"
              placeholder="Enter company Description"
              required
              value={companyDescription}
              onChange={handleCompanyDescriptionInputChange}
              style={{
                borderColor: "#D1D5DB",
                backgroundColor: "#F9FAFB",
                borderRadius: "8px",
              }}
            />
          </div>

          <div className="mt-4">
            <h4 className="font-medium text-xl">Choose Your Theme Color</h4>
            <div className="flex gap-8 mt-2">
              <input
                type="color"
                value={PrimaryColor}
                onChange={handleColorChange1}
                className="rounded-xl h-12 w-12 cursor-pointer border-none outline-none colorbox"
              />

              <input
                type="color"
                onChange={handleSecondarycolor}
                value={SecondaryColor}
                className="rounded-xl h-12 w-12 cursor-pointer border-none outline-none colorbox"
              />
              <input
                type="color"
                onChange={handleLightcolor}
                value={LightPrimaryColor}
                className="rounded-xl h-12 w-12 cursor-pointer border-none outline-none colorbox"
              />
              <input
                type="color"
                onChange={handleLitestcolor}
                value={LightestPrimaryColor}
                className="rounded-xl h-12 w-12 cursor-pointer border-none outline-none colorbox"
              />
            </div>
          </div>

          <div className="max-w-md relative mt-4">
            <div className="mb-2 block">
              <Label htmlFor="fileInput" value="Logo Upload File" className='font-medium text-xl' />
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
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Company;