import { FileInput, TextInput } from 'flowbite-react';
import React, { useState, useRef, useEffect } from 'react';

function Testimonials({ testimonials, setTestimonials }) {
  const testimonialsContainerRef = useRef(null);
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(null);

  const handleTestimonialChange = (index, field, value) => {
    const updatedTestimonials = [...testimonials];
    updatedTestimonials[index][field] = value;
    setTestimonials(updatedTestimonials);
  };

  const handleImageChange = (index, event) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileSizeMB = file.size / (1024 * 1024);
      if (fileSizeMB > 4) {
        alert("File size exceeds 4MB. Please choose a smaller file.");
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
      };
      reader.readAsDataURL(file);
    }
  };

  const shortenFileName = (fileName) => {
    const maxLength = 10;
    return fileName?.length > maxLength ? `${fileName.slice(0, maxLength - 3)}...` : fileName || '';
  };

  const addNewTestimonial = () => {
    if (testimonials.length < 5) {
      setTestimonials([
        ...testimonials,
        { imgSrc: '', name: '', feedback: '', uploadedFile: null },
      ]);
    }
  };

  const removeTestimonial = (index) => {
    setTestimonials(testimonials.filter((_, idx) => idx !== index));
  };

  useEffect(() => {
    if (testimonials.length > 0) {
      testimonialsContainerRef.current.scrollTo({
        top: testimonialsContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [testimonials, activeTestimonialIndex]);

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="font-medium text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-3">
          TESTIMONIALS SECTION
        </h1>
        <p className="text-[#939393] text-sm sm:text-base px-4">
          Showcase real customer feedback to build trust and credibility with authentic positive experiences.
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div ref={testimonialsContainerRef} className="space-y-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white shadow-sm rounded-lg p-4 sm:p-6">
              <h2 className="font-medium text-lg sm:text-xl mb-4">
                Testimonial {index + 1}
                {index >= 3 && (
                  <button
                    onClick={() => removeTestimonial(index)}
                    className="ml-2 text-red-500 hover:text-red-700"
                    aria-label="Remove testimonial"
                  >
                    ×
                  </button>
                )}
              </h2>

              <div className="space-y-4">
                <div className="relative">
                  <FileInput
                    accept="image/*"
                    onChange={(e) => handleImageChange(index, e)}
                    className="hidden"
                    id={`testimonialImgInput${index}`}
                  />
                  <label
                    htmlFor={`testimonialImgInput${index}`}
                    onClick={() => setActiveTestimonialIndex(index)}
                    className="block w-full p-2.5 text-sm border border-gray-300 rounded-lg cursor-pointer hover:border-[#30AFBC] transition-colors"
                  >
                    {!testimonial.uploadedFile ? (
                      <span className="text-gray-500">Choose profile image</span>
                    ) : (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">{shortenFileName(testimonial.uploadedFile)}</span>
                        <span className="text-[#30AFBC] hover:text-[#2a9ca8]">Change</span>
                      </div>
                    )}
                  </label>
                </div>

                <div>
                  <TextInput
                    name="name"
                    value={testimonial.name}
                    onChange={(e) => handleTestimonialChange(index, 'name', e.target.value)}
                    placeholder="Enter reviewer's name"
                    className="w-full"
                    maxLength="20"
                  />
                </div>

                <div>
                  <TextInput
                    name="feedback"
                    value={testimonial.feedback}
                    onChange={(e) => handleTestimonialChange(index, 'feedback', e.target.value)}
                    placeholder="Enter reviewer's feedback"
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {testimonials.length < 5 && (
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={addNewTestimonial}
              className="bg-[#30AFBC] text-white px-4 py-2 rounded-md hover:bg-[#2a9ca8] transition-colors"
            >
              Add Testimonial
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Testimonials;
