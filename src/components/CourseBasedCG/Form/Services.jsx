import { TextInput } from 'flowbite-react';
import React, { useState, useRef } from 'react';

function Services({ services, setServices, danceTypes, setDanceTypes, servicesBg, setServicesBg, servicesPortrait, setServicesPortrait }) {
  const [activeServiceIndex, setActiveServiceIndex] = useState(null);
  const danceTypesContainerRef = useRef(null);
  const [activeDanceTypeIndex, setActiveDanceTypeIndex] = useState(null);

  // States for the overall service images
  // const [servicesBg, setServicesBg] = useState(null);
  // const [servicesPortrait, setServicesPortrait] = useState(null);

  const handleDanceTypeChange = (index, value) => {
    const updatedDanceTypes = [...danceTypes];
    updatedDanceTypes[index] = value;
    setDanceTypes(updatedDanceTypes);
  };

  const toggleActiveDanceType = (index) => {
    setActiveDanceTypeIndex(index === activeDanceTypeIndex ? null : index);
  };

  const addNewDanceType = () => {
    if (danceTypes.length < 5) {
      setDanceTypes([...danceTypes, '']);
    }
    // Scroll to the newly added dance type
    danceTypesContainerRef.current.scrollTo({
      top: danceTypesContainerRef.current.scrollHeight,
      behavior: 'smooth',
    });
  };

  const removeDanceType = (index) => {
    const updatedDanceTypes = [...danceTypes];
    updatedDanceTypes.splice(index, 1);
    setDanceTypes(updatedDanceTypes);
  };

  const handleServiceChange = (index, e) => {
    const updatedServices = [...services];
    updatedServices[index] = { ...updatedServices[index], [e.target.name]: e.target.value };
    setServices(updatedServices);
  };

  const toggleActiveService = (index) => {
    setActiveServiceIndex(index === activeServiceIndex ? null : index);
  };

  const handleAddItem = (index) => {
    const updatedServices = [...services];
    updatedServices[index].items.push('');
    setServices(updatedServices);
  };

  const handleItemChange = (serviceIndex, itemIndex, e) => {
    const updatedServices = [...services];
    updatedServices[serviceIndex].items[itemIndex] = e.target.value;
    setServices(updatedServices);
  };

  const handleRemoveItem = (serviceIndex, itemIndex) => {
    const updatedServices = [...services];
    updatedServices[serviceIndex].items.splice(itemIndex, 1);
    setServices(updatedServices);
  };

  // const handleImageChange = (setImage, e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setImage(file);
  //   }
  // };

  const handleBgImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileSizeMB = file.size / (1024 * 1024);
      if (fileSizeMB > 4) {
        alert("File size exceeds 4MB. Please choose a smaller file.");
        return;
      }
    }
    if (file) {
      setServicesBg(file);
    }
  };

  const handlePortraitImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileSizeMB = file.size / (1024 * 1024);
      if (fileSizeMB > 4) {
        alert("File size exceeds 4MB. Please choose a smaller file.");
        return;
      }
    }
    if (file) {
      setServicesPortrait(file);
    }
  };

  const shortenFileName = (file) => {
    if (!file || !file.name) return '';
    const maxLength = 15;
    const fileName = file.name;
    if (fileName.length > maxLength) {
      return `${fileName.substring(0, maxLength)}...`;
    }
    return fileName;
  };


  return (
    <div className="mx-[2%] [@media(max-width:1024px)]:m-0 [@media(max-width:1024px)]:mb-[5rem]">
      <h1 className="font-medium text-7xl pb-[1rem] text-center">SERVICE HIGHLIGHT</h1>
      <h5 className="text-[#939393] text-center">
        Effectively highlight your services by showcasing their unique benefits and value propositions. Make it clear how each service meets your audience’s needs and stands out from the competition.
      </h5>

      {/* Service Background Image Upload */}
      <div className="flex justify-center ml-[10%] [@media(max-width:1024px)]:ml-0">
        <div className="w-[60%] p-8 [@media(max-width:1024px)]:p-0 [@media(max-width:1024px)]:w-full">
          <div className="relative flex items-center mt-4">
            <h2 className='font-bold'>Services Bg</h2>
            <div className='mr-20'></div>
            <TextInput
              type="file"
              accept="image/*"
              // onChange={(e) => handleImageChange(setServicesBg, e)}
              onChange={handleBgImageChange}
              className="hidden"
              id="servicesBgInput"
            />
            <label
              htmlFor="servicesBgInput"
              className="w-[150px] h-[25px] border border-[#3f3e3e] flex items-center justify-center cursor-pointer relative"
              style={{
                borderColor: 'cement',
                borderWidth: '2px',
                borderStyle: 'solid',
                backgroundColor: '#D9D9D9',
              }}
            >
              <span
                className={`block text-[#000000] font-inter text-[14px] ${servicesBg ? 'hidden' : 'block'
                  }`}
              >
                Choose File
              </span>
              <div
                className={`absolute top-0 left-0 right-0 bottom-0 flex items-center justify-between px-2 truncate ${servicesBg ? 'block' : 'hidden'
                  }`}
              >
                <span className="text-[#636262]">
                  {shortenFileName(servicesBg)}
                </span>
                <span
                  onClick={() => setServicesBg(null)}
                  className="text-[#3b9d33] cursor-pointer"
                >
                  Change
                </span>
              </div>
            </label>
          </div>

          {/* Service Portrait Image Upload */}
          <div className="relative flex items-center mt-4">
            <h2 className='font-bold'>Services Protrait</h2>
            <div className='mr-10'></div>
            <TextInput
              type="file"
              accept="image/*"
              // onChange={(e) => handleImageChange(setServicesPortrait, e)}
              onChange={handlePortraitImageChange}
              className="hidden"
              id="servicesPortraitInput"
            />
            <label
              htmlFor="servicesPortraitInput"
              className="w-[150px] h-[25px] border border-[#3f3e3e] flex items-center justify-center cursor-pointer relative"
              style={{
                borderColor: 'cement',
                borderWidth: '2px',
                borderStyle: 'solid',
                backgroundColor: '#D9D9D9',
              }}
            >
              <span
                className={`block text-[#000000] font-inter text-[14px] ${servicesPortrait ? 'hidden' : 'block'
                  }`}
              >
                Choose File
              </span>
              <div
                className={`absolute top-0 left-0 right-0 bottom-0 flex items-center justify-between px-2 truncate ${servicesPortrait ? 'block' : 'hidden'
                  }`}
              >
                <span className="text-[#636262]">
                  {shortenFileName(servicesPortrait)}
                </span>
                <span
                  onClick={() => setServicesPortrait(null)}
                  className="text-[#3b9d33] cursor-pointer"
                >
                  Change
                </span>
              </div>
            </label>
          </div>

          {services.map((service, serviceIndex) => (
            <div key={serviceIndex} className="mt-4">
              <div className="flex">
                <h2 className="font-medium text-xl">Service {serviceIndex + 1}</h2>
                <span className="text-red-500 ml-1">*</span>
              </div>
              <div className="relative">
                <TextInput
                  type="text"
                  name="title"
                  value={service.title || ''}
                  onChange={(e) => handleServiceChange(serviceIndex, e)}
                  placeholder="Service Title"
                  className="w-full"
                  style={{
                    borderColor: "#D1D5DB",
                    backgroundColor: "#F9FAFB",
                    borderRadius: "8px",
                  }}
                  onFocus={() => toggleActiveService(serviceIndex)}
                  onBlur={() => toggleActiveService(null)}
                />
              </div>
              <div>
                {service.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="mt-2 relative">
                    <TextInput
                      value={item}
                      onChange={(e) => handleItemChange(serviceIndex, itemIndex, e)}
                      placeholder="Service Item"
                      className="w-full"
                      style={{
                        borderColor: "#D1D5DB",
                        backgroundColor: "#F9FAFB",
                        borderRadius: "8px",
                      }}
                      rows={1}
                    />
                    <button onClick={() => handleRemoveItem(serviceIndex, itemIndex)} className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white px-1 rounded-full text-sm mr-[12px] mt-2">
                      <span>✕</span>
                    </button>
                  </div>
                ))}
                {service.items.length < 5 && (
                  <div className="mt-2 flex justify-center">
                    <button onClick={() => handleAddItem(serviceIndex)} className="bg-[#30AFBC] text-white px-4 py-2 rounded-md">
                      Add Item
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
          <div className="relative mt-4">
            <div ref={danceTypesContainerRef} className="pb-6">
              {danceTypes.map((danceType, index) => (
                <div key={index} className="mt-2">
                  <div className="flex">
                    <h2 className="font-medium text-xl">Dance Type {index + 1}</h2>
                    <span className="text-red-500 ml-1">*</span>
                  </div>
                  <div className="relative">
                    {index >= 3 && (
                      <button onClick={() => removeDanceType(index)} className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white px-1 rounded-full text-sm mr-[12px] z-10">
                        <span>✕</span>
                      </button>
                    )}
                    <TextInput
                      type="text"
                      value={danceType || ''}
                      onChange={(e) => handleDanceTypeChange(index, e.target.value)}
                      placeholder="Dance Type"
                      className="w-full"
                      style={{
                        borderColor: "#D1D5DB",
                        backgroundColor: "#F9FAFB",
                        borderRadius: "8px",
                      }}
                      onFocus={() => toggleActiveDanceType(index)}
                      onBlur={() => toggleActiveDanceType(null)}
                    />
                  </div>
                </div>
              ))}
            </div>
            {danceTypes.length < 5 && (
              <div className="mt-2 flex justify-center">
                <button onClick={addNewDanceType} className="bg-[#30AFBC] text-white px-4 py-2 rounded-md">
                  Add Dance Type
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;
