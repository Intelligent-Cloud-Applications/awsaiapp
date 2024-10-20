import React, { useState } from 'react';
import Country from '../../Auth/Country';
function Contact({ contactInfo, setContactInfo, SubscriptionBg, setSubscriptionBg, InstructorBg, setInstructorBg }) {
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

  // Function to handle phone number changes
  const handlePhoneNumberChange = (e) => {
    setContactInfo(prevInfo => ({
      ...prevInfo,
      phoneNumber: e.target.value
    }));
  };
  const [activeContactIndex, setActiveContactIndex] = useState(null);

  const toggleActiveContact = (index) => {
    setActiveContactIndex(index === activeContactIndex ? null : index);
  };
  const handleBgImageChange3 = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileSizeMB = file.size / (1024 * 1024);
      if (fileSizeMB > 4) {
        alert("File size exceeds 4MB. Please choose a smaller file.");
        return;
      }
    }
    if (file) {
      setSubscriptionBg(file);
    }
  };
  const handleBgImageChange4 = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileSizeMB = file.size / (1024 * 1024);
      if (fileSizeMB > 4) {
        alert("File size exceeds 4MB. Please choose a smaller file.");
        return;
      }
    }
    if (file) {
      setInstructorBg(file);
    }
  };
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
  const shortenFileName1 = (file) => {
    if (!file || !file.name) return '';
    const maxLength = 15;
    const fileName = file.name;
    if (fileName.length > maxLength) {
      return `${fileName.substring(0, maxLength)}...`;
    }
    return fileName;
  };
  return (
    <div className="mx-[2%]" style={{ overflowY: 'auto'}}>
      <h1 className="font-medium text-7xl text-center">CONTACT INFORMATION</h1>
      {/* <h5 className="text-[#cc3f3f] text-[13px]">
        ** The Footer shown is just an example how your given data will look like for the Footer it will not change on giving your input.**
      </h5> */}
      <h5 class="text-[#939393] text-center">
        Offer comprehensive contact details, facilitating easy communication and connection through various platforms.
      </h5>
      <div className="mb-8">
        {Object.keys(contactInfo).filter(key => key !== 'country' && key !== 'countryCode').map((key, index) => (
          <div key={index} className="mt-1">
            <h2 className="font-medium text-[20px]">{key.charAt(0).toUpperCase() + key.slice(1)}</h2>
            <div className="relative">
              {key === 'phoneNumber' ? (
                <div className="flex items-center">
                  <select
                    value={selectedCountryCode}
                    onChange={handleCountryChange}
                    className="border w-[9rem] border-gray-300 rounded-l px-2 py-1"
                  >
                  
              <Country />
                  </select>
                  <input
                    type="text"
                    name={key}
                    value={contactInfo[key]}
                    onChange={handlePhoneNumberChange}
                    placeholder="Phone Number"
                    className="w-full text-black border border-gray-300 rounded-r outline-none bg-transparent mt-2"
                  />
                </div>
              ) : (
                <input
                  type="text"
                  name={key}
                  value={contactInfo[key]}
                  onChange={handleContactChange}
                  placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                  className="w-full text-black border-none outline-none bg-transparent mt-2"
                  onFocus={() => toggleActiveContact(index)}
                  onBlur={() => toggleActiveContact(null)}
                />
              )}
              <div
                className={`absolute left-0 right-0 bottom-0 h-[1px] ${activeContactIndex === index ? 'bg-black' : 'bg-[#939393]'
                  }`}
              ></div>
            </div>
          </div>
        ))}
      </div>
      <div className="relative flex items-center">
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
          className="w-[150px] h-[25px] border border-[#3f3e3e] flex items-center justify-center cursor-pointer relative"
          style={{
            borderColor: 'cement',
            borderWidth: '2px',
            borderStyle: 'solid',
            backgroundColor: '#D9D9D9',
          }}
        >
          <span
            className={`block text-[#000000] font-inter text-[14px] ${SubscriptionBg ? 'hidden' : 'block'
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
      </div>
      <div className="relative flex items-center mt-4">
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
          className="w-[150px] h-[25px] border border-[#3f3e3e] flex items-center justify-center cursor-pointer relative"
          style={{
            borderColor: 'cement',
            borderWidth: '2px',
            borderStyle: 'solid',
            backgroundColor: '#D9D9D9',
          }}
        >
          <span
            className={`block text-[#000000] font-inter text-[14px] ${InstructorBg ? 'hidden' : 'block'
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
      </div>
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
