import React from "react";
import { Label, TextInput, FileInput } from 'flowbite-react';
import { FiFileText, FiPlus, FiX, FiUpload, FiBarChart2 } from 'react-icons/fi';

function Policy({ 
  policies, 
  setPolicies, 
  aboutImage, 
  setAboutImage, 
  countBanner, 
  setCountBanner, 
  titleOfCountBanner, 
  values, 
  setValues 
}) {
  // const fileInputRef = useRef(null);

  const handlePolicyChange = (type, value, index) => {
    const updatedPolicies = [...policies[type]];
    updatedPolicies[index] = value;
    setPolicies({ ...policies, [type]: updatedPolicies });
  };

  const handleFileChange = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 4 * 1024 * 1024) {
      alert("File size exceeds 4MB. Please choose a smaller file.");
      return;
    }

    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/svg+xml"];
    if (validTypes.includes(file.type)) {
      const updatedImages = [...aboutImage];
      updatedImages[index] = file;
      setAboutImage(updatedImages);
    } else {
      alert("Invalid file type. Please select a JPG, JPEG, PNG, or SVG file.");
      e.target.value = "";
    }
  };

  const handlecountChange = (index, value) => {
    setCountBanner(prevCountBanner =>
      prevCountBanner.map((item, i) =>
        i === index ? { ...item, count: value } : item
      )
    );
  };

  const handleValueChange = (index, newValue) => {
    const updatedValues = [...(values || [])];
    updatedValues[index] = newValue;
    setValues(updatedValues);
  };

  const addPolicy = (type) => {
    const updatedPolicies = [...policies[type], { content: '' }];
    setPolicies({ ...policies, [type]: updatedPolicies });
  };

  const removePolicy = (type, index) => {
    const updatedPolicies = [...policies[type]];
    updatedPolicies.splice(index, 1);
    setPolicies({ ...policies, [type]: updatedPolicies });
  };

  const addValue = () => {
    setValues([...values, '']);
  };

  const removeValue = (index) => {
    const updatedValues = values.filter((_, i) => i !== index);
    setValues(updatedValues);
  };

  const addImage = () => {
    setAboutImage([...aboutImage, null]);
  };

  const removeImage = (index) => {
    setAboutImage(prevImages => prevImages.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-50 mb-6">
          <FiFileText className="w-8 h-8 text-teal-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">About Company</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Share your company's story, values, and key metrics to build trust with your audience.
        </p>
      </div>

      <div className="space-y-8">
        {/* Count Banner Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <FiBarChart2 className="w-5 h-5 text-teal-600" />
            Key Metrics
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {titleOfCountBanner.map((title, index) => (
              <div key={index}>
                <Label className="block text-sm font-medium text-gray-700 mb-1">
                  {title} <span className="text-red-500">*</span>
                </Label>
                <TextInput
                  type="number"
                  value={countBanner[index].count}
                  onChange={(e) => handlecountChange(index, e.target.value)}
                  placeholder={`Number of ${title}`}
                  className="w-full bg-gray-50 border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Company Values Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <FiFileText className="w-5 h-5 text-teal-600" />
            Company Values
          </h2>

          <div className="space-y-4">
            {values?.map((value, index) => (
              <div key={index} className="relative">
                <TextInput
                  value={value}
                  onChange={(e) => handleValueChange(index, e.target.value)}
                  placeholder="Enter company value"
                  className="w-full bg-gray-50 border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 rounded-lg pr-10"
                />
                <button
                  onClick={() => removeValue(index)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>
            ))}

            <button
              onClick={addValue}
              className="w-full py-3 border-2 border-dashed border-teal-200 rounded-lg text-teal-600 hover:border-teal-600 hover:text-teal-700 transition-colors flex items-center justify-center gap-2"
            >
              <FiPlus className="w-5 h-5" />
              Add Value
            </button>
          </div>
        </div>

        {/* Policies Section */}
        {Object.entries(policies).map(([type, policyList], sectionIndex) => (
          <div key={sectionIndex} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <FiFileText className="w-5 h-5 text-teal-600" />
              {type}
            </h2>

            <div className="space-y-4">
              {policyList.map((policy, index) => (
                <div key={index} className="relative">
                  <TextInput
                    value={policy.content}
                    onChange={(e) => handlePolicyChange(type, e.target.value, index)}
                    placeholder={`Enter ${type.toLowerCase()} content`}
                    className="w-full bg-gray-50 border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 rounded-lg pr-10"
                  />
                  <button
                    onClick={() => removePolicy(type, index)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </div>
              ))}

              <button
                onClick={() => addPolicy(type)}
                className="w-full py-3 border-2 border-dashed border-teal-200 rounded-lg text-teal-600 hover:border-teal-600 hover:text-teal-700 transition-colors flex items-center justify-center gap-2"
              >
                <FiPlus className="w-5 h-5" />
                Add {type}
              </button>
            </div>
          </div>
        ))}

        {/* About Images Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <FiUpload className="w-5 h-5 text-teal-600" />
            About Images
          </h2>

          <div className="space-y-4">
            {aboutImage.map((file, index) => (
              <div key={index} className="relative">
                <Label className="block text-sm font-medium text-gray-700 mb-1">
                  Image {index + 1} <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <FileInput
                    onChange={(e) => handleFileChange(e, index)}
                    accept="image/*"
                    className="w-full bg-gray-50 border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 rounded-lg"
                  />
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}

            <button
              onClick={addImage}
              className="w-full py-3 border-2 border-dashed border-teal-200 rounded-lg text-teal-600 hover:border-teal-600 hover:text-teal-700 transition-colors flex items-center justify-center gap-2"
            >
              <FiPlus className="w-5 h-5" />
              Add Image
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Policy;