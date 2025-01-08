import React, { useState, useRef } from 'react';

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
    if (file) {
      const fileSizeMB = file.size / (1024 * 1024);
      if (fileSizeMB > 4) {
        alert("File size exceeds 4MB. Please choose a smaller file.");
        return;
      }
    }
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const updatedTestimonials = [...testimonials];
        updatedTestimonials[index].imgSrc = reader.result;
        updatedTestimonials[index].uploadedFile = file.name;
        updatedTestimonials[index].actualFile = file;
        setTestimonials(updatedTestimonials);
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
  const handleBgImageChange3 = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileSizeMB = file.size / (1024 * 1024);
      if (fileSizeMB > 4) {
        alert("File size exceeds 4MB. Please choose a smaller file.");
        return;
      }
    }
    if (file) {
      setTestimonialBg(file);
    }
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
    <div className="mx-auto max-w-[900px] max-h-screen overflow-y-auto">
      <h1 className="font-medium text-7xl">TESTIMONIALS SECTION</h1>
      <h5 className="w-[28rem] max950:w-[15rem] text-[#cc3f3f] text-[13px]">
        ** The testimonial page shown is just an example how your given data will look like for the testimonials it will not change on giving your input.**
      </h5>
      <h5 className="w-[28rem] max950:w-[17rem] text-[#939393]">
        Showcase real customer feedback to build trust and credibility with authentic positive experiences.
      </h5>
      <div className="relative flex items-center mt-4">
        <h2 className='font-bold'>TestimonialBg</h2>
        <div className='mr-10'></div>
        <input
          type="file"
          accept="image/*"
          // onChange={(e) => handleImageChange(setTestimonialBg, e)}
          onChange={handleBgImageChange3}
          className="hidden"
          id="TestimonialBgInput"
        />
        <label
          htmlFor="TestimonialBgInput"
          className="w-[150px] h-[25px] border border-[#3f3e3e] flex items-center justify-center cursor-pointer relative"
          style={{
            borderColor: 'cement',
            borderWidth: '2px',
            borderStyle: 'solid',
            backgroundColor: '#D9D9D9',
          }}
        >
          <span
            className={`block text-[#000000] font-inter text-[14px] ${TestimonialBg ? 'hidden' : 'block'
              }`}
          >
            Choose File
          </span>
          <div
            className={`absolute top-0 left-0 right-0 bottom-0 flex items-center justify-between px-2 truncate ${TestimonialBg ? 'block' : 'hidden'
              }`}
          >
            <span className="text-[#636262]">
              {shortenFileName1(TestimonialBg)}
            </span>
            <span
              onClick={() => setTestimonialBg(null)}
              className="text-[#3b9d33] cursor-pointer"
            >
              Change
            </span>
          </div>
        </label>
      </div>
      <div className="max-h-[480px]">
        <div ref={testimonialsContainerRef} className="pb-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="mt-2">
              <h2 className="font-medium text-xl">Testimonial {index + 1}</h2>

              <div className="relative flex items-center">
                <input
                  ref={testimonial.fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(index, e)}
                  className="hidden"
                  id={`testimonialImgInput${index}`}
                />
                <label
                  htmlFor={`testimonialImgInput${index}`}
                  onClick={() => toggleActiveTestimonial(index)}
                  className={`w-[150px] h-[25px] border  border-[#3f3e3e] flex items-center justify-center cursor-pointer relative`}
                  style={{ borderColor: 'cement', borderWidth: '2px', borderStyle: 'solid', backgroundColor: '#D9D9D9' }}
                >
                  <span className={`block text-[#000000] font-inter text-[14px] ${testimonial.uploadedFile ? 'hidden' : 'block'}`}>
                    Choose File
                  </span>
                  <div className={`absolute top-0 left-0 right-0 bottom-0 flex items-center justify-between px-2 truncate ${testimonial.uploadedFile ? 'block' : 'hidden'}`}>
                    <span className="text-[#636262]">{shortenFileName(testimonial.uploadedFile)}</span>
                    <span onClick={() => handleImageChange(index, { target: { files: [null] } })} className="text-[#3b9d33] cursor-pointer">Change</span>
                  </div>
                </label>
                {/* Rest of your image upload structure */}
                {index >= 3 && (
                  <button
                    onClick={() => removeTestimonial(index)}
                    className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white px-1 rounded-full text-sm mr-[12px]"
                  >
                    <span>✕</span>
                  </button>
                )}
              </div>
              <div className="relative">
                {/* Name input */}
                <input
                  type="text"
                  name="name"
                  value={testimonial.name}
                  onChange={(e) => handleTestimonialChange(index, 'name', e.target.value)}
                  placeholder="Name"
                  className="w-full max-w-[28rem] text-black border-none outline-none bg-transparent mt-2"
                  onFocus={() => toggleActiveTestimonial(index)}
                  onBlur={() => toggleActiveTestimonial(null)}
                  maxLength="20"
                />
                {/* Name line container */}
                <div
                  className={`absolute left-0 right-0 bottom-0 h-[0.5px] ${activeTestimonialIndex === index ? 'bg-black' : 'bg-[#939393]'
                    }`}
                ></div>
              </div>
              <div className="relative">
                {/* Feedback input */}
                <textarea
                  name="feedback"
                  value={testimonial.feedback}
                  onChange={(e) => handleTestimonialChange(index, 'feedback', e.target.value)}
                  placeholder="Feedback"
                  className="w-full max-w-[28rem] text-black border-none outline-none bg-transparent mt-2 resize-none"
                  onFocus={() => toggleActiveTestimonial(index)}
                  onBlur={() => toggleActiveTestimonial(null)}
                  rows={1}
                  style={{
                    height: activeTestimonialIndex === index ? '2rem' : 'auto',
                  }}
                />
                {/* Feedback line container */}
                <div
                  className={`absolute left-0 right-0 bottom-0 h-[0.5px] ${activeTestimonialIndex === index ? 'bg-black' : 'bg-[#939393]'
                    }`}
                ></div>
              </div>
            </div>
          ))}
        </div>
        {/* Add button after the third testimonial */}
        {testimonials.length < 5 && (
          <div className="mt-2 flex justify-center max950:mt-0">
            {/* <button onClick={addNewTestimonial} className="bg-[#30AFBC] text-white px-4 py-2 rounded-md">
              Add Testimonial
            </button> */}
          </div>
        )}
      </div>
    </div>
  );
}

export default Testimonials;