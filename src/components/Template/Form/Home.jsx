import React, { useState } from "react";
import vupload from "../../../utils/png/vupload.png";


function Home({ onTaglineChange, onMediaChange }) {
  const [TaglineName, setTaglineName] = useState("");
  const [isTaglineInputVisible, setTaglineInputVisible] = useState(false);
  const [TaglineLineColor, setTaglineLineColor] = useState("#939393");

  const handleTaglineInputChange = (e) => {
    setTaglineName(e.target.value);
    onTaglineChange(e.target.value); // Update tagline in the parent component
  };

  const toggleTaglineInputVisibility = () => {
    setTaglineInputVisible(true);
    setTaglineLineColor("#000000"); // Change Tagline line color to black on click
  };

  const [selectedMedia, setSelectedMedia] = useState(null);
  const [mediaType, setMediaType] = useState(null);
  const [isFileOptionVisible, setFileOptionVisible] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedMedia(URL.createObjectURL(file));
    onMediaChange({ type: file.type, url: URL.createObjectURL(file) }); // Update media in the parent component
    // Determine the type of media selected (image or video)
    if (file.type.includes("video")) {
      setMediaType("video");
    } else if (file.type.includes("image")) {
      setMediaType("image");
    }
  };

  const handleMediaClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleMediaMouseEnter = () => {
    if (selectedMedia) {
      setFileOptionVisible(true);
    }
  };

  const handleMediaMouseLeave = () => {
    if (selectedMedia) {
      setFileOptionVisible(false);
    }
  };
  return (
    <div className="px-8">
      <h1 className="font-medium text-7xl">HOME SECTION</h1>
      <h5 class="w-[28rem] max950:w-[17rem] text-[#939393]">
        Craft a compelling brand introduction, captivating visitors with your
        uniqueness and core values.
      </h5>

      <div className="relative mt-10">
        <h5
          className="w-[28rem] text-[#939393] relative cursor-pointer py-2"
          onClick={toggleTaglineInputVisibility}
        >
          {isTaglineInputVisible ? (
            <input
              type="text"
              value={TaglineName}
              onChange={handleTaglineInputChange}
              className="w-[28rem] text-black border-none outline-none bg-transparent "
              placeholder="Enter Short Description Tagline "
              autoFocus
            />
          ) : (
            <span>{TaglineName || "Short Description Tagline "}</span>
          )}
        </h5>
        <div
          className="absolute left-0 right-0 bottom-0 h-[1.5px]"
          style={{ backgroundColor: TaglineLineColor }}
        ></div>
      </div>
      <div className="border border-black w-[16rem] h-[14rem] mt-[5rem] relative">
        <label
          htmlFor="fileInput"
          className="cursor-pointer"
          onMouseEnter={handleMediaMouseEnter}
          onMouseLeave={handleMediaMouseLeave}
        >
          {!selectedMedia ? (
            <>
              <input
                type="file"
                id="fileInput"
                className="hidden"
                onChange={handleFileChange}
              />
              <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center cursor-pointer">
                <img
                  src={vupload}
                  alt="Upload"
                  className="w-[8rem] cursor-pointer"
                  onClick={handleMediaClick}
                />
                <h4 className="text-[#939393] mr-1 mb-3">Upload your media</h4>
              </div>
            </>
          ) : (
            <>
              {mediaType === "video" ? (
                <video
                  controls
                  src={selectedMedia}
                  className="w-full h-full object-cover"
                  onClick={handleMediaClick}
                />
              ) : (
                <img
                  src={selectedMedia}
                  alt="Uploaded media"
                  className="w-full h-full object-cover"
                  onClick={handleMediaClick}
                  onError={(e) => {
                    e.target.src = vupload; // Display default image if image fails to load
                  }}
                />
              )}
              {isFileOptionVisible && (
                <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center">
                  <input
                    type="file"
                    id="fileInput"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <h4 className="text-white">Choose your file</h4>
                </div>
              )}
            </>
          )}
        </label>
      </div>
    </div>
  );
}

export default Home;