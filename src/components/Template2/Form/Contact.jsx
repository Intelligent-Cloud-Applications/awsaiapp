import React, { useState } from 'react';
import Country from '../../Auth/Country';
import { Label, TextInput } from 'flowbite-react';
import { FiMail, FiPhone, FiMapPin, FiUser, FiInstagram, FiFacebook, FiYoutube } from 'react-icons/fi';

function Contact({ contactInfo, setContactInfo }) {
  // const [contactInfo, setContactInfo] = useState({
  //   address: '',
  //   phoneNumber: '',
  //   email: '',
  //   upiId: '',
  //   instagram: '',
  //   youtube: '',
  //   facebook: '',
  // });

  const [selectedCountryCode, setSelectedCountryCode] = useState('+91'); // Default country code

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

  const [activeContactIndex, setActiveContactIndex] = useState(null);

  const toggleActiveContact = (index) => {
    setActiveContactIndex(index === activeContactIndex ? null : index);
  };
  // const handleBgImageChange3 = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const fileSizeMB = file.size / (1024 * 1024);
  //     if (fileSizeMB > 4) {
  //       alert("File size exceeds 4MB. Please choose a smaller file.");
  //       return;
  //     }
  //   }
  //   if (file) {
  //     setSubscriptionBg(file);
  //   }
  // };
  // const handleBgImageChange4 = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const fileSizeMB = file.size / (1024 * 1024);
  //     if (fileSizeMB > 4) {
  //       alert("File size exceeds 4MB. Please choose a smaller file.");
  //       return;
  //     }
  //   }
  //   if (file) {
  //     setInstructorBg(file);
  //   }
  // };
  // const handleCSVFlie = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const fileSizeMB = file.size / (1024 * 1024);
  //     if (fileSizeMB > 4) {
  //       alert("File size exceeds 4MB. Please choose a smaller file.");
  //       return;
  //     }
  //   }
  //   if (file) {
  //     setCSVFile(file);
  //   }
  // }
  // const shortenFileName1 = (file) => {
  //   if (!file || !file.name) return '';
  //   const maxLength = 15;
  //   const fileName = file.name;
  //   if (fileName.length > maxLength) {
  //     return `${fileName.substring(0, maxLength)}...`;
  //   }
  //   return fileName;
  // };

  // Define form sections for better organization
  const formSections = [
    {
      title: 'Basic Information',
      icon: <FiUser className="w-5 h-5 text-teal-600" />,
      fields: ['Owner Name', 'Establishment Year of Company']
    },
    {
      title: 'Contact Details',
      icon: <FiPhone className="w-5 h-5 text-teal-600" />,
      fields: ['Phone Number', 'email']
    },
    {
      title: 'Location',
      icon: <FiMapPin className="w-5 h-5 text-teal-600" />,
      fields: ['address']
    },
    {
      title: 'Social Media',
      icon: <FiInstagram className="w-5 h-5 text-teal-600" />,
      fields: ['instagram', 'facebook', 'youTube']
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-50 mb-6">
          <FiMail className="w-8 h-8 text-teal-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Contact Information</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Provide your contact details to help customers reach you easily
        </p>
      </div>

      <div className="space-y-8">
        {formSections.map((section, sectionIndex) => (
          <div key={section.title} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              {section.icon}
              {section.title}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {section.fields.map((field, fieldIndex) => (
                <div key={field}>
                  <Label 
                    htmlFor={field}
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {field.split(/(?=[A-Z])/).join(' ')}
                    {!['instagram', 'facebook', 'youTube'].includes(field) && 
                      <span className="text-red-500 ml-1">*</span>
                    }
                  </Label>

                  {field === 'Phone Number' ? (
                    <div className="flex gap-2">
                      <select
                        value={selectedCountryCode}
                        onChange={handleCountryChange}
                        className="w-24 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-teal-500 focus:border-teal-500"
                      >
                        <Country />
                      </select>
                      <TextInput
                        type="text"
                        name={field}
                        value={contactInfo[field] || ''}
                        onChange={handleContactChange}
                        placeholder="Enter phone number"
                        required
                        maxLength={10}
                        className="flex-1"
                      />
                    </div>
                  ) : (
                    <div className="relative">
                      <TextInput
                        id={field}
                        name={field}
                        value={contactInfo[field] || ''}
                        onChange={handleContactChange}
                        placeholder={`Enter ${field.toLowerCase().split(/(?=[A-Z])/).join(' ')}`}
                        required={!['instagram', 'facebook', 'youTube'].includes(field)}
                        className="w-full bg-gray-50 border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 rounded-lg"
                        onFocus={() => toggleActiveContact(fieldIndex)}
                        onBlur={() => toggleActiveContact(null)}
                      />
                      {['instagram', 'facebook', 'youTube'].includes(field) && (
                        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                          {field === 'instagram' && <FiInstagram className="text-gray-400" />}
                          {field === 'facebook' && <FiFacebook className="text-gray-400" />}
                          {field === 'youTube' && <FiYoutube className="text-gray-400" />}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {/* <div className="relative flex items-center">
        <h2 className='font-bold'>Subscription Bg</h2>
        <div className='mr-10'></div>
        <input
          type="file"
          accept="image/*"
          // onChange={(e) => handleImageChange(setSubscriptionBg, e)}
          onChange={handleBgImageChange3}
          className="hidden"
          id="SubscriptionBgInput"
        />
        <label
          htmlFor="SubscriptionBgInput"
          className="w-[30vh] h-[25px] border border-[#3f3e3e] flex items-center justify-center cursor-pointer relative"
          style={{
            borderColor: 'cement',
            borderWidth: '2px',
            borderStyle: 'solid',
            backgroundColor: '#D9D9D9',
          }}
        >
          <span
            className={`block text-[#000000] font-inter text-[22px] ${SubscriptionBg ? 'hidden' : 'block'
              }`}
          >
            Choose File
          </span>
          <div
            className={`absolute top-0 left-0 right-0 bottom-0 flex items-center justify-between px-2 truncate ${SubscriptionBg ? 'block' : 'hidden'
              }`}
          >
            <span className="text-[#636262]">
              {shortenFileName1(SubscriptionBg)}
            </span>
            <span
              onClick={() => setSubscriptionBg(null)}
              className="text-[#3b9d33] cursor-pointer"
            >
              Change
            </span>
          </div>
        </label>
      </div> */}
      {/* <div className="relative flex items-center mt-4">
        <h2 className='font-bold'>Instructor Bg</h2>
        <div className='mr-16'></div>
        <input
          type="file"
          accept="image/*"
          // onChange={(e) => handleImageChange(setSubscriptionBg, e)}
          onChange={handleBgImageChange4}
          className="hidden"
          id="InstructorBgInput"
        />
        <label
          htmlFor="InstructorBgInput"
          className="w-[30vh] h-[25px] border border-[#3f3e3e] flex items-center justify-center cursor-pointer relative"
          style={{
            borderColor: 'cement',
            borderWidth: '2px',
            borderStyle: 'solid',
            backgroundColor: '#D9D9D9',
          }}
        >
          <span
            className={`block text-[#000000] font-inter text-[22px] ${InstructorBg ? 'hidden' : 'block'
              }`}
          >
            Choose File
          </span>
          <div
            className={`absolute top-0 left-0 right-0 bottom-0 flex items-center justify-between px-2 truncate ${InstructorBg ? 'block' : 'hidden'
              }`}
          >
            <span className="text-[#636262]">
              {shortenFileName1(InstructorBg)}
            </span>
            <span
              onClick={() => setInstructorBg(null)}
              className="text-[#3b9d33] cursor-pointer"
            >
              Change
            </span>
          </div>
        </label>
      </div> */}
      {/* <div className="relative flex items-center mt-4 ">
        <h2 className='font-bold'>Member List</h2>
        <div className='mr-16'></div>
        <input
          type="file"
          accept=".csv, .xls, .xlsx"
          // onChange={(e) => handleImageChange(setSubscriptionBg, e)}
          onChange={handleCSVFlie}
          className="hidden"
          id="CSVFileInput"
        />
        <label
          htmlFor="CSVFileInput"
          className="w-[150px] h-[25px] border border-[#3f3e3e] flex items-center justify-center cursor-pointer relative"
          style={{
            borderColor: 'cement',
            borderWidth: '2px',
            borderStyle: 'solid',
            backgroundColor: '#D9D9D9',
          }}
        >
          <span
            className={`block text-[#000000] font-inter text-[14px] ${CSVFile ? 'hidden' : 'block'
              }`}
          >
            Choose File
          </span>
          <div
            className={`absolute top-0 left-0 right-0 bottom-0 flex items-center justify-between px-2 truncate ${CSVFile ? 'block' : 'hidden'
              }`}
          >
            <span className="text-[#636262]">
              {shortenFileName1(CSVFile)}
            </span>
            <span
              onClick={() => setCSVFile(null)}
              className="text-[#3b9d33] cursor-pointer"
            >
              Change
            </span>
          </div>
        </label>
      </div>
      <p className='text-[18px] text-[#ff0000] mb-[3rem]'>
        ( *Upload a .csv file here it should have the Columns institution, phoneNumber, emailId, userName, country, joiningDate, status:Active or Inactive)
      </p> */}
      <div className='h-[250px]'></div>
    </div>
  );
}

export default Contact;