// Template.js
import React, { useState } from 'react';
import Company from '../components/Template/Form/Company';
import Navbar from '../components/Home/Navbar';
import Footer from '../components/Template/Footer';
import Home from '../components/Template/Form/Home';
import Services from '../components/Template/Form/Services';
import Preview from '../components/Template/Preview';

const Template = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const totalSections = 9;

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
    // Handle form submission
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <div className="flex-grow flex h-screen">
        <div className="w-[65%] bg-[#30AFBC] pt-[8rem] relative h-[200rem]">
          <Preview />
        </div>
        <div className="w-4/7 pt-[6rem]">
          {currentSection === 0 && <Company />}
          {currentSection === 1 && <Home />}
          {currentSection === 2 && <Services />}
        </div>
      </div>
      <div style={{ position: 'fixed', width: '100%', bottom: 0, zIndex: 99 }}>
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
