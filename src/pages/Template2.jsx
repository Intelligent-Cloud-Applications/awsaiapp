import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Home/Navbar';
import Footer from '../components/Template2/Footer';
import Company from '../components/Template2/Form/Company';
import Home from '../components/Template2/Form/Home';
import Policy from '../components/Template2/Form/Policy';
import Contact from '../components/Template2/Form/Contact';
import { API, Storage } from "aws-amplify";
import PrevSectionDraftHandler from '../components/Template2/Form/PrevSectionDraftHandler';
import "./Template.css";
import Context from "../context/Context";
import Testimonials from '../components/Template2/Form/Testimonials';

// Define sections with icons (similar to Cafe.jsx)
const FORM_SECTIONS = [
    { id: 'company', title: 'Company' },
    { id: 'contact', title: 'Contact' },
    { id: 'home', title: 'Home' },
    { id: 'policy', title: 'Policy' },
    { id: 'testimonials', title: 'Testimonials' }
];

const Template2 = () => {
  const Navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(0);
  const [savedData, setsavedData] = useState();
  console.log("🚀 ~ file: Template2.jsx:21 ~ Template2 ~ savedData:", savedData)
  const [logo, setLogo] = useState(null);
  const titleOfCountBanner = ["Patients", "Dentists", "Appointments"];
  const [countBanner, setCountBanner] = useState(
    titleOfCountBanner.map(title => ({ count: '', title }))
  );
  const [LightPrimaryColor, setLightPrimaryColor] = useState("#225c59");
  const [LightestPrimaryColor, setLightestPrimaryColor] = useState("#c3f3f1");
  const [companyName, setCompanyName] = useState(null);
  const [companyDescription, setCompanyDescription] = useState(null);
  const [institutionId, setinstitutionId] = useState(null);
  const [PrimaryColor, setPrimaryColor] = useState("#1B7571");
  const [SecondaryColor, setSecondaryColor] = useState("#000000");
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
  const [isFormFilled, setIsFormFilled] = useState(true);
  const { userData } = useContext(Context)
  const [testimonials, setTestimonials] = useState([
    { imgSrc: '', name: '', feedback: '', uploadedFile: null, type: '' },
    { imgSrc: '', name: '', feedback: '', uploadedFile: null, type: '' },
    { imgSrc: '', name: '', feedback: '', uploadedFile: null, type: '' },
  ]);
  // const [isFormedFilled, setisFormedFilled] = useState(false);

  const [policies, setPolicies] = useState({
    'Privacy Policy': [""],
    'About Us': [""],
  });

  const [contactInfo, setContactInfo] = useState({
    address: '',
    country: 'India',
    countryCode: '91',
    'Owner Name': '',
    'Phone Number': '',
    email: '',
    'UPI Id': '',
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
          const response = await Storage.put(
            `institution-utils/${institutionId}/images/Testimonial/${testimonial.uploadedFile.name}`,
            testimonial.actualFile,
            { contentType: testimonial.actualFile.type }
          );
          let imageUrl = await Storage.get(response.key);
          imageUrl = imageUrl.split("?")[0];
          return { ...testimonial, imgSrc: imageUrl };
        }
        return testimonial; // If no file, return the original testimonial
      })
    );

    setTestimonials(updatedTestimonials);
  };

  const handleSubmitForm = async () => {
    try {
      // Upload the logo image
      util.setLoader(true);
      console.log("the name of logo is", logo.name);
      const response1 = await Storage.put(`${institutionId}/images/${logo.name}`, logo, {
        contentType: logo.type,
      });

      // Get the URL of the uploaded logo
      let imageUrl = await Storage.get(response1.key);
      imageUrl = imageUrl.split("?")[0];
      setSelectedFile(imageUrl);
      let videoUrl;
      if (video) {
        // Upload the video
        const response2 = await Storage.put(`${institutionId}/videos/${video.name}`, video, {
          contentType: video.type,
        });
        videoUrl = await Storage.get(response2.key);
        videoUrl = videoUrl.split("?")[0];
      }

      // Upload "About Us" images and fetch URLs concurrently
      const aboutImagesUrls = await Promise.all(
        aboutImage.map(async (file) => {
          const response = await Storage.put(`${institutionId}/AboutUsImage/${file.name}`, file, {
            contentType: file.type,
          });
          let aboutImageUrl = await Storage.get(response.key);
          return aboutImageUrl.split("?")[0];
        })
      );

      // Prepare social media links
      const socials = {
        facebook: contactInfo.facebook || null,
        instagram: contactInfo.instagram || null,
        youTube: contactInfo.youTube || null,
      };

      const body = {
        institutionid: institutionId,
        companyName: companyName || null,
        PrimaryColor: PrimaryColor || null,
        SecondaryColor: SecondaryColor || null,
        logoUrl: imageUrl,
        LightPrimaryColor: LightPrimaryColor || null,
        LightestPrimaryColor: LightestPrimaryColor || null,
        TagLine: TagLine || null,
        TagLine1: TagLine1 || null,
        TagLine2: TagLine2 || null,
        TagLine3: TagLine3 || null,
        videoUrl: videoUrl || null,
        aboutParagraphs: policies['About Us'] || [],
        aboutImages: aboutImagesUrls,
        address: contactInfo.address || null,
        countBanner: countBanner || [],
        description: companyDescription || null,
        email: contactInfo.email || null,
        ownerName: contactInfo['Owner Name'] || null,
        phone: `+${contactInfo.countryCode}${contactInfo['Phone Number']}` || null,
        privacyPolicy: policies['Privacy Policy'] || [],
        socials: socials,
        ourValues: values || [],
        estYear: contactInfo['Establishment Year of Company'] || null,
        UpiId: contactInfo['UPI Id'] || null,
        testimonials: testimonials || [],
        isFormFilled: isFormFilled,
        cognitoId: userData.cognitoId,
      };
      console.log("Data requesting for PUT", body);
      // Call the API
      const response = await API.put("clients", "/user/dentalWebDevForm", {
        body,
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("API response:", response);
      util.setLoader(false);
    } catch (error) {
      util.setLoader(false);
      console.error("Error on completing the form:", error.message, error.stack);
      alert("There was an error submitting the form. Please try again.");
    }
  };

  const isValidUrl = (data) => {
    const urlPattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(\/[^\s]*)?$/;
    return urlPattern.test(data);
  }

  const handleNextSection = () => {
    let institutionCheckInProgress = false;
    setCurrentSection((prevSection) => {
      const nextSection = Math.min(prevSection + 1, 8);
      //      console.log(currentSection);

      switch (currentSection) {
        case 0:
          if (!institutionId) {
            alert("Please enter the institutionId.");

            return prevSection;
          }
          if (!companyName) {
            alert("Please enter the institution Name.");

            return prevSection;
          }
          if (!logo) {
            alert("Please upload a company logo before proceeding.");
            return prevSection;
          }
          if (!institutionCheckInProgress) {
            util.setLoader(true);
            institutionCheckInProgress = true;

            API.get("clients", `/user/check-dental?companyName=${companyName}`)
              .then(response => {
                console.log("API Response:", response);  // Debugging line
                institutionCheckInProgress = false;

                const exists = response?.exists || response?.data?.exists;  // Handle nested response

                if (exists) {
                  alert("This institution already exists. Please use a different name.");
                  setCurrentSection(prevSection);
                } else {
                  setCurrentSection(nextSection);
                }
              })
              .catch(error => {
                console.error("API Error:", error);  // Log errors
                institutionCheckInProgress = false;
                alert(error.message || "Error checking institution.");
                setCurrentSection(prevSection);
              });
            util.setLoader(false);
            return prevSection;
          }
          return prevSection;
        // handleCompanyUpload();
        // break;
        case 1:
          if (!contactInfo['Phone Number'] || !contactInfo.email) {
            if (!contactInfo['Phone Number'])
              alert("Please enter a valid phone number before proceeding.");
            if (!contactInfo.email)
              alert("Please enter a valid email address before proceeding.");
            if (!contactInfo.owner_name)
              alert("Please enter a valid ownername before proceeding.");
            return prevSection; // return to prevent proceeding
          }
          const phoneRegex = /^[0-9]+$/;
          if (!phoneRegex.test(contactInfo['Phone Number'])) {
            alert("Please enter a valid phone number.");
            return prevSection;
          }
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(contactInfo.email)) {
            alert("Please enter a valid email address.");
            return prevSection;
          }
          if (contactInfo.facebook || contactInfo.instagram || contactInfo.youTube) {
            if (contactInfo.facebook) {
              const valid = isValidUrl(contactInfo.facebook);
              if (!valid) {
                alert("Please provide a valid link for Facebook");
              }
            }
            if (contactInfo.instagram) {
              const valid = isValidUrl(contactInfo.instagram);
              if (!valid) {
                alert("Please provide a valid link for Instagram");
              }
            }
            if (contactInfo.youTube) {
              const valid = isValidUrl(contactInfo.youTube);
              if (!valid) {
                alert("Please provide a valid link for YouTube");
              }
            }
            return prevSection; // return to prevent proceeding
          }
          break;
        case 2:
          if (!video || !TagLine) {
            if (!video) {
              alert("Please upload a video before proceeding.");
            }
            if (!TagLine) {
              alert("Please provide a tagline before proceeding.");
            }
            return prevSection; // return to prevent proceeding
          }
          break;

        case 4:
          if (testimonials && testimonials.some(item => item.name || item.feedback || item.imgSrc || item.uploadedFile || item.type)) {
            uploadTestimonials();
          }
          console.log("The form will submit now");
          handleSubmitForm();
          break;

        default:
          break;
      }
      return nextSection;
    });
  };

  const saveData = () => {
    setsavedData({});
    //    console.log("Saved Trigger")
  };
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    if (!isFormFilled) {
      console.log("Form filled:", isFormFilled);
      handleSubmitForm();
      Navigate('/dashboard', { state: { section: 'institution-draft' } });
    }
  });
  
  const handleSaveDraft = async () => {
    setIsFormFilled(false); // Trigger state update
  };
  
  const handleClearData = async () => {
    try {
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

  const renderSection = () => {
    switch (currentSection) {
      case 0:
        return (
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
        );
      case 1:
        return (
          <Contact
            contactInfo={contactInfo}
            setContactInfo={setContactInfo}
          />
        );
      case 2:
        return (
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
        );
      case 3:
        return (
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
        );
      case 4:
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
          animate={{ width: `${(currentSection / (FORM_SECTIONS.length - 1)) * 100}%` }}
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
        prevSection={handlePrevSectionDraft}
        saveData={saveData}
        showModal={() => setShowModal(true)}
        institutionId={institutionId}
        sections={FORM_SECTIONS}
      />

      <PrevSectionDraftHandler
        isOpen={showModal}
        onClose={handleCloseModal}
        onClear={handleClearData}
        onSaveDraft={handleSaveDraft}
        currentSection={currentSection}
        setCurrentSection={setCurrentSection}
      />
    </div>
  );
};

export default Template2;