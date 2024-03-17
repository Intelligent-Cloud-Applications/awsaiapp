// Template.js
import React, {useState, useEffect, useContext} from 'react';
import Navbar from '../components/Home/Navbar';
import Footer from '../components/Template/Footer';
import Preview from '../components/Template/Preview';
import Company from '../components/Template/Form/Company';
import Home from '../components/Template/Form/Home';
import Services from '../components/Template/Form/Services';
import Testimonials from '../components/Template/Form/Testimonials';
import Subscription from '../components/Template/Form/Subscription';
import FAQs from '../components/Template/Form/FAQs';
import Instructors from '../components/Template/Form/Instructors';
import Policy from '../components/Template/Form/Policy';
import Contact from '../components/Template/Form/Contact';
import { API, Storage } from "aws-amplify";
import "./Template.css";
import Context from "../context/Context";
const Template = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [savedData, setsavedData] = useState();

 console.log("🚀 ~ file: Template.jsx:21 ~ Template ~ savedData:", savedData)
  const [Companydata, setCompanydata] = useState([]);
  // const [loader, setLoader] = useState(false);
//  console.log("🚀 ~ file: Template.jsx:24 ~ Template ~ loader:", loader)
  // const [error, setError] = useState(null);
  
  const [logo, setLogo] = useState(null);
  const [danceTypes, setDanceTypes] = useState(['', '', '', '', '']);
  //
  const [LightPrimaryColor,setLightPrimaryColor] = useState("#225c59");
  const [LightestPrimaryColor,setLightestPrimaryColor] = useState("#c3f3f1");
  const[Footer_Link_1]=useState("https://bworkzlive.com/");
  const[Footer_Link_2]=useState("https://Zumba.com/");
  // const [logo, setLogo] = useState(null);
  const [src_Components_Home_Why__h1, setsrc_Components_Home_Why__h1] = useState(null);
  const [src_Components_Home_Header3__h1, setsrc_Components_Home_Header3__h1] = useState(null);
  const [src_Components_Home_Header3__h2, setsrc_Components_Home_Header3__h2] = useState(null);

  const [companyName, setCompanyName] = useState(null);


  const [PrimaryColor, setPrimaryColor] = useState("#1B7571");
  const [SecondaryColor, setSecondaryColor] = useState("#000000");
//  console.log("🚀 ~ file: Template.jsx:26 ~ Template ~ setError:", setError)
//  console.log("🚀 ~ file: Template.jsx:26 ~ Template ~ error:", error)
//  console.log("🚀 ~ file: Template.jsx:29 ~ Template ~ setLogo:", setLogo)
//  console.log("🚀 ~ file: Template.jsx:28 ~ Template ~ logo:", logo)
  const [countryCode, setCountryCode] = useState("INR");
  const [country, setCountry] = useState("India");
  const [TagLine, setTagLine] = useState("");
  const [video, setVideo] = useState(null);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [mediaType, setMediaType] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [services, setServices] = useState([
    { title: '', description: '' },
    { title: '', description: '' },
    { title: '', description: '' },
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
      currency: '',
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
    { imgSrc: '', name: '', emailId:'', position:'', uploadedFile: null },
    { imgSrc: '', name: '', emailId:'', position:'', uploadedFile: null },
    { imgSrc: '', name: '', emailId:'', position:'', uploadedFile: null },
    { imgSrc: '', name: '', emailId:'', position:'', uploadedFile: null },
    { imgSrc: '', name: '', emailId:'', position:'', uploadedFile: null },
    ]);

//  const [policies, setPolicies] = useState([
//    { title: 'Privacy Policy', content: '' },
//    { title: 'Terms and Conditions', content: '' },
//    { title: 'Cancellation/Refund Policy', content: '' },
//    { title: 'About Us', content: '' },
//    ]);

  const [policies, setPolicies] = useState({
    'Privacy Policy': '',
    'About Us': '',
    'Refund Policy': [{ heading: '', content: '' }],
    'Terms and Conditions': [{ heading: '', content: '' }]
  });

  const [contactInfo, setContactInfo] = useState({
    address: '',
    phoneNumber: '',
    email: '',
    upiId: '',
    instagram: '',
    youtube: '',
    facebook: '',
  });

  const Ctx = useContext(Context);
  const util = useContext(Context).util;
  useEffect(() => {
    console.log(policies);
    }, [policies]);
    const [loaderInitialized, setLoaderInitialized] = useState(false);
  useEffect(() => {
    async function fetchData() {
      const institutionId = Ctx.userData.institutionName;
      if (!loaderInitialized) { 
        util.setLoader(true); 
        setLoaderInitialized(true);
      }
      try {
        const templateResponse = await API.get(
          "clients",
          `/user/development-form/get-user/${institutionId}`
          );

        const productResponse = await API.get(
          "clients",
          `/user/development-form/get-product/${institutionId}`
          );

        const instructorResponse = await API.get(
          "clients",
          `/user/development-form/get-instructor/${institutionId}`
          );

       console.log('hhhhssdsdsd',templateResponse);
       console.log("😒😒😒😒",productResponse);
       console.log("disidisdd",instructorResponse);

        if (templateResponse) {
//          console.log("HELLO1");

          // COMPANY
          setCompanyName(institutionId);
          setLightPrimaryColor(templateResponse.LightPrimaryColor);
          setLightestPrimaryColor(templateResponse.LightestPrimaryColor);
          setPrimaryColor(templateResponse.PrimaryColor);
          setSecondaryColor(templateResponse.SecondaryColor);
          setSelectedFile(templateResponse.logoUrl);

          let url = templateResponse.logoUrl
          let response = await fetch(url);
          let data = await response.blob();
          let metadata = {
            type: data.type
          };
          let file = new File([data], url.split('/').pop(), metadata);
          setLogo(file);

          // HOME
          setTagLine(templateResponse.TagLine);

          url = templateResponse.videoUrl;
          response = await fetch(url);
          data = await response.blob();
          metadata = {
            type: data.type
          };
          file = new File([data], url.split('/').pop(), metadata);
          setVideo(file);
          setSelectedMedia(templateResponse.videoUrl);

          if (file.type.includes("video")) {
            setMediaType("video");
          } else if (file.type.includes("image")) {
            setMediaType("image");
          }

          // SERVICES
          setsrc_Components_Home_Header3__h1(templateResponse.src_Components_Home_Header3__h1 || '');
          setsrc_Components_Home_Header3__h2(templateResponse.src_Components_Home_Header3__h2 || '');
          setsrc_Components_Home_Why__h1(templateResponse.src_Components_Home_Why__h1 || '');

          setServices([
            {title: templateResponse.src_Components_Home_Header3__h5_1 || '', description: templateResponse.src_Components_Home_Header3__p_1 || ''},
            {title: templateResponse.src_Components_Home_Header3__h5_2 || '', description: templateResponse.src_Components_Home_Header3__p_2 || ''},
            {title: templateResponse.src_Components_Home_Header3__h5_3 || '', description: templateResponse.src_Components_Home_Header3__p_3 || ''}
          ]);

          if (templateResponse.ClassTypes)
            setDanceTypes(templateResponse.ClassTypes);

          // TESTIMONIALS
          url = templateResponse.Testimonial[0].img;
          response = await fetch(url);
          data = await response.blob();
          metadata = {
            type: data.type
          };
          file = new File([data], url.split('/').pop(), metadata);
          templateResponse.Testimonial[0].uploadedFile = file;

          url = templateResponse.Testimonial[1].img;
          response = await fetch(url);
          data = await response.blob();
          metadata = {
            type: data.type
          };
          file = new File([data], url.split('/').pop(), metadata);
          templateResponse.Testimonial[1].uploadedFile = file;

          url = templateResponse.Testimonial[2].img;
          response = await fetch(url);
          data = await response.blob();
          metadata = {
            type: data.type
          };
          file = new File([data], url.split('/').pop(), metadata);
          templateResponse.Testimonial[2].uploadedFile = file;

          const test = [{}, {}, {}];
          for (let i = 0; i < 3; i++) {
            test[i].name = templateResponse.Testimonial[i].name;
            test[i].feedback = templateResponse.Testimonial[i].description;
            test[i].imgSrc = templateResponse.Testimonial[i].img;
            test[i].uploadedFile = templateResponse.Testimonial[i].uploadedFile.name;
            test[i].actualFile = templateResponse.Testimonial[i].uploadedFile;
            test[i].type = templateResponse.Testimonial[i].uploadedFile.type;
          }

          setTestimonials(test);

          // FAQ
          setFaqs(templateResponse.FAQ.map(obj => {
            return {
              question: obj.title,
              answer: obj.content,
            };
          }));

          // POLICY
          setPolicies({
            'Privacy Policy': templateResponse.PrivacyPolicy,
            'About Us': templateResponse.AboutUs,
            'Refund Policy': templateResponse.Refund,
            'Terms and Conditions': templateResponse.TermsData.map(obj => {
              const obj2 = {...obj}
              obj2.heading = obj2.title;
              obj2.title = undefined;
              return obj2;
            }),
          })

          // CONTACT
          setContactInfo({
            address: templateResponse.Query_Address,
            phoneNumber: templateResponse.Query_PhoneNumber,
            email: templateResponse.Query_EmailId,
            upidId: templateResponse.UpiId,
            instagram: templateResponse.Instagram,
            facebook: templateResponse.Facebook,
            youtube: templateResponse.YTLink,
          })
        }
        if (productResponse.length > 0) {
//          console.log("HELLO2");
          console.log(productResponse);
          setSubscriptions(productResponse);
        }
        if (instructorResponse.length > 0) {
//          console.log("HELLO3");

          const inst = [];
          for (let i = 0; i < instructorResponse.length; i++) {
            inst.push({});

            const url = instructorResponse[i].image;
            const response = await fetch(url);
            const data = await response.blob();
            const metadata = {
              type: data.type
            }
            const file = new File([data], url.split('/').pop(), metadata);

            inst[i].imgSrc = instructorResponse[i].image;
            inst[i].uploadedFile = file.name;
            inst[i].actualFile = file;
            inst[i].name = instructorResponse[i].name;
            inst[i].emailId = instructorResponse[i].emailId;
            inst[i].position = instructorResponse[i].position;
            inst[i].instructorId = instructorResponse[i].instructorId;
            inst[i].institution = instructorResponse[i].institution;
          }
          setInstructors(inst);
        }

//        setLoader(false);
      } catch (error) {
        console.error("Error fetching details:", error);
//        setLoader(false);
      } finally {
        util.setLoader(false);
      }
    }

    fetchData();
  }, [Ctx.userData.institutionName, loaderInitialized, util]);
  const institutionId = Ctx.userData.institutionName;

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
      await API.put("clients", "/user/development-form/company", {
        body: {
          institutionid: institutionId ,
          companyName:institutionId ,
          PrimaryColor,
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

      // Get the URL of the uploaded file
      let videoUrl = await Storage.get(response.key);
      videoUrl = videoUrl.split("?")[0];
      setVideo(videoUrl);
      await API.put("clients", "/user/development-form/hero-page", {
        body: {
          institutionid: institutionId,
          TagLine,
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
      const filledDanceTypes = danceTypes.filter(type => type.trim() !== '').slice(0, 5);

      // Pad the array with empty strings to ensure it has a length of 5
      const paddedDanceTypes = filledDanceTypes.concat(Array(5 - filledDanceTypes.length).fill(''));

      // Filter out empty strings from the paddedDanceTypes array
      const nonEmptyDanceTypes = paddedDanceTypes.filter(type => type.trim() !== '');
      await API.put("clients", "/user/development-form/why-choose", {
        body: {
          institutionid: institutionId,
          src_Components_Home_Why__h1,
          src_Components_Home_Header3__h1,
          src_Components_Home_Header3__h2,
          src_Components_Home_Header3__h5_1: services[0].title,
          src_Components_Home_Header3__p_1: services[0].description,
          src_Components_Home_Header3__h5_2: services[1].title,
          src_Components_Home_Header3__p_2: services[1].description,
          src_Components_Home_Header3__h5_3: services[2].title,
          src_Components_Home_Header3__p_3: services[2].description,
          // dance_type: services[0].dance_type,
          ClassTypes: nonEmptyDanceTypes,
        },
      });
    } catch (error) {
      console.error("Error uploading services: ", error);
    }
  };

  const handleTestimonialsUpload = async () => {
    // console.log("AAAAAAAAAAAAAAAAAAAAAA", testimonials);

    try {

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
//    console.log(subscriptions);
    try {
      // Loop through each subscription
      for (let i = 0; i < subscriptions.length; i++) {
        const subscription = subscriptions[i];
//        console.log("OWEIFIWEFIWEOFIWIEFIOWEFWIOEF",subscription);
        // subscription.provides = subscription.provides.map((provide) => provide.description);

        if (subscription.productId) {
          await API.put("clients", "/user/development-form/update-subscription", {
            body: subscription,
          });
        }
        else {
          // Make API call for each subscription
          const response = await API.put("clients", "/user/development-form/subscriptions", {
            body: {
              institution: institutionId,
              ...subscription
            }
          });
          const sub = [...subscriptions];
          sub[i].institution = response.Attributes.institution;
          sub[i].productId = response.Attributes.productId;
          setSubscriptions(sub);
        }
      }
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
          //   FAQ: [
          //     {
          //       Title: faqs[0].question,
          //       Content: faqs[0].answer,
          //     },
          //     {
          //       Title: faqs[1].question,
          //       Content: faqs[1].answer,
          //     },
          //     {
          //       Title: faqs[2].question,
          //       Content: faqs[2].answer,
          //     },
          //     {
          //       Title: faqs[3].question,
          //       Content: faqs[3].answer,
          //     },
          //     {
          //       Title: faqs[4].question,
          //       Content: faqs[4].answer,
          //     },
          //   ]
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
      await API.put("clients", "/user/development-form/policy", {
        body: {
          institutionid: institutionId,
          PrivacyPolicy: policies['Privacy Policy'],
          TermsData: policies['Terms and Conditions'].map(obj => {
            const obj2 = {...obj};
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

      await API.put("clients", "/user/development-form/contact", {
        body: {
          institutionid: institutionId,
          Query_Address: contactInfo.address,
          Query_PhoneNumber: contactInfo.phoneNumber,
          Query_EmailId: contactInfo.email,
          Facebook: contactInfo.facebook,
          Instagram: contactInfo.instagram,
          YTLink: contactInfo.youtube,
          UpiId: contactInfo.upiId,
          Footer_Link_1,
          Footer_Link_2,

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
    setCurrentSection((prevSection) => {
      const nextSection = Math.min(prevSection + 1, 8);
//      console.log(currentSection);

      switch (currentSection) {
        case 0:
          if (!logo) {
            alert("Please upload a company logo before proceeding.");
            return prevSection;
          }
       
          handleCompanyUpload();
          break;
          case 1:
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
            case 2:
              handleServicesUpload();
              break;
              case 3:
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
          case 4:
            const invalidPriceIndex = subscriptions.findIndex(subscription => isNaN(Number(subscription.amount)));
            if (invalidPriceIndex !== -1) {
              alert(`Please enter a valid price number for subscription ${invalidPriceIndex + 1}.`);
              return prevSection;
            }
          handleSubscriptionUpload();
            break;
            case 5:
              const filledFAQs = faqs.filter(faq => (faq.question && faq.answer) || (!faq.question && !faq.answer));

              // Check if both title and answer are filled for each FAQ
          const allFAQsFilled = filledFAQs.length === faqs.length;

          if (!allFAQsFilled) {
            alert("Please fill both the question and answer for each FAQ before proceeding.");
            return prevSection;
          }
          handleFAQsUpload();
          break;
          case 6:
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
          case 7:
            handlePolicyUpload();
            break;
            case 8:

              handleContactUpload();
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

  const handlePrevSection = () => {
    setCurrentSection((prevSection) => Math.max(prevSection - 1, 0));
  };
//  console.log("Logo in Template:", logo);
  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <div className="flex-grow flex">
        <div className="w-[65%] bg-[#30AFBC] pt-[8rem] relative max950:hidden cont">
          <Preview currentSection={currentSection} logo={logo} setLogo={setLogo} TagLine={TagLine} setTagLine={setTagLine} video={video} setVideo={setVideo} services={services} setServices={setServices} faqs={faqs} setFaqs={setFaqs} instructors={instructors}  setInstructors={setInstructors}/>
        </div>
        <div className=" w-4/7 pt-[6rem] max950:mb-10 max950:w-screen max950:px-14 max600:px-0 right-20 fixed respo">
          {currentSection === 0 &&
            <Company
              clients={Companydata}
              companyName={companyName}
              setCompanyName={setCompanyName}
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
              selectedFile={selectedFile} setSelectedFile={setSelectedFile}
            />}

          {currentSection === 1 &&
            <Home
              TagLine={TagLine}
              setTagLine={setTagLine}
              video={video}
              setVideo={setVideo}
              selectedMedia={selectedMedia}
              setSelectedMedia={setSelectedMedia}
              mediaType={mediaType}
              setMediaType={setMediaType}
            />}

          {currentSection === 2 &&
            <Services
              src_Components_Home_Why__h1={src_Components_Home_Why__h1}
              setsrc_Components_Home_Why__h1={setsrc_Components_Home_Why__h1}
              src_Components_Home_Header3__h1={src_Components_Home_Header3__h1}
              setsrc_Components_Home_Header3__h1={setsrc_Components_Home_Header3__h1}
              src_Components_Home_Header3__h2={src_Components_Home_Header3__h2}
              setsrc_Components_Home_Header3__h2={setsrc_Components_Home_Header3__h2}
              services={services}
              setServices={setServices}
              danceTypes={danceTypes}
              setDanceTypes= {setDanceTypes}
            />}

          {currentSection === 3 &&
            <Testimonials
              testimonials={testimonials}
              setTestimonials={setTestimonials}
            />}

          {currentSection === 4 &&
            <Subscription
              subscriptions={subscriptions}
              setSubscriptions={setSubscriptions}
              country={country}
              setCountry={setCountry}
              countryCode={countryCode}
              setCountryCode={setCountryCode}
            />}

          {currentSection === 5 &&
            <FAQs
              faqs={faqs}
              setFaqs={setFaqs}
            />}

          {currentSection === 6 &&
            <Instructors
              instructors={instructors}
              setInstructors={setInstructors}
            />}

          {currentSection === 7 &&
            <Policy
              policies={policies}
              setPolicies={setPolicies}
            />}

          {currentSection === 8 &&
            <Contact
              contactInfo={contactInfo}
              setContactInfo={setContactInfo}
            />}
        </div>
        <div style={{ position: 'fixed', width: '100%', bottom: 0, zIndex: 99 }}>
          <Footer
            saveData={saveData}
            currentSection={currentSection}
            nextSection={handleNextSection}
            prevSection={handlePrevSection}
          />
        </div>
      </div>
    </div>
    );
};

export default Template;