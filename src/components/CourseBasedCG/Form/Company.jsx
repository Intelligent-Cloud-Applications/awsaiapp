import React, { useState } from "react";
import "../../../pages/Template.css";
import { Label, TextInput } from 'flowbite-react';
import { FiType, FiEdit2, FiUpload } from 'react-icons/fi';
import { GrCafeteria } from "react-icons/gr";
import CountryList from "../../Auth/CountryList";
import Currency from "../../Auth/Currency";
import theme from "../../../theme";

// Constants
const MAX_FILE_SIZE_MB = 4;
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml'];

// Utility function for color contrast
const getContrastColor = (hexcolor) => {
  const hex = hexcolor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? '#000000' : '#ffffff';
};

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
  registrationFee,
  setRegistrationFee,
  registrationFeeCurrency,
  setRegistrationFeeCurrency,
  courseBasedCGCountry,
  setcourseBasedCGCountry
}) {
  const [errors, setErrors] = useState({});

  const handleInstitutionFormatChange = (e) => {
    setInstitutionFormat(e.target.value);
  };

  const handleCompanyInputChange = (e) => {
    const inputValue = e.target.value;
    setCompanyName(inputValue);
    const noSpaces = inputValue.replace(/\s+/g, '');
    const id = Math.floor(Math.random() * 9000) + 1000;
    const newid = noSpaces + id;
    setinstitutionId(newid);
  };

  const handleCompanyDescriptionChange = (e) => {
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
    if (!file) return;

    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > MAX_FILE_SIZE_MB) {
      setErrors(prev => ({ ...prev, logo: `File size exceeds ${MAX_FILE_SIZE_MB}MB. Please choose a smaller file.` }));
      return;
    }

    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      setErrors(prev => ({ ...prev, logo: "Invalid file type. Please select a JPG, JPEG, PNG, or SVG file." }));
      return;
    }

    setLogo(file);
    setSelectedFile(URL.createObjectURL(file));
    setErrors(prev => ({ ...prev, logo: null }));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-50 mb-6">
          <GrCafeteria className="w-8 h-8 text-teal-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Company Info</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Company profile, design preferences, and essential details for creating a tailored website experience.
        </p>
      </div>

      <div className="space-y-8">
        {/* Basic Information */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <FiType className="w-5 h-5 text-teal-600" />
            Basic Information
          </h2>
          
          <div className="grid grid-cols-1 gap-6">
            <div>
              <Label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
                Company Name <span className="text-red-500">*</span>
              </Label>
              <TextInput
                id="companyName"
                value={companyName || ''}
                onChange={handleCompanyInputChange}
                placeholder="Enter your company name"
                required
                className="w-full bg-gray-50 border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 rounded-lg"
              />
            </div>

            <div>
              <Label htmlFor="companyDescription" className="block text-sm font-medium text-gray-700 mb-1">
                Company Description <span className="text-red-500">*</span>
              </Label>
              <TextInput
                id="companyDescription"
                value={companyDescription || ''}
                onChange={handleCompanyDescriptionChange}
                placeholder="Enter company description"
                required
                className="w-full bg-gray-50 border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Theme Colors */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <FiEdit2 className="w-5 h-5 text-teal-600" />
            Theme Colors
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: PrimaryColor, onChange: handleColorChange1, label: 'Primary Color' },
              { value: SecondaryColor, onChange: (e) => setSecondaryColor(e.target.value), label: 'Secondary Color' },
              { value: LightPrimaryColor, onChange: (e) => setLightPrimaryColor(e.target.value), label: 'Light Primary' },
              { value: LightestPrimaryColor, onChange: (e) => setLightestPrimaryColor(e.target.value), label: 'Lightest Primary' }
            ].map(({ value, onChange, label }, index) => (
              <div key={index} className="relative group flex flex-col items-center">
                <div className="relative">
                  <div 
                    className="w-16 h-16 rounded-full border-4 border-white shadow-md transition-transform hover:scale-110 cursor-pointer"
                    style={{ backgroundColor: value }}
                  />
                  <FiEdit2 
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" 
                    style={{ color: getContrastColor(value) }}
                  />
                  <input
                    type="color"
                    value={value}
                    onChange={onChange}
                    className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                    title={`Choose ${label.toLowerCase()}`}
                  />
                </div>
                <Label className="mt-3 text-sm font-medium text-gray-600 text-center">
                  {label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Institution Format */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Institution Format</h2>
          <div className="space-y-4">
            <div>
              <Label className="block text-sm font-medium text-gray-700 mb-1">
                Select Format <span className="text-red-500">*</span>
              </Label>
              <select
                value={institutionFormat}
                onChange={handleInstitutionFormatChange}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 focus:ring-2 focus:ring-teal-200 focus:border-teal-500"
              >
                <option value="Online_Classes">Online Classes</option>
                <option value="Inperson_Classes">In-person Classes</option>
                <option value="Hybrid_Classes">Hybrid Classes</option>
              </select>
            </div>
          </div>
        </div>

        {/* Logo Upload */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <FiUpload className="w-5 h-5 text-teal-600" />
            Company Logo
          </h2>
          
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Logo <span className="text-red-500">*</span>
            </Label>
            <label
              htmlFor="logo-upload"
              className={`flex flex-col items-center justify-center w-full h-64 border-[2.5px] border-dashed rounded-lg cursor-pointer bg-gray-50/50 transition-all duration-300 ${
                errors.logo ? 'border-red-500' : 'border-[#e5e7eb] hover:border-teal-500'
              }`}
            >
              <input
                id="logo-upload"
                type="file"
                accept={ALLOWED_FILE_TYPES.join(',')}
                onChange={handleFileChange}
                className="hidden"
              />
              {selectedFile ? (
                <div className="relative w-full h-64 flex items-center justify-center">
                  <img
                    src={selectedFile}
                    alt="Logo Preview"
                    className="max-w-full max-h-full object-contain p-4"
                  />
                  <div className="absolute inset-0 bg-black/10 opacity-0 hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                    <div className="bg-white/95 px-4 py-2 rounded-md shadow-lg">
                      <p className="text-teal-600 text-sm font-medium">Click to change logo</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center space-y-2">
                  <FiUpload className={`w-8 h-8 ${errors.logo ? 'text-red-400' : 'text-teal-600'}`} />
                  <p className={`text-sm ${errors.logo ? 'text-red-500' : 'text-gray-500'}`}>
                    Click to upload logo
                  </p>
                  <p className="text-xs text-gray-500">Maximum file size: {MAX_FILE_SIZE_MB}MB</p>
                </div>
              )}
            </label>
            {errors.logo && <p className="mt-2 text-sm text-red-500">{errors.logo}</p>}
          </div>
        </div>

        {/* Country and Registration Fee */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Location & Fees</h2>
          <div className="space-y-6">
            <div>
              <Label className="block text-sm font-medium text-gray-700 mb-1">
                Country It is Based <span className="text-red-500">*</span>
              </Label>
              <select
                value={courseBasedCGCountry}
                onChange={(e) => setcourseBasedCGCountry(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 focus:ring-2 focus:ring-teal-200 focus:border-teal-500"
              >
                <option value="">Select Country</option>
                {<CountryList />}
              </select>
            </div>

            {courseBasedCGCountry && (
              <div className="space-y-4">
                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Currency <span className="text-red-500">*</span>
                  </Label>
                  <select
                    value={registrationFeeCurrency}
                    onChange={(e) => setRegistrationFeeCurrency(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 focus:ring-2 focus:ring-teal-200 focus:border-teal-500"
                  >
                    {<Currency />}
                  </select>
                </div>

                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-1">
                    Registration Fee <span className="text-red-500">*</span>
                  </Label>
                  <TextInput
                    type="number"
                    value={registrationFee}
                    onChange={(e) => setRegistrationFee(e.target.value)}
                    placeholder="Enter Registration Fee (e.g. 100)"
                    className="w-full bg-gray-50 border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 rounded-lg"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Company;
