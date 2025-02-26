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
const previewContainerClasses = "relative w-full h-full flex items-center justify-center p-4";
const imageWrapperClasses = "relative max-w-xs w-full h-full p-4";
const imageClasses = "max-h-full max-w-full object-contain";
const hoverOverlayClasses = "absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center";

const getImageData = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = (e) => reject(e);
    reader.readAsDataURL(file);
  });
};

const compressImage = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Set maximum dimensions
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 800;

        let width = img.width;
        let height = img.height;

        // Calculate new dimensions
        if (width > height) {
          if (width > MAX_WIDTH) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width = Math.round((width * MAX_HEIGHT) / height);
            height = MAX_HEIGHT;
          }
        }

        // Set canvas dimensions
        canvas.width = width;
        canvas.height = height;

        // Draw and compress
        ctx.drawImage(img, 0, 0, width, height);
        
        // Convert to JPEG with 0.7 quality
        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
        
        // Verify the size is under 1MB
        const sizeInMB = (compressedBase64.length * 0.75) / (1024 * 1024);
        if (sizeInMB > 1) {
          // If still too large, compress more
          resolve(canvas.toDataURL('image/jpeg', 0.5));
        } else {
          resolve(compressedBase64);
        }
      };

      img.onerror = reject;
    };

    reader.onerror = reject;
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
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    try {
      const savedLogo = localStorage.getItem('cafeFormLogo');
      if (savedLogo) {
        const { logo, fileName } = JSON.parse(savedLogo);
        if (logo) {
          console.log('Found saved logo in localStorage');
          setLocalLogo(logo);
          
          // Create File object from base64
          fetch(logo)
            .then(res => res.blob())
            .then(blob => {
              const file = new File([blob], fileName || 'logo.jpg', { type: 'image/jpeg' });
              setLogo(file);
              setSelectedLogo(file);
              console.log('Restored logo from localStorage');
            })
            .catch(error => {
              console.error('Error converting saved logo to File:', error);
            });
        }
      }
    } catch (error) {
      console.error('Error loading saved logo:', error);
    }
  }, []);

  useEffect(() => {
    return () => {
        // Cleanup object URLs when component unmounts
        if (localLogo && typeof localLogo === 'string' && localLogo.startsWith('blob:')) {
            URL.revokeObjectURL(localLogo);
        }
    };
  }, [localLogo]);

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

    try {
      setIsProcessing(true);
      setLocalLogo('loading');

      // Validate file
      if (!file.type.startsWith('image/')) {
        throw new Error('Please upload an image file');
      }

      // Compress the image
      const compressedBase64 = await compressImage(file);
      console.log('Image compressed successfully');

      // Save to localStorage
      const storageData = {
        logo: compressedBase64,
        fileName: file.name,
        timestamp: Date.now()
      };

      try {
        localStorage.setItem('cafeFormLogo', JSON.stringify(storageData));
        console.log('Image saved to localStorage');

        // Update states
        setLocalLogo(compressedBase64);
        setLogo(file); // Keep original for S3
        setSelectedLogo(file);
        setErrors(prev => ({ ...prev, logo: null }));
      } catch (storageError) {
        console.error('Failed to save to localStorage:', storageError);
        throw new Error('Failed to save image');
      }

    } catch (error) {
      console.error('Error handling logo:', error);
      setErrors(prev => ({
        ...prev,
        logo: error.message || 'Error processing image. Please try a different file.'
      }));
      setLocalLogo(null);
    } finally {
      setIsProcessing(false);
    }
  };

  const renderLogoPreview = () => {
    if (!localLogo) {
      return (
        <div className="flex flex-col items-center justify-center space-y-2">
          <FiUpload className={`w-8 h-8 ${errors.logo ? 'text-red-400' : 'text-[#30afbc]'}`} />
          <p className={`text-sm ${errors.logo ? 'text-red-500' : 'text-gray-500'}`}>
            Click to upload logo
          </p>
          <p className="text-xs text-gray-500">
            Maximum file size: 50MB
          </p>
          <p className="text-xs text-gray-500">
            Image will be compressed automatically
          </p>
        </div>
      );
    }

    if (localLogo === 'loading' || isProcessing) {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#30afbc]"></div>
        </div>
      );
    }

    return (
      <div className="relative w-full h-64 flex items-center justify-center">
        <div className="w-full h-full flex items-center justify-center p-4">
          <img
            src={localLogo}
            alt="Logo Preview"
            className="max-w-full max-h-full object-contain"
            onError={() => {
              console.error('Error loading image');
              setLocalLogo(null);
            }}
          />
        </div>
        <div className="absolute inset-0 bg-[#30afbc]/10 opacity-0 hover:opacity-100 transition-all duration-300 flex items-center justify-center">
          <div className="bg-white/95 px-4 py-2 rounded-md shadow-lg">
            <p className="text-[#30afbc] text-sm font-medium">
              Click to change logo
            </p>
          </div>
        </div>
      </div>
    );
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
              className={`flex flex-col items-center justify-center w-full h-64 ${
                errors.logo 
                  ? 'border-red-500' 
                  : 'border-[#e5e7eb] hover:border-[#30afbc]'
              } border-[2.5px] border-dashed rounded-lg cursor-pointer bg-gray-50/50 transition-all duration-300`}
            >
              <input
                id="logo-upload"
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                className="hidden"
              />
              {renderLogoPreview()}
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