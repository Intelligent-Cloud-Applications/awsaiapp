import React, { useState } from 'react';
import Home1 from '../components/Template/Preview/Home';
import Company from '../components/Template/Form/Company';
import Navbar from '../components/Home/Navbar';
import Footer from '../components/Template/Footer';
import Home from '../components/Template/Form/Home';
import Navbar1 from '../components/Template/Preview/Navbar';
import Services from '../components/Template/Form/Services';
const Template = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const totalSections = 9; // Total number of sections

  const handleNextSection = () => {
    if (currentSection < totalSections - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const handlePrevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const handleSubmit = () => {
    // Handle submission action here
  };

  return (
    <div style={{ position: 'relative' }}>
      <Navbar />
      <div className="flex justify-center items-center h-screen ">
        <div className="flex w-full ">
          <div className="w-4/6 h-screen pt-[8rem]  bg-[#30AFBC] relative">
            {/* Render different components based on currentSection */}
            {currentSection === 0 && <Navbar1 />}
            {currentSection === 1 && <Home1 />}
            {/* Add conditions for other sections */}
            {/* For example: */}
            {/* {currentSection === 2 && <AnotherComponent />} */}
          </div>
          <div className="w-4/7 pt-[6rem]">
            {/* Render different components based on currentSection */}
            {currentSection === 0 && <Company />}
            {currentSection === 1 && <Home />}
            {currentSection === 2 && <Services />}
          </div>
        </div>
      </div>
      <div style={{ position: 'absolute', width: '100%', bottom: 0, zIndex: 999 }}>
        <Footer
          currentSection={currentSection}
          nextSection={handleNextSection}
          prevSection={handlePrevSection}
          submitSections={handleSubmit}
        />
      </div>
    </div>
  );
};

export default Template;


