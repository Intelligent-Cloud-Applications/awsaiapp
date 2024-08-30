import React, { useContext, useState, useEffect, useRef } from "react";
import { API } from "aws-amplify";
import Pagination from "@mui/material/Pagination";
import Context from "../../../context/Context";
import EditImage from '../../../utils/Assets/Dashboard/images/PNG/Edit.png';
import { FiSearch } from 'react-icons/fi';
import { FaFileExport, FaFileImport } from 'react-icons/fa';
import { Button, Checkbox, Table } from "flowbite-react";
import PhoneImg from '../../../utils/Assets/Dashboard/images/PNG/smartphone.png'
import TabletImg from '../../../utils/Assets/Dashboard/images/PNG/Tablet.png'
import LaptopImg from '../../../utils/Assets/Dashboard/images/PNG/laptop.png'
import Swal from "sweetalert2";
import "./LeadsList.css";
import { useNavigate, useLocation } from "react-router-dom";
import { CSVUpload } from '../../UploadFile/CSVUpload';

const LeadsList = ({ institution: tempInstitution }) => {
  const { util, user, userData } = useContext(Context);
  const location = useLocation()
  // const searchParams = new URLSearchParams(window.location.search);
  let institution;
  if (user.profile.institutionName === "awsaiapp") {
    institution = userData.institutionName;
  } else {
    institution = userData.institutionName || tempInstitution;
  }
  const itemsPerPage = 9;
  const [leadsData, setLeadsData] = useState([]);
  const [selectedRow, setSelectedRow] = useState([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const membersPerPage = 7;
  const [name, setName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [emailId2, setEmailId2] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumber2, setPhoneNumber2] = useState("");
  const [age, setAge] = useState("");
  const [device, setDevice] = useState([]);
  const [date, setdate] = useState("");;
  const [isEditUser, setIsEditUser] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [isUserAdd, setIsUserAdd] = useState(false);
  const [userCheck, setUserCheck] = useState(0);
  const [category, setCategory] = useState('Gold');
  const [additionalInfoTitle, setAdditionalInfoTitle] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [isAddingMoreInfo, setIsAddingMoreInfo] = useState(false);
  const [isAllSelected, setisAllSelected] = useState(false);/*to check wheather all the leads data is selected or not*/
  const [additionalInfoArray, setAdditionalInfoArray] = useState([
    { title: "", info: "" },
  ]);
  const [selectedDevices, setSelectedDevices] = useState({
    SmartPhone: false,
    Tablet: false,
    Laptop: false,
  });
  const [id, setId] = useState("");
  console.log(userCheck)

  const handleCheckboxChange = (lead) => {
    setSelectedRow((prevSelectedRows) => {
      if (prevSelectedRows.some((selectedLead) => selectedLead.emailId === lead.emailId)) {
        return prevSelectedRows.filter((selectedLead) => selectedLead.emailId !== lead.emailId);
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

  const sendMail = (dataToMail) => {
    if (dataToMail.length !== 0) {
      console.log(dataToMail);
      navigate('/templatemail', { state: { dataToMail } });
    } else {
      return (
        alert("Please select leads")
      );
    }
  }

  useEffect(() => {
    setFilteredLeads(filterLeadsByNameEmailIdPhoneNumber(leadsData, searchInput));
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

  console.log(userData)

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const fetchLeads = async (institution) => {
    try {
      const response = await API.get("clients", `/user/get-leads/${institution}`);
      console.log(response.Items);
      setLeadsData(response.Items);
    } catch (error) {
      console.error("Error fetching leads:", error);
      console.error("Error details:", error.response);
    } finally {
      util.setLoader(false);
    }
  };

  useEffect(() => {
    fetchLeads(institution);
    // eslint-disable-next-line
  }, [institution]);

  const handleAddLeads = async (e) => {
    e.preventDefault();
    if (!name || !emailId || !phoneNumber || !date) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Name, Email, Date, Phone Number are mandatory fields.",
      });
      return;
    }
    const apiName = "clients";
    const path = "/user/create-Leads";
    const myInit = {
      body: {
        institution: institution,
        name: name,
        emailId: emailId,
        emailId2: emailId2,
        phoneNumber: phoneNumber,
        phoneNumber2: phoneNumber2,
        age: age,
        device: device,
        date: new Date(date).getTime(),
        other: {},
        type: "lead",
      },
    };
    // Include additionalInfoTitle and additionalInfo if available
    if (additionalInfoArray.length > 0) {
      additionalInfoArray.forEach((info) => {
        if (info.title && info.info) {
          myInit.body.other[info.title] = info.info;
        }
      });
    }
    try {
      const create = await API.post(apiName, path, myInit);
      console.log(create);
      setLeadsData((prevLeadsData) => [...prevLeadsData, myInit.body]);
      Swal.fire({
        icon: "success",
        title: "User Added",
      });
      setIsUserAdd(false);
      setName("");
      setEmailId("");
      setPhoneNumber("");
      util.setLoader(false);
    } catch (e) {
      console.log(e);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while creating the user.",
      });
      util.setLoader(false);
    } finally {
      setSelectedDevices({
        SmartPhone: false,
        Tablet: false,
        Laptop: false,
      });
    }
  };

  const handleEditUser = (user) => {
    setId(user.emailId);
    setEditUser(user);
    setIsEditUser(true);
  };
  const handleCancelEdit = () => {
    setIsEditUser(false);
    setEditUser(null);
    setIsAddingMoreInfo(false);
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const apiName = "clients";
    const path = `/user/update-Leads/awsaiapp`;
    const myInit = {
      body: {
        institution: institution,
        name: name,
        emailId: emailId,
        emailId2: emailId2,
        phoneNumber: phoneNumber,
        phoneNumber2: phoneNumber2,
        age: age,
        device: device,
        date: new Date(date).getTime(),
        category: category, // Include the category field
        other: {
          ...editUser.other,
        },
        type: "lead",
      },
    };

    // Include additionalInfoTitle and additionalInfo if available
    if (additionalInfoArray.length > 0) {
      additionalInfoArray.forEach((info) => {
        if (info.title && info.info) {
          myInit.body.other[info.title] = info.info;
        }
      });
    }

    try {
      const update = await API.put(apiName, path, myInit);
      await fetchLeads(institution);
      console.log(update);
      Swal.fire({
        icon: "success",
        title: "User Updated",
      });
      util.setLoader(false);
    } catch (e) {
      console.log(e);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while updating the user.",
      });
      util.setLoader(false);
    } finally {
      setIsAddingMoreInfo(false);
      setSelectedDevices({
        SmartPhone: false,
        Tablet: false,
        Laptop: false,
      });
    }
  };

  useEffect(() => {
    if (editUser) {
      setName(editUser.name || "");
      setEmailId(editUser.emailId || "");
      setEmailId2(editUser.emailId2 || "");
      setPhoneNumber(editUser.phoneNumber || "");
      setPhoneNumber2(editUser.phoneNumber2 || "");
      setAge(editUser.age || "");
      setdate(editUser.date || "");
      setDevice(editUser.device || []);
      setCategory(editUser.category || "");
      // Destructure the additional data fields from the other object
      const { additionalInfoTitle = "", additionalInfo = "" } = editUser.other || {};
      setAdditionalInfoTitle(additionalInfoTitle);
      setAdditionalInfo(additionalInfo);
    }
  }, [editUser]);

  const handleDeviceSelect = (deviceType) => {
    setSelectedDevices((prevDevices) => ({
      ...prevDevices,
      [deviceType]: !prevDevices[deviceType],
    }));
  };

  useEffect(() => {
    const updatedDevices = Object.keys(selectedDevices).filter(
      (device) => selectedDevices[device]
    );
    setDevice(updatedDevices);
  }, [selectedDevices]);

  const selectedDeviceNames = device.join(", ");

  const indexOfLastLead = currentPage * itemsPerPage;
  const indexOfFirstLead = indexOfLastLead - itemsPerPage;
  const currentLeads = filteredLeads.slice(indexOfFirstLead, indexOfLastLead);

  const paginate = (event, pageNumber) => setCurrentPage(pageNumber);
  const startIndex = (currentPage - 1) * membersPerPage;


  useEffect(() => {
    setCurrentPage(1);
  }, [filteredLeads])

  const handleAddMoreInfo = () => {
    setAdditionalInfoArray((prevArray) => [
      ...prevArray,
      { title: "", info: "" },
    ]);
    setIsAddingMoreInfo(true);
  };

  const handleRemoveMoreInfo = (index) => {
    const updatedInfoArray = [...additionalInfoArray];
    updatedInfoArray.splice(index, 1);
    setAdditionalInfoArray(updatedInfoArray);
  };

  const handleInfoTitleChange = (e, index) => {
    const updatedInfoArray = [...additionalInfoArray];
    updatedInfoArray[index].title = e.target.value;
    setAdditionalInfoArray(updatedInfoArray);
  };

  const handleInfoChange = (e, index) => {
    const updatedInfoArray = [...additionalInfoArray];
    updatedInfoArray[index].info = e.target.value;
    setAdditionalInfoArray(updatedInfoArray);
  };

  const getCategoryColor = () => {
    switch (category) {
      case 'Gold':
        return '#DAA520';
      case 'Silver':
        return '#808080';
      case 'Bronze':
        return '#a25b15';
      default:
        return '#DAA520';
    }
  };

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
      if (typeof value !== 'string') {
        // Convert non-string values to string
        value = value != null ? String(value) : "";
      }
      return `"${value.replace(/"/g, '""')}"`;
    };

    const csvData = leadsData.map((lead, index) => {
      // If `Device` is an array, join it into a single string separated by commas
      const deviceString = Array.isArray(lead.device) ? lead.device.join(", ") : lead.device || "undefined";

      return {
        serialno: index + 1,
        Date: escapeQuotes(lead.date),
        campaign_name: escapeQuotes(lead.campaignName),
        adset_name: escapeQuotes(lead.adsetName),
        ad_name: escapeQuotes(lead.adName),
        form_name: escapeQuotes(lead.formName),
        platform: escapeQuotes(lead.platform),
        Age: escapeQuotes(lead.age),
        "which_device_can_you_use_for_online_fitness_classes?": escapeQuotes(deviceString),
        Name: escapeQuotes(lead.name),
        EmailId: escapeQuotes(lead.emailId),
        PhoneNumber: escapeQuotes(lead.phoneNumber),
        City: escapeQuotes(lead.city),
        Gender: escapeQuotes(lead.gender)
      };
    });

    const csvContent = [
      ["Serial No", "Created_Date", "campaign_name", "adset_name", "ad_name", "form_name", "platform", "Age", "which_device_can_you_use_for_online_fitness_classes?", "Name", "EmailId", "PhoneNumber", "City", "Gender"],
      ...csvData.map(lead => [
        lead.serialno,
        lead.Date,
        lead.campaign_name,
        lead.adset_name,
        lead.ad_name,
        lead.form_name,
        lead.platform,
        lead.Age,
        lead["which_device_can_you_use_for_online_fitness_classes?"],
        lead.Name,
        lead.EmailId,
        lead.PhoneNumber,
        lead.City,
        lead.Gender
      ])
    ];

    // Converting the CSV content to a string
    const csvString = csvContent
      .map(e => e.join(","))
      .join("\n");

    // Creating a Blob from the CSV string
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });

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

  useEffect(() => {
    if (location.pathname === "/dashboard") {
      util.setLoader(true);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else {
      util.setLoader(false);
    }
    // eslint-disable-next-line
  }, [location.pathname]);

  console.log("additionalInfoTitle:", additionalInfoTitle);
  console.log("additionalInfo:", additionalInfo);
  console.log("selected data", selectedRow);
  console.log("filtered data", filteredLeads);
  return (
    <div>
      {/* <h2 className="text-[2.3125rem] K2D font-[600]">Leadslist</h2> */}
      <main className=" ml-3">
        <div className="mt-5">
          <div className="flex items-center justify-between bg-white h-12 px-5 rounded-t-md">
            {/* Center: Search Bar */}
            <form className="flex items-center mx-4 w-[30rem] border border-gray rounded-md">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FiSearch className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" />
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
            {/* Right: Import and Export Buttons */}
            <div className="flex items-center gap-4">
              <Button
                onClick={handleButtonClick}
                className="flex items-center justify-center py-0 px-2 h-8 text-sm rounded-md bg-[#30afbc] text-white hover:bg-[#30afbc] hover:text-white active:bg-[#30afbc]"
                style={{ minWidth: '70px' }}
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
                style={{ minWidth: '70px' }}
              >
                <FaFileExport className="mr-2 mt-[0.20rem]" />
                Export CSV
              </Button>
              <Button
                onClick={() => setIsUserAdd(true)}
                className="flex items-center justify-center py-0 px-2 h-8 text-sm rounded-md bg-[#30afbc] text-white hover:bg-[#30afbc] hover:text-white active:bg-[#30afbc]"
                style={{ minWidth: '70px' }}
              >
                <span className="mr-1">+</span>Add Leads
              </Button>
              <Button
                onClick={() => { sendMail(selectedRow) }}
                className="flex items-center justify-center py-0 px-2 h-8 text-sm rounded-md bg-[#30afbc] text-white hover:bg-[#30afbc] hover:text-white active:bg-[#30afbc]"
                style={{ minWidth: '70px' }}
              >
                Send Mail
              </Button>
            </div>
          </div>
        </div>
        {isUserAdd && (
          <div className=" absolute top-[12%] flex justify-center items-center w-[85vw] h-[85vh] bg-[#ffffff60] backdrop-blur-sm z-[100] max1050:w-[90vw] max1050:mb-[6rem] max600:top-[0%]">
            <form className=" m-auto flex flex-col gap-8 p-6 border-[0.118rem] border-x-[#404040] border-y-[1.2rem] border-[#2297a7] items-center justify-center w-[40rem] h-[auto] max900:w-[auto] max850:w-[22rem] Poppins bg-[#ffffff] z-[50]" >
              <div className={` ${window.innerWidth > 850 ? 'flex gap-8 justify-center w-full' : 'flex flex-col gap-4 w-full'}`}>
                <input
                  required
                  placeholder="Name"
                  className="bg-[#f7f7f7] text-[#000] K2D px-4 py-2 rounded-[6px] focus:border-opacity-20 border border-[#acacac]  "
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                <input
                  required
                  placeholder="age"
                  className="bg-[#f7f7f7] text-[#000] K2D px-4 py-2 rounded-[6px] focus:border-opacity-20 border border-[#acacac]  "
                  type="number"
                  value={age}
                  onChange={(e) => {
                    setAge(e.target.value);
                  }}
                />
              </div>
              <div className={` ${window.innerWidth > 850 ? 'flex gap-8 w-full' : 'flex flex-col gap-4 w-full'}`}>
                <input
                  required
                  placeholder="Email Address"
                  className="bg-[#f7f7f7] text-[#000] K2D px-4 py-2 rounded-[6px] w-full focus:border-opacity-20 border border-[#acacac]"
                  type="email"
                  value={emailId}
                  onChange={(e) => {
                    setEmailId(e.target.value);
                  }}
                />
                <input
                  required
                  placeholder="Alternate Email"
                  className="bg-[#f7f7f7] text-[#000] K2D px-4 py-2 rounded-[6px] w-full focus:border-opacity-20 border border-[#acacac]"
                  type="email"
                  value={emailId2}
                  onChange={(e) => {
                    setEmailId2(e.target.value);
                  }}
                />
              </div>
              <div className={` ${window.innerWidth > 850 ? 'flex gap-8 w-full' : 'flex flex-col gap-4 w-full'}`}>
                <input
                  required
                  placeholder="Phone Number"
                  className="bg-[#f7f7f7] text-[#000] K2D px-4 py-2 rounded-[6px] w-full focus:border-opacity-20 border border-[#acacac]  "
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
              <div className={` ${window.innerWidth > 850 ? 'flex gap-8 justify-center w-full' : 'flex flex-col gap-4 w-full'}`}>
                <input
                  required
                  placeholder="Joining date"
                  className="bg-[#f7f7f7] text-[#000] K2D px-4 py-2 h-12 rounded-[6px] focus:border-opacity-20 border border-[#acacac]  "
                  type="date"
                  value={date}
                  onChange={(e) => {
                    setdate(e.target.value);
                  }}
                />
                <div className="flex gap-6">
                  <div>
                    <img className="w-[3rem]" src={PhoneImg} alt="" />
                    <input
                      className="ml-4 rounded-full"
                      type="checkbox"
                      checked={selectedDevices.SmartPhone}
                      onChange={() => handleDeviceSelect('SmartPhone')}
                    />
                  </div>
                  <div>
                    <img className="w-[3rem]" src={TabletImg} alt="" />
                    <input
                      className="ml-4 rounded-full"
                      type="checkbox"
                      checked={selectedDevices.Tablet}
                      onChange={() => handleDeviceSelect('Tablet')}
                    />
                  </div>
                  <div>
                    <img className="w-[3rem]" src={LaptopImg} alt="" />
                    <input
                      className="ml-4 rounded-full"
                      type="checkbox"
                      checked={selectedDevices.Laptop}
                      onChange={() => handleDeviceSelect('Laptop')}
                    />
                  </div>
                </div>
              </div>
              <p className="mb-[-2rem]">You have selected {selectedDeviceNames}</p>
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
              <div className="flex justify-end w-full mt-2 mb-[-2rem] max850:mt-[4rem]">
                <div
                  className="flex text-[white] w-[8rem] h-[2.5rem] p-2 rounded-[10px] justify-center bg-[#1d1d1d] mt-[-3rem]"
                  onClick={handleAddMoreInfo}
                >
                  Add More Info
                </div>
              </div>
              <div className="flex flex-col gap-3 w-full justify-center items-center">
                <button
                  className="K2D font-[600] tracking-[1.2px] bg-[#2297a7] text-white w-full rounded-[4px] py-[7px] border-[2px] border-[#2297a7] hover:bg-[#ffffff] hover:text-[#2297a7]"
                  onClick={handleAddLeads}
                >
                  Create
                </button>
                <button
                  className="K2D font-[600] tracking-[1.2px] bg-[#333333] text-white w-full rounded-[4px] py-[7px] border-[2px] border-[#222222] hover:bg-[#ffffff] hover:text-[#222222]"
                  onClick={() => {
                    setIsUserAdd(false);
                    setUserCheck(0);
                    setIsAddingMoreInfo(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
        {filteredLeads.length === 0 ? (
          <p>Loading...</p>
        ) : (
          // <table className="w-[100%]">
          //   <thead className="border-b text-[1.1rem] font-[600] border-[#2e2e2e]">
          //     <tr>
          //       <th className="w-1/6 ">Name</th>
          //       <th className="w-1/6 ">EmailId</th>
          //       <th className="w-1/6">PhoneNumber</th>
          //       <th className="w-1/6">Date</th>
          //       <th className="w-1/6">Device</th>
          //       <th className="w-1/6">Age</th>
          //       <th className="w-1/6"></th>
          //       <th className="w-1/6">
          //         <input
          //           type="checkbox"
          //           className="h-[20px] w-[20px]"
          //           checked={isAllSelected}
          //           onChange={() => {
          //             if (filteredLeads === null) {
          //               handleSelectAll(leadsData);
          //             }
          //             else {
          //               handleSelectAll(filteredLeads);
          //             }
          //           }}
          //         />
          //       </th>
          //     </tr>
          //   </thead>
          //   <tbody>
          //     {currentLeads.map((lead, index) => (
          //       <tr key={index} className="font-[500]">
          //         <td className="w-1/6">{lead.name}</td>
          //         <td className="w-1/6">{lead.emailId}</td>
          //         <td className="w-1/6">{lead.phoneNumber}</td>
          //         <td className="w-1/6">{lead.date}</td>
          //         <td className="w-1/6">{lead.device ? lead.device.join(', ') : lead.device}</td>
          //         <td className="w-1/6">{lead.age}</td>
          //         <td className="w-1/6" onClick={() => handleEditUser(lead)}>
          //           <img src={EditImage} alt="Edit" width="100px" />
          //         </td>
          //         <td className="w-1/6">
          //           <input
          //             type="checkbox"
          //             className="h-[20px] w-[20px]"
          //             checked={selectedRow.includes(lead)}
          //             onChange={() => handleCheckboxChange(lead)}
          //           />
          //         </td>
          //       </tr>
          //     ))}
          //   </tbody>
          // </table>
          <div className="bg-white max-w-full mx-auto rounded-b-md">
            <div className="overflow-x-auto">
              <Table hoverable className="min-w-full">
                <Table.Head>
                  <Table.HeadCell className="p-2">
                    <Checkbox
                      className='bg-gray-300 border border-gray-700 ml-2'
                      checked={isAllSelected}
                      onChange={() => {
                        if (filteredLeads === null) {
                          handleSelectAll(leadsData);
                        }
                        else {
                          handleSelectAll(filteredLeads);
                        }
                      }}
                    />
                  </Table.HeadCell>
                  <Table.HeadCell className="px-6 py-2 text-center text-xs font-medium text-gray-500 uppercase">Name</Table.HeadCell>
                  <Table.HeadCell className="px-6 py-2 text-center text-xs font-medium text-gray-500 uppercase">Email</Table.HeadCell>
                  <Table.HeadCell className="px-6 py-2 text-center text-xs font-medium text-gray-500 uppercase">Phone Number</Table.HeadCell>
                  <Table.HeadCell className="px-6 py-2 text-center text-xs font-medium text-gray-500 uppercase">Date</Table.HeadCell>
                  <Table.HeadCell className="px-6 py-2 text-center text-xs font-medium text-gray-500 uppercase">Device</Table.HeadCell>
                  <Table.HeadCell className="px-6 py-2 text-center text-xs font-medium text-gray-500 uppercase">Age</Table.HeadCell>
                  <Table.HeadCell className="px-6 py-2 text-center text-xs font-medium text-gray-500 uppercase">View</Table.HeadCell>
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
                          className='bg-gray-300 border border-gray-700 ml-2'
                          id={`checkbox-${lead}`}
                          checked={selectedRow.includes(lead)}
                          onChange={() => handleCheckboxChange(lead)}
                        />
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap text-sm font-medium text-gray-900 hover:underline text-center bg-white">
                        {lead.name}
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap text-sm text-gray-500 text-center bg-white">
                        {lead.emailId}
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap text-sm text-gray-500 text-center bg-white">
                        {lead.phoneNumber}
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap text-sm text-gray-500 text-center bg-white">
                        {lead.date}
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap text-sm text-gray-500 text-center bg-white">
                        {lead.device ? lead.device.join(', ') : lead.device}
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap text-sm text-gray-500 text-center bg-white">
                        {lead.age}
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap text-sm text-gray-500 text-right bg-white"
                        style={{ width: '24px' }}
                        onClick={() => handleEditUser(lead)}>
                        <img src={EditImage} alt="Edit" width="100px" />
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>
            <div className="py-2 flex justify-between items-center px-4">
              <div className="text-sm text-gray-600">
                Showing <strong>{startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredLeads.length)}</strong> of <strong>{filteredLeads.length}</strong>
              </div>
              <Pagination
                count={Math.ceil(filteredLeads.length / itemsPerPage)}
                page={currentPage}
                onChange={paginate}
                className="custom-pagination"
              />
            </div>

          </div>
        )}
        {isEditUser && (
          <div className=" absolute top-[12%] flex justify-center items-center w-[85vw] h-[auto] bg-[#ffffff60] backdrop-blur-sm z-[100] max1050:w-[90vw] max1050:mb-[6rem] max600:top-[0%]">
            <form className=" m-auto flex flex-col gap-8 p-6 border-[0.118rem] border-x-[#404040] border-y-[1.2rem] border-[#2297a7] items-center justify-center w-[40rem] h-[auto] max900:w-[auto] max850:w-[22rem] Poppins bg-[#ffffff] z-[50] max600:mr-[1rem]" >
              <div className={` ${window.innerWidth > 850 ? 'flex gap-8 justify-center w-full' : 'flex flex-col gap-4 w-full'}`}>
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
                  <div className="text-[1.05rem] text-[#2b2b2b] font-bold mt-2">Age:</div>
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
              <div className={` ${window.innerWidth > 850 ? 'flex gap-8 w-full' : 'flex flex-col gap-4 w-full'}`}>
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
              <div className={` ${window.innerWidth > 850 ? 'flex gap-8 w-full' : 'flex flex-col gap-4 w-full'}`}>
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
              <div className={` ${window.innerWidth > 850 ? 'flex gap-8 justify-around w-full' : 'flex flex-col gap-4 w-full'}`}>
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
                      onChange={() => handleDeviceSelect('SmartPhone')}
                    />
                  </div>
                  <div>
                    <img className="w-[3rem]" src={TabletImg} alt="" />
                    <input
                      className="ml-4"
                      type="checkbox"
                      checked={selectedDevices.Tablet}
                      onChange={() => handleDeviceSelect('Tablet')}
                    />
                  </div>
                  <div>
                    <img className="w-[3rem]" src={LaptopImg} alt="" />
                    <input
                      className="ml-4"
                      type="checkbox"
                      checked={selectedDevices.Laptop}
                      onChange={() => handleDeviceSelect('Laptop')}
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
                                  Object.entries(lead.other).map(([key, value]) => (
                                    <div key={key}>
                                      <span className="text-[#257d8d] font-bold">{key}:</span>
                                      <span className="text-[#2b2b2b]">{value}</span>
                                    </div>
                                  ))}
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
                {device ? <span> uses <span>{device.join(', ')}</span></span> : ' has no device information'}
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
        )}
      </main>
    </div>
  );
};

export default LeadsList;
