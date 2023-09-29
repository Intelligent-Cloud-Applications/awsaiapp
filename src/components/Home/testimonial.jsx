import React, { useState } from 'react';

const testimonials = [
  {
    id: 1,
    name: 'John Doe',
    post:'',
    text: '" AWSAIAPP has done an excellent job creating a website design that effectively manages class schedules, displays class recordings, choreographies, and streamlines member subscription and attendance. Their ability to make custom changes was impressive, and they promptly responded to any queries. Overall, their work on the website was outstanding. "',
  },
  {
    id: 2,
    name: 'Jane Smith',
    post:'',
    text: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    id: 3,
    name: 'Alice Johnson',
    post: 'Founder',
    text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
];

function Testimonial() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
  };

  return (
    <div className='flex flex-col w-full h-[100vh]'>
      <h1 className='flex justify-center item-center font-bold text-[3rem] h-[20vh] p-20'>
        TESTIMONIAL</h1>

    <div className='h-[80vh] flex justify-center item-center px-[15rem] py-[7rem]'>
       <button onClick={prevTestimonial} className="text-blue-500 hover:text-blue-700 ">
        &#9664;
      </button>
    <div className=" flex justify-center item-center w-[50vw] max-w-[80%] mx-auto p-4 border shadow-lg">
      <div className="text-center my-4">
        <p className="text-lg">{testimonials[currentTestimonial].text}</p>
        <p className="font-bold mt-2">{testimonials[currentTestimonial].name}</p>
      </div>
    </div>
    <button onClick={nextTestimonial} className="text-blue-500 hover:text-blue-700">
        &#9654;
      </button>
    </div>
    </div>
  );
}

export default Testimonial;
