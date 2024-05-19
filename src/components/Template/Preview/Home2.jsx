import React from 'react';


const Home2 = () => {
    // Default data in case services data is not provided or incomplete
    const servicesData = {Services: [
        {
          title: "Stay Home Stay Fit",
          items: [
            "Free online classes via Google Meet/Zoom for continuous fitness.",
            "Classes available for various fitness levels, from beginner to advanced.",
            "Nutritional guidance provided to complement fitness routines.",
          ],
        },
        {
          title: "Instructor Led Classes",
          items: [
            "Classes led by highly experienced Zumba Internationally Certified instructors.",
            "Variety of dance styles incorporated for a dynamic and engaging workout.",
            "Regular updates on new routines and techniques to keep classes fresh.",
          ],
        },
        {
          title: "Personal Exercise",
          items: [
            "One-on-one sessions tailored to individual fitness goals and preferences.",
            "Customized workout plans designed to maximize results.",
            "Availability of virtual consultations for convenience and accessibility.",
          ],
        },
        {
          title: "Group Exercise with Friends",
          items: [
            "Opportunity to exercise with friends in a supportive and motivating environment.",
            "Social interaction and camaraderie to enhance the workout experience.",
            "Regular group challenges and competitions to keep participants engaged and motivated.",
          ],
        },
      ]}
    // const defaultData = [
    //     {
    //         title: 'Stay Home Stay Fit',
    //         description: 'Free online classes via Google meet/Zoom for continuous workout.',
    //     },
    //     {
    //         title: 'Instructor Led Classes',
    //         description: 'Online classes are conducted by Zumba Internationally Certified instructors.',
    //     },
    //     {
    //         title: 'Personal & Group Exercise',
    //         description: 'Personal (person-to-person trainer based) and Group exercise with friends.',
    //     },
    // ];

    // // Merge default data with provided services data
    // const mergedData = defaultData.map((defaultItem, index) => {
    //     const serviceItem = services[index] || {};
    //     return {
    //         title: serviceItem.title || defaultItem.title,
    //         description: serviceItem.description || defaultItem.description,
    //     };
    // });

    return (
        <>
          <div className="bg-white flex justify-center flex-col items-center min-h-[20vh] max850:h-auto fixed w-[78%] ml-[7.56%] py-12 relative">
            <div className="New flex justify-between max600:h-[40rem] h-[36rem] blurimg w-auto relative pr-3 pl-3 max600:flex-col max600:mx-0 max600:items-start max600:m-0 max600:w-[100vw] overflow-hidden gap-4" style={{ backgroundSize: 'cover' }}>
                <div className="p-5 flex flex-col max600:items-center justify-between bg-transparent border-y-[0.2rem] rounded-tl-lg rounded-bl-lg border-l-[0.2rem] w-[24vw] h-[35rem] max600:h-auto max600:border-0 max600:w-[100%]" style={{ borderColor: '#225C59' }}>
                    {servicesData.Services.slice(0, 2).map((service, index) => (
                        <div className="w-[16rem] max800:w-[12rem] max600:w-[100%]" key={index}>
                            <h1 className="text-[1rem] max800:text-[1rem] font-russo max600:text-[1rem]" style={{ color: servicesData.ServicesBg ? "white" : "black" }}>
                                {service.title}
                            </h1>
                            <ul className="max800:text-[0.7rem] list-disc max950:pl-[1rem] max600:pl-0 text-justify">
                                {service.items.map((item, itemIndex) => (
                                    <li key={itemIndex} style={{ color: servicesData.ServicesBg ? "white" : "black" }}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="Over p-5 flex flex-col max600:items-center max600:pt-0 items-end bg-transparent border-y-[0.2rem] rounded-tr-lg rounded-br-lg border-r-[0.2rem] w-[24vw] h-[35rem] max600:h-auto max600:border-0 max600:w-[100%] justify-between" style={{ borderColor: '#225C59' }}>
                    {servicesData.Services.slice(2).map((service, index) => (
                        <div className="w-[16rem] max800:w-[12rem] max600:w-[100%]" key={index}>
                            <h1 className="text-[1rem] max800:text-[1rem] max600:text-[1rem] font-russo max950:pl-[1.5rem] max600:pl-0" style={{ color: servicesData.ServicesBg ? "white" : "black" }}>
                                {service.title}
                            </h1>
                            <ul className="max800:text-[0.7rem] list-disc max950:pl-[1rem] max600:pl-0 text-justify">
                                {service.items.map((item, itemIndex) => (
                                    <li key={itemIndex} style={{ color: servicesData.ServicesBg ? "white" : "black" }} >{item}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        </>
    );
};

export default Home2;