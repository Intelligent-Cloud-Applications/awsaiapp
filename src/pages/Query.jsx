import React from "react";
import Navbar from "../components/Home/Navbar";
import { useState } from "react";
import Pic from "../utils/contactusPic.png";
import { motion } from 'framer-motion';
import ReCAPTCHA from "react-google-recaptcha";

const Query = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    email: "",
    address: "",
    projectDetails: "",
  });

  const [captchaValue, setCaptchaValue] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (captchaValue) {
    
      console.log(formData);
    } else {
     
      alert("Please fill out the CAPTCHA.");
    }
  };

  return (
    <>
      <Navbar />
      {/* new contact us page */}
      <div className="flex justify-center items-center md:pt-[3rem] md:pb-[5rem] bg-[#F0F0F0] h-[120vh] 
      max670:h-[140vh] max670:pt-[5rem] max670:px-6 ">
        {/* card */}
        <div className="flex flex-col sm:flex-row m-5 max600:mx-5 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] rounded-lg">
          <div className="bg-[#0091A0] text-white rounded-l shadow-md p-10 md:w-[40vw] mx-auto sm:w-[30vw]">
            <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-around h-full">
              <img
                src={Pic}
                alt=""
                className="w-32 md:w-[80%] rounded-full mb-4"
              />
              <div>
              <h2 className="text-3xl font-semibold mb-2 w-full">
                Let's Chat.<br/>Tell Us About Your Project.
              </h2>
              <p className="w-full">
                Let's Maximize Your business's Potential with Us
              </p>
              </div>
            </motion.div>
          </div>

          <div className=" max-w-md w-full mx-auto px-10 py-4  border rounded-md bg-white">
          <h2 className=" max406:text-3xl max670:text-9xl md:text-13xl font-semibold mb-4 w-full">
              Send  us  a message
              </h2>
            <form onSubmit={handleSubmit} className="space-y-1">
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder=""
                  className="mt-1 p-1 border border-gray-600 rounded-md w-full"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="companyName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Company Name
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="mt-1 p-1 border border-gray-600 rounded-md w-full"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 p-1 border border-gray-600 rounded-md w-full"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  rows="2"
                  value={formData.address}
                  onChange={handleChange}
                  className="mt-1 p-1 border border-gray-600 rounded-md w-full"
                ></textarea>
              </div>
              <div>
                <label
                  htmlFor="projectDetails"
                  className="block text-sm font-medium text-gray-700"
                >
                  Tell us more about your project
                </label>
                <textarea
                  id="projectDetails"
                  name="projectDetails"
                  rows="4"
                  value={formData.projectDetails}
                  onChange={handleChange}
                  className="mt-1 p-1 border border-gray-600 rounded-md w-full"
                ></textarea>
              </div>
              
              <div>
                {/* Add reCAPTCHA to your form */}
                <ReCAPTCHA 
                  sitekey="6LeFicooAAAAAIYySrGkdBQ2z3bJlHcHg8NnmyP1" // Replace with your actual reCAPTCHA site key
                  onChange={handleCaptchaChange}
                />
              </div>
              <div>
              <button
                  type="submit"
                  className="bg-[#30AFBC] text-white font-medium py-2 px-4 rounded-md hover:bg-[#4BBAC6] focus:outline-none mt-2 shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
                  onClick={handleSubmit}
                  disabled={!captchaValue}
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Query;
