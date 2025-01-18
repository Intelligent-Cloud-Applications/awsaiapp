import React from 'react';
import { Label, TextInput, FileInput } from 'flowbite-react';
import { FiUser, FiMessageSquare, FiImage, FiTrash2 } from 'react-icons/fi';

function Testimonials({ testimonials, setTestimonials }) {
  const handleTestimonialChange = (index, field, value) => {
    const updatedTestimonials = [...testimonials];
    updatedTestimonials[index] = {
      ...updatedTestimonials[index],
      [field]: value
    };
    setTestimonials(updatedTestimonials);
  };

  const handleFileChange = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const fileSizeMB = file.size / (1024 * 1024);
      if (fileSizeMB > 4) {
        alert("File size exceeds 4MB. Please choose a smaller file.");
        return;
      }

      const validTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (file instanceof File && validTypes.includes(file.type)) {
        const updatedTestimonials = [...testimonials];
        updatedTestimonials[index] = {
          ...updatedTestimonials[index],
          actualFile: file,
          imgSrc: URL.createObjectURL(file),
          type: file.type
        };
        setTestimonials(updatedTestimonials);
      } else {
        alert("Invalid file type. Please select a JPG, JPEG, or PNG file.");
      }
    }
  };

  const resetTestimonial = (index) => {
    const updatedTestimonials = [...testimonials];
    updatedTestimonials[index] = {
      imgSrc: '',
      name: '',
      feedback: '',
      uploadedFile: null,
      type: ''
    };
    setTestimonials(updatedTestimonials);
  };

  return (
    <div className="w-full min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="font-medium text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 text-gray-900">
            Customer Testimonials
          </h1>
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
            Share what your customers say about your services to build trust and credibility.
          </p>
        </div>

        {/* Main Form Section */}
        <div className="space-y-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white shadow-sm rounded-lg p-6 md:p-8 relative"
            >
              {/* Testimonial Number */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-cyan-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Testimonial {index + 1}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Name Input */}
                  <div className="space-y-2">
                    <Label 
                      htmlFor={`name-${index}`}
                      className="text-sm font-medium text-gray-700 flex items-center gap-2"
                    >
                      <FiUser className="w-4 h-4 text-gray-500" />
                      Customer Name
                      <span className="text-red-500">*</span>
                    </Label>
                    <TextInput
                      id={`name-${index}`}
                      value={testimonial.name}
                      onChange={(e) => handleTestimonialChange(index, 'name', e.target.value)}
                      placeholder="Enter customer name"
                      required
                    />
                  </div>

                  {/* Feedback Input */}
                  <div className="space-y-2">
                    <Label 
                      htmlFor={`feedback-${index}`}
                      className="text-sm font-medium text-gray-700 flex items-center gap-2"
                    >
                      <FiMessageSquare className="w-4 h-4 text-gray-500" />
                      Feedback
                      <span className="text-red-500">*</span>
                    </Label>
                    <textarea
                      id={`feedback-${index}`}
                      value={testimonial.feedback}
                      onChange={(e) => handleTestimonialChange(index, 'feedback', e.target.value)}
                      placeholder="Enter customer feedback"
                      rows={4}
                      className="w-full rounded-lg border-gray-300 focus:border-cyan-500 focus:ring-cyan-500/20"
                      required
                    />
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  {/* Image Upload */}
                  <div className="space-y-2">
                    <Label 
                      htmlFor={`image-${index}`}
                      className="text-sm font-medium text-gray-700 flex items-center gap-2"
                    >
                      <FiImage className="w-4 h-4 text-gray-500" />
                      Customer Photo
                      <span className="text-red-500">*</span>
                    </Label>
                    <FileInput
                      id={`image-${index}`}
                      onChange={(e) => handleFileChange(index, e)}
                      accept=".jpg,.jpeg,.png"
                      helperText="Upload customer photo (Max: 4MB, Formats: JPG, JPEG, PNG)"
                    />
                  </div>

                  {/* Image Preview */}
                  {testimonial.imgSrc && (
                    <div className="relative">
                      <img
                        src={testimonial.imgSrc}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <button
                        onClick={() => resetTestimonial(index)}
                        className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                        title="Remove image"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Testimonials;
