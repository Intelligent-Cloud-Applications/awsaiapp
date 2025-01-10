import { TextInput } from 'flowbite-react';
import React from 'react';

function Policy({ policies, setPolicies, AboutUsBg, setAboutUsBg }) {

  const handlePolicyChange = (type, field, value, index) => {
    const updatedPolicies = [...policies[type]];
    updatedPolicies[index][field] = value;
    setPolicies({ ...policies, [type]: updatedPolicies });
  };

  const addPolicy = (type) => {
    const updatedPolicies = [...policies[type], { heading: '', content: '' }];
    setPolicies({ ...policies, [type]: updatedPolicies });
  };

  const removePolicy = (type, index) => {
    const updatedPolicies = [...policies[type]];
    updatedPolicies.splice(index, 1);
    setPolicies({ ...policies, [type]: updatedPolicies });
  };
  const handleBgImageChange3 = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileSizeMB = file.size / (1024 * 1024);
      if (fileSizeMB > 4) {
        alert("File size exceeds 4MB. Please choose a smaller file.");
        return;
      }
    }
    if (file) {
      setAboutUsBg(file);
    }
  };

  const shortenFileName1 = (file) => {
    if (!file || !file.name) return '';
    const maxLength = 15;
    const fileName = file.name;
    if (fileName.length > maxLength) {
      return `${fileName.substring(0, maxLength)}...`;
    }
    return fileName;
  };
  return (
    <div className="home h-[185vh] w-[100%]">
      <h1 className="font-medium text-7xl pb-[1rem] text-center">POLICY AND TERMS</h1>
      <h5 className="text-[#939393] text-center mx-[10%]">
        Establish transparent guidelines, sharing policies and terms for clarity and understanding.
      </h5>
      <div className="flex justify-center ml-[8%]">
        <div className="w-[60%] p-8">
          <div className="relative flex items-center mt-4">
            <h2 className="font-medium text-xl">AboutUsBg</h2>
            <div className='mr-10'></div>
            <TextInput
              type="file"
              accept="image/*"
              // onChange={(e) => handleImageChange(setAboutUsBg, e)}
              onChange={handleBgImageChange3}
              className="hidden"
              id="AboutUsBgInput"
            />
            <label
              htmlFor="AboutUsBgInput"
              className="w-[150px] h-[25px] border border-[#3f3e3e] flex items-center justify-center cursor-pointer relative"
              style={{
                borderColor: 'cement',
                borderWidth: '2px',
                borderStyle: 'solid',
                backgroundColor: '#D9D9D9',
              }}
            >
              <span
                className={`block text-[#000000] font-inter text-[14px] ${AboutUsBg ? 'hidden' : 'block'
                  }`}
              >
                Choose File
              </span>
              <div
                className={`absolute top-0 left-0 right-0 bottom-0 flex items-center justify-between px-2 truncate ${AboutUsBg ? 'block' : 'hidden'
                  }`}
              >
                <span className="text-[#636262]">
                  {shortenFileName1(AboutUsBg)}
                </span>
                <span
                  onClick={() => setAboutUsBg(null)}
                  className="text-[#3b9d33] cursor-pointer"
                >
                  Change
                </span>
              </div>
            </label>
          </div>
          <div className="mt-8">
            {Object.entries(policies).map(([type, value], index) => (
              <div key={index} className="mt-4">
                <h2 className="font-medium text-xl">{type}</h2>
                {value.map((item, itemIndex) => (
                  <div key={itemIndex} className="mt-4">
                    <div className="relative">
                      <button
                        onClick={() => removePolicy(type, itemIndex)}
                        className="absolute top-0 right-0 m-1 px-[6px] rounded-full bg-red-500 text-white transform text-sm z-10"
                      >
                        X
                      </button>
                    </div>
                    <TextInput
                      type="text"
                      value={item.heading}
                      onChange={(e) => handlePolicyChange(type, 'heading', e.target.value, itemIndex)}
                      placeholder="Heading"
                      className="w-full pt-4"
                      style={{
                        borderColor: "#D1D5DB",
                        backgroundColor: "#F9FAFB",
                        borderRadius: "8px",
                      }}
                    />
                    <TextInput
                      value={item.content}
                      onChange={(e) => handlePolicyChange(type, 'content', e.target.value, itemIndex)}
                      placeholder="Content"
                      className="w-full pt-4"
                      style={{
                        borderColor: "#D1D5DB",
                        backgroundColor: "#F9FAFB",
                        borderRadius: "8px",
                      }}
                      rows={3}
                    />
                  </div>
                ))}
                <div className="mt-4 flex justify-center">
                  <button onClick={() => addPolicy(type)} className="bg-[#30AFBC] text-white px-4 py-2 rounded-md">
                    Add {type}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Policy;
