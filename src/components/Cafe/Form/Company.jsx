import React, { useState, useEffect } from 'react';
import { Label, TextInput } from 'flowbite-react';
import { FiType, FiEdit2, FiUpload } from 'react-icons/fi';
import { GrCafeteria } from "react-icons/gr";
import { convertFileToBase64 } from '../../../utils/imageUtils';

const imagePreviewClasses = "relative group aspect-square rounded-lg overflow-hidden bg-gray-50";
const imageHoverClasses = "absolute inset-0 bg-[#30afbc]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center";
const uploadAreaClasses = "flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:border-[#30afbc] hover:bg-gray-50/80 transition-all duration-200";
const colorInputClasses = "opacity-0 absolute inset-0 w-full h-full cursor-pointer";
const colorLabelClasses = "mt-3 text-sm font-medium text-gray-600 text-center";
const colorWrapperClasses = "relative group flex flex-col items-center";
const colorPickerClasses = "w-16 h-16 rounded-full border-4 border-white shadow-md transition-transform hover:scale-110 cursor-pointer";
const colorEditIconClasses = "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none";

const getImageData = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

const Company = ({
  companyName,
  setCompanyName,
  institutionid,
  setinstitutionid,
  PrimaryColor,
  setPrimaryColor,
  SecondaryColor,
  setSecondaryColor,
  LightPrimaryColor,
  setLightPrimaryColor,
  LightestPrimaryColor,
  setLightestPrimaryColor,
  logo,
  setLogo,
  selectedLogo,
  setSelectedLogo
}) => {
  const [errors, setErrors] = useState({});
  const [localLogo, setLocalLogo] = useState(null);

  // Load logo from localStorage on mount
  useEffect(() => {
    const loadSavedLogo = async () => {
      try {
        const savedData = localStorage.getItem('cafeFormData');
        if (savedData) {
          const parsedData = JSON.parse(savedData);
          if (parsedData.logoData) {
            // Create a File object from the base64 data
            const response = await fetch(parsedData.logoData);
            const blob = await response.blob();
            const file = new File([blob], 'logo.png', { type: blob.type });
            
            // Set both the preview and the file
            setLogo(parsedData.logoData);
            setLocalLogo(parsedData.logoData);
            setSelectedLogo(file); // This is important for validation
          }
        }
      } catch (error) {
        console.error('Error loading logo:', error);
      }
    };

    loadSavedLogo();
  }, [setLogo, setSelectedLogo]);

  // Keep local state in sync with props
  useEffect(() => {
    if (logo) {
      setLocalLogo(logo);
    }
  }, [logo]);

  const validateCompanyData = () => {
    const newErrors = {};
    if (!companyName) {
      newErrors.companyName = "Company name is required.";
    }
    if (!institutionid) {
      newErrors.institutionid = "Institution ID is required.";
    }
    if (!logo) {
      newErrors.logo = "Company logo is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith('image/')) {
      setErrors(prev => ({ ...prev, logo: 'Please upload an image file' }));
      return;
    }

    // Check file size (4MB limit)
    if (file.size > 4 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, logo: 'File size should be less than 4MB' }));
      return;
    }

    try {
      // Convert file to base64 data URL
      const logoData = await getImageData(file);
      
      // Update both local and parent state
      setLocalLogo(logoData);
      setLogo(logoData);
      setSelectedLogo(file);
      
      // Clear any previous errors
      setErrors(prev => ({ ...prev, logo: null }));

      // Save to both storages
      const currentData = JSON.parse(localStorage.getItem('cafeFormData') || '{}');
      const updatedData = {
        ...currentData,
        logoData: logoData
      };
      
      localStorage.setItem('cafeFormData', JSON.stringify(updatedData));
      localStorage.setItem('cafeFormDraft', JSON.stringify(updatedData));
    } catch (error) {
      console.error('Error handling logo:', error);
      setErrors(prev => ({ ...prev, logo: 'Error uploading logo. Please try again.' }));
    }
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
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
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
          
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Logo <span className="text-red-500">*</span>
            </Label>
            <label
              htmlFor="logo-upload"
              className={`${uploadAreaClasses} ${errors.logo ? 'border-red-500' : ''}`}
            >
              <input
                id="logo-upload"
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                className="hidden"
              />
              {!localLogo ? (
                <div className="flex flex-col items-center justify-center space-y-2">
                  <FiUpload className={`w-8 h-8 ${errors.logo ? 'text-red-400' : 'text-gray-400'}`} />
                  <p className={`text-sm ${errors.logo ? 'text-red-500' : 'text-gray-500'}`}>
                    Click to upload logo
                  </p>
                  <p className="text-xs text-gray-500">
                    PNG, JPEG, or JPG (max. 4MB)
                  </p>
                </div>
              ) : (
                <div className={imagePreviewClasses}>
                  <img
                    src={localLogo}
                    alt="Logo Preview"
                    className="w-full h-full object-contain"
                  />
                  <div className={imageHoverClasses}>
                    <p className="text-white text-sm">Click to change logo</p>
                  </div>
                </div>
              )}
            </label>
            {errors.logo && (
              <p className="mt-2 text-sm text-red-500">{errors.logo}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Company;