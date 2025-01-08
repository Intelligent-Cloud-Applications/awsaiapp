import React, { useState, useEffect, useContext, useRef } from "react";
import { useLocation } from "react-router-dom";
import { API } from "aws-amplify";
import Navbar from "../components/Home/Navbar";
import { Storage } from "aws-amplify";
import Currency from "../components/Auth/Currency";
import "./Full.css";
import { useNavigate } from "react-router-dom";
import Context from "../context/Context";
import { FloatingLabel } from "flowbite-react";
import { FileInput, Label, TextInput, Select, Textarea } from "flowbite-react";
import { MultiSelect } from "react-multi-select-component";
import { RxCross2 } from "react-icons/rx";
import { MdOutlineAddCircle } from "react-icons/md";
import { IoCaretBack } from "react-icons/io5";
import Country from "../components/Auth/Country";
const New_Full = () => {
  const [selectedCountryCode, setSelectedCountryCode] = useState('+91');
  const navigate = useNavigate();
  const UserCtx = useContext(Context)
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
    navigate("/dashboard");
  };
  const [loaderInitialized, setLoaderInitialized] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      // if (institutionNames && Ctx.userData.institutionName === "awsaiapp") {
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
        // await setTemplateDetails(templateResponse || null);
        await setTemplateDetails(prev => {
          let updatedCountry = templateResponse.country || "India";

          let updatedPhoneNumber = templateResponse.Query_PhoneNumber;
          let updatedCountryCode = "91";
          const defaultInstitutionType = "DanceStudio";
          const defaultInstitutionFormat = "Online_Classes";
          const institutionType = templateResponse.institutionType || defaultInstitutionType;
          const defaultServices = Array.from({ length: 4 }, () => ({ title: "", items: [""] }));
          const defaultFAQ = [{ title: "", content: "" }];
          const defaultAboutUs = [{ heading: "", content: "" }];
          const defaultPrivacyPolicy = [{ heading: "", content: "" }];
          const defaultRefund = [{ heading: "", content: "" }];
          const defaultTermsData = [{ title: "", content: "" }];
          const services = templateResponse.Services && templateResponse.Services.length > 0
            ? templateResponse.Services
            : defaultServices;
          const institutionFormat = templateResponse.institutionFormat || defaultInstitutionFormat;
          if (updatedPhoneNumber) {
            updatedPhoneNumber = updatedPhoneNumber.replace(/\D/g, '');

            if (updatedPhoneNumber.length > 10) {
              let phoneNumberLength = updatedPhoneNumber.length;
              updatedCountryCode = updatedPhoneNumber.slice(0, phoneNumberLength - 10);
              updatedPhoneNumber = updatedPhoneNumber.slice(phoneNumberLength - 10);
            } else if (updatedPhoneNumber.length < 10) {
              updatedCountryCode = "91";
            }
          } else {
            updatedPhoneNumber = "";
            updatedCountryCode = "91";
          }
          setSelectedCountryCode(updatedCountryCode);
          return {
            ...prev,
            ...templateResponse,
            Testimonial: templateResponse.Testimonial && templateResponse.Testimonial.length > 0
              ? templateResponse.Testimonial
              : [
                { name: "", description: "", img: "" },
                { name: "", description: "", img: "" },
                { name: "", description: "", img: "" }
              ],
            country: updatedCountry,
            Query_PhoneNumber: updatedPhoneNumber,
            countryCode: updatedCountryCode,
            institutionType,
            Services: services,
            FAQ: templateResponse.FAQ && templateResponse.FAQ.length > 0 ? templateResponse.FAQ : defaultFAQ,
            ClassTypes: templateResponse.ClassTypes || [""],
            AboutUs: templateResponse.AboutUs && templateResponse.AboutUs.length > 0 ? templateResponse.AboutUs : defaultAboutUs,
            PrivacyPolicy: templateResponse.PrivacyPolicy && templateResponse.PrivacyPolicy.length > 0 ? templateResponse.PrivacyPolicy : defaultPrivacyPolicy,
            Refund: templateResponse.Refund && templateResponse.Refund.length > 0 ? templateResponse.Refund : defaultRefund,
            TermsData: templateResponse.TermsData && templateResponse.TermsData.length > 0 ? templateResponse.TermsData : defaultTermsData,
            institutionFormat
          };

        });

        const productResponse = await API.get(
          "clients",
          `/user/development-form/get-product/${institutionNames}`
        );
        // Convert the subscription amount to rupee
        const convertedProductResponse = productResponse.map((product) => ({
          ...product,
          amount: product.amount / 100, // Convert amount to rupee
        }));

        await setSubscriptionDetails(convertedProductResponse.length > 0 ? convertedProductResponse : [
          {
            heading: "",
            amount: "",
            india: true,
            subscriptionType: "year",
            durationText: "yearly",
            country: "India",
            currency: "INR",
            duration: 365 * 24 * 60 * 60 * 1000,
            provides: [""],
            // classType: [""]
          }
        ]);

        const instructorResponse = await API.get(
          "clients",
          `/user/development-form/get-instructor/${institutionNames}`
        );
        await setInstructorDetails(instructorResponse.length > 0 ? instructorResponse : [
          { name: "", position: "", emailId: "", image: "" }
        ]);
      } catch (error) {
        console.error("Error fetching details:", error);
      } finally {
        setLoader(false);
        util.setLoader(false);
      }
    }
    // };

    fetchData();
  }, [
    institutionNames,
    loader,
    loaderInitialized,
    util,
    Ctx.userData.institutionName,
  ]);
  const [selectedClassTypes, setSelectedClassTypes] = useState([]);
  const ClassTypes = templateDetails?.ClassTypes || [];
  const classTypeOptions = ClassTypes.map((classType) => ({
    value: classType,
    label: classType,
}));


  useEffect(() => {
    if (Array.isArray(subscriptionDetails) && subscriptionDetails.length > 0) {
      const mappedClassTypes = subscriptionDetails.map((subscription) =>
        Array.isArray(subscription.classType)
          ? subscription.classType.map((type) => ({
            value: type,
            label: type,
          }))
          : []
      );
      console.log('Mapped Class Types:', mappedClassTypes);
      setSelectedClassTypes(mappedClassTypes);
    }
  }, [subscriptionDetails]);

  // const handleClassTypeChange = (selectedOptions, subscriptionIndex) => {
  //   const updatedClassTypes = [...selectedClassTypes];
  //   updatedClassTypes[subscriptionIndex] = selectedOptions.map((option) => ({
  //     value: option.value,
  //     label: option.label,
  //   }));

  //   setSelectedClassTypes(updatedClassTypes); // Update the selected class types for the specific subscription
  // };
  const handleCountryChange1 = (e) => {
    const selectedCountry = e.target.options[e.target.selectedIndex].text;
    const selectedCountryCode = e.target.value;
    setTemplateDetails(prevInfo => ({
      ...prevInfo,
      country: selectedCountry.split(' ')[0],
      countryCode: selectedCountryCode
    }));
    setSelectedCountryCode(selectedCountryCode);
  };
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

    const maxSize = 4 * 1024 * 1024;
    if (videoFile.size > maxSize) {
      alert("File size exceeds 4 MB. Please select a smaller file.");
      event.target.value = "";
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/svg+xml",
      "video/mp4",
      "video/quicktime",
      "video/webm",
      "video/x-matroska",
      "video/x-msvideo",
      "video/mpeg",
      "video/ogg",
    ];
    if (!allowedTypes.includes(videoFile.type)) {
      alert("Only JPG, JPEG, PNG, SVG, MP4, and MOV files are allowed.");
      event.target.value = "";
      return;
    }

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
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/svg+xml",
    ];
    if (!allowedTypes.includes(file.type)) {
      alert("Only JPG, JPEG, PNG, and SVG files are allowed.");
      event.target.value = "";
      return;
    }

    // Validate file size (4 MB = 4 * 1024 * 1024 bytes)
    const maxSize = 4 * 1024 * 1024;
    if (file.size > maxSize) {
      alert("File size must be within 4 MB.");
      event.target.value = "";
      return;
    }

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
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/svg+xml",
    ];
    if (!allowedTypes.includes(file.type)) {
      alert("Only JPG, JPEG, PNG, and SVG files are allowed.");
      event.target.value = "";
      return;
    }

    // Validate file size (4 MB = 4 * 1024 * 1024 bytes)
    const maxSize = 4 * 1024 * 1024;
    if (file.size > maxSize) {
      alert("File size must be within 4 MB.");
      event.target.value = "";
      return;
    }
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
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/svg+xml",
    ];
    if (!allowedTypes.includes(file.type)) {
      alert("Only JPG, JPEG, PNG, and SVG files are allowed.");
      event.target.value = "";
      return;
    }

    // Validate file size (4 MB = 4 * 1024 * 1024 bytes)
    const maxSize = 4 * 1024 * 1024;
    if (file.size > maxSize) {
      alert("File size must be within 4 MB.");
      event.target.value = "";
      return;
    }
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
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/svg+xml",
    ];
    if (!allowedTypes.includes(file.type)) {
      alert("Only JPG, JPEG, PNG, and SVG files are allowed.");
      event.target.value = "";
      return;
    }

    // Validate file size (4 MB = 4 * 1024 * 1024 bytes)
    const maxSize = 4 * 1024 * 1024;
    if (file.size > maxSize) {
      alert("File size must be within 4 MB.");
      event.target.value = "";
      return;
    }
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
        durationText: "yearly",
        country: "India",
        currency: "INR",
        duration: 365 * 24 * 60 * 60 * 1000,
        provides: [""],
        classType:[""]
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
  const refs = {
    PrimaryColor: useRef(null),
    SecondaryColor: useRef(null),
    LightPrimaryColor: useRef(null),
    LightestPrimaryColor: useRef(null),
    logoUrl: useRef(null),
    videoUrl: useRef(null),
    TagLine: useRef(null),
    Query_Address: useRef(null),
    Query_PhoneNumber: useRef(null),
    Query_EmailId: useRef(null),
    Facebook: useRef(null),
    Instagram: useRef(null),
    userName: useRef(null),
    Services: useRef(null),
    ClassTypes: useRef(null),
    Testimonial: useRef(null),
    Subscriptions: useRef(null),
    FAQ: useRef(null),
    AboutUs: useRef(null),
    PrivacyPolicy: useRef(null),
    TermsData: useRef(null),
    Refund: useRef(null),
    Instructors: useRef(null),
  };
  const [errors, setErrors] = useState({});

  const scrollToError = (fieldName) => {
    if (fieldName === "Testimonial") {
      // Scroll to the testimonial section
      const element = refs.Testimonial.current;
      if (element) {
        const elementRect = element.getBoundingClientRect();
        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;
        const offset = 100;

        window.scrollTo({
          top: scrollTop + elementRect.top - offset,
          behavior: "smooth",
        });
        setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: true }));
      }
    } else if (fieldName === "Subscriptions") {
      // Scroll to the subscriptions section
      const element = refs.Subscriptions.current;
      if (element) {
        const elementRect = element.getBoundingClientRect();
        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;
        const offset = 100;

        window.scrollTo({
          top: scrollTop + elementRect.top - offset,
          behavior: "smooth",
        });
        setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: true }));
      }
    } else if (fieldName === "FAQ") {
      const element = refs.FAQ.current;
      if (element) {
        const elementRect = element.getBoundingClientRect();
        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;
        const offset = 100;

        window.scrollTo({
          top: scrollTop + elementRect.top - offset,
          behavior: "smooth",
        });
        setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: true }));
      }
    } else if (fieldName === "AboutUs") {
      const element = refs.AboutUs.current;
      if (element) {
        const elementRect = element.getBoundingClientRect();
        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;
        const offset = 100;

        window.scrollTo({
          top: scrollTop + elementRect.top - offset,
          behavior: "smooth",
        });
        setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: true }));
      }
    } else if (fieldName === "PrivacyPolicy") {
      const element = refs.PrivacyPolicy.current;
      if (element) {
        const elementRect = element.getBoundingClientRect();
        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;
        const offset = 100;

        window.scrollTo({
          top: scrollTop + elementRect.top - offset,
          behavior: "smooth",
        });
        setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: true }));
      }
    } else if (fieldName === "TermsData") {
      const element = refs.TermsData.current;
      if (element) {
        const elementRect = element.getBoundingClientRect();
        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;
        const offset = 100;

        window.scrollTo({
          top: scrollTop + elementRect.top - offset,
          behavior: "smooth",
        });
        setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: true }));
      }
    } else if (fieldName === "Refund") {
      const element = refs.Refund.current;
      if (element) {
        const elementRect = element.getBoundingClientRect();
        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;
        const offset = 100;

        window.scrollTo({
          top: scrollTop + elementRect.top - offset,
          behavior: "smooth",
        });
        setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: true }));
      }
    } else if (fieldName === "Instructors") {
      const element = refs.Instructors.current;
      if (element) {
        const elementRect = element.getBoundingClientRect();
        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;
        const offset = 100;

        window.scrollTo({
          top: scrollTop + elementRect.top - offset,
          behavior: "smooth",
        });
        setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: true }));
      }
    } else if (refs[fieldName] && refs[fieldName].current) {
      const element = refs[fieldName].current;
      const elementRect = element.getBoundingClientRect();
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const offset = 100;

      window.scrollTo({
        top: scrollTop + elementRect.top - offset,
        behavior: "smooth",
      });
      setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: true }));
    }
  };
  const scrollToErrorServices = (fieldName, section = "") => {
    let element;

    if (
      section === "services" &&
      templateDetails.Services &&
      templateDetails.Services.length > 0
    ) {
      const serviceIndex = parseInt(fieldName.split("-")[1], 10);
      const itemIndex = parseInt(fieldName.split("-")[2], 10);
      if (serviceIndex >= 0 && serviceIndex < templateDetails.Services.length) {
        element = document.querySelector(
          `#service-${serviceIndex}${itemIndex >= 0 ? `-item-${itemIndex}` : ""
          }`
        );
      }
    } else if (refs[fieldName] && refs[fieldName].current) {
      element = refs[fieldName].current;
    }

    if (element) {
      const elementRect = element.getBoundingClientRect();
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const offset = 100;

      window.scrollTo({
        top: scrollTop + elementRect.top - offset,
        behavior: "smooth",
      });
      setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: true }));
    }
  };
  const [invalidTestimonialIndex, setInvalidTestimonialIndex] = useState([]);

  const updateInvalidTestimonialIndex = (index, field) => {
    setInvalidTestimonialIndex(prev => [...prev, { index, field }]);
  };
  const [invalidClassTypes, setInvalidClassTypes] = useState([]);

  const updateInvalidClassTypeIndex = (index, field) => {
    setInvalidClassTypes(prev => [...prev, { index, field }]);
  };
  const [invalidSubscriptionIndex, setInvalidSubscriptionIndex] = useState([]);

  const updateInvalidSubscriptionIndex = (subscriptionIndex, field, itemIndex = null) => {
    setInvalidSubscriptionIndex(prev => [...prev, { subscriptionIndex, field, itemIndex }]);
  };

  const [invalidFaqs, setInvalidFaqs] = useState([]);

  const updateInvalidFaqIndex = (index, field) => {
    setInvalidFaqs(prev => [...prev, { index, field }]);
  };
  const [invalidAboutUs, setInvalidAboutUs] = useState([]);

  const updateInvalidAboutUsIndex = (index, field) => {
    setInvalidAboutUs(prev => [...prev, { index, field }]);
  };
  const [invalidPrivacyPolicy, setInvalidPrivacyPolicy] = useState([]);

  const updateInvalidPrivacyPolicyIndex = (index, field) => {
    setInvalidPrivacyPolicy(prev => [...prev, { index, field }]);
  };
  const [invalidTermsData, setInvalidTermsData] = useState([]);

  const updateInvalidTermsDataIndex = (index, field) => {
    setInvalidTermsData(prev => [...prev, { index, field }]);
  };


  const [invalidRefund, setInvalidRefund] = useState([]);

  const updateInvalidRefundIndex = (index, field) => {
    setInvalidRefund(prev => [...prev, { index, field }]);
  };


  const [invalidInstructors, setInvalidInstructors] = useState([]);

  const updateInvalidInstructorIndex = (index, field) => {
    setInvalidInstructors(prev => [...prev, { index, field }]);
  };
  const [invalidServices, setInvalidServices] = useState([]);

  const updateInvalidServiceIndex = (serviceIndex, itemIndex, field) => {
    setInvalidServices(prev => [...prev, { serviceIndex, itemIndex, field }]);
  };

  const saveChanges = async () => {
    setErrors({});
    setInvalidTestimonialIndex([]);
    setInvalidClassTypes([]);
    setInvalidSubscriptionIndex([]);
    setInvalidFaqs([]);
    setInvalidAboutUs([]);
    setInvalidPrivacyPolicy([]);
    setInvalidTermsData([]);
    setInvalidRefund([]);
    setInvalidInstructors([]);
    setInvalidServices([]);
    const requiredFields = [
      { value: templateDetails.PrimaryColor, name: "PrimaryColor" },
      { value: templateDetails.SecondaryColor, name: "SecondaryColor" },
      { value: templateDetails.LightPrimaryColor, name: "LightPrimaryColor" },
      {
        value: templateDetails.LightestPrimaryColor,
        name: "LightestPrimaryColor",
      },
      { value: templateDetails.logoUrl, name: "logoUrl" },
      { value: templateDetails.companyName, name: "companyName" },
      { value: templateDetails.videoUrl, name: "videoUrl" },
      { value: templateDetails.TagLine, name: "TagLine" },
      { value: templateDetails.Query_Address, name: "Query_Address" },
      { value: templateDetails.Query_PhoneNumber, name: "Query_PhoneNumber" },
      { value: templateDetails.Query_EmailId, name: "Query_EmailId" },
      { value: templateDetails.Facebook, name: "Facebook" },
      { value: templateDetails.Instagram, name: "Instagram" },
      { value: templateDetails.userName, name: "userName" },
    ];

    // Find any missing fields
    const missingHeadings = [];
    const emptyItems = [];
    const emptyClassTypes = [];
    const invalidTestimonials = [];
    const invalidSubscriptions = [];
    const invalidFaqs = [];
    const invalidAboutUs = [];
    const invalidPrivacyPolicy = [];
    const invalidTermsData = [];
    const invalidRefund = [];
    const invalidInstructors = [];
    const serviceErrors = [];

    // if (!templateDetails.Services || templateDetails.Services.length === 0) {
    //   missingHeadings.push("Services");
    // } else {
    //   templateDetails.Services.forEach((service, index) => {
    //     if (!service.title || service.title.trim() === "") {
    //       missingHeadings.push(`Service ${index + 1} Title`);
    //     }

    //     const hasNonEmptyItem = service.items.some(
    //       (item) => item.trim() !== ""
    //     );
    //     if (!hasNonEmptyItem) {
    //       emptyItems.push(`Service ${index + 1} Items`);
    //     }
    //   });
    // }
    if (!templateDetails.Services || templateDetails.Services.length === 0) {
      serviceErrors.push("Services");
    } else {
      templateDetails.Services.forEach((service, index) => {
        if (!service.title?.trim()) {
          updateInvalidServiceIndex(index, null, "title");
          serviceErrors.push(`service-${index}`);
        }
        if (service.items && service.items.length > 0) {
          service.items.forEach((item, itemIndex) => {
            if (!item?.trim()) {
              updateInvalidServiceIndex(index, itemIndex, "items");
              serviceErrors.push(`service-${index}-items-${itemIndex}`);
            }
          });
        } else {
          updateInvalidServiceIndex(index, null, "items");
          serviceErrors.push(`service-${index}-items`);
        }
      });
    }
    // Check for at least one non-empty ClassType
    if (
      !templateDetails.ClassTypes ||
      templateDetails.ClassTypes.length === 0
    ) {
      emptyClassTypes.push("ClassTypes");
    } else {
      const hasNonEmptyClassType = templateDetails.ClassTypes.some(
        (classType) => classType.trim() !== ""
      );
      if (!hasNonEmptyClassType) {
        emptyClassTypes.push("ClassTypes");
      }
      templateDetails.ClassTypes.forEach((classType, index) => {
        if (!classType.trim()) {
          updateInvalidClassTypeIndex(index, "ClassType");
        }
      });
    }

    // Validate Testimonials
    if (
      !templateDetails.Testimonial ||
      templateDetails.Testimonial.length === 0
    ) {
      invalidTestimonials.push("Testimonials");
    } else {
      templateDetails.Testimonial.forEach((testimonial, index) => {
        if (!testimonial.img || testimonial.img.trim() === "") {
          updateInvalidTestimonialIndex(index, "img");
        }
        if (!testimonial.name || testimonial.name.trim() === "") {
          updateInvalidTestimonialIndex(index, "name");
        }
        if (!testimonial.description || testimonial.description.trim() === "") {
          updateInvalidTestimonialIndex(index, "description");
        }

        if (
          !testimonial.img ||
          !testimonial.name ||
          !testimonial.description ||
          testimonial.img.trim() === "" ||
          testimonial.name.trim() === "" ||
          testimonial.description.trim() === ""
        ) {
          invalidTestimonials.push(`Testimonial ${index + 1}`);

        }
      });
    }
    if (subscriptionDetails && subscriptionDetails.length > 0) {
      const hasValidSubscription = subscriptionDetails.some(
        (subscription) =>
          subscription.amount &&
          subscription.heading &&
          subscription.amount > 0 &&
          subscription.heading.trim() !== "" &&
          subscription.provides &&
          subscription.provides.length > 0 &&
          subscription.provides.some((provide) => provide.trim() !== "")
      );
      subscriptionDetails.forEach((subscription, index) => {
        const hasValidHeading =
          subscription.heading && subscription.heading.trim() !== "";
        const hasValidAmount = subscription.amount && subscription.amount > 0;
        const hasValidProvides =
          subscription.provides &&
          subscription.provides.length > 0 &&
          subscription.provides.some((provide) => provide.trim() !== "");
        const provides = subscription.provides || [];

        if (!hasValidHeading) {
          updateInvalidSubscriptionIndex(index, "heading");
        }
        if (hasValidAmount === undefined || hasValidAmount <= 0) {
          updateInvalidSubscriptionIndex(index, "amount");
        }
        if (hasValidProvides.length === 0) {
          updateInvalidSubscriptionIndex(index, "provides");
        } else {
          provides.forEach((hasValidProvides, itemIndex) => {
            if (!hasValidProvides?.trim()) {
              updateInvalidSubscriptionIndex(index, "provides", itemIndex);
            }
          });
        }
        if (!hasValidHeading || !hasValidAmount || !hasValidProvides) {
          invalidSubscriptions.push(
            `Subscription ${index + 1
            } must have a non-empty heading, a positive amount, and at least one non-empty provide.`
          );
        }
      });

      if (!hasValidSubscription) {
        invalidSubscriptions.push(
          "At least one subscription must have non-empty currency, heading, duration, and at least one non-empty provide."
        );
      }
    } else {
      invalidSubscriptions.push("At least one Subscriptions is needed");
    }
    if (!templateDetails.FAQ || templateDetails.FAQ.length === 0) {
      invalidFaqs.push("At least one FAQ is required.");
    } else {
      templateDetails.FAQ.forEach((faq, index) => {
        const hasValidTitle = faq.title && faq.title.trim() !== "";
        const hasValidContent = faq.content && faq.content.trim() !== "";
        if (!faq.title || faq.title.trim() === "") {
          updateInvalidFaqIndex(index, "title");
        }
        if (!faq.content || faq.content.trim() === "") {
          updateInvalidFaqIndex(index, "content");
        }
        if (!hasValidTitle || !hasValidContent) {
          if (!hasValidTitle) {
            invalidFaqs.push(`FAQ ${index + 1} must have a non-empty title.`);
          }
          if (!hasValidContent) {
            invalidFaqs.push(`FAQ ${index + 1} must have non-empty content.`);
          }
        }
      });
    }
    if (instructorDetails && instructorDetails.length > 0) {
      const hasValidInstructor = instructorDetails.some(
        (instructor) =>
          instructor.image &&
          instructor.name &&
          instructor.position &&
          instructor.emailId &&
          instructor.emailId.trim() !== "" &&
          instructor.name.trim() !== "" &&
          instructor.image.trim() !== "" &&
          instructor.position.trim() !== ""
      );
      instructorDetails.forEach((instructor, index) => {
        if (!instructor.name || instructor.name.trim() === "") {
          updateInvalidInstructorIndex(index, "name");
        }
        if (!instructor.emailId || instructor.emailId.trim() === "" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(instructor.emailId)) {
          updateInvalidInstructorIndex(index, "emailId");
        }
        if (!instructor.image || instructor.image.trim() === "") {
          updateInvalidInstructorIndex(index, "image");
        }
        if (!instructor.position || instructor.position.trim() === "") {
          updateInvalidInstructorIndex(index, "position");
        }
        const hasValidImage =
          instructor.image && instructor.image.trim() !== "";
        const hasValidPosition =
          instructor.position && instructor.position.trim() !== "";
        const hasValidName = instructor.name && instructor.name.trim() !== "";
        const hasValidemail =
          instructor.emailId && instructor.emailId.trim() !== "";
        if (
          !hasValidemail ||
          !hasValidName ||
          !hasValidImage ||
          !hasValidPosition
        ) {
          invalidInstructors.push(
            `Instructor ${index + 1
            } must have a non-empty name,image,position and emailId.`
          );
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(instructor.emailId)) {
          invalidInstructors.push(
            `Instructor ${index + 1} has an invalid email address`
          );
        }
      });

      if (!hasValidInstructor) {
        invalidInstructors.push(
          "At least one Instructor must have non-empty name,image,position and emailId."
        );
      }
    } else {
      invalidInstructors.push(
        "At least one Instructor must have non-empty name,image,position and emailId."
      );
    }
    if (!templateDetails.AboutUs || templateDetails.AboutUs.length === 0) {
      invalidAboutUs.push("AboutUs");
    } else {
      templateDetails.AboutUs.forEach((about, index) => {
        if (!about.heading || about.heading.trim() === "") {
          updateInvalidAboutUsIndex(index, "heading");
        }
        if (!about.content || about.content.trim() === "") {
          updateInvalidAboutUsIndex(index, "content");
        }

        if (
          !about.heading ||
          !about.content ||
          about.heading.trim() === "" ||
          about.content.trim() === ""
        ) {
          invalidAboutUs.push(`AboutUs ${index + 1}`);
        }
      });
    }

    // Validate PrivacyPolicy
    if (
      !templateDetails.PrivacyPolicy ||
      templateDetails.PrivacyPolicy.length === 0
    ) {
      invalidPrivacyPolicy.push("PrivacyPolicy");
    } else {
      templateDetails.PrivacyPolicy.forEach((policy, index) => {
        if (!policy.heading || policy.heading.trim() === "") {
          updateInvalidPrivacyPolicyIndex(index, "heading");
        }
        if (!policy.content || policy.content.trim() === "") {
          updateInvalidPrivacyPolicyIndex(index, "content");
        }
        if (
          !policy.heading ||
          !policy.content ||
          policy.heading.trim() === "" ||
          policy.content.trim() === ""
        ) {
          invalidPrivacyPolicy.push(`PrivacyPolicy ${index + 1}`);
        }
      });
    }

    // Validate TermsData
    if (!templateDetails.TermsData || templateDetails.TermsData.length === 0) {
      invalidTermsData.push("TermsData");
    } else {
      templateDetails.TermsData.forEach((term, index) => {
        if (!term.title || term.title.trim() === "") {
          updateInvalidTermsDataIndex(index, "title");
        }
        if (!term.content || term.content.trim() === "") {
          updateInvalidTermsDataIndex(index, "content");
        }
        if (
          !term.title ||
          !term.content ||
          term.title.trim() === "" ||
          term.content.trim() === ""
        ) {
          invalidTermsData.push(`TermsData ${index + 1}`);
        }
      });
    }

    // Validate Refund
    if (!templateDetails.Refund || templateDetails.Refund.length === 0) {
      invalidRefund.push("Refund");
    } else {
      templateDetails.Refund.forEach((refund, index) => {
        if (!refund.heading || refund.heading.trim() === "") {
          updateInvalidRefundIndex(index, "heading");
        }
        if (!refund.content || refund.content.trim() === "") {
          updateInvalidRefundIndex(index, "content");
        }
        if (
          !refund.heading ||
          !refund.content ||
          refund.heading.trim() === "" ||
          refund.content.trim() === ""
        ) {
          invalidRefund.push(`Refund ${index + 1}`);
        }
      });
    }
    const invalidFields = [];

    // Validate YouTube Link
    if (
      templateDetails.YTLink &&
      !(() => {
        try {
          new URL(templateDetails.YTLink);
          return true;
        } catch (_) {
          return false;
        }
      })()
    ) {
      invalidFields.push("YouTube Link is not a valid URL.");
    }

    // Validate Query Phone Number
    if (
      templateDetails.Query_PhoneNumber &&
      !/^[0-9]{10}$/.test(templateDetails.Query_PhoneNumber)
    ) {
      invalidFields.push("Query Phone Number is not a valid format.");
    }

    // Validate Query Email ID
    if (
      templateDetails.Query_EmailId &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(templateDetails.Query_EmailId)
    ) {
      invalidFields.push("Query Email ID is not a valid email.");
    }

    // Validate Facebook URL
    if (
      templateDetails.Facebook &&
      !(() => {
        try {
          new URL(templateDetails.Facebook);
          return true;
        } catch (_) {
          return false;
        }
      })()
    ) {
      invalidFields.push("Facebook URL is not a valid URL.");
    }

    // Validate Instagram URL
    if (
      templateDetails.Instagram &&
      !(() => {
        try {
          new URL(templateDetails.Instagram);
          return true;
        } catch (_) {
          return false;
        }
      })()
    ) {
      invalidFields.push("Instagram URL is not a valid URL.");
    }
    // Combine all validation errors
    const missingFields = requiredFields
      .filter((field) => !field.value || field.value.trim() === "")
      .map((field) => field.name);

    if (
      missingFields.length > 0 ||
      missingHeadings.length > 0 ||
      emptyItems.length > 0 ||
      emptyClassTypes.length > 0 ||
      invalidTestimonials.length > 0 ||
      invalidSubscriptions.length > 0 ||
      invalidFaqs.length > 0 ||
      invalidAboutUs.length > 0 ||
      invalidPrivacyPolicy.length > 0 ||
      invalidTermsData.length > 0 ||
      invalidRefund.length > 0 ||
      invalidInstructors.length > 0 ||
      invalidFields.length > 0 ||
      serviceErrors.length > 0
    ) {
      let alertMessage = "";

      if (missingFields.length > 0) {
        alertMessage += `The following fields are required and cannot be empty: ${missingFields.join(
          ", "
        )}.\n`;
        alert(alertMessage);
        scrollToError(missingFields[0]);
        return;
      }
      if (invalidFields.length > 0) {
        alertMessage += `The following fields have issues: ${invalidFields.join(
          ", "
        )}.\n`;
        alert(alertMessage);
        scrollToError(invalidFields[0]);
        return;
      }
      if (missingHeadings.length > 0) {
        alertMessage += `The following service titles are missing: ${missingHeadings.join(
          ", "
        )}.\n`;
        alert(alertMessage);
        scrollToError(missingHeadings[0]);
        return;
      }
      if (serviceErrors.length > 0) {
        alertMessage += `The following services have issues: ${serviceErrors.join(
          ", "
        )}.\n`;
        alert(alertMessage);
        scrollToErrorServices(serviceErrors[0], "services");
        return;
      }

      if (emptyItems.length > 0) {
        alertMessage += `The following services have no non-empty items: ${emptyItems.join(
          ", "
        )}.\n`;
        alert(alertMessage);
        scrollToError(emptyItems[0]);
        return;
      }
      if (emptyClassTypes.length > 0) {
        alertMessage += `ClassTypes must contain at least one non-empty item.\n`;
        alert(alertMessage);
        scrollToError(emptyClassTypes[0]);
        return;
      }
      if (invalidTestimonials.length > 0) {
        alertMessage += `The following testimonials are invalid (missing img, name, or description): ${invalidTestimonials.join(
          ", "
        )}.\n`;
        alert(alertMessage);
        scrollToError("Testimonial");
        return;
      }
      if (invalidSubscriptions.length > 0) {
        alertMessage += `${invalidSubscriptions.join(", ")}.\n`;
        alert(alertMessage);
        scrollToError("Subscriptions");
        return;
      }
      if (invalidFaqs.length > 0) {
        alertMessage += `${invalidFaqs.join(", ")}.\n`;
        alert(alertMessage);
        scrollToError("FAQ");
        return;
      }
      if (invalidAboutUs.length > 0) {
        alertMessage += `The following AboutUs entries are invalid (missing title or content): ${invalidAboutUs.join(
          ", "
        )}.\n`;
        alert(alertMessage);
        scrollToError("AboutUs");
        return;
      }
      if (invalidPrivacyPolicy.length > 0) {
        alertMessage += `The following PrivacyPolicy entries are invalid (missing title or content): ${invalidPrivacyPolicy.join(
          ", "
        )}.\n`;
        alert(alertMessage);
        scrollToError("PrivacyPolicy");
        return;
      }
      if (invalidTermsData.length > 0) {
        alertMessage += `The following TermsData entries are invalid (missing title or content): ${invalidTermsData.join(
          ", "
        )}.\n`;
        alert(alertMessage);
        scrollToError("TermsData");
        return;
      }
      if (invalidRefund.length > 0) {
        alertMessage += `The following Refund entries are invalid (missing title or content): ${invalidRefund.join(
          ", "
        )}.\n`;
        alert(alertMessage);
        scrollToError("Refund");
        return;
      }
      if (invalidInstructors.length > 0) {
        alertMessage += `The following instructors are invalid: ${invalidInstructors.join(
          ", "
        )}.\n`;
        alert(alertMessage);
        scrollToError("Instructors");
        return;
      }
      alert(alertMessage);
      // scrollToError("Instructors");
      return;
    }

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

        subscriptionDetails.forEach((subscription,index) => {
          const amountInPaisa = subscription.amount * 100;
          const normalizedClassTypes = selectedClassTypes[index]
          ?.filter(item => item.value.trim() !== "") // Exclude empty values
          .map(item => item.value) || [];
      

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
                  classType: normalizedClassTypes

                  
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
                  classType: normalizedClassTypes

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
            companyName: templateDetails.companyName,
            institutionType: templateDetails.institutionType,
            institutionFormat: templateDetails.institutionFormat,
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
            ServicesBg: templateDetails.ServicesBg || null,
            ServicesPortrait: templateDetails.ServicesPortrait || null,
            ClassTypes: templateDetails.ClassTypes,
          },
        }),

        API.put("clients", "/user/development-form/testimonial", {
          body: {
            institutionid: institutionNames,
            Testimonial: templateDetails.Testimonial,
            TestimonialBg: templateDetails.TestimonialBg || null,
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
            AboutUsBg: templateDetails.AboutUsBg || null,
            PrivacyPolicy: templateDetails.PrivacyPolicy,
          },
        }),
        API.put("clients", "/user/development-form/contact", {
          body: {
            institutionid: institutionNames,
            Query_Address: templateDetails.Query_Address,
            Query_PhoneNumber: '+' + templateDetails.countryCode + templateDetails.Query_PhoneNumber,
            userName: templateDetails.userName,
            Query_EmailId: templateDetails.Query_EmailId,
            Facebook: templateDetails.Facebook,
            Instagram: templateDetails.Instagram,
            YTLink: templateDetails.YTLink,
            UpiId: templateDetails.UpiId,
            country: templateDetails.country,
            Footer_Link_1: templateDetails.Footer_Link_1,
            Footer_Link_2: templateDetails.Footer_Link_2,
            InstructorBg: templateDetails.InstructorBg || null,
            SubscriptionBg: templateDetails.SubscriptionBg || null,
          },
        }),
      ]);

      alert("Changes saved successfully!");
      setTimeout(() => {
        util.setLoader(false);
      }, 0);
      if (templateDetails?.payment === true) {

        navigate("/dashboard");
      } else {

        const baseUrl =
          process.env.REACT_APP_STAGE === 'PROD'
            ? 'http://happyprancer.com'
            : 'http://beta.happyprancer.com';


        const url = `${baseUrl}/allpayment/awsaiapp/${UserCtx.userData.cognitoId}/${UserCtx.userData.emailId}/${templateDetails.institutionId}`;


        window.open(url, "_blank");
      }
    } catch (error) {
      console.error("Error saving changes:", error);
      alert("Failed to save changes. Please try again.");
    }
    // util.setLoader(false);
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
  const removeInstructorByIndex = (index) => {
    setInstructorDetails((prev) => prev.filter((_, i) => i !== index));
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

  const removeSubscriptionByIndex = (index) => {
    const updatedSubscriptions = subscriptionDetails.filter(
      (_, i) => i !== index
    );
    setSubscriptionDetails(updatedSubscriptions);
  };
  const removeItem = (serviceIndex, itemIndex) => {
    const updatedServices = [...templateDetails.Services];
    updatedServices[serviceIndex].items.splice(itemIndex, 1);
    setTemplateDetails({ ...templateDetails, Services: updatedServices });
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
      {(Ctx.userData.userType === 'admin' && Ctx.userData.role === 'owner') || templateDetails.createdBy === Ctx.userData.cognitoId ?
        (
          <div className="">
            <div className="relative mt-20 p-4">
              <div
                onClick={goBack}
                className="fixed border border-black bg-white rounded cursor-pointer w-[26px] h-[20px] text-[20px] z-50"
              >
                <IoCaretBack />
              </div>
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
              <h1 className="font-bold text-black mt-8 lg:ml-12 md:ml-6 sm:ml-0">Hero Section</h1>
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
                        helperText="It's not changeble"
                        // onChange={(event) => handleChange(event, "institutionid")}
                        style={{
                          borderColor: "#D1D5DB",
                          backgroundColor: "#F9FAFB",
                          borderRadius: "8px",
                        }}
                      />
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
                        helperText="It’s the Head Tag line of Home Page"
                        sizing="sm"
                        onChange={(event) => handleChange(event, "TagLine")}
                        ref={refs.TagLine}
                        color={errors.TagLine ? "failure" : "gray"}
                        style={{
                          border: errors.TagLine
                            ? "1px solid red"
                            : "1px solid #ccc",
                          borderRadius: "8px",
                        }}
                      />
                    </div>

                    <div className="relative ">
                      <div className="mb-2 block">
                        <Label
                          htmlFor="Tag Line 2"
                          color="gray"
                          value="Tag Line 2"
                        />
                      </div>
                      <TextInput
                        id="Tag Line 2"
                        placeholder="Tag Line 2"
                        helperText="2nd Tag Line of the Home Section"
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
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:px-[250px] max1250:px-[150px]  max800:px-2  lg:mt-10 mt-4">
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
                          ref={refs.PrimaryColor}
                          color={errors.PrimaryColor ? "failure" : "gray"}
                          style={{
                            border: errors.PrimaryColor
                              ? "1px solid red"
                              : "1px solid #ccc",
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
                          ref={refs.LightPrimaryColor}
                          color={errors.LightPrimaryColor ? "failure" : "gray"}
                          style={{
                            border: errors.LightPrimaryColor
                              ? "1px solid red"
                              : "1px solid #ccc",
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
                          ref={refs.LightestPrimaryColor}
                          color={errors.LightestPrimaryColor ? "failure" : "gray"}
                          style={{
                            border: errors.LightestPrimaryColor
                              ? "1px solid red"
                              : "1px solid #ccc",
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
                          onChange={(event) =>
                            handleChange(event, "SecondaryColor")
                          }
                          onBlur={handleBlur}
                          className="text-field"
                          ref={refs.SecondaryColor}
                          color={errors.SecondaryColor ? "failure" : "gray"}
                          style={{
                            border: errors.SecondaryColor
                              ? "1px solid red"
                              : "1px solid #ccc",
                            borderRadius: "4px",
                          }}
                        />

                        <input
                          type="color"
                          value={templateDetails.SecondaryColor}
                          onChange={(event) =>
                            handleChange(event, "SecondaryColor")
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>


              <div className="lg:px-[170px] md:px-[80px] sm:px-6 lg:mt-10 mt-4  lg:ml-20">
                <div className="flex flex-col gap-4 ">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 md:gap-10 lg:gap-10 sm:gap-4">

                    <div className="relative mt-4 mr-16">
                      <div className="mb-2 block">
                        <Label
                          htmlFor="companyName"
                          color="gray"
                          value="companyName"
                        />
                        <span className="text-red-500 ml-1">*</span>
                      </div>
                      <TextInput
                        id="companyName"
                        placeholder="companyName"
                        required
                        value={templateDetails.companyName}
                        helperText="It’s the companyName"
                        sizing="sm"
                        onChange={(event) => handleChange(event, "companyName")}
                        ref={refs.companyName}
                        color={errors.companyName ? "failure" : "gray"}
                        style={{
                          border: errors.companyName
                            ? "1px solid red"
                            : "1px solid #ccc",
                          borderRadius: "8px",
                        }}
                      />
                    </div>


                    <div className="mt-4">
                      <label className="block text-gray-700 mb-2 font-bold">Select Institution Format</label>
                      <select
                        value={templateDetails.institutionFormat}
                        onChange={(event) =>
                          handleChange(event, "institutionFormat")
                        }
                        className="w-full max-w-md  border borounded-md p-2"
                        style={{
                          borderColor: "#D1D5DB",
                          backgroundColor: "#F9FAFB",
                          borderRadius: "8px",
                        }}
                      >
                        <option value="Online_Classes">Online Classes</option>
                        <option value="Inperson_Classes">In-person Classes</option>
                        <option value="Hybrid_Classes">Hybrid Classes</option>
                        {/* Add more options here as needed */}
                      </select>
                    </div>


                  </div>
                </div>
              </div>
              <div className="lg:px-[170px] md:px-[80px] sm:px-6 lg:mt-10 mt-4 lg:ml-20">
                <div className="flex flex-col gap-4 ">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 md:gap-10 lg:gap-10 sm:gap-4">
                    <div id="fileUpload" className="max-w-md relative">
                      <div className="mb-2 block">
                        <Label
                          htmlFor="Logo Upload file"
                          value="Logo Upload file"
                        />
                        <span className="text-red-500 ml-1">*</span>
                      </div>
                      <FileInput
                        type="file"
                        onChange={(event) => handleFileChange(event, "logoUrl")}
                        id="Logo Upload file"
                        helperText="It’s The Logo of the Company"
                        ref={refs.logoUrl}
                        style={{
                          borderColor: errors.logoUrl ? "1px solid red" : "#D1D5DB",
                          backgroundColor: errors.logoUrl ? "#ee3232" : "#F9FAFB",
                          borderRadius: "8px",
                        }}
                      />
                      {templateDetails.logoUrl && templateDetails.logoUrl.trim() !== "" && (
                        <button
                          onClick={() => downloadImage(templateDetails.logoUrl)}
                          className="absolute bottom-0 right-0 mb-[5px] mr-2 px-4 py-1 rounded text-black text-[10px] font-bold border border-black"
                          style={{
                            borderRadius: "4px",
                          }}
                        >
                          View
                        </button>
                      )}
                    </div>

                    <div id="fileUpload" className="max-w-md relative">
                      <div className="mb-2 block">
                        <Label
                          htmlFor="Intro Video Upload file"
                          value="Intro Video Upload file"
                        />
                        <span className="text-red-500 ml-1">*</span>
                      </div>

                      <FileInput
                        type="file"
                        onChange={handleVideoChange}
                        id="Intro Video Upload file"
                        helperText="It’s The Intro video of home Page"
                        ref={refs.videoUrl}
                        style={{
                          borderColor: errors.videoUrl
                            ? "1px solid red"
                            : "#D1D5DB",
                          backgroundColor: errors.videoUrl ? "#ee3232" : "#F9FAFB",
                          borderRadius: "8px",
                        }}
                      />
                      {templateDetails.videoUrl && templateDetails.videoUrl.trim() !== "" && (
                        <button
                          onClick={() => downloadImage(templateDetails.videoUrl)}
                          className="absolute bottom-0 right-0 mb-[5px] mr-2 px-4 py-1 rounded text-black text-[10px] font-bold border border-black"
                          style={{
                            borderRadius: "4px",
                          }}
                        >
                          View
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <hr className="w-full border-t border-[#D1D5DB] mt-10" />
            <div className="relative p-4">
              <h1 className="font-bold text-black mt-8 lg:ml-12 md:ml-6 sm:ml-0">Services Section</h1>
              <div className="lg:px-[170px] md:px-[80px] sm:px-6 lg:mt-10 mt-4  lg:ml-20">
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
                      {templateDetails.ServicesBg && templateDetails.ServicesBg.trim() !== "" && (
                        <button
                          onClick={() => downloadImage(templateDetails.ServicesBg)}
                          className="absolute bottom-0 right-0 mb-[5px] mr-2 px-4 py-1 rounded text-black text-[10px] font-bold border border-black"
                          style={{
                            borderRadius: "4px",
                          }}
                        >
                          View
                        </button>
                      )}
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
                        onChange={(event) =>
                          handleFileChange5(event, "ServicesPortrait")
                        }
                        id="ServicesPortrait"
                        helperText="It’s The Services Portrait "
                        style={{
                          borderColor: "#D1D5DB",
                          backgroundColor: "#F9FAFB",
                          borderRadius: "8px",
                        }}
                      />
                      {templateDetails.ServicesPortrait && templateDetails.ServicesPortrait.trim() !== "" && (
                        <button
                          onClick={() =>
                            downloadImage(templateDetails.ServicesPortrait)
                          }
                          className="absolute bottom-0 right-0 mb-[5px] mr-2 px-4 py-1 rounded text-black text-[10px] font-bold border border-black"
                          style={{
                            borderRadius: "4px",
                          }}
                        >
                          View
                        </button>
                      )}
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
                      id={`service-${index}`}
                    >
                      <div className="flex items-center justify-start gap-1">
                        <h2 className="text-[18px] font-bold">
                          Service {index + 1}
                        </h2>
                        <span className="text-red-500 mb-4">*</span>
                      </div>

                      <FloatingLabel
                        variant="filled"
                        label="Title"
                        style={{
                          borderColor: "#D1D5DB",
                          backgroundColor: invalidServices.some(t => t.serviceIndex === index && t.field === "title") ? "#FEE2E2" : "#F9FAFB",
                          width: "100%",
                        }}
                        inputStyle={{ width: "100%" }}
                        value={service.title}
                        onChange={(e) => handleServiceTitleChange(e, index)}
                      />

                      {service.items && service.items.length > 0 && (
                        <div className="mt-4">
                          {service.items.map((item, itemIndex) => (
                            <div key={itemIndex} className="relative mt-2">
                              <FloatingLabel
                                variant="filled"
                                label={`Item ${itemIndex + 1}`}
                                style={{
                                  width: "100%",
                                  borderColor: "#D1D5DB",
                                  backgroundColor: invalidServices.some(t => t.serviceIndex === index && t.field === "items" && t.itemIndex === itemIndex) ? "#FEE2E2" : "#F9FAFB",

                                }}
                                inputStyle={{ width: "100%" }}
                                value={item}
                                onChange={(e) =>
                                  handleItemChange(e, index, itemIndex)
                                }
                              />
                              {service.items.length > 1 && (
                                <button
                                  onClick={() => removeItem(index, itemIndex)}
                                  className="absolute right-2 top-3 rounded-full  text-[#959595] px-1 py-0.5 text-[14px]"
                                >
                                  <RxCross2 />
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {service.items && service.items.length < 4 && (
                        <div className="flex justify-center mt-4">
                          <button
                            onClick={() => addItem(index)}
                            className="text-[30px]"
                          >
                            <MdOutlineAddCircle />
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
              <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 lg:mt-10 "
                ref={refs.ClassTypes}
              >
                {templateDetails.ClassTypes &&
                  templateDetails.ClassTypes.length > 0 && (
                    <>
                      {templateDetails.ClassTypes.map((ClassType, index) => (
                        <div key={index} className="relative px-2 lg:px-[80px]">
                          <div className="flex flex-col items-start">
                            <Label
                              htmlFor={`ClassType-${index}`}
                              color="gray"
                              value={`Class Type ${index + 1}`}
                            />
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
                                  <>It’s the Dance Type of the Company Provides</>
                                }
                                style={{
                                  borderColor: "#D1D5DB",
                                  backgroundColor: invalidClassTypes.some(
                                    t => t.index === index && t.field === "ClassType"
                                  )
                                    ? "#FEE2E2"
                                    : "#F9FAFB",
                                  borderRadius: "8px",
                                }}
                                className="w-full"
                              />
                              {templateDetails.ClassTypes.length > 1 && (
                                <button
                                  onClick={() => removeClassType(index)}
                                  className="absolute right-2 top-3 rounded-full  text-[#959595] px-1 py-0.5 text-[14px]"
                                >
                                  <RxCross2 />
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
              </div>
              <div className="col-span-1 flex items-center justify-center">
                {templateDetails && templateDetails.ClassTypes && templateDetails.ClassTypes.length < 6 && (
                  <button onClick={addClassType} className="text-[30px]">
                    <MdOutlineAddCircle />
                  </button>
                )}
              </div>
            </div>

            <hr className="w-full border-t border-[#D1D5DB] mt-10" />
            <div className="relative p-4">
              <h1 className="font-bold text-black mt-8 lg:ml-12 md:ml-6 sm:ml-0">Testimonial Section</h1>
              <div className="lg:px-[170px] md:px-[110px] sm:px-6 lg:mt-10 mt-4 ">
                <div className="flex flex-col gap-4 ">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 md:gap-10 lg:gap-10 sm:gap-4">
                    <div id="fileUpload" className="max-w-md relative">
                      <div className="mb-2 block">
                        <Label htmlFor="TestimonialBg" value="TestimonialBg" />
                      </div>
                      <FileInput
                        type="file"
                        onChange={(event) =>
                          handleFileChange5(event, "TestimonialBg")
                        }
                        id="TestimonialBg"
                        helperText="It’s The Services Background of the Testimonial"
                        style={{
                          borderColor: "#D1D5DB",
                          backgroundColor: "#F9FAFB",
                          borderRadius: "8px",
                        }}
                      />
                      {templateDetails.TestimonialBg && templateDetails.TestimonialBg.trim() !== "" && (
                        <button
                          onClick={() => downloadImage(templateDetails.TestimonialBg)}
                          className="absolute bottom-0 right-0 mb-[5px] mr-2 px-4 py-1 rounded text-black text-[10px] font-bold border border-black"
                          style={{
                            borderRadius: "4px",
                          }}
                        >
                          View
                        </button>
                      )}
                    </div>
                  </div>
                  {templateDetails.Testimonial &&
                    templateDetails.Testimonial.length > 0 && (
                      <div
                        className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 lg:mt-10"
                        ref={refs.Testimonial}
                      >
                        {templateDetails.Testimonial.map((testimonial, index) => (
                          <div
                            key={index}
                            className={`px-2 lg:px-[70px] `}
                          //    ${
                          //   index === 2
                          //     ? "col-span-1 md:col-span-2  lg:px-[340px] max1320:px-[200px] max1078:px-[0px]"
                          //     : ""
                          // }
                          >
                            <div className="flex items-center justify-start gap-1">
                              <h2 className="text-[18px] font-bold">
                                Testimonial {index + 1}
                              </h2>
                              <span className="text-red-500 mb-4">*</span>
                            </div>

                            <FloatingLabel
                              variant="filled"
                              label="Name"
                              style={{
                                width: "100%",
                                borderColor: "#D1D5DB",
                                backgroundColor: invalidTestimonialIndex.some(
                                  t => t.index === index && t.field === "name"
                                )
                                  ? "#FEE2E2"
                                  : "#F9FAFB",
                              }}
                              inputStyle={{ width: "100%" }}
                              value={testimonial.name}
                              onChange={(event) =>
                                handleTestimonialChange(event, index, "name")
                              }
                            />

                            <FloatingLabel
                              variant="filled"
                              label="Feedback"
                              style={{
                                width: "100%",
                                borderColor: "#D1D5DB",
                                backgroundColor: invalidTestimonialIndex.some(
                                  t => t.index === index && t.field === "description"
                                )
                                  ? "#FEE2E2"
                                  : "#F9FAFB",
                              }}
                              inputStyle={{ width: "100%" }}
                              value={testimonial.description}
                              onChange={(event) =>
                                handleTestimonialChange(event, index, "description")
                              }
                            />

                            <div className="relative mt-4">
                              <FileInput
                                type="file"
                                onChange={(event) =>
                                  handleFileChange1(event, index)
                                }
                                id={`TestimonialImg-${index}`}
                                helperText="Upload the Testimonial Image"
                                style={{
                                  borderColor: "#D1D5DB",
                                  backgroundColor: invalidTestimonialIndex.some(
                                    t => t.index === index && t.field === "img"
                                  )
                                    ? "#FEE2E2"
                                    : "#F9FAFB",
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
            <div className="relative p-4">
              <h1 className="font-bold text-black mt-8 lg:ml-12 md:ml-6 sm:ml-0">Subscription Section</h1>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 md:gap-10 lg:gap-10 sm:gap-4 lg:ml-12 md:ml-6 sm:ml-0">
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
                  {templateDetails.SubscriptionBg && templateDetails.SubscriptionBg.trim() !== "" && (
                    <button
                      onClick={() => downloadImage(templateDetails.SubscriptionBg)}
                      className="absolute bottom-0 right-0 mb-[5px] mr-2 px-4 py-1 rounded text-black text-[10px] font-bold border border-black"
                      style={{
                        borderRadius: "4px",
                      }}
                    >
                      View
                    </button>
                  )}
                </div>
              </div>

              {subscriptionDetails && subscriptionDetails.length > 0 && (
                <div
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 lg:mt-10"
                  ref={refs.Subscriptions}
                >
                  {subscriptionDetails.map((subscription, index) => (
                    <div key={index} className="px-2 lg:px-[170px]">
                      <div className="flex justify-between items-center ">
                        <h2 className="text-[18px] font-bold mb-2">
                          Subscription {index + 1}
                        </h2>
                        {subscriptionDetails.length > 1 &&
                          (!subscription.productId ||
                            subscriptionDetails.filter((sub) => sub.productId)
                              .length > 1) && (
                            <button
                              onClick={() => {
                                if (subscription.productId) {
                                  removeSubscription(subscription.productId);
                                } else {
                                  removeSubscriptionByIndex(index);
                                }
                              }}
                              className="rounded-full  font-bold text-black text-[18px] "
                            >
                              <RxCross2 />
                            </button>
                          )}
                      </div>
                      <FloatingLabel
                        variant="filled"
                        label="Heading"
                        style={{
                          width: "100%",
                          borderColor: "#D1D5DB",
                          backgroundColor: invalidSubscriptionIndex.some(
                            t => t.subscriptionIndex === index && t.field === "heading"
                          )
                            ? "#FEE2E2"
                            : "#F9FAFB",

                        }}
                        inputStyle={{ width: "100%" }}

                        value={subscription.heading}
                        onChange={(e) => handleHeadingChange(e, index)}
                      />

                      {/* Duration */}
                      <div className="max-w-md mt-4">
                        <div className="mb-2 block">
                          <Label
                            htmlFor={`Duration-${index}`}
                            value="Select your Duration"
                          />
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
                      {/* classTypes */}
                      <div className="max-w-md mt-4">
                        <div className="mb-2 block">
                          <Label htmlFor={`classTypes-${index}`} value="Select Class Types" />
                        </div>
                        <MultiSelect
  options={classTypeOptions}
  value={selectedClassTypes[index] || []}
  onChange={(selected) => {
    console.log('Selected Class Types:', selected);  // This logs the selected options
    setSelectedClassTypes((prev) => {
      const updated = [...prev];
      updated[index] = selected; // Store the selected class types at the corresponding index
      return updated;
  });
  
  }}
  labelledBy="Select Class Types"
  className="w-full z-10"
  styles={{
    multiselectContainer: (provided) => ({
      ...provided,
      backgroundColor: "#fff", // White background
      opacity: 1, // Fully opaque
    }),
    searchBox: (provided) => ({
      ...provided,
      backgroundColor: "#fff", // White background for search box
    }),
    option: (provided) => ({
      ...provided,
      backgroundColor: "#fff", // White background for options
      color: "#000", // Black text
      ':hover': {
        backgroundColor: "#f3f3f3", // Light grey on hover
      },
    }),
    optionContainer: (provided) => ({
      ...provided,
      backgroundColor: "#fff", // White background for option container
    }),
  }}
/>

                      </div>

                      {/* Currency */}
                      <div className="max-w-md mt-4">
                        <div className="mb-2 block">
                          <Label
                            htmlFor={`Currency-${index}`}
                            value="Select your Currency"
                          />
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
                          className="z-0"
                          style={{
                            width: "100%",
                            borderColor: "#D1D5DB",
                            backgroundColor: invalidSubscriptionIndex.some(
                              t => t.subscriptionIndex === index && t.field === "amount"
                            )
                              ? "#FEE2E2"
                              : "#F9FAFB",
                          }}
                          type="Number"
                          inputStyle={{ width: "100%" }}
                          value={subscription.amount}
                          onChange={(e) => handleAmountChange(e, index)}
                        />
                      </div>
                      {/* Radio Buttons */}
                      <fieldset className="flex max-w-md flex-col gap-4 mt-4">
                        <legend className="mb-4">India</legend>
                        <div className="flex items-center gap-2">
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
                      </fieldset>

                      <h2 className="text-lg font-bold mt-4">Provides:</h2>
                      {subscription.provides.map((provide, idx) => (
                        <div key={idx} className="relative mt-2">
                          <FloatingLabel
                            variant="filled"
                            label={`Provide ${idx + 1}`}
                            style={{
                              width: "100%",
                              borderColor: "#D1D5DB",
                              backgroundColor: invalidSubscriptionIndex.some(
                                t => t.subscriptionIndex === index && t.field === "provides" && t.itemIndex === idx
                              )
                                ? "#FEE2E2"
                                : "#F9FAFB",
                            }}
                            inputStyle={{ width: "100%" }}
                            value={provide}
                            onChange={(e) => handleProvideChange(e, index, idx)}
                          />
                          {subscription.provides.length > 1 && (
                            <button
                              onClick={() => removeProvide(index, idx)}
                              className="absolute right-2 top-3 rounded-full text-[#959595] px-1 py-0.5 text-[14px]"
                            >
                              <RxCross2 />
                            </button>
                          )}
                        </div>
                      ))}

                      <div className="flex flex-col items-center mt-4">
                        {subscription.provides.length < 3 && (
                          <button
                            onClick={() => addProvides(index)}
                            className="text-[30px] py-2 px-4 "
                          >
                            <MdOutlineAddCircle />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="flex justify-center mt-4">
                {subscriptionDetails.length < 6 && (
                  <button
                    onClick={addSubscription}
                    className="text-[40px] py-2 px-4 "
                  >
                    <MdOutlineAddCircle />
                  </button>
                )}
              </div>
            </div>

            <hr className="w-full border-t border-[#D1D5DB] mt-10" />
            <div className="relative p-4">
              <h1 className="font-bold text-black mt-8 lg:ml-12 md:ml-6 sm:ml-0">Instructor Section</h1>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 md:gap-10 lg:gap-10 sm:gap-4 lg:ml-12 md:ml-6 sm:ml-0">
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
                  {templateDetails.InstructorBg && templateDetails.InstructorBg.trim() !== "" && (
                    <button
                      onClick={() => downloadImage(templateDetails.InstructorBg)}
                      className="absolute bottom-0 right-0 mb-[5px] mr-2 px-4 py-1 rounded text-black text-[10px] font-bold border border-black"
                      style={{
                        borderRadius: "4px",
                      }}
                    >
                      View
                    </button>
                  )}
                </div>
              </div>

              {instructorDetails && instructorDetails.length > 0 && (
                <div
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 lg:mt-10"
                  ref={refs.Instructors}
                >
                  {instructorDetails.map((instructor, index) => (
                    <div key={index} className="px-2 lg:px-[170px]">
                      <div className="flex justify-between items-center ">
                        <h2 className="text-[18px] font-bold mb-2">
                          Instructor {index + 1}
                        </h2>
                        {instructorDetails.length > 1 &&
                          (!instructor.instructorId ||
                            instructorDetails.filter((inst) => inst.instructorId)
                              .length > 1) && (
                            <button
                              onClick={() => {
                                if (instructor.instructorId) {
                                  removeInstructor(instructor.instructorId);
                                } else {
                                  removeInstructorByIndex(index);
                                }
                              }}
                              className="rounded-full  font-bold text-black text-[18px] "
                            >
                              <RxCross2 />
                            </button>
                          )}
                      </div>
                      <FloatingLabel
                        variant="filled"
                        label="Name"
                        style={{
                          width: "100%",
                          borderColor: "#D1D5DB",
                          backgroundColor: invalidInstructors.some(
                            t => t.index === index && t.field === "name"
                          )
                            ? "#FEE2E2"
                            : "#F9FAFB",
                        }}
                        inputStyle={{ width: "100%" }}
                        value={instructor.name}
                        onChange={(e) => handleInstructorChange(e, "name", index)}
                      />

                      <FloatingLabel
                        variant="filled"
                        label="Position"
                        style={{
                          width: "100%",
                          borderColor: "#D1D5DB",
                          backgroundColor: invalidInstructors.some(
                            t => t.index === index && t.field === "position"
                          )
                            ? "#FEE2E2"
                            : "#F9FAFB",
                        }}
                        inputStyle={{ width: "100%" }}
                        value={instructor.position}
                        onChange={(e) =>
                          handleInstructorChange(e, "position", index)
                        }
                      />

                      <FloatingLabel
                        variant="filled"
                        label="Email ID"
                        style={{
                          width: "100%",
                          borderColor: "#D1D5DB",
                          backgroundColor: invalidInstructors.some(
                            t => t.index === index && t.field === "emailId"
                          )
                            ? "#FEE2E2"
                            : "#F9FAFB",
                        }}
                        inputStyle={{ width: "100%" }}
                        value={instructor.emailId}
                        onChange={(e) =>
                          handleInstructorChange(e, "emailId", index)
                        }
                      />

                      <div className="relative mt-4">
                        <FileInput
                          type="file"
                          onChange={(e) => handleFileChange3(e, index)}
                          id={`InstructorImg-${index}`}
                          helperText="Upload the Instructor Image"
                          style={{
                            borderColor: "#D1D5DB",
                            backgroundColor: invalidInstructors.some(
                              t => t.index === index && t.field === "image"
                            )
                              ? "#FEE2E2"
                              : "#F9FAFB",
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
                <button onClick={addInstructor} className="text-[30px]">
                  <MdOutlineAddCircle />
                </button>
              </div>
            </div>
            <hr className="w-full border-t border-[#D1D5DB] mt-10" />
            <div className="relative p-4">
              <h1 className="font-bold text-black mt-8 lg:ml-12 md:ml-6 sm:ml-0">FAQ Section</h1>
              {templateDetails.FAQ && templateDetails.FAQ.length > 0 && (
                <div
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 lg:mt-10"
                  ref={refs.FAQ}
                >
                  {templateDetails.FAQ.map((faq, index) => (
                    <div key={index} className="px-2 lg:px-[170px]">
                      <div className="flex justify-between items-center ">
                        <h2 className="text-[18px] font-bold">FAQ {index + 1}</h2>
                        {templateDetails.FAQ.length > 1 && (
                          <button
                            onClick={() => removeFAQ(index)}
                            className="rounded-full font-bold text-black text-[18px]"
                          >
                            <RxCross2 />
                          </button>
                        )}
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
                            width: "100%",
                            borderColor: "#D1D5DB",
                            backgroundColor: invalidFaqs.some(
                              t => t.index === index && t.field === "title"
                            )
                              ? "#FEE2E2"
                              : "#F9FAFB",
                            borderRadius: "8px",
                          }}
                          inputStyle={{ width: "100%" }}
                          value={faq.title}
                          onChange={(e) =>
                            FaqInputChange(index, "title", e.target.value)
                          }
                        />
                      </div>

                      <div className="mt-4">
                        <div className="mb-2 block">
                          <Label htmlFor="Answer" value="Answer" />
                        </div>
                        <Textarea
                          variant="filled"
                          required
                          rows={4}
                          id="Answer"
                          placeholder="Answer..."
                          label="Answer"
                          style={{
                            width: "100%",
                            borderColor: "#D1D5DB",
                            backgroundColor: invalidFaqs.some(
                              t => t.index === index && t.field === "content"
                            )
                              ? "#FEE2E2"
                              : "#F9FAFB",
                            borderRadius: "8px",
                          }}
                          inputStyle={{ width: "100%" }}
                          value={faq.content}
                          onChange={(e) =>
                            FaqInputChange(index, "content", e.target.value)
                          }
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex justify-center mt-4">
                {templateDetails.FAQ && templateDetails.FAQ.length < 4 && (
                  <button onClick={addFAQ} className="text-[30px]">
                    <MdOutlineAddCircle />
                  </button>
                )}
              </div>
            </div>
            <hr className="w-full border-t border-[#D1D5DB] mt-10" />
            <div className="relative p-4">
              <h1 className="font-bold text-black mt-8 lg:ml-12 md:ml-6 sm:ml-0">Policy Section</h1>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 md:gap-10 lg:gap-10 sm:gap-4 lg:ml-12 md:ml-6 sm:ml-0">
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
                  {templateDetails.AboutUsBg && templateDetails.AboutUsBg.trim() !== "" && (
                    <button
                      onClick={() => downloadImage(templateDetails.AboutUsBg)}
                      className="absolute bottom-0 right-0 mb-[5px] mr-2 px-4 py-1 rounded text-black text-[10px] font-bold border border-black"
                      style={{
                        borderRadius: "4px",
                      }}
                    >
                      View
                    </button>
                  )}
                </div>
              </div>
              {templateDetails.AboutUs && templateDetails.AboutUs.length > 0 && (
                <div
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 lg:mt-10"
                  ref={refs.AboutUs}
                >
                  {templateDetails.AboutUs.map((item, index) => (
                    <div key={index} className="px-2 lg:px-[170px]">
                      <div className="flex justify-between items-center">
                        <h2 className="text-[18px] font-bold">
                          AboutUs {index + 1}
                        </h2>
                        {templateDetails.AboutUs &&
                          templateDetails.AboutUs.length > 1 && (
                            <button
                              onClick={() => removeAboutUsItem(index)}
                              className="rounded-full font-bold text-black text-[18px]"
                            >
                              <RxCross2 />
                            </button>
                          )}
                      </div>

                      <div className="mt-4">
                        <Label
                          htmlFor={`aboutUsHeading-${index}`}
                          value="Heading"
                        />
                        <TextInput
                          id={`aboutUsHeading-${index}`}
                          variant="filled"
                          label="Heading"
                          placeholder="Enter AboutUs Policy Heading"
                          style={{
                            width: "100%",
                            borderColor: "#D1D5DB",
                            backgroundColor: invalidAboutUs.some(
                              t => t.index === index && t.field === "heading"
                            )
                              ? "#FEE2E2"
                              : "#F9FAFB",
                            borderRadius: "8px",
                          }}
                          value={item.heading}
                          onChange={(e) => handleAboutUsChange(e, index, "heading")}
                        />
                      </div>

                      <div className="mt-4">
                        <Label
                          htmlFor={`aboutUsContent-${index}`}
                          value="Content"
                        />
                        <Textarea
                          id={`aboutUsContent-${index}`}
                          variant="filled"
                          label="Content"
                          placeholder="Enter AboutUs Content"
                          style={{
                            width: "100%",
                            borderColor: "#D1D5DB",
                            backgroundColor: invalidAboutUs.some(
                              t => t.index === index && t.field === "content"
                            )
                              ? "#FEE2E2"
                              : "#F9FAFB",
                            borderRadius: "8px",
                          }}
                          rows={4}
                          value={item.content}
                          onChange={(e) => handleAboutUsChange(e, index, "content")}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex justify-center mt-4">
                {templateDetails.AboutUs && templateDetails.AboutUs.length < 6 && (
                  <button
                    onClick={addAboutUsItem}
                    className="flex items-center text-[30px] bg-black px-2 rounded"
                  >
                    <MdOutlineAddCircle className="text-white" />
                    <h2 className="text-[18px] font-bold text-white mr-2 mt-2">
                      About Us
                    </h2>
                  </button>
                )}
              </div>
              {templateDetails.PrivacyPolicy &&
                templateDetails.PrivacyPolicy.length > 0 && (
                  <div
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 lg:mt-10"
                    ref={refs.PrivacyPolicy}
                  >
                    {templateDetails.PrivacyPolicy.map((item, index) => (
                      <div key={index} className="px-2 lg:px-[170px]">
                        <div className="flex justify-between items-center">
                          <h2 className="text-[18px] font-bold">
                            PrivacyPolicy {index + 1}
                          </h2>
                          {templateDetails.PrivacyPolicy &&
                            templateDetails.PrivacyPolicy.length > 1 && (
                              <button
                                onClick={() => removePrivacyPolicyItem(index)}
                                className="rounded-full font-bold text-black text-[18px]"
                              >
                                <RxCross2 />
                              </button>
                            )}
                        </div>

                        <div className="mt-4">
                          <Label
                            htmlFor={`privacyPolicyHeading-${index}`}
                            value="Heading"
                          />
                          <TextInput
                            id={`privacyPolicyHeading-${index}`}
                            variant="filled"
                            label="Heading"
                            placeholder="Enter PrivacyPolicy Heading"
                            style={{
                              width: "100%",
                              borderColor: "#D1D5DB",
                              backgroundColor: invalidPrivacyPolicy.some(
                                t => t.index === index && t.field === "heading"
                              )
                                ? "#FEE2E2"
                                : "#F9FAFB",
                              borderRadius: "8px",
                            }}
                            value={item.heading}
                            onChange={(e) =>
                              handlePrivacyPolicyChange(e, index, "heading")
                            }
                          />
                        </div>

                        <div className="mt-4">
                          <Label
                            htmlFor={`privacyPolicyContent-${index}`}
                            value="Content"
                          />
                          <Textarea
                            id={`privacyPolicyContent-${index}`}
                            variant="filled"
                            label="Content"
                            placeholder="Enter PrivacyPolicy Content"
                            style={{
                              width: "100%",
                              borderColor: "#D1D5DB",
                              backgroundColor: invalidPrivacyPolicy.some(
                                t => t.index === index && t.field === "content"
                              )
                                ? "#FEE2E2"
                                : "#F9FAFB",
                              borderRadius: "8px",
                            }}
                            rows={4}
                            value={item.content}
                            onChange={(e) =>
                              handlePrivacyPolicyChange(e, index, "content")
                            }
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

              <div className="flex justify-center mt-4">
                {templateDetails.PrivacyPolicy &&
                  templateDetails.PrivacyPolicy.length < 6 && (
                    <button
                      onClick={addPrivacyPolicyItem}
                      className="flex items-center text-[30px] bg-black px-2 rounded"
                    >
                      <MdOutlineAddCircle className="text-white" />
                      <h2 className="text-[18px] font-bold text-white mr-2 mt-2">
                        PrivacyPolicy
                      </h2>
                    </button>
                  )}
              </div>
              {templateDetails.Refund && templateDetails.Refund.length > 0 && (
                <div
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 lg:mt-10"
                  ref={refs.Refund}
                >
                  {templateDetails.Refund.map((item, index) => (
                    <div key={index} className="px-2 lg:px-[170px]">
                      <div className="flex justify-between items-center">
                        <h2 className="text-[18px] font-bold">
                          Refund Policy {index + 1}
                        </h2>
                        {templateDetails.Refund &&
                          templateDetails.Refund.length > 1 && (
                            <button
                              onClick={() => removeRefundItem(index)}
                              className="rounded-full font-bold text-black text-[18px]"
                            >
                              <RxCross2 />
                            </button>
                          )}
                      </div>

                      <div className="mt-4">
                        <Label htmlFor={`refundHeading-${index}`} value="Heading" />
                        <TextInput
                          id={`refundHeading-${index}`}
                          variant="filled"
                          label="Heading"
                          placeholder="Enter Refund Policy Heading"
                          style={{
                            width: "100%",
                            borderColor: "#D1D5DB",
                            backgroundColor: invalidRefund.some(
                              t => t.index === index && t.field === "heading"
                            )
                              ? "#FEE2E2"
                              : "#F9FAFB",
                            borderRadius: "8px",
                          }}
                          value={item.heading}
                          onChange={(e) => handleRefundChange(e, index, "heading")}
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
                            width: "100%",
                            borderColor: "#D1D5DB",
                            backgroundColor: invalidRefund.some(
                              t => t.index === index && t.field === "content"
                            )
                              ? "#FEE2E2"
                              : "#F9FAFB",
                            borderRadius: "8px",
                          }}
                          rows={4}
                          value={item.content}
                          onChange={(e) => handleRefundChange(e, index, "content")}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex justify-center mt-4">
                {templateDetails.Refund && templateDetails.Refund.length < 6 && (
                  <button
                    onClick={addRefundItem}
                    className="flex items-center text-[30px] bg-black px-2 rounded"
                  >
                    <MdOutlineAddCircle className="text-white" />
                    <h2 className="text-[18px] font-bold text-white mr-2 mt-2">
                      RefundPolicy
                    </h2>
                  </button>
                )}
              </div>
              {templateDetails.TermsData &&
                templateDetails.TermsData.length > 0 && (
                  <div
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 lg:mt-10"
                    ref={refs.TermsData}
                  >
                    {templateDetails.TermsData.map((item, index) => (
                      <div key={index} className="px-2 lg:px-[170px]">
                        <div className="flex justify-between items-center">
                          <h2 className="text-[18px] font-bold">
                            Terms And Data {index + 1}
                          </h2>
                          {templateDetails.TermsData &&
                            templateDetails.TermsData.length > 1 && (
                              <button
                                onClick={() => removeTermsDataItem(index)}
                                className="rounded-full font-bold text-black text-[18px]"
                              >
                                <RxCross2 />
                              </button>
                            )}
                        </div>

                        <div className="mt-4">
                          <Label
                            htmlFor={`termsDataTitle-${index}`}
                            value="Title"
                          />
                          <TextInput
                            id={`termsDataTitle-${index}`}
                            variant="filled"
                            label="Title"
                            placeholder="Enter Terms Data Title"
                            style={{
                              width: "100%",
                              borderColor: "#D1D5DB",
                              backgroundColor: invalidTermsData.some(
                                t => t.index === index && t.field === "title"
                              )
                                ? "#FEE2E2"
                                : "#F9FAFB",
                              borderRadius: "8px",
                            }}
                            value={item.title}
                            onChange={(e) =>
                              handleTermsDataChange(e, index, "title")
                            }
                          />
                        </div>

                        <div className="mt-4">
                          <Label
                            htmlFor={`termsDataContent-${index}`}
                            value="Content"
                          />
                          <Textarea
                            id={`termsDataContent-${index}`}
                            variant="filled"
                            label="Content"
                            placeholder="Enter Terms Data Content"
                            style={{
                              width: "100%",
                              borderColor: "#D1D5DB",
                              backgroundColor: invalidTermsData.some(
                                t => t.index === index && t.field === "content"
                              )
                                ? "#FEE2E2"
                                : "#F9FAFB",
                              borderRadius: "8px",
                            }}
                            rows={4}
                            value={item.content}
                            onChange={(e) =>
                              handleTermsDataChange(e, index, "content")
                            }
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

              <div className="flex justify-center mt-4">
                {templateDetails.TermsData &&
                  templateDetails.TermsData.length < 6 && (
                    <button
                      onClick={addTermsDataItem}
                      className="flex items-center text-[30px] bg-black px-2 rounded"
                    >
                      <MdOutlineAddCircle className="text-white" />
                      <h2 className="text-[18px] font-bold text-white mr-2 mt-2">
                        Terms&Data
                      </h2>
                    </button>
                  )}
              </div>
            </div>

            <hr className="w-full border-t border-[#D1D5DB] mt-10" />
            <div className="relative p-4">
              <h1 className="font-bold text-black mt-8 lg:ml-12 md:ml-6 sm:ml-0">Contact Section</h1>
              <div className="lg:px-[180px] md:px-[150px] sm:px-4">
                <div className="flex flex-col gap-4 ">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:gap-10 lg:gap-10 sm:gap-4">
                    <div className="relative">
                      <div className="mb-2 block">
                        <Label htmlFor="address" color="gray" value="Address" />
                        <span className="text-red-500 ml-1">*</span>
                      </div>
                      <TextInput
                        id="address"
                        placeholder="Enter your address"
                        ref={refs.Query_Address}
                        required
                        value={templateDetails.Query_Address}
                        onChange={(event) => handleChange(event, "Query_Address")}
                        sizing="sm"
                        color={errors.Query_Address ? "failure" : "gray"}
                        style={{
                          border: errors.Query_Address
                            ? "1px solid red"
                            : "1px solid #ccc",
                          borderRadius: "8px",
                        }}
                      />
                    </div>

                    <div className="relative">
                      <div className="mb-2 block">
                        <Label htmlFor="email" color="gray" value="Email Id" />
                        <span className="text-red-500 ml-1">*</span>
                      </div>
                      <TextInput
                        id="email"
                        placeholder="Enter your email id"
                        required
                        ref={refs.Query_EmailId}
                        value={templateDetails.Query_EmailId}
                        onChange={(event) => handleChange(event, "Query_EmailId")}
                        sizing="sm"
                        color={errors.Query_EmailId ? "failure" : "gray"}
                        style={{
                          border: errors.Query_EmailId
                            ? "1px solid red"
                            : "1px solid #ccc",
                          borderRadius: "8px",
                        }}
                      />
                    </div>

                    <div className="relative">
                      <div className="mb-2 block">
                        <Label htmlFor="phone" color="gray" value="Phone Number" />
                        <span className="text-red-500 ml-1">*</span>
                      </div>

                      <select
                        value={selectedCountryCode}
                        onChange={handleCountryChange1}
                        className="border w-[9rem] border-[#ccc] rounded-l px-2 py-1"
                      >
                        {/* Render country options */}
                        <Country />
                      </select>
                      <TextInput
                        id="phone"
                        placeholder="Enter your phone number"
                        required
                        ref={refs.Query_PhoneNumber}
                        value={templateDetails.Query_PhoneNumber}
                        onChange={(event) =>
                          handleChange(event, "Query_PhoneNumber")
                        }
                        sizing="sm"
                        color={errors.Query_PhoneNumber ? "failure" : "gray"}
                        style={{
                          border: errors.Query_PhoneNumber
                            ? "1px solid red"
                            : "1px solid #ccc",
                          borderRadius: "8px",
                        }}
                      />
                    </div>

                    <div className="relative">
                      <div className="mb-2 block">
                        <Label htmlFor="upi" color="gray" value="Upi Id" />
                      </div>
                      <TextInput
                        id="upi"
                        placeholder="Enter your UPI id"
                        value={templateDetails.UpiId}
                        onChange={(event) => handleChange(event, "UpiId")}
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
                        <Label htmlFor="youtube" color="gray" value="Youtube" />
                      </div>
                      <TextInput
                        id="youtube"
                        placeholder="Enter your Youtube channel"
                        required
                        value={templateDetails.YTLink}
                        onChange={(event) => handleChange(event, "YTLink")}
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
                        <Label htmlFor="facebook" color="gray" value="Facebook" />
                        <span className="text-red-500 ml-1">*</span>
                      </div>
                      <TextInput
                        id="facebook"
                        placeholder="Enter your Facebook profile"
                        ref={refs.Facebook}
                        value={templateDetails.Facebook}
                        onChange={(event) => handleChange(event, "Facebook")}
                        sizing="sm"
                        color={errors.Facebook ? "failure" : "gray"}
                        style={{
                          border: errors.Facebook
                            ? "1px solid red"
                            : "1px solid #ccc",
                          borderRadius: "8px",
                        }}
                      />
                    </div>

                    <div className="relative">
                      <div className="mb-2 block">
                        <Label htmlFor="instagram" color="gray" value="Instagram" />
                        <span className="text-red-500 ml-1">*</span>
                      </div>
                      <TextInput
                        id="instagram"
                        placeholder="Enter your Instagram handle"
                        ref={refs.Instagram}
                        value={templateDetails.Instagram}
                        onChange={(event) => handleChange(event, "Instagram")}
                        sizing="sm"
                        color={errors.Instagram ? "failure" : "gray"}
                        style={{
                          border: errors.Instagram
                            ? "1px solid red"
                            : "1px solid #ccc",
                          borderRadius: "8px",
                        }}
                      />
                    </div>
                    <div className="relative">
                      <div className="mb-2 block">
                        <Label htmlFor="userName" color="gray" value="OwnerName" />
                        <span className="text-red-500 ml-1">*</span>
                      </div>
                      <TextInput
                        id="instagram"
                        placeholder="Enter your OwnerName handle"
                        ref={refs.userName}
                        value={templateDetails.userName}
                        onChange={(event) => handleChange(event, "userName")}
                        sizing="sm"
                        color={errors.userName ? "failure" : "gray"}
                        style={{
                          border: errors.userName
                            ? "1px solid red"
                            : "1px solid #ccc",
                          borderRadius: "8px",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>{" "}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              className="px-[50px] mb-10"
            >
              <button
                onClick={goBack}
                className="bg-[#000000] text-[rgb(255,255,255)] font-bold py-2 px-4 rounded-xl shadow-lg"
              >
                Back
              </button>
              <button
                onClick={saveChanges}
                className="bg-[#3c919b] text-[#ffffff] font-bold py-2 px-4 rounded-xl shadow-lg"
              >
                Save
              </button>{" "}
            </div>
          </div>
        ) : null}
    </>
  );
};

export default New_Full;
