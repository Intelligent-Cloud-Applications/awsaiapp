import React from "react";
import "./Header.css"; // You'll need to create this CSS file for styling.
import imageSrc from "../../utils/waves/2-removebg 3.png";

const Header = () => {
  return (
    <div className="showed overflow-hidden flex flex justify-around pt-16 w-full items-center">
      <div className="flex flex-col w-[45%] gap-1 pl-[2rem]">
      <h1 className="text-[2.5rem] text-white mb-4 font-bold sm:text-left">
      Unlock Your Business<br/> Potential with <span className="text-[#30AFBC] ml-2">Seamless Solutions</span>
      </h1>
      <p className="text-sm md:text-base text-white mb-8 pr-[2rem]">
      We are your strategic partners, offering intelligent cloud apps, digital marketing, personalised dashboard and secure payment solutions.
      </p>
      <button className="bg-white text-black hover:bg-[#30AFBC] hover:text-white px-6 py-2 rounded-full w-[10vw] font-bold text-lg">
        Get Started
      </button>
      </div>
      <div className="hidden sm:block">
      <img src={imageSrc} alt="Description of the image"/>
      </div>
    </div>
  );
};

export default Header;
