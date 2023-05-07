import React, { useState } from "react";

import arrow from "../../Utils/Assests/arrow.svg";
import "./FAQ.css"

const FAQ = () => {
  const [fav2Visible1, setfav2Visible1] = useState(false);
  const [fav2Visible2, setfav2Visible2] = useState(false);
  const [fav2Visible3, setfav2Visible3] = useState(false); 
  const [fav2Visible4, setfav2Visible4] = useState(false); 

  const fav2Handler1 = () => {
    setfav2Visible1(!fav2Visible1);
  };
  const fav2Handler2 = () => {
    setfav2Visible2(!fav2Visible2);
  };
  const fav2Handler3 = () => {
    setfav2Visible3(!fav2Visible3);
  };
  const fav2Handler4 = () => {
    setfav2Visible4(!fav2Visible4);
  };

  return (
    <div className="justify-center min-h-[70vh] flex flex-col items-center gap-8">
      <h1 className="text-[4rem] max800:text-[3.2rem] mt-[2rem] font-russo">FAQs</h1>
      <ul className=" flex  justify-center items-center flex-col ">
        <li className={`flex justify-center mb-1`}>
        <div className="flex  justify-center items-center  mb-4 w-20 bg-[#404E7C] max500:w-[3rem]">
        <h2 className="font-russo text-white">01</h2>
      </div>
      <div className=" FAQ-Back bg-[#D9D9D9] p-4 mb-4 w-[60vw] text-[1.1rem] transition-all duration-200 ease-in">
      <p className="text-white max600:text-[1.1rem] font-bebas-neue flex justify-between">
      How do I connect with your website development team?

              {fav2Visible1 ? (
                <img
                  src={arrow}
                  className="transition ease-out duration-1500"
                  alt=""
                  onClick={fav2Handler1}
                />
              ) : (
                <img
                  id="close-arrow"
                  src={arrow}
                  className="transition ease-out duration-1500 h-[100%]"
                  alt=""
                  onClick={fav2Handler1}
                />
              )}
            </p>
            {fav2Visible1 && (
              <p className="text-white  text-[1rem] transition-text  duration-[5000ms] ease-in mt-[0.2rem]">
              Connecting with our website development team is easy! Simply fill out the form on our website and pay the first month's fee. Our team will get to work on developing a prototype of your website within 15 days of receiving your completed form. Once the prototype is approved, we will work to have your website fully developed and ready to launch within a month.
              </p>
            )}
          </div>
        </li>

        <li className={`flex justify-center`}>
          <div className="flex  justify-center items-center  mb-4 w-20 bg-[#404E7C] max500:w-[3rem]">
            <h2 className="font-russo text-white">02</h2>
          </div>
          <div className=" FAQ-Back p-4 mb-4 w-[60vw] text-[1.1rem] transition-all duration-200 ease-in">
            <p className="text-white max600:text-[1.1rem] font-bebas-neue flex justify-between">
            What if I want changes made to my website after it has launched?
              {fav2Visible2 ? (
                <img
                  src={arrow}
                  className="transition ease-out duration-1500"
                  alt=""
                  onClick={fav2Handler2}
                />
              ) : (
                <img
                  id="close-arrow"
                  src={arrow}
                  className="transition ease-out duration-1500"
                  alt=""
                  onClick={fav2Handler2}
                />
              )}
            </p>
            {fav2Visible2 && (
              <p className="text-white text-[1rem] mt-[0.5rem]">
              We offer ongoing website maintenance and support services to our clients. If you need changes made to your website after it has launched, simply contact our team and we will work with you to make the necessary updates.
              </p>
            )}
          </div>
        </li>

        <li className={`flex justify-center`}>
          <div className="flex  justify-center items-center  mb-4 w-20 bg-[#404E7C]  max500:w-[3rem]">
            <h2 className="font-russo text-white">03</h2>
          </div>
          <div className=" FAQ-Back p-4 mb-4 w-[60vw] text-[1.1rem] transition-all duration-200 ease-in">
            <p className="text-white max600:text-[1.1rem] font-bebas-neue flex justify-between">
            Do you offer website hosting services?
              {fav2Visible3 ? (
                <img
                  src={arrow}
                  className="transition ease-out duration-1500"
                  alt=""
                  onClick={fav2Handler3}
                />
              ) : (
                <img
                  id="close-arrow"
                  src={arrow}
                  className="transition ease-out duration-1500"
                  alt=""
                  onClick={fav2Handler3}
                />
              )}
            </p>
            {fav2Visible3 && (
              <p className="text-white text-[1rem] mt-[0.5rem]">
              Yes, we offer website hosting services to our clients. Our hosting services include website backups, security updates, and ongoing support to ensure that your website is always up and running smoothly.
              </p>
            )}
          </div>
        </li>
        <li className={`flex justify-center`}>
          <div className="flex  justify-center items-center  mb-4 w-20 bg-[#404E7C]  max500:w-[3rem]">
            <h2 className="font-russo text-white">04</h2>
          </div>
          <div className=" FAQ-Back p-4 mb-4 w-[60vw] text-[1.1rem] transition-all duration-200 ease-in">
            <p className="text-white max600:text-[1.1rem] font-bebas-neue flex justify-between">
            What if I have questions or concerns during the website development process?
              {fav2Visible4 ? (
                <img
                  src={arrow}
                  className="transition ease-out duration-1500"
                  alt=""
                  onClick={fav2Handler4}
                />
              ) : (
                <img
                  id="close-arrow"
                  src={arrow}
                  className="transition ease-out duration-1500"
                  alt=""
                  onClick={fav2Handler4}
                />
              )}
            </p>
            {fav2Visible4 && (
              <p className="text-white text-[1rem] mt-[0.5rem]">
              We pride ourselves on providing excellent customer service and support to our clients. If you have any questions or concerns during the website development process, simply reach out to our team and we will be happy to assist you.
              </p>
            )}
          </div>
        </li>
      </ul>
    </div>
  );
};

export default FAQ;
