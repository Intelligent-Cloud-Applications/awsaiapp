import React from 'react';
import { Label, TextInput, Textarea } from 'flowbite-react';
import { FiFileText, FiUpload, FiPlus, FiX } from 'react-icons/fi';

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

  const handleBgImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > 4) {
      alert("File size exceeds 4MB. Please choose a smaller file.");
      return;
    }
    setAboutUsBg(file);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-50 mb-6">
          <FiFileText className="w-8 h-8 text-teal-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Policies & Terms</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Establish clear guidelines and terms for your dance studio to ensure transparency with your students.
        </p>
      </div>

      <div className="space-y-8">
        {/* About Us Background Image */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <FiUpload className="w-5 h-5 text-teal-600" />
            About Us Background
          </h2>

          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">
              Background Image <span className="text-red-500">*</span>
            </Label>
            <label
              htmlFor="AboutUsBgInput"
              className={`relative flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer 
                ${AboutUsBg ? 'border-teal-200 hover:border-teal-300' : 'border-gray-200 hover:border-gray-300'}
                transition-colors bg-gray-50 hover:bg-gray-100`}
            >
              <input
                id="AboutUsBgInput"
                type="file"
                accept="image/*"
                onChange={handleBgImageChange}
                className="hidden"
              />
              
              {AboutUsBg ? (
                <div className="relative w-full h-full">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-sm text-gray-600">
                      {AboutUsBg.name}
                    </p>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setAboutUsBg(null);
                      }}
                      className="ml-2 text-teal-600 hover:text-teal-700"
                    >
                      Change
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <FiUpload className="w-8 h-8 text-teal-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">Click to upload background image</p>
                </div>
              )}
            </label>
          </div>
        </div>

        {/* Policy Sections */}
        {Object.entries(policies).map(([type, value], index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">{type}</h2>
            
            <div className="space-y-6">
              {value.map((item, itemIndex) => (
                <div 
                  key={itemIndex}
                  className="relative p-4 border border-gray-100 rounded-lg bg-gray-50"
                >
                  <button
                    onClick={() => removePolicy(type, itemIndex)}
                    className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors"
                    title={`Remove ${type} item`}
                  >
                    <FiX className="w-5 h-5" />
                  </button>

                  <div className="space-y-4 mt-2">
                    <div>
                      <Label className="block text-sm font-medium text-gray-700 mb-1">
                        Heading
                      </Label>
                      <TextInput
                        value={item.heading}
                        onChange={(e) => handlePolicyChange(type, 'heading', e.target.value, itemIndex)}
                        placeholder={`Enter ${type} heading`}
                      />
                    </div>

                    <div>
                      <Label className="block text-sm font-medium text-gray-700 mb-1">
                        Content
                      </Label>
                      <Textarea
                        value={item.content}
                        onChange={(e) => handlePolicyChange(type, 'content', e.target.value, itemIndex)}
                        placeholder={`Enter ${type} content`}
                        rows={3}
                      />
                    </div>
                  </div>
                </div>
              ))}

              <button
                onClick={() => addPolicy(type)}
                className="w-full py-3 border-2 border-dashed border-teal-200 rounded-lg text-teal-600 hover:border-teal-600 hover:text-teal-700 transition-colors flex items-center justify-center gap-2"
              >
                <FiPlus className="w-5 h-5" />
                Add {type} Item
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Policy;
