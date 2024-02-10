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
      planId:0,
      description:0,
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
      planId:0,
      description:0,
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
      planId:0,
      description:0,
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
      const response = await Storage.put(`institution-utils/happyprancer/images/${logo.name}`, logo, {
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
          institutionid: companyName,
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
          institutionid: companyName,
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
          institutionid: companyName,
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
    console.log("AAAAAAAAAAAAAAAAAAAAAA", testimonials);
    try {
      const response1 = await Storage.put(`institution-utils/happyprancer/images/Testimonial/${testimonials[0].uploadedFile}`, testimonials[0].actualFile, {
        contentType: testimonials[0].actualFile.type,
      });

      // Get the URL of the uploaded file
      let imageUrl1 = await Storage.get(response1.key);
      imageUrl1 = imageUrl1.split("?")[0];

      const response2 = await Storage.put(`institution-utils/happyprancer/images/Testimonial/${testimonials[1].uploadedFile}`, testimonials[1].actualFile, {
        contentType: testimonials[1].actualFile.type,
      });

      // Get the URL of the uploaded file
      let imageUrl2 = await Storage.get(response2.key);
      imageUrl2 = imageUrl2.split("?")[0];

      const response3 = await Storage.put(`institution-utils/happyprancer/images/Testimonial/${testimonials[2].uploadedFile}`, testimonials[2].actualFile, {
        contentType: testimonials[2].actualFile.type,
      });

      // Get the URL of the uploaded file
      let imageUrl3 = await Storage.get(response3.key);
      imageUrl3 = imageUrl3.split("?")[0];
      

      await API.put("clients", "/user/development-form/testimonial", {
        body: {
          institutionid: companyName,
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
    console.log(subscriptions);
    try {
      // Loop through each subscription
      for (let i = 0; i < subscriptions.length; i++) {
        const subscription = subscriptions[i];
        console.log("OWEIFIWEFIWEOFIWIEFIOWEFWIOEF",subscription);
        // subscription.provides = subscription.provides.map((provide) => provide.description);

        // Make API call for each subscription
        await API.put("clients", "/user/development-form/subscriptions", {
          body: {
            institution: companyName,
            ...subscription // Send individual subscription inside an array
          }
        });
      }
    } catch (error) {
      console.error("Error uploading subscriptions:", error);
    }
  };
  
  



  const handleFAQsUpload = async () => {
    try {
      await API.put("clients", "/user/development-form/faq", {
        body: {
          institutionid: companyName,
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
        let instructorsArray = [];
        for (let i = 0; i < instructors.length; i++) {
            const instructor = instructors[i];
            if (instructor.name && instructor.emailId && instructor.position) {
                const response = await Storage.put(`institution-utils/happyprancer/images/Instructor/${instructor.uploadedFile}`, instructor.actualFile, {
                    contentType: instructor.actualFile.type,
                });
                let inst_pic = await Storage.get(response.key);
                inst_pic = inst_pic.split("?")[0];
                instructorsArray.push({
                    name: instructor.name,
                    emailId: instructor.emailId,
                    image: inst_pic,
                    position: instructor.position,
                });
            }
        }

        await API.put("clients", "/user/development-form/instructor", {
            body: {
                institution: companyName,
                Instructor: instructorsArray,
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
          institutionid: companyName,
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
          institutionid: companyName,
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