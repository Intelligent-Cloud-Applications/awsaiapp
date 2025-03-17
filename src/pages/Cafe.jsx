import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
import { convertFileToBase64 } from '../utils/imageUtils';
import { compressImage } from '../utils/imageUtils';

// Define sections with icons
const FORM_SECTIONS = [
    { id: 'company', title: 'Company'},
    { id: 'contact', title: 'Contact' },
    { id: 'home', title: 'Home'},
    { id: 'testimonials', title: 'Testimonials' }
];

const Cafe = () => {
    const navigate = useNavigate();
    const [currentSection, setCurrentSection] = useState(() => {
        try {
            const savedSection = localStorage.getItem('cafeCurrentSection');
            return savedSection ? parseInt(savedSection, 10) : 0;
        } catch (error) {
            console.error('Error loading current section:', error);
            return 0;
        }
    });
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
                    locationMap: ''
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
                    locationMap: ''
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
    const [tagLine1, settagLine1] = useState(() => {
        try {
            const savedData = JSON.parse(localStorage.getItem('cafeFormData') || '{}');
            return savedData.tagLine1 || '';
        } catch (error) {
            console.error('Error initializing tagLine1:', error);
            return '';
        }
    });
    const [tagLine2, settagLine2] = useState(() => {
        try {
            const savedData = JSON.parse(localStorage.getItem('cafeFormData') || '{}');
            return savedData.tagLine2 || '';
        } catch (error) {
            console.error('Error initializing tagLine2:', error);
            return '';
        }
    });
    const [productTagline, setProductTagline] = useState(() => {
        try {
            const savedData = JSON.parse(localStorage.getItem('cafeFormData') || '{}');
            return savedData.productTagline || '';
        } catch (error) {
            console.error('Error initializing productTagline:', error);
            return '';
        }
    });
    const [contactInfo, setContactInfo] = useState(initializeContactInfo);
    const [ourMissionBg, setourMissionBg] = useState(null);
    const [selectedMissionBg, setSelectedMissionBg] = useState(null);

    // Testimonials state
    const [testimonials, setTestimonials] = useState([
        { imgSrc: '', name: '', feedback: '', rating: 5, uploadedFile: null },
        { imgSrc: '', name: '', feedback: '', rating: 5, uploadedFile: null },
        { imgSrc: '', name: '', feedback: '', rating: 5, uploadedFile: null }
    ]);

    // Add new states for Home component
    const [heroImage, setHeroImage] = useState(() => {
        try {
            const heroImageData = JSON.parse(localStorage.getItem('cafeFormHeroImage') || '{}');
            return heroImageData.heroImageUrl || null;
        } catch (error) {
            console.error('Error initializing heroImage:', error);
            return null;
        }
    });

    // Add this state to track the S3 URL specifically
    const [heroImageS3Url, setHeroImageS3Url] = useState(() => {
        try {
            const heroImageData = JSON.parse(localStorage.getItem('cafeFormHeroImage') || '{}');
            return heroImageData.heroImageUrl || null;
        } catch (error) {
            console.error('Error initializing heroImageS3Url:', error);
            return null;
        }
    });

    // Wrap setHeroImage in useCallback
    const handleSetHeroImage = useCallback((value) => {
        setHeroImage(value);
    }, []);

    const [selectedMedia, setSelectedMedia] = useState(() => {
        try {
            const heroImageData = JSON.parse(localStorage.getItem('cafeFormHeroImage') || '{}');
            return heroImageData.heroImage || null;
        } catch (error) {
            console.error('Error initializing selectedMedia:', error);
            return null;
        }
    });

    // Wrap setSelectedMedia in useCallback
    const handleSetSelectedMedia = useCallback((value) => {
        setSelectedMedia(value);
    }, []);

    // Wrap tagline setters in useCallback
    const handleSetTagLine1 = useCallback((value) => {
        settagLine1(value);
        try {
            const currentData = JSON.parse(localStorage.getItem('cafeFormData') || '{}');
            localStorage.setItem('cafeFormData', JSON.stringify({
                ...currentData,
                tagLine1: value
            }));
        } catch (error) {
            console.error('Error saving tagLine1:', error);
        }
    }, []);

    const handleSetTagLine2 = useCallback((value) => {
        settagLine2(value);
        try {
            const currentData = JSON.parse(localStorage.getItem('cafeFormData') || '{}');
            localStorage.setItem('cafeFormData', JSON.stringify({
                ...currentData,
                tagLine2: value
            }));
        } catch (error) {
            console.error('Error saving tagLine2:', error);
        }
    }, []);

    const handleSetProductTagline = useCallback((value) => {
        setProductTagline(value);
        try {
            const currentData = JSON.parse(localStorage.getItem('cafeFormData') || '{}');
            localStorage.setItem('cafeFormData', JSON.stringify({
                ...currentData,
                productTagline: value
            }));
        } catch (error) {
            console.error('Error saving productTagline:', error);
        }
    }, []);

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

    // Save current section to localStorage whenever it changes
    useEffect(() => {
        try {
            localStorage.setItem('cafeCurrentSection', currentSection.toString());
        } catch (error) {
            console.error('Error saving current section:', error);
        }
    }, [currentSection]);

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

                    // Validate company name format
                    if (!/^[a-zA-Z0-9\s]+$/.test(companyName)) {
                        alert("Company name can only contain letters, numbers, and spaces");
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

                                // Save both logo and logoUrl to localStorage
                                const logoBase64 = await convertFileToBase64(compressedLogo);
                                localStorage.setItem('cafeFormLogo', JSON.stringify({
                                    logo: logoBase64,
                                    logoUrl: logoUrl, // Save the URL here
                                    fileName: selectedLogo.name
                                }));
                            } catch (uploadError) {
                                console.error("Error processing logo:", uploadError);
                                throw new Error('Failed to process logo. Please try again.');
                            }
                        }

                        const payload = {
                            ...baseData,
                            institutionid: institutionid.trim(),
                            companyName: companyName.trim(),
                            logoUrl: logoUrl || baseData.logoUrl || '',
                            logo: logo || '',
                            PrimaryColor: PrimaryColor || baseData.PrimaryColor || "#30afbc",
                            SecondaryColor: SecondaryColor || baseData.SecondaryColor || "#2b9ea9",
                            LightPrimaryColor: LightPrimaryColor || baseData.LightPrimaryColor || "#e6f7f9",
                            LightestPrimaryColor: LightestPrimaryColor || baseData.LightestPrimaryColor || "#f3fbfc",
                            createdBy: userData.cognitoId,
                            isFormFilled: false,
                            lastUpdated: Date.now()
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
                            ...payload,
                            logoUrl: logoUrl || baseData.logoUrl || '' // Ensure logoUrl is saved
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
                        const logoData = JSON.parse(localStorage.getItem('cafeFormLogo') || '{}');
                        const heroImageData = JSON.parse(localStorage.getItem('cafeFormHeroImage') || '{}');

                        // Get the correct URLs
                        const currentLogoUrl = logoData.logoUrl || existingData.logoUrl || baseData.logoUrl || '';
                        const currentHeroImageUrl = heroImageData.heroImageUrl || existingData.heroImage || baseData.heroImage || '';

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
                                locationMap: contactInfo.visitUs?.locationMap || ''
                            },
                            logoUrl: currentLogoUrl,
                            logo: logoData.logo || existingData.logo || '',
                            heroImage: currentHeroImageUrl,
                            heroImageData: heroImageData.heroImage || existingData.heroImageData || '',
                            lastUpdated: Date.now()
                        };

                        // Make API call
                        const response = await API.put("clients", '/user/cafewebDevForm', {
                            body: contactData
                        });

                        if (!response) {
                            throw new Error('Failed to save contact information');
                        }

                        // Save to localStorage
                        localStorage.setItem('cafeFormData', JSON.stringify({
                            ...contactData,
                            logoUrl: currentLogoUrl,
                            heroImage: currentHeroImageUrl
                        }));
                        success = true;

                    } catch (error) {
                        console.error("Error in contact section:", error);
                        alert('Error saving contact information. Please try again.');
                        success = false;
                    }
                    break;

                case 2: // Home
                    // Validate required taglines
                    if (!tagLine1?.trim() || !tagLine2?.trim() || !productTagline?.trim()) {
                        if (!tagLine1?.trim()) alert("Please enter tagline 1");
                        if (!tagLine2?.trim()) alert("Please enter tagline 2");
                        if (!productTagline?.trim()) alert("Please enter product tagline");
                        success = false;
                        break;
                    }

                    try {
                        // Get logo and hero data from storage
                        const existingData = JSON.parse(localStorage.getItem('cafeFormData') || '{}');
                        const logoData = JSON.parse(localStorage.getItem('cafeFormLogo') || '{}');
                        const currentLogoUrl = logoData.logoUrl || existingData.logoUrl || baseData.logoUrl || '';

                        // Process hero image if exists
                        let heroImageUrl = null;
                        let heroImageBase64 = null;
                        if (heroImage && heroImage instanceof File) {
                            try {
                                const compressedHeroImage = await compressImage(heroImage);
                                const fileName = `${institutionid}/images/hero/hero_${Date.now()}.${heroImage.name.split('.').pop()}`;
                                const uploadResponse = await Storage.put(fileName, compressedHeroImage, {
                                    contentType: compressedHeroImage.type,
                                    metadata: {
                                        cognitoId: userData?.cognitoId,
                                        institutionid: institutionid
                                    }
                                });
                                const newHeroImageUrl = await Storage.get(uploadResponse.key);
                                const cleanUrl = newHeroImageUrl.split("?")[0];
                                setHeroImageS3Url(cleanUrl);

                                // Save hero image data to localStorage
                                heroImageBase64 = await convertFileToBase64(compressedHeroImage);
                                localStorage.setItem('cafeFormHeroImage', JSON.stringify({
                                    heroImage: heroImageBase64, // For preview only
                                    heroImageUrl: cleanUrl,
                                    fileName: heroImage.name
                                }));
                            } catch (uploadError) {
                                console.error("Error uploading hero image:", uploadError);
                                throw new Error('Failed to upload hero image. Please try again.');
                            }
                        }

                        // Get hero image data from storage if not uploading new one
                        const heroImageData = JSON.parse(localStorage.getItem('cafeFormHeroImage') || '{}');
                        const currentHeroImageUrl = heroImageUrl || heroImageData.heroImageUrl || existingData.heroImage || '';

                        // Process mission background image if exists
                        let missionBgUrl = null;
                        let missionBgBase64 = null;
                        if (ourMissionBg && ourMissionBg instanceof File) {
                            try {
                                const compressedMissionBg = await compressImage(ourMissionBg);
                                const fileName = `${institutionid}/images/mission/mission_bg_${Date.now()}.${ourMissionBg.name.split('.').pop()}`;
                                const uploadResponse = await Storage.put(fileName, compressedMissionBg, {
                                    contentType: compressedMissionBg.type,
                                    metadata: {
                                        cognitoId: userData?.cognitoId,
                                        institutionid: institutionid
                                    }
                                });
                                missionBgUrl = await Storage.get(uploadResponse.key);
                                missionBgUrl = missionBgUrl.split("?")[0];

                                // Save mission bg data to localStorage
                                missionBgBase64 = await convertFileToBase64(compressedMissionBg);
                                localStorage.setItem('cafeFormMissionBg', JSON.stringify({
                                    missionBg: missionBgBase64,
                                    missionBgUrl: missionBgUrl,
                                    fileName: ourMissionBg.name
                                }));
                            } catch (uploadError) {
                                console.error("Error uploading mission background:", uploadError);
                                throw new Error('Failed to upload mission background. Please try again.');
                            }
                        }

                        // Get mission bg data from storage if not uploading new one
                        const missionBgData = JSON.parse(localStorage.getItem('cafeFormMissionBg') || '{}');
                        const currentMissionBgUrl = missionBgUrl || missionBgData.missionBgUrl || existingData.ourMissionBg || '';

                        // Validate ourMission data
                        const ourMission = existingData.ourMission || {};
                        if (!ourMission.title?.trim()) {
                            alert("Please enter the mission title");
                            success = false;
                            break;
                        }
                        if (!ourMission.description?.trim()) {
                            alert("Please enter the mission description");
                            success = false;
                            break;
                        }
                        if (!ourMission.points?.every(point => point.trim())) {
                            alert("Please fill in all mission points");
                            success = false;
                            break;
                        }
                        if (!currentMissionBgUrl) {
                            alert("Please upload a mission background image");
                            success = false;
                            break;
                        }

                        const homeData = {
                            ...baseData,
                            institutionid,
                            tagLine1: tagLine1.trim(),
                            tagLine2: tagLine2.trim(),
                            productTagline: productTagline?.trim() || '',
                            heroImage: currentHeroImageUrl, // Always use S3 URL
                            heroImageData: null, // Never send base64 data
                            logoUrl: currentLogoUrl,
                            logo: logoData.logo || existingData.logo || '',
                            selectedMedia: null,
                            ourMission: {
                                title: ourMission.title.trim(),
                                description: ourMission.description.trim(),
                                points: ourMission.points.map(point => point.trim())
                            },
                            ourMissionBg: currentMissionBgUrl,
                            createdBy: userData?.cognitoId,
                            isFormFilled: false,
                            lastUpdated: Date.now()
                        };

                        const response = await API.put("clients", '/user/cafewebDevForm', {
                            body: homeData
                        });

                        if (!response) {
                            throw new Error('Failed to save home section data');
                        }

                        // Update localStorage with the correct data structure
                        localStorage.setItem('cafeFormData', JSON.stringify({
                            ...localStorageData,
                            ...homeData,
                            heroImage: currentHeroImageUrl, // Store S3 URL in main data
                            heroImageData: null, // Don't store base64 in main data
                            logoUrl: currentLogoUrl,
                            ourMission: homeData.ourMission,
                            ourMissionBg: currentMissionBgUrl
                        }));

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
                            
                            if (!t.name?.trim()) {
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
                                    name: t.name.trim(),
                                    text: t.text.trim(),
                                    rating: t.rating || 5
                                };
                            })
                        );

                        // Get logo and hero data
                        const existingData = JSON.parse(localStorage.getItem('cafeFormData') || '{}');
                        const logoData = JSON.parse(localStorage.getItem('cafeFormLogo') || '{}');
                        const heroImageData = JSON.parse(localStorage.getItem('cafeFormHeroImage') || '{}');

                        // Get the correct URLs
                        const currentLogoUrl = logoData.logoUrl || existingData.logoUrl || baseData.logoUrl || '';
                        const currentHeroImageUrl = heroImageData.heroImageUrl || existingData.heroImage || baseData.heroImage || '';

                        const testimonialData = {
                            ...baseData,
                            institutionid,
                            testimonials: processedTestimonials,
                            createdBy: userData?.cognitoId,
                            isFormFilled: false,
                            lastUpdated: Date.now(),
                            logoUrl: currentLogoUrl,
                            logo: logoData.logo || existingData.logo || '',
                            heroImage: currentHeroImageUrl, // Use S3 URL
                            heroImageData: null, // Don't send base64 data to API
                            section: 'home'
                        };

                        const apiResponse = await API.put("clients", '/user/cafewebDevForm', {
                            body: testimonialData
                        });

                        if (!apiResponse) {
                            throw new Error('Failed to submit testimonials');
                        }

                        // Update localStorage with the correct data structure
                        localStorage.setItem('cafeFormData', JSON.stringify({
                            ...localStorageData,
                            ...testimonialData,
                            logoUrl: currentLogoUrl,
                            heroImage: currentHeroImageUrl, // Store S3 URL
                            heroImageData: null // Don't store base64 data
                        }));

                        await saveData();
                        const nextSection = currentSection + 1;
                        setCurrentSection(nextSection);
                        // Save the next section to localStorage
                        localStorage.setItem('cafeCurrentSection', nextSection.toString());
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
                const nextSection = currentSection + 1;
                setCurrentSection(nextSection);
                // Save the next section to localStorage
                localStorage.setItem('cafeCurrentSection', nextSection.toString());
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

    const saveData = useCallback(async () => {
        try {
            const existingData = JSON.parse(localStorage.getItem('cafeFormData') || '{}');
            const heroImageData = JSON.parse(localStorage.getItem('cafeFormHeroImage') || '{}');
            
            const dataToSave = {
                ...existingData,
                institutionid: institutionid || existingData.institutionid || '',
                companyName: companyName || existingData.companyName || '',
                PrimaryColor,
                SecondaryColor,
                LightPrimaryColor,
                LightestPrimaryColor,
                logoUrl: logo,
                
                // Contact info
                firstName: contactInfo.firstName || '',
                lastName: contactInfo.lastName || '',
                emailId: contactInfo.emailId || '',
                Query_PhoneNumber: contactInfo.phoneNumber || contactInfo.Query_PhoneNumber || '',
                Query_Address: contactInfo.address || contactInfo.Query_Address || '',
                userName: contactInfo.userName || '',
                socialMediaLinks: contactInfo.socialMediaLinks || {},
                visitUs: contactInfo.visitUs || {},
                
                // Taglines
                tagLine1: tagLine1 || '',
                tagLine2: tagLine2 || '',
                productTagline: productTagline || '',
                
                // Media - only store S3 URLs in main data
                selectedMedia: null,
                heroImage: heroImageS3Url || heroImageData.heroImageUrl || null, // Always use S3 URL
                
                // Testimonials
                testimonials: testimonials.map(t => ({
                    name: t.name || '',
                    text: t.text || '',
                    rating: t.rating || 5,
                    imgSrc: t.imgSrc || '',
                    imageBase64: null
                })),
                
                currentSection,
                lastUpdated: Date.now()
            };

            // Save to localStorage
            localStorage.setItem('cafeFormData', JSON.stringify(dataToSave));
            
            // Save preview data separately
            if (heroImage instanceof File) {
                // Keep existing heroImageUrl if we have a new file pending upload
                localStorage.setItem('cafeFormHeroImage', JSON.stringify({
                    ...heroImageData,
                    heroImage: selectedMedia, // Preview only
                }));
            } else {
                // Store both preview and S3 URL
                localStorage.setItem('cafeFormHeroImage', JSON.stringify({
                    ...heroImageData,
                    heroImage: selectedMedia, // Preview only
                    heroImageUrl: heroImageS3Url || heroImageData.heroImageUrl // S3 URL
                }));
            }
            
            if (institutionid) {
                localStorage.setItem('cafeInstitutionId', institutionid);
            }
            if (companyName) {
                localStorage.setItem('cafeCompanyName', companyName);
            }
            
            return true;
        } catch (error) {
            console.error('Error saving data:', error);
            return false;
        }
    }, [
        institutionid,
        companyName,
        PrimaryColor,
        SecondaryColor,
        LightPrimaryColor,
        LightestPrimaryColor,
        logo,
        contactInfo,
        tagLine1,
        tagLine2,
        productTagline,
        selectedMedia,
        heroImage,
        heroImageS3Url, // Add this to dependencies
        testimonials,
        currentSection
    ]);

    // Add useEffect for automatic saving
    useEffect(() => {
        saveData();
    }, [saveData]);

    const handleSaveDraft = () => {
        saveData();
        navigate('/dashboard', { state: { section: 'institution-draft' } });
    };

    const handleClearData = async () => {
        try {
            util.setLoader(true); // Start loader

            if (institutionid) {
                await API.del(
                    "clients",
                    `/user/development-form/delete-all/${institutionid}`
                );
            }

            // Clear all form-related data from localStorage
            const localStorageKeys = [
                'cafeFormData',
                'cafeFormLogo',
                'cafeFormHeroImage',
                'cafeFormMissionBg',
                'cafeCurrentSection',
                'cafeInstitutionId',
                'cafeCompanyName',
                'testimonialImages',
                'formProgress',
                'currentStep',
                'formState',
                'contactInfo',
                'testimonials'
            ];

            // Clear all localStorage items
            localStorageKeys.forEach(key => localStorage.removeItem(key));

            // Reset all state variables
            setinstitutionid('');
            setCompanyName('');
            setLogo(null);
            setSelectedLogo(null);
            setPrimaryColor('#30afbc');
            setSecondaryColor('#2b9ea9');
            setLightPrimaryColor('#e6f7f9');
            setLightestPrimaryColor('#f3fbfc');
            settagLine1('');
            settagLine2('');
            setProductTagline('');
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
                    locationMap: ''
                }
            });
            setTestimonials([
                { imgSrc: '', name: '', feedback: '', rating: 5, uploadedFile: null },
                { imgSrc: '', name: '', feedback: '', rating: 5, uploadedFile: null },
                { imgSrc: '', name: '', feedback: '', rating: 5, uploadedFile: null }
            ]);
            setCurrentSection(0);
            
            // Clean up any object URLs
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
            
            alert('All data cleared successfully');
            navigate('/dashboard');
        } catch (error) {
            console.error("Error clearing data:", error);
            alert('Error clearing data. Please try again.');
        } finally {
            util.setLoader(false); // Stop loader regardless of success or failure
        }
    };

    const loadFromLocalStorage = useCallback(async () => {
        try {
            // First try to load from separate storage
            const savedInstitutionId = localStorage.getItem('cafeInstitutionId');
            const savedCompanyName = localStorage.getItem('cafeCompanyName');
            
            // Then load the rest of the data
            const savedData = JSON.parse(localStorage.getItem('cafeFormData') || '{}');
            const heroImageData = JSON.parse(localStorage.getItem('cafeFormHeroImage') || '{}');
            
            console.log('Loading data from localStorage:', savedData);
            
            // Set institutionid and companyName with priority to separate storage
            if (savedInstitutionId) {
                setinstitutionid(savedInstitutionId);
            } else if (savedData.institutionid) {
                setinstitutionid(savedData.institutionid);
            }
            
            if (savedCompanyName) {
                setCompanyName(savedCompanyName);
            } else if (savedData.companyName) {
                setCompanyName(savedData.companyName);
            }
            
            // Load the rest of the data
            setPrimaryColor(savedData.PrimaryColor || '#30afbc');
            setSecondaryColor(savedData.SecondaryColor || '#2b9ea9');
            setLightPrimaryColor(savedData.LightPrimaryColor || '#e6f7f9');
            setLightestPrimaryColor(savedData.LightestPrimaryColor || '#f3fbfc');
            
            // Load contact info
            const contactData = {
                firstName: savedData.firstName || '',
                lastName: savedData.lastName || '',
                emailId: savedData.emailId || '',
                phoneNumber: savedData.Query_PhoneNumber || '',
                Query_PhoneNumber: savedData.Query_PhoneNumber || '',
                address: savedData.Query_Address || '',
                Query_Address: savedData.Query_Address || '',
                userName: savedData.userName || '',
                socialMediaLinks: savedData.socialMediaLinks || {
                    instagram: '',
                    facebook: '',
                    youtube: ''
                },
                visitUs: savedData.visitUs || {
                    locationMap: ''
                }
            };
            setContactInfo(contactData);
            
            // Load taglines
            settagLine1(savedData.tagLine1 || '');
            settagLine2(savedData.tagLine2 || '');
            setProductTagline(savedData.productTagline || '');
            
            // Load media
            if (heroImageData.heroImage) {
                setSelectedMedia(heroImageData.heroImage);
            }
            if (heroImageData.heroImageUrl) {
                setHeroImage(heroImageData.heroImageUrl);
            }
            
            // Load testimonials
            if (savedData.testimonials?.length > 0) {
                const loadedTestimonials = savedData.testimonials.map(t => ({
                    name: t.name || '',
                    text: t.text || '',
                    rating: t.rating || 5,
                    imgSrc: t.imgSrc || '',
                    imageBase64: t.imageBase64 || '',
                    uploadedFile: null
                }));
                setTestimonials(loadedTestimonials);
            }
            
            // Load current section
            if (typeof savedData.currentSection === 'number') {
                setCurrentSection(savedData.currentSection);
            }
        } catch (error) {
            console.error('Error loading from localStorage:', error);
        }
    }, []);

    useEffect(() => {
        loadFromLocalStorage();
    }, [loadFromLocalStorage]); // Run only on mount

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

    const handlePrevSection = () => {
        if (currentSection > 0) {
            const prevSection = currentSection - 1;
            setCurrentSection(prevSection);
            // Save the previous section to localStorage
            localStorage.setItem('cafeCurrentSection', prevSection.toString());
        }
    };

    // Add new state for section validation
    const [isCurrentSectionValid, setIsCurrentSectionValid] = useState(false);

    // Add effect to run validation when relevant data changes
    useEffect(() => {
        const validateCurrentSectionData = () => {
            const savedData = JSON.parse(localStorage.getItem('cafeFormData') || '{}');
            
            switch (currentSection) {
                case 0: // Company
                    const isCompanyValid = 
                        institutionid?.trim() && 
                        companyName?.trim() && 
                        (selectedLogo || logo || savedData.logoUrl) &&
                        /^[a-zA-Z0-9\s]+$/.test(companyName);
                    setIsCurrentSectionValid(isCompanyValid);
                    break;

                case 1: // Contact
                    const isContactValid = 
                        contactInfo?.emailId?.trim() &&
                        contactInfo?.firstName?.trim() &&
                        contactInfo?.lastName?.trim() &&
                        contactInfo?.Query_PhoneNumber?.trim() &&
                        contactInfo?.Query_Address?.trim() &&
                        contactInfo?.visitUs?.locationMap?.trim() &&
                        contactInfo?.socialMediaLinks?.instagram?.trim() &&
                        contactInfo?.socialMediaLinks?.facebook?.trim() &&
                        contactInfo?.socialMediaLinks?.youtube?.trim();
                    setIsCurrentSectionValid(isContactValid);
                    break;

                case 2: // Home
                    const isHomeValid = 
                        tagLine1?.trim() && 
                        tagLine2?.trim() && 
                        productTagline?.trim();

                    setIsCurrentSectionValid(isHomeValid);
                    break;

                case 3: // Testimonials
                    const isTestimonialsValid = testimonials?.every(t => 
                        t.name?.trim() && 
                        t.text?.trim() && 
                        t.imgSrc
                    );
                    setIsCurrentSectionValid(isTestimonialsValid);
                    break;

                default:
                    setIsCurrentSectionValid(false);
            }
        };

        validateCurrentSectionData();
    }, [
        currentSection,
        institutionid,
        companyName,
        selectedLogo,
        logo,
        contactInfo,
        tagLine1,
        tagLine2,
        productTagline,
        testimonials
    ]);

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
                        tagLine1={tagLine1}
                        settagLine1={handleSetTagLine1}
                        tagLine2={tagLine2}
                        settagLine2={handleSetTagLine2}
                        productTagline={productTagline}
                        setProductTagline={handleSetProductTagline}
                        heroImage={heroImage}
                        setHeroImage={handleSetHeroImage}
                        selectedMedia={selectedMedia}
                        setSelectedMedia={handleSetSelectedMedia}
                        ourMissionBg={ourMissionBg}
                        setourMissionBg={setourMissionBg}
                        selectedMissionBg={selectedMissionBg}
                        setSelectedMissionBg={setSelectedMissionBg}
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
                isCurrentSectionValid={isCurrentSectionValid}
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