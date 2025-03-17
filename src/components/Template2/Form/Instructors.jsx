import React, { useState, useRef, useContext } from 'react';
import { Label, TextInput } from 'flowbite-react';
import { FiUsers, FiUpload, FiX, FiPlus, FiUser } from 'react-icons/fi';
import Context from '../../../context/Context';
import { API } from "aws-amplify";

function Instructors({ instructors, setInstructors }) {
  const { instructordetails, util } = useContext(Context);
  const [activeInstructorIndex, setActiveInstructorIndex] = useState(null);
  const [errors, setErrors] = useState({});
  const instructorsContainerRef = useRef(null);

  const handleInstructorChange = (index, field, value) => {
    const updatedInstructors = [...instructors];
    updatedInstructors[index][field] = value;
    setInstructors(updatedInstructors);
    
    // Clear error for this field
    if (errors[`${index}-${field}`]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[`${index}-${field}`];
        return newErrors;
      });
    }
  };

  const validateFile = (file) => {
    if (!file) return "Please select an image";
    
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > 4) {
      return "File size exceeds 4MB limit";
    }
    
    if (!file.type.startsWith('image/')) {
      return "Please upload an image file";
    }
    
    return null;
  };

  const handleImageChange = async (index, event) => {
    const file = event.target.files[0];
    if (!file) return;

    const error = validateFile(file);
    if (error) {
      setErrors(prev => ({
        ...prev,
        [`${index}-image`]: error
      }));
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const updatedInstructors = [...instructors];
      updatedInstructors[index].imgSrc = reader.result;
      updatedInstructors[index].uploadedFile = file.name;
      updatedInstructors[index].actualFile = file;
      setInstructors(updatedInstructors);
      
      // Clear error if exists
      if (errors[`${index}-image`]) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[`${index}-image`];
          return newErrors;
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const removeInstructor = async (indexToRemove) => {
    const instructor = instructors[indexToRemove];
    if (instructor.instructorId) {
      util.setLoader(true);
      try {
        await API.del("clients", `/user/development-form/delete-instructor/${instructor.institution}`, {
          body: {
            instructorId: instructor.instructorId,
          }
        });
      } catch (e) {
        console.error(e);
      } finally {
        util.setLoader(false);
      }
    }
    const updatedInstructors = instructors.filter((_, index) => index !== indexToRemove);
    setInstructors(updatedInstructors);
  };

  const addNewInstructor = () => {
    if (instructors.length < 8) {
      setInstructors([
        ...instructors,
        { imgSrc: '', name: '', uploadedFile: null, emailId: '', position: '' }
      ]);
      setTimeout(() => {
        instructorsContainerRef.current?.lastElementChild?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-50 mb-6">
          <FiUsers className="w-8 h-8 text-teal-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Instructors</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Introduce your expert team members, highlighting their expertise and the value they bring.
        </p>
      </div>

      <div className="space-y-6" ref={instructorsContainerRef}>
        {instructors.map((instructor, index) => (
          <div 
            key={index}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 relative"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <FiUser className="w-5 h-5 text-teal-600" />
                Instructor {index + 1}
              </h2>
              {index >= 4 && (
                <button
                  onClick={() => removeInstructor(index)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                  title="Remove instructor"
                >
                  <FiX className="w-5 h-5" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Image Upload */}
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Image <span className="text-red-500">*</span>
                </Label>
                <div className={`relative border-2 border-dashed rounded-lg transition-all duration-300 
                  ${errors[`${index}-image`] ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-gray-50 hover:border-teal-500'}`}
                >
                  <label className="flex flex-col items-center justify-center w-full h-40 cursor-pointer">
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => handleImageChange(index, e)}
                      accept="image/*"
                    />
                    
                    {instructor.imgSrc ? (
                      <div className="relative w-full h-full">
                        <img
                          src={instructor.imgSrc}
                          alt={`Instructor ${index + 1}`}
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                          <p className="text-white font-medium">Change image</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <FiUpload className="w-8 h-8 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500">Click to upload image</p>
                        <p className="text-xs text-gray-400 mt-1">Maximum size: 4MB</p>
                      </div>
                    )}
                  </label>
                </div>
                {errors[`${index}-image`] && (
                  <p className="mt-2 text-sm text-red-600">{errors[`${index}-image`]}</p>
                )}
              </div>

              {/* Instructor Details */}
              <div className="space-y-4">
                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </Label>
                  <TextInput
                    value={instructor.name}
                    onChange={(e) => handleInstructorChange(index, 'name', e.target.value)}
                    placeholder="Enter instructor's name"
                    className="w-full bg-gray-50 border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 rounded-lg"
                  />
                </div>

                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </Label>
                  <TextInput
                    value={instructor.emailId}
                    onChange={(e) => handleInstructorChange(index, 'emailId', e.target.value)}
                    placeholder="Enter email address"
                    type="email"
                    className="w-full bg-gray-50 border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 rounded-lg"
                  />
                </div>

                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-1">
                    Position <span className="text-red-500">*</span>
                  </Label>
                  <TextInput
                    value={instructor.position}
                    onChange={(e) => handleInstructorChange(index, 'position', e.target.value)}
                    placeholder="Enter instructor's position"
                    className="w-full bg-gray-50 border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Add Instructor Button */}
        {instructors.length < 8 && (
          <button
            onClick={addNewInstructor}
            className="w-full py-4 border-2 border-dashed border-teal-200 rounded-xl text-teal-600 hover:border-teal-600 hover:text-teal-700 transition-colors flex items-center justify-center gap-2 bg-white"
          >
            <FiPlus className="w-5 h-5" />
            Add New Instructor
          </button>
        )}

        {/* Maximum Instructors Notice */}
        {instructors.length >= 8 && (
          <p className="text-center text-sm text-gray-500 mt-4">
            Maximum number of instructors reached (8)
          </p>
        )}
      </div>
    </div>
  );
}

export default Instructors;