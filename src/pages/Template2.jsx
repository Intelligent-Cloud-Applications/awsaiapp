// Template2.js
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Home/Navbar';
import Footer from '../components/Template2/Footer';
import Company from '../components/Template2/Form/Company';
import Home from '../components/Template2/Form/Home';
import Services from '../components/Template2/Form/Services';
import Testimonials from '../components/Template2/Form/Testimonials';
import Subscription from '../components/Template2/Form/Subscription';
import FAQs from '../components/Template2/Form/FAQs';
import Instructors from '../components/Template2/Form/Instructors';
import Policy from '../components/Template2/Form/Policy';
import Contact from '../components/Template2/Form/Contact';
import { API, Storage } from "aws-amplify";
import PrevSectionDraftHandler from '../components/Template2/Form/PrevSectionDraftHandler';
import "./Template.css";
import Context from "../context/Context";
// import {CSVUpload} from '../components/UploadFile/CSVUpload';
const Template2 = () => {
  const Navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(0);
  const [savedData, setsavedData] = useState();

  console.log("🚀 ~ file: Template2.jsx:21 ~ Template2 ~ savedData:", savedData)
  const [Companydata, setCompanydata] = useState([]);
  const [logo, setLogo] = useState(null);
  const titleOfCountBanner = ["Patients", "Dentists", "Appointments"];
  const [countBanner, setCountBanner] = useState(
    titleOfCountBanner.map(title => ({ count: '', title }))
  );
  const [LightPrimaryColor, setLightPrimaryColor] = useState("#225c59");
  const [LightestPrimaryColor, setLightestPrimaryColor] = useState("#c3f3f1");
  const [Footer_Link_1] = useState("https://bworkzlive.com/");
  const [Footer_Link_2] = useState("https://Zumba.com/");
  // const [logo, setLogo] = useState(null);
  const [servicesBg, setServicesBg] = useState(null);
  const [servicesPortrait, setServicesPortrait] = useState(null);

  const [companyName, setCompanyName] = useState(null);
  const [institutionId, setinstitutionId] = useState(null);

  const [PrimaryColor, setPrimaryColor] = useState("#1B7571");
  const [SecondaryColor, setSecondaryColor] = useState("#000000");
  const [countryCode, setCountryCode] = useState("INR");
  const [country, setCountry] = useState("India");
  const [institutionType, setInstitutionType] = useState("DanceStudio");
  const [TagLine, setTagLine] = useState("");
  const [TagLine1, setTagLine1] = useState("");
  const [TagLine2, setTagLine2] = useState("");
  const [TagLine3, setTagLine3] = useState("");
  const [video, setVideo] = useState(null);
  const [TestimonialBg, setTestimonialBg] = useState(null);
  const [AboutUsBg, setAboutUsBg] = useState(null);
  const [SubscriptionBg, setSubscriptionBg] = useState(null);
  const [InstructorBg, setInstructorBg] = useState(null);
  const [logoName, setLogoName] = useState("");
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [mediaType, setMediaType] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [services, setServices] = useState([
    { title: '', items: [''] },
    { title: '', items: [''] },
    { title: '', items: [''] },
    { title: '', items: [''] },
  ]);

  const [testimonials, setTestimonials] = useState([
    { imgSrc: '', name: '', feedback: '', uploadedFile: null, type: '' },
    { imgSrc: '', name: '', feedback: '', uploadedFile: null, type: '' },
    { imgSrc: '', name: '', feedback: '', uploadedFile: null, type: '' },
  ]);

  const calculateDuration = (subscriptionType) => {
    const daysInMonth = 30; // assuming 30 days in a month

    if (subscriptionType === 'monthly') {
      return daysInMonth * 24 * 60 * 60 * 1000; // convert days to milliseconds
    } else if (subscriptionType === 'weekly') {
      return 7 * 24 * 60 * 60 * 1000; // convert days to milliseconds
    } else if (subscriptionType === 'yearly') {
      return 365 * 24 * 60 * 60 * 1000; // convert days to milliseconds
    }

    return 0;
  };
  const [subscriptions, setSubscriptions] = useState([

    {
      heading: '',
      amount: '',
      currency: 'INR',
      country: 'INDIA',
      subscriptionType: 'monthly',
      provides: [''],
      duration: calculateDuration('monthly'),
      durationText: 'Monthly',
      india: true,
    },
    {
      heading: '',
      amount: '',
      currency: 'INR',
      country: 'INDIA',
      subscriptionType: 'monthly',
      provides: [''],
      duration: calculateDuration('monthly'),
      durationText: 'Monthly',
      india: true,
    },
    {
      heading: '',
      amount: '',
      currency: 'INR',
      country: 'INDIA',
      subscriptionType: 'monthly',
      provides: [''],
      duration: calculateDuration('monthly'),
      durationText: 'Monthly',
      india: true,
    },
  ]);


  const [faqs, setFaqs] = useState([
    {
      question: '',
      answer: '',
    },
    {
      question: '',
      answer: '',
    },
    {
      question: '',
      answer: '',
    },
    {
      question: '',
      answer: '',
    },
    {
      question: '',
      answer: '',
    },
  ]);

  const [instructors, setInstructors] = useState([
    { imgSrc: '', name: '', emailId: '', position: '', uploadedFile: null },
    { imgSrc: '', name: '', emailId: '', position: '', uploadedFile: null },
    { imgSrc: '', name: '', emailId: '', position: '', uploadedFile: null },
    { imgSrc: '', name: '', emailId: '', position: '', uploadedFile: null },
    { imgSrc: '', name: '', emailId: '', position: '', uploadedFile: null },
  ]);


  const [policies, setPolicies] = useState({
    'Privacy Policy': [{ heading: '', content: '' }],
    'About Us': [{ heading: '', content: '' }],
    'Refund Policy': [{ heading: '', content: '' }],
    'Terms and Conditions': [{ heading: '', content: '' }]
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
    Linkedin: '',
    Twitter: '',
    facebook: '',
  });

  const Ctx = useContext(Context);
  const util = useContext(Context).util;
  useEffect(() => {
    console.log(policies);
  }, [policies]);
  const handleCompanyUpload = async () => {
    try {
      // Upload the file to S3 with the filename as Cognito User ID
      const response = await Storage.put(`${institutionId}/images/${logo.name}`, logo, {
        contentType: logo.type,
      });

      // Get the URL of the uploaded file
      let imageUrl = await Storage.get(response.key);
      imageUrl = imageUrl.split("?")[0];
      setSelectedFile(imageUrl);
      //      console.log("logo: ", imageUrl);
      const additionalAttributes = {
        LightPrimaryColor: LightPrimaryColor !== undefined ? LightPrimaryColor : null,
        LightestPrimaryColor: LightestPrimaryColor !== undefined ? LightestPrimaryColor : null,
      };

      // const fileNameForBucket = "memberList";
      // CSVUpload(CSVFile,institutionId,fileNameForBucket);
      await API.put("clients", "/user/development-form/company", {
        body: {
          institutionid: institutionId,
          companyName: companyName,
          PrimaryColor,
          institutionType,
          SecondaryColor,
          logoUrl: imageUrl,
          ...additionalAttributes,
        },
      });

    } catch (error) {
      console.error("Error uploading logo: ", error);
    }
  };

  const handleHomeUpload = async () => {
    try {
      // Upload the file to S3 with the filename as Cognito User ID
      const response = await Storage.put(`${institutionId}/${video.name}`, video, {
        contentType: video.type,
      });
      const tagline1 = TagLine1 || '';
      // Get the URL of the uploaded file
      let videoUrl = await Storage.get(response.key);
      videoUrl = videoUrl.split("?")[0];
      setVideo(videoUrl);
      await API.put("clients", "/user/development-form/hero-page", {
        body: {
          institutionid: institutionId,
          TagLine,
          TagLine1: tagline1,
          videoUrl,
        },
      });

      //      console.log("video: ", videoUrl);
    } catch (error) {
      //      console.error("Error uploading video: ", error);
    }
  }

  const handleServicesUpload = async () => {
    try {

      let servicesBgUrl = null;
      if (servicesBg) {
        const response = await Storage.put(`${institutionId}/${servicesBg.name}`, servicesBg, {
          contentType: servicesBg.type,
        });

        if (response && response.key) {
          servicesBgUrl = await Storage.get(response.key);
          servicesBgUrl = servicesBgUrl.split("?")[0];
        }
      }
      setServicesBg(servicesBgUrl);

      // Upload servicesPortrait image
      let servicesPortraitUrl = null;
      if (servicesPortrait) {
        const response1 = await Storage.put(`${institutionId}/${servicesPortrait.name}`, servicesPortrait, {
          contentType: servicesPortrait.type,
        });

        if (response1 && response1.key) {
          servicesPortraitUrl = await Storage.get(response1.key);
          servicesPortraitUrl = servicesPortraitUrl.split("?")[0];
        }
      }
      setServicesPortrait(servicesPortraitUrl);

      await API.put("clients", "/user/development-form/why-choose", {
        body: {
          institutionid: institutionId,
          Services: services,
          // dance_type: services[0].dance_type,
          ClassTypes: "",
          ServicesPortrait: servicesPortraitUrl,
          ServicesBg: servicesBgUrl,
        },
      });
    } catch (error) {
      console.error("Error uploading services: ", error);
    }
  };

  const handleTestimonialsUpload = async () => {

    try {
      let TestimonialBgUrl = null;
      if (TestimonialBg) {
        const response = await Storage.put(`${institutionId}/${TestimonialBg.name}`, TestimonialBg, {
          contentType: TestimonialBg.type,
        });

        // Get the URL of the uploaded file
        if (response && response.key) {
          TestimonialBgUrl = await Storage.get(response.key);
          TestimonialBgUrl = TestimonialBgUrl.split("?")[0];
        }
      }
      setTestimonialBg(TestimonialBgUrl);

      const response1 = await Storage.put(`institution-utils/${institutionId}/images/Testimonial/${testimonials[0].uploadedFile}`, testimonials[0].actualFile, {
        contentType: testimonials[0].actualFile.type,
      });

      // Get the URL of the uploaded file
      let imageUrl1 = await Storage.get(response1.key);
      imageUrl1 = imageUrl1.split("?")[0];

      const response2 = await Storage.put(`institution-utils/${institutionId}/images/Testimonial/${testimonials[1].uploadedFile}`, testimonials[1].actualFile, {
        contentType: testimonials[1].actualFile.type,
      });

      // Get the URL of the uploaded file
      let imageUrl2 = await Storage.get(response2.key);
      imageUrl2 = imageUrl2.split("?")[0];

      const response3 = await Storage.put(`institution-utils/${institutionId}/images/Testimonial/${testimonials[2].uploadedFile}`, testimonials[2].actualFile, {
        contentType: testimonials[2].actualFile.type,
      });

      // Get the URL of the uploaded file
      let imageUrl3 = await Storage.get(response3.key);
      imageUrl3 = imageUrl3.split("?")[0];


      await API.put("clients", "/user/development-form/testimonial", {
        body: {
          institutionid: institutionId,
          TestimonialBg: TestimonialBgUrl,
          Testimonial: [
            {
              name: testimonials[0].name,
              description: testimonials[0].feedback,
              img: imageUrl1,
            },
            {
              name: testimonials[1].name,
              description: testimonials[1].feedback,
              img: imageUrl2,
            },
            {
              name: testimonials[2].name,
              description: testimonials[2].feedback,
              img: imageUrl3,
            },
          ]
        },
      });
    } catch (error) {
      console.error("Error uploading testimonials: ", error);
    }
  };

  const handleSubscriptionUpload = async () => {
    try {
      // Create an array of promises, filtering out invalid subscriptions
      const uploadPromises = subscriptions
        .filter(subscription => subscription.amount && subscription.heading) // Filter subscriptions
        .map(async (subscription, i) => {
          // Multiply the amount by 100
          const updatedSubscription = {
            ...subscription,
            amount: subscription.amount * 100,

          };

          if (updatedSubscription.productId) {
            await API.put("clients", "/user/development-form/update-subscription", {
              body: { ...updatedSubscription, cognitoId: Ctx.userData.cognitoId }
            });
          } else {
            // Make API call for each subscription
            const response = await API.put("clients", "/user/development-form/subscriptions", {
              body: {
                cognitoId: Ctx.userData.cognitoId,
                institution: institutionId,
                ...updatedSubscription
              }
            });
            const sub = [...subscriptions];
            sub[i].institution = response.Attributes.institution;
            sub[i].productId = response.Attributes.productId;
            setSubscriptions(sub);
          }
        });

      // Wait for all promises to complete
      await Promise.all(uploadPromises);

      console.log("All subscriptions uploaded successfully");
    } catch (error) {
      console.error("Error uploading subscriptions:", error);
    }
  };

  const handleFAQsUpload = async () => {
    try {
      const filledFAQs = faqs.filter(faq => faq.question && faq.answer);

      // Create an array of objects with only filled FAQs
      const faqsToUpload = filledFAQs.map(faq => ({
        title: faq.question,
        content: faq.answer,
      }));
      await API.put("clients", "/user/development-form/faq", {
        body: {
          institutionid: institutionId,
          FAQ: faqsToUpload
        },
      });
    } catch (error) {
      console.error("Error uploading FAQs: ", error);
    }
  }

  const handleInstructorsUpload = async () => {
    try {
      // Upload images first
      let uploadedImages = [];
      for (let i = 0; i < instructors.length; i++) {
        const instructor = instructors[i];
        if (instructor.actualFile) {
          const response = await Storage.put(`institution-utils/${institutionId}/images/Instructor/${instructor.uploadedFile}`, instructor.actualFile, {
            contentType: instructor.actualFile.type,
          });
          let inst_pic = await Storage.get(response.key);
          inst_pic = inst_pic.split("?")[0];
          uploadedImages.push(inst_pic);
        } else {
          uploadedImages.push(null);
        }
      }

      for (let i = 0; i < instructors.length; i++) {
        const instructor = instructors[i];
        if (instructor.name && instructor.emailId && instructor.position && (instructor.imgSrc || uploadedImages[i])) {
          try {
            if (instructor.instructorId) {
              await API.put("clients", `/user/development-form/update-instructor`, {
                body: {
                  instructorId: instructor.instructorId,
                  institution: Ctx.userData.institutionName,
                  name: instructor.name,
                  emailId: instructor.emailId,
                  image: uploadedImages[i],
                  position: instructor.position,
                },
              });
            }
            else {
              const response = await API.put("clients", "/user/development-form/instructor", {
                body: {
                  institution: institutionId,
                  name: instructor.name,
                  emailId: instructor.emailId,
                  image: uploadedImages[i],
                  position: instructor.position,
                },
              });
              const inst = [...instructors];
              console.log(inst);
              console.log(response);
              inst[i].instructorId = response.Attributes.instructorId;
              inst[i].institution = response.Attributes.institution;
              console.log(inst);
              setInstructors(inst)
            }
            //            console.log("API Response:", response);
          } catch (error) {
            console.error("Error uploading instructor:", instructor.name, error);
          }
        } else {
          //          console.log("Skipping instructor due to missing data:", instructor.name);
        }
      }

    } catch (error) {
      console.error("Error uploading instructors: ", error);
    }
  }

  const handlePolicyUpload = async () => {
    try {
      let AboutUsBgUrl = null;
      if (AboutUsBg) {
        const response = await Storage.put(`${institutionId}/${AboutUsBg.name}`, AboutUsBg, {
          contentType: AboutUsBg.type,
        });

        // Get the URL of the uploaded file
        if (response && response.key) {
          AboutUsBgUrl = await Storage.get(response.key);
          AboutUsBgUrl = AboutUsBgUrl.split("?")[0];
        }
      }
      setAboutUsBg(AboutUsBgUrl);
      await API.put("clients", "/user/development-form/policy", {
        body: {
          institutionid: institutionId,
          AboutUsBg: AboutUsBgUrl,
          PrivacyPolicy: policies['Privacy Policy'],
          TermsData: policies['Terms and Conditions'].map(obj => {
            const obj2 = { ...obj };
            obj2.title = obj2.heading;
            obj2.heading = undefined;
            return obj2;
          }),
          Refund: policies['Refund Policy'],
          AboutUs: policies['About Us'],
        },
      });
    } catch (error) {
      console.error("Error uploading policy: ", error);
    }
  }

  const handleContactUpload = async () => {
    try {
      //      console.log("LOG +++++ " + contactInfo.address);
      let SubscriptionBgUrl = null;
      if (SubscriptionBg) {
        const response = await Storage.put(`${institutionId}/${SubscriptionBg.name}`, SubscriptionBg, {
          contentType: SubscriptionBg.type,
        });

        if (response && response.key) {
          SubscriptionBgUrl = await Storage.get(response.key);
          SubscriptionBgUrl = SubscriptionBgUrl.split("?")[0];
        }
      }
      setSubscriptionBg(SubscriptionBgUrl);
      let InstructorBgUrl = null;
      if (InstructorBg) {
        const response = await Storage.put(`${institutionId}/${InstructorBg.name}`, InstructorBg, {
          contentType: InstructorBg.type,
        });

        if (response && response.key) {
          InstructorBgUrl = await Storage.get(response.key);
          InstructorBgUrl = InstructorBgUrl.split("?")[0];
        }
      }
      setInstructorBg(InstructorBgUrl);
      await API.put("clients", "/user/development-form/contact", {
        body: {
          institutionid: institutionId,
          Query_Address: contactInfo.address,
          Query_PhoneNumber: '+' + contactInfo.countryCode + contactInfo.phoneNumber,
          Query_EmailId: contactInfo.email,
          Facebook: contactInfo.facebook,
          userName: contactInfo.owner_name,
          country: contactInfo.country,
          Instagram: contactInfo.instagram,
          YTLink: contactInfo.youtube,
          UpiId: contactInfo.upiId,
          Footer_Link_1,
          Footer_Link_2,
          SubscriptionBg: SubscriptionBgUrl,
          InstructorBg: InstructorBgUrl,
        },
      });
    } catch (error) {
      console.error("Error uploading contact: ", error);
    }
  }

  const fetchClients = async (institution) => {
    try {
      //      setLoader(true);
      const response = await API.get("clients", "/user/development-form/get-time/awsaiapp");
      //      console.log(response)
      setCompanydata(response);
    } catch (error) {
      console.error("Error fetching clients:", error);
    } finally {
      //      setLoader(false);
    }
  };

  useEffect(() => {
    fetchClients();
    //    console.log("The daTa are fetching!");
  }, []);


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
          console.log("institution:",institutionId);
          if (!institutionCheckInProgress) {
            institutionCheckInProgress = true;
            API.get("clients", `/user/check-dental?institutionId=${institutionId}`)
              .then(response => {
                institutionCheckInProgress = false;
                if (response && response.exists) {
                  alert("This institution already exists. Please use a different name.");
                  setCurrentSection(prevSection);
                } else if (response) {
                  handleCompanyUpload();
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

            // Exit early to prevent automatic section change
            return prevSection; // Prevent automatic section change
          }
          return prevSection;
        // handleCompanyUpload();
        // break;
        case 1:
          if (!contactInfo.phoneNumber || !contactInfo.email) {
            if (!contactInfo.phoneNumber) {
              alert("Please enter a valid phone number before proceeding.");
            }
            if (!contactInfo.email) {
              alert("Please enter a valid email address before proceeding.");
            }
            if (!contactInfo.owner_name) {
              alert("Please enter a valid ownername before proceeding.");
            }
            return prevSection;
          }
          const phoneRegex = /^[0-9]+$/;
          if (!phoneRegex.test(contactInfo.phoneNumber)) {
            alert("Please enter a valid phone number.");
            return prevSection;
          }

          // Validate email address
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(contactInfo.email)) {
            alert("Please enter a valid email address.");
            return prevSection;
          }
          handleContactUpload();
          break;
        case 2:
          if (!video || !TagLine) {
            if (!video) {
              alert("Please upload a video before proceeding.");
            }
            if (!TagLine) {
              alert("Please provide a tagline before proceeding.");
            }
            return prevSection;
          }
          handleHomeUpload();
          break;
        case 3:
          const areServicesFilled = services.every(service => service.title.trim() !== '' && service.items.every(item => item.trim() !== ''));
          if (!areServicesFilled) {
            alert("Please fill all service fields before proceeding.");
            return prevSection;
          }
          handleServicesUpload();
          break;
        case 4:
          const isTestimonialsFilled = testimonials.filter(testimonial => testimonial.name && testimonial.feedback).length >= 3;
          if (!isTestimonialsFilled) {
            alert("Please fill three testimonials before proceeding.");
            return prevSection;
          }
          if (!testimonials[0].name || !testimonials[0].feedback || !testimonials[0].actualFile) {
            alert("Please fill up all fields for testimonial 3 before proceeding.1");
            return prevSection;
          }
          if (!testimonials[1].name || !testimonials[1].feedback || !testimonials[1].actualFile) {
            alert("Please fill up all fields for testimonial 3 before proceeding.2");
            return prevSection;
          }
          if (!testimonials[2].name || !testimonials[2].feedback || !testimonials[2].actualFile) {
            //            console.log("HELLO: ");
            //            console.log(testimonials);
            alert("Please fill up all fields for testimonial 3 before proceeding.");
            return prevSection;
          }
          handleTestimonialsUpload();
          break;
        case 5:
          const invalidPriceIndex = subscriptions.findIndex(subscription => isNaN(Number(subscription.amount)));
          if (invalidPriceIndex !== -1) {
            alert(`Please enter a valid price number for subscription ${invalidPriceIndex + 1}.`);
            return prevSection;
          }
          handleSubscriptionUpload();
          break;
        case 6:
          const filledFAQs = faqs.filter(faq => (faq.question && faq.answer) || (!faq.question && !faq.answer));

          // Check if both title and answer are filled for each FAQ
          const allFAQsFilled = filledFAQs.length === faqs.length;

          if (!allFAQsFilled) {
            alert("Please fill both the question and answer for each FAQ before proceeding.");
            return prevSection;
          }
          handleFAQsUpload();
          break;
        case 7:
          const incompleteIndex = instructors.findIndex(instructor => {
            return instructor.name || instructor.emailId || instructor.position || instructor.actualFile;
          });

          // If incompleteIndex is not -1, it means there's at least one incomplete instructor
          if (incompleteIndex !== -1) {
            // Check if all fields for the incomplete instructor are filled
            const incompleteInstructor = instructors[incompleteIndex];
            if (!incompleteInstructor.name || !incompleteInstructor.emailId || !incompleteInstructor.position || !incompleteInstructor.actualFile) {
              alert(`Please fill all fields for instructor ${incompleteIndex + 1} before proceeding.`);
              return prevSection;
            }
          }
          handleInstructorsUpload();
          break;
        case 8:
          handlePolicyUpload();
          break;

        default:
          break;
      }

      //      console.log(`Current Section: ${prevSection}, Next Section: ${nextSection}`);
      return nextSection;
    });
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
              clients={Companydata}
              companyName={companyName}
              setCompanyName={setCompanyName}
              institutionId={institutionId}
              setinstitutionId={setinstitutionId}
              PrimaryColor={PrimaryColor}
              setPrimaryColor={setPrimaryColor}
              SecondaryColor={SecondaryColor}
              setSecondaryColor={setSecondaryColor}
              logo={logo}
              institutionType={institutionType}
              setInstitutionType={setInstitutionType}
              setLogo={setLogo}
              LightestPrimaryColor={LightestPrimaryColor}
              setLightestPrimaryColor={setLightestPrimaryColor}
              LightPrimaryColor={LightPrimaryColor}
              setLightPrimaryColor={setLightPrimaryColor}
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}
              logoName={logoName}
              setLogoName={setLogoName}      
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
            <Services
              services={services}
              setServices={setServices}
              countBanner={countBanner}
              setCountBanner={setCountBanner}
              titleOfCountBanner={titleOfCountBanner}
            />}

          {currentSection === 4 &&
            <Testimonials
              testimonials={testimonials}
              setTestimonials={setTestimonials}
              TestimonialBg={TestimonialBg}
              setTestimonialBg={setTestimonialBg}
            />}

          {currentSection === 5 &&
            <Subscription
              subscriptions={subscriptions}
              setSubscriptions={setSubscriptions}
              country={country}
              setCountry={setCountry}
              countryCode={countryCode}
              setCountryCode={setCountryCode}
            />}

          {currentSection === 6 &&
            <FAQs
              faqs={faqs}
              setFaqs={setFaqs}
            />}

          {currentSection === 7 &&
            <Instructors
              instructors={instructors}
              setInstructors={setInstructors}
            />}

          {currentSection === 8 &&
            <Policy
              policies={policies}
              setPolicies={setPolicies}
              AboutUsBg={AboutUsBg}
              setAboutUsBg={setAboutUsBg}
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