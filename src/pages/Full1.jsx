import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { API } from "aws-amplify";
import Navbar from "../components/Home/Navbar";
import { Storage } from "aws-amplify";
import Currency from "../components/Auth/Currency";
import "./Full.css";
import { useNavigate } from "react-router-dom";
import Context from "../context/Context";
import { FloatingLabel } from "flowbite-react";
// import { GrEdit } from "react-icons/gr";
import { FileInput, Label, TextInput, Select,Radio,Textarea } from "flowbite-react";
import { RxCross2 } from "react-icons/rx";
import { MdOutlineAddCircle } from "react-icons/md";
const Full1 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const institutionNames = searchParams.get("institutionName");

  const [templateDetails, setTemplateDetails] = useState(null);
  const [subscriptionDetails, setSubscriptionDetails] = useState(null);
  const [instructorDetails, setInstructorDetails] = useState(null);
  const [loader, setLoader] = useState(true);
  const Ctx = useContext(Context);
  const util = useContext(Context).util;
  const goBack = () => {
    navigate("/");
  };
  const [loaderInitialized, setLoaderInitialized] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      if (institutionNames) {
        try {
          if (!loaderInitialized) {
            // Check if loader is false and not initialized
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
          // Convert the subscription amount to rupee
          const convertedProductResponse = productResponse.map((product) => ({
            ...product,
            amount: product.amount / 100, // Convert amount to rupee
          }));

          await setSubscriptionDetails(convertedProductResponse);

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
    updatedServices[index].items.push("");
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
  const handleFileChange5 = async (event, key) => {
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
          contentType: file.type,
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
      case "year":
        durationInMillis = 365 * 24 * 60 * 60 * 1000;
        break;
      case "month":
        durationInMillis = 30 * 24 * 60 * 60 * 1000;
        break;
      case "week":
        durationInMillis = 7 * 24 * 60 * 60 * 1000;
        break;
      case "quarter":
        durationInMillis = 3 * 30 * 24 * 60 * 60 * 1000;
        break;
      default:
        break;
    }

    return durationInMillis;
  };

  const handleSubscriptionTypeChange = (e, index) => {
    const [subscriptionType, durationText] = e.target.value.split(":");

    setSubscriptionDetails((prevDetails) => {
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
    setSubscriptionDetails((prevDetails) => [
      ...prevDetails,
      {
        heading: "",
        amount: "",
        india: true,
        subscriptionType: "year",
        durationText: "Yearly",
        country: "India",
        currency: "INR",
        duration: 365 * 24 * 60 * 60 * 1000,
        provides: [],
      },
    ]);
  };

  const handleCountryChange = (e, index) => {
    const newValue = e.target.value;
    // const countryCode = e.target.options[e.target.selectedIndex].getAttribute("data-countryCode");
    const countryName =
      e.target.options[e.target.selectedIndex].textContent.split(" ")[0];
    setSubscriptionDetails((prevDetails) => {
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
        instructorDetails.forEach((instructor) => {
          // Check if instructor already has an ID
          if (instructor.instructorId) {
            instructorPromises.push(
              API.put("clients", `/user/development-form/update-instructor`, {
                body: {
                  instructorId: instructor.instructorId,
                  institution: institutionNames,
                  name: instructor.name,
                  emailId: instructor.emailId,
                  image: instructor.image,
                  position: instructor.position,
                },
              })
            );
          } else {
            const imageUrl = instructor.image;
            instructorPromises.push(
              API.put("clients", `/user/development-form/instructor`, {
                body: {
                  institution: institutionNames,
                  name: instructor.name,
                  emailId: instructor.emailId,
                  image: imageUrl,
                  position: instructor.position,
                },
              })
            );
          }
        });

        await Promise.all(instructorPromises);
      }
      if (subscriptionDetails && subscriptionDetails.length > 0) {
        const subscriptionPromises = [];

        subscriptionDetails.forEach((subscription) => {
          const amountInPaisa = subscription.amount * 100;
          if (subscription.productId) {
            subscriptionPromises.push(
              API.put("clients", "/user/development-form/update-subscription", {
                body: {
                  cognitoId: Ctx.userData.cognitoId,
                  productId: subscription.productId,
                  institution: institutionNames,
                  amount: amountInPaisa,
                  country: subscription.country,
                  currency: subscription.currency,
                  duration: subscription.duration,
                  durationText: subscription.durationText,
                  heading: subscription.heading,
                  india: subscription.india,
                  provides: subscription.provides,
                  subscriptionType: subscription.subscriptionType,
                },
              })
            );
          } else {
            subscriptionPromises.push(
              API.put("clients", "/user/development-form/subscriptions", {
                body: {
                  cognitoId: Ctx.userData.cognitoId,
                  institution: institutionNames,
                  amount: amountInPaisa,
                  country: subscription.country,
                  currency: subscription.currency,
                  duration: subscription.duration,
                  durationText: subscription.durationText,
                  heading: subscription.heading,
                  india: subscription.india,
                  provides: subscription.provides,
                  subscriptionType: subscription.subscriptionType,
                },
              })
            );
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
            TagLine1: templateDetails.TagLine1,
            videoUrl: templateDetails.videoUrl,
          },
        }),
        API.put("clients", "/user/development-form/why-choose", {
          body: {
            institutionid: institutionNames,
            Services: templateDetails.Services,
            ServicesBg: templateDetails.ServicesBg,
            ServicesPortrait: templateDetails.ServicesPortrait,
            ClassTypes: templateDetails.ClassTypes,
          },
        }),

        API.put("clients", "/user/development-form/testimonial", {
          body: {
            institutionid: institutionNames,
            Testimonial: templateDetails.Testimonial,
            TestimonialBg: templateDetails.TestimonialBg,
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
            AboutUs: templateDetails.AboutUs,
            AboutUsBg: templateDetails.AboutUsBg,
            PrivacyPolicy: templateDetails.PrivacyPolicy,
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
            Footer_Link_2: templateDetails.Footer_Link_2,
            InstructorBg: templateDetails.InstructorBg,
            SubscriptionBg: templateDetails.SubscriptionBg,
          },
        }),
      ]);

      alert("Changes saved successfully!");
      util.setLoader(false);
      navigate("/");
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
      const confirmed = window.confirm(
        "Are you sure you want to delete this instructor?"
      );
      if (!confirmed) return;

      try {
        util.setLoader(true);
        // Make the API call to delete the instructor
        await API.del(
          "clients",
          `/user/development-form/delete-instructor/${institutionNames}`,
          {
            body: {
              instructorId: instructorId,
            },
          }
        );

        alert("Instructor removed successfully!");
      } catch (error) {
        console.error("Error removing instructor:", error);
        alert("Failed to remove instructor. Please try again.");
      } finally {
        util.setLoader(false);
      }
    }
    setInstructorDetails((prevState) => {
      return prevState.filter(
        (instructor) => instructor.instructorId !== instructorId
      );
    });
  };
  const removeSubscription = async (productId) => {
    if (productId) {
      const confirm = window.confirm(
        "Are you sure you want to delete this Subscription?"
      );
      if (!confirm) return;
      try {
        util.setLoader(true);
        // Make the API call to delete the subscription
        await API.del(
          "clients",
          `/user/development-form/delete-subscription/${institutionNames}`,
          {
            body: {
              cognitoId: Ctx.userData.cognitoId,
              productId: productId,
            },
          }
        );

        alert("Subscription deleted successfully!");
      } catch (error) {
        console.error("Error removing subscription:", error);
        alert("Failed to delete subscription. Please try again.");
      } finally {
        util.setLoader(false);
      }
    }
    setSubscriptionDetails((prevDetails) => {
      return prevDetails.filter(
        (subscription) => subscription.productId !== productId
      );
    });
  };

  const downloadImage = (imageUrl) => {
    if (imageUrl) {
      window.open(imageUrl, "_blank");
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
      Refund: [...prevState.Refund, { heading: "", content: "" }],
    }));
  };

  const removeRefundItem = (index) => {
    setTemplateDetails((prevState) => {
      const updatedRefund = [...prevState.Refund];
      updatedRefund.splice(index, 1);
      return { ...prevState, Refund: updatedRefund };
    });
  };
  const handleAboutUsChange = (event, index, field) => {
    const { value } = event.target;
    setTemplateDetails((prevState) => {
      const updatedAboutUs = [...prevState.AboutUs];
      updatedAboutUs[index][field] = value;
      return { ...prevState, AboutUs: updatedAboutUs };
    });
  };

  const addAboutUsItem = () => {
    setTemplateDetails((prevState) => ({
      ...prevState,
      AboutUs: [...prevState.AboutUs, { heading: "", content: "" }],
    }));
  };

  const removeAboutUsItem = (index) => {
    setTemplateDetails((prevState) => {
      const updatedAboutUs = [...prevState.AboutUs];
      updatedAboutUs.splice(index, 1);
      return { ...prevState, AboutUs: updatedAboutUs };
    });
  };
  const handlePrivacyPolicyChange = (event, index, field) => {
    const { value } = event.target;
    setTemplateDetails((prevState) => {
      const updatedPrivacyPolicy = [...prevState.PrivacyPolicy];
      updatedPrivacyPolicy[index][field] = value;
      return { ...prevState, PrivacyPolicy: updatedPrivacyPolicy };
    });
  };

  const addPrivacyPolicyItem = () => {
    setTemplateDetails((prevState) => ({
      ...prevState,
      PrivacyPolicy: [...prevState.PrivacyPolicy, { heading: "", content: "" }],
    }));
  };

  const removePrivacyPolicyItem = (index) => {
    setTemplateDetails((prevState) => {
      const updatedPrivacyPolicy = [...prevState.PrivacyPolicy];
      updatedPrivacyPolicy.splice(index, 1);
      return { ...prevState, PrivacyPolicy: updatedPrivacyPolicy };
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
      TermsData: [...prevState.TermsData, { title: "", content: "" }],
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
      ClassTypes: [...templateDetails.ClassTypes, ""],
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
      FAQ: [...templateDetails.FAQ, { title: "", content: "" }],
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
      name: "",
      emailId: "",
      image: "",
      position: "",
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
      updatedProvides.push("");
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

  const handleAmountChange = (event, index) => {
    const amountInRupee = event.target.value;
    setSubscriptionDetails((prevDetails) => {
      const updatedDetails = [...prevDetails];
      updatedDetails[index].amount = amountInRupee;
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
    const newValue = e.target.value === "true";
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
  const [showInfo, setShowInfo] = useState(false);

  const handleInfoClick = (index) => {
    setShowInfo(index === showInfo ? null : index);
  };
  // const [color, setColor] = useState("#000000");
  const [isColorPickerVisible, setColorPickerVisible] = useState(false);
  console.log(isColorPickerVisible);

  // const handleClick = () => {
  //   setColorPickerVisible(true);
  // };

  // const handleColorChange = (event) => {
  //   setColor(event.target.value);
  //   setColorPickerVisible(false);
  // };

  const handleBlur = () => {
    setColorPickerVisible(false);
  };
  const handleOutsideClick = () => {
    setShowInfo(false);
  };
  if (
    util.loader ||
    !templateDetails ||
    !subscriptionDetails ||
    !instructorDetails
  ) {
    return (
      <div>
        {" "}
        <Navbar />
        {util.setLoader(true)}{" "}
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="">
      <div
        className="relative mt-20 p-4"
        onClick={handleOutsideClick}
      >
        <div className="flex justify-center">
          <h2 className="text-[25px] max850:text-[20px] text-black font-bold max375:text-[17px]">
            User Information Management
          </h2>
        </div>{" "}
        <div className="flex justify-center">
          <p className="px-3 text-center text-[20px]  max850:text-[17px] max375:text-[14px]">
            Here, you can update user information to ensure our records are
            accurate and up-to-date. Please use the form below to modify user
            details as needed.
          </p>
        </div>
        <h1 className="font-bold text-black mt-8">Hero Section</h1>
        <div className="lg:px-[180px] md:px-[150px] sm:px-4">
          <div className="flex flex-col gap-4 ">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:gap-10 lg:gap-10 sm:gap-4">
              <div className="relative">
                <div className="mb-2 block ">
                  <Label
                    htmlFor="institutionid"
                    color="gray"
                    value="InstitutionName"
                  />
                  <span className="text-red-500 ml-1">*</span>
                </div>
                <TextInput
                  id="institutionid"
                  placeholder="institutionid"
                  required
                  value={templateDetails.institutionid}
                  sizing="sm"
                  // onChange={(event) => handleChange(event, "institutionid")}
                  style={{
                    borderColor: "#D1D5DB",
                    backgroundColor: "#F9FAFB",
                    borderRadius: "8px",
                  }}
                />
                <i
                  className="absolute top-0 right-0 mt-2 mr-2 cursor-pointer text-white px-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleInfoClick(1);
                  }}
                  style={{
                    fontSize: "14px",
                    background: "#000000",
                    borderRadius: "50%",
                  }}
                >
                  i
                </i>
                {showInfo === 1 && (
                  <div className="absolute top-0 right-8 mt-2 p-2 border border-gray-400 bg-black bg-opacity-75 rounded shadow-lg w-96 text-white whitespace-normal max850:w-[278px] max375:w-[230px] max536:text-[12px]">
                    The institution name is used as a unique identifier and
                    cannot be changed once submitted
                  </div>
                )}
              </div>

              <div className="relative ">
                <div className="mb-2 block">
                  <Label
                    htmlFor="Head Tag Line"
                    color="gray"
                    value="Head Tag Line"
                  />
                  <span className="text-red-500 ml-1">*</span>
                </div>
                <TextInput
                  id="Head Tag Line"
                  placeholder="Head Tag Line"
                  required
                  value={templateDetails.TagLine}
                  sizing="sm"
                  onChange={(event) => handleChange(event, "TagLine")}
                  style={{
                    borderColor: "#D1D5DB",
                    backgroundColor: "#F9FAFB",
                    borderRadius: "8px",
                  }}
                />
                <i
                  className="absolute top-0 right-0 mt-2 mr-2 cursor-pointer text-white px-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleInfoClick(2);
                  }}
                  style={{
                    fontSize: "14px",
                    background: "#000000",
                    borderRadius: "50%",
                  }}
                >
                  i
                </i>
                {showInfo === 2 && (
                  <div className="absolute top-0 right-8 mt-2 p-2 border border-gray-400 bg-black bg-opacity-75 rounded shadow-lg w-96 text-white whitespace-normal max850:w-[278px] max375:w-[230px] max536:text-[12px]">
                    It’s the Head Tag line of Home Page
                  </div>
                )}
              </div>

              <div className="relative ">
                <div className="mb-2 block">
                  <Label htmlFor="Tag Line 2" color="gray" value="Tag Line 2" />
                  <span className="text-red-500 ml-1">*</span>
                </div>
                <TextInput
                  id="Tag Line 2"
                  placeholder="Tag Line 2"
                  required
                  value={templateDetails.TagLine1}
                  sizing="sm"
                  onChange={(event) => handleChange(event, "TagLine1")}
                  style={{
                    borderColor: "#D1D5DB",
                    backgroundColor: "#F9FAFB",
                    borderRadius: "8px",
                  }}
                />
                <i
                  className="absolute top-0 right-0 mt-2 mr-2 cursor-pointer text-white px-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleInfoClick(3);
                  }}
                  style={{
                    fontSize: "14px",
                    background: "#000000",
                    borderRadius: "50%",
                  }}
                >
                  i
                </i>
                {showInfo === 3 && (
                  <div className="absolute top-0 right-8 mt-2 p-2 border border-gray-400 bg-black bg-opacity-75 rounded shadow-lg w-96 text-white whitespace-normal max850:w-[278px] max375:w-[230px] max536:text-[12px]">
                    2nd Tag Line of the Home Section
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="lg:px-[250px] max1250:px-[150px]  max800:px-2 lg:mt-10 mt-4">
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 md:gap-10 lg:gap-10 sm:gap-4 text-black">
              {/* First Input */}
              <div className="max-w-md">
                <div className="mb-2 block">
                  <Label htmlFor="PrimaryColor" value="PrimaryColor" />
                  <span className="text-red-500 ml-1">*</span>
                </div>
                <div className="relative">
                  <TextInput
                    id="PrimaryColor"
                    sizing="sm"
                    placeholder="input text"
                    required
                    value={templateDetails.PrimaryColor}
                    onChange={(event) => handleChange(event, "PrimaryColor")}
                    onBlur={handleBlur}
                    className="text-field"
                    style={{
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                    }}
                  />

                  <input
                    type="color"
                    value={templateDetails.PrimaryColor}
                    onChange={(event) => handleChange(event, "PrimaryColor")}
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: "3px",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                      border: "none",
                      padding: "0",
                      width: "24px",
                      height: "24px",
                    }}
                  />
                  <i
                    className="absolute mt-[-68px] right-0 mr-2 cursor-pointer text-white px-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleInfoClick(4);
                    }}
                    style={{
                      fontSize: "14px",
                      background: "#000000",
                      borderRadius: "50%",
                    }}
                  >
                    i
                  </i>
                  {showInfo === 4 && (
                    <div className="absolute top-0 right-8 mt-2 p-2 border border-gray-400 bg-black bg-opacity-75 rounded shadow-lg w-96 text-white whitespace-normal max850:w-[278px] max375:w-[230px] max536:text-[12px]">
                      2nd Tag Line of the Home Section
                    </div>
                  )}
                </div>
              </div>

              {/* Second Input */}
              <div className="max-w-md">
                <div className="mb-2 block">
                  <Label
                    htmlFor="LightPrimaryColor"
                    value="LightPrimaryColor"
                  />
                  <span className="text-red-500 ml-1">*</span>
                </div>
                <div className="relative">
                  <TextInput
                    id="LightPrimaryColor"
                    sizing="sm"
                    placeholder="input text"
                    required
                    value={templateDetails.LightPrimaryColor}
                    onChange={(event) =>
                      handleChange(event, "LightPrimaryColor")
                    }
                    onBlur={handleBlur}
                    className="text-field"
                    style={{
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                    }}
                  />

                  <input
                    type="color"
                    value={templateDetails.LightPrimaryColor}
                    onChange={(event) =>
                      handleChange(event, "LightPrimaryColor")
                    }
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: "3px",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                      border: "none",
                      padding: "0",
                      width: "24px",
                      height: "24px",
                    }}
                  />
                  <i
                    className="absolute mt-[-68px] right-0 mr-2 cursor-pointer text-white px-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleInfoClick(5);
                    }}
                    style={{
                      fontSize: "14px",
                      background: "#000000",
                      borderRadius: "50%",
                    }}
                  >
                    i
                  </i>
                  {showInfo === 5 && (
                    <div className="absolute top-0 right-8 mt-2 p-2 border border-gray-400 bg-black bg-opacity-75 rounded shadow-lg w-96 text-white whitespace-normal max850:w-[278px] max375:w-[230px] max536:text-[12px]">
                      2nd Tag Line of the Home Section
                    </div>
                  )}
                </div>
              </div>

              <div className="max-w-md">
                <div className="mb-2 block">
                  <Label
                    htmlFor="LightestPrimaryColor"
                    value="LightestPrimaryColor"
                  />
                  <span className="text-red-500 ml-1">*</span>
                </div>
                <div className="relative">
                  <TextInput
                    id="LightestPrimaryColor"
                    sizing="sm"
                    placeholder="input text"
                    required
                    value={templateDetails.LightestPrimaryColor}
                    onChange={(event) =>
                      handleChange(event, "LightestPrimaryColor")
                    }
                    onBlur={handleBlur}
                    className="text-field"
                    style={{
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                    }}
                  />

                  <input
                    type="color"
                    value={templateDetails.LightestPrimaryColor}
                    onChange={(event) =>
                      handleChange(event, "LightestPrimaryColor")
                    }
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: "3px",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                      border: "none",
                      padding: "0",
                      width: "24px",
                      height: "24px",
                    }}
                  />
                  <i
                    className="absolute mt-[-68px] right-0 mr-2 cursor-pointer text-white px-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleInfoClick(6);
                    }}
                    style={{
                      fontSize: "14px",
                      background: "#000000",
                      borderRadius: "50%",
                    }}
                  >
                    i
                  </i>
                  {showInfo === 6 && (
                    <div className="absolute top-0 right-8 mt-2 p-2 border border-gray-400 bg-black bg-opacity-75 rounded shadow-lg w-96 text-white whitespace-normal max850:w-[278px] max375:w-[230px] max536:text-[12px]">
                      2nd Tag Line of the Home Section
                    </div>
                  )}
                </div>
              </div>
              <div className="max-w-md">
                <div className="mb-2 block">
                  <Label htmlFor="SecondaryColor" value="SecondaryColor" />
                  <span className="text-red-500 ml-1">*</span>
                </div>
                <div className="relative">
                  <TextInput
                    id="SecondaryColor"
                    sizing="sm"
                    placeholder="input text"
                    required
                    value={templateDetails.SecondaryColor}
                    onChange={(event) => handleChange(event, "SecondaryColor")}
                    onBlur={handleBlur}
                    className="text-field"
                    style={{
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                    }}
                  />

                  <input
                    type="color"
                    value={templateDetails.SecondaryColor}
                    onChange={(event) => handleChange(event, "SecondaryColor")}
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: "3px",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                      border: "none",
                      padding: "0",
                      width: "24px",
                      height: "24px",
                    }}
                  />
                  <i
                    className="absolute mt-[-68px] right-0 mr-2 cursor-pointer text-white px-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleInfoClick(7);
                    }}
                    style={{
                      fontSize: "14px",
                      background: "#000000",
                      borderRadius: "50%",
                    }}
                  >
                    i
                  </i>
                  {showInfo === 7 && (
                    <div className="absolute top-0 right-8 mt-2 p-2 border border-gray-400 bg-black bg-opacity-75 rounded shadow-lg w-96 text-white whitespace-normal max850:w-[278px] max375:w-[230px] max536:text-[12px]">
                      2nd Tag Line of the Home Section
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:px-[170px] md:px-[110px] sm:px-6 lg:mt-10 mt-4 ju">
          <div className="flex flex-col gap-4 ">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 md:gap-10 lg:gap-10 sm:gap-4">
              <div id="fileUpload" className="max-w-md relative">
                <div className="mb-2 block">
                  <Label htmlFor="Logo Upload file" value="Logo Upload file" />
                </div>
                <FileInput
                  type="file"
                  onChange={(event) => handleFileChange(event, "logoUrl")}
                  id="Logo Upload file"
                  helperText="It’s The Logo of the Company"
                  style={{
                    borderColor: "#D1D5DB",
                    backgroundColor: "#F9FAFB",
                    borderRadius: "8px",
                  }}
                />
                <button
                  onClick={() => downloadImage(templateDetails.logoUrl)}
                  className="absolute bottom-0 right-0 mb-[5px] mr-2 px-4 py-1 rounded text-black text-[10px] font-bold border border-black"
                  style={{
                    borderRadius: "4px",
                  }}
                >
                  View
                </button>
              </div>

              <div id="fileUpload" className="max-w-md relative">
                <div className="mb-2 block">
                  <Label
                    htmlFor="Intro Video Upload file"
                    value="Intro Video Upload file"
                  />
                </div>

                <FileInput
                  type="file"
                  onChange={handleVideoChange}
                  id="Intro Video Upload file"
                  helperText="It’s The Intro video of home Page"
                  style={{
                    borderColor: "#D1D5DB",
                    backgroundColor: "#F9FAFB",
                    borderRadius: "8px",
                  }}
                />

                <button
                  onClick={() => downloadImage(templateDetails.videoUrl)}
                  className="absolute bottom-0 right-0 mb-[5px] mr-2 px-4 py-1 rounded text-black text-[10px] font-bold border border-black"
                  style={{
                    borderRadius: "4px",
                  }}
                >
                  View
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>


      
      <hr className="w-full border-t border-[#D1D5DB] mt-10" />
      <div
        className="relative p-4"
        onClick={handleOutsideClick}
      >
           <h1 className="font-bold text-black mt-8">Services Section</h1>
  <div className="lg:px-[170px] md:px-[110px] sm:px-6 lg:mt-10 mt-4 ju">
          <div className="flex flex-col gap-4 ">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 md:gap-10 lg:gap-10 sm:gap-4">
              <div id="fileUpload" className="max-w-md relative">
                <div className="mb-2 block">
                  <Label htmlFor="ServicesBg" value="ServicesBg" />
                </div>
                <FileInput
                  type="file"
                  onChange={(event) => handleFileChange5(event, "ServicesBg")} 
                  id="ServicesBg"
                  helperText="It’s The Services Background of the Company"
                  style={{
                    borderColor: "#D1D5DB",
                    backgroundColor: "#F9FAFB",
                    borderRadius: "8px",
                  }}
                />
                <button
                  onClick={() => downloadImage(templateDetails.ServicesBg)}
                  className="absolute bottom-0 right-0 mb-[5px] mr-2 px-4 py-1 rounded text-black text-[10px] font-bold border border-black"
                  style={{
                    borderRadius: "4px",
                  }}
                >
                  View
                </button>
              </div>

              <div id="fileUpload" className="max-w-md relative">
                <div className="mb-2 block">
                  <Label
                    htmlFor="ServicesPortrait"
                    value="ServicesPortrait"
                  />
                </div>

                <FileInput
                  type="file"
                  onChange={(event) => handleFileChange5(event, "ServicesPortrait")} 
                  id="ServicesPortrait"
                  helperText="It’s The Services Portrait "
                  style={{
                    borderColor: "#D1D5DB",
                    backgroundColor: "#F9FAFB",
                    borderRadius: "8px",
                  }}
                />

                <button
                  onClick={() => downloadImage(templateDetails.ServicesPortrait)}
                  className="absolute bottom-0 right-0 mb-[5px] mr-2 px-4 py-1 rounded text-black text-[10px] font-bold border border-black"
                  style={{
                    borderRadius: "4px",
                  }}
                >
                  View
                </button>
              </div>
            </div>
          </div>
        </div>
        {templateDetails.Services && templateDetails.Services.length > 0 && (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 lg:mt-10">
    {templateDetails.Services.map((service, index) => (
      <div 
        key={index} 
        className=" px-2 lg:px-[170px] "
      >
        <h2 className="text-[18px] font-bold mb-2">Service {index + 1}</h2>
        
        <FloatingLabel 
          variant="filled" 
          label="Title" 
          style={{
            width: '100%', 
            borderColor: "#D1D5DB",
            backgroundColor: "#F9FAFB",
          }}
          inputStyle={{ width: '100%' }} 
          value={service.title}
          onChange={(e) => handleServiceTitleChange(e, index)}
        />

{service.items && service.items.length > 0 && (
  <div className="mt-4">
    {service.items.map((item, itemIndex) => (
      <div key={itemIndex} className="relative mt-2">
        <FloatingLabel 
          variant="filled" 
          label={`Item ${itemIndex + 1}`} // Show item number
          style={{
            width: '100%', 
            borderColor: "#D1D5DB",
            backgroundColor: "#F9FAFB",
          }}
          inputStyle={{ width: '100%' }} 
          value={item}
          onChange={(e) => handleItemChange(e, index, itemIndex)}
        />
        <button
          onClick={() => removeItem(index, itemIndex)}
          className="absolute right-2 top-3 rounded-full  text-[#959595] px-1 py-0.5 text-[14px]"
        >
        <RxCross2 />
        </button>
      </div>
    ))}
  </div>
)}

        
        <div className="flex justify-center mt-4">
          <button 
            onClick={() => addItem(index)} 
            className="text-[30px] "
          >
          <MdOutlineAddCircle />

          </button>
        </div>
      </div>
    ))}
  </div>
)}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 lg:mt-10 ">
      {templateDetails.ClassTypes && templateDetails.ClassTypes.length > 0 && (
          <>
            {templateDetails.ClassTypes.map((ClassType, index) => (
              <div key={index} className="relative px-2 lg:px-[80px]">
                <div className="flex flex-col items-start">
                  <Label htmlFor={`ClassType-${index}`} color="gray" value={`Class Type ${index + 1}`} />
                  <div className="relative w-full">
                    <TextInput
                      id={`ClassType-${index}`}
                      type="text"
                      placeholder="ClassType"
                      required
                      value={ClassType}
                      onChange={(event) => handleChange1(event, index)}
                      sizing="sm"
                      helperText={
                        <>
                          It’s the Dance Type of the Company Provides
                        </>
                      }
                      style={{
                        borderColor: "#D1D5DB",
                        backgroundColor: "#F9FAFB",
                        borderRadius: "8px",
                      }}
                      className="w-full"
                    />
                    <button
                      onClick={() => removeClassType(index)}
                      className="absolute right-2 top-3 rounded-full  text-[#959595] px-1 py-0.5 text-[14px]"
                      >
                      <RxCross2 />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      <div className="col-span-1 flex items-center justify-center">
                <button 
                  onClick={addClassType} 
                  className="text-[30px]"
                >
                  <MdOutlineAddCircle />
                </button>
              </div>
            
            
      </div>

      <hr className="w-full border-t border-[#D1D5DB] mt-10" />
      <div
        className="relative p-4"
        onClick={handleOutsideClick}
      >

<h1 className="font-bold text-black mt-8">Testimonial Section</h1>
<div className="lg:px-[170px] md:px-[110px] sm:px-6 lg:mt-10 mt-4 ju">
<div className="flex flex-col gap-4 ">
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 md:gap-10 lg:gap-10 sm:gap-4">
<div id="fileUpload" className="max-w-md relative">
  <div className="mb-2 block">
    <Label htmlFor="TestimonialBg" value="TestimonialBg" />
  </div>
  <FileInput
    type="file"
    onChange={(event) => handleFileChange5(event, "TestimonialBg")} 
    id="TestimonialBg"
    helperText="It’s The Services Background of the Testimonial"
    style={{
      borderColor: "#D1D5DB",
      backgroundColor: "#F9FAFB",
      borderRadius: "8px",
    }}
  />
  <button
    onClick={() => downloadImage(templateDetails.TestimonialBg)}
    className="absolute bottom-0 right-0 mb-[5px] mr-2 px-4 py-1 rounded text-black text-[10px] font-bold border border-black"
    style={{
      borderRadius: "4px",
    }}
  >
    View
  </button>
</div>

</div>
{templateDetails.Testimonial && templateDetails.Testimonial.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 lg:mt-10">
              {templateDetails.Testimonial.map((testimonial, index) => (
                <div key={index} className="px-2 lg:px-[70px]">
                  <h2 className="text-[18px] font-bold mb-2">Testimonial {index + 1}</h2>

                  <FloatingLabel
                    variant="filled"
                    label="Name"
                    style={{
                      width: '100%',
                      borderColor: "#D1D5DB",
                      backgroundColor: "#F9FAFB",
                    }}
                    inputStyle={{ width: '100%' }}
                    value={testimonial.name}
                    onChange={(event) =>
                      handleTestimonialChange(event, index, 'name')}
                  />

                  <FloatingLabel
                    variant="filled"
                    label="Feedback"
                    style={{
                      width: '100%',
                      borderColor: "#D1D5DB",
                      backgroundColor: "#F9FAFB",
                    }}
                    inputStyle={{ width: '100%' }}
                    value={testimonial.description}
                    onChange={(event) =>
                      handleTestimonialChange(event, index, 'description')}
                  />

                  <div className="relative mt-4">
                    <FileInput
                      type="file"
                      onChange={(event) => handleFileChange1(event, index)}
                      id={`TestimonialImg-${index}`}
                      helperText="Upload the Testimonial Image"
                      style={{
                        borderColor: "#D1D5DB",
                        backgroundColor: "#F9FAFB",
                        borderRadius: "8px",
                      }}
                    />
                    {testimonial.img && (
                      <button
                        onClick={() => downloadImage(testimonial.img)}
                        className="absolute bottom-0 right-0 mb-[1px] mr-2 px-4 py-1 rounded text-black text-[10px] font-bold border border-black"
                        style={{
                          borderRadius: "4px",
                        }}
                      >
                        View
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
</div>
</div>

</div>

<hr className="w-full border-t border-[#D1D5DB] mt-10" />
      <div
        className="relative p-4"
        onClick={handleOutsideClick}
      >
        <h1 className="font-bold text-black mt-8">Subscription Section</h1>



        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 md:gap-10 lg:gap-10 sm:gap-4">
<div id="fileUpload" className="max-w-md relative">
  <div className="mb-2 block">
    <Label htmlFor="SubscriptionBg" value="SubscriptionBg" />
  </div>
  <FileInput
    type="file"
    onChange={(event) => handleFileChange5(event, "SubscriptionBg")} 
    id="SubscriptionBg"
    helperText="It’s The Services Background of the Subscription"
    style={{
      borderColor: "#D1D5DB",
      backgroundColor: "#F9FAFB",
      borderRadius: "8px",
    }}
  />
  <button
    onClick={() => downloadImage(templateDetails.SubscriptionBg)}
    className="absolute bottom-0 right-0 mb-[5px] mr-2 px-4 py-1 rounded text-black text-[10px] font-bold border border-black"
    style={{
      borderRadius: "4px",
    }}
  >
    View
  </button>
</div>
</div>

 {subscriptionDetails && subscriptionDetails.length > 0 && (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 lg:mt-10">
    {subscriptionDetails.map((subscription, index) => (
      <div key={index} className="px-2 lg:px-[170px]">
        <div className="flex justify-between items-center ">
        <h2 className="text-[18px] font-bold mb-2">Subscription {index + 1}</h2>
        {/* <div className="flex justify-end"> */}
        <button
        onClick={() => removeSubscription(subscription.productId)}
        className="rounded-full  font-bold text-black text-[18px] "
      >
    <RxCross2 />
      </button></div>
      {/* </div> */}
        {/* Heading */}
        <FloatingLabel 
          variant="filled" 
          label="Heading" 
          style={{
            width: '100%', 
            borderColor: "#D1D5DB",
            backgroundColor: "#F9FAFB",
          }}
          inputStyle={{ width: '100%' }} 
          value={subscription.heading}
          onChange={(e) => handleHeadingChange(e, index)}
        />

        {/* Duration */}
        <div className="max-w-md mt-4">
          <div className="mb-2 block">
            <Label htmlFor={`Duration-${index}`} value="Select your Duration" />
          </div>
          <Select 
            id={`Duration-${index}`} 
            required 
            value={`${subscription.subscriptionType}:${subscription.durationText}`}
            onChange={(e) => handleSubscriptionTypeChange(e, index)}
            style={{
              borderColor: "#D1D5DB",
              backgroundColor: "#F9FAFB",
              borderRadius: "8px",
            }}
          >
            <option value="year:yearly">Year</option>
            <option value="month:monthly">Month</option>
            <option value="week:weekly">Week</option>
            <option value="quarter:quarterly">Quarter</option>
          </Select>
        </div>

        {/* Currency */}
        <div className="max-w-md mt-4">
          <div className="mb-2 block">
            <Label htmlFor={`Currency-${index}`} value="Select your Currency" />
          </div>
          <Select 
            id={`Currency-${index}`} 
            required 
            value={subscription.currency}
            onChange={(e) => handleCountryChange(e, index)}
            style={{
              borderColor: "#D1D5DB",
              backgroundColor: "#F9FAFB",
              borderRadius: "8px",
            }}
          >
            <Currency />
          </Select>
        </div>
<div className="mt-6">
        {/* Amount */}
        <FloatingLabel 
          variant="filled" 
          label="Amount" 
          style={{
            width: '100%', 
            borderColor: "#D1D5DB",
            backgroundColor: "#F9FAFB",
          }}
    
          inputStyle={{ width: '100%' }} 
          value={subscription.amount}
          onChange={(e) => handleAmountChange(e, index)}
        />
</div>
        {/* Radio Buttons */}
        <fieldset className="flex max-w-md flex-col gap-4 mt-4">
          <legend className="mb-4">India</legend>
          <div className="flex items-center gap-2">
            <Radio 
              id={`True-${index}`} 
              value="true"
              checked={subscription.india === true}
              onChange={(e) => handleIndiaChange(e, index)}
              
              style={{
                borderColor: "#D1D5DB",
                backgroundColor: "#F9FAFB",
                borderRadius: "8px",
              }}
            />
            <Label htmlFor={`True-${index}`}>True</Label>
          </div>
          <div className="flex items-center gap-2">
            <Radio 
              id={`False-${index}`} 
              value="false"
          checked={subscription.india === false}
          onChange={(e) => handleIndiaChange(e, index)}
              style={{
                borderColor: "#D1D5DB",
                backgroundColor: "#F9FAFB",
                borderRadius: "8px",
              }}
            />
            <Label htmlFor={`False-${index}`}>False</Label>
          </div>
        </fieldset>

        <h2 className="text-lg font-bold mt-4">Provides:</h2>
        {subscription.provides.map((provide, idx) => (
          <div key={idx} className="relative mt-2">
            <FloatingLabel 
              variant="filled" 
              label={`Provide ${idx + 1}`} 
              style={{
                width: '100%', 
                borderColor: "#D1D5DB",
                backgroundColor: "#F9FAFB",
              }}
              inputStyle={{ width: '100%' }} 
              value={provide}
              onChange={(e) => handleProvideChange(e, index, idx)}
            />
            <button
              onClick={() => removeProvide(index, idx)}
              className="absolute right-2 top-3 rounded-full text-[#959595] px-1 py-0.5 text-[14px]"
            >
              <RxCross2 />
            </button>
          </div>
        ))}

        <div className="flex flex-col items-center mt-4">
          <button 
            onClick={() => addProvides(index)} 
            className="text-[30px] py-2 px-4 " 
          >
             <MdOutlineAddCircle />
          </button>
        </div>

      </div>
    ))}

    {/* Add Subscription Button */}
    <div className="mt-4 flex justify-center lg:justify-start lg:ml-32">
      <button 
        onClick={addSubscription} 
        className="text-[40px] py-2 px-4 " 
      >
        <MdOutlineAddCircle />
      </button>
    </div>
  </div>
)}

</div>


<hr className="w-full border-t border-[#D1D5DB] mt-10" />
      <div
        className="relative p-4"
        onClick={handleOutsideClick}
      >
        <h1 className="font-bold text-black mt-8">Instructor Section</h1>



        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 md:gap-10 lg:gap-10 sm:gap-4">
<div id="fileUpload" className="max-w-md relative">
  <div className="mb-2 block">
    <Label htmlFor="InstructorBg" value="InstructorBg" />
  </div>
  <FileInput
    type="file"
    onChange={(event) => handleFileChange5(event, "InstructorBg")} 
    id="InstructorBg"
    helperText="It’s The Background of the Instructor"
    style={{
      borderColor: "#D1D5DB",
      backgroundColor: "#F9FAFB",
      borderRadius: "8px",
    }}
  />
  <button
    onClick={() => downloadImage(templateDetails.InstructorBg)}
    className="absolute bottom-0 right-0 mb-[5px] mr-2 px-4 py-1 rounded text-black text-[10px] font-bold border border-black"
    style={{
      borderRadius: "4px",
    }}
  >
    View
  </button>
</div>
</div>

{instructorDetails && instructorDetails.length > 0 && (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 lg:mt-10">
    {instructorDetails.map((instructor, index) => (
      <div key={index} className="px-2 lg:px-[170px]">
         <div className="flex justify-between items-center ">
        <h2 className="text-[18px] font-bold mb-2">Instructor {index + 1}</h2>
        <button
        onClick={() => removeInstructor(instructor.instructorId)}
        className="rounded-full  font-bold text-black text-[18px] "
      >
    <RxCross2 />
      </button></div>
        <FloatingLabel
          variant="filled"
          label="Name"
          style={{
            width: '100%',
            borderColor: "#D1D5DB",
            backgroundColor: "#F9FAFB",
          }}
          inputStyle={{ width: '100%' }}
          value={instructor.name}
             onChange={(e) => handleInstructorChange(e, 'name', index)}
        />

        <FloatingLabel
          variant="filled"
          label="Position"
          style={{
            width: '100%',
            borderColor: "#D1D5DB",
            backgroundColor: "#F9FAFB",
          }}
          inputStyle={{ width: '100%' }}
          value={instructor.position}
          onChange={(e) => handleInstructorChange(e, 'position', index)}
        />

        <FloatingLabel
          variant="filled"
          label="Email ID"
          style={{
            width: '100%',
            borderColor: "#D1D5DB",
            backgroundColor: "#F9FAFB",
          }}
          inputStyle={{ width: '100%' }}
          value={instructor.emailId}
             onChange={(e) => handleInstructorChange(e, 'emailId', index)}
        />

        <div className="relative mt-4">
          <FileInput
            type="file"
            onChange={(e) => handleFileChange3(e, index)}
            id={`InstructorImg-${index}`}
            helperText="Upload the Instructor Image"
            style={{
              borderColor: "#D1D5DB",
              backgroundColor: "#F9FAFB",
              borderRadius: "8px",
            }}
          />
          {instructor.image && (
            <button
              onClick={() => downloadImage(instructor.image)}
              className="absolute bottom-0 right-0 mb-[1px] mr-2 px-4 py-1 rounded text-black text-[10px] font-bold border border-black"
              style={{
                borderRadius: "4px",
              }}
            >
              View
            </button>
          )}
        </div>
      </div>
    ))}
  </div>
)}
<div className="flex justify-center mt-4">
  <button 
     onClick={addInstructor}
    className="text-[30px]"
  >
    <MdOutlineAddCircle />
  </button>
</div>


</div>
<hr className="w-full border-t border-[#D1D5DB] mt-10" />
      <div
        className="relative p-4"
        onClick={handleOutsideClick}
      >
        <h1 className="font-bold text-black mt-8">FAQ Section</h1>
        {templateDetails.FAQ && templateDetails.FAQ.length > 0 && (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 lg:mt-10">
    {templateDetails.FAQ.map((faq, index) => (
      <div 
        key={index} 
        className="px-2 lg:px-[170px]"
      >
         <div className="flex justify-between items-center ">
  <h2 className="text-[18px] font-bold">FAQ {index + 1}</h2>
  <button 
    onClick={() => removeFAQ(index)}
    className="rounded-full font-bold text-black text-[18px]"
  >
    <RxCross2 />
  </button>
</div>

        <div>
        <div className="mb-2 block">
          <Label htmlFor="Question" value="Question" />
        </div>
        <TextInput
          variant="filled" 
          label="Question" 
           sizing="sm"
          id="Question"
          type="text"
          placeholder="Question"
          style={{
            width: '100%', 
            borderColor: "#D1D5DB",
            backgroundColor: "#F9FAFB",
            borderRadius:'8px'
          }}
          inputStyle={{ width: '100%' }} 
          value={faq.title}
          onChange={(e) => FaqInputChange(index, 'title', e.target.value)}
        />
        </div>

        <div className="mt-4">
        <div className="mb-2 block">
        <Label htmlFor="Answer" value="Answer" />
      </div>
          <Textarea
            variant="filled" 
            required rows={4}
            id="Answer"
            placeholder="Answer..."
            label="Answer" 
            style={{
              width: '100%', 
              borderColor: "#D1D5DB",
              backgroundColor: "#F9FAFB",
              borderRadius:'8px',
            }}
            inputStyle={{ width: '100%' }} 
            value={faq.content}
            onChange={(e) => FaqInputChange(index, 'content', e.target.value)}
          />
        </div>

        
      </div>
    ))}
  </div>
)}

<div className="flex justify-center mt-4">
  <button 
   onClick={addFAQ}
    className="text-[30px]"
  >
    <MdOutlineAddCircle />
  </button>
</div>

       </div>
       <hr className="w-full border-t border-[#D1D5DB] mt-10" />
      <div
        className="relative p-4"
        onClick={handleOutsideClick}
      >
        <h1 className="font-bold text-black mt-8">Policy Section</h1>



        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 md:gap-10 lg:gap-10 sm:gap-4">
<div id="fileUpload" className="max-w-md relative">
  <div className="mb-2 block">
    <Label htmlFor="AboutUsBg" value="AboutUsBg" />
  </div>
  <FileInput
    type="file"
    onChange={(event) => handleFileChange5(event, "AboutUsBg")} 
    id="AboutUsBg"
    helperText="It’s The Background of the AboutUs"
    style={{
      borderColor: "#D1D5DB",
      backgroundColor: "#F9FAFB",
      borderRadius: "8px",
    }}
  />
  <button
    onClick={() => downloadImage(templateDetails.InstructorBg)}
    className="absolute bottom-0 right-0 mb-[5px] mr-2 px-4 py-1 rounded text-black text-[10px] font-bold border border-black"
    style={{
      borderRadius: "4px",
    }}
  >
    View
  </button>
</div>
</div>
{templateDetails.AboutUs && templateDetails.AboutUs.length > 0 && (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 lg:mt-10">
    {templateDetails.AboutUs.map((item, index) => (
      <div key={index} className="px-2 lg:px-[170px]">
        <div className="flex justify-between items-center">
          <h2 className="text-[18px] font-bold">AboutUs {index + 1}</h2>
          <button
            onClick={() => removeAboutUsItem(index)}
            className="rounded-full font-bold text-black text-[18px]"
          >
            <RxCross2 />
          </button>
        </div>

        <div className="mt-4">
          <Label htmlFor={`aboutUsHeading-${index}`} value="Heading" />
          <TextInput
            id={`aboutUsHeading-${index}`}
            variant="filled"
            label="Heading"
            placeholder="Enter AboutUs Policy Heading"
            style={{
              width: '100%', 
              borderColor: "#D1D5DB",
              backgroundColor: "#F9FAFB",
              borderRadius: '8px'
            }}
            value={item.heading}
            onChange={(e) => handleAboutUsChange(e, index, 'heading')}
          />
        </div>

        <div className="mt-4">
          <Label htmlFor={`aboutUsContent-${index}`} value="Content" />
          <Textarea
            id={`aboutUsContent-${index}`}
            variant="filled"
            label="Content"
            placeholder="Enter AboutUs Content"
            style={{
              width: '100%', 
              borderColor: "#D1D5DB",
              backgroundColor: "#F9FAFB",
              borderRadius: '8px'
            }}
            rows={4}
            value={item.content}
            onChange={(e) => handleAboutUsChange(e, index, 'content')}
          />
        </div>
      </div>
    ))}
  </div>
)}

<div className="flex justify-center mt-4">
  <button onClick={addAboutUsItem} className="text-[30px]">
    <MdOutlineAddCircle />
  </button>
</div>
{templateDetails.PrivacyPolicy && templateDetails.PrivacyPolicy.length > 0 && (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 lg:mt-10">
    {templateDetails.PrivacyPolicy.map((item, index) => (
      <div key={index} className="px-2 lg:px-[170px]">
        <div className="flex justify-between items-center">
          <h2 className="text-[18px] font-bold">PrivacyPolicy {index + 1}</h2>
          <button
            onClick={() => removePrivacyPolicyItem(index)}
            className="rounded-full font-bold text-black text-[18px]"
          >
            <RxCross2 />
          </button>
        </div>

        <div className="mt-4">
          <Label htmlFor={`privacyPolicyHeading-${index}`} value="Heading" />
          <TextInput
            id={`privacyPolicyHeading-${index}`}
            variant="filled"
            label="Heading"
            placeholder="Enter PrivacyPolicy Heading"
            style={{
              width: '100%', 
              borderColor: "#D1D5DB",
              backgroundColor: "#F9FAFB",
              borderRadius: '8px'
            }}
            value={item.heading}
            onChange={(e) => handlePrivacyPolicyChange(e, index, 'heading')}
          />
        </div>

        <div className="mt-4">
          <Label htmlFor={`privacyPolicyContent-${index}`} value="Content" />
          <Textarea
            id={`privacyPolicyContent-${index}`}
            variant="filled"
            label="Content"
            placeholder="Enter PrivacyPolicy Content"
            style={{
              width: '100%', 
              borderColor: "#D1D5DB",
              backgroundColor: "#F9FAFB",
              borderRadius: '8px'
            }}
            rows={4}
            value={item.content}
            onChange={(e) => handlePrivacyPolicyChange(e, index, 'content')}
          />
        </div>
      </div>
    ))}
  </div>
)}

<div className="flex justify-center mt-4">
  <button onClick={addPrivacyPolicyItem} className="text-[30px]">
    <MdOutlineAddCircle />
  </button>
</div>
{templateDetails.Refund && templateDetails.Refund.length > 0 && (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 lg:mt-10">
    {templateDetails.Refund.map((item, index) => (
      <div key={index} className="px-2 lg:px-[170px]">
        <div className="flex justify-between items-center">
          <h2 className="text-[18px] font-bold">Refund Policy {index + 1}</h2>
          <button
            onClick={() => removeRefundItem(index)}
            className="rounded-full font-bold text-black text-[18px]"
          >
            <RxCross2 />
          </button>
        </div>

        <div className="mt-4">
          <Label htmlFor={`refundHeading-${index}`} value="Heading" />
          <TextInput
            id={`refundHeading-${index}`}
            variant="filled"
            label="Heading"
            placeholder="Enter Refund Policy Heading"
            style={{
              width: '100%', 
              borderColor: "#D1D5DB",
              backgroundColor: "#F9FAFB",
              borderRadius: '8px'
            }}
            value={item.heading}
            onChange={(e) => handleRefundChange(e, index, 'heading')}
          />
        </div>

        <div className="mt-4">
          <Label htmlFor={`refundContent-${index}`} value="Content" />
          <Textarea
            id={`refundContent-${index}`}
            variant="filled"
            label="Content"
            placeholder="Enter Refund Policy Content"
            style={{
              width: '100%', 
              borderColor: "#D1D5DB",
              backgroundColor: "#F9FAFB",
              borderRadius: '8px'
            }}
            rows={4}
            value={item.content}
            onChange={(e) => handleRefundChange(e, index, 'content')}
          />
        </div>
      </div>
    ))}
  </div>
)}

<div className="flex justify-center mt-4">
  <button onClick={addRefundItem} className="text-[30px]">
    <MdOutlineAddCircle />
  </button>
</div>
{templateDetails.TermsData && templateDetails.TermsData.length > 0 && (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 lg:mt-10">
    {templateDetails.TermsData.map((item, index) => (
      <div key={index} className="px-2 lg:px-[170px]">
        <div className="flex justify-between items-center">
          <h2 className="text-[18px] font-bold">Terms And Data {index + 1}</h2>
          <button
            onClick={() => removeTermsDataItem(index)}
            className="rounded-full font-bold text-black text-[18px]"
          >
            <RxCross2 />
          </button>
        </div>

        <div className="mt-4">
          <Label htmlFor={`termsDataTitle-${index}`} value="Title" />
          <TextInput
            id={`termsDataTitle-${index}`}
            variant="filled"
            label="Title"
            placeholder="Enter Terms Data Title"
            style={{
              width: '100%', 
              borderColor: "#D1D5DB",
              backgroundColor: "#F9FAFB",
              borderRadius: '8px'
            }}
            value={item.title}
            onChange={(e) => handleTermsDataChange(e, index, 'title')}
          />
        </div>

        <div className="mt-4">
          <Label htmlFor={`termsDataContent-${index}`} value="Content" />
          <Textarea
            id={`termsDataContent-${index}`}
            variant="filled"
            label="Content"
            placeholder="Enter Terms Data Content"
            style={{
              width: '100%', 
              borderColor: "#D1D5DB",
              backgroundColor: "#F9FAFB",
              borderRadius: '8px'
            }}
            rows={4}
            value={item.content}
            onChange={(e) => handleTermsDataChange(e, index, 'content')}
          />
        </div>
      </div>
    ))}
  </div>
)}

<div className="flex justify-center mt-4">
  <button onClick={addTermsDataItem} className="text-[30px]">
    <MdOutlineAddCircle />
  </button>
</div>


</div>

<hr className="w-full border-t border-[#D1D5DB] mt-10" />
      <div
        className="relative p-4"
        onClick={handleOutsideClick}
      >
        <h1 className="font-bold text-black mt-8">Contact Section</h1>
        <div className="lg:px-[180px] md:px-[150px] sm:px-4">
          <div className="flex flex-col gap-4 ">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:gap-10 lg:gap-10 sm:gap-4">

            <div className="relative">
  <div className="mb-2 block">
    <Label
      htmlFor="address"
      color="gray"
      value="Address"
    />
    <span className="text-red-500 ml-1">*</span>
  </div>
  <TextInput
    id="address"
    placeholder="Enter your address"
    required
    value={templateDetails.Query_Address}
    onChange={(event) =>
      handleChange(event, "Query_Address")
    }
    sizing="sm"
    style={{
      borderColor: "#D1D5DB",
      backgroundColor: "#F9FAFB",
      borderRadius: "8px",
    }}
  />
</div>

<div className="relative">
  <div className="mb-2 block">
    <Label
      htmlFor="email"
      color="gray"
      value="Email Id"
    />
    <span className="text-red-500 ml-1">*</span>
  </div>
  <TextInput
    id="email"
    placeholder="Enter your email id"
    required
    value={templateDetails.Query_EmailId}
    onChange={(event) =>
      handleChange(event, "Query_EmailId")
    }
    sizing="sm"
    style={{
      borderColor: "#D1D5DB",
      backgroundColor: "#F9FAFB",
      borderRadius: "8px",
    }}
  />
</div>

<div className="relative">
  <div className="mb-2 block">
    <Label
      htmlFor="phone"
      color="gray"
      value="Phone Number"
    />
    <span className="text-red-500 ml-1">*</span>
  </div>
  <TextInput
    id="phone"
    placeholder="Enter your phone number"
    required
    value={templateDetails.Query_PhoneNumber}
    onChange={(event) =>
      handleChange(event, "Query_PhoneNumber")
    }
    sizing="sm"
    style={{
      borderColor: "#D1D5DB",
      backgroundColor: "#F9FAFB",
      borderRadius: "8px",
    }}
  />
</div>

<div className="relative">
  <div className="mb-2 block">
    <Label
      htmlFor="upi"
      color="gray"
      value="Upi Id"
    />
    <span className="text-red-500 ml-1">*</span>
  </div>
  <TextInput
    id="upi"
    placeholder="Enter your UPI id"
    value={templateDetails.UpiId}
    onChange={(event) =>
      handleChange(event, "UpiId")
    }
    sizing="sm"
    style={{
      borderColor: "#D1D5DB",
      backgroundColor: "#F9FAFB",
      borderRadius: "8px",
    }}
  />
</div>

<div className="relative">
  <div className="mb-2 block">
    <Label
      htmlFor="youtube"
      color="gray"
      value="Youtube"
    />
    <span className="text-red-500 ml-1">*</span>
  </div>
  <TextInput
    id="youtube"
    placeholder="Enter your Youtube channel"
    required
    value={templateDetails.YTLink}
    onChange={(event) =>
      handleChange(event, "YTLink")
    }
    sizing="sm"
    style={{
      borderColor: "#D1D5DB",
      backgroundColor: "#F9FAFB",
      borderRadius: "8px",
    }}
  />
</div>

<div className="relative">
  <div className="mb-2 block">
    <Label
      htmlFor="facebook"
      color="gray"
      value="Facebook"
    />
    <span className="text-red-500 ml-1">*</span>
  </div>
  <TextInput
    id="facebook"
    placeholder="Enter your Facebook profile"
    
    value={templateDetails.Facebook}
    onChange={(event) =>
      handleChange(event, "Facebook")
    }
    sizing="sm"
    style={{
      borderColor: "#D1D5DB",
      backgroundColor: "#F9FAFB",
      borderRadius: "8px",
    }}
  />
</div>

<div className="relative">
  <div className="mb-2 block">
    <Label
      htmlFor="instagram"
      color="gray"
      value="Instagram"
    />
    <span className="text-red-500 ml-1">*</span>
  </div>
  <TextInput
    id="instagram"
    placeholder="Enter your Instagram handle"
   
    value={templateDetails.Instagram}
                        onChange={(event) =>
                          handleChange(event, "Instagram")
                        }
    sizing="sm"
    style={{
      borderColor: "#D1D5DB",
      backgroundColor: "#F9FAFB",
      borderRadius: "8px",
    }}
  />
</div>

            </div>
            </div>
            </div>            </div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} className="px-[50px] mb-10">
  <button onClick={goBack}  className="bg-[#000000] text-[rgb(255,255,255)] font-bold py-2 px-4 rounded-xl shadow-lg">Back</button>
  <button onClick={saveChanges} className="bg-[#000000] text-[#ffffff] font-bold py-2 px-4 rounded-xl shadow-lg">Save</button>  </div>
       </div>
    </>
  );
};

export default Full1;
