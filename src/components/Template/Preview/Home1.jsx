import React from "react";
import video from "../../../utils/Template/backgroundvideo.mp4";
import NavBar1 from "./Navbar1";

const Home1 = () => {

  return (
    <div>
     
      <div className=" flex items-center justify-center h-[30rem] pb-20 w-[111.5vh]">
        <div className="absolute z-10 flex flex-col items-center ">
          <div className="w-[auto] text-left flex">
            <h1 className="w-full max1250:w-[90%] max536:w-[900vw] max800:w-[80%] text-[3.7rem] max800:text-[2.8rem] max1250:text-[4.5rem] text-white ">
              Fitness at your fingertips
            </h1>
          </div>
        </div>
        <div className=" ml-[9%]">
          <video
            autoPlay
            loop
            muted
            playsInline={true}
            controls={false}
            className="object-cover h-[25rem] w-screen "
          >
            <source src={video} type="video/mp4" />
          </video>
        </div>
      </div>
    </div>
  );
};

export default Home1;
