import { useRef } from "react";
import { Label, FileInput, TextInput } from 'flowbite-react';

function Policy({ policies, setPolicies, aboutImage, setAboutImage, countBanner, setCountBanner, titleOfCountBanner, values, setValues }) {
  const handlePolicyChange = (type, value, index) => {
    const updatedPolicies = [...policies[type]];
    updatedPolicies[index] = value;
    setPolicies({ ...policies, [type]: updatedPolicies });
  };

  const fileInputRef = useRef(null);

  const addPolicy = (type) => {
    const updatedPolicies = [...policies[type], ""];
    setPolicies({ ...policies, [type]: updatedPolicies });
  };

  const removePolicy = (type, index) => {
    const updatedPolicies = [...policies[type]];
    updatedPolicies.splice(index, 1);
    setPolicies({ ...policies, [type]: updatedPolicies });
  };

  const handleFileChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const fileSizeMB = file.size / (1024 * 1024);
      if (fileSizeMB > 4) {
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

  const addValueField1 = () => {
    setValues([...values, '']);
  };

  const removeValueField1 = (index) => {
    const updatedValues = values.filter((_, i) => i !== index);
    setValues(updatedValues);
  };

  const addValueField = () => {
    setAboutImage([...aboutImage, null]);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const removeValueField = (index) => {
    setAboutImage((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="font-medium text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-3">
          ABOUT COMPANY
        </h1>
        <p className="text-[#939393] text-sm sm:text-base px-4">
          Establish transparent guidelines, sharing policies and terms for clarity and understanding.
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
        {/* Count Banner Section */}
        <div className="bg-white shadow-sm rounded-lg p-4 sm:p-6">
          <h2 className="font-medium text-lg sm:text-xl mb-4">Count Banner</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {titleOfCountBanner.map((title, index) => (
              <div key={index} className="space-y-2">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  {title}
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="number"
                  value={countBanner[index]?.count || ''}
                  onChange={(e) => handlecountChange(index, e.target.value)}
                  placeholder={`Enter number of ${title.toLowerCase()}`}
                  className="w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#30AFBC] focus:border-[#30AFBC] outline-none"
                  min="0"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Company Values Section */}
        <div className="bg-white shadow-sm rounded-lg p-4 sm:p-6">
          <h2 className="font-medium text-lg sm:text-xl mb-4">Company Values</h2>
          <div className="space-y-4">
            {values?.map((value, index) => (
              <div key={index} className="relative">
                <TextInput
                  value={value || ""}
                  onChange={(e) => handleValueChange(index, e.target.value)}
                  placeholder="Enter your company's core value"
                  className="w-full pr-10"
                />
                <button
                  type="button"
                  onClick={() => removeValueField1(index)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-700"
                  aria-label="Remove value"
                >
                  ×
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addValueField1}
              className="w-full sm:w-auto bg-[#30AFBC] text-white px-4 py-2 rounded-md hover:bg-[#2a9ca8] transition-colors"
            >
              Add Value
            </button>
          </div>
        </div>

        {/* Policies Section */}
        <div className="bg-white shadow-sm rounded-lg p-4 sm:p-6">
          {Object.entries(policies).map(([type, policyItems], typeIndex) => (
            <div key={typeIndex} className="mb-6 last:mb-0">
              <h2 className="font-medium text-lg sm:text-xl mb-4">{type}</h2>
              <div className="space-y-4">
                {policyItems.map((item, itemIndex) => (
                  <div key={itemIndex} className="relative">
                    <TextInput
                      value={item || ""}
                      onChange={(e) => handlePolicyChange(type, e.target.value, itemIndex)}
                      placeholder={`Enter ${type.toLowerCase()} details`}
                      className="w-full pr-10"
                    />
                    <button
                      onClick={() => removePolicy(type, itemIndex)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-700"
                      aria-label="Remove policy"
                    >
                      ×
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addPolicy(type)}
                  className="w-full sm:w-auto bg-[#30AFBC] text-white px-4 py-2 rounded-md hover:bg-[#2a9ca8] transition-colors"
                >
                  Add {type}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* About Us Images Section */}
        <div className="bg-white shadow-sm rounded-lg p-4 sm:p-6">
          <h2 className="font-medium text-lg sm:text-xl mb-4">About Us Images</h2>
          <div className="space-y-4">
            {aboutImage.map((file, index) => (
              <div key={index} className="relative">
                <div className="max-w-full">
                  <Label
                    htmlFor={`fileInput-${index}`}
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Image {index + 1}
                    <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <div className="relative">
                    <FileInput
                      id={`fileInput-${index}`}
                      onChange={(e) => handleFileChange(e, index)}
                      helperText={file ? file.name : "Upload image (JPG, JPEG, PNG, or SVG)"}
                      className="w-full"
                    />
                    <button
                      type="button"
                      onClick={() => removeValueField(index)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-700"
                      aria-label="Remove image"
                    >
                      ×
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addValueField}
              className="w-full sm:w-auto bg-[#30AFBC] text-white px-4 py-2 rounded-md hover:bg-[#2a9ca8] transition-colors"
            >
              Add Image
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Policy;