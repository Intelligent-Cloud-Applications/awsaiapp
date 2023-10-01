import React, { useState } from "react";
import "./Testimonial.css";
import leftarrow from "../../utils/Assets/icons8-left-arrow-100.png";
import rightarrow from "../../utils/Assets/icons8-right-arrow-100.png";
import leftquote from "../../utils/Assets/double-quotes-svgrepo-com.png";
import rightquote from "../../utils/Assets/double-quotes-svgrepo-com(1).png";
import Anupam from "../../utils/Anupam.png";
import Debebrata from "../../utils/Debabrata.png";
import Auroshisha from "../../utils/Auroshikha.png";
import Ayesha from "../../utils/Ayesha.png";
import Balaraju from "../../utils/Balaraju.png";


const testimonials = [
  {
    id: 1,
    name: "Anupam ",
    post: "Founder",
    text: ' AWSAIAPP has done an excellent job creating a website design that effectively manages class schedules, displays class recordings, choreographies, and streamlines member subscription and attendance. Their ability to make custom changes was impressive, and they promptly responded to any queries. Overall, their work on the website was outstanding. ',
    img: Anupam,
    add:"BWORKZ",
  },
  {
    id: 2,
    name: "Debabrata",
    post: "Founder",
    text: "The young team of developers did an exceptional job in building a website for our dance studio that caters to our marketing needs while efficiently managing our class schedules and member payments. They took the time to visit our studio, understand our requirements, and then developed the website precisely to our needs. We were impressed by their dedication and willingness to go the extra mile to ensure that we were satisfied with the end product. Overall, we are delighted with the website they have created for us. ",
    img:Debebrata,
    add:"RTIGERS",
  },
  {
    id: 3,
    name: "Auroshikha",
    post: "Master Instructor",
    text: "The Intelligent Cloud Applications team did an outstanding job understanding our online gym site requirements and creating a perfect home page and functional dashboard. We were impressed with their ability to grasp our needs and deliver a solution that exceeded our expectations. ",
    img: Auroshisha,
    add:"HAPPY PRANCER",
  },
  {
    id: 4,
    name: "Ayesha",
    post: "Founder",
    text: `Intelligent Cloud Application's exceptional services have elevated our business. From personalized features to secure payments and intuitive user interface, they have gone above and beyond to enhance our performance. Their commitment to excellence makes them an invaluable asset for our continued growth.`,
    img: Ayesha,
    add:"LISSOME",
  },
  {
    id: 5,
    name: "Balaraju",
    post: "Founder",
    text: `Intelligent Cloud Application's  website is a masterpiece. It presents our work with elegance, offering seamless navigation and showcasing our expertise. Their attention to detail and creativity are evident, making them a top-notch web design partner.`,
    img:Balaraju,
    add:"ICONIC",
  },
];

function Testimonial() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
<<<<<<< HEAD
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
=======
    <div className="testi flex flex-col w-full h-[100vh] ">
      <h1 className="flex justify-center item-center font-bold text-[3rem] h-[20vh] p-20 text-white">
        TESTIMONIAL
      </h1>
      <div className="h-20"></div>
      <div className="flex flex-row justify-center mb-[-11rem] z-10">
      <div className="md:w-23 md:h-23 max670:w-14 max670:h-14 rounded-full overflow-hidden">
              <img
                src={testimonials[currentTestimonial].img}
                alt=""
                className="w-full h-full object-cover "
              />
            </div >
>>>>>>> 135c5c7e5c605b8b30da72cb0f8113ee1b58093a
      </div>
      <div className="h-[80vh] flex justify-center item-center py-[7rem] mx-5">
        <button onClick={prevTestimonial} className="">
          <img src={leftarrow} alt="" className="h-12 max600:h-8" />
        </button>
        <div className=" flex flex-col h-[50vh] bg-white justify-center item-center md:w-[40vw] max1050:w-[95%] ms:mx-5 mx-20 border shadow-lg px-10 overflow-hidden rounded ">
          <div className="flex h-[20%] justify-between items-end mb-[-1rem]">
            <img className="h-[3rem]" src={leftquote} alt="" />
            <img className="h-[3rem]" src={rightquote} alt="" />
          </div>
          <div className="text-center my-4">
            <p className="text-[1rem] pb-10 max1008:text-sm max670:text-xs">{testimonials[currentTestimonial].text}</p>
            <p className="font-bold mt-2 text-[#30AFBC] text-3xl">
              {testimonials[currentTestimonial].name}
            </p>
            <p className="font-semibold">
              {testimonials[currentTestimonial].post}
            </p>
          </div>
        </div>
        <button onClick={nextTestimonial} className="">
          {" "}
          <img src={rightarrow} alt="" className=" h-12 max600:h-8" />
        </button>
      </div>
      <div className="w-full flex justify-center ">
        <div className="w-[13vw] bg-[#30AFBC] text-center text-7xl p-1 rounded-full">
        <p className="font-bold text-white">
              {testimonials[currentTestimonial].add}
            </p>
        </div>
        </div>
    </div>
  );
}

export default Testimonial;
