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

  };

  return (
    <div style={{ position: 'relative' }}>
      <Navbar />
      <div className="flex justify-center items-center h-screen ">
        <div className="flex w-full ">
          <div className=" flex w-[65%] h-screen pt-[8rem] bg-[#30AFBC] relative item-center">
          <Preview
            handleNextSection={handleNextSection}
            handlePrevSection={handlePrevSection}
            currentSection={currentSection}
          />
          </div>
          <div className="w-4/7 pt-[6rem]">
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
