import React from "react";
import "../../../pages/Template.css";
import { Label, TextInput, FileInput } from 'flowbite-react';

function Company({
  clients,
  companyName,
  setCompanyName,
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
  logoName,
  setLogoName,
}) {

  const handleCompanyInputChange = (e) => {
    setCompanyName(e.target.value);
  };
  const handleLogoNameChange = (e) => {
    setLogoName(e.target.value);
  };
  const handleinstitutionIdInputChange = (e) => {
    const value = e.target.value.toLowerCase();
    const validValue = value.replace(/[^a-z0-9]/g, '');
    setinstitutionId(validValue);
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

  return (
    <div className=" w-full mx-[2%] max-h-[76vh]" style={{ overflowY: 'auto' }}>
      <h1 className="font-medium text-7xl comphead text-center">Tell Us About Your Company</h1>
      <h5 className="text-[#939393] text-center">
        Company profile, design preferences, and essential details for creating a tailored website experience.
      </h5>

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

      </div>

      <div className="relative mt-2 px-[1px] mr-10">
        <div className="mb-2 block">
          <Label
            htmlFor="companyName"
            color="gray"
            value="Company Name"
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
          }}
        />
      </div>

      <div className="mt-2">
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
      <div className="mt-4">
        <label className="block text-[#939393] mb-2">Logo Name</label>
        <TextInput
          id="LogoName"
          placeholder="Enter Logo Name"
          required
          value={logoName}
          sizing="sm"
          onChange={handleLogoNameChange}
          style={{
            borderColor: "#D1D5DB",
            backgroundColor: "#F9FAFB",
            borderRadius: "8px",
          }}
        />
      </div>

      <div className="max-w-md relative">
        <div className="mb-2 block">
          <Label
            htmlFor="fileInput"
            value="Logo Upload File"
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
          }}
        />

      </div>
    </div>
  );
}

export default Company;
