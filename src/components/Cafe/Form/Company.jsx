import React, { useState } from 'react';
import { Label, TextInput } from 'flowbite-react';
import { FiType, FiEdit2, FiUpload } from 'react-icons/fi';
import { GrCafeteria } from "react-icons/gr";

const imagePreviewClasses = "relative group aspect-square rounded-lg overflow-hidden bg-gray-50";
const imageHoverClasses = "absolute inset-0 bg-[#30afbc]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center";
const uploadAreaClasses = "flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:border-[#30afbc] hover:bg-gray-50/80 transition-all duration-200";
const colorInputClasses = "opacity-0 absolute inset-0 w-full h-full cursor-pointer";
const colorLabelClasses = "mt-3 text-sm font-medium text-gray-600 text-center";
const colorWrapperClasses = "relative group flex flex-col items-center";
const colorPickerClasses = "w-16 h-16 rounded-full border-4 border-white shadow-md transition-transform hover:scale-110 cursor-pointer";
const colorEditIconClasses = "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none";

const Company = ({
  companyData,
  setCompanyData,
  institutionid,
  setinstitutionid,
  logo,
  setLogo,
  selectedLogo,
  setSelectedLogo,
  PrimaryColor,
  setPrimaryColor,
  SecondaryColor,
  setSecondaryColor,
  LightPrimaryColor,
  setLightPrimaryColor,
  LightestPrimaryColor,
  setLightestPrimaryColor
}) => {
  const [errors, setErrors] = useState({});

  const validateCompanyData = () => {
    const newErrors = {};
    if (!companyData.companyName) {
      newErrors.companyName = "Company name is required.";
    }
    if (!institutionid) {
      newErrors.institutionid = "Institution ID is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    // Check file size (4MB limit)
    if (file.size > 4 * 1024 * 1024) {
      alert('File size should be less than 4MB');
      return;
    }

    setSelectedLogo(file);
    setLogo(URL.createObjectURL(file));
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-50 mb-6">
          <GrCafeteria className="w-8 h-8 text-teal-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Company Info
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
         Empowering your vision with seamless web solutions
        </p>
      </div>

      <div className="space-y-8">
        {/* Basic Information */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <FiType className="w-5 h-5 text-teal-600" />
            Basic Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Company Name */}
            <div>
              <Label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
                Company Name <span className="text-red-500">*</span>
              </Label>
              <TextInput
                id="companyName"
                value={companyData.companyName}
                onChange={(e) => setCompanyData({ ...companyData, companyName: e.target.value })}
                placeholder="Enter your company name"
                required
                className="w-full bg-gray-50 border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 rounded-lg"
              />
              {errors.companyName && <p className="text-red-500">{errors.companyName}</p>}
            </div>

            {/* Institution ID */}
            <div>
              <Label htmlFor="institutionid" className="block text-sm font-medium text-gray-700 mb-1">
                Institution ID <span className="text-red-500">*</span>
              </Label>
              <TextInput
                id="institutionid"
                value={institutionid}
                onChange={(e) => setinstitutionid(e.target.value)}
                placeholder="Enter your institution ID"
                required
                className="w-full bg-gray-50 border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 rounded-lg"
              />
              {errors.institutionid && <p className="text-red-500">{errors.institutionid}</p>}
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
            {/* Primary Color */}
            <div className="relative group flex flex-col items-center">
              <div className="relative">
                <div 
                  className="w-16 h-16 rounded-full border-4 border-white shadow-md transition-transform hover:scale-110 cursor-pointer"
                  style={{ backgroundColor: PrimaryColor }}
                />
                <FiEdit2 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <input
                  type="color"
                  id="PrimaryColor"
                  value={PrimaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                  title="Choose primary color"
                />
              </div>
              <Label htmlFor="PrimaryColor" className="mt-3 text-sm font-medium text-gray-600 text-center">
                Primary Color
              </Label>
            </div>

            {/* Secondary Color */}
            <div className="relative group flex flex-col items-center">
              <div className="relative">
                <div 
                  className="w-16 h-16 rounded-full border-4 border-white shadow-md transition-transform hover:scale-110 cursor-pointer"
                  style={{ backgroundColor: SecondaryColor }}
                />
                <FiEdit2 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <input
                  type="color"
                  id="SecondaryColor"
                  value={SecondaryColor}
                  onChange={(e) => setSecondaryColor(e.target.value)}
                  className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                  title="Choose secondary color"
                />
              </div>
              <Label htmlFor="SecondaryColor" className="mt-3 text-sm font-medium text-gray-600 text-center">
                Secondary Color
              </Label>
            </div>

            {/* Light Primary Color */}
            <div className="relative group flex flex-col items-center">
              <div className="relative">
                <div 
                  className="w-16 h-16 rounded-full border-4 border-white shadow-md transition-transform hover:scale-110 cursor-pointer"
                  style={{ backgroundColor: LightPrimaryColor }}
                />
                <FiEdit2 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <input
                  type="color"
                  id="LightPrimaryColor"
                  value={LightPrimaryColor}
                  onChange={(e) => setLightPrimaryColor(e.target.value)}
                  className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                  title="Choose light primary color"
                />
              </div>
              <Label htmlFor="LightPrimaryColor" className="mt-3 text-sm font-medium text-gray-600 text-center">
                Light Primary
              </Label>
            </div>

            {/* Lightest Primary Color */}
            <div className="relative group flex flex-col items-center">
              <div className="relative">
                <div 
                  className="w-16 h-16 rounded-full border-4 border-white shadow-md transition-transform hover:scale-110 cursor-pointer"
                  style={{ backgroundColor: LightestPrimaryColor }}
                />
                <FiEdit2 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <input
                  type="color"
                  id="LightestPrimaryColor"
                  value={LightestPrimaryColor}
                  onChange={(e) => setLightestPrimaryColor(e.target.value)}
                  className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                  title="Choose lightest primary color"
                />
              </div>
              <Label htmlFor="LightestPrimaryColor" className="mt-3 text-sm font-medium text-gray-600 text-center">
                Lightest Primary
              </Label>
            </div>
          </div>
        </div>

        {/* Company Logo */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <FiUpload className="w-5 h-5 text-teal-600" />
            Company Logo
          </h2>
          
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="logo-upload"
              className={uploadAreaClasses}
            >
              {!logo ? (
                <>
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <FiUpload className="w-12 h-12 text-black" />
                    <h4 className="text-gray-500">
                      Upload your logo
                    </h4>
                    <p className="text-xs text-gray-500">
                      PNG, JPEG, or JPG (max. 4MB)
                    </p>
                  </div>
                </>
              ) : (
                <div className={imagePreviewClasses}>
                  <img
                    src={logo}
                    alt="Logo Preview"
                    className="w-full h-full object-contain"
                  />
                  <div className={imageHoverClasses}>
                    <p className="text-white text-sm">Click to change logo</p>
                  </div>
                </div>
              )}
              <input
                id="logo-upload"
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={handleLogoChange}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Company;