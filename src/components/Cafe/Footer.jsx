import React, { useContext } from 'react';
import './Footer.css';
import { useNavigate } from 'react-router-dom';
import Context from '../../context/Context';
import { FiChevronLeft, FiChevronRight, FiCheck } from 'react-icons/fi';
import PropTypes from 'prop-types';
import { createAdminAccounts } from './account';

function Footer({ 
    currentSection, 
    nextSection, 
    prevSection, 
    saveData, 
    showModal, 
    institutionId, 
    openModal,
    testimonials,
    sections,
    contactInfo
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
            UserCtx.util.setLoader(true);
            
            // Save current data
            saveData();

            // Attempt to move to next section
            const success = await nextSection();

            // If API call was successful, proceed to next section
            if (success) {
                scrollToTop();
            }
        } catch (error) {
            console.error("Error moving to next section:", error);
            alert("Error: " + (error.message || "Failed to proceed. Please try again."));
        } finally {
            UserCtx.util.setLoader(false);
        }
    };

    const handlePrevClick = () => {
        if (currentSection === 0) {
            // If we're on the first section, just open the modal
            openModal();
        } else {
            // For other sections, show the modal first
            openModal();
        }
    };

    const validateTestimonials = () => {
        if (!testimonials) return true;
        
        const incompleteTestimonials = testimonials.filter(t => {
            return !t.customerName?.trim() || !t.text?.trim();
        });

        if (incompleteTestimonials.length > 0) {
            alert('Please complete all testimonials before submitting.');
            return false;
        }
        return true;
    };

    const handleSubmit = async () => {
        try {
            if (!validateTestimonials()) return;

            UserCtx.util.setLoader(true);
            
            const success = await nextSection();

            if (success && currentSection === sections.length - 1) {
                // Create admin accounts after testimonial submission
                await createAdminAccounts({
                    institution: institutionId,
                    country: 'default',
                    admin1: {
                        cognitoId: UserCtx.userData.cognitoId,
                        emailId: UserCtx.userData.emailId,
                        phoneNumber: UserCtx.userData.phoneNumber || '',
                        userName: UserCtx.userData.userName
                    },
                    admin2: {
                        emailId: contactInfo.emailId,
                        phoneNumber: contactInfo.Query_PhoneNumber,
                        userName: `${contactInfo.firstName} ${contactInfo.lastName}`.trim()
                    }
                });

                const SecondaryColor = "#0000";
                const PrimaryColor = "#30afbc";
                const url = `https://happyprancer.com/allpayment/awsaiapp/${UserCtx.userData.cognitoId}/${UserCtx.userData.emailId}?primary=${PrimaryColor}&secondary=${SecondaryColor}&institutionId=${institutionId}`;
                
                // Clear form data
                localStorage.removeItem('cafeFormData');
                localStorage.removeItem('cafeFormLogo');
                localStorage.removeItem('heroImage');
                localStorage.removeItem('testimonialImages');
                localStorage.removeItem('cafeFormMissionBg');
                
                Navigate("/dashboard");
                window.open(url, '_blank');
            } else {
                scrollToTop();
            }
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
                        className="flex items-center gap-2 px-6 py-2 text-sm font-medium text-white bg-[#30afbc] rounded-lg hover:bg-[#2b9ea9] transition-colors"
                    >
                        <FiChevronLeft className="w-4 h-4" />
                        {currentSection === 0 ? 'BACK' : 'PREVIOUS'}
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

Footer.propTypes = {
    currentSection: PropTypes.number.isRequired,
    nextSection: PropTypes.func.isRequired,
    prevSection: PropTypes.func.isRequired,
    saveData: PropTypes.func.isRequired,
    showModal: PropTypes.func.isRequired,
    institutionId: PropTypes.string,
    openModal: PropTypes.func,
    testimonials: PropTypes.array,
    
    contactInfo: PropTypes.object.isRequired
};

export default Footer;