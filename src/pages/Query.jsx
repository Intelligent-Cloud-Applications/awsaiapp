import React, { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ReCAPTCHA from "react-google-recaptcha";
import { API } from "aws-amplify";
import Navbar from "../components/Home/Navbar";
import Context from "../context/Context";
import Pic from "../utils/contactusPic.png";
import FOOTER from "../components/Home/Footer";

const Query = ({ activeComponent }) => {
  const util = useContext(Context).util;
  const navigate = useNavigate();
  const recaptchaRef = useRef();

  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    emailId: "",
    phoneNumber: "",
    address: "",
    projectDetails: "",
  });
  const [errors, setErrors] = useState({ emailId: "", phoneNumber: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "emailId") {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setErrors({
        ...errors,
        emailId: emailPattern.test(value) ? "" : "Invalid email format. Please use example@domain.com",
      });
    }
    if (name === "phoneNumber") {
      const phonePattern = /^\d{0,10}$/;
      setErrors({
        ...errors,
        phoneNumber: phonePattern.test(value) ? "" : "Phone number must be numeric and up to 10 digits only.",
      });
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      util.setLoader(true);
      const token = await recaptchaRef.current.executeAsync();
      if (!token) {
        alert("Please complete the CAPTCHA.");
        return;
      }
      if (Object.values(formData).some((value) => value === "")) {
        alert("Please fill out all fields.");
        util.setLoader(false);
        return;
      }
      await API.post("clients", "/any/create-query", { body: formData });
      alert("Submitted Successfully");
      setFormData({ fullName: "", companyName: "", emailId: "", phoneNumber: "", address: "", projectDetails: "" });
      navigate("/");
    } catch (error) {
      alert("Error sending message: " + error.message);
    } finally {
      util.setLoader(false);
    }
  };

  return (
    <>
      {activeComponent !== "contact" && <Navbar />}
      <div className="flex flex-col justify-center items-center min-h-screen py-10 px-4 bg-white mt-[5rem]">
        <div className="flex flex-col lg:flex-row bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl">
          <div className="bg-teal-600 text-white p-8 flex flex-col justify-center items-center w-full lg:w-1/2">
            <motion.img src={Pic} alt="Contact" className="w-40 mb-4 hidden md:block" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} />
            <h2 className="text-2xl font-bold text-center text-white">Let's Chat.<br />Tell Us About Your Project.</h2>
            <p className="text-center mt-2 text-white">Let's maximize your business potential with us.</p>
          </div>
          <div className="p-8 w-full lg:w-2/3">
            <h2 className="text-2xl font-bold mb-4 text-center lg:text-left">Send us a message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { label: "Full Name", name: "fullName", type: "text" },
                { label: "Company Name", name: "companyName", type: "text" },
                { label: "Email", name: "emailId", type: "email", error: errors.emailId },
                { label: "Phone Number", name: "phoneNumber", type: "text", error: errors.phoneNumber },
              ].map(({ label, name, type, error }) => (
                <div key={name}>
                  <label className="block text-gray-700">{label}</label>
                  <input type={type} name={name} value={formData[name]} onChange={handleChange} className="w-full p-2 border rounded-md focus:ring-2 focus:ring-teal-400" required />
                  {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                </div>
              ))}
              {[
                { label: "Address", name: "address", rows: 2 },
                { label: "Tell us more about your project", name: "projectDetails", rows: 4 },
              ].map(({ label, name, rows }) => (
                <div key={name}>
                  <label className="block text-gray-700">{label}</label>
                  <textarea name={name} rows={rows} value={formData[name]} onChange={handleChange} className="w-full p-2 border rounded-md focus:ring-2 focus:ring-teal-400" required></textarea>
                </div>
              ))}
              <ReCAPTCHA ref={recaptchaRef} sitekey="6Le1xsooAAAAAH6kz7sA_d-qC8FdHdavrAKVb68d" size="invisible" />
              <button type="submit" className="w-full font-bold text-[18px] bg-teal-500 text-white py-2 rounded-md hover:bg-teal-600">Send Message</button>
            </form>
          </div>
        </div>
      </div>
      <FOOTER />
    </>
  );
};

export default Query;