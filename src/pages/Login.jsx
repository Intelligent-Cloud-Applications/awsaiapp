import React from "react";
import { useState } from "react";
import Navbar from "../components/Home/Navbar";
import { motion } from "framer-motion";

const Login = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    email: "",
    address: "",
    projectDetails: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here (e.g., send data to a server)
    console.log(formData);
  };
  return (
    <>
      <Navbar />
      {/* new contact us page */}
      <div
        className="flex justify-center items-center md:pt-[10rem] md:pb-[5rem] bg-[#F0F0F0] h-[100vh] 
        max670:h-[140vh] max670:pt-[5rem] max670:px-6 "
      >
        {/* card */}
        <div className="flex flex-col sm:flex-row m-5 max600:mx-5 rounded-lg">
          <div className="text-black p-10 md:w-[40vw] mx-auto sm:w-[30vw]">
            <div className="flex flex-col items-start justify-center h-full">
              <div>
                <h2 className="text-5xl lg:text-21xl md:text-11xl font-bold mb-2 w-full font-poppins">
                  Let's Chat.
                  <br />
                  Tell Us About Your Project.
                </h2>
                <p className="w-full text-lg max600:text-base font-semibold">
                  Let's Maximize Your business's Potential with Us
                </p>
              </div>
            </div>
          </div>

          <div className=" max-w-md w-full mx-auto px-10 py-8  border rounded-md bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
            <h2 className=" max406:text-3xl max670:text-9xl md:text-15xl font-semibold mb-4 w-full font-poppins">
              Send us a message
            </h2>
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }} // Initial state (hidden and slightly moved)
              animate={{ opacity: 1, y: 0 }} // Animation state (visible and at its original position)
              transition={{ duration: 0.8 }} // Animation duration
              className="space-y-3"
            >
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
                <button
                  type="submit"
                  className="bg-[#30AFBC] text-white font-medium py-2 px-4 rounded-md hover:bg-[#4BBAC6] focus:outline-none mt-2 shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
                >
                  Send Message
                </button>
              </div>
            </motion.form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
