import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCoffee, FiPhone, FiHome, FiStar, FiHeart } from 'react-icons/fi';
import Navbar from '../components/Home/Navbar';
import Footer from '../components/Cafe/Footer';
import Company from '../components/Cafe/Form/Company';
import Contact from '../components/Cafe/Form/Contact';
import Home from '../components/Cafe/Form/Home';
import Testimonials from '../components/Cafe/Form/Testimonials';
import Values from '../components/Cafe/Form/Values';
import { API, Storage } from "aws-amplify";
import PrevSectionDraftHandler from '../components/Cafe/Form/PrevSectionDraftHandler';
import Context from "../context/Context";
import "./Template.css";

// Form section titles and descriptions
const FORM_SECTIONS = [
  {
    title: "Company Info",
    description: "Build your brand identity with essential company details",
    icon: FiCoffee
  },
  {
    title: "Contact Details",
    description: "Add your contact information and social media links",
    icon: FiPhone
  },
  {
    title: "Homepage Content",
    description: "Create engaging content for your website's homepage",
    icon: FiHome
  },
  {
    title: "Testimonials",
    description: "Share what your customers say about you",
    icon: FiStar
  },
  {
    title: "Our Values",
    description: "Share your company's core values",
    icon: FiHeart
  }
];

const Cafe = () => {
    const navigate = useNavigate();
    const [currentSection, setCurrentSection] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const { userData, company } = useContext(Context);
    const util = useContext(Context).util;
    
    // Company state
    const [institutionId, setInstitutionId] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [logo, setLogo] = useState(null);
    const [selectedLogo, setSelectedLogo] = useState(null);
    const [PrimaryColor, setPrimaryColor] = useState('#30afbc');
    const [SecondaryColor, setSecondaryColor] = useState('#2b9ea9');
    const [LightPrimaryColor, setLightPrimaryColor] = useState('#e6f7f9');
    const [LightestPrimaryColor, setLightestPrimaryColor] = useState('#f3fbfc');
    const [TagLine, setTagLine] = useState('');
    const [TagLine1, setTagLine1] = useState('');
    const [TagLine2, setTagLine2] = useState('');
    const [values, setValues] = useState(['', '', '']);
    const [contactInfo, setContactInfo] = useState({
        instagram: '',
        facebook: '',
        youTube: ''
    });

    // Testimonials state
    const [testimonials, setTestimonials] = useState([
        { imgSrc: '', name: '', feedback: '', rating: 5, uploadedFile: null },
        { imgSrc: '', name: '', feedback: '', rating: 5, uploadedFile: null },
        { imgSrc: '', name: '', feedback: '', rating: 5, uploadedFile: null }
    ]);

    // Add new states for Home component
    const [TagLine3, setTagLine3] = useState('');
    const [heroImage, setHeroImage] = useState(null);
    const [selectedMedia, setSelectedMedia] = useState(null);

    // Add states for Values component
    const [valueTitle, setValueTitle] = useState('');
    const [valueDescription, setValueDescription] = useState('');
    const [valueContent, setValueContent] = useState('');

    const uploadTestimonials = async () => {
        try {
            const updatedTestimonials = await Promise.all(
                testimonials.filter(t => t.name && t.feedback).map(async (testimonial, index) => {
                    if (testimonial.uploadedFile) {
                        const fileName = `testimonial_${index + 1}_${Date.now()}.${testimonial.uploadedFile.name.split('.').pop()}`;
                        const response = await Storage.put(
                            `${institutionId}/images/testimonials/${fileName}`,
                            testimonial.uploadedFile,
                            { 
                                contentType: testimonial.uploadedFile.type,
                                acl: 'public-read'
                            }
                        );

                        let imageUrl = await Storage.get(response.key);
                        imageUrl = imageUrl.split("?")[0];

                        return {
                            image: imageUrl,
                            name: testimonial.name,
                            rating: testimonial.rating || 5,
                            text: testimonial.feedback
                        };
                    }
                    return testimonial;
                })
            );

            return updatedTestimonials.filter(t => t.name && t.feedback);
        } catch (error) {
            console.error("Error uploading testimonials:", error);
            throw error;
        }
    };

    const handleSubmitForm = async () => {
        try {
            util.setLoader(true);
            console.log("Starting form submission...");
    
            // Upload logo if exists
            let logoUrl = null;
            if (selectedLogo && selectedLogo.name) {
                try {
                    const fileExtension = selectedLogo.name.includes('.') ? selectedLogo.name.split('.').pop() : 'png';
                    const fileName = `logo_${Date.now()}.${fileExtension}`;
                    console.log("Uploading logo with filename:", fileName);
    
                    const uploadResponse = await Storage.put(fileName, logo, {
                        contentType: logo.type,
                    });
    
                    if (uploadResponse && uploadResponse.key) {
                        logoUrl = await Storage.get(uploadResponse.key);
                        if (logoUrl) {
                            logoUrl = logoUrl.split("?")[0]; // Ensure URL is clean
                            console.log("Logo uploaded successfully:", logoUrl);
                        } else {
                            console.error("Logo URL retrieval failed.");
                            throw new Error("Failed to retrieve uploaded logo URL.");
                        }
                    } else {
                        console.error("Storage.put response is invalid:", uploadResponse);
                        throw new Error("Logo upload failed.");
                    }
                } catch (logoError) {
                    console.error("Error uploading logo:", logoError);
                    alert("Logo upload failed. Please try again.");
                    throw logoError;
                }
            } else {
                console.warn("No logo selected, proceeding without uploading.");
            }
    
            // Upload testimonials
            const processedTestimonials = await uploadTestimonials();
    
            // Prepare request body
            const requestBody = {
                institutionid: institutionId ,
                index: "0",
                companyName,
                institutionType: "cafe",
                isDelivered: false,
                isFormFilled: true,
                LightPrimaryColor,
                LightSecondaryColor: LightestPrimaryColor,
                logoUrl,
                mission: {
                    description1: TagLine1,
                    description2: TagLine2,
                    highlights: values.filter(Boolean)
                },
                PrimaryColor,
                productTagline: TagLine,
                SecondaryColor,
                socialMediaLinks: [
                    contactInfo?.instagram && {
                        icon: "instagram-icon-url",
                        platform: "Instagram",
                        url: contactInfo.instagram
                    },
                    contactInfo?.facebook && {
                        icon: "facebook-icon-url",
                        platform: "Facebook",
                        url: contactInfo.facebook
                    },
                    contactInfo?.youTube && {
                        icon: "youtube-icon-url",
                        platform: "YouTube",
                        url: contactInfo.youTube
                    }
                ].filter(Boolean), // Ensure valid links
    
                Table: null,
                tagLine1: TagLine1,
                tagLine2: TagLine2,
                testimonials: processedTestimonials,
                usefulLinks: [
                    {
                        style: { color: "white", textDecoration: "none" },
                        title: "Awsaiapp",
                        url: "https://awsaiapp.com"
                    },
                    {
                        onClick: "Navigate => Navigate('/product')",
                        style: { color: "white", textDecoration: "none" },
                        title: "Product"
                    },
                    contactInfo?.instagram && {
                        style: { color: "white", textDecoration: "none" },
                        title: "Instagram",
                        url: contactInfo.instagram
                    }
                ].filter(Boolean), // Ensure valid links
    
                date: new Date().toISOString(),
                createdBy: userData?.cognitoId || null
            };
    
            console.log("Submitting form with payload:", requestBody);
    
            // Send API request
            const response = await API.put("clients", '/user/cafewebDevForm', {
                body: requestBody,
            });
    
            console.log("Form submitted successfully:", response);
            localStorage.removeItem('cafeFormDraft');
    
            // Navigate to dashboard on success
            navigate('/dashboard', {
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
                console.log("Error response details:", error.response);
                errorMessage = error.response.data?.message || errorMessage;
            } else if (error.message) {
                errorMessage = error.message;
            }
    
            alert(errorMessage);
            throw error;
        } finally {
            util.setLoader(false);
            console.log("Form submission process completed.");
        }
    };
    

    const handleNextSection = async () => {
        try {
            util.setLoader(true);
            
            switch (currentSection) {
                case 0: // Company
                    if (!institutionId || !companyName || !selectedLogo) {
                        alert('Please fill in all required fields');
                        return;
                    }
                    break;

                case 1: // Contact
                    if (!contactInfo.email || !contactInfo.phone) {
                        alert('Please fill in required contact information');
                        return;
                    }
                    break;

                case 2: // Home
                    if (!TagLine || !heroImage) {
                        alert('Please fill in homepage content');
                        return;
                    }
                    break;

                case 3: // Testimonials
                    const validTestimonials = testimonials.filter(t => 
                        t.name && t.feedback && t.uploadedFile
                    ).length;
                    if (validTestimonials < 3) {
                        alert('Please add at least 3 testimonials');
                        return;
                    }
                    break;

                case 4: // Values
                    if (!valueTitle || !valueContent) {
                        alert('Please fill in your company values');
                        return;
                    }
                    await handleSubmitForm();
                    return;

                default:
                    break;
            }

            setCurrentSection(prev => prev + 1);
        } catch (error) {
            console.error("Error in section submission:", error);
        } finally {
            util.setLoader(false);
        }
    };

    const saveData = () => {
        const formData = {
            companyName,
            institutionId,
            PrimaryColor,
            SecondaryColor,
            logo,
            selectedLogo,
            LightPrimaryColor,
            LightestPrimaryColor,
            TagLine,
            TagLine1,
            TagLine2,
            values,
            contactInfo,
            testimonials
        };
        
        localStorage.setItem('cafeFormDraft', JSON.stringify(formData));
        alert('Draft saved successfully!');
    };

    const handleSaveDraft = () => {
        saveData();
        navigate('/dashboard', { state: { section: 'institution-draft' } });
    };

    const handleClearData = async () => {
        try {
            util.setLoader(true);
            if (institutionId) {
                await API.del(
                    "clients",
                    `/user/cafewebDevForm/delete-all/${institutionId}`
                );
            }
            
            localStorage.removeItem('cafeFormDraft');
            setInstitutionId('');
            setCompanyName('');
            setLogo(null);
            setSelectedLogo(null);
            setPrimaryColor('#30afbc');
            setSecondaryColor('#2b9ea9');
            setLightPrimaryColor('#e6f7f9');
            setLightestPrimaryColor('#f3fbfc');
            setTagLine('');
            setTagLine1('');
            setTagLine2('');
            setValues(['', '', '']);
            setContactInfo({
                instagram: '',
                facebook: '',
                youTube: ''
            });
            setTestimonials([
                { imgSrc: '', name: '', feedback: '', rating: 5, uploadedFile: null },
                { imgSrc: '', name: '', feedback: '', rating: 5, uploadedFile: null },
                { imgSrc: '', name: '', feedback: '', rating: 5, uploadedFile: null }
            ]);
            
            alert('All data cleared successfully');
            navigate('/dashboard');
        } catch (error) {
            console.error("Error clearing data:", error);
            alert('Error clearing data. Please try again.');
        } finally {
            util.setLoader(false);
        }
    };

    useEffect(() => {
        const fetchCompanyData = async () => {
            try {
                util.setLoader(true);
                if (company?.details) {
                    const details = company.details;
                    
                    // Set company details from context
                    setCompanyName(details.companyName || '');
                    setInstitutionId(details.institutionid || '');
                    setPrimaryColor(details.PrimaryColor || '#30afbc');
                    setSecondaryColor(details.SecondaryColor || '#2b9ea9');
                    setLightPrimaryColor(details.LightPrimaryColor || '#e6f7f9');
                    setLightestPrimaryColor(details.LightestPrimaryColor || '#f3fbfc');
                    
                    // Handle logo
                    if (details.logoUrl) {
                        setLogo(details.logoUrl);
                        // You might need to fetch the actual file if needed
                        try {
                            const response = await fetch(details.logoUrl);
                            const blob = await response.blob();
                            const file = new File([blob], 'logo.png', { type: blob.type });
                            setSelectedLogo(file);
                        } catch (error) {
                            console.error("Error fetching logo file:", error);
                        }
                    }
                }
            } catch (error) {
                console.error("Error fetching company data:", error);
            } finally {
                util.setLoader(false);
            }
        };

        fetchCompanyData();
    }, [company?.details, util]);

    useEffect(() => {
        const loadData = async () => {
            // First try to load from company details
            if (company?.details) {
                // ... existing company data loading ...
                
                // Load additional data
                if (company.details.tagLine3) setTagLine3(company.details.tagLine3);
                if (company.details.heroImage) setHeroImage(company.details.heroImage);
                if (company.details.values) {
                    setValueTitle(company.details.values.title || '');
                    setValueDescription(company.details.values.description || '');
                    setValueContent(company.details.values.content || '');
                }
                return; // Skip loading from draft if we have company details
            }

            // Then try to load from draft
            const savedDraft = localStorage.getItem('cafeFormDraft');
            if (savedDraft) {
                try {
                    const parsedData = JSON.parse(savedDraft);
                    setCompanyName(parsedData.companyName || '');
                    setInstitutionId(parsedData.institutionId || '');
                    setPrimaryColor(parsedData.PrimaryColor || '#30afbc');
                    setSecondaryColor(parsedData.SecondaryColor || '#2b9ea9');
                    setLogo(parsedData.logo || null);
                    setSelectedLogo(parsedData.selectedLogo || null);
                    setLightPrimaryColor(parsedData.LightPrimaryColor || '#e6f7f9');
                    setLightestPrimaryColor(parsedData.LightestPrimaryColor || '#f3fbfc');
                    setTagLine(parsedData.TagLine || '');
                    setTagLine1(parsedData.TagLine1 || '');
                    setTagLine2(parsedData.TagLine2 || '');
                    setValues(parsedData.values || ['', '', '']);
                    setContactInfo(parsedData.contactInfo || {
                        instagram: '',
                        facebook: '',
                        youTube: ''
                    });
                    setTestimonials(parsedData.testimonials || [
                        { imgSrc: '', name: '', feedback: '', rating: 5, uploadedFile: null },
                        { imgSrc: '', name: '', feedback: '', rating: 5, uploadedFile: null },
                        { imgSrc: '', name: '', feedback: '', rating: 5, uploadedFile: null }
                    ]);
                } catch (error) {
                    console.error("Error loading draft:", error);
                    localStorage.removeItem('cafeFormDraft');
                }
            }
        };

        loadData();
    }, [company?.details]);

    const renderSection = () => {
        switch (currentSection) {
            case 0:
                return (
                    <Company
                        companyName={companyName}
                        setCompanyName={setCompanyName}
                        institutionId={institutionId}
                        setInstitutionId={setInstitutionId}
                        PrimaryColor={PrimaryColor}
                        setPrimaryColor={setPrimaryColor}
                        SecondaryColor={SecondaryColor}
                        setSecondaryColor={setSecondaryColor}
                        LightPrimaryColor={LightPrimaryColor}
                        setLightPrimaryColor={setLightPrimaryColor}
                        LightestPrimaryColor={LightestPrimaryColor}
                        setLightestPrimaryColor={setLightestPrimaryColor}
                        logo={logo}
                        setLogo={setLogo}
                        selectedLogo={selectedLogo}
                        setSelectedLogo={setSelectedLogo}
                    />
                );
            
            case 1:
                return (
                    <Contact
                        contactInfo={contactInfo}
                        setContactInfo={setContactInfo}
                        instagram={contactInfo.instagram}
                        setInstagram={(value) => setContactInfo(prev => ({ ...prev, instagram: value }))}
                        facebook={contactInfo.facebook}
                        setFacebook={(value) => setContactInfo(prev => ({ ...prev, facebook: value }))}
                        youTube={contactInfo.youTube}
                        setYouTube={(value) => setContactInfo(prev => ({ ...prev, youTube: value }))}
                    />
                );

            case 2:
                return (
                    <Home
                        TagLine={TagLine}
                        setTagLine={setTagLine}
                        TagLine1={TagLine1}
                        setTagLine1={setTagLine1}
                        TagLine2={TagLine2}
                        setTagLine2={setTagLine2}
                        TagLine3={TagLine3}
                        setTagLine3={setTagLine3}
                        heroImage={heroImage}
                        setHeroImage={setHeroImage}
                        selectedMedia={selectedMedia}
                        setSelectedMedia={setSelectedMedia}
                    />
                );

            case 3:
                return (
                    <Testimonials
                        testimonials={testimonials}
                        setTestimonials={setTestimonials}
                    />
                );

            case 4:
                return (
                    <Values
                        title={valueTitle}
                        setTitle={setValueTitle}
                        description={valueDescription}
                        setDescription={setValueDescription}
                        content={valueContent}
                        setContent={setValueContent}
                    />
                );

            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-[#F8F9FA]">
            <Navbar className="fixed top-0 w-full z-50" />

            <div className="fixed top-[64px] left-0 w-full h-1 bg-gray-100 z-40">
                <motion.div 
                    className="h-full bg-gradient-to-r from-teal-600 to-teal-500"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.5 }}
                />
            </div>

            <main className="flex-grow pt-24 pb-32 px-4 md:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto w-full">
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

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentSection}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 lg:p-10"
                        >
                            {renderSection()}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>

            <Footer 
                currentSection={currentSection}
                nextSection={handleNextSection}
                prevSection={() => navigate(-1)}
                saveData={saveData}
                showModal={() => setShowModal(true)}
            />

            <PrevSectionDraftHandler
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onClear={handleClearData}
                onSaveDraft={handleSaveDraft}
            />
        </div>
    );
};

export default Cafe;