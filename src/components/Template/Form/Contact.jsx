import React, { useState } from 'react';
import Country from '../../Auth/Country';
import { Label, TextInput } from 'flowbite-react';
import { FiPhone, FiMapPin, FiGlobe, FiUpload } from 'react-icons/fi';

// Constants
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\+?[\d\s-]{8,15}$/;

// Add phone formatting function
const formatPhoneNumber = (value) => {
  const cleaned = value.replace(/[^\d+]/g, '');
  const normalizedNumber = cleaned.startsWith('+') 
    ? cleaned
    : cleaned.replace(/\+/g, '');
  const groups = normalizedNumber.match(/.{1,4}/g) || [];
  return groups.join(' ').trim();
};

function Contact({ contactInfo, setContactInfo, SubscriptionBg, setSubscriptionBg, InstructorBg, setInstructorBg }) {
  const [selectedCountryCode, setSelectedCountryCode] = useState('+91');
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    switch (name) {
      case 'emailId':
        return !EMAIL_REGEX.test(value) ? 'Please enter a valid email address' : '';
      case 'phoneNumber':
        return !PHONE_REGEX.test(value.replace(/\s/g, '')) ? 'Please enter a valid phone number' : '';
      default:
        return value.trim() ? '' : 'This field is required';
    }
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
    setContactInfo({ ...contactInfo, [name]: value });
  };

  const handleCountryChange = (e) => {
    const selectedCountry = e.target.options[e.target.selectedIndex].text;
    const selectedCountryCode = e.target.value;
    setContactInfo(prevInfo => ({
      ...prevInfo,
      country: selectedCountry.split(' ')[0],
      countryCode: selectedCountryCode
    }));
    setSelectedCountryCode(selectedCountryCode);
  };

  const handleFileChange = (setter) => (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > 4) {
      alert("File size exceeds 4MB. Please choose a smaller file.");
      return;
    }

    setter(file);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-50 mb-6">
          <FiPhone className="w-8 h-8 text-teal-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Contact Information</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Provide your contact details to help students and visitors connect with your dance studio.
        </p>
      </div>

      <div className="space-y-8">
        {/* Basic Contact Info */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <FiPhone className="w-5 h-5 text-teal-600" />
            Basic Contact Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Owner Name */}
            <div>
              <Label htmlFor="ownerName" className="block text-sm font-medium text-gray-700 mb-1">
                Owner Name <span className="text-red-500">*</span>
              </Label>
              <TextInput
                id="ownerName"
                name="ownerName"
                value={contactInfo["Owner Name"] || ''}
                onChange={(e) => setContactInfo({ ...contactInfo, "Owner Name": e.target.value })}
                placeholder="Enter owner name"
                required
                className={`w-full ${errors.ownerName ? 'border-red-500' : ''}`}
              />
              {errors.ownerName && (
                <p className="mt-1 text-sm text-red-500">{errors.ownerName}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="emailId" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address <span className="text-red-500">*</span>
              </Label>
              <TextInput
                id="emailId"
                name="emailId"
                type="email"
                value={contactInfo.email || ''}
                onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                placeholder="Enter email address"
                required
                className={`w-full ${errors.emailId ? 'border-red-500' : ''}`}
              />
              {errors.emailId && (
                <p className="mt-1 text-sm text-red-500">{errors.emailId}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <Label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number <span className="text-red-500">*</span>
              </Label>
              <div className="flex gap-4">
                <select
                  value={selectedCountryCode}
                  onChange={handleCountryChange}
                  className="w-[30%] rounded-lg border border-gray-200 bg-gray-50 focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
                >
                  <Country />
                </select>
                <TextInput
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  value={contactInfo.phoneNumber || ''}
                  onChange={handleContactChange}
                  placeholder="Enter phone number"
                  className={`w-[70%] ${errors.phoneNumber ? 'border-red-500' : ''}`}
                />
              </div>
              {errors.phoneNumber && (
                <p className="mt-1 text-sm text-red-500">{errors.phoneNumber}</p>
              )}
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <FiMapPin className="w-5 h-5 text-teal-600" />
            Studio Location
          </h2>

          <div className="space-y-6">
            <div>
              <Label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Studio Address <span className="text-red-500">*</span>
              </Label>
              <TextInput
                id="address"
                name="address"
                value={contactInfo.address || ''}
                onChange={handleContactChange}
                placeholder="Enter your studio address"
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <FiGlobe className="w-5 h-5 text-teal-600" />
            Social Media Links
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {['facebook', 'instagram', 'youtube'].map((platform) => (
              <div key={platform}>
                <Label htmlFor={platform} className="block text-sm font-medium text-gray-700 mb-1">
                  {platform.charAt(0).toUpperCase() + platform.slice(1)}
                </Label>
                <TextInput
                  id={platform}
                  name={platform}
                  value={contactInfo[platform] || ''}
                  onChange={handleContactChange}
                  placeholder={`Enter your ${platform} profile URL`}
                  className="w-full"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Background Images */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <FiUpload className="w-5 h-5 text-teal-600" />
            Background Images
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Subscription Background */}
            <div>
              <Label className="block text-sm font-medium text-gray-700 mb-2">
                Subscription Background
              </Label>
              <label
                htmlFor="SubscriptionBgInput"
                className="flex items-center justify-center w-full h-12 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <input
                  id="SubscriptionBgInput"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange(setSubscriptionBg)}
                  className="hidden"
                />
                <span className="text-sm text-gray-600">
                  {SubscriptionBg ? SubscriptionBg.name : 'Choose file'}
                </span>
              </label>
            </div>

            {/* Instructor Background */}
            <div>
              <Label className="block text-sm font-medium text-gray-700 mb-2">
                Instructor Background
              </Label>
              <label
                htmlFor="InstructorBgInput"
                className="flex items-center justify-center w-full h-12 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <input
                  id="InstructorBgInput"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange(setInstructorBg)}
                  className="hidden"
                />
                <span className="text-sm text-gray-600">
                  {InstructorBg ? InstructorBg.name : 'Choose file'}
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
