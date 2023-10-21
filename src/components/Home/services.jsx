import React from "react";
import Service from "../../utils/ServicesPic.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import s1 from "../../utils/Assets/service1.png";
import s2 from "../../utils/Assets/service2.png";
import s3 from "../../utils/Assets/service3.png";
import s4 from "../../utils/Assets/service4.png";
import s5 from "../../utils/Assets/service5.png";
import s6 from "../../utils/Assets/service6.png";

const Services = () => {
  const Navigate = useNavigate();

  const [isHovered1, setIsHovered1] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);
  const [isHovered3, setIsHovered3] = useState(false);
  const [isHovered4, setIsHovered4] = useState(false);
  const [isHovered5, setIsHovered5] = useState(false);
  const [isHovered6, setIsHovered6] = useState(false);

  const handleHover1 = () => {
    setIsHovered1(true);
  };

  const handleUnhover1 = () => {
    setIsHovered1(false);
  };

  const handleHover2 = () => {
    setIsHovered2(true);
  };

  const handleUnhover2 = () => {
    setIsHovered2(false);
  };

  const handleHover3 = () => {
    setIsHovered3(true);
  };

  const handleUnhover3 = () => {
    setIsHovered3(false);
  };

  const handleHover4 = () => {
    setIsHovered4(true);
  };

  const handleUnhover4 = () => {
    setIsHovered4(false);
  };

  const handleHover5 = () => {
    setIsHovered5(true);
  };

  const handleUnhover5 = () => {
    setIsHovered5(false);
  };
  const handleHover6 = () => {
    setIsHovered6(true);
  };

  const handleUnhover6 = () => {
    setIsHovered6(false);
  };

  return (
    <div>
      <div className="w-full bg-[#EDEDED] max800:hidden">
        <div className="h-[20vh] w-full flex items-center justify-center">
          <h1 className="font-black text-31xl font-poppins">
            WHY
            <span className="text-[#30AFBC] px-3">CHOOSE</span>
            US?
          </h1>
        </div>

        <div className="flex flex-row h-[100vh] w-[110vw]">
          <div className="w-[30%] flex flex-col justify-evenly items-end pl-5">
            <div
              id="Component1"
              className={`relative w-80 h-48 max1008:w-64 max1008:h-20vh shadow-[5px_5px_20px_0px_rgba(0,_0,_0,_0.25)] overflow-hidden flex flex-col items-start rounded-[23px] -mr-[5rem] z-20`}
              onMouseEnter={handleHover1}
              onMouseLeave={handleUnhover1}
            >
              <div className="bg-white flex flex-col justify-start pt-6 gap-3 items-start rounded h-full">
                <div className="font-['Inter'] font-semibold ml-6 text-base max1008:text-sm">
                  User interface & User experience{" "}
                </div>

                <div className="self-stretch relative flex flex-col ml-6 pb-8 items-start">
                  <div className="font-['Inter'] relative w-full text-sm max1008:text-xs leading-[1.4rem]">
                    UI: Elegant design, intuitive interactions.
                    <br />
                    UX: Purposeful journeys, foreseeing needs, meaningful
                    engagements, delightful digital connections.
                  </div>
                </div>
              </div>

              <div
                className={`absolute h-full w-full flex flex-col justify-center items-start bg-[#30AFBC] pl-5 transition-all duration-500 ease rounded overflow-hidden${
                  isHovered1
                    ? "transform translate-x-0 translate-y-0 text-white"
                    : "transform translate-x-[30rem] translate-y-[30rem]"
                }`}
              >
                <div className="font-['Inter'] font-semibold pb-2 pl-1 text-base max1008:text-sm">
                  User interface & User experience
                </div>
                <ul className="list-disc pl-5 w-full text-sm max1008:text-xs leading-5">
                  <li>Intuitive UI Design</li>
                  <li>Responsive Web Design</li>
                  <li>Accessibility</li>
                  <li>Interactive Elements</li>
                </ul>
                <button
                  onClick={() => {
                    Navigate("/User_interface");
                  }}
                  className="text-xs ml-5 mt-4 px-2 py-1 rounded text-white border-white hover:bg-white border-[1px] hover:text-[#30AFBC] duration-300"
                >
                  View More
                </button>
              </div>
            </div>

            <div
              id="Component2"
              className="relative w-80 h-48 max1008:w-64 shadow-[5px_5px_20px_0px_rgba(0,_0,_0,_0.25)] overflow-hidden flex flex-col items-start rounded-[23px]"
              onMouseEnter={handleHover2}
              onMouseLeave={handleUnhover2}
            >
              <div className="bg-white flex flex-col justify-start pt-6 gap-3 rounded h-full">
                <div className="font-['Inter'] font-semibold ml-6">
                  Personalization{" "}
                </div>

                <div className="self-stretch relative flex flex-col ml-6 pb-8 items-start">
                  <div className="text-sm font-['Inter'] leading-[1.4rem] relative w-full max1008:text-xs">
                    With personalization, we craft unique journeys for every
                    customer, aligning their preferences with our offerings to
                    create unparalleled satisfaction and brand loyalty.
                  </div>
                </div>
              </div>

              <div
                className={`absolute h-full w-full flex flex-col justify-center items-start bg-[#30AFBC] pl-5 overflow-hidden transition-all duration-500 ease rounded${
                  isHovered2
                    ? "transform -translate-x-0 translate-y-0 text-white"
                    : "transform translate-x-[30rem] translate-y-[30rem]"
                }`}
              >
                <div className="font-['Inter'] font-semibold pb-2 pl-1 text-base max1008:text-sm ">
                  Personalization
                </div>
                <ul className="list-disc pl-5 w-full text-sm max1008:text-xs leading-5">
                  <li>Dynamic Content Personalization</li>
                  <li>Segmentation</li>
                  <li>Contextual Recommendations</li>
                  <li>User Preference Management</li>
                  <li>Adaptive User Interfaces</li>
                </ul>
                <button
                  onClick={() => {
                    Navigate("/Personalization");
                  }}
                  className="text-xs ml-5 mt-2 px-2 py-1 rounded text-white border-white hover:bg-white border-[1px] hover:text-[#30AFBC] duration-300"
                >
                  View More
                </button>
              </div>
            </div>

            <div
              id="Component3"
              className="relative w-80 h-48 max1008:w-64 shadow-[5px_5px_20px_0px_rgba(0,_0,_0,_0.25)] overflow-hidden flex flex-col items-start rounded-[23px] -mr-[5rem] z-20"
              onMouseEnter={handleHover3}
              onMouseLeave={handleUnhover3}
            >
              <div className="bg-white flex flex-col justify-start pt-6 gap-3 items-start rounded h-full">
                <div className="font-['Inter'] font-semibold ml-6">
                  Login & identity managment
                </div>

                <div className="self-stretch relative flex flex-col ml-6 pb-8 items-start">
                  <div className="text-sm font-['Inter'] leading-[1.4rem] relative w-full max1008:text-xs">
                    Advanced Identity Solutions: Optimize user authentication,
                    authorization, and tracking with our cutting-edge login and
                    identity management.
                  </div>
                </div>
              </div>

              <div
                className={`absolute h-full w-full flex flex-col justify-center items-start bg-[#30AFBC] pl-5 overflow-hidden transition-all duration-500 ease rounded${
                  isHovered3
                    ? "transform -translate-x-0 translate-y-0 text-white"
                    : "transform translate-x-[30rem] translate-y-[30rem]"
                }`}
              >
                <div className="font-['Inter'] font-semibold pb-2 pl-1 text-base max1008:text-sm ">
                  Login & identity managment
                </div>
                <ul className="list-disc pl-5 w-full text-sm max1008:text-xs leading-5">
                  <li>Secure Authentication</li>
                  <li>Single Sign-On (SSO)</li>
                  <li>Identity Verification</li>
                  <li>Password Management</li>
                  <li>User Access Control</li>
                </ul>
                <button
                  onClick={() => {
                    Navigate("/identity");
                  }}
                  className="text-xs ml-5 mt-2 px-2 py-1 rounded text-white border-white hover:bg-white border-[1px] hover:text-[#30AFBC] duration-300"
                >
                  View More
                </button>
              </div>
            </div>
          </div>

          <div className="h-[100vh] w-[30%] flex flex-col justify-center">
            <img className="h-[30rem] object-contain" src={Service} alt="" />
          </div>

          <div className="w-[30%] flex flex-col justify-evenly items-start pr-5">
            <div
              id="Component4"
              className="relative w-80 h-48 max1008:w-64 shadow-[5px_5px_20px_0px_rgba(0,_0,_0,_0.25)] overflow-hidden flex flex-col items-start rounded-[23px] -ml-[5rem] z-20"
              onMouseEnter={handleHover4}
              onMouseLeave={handleUnhover4}
            >
              <div className="bg-white flex flex-col justify-start pt-6 gap-3 items-start rounded h-full">
                <div className="font-['Inter'] font-semibold ml-6">
                  Trade Specific features
                </div>

                <div className="self-stretch relative flex flex-col ml-6 pb-8 items-start">
                  <div className="text-sm font-['Inter'] leading-[1.4rem] relative w-full max1008:text-xs">
                    Our services offer industry-specific features, empowering
                    businesses with tools and functionalities optimized for
                    success in their respective fields.
                  </div>
                </div>
              </div>

              <div
                className={`absolute h-full w-full flex flex-col justify-center items-start bg-[#30AFBC] pl-5 overflow-hidden transition-all duration-500 ease rounded${
                  isHovered4
                    ? "transform translate-x-0 translate-y-0 text-white"
                    : "transform -translate-x-[30rem] translate-y-[30rem]"
                }`}
              >
                <div className="font-['Inter'] font-semibold pb-2 pl-1 text-base max1008:text-sm ">
                  Trade Specific features
                </div>
                <ul className="list-disc pl-5 w-full text-sm max1008:text-xs leading-5">
                  <li>Industry-Specific Customization</li>
                  <li>Real-Time Data Updates</li>
                  <li>Compliance and Regulations</li>
                  <li>Reporting and Analytics</li>
                  <li>Inventory Management</li>
                </ul>
                <button
                  onClick={() => {
                    Navigate("/trade");
                  }}
                  className="text-xs ml-5 mt-2 px-2 py-1 rounded text-white border-white hover:bg-white border-[1px] hover:text-[#30AFBC] duration-300"
                >
                  View More
                </button>
              </div>
            </div>

            <div
              id="Component5"
              className="relative h-48 w-80 max1008:w-64 shadow-[5px_5px_20px_0px_rgba(0,_0,_0,_0.25)] overflow-hidden flex flex-col items-start rounded-[23px]"
              onMouseEnter={handleHover5}
              onMouseLeave={handleUnhover5}
            >
              <div className="bg-white flex flex-col justify-start pt-6 gap-3 items-start rounded h-full">
                <div className="font-['Inter'] font-semibold ml-6">
                  Leads & customer tracking
                </div>

                <div className="self-stretch relative flex flex-col ml-6 pb-8 items-start">
                  <div className="text-sm font-['Inter'] leading-[1.4rem] relative w-full max1008:text-xs">
                    Gain valuable leads and track customer interactions.
                    Leverage data-driven insights for effective business growth
                    and improved customer engagement
                  </div>
                </div>
              </div>

              <div
                className={`absolute h-full w-full flex flex-col justify-center items-start bg-[#30AFBC] pl-5 overflow-hidden transition-all duration-500 ease rounded${
                  isHovered5
                    ? "transform -translate-x-0 translate-y-0 text-white"
                    : "transform -translate-x-[30rem] translate-y-[30rem]"
                }`}
              >
                <div className="font-['Inter'] font-semibold pb-2 pl-1 text-base max1008:text-sm ">
                  Leads & customer tracking
                </div>
                <ul className="list-disc pl-5 w-full text-sm max1008:text-xs leading-5">
                  <li>Customer Activity Tracking</li>
                  <li>Lead Scoring</li>
                  <li>Performance Analytics</li>
                  <li>SEO-Analytics Integration</li>
                  <li>Lead Capture Forms</li>
                </ul>
                <button
                  onClick={() => {
                    Navigate("/coustmer");
                  }}
                  className="text-xs ml-5 mt-2 px-2 py-1 rounded text-white border-white hover:bg-white border-[1px] hover:text-[#30AFBC] duration-300"
                >
                  View More
                </button>
              </div>
            </div>

            <div
              id="Component6"
              className="relative w-80 h-48 max1008:w-64 shadow-[5px_5px_20px_0px_rgba(0,_0,_0,_0.25)] overflow-hidden flex flex-col items-start rounded-[23px] -ml-[5rem] z-20"
              onMouseEnter={handleHover6}
              onMouseLeave={handleUnhover6}
            >
              <div className="bg-white flex flex-col justify-start pt-6 gap-3 items-start rounded h-full">
                <div className="font-['Inter'] font-semibold ml-6">
                  Payments
                </div>

                <div className="self-stretch relative flex flex-col ml-6 pb-8 items-start">
                  <div className="text-sm font-['Inter'] leading-[1.4rem] relative w-full max1008:text-xs">
                    Secure and Convenient Payments: Experience hassle-free
                    transactions with our trusted payment solutions, ensuring
                    data security and peace of mind with seamless transactions
                  </div>
                </div>
              </div>

              <div
                className={`absolute h-full w-full flex flex-col justify-center items-start bg-[#30AFBC] pl-5 overflow-hidden transition-all duration-500 ease rounded${
                  isHovered6
                    ? "transform -translate-x-0 translate-y-0 text-white"
                    : "transform -translate-x-[30rem] translate-y-[30rem]"
                }`}
              >
                <div className="font-['Inter'] font-semibold pb-2 pl-1 text-base max1008:text-sm ">
                  Payments
                </div>
                <ul className="list-disc pl-5 w-full text-sm max1008:text-xs leading-5">
                  <li>Secure Authentication</li>
                  <li>Single Sign-On (SSO)</li>
                  <li>Identity Verification</li>
                  <li>Password Management</li>
                  <li>User Access Control</li>
                </ul>
                <button
                  onClick={() => {
                    Navigate("/payment");
                  }}
                  className="text-xs ml-5 mt-2 px-2 py-1 rounded text-white border-white hover:bg-white border-[1px] hover:text-[#30AFBC] duration-300"
                >
                  View More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* services for small screens */}
      <div className="w-full bg-white overflow-hidden min800:hidden">
        <div className="h-[20vh] w-full flex items-center justify-center">
          <h1 className="font-black text-[2.8rem] max500:text-[2rem] font-poppins">
            WHY
            <span className="text-[#30AFBC] px-3">CHOOSE</span>
            US?
          </h1>
        </div>

        <div className="flex flex-col items-center gap-5 text-center font-inter my-16 p-2">
          <img className="h-[15vh] max500:h-[11vh] " src={s1} alt="" />
          <h1 className=" max500:text-xl text-7xl font-semibold">
            User interface & User experience{" "}
          </h1>
          <p className="w-[65%] max500:w-[82%] max500:text-base text-xl">
            UI: Elegant design, intuitive interactions.UX: Purposeful journeys,
            foreseeing needs, meaningful engagements, delightful digital
            connections.
          </p>
          <button
          onClick={() => {
            Navigate("/User_interface");
          }}
          className="bg-[#30AFBC] text-white px-4 py-2 text-xl max500:text-base rounded">
            READ MORE
          </button>
        </div>

        <div className="flex flex-col items-center gap-5 text-center font-inter my-16 p-2">
          <img className="h-[15vh] max500:h-[11vh]" src={s2} alt="" />
          <h1 className=" max500:text-xl text-7xl font-semibold">
            Personalization{" "}
          </h1>
          <p className="w-[65%] max500:w-[82%] max500:text-base text-xl">
            With personalization, we craft unique journeys for every customer,
            aligning their preferences with our offerings to create unparalleled
            satisfaction and brand loyalty.
          </p>
          <button
          onClick={() => {
            Navigate("/Personalization");
          }}
          className="bg-[#30AFBC] text-white px-4 py-2 text-xl max500:text-base rounded">
            READ MORE
          </button>
        </div>

        <div className="flex flex-col items-center gap-5 text-center font-inter my-16 p-2">
          <img className="h-[15vh] max500:h-[11vh]" src={s3} alt="" />
          <h1 className=" max500:text-xl text-7xl font-semibold">
            Login & identity managment{" "}
          </h1>
          <p className="w-[65%] max500:w-[82%] max500:text-base text-xl">
            Advanced Identity Solutions: Optimize user authentication,
            authorization, and tracking with our cutting-edge login and identity
            management.
          </p>
          <button
          onClick={() => {
            Navigate("/identity");
          }}
          className="bg-[#30AFBC] text-white px-4 py-2 text-xl max500:text-base rounded">
            READ MORE
          </button>
        </div>

        <div className="flex flex-col items-center gap-5 text-center font-inter my-16 p-2">
          <img className="h-[15vh] max500:h-[11vh]" src={s4} alt="" />
          <h1 className=" max500:text-xl text-7xl font-semibold">
            Trade Specific features{" "}
          </h1>
          <p className="w-[65%] max500:w-[82%] max500:text-base text-xl">
            Our services offer industry-specific features, empowering businesses
            with tools and functionalities optimized for success in their
            respective fields.
          </p>
          <button
          onClick={() => {
            Navigate("/trade");
          }}
          className="bg-[#30AFBC] text-white px-4 py-2 text-xl max500:text-base rounded">
            READ MORE
          </button>
        </div>

        <div className="flex flex-col items-center gap-5 text-center font-inter my-16 p-2">
          <img className="h-[15vh] max500:h-[11vh]" src={s5} alt="" />
          <h1 className=" max500:text-xl text-7xl font-semibold">
            Leads & customer tracking{" "}
          </h1>
          <p className="w-[65%] max500:w-[82%] max500:text-base text-xl">
            Gain valuable leads and track customer interactions. Leverage
            data-driven insights for effective business growth and improved
            customer engagement
          </p>
          <button
          onClick={() => {
            Navigate("/coustmer");
          }}
          className="bg-[#30AFBC] text-white px-4 py-2 text-xl max500:text-base rounded">
            READ MORE
          </button>
        </div>

        <div className="flex flex-col items-center gap-5 text-center font-inter my-16 p-2">
          <img className="h-[15vh] max500:h-[11vh]" src={s6} alt="" />
          <h1 className=" max500:text-xl text-7xl font-semibold">Payments </h1>
          <p className="w-[65%] max500:w-[82%] max500:text-base text-xl">
            Secure and Convenient Payments: Experience hassle-free transactions
            with our trusted payment solutions, ensuring data security and peace
            of mind with seamless transactions
          </p>
          <button
            onClick={() => {
              Navigate("/payment");
            }}
            className="bg-[#30AFBC] text-white px-4 py-2 text-xl max500:text-base rounded"
          >
            READ MORE
          </button>
        </div>
      </div>
    </div>
  );
};
export default Services;
