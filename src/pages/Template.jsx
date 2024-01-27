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

  //
  const [LightPrimaryColor] = useState(null);
  const [LightestPrimaryColor] = useState(null);
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

  const [subscriptions, setSubscriptions] = useState([
    {
      heading: '',
      description: '',
      priceAndBilling: '',
    },
    {
      heading: '',
      description: '',
      priceAndBilling: '',
    },
    {
      heading: '',
      description: '',
      priceAndBilling: '',
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
    { imgSrc: '', name: '', uploadedFile: null },
    { imgSrc: '', name: '', uploadedFile: null },
    { imgSrc: '', name: '', uploadedFile: null },
    { imgSrc: '', name: '', uploadedFile: null },
    { imgSrc: '', name: '', uploadedFile: null },
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
          institution: "awsaiapp",
          Testi_1: testimonials[0].name,
          Des_Testi_1: testimonials[0].feedback,
          Img_Testi_1: imageUrl1,
          Testi_2: testimonials[1].name,
          Des_Testi_2: testimonials[1].feedback,
          Img_Testi_2: imageUrl2,
          Testi_3: testimonials[2].name,
          Des_Testi_3: testimonials[2].feedback,
          Img_Testi_3: imageUrl3,
        },
      });
    } catch (error) {
      console.error("Error uploading testimonials: ", error);
    }
  };

  const handleSubscriptionUpload = async () => {
    try {
      await API.put("clients", "/user/development-form/subscriptions", {
        body: {
          institution: "awsaiapp",
          Sub_title_1: subscriptions[0].heading,
          Sub_Des_1: subscriptions[0].description,
          Sub_Price_1: subscriptions[0].priceAndBilling,
          Sub_title_2: subscriptions[1].heading,
          Sub_Des_2: subscriptions[1].description,
          Sub_Price_2: subscriptions[1].priceAndBilling,
          Sub_title_3: subscriptions[2].heading,
          Sub_Des_3: subscriptions[2].description,
          Sub_Price_3: subscriptions[2].priceAndBilling,
        },
      });
    } catch (error) {
      console.error("Error uploading subscription: ", error);
    }
  };

  const handleFAQsUpload = async () => {
    try {
      await API.put("clients", "/user/development-form/faq", {
        body: {
          institution: "awsaiapp",
          Faq_1: faqs[0].question,
          Des_Faq_1: faqs[0].answer,
          Faq_2: faqs[1].question,
          Des_Faq_2: faqs[1].answer,
          Faq_3: faqs[2].question,
          Des_Faq_3: faqs[2].answer,
          Faq_4: faqs[3]?.question,
          Des_Faq_4: faqs[3]?.answer,
          Faq_5: faqs[4]?.question,
          Des_Faq_5: faqs[4]?.answer,
        },
      });
    } catch (error) {
      console.error("Error uploading FAQs: ", error);
    }
  }

  const handleInstructorsUpload = async () => {
    try {
      const response1 = await Storage.put(`awsaiapp/${instructors[0].uploadedFile.name}`, instructors[0].uploadedFile, {
        contentType: instructors[0].uploadedFile.type,
      });

      // Get the URL of the uploaded file
      let inst_pic_1 = await Storage.get(response1.key);
      inst_pic_1 = inst_pic_1.split("?")[0];

      const response2 = await Storage.put(`awsaiapp/${instructors[1].uploadedFile.name}`, instructors[1].uploadedFile, {
        contentType: instructors[1].uploadedFile.type,
      });

      // Get the URL of the uploaded file
      let inst_pic_2 = await Storage.get(response2.key);
      inst_pic_2 = inst_pic_2.split("?")[0];

      const response3 = await Storage.put(`awsaiapp/${instructors[2].uploadedFile.name}`, instructors[2].uploadedFile, {
        contentType: instructors[2].uploadedFile.type,
      });

      // Get the URL of the uploaded file
      let inst_pic_3 = await Storage.get(response3.key);
      inst_pic_3 = inst_pic_3.split("?")[0];

      const response4 = await Storage.put(`awsaiapp/${instructors[3].uploadedFile.name}`, instructors[3].uploadedFile, {
        contentType: instructors[3].uploadedFile.type,
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

      await API.put("clients", "/user/development-form/instructors", {
        body: {
          institution: "awsaiapp",
          instructor_1: instructors[0].name,
          inst_position_1: instructors[0].position,
          inst_pic_1,
          instructor_2: instructors[1].name,
          inst_position_2: instructors[1].position,
          inst_pic_2,
          instructor_3: instructors[2].name,
          inst_position_3: instructors[2].position,
          inst_pic_3,
          instructor_4: instructors[3].name,
          inst_position_4: instructors[3].position,
          inst_pic_4,
          instructor_5: instructors[4].name,
          inst_position_5: instructors[4].position,
          inst_pic_5,
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
          Policy_des: policies[0].content,
          Terms_des: policies[1].content,
          Refund_des: policies[2].content,
          About_des: policies[3].content,
        },
      });
    } catch (error) {
      console.error("Error uploading policy: ", error);
    }
  }

  const handleContactUpload = async () => {
    try {
      console.log("LOG +++++ " + contactInfo.address);

      await API.put("clients", "/user/development-form/contact/awsaiapp", {
        body: {
          institution: "awsaiapp",
          Address: contactInfo.address,
          Phone_Num: contactInfo.phoneNumber,
          Email: contactInfo.email,
          Facebook_des: contactInfo.facebook,
          Instagram_des: contactInfo.instagram,
          Youtube_des: contactInfo.youtube,
          Upi_id: contactInfo.upiId,

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