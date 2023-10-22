import React from "react";
import Navbar from "../components/Home/Navbar";
import Footer from "../components/Home/Footer";
import "./Privacy.css";


const PrivacyPolicy = () => {
  return (
    <div>
      <Navbar />
      <div className="bg-white text-black min-h-screen">
          <h1 className="text-11xl md:text-21xl lg:text-33xl font-bold mb-4 curve"
         >
            Privacy Policy
            <p className=" text-[.8rem] font-normal ">Updated October 23, 2023</p>
          </h1>
          <p className="mt-24 px-8 md:px-80 ">
            At Intelligent Cloud, we are committed to safeguarding your privacy
            and protecting your personal information. This Privacy Policy
            outlines how we collect, use, disclose, and safeguard the personal
            information you provide to us when using our website design
            services. By using our services, you agree to the terms described in
            this policy.
          </p>

          <div className="px-10 md:px-80 py-10">
          <div className="container mx-auto py-5">
          <div className="text-md ">
            <h2 className="text-2xl lg:text-3xl font-semibold mb-2">
              Information We Collect
            </h2>
            <p>
              We may collect the following types of information when you use our
              website design services:
            </p>
            <ul className="list-disc ml-6">
              <li>
                <strong>Personal Information:</strong> This includes your name,
                contact information (such as email address and phone number),
                and billing information. This information is collected when you
                sign up for our services or communicate with us.
              </li>
              <li>
                <strong>Website Data:</strong> We may collect information about
                your website preferences, design choices, content, and other
                data necessary to create and customize your website.
              </li>
              <li>
                <strong>Usage Data:</strong> We may gather information about how
                you interact with our website and services, including IP
                addresses, browser type, device information, pages visited, and
                referral URLs.
              </li>
            </ul>
          </div>
        </div>

        <div className="container mx-auto py-5">
          <div className="text-md ">
            <h2 className="text-2xl lg:text-3xl font-semibold mb-2 ">
            How We Use Your Information
            </h2>
            <p>
              We use the collected information for the following purposes:
            </p>
            <ul className="list-disc ml-6">
              <li>
                <strong>Providing Services:</strong> We use your personal and website data to design, develop, and manage your website according to your preferences and needs.
              </li>
              <li>
                <strong>Communication:</strong> We may use your contact information to respond to your inquiries, provide customer support, and send you important updates related to our services.
              </li>
              <li>
                <strong>Improvement:</strong> We analyze usage data to improve our website design services, user experience, and overall performance.
              </li>
              <li>
                <strong>Marketing:</strong> With your consent, we may use your contact information to send you promotional materials or newsletters about our services.
              </li>
            </ul>
          </div>
        </div>

        <div className="container mx-auto py-5">
          <div className="text-md ">
            <h2 className="text-2xl lg:text-3xl font-semibold mb-2">
            Disclosure of Your Information
            </h2>
            <p>
            We do not sell or rent your personal information to third parties. However, we may share your information in the following circumstances:
            </p>
            <ul className="list-disc ml-6">
              <li>
                <strong>Service Providers:</strong> We may engage third-party service providers to assist in providing our services, and they may have access to your information for that purpose.
              </li>
              <li>
                <strong>Legal Requirements:</strong> We may disclose your information if required by law, government request, court order, or to protect our rights, privacy, safety, or property.
              </li>
              <li>
                <strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of all or part of our assets, your information may be transferred as part of the transaction.
              </li>
            </ul>
          </div>
        </div>

        <div className="container mx-auto py-5">
          <div className="text-md ">
            <h2 className="text-2xl lg:text-3xl font-semibold mb-2">
            Security Measures
            </h2>
            <p>
            We implement reasonable security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the internet is completely secure, and we cannot guarantee absolute security.
            </p>
          </div>
        </div>

        <div className="container mx-auto py-2">
          <div className="text-md ">
            <h2 className="text-2xl lg:text-3xl font-semibold mb-2">
            Your Choices 
            </h2>
            <p>
            You can update your personal information, modify your communication preferences, or opt-out of receiving marketing communications at any time by contacting us.
            </p>
          </div>
        </div>

        <div className="container mx-auto py-2">
          <div className="text-md ">
            <h2 className="text-2xl lg:text-3xl font-semibold mb-2">
            Children's Privacy
            </h2>
            <p>
            Our services are not intended for individuals under the age of 16. We do not knowingly collect personal information from children under 16. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
            </p>
          </div>
        </div>

        <div className="container mx-auto py-2">
          <div className="text-md ">
            <h2 className="text-2xl lg:text-3xl font-semibold mb-2">
            Changes to this Policy
            </h2>
            <p>
            We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. The revised policy will be effective immediately upon posting.
            </p>
          </div>
        </div>

        <div className="container mx-auto py-2 mb-10">
          <div className="text-md ">
            <h2 className="text-2xl lg:text-3xl font-semibold mb-2">
            Contact Us
            </h2>
            <p>
            If you have any questions, concerns, or requests regarding this Privacy Policy or your personal information, please contact us at [contact email/phone number].
By using our website design services, you acknowledge that you have read and understood this Privacy Policy and consent to the practices described herein.
            </p>
          </div>
        </div>
        </div>
        
      </div>
      <Footer/>
    </div>
  );
};

export default PrivacyPolicy;
