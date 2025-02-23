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
    const updatedPolicies = [...policies[type], { heading: '', content: '' }];
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
        updatedImages[index] = file; // Replace or add the file at the correct index
        setAboutImage(updatedImages);
      } else {
        alert("Invalid file type. Please select a JPG, JPEG, PNG, or SVG file.");
        e.target.value = "";
      }
    }
  };
  console.log("Images:", aboutImage);

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

  // Function to add a new input field
  const addValueField1 = () => {
    setValues([...values, '']); // Add an empty string for the new input
  };

  // Function to remove an input field
  const removeValueField1 = (index) => {
    const updatedValues = values.filter((_, i) => i !== index);
    setValues(updatedValues);
  };

  const addValueField = () => {
    setAboutImage([...aboutImage, null]); // Add null as a placeholder for a new file
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const removeValueField = (index) => {
    setAboutImage((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <div className="mx-auto [@media(max-width:1024px)]:mb-10" style={{ overflowY: 'auto', maxHeight: '74vh' }}>
      <h1 className="font-medium text-7xl text-center">ABOUT COMPANY</h1>
      <h5 className="text-center text-[#939393]">
        Establish transparent guidelines, sharing policies and terms for clarity and understanding and also your count banner.
      </h5>
      <div className="flex justify-center [@media(max-width:1024px)]:ml-0">
        <div className="w-[60%] p-8 [@media(max-width:1024px)]:w-full [@media(max-width:1024px)]:p-2">
          <div className="relative mt-4 [@media(max-width:1024px)]:flex-col">
            <div className="pb-6">
              {titleOfCountBanner.map((title, index) => (
                <div key={index} className="mt-2">
                  <div className="flex">
                    <h2 className="font-medium text-xl">{title}</h2>
                    <span className="text-red-500 ml-1">*</span>
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      value={countBanner[index].count}
                      onChange={(e) => handlecountChange(index, e.target.value)}
                      placeholder={`Number of ${title}`}
                      className="w-full"
                      style={{
                        borderColor: "#D1D5DB",
                        backgroundColor: "#F9FAFB",
                        borderRadius: "8px",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative mt-4">
            <div className="pb-6">
              <h2 className="font-medium text-xl">Company Values</h2>
              {values && values.map((title, index) => (
                <div key={index} className="mt-2">
                  <div className="relative">
                    <TextInput
                      value={title}
                      onChange={(e) => handleValueChange(index, e.target.value)}
                      placeholder="Give the values of our company"
                      className="w-full"
                      style={{
                        borderColor: "#D1D5DB",
                        backgroundColor: "#F9FAFB",
                        borderRadius: "8px",
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => removeValueField1(index)} // Remove field on click
                      className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white px-1 rounded-full text-sm mr-[12px] mt-2"
                    >
                      <span>X</span>
                    </button>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={addValueField1} // Add field on click
                className="bg-[#30AFBC] text-white px-4 py-2 rounded-md mt-5"
              >
                Add Value
              </button>
            </div>
          </div>
          <div className="mt-8">
            {Object.entries(policies).map(([type, value], index) => (
              <div key={index} className="mt-4">
                <h2 className="font-medium text-xl">{type}</h2>
                {Array.isArray(value) && value.map((item, itemIndex) => (
                  <div key={itemIndex} className="mt-4">
                    <div className="relative">
                      <button
                        onClick={() => removePolicy(type, itemIndex)}
                        className="absolute top-0 right-0 m-1 px-[6px] rounded-full bg-red-500 text-white transform text-sm"
                      >
                        X
                      </button>
                    </div>
                    <TextInput
                      value={item.content}
                      onChange={(e) => handlePolicyChange(type, e.target.value, itemIndex)}
                      placeholder="Content"
                      className="w-full"
                      style={{
                        borderColor: "#D1D5DB",
                        backgroundColor: "#F9FAFB",
                        borderRadius: "8px",
                      }}
                      rows={3}
                    />
                  </div>
                ))}
                <div className="mt-2 flex justify-center">
                  <button onClick={() => addPolicy(type)} className="bg-[#30AFBC] text-white px-4 py-2 rounded-md">
                    Add {type}
                  </button>
                </div>
              </div>
            ))}
            <div className="relative mt-4">
              <div className="pb-6">
                <h2 className="font-medium text-xl">About Us Images</h2>
                {aboutImage.map((file, index) => (
                  <div key={index} className="mt-2">
                    <div className="relative">
                      <div className="max-w-md relative">
                        <div className="mb-2 block">
                          <Label
                            htmlFor={`fileInput-${index}`}
                            value="Image Upload File"
                          />
                          <span className="text-red-500 ml-1">*</span>
                        </div>
                        <FileInput
                          id={`fileInput-${index}`}
                          onChange={(e) => handleFileChange(e, index)}
                          helperText={file ? file.name : "It’s the Images to About Us Page"}
                          style={{
                            borderColor: "#D1D5DB",
                            backgroundColor: "#F9FAFB",
                            borderRadius: "8px",
                          }}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeValueField(index)}
                        className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white px-1 rounded-full text-sm mr-[12px] mt-2"
                      >
                        <span>X</span>
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addValueField}
                  className="bg-[#30AFBC] text-white px-4 py-2 rounded-md mt-5"
                >
                  Add images
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Policy;