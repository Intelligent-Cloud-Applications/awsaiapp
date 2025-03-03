import React, { useContext } from 'react';
import './Footer.css';
import { useNavigate } from 'react-router-dom';
import { API } from 'aws-amplify';
import Context from '../../context/Context';

function Footer({ currentSection, nextSection, prevSection, saveData, showModal, institutionId }) {
  console.log(institutionId)
  const UserCtx = useContext(Context)
  const Navigate = useNavigate();
  const sections = [
    'COMPANY INFO',
    'CONTACT INFO',
    'HOME',
    'SERVICES',
    'TESTIMONIALS',
    'SUBSCRIPTION',
    'FAQS',
    'POLICY',
  ];

  const handleNextClick = () => {
    saveData();
    nextSection();
  };

  const handlePrevClick = () => {
    showModal();
  };

  const handleBackClick = () => {
    Navigate("/dashboard");
  };

  const submitSections = async () => {
    nextSection();
    await API.put("clients", "/user/development-form/put-time/awsaiapp", {
      body: {
        submissiontime: new Date().getTime(),
      },
    });

    Navigate(`/pricing?institutionId=${encodeURIComponent(institutionId)}`, {
      state: {
        institutionId: institutionId,
        cognitoId: UserCtx.userData.cognitoId
      }
    });
  }

  return (
    <div className='footer-wrapper relative'>
      <div className="bg-white h-[4rem] footer flex justify-end items-center relative mt-10">
        <div className="absolute left-8 bottom-4 flex gap-4 [@media(max-width:1024px)]:left-1">
          {currentSection === 0 && (
            <button
              onClick={handleBackClick}
              className="bg-black w-24 text-white px-4 py-2 rounded-[2px] [@media(max-width:1024px)]:px-1 [@media(max-width:1024px)]:py-1 [@media(max-width:1024px)]:w-20"
            >
              BACK
            </button>
          )}
          {currentSection > 0 && (
            <button
              onClick={handlePrevClick}
              className="bg-black w-24 text-white px-4 py-2 rounded-[2px] [@media(max-width:1024px)]:px-1 [@media(max-width:1024px)]:py-1 [@media(max-width:1024px)]:w-20"
            >
              BACK
            </button>
          )}
        </div>
        <div className="absolute right-8 bottom-4 flex gap-4 [@media(max-width:1024px)]:right-1">
          {currentSection < sections.length - 1 && (
            <button
              onClick={handleNextClick}
              className="bg-black text-white px-4 py-2 w-24 rounded-[2px] [@media(max-width:1024px)]:px-1 [@media(max-width:1024px)]:py-1 [@media(max-width:1024px)]:w-20"
            >
              NEXT
            </button>
          )}
          {currentSection === sections.length - 1 && (
            <button
              onClick={submitSections}
              className="bg-black text-white px-4 py-2 w-24 rounded-[2px] [@media(max-width:1024px)]:px-1 [@media(max-width:1024px)]:py-1 [@media(max-width:1024px)]:w-20"
            >
              SUBMIT
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Footer;