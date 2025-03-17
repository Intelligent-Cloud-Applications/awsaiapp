import React, { useState } from 'react';
import Country from '../../Auth/Country';
import { Label, TextInput } from 'flowbite-react';
import { FiPhone, FiMail, FiMapPin, FiUser, FiDollarSign, FiInstagram, FiFacebook, FiYoutube, FiUpload } from 'react-icons/fi';

function Contact({ contactInfo, setContactInfo, SubscriptionBg, setSubscriptionBg, InstructorBg, setInstructorBg }) {
  const [selectedCountryCode, setSelectedCountryCode] = useState('+91');
  const [errors, setErrors] = useState({});
  const [activeContactIndex, setActiveContactIndex] = useState(null);

  const handleContactChange = (e) => {
    const { name, value } = e.target;
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

  const handlePhoneNumberChange = (e) => {
    setContactInfo(prevInfo => ({
      ...prevInfo,
      phoneNumber: e.target.value
    }));
  };

  const toggleActiveContact = (index) => {
    setActiveContactIndex(index === activeContactIndex ? null : index);
  };

  const handleBgImageChange4 = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > 4) {
      setErrors(prev => ({ ...prev, instructorBg: "File size exceeds 4MB. Please choose a smaller file." }));
      return;
    }

    setInstructorBg(file);
    setErrors(prev => ({ ...prev, instructorBg: null }));
  };

  const shortenFileName1 = (file) => {
    if (!file || !file.name) return '';
    const maxLength = 15;
    const fileName = file.name;
    return fileName.length > maxLength ? `${fileName.substring(0, maxLength)}...` : fileName;
  };

  // Map of field icons
  const fieldIcons = {
    address: FiMapPin,
    "Owner Name": FiUser,
    phoneNumber: FiPhone,
    email: FiMail,
    upiId: FiDollarSign,
    instagram: FiInstagram,
    facebook: FiFacebook,
    youtube: FiYoutube
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-50 mb-6">
          <FiPhone className="w-8 h-8 text-teal-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Contact Information</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Offer comprehensive contact details, facilitating easy communication and connection through various platforms.
        </p>
      </div>

      <div className="space-y-8">
        {/* Contact Details */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Contact Details</h2>
          
          <div className="space-y-6">
            {Object.keys(contactInfo)
              .filter(key => key !== 'country' && key !== 'countryCode')
              .map((key, index) => {
                const Icon = fieldIcons[key] || FiUser;
                const isRequired = !['facebook', 'instagram', 'youtube'].includes(key);
                
                return (
                  <div key={index} className="space-y-2">
                    <Label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <Icon className="w-4 h-4" />
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                      {isRequired && <span className="text-red-500">*</span>}
                    </Label>

                    {key === 'phoneNumber' ? (
                      <div className="flex gap-4">
                        <select
                          value={selectedCountryCode}
                          onChange={handleCountryChange}
                          className="w-[20%] bg-gray-50 border border-gray-200 rounded-lg p-2.5 focus:ring-2 focus:ring-teal-200 focus:border-teal-500"
                        >
                          <Country />
                        </select>
                        <TextInput
                          type="text"
                          name={key}
                          value={contactInfo[key]}
                          onChange={handlePhoneNumberChange}
                          placeholder="Phone Number"
                          className="w-[80%] bg-gray-50 border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 rounded-lg"
                        />
                      </div>
                    ) : (
                      <TextInput
                        type="text"
                        name={key}
                        value={contactInfo[key]}
                        onChange={handleContactChange}
                        placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                        className="w-full bg-gray-50 border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 rounded-lg"
                        onFocus={() => toggleActiveContact(index)}
                        onBlur={() => toggleActiveContact(null)}
                      />
                    )}
                  </div>
                );
              })}
          </div>
        </div>

        {/* Background Images */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <FiUpload className="w-5 h-5 text-teal-600" />
            Background Images
          </h2>
          
          <div className="space-y-6">
            <div>
              <Label className="block text-sm font-medium text-gray-700 mb-2">
                Instructor Background
              </Label>
              <label
                htmlFor="instructor-bg-upload"
                className={`flex items-center justify-between w-full px-4 py-2 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-teal-500 transition-colors ${
                  errors.instructorBg ? 'border-red-500' : ''
                }`}
              >
                <input
                  id="instructor-bg-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleBgImageChange4}
                  className="hidden"
                />
                
                {InstructorBg ? (
                  <div className="flex items-center justify-between w-full">
                    <span className="text-gray-600">{shortenFileName1(InstructorBg)}</span>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setInstructorBg(null);
                      }}
                      className="text-teal-600 hover:text-teal-700 font-medium"
                    >
                      Change
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-gray-600">
                    <FiUpload className="w-5 h-5" />
                    <span>Choose File</span>
                  </div>
                )}
              </label>
              {errors.instructorBg && (
                <p className="mt-2 text-sm text-red-500">{errors.instructorBg}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
