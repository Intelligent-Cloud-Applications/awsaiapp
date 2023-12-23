import React, { useState } from 'react';

function Services() {
  const [services, setServices] = useState([
    { title: '', description: '' },
    { title: '', description: '' },
    { title: '', description: '' },
  ]);

  const handleServiceChange = (index, e) => {
    const updatedServices = [...services];
    updatedServices[index] = { ...updatedServices[index], [e.target.name]: e.target.value };
    setServices(updatedServices);
  };

  return (
    <div className="mx-auto max-w-[800px] px-8">
      <h1 className="font-medium text-7xl">SERVICE SECTION</h1>
      <h5 className="w-[28rem] text-[#939393]">
        Highlight services distinctly, showcasing their benefits and unique value propositions for your audience's needs.
      </h5>

      <div className="mt-8">
        {services.map((service, index) => (
          <div key={index} className="mt-4">
            <h2 className="font-medium text-xl">Service {index + 1}</h2>
            <input
              type="text"
              name="title"
              value={service.title}
              onChange={(e) => handleServiceChange(index, e)}
              placeholder="Service Title"
              className="w-full max-w-[28rem] text-black border-none outline-none bg-transparent mt-2"
            />
            <textarea
              name="description"
              value={service.description}
              onChange={(e) => handleServiceChange(index, e)}
              placeholder="Service Description"
              className="w-full max-w-[28rem] text-black border-none outline-none bg-transparent mt-2"
              rows={2}
            ></textarea>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;

