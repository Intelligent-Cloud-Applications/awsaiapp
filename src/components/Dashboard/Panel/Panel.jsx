import React, { useState, useContext } from "react";
import { useCallback } from "react";
import { useMemo } from "react";
import Context from "../../../context/Context";
import { Link, useLocation } from "react-router-dom";
import { API } from "aws-amplify";
import Swal from "sweetalert2";
import { FaChevronRight } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Update from "../../../utils/Assets/Dashboard/images/SVG/Update.svg";
import { Table, Badge } from "flowbite-react";
import "./Panel.css";
import { useEffect } from "react";
import { Pagination, Dropdown, Flowbite } from "flowbite-react";

const customTheme = {
  dropdown: {
    floating: {
      base: "z-10 w-fit divide-y divide-gray-100 rounded-[0] shadow focus:outline-none", // Rounded-[0] applied here
    },
    item: {
      base: "hover:bg-blue-500 hover:text-white transition-all duration-200 ease-in-out rounded-[0]", // Ensure items have rounded-[0] as well
    },
  },
};
const Panel = () => {
  const itemsPerPage = 7;
  const [status, setStatus] = useState();
  const [memberCount, setMemberCount] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  // const [selectedRow, setSelectedRow] = useState([]);
  // eslint-disable-next-line
  const [isMonthlyReport, setisMonthlyReport] = useState("");
  const { clients, util, userData, setUserData } = useContext(Context);
  const clientsData = Object.entries(clients.data);
  // console.log(clientsData);
  // console.log(userData);
  const [isUserAdd, setIsUserAdd] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [Country, setCountry] = useState("");
  const [TotalIncome, setTotalIncome] = useState("");
  const [TotalAttendance, setTotalAttendance] = useState("");
  const [TotalLeads, setTotalLeads] = useState("");
  // eslint-disable-next-line
  const [Revenue, setRevenue] = useState("");
  // eslint-disable-next-line
  const [userCheck, setUserCheck] = useState(0);
  const [JoiningDate, setJoiningDate] = useState("");
  const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [isMoreVisible, setIsMoreVisible] = useState(false);
  const [showHiddenContent, setShowHiddenContent] = useState(false);
  const [instituteTypes, setInstituteTypes] = useState([]);
  const [instituteType, setInstituteType] = useState("");

  // const navigate = useNavigate();
  const filterClients = useCallback(() => {
    if (!searchQuery) {
      return clientsData;
    }

    const query = searchQuery.toLowerCase();
    const filtered = clientsData?.filter(([key, client]) => {
      const institution = client.institution
        ? client.institution.toLowerCase()
        : "";
      // const emailId = client.emailId ? client.emailId.toLowerCase() : "";
      const institutionTypes = userData.institutionType;
      const crreatedBy = userData.userName;
      const matches =
      institution.includes(query) ||
      institutionTypes.includes(query) ||
      crreatedBy.includes(query);

      return matches;
    });

    console.log("Filtered Clients:", filtered);
    return filtered;
  }, [searchQuery, clientsData, userData.institutionType, userData.userName]);

  const filteredClients = useMemo(() => filterClients(), [filterClients]);

  useEffect(() => {
    const newInstituteType = userData.institutionType;

    if (!instituteTypes.includes(newInstituteType)) {
      setInstituteTypes((prev) => [...prev, newInstituteType]);
    }
  }, [userData, instituteTypes]);
  useEffect(() => {
    const handleResize = () => {
      const max670Hidden = window.innerWidth <= 670;
      const max600Hidden = window.innerWidth <= 600;
      const max800Hidden = window.innerWidth <= 800;
      const max1008Hidden = window.innerWidth <= 1008;

      setIsMoreVisible(
        max670Hidden || max600Hidden || max800Hidden || max1008Hidden
      );
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener("resize", handleResize);
  }, []);



  // const showDetailForm = (institution) => {
  //   const userDetail = clientsData.find(
  //     ([key, client]) => client.institution === institution
  //   );
  //   setSelectedUser(userDetail);
  //   setName(userDetail[1].institution);
  //   setEmail(userDetail[1].emailId);
  //   setCountry(userDetail[1].country);
  //   setPhoneNumber(userDetail[1].phoneNumber);
  //   setTotalLeads(userDetail[1].recentMonthLeads);
  //   setTotalAttendance(userDetail[1].recentMonthAttendance);
  //   setTotalIncome(userDetail[1].recentMonthIncome);
  //   setMemberCount(userDetail[1].recentMonthMembers);
  //   setStatus(userDetail[1].status);
  //   setCountry(userDetail[1].country);
  //   setJoiningDate(userDetail[1].JoiningDate);
  //   setShowDetails(true);
  // };

  // const handleCheckboxChange = (institution) => {
  //   if (selectedRow.includes(institution)) {
  //     setSelectedRow(selectedRow.filter((id) => id !== institution));
  //   } else {
  //     setSelectedRow([...selectedRow, institution]);
  //   }
  // };

  // const isRowSelected = (institution) => {
  //   return selectedRow.includes(institution);
  // };

  // This is for the client panel demo data
  let createdBy = ["Madan", "Bikash", "Sai", "Madan", "Sai", "Bikash"]
  // For removing unused functions
  if (1 < 0) {
    setShowHiddenContent(true);
    setTotalLeads(0);
    setTotalAttendance(0);
    setTotalIncome(0);
    setMemberCount(0);
    isMonthlyReport.toUpperCase();
    Revenue.toUpperCase();
    userCheck === 0 && setUserCheck(1);
  }

  // const filteredClients = filterClients();
  // console.log("Type = ", typeof filteredClients);
  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredClients.length);
  const clientsToDisplay = filteredClients.slice(startIndex, endIndex);

  // const selectedRowCount = selectedRow.length;
  useEffect(() => {
    if (currentPage < 1 && totalPages > 0) {
      setCurrentPage(1);
    } else if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const onPageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  function formatEpochToReadableDate(epochDate) {
    const date = new Date(epochDate);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }
  const location = useLocation();
  // console.log("path", location.pathname);
  useEffect(() => {
    if (location.pathname === "/dashboard") {
      util.setLoader(true);
      util.setLoader(false);
    }
  });

  const handlePersonIconClick = (institution) => {
    setisMonthlyReport(institution);
    const updatedUserData = { ...userData, institutionName: institution };
    setUserData(updatedUserData);
  };

  const toggleAddUserForm = () => {
    setIsUserAdd(!isUserAdd);
  };

  // Function to add a new client
  const handleAddClient = async (e) => {
    e.preventDefault();
    try {
      util.setLoader(true);
      const apiName = "clients";
      const path = "/admin/create-clients";
      const myInit = {
        body: {
          institution: name,
          emailId: email,
          phoneNumber: phoneNumber,
          country: Country,
          JoiningDate: JoiningDate,
          status: status,
        },
      };
      const response = await API.post(apiName, path, myInit);
      Swal.fire({
        icon: "success",
        title: "User Added",
      });
      clients.onReload();
      console.log("Client added successfully:", response);
      setName("");
      setEmail("");
      setPhoneNumber("");
      setCountry("");
      setRevenue("");
      setJoiningDate("");
      setStatus("");
      toggleAddUserForm();
      util.setLoader(false);
    } catch (error) {
      console.error("Error adding client:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while creating the user.",
      });
      util.setLoader(false);
    }
  };

  const handleUpdateClient = async (e) => {
    setIsUpdateFormVisible(true);
    try {
      const apiName = "clients";
      const path = "/admin/update-clients";
      const myInit = {
        body: {
          institution: name,
          emailId: email,
          phoneNumber: phoneNumber,
          country: Country,
          status: status,
        },
      };
      console.log("my init", myInit);
      const response = await API.put(apiName, path, myInit);
      Swal.fire({
        icon: "success",
        title: "User Updated",
      });
      clients.onReload();
      console.log("Client updated successfully:", response);
      setIsUpdateFormVisible(false);
      setSelectedUser(null);
      setName("");
      setEmail("");
      setPhoneNumber("");
      setCountry("");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while updating the user.",
      });
      console.error("Error updating client:", error);
    }
  };

  const handleCancelUpdate = () => {
    setIsUpdateFormVisible(false);
    setSelectedUser(null);
    setName("");
    setEmail("");
    setPhoneNumber("");
    setStatus("");
  };

  // const showUpdateForm = (institution) => {
  //   const userToUpdate = clientsData.find(
  //     ([key, client]) => client.institution === institution
  //   );
  //   setSelectedUser(userToUpdate);
  //   setName(userToUpdate[1].institution);
  //   setEmail(userToUpdate[1].emailId);
  //   setPhoneNumber(userToUpdate[1].phoneNumber);
  //   setMemberCount(userToUpdate[1].memberCount);
  //   setStatus(userToUpdate[1].status);
  //   setCountry(userToUpdate[1].country);
  //   setIsUpdateFormVisible(true);
  // };
  const getColor = (status) => {
    if (status === "Active") {
      return "success";
    } else if (status === "InActive") {
      return "failure";
    } else {
      return "indigo";
    }
  };

  // const handleMoreClick = () => {
  //   setShowHiddenContent(!showHiddenContent);
  // };

  const splitandjoin = (str) => {

    // if capital letter is found then split the string and join it with space
    if (typeof str !== "string") {
      return "";
    }
    if (str.match(/[A-Z]/) !== null) {
      return str
        .split(/(?=[A-Z])/)
        .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
        .join(" ");

    } else {
      // Handle cases where str is not a valid string
      console.error("Invalid input: The input is not a string or is empty.");
      return ""; // or return str if you want to return the original input
    }
  };


  const handleRowClick = (institution, event) => {
    setisMonthlyReport(institution);
    // Find the link within the clicked row and trigger a click on it
    const link = event.currentTarget.querySelector(".change-page");
    if (link) {
      link.click();
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center mt-[-5rem] mx-[4rem] max1300:mt-[-16px] shadow-xl rounded-[0] bg-[#e6e4e4] lg:ml-[7%]">
    <ToastContainer />
    <div className="w-[80%] mt-4 rounded-[0] flex flex-col md:flex-row justify-end space-y-4 items-center bg-white py-3 pr-4 shadow-lg lg:space-x-4 lg:space-y-0 upper-section">
        {/* WebDevelopment Form Link */}
        <Flowbite theme={{ theme: customTheme }}>
          <Dropdown
            label={instituteType ? splitandjoin(instituteType) : "Type"}
            className="bg-white text-white font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-[0]" // Apply rounded-[0] here
          >
            {instituteTypes.map((type) => (
              <Dropdown.Item
                key={type}
                onClick={() => setInstituteType(type)}
                className="hover:bg-blue-500 hover:text-white transition-all duration-200 ease-in-out rounded-[0]" // Apply rounded-[0] here
              >
                {splitandjoin(type)}
              </Dropdown.Item>
            ))}
          </Dropdown>
        </Flowbite>
        <div>
        <Link
            to={
              instituteType !== "" && instituteType === "danceStudio"
                ? "/template"
                : "#"
            }
            onClick={(e) => {
              if (instituteType === "") {
               e.stopPropagation()
                console.log('Showing toast message'); // Debug line
                toast.error("Please Select a type of Institution.", {
                  position: 'top-right',
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  style: {
                    backgroundColor: '#f8d7da',
                    color: '#721c24',
                  },
                });
              } 
            }}
            className="hover:no-underline"
          >
            <button className="flex items-center gap-2 p-2 bg-[#48d6e0]  font-semibold text-sm rounded-md hover:bg-[#3ae1f7] focus:outline-none focus:ring-2 focus:ring-[#6cebff] transition duration-300 ease-in-out transform hover:scale-105 shadow-md">
              <p className="text-white">Create New Institution</p>
            </button>
          </Link>
        </div>
      </div>
      <div className="w-[80%] mt-4 rounded-md flex flex-col justify-center items-center bg-white py-3 flowbite-table">
        <div className="flex flex-row justify-end w-[95%] items-center  mt-[1rem] my-10 md:my-0 max850:flex-col max850:justify-center max850:items-center">
          {/* Search Bar */}

          <form class="w-full min800:w-[30%] rounded-sm my-3">
            <label
              for="default-search"
              class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  class="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-[#F9FAFB]  shadow-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                placeholder="Search"
                required
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>

          {/* Functionalities */}
          {/* <div className=" flex flex-col md:flex-row space-y-2 md:space-x-2 justify-between items-center">
            <div className="flex flex-row justify-center items-center gap-3 px-5 py-1 bg-white rounded-full h-14 ">
              <button onClick={() => setIsUserAdd(true)}>
                <img className="w-5 h-5" src={Add} alt="Add" />
              </button>

            </div>
            <div className="absolute right-[4px] bottom-[-7px] border border-gray-300 w-[9rem] rounded-2xl h-8 mt-6 z-[-1]"></div> */}
          {/* WebDevelopment Form Link */}
          {/* <div className="">
              <Link to="/template">
                <button className="flex items-center gap-2 p-2 bg-[#48d6e0] text-white font-semibold text-sm rounded-md hover:bg-[#3ae1f7] focus:outline-none focus:ring-2 focus:ring-[#6cebff]">
                  <p>Web Development</p>
                </button>
              </Link>
            </div>
          </div> */}
        </div>

        {/* form of creating new client */}
        {isUserAdd && (
          <div className=" absolute top-[21%] flex w-[78vw] h-[70vh] bg-[#ffffff60] backdrop-blur-sm z-50 max1050:w-[85vw]">
            <form className="relative m-auto flex flex-col gap-10 p-6 border-[0.118rem] border-x-[#404040] border-y-[1.2rem] border-[#2297a7] items-center justify-center w-[22rem] h-[37rem] max900:w-[auto] Poppins bg-[#ffffff] z-[1]">
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
              <input
                required
                placeholder="Email Address"
                className="bg-[#f0f0f0] text-[#000] K2D px-4 py-2 rounded-[6px] w-full focus:border-opacity-20  "
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <input
                required
                placeholder="Country"
                className="bg-[#f0f0f0] text-[#000] K2D px-4 py-2 rounded-[6px] w-full focus:border-opacity-20  "
                type="text"
                value={Country}
                onChange={(e) => {
                  setCountry(e.target.value);
                }}
              />
              <input
                required
                placeholder="Joining date"
                className="bg-[#f0f0f0] text-[#000] K2D px-4 py-2 rounded-[6px] w-full focus:border-opacity-20  "
                type="date"
                value={JoiningDate}
                onChange={(e) => {
                  setJoiningDate(e.target.value);
                }}
              />
              <div className="flex mt-[-1.5rem] mb-[-1rem]">
                <label>Status:</label>
                <div className="flex justify-center items-center space-x-1">
                  <input
                    type="radio"
                    name="memberStatus"
                    value="Active"
                    className="ml-3"
                    checked={status === "Active"}
                    onChange={() => setStatus("Active")}
                  />
                  <p className="text-[#85e758]">Active</p>
                </div>
                <div className="flex justify-center items-center space-x-1">
                  <input
                    type="radio"
                    name="memberStatus"
                    value="InActive"
                    className="ml-3"
                    checked={status === "InActive"}
                    onChange={() => setStatus("InActive")}
                  />
                  <p className="text-[#ff1010d9]">InActive</p>
                </div>
                <div className="flex justify-center items-center space-x-1">
                  <input
                    type="radio"
                    name="memberStatus"
                    value="comingSoon"
                    className="ml-3"
                    checked={status === "comingSoon"}
                    onChange={() => setStatus("comingSoon")}
                  />
                </div>
                <p className="text-[#5521B5]">Coming Soon</p>
              </div>
              <div className="flex flex-col  gap-3 w-full justify-center items-center">
                <button
                  className="K2D font-[600] tracking-[1.2px] bg-[#2297a7] text-white w-full rounded-[4px] py-2 border-[2px] border-[#2297a7] hover:bg-[#ffffff] hover:text-[#2297a7]"
                  onClick={handleAddClient}
                >
                  Create
                </button>
                <button
                  className="K2D font-[600] tracking-[1.2px] bg-[#333333] text-white w-full rounded-[4px] py-2 border-[2px] border-[#222222] hover:bg-[#ffffff] hover:text-[#222222]"
                  onClick={() => {
                    setIsUserAdd(false);
                    setUserCheck(0);
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Headings */}
        <div className="overflow-x-auto w-full mb-4 max-h-[300px] md:max-h-[400px] overflow-y-auto">
          <Table className="w-full text-sm text-left text-gray-500">
            <Table.Head className="text-xs text-[#6B7280] bg-[#F9FAFB]">
              {/* <Table.HeadCell></Table.HeadCell> */}
              <Table.HeadCell className=" uppercase font-semibold text-[14px]">
                Institution
              </Table.HeadCell>
              <Table.HeadCell className=" uppercase font-semibold text-[14px]">
                Type
              </Table.HeadCell>
              <Table.HeadCell className="max600:hidden uppercase font-semibold text-[14px]">
                Status
              </Table.HeadCell>
              {/* <Table.HeadCell className=" uppercase font-semibold text-[14px]">
                Revenue
              </Table.HeadCell> */}
              <Table.HeadCell className="max1008:hidden uppercase font-semibold text-[14px]">
                Members
              </Table.HeadCell>
              {/* <Table.HeadCell
                className={`${
                  showHiddenContent ? "" : "max1008:hidden"
                } uppercase font-semibold text-[14px]`}
              >
                Attendance
              </Table.HeadCell> */}
              <Table.HeadCell
                className={`${showHiddenContent ? "" : "max1008:hidden"
                  } uppercase font-semibold text-[14px]`}
              >
                Created By
              </Table.HeadCell>
              <Table.HeadCell
                className={`${showHiddenContent ? "" : "max1008:hidden"
                  } uppercase font-semibold text-[14px]`}
              >
                Leads
              </Table.HeadCell>
              <Table.HeadCell className="more uppercase font-semibold text-[14px]">
                More
              </Table.HeadCell>
            </Table.Head>

            <Table.Body className="bg-white">
              {clientsToDisplay.map(([key, client], index) => (

                <Table.Row
                  key={client.institution}
                  className="clients-data-table border-b hover:bg-gray-100 hover:cursor-pointer"
                  onClick={(e) => handleRowClick(client.institution, e)}
                >
                  {/* Checkbox */}
                  {/* <Table.Cell className="px-4 py-2">
                    <label className="relative">
                      <input
                        type="checkbox"
                        className="hidden"
                        onChange={() =>
                          handleCheckboxChange(client.institution)
                        }
                        checked={isRowSelected(client.institution)}
                      />
                      <div className="absolute w-4 h-4 border-2 border-gray-400 cursor-pointer">
                        {isRowSelected(client.institution) && (
                          <img
                            src={Select}
                            alt="Selected"
                            className="w-full h-full"
                          />
                        )}
                      </div>
                    </label>
                  </Table.Cell> */}

                  <Table.Cell className="px-4 py-2 font-semibold text-gray-900">
                    <Link
                      to={`/Dashboard?institution=${client.institution}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePersonIconClick(client.institution);
                      }}
                    >
                      <div className="email-hover uppercase font-semibold text-[#11192B]">
                        {client.institution}
                      </div>
                    </Link>
                  </Table.Cell>

                  <Table.Cell className="px-4 py-2 font-semibold text-[#9095A0] ">
                    {splitandjoin(userData.institutionType)}
                  </Table.Cell>

                  <Table.Cell className="max600:hidden px-4 py-2 font-semibold text-gray-900">
                    <Badge
                      color={getColor(client.status)}
                      size="sm"
                      className="flex justify-center items-center"
                    >
                      {client.status}
                    </Badge>
                  </Table.Cell>

                  {/* <Table.Cell className="px-2 py-2 font-semibold text-gray-900  ">
                    {client.country === "USA"
                      ? `$${client.recentMonthIncome}`
                      : `₹${client.recentMonthIncome}`}
                  </Table.Cell> */}

                  <Table.Cell className="max1008:hidden px-2 py-2 font-semibold text-gray-900 text-center lg:pr-16 ">
                    {client.recentMonthMembers}
                  </Table.Cell>

                  {/* <Table.Cell
                    className={`${
                      showHiddenContent ? "" : "max1008:hidden"
                    } px-2 py-2 font-semibold text-gray-900 text-center lg:pr-16`}
                  >
                    {client.recentMonthAttendance}
                  </Table.Cell> */}

                  <Table.Cell
                    className={`${showHiddenContent ? "" : "max1008:hidden"
                      } px-2 py-2 font-semibold text-gray-900 text-left lg:pr-16`}
                  >
                    {createdBy[index]}
                  </Table.Cell>
                  <Link
                    to={`/Dashboard?institution=${client.institution}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePersonIconClick(client.institution);
                    }}
                    className="hidden change-page"
                  ></Link>
                  <div
                    className={`${showHiddenContent ? "" : "max1008:hidden"
                      } h-full p-2 flex space-x-2 justify-center items-center lg:justify-start `}
                  >
                    <Table.Cell className="px-2 py-2 font-semibold text-gray-900 text-center">
                      {client.recentMonthLeads}
                    </Table.Cell>
                  
                  </div>
                  <Table.Cell
                    className="more"
                  // onClick={handleMoreClick}
                  >
                    <Link
                      to={`/Dashboard?institution=${client.institution}`}
                      onClick={() => handlePersonIconClick(client.institution)}
                    >
                      {isMoreVisible ? <FaChevronRight /> : ""}
                    </Link>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>

        {clientsToDisplay.map(([key, client], index) => (
          <div key={client.institution}>
            {/* {
            // isRowSelected(client.institution) && 
            (
              <p
                className="cursor-pointer w-[10rem] K2D text-[#13838d] font-[600] ml-[11rem] min600:hidden"
                onClick={() => showDetailForm(client.institution)}
              >
                -- See Details --
              </p>
            )} */}
          </div>
        ))}

        {showDetails && selectedUser && (
          <div
            class="flex justify-center items-center mt-[-55vh] rounded-lg w-[22rem] h-[40rem] relative bg-white z-50"
            style={{
              boxShadow: "0 0 20px rgba(0, 0, 0, 0.3)",
            }}
          >
            <div class="w-[340px] h-[595px] relative bg-white rounded-[18px]">
              <div class="w-[242px] h-[488px] left-[41px] top-[69px] absolute">
                <div class="w-[79px] h-7 left-[-21px] top-[16px] absolute text-black text-base font-semibold font-['Inter'] tracking-wide">
                  Email Id:
                </div>
                <div class="w-[129px] h-[35px] left-[68px] top-[16px] absolute text-zinc-800 text-[13px] font-semibold font-['Inter'] tracking-tight">
                  {email}
                </div>
                <div class="w-[79px] h-[27px] left-[-21px] top-[67px] absolute text-black text-base font-semibold font-['Inter'] tracking-wide">
                  Country:
                </div>
                <div class="w-[134px] h-[35px] left-[68px] top-[68px] absolute text-zinc-800 text-[13px] font-semibold font-['Inter'] tracking-tight">
                  {Country}
                </div>
                <div class="w-[79px] h-7 left-[-21px] top-[173px] absolute text-black text-base font-semibold font-['Inter'] tracking-wide">
                  Status:
                </div>
                <div class="w-[120px] h-[34px] left-[68px] top-[175px] absolute text-zinc-800 text-[13px] font-semibold font-['Inter'] tracking-tight">
                  {status}
                </div>
                <div class="w-[114px] h-7 left-[-21px] top-[120px] absolute text-black text-base font-semibold font-['Inter'] tracking-wide">
                  Joining Date:
                </div>
                <div class="w-[134px] h-[35px] left-[96px] top-[122px] absolute text-zinc-800 text-[13px] font-semibold font-['Inter'] tracking-tight">
                  {formatEpochToReadableDate(JoiningDate)}
                </div>
              </div>
              <div class="w-[89px] h-[29px] left-[20px] top-[298px] absolute text-black text-base font-semibold font-['Inter'] tracking-wide">
                Revenue:
              </div>
              <div class="w-[169px] h-[35px] left-[109px] top-[298px] absolute text-zinc-800 text-[13px] font-semibold font-['Inter'] tracking-tight">
                {TotalIncome}
              </div>
              <div class="w-[89px] h-7 left-[20px] top-[365px] absolute text-black text-base font-semibold font-['Inter'] tracking-wide">
                Members:
              </div>
              <div class="w-[185px] h-[34px] left-[109px] top-[366px] absolute text-zinc-800 text-[13px] font-semibold font-['Inter'] tracking-tight">
                {memberCount}
              </div>
              <div class="w-[114px] h-[27px] left-[20px] top-[432px] absolute text-black text-base font-semibold font-['Inter'] tracking-wide">
                Attendance:
              </div>
              <div class="w-[204px] h-[34px] left-[127px] top-[434px] absolute text-zinc-800 text-[13px] font-semibold font-['Inter'] tracking-tight">
                {TotalAttendance}
              </div>
              <div class="w-[66px] h-7 left-[20px] top-[489px] absolute text-black text-base font-semibold font-['Inter'] tracking-wide">
                Leads:
              </div>
              <div class="w-[158px] h-[35px] left-[109px] top-[499px] absolute text-zinc-800 text-[13px] font-semibold font-['Inter'] tracking-tight">
                {TotalLeads}
              </div>
              <div class="w-[340px] h-[17px] left-0 top-[13px] absolute text-center text-black text-[23px] font-semibold font-['Inter'] tracking-wide">
                {name}
              </div>
            </div>
            <div>
              <button
                className="absolute right-0 bottom-0 rounded-b-lg bg-[#13838d] text-white p-3 w-[22rem]"
                onClick={() => setShowDetails(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}

        {isUpdateFormVisible && selectedUser && (
          <div className="absolute top-[21%] flex w-[78vw] h-[75vh] bg-[#ffffff60] backdrop-blur-sm z-[10] max1050:w-[85vw]">
            <form className="relative h-[38rem] m-auto flex flex-col justify-between p-6 border-[0.118rem] border-x-[#404040] border-y-[1.2rem] border-[#2297a7] items-center w-[22rem]  max900:w-[auto] Poppins bg-[#ffffff] z-[1]">
              {/* Include form fields for updating user details */}
              <input
                required
                placeholder="Name"
                className="bg-[#f0f0f0] text-[#000] K2D px-4 py-2 rounded-[6px] w-full focus:border-opacity-20"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                required
                placeholder="Email Address"
                className="bg-[#f0f0f0] text-[#000] K2D px-4 py-2 rounded-[6px] w-full focus-border-opacity-20"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                required
                placeholder="Phone Number"
                className="bg-[#f0f0f0] text-[#000] K2D px-4 py-2 rounded-[6px] w-full focus-border-opacity-20"
                type="number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <input
                required
                placeholder="Country"
                className="bg-[#f0f0f0] text-[#000] K2D px-4 py-2 rounded-[6px] w-full focus:border-opacity-20  "
                type="text"
                value={Country}
                onChange={(e) => {
                  setCountry(e.target.value);
                }}
              />
              {/* <div className="flex gap-1">
                <label className="mt-2">Total Member :</label>
                <input
                  required
                  placeholder="Members"
                  className="bg-[#f0f0f0] text-[#000] K2D px-4 py-2 rounded-[6px] w-[11rem] focus:border-opacity-20  "
                  type="text"
                  value={memberCount}
                  onChange={(e) => {
                    setMemberCount(e.target.value);
                  }}
                />
              </div>
              <div className="flex gap-9">
                <label className="mt-2">Revenue :</label>
                <input
                  required
                  placeholder="Revenue"
                  className="bg-[#f0f0f0] text-[#000] K2D px-4 py-2 rounded-[6px] w-[11rem] focus:border-opacity-20  "
                  type="text"
                  value={memberCount}
                  onChange={(e) => {
                    setRevenue(e.target.value);
                  }}
                />
              </div> */}
              <div className="flex items-baseline mt-[-1.5rem] mb-[-1rem]">
                <label>Status:</label>
                <input
                  type="radio"
                  name="memberStatus"
                  value="Active"
                  className="ml-3"
                  checked={status === "Active"}
                  onChange={() => setStatus("Active")}
                />{" "}
                <p className="ml-1 text-[#85e758]"> Active</p>
                <input
                  type="radio"
                  name="memberStatus"
                  value="InActive"
                  className="ml-3"
                  checked={status === "InActive"}
                  onChange={() => setStatus("InActive")}
                />{" "}
                <p className="ml-1 text-[#ff1010d9]">InActive</p>
                <input
                  type="radio"
                  name="memberStatus"
                  value="comingSoon"
                  className="ml-3"
                  checked={status === "comingSoon"}
                  onChange={() => setStatus("comingSoon")}
                />{" "}
                <p className="ml-1 text-[#5521B5]">Coming Soon</p>
              </div>

              {/* Add other fields for updating user details */}
              <div className="flex flex-col gap-3 w-full justify-center items-center">
                <button
                  className="K2D font-[600] tracking-[1.2px] bg-[#2297a7] text-white w-full rounded-[4px] py-2 border-[2px] border-[#2297a7] hover:bg-[#ffffff] hover:text-[#2297a7]"
                  onClick={(e) => {
                    e.preventDefault();
                    handleUpdateClient(selectedUser);
                  }}
                >
                  Update
                </button>
                <button
                  className="K2D font-[600] tracking-[1.2px] bg-[#333333] text-white w-full rounded-[4px] py-2 border-[2px] border-[#222222] hover:bg-[#ffffff] hover:text-[#222222]"
                  onClick={() => handleCancelUpdate()}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Pagination */}
        <Pagination
          layout="pagination"
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          previousLabel=""
          nextLabel=""
          showIcons
        />

        {/* <div className="flex flex-row gap-2">
          {selectedRowCount > 0 && (
            <div className="text-[0.8rem] font-[600] K2D pt-5">
              {selectedRowCount} Item{selectedRowCount > 1 ? "s" : ""} selected
            </div>
          )}
        </div> */}
      </div>
    </div>
  );
};

export default Panel;
