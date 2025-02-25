import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCoffee, FiPhone, FiHome, FiStar, FiHeart } from 'react-icons/fi';
import Navbar from '../components/Home/Navbar';
import Footer from '../components/Cafe/Footer';
import Company from '../components/Cafe/Form/Company';
import Contact from '../components/Cafe/Form/Contact';
import Home from '../components/Cafe/Form/Home';
import Testimonials from '../components/Cafe/Form/Testimonials';
import { API, Storage } from "aws-amplify";
import PrevSectionDraftHandler from '../components/Cafe/Form/PrevSectionDraftHandler';
import Context from "../context/Context";
import "./Template.css";
import ErrorBoundary from '../components/ErrorBoundary';
import { convertFileToBase64, base64ToFile } from '../utils/imageUtils';

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
  }
];

const Cafe = () => {
    const navigate = useNavigate();
    const [currentSection, setCurrentSection] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const { userData, company } = useContext(Context);
    const util = useContext(Context).util;
    
    // Company state
    const [institutionid, setinstitutionid] = useState('');
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

    // Add these new states at the top with other states
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [socialMediaLinks, setSocialMediaLinks] = useState({
        facebook: '',
        instagram: '',
        youtube: ''
    });
    const [usefulLinks, setUsefulLinks] = useState([]);

    const validateLogoFile = (file) => {
        const MAX_SIZE = 5 * 1024 * 1024; // 5MB
        const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif'];
        
        if (!ALLOWED_TYPES.includes(file.type)) {
            throw new Error('Invalid file type. Please upload a JPEG, PNG, or GIF image.');
        }
        
        if (file.size > MAX_SIZE) {
            throw new Error('File is too large. Maximum size is 5MB.');
        }
        
        return true;
    };

    const uploadTestimonials = async () => {
        try {
            const updatedTestimonials = await Promise.all(
                testimonials.filter(t => t.name && t.feedback).map(async (testimonial, index) => {
                    if (testimonial.uploadedFile) {
                        const fileName = `testimonial_${index + 1}_${Date.now()}.${testimonial.uploadedFile.name.split('.').pop()}`;
                        const response = await Storage.put(
                            `${institutionid}/images/testimonials/${fileName}`,
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

    const handleNextSection = async () => {
        try {
            util.setLoader(true);

            switch (currentSection) {
                case 0: // Company
                    if (!institutionid?.trim() || !companyName?.trim() || (!selectedLogo && !logo)) {
                        alert('Please fill in all required fields: Institution ID, Company Name, and Logo');
                        util.setLoader(false);
                        return;
                    }
                    
                    if (!userData?.cognitoId) {
                        alert('Please login to continue');
                        navigate('/login');
                        util.setLoader(false);
                        return;
                    }

                    try {
                        // If we have a logo but no selectedLogo (loaded from localStorage)
                        let imageUrl;
                        if (selectedLogo) {
                            // Upload new logo
                            const fileName = `${userData.cognitoId}/${institutionid}/images/${selectedLogo.name}`;
                            const response = await Storage.put(fileName, selectedLogo, {
                                contentType: selectedLogo.type,
                                metadata: {
                                    cognitoId: userData.cognitoId,
                                    institutionid: institutionid
                                }
                            });
                            imageUrl = await Storage.get(response.key);
                            imageUrl = imageUrl.split("?")[0];
                        } else if (logo) {
                            // Use existing logo URL
                            imageUrl = logo;
                        }

                        // API call
                        await API.put("clients", '/user/cafewebDevForm', {
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: {
                                institutionid: institutionid.trim(),
                                index: "0",
                                companyName: companyName.trim(),
                                PrimaryColor,
                                SecondaryColor,
                                logoUrl: imageUrl,
                                LightPrimaryColor,
                                LightestPrimaryColor,
                                institutionType: "development",
                                createdBy: userData.cognitoId,
                                date: Date.now(),
                                PrivacyPolicy: [],
                                heroImage: null,
                                mission: {
                                    description1: "",
                                    description2: "",
                                    highlights: []
                                },
                                productTagline: "",
                                qrURL: null,
                                socialMediaLinks: {},
                                tagLine1: "",
                                tagLine2: "",
                                testimonials: [],
                                usefulLinks: [],
                                isFormFilled: true
                            }
                        });
                    } catch (error) {
                        console.error("Error in company section:", error);
                        alert('Error saving company information. Please try again.');
                        util.setLoader(false);
                        return;
                    }
                    break;

                case 1: // Contact
                    if (!contactInfo) {
                        alert('Please fill in contact information');
                        return false;
                    }

                    try {
                        const response = await API.put("clients", '/user/cafewebDevForm', {
                            body: {
                                institutionid,
                                contactInfo,
                                usefulLinks,
                                createdBy: userData?.cognitoId,
                                lastUpdated: Date.now()
                            }
                        });

                        if (response) {
                            // Save to localStorage
                            await saveData();
                            // Move to next section
                            setCurrentSection(prev => prev + 1);
                            return true;
                        }
                    } catch (error) {
                        throw new Error(`Error saving contact info: ${error.message}`);
                    }
                    break;

                case 2: // Home
                    if (!TagLine || !TagLine1 || !TagLine2) {
                        alert('Please fill in all taglines');
                        return;
                    }

                    try {
                        // Get existing data
                        const existingData = company?.details || {};
                        
                        let heroImageUrl = null;
                        if (heroImage) {
                            const fileName = `${institutionid}/images/hero/hero_${Date.now()}.${heroImage.name.split('.').pop()}`;
                            const uploadResponse = await Storage.put(fileName, heroImage, {
                                contentType: heroImage.type
                            });
                            heroImageUrl = await Storage.get(uploadResponse.key);
                            heroImageUrl = heroImageUrl.split("?")[0];
                        }

                        const updatedData = {
                            ...existingData,
                            institutionid,
                            TagLine,
                            TagLine1,
                            TagLine2,
                            TagLine3,
                            heroImageUrl,
                            createdBy: userData?.cognitoId,
                            isFormFilled: true,
                            lastUpdated: Date.now()
                        };

                        // Update API
                        await API.put("clients", '/user/cafewebDevForm', {
                            body: updatedData
                        });

                        // Update localStorage
                        const localData = loadFromLocalStorage() || {};
                        localStorage.setItem('cafeFormData', JSON.stringify({
                            ...localData,
                            ...updatedData
                        }));

                    } catch (error) {
                        console.error("Error in home section:", error);
                        alert('Error saving home information. Please try again.');
                        util.setLoader(false);
                        return;
                    }
                    break;

                case 3: // Testimonials
                    try {
                        util.setLoader(true);

                        // First validate all testimonials are filled
                        const incompleteTestimonials = testimonials.filter((t, index) => {
                            const missing = [];
                            
                            if (!t.customerName?.trim()) {
                                missing.push('Customer Name');
                            }
                            if (!t.text?.trim()) {
                                missing.push('Testimonial Text');
                            }
                            if (!t.imgSrc) {
                                missing.push('Customer Image');
                            }

                            if (missing.length > 0) {
                                alert(`Testimonial #${index + 1} is missing:\n${missing.join('\n')}\n\nPlease complete all required fields.`);
                                return true;
                            }
                            return false;
                        });

                        if (incompleteTestimonials.length > 0) {
                            util.setLoader(false);
                            return; // Stop here if any testimonial is incomplete
                        }

                        // All testimonials are valid, proceed with API submission
                        try {
                            // Process testimonials for API
                            const processedTestimonials = await Promise.all(
                                testimonials.map(async (t, index) => {
                                    let imageUrl = t.imgSrc;

                                    if (t.uploadedFile) {
                                        const fileName = `${institutionid}/images/testimonials/testimonial_${index + 1}_${Date.now()}.${t.uploadedFile.name.split('.').pop()}`;
                                        const response = await Storage.put(fileName, t.uploadedFile, {
                                            contentType: t.uploadedFile.type
                                        });
                                        imageUrl = await Storage.get(response.key);
                                        imageUrl = imageUrl.split("?")[0];
                                    }

                                    return {
                                        image: imageUrl,
                                        customerName: t.customerName.trim(),
                                        text: t.text.trim(),
                                        rating: t.rating || 5
                                    };
                                })
                            );

                            // API call
                            const apiResponse = await API.put("clients", '/user/cafewebDevForm', {
                                body: {
                                    institutionid,
                                    testimonials: processedTestimonials,
                                    createdBy: userData?.cognitoId,
                                    isFormFilled: true,
                                    lastUpdated: Date.now()
                                }
                            });

                            if (!apiResponse) {
                                throw new Error('Failed to submit testimonials');
                            }

                            // Success! Save to localStorage and proceed
                            await saveData();
                            setCurrentSection(prev => prev + 1);
                            return true;

                        } catch (error) {
                            throw new Error(`Error processing testimonials: ${error.message}`);
                        }

                    } catch (error) {
                        console.error("Error in testimonials section:", error);
                        alert('Error: ' + (error.message || 'Failed to save testimonials. Please try again.'));
                        return false;
                    } finally {
                        util.setLoader(false);
                    }
                    break;
            }

            await saveData();
            setCurrentSection(prev => prev + 1);

        } catch (error) {
            console.error("Error in section submission:", error);
            alert('An error occurred. Please try again.');
        } finally {
            util.setLoader(false);
        }
    };

    const saveData = async () => {
        try {
            // Wait for all testimonial image conversions to complete
            const processedTestimonials = await Promise.all(testimonials.map(async (t) => {
                let imageBase64 = '';
                if (t.uploadedFile) {
                    imageBase64 = await convertFileToBase64(t.uploadedFile);
                } else if (t.imgSrc && t.imgSrc.startsWith('data:image')) {
                    imageBase64 = t.imgSrc;
                }
                
                return {
                    customerName: t.customerName || t.name || '',
                    text: t.text || t.feedback || '',
                    rating: t.rating || 5,
                    imgSrc: t.imgSrc || '',
                    imageBase64
                };
            }));

            const dataToSave = {
                currentSection,
                companyName,
                institutionid,
                PrimaryColor,
                SecondaryColor,
                LightPrimaryColor,
                LightestPrimaryColor,
                contactInfo,
                usefulLinks,
                TagLine,
                TagLine1,
                TagLine2,
                TagLine3,
                selectedMedia,
                logo,
                testimonials: processedTestimonials,
                lastUpdated: Date.now()
            };

            localStorage.setItem('cafeFormData', JSON.stringify(dataToSave));
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };

    const handleSaveDraft = () => {
        saveData();
        navigate('/dashboard', { state: { section: 'institution-draft' } });
    };

    const handleClearData = async () => {
        try {
            if (institutionid) {
                await API.del(
                    "clients",
                    `/user/cafewebDevForm/delete-all/${institutionid}`
                );
            }
            
            localStorage.removeItem('cafeFormDraft');
            localStorage.removeItem('cafeFormData');
            setinstitutionid('');
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
        }
    };

    const loadFromLocalStorage = async () => {
        try {
            const savedData = JSON.parse(localStorage.getItem('cafeFormData') || '{}');
            
            // Load all saved data
            if (savedData) {
                // Company Info
                if (savedData.companyName) setCompanyName(savedData.companyName);
                if (savedData.institutionid) setinstitutionid(savedData.institutionid);
                if (savedData.PrimaryColor) setPrimaryColor(savedData.PrimaryColor);
                if (savedData.SecondaryColor) setSecondaryColor(savedData.SecondaryColor);
                if (savedData.LightPrimaryColor) setLightPrimaryColor(savedData.LightPrimaryColor);
                if (savedData.LightestPrimaryColor) setLightestPrimaryColor(savedData.LightestPrimaryColor);
                if (savedData.logo) setLogo(savedData.logo);

                // Contact Info
                if (savedData.contactInfo) {
                    setContactInfo(savedData.contactInfo);
                    setEmail(savedData.contactInfo.email || '');
                    setPhone(savedData.contactInfo.phone || '');
                }
                if (savedData.usefulLinks) setUsefulLinks(savedData.usefulLinks);
                if (savedData.socialMediaLinks) setSocialMediaLinks(savedData.socialMediaLinks);

                // Home Content
                if (savedData.TagLine) setTagLine(savedData.TagLine);
                if (savedData.TagLine1) setTagLine1(savedData.TagLine1);
                if (savedData.TagLine2) setTagLine2(savedData.TagLine2);
                if (savedData.TagLine3) setTagLine3(savedData.TagLine3);
                if (savedData.selectedMedia) setSelectedMedia(savedData.selectedMedia);

                // Testimonials
                if (savedData.testimonials?.length > 0) {
                    const loadedTestimonials = savedData.testimonials.map(t => ({
                        imgSrc: t.imgSrc || t.image || '',
                        customerName: t.customerName || t.name || '',
                        text: t.text || t.feedback || '',
                        rating: t.rating || 5,
                        uploadedFile: null,
                        ...(t.imageBase64 && {
                            imgSrc: t.imageBase64,
                            uploadedFile: base64ToFile(
                                t.imageBase64,
                                `testimonial_${Date.now()}.jpg`,
                                'image/jpeg'
                            )
                        })
                    }));
                    setTestimonials(loadedTestimonials);
                }

                // Current Section
                if (typeof savedData.currentSection === 'number') {
                    setCurrentSection(savedData.currentSection);
                }
            }
        } catch (error) {
            console.error('Error loading from localStorage:', error);
        }
    };

    useEffect(() => {
        loadFromLocalStorage();
    }, []); // Run only on mount

    useEffect(() => {
        const dataToSave = {
            companyName,
            institutionid,
            PrimaryColor,
            SecondaryColor,
            LightPrimaryColor,
            LightestPrimaryColor,
            email,
            phone,
            contactInfo,
            socialMediaLinks,
            usefulLinks,
            TagLine,
            TagLine1,
            TagLine2,
            TagLine3,
            selectedMedia,
            logoData: logo,
            currentSection,
            lastUpdated: Date.now()
        };

        localStorage.setItem('cafeFormData', JSON.stringify(dataToSave));
    }, [
        companyName,
        institutionid,
        PrimaryColor,
        SecondaryColor,
        LightPrimaryColor,
        LightestPrimaryColor,
        email,
        phone,
        contactInfo,
        socialMediaLinks,
        usefulLinks,
        TagLine,
        TagLine1,
        TagLine2,
        TagLine3,
        selectedMedia,
        logo,
        currentSection
    ]);

    // Add cleanup for object URLs
    useEffect(() => {
        return () => {
            if (logo && logo.startsWith('blob:')) {
                URL.revokeObjectURL(logo);
            }
            if (selectedMedia && selectedMedia.startsWith('blob:')) {
                URL.revokeObjectURL(selectedMedia);
            }
            testimonials.forEach(t => {
                if (t.imgSrc && t.imgSrc.startsWith('blob:')) {
                    URL.revokeObjectURL(t.imgSrc);
                }
            });
        };
    }, []);

    // Add cleanup effect
    useEffect(() => {
        return () => {
            // Clear localStorage when component unmounts
            if (currentSection === FORM_SECTIONS.length - 1) {
                localStorage.removeItem('cafeFormData');
            }
        };
    }, [currentSection]);

    // Add function to reset form
    const resetForm = useCallback(() => {
        // Reset all state to initial values
        setCurrentSection(0);
        setinstitutionid('');
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
        setTagLine3('');
        setHeroImage(null);
        setSelectedMedia(null);
        setEmail('');
        setPhone('');
        setSocialMediaLinks({
            facebook: '',
            instagram: '',
            youtube: ''
        });
        setUsefulLinks([]);

        // Clear localStorage
        localStorage.removeItem('cafeFormData');
    }, []);

    const renderSection = () => {
        switch (currentSection) {
            case 0:
                return (
                    <ErrorBoundary>
                        <Company
                            companyName={companyName || ''}
                            setCompanyName={setCompanyName}
                            institutionid={institutionid || ''}
                            setinstitutionid={setinstitutionid}
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
                    </ErrorBoundary>
                );
            
            case 1:
                return (
                    <ErrorBoundary>
                        <Contact
                            email={email || ''}
                            setEmail={setEmail}
                            phone={phone || ''}
                            setPhone={setPhone}
                            socialMediaLinks={socialMediaLinks}
                            setSocialMediaLinks={setSocialMediaLinks}
                            usefulLinks={usefulLinks}
                            setUsefulLinks={setUsefulLinks}
                            contactInfo={contactInfo}
                            setContactInfo={setContactInfo}
                            instagram={contactInfo?.instagram || ''}
                            setInstagram={(value) => setContactInfo(prev => ({ ...prev, instagram: value }))}
                            facebook={contactInfo?.facebook || ''}
                            setFacebook={(value) => setContactInfo(prev => ({ ...prev, facebook: value }))}
                            youTube={contactInfo?.youTube || ''}
                            setYouTube={(value) => setContactInfo(prev => ({ ...prev, youTube: value }))}
                        />
                    </ErrorBoundary>
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

            default:
                return null;
        }
    };

    const handlePrevSection = () => {
        try {
            if (currentSection > 0) {
                saveData();
                setCurrentSection(prev => prev - 1);
            } else {
                navigate('/dashboard');
            }
        } catch (error) {
            console.error("Error navigating back:", error);
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
                prevSection={handlePrevSection}
                saveData={saveData}
                showModal={() => setShowModal(true)}
                institutionId={institutionid}
                openModal={() => setShowModal(true)}
                testimonials={testimonials}
                sections={FORM_SECTIONS}
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