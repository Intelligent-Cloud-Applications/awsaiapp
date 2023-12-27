  // Template.js
  import React, { useState,useEffect } from 'react';
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
    const [Companydata, setCompanydata] = useState([]);
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState(null);
    // const [logo, setLogo] = useState(null);

    const [companyName, setCompanyName] = useState(null);
    const [domainName, setDomainName] = useState("");
    const [companyLineColor, setCompanyLineColor] = useState("#939393");
    const [domainLineColor, setDomainLineColor] = useState("#939393");
    const [logo, setLogo] = useState(null);

    const [tagline, setTagline] = useState("");
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
        
        console.log("logo: ", imageUrl);

        API.put("clients", "/user/development-form/company", {
          body: {
            institution: "awsaiapp",
            companyName,
            domainName,
            companyLineColor,
            domainLineColor,
            logoUrl: imageUrl,
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
            tagline,
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
            service_title_1: services[0].title,
            des_1: services[0].description,
            services_title_2: services[1].title,
            des_2: services[1].description,
            services_title_3: services[2].title,
            des_3: services[2].description,
          },
        });
      } catch (error) {
        console.error("Error uploading services: ", error);
      }
    };

    const handleTestimonialsUpload = async () => {
      try {
        await API.put("clients", "/user/development-form/testimonial", {
          body: {
            institution: "awsaiapp",
            Testi_1: testimonials[0].name,
            Des_Testi_1: testimonials[0].feedback,
            Testi_2: testimonials[1].name,
            Des_Testi_2: testimonials[1].feedback,
            Testi_3: testimonials[2].name,
            Des_Testi_3: testimonials[2].feedback,
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
            Sub_title_2: subscriptions[1].heading,
            Sub_Des_2: subscriptions[1].description,
            Sub_title_3: subscriptions[2].heading,
            Sub_Des_3: subscriptions[2].description,
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
            Faq_4: faqs[3].question,
            Des_Faq_4: faqs[3].answer,
            Faq_5: faqs[4].question,
            Des_Faq_5: faqs[4].answer,
          },
        });
      } catch (error) {
        console.error("Error uploading FAQs: ", error);
      }
    }

    const handleInstructorsUpload = async () => {
      try {
        await API.put("clients", "/user/development-form/instructors", {
          body: {
            institution: "awsaiapp",
            instructors,
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
        await API.put("clients", "/user/development-form/contact", {
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

    return (
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <div className="flex-grow flex">
          <div className="w-[65%] bg-[#30AFBC] pt-[8rem] relative max950:hidden cont">
            <Preview currentSection={currentSection} />
          </div>
          <div className=" w-4/7 pt-[6rem] max950:mb-10 max950:w-screen max950:px-14 max600:px-0 right-20 fixed respo">
            {currentSection === 0 && 
            <Company
              clients={Companydata} 
              companyName={companyName} 
              setCompanyName={setCompanyName} 
              domainName={domainName}
              setDomainName={setDomainName}
              companyLineColor={companyLineColor}
              setCompanyLineColor={setCompanyLineColor}
              domainLineColor={domainLineColor}
              setDomainLineColor={setDomainLineColor}
              logo={logo}
              setLogo={setLogo}
            />}

            {currentSection === 1 &&
            <Home
              tagline={tagline}
              setTagline={setTagline}
              video={video}
              setVideo={setVideo}
            />}

            {currentSection === 2 &&
            <Services
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