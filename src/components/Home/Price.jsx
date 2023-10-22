import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import "../Home/Price.css";
import Faq from "react-faq-component";
import plus1 from "../../utils/plus.svg";

const Price = () => {
  const Navigate = useNavigate();

  const data = {
    rows: [
      {
        title: `What makes the "Advance" plan stand out?`,
        content: `The "Advance" plan offers a complete paperless ecosystem, integrated payment solutions, expert ads management, digital marketing, data analysis, and SEO integration, providing a comprehensive growth package.`,
      },
      {
        title: "Can I switch plans as my business evolves?",
        content: `Yes, you can easily upgrade or downgrade plans to match your changing business needs and goals.`,
      },
      {
        title: "Can I customize features beyond the listed options?",
        content: `Absolutely, our plans offer customization flexibility to cater to your specific requirements. Feel free to discuss your customization needs with our team to create a tailored solution.`,
      },
    ],
  };

  const styles = {
    bgColor: "#ffffff",
    rowTitleColor: "#151618",
    rowContentColor: "#555555",
    arrowColor: "#30AFBC",
  };

  const config = {
    animate: true,
    arrowIcon: (
      <img className="h-[1.5rem] max1008:h-[1rem]" src={plus1} alt="Arrow" />
    ),
    tabFocus: true,
  };

  return (
    <div className="w-full flex md:flex-row max1008:flex-col-reverse justify-center border-2 px-5 overflow-hidden py-[8rem]">
      <div className=" home-faq flex flex-col items-start justify-start gap-10 md:py-32 lg:w-[60%] max-w-screen-xl mx-auto px-5 md:px-10 lg:px-16 xl:px-20">
        <div className="flex flex-col max-w-screen-sm">
          <div className="w-80 h-10 lg:w-80 lg:h-25 flex items-center justify-start">
            <div className="text-3xl md:text-5xl lg:text-9xl font-bold font-inter">
              Select your Magic Plan
            </div>
          </div>
        </div>

        <Faq data={data} styles={styles} config={config} className="FAQ" />
      </div>

      <div className="flex flex-col justify-center lg:w-1/3 xl:w-1/3 mx-8 gap-6 lg:mr-20 ">
        <div>
          <div className="flex flex-col gap-10 bg-white p-3 rounded-sm shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]">
            <div className="flex flex-row justify-between text-xl md:text-2xl lg:text-3xl font-semibold">
              <h3>Basic</h3>
              <h3>₹1,000</h3>
            </div>
            <div className="flex items-end justify-start">
              <button
                onClick={() => {
                  Navigate("/Pricing");
                }}
                className="bg-[#30AFBC] hover:bg-slate-900 text-white  py-1 px-3 rounded duration-300 hover:scale-105 shadow-lg"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-10 bg-white p-3 rounded-sm shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]">
          <div className="flex flex-row justify-between text-xl md:text-2xl lg:text-3xl font-semibold">
            <h3>Standard</h3>
            <h3>₹2,500</h3>
          </div>
          <div className="flex items-end justify-start">
            <button
              onClick={() => {
                Navigate("/Pricing");
              }}
              className="bg-[#30AFBC] hover:bg-slate-900 text-white  py-1 px-3 rounded duration-300 hover:scale-105 shadow-lg"
            >
              Learn More
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-10 bg-white p-3 rounded-sm shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]">
          <div className="flex flex-row justify-between text-xl md:text-2xl lg:text-3xl font-semibold">
            <h3>Advance</h3>
            <h3>₹5,000</h3>
          </div>
          <div className="flex items-end justify-start">
            <button
              onClick={() => {
                Navigate("/Pricing");
              }}
              className="bg-[#30AFBC] hover:bg-slate-900 text-white  py-1 px-3 rounded duration-300 hover:scale-105 shadow-lg"
            >
              Learn More
            </button>
          </div>
        </div>

        {/* Repeat the above code for other items as needed */}
      </div>
    </div>
  );
};

export default Price;
