import React from "react";
import "./Header.css"; // You'll need to create this CSS file for styling.
import imageSrc from "../../utils/waves/2-removebg 3.png";
// import vector from "../../utils/Animate.svg";

const Header = () => {
  return (
    <div className="wow overflow-hidden flex flex justify-around pt-16 w-full items-center">
      <div className="flex flex-col w-[45%] gap-1 pl-[2rem] main">
        <h1 className="hello text-[2.5rem] text-white mb-4 font-bold max450px:text-[1rem]">
          Unlock Your Business
          <br /> Potential with{" "}
          <span className="text-[#30AFBC] ml-2">Seamless Solutions</span>
        </h1>
        <p className="text-sm md:text-base text-white mb-8 pr-[2rem]">
          We are your strategic partners, offering intelligent cloud apps,
          digital marketing, personalised dashboard and secure payment
          solutions.
        </p>
        <button
          class="bg-white hover:bg-[#30AFBC] hover:text-white text-black text-lg font-semibold rounded-full shadow-md
    md:bg-white md:hover:bg-[#30AFBC] md:py-3 md:px-6 lg:bg-white lg:hover:bg-[#30AFBC] lg:py-4 lg:px-8 responsive-button">
          Get Started
        </button>
      </div>
      <div className="hidden sm:block">
        <img src={imageSrc} alt="Description of the image" />
      </div>
    </div>
  );
};

export default Header;
