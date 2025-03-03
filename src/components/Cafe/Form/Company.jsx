import React, { useState, useEffect, useCallback } from 'react';
import { Label, TextInput } from 'flowbite-react';
import { FiType, FiEdit2, FiUpload } from 'react-icons/fi';
import { GrCafeteria } from "react-icons/gr";

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

  // Handle logo persistence
  useEffect(() => {
    const loadSavedLogo = async () => {
      const savedLogo = localStorage.getItem('cafeFormLogo');
      if (!savedLogo) return;

      try {
        const { logo: savedLogoData, fileName } = JSON.parse(savedLogo);
        if (!savedLogoData) return;

        setLocalLogo(savedLogoData);
        
        const response = await fetch(savedLogoData);
        const blob = await response.blob();
        const file = new File([blob], fileName || 'logo.jpg', { type: 'image/jpeg' });
        
        setLogo(file);
        setSelectedLogo(file);
      } catch (error) {
        console.error('Error loading saved logo:', error);
        // Clear invalid data from localStorage
        localStorage.removeItem('cafeFormLogo');
      }
    };

    loadSavedLogo();
  }, [setLogo, setSelectedLogo]); // Include dependencies

  // Generate Company ID
  useEffect(() => {
    const generateCompanyId = () => {
      if (!companyName?.length) return;

      const letters = companyName
        .replace(/[^a-zA-Z]/g, '')
        .slice(0, 4)
        .toUpperCase()
        .padEnd(4, 'X');
      const digits = Math.floor(1000 + Math.random() * 9000);
      
      setinstitutionid(`${letters}${digits}`);
    };

    generateCompanyId();
  }, [companyName, setinstitutionid]); // Include dependencies

  // Memoize logo change handler
  const handleLogoChange = useCallback(async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setIsProcessing(true);
      setLocalLogo('loading');

      if (!file.type.startsWith('image/')) {
        throw new Error('Please upload an image file');
      }

      const reader = new FileReader();
      reader.onload = async (event) => {
        const img = new Image();
        img.src = event.target.result;
        
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          const MAX_SIZE = 800;

          let width = img.width;
          let height = img.height;

          if (width > height && width > MAX_SIZE) {
            height = Math.round((height * MAX_SIZE) / width);
            width = MAX_SIZE;
          } else if (height > MAX_SIZE) {
            width = Math.round((width * MAX_SIZE) / height);
            height = MAX_SIZE;
          }

          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);

          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
          
          localStorage.setItem('cafeFormLogo', JSON.stringify({
            logo: compressedBase64,
            fileName: file.name
          }));

          setLocalLogo(compressedBase64);
          setLogo(file);
          setSelectedLogo(file);
          setErrors(prev => ({ ...prev, logo: null }));
        };
      };
      reader.readAsDataURL(file);

    } catch (error) {
      setErrors(prev => ({
        ...prev,
        logo: error.message || 'Error processing image'
      }));
      setLocalLogo(null);
    } finally {
      setIsProcessing(false);
    }
  }, [setLogo, setSelectedLogo]); // Include dependencies

  // Memoize logo preview renderer
  const renderLogoPreview = useCallback(() => {
    if (!localLogo) {
      return (
        <div className="flex flex-col items-center justify-center space-y-2">
          <FiUpload className={`w-8 h-8 ${errors.logo ? 'text-red-400' : 'text-[#30afbc]'}`} />
          <p className={`text-sm ${errors.logo ? 'text-red-500' : 'text-gray-500'}`}>
            Click to upload logo
          </p>
          <p className="text-xs text-gray-500">Maximum file size: 50MB</p>
          <p className="text-xs text-gray-500">Image will be compressed automatically</p>
        </div>
      );
    }

    if (localLogo === 'loading' || isProcessing) {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#30afbc]" />
        </div>
      );
    }

    return (
      <div className="relative w-full h-64 flex items-center justify-center">
        <img
          src={localLogo}
          alt="Logo Preview"
          className="max-w-full max-h-full object-contain p-4"
          onError={() => setLocalLogo(null)}
        />
        <div className="absolute inset-0 bg-[#30afbc]/10 opacity-0 hover:opacity-100 transition-all duration-300 flex items-center justify-center">
          <div className="bg-white/95 px-4 py-2 rounded-md shadow-lg">
            <p className="text-[#30afbc] text-sm font-medium">Click to change logo</p>
          </div>
        </div>
      </div>
    );
  }, [localLogo, isProcessing, errors.logo]); // Include dependencies

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-50 mb-6">
          <GrCafeteria className="w-8 h-8 text-teal-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Company Info</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Empowering your vision with seamless web solutions
        </p>
      </div>

      <div className="space-y-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <FiType className="w-5 h-5 text-teal-600" />
            Basic Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

            <div>
              <Label htmlFor="institutionid" className="block text-sm font-medium text-gray-700 mb-1">
                Company ID <span className="text-red-500">*</span>
              </Label>
              <TextInput
                id="institutionid"
                value={institutionid}
                readOnly
                className="w-full bg-gray-100 border border-gray-200 cursor-not-allowed rounded-lg"
              />
              <p className="mt-1 text-sm text-gray-500">Auto-generated based on company name</p>
              {errors.institutionid && <p className="text-red-500">{errors.institutionid}</p>}
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <FiEdit2 className="w-5 h-5 text-teal-600" />
            Theme Colors
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: PrimaryColor, onChange: setPrimaryColor, label: 'Primary Color' },
              { value: SecondaryColor, onChange: setSecondaryColor, label: 'Secondary Color' },
              { value: LightPrimaryColor, onChange: setLightPrimaryColor, label: 'Light Primary' },
              { value: LightestPrimaryColor, onChange: setLightestPrimaryColor, label: 'Lightest Primary' }
            ].map(({ value, onChange, label }, index) => (
              <div key={index} className="relative group flex flex-col items-center">
                <div className="relative">
                  <div 
                    className="w-16 h-16 rounded-full border-4 border-white shadow-md transition-transform hover:scale-110 cursor-pointer"
                    style={{ backgroundColor: value }}
                  />
                  <FiEdit2 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  <input
                    type="color"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
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
                errors.logo ? 'border-red-500' : 'border-[#e5e7eb] hover:border-[#30afbc]'
              }`}
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
            {errors.logo && <p className="mt-2 text-sm text-red-500">{errors.logo}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Company);