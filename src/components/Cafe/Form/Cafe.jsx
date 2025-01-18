import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCoffee, FiArrowRight, FiArrowLeft, FiSave } from 'react-icons/fi';
import Navbar from '../components/Home/Navbar';
import Footer from '../components/Cafe/Footer';
import Company from '../components/Cafe/Form/Company';
import Home from '../components/Cafe/Form/Home';
import Policy from '../components/Cafe/Form/Policy';
import Contact from '../components/Cafe/Form/Contact';
import Testimonials from '../components/Cafe/Form/Testimonials';
import { API, Storage } from "aws-amplify";
import PrevSectionDraftHandler from '../components/Cafe/Form/PrevSectionDraftHandler';
import Context from "../context/Context";
import "./Template.css";

// Form section titles and descriptions
const FORM_SECTIONS = [
  {
    title: "Company Profile",
    description: "Build your brand identity with essential company details",
    icon: FiCoffee
  },
  {
    title: "Contact Information",
    description: "Help customers reach you through various channels",
    icon: FiPhone
  },
  {
    title: "Homepage Content",
    description: "Create an engaging landing page for your visitors",
    icon: FiHome
  },
  {
    title: "Policies & Values",
    description: "Share your café's story and commitment to excellence",
    icon: FiShield
  },
  {
    title: "Testimonials",
    description: "Showcase what your customers say about your café",
    icon: FiStar
  }
];

const Cafe = () => {
  // ... existing state management code ...

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FDF8F3] to-white">
      <Navbar />
      
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-[#D4B59D]/20 z-50">
        <motion.div 
          className="h-full bg-gradient-to-r from-[#8B5E34] to-[#4A3520]"
          initial={{ width: "0%" }}
          animate={{ width: `${(currentSection / 4) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <div className="container mx-auto px-4 pt-24 pb-32">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-center mb-4">
              {React.createElement(FORM_SECTIONS[currentSection].icon, {
                className: "w-16 h-16 text-[#4A3520]"
              })}
            </div>
            <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl text-[#4A3520] mb-4">
              {FORM_SECTIONS[currentSection].title}
            </h1>
            <p className="text-[#8B5E34] text-lg md:text-xl max-w-2xl mx-auto">
              {FORM_SECTIONS[currentSection].description}
            </p>
          </motion.div>
        </div>

        {/* Form Sections */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSection}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-5xl mx-auto"
          >
            {currentSection === 0 && (
              <Company
                companyName={companyName}
                setCompanyName={setCompanyName}
                institutionId={institutionId}
                setinstitutionId={setinstitutionId}
                PrimaryColor={PrimaryColor}
                setPrimaryColor={setPrimaryColor}
                SecondaryColor={SecondaryColor}
                setSecondaryColor={setSecondaryColor}
                logo={logo}
                setLogo={setLogo}
                LightestPrimaryColor={LightestPrimaryColor}
                setLightestPrimaryColor={setLightestPrimaryColor}
                LightPrimaryColor={LightPrimaryColor}
                setLightPrimaryColor={setLightPrimaryColor}
                selectedFile={selectedFile}
                setSelectedFile={setSelectedFile}
                companyDescription={companyDescription}
                setCompanyDescription={setCompanyDescription}
              />
            )}
            {/* ... other form sections ... */}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="fixed bottom-8 left-0 w-full">
          <div className="max-w-5xl mx-auto px-4 flex justify-between items-center">
            <button
              onClick={handlePrevSectionDraft}
              className="flex items-center gap-2 px-6 py-3 text-[#4A3520] hover:bg-[#4A3520]/5 rounded-lg transition-colors"
            >
              <FiArrowLeft className="w-5 h-5" />
              Back
            </button>
            
            <div className="flex gap-4">
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-2 px-6 py-3 text-[#4A3520] hover:bg-[#4A3520]/5 rounded-lg transition-colors"
              >
                <FiSave className="w-5 h-5" />
                Save Draft
              </button>
              
              <button
                onClick={handleNextSection}
                className="flex items-center gap-2 px-6 py-3 text-white bg-gradient-to-r from-[#8B5E34] to-[#4A3520] rounded-lg hover:from-[#7A4E24] hover:to-[#392910] transition-all duration-200"
              >
                {currentSection === 4 ? 'Submit' : 'Next'}
                <FiArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <PrevSectionDraftHandler
        isOpen={showModal}
        onClose={handleCloseModal}
        onClear={handleClearData}
        onSaveDraft={handleSaveDraft}
      />
    </div>
  );
};

export default Cafe; 