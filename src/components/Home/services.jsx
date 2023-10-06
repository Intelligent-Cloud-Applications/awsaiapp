import React from "react";
import Service from "../../utils/ServicesPic.png";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import s1 from "../../utils/Assets/service1.png";
import s2 from "../../utils/Assets/service2.png";
import s3 from "../../utils/Assets/service3.png";
import s4 from "../../utils/Assets/service4.png";
import s5 from "../../utils/Assets/service5.png";
import s6 from "../../utils/Assets/service6.png";

const Services = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleUnhover = () => {
    setIsHovered(false);
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
              id="Component3"
              className={`relative w-[70%] h-[25vh] max1008:w-64 shadow-[5px_5px_20px_0px_rgba(0,_0,_0,_0.25)] overflow-hidden flex flex-col items-start rounded-[23px] -mr-[5rem] z-20 ${
                isHovered ? `text-white` : `bg-white `
              } `}
              onMouseEnter={handleHover}
              onMouseLeave={handleUnhover}
            >
              <div
                className={`flex flex-col justify-center pt-6 gap-3 items-start rounded${
                  isHovered ? "h-[0] hidden" : "h-[25vh]"
                }`}
              >
                <div className="font-['Inter'] font-semibold leading-[28px] ml-6 w-5/6">
                  User interface & User experience{" "}
                </div>

                <div className="self-stretch relative flex flex-col ml-6 items-start">
                  <div className="text-sm font-['Inter'] leading-[23px] relative w-full max1008:text-xs">
                    UI: Elegant design, intuitive interactions.
                    <br />
                    UX: Purposeful journeys, foreseeing needs, meaningful
                    engagements, delightful digital connections.
                  </div>
                </div>
              </div>

              <div
                className={`flex flex-col justify-center items-start absolute bg-[#30AFBC] pl-10 rounded-[1.5rem] overflow-hidden transition-all duration-500 ease${
                  isHovered
                    ? "right-0 -top-50  h-[25vh] w-[25vw] "
                    : " top-[170px] -right-1 w-10 text-[#30AFBC]"
                }`}
              >
                <div className="font-['Inter'] font-semibold leading-[25px] ml-5 w-5/6">
                  User interface & User experience{" "}
                </div>
                <ul className="list-disc pl-10 w-full">
                  <li>Intuitive UI Design</li>
                  <li>Responsive Web Design</li>
                  <li>Accessibility</li>
                  <li>Interactive Elements</li>
                </ul>
                <div
                  onClick={() => {
                    Navigate("/coustmer");
                  }}
                  className="ml-10 mt-3 border-white border-2 px-2 py-1 rounded hover:bg-white hover:text-black"
                >
                  View More
                </div>
              </div>
            </div>

            <div
              id="Component3"
              className="w-80 max1008:w-64 shadow-[5px_5px_20px_0px_rgba(0,_0,_0,_0.25)] overflow-hidden flex flex-col items-start rounded-[23px]"
            >
              <div className="bg-white flex flex-col justify-end pt-6 gap-3 items-start rounded">
                <div className="font-['Inter'] font-semibold leading-[28px] ml-6 w-5/6">
                  Personalization{" "}
                </div>

                <div className="self-stretch relative flex flex-col ml-6 pb-8 items-start">
                  <div className="text-sm font-['Inter'] leading-[23px] relative w-full max1008:text-xs">
                    With personalization, we craft unique journeys for every
                    customer, aligning their preferences with our offerings to
                    create unparalleled satisfaction and brand loyalty.
                  </div>
                </div>
              </div>
            </div>
            <div
              id="Component3"
              className="w-80 max1008:w-64 shadow-[5px_5px_20px_0px_rgba(0,_0,_0,_0.25)] overflow-hidden flex flex-col items-start rounded-[23px] -mr-[5rem] z-20"
            >
              <div className="bg-white flex flex-col justify-end pt-6 gap-3 items-start rounded">
                <div className="font-['Inter'] font-semibold leading-[28px] ml-6 w-5/6">
                  Login & identity managment{" "}
                </div>

                <div className="self-stretch relative flex flex-col ml-6 pb-8 items-start">
                  <div className="text-sm font-['Inter'] leading-[23px] relative w-full max1008:text-xs">
                    Advanced Identity Solutions: Optimize user authentication,
                    authorization, and tracking with our cutting-edge login and
                    identity management.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="h-[100vh] w-[30%] flex flex-col justify-center">
            <img className="h-[30rem] object-contain" src={Service} alt="" />
          </div>

          <div className="w-[30%] flex flex-col justify-evenly items-start pr-5">
            <div
              id="Component3"
              className="w-80 max1008:w-64 shadow-[5px_5px_20px_0px_rgba(0,_0,_0,_0.25)] overflow-hidden flex flex-col items-start rounded-[23px] -ml-[5rem] z-20"
            >
              <div className="bg-white flex flex-col justify-end pt-6 gap-3 items-start rounded">
                <div className="font-['Inter'] font-semibold leading-[28px] ml-6 w-5/6">
                  Trade Specific features{" "}
                </div>

                <div className="self-stretch relative flex flex-col ml-6 pb-8 items-start">
                  <div className="text-sm font-['Inter'] leading-[23px] relative w-full max1008:text-xs">
                    Our services offer industry-specific features, empowering
                    businesses with tools and functionalities optimized for
                    success in their respective fields.
                  </div>
                </div>
              </div>
            </div>
            <div
              id="Component3"
              className="w-80 max1008:w-64 shadow-[5px_5px_20px_0px_rgba(0,_0,_0,_0.25)] overflow-hidden flex flex-col items-start rounded-[23px]"
            >
              <div className="bg-white flex flex-col justify-end pt-6 gap-3 items-start rounded">
                <div className="font-['Inter'] font-semibold leading-[28px] ml-6 w-5/6">
                  Leads & customer tracking{" "}
                </div>

                <div className="self-stretch relative flex flex-col ml-6 pb-8 items-start">
                  <div className="text-sm font-['Inter'] leading-[23px] relative w-full max1008:text-xs">
                    Gain valuable leads and track customer interactions.
                    Leverage data-driven insights for effective business growth
                    and improved customer engagement
                  </div>
                </div>
              </div>
            </div>
            <div
              id="Component3"
              className="w-80 max1008:w-64 shadow-[5px_5px_20px_0px_rgba(0,_0,_0,_0.25)] overflow-hidden flex flex-col items-start rounded-[23px] -ml-[5rem] z-20"
            >
              <div className="bg-white flex flex-col justify-end pt-6 gap-3 items-start rounded">
                <div className="font-['Inter'] font-semibold leading-[28px] ml-6 w-5/6">
                  Payments{" "}
                </div>

                <div className="self-stretch relative flex flex-col ml-6 pb-8 items-start">
                  <div className="text-sm font-['Inter'] leading-[23px] relative w-full max1008:text-xs">
                    Secure and Convenient Payments: Experience hassle-free
                    transactions with our trusted payment solutions, ensuring
                    data security and peace of mind with seamless transactions
                  </div>
                </div>
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
          <img className="h-[18vh] max500:h-[14vh] " src={s1} alt="" />
          <h1 className=" max500:text-xl text-7xl font-semibold">User interface & User experience </h1>
          <p className="w-[65%] max500:w-[82%] max500:text-base text-xl">UI: Elegant design, intuitive interactions.UX: Purposeful journeys, foreseeing needs, meaningful engagements, delightful digital connections.</p>
          <button className="bg-[#30AFBC] text-white px-4 py-2 text-xl max500:text-base rounded">READ MORE</button>
        </div>

        <div className="flex flex-col items-center gap-5 text-center font-inter my-16 p-2">
          <img className="h-[18vh] max500:h-[14vh]" src={s2} alt="" />
          <h1 className=" max500:text-xl text-7xl font-semibold">Personalization </h1>
          <p className="w-[65%] max500:w-[82%] max500:text-base text-xl">With personalization, we craft unique journeys for every customer, aligning their preferences with our offerings to create unparalleled satisfaction and brand loyalty.</p>
          <button className="bg-[#30AFBC] text-white px-4 py-2 text-xl max500:text-base rounded">READ MORE</button>
        </div>

        <div className="flex flex-col items-center gap-5 text-center font-inter my-16 p-2">
          <img className="h-[18vh] max500:h-[14vh]" src={s3} alt="" />
          <h1 className=" max500:text-xl text-7xl font-semibold">Login & identity managment </h1>
          <p className="w-[65%] max500:w-[82%] max500:text-base text-xl">Advanced Identity Solutions: Optimize user authentication, authorization, and tracking with our cutting-edge login and identity management.</p>
          <button className="bg-[#30AFBC] text-white px-4 py-2 text-xl max500:text-base rounded">READ MORE</button>
        </div>

        <div className="flex flex-col items-center gap-5 text-center font-inter my-16 p-2">
          <img className="h-[18vh] max500:h-[14vh]" src={s4} alt="" />
          <h1 className=" max500:text-xl text-7xl font-semibold">Trade Specific features </h1>
          <p className="w-[65%] max500:w-[82%] max500:text-base text-xl">Our services offer industry-specific features, empowering businesses with tools and functionalities optimized for success in their respective fields.</p>
          <button className="bg-[#30AFBC] text-white px-4 py-2 text-xl max500:text-base rounded">READ MORE</button>
        </div>

        <div className="flex flex-col items-center gap-5 text-center font-inter my-16 p-2">
          <img className="h-[18vh] max500:h-[14vh]" src={s5} alt="" />
          <h1 className=" max500:text-xl text-7xl font-semibold">Leads & customer tracking </h1>
          <p className="w-[65%] max500:w-[82%] max500:text-base text-xl">Gain valuable leads and track customer interactions. Leverage data-driven insights for effective business growth and improved customer engagement</p>
          <button className="bg-[#30AFBC] text-white px-4 py-2 text-xl max500:text-base rounded">READ MORE</button>
        </div>

        <div className="flex flex-col items-center gap-5 text-center font-inter my-16 p-2">
          <img className="h-[18vh] max500:h-[14vh]" src={s6} alt="" />
          <h1 className=" max500:text-xl text-7xl font-semibold">Payments </h1>
          <p className="w-[65%] max500:w-[82%] max500:text-base text-xl">Secure and Convenient Payments: Experience hassle-free transactions with our trusted payment solutions, ensuring data security and peace of mind with seamless transactions</p>
          <button className="bg-[#30AFBC] text-white px-4 py-2 text-xl max500:text-base rounded">READ MORE</button>
        </div>


      </div>

    </div>
  );
};
export default Services;
