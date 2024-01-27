import React, { useState } from 'react';

function Services({ services, setServices,src_Components_Home_Why__h1,setsrc_Components_Home_Why__h1,src_Components_Home_Header3__h1,setsrc_Components_Home_Header3__h1,src_Components_Home_Header3__h2,setsrc_Components_Home_Header3__h2 }) {
  // const [services, setServices] = useState([
  //   { title: '', description: '' },
  //   { title: '', description: '' },
  //   { title: '', description: '' },
  // ]);
  const [isHeading, setHeading] = useState(false);
  const [issmallHeading, setsmallHeading] = useState(false);
  const [issubHeading, setsubHeading] = useState(false);

  const handleHeadingInputChange = (e) => {
    setsrc_Components_Home_Why__h1(e.target.value);
  };

  const handlesmallHeadingInputChange = (e) => {
    setsrc_Components_Home_Header3__h1(e.target.value);
  };
  

  const handlesubHeadingInputChange = (e) => {
    setsrc_Components_Home_Header3__h2(e.target.value);
  };

  const toggleHeadingInputVisibility = () => {
    setHeading(true);
  };

  const togglesmallHeadingInputVisibility = () => {
    setsmallHeading(true);
  };

  const togglesubHeadingInputVisibility = () => {
    setsubHeading(true);
  };
  // const [smallHeadingLineColor, setsmallHeadingLineColor] = useState("#939393");
  const handleServiceChange = (index, e) => {
    const updatedServices = [...services];
    updatedServices[index] = { ...updatedServices[index], [e.target.name]: e.target.value };
    setServices(updatedServices);
  };
  const [activeServiceIndex, setActiveServiceIndex] = useState(null);

  const toggleActiveService = (index) => {
    setActiveServiceIndex(index === activeServiceIndex ? null : index);
  };

  return (
    <div className="mx-auto max-w-[800px] px-8">
      <h1 className="font-medium text-7xl">SERVICE SECTION</h1>
      <h5 className="w-[28rem] max950:w-[17rem] text-[#939393]">
        Highlight services distinctly, showcasing their benefits and unique value propositions for your audience's needs.
      </h5>
      <div className="mt-4">
      <h5
          className="w-[28rem] text-[#939393] relative cursor-pointer py-1"
          onClick={toggleHeadingInputVisibility}
        >
          {isHeading ? (
            <input
              type="text"
              value={src_Components_Home_Why__h1}
              onChange={handleHeadingInputChange}
              className="w-[28rem] text-black border-none outline-none bg-transparent"
              placeholder="Enter Heading"
            />
          ) : (
            <span>{src_Components_Home_Why__h1 || "Heading (Why choose HappyPrancer?)"}</span>
          )}
        </h5>
        <div
          className="absolute left-[33px] right-0 w-[86%] h-[1px] bg-[#939393]"
          // style={{ backgroundColor: HeadingLineColor }}
        ></div>
        <h5
          className="w-[28rem] text-[#939393] relative cursor-pointer py-1"
          onClick={togglesmallHeadingInputVisibility}
        >
          {issmallHeading ? (
            <input
              type="text"
              value={src_Components_Home_Header3__h1}
              onChange={handlesmallHeadingInputChange}
              className="w-[28rem] text-black border-none outline-none bg-transparent"
              placeholder="Enter Sub Heading"
            />
          ) : (
            <span>{src_Components_Home_Header3__h1 || "Sub Heading (A Fitness Movement)"}</span>
          )}
        </h5>
        
        <div
          className="absolute left-[33px] right-0 w-[86%] h-[1px] bg-[#939393]"
          // style={{ backgroundColor: smallHeadingLineColor }}
        ></div>
         <h5
          className="w-[28rem] text-[#939393] relative cursor-pointer py-1"
          onClick={togglesubHeadingInputVisibility}
        >
          {issubHeading ? (
            <input
              type="text"
              value={src_Components_Home_Header3__h2}
              onChange={handlesubHeadingInputChange}
              className="w-[28rem] text-black border-none outline-none bg-transparent"
              placeholder="Enter Heading"
            />
          ) : (
            <span>{src_Components_Home_Header3__h2 || "Sub Heading (Why HappyPrancer?)"}</span>
          )}
        </h5>
        
        <div
          className="absolute left-[33px] right-0 w-[86%] h-[1px] bg-[#939393]"
          // style={{ backgroundColor: smallHeadingLineColor }}
        ></div>
        {services.map((service, index) => (
          <div key={index} className="mt-4">
            <h2 className="font-medium text-xl">Service {index + 1}</h2>
            <div className="relative">
              <input
                type="text"
                name="title"
                value={service.title}
                onChange={(e) => handleServiceChange(index, e)}
                placeholder="Service Title"
                className="w-full max-w-[28rem] text-black border-none outline-none bg-transparent mt-2"
                onFocus={() => toggleActiveService(index)}
                onBlur={() => toggleActiveService(null)}
              />
              <div
                className={`absolute left-0 right-0 bottom-0 h-[1px] ${
                  activeServiceIndex === index ? 'bg-black' : 'bg-[#939393]'
                }`}
              ></div>
            </div>
            <div className="relative">
              <textarea
                name="description"
                value={service.description}
                onChange={(e) => handleServiceChange(index, e)}
                placeholder="Service Description"
                className="w-full max-w-[28rem] text-black border-none outline-none bg-transparent mt-2 resize-none" // Added 'resize-none' class
                onFocus={() => toggleActiveService(index)}
                onBlur={() => toggleActiveService(null)}
                rows={1} // Adjust the number of rows as needed
                style={{
                  height: activeServiceIndex === index ? '4rem' : 'auto' // Adjust the height as per active state
                }}
              />
              <div
                className={`absolute left-0 right-0 bottom-0 h-[1px] ${
                  activeServiceIndex === index ? 'bg-black' : 'bg-[#939393]'
                }`}
              ></div>
            </div>
          </div>
        ))}
      </div>
      
          <div className="relative mt-4">
            {/* <input
              type="text"
              name="danceType"
              value={services[0].danceType} // Assuming it's stored in the first service object
              onChange={(e) => handleServiceChange(0, e)} // Assuming dance type modifies the first service object
              placeholder="What type of dance do you teach(like zumba,odishi)"
              className="w-full max-w-[28rem] text-black border-none outline-none bg-transparent mt-2"
              onFocus={() => toggleActiveService(services.length)} // Use a unique index for the dance type container
              onBlur={() => toggleActiveService(null)}
            />
            <div
              className={`absolute left-0 right-0 bottom-0 h-[1.5px] ${
                activeServiceIndex === services.length ? 'bg-black' : 'bg-[#939393]'
              }`}
            ></div> */}
          </div>
    </div>
  
  );
}

export default Services;