import React, { useState, useRef } from 'react';
import { Label, TextInput, Textarea } from 'flowbite-react';
import { FiMessageSquare, FiUpload, FiX, FiUser } from 'react-icons/fi';

function Testimonials({ testimonials, setTestimonials, TestimonialBg, setTestimonialBg }) {
  // const [testimonials, setTestimonials] = useState([
  //   { imgSrc: '', name: '', feedback: '', uploadedFile: null },
  //   { imgSrc: '', name: '', feedback: '', uploadedFile: null },
  //   { imgSrc: '', name: '', feedback: '', uploadedFile: null },
  // ]);

  const testimonialsContainerRef = useRef(null);

  const handleTestimonialChange = (index, field, value) => {
    const updatedTestimonials = [...testimonials];
    updatedTestimonials[index][field] = value;
    setTestimonials(updatedTestimonials);
  };

  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(null);

  const toggleActiveTestimonial = (index) => {
    setActiveTestimonialIndex(index === activeTestimonialIndex ? null : index);
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
      const updatedTestimonials = [...testimonials];
      updatedTestimonials[index].imgSrc = reader.result;
      updatedTestimonials[index].uploadedFile = file.name;
      updatedTestimonials[index].actualFile = file;
      setTestimonials(updatedTestimonials);
    };
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

  // const addNewTestimonial = () => {
  //   if (testimonials.length < 3) {
  //     setTestimonials([
  //       ...testimonials,
  //       { imgSrc: '', name: '', feedback: '', uploadedFile: null },
  //     ]);
  //   }
  //   // Scroll to the newly added testimonial
  //   testimonialsContainerRef.current.scrollTo({
  //     top: testimonialsContainerRef.current.scrollHeight,
  //     behavior: 'smooth',
  //   });
  // };
  const removeTestimonial = (index) => {
    const updatedTestimonials = [...testimonials];
    updatedTestimonials.splice(index, 1);
    setTestimonials(updatedTestimonials);
  };
  const handleBgImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > 4) {
      alert("File size exceeds 4MB. Please choose a smaller file.");
      return;
    }
    setTestimonialBg(file);
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
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-50 mb-6">
          <FiMessageSquare className="w-8 h-8 text-teal-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Testimonials</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Share authentic student experiences to build trust and showcase your dance studio's impact.
        </p>
      </div>

      <div className="space-y-8">
        {/* Background Image Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <FiUpload className="w-5 h-5 text-teal-600" />
            Background Image
          </h2>

          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">
              Testimonials Background <span className="text-red-500">*</span>
            </Label>
            <label
              htmlFor="TestimonialBgInput"
              className={`relative flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer 
                ${TestimonialBg ? 'border-teal-200 hover:border-teal-300' : 'border-gray-200 hover:border-gray-300'}
                transition-colors bg-gray-50 hover:bg-gray-100`}
            >
              <input
                id="TestimonialBgInput"
                type="file"
                accept="image/*"
                onChange={handleBgImageChange}
                className="hidden"
              />
              
              {TestimonialBg ? (
                <div className="text-center">
                  <p className="text-sm text-gray-600">{TestimonialBg.name}</p>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setTestimonialBg(null);
                    }}
                    className="mt-2 text-teal-600 hover:text-teal-700"
                  >
                    Change
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <FiUpload className="w-8 h-8 text-teal-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">Upload background image</p>
                </div>
              )}
            </label>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="space-y-6" ref={testimonialsContainerRef}>
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Testimonial {index + 1}
                </h2>
                {index >= 3 && (
                  <button
                    onClick={() => removeTestimonial(index)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                    title="Remove testimonial"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                )}
              </div>

              <div className="space-y-6">
                {/* Profile Image */}
                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-2">
                    Profile Photo <span className="text-red-500">*</span>
                  </Label>
                  <label
                    htmlFor={`testimonialImgInput${index}`}
                    className={`relative flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer 
                      ${testimonial.imgSrc ? 'border-teal-200 hover:border-teal-300' : 'border-gray-200 hover:border-gray-300'}
                      transition-colors bg-gray-50 hover:bg-gray-100`}
                  >
                    <input
                      id={`testimonialImgInput${index}`}
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(index, e)}
                      className="hidden"
                    />
                    
                    {testimonial.imgSrc ? (
                      <div className="relative w-full h-full">
                        <img
                          src={testimonial.imgSrc}
                          alt={`Testimonial ${index + 1}`}
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                          <p className="text-white font-medium">Change photo</p>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center">
                        <FiUser className="w-8 h-8 text-teal-600 mx-auto mb-2" />
                        <p className="text-sm text-gray-500">Upload photo</p>
                      </div>
                    )}
                  </label>
                </div>

                {/* Name */}
                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-1">
                    Name <span className="text-red-500">*</span>
                  </Label>
                  <TextInput
                    value={testimonial.name}
                    onChange={(e) => handleTestimonialChange(index, 'name', e.target.value)}
                    placeholder="Enter client name"
                    maxLength={20}
                  />
                </div>

                {/* Feedback */}
                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-1">
                    Feedback <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    value={testimonial.feedback}
                    onChange={(e) => handleTestimonialChange(index, 'feedback', e.target.value)}
                    placeholder="Enter client feedback"
                    rows={3}
                  />
                </div>
              </div>
            </div>
          ))}

          {testimonials.length >= 5 && (
            <p className="text-center text-sm text-gray-500">
              Maximum number of testimonials reached (5)
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Testimonials;