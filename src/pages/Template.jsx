// Template.js
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
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
import PrevSectionDraftHandler from '../components/Template/Form/PrevSectionDraftHandler';
import "./Template.css";
import Context from "../context/Context";
// import {CSVUpload} from '../components/UploadFile/CSVUpload';
const Template = () => {
  const Navigate = useNavigate();
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
  //  console.log("🚀 ~ file: Template.jsx:26 ~ Template ~ setError:", setError)
  //  console.log("🚀 ~ file: Template.jsx:26 ~ Template ~ error:", error)
  //  console.log("🚀 ~ file: Template.jsx:29 ~ Template ~ setLogo:", setLogo)
  //  console.log("🚀 ~ file: Template.jsx:28 ~ Template ~ logo:", logo)
  const [countryCode, setCountryCode] = useState("INR");
  const [country, setCountry] = useState("India");
  const [institutionType, setInstitutionType] = useState("DanceStudio");
  const [institutionFormat, setInstitutionFormat] = useState("Online_Classes");
  const [TagLine, setTagLine] = useState("");
  const [TagLine1, setTagLine1] = useState("");
  const [video, setVideo] = useState(null);
  const [TestimonialBg, setTestimonialBg] = useState(null);
  const [AboutUsBg, setAboutUsBg] = useState(null);
  const [SubscriptionBg, setSubscriptionBg] = useState(null);
  const [InstructorBg, setInstructorBg] = useState(null);
  const [CSVFile, setCSVFile] = useState(null);
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
      heading:'',
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

  //  const [policies, setPolicies] = useState([
  //    { title: 'Privacy Policy', content: '' },
  //    { title: 'Terms and Conditions', content: '' },
  //    { title: 'Cancellation/Refund Policy', content: '' },
  //    { title: 'About Us', content: '' },
  //    ]);

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
    owner_name:'',
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
  // const [loaderInitialized, setLoaderInitialized] = useState(false);
  // useEffect(() => {
  //   async function fetchData() {
  //     // const institutionId = Ctx.userData.institutionName;
  //     const institutionId = Ctx.userData.institutionName;
  //     if (!loaderInitialized) {
  //       util.setLoader(true);
  //       setLoaderInitialized(true);
  //     }
  //     try {
  //       const templateResponse = await API.get(
  //         "clients",
  //         `/user/development-form/get-user/${institutionId}`
  //       );

  //       const productResponse = await API.get(
  //         "clients",
  //         `/user/development-form/get-product/${institutionId}`
  //       );

  //       const instructorResponse = await API.get(
  //         "clients",
  //         `/user/development-form/get-instructor/${institutionId}`
  //       );

  //       console.log('hhhhssdsdsd', templateResponse);
  //       console.log("😒😒😒😒", productResponse);
  //       console.log("disidisdd", instructorResponse);

  //       if (templateResponse) {
  //         //          console.log("HELLO1");

  //         // COMPANY
  //         setCompanyName(institutionId);
  //         setLightPrimaryColor(templateResponse.LightPrimaryColor);
  //         setLightestPrimaryColor(templateResponse.LightestPrimaryColor);
  //         setPrimaryColor(templateResponse.PrimaryColor);
  //         setSecondaryColor(templateResponse.SecondaryColor);
  //         setSelectedFile(templateResponse.logoUrl);

  //         let url = templateResponse.logoUrl
  //         let response = await fetch(url);
  //         let data = await response.blob();
  //         let metadata = {
  //           type: data.type
  //         };
  //         let file = new File([data], url.split('/').pop(), metadata);
  //         setLogo(file);

  //         let url1 = templateResponse.ServicesBg
  //         let response1 = await fetch(url1);
  //         let data1 = await response1.blob();
  //         let metadata1 = {
  //           type: data1.type
  //         };
  //         let file1 = new File([data1], url1.split('/').pop(), metadata1);
  //         setServicesBg(file1);
  //         let url2 = templateResponse.ServicesPortrait
  //         let response2 = await fetch(url2);
  //         let data2 = await response2.blob();
  //         let metadata2 = {
  //           type: data2.type
  //         };
  //         let file2 = new File([data2], url2.split('/').pop(), metadata2);
  //         setServicesPortrait(file2);
  //         let url3 = templateResponse.TestimonialBg
  //         let response3 = await fetch(url3);
  //         let data3 = await response3.blob();
  //         let metadata3 = {
  //           type: data3.type
  //         };
  //         let file3 = new File([data3], url3.split('/').pop(), metadata3);
  //         setTestimonialBg(file3);
  //         let url4 = templateResponse.SubscriptionBg
  //         let response4 = await fetch(url4);
  //         let data4 = await response4.blob();
  //         let metadata4 = {
  //           type: data4.type
  //         };
  //         let file4 = new File([data4], url4.split('/').pop(), metadata4);
  //         setSubscriptionBg(file4);
  //         let url6 = templateResponse.InstructorBg
  //         let response6 = await fetch(url6);
  //         let data6 = await response6.blob();
  //         let metadata6 = {
  //           type: data6.type
  //         };
  //         let file6 = new File([data6], url6.split('/').pop(), metadata6);
  //         setInstructorBg(file6);
  //         let url5 = templateResponse.AboutUsBg
  //         let response5 = await fetch(url5);
  //         let data5 = await response5.blob();
  //         let metadata5 = {
  //           type: data5.type
  //         };
  //         let file5 = new File([data5], url5.split('/').pop(), metadata5);
  //         setAboutUsBg(file5);
  //         // HOME
  //         setTagLine(templateResponse.TagLine);
  //         setTagLine1(templateResponse.TagLine1);
  //         url = templateResponse.videoUrl;
  //         response = await fetch(url);
  //         data = await response.blob();
  //         metadata = {
  //           type: data.type
  //         };
  //         file = new File([data], url.split('/').pop(), metadata);
  //         setVideo(file);
  //         setSelectedMedia(templateResponse.videoUrl);

  //         if (file.type.includes("video")) {
  //           setMediaType("video");
  //         } else if (file.type.includes("image")) {
  //           setMediaType("image");
  //         }

  //         // SERVICES
  //         // setsrc_Components_Home_Header3__h1(templateResponse.src_Components_Home_Header3__h1 || '');
  //         // setsrc_Components_Home_Header3__h2(templateResponse.src_Components_Home_Header3__h2 || '');
  //         // setsrc_Components_Home_Why__h1(templateResponse.src_Components_Home_Why__h1 || '');

  //         // setServices([
  //         //   {title: templateResponse.src_Components_Home_Header3__h5_1 || '', description: templateResponse.src_Components_Home_Header3__p_1 || ''},
  //         //   {title: templateResponse.src_Components_Home_Header3__h5_2 || '', description: templateResponse.src_Components_Home_Header3__p_2 || ''},
  //         //   {title: templateResponse.src_Components_Home_Header3__h5_3 || '', description: templateResponse.src_Components_Home_Header3__p_3 || ''}
  //         // ]);

  //         if (templateResponse.Services)
  //           setServices(templateResponse.Services);

  //         if (templateResponse.ClassTypes)
  //           setDanceTypes(templateResponse.ClassTypes);

  //         // TESTIMONIALS
  //         url = templateResponse.Testimonial[0].img;
  //         response = await fetch(url);
  //         data = await response.blob();
  //         metadata = {
  //           type: data.type
  //         };
  //         file = new File([data], url.split('/').pop(), metadata);
  //         templateResponse.Testimonial[0].uploadedFile = file;

  //         url = templateResponse.Testimonial[1].img;
  //         response = await fetch(url);
  //         data = await response.blob();
  //         metadata = {
  //           type: data.type
  //         };
  //         file = new File([data], url.split('/').pop(), metadata);
  //         templateResponse.Testimonial[1].uploadedFile = file;

  //         url = templateResponse.Testimonial[2].img;
  //         response = await fetch(url);
  //         data = await response.blob();
  //         metadata = {
  //           type: data.type
  //         };
  //         file = new File([data], url.split('/').pop(), metadata);
  //         templateResponse.Testimonial[2].uploadedFile = file;

  //         const test = [{}, {}, {}];
  //         for (let i = 0; i < 3; i++) {
  //           test[i].name = templateResponse.Testimonial[i].name;
  //           test[i].feedback = templateResponse.Testimonial[i].description;
  //           test[i].imgSrc = templateResponse.Testimonial[i].img;
  //           test[i].uploadedFile = templateResponse.Testimonial[i].uploadedFile.name;
  //           test[i].actualFile = templateResponse.Testimonial[i].uploadedFile;
  //           test[i].type = templateResponse.Testimonial[i].uploadedFile.type;
  //         }

  //         setTestimonials(test);

  //         // FAQ
  //         setFaqs(templateResponse.FAQ.map(obj => {
  //           return {
  //             question: obj.title,
  //             answer: obj.content,
  //           };
  //         }));

  //         // POLICY
  //         setPolicies({
  //           'Privacy Policy': templateResponse.PrivacyPolicy,
  //           'About Us': templateResponse.AboutUs,
  //           'Refund Policy': templateResponse.Refund,
  //           'Terms and Conditions': templateResponse.TermsData.map(obj => {
  //             const obj2 = { ...obj }
  //             obj2.heading = obj2.title;
  //             obj2.title = undefined;
  //             return obj2;
  //           }),
  //         })

  //         // CONTACT
  //         setContactInfo({
  //           address: templateResponse.Query_Address,
  //           phoneNumber: templateResponse.Query_PhoneNumber,
  //           email: templateResponse.Query_EmailId,
  //           upidId: templateResponse.UpiId,
  //           instagram: templateResponse.Instagram,
  //           facebook: templateResponse.Facebook,
  //           youtube: templateResponse.YTLink,
  //         })
  //       }

  //       if (productResponse.length > 0) {
  //         console.log("HELLO2", productResponse);
  //         const convertedProductResponse = productResponse.map(product => ({
  //           ...product,
  //           amount: product.amount / 100, // Convert amount to rupee
  //         }));

  //         console.log(convertedProductResponse);
  //         await setSubscriptions(convertedProductResponse);
  //       }
  //       if (instructorResponse.length > 0) {
  //         //          console.log("HELLO3");

  //         const inst = [];
  //         for (let i = 0; i < instructorResponse.length; i++) {
  //           inst.push({});

  //           const url = instructorResponse[i].image;
  //           const response = await fetch(url);
  //           const data = await response.blob();
  //           const metadata = {
  //             type: data.type
  //           }
  //           const file = new File([data], url.split('/').pop(), metadata);

  //           inst[i].imgSrc = instructorResponse[i].image;
  //           inst[i].uploadedFile = file.name;
  //           inst[i].actualFile = file;
  //           inst[i].name = instructorResponse[i].name;
  //           inst[i].emailId = instructorResponse[i].emailId;
  //           inst[i].position = instructorResponse[i].position;
  //           inst[i].instructorId = instructorResponse[i].instructorId;
  //           inst[i].institution = instructorResponse[i].institution;
  //         }
  //         setInstructors(inst);
  //       }

  //       //        setLoader(false);
  //     } catch (error) {
  //       console.error("Error fetching details:", error);
  //       //        setLoader(false);
  //     } finally {
  //       util.setLoader(false);
  //     }
  //   }

  //   fetchData();
  // }, [Ctx.userData.institutionName, loaderInitialized, util]);
  // const institutionId = companyName;

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
          institutionFormat,
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

      const filledDanceTypes = danceTypes.filter(type => type.trim() !== '').slice(0, 5);

      // Pad the array with empty strings to ensure it has a length of 5
      const paddedDanceTypes = filledDanceTypes.concat(Array(5 - filledDanceTypes.length).fill(''));

      // Filter out empty strings from the paddedDanceTypes array
      const nonEmptyDanceTypes = paddedDanceTypes.filter(type => type.trim() !== '');
      await API.put("clients", "/user/development-form/why-choose", {
        body: {
          institutionid: institutionId,
          Services: services,
          // dance_type: services[0].dance_type,
          ClassTypes: nonEmptyDanceTypes,
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
          Query_PhoneNumber: '+' +contactInfo.countryCode + contactInfo.phoneNumber,
          Query_EmailId: contactInfo.email,
          Facebook: contactInfo.facebook,
          userName:contactInfo.owner_name,
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
          // if (!CSVFile) {
          //   alert("Please select a csv file to upload.");
          //  return prevSection;
          // }
          if (!institutionCheckInProgress) {
            institutionCheckInProgress = true;
            API.get("clients", `/user/check-institution?institutionid=${institutionId}`)
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
  //  console.log("Logo in Template:", logo);
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <div className="flex-grow flex">
        <div className="w-[65%] bg-[#30AFBC] pt-[8rem] relative max950:hidden cont">
          <Preview currentSection={currentSection} logo={logo} setLogo={setLogo} TagLine={TagLine} setTagLine={setTagLine} TagLine1={TagLine1} setTagLine1={setTagLine1} video={video} setVideo={setVideo} services={services} setServices={setServices} faqs={faqs} setFaqs={setFaqs} instructors={instructors} setInstructors={setInstructors} />
        </div>
        <div className=" w-[33%] h-full pt-[6rem] pb-[10rem] no-scrollbar max950:mb-10 max950:w-screen max950:px-14 max600:px-0 right-0 fixed respo" style={{ overflow: 'auto' }}>
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
              institutionFormat={institutionFormat}
              setInstitutionFormat={setInstitutionFormat}
              setLogo={setLogo}
              LightestPrimaryColor={LightestPrimaryColor}
              setLightestPrimaryColor={setLightestPrimaryColor}
              LightPrimaryColor={LightPrimaryColor}
              setLightPrimaryColor={setLightPrimaryColor}
              selectedFile={selectedFile} setSelectedFile={setSelectedFile}
              CSVFile={CSVFile}
              setCSVFile={setCSVFile}
            />}
  {currentSection === 1 &&
            <Contact
              contactInfo={contactInfo}
              setContactInfo={setContactInfo}
              SubscriptionBg={SubscriptionBg}
              setSubscriptionBg={setSubscriptionBg}
              InstructorBg={InstructorBg}
              setInstructorBg={setInstructorBg}
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
            />}

          {currentSection === 3 &&
            <Services
              setServicesPortrait={setServicesPortrait}
              servicesPortrait={servicesPortrait}
              setServicesBg={setServicesBg}
              servicesBg={servicesBg}
              services={services}
              setServices={setServices}
              danceTypes={danceTypes}
              setDanceTypes={setDanceTypes}
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
            institutionId={institutionId}
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

export default Template;