import React, { useState } from 'react';
import Home1 from '../components/Template/Preview/Home1';
import Company from '../components/Template/Form/Company';
import Navbar from '../components/Home/Navbar';
import Footer from '../components/Template/Footer';
import Home from '../components/Template/Form/Home';
import Navbar1 from '../components/Template/Preview/Navbar1';
import Services from '../components/Template/Form/Services';
import Testimonials from '../components/Template/Form/Testimonials';
import Subscription from '../components/Template/Form/Subscription';
import FAQs from '../components/Template/Form/FAQs';
import Instructors from '../components/Template/Form/Instructors';
import Policy from '../components/Template/Form/Policy';
import Contact from '../components/Template/Form/Contact';

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
          <div className="w-4/6 h-screen pt-[8rem]  bg-[#30AFBC] relative">
           
            {currentSection === 0 && <Navbar1 />}
            {currentSection === 1 && <Home1 />}
          </div>
          <div className="w-4/7 pt-[6rem]">
           
            {currentSection === 0 && <Company />}
            {currentSection === 1 && <Home />}
            {currentSection === 2 && <Services />}
            {currentSection === 3 && <Testimonials />}
            {currentSection === 4 && <Subscription />}
            {currentSection === 5 && <FAQs />}
            {currentSection === 6 && <Instructors />}
            {currentSection === 7 && <Policy />}
            {currentSection === 8 && <Contact />}
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


