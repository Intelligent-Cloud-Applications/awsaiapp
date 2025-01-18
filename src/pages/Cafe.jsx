import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCoffee, FiPhone, FiHome, FiShield, FiStar } from 'react-icons/fi';
import Navbar from '../components/Home/Navbar';
import Footer from '../components/Cafe/Footer';
import Company from '../components/Cafe/Form/Company';
import Home from '../components/Cafe/Form/Home';
import Policy from '../components/Cafe/Form/Policy';
import Contact from '../components/Cafe/Form/Contact';
import Testimonials from '../components/Cafe/Form/Testimonials';
import { API, Storage } from "aws-amplify";
import PrevSectionDraftHandler from '../components/Cafe/Form/PrevSectionDraftHandler';
import Context from "../context/Context";
import "./Template.css";

// Form section titles and descriptions
const FORM_SECTIONS = [
  {
    title: "Company Details",
    description: "Build your brand identity with essential company details",
    icon: FiCoffee
  },
  {
    title: "Contact Information",
    description: "Help customers reach you through various channels",
    icon: FiPhone
  },
  {
    title: "Homepage Content",
    description: "Create an engaging landing page for your visitors",
    icon: FiHome
  },
  {
    title: "Policies & Values",
    description: "Share your café's story and commitment to excellence",
    icon: FiShield
  },
  {
    title: "Testimonials",
    description: "Showcase what your customers say about your café",
    icon: FiStar
  }
];

const Cafe = () => {
    const Navigate = useNavigate();
    const [currentSection, setCurrentSection] = useState(0);
    const [savedData, setsavedData] = useState();

    console.log("🚀 ~ file: Cafe.jsx:21 ~ Cafe ~ savedData:", savedData)
    // const [Companydata, setCompanydata] = useState([]);
    const [logo, setLogo] = useState(null);
    const titleOfCountBanner = ["Patients", "Dentists", "Appointments"];
    const [countBanner, setCountBanner] = useState(
        titleOfCountBanner.map(title => ({ count: '', title }))
    );
    const [LightPrimaryColor, setLightPrimaryColor] = useState("#225c59");
    const [LightestPrimaryColor, setLightestPrimaryColor] = useState("#c3f3f1");
    // const [logo, setLogo] = useState(null);
    const [companyName, setCompanyName] = useState(null);
    const [companyDescription, setCompanyDescription] = useState(null);
    const [institutionId, setinstitutionId] = useState(null);
    const [PrimaryColor, setPrimaryColor] = useState("#1B7571");
    const [SecondaryColor, setSecondaryColor] = useState("#000000");
    // const [countryCode, setCountryCode] = useState("INR");
    // const [country, setCountry] = useState("India");
    const [TagLine, setTagLine] = useState("");
    const [TagLine1, setTagLine1] = useState("");
    const [TagLine2, setTagLine2] = useState("");
    const [TagLine3, setTagLine3] = useState("");
    const [video, setVideo] = useState(null);
    const [aboutImage, setAboutImage] = useState([]);
    const [selectedMedia, setSelectedMedia] = useState(null);
    const [values, setValues] = useState([]);
    const [mediaType, setMediaType] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const { userData } = useContext(Context)
    const [testimonials, setTestimonials] = useState([
        { imgSrc: '', name: '', feedback: '', uploadedFile: null, type: '' },
        { imgSrc: '', name: '', feedback: '', uploadedFile: null, type: '' },
        { imgSrc: '', name: '', feedback: '', uploadedFile: null, type: '' },
    ]);

    // const calculateDuration = (subscriptionType) => {
    //   const daysInMonth = 30; // assuming 30 days in a month

    //   if (subscriptionType === 'monthly') {
    //     return daysInMonth * 24 * 60 * 60 * 1000; // convert days to milliseconds
    //   } else if (subscriptionType === 'weekly') {
    //     return 7 * 24 * 60 * 60 * 1000; // convert days to milliseconds
    //   } else if (subscriptionType === 'yearly') {
    //     return 365 * 24 * 60 * 60 * 1000; // convert days to milliseconds
    //   }

    //   return 0;
    // };
    // const [subscriptions, setSubscriptions] = useState([

    //   {
    //     heading: '',
    //     amount: '',
    //     currency: 'INR',
    //     country: 'INDIA',
    //     subscriptionType: 'monthly',
    //     provides: [''],
    //     duration: calculateDuration('monthly'),
    //     durationText: 'Monthly',
    //     india: true,
    //   },
    //   {
    //     heading: '',
    //     amount: '',
    //     currency: 'INR',
    //     country: 'INDIA',
    //     subscriptionType: 'monthly',
    //     provides: [''],
    //     duration: calculateDuration('monthly'),
    //     durationText: 'Monthly',
    //     india: true,
    //   },
    //   {
    //     heading: '',
    //     amount: '',
    //     currency: 'INR',
    //     country: 'INDIA',
    //     subscriptionType: 'monthly',
    //     provides: [''],
    //     duration: calculateDuration('monthly'),
    //     durationText: 'Monthly',
    //     india: true,
    //   },
    // ]);


    // const [faqs, setFaqs] = useState([
    //   {
    //     question: '',
    //     answer: '',
    //   },
    //   {
    //     question: '',
    //     answer: '',
    //   },
    //   {
    //     question: '',
    //     answer: '',
    //   },
    //   {
    //     question: '',
    //     answer: '',
    //   },
    //   {
    //     question: '',
    //     answer: '',
    //   },
    // ]);

    const [policies, setPolicies] = useState({
        'Privacy Policy': [""],
        'About Us': [""],
    });

    const [contactInfo, setContactInfo] = useState({
        address: '',
        country: 'India',
        countryCode: '91',
        owner_name: '',
        phoneNumber: '',
        email: '',
        upiId: '',
        instagram: '',
        facebook: '',
        youTube: '',
        'Establishment Year of Company': '',
    });

    const util = useContext(Context).util;
    useEffect(() => {
        console.log(policies);
    }, [policies]);

    const uploadTestimonials = async () => {
        const updatedTestimonials = await Promise.all(
            testimonials.map(async (testimonial, index) => {
                if (testimonial.uploadedFile) {
                    // Upload the file to S3 with public read access
                    const response = await Storage.put(
                        `${institutionId}/images/Testimonial/${testimonial.uploadedFile.name}`,
                        testimonial.actualFile,
                        { 
                            contentType: testimonial.actualFile.type,
                            acl: 'public-read'
                        }
                    );

                    // Get the URL of the uploaded file
                    let imageUrl = await Storage.get(response.key);
                    imageUrl = imageUrl.split("?")[0];

                    // Update the testimonial with the image URL
                    return { ...testimonial, imgSrc: imageUrl };
                }
                return testimonial;
            })
        );

        setTestimonials(updatedTestimonials);
    };

    const handleSubmitForm = async () => {
        try {
            util.setLoader(true);

            // Upload logo
            const logoResponse = await Storage.put(
                `${institutionId}/images/${logo.name}`,
                logo,
                { 
                    contentType: logo.type,
                    acl: 'public-read'  // Make file publicly readable
                }
            );
            const logoUrl = (await Storage.get(logoResponse.key)).split('?')[0];

            // Upload video as hero image
            const videoResponse = await Storage.put(
                `${institutionId}/videos/${video.name}`,
                video,
                { 
                    contentType: video.type,
                    acl: 'public-read'  // Make file publicly readable
                }
            );
            const heroImage = (await Storage.get(videoResponse.key)).split('?')[0];

            // Prepare request body according to the Lambda function schema
            const requestBody = {
                institutionid: institutionId,
                index: "0",  // Added index as required by Lambda
                companyName,
                PrimaryColor,
                SecondaryColor,
                logoUrl,
                LightPrimaryColor,
                LightestPrimaryColor,
                PrivacyPolicy: policies['Privacy Policy'],
                heroImage,
                mission: companyDescription,
                productTagline: TagLine,
                qrURL: null,
                socialMediaLinks: {
                    facebook: contactInfo?.facebook || null,
                    instagram: contactInfo?.instagram || null,
                    youtube: contactInfo?.youTube || null
                },
                tagLine1: TagLine1,
                tagLine2: TagLine2,
                testimonials: testimonials.map(t => ({
                    name: t.name,
                    feedback: t.feedback,
                    image: t.imgSrc
                })),
                usefulLinks: values,
                isFormFilled: true  // Added as required by Lambda
            };

            console.log("Submitting form with data:", requestBody);

            // Make API call with proper headers
            const response = await API.put("clients", "/user/cafewebDevForm", {
                body: requestBody,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'
                }
            });

            console.log("Form submitted successfully:", response);
            
            // Show success message and navigate
            Navigate('/dashboard', { 
                state: { 
                    success: true, 
                    message: 'Form submitted successfully!' 
                }
            });

            return response;
        } catch (error) {
            console.error("Error submitting form:", error);
            let errorMessage = "Error submitting form. Please try again.";
            
            if (error.response) {
                console.log("Error response:", error.response);
                errorMessage = error.response.data?.message || errorMessage;
            }
            
            alert(errorMessage);
            throw error;
        } finally {
            util.setLoader(false);
        }
    };


    // const fetchClients = async (institution) => {
    //   try {
    //     //      setLoader(true);
    //     const response = await API.get("clients", "/user/development-form/get-time/awsaiapp");
    //     //      console.log(response)
    //     setCompanydata(response);
    //   } catch (error) {
    //     console.error("Error fetching clients:", error);
    //   } finally {
    //     //      setLoader(false);
    //   }
    // };

    // useEffect(() => {
    //   fetchClients();
    //   //    console.log("The daTa are fetching!");
    // }, []);


    const handleNextSection = async () => {
        try {
            util.setLoader(true);
            let canProceed = true;

            switch (currentSection) {
                case 0: // Company Info
                    if (!companyName || !institutionId || !logo || !companyDescription) {
                        alert("Please fill in all required fields in Company Info");
                        canProceed = false;
                        break;
                    }

                    // Check if institution exists
                    try {
                        // First, validate institution ID format
                        if (!/^[a-zA-Z0-9-_]+$/.test(institutionId)) {
                            alert("Institution ID can only contain letters, numbers, hyphens, and underscores");
                            canProceed = false;
                            break;
                        }

                        const checkResponse = await API.get("clients", "/user/check-cafe", {
                            queryStringParameters: {
                                institutionid: institutionId,
                                index: "0"
                            },
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json',
                                'Access-Control-Allow-Origin': '*',
                                'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'
                            }
                        });
                        
                        console.log("Institution check response:", checkResponse);
                        
                        if (checkResponse && checkResponse.exists) {
                            alert("This institution ID already exists. Please use a different ID.");
                            canProceed = false;
                        }
                    } catch (error) {
                        console.error("Error checking institution:", error);
                        let errorMessage = "Error checking institution. Please try again.";
                        
                        if (error.response) {
                            console.log("Error response:", error.response);
                            errorMessage = error.response.data?.message || errorMessage;
                        } else if (error.message) {
                            errorMessage = error.message;
                        }
                        
                        alert(errorMessage);
                        canProceed = false;
                    }
                    break;

                case 1: // Contact Info
                    if (!contactInfo.phoneNumber || !contactInfo.email || !contactInfo.owner_name) {
                        alert("Please fill in all required contact information");
                        canProceed = false;
                        break;
                    }

                    // Validate phone number and email
                    const phoneRegex = /^[0-9]{10}$/;
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                    if (!phoneRegex.test(contactInfo.phoneNumber)) {
                        alert("Please enter a valid 10-digit phone number");
                        canProceed = false;
                        break;
                    }

                    if (!emailRegex.test(contactInfo.email)) {
                        alert("Please enter a valid email address");
                        canProceed = false;
                        break;
                    }
                    break;

                case 2: // Home Content
                    if (!TagLine || !video) {
                        alert("Please provide both tagline and video");
                        canProceed = false;
                    }
                    break;

                case 3: // Policy
                    // Validate count banner
                    if (countBanner.some(item => !item.count)) {
                        alert("Please fill in all count banner values");
                        canProceed = false;
                        break;
                    }

                    // Validate policies
                    if (!policies['Privacy Policy'].length || !policies['About Us'].length) {
                        alert("Please add at least one point to each policy section");
                        canProceed = false;
                        break;
                    }

                    // Validate values
                    if (!values.length) {
                        alert("Please add at least one company value");
                        canProceed = false;
                    }
                    break;

                case 4: // Testimonials & Final Submit
                    // Validate testimonials
                    const validTestimonials = testimonials.filter(
                        t => t.name && t.feedback && t.uploadedFile
                    );
                    if (validTestimonials.length < 3) {
                        alert("Please complete all three testimonials with name, feedback, and image");
                        canProceed = false;
                        break;
                    }

                    if (canProceed) {
                        try {
                            // Upload files first
                            await uploadTestimonials();
                            
                            // Submit the form
                            await handleSubmitForm();
                            
                            // Navigate to success page or dashboard
                            Navigate('/dashboard', { 
                                state: { 
                                    success: true, 
                                    message: 'Form submitted successfully!' 
                                }
                            });
                            return;
                        } catch (error) {
                            console.error("Error submitting form:", error);
                            alert("Error submitting form. Please try again.");
                            canProceed = false;
                        }
                    }
                    break;

                default:
                    break;
            }

            if (canProceed) {
                setCurrentSection(prev => Math.min(prev + 1, 4));
            }
        } catch (error) {
            console.error("Error in handleNextSection:", error);
            let errorMessage = "An error occurred. Please try again.";
            
            if (error.response) {
                errorMessage = error.response.data?.message || errorMessage;
            } else if (error.message) {
                errorMessage = error.message;
            }
            
            alert(errorMessage);
        } finally {
            util.setLoader(false);
        }
    };

    const saveData = () => {
        setsavedData({});
        //    console.log("Saved Trigger")
    };

    // const handlePrevSection = () => {
    //   setCurrentSection((prevSection) => Math.max(prevSection - 1, 0));
    // };
    const [showModal, setShowModal] = useState(false);
    const handleSaveDraft = () => {
        Navigate('/dashboard', { state: { section: 'institution-draft' } });
    };

    const handleClearData = async () => {
        try {
            util.setLoader(true);
            await API.del(
                "clients",
                `/user/cafewebDevForm/delete-all/${institutionId}`);
            alert('All Data deleted successfully');
            util.setLoader(false);
            Navigate('/dashboard');
        } catch (error) {
            alert('No matching data found', error);
            util.setLoader(false);
        }
    };
    const handlePrevSectionDraft = () => {
        setShowModal(true);
    };
    const handleCloseModal = () => {
        setShowModal(false);
    };
    return (
        <div className="flex flex-col min-h-screen bg-[#F8F9FA]">
            {/* Navbar - Fixed at top */}
            <Navbar className="fixed top-0 w-full z-50" />

            {/* Progress Bar - Fixed below navbar */}
            <div className="fixed top-[64px] left-0 w-full h-1 bg-gray-100 z-40">
                <motion.div 
                    className="h-full bg-gradient-to-r from-teal-600 to-teal-500"
                    initial={{ width: "0%" }}
                    animate={{ width: `${(currentSection / 4) * 100}%` }}
                    transition={{ duration: 0.5 }}
                />
            </div>

            {/* Main Content Area */}
            <main className="flex-grow pt-24 pb-32 px-4 md:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto w-full">
                    {/* Section Header */}
                    <motion.div
                        className="text-center mb-8 md:mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="inline-flex items-center justify-center p-2 mb-4 rounded-full bg-teal-50">
                            {React.createElement(FORM_SECTIONS[currentSection].icon, {
                                className: "w-6 h-6 text-teal-600"
                            })}
                        </div>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                            {FORM_SECTIONS[currentSection].title}
                        </h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            {FORM_SECTIONS[currentSection].description}
                        </p>
                    </motion.div>

                    {/* Form Content */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentSection}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 lg:p-10"
                        >
                            {currentSection === 0 && (
                                <Company
                                    companyName={companyName}
                                    setCompanyName={setCompanyName}
                                    institutionId={institutionId}
                                    setinstitutionId={setinstitutionId}
                                    PrimaryColor={PrimaryColor}
                                    setPrimaryColor={setPrimaryColor}
                                    SecondaryColor={SecondaryColor}
                                    setSecondaryColor={setSecondaryColor}
                                    logo={logo}
                                    setLogo={setLogo}
                                    LightestPrimaryColor={LightestPrimaryColor}
                                    setLightestPrimaryColor={setLightestPrimaryColor}
                                    LightPrimaryColor={LightPrimaryColor}
                                    setLightPrimaryColor={setLightPrimaryColor}
                                    selectedFile={selectedFile}
                                    setSelectedFile={setSelectedFile}
                                    companyDescription={companyDescription}
                                    setCompanyDescription={setCompanyDescription}
                                />
                            )}
                            {currentSection === 1 && (
                                <Contact
                                    contactInfo={contactInfo}
                                    setContactInfo={setContactInfo}
                                />
                            )}
                            {currentSection === 2 && (
                                <Home
                                    TagLine={TagLine}
                                    setTagLine={setTagLine}
                                    TagLine1={TagLine1}
                                    setTagLine1={setTagLine1}
                                    video={video}
                                    setVideo={setVideo}
                                    selectedMedia={selectedMedia}
                                    setSelectedMedia={setSelectedMedia}
                                    mediaType={mediaType}
                                    setMediaType={setMediaType}
                                    TagLine2={TagLine2}
                                    setTagLine2={setTagLine2}
                                    TagLine3={TagLine3}
                                    setTagLine3={setTagLine3}
                                />
                            )}
                            {currentSection === 3 && (
                                <Policy
                                    countBanner={countBanner}
                                    setCountBanner={setCountBanner}
                                    titleOfCountBanner={titleOfCountBanner}
                                    values={values}
                                    setValues={setValues}
                                    policies={policies}
                                    setPolicies={setPolicies}
                                    aboutImage={aboutImage}
                                    setAboutImage={setAboutImage}
                                />
                            )}
                            {currentSection === 4 && (
                                <Testimonials
                                    testimonials={testimonials}
                                    setTestimonials={setTestimonials}
                                />
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>

            {/* Footer Navigation - Fixed at bottom */}
            <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 py-4 z-40">
                <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
                    {/* Timeline */}
                    <div className="relative mb-4">
                        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -translate-y-1/2"></div>
                        <div className="relative flex justify-between">
                            {['COMPANY INFO', 'CONTACT INFO', 'HOME', 'ABOUT', 'TESTIMONIAL'].map((label, index) => (
                                <div key={index} className="flex flex-col items-center">
                                    <div 
                                        className={`w-4 h-4 rounded-full mb-2 transition-colors relative z-10 
                                        ${index <= currentSection ? 'bg-teal-600' : 'bg-gray-300'}`}
                                    >
                                        {index <= currentSection && (
                                            <div className="absolute inset-0 rounded-full bg-teal-600/20 animate-ping"></div>
                                        )}
                                    </div>
                                    <span className={`text-xs font-medium ${
                                        index === currentSection 
                                            ? 'text-teal-600' 
                                            : index < currentSection 
                                                ? 'text-gray-600' 
                                                : 'text-gray-400'
                                    }`}>
                                        {label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex items-center justify-between mt-4">
                        <button
                            onClick={handlePrevSectionDraft}
                            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back
                        </button>

                        <div className="flex gap-4">
                            <button
                                onClick={() => setShowModal(true)}
                                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                                </svg>
                                Save Draft
                            </button>

                            <button
                                onClick={handleNextSection}
                                className="flex items-center gap-2 px-6 py-2 text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors"
                            >
                                {currentSection === 4 ? 'Submit' : 'Next'}
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            <PrevSectionDraftHandler
                isOpen={showModal}
                onClose={handleCloseModal}
                onClear={handleClearData}
                onSaveDraft={handleSaveDraft}
            />
        </div>
    );
};

export default Cafe;