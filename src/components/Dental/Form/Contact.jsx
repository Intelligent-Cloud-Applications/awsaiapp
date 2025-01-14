import React, { useState } from 'react';
import Country from '../../Auth/Country';
import { Label, TextInput } from 'flowbite-react';

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

  return (
    <div className="w-full min-h-screen p-4 md:px-6 lg:px-8 py-4 md:py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-medium text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center mb-2 md:mb-4">
          Contact Information
        </h1>
        <p className="text-[#939393] text-center text-xs sm:text-sm md:text-base mb-4 md:mb-8 px-2 md:px-4">
          Offer comprehensive contact details, facilitating easy communication and connection through various platforms.
        </p>

        <div className="bg-white shadow-sm rounded-lg p-3 sm:p-4 md:p-6 lg:p-8">
          <div className="space-y-4 md:space-y-6">
            {Object.keys(contactInfo)
              .filter((key) => key !== 'country' && key !== 'countryCode')
              .map((key, index) => {
                const placeholderText = (() => {
                  switch (key) {
                    case 'facebook':
                      return 'Enter Facebook profile link';
                    case 'instagram':
                      return 'Enter Instagram profile link';
                    case 'youTube':
                      return 'Enter YouTube channel link';
                    default:
                      return `Enter ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`;
                  }
                })();

                return (
                  <div key={index} className="space-y-1.5 md:space-y-2">
                    <Label 
                      htmlFor={key}
                      className="block text-xs sm:text-sm md:text-base font-medium text-gray-700"
                    >
                      {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                      {!(key === 'facebook' || key === 'instagram' || key === 'youTube') && (
                        <span className="text-red-500 ml-1">*</span>
                      )}
                    </Label>

                    {key === 'Phone Number' ? (
                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                        <select
                          value={selectedCountryCode}
                          onChange={handleCountryChange}
                          className="w-full sm:w-[20%] px-2 sm:px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm focus:ring-2 focus:ring-[#30AFBC] focus:border-[#30AFBC] transition-all duration-200"
                        >
                          <Country />
                        </select>
                        <input
                          type="tel"
                          name={key}
                          value={contactInfo[key]}
                          onChange={handleContactChange}
                          placeholder="Enter 10-digit phone number"
                          required
                          maxLength="10"
                          className="w-full sm:w-[80%] px-2 sm:px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm focus:ring-2 focus:ring-[#30AFBC] focus:border-[#30AFBC] transition-all duration-200"
                        />
                      </div>
                    ) : (
                      <TextInput
                        id={key}
                        name={key}
                        value={contactInfo[key]}
                        onChange={handleContactChange}
                        placeholder={placeholderText}
                        required={!(key === 'facebook' || key === 'instagram' || key === 'youTube')}
                        className="w-full text-xs sm:text-sm transition-all duration-200"
                        sizing="sm"
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