import React from "react";
import Navbar from "../components/Home/Navbar";
import Footer from "../components/Home/Footer";
import { motion } from 'framer-motion';
import "./Privacy.css";

const Refund = () => {
  return (
    <div>
      <Navbar />
      <div className="bg-white text-black min-h-screen">
        <motion.h1 className="text-11xl md:text-21xl lg:text-33xl font-bold mb-4 curve font-inter"
          initial={{ opacity: 1, y: -80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Cancellation and Refund Policy
          <p className=" text-[.8rem] font-normal ">Effective Date: October 23, 2023</p>
        </motion.h1>
        <p className="mt-24 px-8 ">
          By engaging in business with Intelligent Cloud Application, you acknowledge that you have read, understood, and agreed to this Cancellation and Refund Policy. This policy is subject to change, and the most recent version will be posted on our website.
        </p>

        <div className="px-10 py-5">
          <h2 className="text-2xl lg:text-3xl font-semibold mb-2">
            1. Cancellation Policy
          </h2>
          <p>
            1.1. Web Application and Digital Marketing Services: If you wish to cancel any web application development or digital marketing services, you must provide written notice to Intelligent Cloud Application at least 15 days before the scheduled start date of the service. A cancellation fee may be applied at the discretion of Intelligent Cloud Application.
          </p>
          <p>
            1.2. Payment Solutions: Cancellation of payment solutions may be subject to the terms and conditions of the payment processing provider. You must contact the payment processing provider directly for cancellation requests.
          </p>
          <p>
            1.3. Personal Dashboard: Cancellation of personal dashboard services must be requested in writing and will be processed in accordance with the terms and conditions specified in the service agreement.
          </p>
        </div>

        <div className="px-10 py-5">
          <h2 className="text-2xl lg:text-3xl font-semibold mb-2">
            2. Refund Policy
          </h2>
          <p>
            2.1. Web Application and Digital Marketing Services: Refunds for web application and digital marketing services are issued on a case-by-case basis. If you are dissatisfied with the services provided by Intelligent Cloud Application, please contact us within 15 days of service completion to discuss your concerns. We will assess your situation and, if applicable, offer a refund or an alternative solution.
          </p>
          <p>
            2.2. Payment Solutions: Refunds for payment solutions are subject to the policies of the payment processing provider. You must contact the payment processing provider directly for refund requests.
          </p>
          <p>
            2.3. Personal Dashboard: Refunds for personal dashboard services will be issued in accordance with the terms and conditions specified in the service agreement.
          </p>
        </div>

        <div className="px-10 py-5">
          <h2 className="text-2xl lg:text-3xl font-semibold mb-2">
            3. Processing of Cancellations and Refunds
          </h2>
          <p>
            3.1. To request a cancellation or refund, please contact our customer support team at admin@awsaiapp.com. Ensure that you provide all necessary details and documentation to expedite the process.
          </p>
          <p>
            3.2. Refunds, if approved, will be processed within 15 days from the date of approval. The method of refund (credit back to the original payment method or other specified methods) will be determined by Intelligent Cloud Application.
          </p>
          <p>
            3.3. Any applicable cancellation fees will be deducted from the refund amount.
          </p>
        </div>

        <div className="px-10 py-3">
          <h2 className="text-2xl lg:text-3xl font-semibold mb-2">
            4. Exceptional Circumstances
          </h2>
          <p>
            In exceptional circumstances such as force majeure, technical failures, or other unforeseen events, Intelligent Cloud Application reserves the right to amend or waive any cancellation or refund policy provisions at its discretion.
          </p>
        </div>

        <div className="px-10 py-3 mb-20">
          <h2 className="text-2xl lg:text-3xl font-semibold mb-2">
            5. Contact Information
          </h2>
          <p>
            If you have questions or concerns regarding our Cancellation and Refund Policy, please contact us at admin@awsaiapp.com.
          </p>
        </div>
      </div>
      <Footer />
    </div>

  );
};

export default Refund;
