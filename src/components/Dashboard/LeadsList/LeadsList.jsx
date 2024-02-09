import React, { useContext, useState, useEffect } from "react";
import { API } from "aws-amplify";
import Pagination from "@mui/material/Pagination";
import Context from "../../../context/Context";
import EditImage from '../../../utils/Assets/Dashboard/images/PNG/Edit.png';
import SearchIcon from "../../../utils/Assets/Dashboard/images/SVG/Search.svg";
import Arrow from "../../../utils/Assets/Dashboard/images/SVG/EnterArrow.svg";
import PhoneImg from '../../../utils/Assets/Dashboard/images/PNG/smartphone.png'
import TabletImg from '../../../utils/Assets/Dashboard/images/PNG/Tablet.png'
import LaptopImg from '../../../utils/Assets/Dashboard/images/PNG/laptop.png'
import Swal from "sweetalert2";
import "./LeadsList.css";

const LeadsList = ({ institution: tempInstitution }) => {
  const { util, user } = useContext(Context);
  const searchParams = new URLSearchParams(window.location.search);
  let institution;
  if (user.profile.institution === "awsaiapp") {
    institution = searchParams.get("institution");
  } else {
    institution = tempInstitution || searchParams.get("institution");
  }
  const itemsPerPage = 9;
  const [leadsData, setLeadsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
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
  const [additionalInfoTitle, setAdditionalInfoTitle] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [isAddingMoreInfo, setIsAddingMoreInfo] = useState(false);
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
    const path = `/user/update-Leads`;
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
        other: {
          ...editUser.other,
        }
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
  console.log("additionalInfoTitle:", additionalInfoTitle);
  console.log("additionalInfo:", additionalInfo);
  return (
    <div className="ml-[5rem] max1300:ml-0">
      <h2 className="text-[2.3125rem] K2D font-[600]">Leadslist</h2>
      <main
        className="w-[82vw] max-h-[auto] min-h-[43rem] bg-[#fff5] max600:w-[90vw] max600:relative"
        style={{
          boxShadow: "0px 0px 10px 10px rgba(0, 0, 0, 0.1)",
          borderRadius: "0.8rem",
        }}
      >
        <section className="w-full h-[7%] bg-[#2c2c2c] rounded-t-[0.8rem] flex items-center justify-end">
          <div className="flex bg-white mr-[4rem] w-[28.25rem] rounded-[0.1875rem] p-[0.1rem] max600:mr-[1.2rem] max600:my-[0.3rem] max600:w-[80vw]">
            <img
              className="w-[1.9rem] h-[1.9rem] opacity-60 ml-2"
              src={SearchIcon}
              alt=""
            />
            <input
              className="flex-1 outline-none rounded-md K2D text-[#000] text-[0.9rem] tracking-[1px] font-[600] max600:text-[0.8rem] "
              type="text"
              placeholder={"Search “Name, Email, Number”"}
              value={searchInput}
              onChange={handleSearchInputChange}
            />
            <img
              className="w-[1rem] h-[1.5rem] mt-1 mr-[0.8rem] opacity-50"
              src={Arrow}
              alt=""
            />
          </div>
          <button className="bg-[#3193b6] text-white py-3 px-4 flex items-center mr-8 max600:absolute max600:top-[-5%] max600:right-[-5%] max600:p-1 max600:rounded-[7px]"
            onClick={() => setIsUserAdd(true)}
          >
            <span className="mr-2">+</span> Add Leads
          </button>
        </section>
        {isUserAdd && (
          <div className=" absolute top-[18%] flex justify-center items-center w-[85vw] h-[75vh] bg-[#ffffff60] backdrop-blur-sm z-[1] max1050:w-[90vw] max1050:mb-[6rem] max600:top-[0%]">
            <form className=" m-auto flex flex-col gap-8 p-6 border-[0.118rem] border-x-[#404040] border-y-[1.2rem] border-[#2297a7] items-center justify-center w-[40rem] h-[auto] max900:w-[auto] max850:w-[22rem] max850:h-[100vh] Poppins bg-[#ffffff] z-[50]">
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
        <section className="table_body K2D w-[95%] border border-[#2e2e2e] rounded-[6px] overflow-auto bg-[#fffb] my-[0.8rem] mx-auto custom-scrollbar">
          {filteredLeads.length === 0 ? (
            <p>Loading...</p>
          ) : (
            <table className="w-[100%]">
              <thead className="border-b text-[1.1rem] font-[600] border-[#2e2e2e]">
                <tr>
                  <th className="w-1/6 ">Name</th>
                  <th className="w-1/6 ">EmailId</th>
                  <th className="w-1/6">PhoneNumber</th>
                  <th className="w-1/6">Date</th>
                  <th className="w-1/6">Device</th>
                  <th className="w-1/6">Age</th>
                  <th className="w-1/6"></th>
                </tr>
              </thead>
              <tbody>
                {currentLeads.map((lead, index) => (
                  <tr key={index} className="font-[500]">
                    <td className="w-1/6">{lead.name}</td>
                    <td className="w-1/6">{lead.emailId}</td>
                    <td className="w-1/6">{lead.phoneNumber}</td>
                    <td className="w-1/6">{lead.date}</td>
                    <td className="w-1/6">{lead.device ? lead.device.join(', ') : lead.device}</td>
                    <td className="w-1/6">{lead.age}</td>
                    <td className="w-1/6" onClick={() => handleEditUser(lead)}>
                      <img src={EditImage} alt="Edit" width="100px" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {isEditUser && (
            <div className=" absolute top-[18%] flex w-[84vw] right-[5%] h-[75vh] bg-[#ffffff60] backdrop-blur-sm z-[30] max1050:w-[85vw] max1050:left-[5%]">
              <form className="relative m-auto flex flex-col gap-8 p-6 border-[0.118rem] border-x-[#404040] border-y-[1.2rem] border-[#2297a7] items-center justify-center w-[40rem] h-[auto] max900:w-[auto] max850:w-[22rem] Poppins bg-[#ffffff]">
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
                  <div className="bg-[#f7f7f7] text-[#000] flex justify-center items-center text-center h-[2.5rem] K2D rounded-[6px] w-[12rem] focus:border-opacity-20 border border-[#acacac]">
                    {date}
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
                <p className="text-[1.1rem] K2D font-[600]">
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
        </section>
        <Pagination
          count={Math.ceil(filteredLeads.length / itemsPerPage)}
          page={currentPage}
          onChange={paginate}
          className="custom-pagination"
        />
      </main>
    </div>
  );
};

export default LeadsList;
