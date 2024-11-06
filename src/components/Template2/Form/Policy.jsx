import { useRef } from "react";
import { Label, FileInput } from 'flowbite-react';

function Policy({ policies, setPolicies, aboutImage, setAboutImage }) {

  const handlePolicyChange = (type, field, value, index) => {
    const updatedPolicies = [...policies[type]];
    updatedPolicies[index][field] = value;
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
  console.log("Images:",aboutImage);

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
    <div className="mx-auto" style={{ overflowY: 'auto', maxHeight: '74vh' }}>
      <h1 className="font-medium text-7xl text-center">POLICY AND TERMS</h1>
      <h5 className="text-center text-[#939393]">
        Establish transparent guidelines, sharing policies and terms for clarity and understanding.
      </h5>
      <div className="mt-8">
        {Object.entries(policies).map(([type, value], index) => (
          <div key={index} className="mt-4">
            <h2 className="font-medium text-xl">{type}</h2>
            {value.map((item, itemIndex) => (
              <div key={itemIndex} className="mt-4">
                <div className="relative">
                  <button
                    onClick={() => removePolicy(type, itemIndex)}
                    className="absolute top-0 right-0 m-1 px-[6px] rounded-full bg-red-500 text-white transform text-sm"
                  >
                    X
                  </button>
                </div>
                <input
                  type="text"
                  value={item.heading}
                  onChange={(e) => handlePolicyChange(type, 'heading', e.target.value, itemIndex)}
                  placeholder="Heading"
                  className="w-full text-black border-none outline-none bg-transparent mt-2 resize-none placeholder-border-b-2 policy-textarea"
                />
                <textarea
                  value={item.content}
                  onChange={(e) => handlePolicyChange(type, 'content', e.target.value, itemIndex)}
                  placeholder="Content"
                  className="w-full text-black border-none outline-none bg-transparent mt-2 resize-none placeholder-border-b-2 policy-textarea"
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
  );
}

export default Policy;
