import React, { useState } from "react";
import { Label, TextInput } from "flowbite-react";
import { FiHome, FiUpload, FiEdit, FiVideo } from "react-icons/fi";

function Home({ 
  TagLine, 
  setTagLine, 
  video, 
  setVideo, 
  selectedMedia, 
  setSelectedMedia, 
  mediaType, 
  TagLine1, 
  setTagLine1, 
  setMediaType 
}) {
  const [charTag, setCharTag] = useState(0);
  const [charTag2, setCharTag2] = useState(0);
  const [isFileOptionVisible, setFileOptionVisible] = useState(false);

  const handleTagLineInputChange = (e) => {
    const value = e.target.value;
    if (value.length <= 40) {
      setTagLine(value);
      setCharTag(value.length);
    }
  };

  const handleTagLineInputChange1 = (e) => {
    const value = e.target.value;
    if (value.length <= 60) {
      setTagLine1(value);
      setCharTag2(value.length);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > 4) {
      alert("File size exceeds 4MB. Please choose a smaller file.");
      return;
    }

    setVideo(file);
    setSelectedMedia(URL.createObjectURL(file));
    setMediaType(file.type.includes("video") ? "video" : "image");
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-50 mb-6">
          <FiHome className="w-8 h-8 text-teal-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Home Section</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Create a powerful first impression with engaging taglines and media that showcase your dance studio's unique identity.
        </p>
      </div>

      <div className="space-y-8">
        {/* Taglines Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <FiEdit className="w-5 h-5 text-teal-600" />
            Taglines
          </h2>

          <div className="space-y-6">
            {/* First Tagline */}
            <div>
              <Label className="block text-sm font-medium text-gray-700 mb-1">
                Primary Tagline <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <TextInput
                  type="text"
                  value={TagLine}
                  onChange={handleTagLineInputChange}
                  placeholder="Enter your main tagline"
                  className="w-full"
                />
                <span className="absolute right-2 top-2.5 text-sm text-gray-400">
                  {charTag}/40
                </span>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                A short, impactful statement about your dance studio
              </p>
            </div>

            {/* Second Tagline */}
            <div>
              <Label className="block text-sm font-medium text-gray-700 mb-1">
                Secondary Tagline
              </Label>
              <div className="relative">
                <TextInput
                  type="text"
                  value={TagLine1}
                  onChange={handleTagLineInputChange1}
                  placeholder="Enter your supporting tagline"
                  className="w-full"
                />
                <span className="absolute right-2 top-2.5 text-sm text-gray-400">
                  {charTag2}/60
                </span>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Additional context or supporting message
              </p>
            </div>
          </div>
        </div>

        {/* Media Upload Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <FiVideo className="w-5 h-5 text-teal-600" />
            Featured Media
          </h2>

          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Image or Video <span className="text-red-500">*</span>
            </Label>
            
            <label
              htmlFor="fileInput"
              className={`relative block w-full aspect-video border-2 border-dashed rounded-lg cursor-pointer 
                ${selectedMedia ? 'border-teal-200 hover:border-teal-300' : 'border-gray-200 hover:border-gray-300'}
                transition-colors bg-gray-50 hover:bg-gray-100`}
              onMouseEnter={() => setFileOptionVisible(true)}
              onMouseLeave={() => setFileOptionVisible(false)}
            >
              <input
                type="file"
                id="fileInput"
                className="hidden"
                onChange={handleFileChange}
                accept="image/png, image/gif, image/jpeg, video/mp4, video/mov"
              />

              {!selectedMedia ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <FiUpload className="w-8 h-8 text-teal-600 mb-2" />
                  <p className="text-sm font-medium text-gray-600">
                    Click to upload media
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    PNG, JPG, GIF, MP4 or MOV (max. 4MB)
                  </p>
                </div>
              ) : (
                <div className="relative w-full h-full">
                  {mediaType === "video" ? (
                    <video
                      src={selectedMedia}
                      className="w-full h-full object-cover rounded-lg"
                      controls
                    />
                  ) : (
                    <img
                      src={selectedMedia}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  )}
                  {isFileOptionVisible && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                      <p className="text-white font-medium">Change media</p>
                    </div>
                  )}
                </div>
              )}
            </label>
            
            <p className="mt-2 text-xs text-gray-500">
              Choose a high-quality image or video that represents your dance studio
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;