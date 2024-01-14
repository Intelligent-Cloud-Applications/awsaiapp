import React, { useState } from 'react';

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

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactInfo({ ...contactInfo, [name]: value });
  };

  const [activeContactIndex, setActiveContactIndex] = useState(null);

  const toggleActiveContact = (index) => {
    setActiveContactIndex(index === activeContactIndex ? null : index);
  };

  return (
    <div className="mx-auto max-w-[800px] px-8">
      <h1 className="font-medium text-7xl">CONTACT INFORMATION</h1>
      <h5 className="w-[28rem] max950:w-[15rem] text-[#cc3f3f] text-[13px]">
      ** The Footer shown is just an example how your given data will look like for the Footer it will not change on giving your input.**
      </h5>
      <h5 class="w-[28rem] max950:w-[17rem] text-[#939393]">
      Offer comprehensive contact details, facilitating easy communication and connection through various platforms.
      </h5>
      <div className="">
        {Object.keys(contactInfo).map((key, index) => (
          <div key={index} className="mt-1">
            <h2 className="font-medium text-xl">{key.charAt(0).toUpperCase() + key.slice(1)}</h2>
            <div className="relative">
              <input
                type="text"
                name={key}
                value={contactInfo[key]}
                onChange={handleContactChange}
                placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                className="w-full max-w-[28rem] text-black border-none outline-none bg-transparent mt-2"
                onFocus={() => toggleActiveContact(index)}
                onBlur={() => toggleActiveContact(null)}
              />
              <div
                className={`absolute left-0 right-0 bottom-0 h-[1px] ${
                  activeContactIndex === index ? 'bg-black' : 'bg-[#939393]'
                }`}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Contact;