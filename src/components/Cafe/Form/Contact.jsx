import React, { useState } from 'react';
import { Label, TextInput } from 'flowbite-react';
import { FiPhone, FiMail, FiMapPin, FiUser, FiInstagram, FiFacebook, FiYoutube, FiDollarSign, FiCalendar } from 'react-icons/fi';
import Country from '../../../utils/Country';

function Contact({ contactInfo, setContactInfo }) {
  const [selectedCountryCode, setSelectedCountryCode] = useState('+91');

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

  const getIcon = (key) => {
    switch(key) {
      case 'phoneNumber': return FiPhone;
      case 'email': return FiMail;
      case 'address': return FiMapPin;
      case 'owner_name': return FiUser;
      case 'instagram': return FiInstagram;
      case 'facebook': return FiFacebook;
      case 'youTube': return FiYoutube;
      case 'upiId': return FiDollarSign;
      case 'Establishment Year of Company': return FiCalendar;
      default: return null;
    }
  };

  const getFieldLabel = (key) => {
    switch(key) {
      case 'upiId': return 'UPI ID';
      case 'owner_name': return 'Owner Name';
      case 'phoneNumber': return 'Phone Number';
      case 'youTube': return 'YouTube';
      case 'Establishment Year of Company': return 'Establishment Year';
      default: return key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
    }
  };

  const getPlaceholder = (key) => {
    switch(key) {
      case 'facebook': return 'Enter Facebook profile URL';
      case 'instagram': return 'Enter Instagram profile URL';
      case 'youTube': return 'Enter YouTube channel URL';
      case 'upiId': return 'Enter UPI ID';
      case 'owner_name': return 'Enter owner name';
      case 'phoneNumber': return 'Enter 10-digit phone number';
      case 'Establishment Year of Company': return 'Enter establishment year';
      case 'email': return 'Enter email address';
      case 'address': return 'Enter complete address';
      default: return `Enter ${key.toLowerCase()}`;
    }
  };

  return (
    <div className="w-full min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="font-medium text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 text-gray-900">
            Contact Information
          </h1>
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
            Provide your contact details to help customers reach you through various platforms.
          </p>
        </div>

        {/* Main Form Section */}
        <div className="bg-white shadow-sm rounded-lg p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.keys(contactInfo)
              .filter(key => key !== 'country' && key !== 'countryCode')
              .map((key, index) => {
                const Icon = getIcon(key);
                const isRequired = !(key === 'facebook' || key === 'instagram' || key === 'youTube' || key === 'upiId');

                return (
                  <div key={index} className="space-y-2">
                    <Label 
                      htmlFor={key}
                      className="text-sm font-medium text-gray-700 flex items-center gap-2"
                    >
                      {Icon && <Icon className="w-4 h-4 text-gray-500" />}
                      {getFieldLabel(key)}
                      {isRequired && <span className="text-red-500">*</span>}
                    </Label>

                    {key === 'phoneNumber' ? (
                      <div className="flex gap-2">
                        <select
                          value={selectedCountryCode}
                          onChange={handleCountryChange}
                          className="w-[30%] rounded-lg border-gray-300 focus:border-cyan-500 focus:ring-cyan-500/20"
                        >
                          <Country />
                        </select>
                        <TextInput
                          id={key}
                          type="tel"
                          name={key}
                          value={contactInfo[key]}
                          onChange={handleContactChange}
                          placeholder={getPlaceholder(key)}
                          className="w-[70%]"
                          required={isRequired}
                        />
                      </div>
                    ) : key === 'address' ? (
                      <textarea
                        id={key}
                        name={key}
                        value={contactInfo[key]}
                        onChange={handleContactChange}
                        placeholder={getPlaceholder(key)}
                        rows={3}
                        className="w-full rounded-lg border-gray-300 focus:border-cyan-500 focus:ring-cyan-500/20 resize-none"
                        required={isRequired}
                      />
                    ) : (
                      <TextInput
                        id={key}
                        type={key === 'email' ? 'email' : 'text'}
                        name={key}
                        value={contactInfo[key]}
                        onChange={handleContactChange}
                        placeholder={getPlaceholder(key)}
                        className="w-full"
                        required={isRequired}
                      />
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
