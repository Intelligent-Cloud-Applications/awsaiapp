import React, { useState, useRef } from 'react';

function Instructors({ instructors, setInstructors}) {
  // const [instructors, setInstructors] = useState([
  //   { imgSrc: '', name: '', uploadedFile: null },
  //   { imgSrc: '', name: '', uploadedFile: null },
  //   { imgSrc: '', name: '', uploadedFile: null },
  //   { imgSrc: '', name: '', uploadedFile: null },
  // ]);
  

  const instructorsContainerRef = useRef(null);

  const handleInstructorChange = (index, field, value) => {
    const updatedInstructors = [...instructors];
    updatedInstructors[index][field] = value;
    setInstructors(updatedInstructors);
  };

  const [activeInstructorIndex, setActiveInstructorIndex] = useState(null);

  const toggleActiveInstructor = (index) => {
    setActiveInstructorIndex(index === activeInstructorIndex ? null : index);
  };

  const handleImageChange = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const updatedInstructors = [...instructors];
        updatedInstructors[index].imgSrc = reader.result;
        updatedInstructors[index].uploadedFile = file.name;
        setInstructors(updatedInstructors);
      };
    }
  };

  const shortenFileName = (fileName) => {
    const maxLength = 10;
    if (!fileName) {
      return '';
    }
    if (fileName.length > maxLength) {
      return fileName.substring(0, maxLength - 3) + '...';
    }
    return fileName;
  };
const removeInstructor = (indexToRemove) => {
  const updatedInstructors = instructors.filter((_, index) => index !== indexToRemove);
  setInstructors(updatedInstructors);
};
  const addNewInstructor = () => {
    setInstructors([
      ...instructors,
      { imgSrc: '', name: '', uploadedFile: null },
    ]);
    // Scroll to the newly added instructor
    instructorsContainerRef.current.scrollTo({
      top: instructorsContainerRef.current.scrollHeight,
      behavior: 'smooth',
    });
  };

  return (
    <div className="mx-auto max-w-[800px] px-8">
      <h1 className="font-medium text-7xl">INSTRUCTORS SECTION</h1>
      <h5 className="w-[28rem] max950:w-[17rem] text-[#939393]">
      Introduce expert team members, emphasizing expertise and value they bring to your organization.
      </h5>
<div className="max-h-[480px] overflow-y-auto">
        <div ref={instructorsContainerRef} className="pb-6">
          {instructors.map((instructor, index) => (
            <div key={index} className="mt-2">
              <h2 className="font-medium text-[1.1rem]">INSTRUCTOR {index + 1}</h2>
              
              <div className="relative flex items-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(index, e)}
                  className="hidden"
                  id={`instructorImgInput${index}`}
                />
                <label
                  htmlFor={`instructorImgInput${index}`}
                  onClick={() => toggleActiveInstructor(index)}
                  className="w-[150px] h-[25px] border border-[#3f3e3e] flex items-center justify-center cursor-pointer relative"
                  style={{
                    borderColor: 'cement',
                    borderWidth: '2px',
                    borderStyle: 'solid',
                    backgroundColor: '#D9D9D9',
                  }}
                >
                  <span
                    className={`block text-[#000000] font-inter text-[14px] ${
                      instructor.uploadedFile ? 'hidden' : 'block'
                    }`}
                  >
                    Choose File
                  </span>
                  
                  <div
                    className={`absolute top-0 left-0 right-0 bottom-0 flex items-center justify-between px-2 truncate ${
                      instructor.uploadedFile ? 'block' : 'hidden'
                    }`}
                  >
                    <span className="text-[#636262]">
                      {shortenFileName(instructor.uploadedFile)}
                    </span>
                    <span
                      onClick={() =>
                        handleImageChange(index, { target: { files: [null] } })
                      }
                      className="text-[#3b9d33] cursor-pointer"
                    >
                      Change
                    </span>
                    
                  </div>

                </label>
                {/* Rest of your image upload structure */}
                {index >= 4 && (
                <button
                  onClick={() => removeInstructor(index)}
                  className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white px-1 rounded-full text-sm mr-[12px] "
                >
                  <span>✕</span>
                </button>
              )}
              </div>
              <div className="relative mt-2">
                {/* Name input */}
                
                <input
    type="text"
    name="name"
    value={instructor.name}
    onChange={(e) => handleInstructorChange(index, 'name', e.target.value)}
    placeholder="Name"
    className="w-full max-w-[28rem] text-black border-none outline-none bg-transparent"
    onFocus={() => toggleActiveInstructor(index)}
    onBlur={() => toggleActiveInstructor(null)}
  />
                {/* Name line container */}
                <div
    className={`absolute left-0 right-0 bottom-0 h-[0.5px] ${
      activeInstructorIndex === index ? 'bg-black' : 'bg-[#939393]'
    }`}
  ></div>
              </div>
            </div>
          ))}
        </div>
        {/* Add button after the third instructor */}
        {instructors.length >= 3 && (
          <div className="mt-2 flex justify-center ">
            <button
              onClick={addNewInstructor}
              className="bg-[#30AFBC] text-white px-4 py-2 rounded-md"
            >
              Add Instructor
            </button>
          </div>
        )}
      </div>      
    </div>
  );
}

export default Instructors;
