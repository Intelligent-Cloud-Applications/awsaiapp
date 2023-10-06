import React from "react";
import "./Header.css"; // You'll need to create this CSS file for styling.
import imageSrc from "../../utils/waves/2-removebg 3.png";
// import vector from "../../utils/Animate.svg";

const Header = () => {
  return (
    // <div className="wow overflow-hidden flex justify-around pt-16 w-full items-center">
    //   <div className="flex flex-col w-[50%] gap-1 pl-[2rem] main">
    //     <h2 className="hello text-[2.5rem] text-white mb-4 font-bold max450px:text-[1rem]">
    //       Unlock Your Business
      
    //       <div className="wrapper">
    //         <p>Potential with</p>
    //         <div className="words">
    //         <span className="txt ml-2">Seamless Solutions</span>
    //         <span className="txt ml-2">Limitless Posibilities</span>
    //         <span className="txt ml-2">Cloud Resolution</span>
    //         <span className="txt ml-2">Seamless Solutions</span>
    //       </div>
    //       </div>
    //     </h2>
    //     <p className="text-sm md:text-base text-white mb-8 pr-[2rem]">
    //       We are your strategic partners, offering intelligent cloud apps,
    //       digital marketing, personalised dashboard and secure payment
    //       solutions.
    //     </p>
    //     <button class="text-lg font-semibold rounded-full md:py-3 md:px-6 lg:py-4 lg:px-8 responsive-button button-2">
    //       Get Started
    //     </button>
    //   </div>
    //   <div className="hidden sm:block">
    //     <img src={imageSrc} alt="Describe" />
    //   </div>
    // </div>

    <div class="wow overflow-hidden flex flex-col md:flex-row justify-center md:justify-between items-center pt-16 w-full">
  <div class="flex flex-col w-full md:w-1/2 gap-1 md:pl-8 main lg:pl-16 px-5 md:px-0">
    <h2 class="hello text-3xl md:text-4xl lg:text-7xl text-white mb-4 font-bold max-w-screen-md:max-[450px] max450:text-xl">
      Unlock Your Business
    </h2>
    <div class="wrapper text-2xl md:text-2xl lg:text-7xl font-bold max450:text-xl">
      <p class="mb-4">
        Potential with
      </p>
      <div class="words">
        <span class="txt ml-2">Seamless Solutions</span>
        <span class="txt ml-2">Limitless Possibilities</span>
        <span class="txt ml-2">Cloud Resolution</span>
        <span class="txt ml-2">Seamless Solutions</span>
      </div>
    </div>
    <p class="text-sm md:text-base text-white mb-8 pr-4 md:pr-0">
      We are your strategic partners, offering intelligent cloud apps,
      digital marketing, personalized dashboards, and secure payment solutions.
    </p>
    <button class="text-lg font-semibold rounded-full py-2 md:py-3 px-6 md:px-8 lg:px-10 responsive-button button-2 bg-white hover:bg-[]">
      Get Started
    </button>
  </div>
  <div class="hidden md:block">
    <img className="max1008:w-[40vw] lg:w-[45vw]" src={imageSrc} alt="Describe" />
  </div>
</div>

  );
};

export default Header;
