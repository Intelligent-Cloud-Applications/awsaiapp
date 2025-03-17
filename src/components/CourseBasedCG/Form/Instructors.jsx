import React, { useState, useRef, useContext } from 'react';
import { TextInput, Label } from 'flowbite-react';
import { FiUsers, FiUpload, FiX, FiUser, FiMail, FiBriefcase, FiPlusCircle } from 'react-icons/fi';
import Context from '../../../context/Context';
import { API } from "aws-amplify";

function Instructors({ instructors, setInstructors }) {
  const { instructordetails, util } = useContext(Context);
  const instructorsContainerRef = useRef(null);
  const [activeInstructorIndex, setActiveInstructorIndex] = useState(null);
  const [errors, setErrors] = useState({});

  const handleInstructorChange = (index, field, value) => {
    const updatedInstructors = [...instructors];
    updatedInstructors[index][field] = value;
    setInstructors(updatedInstructors);
    setErrors(prev => ({ ...prev, [field + index]: null }));
  };

  const handleImageChange = (index, event) => {
    const file = event.target.files[0];
    if (!file) return;

    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > 4) {
      setErrors(prev => ({ ...prev, [`image${index}`]: "File size exceeds 4MB. Please choose a smaller file." }));
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
      setErrors(prev => ({ ...prev, [`image${index}`]: null }));
    };
  };

  const shortenFileName = (fileName) => {
    if (!fileName) return '';
    return fileName.length > 15 ? fileName.substring(0, 12) + '...' : fileName;
  };

  const removeInstructor = async (indexToRemove) => {
    const instructor = instructors[indexToRemove];
    if (instructor.instructorId) {
      util.setLoader(true);
      try {
        await API.del("clients", `/user/development-form/delete-instructor/${instructor.institution}`, {
          body: { instructorId: instructor.instructorId }
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
    if (instructors.length) {
      setInstructors([
        ...instructors,
        { imgSrc: '', name: '', uploadedFile: null, emailId: '', position: '' }
      ]);
      setTimeout(() => {
        instructorsContainerRef.current?.scrollTo({
          top: instructorsContainerRef.current.scrollHeight,
          behavior: 'smooth'
        });
      }, 100);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-50 mb-6">
          <FiUsers className="w-8 h-8 text-teal-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Instructors Section</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Introduce expert team members, emphasizing expertise and value they bring to your organization.
        </p>
        <p className="text-sm text-red-500 mt-2">
          ** The Instructor page shown is just an example of how your given data will look like for the Instructors page. It will not change on giving your input. **
        </p>
      </div>

      <div className="space-y-6" ref={instructorsContainerRef}>
        {instructors.map((instructor, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 relative">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <FiUser className="w-5 h-5 text-teal-600" />
                Instructor {index + 1}
              </h2>
              {index >= 4 && (
                <button
                  onClick={() => removeInstructor(index)}
                  className="text-red-500 hover:text-red-600 transition-colors"
                  title="Remove Instructor"
                >
                  <FiX className="w-5 h-5" />
                </button>
              )}
            </div>

            <div className="space-y-4">
              {/* Image Upload */}
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Image <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(index, e)}
                    className="hidden"
                    id={`instructorImgInput${index}`}
                  />
                  <label
                    htmlFor={`instructorImgInput${index}`}
                    className={`flex items-center gap-2 px-4 py-2 border-2 border-dashed rounded-lg cursor-pointer hover:border-teal-500 transition-colors ${
                      errors[`image${index}`] ? 'border-red-500' : 'border-gray-200'
                    }`}
                  >
                    <FiUpload className="w-5 h-5 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {instructor.uploadedFile ? shortenFileName(instructor.uploadedFile) : 'Choose Image'}
                    </span>
                  </label>
                  {errors[`image${index}`] && (
                    <p className="mt-1 text-sm text-red-500">{errors[`image${index}`]}</p>
                  )}
                </div>
              </div>

              {/* Name Input */}
              <div>
                <Label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                  <FiUser className="w-4 h-4" />
                  Name <span className="text-red-500">*</span>
                </Label>
                <TextInput
                  type="text"
                  value={instructor.name}
                  onChange={(e) => handleInstructorChange(index, 'name', e.target.value)}
                  placeholder="Enter instructor name"
                  className="w-full bg-gray-50"
                />
              </div>

              {/* Email Input */}
              <div>
                <Label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                  <FiMail className="w-4 h-4" />
                  Email <span className="text-red-500">*</span>
                </Label>
                <TextInput
                  type="email"
                  value={instructor.emailId}
                  onChange={(e) => handleInstructorChange(index, 'emailId', e.target.value)}
                  placeholder="Enter instructor email"
                  className="w-full bg-gray-50"
                />
              </div>

              {/* Position Input */}
              <div>
                <Label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                  <FiBriefcase className="w-4 h-4" />
                  Position <span className="text-red-500">*</span>
                </Label>
                <TextInput
                  type="text"
                  value={instructor.position}
                  onChange={(e) => handleInstructorChange(index, 'position', e.target.value)}
                  placeholder="Enter instructor position"
                  className="w-full bg-gray-50"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={addNewInstructor}
          className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
        >
          <FiPlusCircle className="w-5 h-5" />
          Add Instructor
        </button>
      </div>
    </div>
  );
}

export default Instructors;