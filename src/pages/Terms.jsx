import React from "react";
import Navbar from "../components/Home/Navbar";
import Footer from "../components/Home/Footer";
import { motion } from 'framer-motion';
import "./Privacy.css";



const Terms = () => {
  return (
    <div>
      <Navbar />
      <div className="bg-white text-black min-h-screen">
        <motion.h1 className="text-11xl md:text-21xl lg:text-33xl font-bold mb-4 curve font-inter"
          initial={{ opacity: 1, y: -80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Terms and Conditions
          <p className=" text-[.8rem] font-normal ">Effective Date: October 23, 2023</p>
        </motion.h1>
        <p className="mt-24 px-8">
          Welcome to Intelligent Cloud Application! Before you access our services, please read these Terms and Conditions carefully. By using our services, you agree to comply with and be bound by the following terms and conditions. If you do not agree to these terms, please do not use our services.
        </p>

        <div className="px-10 py-5">
          <h2 className="text-2xl lg:text-3xl font-semibold mb-2">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or using our services, you agree to comply with and be bound by these Terms and Conditions. If you do not agree with any part of these terms, you may not use our services.
          </p>
        </div>

        <div className="px-10 py-5">
          <h2 className="text-2xl lg:text-3xl font-semibold mb-2">
            2. Description of Services
          </h2>
          <p>
            Intelligent Cloud Application is a digital consulting company that provides cutting-edge technology-based advanced web applications, personal dashboards, payment solutions, and complete digital marketing services to enhance your business.
          </p>
        </div>

        <div className="px-10 py-5">
          <h2 className="text-2xl lg:text-3xl font-semibold mb-2">
            3. User Responsibilities
          </h2>
          <p>
            You agree to use our services for lawful purposes only and in accordance with these Terms and Conditions. You are solely responsible for any content or data you provide through our services. You must not engage in any harmful activities, including but not limited to:
          </p>
          <ul className="list-disc ml-6">
            <li>
              a. Violating any applicable laws or regulations.
            </li>
            <li>
              b. Impersonating any person or entity or misrepresenting your affiliation with a person or entity.
            </li>
            <li>
              c. Uploading or transmitting any malicious code or viruses.
            </li>
            <li>
              d. Attempting to gain unauthorized access to our systems or other users' accounts.
            </li>
            <li>
              e. Engaging in any activity that disrupts the normal operation of our services.
            </li>
          </ul>
        </div>

        <div className="px-10 py-3">
          <h2 className="text-2xl lg:text-3xl font-semibold mb-2">
            4. Payment and Billing
          </h2>
          <p>
            If you use our payment solutions, you agree to pay all fees and charges associated with the services you purchase. You are responsible for keeping your payment information up-to-date, and any unpaid fees may result in suspension or termination of your services.
          </p>
        </div>

        <div className="px-10 py-3">
          <h2 className="text-2xl lg:text-3xl font-semibold mb-2">
            5. Intellectual Property
          </h2>
          <p>
            All content and materials provided by Intelligent Cloud Application, including but not limited to software, designs, logos, and text, are the property of Intelligent Cloud Application and are protected by intellectual property laws. You may not use, reproduce, or distribute these materials without our explicit permission.
          </p>
        </div>

        <div className="px-10 py-3">
          <h2 className="text-2xl lg:text-3xl font-semibold mb-2">
            6. Privacy
          </h2>
          <p>
            Our Privacy Policy explains how we collect, use, and protect your personal information. By using our services, you consent to our data practices as described in the Privacy Policy.
          </p>
        </div>

        <div className="px-10 py-3">
          <h2 className="text-2xl lg:text-3xl font-semibold mb-2">
            7. Termination
          </h2>
          <p>
            Intelligent Cloud Application reserves the right to terminate or suspend your access to our services at our sole discretion, without notice, for any reason, including if you breach these Terms and Conditions.
          </p>
        </div>

        <div className="px-10 py-3">
          <h2 className="text-2xl lg:text-3xl font-semibold mb-2">
            8. Limitation of Liability
          </h2>
          <p>
            Intelligent Cloud Application will not be liable for any indirect, special, consequential, or incidental damages resulting from the use or inability to use our services. In no event shall our liability exceed the amount paid by you for the services.
          </p>
        </div>

        <div className="px-10 py-3">
          <h2 className="text-2xl lg:text-3xl font-semibold mb-2">
            9. Indemnification
          </h2>
          <p>
            You agree to indemnify and hold Intelligent Cloud Application, its affiliates, and their respective officers, employees, and agents harmless from and against any claims, liabilities, and expenses arising out of your use of our services or any violation of these Terms and Conditions.
          </p>
        </div>

        <div className="px-10 py-3">
          <h2 className="text-2xl lg:text-3xl font-semibold mb-2">
            10. Modifications
          </h2>
          <p>
            Intelligent Cloud Application reserves the right to modify these Terms and Conditions at any time. You will be notified of any changes, and continued use of our services after such changes will constitute your acceptance of the revised terms.
          </p>
        </div>

        <div className="px-10 py-3">
          <h2 className="text-2xl lg:text-3xl font-semibold mb-2">
            11. Governing Law
          </h2>
          <p>
            These Terms and Conditions are governed by and construed in accordance with the laws of [Your Jurisdiction], and any disputes shall be subject to the exclusive jurisdiction of the courts in [Your Jurisdiction].
          </p>
        </div>

        <div className="px-10 py-3 mb-20">
          <h2 className="text-2xl lg:text-3xl font-semibold mb-2">
            12. Contact Information
          </h2>
          <p>
            If you have any questions or concerns regarding these Terms and Conditions, please contact us at admin@awsaiapp.com.
          </p>
        </div>
      </div>
      <Footer />
    </div>

  );
};

export default Terms;
