import React from "react";
import "./Header.css"; // You'll need to create this CSS file for styling.
import imageSrc from "../../utils/waves/2-removebg 3.png";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const Header = () => {
  const Navigate=useNavigate();
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: 1,
      x: 0,
      transition: {
        duration: 1,
      },
    });
  }, [controls]);

  return (
    <motion.div
    className="wow overflow-hidden flex flex-col md:flex-row justify-center md:justify-between items-center pt-6 md:pt-16 w-full"
    initial={{ opacity: 0, x: -50 }}
    animate={controls}
  >
    <motion.div
      className="flex flex-col w-full md:w-1/2 gap-1 md:pl-8 main lg:pl-16 px-5"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
    >
      <h2 className="flex flex-row flex-wrap hello text-xl md:text-xl lg:text-5xl min1150:text-9xl text-white font-bold max-w-screen-md:max-[450px] mb-1 max375:text-[1.2rem]">
        Unlock Your Business
      </h2>
      <div className="wrapper text-xl md:text-xl lg:text-5xl min1150:text-9xl font-bold max375:text-[1.2rem]">
        <p className="mb-2 md:mb-4">Potential with</p>
        <div className="words">
          <span className="txt ml-2">Seamless Solutions</span>
          <span className="txt ml-2">Limitless Possibilities</span>
          <span className="txt ml-2">Cloud Resolution</span>
          <span className="txt ml-2">Seamless Solutions</span>
        </div>
      </div>
      <motion.p
        className="text-sm md:text-base text-white mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
      >
        We are your strategic partners, offering intelligent cloud apps,
        digital marketing, personalized dashboards, and secure payment
        solutions.
      </motion.p>
      <motion.button
      onClick={() => {
        Navigate("/query");
      }}
        className="w-[37%] text-sm sm:text-base md:text-[1rem] lg:text-xl font-semibold rounded-full responsive-button button-2 bg-white hover:bg-gray-300"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1.5 }}
      >
        Get Started
      </motion.button>
    </motion.div>
    <motion.div
      className="hidden md:block"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 1 }}
    >
      <img
        className="max-w-full md:w-[32vw] lg:w-[35vw] lg:mr-10 mr-8"
        src={imageSrc}
        alt="Describe"
      />
    </motion.div>
  </motion.div>
  );
};

export default Header;
