import React, { useContext } from 'react';
import './Footer.css';
import { useNavigate } from 'react-router-dom';
import Context from '../../context/Context';
import { FiChevronLeft, FiChevronRight, FiCheck, FiX } from 'react-icons/fi';

function Footer({ 
    currentSection, 
    nextSection, 
    prevSection, 
    saveData, 
    showModal, 
    institutionId,
    sections
}) {
    const UserCtx = useContext(Context);
    const Navigate = useNavigate();
    
    const progress = ((currentSection + 1) / sections.length) * 100;

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const handleNextClick = async () => {
        try {
            // Save current data
            saveData();

            // Attempt to move to next section
            await nextSection();
            scrollToTop();
        } catch (error) {
            console.error("Error moving to next section:", error);
            alert("Error: " + (error.message || "Failed to proceed. Please try again."));
        } finally {
            UserCtx.util.setLoader(false);
        }
    };

    const handlePrevClick = () => {
        if (currentSection === 0) {
            // If we're on the first section, just navigate back without showing modal
            Navigate('/dashboard');
        } else {
            // For other sections, show the modal first
            showModal();
        }
    };

    const handleSubmit = async () => {
        try {
            UserCtx.util.setLoader(true);
            
            await nextSection();
            
            // Navigate to pricing page
            Navigate(`/pricing?institutionId=${institutionId}`, { 
                replace: true,
                state: { from: 'template2' }
            });
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Error: " + (error.message || "Failed to submit form. Please try again."));
        } finally {
            UserCtx.util.setLoader(false);
        }
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4">
                <div className="h-16 flex items-center justify-between gap-4">
                    {/* Back/Previous Button */}
                    <button
                        onClick={handlePrevClick}
                        className={`flex items-center gap-2 px-6 py-2 text-sm font-medium text-white bg-[#30afbc] rounded-lg hover:bg-[#2b9ea9] transition-colors ${currentSection === 0 ? 'border-2 border-white' : ''}`}
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
                                    key={section.id || index}
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
                            onClick={handleSubmit}
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