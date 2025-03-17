import React from 'react';
import { TextInput, Label, Textarea } from 'flowbite-react';
import { FiFileText, FiUpload, FiX, FiPlusCircle, FiImage, FiBook, FiShield, FiDollarSign, FiInfo } from 'react-icons/fi';

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

  const shortenFileName = (file) => {
    if (!file || !file.name) return '';
    return file.name.length > 15 ? `${file.name.substring(0, 12)}...` : file.name;
  };

  const policyIcons = {
    'Privacy Policy': <FiShield className="w-5 h-5 text-teal-600" />,
    'About Us': <FiInfo className="w-5 h-5 text-teal-600" />,
    'Refund Policy': <FiDollarSign className="w-5 h-5 text-teal-600" />,
    'Terms and Conditions': <FiFileText className="w-5 h-5 text-teal-600" />
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-50 mb-6">
          <FiBook className="w-8 h-8 text-teal-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Policy and Terms</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Establish transparent guidelines, sharing policies and terms for clarity and understanding.
        </p>
      </div>

      <div className="space-y-8">
        {/* About Us Background Image Upload */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-4 mb-4">
            <FiImage className="w-5 h-5 text-teal-600" />
            <h2 className="text-xl font-semibold text-gray-900">About Us Background</h2>
          </div>
          
          <div className="mt-4">
            <Label className="block text-sm font-medium text-gray-700 mb-2">
              Background Image <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleBgImageChange}
                className="hidden"
                id="AboutUsBgInput"
              />
              <label
                htmlFor="AboutUsBgInput"
                className="flex items-center gap-2 px-4 py-2 border-2 border-dashed rounded-lg cursor-pointer hover:border-teal-500 transition-colors"
              >
                <FiUpload className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-600">
                  {AboutUsBg ? shortenFileName(AboutUsBg) : 'Choose Image'}
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Policy Sections */}
        {Object.entries(policies).map(([type, value], index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-4 mb-6">
              {policyIcons[type]}
              <h2 className="text-xl font-semibold text-gray-900">{type}</h2>
            </div>

            <div className="space-y-6">
              {value.map((item, itemIndex) => (
                <div key={itemIndex} className="relative bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <button
                    onClick={() => removePolicy(type, itemIndex)}
                    className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors"
                    title="Remove Section"
                  >
                    <FiX className="w-5 h-5" />
                  </button>

                  <div className="space-y-4">
                    <div>
                      <Label className="block text-sm font-medium text-gray-700 mb-1">
                        Heading
                      </Label>
                      <TextInput
                        type="text"
                        value={item.heading}
                        onChange={(e) => handlePolicyChange(type, 'heading', e.target.value, itemIndex)}
                        placeholder="Enter section heading"
                        className="w-full bg-white"
                      />
                    </div>

                    <div>
                      <Label className="block text-sm font-medium text-gray-700 mb-1">
                        Content
                      </Label>
                      <Textarea
                        value={item.content}
                        onChange={(e) => handlePolicyChange(type, 'content', e.target.value, itemIndex)}
                        placeholder="Enter section content"
                        className="w-full bg-white"
                        rows={4}
                      />
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex justify-center mt-4">
                <button
                  onClick={() => addPolicy(type)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                >
                  <FiPlusCircle className="w-4 h-4" />
                  Add {type} Section
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Policy;
