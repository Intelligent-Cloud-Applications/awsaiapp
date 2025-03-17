import React, { useContext } from 'react';
import './Footer.css';
import { useNavigate } from 'react-router-dom';
import { API } from 'aws-amplify';
import Context from '../../context/Context';
import { FiChevronLeft, FiChevronRight, FiCheck, FiX } from 'react-icons/fi';

function Footer({ currentSection, nextSection, prevSection, saveData, showModal, institutionId }) {
  const UserCtx = useContext(Context);
  const Navigate = useNavigate();
  const sections = [
    { id: 'company', title: 'COMPANY INFO' },
    { id: 'contact', title: 'CONTACT INFO' },
    { id: 'home', title: 'HOME' },
    { id: 'services', title: 'SERVICES' },
    { id: 'testimonials', title: 'TESTIMONIALS' },
    { id: 'subscription', title: 'SUBSCRIPTION' },
    { id: 'faqs', title: 'FAQS' },
    { id: 'policy', title: 'POLICY' }
  ];

  const progress = ((currentSection + 1) / sections.length) * 100;

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
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="h-16 flex items-center justify-between gap-4">
          {/* Back/Previous Button */}
          <button
            onClick={currentSection === 0 ? handleBackClick : handlePrevClick}
            className="flex items-center gap-2 px-6 py-2 text-sm font-medium text-white bg-[#30afbc] rounded-lg hover:bg-[#2b9ea9] transition-colors"
          >
            {currentSection === 0 ? (
              <>
                <FiX className="w-4 h-4" />
                CLOSE
              </>
            ) : (
              <>
                <FiChevronLeft className="w-4 h-4" />
                PREVIOUS
              </>
            )}
          </button>

          {/* Progress Section */}
          <div className="flex-1 max-w-3xl">
            <div className="hidden md:flex items-center justify-between mb-2">
              {sections.map((section, index) => (
                <div
                  key={section.id}
                  className={`flex items-center gap-2 text-sm font-medium
                    ${index === currentSection ? 'text-[#30afbc]' : 
                      index < currentSection ? 'text-[#2b9ea9]' : 'text-gray-400'}`}
                >
                  {index < currentSection && (
                    <FiCheck className="w-4 h-4 text-[#30afbc]" />
                  )}
                  {section.title}
                </div>
              ))}
            </div>
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#30afbc] rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Next/Submit Button */}
          {currentSection === sections.length - 1 ? (
            <button
              onClick={submitSections}
              className="flex items-center gap-2 px-6 py-2 text-sm font-medium text-white bg-[#30afbc] rounded-lg hover:bg-[#2b9ea9] transition-colors"
            >
              SUBMIT
              <FiCheck className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleNextClick}
              className="flex items-center gap-2 px-6 py-2 text-sm font-medium text-white bg-[#30afbc] rounded-lg hover:bg-[#2b9ea9] transition-colors"
            >
              NEXT
              <FiChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Footer;