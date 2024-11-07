import React, { useEffect } from "react";
import vvideo from "../../../utils/Template/backgroundvideo.mp4";

const Home1 = ({ TagLine, video}) => {
  useEffect(() => {
    const videoUrl = video && video.url;
    console.log("video.url", videoUrl); // Log the video URL to check if it's correct
    const videoElement = document.getElementById("mainVideo");

    if (videoElement) {
      videoElement.src = videoUrl || vvideo;
      videoElement.load();

      // Ensure the video starts playing after the new source is loaded
      videoElement.play().catch((error) => console.error("Autoplay failed:", error));
    }
  }, [video]);

  return (
    <div>
      <div className="flex relative items-center justify-center h-[25rem] w-[85.5%]">
        <div className="absolute z-10 flex flex-col items-center">
          <div className="w-[80%] text-left flex">
            <h1 className="text-center max536:w-[90%] max800:w-[80%] text-[3.5rem] max800:text-[2rem] max1250:text-[3rem] text-white max1250:ml-[10%] ml-[5%]">
              {TagLine || "Fitness at your fingertips"}
            </h1>
          </div>
        </div>
        <div className="ml-[9%]">
          <video
            id="mainVideo"
            autoPlay
            loop
            muted
            playsInline={true}
            controls={false}
            className="object-cover h-[25rem] w-screen"
            src={video && video.url ? video.url : vvideo}
            onClick={(e) => e.target.play()}
          />

        </div>
      </div>
    </div>
  );
};

export default Home1;
