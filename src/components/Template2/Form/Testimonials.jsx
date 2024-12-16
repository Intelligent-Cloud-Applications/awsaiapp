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
    console.log("number of testimonials",activeTestimonialIndex);
    if (testimonials.length > 0) {
      testimonialsContainerRef.current.scrollTo({
        top: testimonialsContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [testimonials]);

  return (
    <div className="mx-auto w-full overflow-y-auto mb-[2rem]">
      <h1 className="font-medium text-7xl text-center">TESTIMONIALS SECTION</h1>
      <h5 className="text-center text-gray-500">
        Showcase real customer feedback to build trust and credibility with authentic positive experiences.
      </h5>
      <div className="flex justify-center">
        <div className="w-[60%] p-8">
          <div ref={testimonialsContainerRef} className="pb-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="mt-6">
                <h2 className="font-medium text-xl">Testimonial {index + 1}</h2>

                <div className="relative flex items-center my-4">
                  <FileInput
                    accept="image/*"
                    onChange={(e) => handleImageChange(index, e)}
                    className="hidden"
                    id={`testimonialImgInput${index}`}
                  />
                  <label
                    htmlFor={`testimonialImgInput${index}`}
                    onClick={() => setActiveTestimonialIndex(index)}
                    className={`w-[30vh] h-[25px] border border-gray-300 flex items-center justify-center cursor-pointer relative bg-gray-200`}
                  >
                    <span className={`text-black font-medium ${testimonial.uploadedFile ? 'hidden' : 'block'}`}>
                      Choose File
                    </span>
                    {testimonial.uploadedFile && (
                      <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-between px-2 truncate">
                        <span className="text-gray-600">{shortenFileName(testimonial.uploadedFile)}</span>
                        <span
                          onClick={() => handleImageChange(index, { target: { files: [null] } })}
                          className="text-green-500 cursor-pointer"
                        >
                          Change
                        </span>
                      </div>
                    )}
                  </label>
                  {index >= 3 && (
                    <button
                      onClick={() => removeTestimonial(index)}
                      className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 rounded-full"
                    >
                      ✕
                    </button>
                  )}
                </div>

                <div className="my-4">
                  <TextInput
                    name="name"
                    value={testimonial.name}
                    onChange={(e) => handleTestimonialChange(index, 'name', e.target.value)}
                    placeholder="Name"
                    className="w-full"
                    maxLength="20"
                    style={{
                      borderColor: "#D1D5DB",
                      backgroundColor: "#F9FAFB",
                      borderRadius: "8px",
                    }}
                  />
                </div>
                <div>
                  <TextInput
                    name="feedback"
                    value={testimonial.feedback}
                    onChange={(e) => handleTestimonialChange(index, 'feedback', e.target.value)}
                    placeholder="Feedback"
                    className="w-full"
                    rows={1}
                    style={{
                      borderColor: "#D1D5DB",
                      backgroundColor: "#F9FAFB",
                      borderRadius: "8px",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {testimonials.length < 5 && (
            <div className="mt-6 flex justify-center">
              <button
                type="button"
                onClick={addNewTestimonial}
                className="bg-teal-500 text-white px-4 py-2 rounded-md"
              >
                Add Testimonial
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Testimonials;
