// Template.js
import React, { useState, useEffect } from 'react';
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
const Template = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [savedData, setsavedData] = useState();
  console.log("🚀 ~ file: Template.jsx:21 ~ Template ~ savedData:", savedData)
  const [Companydata, setCompanydata] = useState([]);
  const [loader, setLoader] = useState(false);
  console.log("🚀 ~ file: Template.jsx:24 ~ Template ~ loader:", loader)
  const [error, setError] = useState(null);
  const [logo, setLogo] = useState(null);
  const [danceTypes, setDanceTypes] = useState(['', '', '', '', '']);
  //
  const [LightPrimaryColor] = useState("#225c59");
  const [LightestPrimaryColor] = useState("#c3f3f1");
  // const [logo, setLogo] = useState(null);
  const [src_Components_Home_Why__h1, setsrc_Components_Home_Why__h1] = useState(null);
  const [src_Components_Home_Header3__h1, setsrc_Components_Home_Header3__h1] = useState(null);
  const [src_Components_Home_Header3__h2, setsrc_Components_Home_Header3__h2] = useState(null);
  
  const [companyName, setCompanyName] = useState(null);
  const [PrimaryColor, setPrimaryColor] = useState("#1B7571");
  const [SecondaryColor, setSecondaryColor] = useState("#000000");
  console.log("🚀 ~ file: Template.jsx:26 ~ Template ~ setError:", setError)
  console.log("🚀 ~ file: Template.jsx:26 ~ Template ~ error:", error)
  console.log("🚀 ~ file: Template.jsx:29 ~ Template ~ setLogo:", setLogo)
  console.log("🚀 ~ file: Template.jsx:28 ~ Template ~ logo:", logo)
  const [countryCode, setCountryCode] = useState("INR");
  const [country, setCountry] = useState("India");
  const [TagLine, setTagLine] = useState("");
  const [video, setVideo] = useState(null);

  const [services, setServices] = useState([
    { title: '', description: '' },
    { title: '', description: '' },
    { title: '', description: '' },
  ]);

  const [testimonials, setTestimonials] = useState([
    { imgSrc: '', name: '', feedback: '', uploadedFile: null },
    { imgSrc: '', name: '', feedback: '', uploadedFile: null },
    { imgSrc: '', name: '', feedback: '', uploadedFile: null },
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

  const [policies, setPolicies] = useState([
    { title: 'Privacy Policy', content: '' },
    { title: 'Terms and Conditions', content: '' },
    { title: 'Cancellation/Refund Policy', content: '' },
    { title: 'About Us', content: '' },
  ]);

  const [contactInfo, setContactInfo] = useState({
    address: '',
    phoneNumber: '',
    email: '',
    upiId: '',
    instagram: '',
    youtube: '',
    facebook: '',
  });


  const handleCompanyUpload = async () => {
    try {
      // Upload the file to S3 with the filename as Cognito User ID
      const response = await Storage.put(`awsaiapp/${logo.name}`, logo, {
        contentType: logo.type,
      });

      // Get the URL of the uploaded file
      let imageUrl = await Storage.get(response.key);
      imageUrl = imageUrl.split("?")[0];
      setLogo(imageUrl);
      console.log("logo: ", imageUrl);
      const additionalAttributes = {
        LightPrimaryColor: LightPrimaryColor !== undefined ? LightPrimaryColor : null,
        LightestPrimaryColor: LightestPrimaryColor !== undefined ? LightestPrimaryColor : null,
      };
      await API.put("clients", "/user/development-form/company", {
        body: {
          institution: "awsaiapp",
          companyName,
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
      const response = await Storage.put(`awsaiapp/${video.name}`, video, {
        contentType: video.type,
      });

      // Get the URL of the uploaded file
      let videoUrl = await Storage.get(response.key);
      videoUrl = videoUrl.split("?")[0];

      await API.put("clients", "/user/development-form/hero-page", {
        body: {
          institution: "awsaiapp",
          TagLine,
          videoUrl,
        },
      });

      console.log("video: ", videoUrl);
    } catch (error) {
      console.error("Error uploading video: ", error);
    }
  }

  const handleServicesUpload = async () => {
    try {
      await API.put("clients", "/user/development-form/why-choose", {
        body: {
          institution: "awsaiapp",
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
          dance_type: danceTypes,
        },
      });
    } catch (error) {
      console.error("Error uploading services: ", error);
    }
  };

  const handleTestimonialsUpload = async () => {
    try {
      const response1 = await Storage.put(`awsaiapp/${testimonials[0].uploadedFile.name}`, testimonials[0].uploadedFile, {
        contentType: testimonials[0].uploadedFile.type,
      });

      // Get the URL of the uploaded file
      let imageUrl1 = await Storage.get(response1.key);
      imageUrl1 = imageUrl1.split("?")[0];

      const response2 = await Storage.put(`awsaiapp/${testimonials[1].uploadedFile.name}`, testimonials[1].uploadedFile, {
        contentType: testimonials[1].uploadedFile.type,
      });

      // Get the URL of the uploaded file
      let imageUrl2 = await Storage.get(response2.key);
      imageUrl2 = imageUrl2.split("?")[0];

      const response3 = await Storage.put(`awsaiapp/${testimonials[2].uploadedFile.name}`, testimonials[2].uploadedFile, {
        contentType: testimonials[2].uploadedFile.type,
      });

      // Get the URL of the uploaded file
      let imageUrl3 = await Storage.get(response3.key);
      imageUrl3 = imageUrl3.split("?")[0];
      

      await API.put("clients", "/user/development-form/testimonial", {
        body: {
          Testimonial: [
            {
              name: testimonials[0].name,
              description: testimonials[0].feedback,
              image: imageUrl1,
            },
            {
              name: testimonials[1].name,
              description: testimonials[1].feedback,
              image: imageUrl2,
            },
            {
              name: testimonials[2].name,
              description: testimonials[2].feedback,
              image: imageUrl3,
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
      console.log(subscriptions);
      const subscriptionObject = {
        Subscription: subscriptions,
      };
      
      await API.put("clients", "/user/development-form/subscriptions", {
       body: subscriptionObject,
      });
    } catch (error) {
      console.error("Error uploading subscription: ", error);
    }
  };

  const handleFAQsUpload = async () => {
    try {
      await API.put("clients", "/user/development-form/faq", {
        body: {
          FAQ: [
            {
              Title: faqs[0].question,
              Content: faqs[0].answer,
            },
            {
              Title: faqs[1].question,
              Content: faqs[1].answer,
            },
            {
              Title: faqs[2].question,
              Content: faqs[2].answer,
            },
            {
              Title: faqs[3].question,
              Content: faqs[3].answer,
            },
            {
              Title: faqs[4].question,
              Content: faqs[4].answer,
            },
          ]
        },
      });
    } catch (error) {
      console.error("Error uploading FAQs: ", error);
    }
  }

  const handleInstructorsUpload = async () => {
    try {
      const response1 = await Storage.put(`awsaiapp/${instructors[0].uploadedFile}`, instructors[0].actualFile, {
        contentType: instructors[0].actualFile.type,
      });

      // Get the URL of the uploaded file
      let inst_pic_1 = await Storage.get(response1.key);
      inst_pic_1 = inst_pic_1.split("?")[0];

      const response2 = await Storage.put(`awsaiapp/${instructors[1].uploadedFile}`, instructors[1].actualFile, {
        contentType: instructors[1].actualFile.type,
      });

      // Get the URL of the uploaded file
      let inst_pic_2 = await Storage.get(response2.key);
      inst_pic_2 = inst_pic_2.split("?")[0];

      const response3 = await Storage.put(`awsaiapp/${instructors[2].uploadedFile}`, instructors[2].actualFile, {
        contentType: instructors[2].actualFile.type,
      });

      // Get the URL of the uploaded file
      let inst_pic_3 = await Storage.get(response3.key);
      inst_pic_3 = inst_pic_3.split("?")[0];

      const response4 = await Storage.put(`awsaiapp/${instructors[3].uploadedFile}`, instructors[3].actualFile, {
        contentType: instructors[3].actualFile.type,
      });

      // Get the URL of the uploaded file
      let inst_pic_4 = await Storage.get(response4.key);
      inst_pic_4 = inst_pic_4.split("?")[0];

      let inst_pic_5 = null;
      if (instructors[4].uploadedFile) {
        // const response5 = await Storage.put(`awsaiapp/${instructors[4].uploadedFile.name}`, instructors[4].uploadedFile, {
        //   contentType: instructors[4].uploadedFile.type,
        // });

        // Get the URL of the uploaded file
        // let inst_pic_5 = await Storage.get(response5.key);
        // inst_pic_5 = inst_pic_5.split("?")[0];
      }

      await API.put("clients", "/user/development-form/instructor", {
        body: {
          // institution: "awsaiapp",
          // instructor_1: instructors[0].name,
          // inst_position_1: instructors[0].position,
          // inst_pic_1,
          // instructor_2: instructors[1].name,
          // inst_position_2: instructors[1].position,
          // inst_pic_2,
          // instructor_3: instructors[2].name,
          // inst_position_3: instructors[2].position,
          // inst_pic_3,
          // instructor_4: instructors[3].name,
          // inst_position_4: instructors[3].position,
          // inst_pic_4,
          // instructor_5: instructors[4].name,
          // inst_position_5: instructors[4].position,
          // inst_pic_5,
          Instructor: [
            {
              name: instructors[0].name,
              emailId: instructors[0].emailId,
              image: inst_pic_1,
              position:instructors[0].position,
            },
            {
              name: instructors[1].name,
              emailId: instructors[1].emailId,
              image: inst_pic_2,
              position:instructors[1].position,
            },
            {
              name: instructors[2].name,
              emailId: instructors[2].emailId,
              image: inst_pic_3,
              position:instructors[2].position,
            },
            {
              name: instructors[3].name,
              emailId: instructors[3].emailId,
              image: inst_pic_4,
              position:instructors[3].position,
            },
            {
              name: instructors[4].name,
              emailId: instructors[4].emailId,
              image: inst_pic_5,
              position:instructors[4].position,
            },
          ]
        },
      });
    } catch (error) {
      console.error("Error uploading instructors: ", error);
    }
  }

  const handlePolicyUpload = async () => {
    try {
      await API.put("clients", "/user/development-form/policy", {
        body: {
          institution: "awsaiapp",
          PrivacyPolicy: policies[0].content,
          TermsData: policies[1].content,
          Refund: policies[2].content,
          AboutUs: policies[3].content,
        },
      });
    } catch (error) {
      console.error("Error uploading policy: ", error);
    }
  }

  const handleContactUpload = async () => {
    try {
      console.log("LOG +++++ " + contactInfo.address);

      await API.put("clients", "/user/development-form/contact", {
        body: {
          institution: "awsaiapp",
          Query_Address: contactInfo.address,
          Query_PhoneNumber: contactInfo.phoneNumber,
          Query_EmailId: contactInfo.email,
          Footer_Link_Facebook: contactInfo.facebook,
          Footer_Link_Instagram: contactInfo.instagram,
          YTLink: contactInfo.youtube,
          UpiId: contactInfo.upiId,

        },
      });
    } catch (error) {
      console.error("Error uploading contact: ", error);
    }
  }




  const fetchClients = async (institution) => {
    try {
      setLoader(true);
      const response = await API.get("clients", "/user/development-form/get-time/awsaiapp");
      console.log(response)
      setCompanydata(response);
    } catch (error) {
      console.error("Error fetching clients:", error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchClients();
    console.log("The daTa are fetching!");
  }, []);


  const handleNextSection = () => {
    setCurrentSection((prevSection) => {
      const nextSection = Math.min(prevSection + 1, 8);
      console.log(currentSection);

      switch (currentSection) {
        case 0:
          handleCompanyUpload();
          break;
        case 1:
          handleHomeUpload();
          break;
        case 2:
          handleServicesUpload();
          break;
        case 3:
          handleTestimonialsUpload();
          break;
        case 4:
          handleSubscriptionUpload();
          break;
        case 5:
          handleFAQsUpload();
          break;
        case 6:
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

      console.log(`Current Section: ${prevSection}, Next Section: ${nextSection}`);
      return nextSection;
    });
  };

  const saveData = () => {
    setsavedData({});
    console.log("Saved Trigger")
  };

  const handlePrevSection = () => {
    setCurrentSection((prevSection) => Math.max(prevSection - 1, 0));
  };
  console.log("Logo in Template:", logo);
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
            />}

          {currentSection === 1 &&
            <Home
              TagLine={TagLine}
              setTagLine={setTagLine}
              video={video}
              setVideo={setVideo}
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