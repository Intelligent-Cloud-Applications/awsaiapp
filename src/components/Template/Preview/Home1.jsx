import React from "react";
import video from "../../../utils/Template/backgroundvideo.mp4";

const Home1 = () => {

  return (
    <div>
      <div className=" flex relative items-center justify-center h-[25rem] w-[85.5%]">
        <div className="absolute z-10 flex flex-col items-center ">
          <div className="w-[auto] text-left flex">
            <h1 className="w-full max1250:w-[90%] max536:w-[90%] max800:w-[80%] text-[3.5rem] max800:text-[2.5rem] max1250:text-[3.5rem] text-white ">
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
