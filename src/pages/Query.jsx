import React from 'react';
import pic from "../utils/Assets/contactPic.png";
import logo from "../utils/awsaiappLogo.png";

const Query = () => {
  return (
    <div className="container">
      <div className="bg-white self-stretch flex flex-row justify-between items-start pt-2 px-4 sm:px-8">
        <img
          src={logo}
          alt="Logo"
          className="mb-4 w-24 sm:w-32"
        />
        <div className="hidden sm:flex flex-row justify-between mt-4 w-1/2 items-center">
          <div className="text-xl font-inter">Home</div>
          <div className="text-xl font-inter">About Us</div>
          <div className="text-xl font-inter">Pricing</div>
          <div className="text-xl font-inter">Our Team</div>
          <div className="border-solid border-[#30afbc] bg-white self-start flex flex-col w-24 shrink-0 h-10 items-center py-2 border-2 rounded-lg">
            <div className="text-xl font-inter font-bold">Login</div>
          </div>
          <div className="bg-[#30afbc] self-start flex flex-col justify-center pl-2 h-10 items-start rounded-lg">
            <div className="text-xl font-inter font-bold text-white mr-2">
              Contact us
            </div>
          </div>
        </div>
      </div>
      <div className='w-full flex justify-center h-[90vh] bg-[#F0F0F0]'>
      <div className="flex flex-col w-full sm:flex-row ml-[8px] gap-px sm:gap-2 sm:w-2/3 items-center">
        <div className="shadow-[0px_4px_4px_0px_#30afbc] overflow-hidden bg-[#0091a0] flex flex-col justify-end gap-5 w-full sm:w-1/2 items-center pt-12 pb-6 px-4 sm:px-8 sm:rounded-tl-[33px] sm:rounded-bl-[33px] h-[50vh] sm:h-[80vh]">
          <img
            src={pic}
            alt="Contact"
            className="w-full"
          />
          <div className="self-stretch flex flex-col gap-2 items-start">
            <div className="text-2xl font-poppins font-bold text-white">
              Let's Chat.
              <br />
              Tell Us About Your Project.
            </div>
            <div className="text-sm font-poppins font-semibold text-white">
              Let’s Maximize Your business's Potential with Us
            </div>
          </div>
        </div>
        <div className="shadow-[4px_4px_4px_0px_rgba(48,_175,_188,_0.72)] bg-white flex flex-col w-full sm:w-1/2 items-start pt-5 pb-12 px-4 sm:px-8 sm:rounded-tr-[33px] sm:rounded-br-[33px]">
          <div
            id="SendUsAMessage"
            className="text-3xl font-poppins font-semibold mb-6 sm:mb-10"
          >
            Send us a message
          </div>
          <div className="flex flex-col space-y-4">
            <label className="text-xs font-poppins font-semibold text-black/85" htmlFor="fullName">
              Full Name
            </label>
            <input type="text" id="fullName" className="border-solid self-stretch h-8 sm:h-6 shrink-0 mb-1 ml-1 mr-4 sm:mr-10 border-black/47 border rounded-lg" />

            <label className="text-xs font-poppins font-semibold text-black" htmlFor="companyName">
              Company Name
            </label>
            <input type="text" id="companyName" className="border-solid self-stretch h-8 sm:h-6 shrink-0 ml-1 mr-4 sm:mr-10 border-black/47 border rounded-lg" />

            <label className="text-xs font-poppins font-semibold text-black" htmlFor="email">
              Email
            </label>
            <input type="email" id="email" className="self-stretch relative border h-8 sm:h-6 flex flex-col pb-4 ml-1 mr-4 sm:mr-10" />

            <label className="text-xs font-poppins font-semibold text-black" htmlFor="address">
              Address
            </label>
            <textarea id="address" className="border-solid h-20 sm:h-6 border-black/47 border rounded-lg"></textarea>

            <label className="text-xs font-poppins font-semibold text-black/85" htmlFor="projectDescription">
              Tell us more about your project
            </label>
            <textarea id="projectDescription" className="border-solid self-stretch h-24 sm:h-36 shrink-0 mb-6 ml-1 mr-4 sm:mr-10 border-black/47 border rounded-lg"></textarea>

            <button className="bg-[#30afbc] flex flex-col justify-center ml-1 pl-2 h-10 sm:h-8 shrink-0 items-start rounded-lg">
              <span className="font-inter font-semibold text-white mr-2">
                Send message
              </span>
            </button>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Query;
