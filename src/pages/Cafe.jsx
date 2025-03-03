import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCoffee, FiPhone, FiHome, FiStar } from 'react-icons/fi';
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
import { compressImage } from '../utils/imageUtils';

// Define sections with icons
const FORM_SECTIONS = [
    { id: 'company', title: 'Company', description: 'Tell us about your company', icon: FiCoffee },
    { id: 'contact', title: 'Contact', description: 'How can customers reach you?', icon: FiPhone },
    { id: 'home', title: 'Home', description: 'Design your homepage', icon: FiHome },
    { id: 'testimonials', title: 'Testimonials', description: 'Share customer experiences', icon: FiStar }
];

const Cafe = () => {
    const navigate = useNavigate();
    const [currentSection, setCurrentSection] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const { userData } = useContext(Context);
    const util = useContext(Context).util;
    
    // Initialize contact info from localStorage if available
    const initializeContactInfo = () => {
        try {
            const savedData = JSON.parse(localStorage.getItem('cafeFormData') || '{}');
            console.log('Initializing contact info from saved data:', savedData);
            
            return {
                firstName: savedData.firstName || '',
                lastName: savedData.lastName || '',
                userName: savedData.userName || '',
                emailId: savedData.emailId || '',
                phoneNumber: savedData.Query_PhoneNumber || '',
                Query_PhoneNumber: savedData.Query_PhoneNumber || '',
                address: savedData.Query_Address || '',
                Query_Address: savedData.Query_Address || '',
                socialMediaLinks: savedData.socialMediaLinks || {
                    instagram: '',
                    facebook: '',
                    youtube: ''
                },
                visitUs: savedData.visitUs || {
                    locatemap: ''
                }
            };
        } catch (error) {
            console.error('Error initializing contact info:', error);
            return {
                firstName: '',
                lastName: '',
                userName: '',
                emailId: '',
                phoneNumber: '',
                Query_PhoneNumber: '',
                address: '',
                Query_Address: '',
                socialMediaLinks: {
                    instagram: '',
                    facebook: '',
                    youtube: ''
                },
                visitUs: {
                    locatemap: ''
                }
            };
        }
    };

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
    const [contactInfo, setContactInfo] = useState(initializeContactInfo);

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
    // const [socialMediaLinks, setSocialMediaLinks] = useState([...]);

    // const validateLogoFile = (file) => {
    //     const MAX_SIZE = 5 * 1024 * 1024; // 5MB
    //     const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif'];
        
    //     if (!ALLOWED_TYPES.includes(file.type)) {
    //         throw new Error('Invalid file type. Please upload a JPEG, PNG, or GIF image.');
    //     }
        
    //     if (file.size > MAX_SIZE) {
    //         throw new Error('File is too large. Maximum size is 5MB.');
    //     }
        
    //     return true;
    // };

    // const uploadTestimonials = async () => {
    //     try {
    //         const updatedTestimonials = await Promise.all(
    //             testimonials.filter(t => t.name && t.feedback).map(async (testimonial, index) => {
    //                 if (testimonial.uploadedFile) {
    //                     const fileName = `testimonial_${index + 1}_${Date.now()}.${testimonial.uploadedFile.name.split('.').pop()}`;
    //                     const response = await Storage.put(
    //                         `${institutionid}/images/testimonials/${fileName}`,
    //                         testimonial.uploadedFile,
    //                         { 
    //                             contentType: testimonial.uploadedFile.type,
    //                             acl: 'public-read'
    //                         }
    //                     );

    //                     let imageUrl = await Storage.get(response.key);
    //                     imageUrl = imageUrl.split("?")[0];

    //                     return {
    //                         image: imageUrl,
    //                         name: testimonial.name,
    //                         rating: testimonial.rating || 5,
    //                         text: testimonial.feedback
    //                     };
    //                 }
    //                 return testimonial;
    //             })
    //         );

    //         return updatedTestimonials.filter(t => t.name && t.feedback);
    //     } catch (error) {
    //         console.error("Error uploading testimonials:", error);
    //         throw error;
    //     }
    // };

    // Add this new function to fetch existing data
    const fetchExistingData = async () => {
        try {
            const response = await API.get("clients", `/user/cafewebDevForm/${institutionid}`);
            return response;
        } catch (error) {
            console.error("Error fetching existing data:", error);
            return null;
        }
    };

    const handleNextSection = async () => {
        try {
            util.setLoader(true);
            let success = true;

            // Load data from localStorage first
            const localStorageData = JSON.parse(localStorage.getItem('cafeFormData') || '{}');
            
            // Fetch existing data from API
            const existingData = await fetchExistingData();

            // Merge localStorage data with existing API data
            const baseData = {
                ...existingData,
                ...localStorageData
            };

            switch (currentSection) {
                case 0: // Company
                    if (!institutionid?.trim() || !companyName?.trim() || (!selectedLogo && !logo)) {
                        if (!institutionid?.trim()) alert("Please enter Institution ID");
                        if (!companyName?.trim()) alert("Please enter Company Name");
                        if (!selectedLogo && !logo) alert("Please upload Company Logo");
                        success = false;
                        break;
                    }

                    if (!userData?.cognitoId) {
                        alert('Please login to continue');
                        navigate('/login');
                        success = false;
                        break;
                    }

                    try {
                        // Process logo if exists
                        let logoUrl = null;
                        if (selectedLogo) {
                            try {
                                const compressedLogo = await compressImage(selectedLogo);
                                const fileName = `${userData.cognitoId}/${institutionid}/images/${selectedLogo.name}`;
                                const uploadResponse = await Storage.put(fileName, compressedLogo, {
                                    contentType: selectedLogo.type,
                                    metadata: {
                                        cognitoId: userData.cognitoId,
                                        institutionid: institutionid.trim()
                                    }
                                });
                                logoUrl = await Storage.get(uploadResponse.key);
                                logoUrl = logoUrl.split("?")[0];

                                // Save logo to localStorage for persistence
                                const logoBase64 = await convertFileToBase64(compressedLogo);
                                localStorage.setItem('cafeFormLogo', JSON.stringify({
                                    logo: logoBase64,
                                    fileName: selectedLogo.name
                                }));
                            } catch (uploadError) {
                                console.error("Error processing logo:", uploadError);
                                throw new Error('Failed to process logo. Please try again.');
                            }
                        } else if (logo) {
                            logoUrl = logo;
                        }

                        // Start with existing data from baseData (which includes localStorage data)
                        const existingData = {
                            index: baseData?.index || "0",
                            socialMediaLinks: baseData?.socialMediaLinks || {
                                instagram: '',
                                facebook: '',
                                youtube: ''
                            },
                            OurMissionBg: baseData?.OurMissionBg || '',
                            Query_PhoneNumber: baseData?.Query_PhoneNumber || '',
                            institutionid: baseData?.institutionid || institutionid.trim(),
                            emailId: baseData?.emailId || '',
                            isFormFilled: baseData?.isFormFilled || false,
                            LightestPrimaryColor: baseData?.LightestPrimaryColor || LightestPrimaryColor || "#f3fbfc",
                            createdBy: baseData?.createdBy || userData.cognitoId,
                            qrURL: baseData?.qrURL || '',
                            date: baseData?.date || Date.now(),
                            OurMission: baseData?.OurMission || '',
                            institutionType: baseData?.institutionType || "cafe",
                            visitUs: baseData?.visitUs || {
                                locatemap: ''
                            },
                            LightPrimaryColor: baseData?.LightPrimaryColor || LightPrimaryColor || "#e6f7f9",
                            PrivacyPolicy: baseData?.PrivacyPolicy || [],
                            SecondaryColor: baseData?.SecondaryColor || SecondaryColor || "#2b9ea9",
                            companyName: baseData?.companyName || companyName.trim(),
                            logoUrl: baseData?.logoUrl || '',
                            tagLine1: baseData?.tagLine1 || '',
                            userName: baseData?.userName || '',
                            tagLine2: baseData?.tagLine2 || '',
                            usefulLinks: baseData?.usefulLinks || [],
                            PrimaryColor: baseData?.PrimaryColor || PrimaryColor || "#30afbc",
                            heroImage: baseData?.heroImage || '',
                            Query_Address: baseData?.Query_Address || '',
                            productTagline: baseData?.productTagline || '',
                            testimonials: baseData?.testimonials || [
                                {
                                    rating: 5,
                                    imageBase64: "",
                                    text: "",
                                    imgSrc: "",
                                    customerName: ""
                                },
                                {
                                    rating: 5,
                                    imageBase64: "",
                                    text: "",
                                    imgSrc: "",
                                    customerName: ""
                                },
                                {
                                    rating: 5,
                                    imageBase64: "",
                                    text: "",
                                    imgSrc: "",
                                    customerName: ""
                                }
                            ]
                        };

                        // Update with current changes
                        const payload = {
                            index: existingData.index,
                            socialMediaLinks: existingData.socialMediaLinks,
                            OurMissionBg: existingData.OurMissionBg,
                            Query_PhoneNumber: existingData.Query_PhoneNumber,
                            institutionid: institutionid.trim(),
                            emailId: existingData.emailId,
                            isFormFilled: false,
                            LightestPrimaryColor: LightestPrimaryColor || existingData.LightestPrimaryColor,
                            createdBy: userData.cognitoId,
                            qrURL: existingData.qrURL,
                            date: Date.now(),
                            OurMission: existingData.OurMission,
                            institutionType: "cafe",
                            visitUs: existingData.visitUs,
                            LightPrimaryColor: LightPrimaryColor || existingData.LightPrimaryColor,
                            PrivacyPolicy: existingData.PrivacyPolicy,
                            SecondaryColor: SecondaryColor || existingData.SecondaryColor,
                            companyName: companyName.trim(),
                            logoUrl: logoUrl || existingData.logoUrl,
                            tagLine1: existingData.tagLine1,
                            userName: existingData.userName,
                            tagLine2: existingData.tagLine2,
                            usefulLinks: existingData.usefulLinks,
                            PrimaryColor: PrimaryColor || existingData.PrimaryColor,
                            heroImage: existingData.heroImage,
                            Query_Address: existingData.Query_Address,
                            productTagline: existingData.productTagline,
                            testimonials: existingData.testimonials
                        };

                        // Save to API
                        const response = await API.put("clients", '/user/cafewebDevForm', {
                            body: payload
                        });

                        if (!response) {
                            throw new Error('Failed to save company information');
                        }

                        // Update localStorage with merged data
                        localStorage.setItem('cafeFormData', JSON.stringify({
                            ...localStorageData,
                            ...payload
                        }));

                    } catch (error) {
                        console.error("Error in company section:", error);
                        alert('Error: ' + (error.message || 'Failed to save company information. Please try again.'));
                        success = false;
                    }
                    break;

                case 1: // Contact
                    if (!contactInfo) {
                        alert('Please fill in contact information');
                        success = false;
                        break;
                    }

                    try {
                        // Get existing data from localStorage
                        const existingData = JSON.parse(localStorage.getItem('cafeFormData') || '{}');

                        // Prepare contact data
                        const contactData = {
                            ...existingData,
                            institutionid,
                            emailId: contactInfo.emailId,
                            Query_PhoneNumber: contactInfo.phoneNumber,
                            Query_Address: contactInfo.address,
                            userName: `${contactInfo.firstName} ${contactInfo.lastName}`.trim(),
                            firstName: contactInfo.firstName,
                            lastName: contactInfo.lastName,
                            socialMediaLinks: {
                                instagram: contactInfo.socialMediaLinks?.instagram || '',
                                facebook: contactInfo.socialMediaLinks?.facebook || '',
                                youtube: contactInfo.socialMediaLinks?.youtube || ''
                            },
                            visitUs: {
                                locatemap: contactInfo.visitUs?.locatemap || ''
                            }
                        };

                        // Make API call
                        const response = await API.put("clients", '/user/cafewebDevForm', {
                            body: contactData
                        });

                        if (!response) {
                            throw new Error('Failed to save contact information');
                        }

                        // Save to localStorage
                        localStorage.setItem('cafeFormData', JSON.stringify(contactData));
                        success = true;

                    } catch (error) {
                        console.error("Error in contact section:", error);
                        alert('Error saving contact information. Please try again.');
                        success = false;
                    }
                    break;

                case 2: // Home
                    if (!TagLine || !TagLine1 || !TagLine2) {
                        if (!TagLine) alert("Please enter the main tagline");
                        if (!TagLine1) alert("Please enter tagline 1");
                        if (!TagLine2) alert("Please enter tagline 2");
                        success = false;
                        break;
                    }

                    try {
                        let heroImageUrl = null;
                        if (heroImage && heroImage instanceof File) {
                            try {
                                // Compress the hero image before uploading
                                const compressedHeroImage = await compressImage(heroImage);
                                
                                // Generate a unique file name for the hero image
                                const fileName = `${institutionid}/images/hero/hero_${Date.now()}.${heroImage.name.split('.').pop()}`;
                                
                                // Upload the hero image to AWS S3
                                const uploadResponse = await Storage.put(fileName, compressedHeroImage, {
                                    contentType: compressedHeroImage.type,
                                    metadata: {
                                        cognitoId: userData?.cognitoId,
                                        institutionid: institutionid
                                    }
                                });
                                
                                // Get the URL of the uploaded hero image
                                heroImageUrl = await Storage.get(uploadResponse.key);
                                heroImageUrl = heroImageUrl.split("?")[0];
                            } catch (uploadError) {
                                console.error("Error uploading hero image:", uploadError);
                                throw new Error('Failed to upload hero image. Please try again.');
                            }
                        }

                        // Prepare home section data
                        const homeData = {
                            ...baseData,
                            institutionid,
                            TagLine: TagLine.trim(),
                            TagLine1: TagLine1.trim(),
                            TagLine2: TagLine2.trim(),
                            TagLine3: TagLine3?.trim() || '',
                            heroImage: heroImageUrl, // Use the uploaded image URL
                            selectedMedia: selectedMedia || null,
                            createdBy: userData?.cognitoId,
                            isFormFilled: false,
                            lastUpdated: Date.now(),
                            section: 'home'
                        };

                        // Save to API
                        const response = await API.put("clients", '/user/cafewebDevForm', {
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: homeData
                        });

                        if (!response) {
                            throw new Error('Failed to save home section data');
                        }

                        // Update localStorage with the latest data
                        const updatedLocalStorage = {
                            ...localStorageData,
                            TagLine,
                            TagLine1,
                            TagLine2,
                            TagLine3,
                            heroImage: heroImageUrl, // Save the hero image URL to localStorage
                            selectedMedia,
                            lastUpdated: Date.now()
                        };
                        localStorage.setItem('cafeFormData', JSON.stringify(updatedLocalStorage));

                    } catch (error) {
                        console.error("Error in home section:", error);
                        alert('Error: ' + (error.message || 'Failed to save home section. Please try again.'));
                        success = false;
                    }
                    break;

                case 3: // Testimonials
                    try {
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
                            success = false;
                            return;
                        }

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

                        // Merge with base data
                        const testimonialData = {
                            ...baseData,
                            institutionid,
                            testimonials: processedTestimonials,
                            createdBy: userData?.cognitoId,
                            isFormFilled: false,
                            lastUpdated: Date.now()
                        };

                        const apiResponse = await API.put("clients", '/user/cafewebDevForm', {
                            body: testimonialData
                        });

                        if (!apiResponse) {
                            throw new Error('Failed to submit testimonials');
                        }

                        await saveData();
                        setCurrentSection(prev => prev + 1);
                        return true;

                    } catch (error) {
                        console.error("Error in testimonials section:", error);
                        alert('Error: ' + (error.message || 'Failed to save testimonials. Please try again.'));
                        success = false;
                    }
                    break;

                default:
                    console.log('Unknown section');
                    break;
            }

            if (success) {
                await saveData();
                setCurrentSection(prev => prev + 1);
                return true;
            }
            return false;

        } catch (error) {
            console.error("Error in section submission:", error);
            alert('An error occurred. Please try again.');
            return false;
        } finally {
            util.setLoader(false);
        }
    };

    const saveData = async () => {
        try {
            const existingData = JSON.parse(localStorage.getItem('cafeFormData') || '{}');
            
            const dataToSave = {
                ...existingData,
                // Company info
                institutionid,
                companyName,
                PrimaryColor,
                SecondaryColor,
                LightPrimaryColor,
                LightestPrimaryColor,
                logoUrl: logo,
                
                // Contact info
                firstName: contactInfo.firstName,
                lastName: contactInfo.lastName,
                emailId: contactInfo.emailId,
                Query_PhoneNumber: contactInfo.phoneNumber || contactInfo.Query_PhoneNumber,
                Query_Address: contactInfo.address || contactInfo.Query_Address,
                userName: contactInfo.userName,
                socialMediaLinks: contactInfo.socialMediaLinks,
                visitUs: contactInfo.visitUs,
                
                // Taglines
                productTagline: TagLine,
                tagLine1: TagLine1,
                tagLine2: TagLine2,
                TagLine3,
                
                // Media
                selectedMedia,
                heroImage: heroImage instanceof File ? null : heroImage, // Only save URL, not the File object
                
                // Testimonials
                testimonials: testimonials.map(t => ({
                    customerName: t.customerName || '',
                    text: t.text || '',
                    rating: t.rating || 5,
                    imgSrc: t.imgSrc || '',
                    imageBase64: t.imageBase64 || ''
                })),
                
                // Section and metadata
                currentSection,
                lastUpdated: Date.now()
            };

            localStorage.setItem('cafeFormData', JSON.stringify(dataToSave));
            console.log('Saved data to localStorage:', dataToSave);
            return true;
        } catch (error) {
            console.error('Error saving data:', error);
            return false;
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
                    `/user/cafe-form/delete-all/${institutionid}`
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
            setContactInfo({
                firstName: '',
                lastName: '',
                emailId: '',
                phoneNumber: '',
                address: '',
                userName: '',
                socialMediaLinks: {
                    instagram: '',
                    facebook: '',
                    youtube: ''
                },
                visitUs: {
                    locatemap: ''
                }
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
            const savedData = localStorage.getItem('cafeFormData');
            if (savedData) {
                const parsedData = JSON.parse(savedData);
                console.log('Loading data from localStorage:', parsedData);
                
                // Load company data
                setCompanyName(parsedData.companyName || '');
                setinstitutionid(parsedData.institutionid || '');
                setPrimaryColor(parsedData.PrimaryColor || '#30afbc');
                setSecondaryColor(parsedData.SecondaryColor || '#2b9ea9');
                setLightPrimaryColor(parsedData.LightPrimaryColor || '#e6f7f9');
                setLightestPrimaryColor(parsedData.LightestPrimaryColor || '#f3fbfc');
                
                // Load contact info
                const contactData = {
                    firstName: parsedData.firstName || '',
                    lastName: parsedData.lastName || '',
                    emailId: parsedData.emailId || '',
                    phoneNumber: parsedData.Query_PhoneNumber || '',
                    Query_PhoneNumber: parsedData.Query_PhoneNumber || '',
                    address: parsedData.Query_Address || '',
                    Query_Address: parsedData.Query_Address || '',
                    userName: parsedData.userName || '',
                    socialMediaLinks: parsedData.socialMediaLinks || {
                        instagram: '',
                        facebook: '',
                        youtube: ''
                    },
                    visitUs: parsedData.visitUs || {
                        locatemap: ''
                    }
                };
                setContactInfo(contactData);
                
                // Load taglines
                setTagLine(parsedData.productTagline || '');
                setTagLine1(parsedData.tagLine1 || '');
                setTagLine2(parsedData.tagLine2 || '');
                setTagLine3(parsedData.TagLine3 || '');
                
                // Load media
                setSelectedMedia(parsedData.selectedMedia || null);
                setLogo(parsedData.logoUrl || null);
                
                // Load testimonials
                if (parsedData.testimonials?.length > 0) {
                    const loadedTestimonials = parsedData.testimonials.map(t => ({
                        customerName: t.customerName || '',
                        text: t.text || '',
                        rating: t.rating || 5,
                        imgSrc: t.imgSrc || '',
                        imageBase64: t.imageBase64 || '',
                        uploadedFile: null
                    }));
                    setTestimonials(loadedTestimonials);
                }
                
                // Load current section
                setCurrentSection(parsedData.currentSection || 0);
            }
        } catch (error) {
            console.error('Error loading from localStorage:', error);
        }
    };

    useEffect(() => {
        loadFromLocalStorage();
    }, []); // Run only on mount

    // Add useEffect for automatic saving
    useEffect(() => {
        const autoSave = async () => {
            await saveData();
        };
        autoSave();
    }, [
        companyName,
        institutionid,
        PrimaryColor,
        SecondaryColor,
        LightPrimaryColor,
        LightestPrimaryColor,
        contactInfo,
        TagLine,
        TagLine1,
        TagLine2,
        TagLine3,
        selectedMedia,
        logo,
        testimonials,
        currentSection
    ]);

    // Add cleanup for object URLs
    useEffect(() => {
        const cleanup = () => {
            if (logo && typeof logo === 'string' && logo.startsWith('blob:')) {
                URL.revokeObjectURL(logo);
            }
            if (selectedMedia && typeof selectedMedia === 'string' && selectedMedia.startsWith('blob:')) {
                URL.revokeObjectURL(selectedMedia);
            }
            if (heroImage && typeof heroImage === 'string' && heroImage.startsWith('blob:')) {
                URL.revokeObjectURL(heroImage);
            }
            testimonials.forEach(testimonial => {
                if (testimonial.imgSrc && testimonial.imgSrc.startsWith('blob:')) {
                    URL.revokeObjectURL(testimonial.imgSrc);
                }
            });
        };

        return cleanup;
    }, [logo, selectedMedia, heroImage, testimonials]);

    // Add cleanup effect
    useEffect(() => {
        return () => {
            // Clear localStorage when component unmounts
            
        };
    }, [currentSection]);

    // Add function to reset form
    // const resetForm = useCallback(() => {
    //     // Reset all state to initial values
    //     setCurrentSection(0);
    //     setinstitutionid('');
    //     setCompanyName('');
    //     setLogo(null);
    //     setSelectedLogo(null);
    //     setPrimaryColor('#30afbc');
    //     setSecondaryColor('#2b9ea9');
    //     setLightPrimaryColor('#e6f7f9');
    //     setLightestPrimaryColor('#f3fbfc');
    //     setTagLine('');
    //     setTagLine1('');
    //     setTagLine2('');
    //     setContactInfo({
    //         instagram: '',
    //         facebook: '',
    //         youTube: ''
    //     });
    //     setTestimonials([
    //         { imgSrc: '', name: '', feedback: '', rating: 5, uploadedFile: null },
    //         { imgSrc: '', name: '', feedback: '', rating: 5, uploadedFile: null },
    //         { imgSrc: '', name: '', feedback: '', rating: 5, uploadedFile: null }
    //     ]);
    //     setTagLine3('');
    //     setHeroImage(null);
    //     setSelectedMedia(null);
    //     setEmail('');
    //     setPhone('');
    //     setSocialMediaLinks({
    //         facebook: '',
    //         instagram: '',
    //         youtube: ''
    //     });
    //     setUsefulLinks([]);

    //     // Clear localStorage
    //     localStorage.removeItem('cafeFormData');
    // }, []);

    // Add a function to clear all form data
    const clearAllFormData = () => {
        // Clear all form states
        setCompanyName('');
        setinstitutionid('');
        setPrimaryColor('');
        setSecondaryColor('');
        setLightPrimaryColor('');
        setLightestPrimaryColor('');
        setLogo(null);
        setSelectedLogo(null);
        setTagLine('');
        setTagLine1('');
        setTagLine2('');
        setTagLine3('');
        setHeroImage(null);
        setSelectedMedia(null);
        setTestimonials(Array(5).fill({
            customerName: '',
            text: '',
            rating: 5,
            imgSrc: '',
            uploadedFile: null
        }));

        // Clear all localStorage data
        localStorage.removeItem('cafeFormData');
        localStorage.removeItem('cafeFormLogo');
        localStorage.removeItem('heroImageData');
        localStorage.removeItem('testimonialImages');

        // Clear any blob URLs
        if (selectedLogo && selectedLogo.startsWith('blob:')) {
            URL.revokeObjectURL(selectedLogo);
        }
        if (selectedMedia && selectedMedia.startsWith('blob:')) {
            URL.revokeObjectURL(selectedMedia);
        }
        testimonials.forEach(testimonial => {
            if (testimonial.imgSrc && testimonial.imgSrc.startsWith('blob:')) {
                URL.revokeObjectURL(testimonial.imgSrc);
            }
        });
    };

    const handlePrevSection = () => {
        if (currentSection > 0) {
            setCurrentSection(prev => prev - 1);
        }
    };

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
                            contactInfo={contactInfo}
                            setContactInfo={setContactInfo}
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
                showModal={setShowModal}
                institutionId={institutionid}
                openModal={() => setShowModal(true)}
                testimonials={testimonials}
                sections={FORM_SECTIONS}
                contactInfo={contactInfo}
            />

            <PrevSectionDraftHandler
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onClear={handleClearData}
                onSaveDraft={handleSaveDraft}
                onContinue={() => {
                    if (currentSection === 0) {
                        navigate('/dashboard');
                    } else {
                        handlePrevSection();
                    }
                    setShowModal(false);
                }}
            />
        </div>
    );
};

export default Cafe;