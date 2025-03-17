import React, { useState, useRef, useContext } from 'react';
import { Label, TextInput } from 'flowbite-react';
import { FiUsers, FiUpload, FiX, FiPlus, FiMail, FiBriefcase } from 'react-icons/fi';
import Context from '../../../context/Context';
import { API } from "aws-amplify";

function Instructors({ instructors, setInstructors }) {
  const { instructordetails, util } = useContext(Context);
  const [activeInstructorIndex, setActiveInstructorIndex] = useState(null);
  const instructorsContainerRef = useRef(null);

  const handleInstructorChange = (index, field, value) => {
    const updatedInstructors = [...instructors];
    updatedInstructors[index][field] = value;
    setInstructors(updatedInstructors);
  };

  const handleImageChange = (index, event) => {
    const file = event.target.files[0];
    if (!file) return;

      const fileSizeMB = file.size / (1024 * 1024);
      if (fileSizeMB > 4) {
        alert("File size exceeds 4MB. Please choose a smaller file.");
        return;
    }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const updatedInstructors = [...instructors];
        updatedInstructors[index].imgSrc = reader.result;
        updatedInstructors[index].uploadedFile = file.name;
        updatedInstructors[index].actualFile = file;
        setInstructors(updatedInstructors);
      };
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
    if (instructors.length < 8) { // Limit to 8 instructors
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
          Showcase your talented dance instructors and their expertise to build trust with potential students.
        </p>
        <p className="text-sm text-red-500 mt-2">
          Note: The instructor page preview is an example layout and may differ from the final appearance.
        </p>
      </div>

      <div className="space-y-6" ref={instructorsContainerRef}>
          {instructors.map((instructor, index) => (
          <div 
            key={index}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 relative"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Instructor {index + 1}</h2>
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

            <div className="space-y-6">
              {/* Image Upload */}
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Photo <span className="text-red-500">*</span>
                </Label>
                <label
                  htmlFor={`instructorImgInput${index}`}
                  className={`relative flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer 
                    ${instructor.imgSrc ? 'border-teal-200 hover:border-teal-300' : 'border-gray-200 hover:border-gray-300'}
                    transition-colors bg-gray-50 hover:bg-gray-100`}
                >
                <input
                    type="file"
                    id={`instructorImgInput${index}`}
                    accept="image/*"
                    onChange={(e) => handleImageChange(index, e)}
                    className="hidden"
                  />
                  
                  {instructor.imgSrc ? (
                    <div className="relative w-full h-full">
                      <img
                        src={instructor.imgSrc}
                        alt={`Instructor ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                        <p className="text-white font-medium">Change photo</p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <FiUpload className="w-8 h-8 text-teal-600 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">Upload photo</p>
                    </div>
                  )}
                </label>
              </div>

              {/* Instructor Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <Label htmlFor={`name-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                    Name <span className="text-red-500">*</span>
                  </Label>
                  <TextInput
                    id={`name-${index}`}
                    value={instructor.name}
                    onChange={(e) => handleInstructorChange(index, 'name', e.target.value)}
                    placeholder="Enter instructor name"
                    icon={FiUsers}
                  />
                </div>

                {/* Email */}
                <div>
                  <Label htmlFor={`email-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </Label>
                  <TextInput
                    id={`email-${index}`}
    value={instructor.emailId}
    onChange={(e) => handleInstructorChange(index, 'emailId', e.target.value)}
                    placeholder="Enter email address"
                    icon={FiMail}
  />
                </div>

                {/* Position */}
                <div className="md:col-span-2">
                  <Label htmlFor={`position-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                    Position <span className="text-red-500">*</span>
                  </Label>
                  <TextInput
                    id={`position-${index}`}
    value={instructor.position}
    onChange={(e) => handleInstructorChange(index, 'position', e.target.value)}
                    placeholder="Enter instructor position"
                    icon={FiBriefcase}
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