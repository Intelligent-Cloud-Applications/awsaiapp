import React, { useState } from 'react';

function Services({ services, setServices, countBanner, setCountBanner, titleOfCountBanner}) {
  const [activeServiceIndex, setActiveServiceIndex] = useState(null);
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

  const handlecountChange = (index, value) => {
    setCountBanner(prevCountBanner =>
      prevCountBanner.map((item, i) =>
        i === index ? { ...item, count: value } : item
      )
    );
  };
  // console.log("Updated countBanner:", countBanner);

  // const handleImageChange = (setImage, e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setImage(file);
  //   }
  // };
  return (
    <div className="h-[76vh] p-5 m-0" style={{ overflow: 'auto' }}>
      <h1 className="font-medium text-7xl text-center">SERVICE HIGHLIGHT</h1>
      {/* <h5 className="text-[#cc3f3f] text-[13px] text-center">
        ** The Services shown is just an example how your given data will look like for the services section it will not change on giving your input.**
      </h5> */}
      <h5 className="text-center text-[#939393]">
        Effectively highlight your services by showcasing their unique benefits and value propositions. Make it clear how each service meets your audience’s needs and stands out from the competition.
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
              className="w-full text-black border-none outline-none bg-transparent mt-2"
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
                  className="w-full text-black border-none outline-none bg-transparent resize-none"
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
                <button onClick={() => handleAddItem(serviceIndex)} className="bg-[#30AFBC] text-white px-4 py-2 rounded-md">
                  Add Item
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
      <div className="relative mt-4">
        <div className="pb-6">
          {titleOfCountBanner.map((title, index) => (
            <div key={index} className="mt-2">
              <h2 className="font-medium text-xl">{title}</h2>
              <div className="relative">
                <input
                  type="text"
                  value={countBanner[index].count}
                  onChange={(e) => handlecountChange(index, e.target.value)}
                  placeholder={`Number of ${title}`}
                  className="w-full text-black border-none outline-none bg-transparent mt-2"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Services;
