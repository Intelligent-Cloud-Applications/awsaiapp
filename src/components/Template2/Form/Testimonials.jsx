import React, { useState, useRef, useEffect } from 'react';
import { Label, TextInput, FileInput } from 'flowbite-react';
import { FiMessageSquare, FiUpload, FiX, FiPlus, FiUser } from 'react-icons/fi';

function Testimonials({ testimonials, setTestimonials }) {
  const testimonialsContainerRef = useRef(null);
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(null);
  const [errors, setErrors] = useState({});

  const handleTestimonialChange = (index, field, value) => {
    const updatedTestimonials = [...testimonials];
    updatedTestimonials[index][field] = value;
    setTestimonials(updatedTestimonials);

    // Clear error for this field if exists
    if (errors[`${index}-${field}`]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[`${index}-${field}`];
        return newErrors;
      });
    }
  };

  const handleImageChange = (index, event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > 4) {
      setErrors(prev => ({
        ...prev,
        [`${index}-image`]: "File size exceeds 4MB limit"
      }));
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const updatedTestimonials = [...testimonials];
      updatedTestimonials[index] = {
        ...updatedTestimonials[index],
        imgSrc: reader.result,
        uploadedFile: file.name,
        actualFile: file,
      };
      setTestimonials(updatedTestimonials);

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

  const addNewTestimonial = () => {
    if (testimonials.length < 5) {
      setTestimonials([
        ...testimonials,
        { imgSrc: '', name: '', feedback: '', uploadedFile: null },
      ]);
      setTimeout(() => {
        testimonialsContainerRef.current?.lastElementChild?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const removeTestimonial = (index) => {
    setTestimonials(testimonials.filter((_, idx) => idx !== index));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-50 mb-6">
          <FiMessageSquare className="w-8 h-8 text-teal-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Testimonials</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Showcase real customer feedback to build trust and credibility with authentic positive experiences.
        </p>
      </div>

      <div className="space-y-8" ref={testimonialsContainerRef}>
        {testimonials.map((testimonial, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <FiUser className="w-5 h-5 text-teal-600" />
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
                    
                    {testimonial.imgSrc ? (
                      <div className="relative w-full h-full">
                        <img
                          src={testimonial.imgSrc}
                          alt={`Testimonial ${index + 1}`}
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

              {/* Name Input */}
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <TextInput
                  value={testimonial.name}
                  onChange={(e) => handleTestimonialChange(index, 'name', e.target.value)}
                  placeholder="Enter customer's name"
                  maxLength={20}
                  className="w-full bg-gray-50 border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 rounded-lg"
                />
              </div>

              {/* Feedback Input */}
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-1">
                  Feedback <span className="text-red-500">*</span>
                </Label>
                <TextInput
                  value={testimonial.feedback}
                  onChange={(e) => handleTestimonialChange(index, 'feedback', e.target.value)}
                  placeholder="Enter customer's feedback"
                  className="w-full bg-gray-50 border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 rounded-lg"
                />
              </div>
            </div>
          </div>
        ))}

        {/* Add Testimonial Button */}
        {testimonials.length < 5 && (
          <button
            onClick={addNewTestimonial}
            className="w-full py-4 border-2 border-dashed border-teal-200 rounded-xl text-teal-600 hover:border-teal-600 hover:text-teal-700 transition-colors flex items-center justify-center gap-2 bg-white"
          >
            <FiPlus className="w-5 h-5" />
            Add New Testimonial
          </button>
        )}

        {/* Maximum Testimonials Notice */}
        {testimonials.length >= 5 && (
          <p className="text-center text-sm text-gray-500 mt-4">
            Maximum number of testimonials reached (5)
          </p>
        )}
      </div>
    </div>
  );
}

export default Testimonials;