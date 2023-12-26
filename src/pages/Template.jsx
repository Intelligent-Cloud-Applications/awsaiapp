// Template.js
import React, { useState } from 'react';
import Navbar from '../components/Home/Navbar';
import Footer from '../components/Template/Footer';
import Preview from '../components/Template/Preview';
import Company from '../components/Template/Form/Company';
import Home from '../components/Template/Form/Home';
import Services from '../components/Template/Form/Services';
import Testimonials from '../components/Template/Form/Testimonials';
import Subscription from '../components/Template/Form/Subscription';
import FAQs from '../components/Template/Form/FAQs';
import Instructors from '../components/Template/Form/Instructors';
import Policy from '../components/Template/Form/Policy';
import Contact from '../components/Template/Form/Contact';

const Template = () => {
  const [currentSection, setCurrentSection] = useState(0);

  const handleNextSection = () => {
    setCurrentSection((prevSection) => {
      const nextSection = Math.min(prevSection + 1, 8);
      console.log(`Current Section: ${prevSection}, Next Section: ${nextSection}`);
      return nextSection;
    });
  };

  const handlePrevSection = () => {
    setCurrentSection((prevSection) => Math.max(prevSection - 1, 0));
  };

  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <div className="flex-grow flex">
        <div className="w-[65%] bg-[#30AFBC] pt-[8rem] relative h-[110rem]">
          <Preview currentSection={currentSection} />
        </div>
        <div className=" pt-[6rem] fixed right-10">
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
      <div style={{ position: 'fixed', width: '100%', bottom: 0, zIndex: 99 }}>
        <Footer
          currentSection={currentSection}
          nextSection={handleNextSection}
          prevSection={handlePrevSection}
        />
      </div>
    </div>
  );
};

export default Template;