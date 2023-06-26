
import React from "react";
import "./Header.css";

const Header = () => {

  return (
    <div className="Hero-Back self-stretch overflow-hidden flex flex-col max375:px-[2rem] max670:px-[3rem] py-[12.44rem] px-[7.13rem] items-start justify-start text-left text-[2rem] text-white font-poppins">
      <div className="absolute z-10 flex flex-col items-left w-screen content">
      <h3 className="m-0 relative text-[inherit] max375:text-[1.2rem] max375:leading-[1rem] max600:text-[1.5rem] leading-[2.4rem] font-regular font-inherit  text-left">We are Creative</h3>
          <h1 className="m-0 relative text-[5rem] max375:text-[2.8rem] max375:leading-[2.6rem] max600:text-[3rem] max600:leading-[3rem] leading-[4.94rem] font-bold font-inherit text-darkseagreen-100">
            DEVELOPERS
          </h1>
          <h5 className="m-0 relative w-[22.19rem] h-[1.5rem] shrink-0 text-[1rem] font-inherit">
            <div className="absolute top-[0rem] left-[0rem] leading-[1.5rem] max375:text-[1rem]">
              Empower Your Gym with Intelligent Websites
            </div>
          </h5>
      </div>
    </div>
  );
};

export default Header;
