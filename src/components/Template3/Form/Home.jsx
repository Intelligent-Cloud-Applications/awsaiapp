import React, { useState } from "react";
import vupload from "../../../utils/png/vupload.png";
import "../../../pages/Template.css";

function Home({ TagLine, setTagLine, video, setVideo, selectedMedia, setSelectedMedia, mediaType, TagLine1, setTagLine1, setMediaType, TagLine2, setTagLine2, TagLine3, setTagLine3 }) {
  // const [TagLineName, setTagLineName] = useState("");
  const [isTagLineInputVisible, setTagLineInputVisible] = useState(false);
  const [charTag, setCharTag] = useState(0);
  const [charTag2, setCharTag2] = useState(0);
  const [charTag3, setCharTag3] = useState(0);
  const [charTag4, setCharTag4] = useState(0);
  // const [TagLineLineColor, setTagLineLineColor] = useState("#939393");

  const handleTagLineInputChange = (e) => {
    setTagLine(e.target.value);
    setCharTag(e.target.value.length);
  };
  const handleTagLineInputChange1 = (e) => {
    setTagLine1(e.target.value);
    setCharTag2(e.target.value.length);
  };
  const handleTagLineInputChange2 = (e) => {
    setTagLine2(e.target.value);
    setCharTag3(e.target.value.length);
  };
  const handleTagLineInputChange3 = (e) => {
    setTagLine3(e.target.value);
    setCharTag4(e.target.value.length);
  };
  const toggleTagLineInputVisibility = () => {
    setTagLineInputVisible(true);
    // setTagLineLineColor("#000000"); // Change TagLine line color to black on click
  };

  //  const [selectedMedia, setSelectedMedia] = useState(null);
  //  const [mediaType, setMediaType] = useState(null);
  const [isFileOptionVisible, setFileOptionVisible] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileSizeMB = file.size / (1024 * 1024);
      if (fileSizeMB > 4) {
        alert("File size exceeds 4MB. Please choose a smaller file.");
        return;
      }
    }
    setVideo(file);
    setSelectedMedia(URL.createObjectURL(file));

    // Determine the type of media selected (image or video)
    if (file.type.includes("video")) {
      setMediaType("video");
    } else if (file.type.includes("image")) {
      setMediaType("image");
    }
  };

  //  const handleMediaClick = () => {
  //    document.getElementById("fileInput").click();
  //  };

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
    <div className="home h-[185vh]" style={{ overflowY: 'auto'}}>
      <h1 className="font-medium text-7xl pb-[1rem] text-center">HOME SECTION</h1>
      <h5 class="text-[#939393] text-center">
        <strong>Introduce Your Brand:</strong><br />
        Create a powerful opening that grabs visitors' attention. Highlight what makes your brand unique and share your core values that set you apart.
      </h5>
      <div className="relative mt-2">
        <h5
          className="text-[#939393] relative cursor-pointer py-2"
          onClick={toggleTagLineInputVisibility}
        >
          {isTagLineInputVisible ? (
            <input
              type="text"
              id="inputField"
              value={TagLine}
              onChange={handleTagLineInputChange}
              className="w-full text-black border-none outline-none bg-transparent "
              placeholder="Enter Short Description TagLine within 30 character"
              autoFocus
              maxlength="30"
            />
          ) : (
            <span>{TagLine || "Short Description TagLine "}</span>
          )}
        </h5>
        <div
          className="absolute left-0 right-0  h-[1px] bg-[#939393]"
        ></div>
        <p>{charTag}/30</p>
      </div>
      <div className="relative mt-2">
        <h5
          className="text-[#939393] relative cursor-pointer py-2"
          onClick={toggleTagLineInputVisibility}
        >
          {isTagLineInputVisible ? (
            <input
              type="text"
              value={TagLine1}
              onChange={handleTagLineInputChange1}
              className="w-full text-black border-none outline-none bg-transparent "
              placeholder="Enter Short Description TagLine1 within 20 character"
              maxlength="20"
            />
          ) : (
            <span>{TagLine1 || "Short Description TagLine1"}</span>
          )}
        </h5>
        <div
          className="absolute left-0 right-0  h-[1px] bg-[#939393]"
        ></div>
        <p>{charTag2}/20</p>
      </div>
      <div className="relative mt-2">
        <h5
          className="text-[#939393] relative cursor-pointer py-2"
          onClick={toggleTagLineInputVisibility}
        >
          {isTagLineInputVisible ? (
            <input
              type="text"
              value={TagLine2}
              onChange={handleTagLineInputChange2}
              className="w-full text-black border-none outline-none bg-transparent "
              placeholder="Enter Short Description TagLine2 within 60 character"
              maxlength="60"
            />
          ) : (
            <span>{TagLine2 || "Short Description TagLine2"}</span>
          )}
        </h5>
        <div
          className="absolute left-0 right-0  h-[1px] bg-[#939393]"
        ></div>
        <p>{charTag3}/60</p>
      </div>
      <div className="relative mt-2">
        <h5
          className="text-[#939393] relative cursor-pointer py-2"
          onClick={toggleTagLineInputVisibility}
        >
          {isTagLineInputVisible ? (
            <input
              type="text"
              value={TagLine3}
              onChange={handleTagLineInputChange3}
              className="w-full text-black border-none outline-none bg-transparent "
              placeholder="Enter Short Description TagLine3 within 60 character"
              maxlength="60"
            />
          ) : (
            <span>{TagLine3 || "Short Description TagLine3"}</span>
          )}
        </h5>
        <div
          className="absolute left-0 right-0  h-[1px] bg-[#939393]"
        ></div>
        <p>{charTag4}/60</p>
      </div>
      <h5 className="mt-6 font-bold"> Select the Image for the hero page</h5>
      <div className="border border-black mt-[1rem] relative boxtoselect">
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
                accept="image/png, image/gif, image/jpeg, video/mp4, video/mov"
              />
              <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center cursor-pointer">
                <img
                  src={vupload}
                  alt="Upload"
                  className="w-[5rem] cursor-pointer"
                //                  onClick={handleMediaClick}
                />
                <h4 className="text-[#939393] text-[15px] mr-1 mb-3">Upload your media</h4>
              </div>
            </>
          ) : (
            <>
              {mediaType === "video" ? (
                <video
                  controls
                  src={selectedMedia}
                  className="w-full h-full object-cover"
                //                  onClick={handleMediaClick}
                />
              ) : (
                <img
                  src={selectedMedia}
                  alt="Uploaded media"
                  className="w-full h-full object-cover"
                  //                  onClick={handleMediaClick}
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