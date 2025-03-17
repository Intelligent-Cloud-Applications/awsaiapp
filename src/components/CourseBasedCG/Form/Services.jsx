import React, { useState, useRef } from 'react';
import { TextInput, Label } from 'flowbite-react';
import { FiImage, FiGrid, FiUpload, FiX, FiPlusCircle, FiList, FiPackage, FiMusic } from 'react-icons/fi';

function Services({ 
  services, 
  setServices, 
  danceTypes, 
  setDanceTypes, 
  servicesBg, 
  setServicesBg, 
  servicesPortrait, 
  setServicesPortrait 
}) {
  const [activeServiceIndex, setActiveServiceIndex] = useState(null);
  const danceTypesContainerRef = useRef(null);
  const [activeDanceTypeIndex, setActiveDanceTypeIndex] = useState(null);
  const [errors, setErrors] = useState({});

  const handleDanceTypeChange = (index, value) => {
    const updatedDanceTypes = [...danceTypes];
    updatedDanceTypes[index] = value;
    setDanceTypes(updatedDanceTypes);
    setErrors(prev => ({ ...prev, [`danceType${index}`]: null }));
  };

  const addNewDanceType = () => {
    if (danceTypes.length < 5) {
      setDanceTypes([...danceTypes, '']);
      setTimeout(() => {
        danceTypesContainerRef.current?.scrollTo({
          top: danceTypesContainerRef.current.scrollHeight,
          behavior: 'smooth'
        });
      }, 100);
    }
  };

  const removeDanceType = (index) => {
    const updatedDanceTypes = [...danceTypes];
    updatedDanceTypes.splice(index, 1);
    setDanceTypes(updatedDanceTypes);
  };

  const handleServiceChange = (index, e) => {
    const updatedServices = [...services];
    updatedServices[index] = { ...updatedServices[index], [e.target.name]: e.target.value };
    setServices(updatedServices);
    setErrors(prev => ({ ...prev, [`service${index}`]: null }));
  };

  const handleAddItem = (index) => {
    const updatedServices = [...services];
    updatedServices[index].items.push('');
    setServices(updatedServices);
  };

  const handleItemChange = (serviceIndex, itemIndex, e) => {
    const updatedServices = [...services];
    updatedServices[serviceIndex].items[itemIndex] = e.target.value;
    setServices(updatedServices);
    setErrors(prev => ({ ...prev, [`serviceItem${serviceIndex}-${itemIndex}`]: null }));
  };

  const handleRemoveItem = (serviceIndex, itemIndex) => {
    const updatedServices = [...services];
    updatedServices[serviceIndex].items.splice(itemIndex, 1);
    setServices(updatedServices);
  };

  const handleBgImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > 4) {
      setErrors(prev => ({ ...prev, servicesBg: "File size exceeds 4MB. Please choose a smaller file." }));
      return;
    }
    setServicesBg(file);
    setErrors(prev => ({ ...prev, servicesBg: null }));
  };

  const handlePortraitImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > 4) {
      setErrors(prev => ({ ...prev, servicesPortrait: "File size exceeds 4MB. Please choose a smaller file." }));
      return;
    }
    setServicesPortrait(file);
    setErrors(prev => ({ ...prev, servicesPortrait: null }));
  };

  const shortenFileName = (file) => {
    if (!file || !file.name) return '';
    return file.name.length > 15 ? `${file.name.substring(0, 12)}...` : file.name;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-50 mb-6">
          <FiGrid className="w-8 h-8 text-teal-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Service Highlights</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Effectively highlight your services by showcasing their unique benefits and value propositions. Make it clear how each service meets your audience's needs and stands out from the competition.
        </p>
      </div>

      <div className="space-y-8">
        {/* Image Upload Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-4 mb-6">
            <FiImage className="w-5 h-5 text-teal-600" />
            <h2 className="text-xl font-semibold text-gray-900">Service Images</h2>
          </div>

          <div className="space-y-6">
            {/* Background Image */}
            <div>
              <Label className="block text-sm font-medium text-gray-700 mb-2">
                Background Image <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleBgImageChange}
                  className="hidden"
                  id="servicesBgInput"
                />
                <label
                  htmlFor="servicesBgInput"
                  className={`flex items-center gap-2 px-4 py-2 border-2 border-dashed rounded-lg cursor-pointer hover:border-teal-500 transition-colors ${
                    errors.servicesBg ? 'border-red-500' : 'border-gray-200'
                  }`}
                >
                  <FiUpload className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {servicesBg ? shortenFileName(servicesBg) : 'Choose Background Image'}
                  </span>
                </label>
                {errors.servicesBg && (
                  <p className="mt-1 text-sm text-red-500">{errors.servicesBg}</p>
                )}
              </div>
            </div>

            {/* Portrait Image */}
            <div>
              <Label className="block text-sm font-medium text-gray-700 mb-2">
                Portrait Image <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePortraitImageChange}
                  className="hidden"
                  id="servicesPortraitInput"
                />
                <label
                  htmlFor="servicesPortraitInput"
                  className={`flex items-center gap-2 px-4 py-2 border-2 border-dashed rounded-lg cursor-pointer hover:border-teal-500 transition-colors ${
                    errors.servicesPortrait ? 'border-red-500' : 'border-gray-200'
                  }`}
                >
                  <FiUpload className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {servicesPortrait ? shortenFileName(servicesPortrait) : 'Choose Portrait Image'}
                  </span>
                </label>
                {errors.servicesPortrait && (
                  <p className="mt-1 text-sm text-red-500">{errors.servicesPortrait}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Services Section */}
        {services.map((service, serviceIndex) => (
          <div key={serviceIndex} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-4 mb-6">
              <FiPackage className="w-5 h-5 text-teal-600" />
              <h2 className="text-xl font-semibold text-gray-900">
                Service {serviceIndex + 1} <span className="text-red-500">*</span>
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-1">
                  Service Title
                </Label>
                <TextInput
                  type="text"
                  name="title"
                  value={service.title || ''}
                  onChange={(e) => handleServiceChange(serviceIndex, e)}
                  placeholder="Enter service title"
                  className="w-full bg-gray-50"
                />
              </div>

              <div className="space-y-3">
                <Label className="block text-sm font-medium text-gray-700">
                  Service Items
                </Label>
                {service.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="relative">
                    <TextInput
                      value={item}
                      onChange={(e) => handleItemChange(serviceIndex, itemIndex, e)}
                      placeholder="Enter service item"
                      className="w-full bg-gray-50"
                    />
                    <button
                      onClick={() => handleRemoveItem(serviceIndex, itemIndex)}
                      className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors"
                      title="Remove Item"
                    >
                      <FiX className="w-5 h-5" />
                    </button>
                  </div>
                ))}
                {service.items.length < 5 && (
                  <button
                    onClick={() => handleAddItem(serviceIndex)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                  >
                    <FiPlusCircle className="w-4 h-4" />
                    Add Item
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Dance Types Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-4 mb-6">
            <FiMusic className="w-5 h-5 text-teal-600" />
            <h2 className="text-xl font-semibold text-gray-900">Dance Types</h2>
          </div>

          <div className="space-y-4" ref={danceTypesContainerRef}>
            {danceTypes.map((danceType, index) => (
              <div key={index} className="relative">
                <Label className="block text-sm font-medium text-gray-700 mb-1">
                  Dance Type {index + 1} <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <TextInput
                    type="text"
                    value={danceType || ''}
                    onChange={(e) => handleDanceTypeChange(index, e.target.value)}
                    placeholder="Enter dance type"
                    className="w-full bg-gray-50"
                  />
                  {index >= 3 && (
                    <button
                      onClick={() => removeDanceType(index)}
                      className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors"
                      title="Remove Dance Type"
                    >
                      <FiX className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            ))}

            {danceTypes.length < 5 && (
              <div className="flex justify-center mt-6">
                <button
                  onClick={addNewDanceType}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                >
                  <FiPlusCircle className="w-4 h-4" />
                  Add Dance Type
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;
