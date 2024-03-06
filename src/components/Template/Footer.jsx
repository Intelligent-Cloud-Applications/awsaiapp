import React, { useContext } from 'react';
import './Footer.css';
import { useNavigate } from 'react-router-dom';
import { API } from 'aws-amplify';
import Context from '../../context/Context';

function Footer({ currentSection, nextSection, prevSection, saveData }) {
  // eslint-disable-next-line
  const { userData, setUserData } = useContext(Context)
  const Navigate = useNavigate();
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

  const handleNextClick = () => {
    saveData();
    nextSection();
  };

  // eslint-disable-next-line
  const handlePrevClick = () => {
    saveData();
    nextSection();

  };

  const submitSections = async () => {
    nextSection();
    await API.put("clients", "/user/development-form/put-time/awsaiapp", {
      body: {
        submissiontime: new Date().getTime(),
      },
    });
    Navigate("/pay");
    setUserData(userData => ({ ...userData, web: false, isVerified: false }));
  }

  return (
    <div className='footer-wrapper relative'>
      <div className='bg-white h-[4rem] footer flex justify-end items-center relative'>
        {/* Sections */}
        <div className='flex flex-row gap-6 max1320:gap-4 max1320:left-[4rem] absolute left-[6rem] right-0 top-4 max1250:hidden'>
          {sections.map((section, index) => (
            <div
              key={index}
              className={`text-xs relative ${index < currentSection ? 'text-black' : 'text-gray-400'
                }`}
              style={{ marginTop: '1.5rem' }}
            >
              {section}
            </div>
          ))}
        </div>

        <div className='absolute bg-[#CDC0C0] bottom-[2rem] left-[6rem] max1320:left-[4rem] w-[50%] h-[3px] z-40 max1250:hidden'>
          <div
            className='h-full bg-black rounded-lg'
            style={{
              width: `${progress || 1}%`,
            }}
          />
        </div>

        <div className='absolute right-4 bottom-4 flex gap-[19rem] max950:gap-[32rem] max767:gap-36 max406:gap-[2rem] '>
          {currentSection > 0 && (
            <button onClick={prevSection} className='bg-black w-24 text-white px-4 py-2 rounded-[2px]  '>
              BACK
            </button>
          )}
          {currentSection < sections.length - 1 && (
            <button onClick={handleNextClick} className='bg-black text-white px-4 py-2 w-24 rounded-[2px]'>
              NEXT
            </button>
          )}
          {currentSection === sections.length - 1 && (
            <button onClick={submitSections} className='bg-black text-white px-4 py-2 w-24 rounded-[2px] '>
              SUBMIT
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Footer;