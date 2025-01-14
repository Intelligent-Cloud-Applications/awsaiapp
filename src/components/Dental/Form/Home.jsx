import React, { useState } from "react";
import vupload from "../../../utils/png/vupload.png";
import "../../../pages/Template.css";
import { TextInput, FileInput } from 'flowbite-react';

function Home({ TagLine, setTagLine, video, setVideo, selectedMedia, setSelectedMedia, mediaType, TagLine1, setTagLine1, setMediaType, TagLine2, setTagLine2, TagLine3, setTagLine3 }) {
  const [charTag, setCharTag] = useState(0);
  const [charTag2, setCharTag2] = useState(0);
  const [charTag3, setCharTag3] = useState(0);
  const [charTag4, setCharTag4] = useState(0);
  const [isFileOptionVisible, setFileOptionVisible] = useState(false);

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
    <div className="home flex-grow" style={{ minHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="font-medium text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center pb-4">
          HOME SECTION
        </h1>
        <h5 className="text-[#939393] text-center text-sm sm:text-base mb-8">
          <strong>Introduce Your Brand:</strong><br />
          Create a powerful opening that grabs visitors' attention. Highlight what makes your brand unique and share your core values that set you apart.
        </h5>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              TagLine (Before Heading)
            </label>
            <TextInput
              id="inputField"
              value={TagLine}
              onChange={handleTagLineInputChange}
              className="w-full"
              placeholder="Enter a short description within 30 characters"
              maxLength="30"
            />
            <p className="text-sm text-gray-500 mt-1">{charTag}/30</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              TagLine (Heading)
            </label>
            <TextInput
              type="text"
              value={TagLine1}
              onChange={handleTagLineInputChange1}
              className="w-full"
              placeholder="Enter a short description within 20 characters"
              maxLength="20"
            />
            <p className="text-sm text-gray-500 mt-1">{charTag2}/20</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              TagLine (Company Description)
            </label>
            <TextInput
              type="text"
              value={TagLine2}
              onChange={handleTagLineInputChange2}
              className="w-full"
              placeholder="Enter a short description within 60 characters"
              maxLength="60"
            />
            <p className="text-sm text-gray-500 mt-1">{charTag3}/60</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              TagLine (Additional Description)
            </label>
            <TextInput
              type="text"
              value={TagLine3}
              onChange={handleTagLineInputChange3}
              className="w-full"
              placeholder="Enter a short description within 60 characters"
              maxLength="60"
            />
            <p className="text-sm text-gray-500 mt-1">{charTag4}/60</p>
          </div>
          <div>
            <h5 className="font-bold text-lg sm:text-xl mb-4">
              Select the Image for the Featured Section
            </h5>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
              <label
                htmlFor="fileInput"
                className="cursor-pointer"
                onMouseEnter={handleMediaMouseEnter}
                onMouseLeave={handleMediaMouseLeave}
              >
                {!selectedMedia ? (
                  <>
                    <FileInput
                      id="fileInput"
                      className="hidden"
                      onChange={handleFileChange}
                      accept="image/png, image/gif, image/jpeg, video/mp4, video/mov"
                    />
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <img
                        src={vupload}
                        alt="Upload"
                        className="w-16 h-16"
                      />
                      <h4 className="text-[#939393] text-sm sm:text-base">
                        Upload your media
                      </h4>
                      <p className="text-xs text-gray-500">
                        Supported formats: PNG, JPEG, GIF, MP4, MOV
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    {mediaType === "video" ? (
                      <video
                        controls
                        src={selectedMedia}
                        className="w-full h-64 object-cover rounded-lg"
                      />
                    ) : (
                      <img
                        src={selectedMedia}
                        alt="Uploaded media"
                        className="w-full h-64 object-cover rounded-lg"
                        onError={(e) => {
                          e.target.src = vupload; // Display default image if image fails to load
                        }}
                      />
                    )}
                    {isFileOptionVisible && (
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-lg">
                        <TextInput
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
        </div>
      </div>
    </div>
  );
}

export default Home;