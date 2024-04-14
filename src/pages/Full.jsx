import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { API } from "aws-amplify";
import Navbar from "../components/Home/Navbar";
import { Storage } from "aws-amplify";
import Currency from "../components/Auth/Currency";
import "./Full.css";
import { useNavigate } from 'react-router-dom';
import Context from "../context/Context";
const Full = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const institutionNames = searchParams.get("institutionName");

  const [templateDetails, setTemplateDetails] = useState(null);
  const [subscriptionDetails, setSubscriptionDetails] = useState(null);
  const [instructorDetails, setInstructorDetails] = useState(null);
  const [loader, setLoader] = useState(true);

  const util = useContext(Context).util;
  const goBack = () => {
    navigate('/');
  };
  const [loaderInitialized, setLoaderInitialized] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      if (institutionNames) {
        try {
          if (!loaderInitialized) { // Check if loader is false and not initialized
            util.setLoader(true); 
            setLoaderInitialized(true);
          }
  
          const templateResponse = await API.get(
            "clients",
            `/user/development-form/get-user/${institutionNames}`
          );
          await setTemplateDetails(templateResponse);
  
          const productResponse = await API.get(
            "clients",
            `/user/development-form/get-product/${institutionNames}`
          );
          await setSubscriptionDetails(productResponse);
  
          const instructorResponse = await API.get(
            "clients",
            `/user/development-form/get-instructor/${institutionNames}`
          );
          await setInstructorDetails(instructorResponse);
        } catch (error) {
          console.error("Error fetching details:", error);
        } finally {
          setLoader(false);
          util.setLoader(false);
        }
      }
    };
  
    fetchData();
  }, [institutionNames, loader, loaderInitialized, util]);
  
  
  const handleServiceTitleChange = (event, index) => {
    const updatedServices = [...templateDetails.Services];
    updatedServices[index].title = event.target.value;
    setTemplateDetails({ ...templateDetails, Services: updatedServices });
  };

  // Define handleItemChange function
  const handleItemChange = (event, serviceIndex, itemIndex) => {
    const updatedServices = [...templateDetails.Services];
    updatedServices[serviceIndex].items[itemIndex] = event.target.value;
    setTemplateDetails({ ...templateDetails, Services: updatedServices });
  };

  // Define addItem function
  const addItem = (index) => {
    const updatedServices = [...templateDetails.Services];
    updatedServices[index].items.push('');
    setTemplateDetails({ ...templateDetails, Services: updatedServices });
  };

  
 
  // util.setLoader(false);
  const handleVideoChange = async (event) => {
    const videoFile = event.target.files[0];
    try {
      const response = await Storage.put(
        `${institutionNames}/videos/${videoFile.name}`,
        videoFile,
        {
          contentType: videoFile.type,
        }
      );

    
      let videoUrl = await Storage.get(response.key);
      videoUrl = videoUrl.split("?")[0];

     
      setTemplateDetails((prevState) => ({
        ...prevState,
        videoUrl: videoUrl,
      }));

      console.log("Video uploaded successfully:", videoUrl);
    } catch (error) {
      console.error("Error uploading video:", error);
    }
  };

  const handleFileChange = async (event, key) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      setTemplateDetails((prevState) => ({
        ...prevState,
        [key]: reader.result,
      }));

     
      try {
        const response = await Storage.put(
          `${institutionNames}/images/${file.name}`,
          file,
          {
            contentType: file.type,
          }
        );

      
        let imageUrl = await Storage.get(response.key);
        imageUrl = imageUrl.split("?")[0];

       
        setTemplateDetails((prevState) => ({
          ...prevState,
          [key]: imageUrl,
        }));

        console.log("Uploaded file URL: ", imageUrl);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    };
  };

  const handleFileChange1 = async (event, testimonialIndex) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      try {
        const response = await Storage.put(
          `institution-utils/${institutionNames}/images/Testimonial/${file.name}`,
          file,
          {
            contentType: file.type,
          }
        );
        console.log("File uploaded successfully:", response);
        let imageUrl = await Storage.get(response.key);
        imageUrl = imageUrl.split("?")[0];

        
        setTemplateDetails((prevState) => {
          const updatedTestimonials = [...prevState.Testimonial];
          updatedTestimonials[testimonialIndex].img = imageUrl;
          return { ...prevState, Testimonial: updatedTestimonials };
        });
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    };
  };
  const handleFileChange3 = async (event, index) => {
    const file = event.target.files[0]; 
    try {
      const uploadedFile = await Storage.put(
        `institution-utils/${institutionNames}/images/Instructor/${file.name}`, 
        file, 
        {
          contentType: file.type 
        }
      );
  
      console.log("File uploaded successfully:", uploadedFile);
  
      
      let imageUrl = await Storage.get(uploadedFile.key);
      imageUrl = imageUrl.split("?")[0];
  
     
      setInstructorDetails((prevState) => {
        const updatedInstructors = [...prevState];
        updatedInstructors[index].image = imageUrl;
        return updatedInstructors;
      });
  
      console.log("File URL:", imageUrl);
    } catch (error) {
      console.error("Error uploading file: ", error);
    }
  };
 
  const durationInMilliseconds = (subscriptionType, durationText) => {
    let durationInMillis = 0;
  
    switch (subscriptionType) {
      case 'year':
        durationInMillis = 365 * 24 * 60 * 60 * 1000;
        break;
      case 'month':
        durationInMillis = 30 * 24 * 60 * 60 * 1000; 
        break;
      case 'week':
        durationInMillis = 7 * 24 * 60 * 60 * 1000; 
        break;
        case 'quarter':
          durationInMillis = 3 * 30 * 24 * 60 * 60 * 1000; 
          break;
      default:
        break;
    }
  
    return durationInMillis;
  };
  
  const handleSubscriptionTypeChange = (e, index) => {
    const [subscriptionType, durationText] = e.target.value.split(':');
  
    setSubscriptionDetails(prevDetails => {
      return prevDetails.map((subscription, i) => {
        if (i === index) {
          return {
            ...subscription,
            subscriptionType,
            durationText,
            duration: durationInMilliseconds(subscriptionType, durationText),
          };
        }
        return subscription;
      });
    });
  };
  
  
  
  const addSubscription = () => {
    setSubscriptionDetails(prevDetails => [...prevDetails, {
      heading: '',
      amount: '',
      india: true,
      subscriptionType: 'year',
      durationText:'Yearly',
      country: 'India',
      currency: 'INR',
      duration: 365 * 24 * 60 * 60 * 1000,
      provides: [] 
    }]);
  };
 
  const handleCountryChange = (e, index) => {
    const newValue = e.target.value;
    // const countryCode = e.target.options[e.target.selectedIndex].getAttribute("data-countryCode");
    const countryName = e.target.options[e.target.selectedIndex].textContent.split(' ')[0];
    setSubscriptionDetails(prevDetails => {
        const updatedDetails = [...prevDetails];
        updatedDetails[index].country = countryName;
        updatedDetails[index].currency = newValue; 
        return updatedDetails;
    });
};

  
  
  const saveChanges = async () => {
    util.setLoader(true);
    try {
      if (instructorDetails && instructorDetails.length > 0) {
        
        const instructorPromises = [];
        instructorDetails.forEach(instructor => {
          // Check if instructor already has an ID
          if (instructor.instructorId) {
           
            instructorPromises.push(API.put("clients", `/user/development-form/update-instructor`, {
              body: {
                instructorId: instructor.instructorId,
                institution: institutionNames,
                name: instructor.name,
                emailId: instructor.emailId,
                image: instructor.image,
                position: instructor.position,
              },
            }));
          } else {
           
            const imageUrl = instructor.image; 
            instructorPromises.push(API.put("clients", `/user/development-form/instructor`, {
              body: {
                institution: institutionNames,
                name: instructor.name,
                emailId: instructor.emailId,
                image: imageUrl,
                position: instructor.position,
              },
            }));
          }
        });
       
        await Promise.all(instructorPromises);
      }
      if (subscriptionDetails && subscriptionDetails.length > 0) {
      
        const subscriptionPromises = [];
      
        subscriptionDetails.forEach(subscription => {
          if (subscription.productId) {
           
            subscriptionPromises.push(API.put("clients", "/user/development-form/update-subscription", {
              body: {
                productId: subscription.productId,
                institution: institutionNames,
                amount: subscription.amount,
                country: subscription.country,
                currency: subscription.currency,
                duration: subscription.duration,
                durationText: subscription.durationText,
                heading: subscription.heading,
                india: subscription.india,
                provides: subscription.provides,
                subscriptionType: subscription.subscriptionType,
              },
            }));
          } else {
           
            subscriptionPromises.push(API.put("clients", "/user/development-form/subscriptions", {
              body: {
                institution: institutionNames,
                amount: subscription.amount,
                country: subscription.country,
                currency: subscription.currency,
                duration: subscription.duration,
                durationText: subscription.durationText,
                heading: subscription.heading,
                india: subscription.india,
                provides: subscription.provides,
                subscriptionType: subscription.subscriptionType,
              },
            }));
          }
        });
      
       
        await Promise.all(subscriptionPromises);
      }
      
  
      await Promise.all([
        API.put("clients", "/user/development-form/company", {
          body: {
            institutionid: institutionNames,
            companyName: institutionNames,
            PrimaryColor: templateDetails.PrimaryColor,
            SecondaryColor: templateDetails.SecondaryColor,
            logoUrl: templateDetails.logoUrl,
            LightPrimaryColor: templateDetails.LightPrimaryColor,
            LightestPrimaryColor: templateDetails.LightestPrimaryColor,
          },
        }),
        API.put("clients", "/user/development-form/hero-page", {
          body: {
            institutionid: institutionNames,
            TagLine: templateDetails.TagLine,
            videoUrl: templateDetails.videoUrl,
          },
        }),
        API.put("clients", "/user/development-form/why-choose", {
          body: {
            institutionid: institutionNames,
            Services:templateDetails.Services,
            ClassTypes: templateDetails.ClassTypes,
          },
        }),
        
        API.put("clients", "/user/development-form/testimonial", {
          body: {
            institutionid: institutionNames,
            Testimonial: templateDetails.Testimonial,
          },
        }),
        API.put("clients", "/user/development-form/faq", {
          body: {
            institutionid: institutionNames,
            FAQ: templateDetails.FAQ,
          },
        }),
        API.put("clients", "/user/development-form/policy", {
          body: {
            institutionid: institutionNames,
            Refund: templateDetails.Refund,
            TermsData: templateDetails.TermsData,
            AboutUs:templateDetails.AboutUs,
            PrivacyPolicy:templateDetails.PrivacyPolicy,
          },
        }),
        API.put("clients", "/user/development-form/contact", {
          body: {
            institutionid: institutionNames,
            Query_Address: templateDetails.Query_Address,
            Query_PhoneNumber: templateDetails.Query_PhoneNumber,
            Query_EmailId: templateDetails.Query_EmailId,
            Facebook: templateDetails.Facebook,
            Instagram: templateDetails.Instagram,
            YTLink: templateDetails.YTLink,
            UpiId: templateDetails.UpiId,
            Footer_Link_1: templateDetails.Footer_Link_1,
            Footer_Link_2: templateDetails.Footer_Link_2
          }
        }),
      ]);

      alert("Changes saved successfully!");
      util.setLoader(false);
      navigate('/');
    } catch (error) {
      console.error("Error saving changes:", error);
      alert("Failed to save changes. Please try again.");
    }
    util.setLoader(false);
  };

  const handleChange = (event, key) => {
    const { value } = event.target;
    setTemplateDetails((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };
  const handleChange1 = (event, index) => {
    const { value } = event.target;
    setTemplateDetails((prevState) => {
      const updatedClassTypes = [...prevState.ClassTypes];
      updatedClassTypes[index] = value;
      return { ...prevState, ClassTypes: updatedClassTypes };
    });
  };
  const handleTestimonialChange = (event, index, field) => {
    const { value } = event.target;
    setTemplateDetails((prevState) => {
      const updatedTestimonials = [...prevState.Testimonial];
      updatedTestimonials[index][field] = value;
      return { ...prevState, Testimonial: updatedTestimonials };
    });
  };
  const removeInstructor = async (instructorId) => {
    if (instructorId) {
    const confirmed = window.confirm("Are you sure you want to delete this instructor?");
    if (!confirmed) return;
  
    try {
      util.setLoader(true);
      // Make the API call to delete the instructor
      await API.del("clients", `/user/development-form/delete-instructor/${institutionNames}`, {
        body: {
          instructorId: instructorId
        }
      });
      
     
      
      alert("Instructor removed successfully!");
    } catch (error) {
      console.error("Error removing instructor:", error);
      alert("Failed to remove instructor. Please try again.");
    } finally {
      util.setLoader(false);
    }
    } setInstructorDetails(prevState => {
      return prevState.filter(instructor => instructor.instructorId !== instructorId);
    });
  };
  const removeSubscription = async (productId) => {
    if (productId) {
    const confirm = window.confirm("Are you sure you want to delete this Subscription?");
    if (!confirm) return;
    try {
      util.setLoader(true);
      // Make the API call to delete the subscription
      await API.del("clients", `/user/development-form/delete-subscription/${institutionNames}`, {
        body: {
          productId: productId
        }
      });
      
     
     
      
      alert("Subscription deleted successfully!");
    } catch (error) {
      console.error("Error removing subscription:", error);
      alert("Failed to delete subscription. Please try again.");
    } finally {
      util.setLoader(false);
    }}
    setSubscriptionDetails(prevDetails => {
      return prevDetails.filter(subscription => subscription.productId !== productId);
    });
  };
  
  
  const downloadImage = (imageUrl) => {
    if (imageUrl) {
      
      window.open(imageUrl, '_blank');
    } else {
      
      alert("Please provide an image URL");
    }
  };
  const FaqInputChange = (index, field, value) => {
    const updatedFAQ = [...templateDetails.FAQ];
    updatedFAQ[index][field] = value;
    setTemplateDetails((prevState) => ({
      ...prevState,
      FAQ: updatedFAQ,
    }));
  };
  const handleRefundChange = (event, index, field) => {
    const { value } = event.target;
    setTemplateDetails((prevState) => {
      const updatedRefund = [...prevState.Refund];
      updatedRefund[index][field] = value;
      return { ...prevState, Refund: updatedRefund };
    });
  };
  
  const addRefundItem = () => {
    setTemplateDetails((prevState) => ({
      ...prevState,
      Refund: [...prevState.Refund, { heading: '', content: '' }],
    }));
  };
  
  const removeRefundItem = (index) => {
    setTemplateDetails((prevState) => {
      const updatedRefund = [...prevState.Refund];
      updatedRefund.splice(index, 1);
      return { ...prevState, Refund: updatedRefund };
    });
  };
  const handleTermsDataChange = (event, index, field) => {
    const { value } = event.target;
    setTemplateDetails((prevState) => {
      const updatedTermsData = [...prevState.TermsData];
      updatedTermsData[index][field] = value;
      return { ...prevState, TermsData: updatedTermsData };
    });
  };
  
  const addTermsDataItem = () => {
    setTemplateDetails((prevState) => ({
      ...prevState,
      TermsData: [...prevState.TermsData, { title: '', content: '' }],
    }));
  };
  
  const removeTermsDataItem = (index) => {
    setTemplateDetails((prevState) => {
      const updatedTermsData = [...prevState.TermsData];
      updatedTermsData.splice(index, 1);
      return { ...prevState, TermsData: updatedTermsData };
    });
  };
  
  const addClassType = () => {
    setTemplateDetails({
      ...templateDetails,
      ClassTypes: [...templateDetails.ClassTypes, ''], 
    });
  };
  const removeClassType = (index) => {
    const newClassTypes = [...templateDetails.ClassTypes];
    newClassTypes.splice(index, 1);
    setTemplateDetails({
      ...templateDetails,
      ClassTypes: newClassTypes,
    });
  };
  const addFAQ = () => {
    setTemplateDetails({
      ...templateDetails,
      FAQ: [...templateDetails.FAQ, { title: '', content: '' }],
    });
  };

  const removeFAQ = (index) => {
    const newFAQ = [...templateDetails.FAQ];
    newFAQ.splice(index, 1);
    setTemplateDetails({
      ...templateDetails,
      FAQ: newFAQ,
    });
  };

  const addInstructor = () => {
   
    const newInstructor = {
      name: '',
      emailId: '',
      image: '',
      position: '',
    };
    
    setInstructorDetails([...instructorDetails, newInstructor]);
  };
  
  
  
  const handleInstructorChange = (event, field, index) => {
    const { value } = event.target;
    setInstructorDetails((prevState) => {
      const updatedInstructors = [...prevState];
      updatedInstructors[index][field] = value;
      return updatedInstructors;
    });
  };

  const [newProvides, setNewProvides] = useState([]);

  const addProvides = (index) => {
    setSubscriptionDetails((prevDetails) => {
      const updatedDetails = [...prevDetails];
      updatedDetails[index].provides.push(newProvides[index]);
      return updatedDetails;
    });
  
    setNewProvides((prevProvides) => {
      const updatedProvides = [...prevProvides];
      updatedProvides.push(''); 
      return updatedProvides;
    });
  };
  
  
  
  
  

  const removeProvide = (subscriptionIndex, provideIndex) => {
    setSubscriptionDetails((prevDetails) => {
      const updatedDetails = [...prevDetails];
      updatedDetails[subscriptionIndex].provides.splice(provideIndex, 1);
      return updatedDetails;
    });
  };


  const handleHeadingChange = (e, index) => {
    setSubscriptionDetails((prevDetails) => {
      const updatedDetails = [...prevDetails];
      updatedDetails[index].heading = e.target.value;
      return updatedDetails;
    });
  };

  const handleAmountChange = (e, index) => {
    setSubscriptionDetails((prevDetails) => {
      const updatedDetails = [...prevDetails];
      updatedDetails[index].amount = e.target.value;
      return updatedDetails;
    });
  };
  const handleProvideChange = (e, subscriptionIndex, provideIndex) => {
    setSubscriptionDetails((prevDetails) => {
      const updatedDetails = [...prevDetails];
      updatedDetails[subscriptionIndex].provides[provideIndex] = e.target.value;
      return updatedDetails;
    });
  };
  const handleIndiaChange = (e, index) => {
    const newValue = e.target.value === 'true';
    setSubscriptionDetails((prevDetails) => {
      const updatedDetails = [...prevDetails];
      updatedDetails[index].india = newValue;
      return updatedDetails;
    });
  };
  
  const removeItem = (serviceIndex, itemIndex) => {
    const updatedServices = [...templateDetails.Services];
    updatedServices[serviceIndex].items.splice(itemIndex, 1);
    setTemplateDetails({ ...templateDetails, Services: updatedServices });
  };  
  
  

  
  return (
    <>
      <Navbar />
      <div className="bg-[#30AFBC]">
        <div className="mt-[4.5rem] ">
         
          {loader ? (
            <div className="bg-[#30AFBC] h-screen">
            <p>Loading...</p> </div>
          ) : (
            
            <>
              <div className="container  ">
                <h1 className="text-[20px]">Template Details</h1>
                 <div className="middle-right-section mt-5">
                
                  <div className="col gap-4">
                  <h1 className="text-[20px] font-bold ">Institution ID:</h1>
                    <div className="rectangular-box">
                      
                      <p>{templateDetails.institutionid}</p>
                    </div>
                    <div>
                      <p>
                        {" "}
                        <input
                          type="color"
                          value={templateDetails.PrimaryColor}
                          onChange={(event) =>
                            handleChange(event, "PrimaryColor")
                          }
                          class="rounded-full h-12 w-12 cursor-pointer border-none outline-none bg-[#30AFBC]"
                          alt=""
                        />
                        <input
                          type="color"
                          value={templateDetails.SecondaryColor}
                          onChange={(event) =>
                            handleChange(event, "SecondaryColor")
                          }
                          className="rounded-xl h-12 w-12 cursor-pointer border-none outline-none bg-[#30AFBC]"
                        />
                        <input
                          type="color"
                          value={templateDetails.LightPrimaryColor}
                          onChange={(event) =>
                            handleChange(event, "LightPrimaryColor")
                          }
                          className="rounded-xl h-12 w-12 cursor-pointer border-none outline-none bg-[#30AFBC]"
                        />
                        <input
                          type="color"
                          value={templateDetails.LightestPrimaryColor}
                          onChange={(event) =>
                            handleChange(event, "LightestPrimaryColor")
                          }
                          className="rounded-xl h-12 w-12 cursor-pointer border-none outline-none bg-[#30AFBC]"
                        />
                      </p>
                    </div>
                    <h1 className="text-[20px] font-bold ">Tagline:</h1>
                    <div className="rectangular-box">
                      <input
                        type="text"
                        value={templateDetails.TagLine}
                        onChange={(event) => handleChange(event, "TagLine")}
                        className="w-full text-black border-none outline-none bg-transparent "
                        placeholder="Enter Short Description TagLine "
                        autoFocus
                      />
                    </div>
                   

<>
  {templateDetails.Services && templateDetails.Services.length > 0 && (
    <>
      {templateDetails.Services.map((service, index) => (
        <div key={index}>
           <h1 className="text-[20px] font-bold">Service {index + 1}</h1>
           <div className="rectangular-box">
          <input
            type="text"
            value={service.title}
            onChange={(e) => handleServiceTitleChange(e, index)}
            className="w-full text-black border-none outline-none bg-transparent"
            placeholder="Service Title"
          /></div>
          {service.items && service.items.length > 0 && (
          
<div>
              {service.items.map((item, itemIndex) => (
                 
                <div key={itemIndex}>
                  <div className="flex justify-end items-center">
                  <button
                    onClick={() => removeItem(index, itemIndex)}
                    className="rounded-full bg-red-500 text-white px-2"
                  >
                    X
                  </button>
                </div>
                    <div className="rectangular-box ">
                   
                  
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleItemChange(e, index, itemIndex)}
                    className="w-full text-black border-none outline-none bg-transparent"
                    placeholder="Service Item"
                  />
                </div> </div>
              ))}
          </div>
          )}
             <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <button onClick={() => addItem(index)} className="bg-[#ffffff] text-[#30AFBC] font-bold py-2 px-4 rounded-lg shadow-lg mb-4">
            Add Item
          </button>  </div>
        </div>
      ))}
    </>
  )}
 
</>



                    <h1 className="text-[20px] font-bold">Class Types:</h1>
                   
      {templateDetails.ClassTypes &&
        templateDetails.ClassTypes.length > 0 && (
          <>
            {templateDetails.ClassTypes.map((ClassType, index) => (
              <div key={index}>
                <div className="rectangular-box">
                  <input
                    type="text"
                    value={ClassType}
                    onChange={(event) => handleChange1(event, index)}
                    className="w-full text-black border-none outline-none bg-transparent"
                    placeholder={`Enter Class Type ${index + 1}`}
                  />
                  <button
                    onClick={() => removeClassType(index)}
                    className="absolute top-0 right-0 m-1 px-[6px] rounded-full bg-red-500 text-white transform text-sm"
                  >
                    X
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
         <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
         <button onClick={addClassType} className="bg-[#ffffff]  text-[#30AFBC] font-bold py-2 px-4 rounded-lg shadow-lg" style={{ marginTop: '20px' }}>Add Class Type</button>
</div>
                    <div className="h-4"></div>
                    <h1 className="text-[20px] font-bold">Testimonial Name 1:</h1>
                    <div className="rectangular-box">
                      <input
                        type="text"
                        value={templateDetails.Testimonial[0].name}
                        onChange={(event) =>
                          handleTestimonialChange(event, 0, "name")
                        }
                        className="w-full text-black border-none outline-none bg-transparent "
                        placeholder="Enter Name "
                        autoFocus
                      />
                    </div>
                    <h1 className="text-[20px] font-bold">Testimonial Image 1:</h1>
                    <div className="rectangular-box">
                      <input
                        type="file"
                        onChange={(event) => handleFileChange1(event, 0)}
                        className="w-full text-black border-none outline-none bg-transparent"
                      />
                        <button
          onClick={() => downloadImage(templateDetails.Testimonial[0].img)}
          className="absolute top-0 right-0 mt-[15px] mr-2 px-4 py-2 rounded bg-[#30AFBC] text-white"
        >
          View
        </button>
                    </div>
                    <h1 className="text-[20px] font-bold">Testimonial Description 1:</h1>
                    <div className="rectangular-box">
                      <input
                        type="text"
                        value={templateDetails.Testimonial[0].description}
                        onChange={(event) =>
                          handleTestimonialChange(event, 0, "description")
                        }
                        className="w-full text-black border-none outline-none bg-transparent "
                        placeholder="Enter Short Description "
                        autoFocus
                      />
                    </div>
                    <h1 className="text-[20px] font-bold">Testimonial Name 2:</h1>
                    <div className="rectangular-box">
                      <input
                        type="text"
                        value={templateDetails.Testimonial[1].name}
                        onChange={(event) =>
                          handleTestimonialChange(event, 1, "name")
                        }
                        className="w-full text-black border-none outline-none bg-transparent "
                        placeholder="Enter Name "
                        autoFocus
                      />
                    </div>
                    <h1 className="text-[20px] font-bold">Testimonial Image 2:</h1>
                    <div className="rectangular-box">
                      <input
                        type="file"
                        onChange={(event) => handleFileChange1(event, 1)}
                        className="w-full text-black border-none outline-none bg-transparent"
                      />
                       <button
          onClick={() => downloadImage(templateDetails.Testimonial[1].img)}
          className="absolute top-0 right-0 mt-[15px] mr-2 px-4 py-2 rounded bg-[#30AFBC] text-white"
        >
          View
        </button>
                    </div>
                    <h1 className="text-[20px] font-bold">Testimonial Description 2:</h1>
                    <div className="rectangular-box">
                      <input
                        type="text"
                        value={templateDetails.Testimonial[1].description}
                        onChange={(event) =>
                          handleTestimonialChange(event, 1, "description")
                        }
                        className="w-full text-black border-none outline-none bg-transparent "
                        placeholder="Enter Short Description "
                        autoFocus
                      />
                    </div>
                    <h1 className="text-[20px] font-bold">Testimonial Name 3:</h1>
                    <div className="rectangular-box">
                      <input
                        type="text"
                        value={templateDetails.Testimonial[2].name}
                        onChange={(event) =>
                          handleTestimonialChange(event, 2, "name")
                        }
                        className="w-full text-black border-none outline-none bg-transparent "
                        placeholder="Enter name"
                        autoFocus
                      />
                    </div>
                    <h1 className="text-[20px] font-bold">Testimonial Image 3:</h1>
                    <div className="rectangular-box">
                      <input
                        type="file"
                        onChange={(event) => handleFileChange1(event, 2)}
                        className="w-full text-black border-none outline-none bg-transparent"
                      />
                      <button
          onClick={() => downloadImage(templateDetails.Testimonial[2].img)}
          className="absolute top-0 right-0 mt-[15px] mr-2 px-4 py-2 rounded bg-[#30AFBC] text-white"
        >
          View
        </button>
                    </div>
                    <h1 className="text-[20px] font-bold">Testimonial Description 3:</h1>
                    <div className="rectangular-box">
                      <input
                        type="text"
                        value={templateDetails.Testimonial[2].description}
                        onChange={(event) =>
                          handleTestimonialChange(event, 2, "description")
                        }
                        className="w-full text-black border-none outline-none bg-transparent "
                        placeholder="Enter Short Description  "
                        autoFocus
                      />
                    </div>

                   
                    <div>
      {/* <h1 className="text-2xl font-bold">FAQ</h1> */}
      {templateDetails.FAQ && templateDetails.FAQ.length > 0 && (
        <>
          {templateDetails.FAQ.map((faq, index) => (
            <div key={index}>
                            <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold mt-4">FAQ {index + 1}</h2>
                <button
                  onClick={() => removeFAQ(index)}
                  className="rounded-full bg-red-500 text-white px-2"
                >
                  X
                </button>
              </div>

              <div className="rectangular-box">
                <input
                  type="text"
                  value={faq.title}
                  onChange={(e) => FaqInputChange(index, 'title', e.target.value)}
                  className="w-full text-black border-none outline-none bg-transparent"
                  placeholder="FAQ Title"
                />
              </div>
              <div className="rectangular-box faq-box mt-2">
                <textarea
                  value={faq.content}
                  onChange={(e) => FaqInputChange(index, 'content', e.target.value)}
                  className="w-full text-black border-none outline-none bg-transparent"
                  placeholder="FAQ Content"
                />
              </div>
            
            </div>
          ))}
        </>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <button onClick={addFAQ}  className="bg-[#ffffff]  text-[#30AFBC] font-bold py-2 px-4 rounded-lg shadow-lg" style={{ marginTop: '20px' }}>
        Add FAQ
      </button></div>
    </div>
    <div className="h-4"></div>
    <h1 className="text-[20px] font-bold">Privacy Policy:</h1>
  
                    <div className="rectangular-box">
                      <textarea
                        type="text"
                        value={templateDetails.PrivacyPolicy}
                        onChange={(event) =>
                          handleChange(event, "PrivacyPolicy")
                        }
                        className="w-full text-black border-none outline-none bg-transparent mt-2 resize-none"
                        placeholder="Enter Privacy Policy"
                        autoFocus
                      />
                    </div>
                    <h1 className="text-[20px] font-bold">About Us:</h1>
                    <div className="rectangular-box">
                      <textarea
                        type="text"
                        value={templateDetails.AboutUs}
                        onChange={(event) => handleChange(event, "AboutUs")}
                        className="w-full text-black border-none outline-none bg-transparent "
                        placeholder="Enter About Us"
                        autoFocus
                      />
                    </div>



                    
                   
  {templateDetails.Refund.map((item, index) => (
    <div key={index}>
        <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold mt-4">Refund Policy{index + 1}</h2>
                <button
                  onClick={() => removeRefundItem(index)}
                  className="rounded-full bg-red-500 text-white px-2"
                >
                  X
                </button>
              </div>
       <div className="rectangular-box">
      <input
        value={item.heading}
        onChange={(event) => handleRefundChange(event, index, 'heading')}
        className="w-full text-black border-none outline-none bg-transparent"
        placeholder="Enter Refund Policy Heading"
      /></div>
       <div className="rectangular-box">
      <textarea
        value={item.content}
        onChange={(event) => handleRefundChange(event, index, 'content')}
        className="w-full text-black border-none outline-none bg-transparent"
        placeholder="Enter Refund Policy Content"
      /></div>
       
    </div>
  ))}
 <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
       <button onClick={addRefundItem} className="bg-[#ffffff]  text-[#30AFBC] font-bold py-2 px-4 rounded-lg shadow-lg" style={{ marginTop: '20px' }}>Add Refund Item</button></div>

       <div>

  {templateDetails.TermsData.map((item, index) => (
    <div key={index}>
      <div className="flex justify-between items-center">
      <h2 className="text-lg font-bold mt-4">Terms And Data{index + 1}</h2>
      <button onClick={() => removeTermsDataItem(index)}className="rounded-full bg-red-500 text-white px-2"
                >
                  X
                </button></div>
                <div className="rectangular-box">
      <input
        value={item.title}
        onChange={(event) => handleTermsDataChange(event, index, 'title')}
        className="w-full text-black border-none outline-none bg-transparent"
        placeholder="Enter Terms Data Title"
      /></div>
        <div className="rectangular-box">
      <textarea
        value={item.content}
        onChange={(event) => handleTermsDataChange(event, index, 'content')}
        className="w-full text-black border-none outline-none bg-transparent"
        placeholder="Enter Terms Data Content"
        autoFocus={index === 0} 
      />
      </div>
    </div>
  ))}
   <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
  <button onClick={addTermsDataItem} className="bg-[#ffffff]  text-[#30AFBC] font-bold py-2 px-4 rounded-lg shadow-lg" style={{ marginTop: '20px' }}>Add Terms Data Item</button></div>
</div>





                    <h1 className="text-[20px] font-bold">Address:</h1>
                    <div className="rectangular-box">
                      <input
                        type="text"
                        value={templateDetails.Query_Address}
                        onChange={(event) =>
                          handleChange(event, "Query_Address")
                        }
                        className="w-full text-black border-none outline-none bg-transparent "
                        placeholder="Enter Address "
                        autoFocus
                      />
                    </div>
                    <h1 className="text-[20px] font-bold">Email Id:</h1>
                    <div className="rectangular-box">
                      <input
                        type="text"
                        value={templateDetails.Query_EmailId}
                        onChange={(event) =>
                          handleChange(event, "Query_EmailId")
                        }
                        className="w-full text-black border-none outline-none bg-transparent "
                        placeholder="Enter Email Id"
                        autoFocus
                      />
                    </div>
                    <h1 className="text-[20px] font-bold">Phone Number:</h1>
                    <div className="rectangular-box">
                      <input
                        type="text"
                        value={templateDetails.Query_PhoneNumber}
                        onChange={(event) =>
                          handleChange(event, "Query_PhoneNumber")
                        }
                        className="w-full text-black border-none outline-none bg-transparent "
                        placeholder="Enter PhoneNumber"
                        autoFocus
                      />
                    </div>
                    <h1 className="text-[20px] font-bold">Upi Id:</h1>
                    <div className="rectangular-box">
                      <input
                        type="text"
                        value={templateDetails.UpiId}
                        onChange={(event) =>
                          handleChange(event, "UpiId")
                        }
                        className="w-full text-black border-none outline-none bg-transparent "
                        placeholder="Enter Upi Id"
                        autoFocus
                      />
                    </div>
                    <h1 className="text-[20px] font-bold">Youtube:</h1>
                    <div className="rectangular-box">
                      <input
                        type="text"
                        value={templateDetails.YTLink}
                        onChange={(event) =>
                          handleChange(event, "YTLink")
                        }
                        className="w-full text-black border-none outline-none bg-transparent "
                        placeholder="Enter Youtube Link "
                        autoFocus
                      />
                    </div>
                    <h1 className="text-[20px] font-bold">Facebook:</h1>
                    <div className="rectangular-box">
                      <input
                        type="text"
                        value={templateDetails.Facebook}
                        onChange={(event) =>
                          handleChange(event, "Facebook")
                        }
                        className="w-full text-black border-none outline-none bg-transparent "
                        placeholder="Enter Facebook Link"
                        autoFocus
                      />
                    </div>
                    <h1 className="text-[20px] font-bold">Instagram:</h1>
                    <div className="rectangular-box">
                      <input
                        type="text"
                        value={templateDetails.Instagram}
                        onChange={(event) =>
                          handleChange(event, "Instagram")
                        }
                        className="w-full text-black border-none outline-none bg-transparent "
                        placeholder="Enter Instagram"
                        autoFocus
                      />
                    </div>
                    <h1 className="text-[20px] font-bold">Footer Link 1:</h1>
                    <div className="rectangular-box">
                      <input
                        type="text"
                        value={templateDetails.Footer_Link_1}
                        onChange={(event) =>
                          handleChange(event, "Footer_Link_1")
                        }
                        className="w-full text-black border-none outline-none bg-transparent "
                        placeholder="Enter Footer Link"
                        autoFocus
                      />
                    </div>
                    <h1 className="text-[20px] font-bold">Footer Link 2:</h1>
                    <div className="rectangular-box">
                      <input
                        type="text"
                        value={templateDetails.Footer_Link_2}
                        onChange={(event) =>
                          handleChange(event, "Footer_Link_2")
                        }
                        className="w-full text-black border-none outline-none bg-transparent "
                        placeholder="Enter Footer Link"
                        autoFocus
                      />
                    </div>
                    <h1 className="text-[20px] font-bold">Logo:</h1>
                    <div className="rectangular-box">
                      <input
                        type="file"
                        onChange={(event) => handleFileChange(event, "logoUrl")} 
                        className="w-full text-black border-none outline-none bg-transparent"
                      />
                      <button
                        onClick={() => downloadImage(templateDetails.logoUrl)}
                        className="absolute top-0 right-0 mt-[15px] mr-2 px-4 py-2 rounded bg-[#30AFBC] text-white"
                      >
                        View
                      </button>
                    </div>
                    <h1 className="text-[20px] font-bold">Video:</h1>
                    <div className="rectangular-box">
                      <input
                        type="file"
                        onChange={handleVideoChange}
                        className="w-full text-black border-none outline-none bg-transparent"
                      />
                      <button
                        onClick={() => downloadImage(templateDetails.videoUrl)}
                        className="absolute top-0 right-0 mt-[15px] mr-2 px-4 py-2 rounded bg-[#30AFBC] text-white"
                      >
                        View
                      </button>
                    </div>
                    {instructorDetails.map((instructor, index) => (
       <div key={index}>
       
       <div className="flex justify-between items-center">
       <h2 className="text-lg font-bold mt-4">Instructor {index + 1}</h2>
       <button
        onClick={() => removeInstructor(instructor.instructorId)}
        className="rounded-full mt-3 bg-red-500 text-white px-[4.5px] text-xs"
      >
        X
      </button>
                </div>
       <div>
         <div className="rectangular-box">
           <input
             type="text"
             value={instructor.name}
             onChange={(e) => handleInstructorChange(e, 'name', index)}
             className="w-full text-black border-none outline-none bg-transparent"
             placeholder="Instructor name"
           />
         </div>
         <div className="rectangular-box">
           <input
             type="text"
             value={instructor.emailId}
             onChange={(e) => handleInstructorChange(e, 'emailId', index)}
             className="w-full text-black border-none outline-none bg-transparent"
             placeholder="Enter emailId"
           />
         </div>
         <div className="rectangular-box">
           <input
             type="text"
             value={instructor.position}
             onChange={(e) => handleInstructorChange(e, 'position', index)}
             className="w-full text-black border-none outline-none bg-transparent"
             placeholder="Enter position"
           />
         </div>
         <div className="rectangular-box">
           <input
             type="file"
             onChange={(e) => handleFileChange3(e, index)}
             className="w-full text-black border-none outline-none bg-transparent"
           />
           <button
             onClick={() => downloadImage(instructor.image)}
             className="absolute top-0 right-0 mt-[15px] mr-2 px-4 py-2 rounded bg-[#30AFBC] text-white"
           >
             View
           </button>
         </div>
       </div>
     </div>
     
        
      ))}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><button onClick={addInstructor} className="bg-[#ffffff]  text-[#30AFBC] font-bold py-2 px-4 rounded-lg shadow-lg" style={{ marginTop: '20px' }}>Add Instructor</button>

      </div>
              {subscriptionDetails.map((subscription, index) => (
  <div key={index}>
      <div className="flex justify-between items-center">
    <h2 className="text-lg font-bold mt-4">Subscription {index + 1}</h2>
    <button
        onClick={() => removeSubscription(subscription.productId)}
        className="rounded-full mt-3 bg-red-500 text-white px-[4.5px] text-xs"
      >
        X
      </button>
   
                </div>
    <h2 className="text-lg font-bold mt-4">Heading</h2>
    <div className="rectangular-box">
    
              <input
                type="text"
                value={subscription.heading}
                onChange={(e) => handleHeadingChange(e, index)}
                placeholder="Heading"
                className="w-full text-black border-none outline-none bg-transparent "
              />
            </div>
            <h2 className="text-lg font-bold mt-4">Amount</h2>
            <div className="rectangular-box">
              <input
                type="text"
                value={subscription.amount}
                onChange={(e) => handleAmountChange(e, index)}
                placeholder="Amount"
                className="w-full text-black border-none outline-none bg-transparent "
              />
            </div>

{/* 
    <p>Country: {subscription.country}</p> */}
    


    
    {/* <p>India: {subscription.india ? 'true' : 'false'}</p>
    <p>Subscription Type: {subscription.subscriptionType}</p> */}
     <div className="flex flex-row">
    <h2 className="text-lg font-bold ">India:</h2>
    <div className="radio-label mt-1 ">
      <label>
        <input
          type="radio"
          value="true"
          checked={subscription.india === true}
          onChange={(e) => handleIndiaChange(e, index)}
          
        />

      
      </label>
      <span className="mb-1">True</span>
      <label>
        <input
          type="radio"
          value="false"
          checked={subscription.india === false}
          onChange={(e) => handleIndiaChange(e, index)}
          className="ml-2"
        />
        
       
      </label>
      <span className="mb-1">False</span>
    </div>
  </div>

  <div className="flex flex-row max850:flex-col">
  <h2 className="text-lg font-bold mt-2 mr-4">Subscription Type:</h2>
  <div className="border bg-white border-gray-400 rounded-md p-2">
  <select
  value={`${subscription.subscriptionType}:${subscription.durationText}`}
  onChange={(e) => handleSubscriptionTypeChange(e, index)}
  className="w-full text-black border-none outline-none bg-transparent"
>
  <option value="year:yearly">Year</option>
  <option value="month:monthly">Month</option>
  <option value="week:weekly">Week</option>
  <option value="quarter:quarterly">Quater</option>
</select>

  </div>
  <div className="flex flex-row ml-2 max850:flex-col max850:ml-0">
  <h2 className="text-lg font-bold mt-2 mr-4">Country:</h2>
  <div className="border  bg-white border-gray-400 rounded-md p-2">
    <select
      value={subscription.currency}
      onChange={(e) => handleCountryChange(e, index)}
      className="w-full text-black border-none outline-none bg-transparent"
    >
      <Currency />
    </select>
  </div>
</div>
</div>

    <h2 className="text-lg font-bold mt-4">Provides:</h2>
              
    {subscription.provides.map((provide, idx) => (
  <div className="rectangular-box" key={idx}>
    <input
      type="text"
      value={provide}
      onChange={(e) => handleProvideChange(e, index, idx)}
      placeholder="Provide"
      className="w-full text-black border-none outline-none bg-transparent"
    />
    <button
      onClick={() => removeProvide(index, idx)}
      className="absolute top-0 right-0 m-1 px-[6px] rounded-full bg-red-500 text-white transform text-sm"
    >
      X
    </button>
  </div>
))}

            
              {/* <div className="rectangular-box">
      <input
        type="text"
        value={newProvides[index]}
        onChange={(e) => {
          const updatedProvides = [...newProvides];
          updatedProvides[index] = e.target.value;
          setNewProvides(updatedProvides);
        }}
        className="w-full text-black border-none outline-none bg-transparent"
        placeholder="Add Provide"
      />
    </div> */}
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <button onClick={() => addProvides(index)} className="bg-[#ffffff]  text-[#30AFBC] font-bold py-2 px-4 rounded-lg shadow-lg" style={{ marginTop: '20px' }}>Add Provide</button>
  </div></div>
))}
    </div>
                </div>
              </div>
            </>
          )}
 <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <button onClick={addSubscription} className="bg-[#ffffff]  text-[#30AFBC] font-bold py-2 px-4 rounded-lg shadow-lg" style={{ marginTop: '20px' }}>Add Subscription</button></div>
        </div>


        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} className="px-[50px]">
  <button onClick={goBack}  className="bg-[#000000] text-[rgb(255,255,255)] font-bold py-2 px-4 rounded-xl shadow-lg">Back</button>
  <button onClick={saveChanges} className="bg-[#000000] text-[#ffffff] font-bold py-2 px-4 rounded-xl shadow-lg">Save</button>
</div>
<div className="h-4"></div>

      </div>
    </>
  );
};

export default Full;
