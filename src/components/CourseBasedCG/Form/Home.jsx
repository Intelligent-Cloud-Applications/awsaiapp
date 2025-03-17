import React, { useState } from "react";
import { TextInput } from "flowbite-react";
import { FiHome, FiType, FiUpload, FiEdit, FiFilm } from "react-icons/fi";
import vupload from "../../../utils/png/vupload.png";
import "../../../pages/Template.css";
import { Label } from "flowbite-react";

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
  const [errors, setErrors] = useState({});

  const handleTagLineInputChange = (e) => {
    const value = e.target.value;
    if (value.length <= 40) {
      setTagLine(value);
      setCharTag(value.length);
      setErrors(prev => ({ ...prev, tagline: null }));
    }
  };

  const handleTagLineInputChange1 = (e) => {
    const value = e.target.value;
    if (value.length <= 60) {
      setTagLine1(value);
      setCharTag2(value.length);
      setErrors(prev => ({ ...prev, tagline1: null }));
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > 4) {
      setErrors(prev => ({ ...prev, media: "File size exceeds 4MB. Please choose a smaller file." }));
      return;
    }

    setVideo(file);
    setSelectedMedia(URL.createObjectURL(file));
    setErrors(prev => ({ ...prev, media: null }));

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
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-50 mb-6">
          <FiHome className="w-8 h-8 text-teal-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Home Section</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          <strong>Introduce Your Brand:</strong><br />
          Create a powerful opening that grabs visitors' attention. Highlight what makes your brand unique and share your core values that set you apart.
        </p>
      </div>

      <div className="space-y-8">
        {/* Taglines Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <FiType className="w-5 h-5 text-teal-600" />
            Taglines
          </h2>

          <div className="space-y-6">
            <div>
              <Label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <FiEdit className="w-4 h-4" />
                Primary Tagline
                <span className="text-red-500">*</span>
              </Label>
              <div className="space-y-1">
                <TextInput
                  type="text"
                  value={TagLine}
                  onChange={handleTagLineInputChange}
                  placeholder="Enter your primary tagline"
                  className="w-full bg-gray-50 border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 rounded-lg"
                  maxLength={40}
                />
                <p className="text-sm text-gray-500 text-right">{charTag}/40</p>
                {errors.tagline && (
                  <p className="text-sm text-red-500">{errors.tagline}</p>
                )}
              </div>
            </div>

            <div>
              <Label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <FiEdit className="w-4 h-4" />
                Secondary Tagline
              </Label>
              <div className="space-y-1">
                <TextInput
                  type="text"
                  value={TagLine1}
                  onChange={handleTagLineInputChange1}
                  placeholder="Enter your secondary tagline"
                  className="w-full bg-gray-50 border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 rounded-lg"
                  maxLength={60}
                />
                <p className="text-sm text-gray-500 text-right">{charTag2}/60</p>
                {errors.tagline1 && (
                  <p className="text-sm text-red-500">{errors.tagline1}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Media Upload Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <FiFilm className="w-5 h-5 text-teal-600" />
            Media Upload
          </h2>

          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Video or Image <span className="text-red-500">*</span>
            </Label>
            <label
              htmlFor="fileInput"
              className={`relative block w-full aspect-video border-2 border-dashed rounded-lg cursor-pointer hover:border-teal-500 transition-colors ${
                errors.media ? 'border-red-500' : 'border-gray-200'
              }`}
              onMouseEnter={handleMediaMouseEnter}
              onMouseLeave={handleMediaMouseLeave}
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
                  <FiUpload className="w-12 h-12 text-gray-400 mb-3" />
                  <p className="text-sm text-gray-500">Click to upload media</p>
                  <p className="text-xs text-gray-400 mt-1">Maximum file size: 4MB</p>
                </div>
              ) : (
                <>
                  {mediaType === "video" ? (
                    <video
                      controls
                      src={selectedMedia}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <img
                      src={selectedMedia}
                      alt="Uploaded media"
                      className="w-full h-full object-cover rounded-lg"
                      onError={(e) => {
                        e.target.src = vupload;
                      }}
                    />
                  )}
                  {isFileOptionVisible && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
                      <p className="text-white font-medium">Click to change media</p>
                    </div>
                  )}
                </>
              )}
            </label>
            {errors.media && (
              <p className="mt-2 text-sm text-red-500">{errors.media}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;