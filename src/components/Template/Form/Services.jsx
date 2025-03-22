import React, { useState, useRef } from 'react';
import { Label, TextInput } from 'flowbite-react';
import { FiGrid, FiUpload, FiPlus, FiX, FiImage, FiList, FiActivity } from 'react-icons/fi';

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
  const [errors, setErrors] = useState({});
  const danceTypesContainerRef = useRef(null);

  const handleDanceTypeChange = (index, value) => {
    const updatedDanceTypes = [...danceTypes];
    updatedDanceTypes[index] = value;
    setDanceTypes(updatedDanceTypes);
  };

  const addNewDanceType = () => {
    if (danceTypes.length < 5) {
      setDanceTypes([...danceTypes, '']);
      setTimeout(() => {
        danceTypesContainerRef.current?.lastElementChild?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const removeDanceType = (index) => {
    const updatedDanceTypes = [...danceTypes];
    updatedDanceTypes.splice(index, 1);
    setDanceTypes(updatedDanceTypes);
  };

  const handleServiceChange = (index, field, value) => {
    const updatedServices = [...services];
    updatedServices[index][field] = value;
    setServices(updatedServices);
    setErrors(prev => ({ ...prev, [`service${index}_${field}`]: null }));
  };

  console.log("Error in the Service page", errors);

  const handleAddItem = (index) => {
    const updatedServices = [...services];
    updatedServices[index].items.push('');
    setServices(updatedServices);
  };

  const handleItemChange = (serviceIndex, itemIndex, e) => {
    const updatedServices = [...services];
    updatedServices[serviceIndex].items[itemIndex] = e.target.value;
    setServices(updatedServices);
  };

  const handleRemoveItem = (serviceIndex, itemIndex) => {
    const updatedServices = [...services];
    updatedServices[serviceIndex].items.splice(itemIndex, 1);
    setServices(updatedServices);
  };

  const handleImageChange = (setter) => (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > 4) {
      alert("File size exceeds 4MB. Please choose a smaller file.");
      return;
    }
    setter(file);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-50 mb-6">
          <FiGrid className="w-8 h-8 text-teal-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Service Highlights</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Showcase your dance studio's services and class offerings to attract potential students.
        </p>
      </div>

      <div className="space-y-8">
        {/* Background Images Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <FiImage className="w-5 h-5 text-teal-600" />
            Background Images
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Services Background */}
            <div>
              <Label className="block text-sm font-medium text-gray-700 mb-2">
                Services Background <span className="text-red-500">*</span>
              </Label>
              <label
                htmlFor="servicesBgInput"
                className={`relative flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer 
                  ${servicesBg ? 'border-teal-200 hover:border-teal-300' : 'border-gray-200 hover:border-gray-300'}
                  transition-colors bg-gray-50 hover:bg-gray-100`}
              >
                <input
                  id="servicesBgInput"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange(setServicesBg)}
                  className="hidden"
                />
                
                {servicesBg ? (
                  <div className="text-center">
                    <p className="text-sm text-gray-600">{servicesBg.name}</p>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setServicesBg(null);
                      }}
                      className="mt-2 text-teal-600 hover:text-teal-700"
                    >
                      Change
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
                    <FiUpload className="w-8 h-8 text-teal-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Upload background</p>
                  </div>
                )}
              </label>
            </div>

            {/* Services Portrait */}
            <div>
              <Label className="block text-sm font-medium text-gray-700 mb-2">
                Services Portrait <span className="text-red-500">*</span>
              </Label>
              <label
                htmlFor="servicesPortraitInput"
                className={`relative flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer 
                  ${servicesPortrait ? 'border-teal-200 hover:border-teal-300' : 'border-gray-200 hover:border-gray-300'}
                  transition-colors bg-gray-50 hover:bg-gray-100`}
              >
                <input
                  id="servicesPortraitInput"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange(setServicesPortrait)}
                  className="hidden"
                />
                
                {servicesPortrait ? (
                  <div className="text-center">
                    <p className="text-sm text-gray-600">{servicesPortrait.name}</p>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setServicesPortrait(null);
                      }}
                      className="mt-2 text-teal-600 hover:text-teal-700"
                    >
                      Change
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
                    <FiUpload className="w-8 h-8 text-teal-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Upload portrait</p>
                  </div>
                )}
              </label>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <FiList className="w-5 h-5 text-teal-600" />
            Services
          </h2>

          <div className="space-y-6">
            {services.map((service, serviceIndex) => (
              <div 
                key={serviceIndex}
                className="p-4 border border-gray-100 rounded-lg bg-gray-50"
              >
                <div className="mb-4">
                  <Label className="block text-sm font-medium text-gray-700 mb-1">
                    Service {serviceIndex + 1} Title <span className="text-red-500">*</span>
                  </Label>
                  <TextInput
                    name="title"
                    value={service.title || ''}
                    onChange={(e) => handleServiceChange(serviceIndex, 'title', e.target.value)}
                    placeholder="Enter service title"
                  />
                </div>

                <div className="space-y-3">
                  {service.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="relative">
                      <TextInput
                        value={item}
                        onChange={(e) => handleItemChange(serviceIndex, itemIndex, e)}
                        placeholder="Enter service detail"
                      />
                      <button
                        onClick={() => handleRemoveItem(serviceIndex, itemIndex)}
                        className="absolute -right-2 -top-2 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <FiX className="w-5 h-5" />
                      </button>
                    </div>
                  ))}

                  {service.items.length < 5 && (
                    <button
                      onClick={() => handleAddItem(serviceIndex)}
                      className="w-full py-2 border-2 border-dashed border-teal-200 rounded-lg text-teal-600 hover:border-teal-600 hover:text-teal-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <FiPlus className="w-4 h-4" />
                      Add Service Detail
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dance Types Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <FiActivity className="w-5 h-5 text-teal-600" />
            Dance Types
          </h2>

          <div className="space-y-4" ref={danceTypesContainerRef}>
            {danceTypes.map((danceType, index) => (
              <div key={index} className="relative">
                <Label className="block text-sm font-medium text-gray-700 mb-1">
                  Dance Type {index + 1} <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <TextInput
                    value={danceType || ''}
                    onChange={(e) => handleDanceTypeChange(index, e.target.value)}
                    placeholder="Enter dance type"
                  />
                  {index >= 3 && (
                    <button
                      onClick={() => removeDanceType(index)}
                      className="absolute -right-2 -top-2 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <FiX className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            ))}

            {danceTypes.length < 5 && (
              <button
                onClick={addNewDanceType}
                className="w-full py-3 border-2 border-dashed border-teal-200 rounded-lg text-teal-600 hover:border-teal-600 hover:text-teal-700 transition-colors flex items-center justify-center gap-2"
              >
                <FiPlus className="w-5 h-5" />
                Add Dance Type
              </button>
            )}

            {danceTypes.length >= 5 && (
              <p className="text-center text-sm text-gray-500">
                Maximum number of dance types reached (5)
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;
