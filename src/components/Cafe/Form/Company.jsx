import React from 'react';
import { Label, TextInput, FileInput } from 'flowbite-react';
import { FiUpload } from 'react-icons/fi';

const Company = ({
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
  LightestPrimaryColor,
  setLightestPrimaryColor,
  LightPrimaryColor,
  setLightPrimaryColor,
  selectedFile,
  setSelectedFile,
  companyDescription,
  setCompanyDescription,
}) => {
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) {
        alert('File size should not exceed 4MB');
        return;
      }
      if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
        alert('Please upload a valid image file (JPG, JPEG, or PNG)');
        return;
      }
      setLogo(file);
      setSelectedFile(URL.createObjectURL(file));
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Company Profile</h1>
        <p className="text-gray-600">
          Create your company profile, design preferences, and essential details for a tailored website experience.
        </p>
      </div>

      <div className="space-y-8">
        {/* Company Name */}
        <div>
          <Label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
            Company Name <span className="text-red-500">*</span>
          </Label>
          <TextInput
            id="companyName"
            type="text"
            value={companyName || ''}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Enter your company name"
            required
            className="w-full bg-gray-50 border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 rounded-lg"
          />
        </div>

        {/* Company Description */}
        <div>
          <Label htmlFor="companyDescription" className="block text-sm font-medium text-gray-700 mb-1">
            Company Description <span className="text-red-500">*</span>
          </Label>
          <textarea
            id="companyDescription"
            value={companyDescription || ''}
            onChange={(e) => setCompanyDescription(e.target.value)}
            placeholder="Enter a brief description of your company"
            required
            rows={4}
            className="w-full bg-gray-50 border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 rounded-lg p-2.5"
          />
        </div>

        {/* Theme Colors */}
        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-4">
            Theme Colors <span className="text-red-500">*</span>
          </Label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <Label htmlFor="primaryColor" className="block text-sm text-gray-600 mb-2">Primary</Label>
              <input
                type="color"
                id="primaryColor"
                value={PrimaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="w-full h-12 rounded-lg cursor-pointer border-2 border-gray-200 focus:border-teal-500"
              />
            </div>
            <div>
              <Label htmlFor="secondaryColor" className="block text-sm text-gray-600 mb-2">Secondary</Label>
              <input
                type="color"
                id="secondaryColor"
                value={SecondaryColor}
                onChange={(e) => setSecondaryColor(e.target.value)}
                className="w-full h-12 rounded-lg cursor-pointer border-2 border-gray-200 focus:border-teal-500"
              />
            </div>
            <div>
              <Label htmlFor="lightPrimaryColor" className="block text-sm text-gray-600 mb-2">Light Primary</Label>
              <input
                type="color"
                id="lightPrimaryColor"
                value={LightPrimaryColor}
                onChange={(e) => setLightPrimaryColor(e.target.value)}
                className="w-full h-12 rounded-lg cursor-pointer border-2 border-gray-200 focus:border-teal-500"
              />
            </div>
            <div>
              <Label htmlFor="lightestPrimaryColor" className="block text-sm text-gray-600 mb-2">Lightest Primary</Label>
              <input
                type="color"
                id="lightestPrimaryColor"
                value={LightestPrimaryColor}
                onChange={(e) => setLightestPrimaryColor(e.target.value)}
                className="w-full h-12 rounded-lg cursor-pointer border-2 border-gray-200 focus:border-teal-500"
              />
            </div>
          </div>
        </div>

        {/* Company Logo */}
        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-4">
            Company Logo <span className="text-red-500">*</span>
          </Label>
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="logo-upload"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              {selectedFile ? (
                <div className="relative w-full h-full p-4">
                  <img
                    src={selectedFile}
                    alt="Company Logo"
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <p className="text-white text-sm">Click to change logo</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <FiUpload className="w-10 h-10 text-gray-400 mb-3" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG or JPEG (MAX. 4MB)</p>
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

        {/* Institution ID */}
        <div>
          <Label htmlFor="institutionId" className="block text-sm font-medium text-gray-700 mb-1">
            Institution ID <span className="text-red-500">*</span>
          </Label>
          <TextInput
            id="institutionId"
            type="text"
            value={institutionId || ''}
            onChange={(e) => setinstitutionId(e.target.value)}
            placeholder="Enter your institution ID"
            required
            className="w-full bg-gray-50 border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Company;
