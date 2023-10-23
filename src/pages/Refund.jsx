import React from "react";
import Navbar from "../components/Home/Navbar";
import Footer from "../components/Home/Footer";

const Refund = () => {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col justify-center items-center w-full min-h-screen px-2">
        <div className="w-full h-96 flex flex-col justify-center items-center bg-gradient-to-b from-slate-900 to-slate-700 mt-20 text-white rounded-md font-poppins">
          <h1 className="text-xl sm:text-11xl md:text-21xl">Cancellation and Refund Policy</h1>
          <p className="mt-3 max500:text-xs">Updated October 22, 2023</p>
        </div>

      <div className="container mx-auto py-8 my-16 w-[85%] sm:w-[60%] font-inter">

        <h2 className="text-xl font-bold mt-4 mb-2">1. Cancellation Policy</h2>
        <p>
          <strong>1.1. Web Application and Digital Marketing Services:</strong> If you wish to cancel any web application development or digital marketing services, you must provide written notice to Intelligent Cloud Application at least [XX days/weeks] before the scheduled start date of the service. A cancellation fee may be applied at the discretion of Intelligent Cloud Application.
        </p>

        <p>
          <strong>1.2. Payment Solutions:</strong> Cancellation of payment solutions may be subject to the terms and conditions of the payment processing provider. You must contact the payment processing provider directly for cancellation requests.
        </p>

        <p>
          <strong>1.3. Personal Dashboard:</strong> Cancellation of personal dashboard services must be requested in writing and will be processed in accordance with the terms and conditions specified in the service agreement.
        </p>

        <h2 className="text-xl font-bold mt-4 mb-2">2. Refund Policy</h2>
        <p>
          <strong>2.1. Web Application and Digital Marketing Services:</strong> Refunds for web application and digital marketing services are issued on a case-by-case basis. If you are dissatisfied with the services provided by Intelligent Cloud Application, please contact us within [XX days/weeks] of service completion to discuss your concerns. We will assess your situation and, if applicable, offer a refund or an alternative solution.
        </p>

        <p>
          <strong>2.2. Payment Solutions:</strong> Refunds for payment solutions are subject to the policies of the payment processing provider. You must contact the payment processing provider directly for refund requests.
        </p>

        <p>
          <strong>2.3. Personal Dashboard:</strong> Refunds for personal dashboard services will be issued in accordance with the terms and conditions specified in the service agreement.
        </p>

        <h2 className="text-xl font-bold mt-4 mb-2">3. Processing of Cancellations and Refunds</h2>
        <p>
          <strong>3.1. To request a cancellation or refund, please contact our customer support team at [Contact Information]. Ensure that you provide all necessary details and documentation to expedite the process.
          </strong>
        </p>

        <p>
          <strong>3.2. Refunds, if approved, will be processed within [XX days/weeks] from the date of approval. The method of refund (credit back to the original payment method or other specified methods) will be determined by Intelligent Cloud Application.
          </strong>
        </p>

        <p>
          <strong>3.3. Any applicable cancellation fees will be deducted from the refund amount.</strong>
        </p>

        <h2 className="text-xl font-bold mt-4">4. Exceptional Circumstances</h2>
        <p>
          In exceptional circumstances such as force majeure, technical failures, or other unforeseen events, Intelligent Cloud Application reserves the right to amend or waive any cancellation or refund policy provisions at its discretion.
        </p>

        <h2 className="text-xl font-bold mt-4">5. Contact Information</h2>
        <p>
          If you have questions or concerns regarding our Cancellation and Refund Policy, please contact us at [Contact Information].
        </p>

        <p>
          By engaging in business with Intelligent Cloud Application, you acknowledge that you have read, understood, and agreed to this Cancellation and Refund Policy. This policy is subject to change, and the most recent version will be posted on our website.
        </p>
      </div>

      </div>
      <Footer />
    </div>
  );
};

export default Refund;
