import React from "react";
import Service from "../../utils/ServicesPic.png";

const Services = () => {
    return (
        <div className="w-full h-[120vh] bg-[#EDEDED]">
            <div className="h-[20vh] w-full flex items-center justify-center">
                <h1 className="font-black text-31xl font-poppins">
                    WHY
                    <span className="text-[#30AFBC] px-3">CHOOSE</span>
                    US?</h1>
            </div>

      <div className="flex flex-row h-[100vh] w-[110vw]">
        <div className="w-[30%] flex flex-col justify-evenly items-end pl-5">
        <div
            id="Component3"
            className="w-80 max1008:w-64 shadow-[5px_5px_20px_0px_rgba(0,_0,_0,_0.25)] overflow-hidden flex flex-col items-start rounded-[23px]  -mr-[5rem] z-20"
          >
            <div className="bg-white flex flex-col justify-end pt-6 gap-3 items-start rounded">
              <div className="font-['Inter'] font-semibold leading-[28px] ml-6 w-5/6">
                User interface & User experience{" "}
              </div>

                            <div className="self-stretch relative flex flex-col ml-6 pb-8 items-start">
                                <div className="text-sm font-['Inter'] leading-[23px] relative w-full max1008:text-xs">
                                    UI: Elegant design, intuitive interactions.
                                    <br />
                                    UX: Purposeful journeys, foreseeing needs, meaningful
                                    engagements, delightful digital connections.
                                    <a href="/User_interface"><button>View more</button></a>
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
                                Personalization{" "}
                            </div>

              <div className="self-stretch relative flex flex-col ml-6 pb-8 items-start">
                <div className="text-sm font-['Inter'] leading-[23px] relative w-full max1008:text-xs">
                With personalization, we craft unique journeys for every customer, aligning their preferences with our offerings to create unparalleled satisfaction and brand loyalty.
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
                                    Advanced Identity Solutions: Optimize user authentication, authorization, and tracking with our cutting-edge login and identity management.
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
            className="w-80 max1008:w-64 shadow-[5px_5px_20px_0px_rgba(0,_0,_0,_0.25)] overflow-hidden flex flex-col items-start rounded-[23px] -ml-[5rem] z-20">
            <div className="bg-white flex flex-col justify-end pt-6 gap-3 items-start rounded">
              <div className="font-['Inter'] font-semibold leading-[28px] ml-6 w-5/6">
              Trade Specific features{" "}
              </div>

                            <div className="self-stretch relative flex flex-col ml-6 pb-8 items-start">
                                <div className="text-sm font-['Inter'] leading-[23px] relative w-full max1008:text-xs">
                                    Our services offer industry-specific features, empowering businesses with tools and functionalities optimized for success in their respective fields.
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
                Gain valuable leads and track customer interactions. Leverage data-driven insights for effective business growth and improved customer engagement
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
                                    Secure and Convenient Payments: Experience hassle-free transactions with our trusted payment solutions, ensuring data security and peace of mind with seamless transactions
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};
export default Services;