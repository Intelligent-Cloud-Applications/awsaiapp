import React from "react";
import Navbar from "../components/Home/Navbar";
import { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Pic from "../utils/contactusPic.png";
import { motion } from "framer-motion";
import ReCAPTCHA from "react-google-recaptcha";
import { API } from "aws-amplify";
import Context from "../context/Context";


const Query = ({ activeComponent }) => {
  // //Get the action url by inspecting the form
  // const FORMS_ACTION_URL = "https://docs.google.com/forms/u/1/d/e/1FAIpQLSfHDTu8rT_7o8-IHLuLrrigrBmDPjk6DeO8hxZelCLSBc_CxQ/formResponse";

  // //Get the rest from a prefilled link
  // const FORMS_FULL_NAME = "entry.1659643296";
  // const FORMS_COMPANY_NAME = "entry.1521075864";
  // const FORMS_EMAIL = "entry.792093172";
  // const FORMS_ADDRESS = "entry.727108387";
  // const FORMS_PROJECT_DETAILS = "entry.218886769";

  const util = useContext(Context).util;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    email: "",
    phoneNumber: "",
    address: "",
    projectDetails: "",
  });

  // const [captchaValue] = useState(null);

  const recaptchaRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      util.setLoader(true);
      const token = await recaptchaRef.current.executeAsync();

      if (!token) {
        alert("Please fill out the CAPTCHA.");
        return;
      }

      if (
        formData.fullName === "" ||
        formData.companyName === "" ||
        formData.email === "" ||
        formData.phoneNumber === "" ||
        formData.address === "" ||
        formData.projectDetails === ""
      ) {
        alert("Please fill out all form fields.");
        util.setLoader(false);
        return;
      }

      // const bodyData = new FormData();
      // bodyData.append(FORMS_FULL_NAME, formData.fullName);
      // bodyData.append(FORMS_COMPANY_NAME, formData.companyName);
      // bodyData.append(FORMS_EMAIL, formData.email);
      // bodyData.append(FORMS_ADDRESS, formData.address);
      // bodyData.append(FORMS_PROJECT_DETAILS, formData.projectDetails);

      // await fetch(FORMS_ACTION_URL, {
      //   mode: 'no-cors',
      //   method: "POST",
      //   body: bodyData,
      //   headers: {
      //     'Content-type': 'application/json; charset=UTF-8'
      //   }
      // });

      const apiName = "clients";
      const path = "/any/create-query";
      const myInit = {
        body: {
          fullName: formData.fullName,
          companyName: formData.companyName,
          emailId: formData.email,
          phoneNumber: formData.phoneNumber,
          address: formData.address,
          projectDetails: formData.projectDetails,
        },
      };

      await API.post(apiName, path, myInit);

      alert("Submitted Successfully");


      setFormData({
        fullName: "",
        companyName: "",
        email: "",
        phoneNumber: "",
        address: "",
        projectDetails: "",
      });

      navigate('/');
      console.log("reCAPTCHA Token:", token);
    } catch (error) {
      alert("Error sending message: " + error.message);
      console.error("reCAPTCHA error:", error);
    }
    util.setLoader(false);

  };

  return (
    <>
      {activeComponent !== 'contact' ? <Navbar /> : ""}
      {/* new contact us page */}
      <div
        className="flex justify-center items-center md:pt-[10rem] md:pb-[5rem] bg-[#F0F0F0] h-[100vh] 
      max670:h-[140vh] max670:pt-[5rem] max670:px-6 "
      >
        {/* card */}
        <div className="flex flex-col sm:flex-row m-5 max600:mx-5 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] rounded-lg">
          <div className="bg-[#0091A0] text-white rounded-l shadow-md p-10 md:w-[40vw] mx-auto sm:w-[30vw]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-around h-full"
            >
              <img
                src={Pic}
                alt=""
                className="w-32 md:w-[80%] rounded-full mb-4 max450:hidden"
              />
              <div>
                <h2 className="text-3xl font-semibold mb-2 w-full">
                  Let's Chat.
                  <br />
                  Tell Us About Your Project.
                </h2>
                <p className="w-full">
                  Let's Maximize Your business's Potential with Us
                </p>
              </div>
            </motion.div>
          </div>

          <div className=" max-w-md w-full mx-auto px-10 py-4  border rounded-md bg-white">
            <h2 className=" max406:text-3xl max670:text-9xl md:text-13xl font-semibold mb-4 w-full">
              Send us a message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-3">
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
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
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
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey="6Le1xsooAAAAAH6kz7sA_d-qC8FdHdavrAKVb68d"
                  size="invisible"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="bg-[#30AFBC] text-white font-medium py-2 px-4 rounded-md hover:bg-[#4BBAC6] focus:outline-none mt-3 shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
                  onClick={handleSubmit}
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