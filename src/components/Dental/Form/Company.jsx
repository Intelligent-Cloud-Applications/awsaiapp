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

  return (
    <div className="w-full min-h-screen px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-medium text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center mb-4">
          Company Profile
        </h1>
        <p className="text-[#939393] text-center text-sm sm:text-base mb-8 px-4">
          Company profile, design preferences, and essential details for creating a tailored website experience.
        </p>

        <div className="bg-white shadow-sm rounded-lg p-4 sm:p-6 lg:p-8">
          <div className="space-y-6">
            <div>
              <Label 
                htmlFor="companyName" 
                className="block text-sm sm:text-base font-medium text-gray-700 mb-2"
              >
                Company Name 
                <span className="text-red-500 ml-1">*</span>
              </Label>
              <TextInput
                id="companyName"
                placeholder="Enter company name"
                required
                value={companyName}
                onChange={handleCompanyInputChange}
                className="w-full"
                sizing="md"
              />
            </div>

            <div>
              <Label 
                htmlFor="companyDescription" 
                className="block text-sm sm:text-base font-medium text-gray-700 mb-2"
              >
                Company Description 
                <span className="text-red-500 ml-1">*</span>
              </Label>
              <TextInput
                id="companyDescription"
                placeholder="Enter company description"
                required
                value={companyDescription}
                onChange={handleCompanyDescriptionInputChange}
                className="w-full"
                sizing="md"
              />
            </div>

            <div>
              <h4 className="text-sm sm:text-base font-medium text-gray-700 mb-4">
                Choose Your Theme Color
              </h4>
              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex items-center space-x-2">
                  <label className="text-xs sm:text-sm">Primary</label>
                  <input
                    type="color"
                    value={PrimaryColor}
                    onChange={handleColorChange1}
                    className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg cursor-pointer"
                  />
                </div>
                {[
                  { color: SecondaryColor, label: 'Secondary' },
                  { color: LightPrimaryColor, label: 'Light' },
                  { color: LightestPrimaryColor, label: 'Lightest' }
                ].map(({ color, label }) => (
                  <div key={label} className="flex items-center space-x-2">
                    <label className="text-xs sm:text-sm">{label}</label>
                    <input
                      type="color"
                      readOnly
                      value={color}
                      className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg cursor-not-allowed opacity-70"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label 
                htmlFor="fileInput" 
                className="block text-sm sm:text-base font-medium text-gray-700 mb-2"
              >
                Logo Upload 
                <span className="text-red-500 ml-1">*</span>
              </Label>
              <div className="w-full sm:w-[80%] md:w-[70%]">
                <FileInput
                  id="fileInput"
                  onChange={handleFileChange}
                  helperText={selectedFile ? "Logo selected" : "Upload company logo (JPG, JPEG, PNG, or SVG)"}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Company;