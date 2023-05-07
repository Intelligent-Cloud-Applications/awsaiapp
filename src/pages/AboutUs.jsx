import React from "react";
import NavBar from "../Components/NavBar";
import "./about_us.css";
import Footer from '../Components/Home/Footer'

const AboutUs = () => {
  return (
    <div>
    <div className="flex flex-col items-center Background1 pb-[8rem]">
      <NavBar />
      <div className="text-[white] flex flex-col items-center w-100 h-100 mt-[2rem] p-0 overflow-x-hidden w-[90vw] max-w-[80rem]">
        <h1 className=" text-[4rem] text-center max450:[1.2rem] font-bebas-neue">About Us</h1>
        <h3 className="text-[2rem] max450:text-[1.8rem] font-poppins">KNOW WHAT WE ARE</h3>
        <p className="mt-8">
        Welcome to our company, where we believe in the power of technology
         to revolutionize the fitness industry. We are a team of young engineers
          who are passionate about using our skills to create intelligent websites
           for dance studios and gyms.{" "}
        </p>
        <p className="mt-8">
        Our company is dedicated to making the fitness industry more accessible 
        and popular by using cloud technology to provide services that are both 
        innovative and affordable. We believe that every gym and dance studio deserves 
        to have a strong online presence that can help them connect with their customers
         and grow their business.
        </p>
       
        <p className="mt-2">
        At our company, we take pride in our team of young engineers who are eager to 
        use their skills to develop cutting-edge websites. We believe that by providing 
        opportunities for these talented individuals, we can not only create exceptional
         websites but also contribute to the growth of the local community.
        </p>
        <p className="mt-2">
        Our approach to website development is grounded in the belief that
         every gym and dance studio is unique. That's why we work closely with 
         each of our clients to create a customized website that accurately reflects 
         their brand and helps them achieve their business goals. Whether it's designing
         a mobile-responsive website or integrating a booking system, we are dedicated
         to creating a website that is both functional and beautiful.

        </p>
        <p className="mt-2">
        Our company is committed to providing exceptional service to our clients.
         We believe that by building strong relationships with our clients, we can 
         help them achieve long-term success. Our team is always available to answer
          questions and provide support, ensuring that our clients have everything they need to succeed.

        </p>
        <p className="mt-10">
        Thank you for considering our company for your website development needs. 
        We are excited about the opportunity to work with you and help you achieve your goals.

        </p>
    {/*    <div className="my-8 text-[1.2rem] flex flex-col gap-6 w-[90vw] max-w-[60rem] border-[0]">
          <h1>WATCH MORE ON OUR YOUTUBE</h1>
          <div>
            <iframe
              // width="844"
              // height="515"
              src="https://www.youtube.com/embed/pPzIbKB2GNQ"
              className="w-[80vw] h-[45vw]"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
  </div> */}
  </div> 
  </div>
  <Footer />
      </div>
  );
};

export default AboutUs;
