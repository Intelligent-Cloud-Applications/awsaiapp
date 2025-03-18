import React, { useState } from 'react';
import { TextInput, Label } from 'flowbite-react';
import { FiMessageSquare, FiImage, FiUpload, FiX, FiUser } from 'react-icons/fi';

function Testimonials({ testimonials, setTestimonials, TestimonialBg, setTestimonialBg }) {
  const [errors, setErrors] = useState({});

  const handleTestimonialChange = (index, field, value) => {
    const updatedTestimonials = [...testimonials];
    updatedTestimonials[index][field] = value;
    setTestimonials(updatedTestimonials);
    setErrors(prev => ({ ...prev, [`testimonial${index}_${field}`]: null }));
  };

  const handleImageChange = (index, event) => {
    const file = event.target.files[0];
    if (!file) return;

    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > 4) {
      setErrors(prev => ({ 
        ...prev, 
        [`testimonial${index}_image`]: "File size exceeds 4MB. Please choose a smaller file." 
      }));
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
      setErrors(prev => ({ ...prev, [`testimonial${index}_image`]: null }));
    };
  };

  const handleBgImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > 4) {
      setErrors(prev => ({ ...prev, testimonialBg: "File size exceeds 4MB. Please choose a smaller file." }));
      return;
    }

    setTestimonialBg(file);
    setErrors(prev => ({ ...prev, testimonialBg: null }));
  };

  const removeTestimonial = (index) => {
    const updatedTestimonials = [...testimonials];
    updatedTestimonials.splice(index, 1);
    setTestimonials(updatedTestimonials);
  };

  const shortenFileName = (fileName) => {
    if (!fileName) return '';
    return fileName.length > 15 ? `${fileName.substring(0, 12)}...` : fileName;
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

      <div className="space-y-8">
        {/* Background Image Upload */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-4 mb-6">
            <FiImage className="w-5 h-5 text-teal-600" />
            <h2 className="text-xl font-semibold text-gray-900">Background Image</h2>
          </div>

          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">
              Select Background Image <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleBgImageChange}
                className="hidden"
                id="TestimonialBgInput"
              />
              <label
                htmlFor="TestimonialBgInput"
                className={`flex items-center gap-2 px-4 py-2 border-2 border-dashed rounded-lg cursor-pointer hover:border-teal-500 transition-colors ${
                  errors.testimonialBg ? 'border-red-500' : 'border-gray-200'
                }`}
              >
                <FiUpload className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-600">
                  {TestimonialBg ? shortenFileName(TestimonialBg.name) : 'Choose Background Image'}
                </span>
              </label>
              {errors.testimonialBg && (
                <p className="mt-1 text-sm text-red-500">{errors.testimonialBg}</p>
              )}
            </div>
          </div>
        </div>

        {/* Testimonials */}
        {testimonials.map((testimonial, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <FiUser className="w-5 h-5 text-teal-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Testimonial {index + 1} <span className="text-red-500">*</span>
                </h2>
              </div>
              {index >= 3 && (
                <button
                  onClick={() => removeTestimonial(index)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                  title="Remove Testimonial"
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
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(index, e)}
                    className="hidden"
                    id={`testimonialImgInput${index}`}
                  />
                  <label
                    htmlFor={`testimonialImgInput${index}`}
                    className={`flex items-center gap-2 px-4 py-2 border-2 border-dashed rounded-lg cursor-pointer hover:border-teal-500 transition-colors ${
                      errors[`testimonial${index}_image`] ? 'border-red-500' : 'border-gray-200'
                    }`}
                  >
                    <FiUpload className="w-5 h-5 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {testimonial.uploadedFile ? shortenFileName(testimonial.uploadedFile) : 'Choose Image'}
                    </span>
                  </label>
                  {errors[`testimonial${index}_image`] && (
                    <p className="mt-1 text-sm text-red-500">{errors[`testimonial${index}_image`]}</p>
                  )}
                </div>
              </div>

              {/* Name Input */}
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-1">
                  Name <span className="text-red-500">*</span>
                </Label>
                <TextInput
                  type="text"
                  value={testimonial.name}
                  onChange={(e) => handleTestimonialChange(index, 'name', e.target.value)}
                  placeholder="Enter name"
                  className="w-full bg-gray-50"
                  maxLength="20"
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
                  placeholder="Enter feedback"
                  className="w-full bg-gray-50"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Testimonials;