import React from 'react';
import { Label, TextInput, FileInput, Card } from 'flowbite-react';
import { 
  FiPlus, FiTrash2, FiImage, FiAward, FiShield, 
  FiUsers, FiBook, FiTarget, FiTrendingUp, FiCoffee 
} from 'react-icons/fi';

function Policy({ 
  countBanner, 
  setCountBanner, 
  titleOfCountBanner, 
  values, 
  setValues, 
  policies, 
  setPolicies, 
  aboutImage, 
  setAboutImage 
}) {
  const handleCountBannerChange = (index, value) => {
    const updatedBanner = [...countBanner];
    updatedBanner[index] = { ...updatedBanner[index], count: value };
    setCountBanner(updatedBanner);
  };

  const handleValuesChange = (index, value) => {
    const updatedValues = [...values];
    updatedValues[index] = value;
    setValues(updatedValues);
  };

  const addValue = () => {
    if (values.length < 6) {
      setValues([...values, '']);
    }
  };

  const removeValue = (index) => {
    const updatedValues = values.filter((_, i) => i !== index);
    setValues(updatedValues);
  };

  const handlePolicyChange = (section, index, value) => {
    const updatedPolicies = { ...policies };
    updatedPolicies[section][index] = value;
    setPolicies(updatedPolicies);
  };

  const addPolicyPoint = (section) => {
    const updatedPolicies = { ...policies };
    updatedPolicies[section] = [...updatedPolicies[section], ''];
    setPolicies(updatedPolicies);
  };

  const removePolicyPoint = (section, index) => {
    const updatedPolicies = { ...policies };
    updatedPolicies[section] = updatedPolicies[section].filter((_, i) => i !== index);
    setPolicies(updatedPolicies);
  };

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const validFiles = files.filter(file => {
      const fileSizeMB = file.size / (1024 * 1024);
      const validTypes = ["image/jpeg", "image/jpg", "image/png"];
      
      if (fileSizeMB > 4) {
        alert(`File ${file.name} exceeds 4MB limit.`);
        return false;
      }
      
      if (!validTypes.includes(file.type)) {
        alert(`File ${file.name} is not a valid image type.`);
        return false;
      }
      
      return true;
    });

    if (aboutImage.length + validFiles.length <= 8) {
      setAboutImage([...aboutImage, ...validFiles]);
    } else {
      alert("Maximum 8 images allowed");
    }
  };

  const removeImage = (index) => {
    setAboutImage(aboutImage.filter((_, i) => i !== index));
  };

  const getMetricIcon = (title) => {
    const iconMap = {
      'Students': FiUsers,
      'Courses': FiBook,
      'Experience': FiTarget,
      'Success Rate': FiTrendingUp
    };
    return iconMap[title] || FiAward;
  };

  return (
    <div className="min-h-screen bg-[#FDF8F3] p-4 md:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <FiCoffee className="w-16 h-16 text-[#4A3520]" />
          </div>
          <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl text-[#4A3520] mb-4">
            Café Profile
          </h1>
          <p className="text-[#8B5E34] text-lg md:text-xl max-w-2xl mx-auto">
            Share your café's story, values, and policies to create a welcoming atmosphere
          </p>
        </div>

        <div className="grid gap-8">
          {/* Key Metrics Section */}
          <Card className="overflow-hidden border-none ring-1 ring-[#D4B59D] bg-white/80 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-[#8B5E34] to-[#4A3520] rounded-lg">
                <FiTrendingUp className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-[#4A3520]">Key Metrics</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {countBanner.map((item, index) => {
                const Icon = getMetricIcon(item.title);
                return (
                  <div key={index} className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#FDF8F3] to-[#F3E6D8] rounded-lg transform transition-transform group-hover:scale-105" />
                    <div className="relative p-4 space-y-3">
                      <div className="flex items-center gap-2">
                        <Icon className="w-5 h-5 text-[#8B5E34]" />
                        <Label className="font-medium text-[#4A3520]">
                          {item.title}
                          <span className="text-red-500 ml-1">*</span>
                        </Label>
                      </div>
                      <TextInput
                        type="number"
                        value={item.count}
                        onChange={(e) => handleCountBannerChange(index, e.target.value)}
                        placeholder={`Enter ${item.title.toLowerCase()}`}
                        required
                        className="w-full focus:ring-[#8B5E34] focus:border-[#8B5E34]"
                        min="0"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Company Values Section */}
          <Card className="overflow-hidden border-none ring-1 ring-[#D4B59D] bg-white/80 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-[#8B5E34] to-[#4A3520] rounded-lg">
                  <FiAward className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-semibold text-[#4A3520]">Café Values</h2>
              </div>
              {values.length < 6 && (
                <button
                  type="button"
                  onClick={addValue}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#8B5E34] to-[#4A3520] rounded-lg hover:from-[#7A4E24] hover:to-[#392910] transition-all duration-200"
                >
                  <FiPlus className="w-4 h-4" />
                  Add Value
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {values.map((value, index) => (
                <div key={index} className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#FDF8F3] to-[#F3E6D8] rounded-lg transform transition-transform group-hover:scale-105" />
                  <div className="relative flex gap-2 p-4">
                    <TextInput
                      value={value}
                      onChange={(e) => handleValuesChange(index, e.target.value)}
                      placeholder="Enter café value"
                      className="flex-1 focus:ring-[#8B5E34] focus:border-[#8B5E34]"
                    />
                    <button
                      type="button"
                      onClick={() => removeValue(index)}
                      className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Policies Section */}
          {Object.entries(policies).map(([section, points]) => (
            <Card key={section} className="overflow-hidden border-none ring-1 ring-[#D4B59D] bg-white/80 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-[#8B5E34] to-[#4A3520] rounded-lg">
                    <FiShield className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-semibold text-[#4A3520]">{section}</h2>
                </div>
                <button
                  type="button"
                  onClick={() => addPolicyPoint(section)}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#8B5E34] to-[#4A3520] rounded-lg hover:from-[#7A4E24] hover:to-[#392910] transition-all duration-200"
                >
                  <FiPlus className="w-4 h-4" />
                  Add Point
                </button>
              </div>
              <div className="space-y-4">
                {points.map((point, index) => (
                  <div key={index} className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#FDF8F3] to-[#F3E6D8] rounded-lg transform transition-transform group-hover:scale-105" />
                    <div className="relative flex gap-2 p-4">
                      <textarea
                        value={point}
                        onChange={(e) => handlePolicyChange(section, index, e.target.value)}
                        placeholder={`Enter ${section.toLowerCase()} point`}
                        rows={3}
                        className="flex-1 rounded-lg border-[#D4B59D] focus:border-[#8B5E34] focus:ring-[#8B5E34]/20 resize-none bg-white"
                      />
                      <button
                        type="button"
                        onClick={() => removePolicyPoint(section, index)}
                        className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}

          {/* About Images Section */}
          <Card className="overflow-hidden border-none ring-1 ring-[#D4B59D] bg-white/80 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-[#8B5E34] to-[#4A3520] rounded-lg">
                  <FiImage className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-semibold text-[#4A3520]">Café Gallery</h2>
              </div>
              <Label 
                htmlFor="aboutImages" 
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#8B5E34] to-[#4A3520] rounded-lg hover:from-[#7A4E24] hover:to-[#392910] transition-all duration-200 cursor-pointer"
              >
                <FiPlus className="w-4 h-4" />
                Add Images
              </Label>
            </div>
            <FileInput
              id="aboutImages"
              onChange={handleImageChange}
              accept=".jpg,.jpeg,.png"
              multiple
              className="hidden"
            />
            {aboutImage.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {aboutImage.map((image, index) => (
                  <div key={index} className="group relative rounded-lg overflow-hidden">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`About ${index + 1}`}
                      className="w-full h-48 object-cover transform transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#4A3520]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute bottom-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 px-4 border-2 border-dashed border-[#D4B59D] rounded-lg">
                <FiImage className="w-12 h-12 text-[#8B5E34] mx-auto mb-4" />
                <p className="text-[#4A3520]">
                  Drop your café photos here or click to upload
                </p>
                <p className="text-sm text-[#8B5E34] mt-2">
                  Maximum 8 images (4MB each, JPG or PNG)
                </p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Policy;