import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const { userData } = useContext(Context)
  const [testimonials, setTestimonials] = useState([
    { imgSrc: '', name: '', feedback: '', uploadedFile: null, type: '' },
    { imgSrc: '', name: '', feedback: '', uploadedFile: null, type: '' },
    { imgSrc: '', name: '', feedback: '', uploadedFile: null, type: '' },
  ]);
  const [isFormedFilled, setisFormedFilled] = useState(false);

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

      if (video) {
        // Upload the video
        const response2 = await Storage.put(`${institutionId}/videos/${video.name}`, video, {
          contentType: video.type,
        });
        let videoUrl = await Storage.get(response2.key);
        videoUrl = videoUrl.split("?")[0];
        setVideo(videoUrl);
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

      if (policies['About Us'] || testimonials) {
        setisFormedFilled(true);
      }
      const body = {
        institutionid: institutionId,
        index: "0", // Example index value, replace as needed
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
        videoUrl: video || null,
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
        cognitoIdentityId: userData.cognitoId,
        ourValues: values || [],
        estYear: contactInfo['Establishment Year of Company'] || null,
        UpiId: contactInfo.upiId || null,
        testimonials: testimonials || [],
        isFormFilled: isFormedFilled,
      };
      console.log("cognito id passing", userData.cognitoId);
      console.log("Data requesting for PUT", body);

      // Call the API
      const response = await API.post("clients", "/user/dentalWebDevForm", {
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
            API.get("clients", `/user/check-dental?institutionid=${institutionId}`)
              .then(response => {
                institutionCheckInProgress = false;
                if (response && response.exists) {
                  alert("This institution already exists. Please use a different name.");
                  setCurrentSection(prevSection);
                } else if (response) {
                  // handleCompanyUpload();
                  setCurrentSection(nextSection);
                } else {
                  throw new Error("Error checking institution. Please try again.");
                }
              })
              .catch(error => {
                institutionCheckInProgress = false;
                alert(error.message);
                setCurrentSection(prevSection);
              });
            util.setLoader(false);
            // Exit early to prevent automatic section change
            return prevSection; // Prevent automatic section change
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
          uploadTestimonials();
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
  const handleSaveDraft = () => {
    handleSubmitForm();
    Navigate('/dashboard', { state: { section: 'institution-draft' } });
  };

  const handleClearData = async () => {
    try {
      util.setLoader(true);
      await API.del(
        "clients",
        `/user/development-form/delete-all/${institutionId}`);
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
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <div className="flex-grow flex">
        <div className="pt-[6rem] w-full max950:mb-10 max950:px-14 max600:px-0 m-[2%]" style={{ overflow: 'auto' }}>
          {currentSection === 0 &&
            <Company
              // clients={Companydata}
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
            />}
          {currentSection === 1 &&
            <Contact
              contactInfo={contactInfo}
              setContactInfo={setContactInfo}
            />}
          {currentSection === 2 &&
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
            />}
          {currentSection === 3 &&
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
            />}
          {currentSection === 4 &&
            <Testimonials
              testimonials={testimonials}
              setTestimonials={setTestimonials}
            />}
        </div>
        <div style={{ position: 'fixed', width: '100%', bottom: 0, zIndex: 99 }}>
          <Footer
            saveData={saveData}
            currentSection={currentSection}
            nextSection={handleNextSection}
            prevSection={handlePrevSectionDraft}
            showModal={() => setShowModal(true)}
          />
        </div>

      </div>
      <PrevSectionDraftHandler
        isOpen={showModal}
        onClose={handleCloseModal}
        onClear={handleClearData}
        onSaveDraft={handleSaveDraft}
      />
    </div>
  );
};

export default Template2;