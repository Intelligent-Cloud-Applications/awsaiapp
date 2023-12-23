
import React from 'react';
import './Footer.css';


function Footer({ currentSection, nextSection, prevSection, submitSections }) {
 
  const sections = [
    'COMPANY INFO',
    'HOME',
    'SERVICES',
    'TESTIMONIALS',
    'SUBSCRIPTION',
    'FAQS',
    'INSTRUCTORS',
    'POLICY',
    'CONTACT INFO',
  ];

  const progress = (currentSection / sections.length) * 100;

  return (
    <div className='footer-wrapper relative'>
      <div className='bg-white h-[4rem] footer flex justify-end items-center relative'>
        {/* Sections */}
        <div className='flex flex-row gap-6 absolute left-[6rem] right-0 top-4'>
          {sections.map((section, index) => (
            <div
              key={index}
              className={`text-xs relative ${
                index < currentSection ? 'text-black' : 'text-gray-400'
              }`}
              style={{ marginTop: '1.5rem' }} 
            >
              {section}
            </div>
          ))}
        </div>
        
        <div className='absolute bg-[#CDC0C0] bottom-[2rem] left-[6rem] w-[50%] h-[3px] z-40'>
          <div
            className='h-full bg-black rounded-lg'
            style={{
              width: `${progress || 1}%`, 
            }}
          />
        </div>
       
        <div className='absolute right-4 bottom-4'>
          {currentSection > 0 && (
            <button onClick={prevSection} className='bg-black mr-[21rem] text-white px-4 py-2 rounded-[2px]'>
              BACK
            </button>
          )}
          {currentSection < sections.length - 1 && (
            <button onClick={nextSection} className='bg-black text-white px-4 py-2 rounded-[2px]'>
              NEXT
            </button>
          )}
          {currentSection === sections.length - 1 && (
            <button onClick={submitSections} className='bg-black text-white px-4 py-2 rounded-[2px]'>
              SUBMIT
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Footer;
