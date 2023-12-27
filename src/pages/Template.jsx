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
  import { API } from "aws-amplify";
  import "./Template.css";  

  const Template = () => {
    const [currentSection, setCurrentSection] = useState(0);
    const [savedData, setsavedData] = useState();
    const [Companydata, setCompanydata] = useState([]);
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState(null);
    const [logo, setLogo] = useState(null);

    

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
            {currentSection === 0 && <Company clients={Companydata} />}
            {currentSection === 1 && <Home />}
            {currentSection === 2 && <Services />}
            {currentSection === 3 && <Testimonials />}
            {currentSection === 4 && <Subscription />}
            {currentSection === 5 && <FAQs />}
            {currentSection === 6 && <Instructors />}
            {currentSection === 7 && <Policy />}
            {currentSection === 8 && <Contact />}
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