import React, { useState, useRef } from 'react';

function Services({ services, setServices, danceTypes, setDanceTypes }) {
  const [activeServiceIndex, setActiveServiceIndex] = useState(null);
  const danceTypesContainerRef = useRef(null);

  const handleDanceTypeChange = (index, value) => {
    const updatedDanceTypes = [...danceTypes];
    updatedDanceTypes[index] = value;
    setDanceTypes(updatedDanceTypes);
  };

  const [activeDanceTypeIndex, setActiveDanceTypeIndex] = useState(null);

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

  return (
    <div className="mx-auto max-w-[800px] px-8" style={{ overflowY: 'auto', maxHeight: '525px' }}>
      <h1 className="font-medium text-7xl">SERVICE SECTION</h1>
      <h5 className="w-[28rem] max950:w-[17rem] text-[#939393]">
        Highlight services distinctly, showcasing their benefits and unique value propositions for your audience's needs.
      </h5>
      {services.map((service, serviceIndex) => (
        <div key={serviceIndex} className="mt-4">
          <h2 className="font-medium text-xl">Service {serviceIndex + 1}</h2>
          <div className="relative">
            <input
              type="text"
              name="title"
              value={service.title || ''}
              onChange={(e) => handleServiceChange(serviceIndex, e)}
              placeholder="Service Title"
              className="w-full max-w-[28rem] text-black border-none outline-none bg-transparent mt-2"
              onFocus={() => toggleActiveService(serviceIndex)}
              onBlur={() => toggleActiveService(null)}
            />
          </div>
          <div className="left-0 right-0  h-[0.8px] bg-[#939393]"></div>
          <div>
            {service.items.map((item, itemIndex) => (
              <div key={itemIndex} className="mt-2 relative">
                <textarea
                  value={item}
                  onChange={(e) => handleItemChange(serviceIndex, itemIndex, e)}
                  placeholder="Service Item"
                  className="w-full max-w-[28rem] text-black border-none outline-none bg-transparent resize-none"
                  rows={1}
                />
                <button onClick={() => handleRemoveItem(serviceIndex, itemIndex)} className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white px-1 rounded-full text-sm mr-[12px] mt-2">
                  <span>✕</span>
                </button>
                <div className="left-0 right-0 h-[0.8px] bg-[#939393]"></div>
              </div>
            ))}
            {service.items.length < 5 && (
           <div className="mt-2 flex justify-center">
                <button onClick={() => handleAddItem(serviceIndex)}className="bg-[#30AFBC] text-white px-4 py-2 rounded-md">
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
              <h2 className="font-medium text-xl">Dance Type {index + 1}</h2>
              <div className="relative">
                {index >= 3 && (
                  <button onClick={() => removeDanceType(index)} className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white px-1 rounded-full text-sm mr-[12px] ">
                    <span>✕</span>
                  </button>
                )}
                <input
                  type="text"
                  value={danceType || ''}
                  onChange={(e) => handleDanceTypeChange(index, e.target.value)}
                  placeholder="Dance Type"
                  className="w-full max-w-[28rem] text-black border-none outline-none bg-transparent mt-2"
                  onFocus={() => toggleActiveDanceType(index)}
                  onBlur={() => toggleActiveDanceType(null)}
                />
                <div className={`absolute left-0 right-0 bottom-0 h-[0.5px] ${activeDanceTypeIndex === index ? 'bg-black' : 'bg-[#939393]'}`}></div>
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
  );
}

export default Services;
