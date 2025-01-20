import React, { useContext, useState, useEffect, useRef } from "react";
import { API } from "aws-amplify";
import Context from "../../../context/Context";
// import EditImage from "../../../utils/Assets/Dashboard/images/PNG/Edit.png";
import { FiSearch } from "react-icons/fi";
import { FaFileExport, FaFileImport } from "react-icons/fa";
import { Button, Checkbox, Pagination, Table } from "flowbite-react";
// import PhoneImg from "../../../utils/Assets/Dashboard/images/PNG/smartphone.png";
// import TabletImg from "../../../utils/Assets/Dashboard/images/PNG/Tablet.png";
// import LaptopImg from "../../../utils/Assets/Dashboard/images/PNG/laptop.png";
// import Swal from "sweetalert2";
import "./LeadsList.css";
// import { useLocation } from "react-router-dom";
import { CSVUpload } from "../../UploadFile/CSVUpload";
import EditLead from "./EditLead";

const LeadsList = ({ institution: tempInstitution }) => {
  const { util, user, userData } = useContext(Context);
  // const location = useLocation()
  // const searchParams = new URLSearchParams(window.location.search);
  let institution;
  if (user.profile.tempinstitutionName === "awsaiapp") {
    institution = userData.tempinstitutionName;
  } else {
    institution = userData.tempinstitutionName || tempInstitution;
  }
  const itemsPerPage = 7;
  const [leadsData, setLeadsData] = useState([]);
  const [selectedRow, setSelectedRow] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  // const membersPerPage = 7;
  // const [name, setName] = useState("");
  // const [emailId, setEmailId] = useState("");
  // const [emailId2, setEmailId2] = useState("");
  // const [phoneNumber, setPhoneNumber] = useState("");
  // const [phoneNumber2, setPhoneNumber2] = useState("");
  // const [age, setAge] = useState("");
  // const [device, setDevice] = useState([]);
  // const [date, setdate] = useState("");
  const [isEditUser, setIsEditUser] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  // const [isUserAdd, setIsUserAdd] = useState(false);
  // const [userCheck, setUserCheck] = useState(0);
  const [templateSubject, setTemplateSubject] = useState("");
  const [templateContent, setTemplateContent] = useState("");
  const [sendmail, setSendmail] = useState(false);
  const [editTemplate, setEditTemplate] = useState(false);
  const [filteredEmails, setFilteredEmails] = useState([]);
  const [templateData, setTemplateData] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [templateName, setTemplateName] = useState("");
  const newName = `${institution}_${templateName}`;
  const [templateDetails, setTemplateDetails] = useState({});
  const [addNewValue, setAddNewValue] = useState(false);
  // const [category, setCategory] = useState("Gold");
  // const [additionalInfoTitle, setAdditionalInfoTitle] = useState("");
  // const [additionalInfo, setAdditionalInfo] = useState("");
  // const [isAddingMoreInfo, setIsAddingMoreInfo] = useState(false);

  const [isAllSelected, setisAllSelected] =
    useState(false); /*to check wheather all the leads data is selected or not*/
  // const [additionalInfoArray, setAdditionalInfoArray] = useState([
  //   { title: "", info: "" },
  // ]);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  // const [selectedDevices, setSelectedDevices] = useState({
  //   SmartPhone: false,
  //   Tablet: false,
  //   Laptop: false,
  // });
  const [id, setId] = useState("");

  const customTheme = {
    pages: {
      base: "xs:mt-0 mt-2 inline-flex items-center -space-x-px",
      showIcon: "inline-flex",
      previous: {
        base: "ml-0 rounded-l-md border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-[#30afbc] hover:text-white dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 hover:dark:bg-[#30afbc] hover:dark:text-white",
        icon: "h-5 w-5 text-gray-500 hover:text-white",
      },
      next: {
        base: "rounded-r-md border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-[#30afbc] hover:text-white dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 hover:dark:bg-[#30afbc] hover:dark:text-white",
        icon: "h-5 w-5 text-gray-500 hover:text-white",
      },
      selector: {
        base: "w-12 border border-gray-300 bg-white py-2 leading-tight text-gray-500 hover:bg-[#30afbc] hover:text-white dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 hover:dark:bg-[#30afbc] hover:dark:text-white",
        active: "bg-[#30afbc] text-white hover:bg-[#30afbc] hover:text-white",
        disabled: "cursor-not-allowed opacity-50",
      },
    },
  };

  const handleCheckboxChange = (lead) => {
    setSelectedRow((prevSelectedRows) => {
      if (
        prevSelectedRows.some(
          (selectedLead) => selectedLead.emailId === lead.emailId
        )
      ) {
        return prevSelectedRows.filter(
          (selectedLead) => selectedLead.emailId !== lead.emailId
        );
      } else {
        return [...prevSelectedRows, lead];
      }
    });
  };

  const handleSelectAll = (leadsData) => {
    if (isAllSelected) {
      setSelectedRow([]);
    } else {
      setSelectedRow(leadsData);
    }
    setisAllSelected(!isAllSelected);
  };

  const sendMail = (dataForMail) => {
    if (dataForMail.length !== 0) {
      setSendmail(true);
      const emails =
        dataForMail
          .filter((item) => item.institution === institution)
          .map((item) => item.emailId) || [];
      setFilteredEmails(emails);
    } else {
      return alert("Please select leads");
    }
  };

  useEffect(() => {
    setFilteredLeads(
      filterLeadsByNameEmailIdPhoneNumber(leadsData, searchInput)
    );
  }, [leadsData, searchInput]);

  const filterLeadsByNameEmailIdPhoneNumber = (leads, query) => {
    const normalizedQuery = query.toLowerCase();
    return leads.filter(
      (lead) =>
        lead.name.toLowerCase().includes(normalizedQuery) ||
        lead.emailId.toLowerCase().includes(normalizedQuery) ||
        lead.phoneNumber.includes(normalizedQuery)
    );
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const fetchLeads = async (institution) => {
    try {
      const response = await API.get(
        "clients",
        `/user/get-leads/${institution}`
      );
      setLeadsData(response.Items);
    } catch (error) {
      console.error("Error fetching leads:", error);
      console.error("Error details:", error.response);
    } finally {
      util.setLoader(false);
    }
  };

  const handleNameOfTemplate = (event) => {
    setTemplateName(event.target.value);
  };

  const handleSubjectOfTemplate = (event) => {
    setTemplateSubject(event.target.value);
  };

  const handleRadioChange = (data) => {
    setSelectedTemplate(data);
  };

  const handleClosePopup = () => {
    setAddNewValue(false);
  };

  const handleCloseTemplateUpdate = () => {
    setEditTemplate(false);
  };

  const handleCloseMember = () => {
    setSendmail(false);
  };
  const addTemplate = () => {
    setAddNewValue(true);
  };

  const handleTemplateOnChange = (event) => {
    setTemplateContent(event.target.value);
  };

  const fetchTemplates = async (institution) => {
    util.setLoader(true);
    try {
      const response = await API.get(
        "clients",
        `/user/get-ses-templates/${institution}?action=list`
      );
      setTemplateData(response || []);
    } catch (error) {
      console.error("Error fetching templates:", error);
      // Handle error appropriately
    } finally {
      util.setLoader(false);
    }
  };

  useEffect(() => {
    if (institution) {
      fetchTemplates(institution);
    }
    // eslint-disable-next-line
  }, [institution]);

  const fetchTemplatesDetails = async (institution, template) => {
    try {
      const response = await API.get(
        "clients",
        `/user/get-ses-templates/${institution}?action=get&templateName=${template}`
      );
      setTemplateDetails(response || {});
    } catch (error) {
      console.error("Error fetching templates:", error);
      // Handle error appropriately
    } finally {
      util.setLoader(false);
    }
  };

  const handleEditTemplate = (data) => {
    setEditTemplate(true);
    fetchTemplatesDetails(institution, data);
  };

  const htmlToPlainText = (html) => {
    // Create a new DOM element to parse the HTML
    const tempElement = document.createElement("div");
    tempElement.innerHTML = html;

    // Use textContent to get the plain text without HTML tags
    return tempElement.textContent || tempElement.innerText || "";
  };

  const convertTextToHtml = (text) => {
    // Replace newlines with <br> tags, and wrap the text in <p> tags
    return text
      .split("\n")
      .map((line) => `<p>${line}</p>`)
      .join("");
  };

  const handleUpdatedSubjectOfTemplate = (e) => {
    setTemplateDetails((prevDetails) => ({
      ...prevDetails,
      SubjectPart: e.target.value, // Update the SubjectPart as the user types
    }));
  };

  const handleUpdatedTemplateOnChange = (e) => {
    setTemplateDetails((prevDetails) => ({
      ...prevDetails,
      HtmlPart: e.target.value, // Use the value from the textarea
    }));
  };

  const handleSendMail = async () => {
    if (selectedTemplate) {
      const payload = {
        emailIds: filteredEmails,
        templateName: selectedTemplate,
      };

      try {
        const response = await API.post(
          "clients",
          `/user/send-emails-to-leads/${institution}`,
          {
            body: payload,
          }
        );
        console.log("Response:", response);
        alert("Email sent successfully!");
      } catch (error) {
        console.error("Error sending emails:", error);
        alert("Error sending emails. Please try again later.");
      }
    } else {
      alert("Please select a tempalte");
    }
  };

  const handleDoneClick = async () => {
    const htmlContent = convertTextToHtml(templateContent);
    const dataToCreate = {
      TemplateName: newName,
      SubjectPart: templateSubject,
      HtmlPart: htmlContent,
      TextPart: "",
    };

    try {
      const response = await API.post(
        "clients",
        `/user/create-ses-template/${institution}`,
        {
          body: dataToCreate,
        }
      );
      console.log("Response:", response);
      alert("Email added successfully!");
    } catch (error) {
      console.error("Error sending emails:", error);
      alert("Error creating tempalte. Please try again later.");
    }
    handleClosePopup();
  };

  useEffect(() => {
    fetchLeads(institution);
    // eslint-disable-next-line
  }, [institution]);

  const handleUpdateClick = async (tempalteDataForUpdate) => {
    const updateContent = convertTextToHtml(tempalteDataForUpdate.HtmlPart);
    const dataToUpdate = {
      TemplateName: tempalteDataForUpdate.TemplateName,
      SubjectPart: tempalteDataForUpdate.SubjectPart,
      HtmlPart: updateContent,
      TextPart: "",
    };

    try {
      const response = await API.post(
        "clients",
        `/user/create-ses-template/${institution}`,
        {
          body: dataToUpdate,
        }
      );
      console.log("Response:", response);
      alert("Email Updated successfully!");
    } catch (error) {
      console.error("Error updataing templates:", error);
      alert("Error updating tempaltes. Please try again later.");
    }
    handleCloseTemplateUpdate();
  };

  // const handleAddLeads = async (e) => {
  //   e.preventDefault();
  //   if (!name || !emailId || !phoneNumber || !date) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Validation Error",
  //       text: "Name, Email, Date, Phone Number are mandatory fields.",
  //     });
  //     return;
  //   }
  //   const apiName = "clients";
  //   const path = "/user/create-Leads";
  //   const myInit = {
  //     body: {
  //       institution: institution,
  //       name: name,
  //       emailId: emailId,
  //       emailId2: emailId2,
  //       phoneNumber: phoneNumber,
  //       phoneNumber2: phoneNumber2,
  //       age: age,
  //       device: device,
  //       date: new Date(date).getTime(),
  //       other: {},
  //       type: "lead",
  //     },
  //   };
  //   // Include additionalInfoTitle and additionalInfo if available
  //   if (additionalInfoArray.length > 0) {
  //     additionalInfoArray.forEach((info) => {
  //       if (info.title && info.info) {
  //         myInit.body.other[info.title] = info.info;
  //       }
  //     });
  //   }
  //   try {
  //     const create = await API.post(apiName, path, myInit);
  //     console.log(create);
  //     setLeadsData((prevLeadsData) => [...prevLeadsData, myInit.body]);
  //     Swal.fire({
  //       icon: "success",
  //       title: "User Added",
  //     });
  //     setIsUserAdd(false);
  //     setName("");
  //     setEmailId("");
  //     setPhoneNumber("");
  //     util.setLoader(false);
  //   } catch (e) {
  //     console.log(e);
  //     Swal.fire({
  //       icon: "error",
  //       title: "Error",
  //       text: "An error occurred while creating the user.",
  //     });
  //     util.setLoader(false);
  //   } finally {
  //     setSelectedDevices({
  //       SmartPhone: false,
  //       Tablet: false,
  //       Laptop: false,
  //     });
  //   }
  // };

  const censorEmail = (email) => {
    const [name, domain] = email.split("@");
    const censoredName = name.slice(0, 3) + "xxxxxx";
    return `${censoredName}@${domain}`;
  };

  // Utility function to censor phone number
  const censorPhoneNumber = (phone) => {
    if (!phone) return "Phone Number Not Available";

    // Identify the length of the country code (usually 1-3 digits)
    const countryCodeMatch = phone.match(/^\d{1,3}/);
    if (!countryCodeMatch) return "Invalid Phone Number";

    const countryCode = countryCodeMatch[0];
    const numberWithoutCountryCode = phone.slice(countryCode.length);

    if (numberWithoutCountryCode.length < 3) {
      return "Invalid Phone Number";
    }

    const visibleStart = numberWithoutCountryCode.slice(0, 2);
    const visibleEnd = numberWithoutCountryCode.slice(-1);
    const censoredMiddle = "x".repeat(numberWithoutCountryCode.length - 3);

    return `${countryCode}${visibleStart}${censoredMiddle}${visibleEnd}`;
  };

  const handleEditUser = (user) => {
    setId(user.emailId);
    setEditUser(user);
    setIsEditUser(true);
  };
  // const handleCancelEdit = () => {
  //   setIsEditUser(false);
  //   setEditUser(null);
  //   setIsAddingMoreInfo(false);
  // };

  // const handleEdit = async (e) => {
  //   e.preventDefault();
  //   const apiName = "clients";
  //   const path = `/user/update-Leads/awsaiapp`;
  //   const myInit = {
  //     body: {
  //       institution: institution,
  //       name: name,
  //       emailId: emailId,
  //       emailId2: emailId2,
  //       phoneNumber: phoneNumber,
  //       phoneNumber2: phoneNumber2,
  //       age: age,
  //       device: device,
  //       date: new Date(date).getTime(),
  //       category: category, // Include the category field
  //       other: {
  //         ...editUser.other,
  //       },
  //       type: "lead",
  //     },
  //   };

  //   // Include additionalInfoTitle and additionalInfo if available
  //   if (additionalInfoArray.length > 0) {
  //     additionalInfoArray.forEach((info) => {
  //       if (info.title && info.info) {
  //         myInit.body.other[info.title] = info.info;
  //       }
  //     });
  //   }

  //   try {
  //     const update = await API.put(apiName, path, myInit);
  //     await fetchLeads(institution);
  //     console.log(update);
  //     Swal.fire({
  //       icon: "success",
  //       title: "User Updated",
  //     });
  //     util.setLoader(false);
  //   } catch (e) {
  //     console.log(e);
  //     Swal.fire({
  //       icon: "error",
  //       title: "Error",
  //       text: "An error occurred while updating the user.",
  //     });
  //     util.setLoader(false);
  //   } finally {
  //     setIsAddingMoreInfo(false);
  //     setSelectedDevices({
  //       SmartPhone: false,
  //       Tablet: false,
  //       Laptop: false,
  //     });
  //   }
  // };

  // useEffect(() => {
  //   if (editUser) {
  //     setName(editUser.name || "");
  //     setEmailId(editUser.emailId || "");
  //     setEmailId2(editUser.emailId2 || "");
  //     setPhoneNumber(editUser.phoneNumber || "");
  //     setPhoneNumber2(editUser.phoneNumber2 || "");
  //     setAge(editUser.age || "");
  //     setdate(editUser.date || "");
  //     setDevice(editUser.device || []);
  //     setCategory(editUser.category || "");
  //     // Destructure the additional data fields from the other object
  //     const { additionalInfoTitle = "", additionalInfo = "" } =
  //       editUser.other || {};
  //     setAdditionalInfoTitle(additionalInfoTitle);
  //     setAdditionalInfo(additionalInfo);
  //   }
  // }, [editUser]);

  // const handleDeviceSelect = (deviceType) => {
  //   setSelectedDevices((prevDevices) => ({
  //     ...prevDevices,
  //     [deviceType]: !prevDevices[deviceType],
  //   }));
  // };

  // useEffect(() => {
  //   const updatedDevices = Object.keys(selectedDevices).filter(
  //     (device) => selectedDevices[device]
  //   );
  //   setDevice(updatedDevices);
  // }, [selectedDevices]);

  // const indexOfLastLead = currentPage * itemsPerPage;
  // const indexOfFirstLead = indexOfLastLead - itemsPerPage;
  // const currentLeads = filteredLeads.slice(indexOfFirstLead, indexOfLastLead);

  // Ensure the page resets to 1 when filteredLeads change
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredLeads]);

  // Safely calculate total pages for Pagination component
  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentLeads = filteredLeads.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  // const handleAddMoreInfo = () => {
  //   setAdditionalInfoArray((prevArray) => [
  //     ...prevArray,
  //     { title: "", info: "" },
  //   ]);
  //   setIsAddingMoreInfo(true);
  // };

  // const handleRemoveMoreInfo = (index) => {
  //   const updatedInfoArray = [...additionalInfoArray];
  //   updatedInfoArray.splice(index, 1);
  //   setAdditionalInfoArray(updatedInfoArray);
  // };

  // const handleInfoTitleChange = (e, index) => {
  //   const updatedInfoArray = [...additionalInfoArray];
  //   updatedInfoArray[index].title = e.target.value;
  //   setAdditionalInfoArray(updatedInfoArray);
  // };

  // const handleInfoChange = (e, index) => {
  //   const updatedInfoArray = [...additionalInfoArray];
  //   updatedInfoArray[index].info = e.target.value;
  //   setAdditionalInfoArray(updatedInfoArray);
  // };

  // const getCategoryColor = () => {
  //   switch (category) {
  //     case "Gold":
  //       return "#DAA520";
  //     case "Silver":
  //       return "#808080";
  //     case "Bronze":
  //       return "#a25b15";
  //     default:
  //       return "#DAA520";
  //   }
  // };

  const fileInputRef = useRef(null);
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    } else {
      console.error("File input ref is not attached.");
    }
  };

  const handleCSVFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileNameForBucket = "leadList";
      CSVUpload(file, institution, fileNameForBucket);
    } else {
      console.error("No file selected.");
    }
  };

  const ExportCSV = () => {
    const escapeQuotes = (value) => {
      if (typeof value !== "string") {
        // Convert non-string values to string
        value = value != null ? String(value) : "";
      }
      return `"${value.replace(/"/g, '""')}"`;
    };

    const csvData = leadsData.map((lead, index) => {
      // If `Device` is an array, join it into a single string separated by commas
      const deviceString = Array.isArray(lead.device)
        ? lead.device.join(", ")
        : lead.device || "undefined";

      return {
        serialno: index + 1,
        platform: escapeQuotes(lead.platform),
        Age: escapeQuotes(lead.age),
        "which_device_can_you_use_for_online_fitness_classes?":
          escapeQuotes(deviceString),
        Name: escapeQuotes(lead.name),
        EmailId: escapeQuotes(lead.emailId),
        PhoneNumber: escapeQuotes(lead.phoneNumber),
        City: escapeQuotes(lead.city),
        Gender: escapeQuotes(lead.gender),
      };
    });

    const csvContent = [
      [
        "Serial No",
        "platform",
        "Age",
        "which_device_can_you_use_for_online_fitness_classes?",
        "Name",
        "EmailId",
        "PhoneNumber",
        "City",
        "Gender",
      ],
      ...csvData.map((lead) => [
        lead.serialno,
        lead.platform,
        lead.Age,
        lead["which_device_can_you_use_for_online_fitness_classes?"],
        lead.Name,
        lead.EmailId,
        lead.PhoneNumber,
        lead.City,
        lead.Gender,
      ]),
    ];

    // Converting the CSV content to a string
    const csvString = csvContent.map((e) => e.join(",")).join("\n");

    // Creating a Blob from the CSV string
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });

    // Constructing the file name
    const fileName = `${institution} Lead List - ${csvData.length}.csv`;

    // Creating a link element to trigger the download
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", fileName);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // useEffect(() => {
  //   if (location.pathname === "/dashboard") {
  //     util.setLoader(true);
  //     setTimeout(() => {
  //       window.location.reload();
  //     }, 2000);
  //   } else {
  //     util.setLoader(false);
  //   }
  //   // eslint-disable-next-line
  // }, [location.pathname]);

  // console.log("additionalInfoTitle:", additionalInfoTitle);
  // console.log("additionalInfo:", additionalInfo);
  // console.log("selected data", selectedRow);
  // console.log("filtered data", filteredLeads);
  return (
    <div>
      {screenWidth > 1025 ? (
        <main>
          <div className="mt-5">
            <div className="flex items-center justify-between bg-white px-5 rounded-t-md">
              {/* Center: Search Bar */}
              <form className="flex items-center mx-4 w-[30rem] border border-gray rounded-md m-1">
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FiSearch
                      className="w-5 h-5 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    type="search"
                    id="default-search"
                    value={searchInput}
                    onChange={handleSearchInputChange}
                    className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-md bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Quick search for Leads"
                    required
                  />
                </div>
              </form>
              {/* Right: Import and Export Buttons */}
              <div className="flex items-center gap-4">
                <Button
                  onClick={handleButtonClick}
                  className="flex items-center justify-center py-0 px-2 h-8 text-sm rounded-md bg-[#30afbc] text-white hover:bg-[#30afbc] hover:text-white active:bg-[#30afbc]"
                  style={{ minWidth: "70px" }}
                >
                  <FaFileImport className="mr-2 mt-[0.20rem]" />
                  Upload CSV
                  <input
                    type="file"
                    accept=".csv, .xls, .xlsx"
                    onChange={handleCSVFile}
                    className="hidden"
                    ref={fileInputRef}
                    id="CSVFileInput"
                  />
                </Button>
                <Button
                  onClick={ExportCSV}
                  className="flex items-center justify-center py-0 px-2 h-8 text-sm rounded-md bg-[#30afbc] text-white hover:bg-[#30afbc] hover:text-white active:bg-[#30afbc]"
                  style={{ minWidth: "70px" }}
                >
                  <FaFileExport className="mr-2 mt-[0.20rem]" />
                  Export CSV
                </Button>
                {/* <Button
                onClick={() => setIsUserAdd(true)}
                className="flex items-center justify-center py-0 px-2 h-8 text-sm rounded-md bg-[#30afbc] text-white hover:bg-[#30afbc] hover:text-white active:bg-[#30afbc]"
                style={{ minWidth: '70px' }}
              >
                <span className="mr-1">+</span>Add Leads
              </Button> */}
                <Button
                  onClick={() => {
                    sendMail(selectedRow);
                  }}
                  className="flex items-center justify-center py-0 px-2 h-8 text-sm rounded-md bg-[#30afbc] text-white hover:bg-[#30afbc] hover:text-white active:bg-[#30afbc]"
                  style={{ minWidth: "70px" }}
                >
                  Send Mail
                </Button>
              </div>
            </div>
          </div>
          {sendmail && (
            <div className="popup-overlay">
              <div className="popup-content">
                <button className="close-button" onClick={handleCloseMember}>
                  ×
                </button>
                <h2 className="text-[2.2rem] K2D font-[400]">
                  Mail Templates List
                </h2>
                <main>
                  <div className="flex justify-between">
                    <Button
                      className="flex items-center justify-center py-0 px-2 h-8 text-sm rounded-md bg-[#30afbc] text-white hover:bg-[#30afbc] hover:text-white active:bg-[#30afbc]"
                      style={{ minWidth: "70px" }}
                      onClick={addTemplate}
                    >
                      <span className="mr-1">+</span> Add New
                    </Button>
                    <Button
                      className="flex items-center justify-center py-0 px-2 h-8 text-sm rounded-md bg-[#30afbc] text-white hover:bg-[#30afbc] hover:text-white active:bg-[#30afbc]"
                      style={{ minWidth: "70px" }}
                      onClick={handleSendMail}
                      disabled={templateData.length === 0} // Disable the button if templateData is empty
                    >
                      Send
                    </Button>
                  </div>
                  <section className="table_body K2D w-[95%] border border-[#2e2e2e] rounded-[6px] overflow-auto bg-[#fffb] my-[1rem] mb-[1rem] mx-auto custom-scrollbar">
                    <Table hoverable className="min-w-full">
                      <Table.Head>
                        <Table.HeadCell className="px-6 py-2 text-center text-xs font-medium text-gray-500 uppercase">
                          Template Name
                        </Table.HeadCell>
                        <Table.HeadCell className="px-6 py-2 text-center text-xs font-medium text-gray-500 uppercase">
                          Select
                        </Table.HeadCell>
                        {/* <Table.HeadCell className="px-6 py-2 text-center text-xs font-medium text-gray-500 uppercase">
                          Edit
                        </Table.HeadCell> */}
                      </Table.Head>
                      <Table.Body className="divide-y divide-gray-200">
                        {templateData.length > 0 ? (
                          templateData.map((templateDataA, index) => (
                            <Table.Row
                              key={index}
                              className="hover:bg-gray-200 cursor-pointer"
                            >
                              <Table.Cell
                                className="whitespace-nowrap text-sm font-medium text-gray-900 hover:underline text-center"
                                onClick={() =>
                                  handleEditTemplate(templateDataA)
                                }
                              >
                                {templateDataA}
                              </Table.Cell>
                              <Table.Cell className="text-center text-sm text-gray-900">
                                <input
                                  type="radio"
                                  className="h-[20px] w-[20px] cursor-pointer"
                                  name="selectedTemplate"
                                  onChange={() =>
                                    handleRadioChange(templateDataA)
                                  }
                                />
                              </Table.Cell>
                              {/* <Table.Cell
                                className="whitespace-nowrap text-gray-500 text-right "
                                style={{ width: "14px" }}
                                onClick={() =>
                                  handleEditTemplate(templateDataA)
                                }
                              >
                                <img
                                  src={EditImage}
                                  alt="Edit"
                                  style={{ height: "40px" }}
                                />
                              </Table.Cell> */}
                            </Table.Row>
                          ))
                        ) : (
                          <tr>
                            <td
                              colSpan="2"
                              className="p-4 text-center text-sm text-gray-500"
                            >
                              No templates found
                            </td>
                          </tr>
                        )}
                      </Table.Body>
                    </Table>
                    {editTemplate && (
                      <div className="popup-overlay">
                        <div className="popup-content">
                          <button
                            className="close-button"
                            onClick={handleCloseTemplateUpdate}
                          >
                            ×
                          </button>
                          <div className="m-[2%] flex flex-col gap-5">
                            <input
                              type="text"
                              placeholder="Name of your template"
                              className="h-[2rem] w-[15rem] p-[2%] border border-[#2e2e2e]"
                              value={templateDetails.TemplateName}
                              readOnly
                            />
                            <input
                              type="text"
                              className="h-[2rem] w-[15rem] p-[2%] border border-[#2e2e2e]"
                              value={templateDetails.SubjectPart}
                              onChange={handleUpdatedSubjectOfTemplate}
                            />
                            <textarea
                              // placeholder='Type the body of your mail here in HTML format'
                              className="h-[20rem] w-[25rem] p-[2%] border border-[#2e2e2e]"
                              value={htmlToPlainText(templateDetails.HtmlPart)}
                              onChange={handleUpdatedTemplateOnChange}
                            />
                          </div>
                          <button
                            className="bg-[#3193b6] text-white py-3 px-4 flex items-center"
                            onClick={() => {
                              handleUpdateClick(templateDetails);
                            }}
                          >
                            Update
                          </button>
                        </div>
                      </div>
                    )}
                  </section>
                  {addNewValue && (
                    <div className="popup-overlay">
                      <div className="popup-content">
                        <button
                          className="close-button"
                          onClick={handleClosePopup}
                        >
                          ×
                        </button>
                        <h2 className="text-[2.3125rem] K2D font-[600]">
                          Write a Template
                        </h2>
                        <div className="m-[2%] flex flex-col gap-5">
                          <input
                            type="text"
                            placeholder="Name of your template"
                            className="h-[2rem] w-[15rem] p-[2%] border border-[#2e2e2e]"
                            value={templateName}
                            onChange={handleNameOfTemplate}
                          />
                          <input
                            type="text"
                            placeholder="Subject of your template"
                            className="h-[2rem] w-[15rem] p-[2%] border border-[#2e2e2e]"
                            value={templateSubject}
                            onChange={handleSubjectOfTemplate}
                          />
                          <textarea
                            placeholder="Type the body of your mail here"
                            className="h-[20rem] w-[25rem] p-[2%] border border-[#2e2e2e]"
                            value={templateContent}
                            onChange={handleTemplateOnChange}
                          />
                        </div>
                        <button
                          className="bg-[#3193b6] text-white py-3 px-4 flex items-center"
                          onClick={() => {
                            handleDoneClick();
                          }}
                        >
                          Done
                        </button>
                      </div>
                    </div>
                  )}
                </main>
              </div>
            </div>
          )}

          {filteredLeads.length === 0 ? (
            <tr>
              <td colSpan="2" className="p-4 text-center text-sm text-gray-500">
                No Leads found
              </td>
            </tr>
          ) : (
            <div className="bg-white max-w-full mx-auto rounded-b-md">
              <Table hoverable className="min-w-full">
                <Table.Head>
                  <Table.HeadCell className="p-2">
                    <Checkbox
                      className="bg-gray-300 border border-gray-700 ml-2"
                      checked={isAllSelected}
                      onChange={() => {
                        if (filteredLeads === null) {
                          handleSelectAll(leadsData);
                        } else {
                          handleSelectAll(filteredLeads);
                        }
                      }}
                    />
                  </Table.HeadCell>
                  <Table.HeadCell className="px-6 py-2 text-center text-xs font-medium text-gray-500 uppercase">
                    Name
                  </Table.HeadCell>
                  <Table.HeadCell className="px-6 py-2 text-center text-xs font-medium text-gray-500 uppercase">
                    Email
                  </Table.HeadCell>
                  <Table.HeadCell className="px-6 py-2 text-center text-xs font-medium text-gray-500 uppercase">
                    Phone Number
                  </Table.HeadCell>
                  <Table.HeadCell className="px-6 py-2 text-center text-xs font-medium text-gray-500 uppercase">
                    Date
                  </Table.HeadCell>
                  <Table.HeadCell className="px-6 py-2 text-center text-xs font-medium text-gray-500 uppercase">
                    Device
                  </Table.HeadCell>
                  <Table.HeadCell className="px-6 py-2 text-center text-xs font-medium text-gray-500 uppercase">
                    Age
                  </Table.HeadCell>
                  {/* <Table.HeadCell className="px-6 py-2 text-center text-xs font-medium text-gray-500 uppercase">
                    View
                  </Table.HeadCell> */}
                  <Table.HeadCell className="px-6 py-2 text-right text-xs font-medium text-gray-500 uppercase"></Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                  {currentLeads.map((lead, index) => (
                    <Table.Row
                      key={index}
                      className="hover:bg-gray-200 cursor-pointer"
                    >
                      <Table.Cell
                        className="p-2 bg-white"
                        onClick={(e) => e.stopPropagation()} // Prevent row click when checkbox is clicked
                      >
                        <Checkbox
                          className="bg-gray-300 border border-gray-700 ml-2"
                          id={`checkbox-${lead}`}
                          checked={selectedRow.includes(lead)}
                          onChange={() => handleCheckboxChange(lead)}
                        />
                      </Table.Cell>
                      <Table.Cell
                        className="whitespace-nowrap text-sm font-medium text-gray-900 hover:underline text-center bg-white"
                        onClick={() => handleEditUser(lead)}
                      >
                        {lead.name}
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap text-sm text-gray-500 text-center bg-white">
                        {lead.emailId ? censorEmail(lead.emailId) : "None"}
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap text-sm text-gray-500 text-center bg-white">
                        {lead.phoneNumber
                          ? censorPhoneNumber(lead.phoneNumber)
                          : "None"}
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap text-sm text-gray-500 text-center bg-white">
                        {lead.date}
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap text-sm text-gray-500 text-center bg-white">
                        {lead.device ? lead.device.join(", ") : lead.device}
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap text-sm text-gray-500 text-center bg-white">
                        {lead.age}
                      </Table.Cell>
                      {/* <Table.Cell
                        className="whitespace-nowrap text-sm text-gray-500 text-right bg-white"
                        style={{ width: "18px" }}
                        onClick={() => handleEditUser(lead)}
                      >
                        <img src={EditImage} alt="Edit" height={"30px"} />
                      </Table.Cell> */}
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
              <div className="flex justify-between items-center px-4 my-[2rem]">
                <div className="text-sm text-gray-600">
                  Showing{" "}
                  <strong>
                    {startIndex + 1}-
                    {Math.min(startIndex + itemsPerPage, filteredLeads.length)}
                  </strong>{" "}
                  of <strong>{filteredLeads.length}</strong>
                </div>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                  className="flex justify-end"
                  showIcons
                  theme={customTheme}
                />
              </div>
            </div>
          )}
          {isEditUser &&
            <EditLead
              institution={institution}
              leadsData={leadsData}
              id={id}
              editUser={editUser}
              setEditUser={setEditUser}
              isEditUser={isEditUser}
              setIsEditUser={setIsEditUser}
              fetchLeads={fetchLeads}
            />
          }
          {/*(<div className=" absolute top-[12%] flex justify-center items-center w-[85vw] h-[auto] bg-[#ffffff60] backdrop-blur-sm z-[100] max1050:w-[90vw] max1050:mb-[6rem] max600:top-[0%]">
              <form className=" m-auto flex flex-col gap-8 p-6 border-[0.118rem] border-x-[#404040] border-y-[1.2rem] border-[#2297a7] items-center justify-center w-[40rem] h-[auto] max900:w-[auto] max850:w-[22rem] Poppins bg-[#ffffff] z-[50] max600:mr-[1rem]">
                <div
                  className={` ${
                    window.innerWidth > 850
                      ? "flex gap-8 justify-center w-full"
                      : "flex flex-col gap-4 w-full"
                  }`}
                >
                  <input
                    required
                    placeholder="Name"
                    className="bg-[#f0f0f0] text-[#000] K2D px-4 py-2 rounded-[6px] w-full focus:border-opacity-20  "
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                  <div className="flex">
                    <div className="text-[1.05rem] text-[#2b2b2b] font-bold mt-2">
                      Age:
                    </div>
                    <input
                      required
                      placeholder="age"
                      className="bg-[#f7f7f7] text-[#000] K2D px-4 py-2 rounded-[6px] w-[full] focus:border-opacity-20 border border-[#acacac]  "
                      type="number"
                      value={age}
                      onChange={(e) => {
                        setAge(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div
                  className={` ${
                    window.innerWidth > 850
                      ? "flex gap-8 w-full"
                      : "flex flex-col gap-4 w-full"
                  }`}
                >
                  <div className="bg-[#f0f0f0] text-[#000] K2D px-4 py-2 rounded-[6px] w-full focus:border-opacity-20  ">
                    {emailId}
                  </div>
                  <input
                    required
                    placeholder="Alternarte Email "
                    className="bg-[#f0f0f0] text-[#000] K2D px-4 py-2 rounded-[6px] w-full focus:border-opacity-20  "
                    type="email"
                    value={emailId2}
                    onChange={(e) => {
                      setEmailId2(e.target.value);
                    }}
                  />
                </div>
                <div
                  className={` ${
                    window.innerWidth > 850
                      ? "flex gap-8 w-full"
                      : "flex flex-col gap-4 w-full"
                  }`}
                >
                  <input
                    required
                    placeholder="Phone Number"
                    className="bg-[#f0f0f0] text-[#000] K2D px-4 py-2 rounded-[6px] w-full focus:border-opacity-20  "
                    type="number"
                    value={phoneNumber}
                    onChange={(e) => {
                      setPhoneNumber(e.target.value);
                    }}
                  />
                  <input
                    required
                    placeholder="Alternate Phone Number"
                    className="bg-[#f7f7f7] text-[#000] K2D px-4 py-2 rounded-[6px] w-full focus:border-opacity-20 border border-[#acacac]  "
                    type="number"
                    value={phoneNumber2}
                    onChange={(e) => {
                      setPhoneNumber2(e.target.value);
                    }}
                  />
                </div>
                <div
                  className={` ${
                    window.innerWidth > 850
                      ? "flex gap-8 justify-around w-full"
                      : "flex flex-col gap-4 w-full"
                  }`}
                >
                  <div className="flex gap-2">
                    <div className="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="40"
                        viewBox="0 0 24 24"
                        fill={getCategoryColor()} // Fill color based on category color
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-star"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                      <select
                        className="bg-[#f0f0f0] h-10 text-[#000] K2D px-4 py-2 rounded-[6px] focus:border-opacity-20"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        <option value="Gold">Gold</option>
                        <option value="Silver">Silver</option>
                        <option value="Bronze">Bronze</option>
                      </select>
                    </div>
                    <div className="bg-[#f7f7f7] text-[#000] flex justify-center items-center text-center h-[2.5rem] K2D rounded-[6px] w-[12rem] focus:border-opacity-20 border border-[#acacac]">
                      {date}
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div>
                      <img className="w-[3rem]" src={PhoneImg} alt="" />
                      <input
                        className="ml-4"
                        type="checkbox"
                        checked={selectedDevices.SmartPhone}
                        onChange={() => handleDeviceSelect("SmartPhone")}
                      />
                    </div>
                    <div>
                      <img className="w-[3rem]" src={TabletImg} alt="" />
                      <input
                        className="ml-4"
                        type="checkbox"
                        checked={selectedDevices.Tablet}
                        onChange={() => handleDeviceSelect("Tablet")}
                      />
                    </div>
                    <div>
                      <img className="w-[3rem]" src={LaptopImg} alt="" />
                      <input
                        className="ml-4"
                        type="checkbox"
                        checked={selectedDevices.Laptop}
                        onChange={() => handleDeviceSelect("Laptop")}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 flex-col w-full justify-start K2D text-[1.2rem] font-[600] mt-[-1rem]">
                  <div className="flex gap-2 items-center">
                    <div className="flex gap-2 items-center">
                      {isEditUser && (
                        <div className="font-[500]">
                          {leadsData.map((lead) => {
                            if (lead.emailId === id) {
                              return (
                                <div key={lead.id}>
                                  {lead.other &&
                                    Object.entries(lead.other).map(
                                      ([key, value]) => (
                                        <div key={key}>
                                          <span className="text-[#257d8d] font-bold">
                                            {key}:
                                          </span>
                                          <span className="text-[#2b2b2b]">
                                            {value}
                                          </span>
                                        </div>
                                      )
                                    )}
                                </div>
                              );
                            } else {
                              return null;
                            }
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <p className="text-[1.1rem] K2D font-[600] mb-5">
                  <span className="text-[#257d8d]">{name}</span>
                  {device ? (
                    <span>
                      {" "}
                      uses <span>{device.join(", ")}</span>
                    </span>
                  ) : (
                    " has no device information"
                  )}
                </p>
                {isAddingMoreInfo && (
                  <div className="flex flex-col gap-3 w-full justify-center items-center">
                    {additionalInfoArray.map((info, index) => (
                      <div key={index} className="flex flex-col gap-3 w-full">
                        <input
                          placeholder="Title"
                          className="flex w-[65%] text-[1.1rem] text-[#257d8d] border border-[#5a5a5a] rounded-[6px] p-2"
                          type="text"
                          value={info.title}
                          onChange={(e) => handleInfoTitleChange(e, index)}
                        />
                        <textarea
                          placeholder="Info"
                          className="flex w-[65%] h-[6rem] text-[1.1rem] text-[#257d8d] border border-[#5a5a5a] rounded-[6px] p-2 resize-none"
                          value={info.info}
                          onChange={(e) => handleInfoChange(e, index)}
                        />
                        <button
                          className="flex text-[white] w-[8rem] p-2 rounded-[10px] justify-center bg-[#a72222]"
                          onClick={() => handleRemoveMoreInfo(index)}
                        >
                          Remove Info
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex justify-end w-full">
                  <div
                    className="flex text-[white] w-[8rem] h-[2.5rem] p-2 rounded-[10px] justify-center bg-[#1d1d1d] mt-[-3rem]"
                    onClick={handleAddMoreInfo}
                  >
                    Add More Info
                  </div>
                </div>
                <div className="flex flex-col  gap-3 w-full justify-center items-center">
                  <button
                    className="K2D font-[600] tracking-[1.2px] bg-[#2297a7] text-white w-full rounded-[4px] py-[7px] border-[2px] border-[#2297a7] hover:bg-[#ffffff] hover:text-[#2297a7]"
                    onClick={handleEdit}
                  >
                    Update
                  </button>
                  <button
                    className="K2D font-[600] tracking-[1.2px] w-full rounded-[4px] py-2 border-[2px] border-[#222222] bg-[#ffffff] text-[#222222]"
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )} */}
        </main>
      ) : (
        <>
          <main className="w-screen">
            <div className="mt-5">
              <div className="flex flex-col md:flex-row flex-wrap items-center justify-between bg-white px-4 md:px-5 py-3 rounded-t-md">
                {/* Center: Search Bar */}
                <form className="flex items-center w-full md:w-[30rem] border border-gray rounded-md mb-4 md:mb-0">
                  <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <FiSearch
                        className="w-5 h-5 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                    <input
                      type="search"
                      id="default-search"
                      value={searchInput}
                      onChange={handleSearchInputChange}
                      className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-md bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Quick search for anything"
                      required
                    />
                  </div>
                </form>
                {/* Right: Buttons */}
                <div className="flex flex-wrap items-center gap-4 mt-4 md:mt-0">
                  <Button
                    onClick={handleButtonClick}
                    className="flex items-center justify-center py-1 px-3 h-10 text-sm rounded-md bg-[#30afbc] text-white hover:bg-[#30afbc] hover:text-white active:bg-[#30afbc] w-full sm:w-auto"
                  >
                    <FaFileImport className="mr-2 mt-[0.20rem]" />
                    Upload CSV
                    <input
                      type="file"
                      accept=".csv, .xls, .xlsx"
                      onChange={handleCSVFile}
                      className="hidden"
                      ref={fileInputRef}
                      id="CSVFileInput"
                    />
                  </Button>
                  <Button
                    onClick={ExportCSV}
                    className="flex items-center justify-center py-1 px-3 h-10 text-sm rounded-md bg-[#30afbc] text-white hover:bg-[#30afbc] hover:text-white active:bg-[#30afbc] w-full sm:w-auto"
                  >
                    <FaFileExport className="mr-2 mt-[0.20rem]" />
                    Export CSV
                  </Button>
                  <Button
                    onClick={() => {
                      sendMail(selectedRow);
                    }}
                    className="flex items-center justify-center py-1 px-3 h-10 text-sm rounded-md bg-[#30afbc] text-white hover:bg-[#30afbc] hover:text-white active:bg-[#30afbc] w-full sm:w-auto"
                  >
                    Send Mail
                  </Button>
                </div>
              </div>

              {/* Mail Template Popup */}
              {sendmail && (
                <>
                  <div className="popup-overlay  px-4">
                    <div className="p-4 w-full bg-white  rounded-lg shadow-lg">
                      <button
                        className="close-button text-[white] text-lg mb-2"
                        onClick={handleCloseMember}
                      >
                        ×
                      </button>
                      <h2 className="text-lg md:text-2xl font-semibold mb-4 text-center">
                        Mail Templates List
                      </h2>
                      <div className="flex flex-col md:flex-row justify-between gap-3 mb-4">
                        <Button
                          className="flex items-center justify-center py-2 px-4 h-10 text-sm rounded-md bg-[#30afbc] text-white hover:bg-[#27a2b2]"
                          onClick={addTemplate}
                        >
                          <span className="mr-1">+</span> Add New
                        </Button>
                        <Button
                          className="flex items-center justify-center py-2 px-4 h-10 text-sm rounded-md bg-[#30afbc] text-white hover:bg-[#27a2b2]"
                          onClick={handleSendMail}
                        >
                          Send
                        </Button>
                      </div>
                      <div className="overflow-y-auto max-h-64 custom-scrollbar bg-gray-50 rounded-lg border border-gray-300 p-2">
                        {templateData.length > 0 ? (
                          templateData.map((templateDataA, index) => (
                            <div
                              key={index}
                              className="p-4 mb-3 bg-white border border-gray-200 rounded-md shadow-sm hover:shadow-md transition-shadow"
                            >
                              <div className="flex justify-between items-center mb-2">
                                <h3
                                  className="text-sm font-medium text-gray-800"
                                  onClick={() =>
                                    handleEditTemplate(templateDataA)
                                  }
                                >
                                  {templateDataA}
                                </h3>
                                <input
                                  type="radio"
                                  className="h-4 w-4 text-blue-600 cursor-pointer"
                                  name="selectedTemplate"
                                  onChange={() =>
                                    handleRadioChange(templateDataA)
                                  }
                                />
                              </div>
                              {/* <button
                                className="text-sm text-blue-600 hover:underline flex items-center justify-center mt-2"
                                onClick={() =>
                                  handleEditTemplate(templateDataA)
                                }
                              >
                                <img
                                  src={EditImage}
                                  alt="Edit"
                                  className="h-5 w-5 mr-2"
                                />
                                Edit Template
                              </button> */}
                            </div>
                          ))
                        ) : (
                          <div className="text-center text-gray-500 text-sm p-4">
                            No templates found
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {editTemplate && (
                    <div className="popup-overlay w-screen">
                      <div className=" w-full max-w-md bg-white p-4 rounded-lg shadow-lg">
                        <button
                          className="close-button text-[white] text-lg mb-4"
                          onClick={handleCloseTemplateUpdate}
                        >
                          ×
                        </button>
                        <div className="flex flex-col gap-4">
                          <input
                            type="text"
                            placeholder="Name of your template"
                            className="h-10 w-full p-2 border border-[#2e2e2e]border-gray-300 rounded-md  text-gray-700"
                            value={templateDetails.TemplateName}
                            readOnly
                          />
                          <input
                            type="text"
                            placeholder="Subject of your template"
                            className="h-10 w-full p-2 border border-[#2e2e2e]rounded-md text-gray-700"
                            value={templateDetails.SubjectPart}
                            onChange={handleUpdatedSubjectOfTemplate}
                          />
                          <textarea
                            placeholder="Type the body of your mail here in plain text"
                            className="h-40 w-full p-2 border border-[#2e2e2e]rounded-md text-gray-700"
                            value={htmlToPlainText(templateDetails.HtmlPart)}
                            onChange={handleUpdatedTemplateOnChange}
                          />
                          <button
                            className="bg-[#3193b6] text-white py-2 px-4 rounded-md text-center hover:bg-[#277b9a]"
                            onClick={() => handleUpdateClick(templateDetails)}
                          >
                            Update
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {addNewValue && (
                    <div className="popup-overlay w-screen">
                      <div className=" w-full max-w-md bg-white p-4 rounded-lg shadow-lg">
                        <button
                          className="close-button text-gray-500 text-lg mb-4"
                          onClick={handleClosePopup}
                        >
                          ×
                        </button>
                        <h2 className="text-xl font-semibold mb-4 text-center">
                          Write a Template
                        </h2>
                        <div className="flex flex-col gap-4">
                          <input
                            type="text"
                            placeholder="Name of your template"
                            className="h-10 w-full p-2 border border-[#2e2e2e] rounded-md text-gray-700"
                            value={templateName}
                            onChange={handleNameOfTemplate}
                          />
                          <input
                            type="text"
                            placeholder="Subject of your template"
                            className="h-10 w-full p-2 border border-[#2e2e2e] rounded-md text-gray-700"
                            value={templateSubject}
                            onChange={handleSubjectOfTemplate}
                          />
                          <textarea
                            placeholder="Type the body of your mail here"
                            className="h-40 w-full p-2 border border-[#2e2e2e] rounded-md text-gray-700"
                            value={templateContent}
                            onChange={handleTemplateOnChange}
                          />
                          <button
                            className="bg-[#3193b6] text-white py-2 px-4 rounded-md text-center hover:bg-[#277b9a]"
                            onClick={handleDoneClick}
                          >
                            Done
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {filteredLeads.length === 0 ? (
              <div className="bg-white max-w-full mx-auto rounded-b-md p-4 text-center text-sm text-gray-500">
                No Leads found
              </div>
            ) : (
              <div className="bg-white max-w-full mx-auto rounded-b-md ">
                <div className="space-y-2 px-4">
                  {currentLeads.map((lead, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-2 border border-gray-200 rounded-lg bg-white  px-2 gap-1"
                    >
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          className="bg-gray-300 border border-gray-700"
                          checked={selectedRow.includes(lead)}
                          onChange={() => handleCheckboxChange(lead)}
                        />
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-gray-900"
                            onClick={() => handleEditUser(lead)}
                          >
                            {lead.name}
                          </span>
                          <span className="text-xs text-gray-500">
                            {lead.emailId ? censorEmail(lead.emailId) : "None"}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-center space-y-1">
                        <span className="text-xs text-gray-500">
                          {lead.phoneNumber
                            ? censorPhoneNumber(lead.phoneNumber)
                            : "None"}
                        </span>
                        <span className="text-xs text-gray-500">
                          {lead.date}
                        </span>
                        <span className="text-xs text-gray-500">
                          {lead.device ? lead.device.join(", ") : "None"}
                        </span>
                        <span className="text-xs text-gray-500">
                          {lead.age}
                        </span>
                      </div>
                      {/* <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEditUser(lead)}
                          className="p-2  text-gray-600 rounded-lg hover:bg-gray-300"
                        >
                          <img src={EditImage} alt="Edit" className="h-6 w-6" />
                        </button>
                      </div> */}
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-sm text-gray-600">
                    Page <strong>{currentPage}</strong> of{" "}
                    <strong>{totalPages}</strong>
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        currentPage > 1 && setCurrentPage(currentPage - 1)
                      }
                      disabled={currentPage === 1}
                      className={`px-2 py-1 text-xs font-medium rounded ${currentPage === 1
                        ? "bg-gray-200 text-gray-500"
                        : "bg-[#30afbc] text-white hover:bg-[#28a2ab]"
                        }`}
                    >
                      Previous
                    </button>
                    <button
                      onClick={() =>
                        currentPage < totalPages &&
                        setCurrentPage(currentPage + 1)
                      }
                      disabled={currentPage === totalPages}
                      className={`px-2 py-1 text-xs font-medium rounded ${currentPage === totalPages
                        ? "bg-gray-200 text-gray-500"
                        : "bg-[#30afbc] text-white hover:bg-[#28a2ab]"
                        }`}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}

            {isEditUser &&
              <EditLead
                institution={institution}
                leadsData={leadsData}
                id={id}
                editUser={editUser}
                setEditUser={setEditUser}
                isEditUser={isEditUser}
                setIsEditUser={setIsEditUser}
                fetchLeads={fetchLeads}
              />
            }
            {/* {isEditUser && (
              <div className="absolute top-[12%] flex justify-center items-center w-[90vw] h-auto bg-[#ffffff60] backdrop-blur-sm z-[100] max600:top-0 max600:w-[100vw]">
                <form className="m-auto flex flex-col gap-6 p-4 border border-[#2297a7] rounded-lg items-center justify-center w-[85vw] max-w-[28rem] bg-white shadow-lg max600:w-[95vw]">
                  <div className="flex flex-col gap-4 w-full">
                    <input
                      required
                      placeholder="Name"
                      className="bg-[#f0f0f0] text-[#000] px-4 py-2 rounded-md w-full text-sm"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <input
                      required
                      placeholder="Age"
                      className="bg-[#f7f7f7] text-[#000] px-4 py-2 rounded-md w-full text-sm"
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col gap-4 w-full">
                    <div className="bg-[#f0f0f0] text-[#000] px-4 py-2 rounded-md w-full text-sm">
                      {emailId}
                    </div>
                    <input
                      required
                      placeholder="Alternate Email"
                      className="bg-[#f0f0f0] text-[#000] px-4 py-2 rounded-md w-full text-sm"
                      type="email"
                      value={emailId2}
                      onChange={(e) => setEmailId2(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col gap-4 w-full">
                    <input
                      required
                      placeholder="Phone Number"
                      className="bg-[#f0f0f0] text-[#000] px-4 py-2 rounded-md w-full text-sm"
                      type="number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <input
                      required
                      placeholder="Alternate Phone Number"
                      className="bg-[#f7f7f7] text-[#000] px-4 py-2 rounded-md w-full text-sm"
                      type="number"
                      value={phoneNumber2}
                      onChange={(e) => setPhoneNumber2(e.target.value)}
                    />
                  </div>

                  <div className="flex gap-4 w-full items-center">
                    <select
                      className="bg-[#f0f0f0] h-10 text-[#000] px-4 py-2 rounded-md w-full text-sm"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="Gold">Gold</option>
                      <option value="Silver">Silver</option>
                      <option value="Bronze">Bronze</option>
                    </select>
                    <div className="bg-[#f7f7f7] text-[#000] h-10 flex justify-center items-center px-4 py-2 rounded-md text-sm">
                      {date}
                    </div>
                  </div>

                  <div className="flex justify-center items-center gap-4 flex-wrap">
                    {[
                      {
                        src: PhoneImg,
                        label: "SmartPhone",
                        value: selectedDevices.SmartPhone,
                      },
                      {
                        src: TabletImg,
                        label: "Tablet",
                        value: selectedDevices.Tablet,
                      },
                      {
                        src: LaptopImg,
                        label: "Laptop",
                        value: selectedDevices.Laptop,
                      },
                    ].map(({ src, label, value }, idx) => (
                      <div key={idx} className="flex gap-2 items-center">
                        <img className="w-10 h-10" src={src} alt={label} />
                        <input
                          type="checkbox"
                          checked={value}
                          onChange={() => handleDeviceSelect(label)}
                        />
                      </div>
                    ))}
                  </div>
                  {isAddingMoreInfo && (
                    <div className="flex flex-col gap-4 w-full justify-center items-center px-4">
                      {additionalInfoArray.map((info, index) => (
                        <div
                          key={index}
                          className="flex flex-col gap-3 w-full max-w-[28rem] bg-white p-4 rounded-lg shadow-md"
                        >
                          <input
                            placeholder="Title"
                            className="w-full text-[1rem] text-[#257d8d] border border-[#5a5a5a] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#257d8d]"
                            type="text"
                            value={info.title}
                            onChange={(e) => handleInfoTitleChange(e, index)}
                          />

                          <textarea
                            placeholder="Info"
                            className="w-full h-[6rem] text-[1rem] text-[#257d8d] border border-[#5a5a5a] rounded-md px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-[#257d8d]"
                            value={info.info}
                            onChange={(e) => handleInfoChange(e, index)}
                          />

                          <button
                            className="w-full bg-[#a72222] text-white py-2 rounded-md hover:bg-[#8b1c1c] transition-colors"
                            onClick={() => handleRemoveMoreInfo(index)}
                          >
                            Remove Info
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="flex flex-col gap-3 w-full mt-4">
                    <button
                      className="bg-[#1d1d1d] text-white rounded-md py-2 w-full text-center"
                      onClick={handleAddMoreInfo}
                    >
                      Add More Info
                    </button>
                    <button
                      className="bg-[#2297a7] text-white rounded-md py-2 w-full border border-[#2297a7] hover:bg-white hover:text-[#2297a7]"
                      onClick={handleEdit}
                    >
                      Update
                    </button>
                    <button
                      className="bg-white text-[#222] rounded-md py-2 w-full border border-[#222]"
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )} */}
          </main>
        </>
      )}
    </div>
  );
};

export default LeadsList;
