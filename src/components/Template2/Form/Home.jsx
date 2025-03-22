import React, { useState } from "react";
import { Label, TextInput } from 'flowbite-react';
import { FiHome, FiUpload, FiType } from 'react-icons/fi';

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
  setMediaType, 
  TagLine2, 
  setTagLine2, 
  TagLine3, 
  setTagLine3 
}) {
  const [charCounts, setCharCounts] = useState({
    tagLine: 0,
    tagLine1: 0,
    tagLine2: 0,
    tagLine3: 0
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleTagLineChange = (field, value, maxLength) => {
    const setValue = {
      'tagLine': setTagLine,
      'tagLine1': setTagLine1,
      'tagLine2': setTagLine2,
      'tagLine3': setTagLine3
    }[field];

    if (value.length <= maxLength) {
      setValue(value);
      setCharCounts(prev => ({
        ...prev,
        [field]: value.length
      }));
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      setIsProcessing(true);
      setError(null);

      // Validate file size (4MB limit)
      if (file.size > 4 * 1024 * 1024) {
        throw new Error("File size exceeds 4MB limit");
      }

      // Validate file type
      if (!file.type.match(/^(image\/(jpeg|png|gif)|video\/(mp4|quicktime))$/)) {
        throw new Error("Please upload an image (JPEG, PNG, GIF) or video (MP4, MOV)");
      }

      setVideo(file);
      setSelectedMedia(URL.createObjectURL(file));
      setMediaType(file.type.startsWith('video/') ? 'video' : 'image');

    } catch (err) {
      setError(err.message);
      setVideo(null);
      setSelectedMedia(null);
      setMediaType(null);
    } finally {
      setIsProcessing(false);
    }
  };

  const tagLineFields = [
    {
      id: 'tagLine',
      label: 'Before Heading Tagline',
      value: TagLine,
      maxLength: 30,
      placeholder: 'Enter a short description (max 30 characters)'
    },
    {
      id: 'tagLine1',
      label: 'Heading Tagline',
      value: TagLine1,
      maxLength: 20,
      placeholder: 'Enter your main heading (max 20 characters)'
    },
    {
      id: 'tagLine2',
      label: 'Company Description',
      value: TagLine2,
      maxLength: 60,
      placeholder: 'Enter your company description (max 60 characters)'
    },
    {
      id: 'tagLine3',
      label: 'Additional Description',
      value: TagLine3,
      maxLength: 60,
      placeholder: 'Enter additional description (max 60 characters)'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-50 mb-6">
          <FiHome className="w-8 h-8 text-teal-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Home Section</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Create a powerful opening that grabs visitors' attention. Highlight what makes your brand unique.
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
            {tagLineFields.map((field) => (
              <div key={field.id}>
                <Label className="block text-sm font-medium text-gray-700 mb-1">
                  {field.label} <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <TextInput
                    value={field.value}
                    onChange={(e) => handleTagLineChange(field.id, e.target.value, field.maxLength)}
                    placeholder={field.placeholder}
                    className="w-full bg-gray-50 border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 rounded-lg"
                  />
                  <span className="absolute right-0 -bottom-6 text-sm text-gray-500">
                    {charCounts[field.id]}/{field.maxLength}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Media Upload Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <FiUpload className="w-5 h-5 text-teal-600" />
            Featured Media
          </h2>

          <div className="relative">
            <Label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Image or Video <span className="text-red-500">*</span>
            </Label>
            
            <div className={`relative border-2 border-dashed rounded-lg transition-all duration-300 
              ${error ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-gray-50 hover:border-teal-500'}`}
            >
              <label className="flex flex-col items-center justify-center w-full h-64 cursor-pointer">
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept="image/jpeg,image/png,image/gif,video/mp4,video/quicktime"
                />

                {isProcessing ? (
                  <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mb-2" />
                    <p className="text-sm text-gray-500">Processing...</p>
                  </div>
                ) : selectedMedia ? (
                  <div className="relative w-full h-full">
                    {mediaType === 'video' ? (
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
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                      <p className="text-white font-medium">Click to change media</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <FiUpload className="w-8 h-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">Click to upload media</p>
                    <p className="text-xs text-gray-400 mt-1">Maximum file size: 4MB</p>
                  </div>
                )}
              </label>
            </div>

            {error && (
              <p className="mt-2 text-sm text-red-600">{error}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;