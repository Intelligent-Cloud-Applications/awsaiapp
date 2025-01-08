import React, { useContext } from 'react';
import './Footer.css';
import { useNavigate } from 'react-router-dom';
import { API } from 'aws-amplify';
import Context from '../../context/Context';

function Footer({ currentSection, nextSection, prevSection, saveData, showModal, institutionId }) {
  // eslint-disable-next-line
  const UserCtx = useContext(Context)
  // const { userData, setUserData } = useContext(Context)
  const Navigate = useNavigate();
  const sections = [
    'COMPANY INFO',
    'CONTACT INFO',
    'HOME',
    'SERVICES',
    'TESTIMONIALS',
    'SUBSCRIPTION',
    'FAQS',
    // 'INSTRUCTORS',
    'POLICY',
  ];

  const progress = (currentSection / sections.length) * 100;

  const handleNextClick = () => {
    saveData();
    nextSection();
  };

  // eslint-disable-next-line
  const handlePrevClick = () => {
    // Trigger the modal
    showModal();
  };

  const handleBackClick = () => {
    Navigate("/dashboard")
  };
  const submitSections = async () => {
    // nextSection();
    await API.put("clients", "/user/development-form/put-time/awsaiapp", {
      body: {
        submissiontime: new Date().getTime(),
      },
    });
    Navigate("/dashboard");
    // setUserData(userData => ({ ...userData, web: true, isVerified: false }));
    // const baseUrl =
    //   process.env.REACT_APP_STAGE === 'PROD'
    //     ? 'http://happyprancer.com'
    //     : 'http://beta.happyprancer.com';
    const url = `http://happyprancer.com/allpayment/awsaiapp/${UserCtx.userData.cognitoId}/${UserCtx.userData.emailId}/${institutionId}`;
    // window.open(url);
    window.location.href = url;
  }

  return (
    <div className='footer-wrapper relative'>
      <div className="bg-white h-[4rem] footer flex justify-end items-center relative mt-10">
        <div className="absolute left-8 bottom-4 flex gap-4">
          {currentSection === 0 && (
            <button
              onClick={handleBackClick}
              className="bg-black w-24 text-white px-4 py-2 rounded-[2px]"
            >
              BACK
            </button>
          )}
          {currentSection > 0 && (
            <button
              onClick={handlePrevClick}
              className="bg-black w-24 text-white px-4 py-2 rounded-[2px]"
            >
              BACK
            </button>
          )}
        </div>
        <div>
          <div className='flex flex-row gap-[7em] max1320:gap-4 max1320:left-[4rem] absolute left-[14rem] right-0 top-4 max1250:hidden'>
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

          <div className='absolute bg-[#CDC0C0] bottom-[2rem] left-[16rem] max1320:left-[4rem] w-[72%] h-[3px] z-40 max1250:hidden'>
            <div
              className='h-full bg-black rounded-lg'
              style={{
                width: `${progress || 1}%`,
              }}
            />
          </div>
        </div>
        <div className="absolute right-8 bottom-4 flex gap-4">
          {currentSection < sections.length - 1 && (
            <button
              onClick={handleNextClick}
              className="bg-black text-white px-4 py-2 w-24 rounded-[2px]"
            >
              NEXT
            </button>
          )}
          {currentSection === sections.length - 1 && (
            <button
              onClick={submitSections}
              className="bg-black text-white px-4 py-2 w-24 rounded-[2px]"
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