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
import { Table, Badge } from "flowbite-react";
import "./Panel.css";
import { useEffect } from "react";
import { Pagination } from "flowbite-react";
import { Select } from "flowbite-react";
import Index from "../MemberList/Index";
const Panel = () => {
  const itemsPerPage = 5;
  const [status, setStatus] = useState();
  const [memberCount, setMemberCount] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  // const [selectedRow, setSelectedRow] = useState([]);
  // eslint-disable-next-line
  const [isMonthlyReport, setisMonthlyReport] = useState("");
  const { clients, util, userData, setUserData } = useContext(Context);
  const clientsData = Object.entries(clients.data);
  // const [isUserAdd, setIsUserAdd] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [Country, setCountry] = useState("");
  const [TotalIncome, setTotalIncome] = useState("");
  const [TotalAttendance, setTotalAttendance] = useState("");
  const [TotalLeads, setTotalLeads] = useState("");
  // eslint-disable-next-line
  const [Revenue, setRevenue] = useState("");
  const [userCheck, setUserCheck] = useState(0);
  // eslint-disable-next-line
  const [JoiningDate, setJoiningDate] = useState("");
  const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [isMoreVisible, setIsMoreVisible] = useState(false);
  const [showHiddenContent, setShowHiddenContent] = useState(false);
  const [instituteTypes, setInstituteTypes] = useState([]);
  const [instituteType, setInstituteType] = useState("");
  const Ctx = useContext(Context);
  const type = ["Dance Studio", "Dentist", "Cafe"];

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

  // const navigate = useNavigate();
  const filterClients = useCallback(() => {
    if (!searchQuery) {
      return clientsData?.filter(([key, client]) => client.isFormFilled === true) || []; // Ensure that it returns an array
    }

    const query = searchQuery.toLowerCase();

    console.log("Search Query:", query);
    console.log("Clients Data:", clientsData);

    const filtered = clientsData?.filter(([key, client]) => {
      const institution =
        typeof client.institutionid === "string"
          ? client.institutionid.toLowerCase()
          : ""; // Default to an empty string if institution is not a valid string

      return institution.includes(query);
    });

    console.log("Filtered Clients:", filtered);
    return filtered || []; // Ensure that it always returns an array
  }, [searchQuery, clientsData]);

  const filteredClients = useMemo(() => filterClients(), [filterClients]);

  useEffect(() => {
    if (!Array.isArray(filteredClients)) {
      console.error("filteredClients is not an array:", filteredClients);
      return;
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(
      startIndex + itemsPerPage,
      filteredClients.length
    );

    const clientsToDisplay = filteredClients.slice(startIndex, endIndex);

    const newInstituteTypes = Array.from(
      new Set(clientsToDisplay.map(() => userData.institutionType))
    );

    setInstituteTypes((prevTypes) => {
      const combinedTypes = [...prevTypes, ...newInstituteTypes];
      const uniqueCombinedTypes = Array.from(new Set(combinedTypes));

      if (uniqueCombinedTypes.length !== prevTypes.length) {
        return uniqueCombinedTypes;
      } else {
        return prevTypes;
      }
    });
  }, [currentPage, itemsPerPage, filteredClients, userData.institutionType]);

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

  const useDataForSales = Ctx.saleData || [];

  const getUsernameByCognitoId = (cognitoId) => {
    console.log("cognitoid:", cognitoId);
    console.log("data:", useDataForSales.userName);
    // Normalize the input ID
    const trimmedInputId = String(cognitoId).trim();

    // Find the user with matching Cognito ID
    const user = useDataForSales.find((user) => {
      return user.cognitoId && String(user.cognitoId).trim() === trimmedInputId;
    });
    console.log("user Name:", user);
    return user ? user.userName : "Unknown"; // Return userName if found, otherwise 'Unknown'
  };

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

  function formatEpochToReadableDate(epochDate) {
    const date = new Date(epochDate);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/dashboard") {
      util.setLoader(true);
      util.setLoader(false);
    }
  });

  // const handlePersonIconClick = (institution) => {
  //   setisMonthlyReport(institution);
  //   const updatedUserData = { ...userData, institutionName: institution };
  //   setUserData(updatedUserData);
  // };

  // const toggleAddUserForm = () => {
  //   setIsUserAdd(!isUserAdd);
  // };

  // Function to add a new client
  // const handleAddClient = async (e) => {
  //   e.preventDefault();
  //   try {
  //     util.setLoader(true);
  //     const apiName = "clients";
  //     const path = "/admin/create-clients";
  //     const myInit = {
  //       body: {
  //         institution: name,
  //         emailId: email,
  //         phoneNumber: phoneNumber,
  //         country: Country,
  //         JoiningDate: JoiningDate,
  //         status: status,
  //       },
  //     };
  //     const response = await API.post(apiName, path, myInit);
  //     Swal.fire({
  //       icon: "success",
  //       title: "User Added",
  //     });
  //     clients.onReload();
  //     console.log("Client added successfully:", response);
  //     setName("");
  //     setEmail("");
  //     setPhoneNumber("");
  //     setCountry("");
  //     setRevenue("");
  //     setJoiningDate("");
  //     setStatus("");
  //     toggleAddUserForm();
  //     util.setLoader(false);
  //   } catch (error) {
  //     console.error("Error adding client:", error);
  //     Swal.fire({
  //       icon: "error",
  //       title: "Error",
  //       text: "An error occurred while creating the user.",
  //     });
  //     util.setLoader(false);
  //   }
  // };

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

  const getBadgeProps = (web, payment, delivered) => {
    let text, color;

    if (web) {
      if (payment && delivered) {
        text = "Active";
        color = "success"; // Yellow color for Pending status
      } else {
        text = "Pending";
        color = "warning"; // Green color for Active status
      }
    } else {
      text = "InActive";
      color = "failure"; // Red color for InActive status
    }

    return { text, color };
  };

  // Inside your component

  // const handleMoreClick = () => {
  //   setShowHiddenContent(!showHiddenContent);
  // };

  const splitandjoin = (str) => {
    if (typeof str !== "string") {
      return "";
    }
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

  const handleDropdownChange = useCallback(
    async (clientInstitution, status) => {
      const isDelivered = status === "Delivered";
      try {
        let response;
        const body = { institutionId: clientInstitution.institutionid, index: clientInstitution.index, isDelivered };
        if (clientInstitution.institutionType === "Dance Studio") {
          response = await API.put("clients", "/user/updateDelivary", {
            body,
            headers: { "Content-Type": "application/json" },
          });
        } else {
          response = await API.put("clients", "/user/updateDelivaryForDental", {
            body,
            headers: { "Content-Type": "application/json" },
          });
        }
        console.log("API response:", response);
      } catch (error) {
        console.error("Error updating delivery status:", error);
      }
    },
    []
  );
  const [tempInstitution, setTempInstitution] = useState(null); // Store tempInstitution
  const [showMemberList, setShowMemberList] = useState(false);
  const handleInstitutionClick = (client) => {
    // Set the institutionid as tempInstitution and show the MemberList
    const updatedUserData = {
      ...userData,
      tempinstitutionName: client.institutionid,
    };
    setUserData(updatedUserData);
    setTempInstitution(client.institutionid);
    setShowMemberList(true); // Toggle view to MemberList
  };

  const getLinkPath = (instituteType) => {
    switch (instituteType) {
      case "Dance Studio":
        return "/template";
      case "Dentist":
        return "/template2";
      case "Cafe":
        return "/template3"
      default:
        return "";
    }
  };

  return (
    <>
      {!showMemberList ? (
        <div className="w-screen h-screen flex flex-col justify-center items-center mx-[4rem] mt-[40px] shadow-xl rounded-[0] bg-[#e6e4e4] lg:ml-[10%]">
          <ToastContainer />
          <div className="w-[78%] mt-4 rounded-[0] flex flex-col md:flex-row justify-end space-y-4 items-center bg-white py-3 pr-4 shadow-lg lg:space-x-4 lg:space-y-0 upper-section">
            <div className="flex flex-col md:flex-row sm:w-auto space-y-4 sm:space-x-4 justify-center items-center md:items-end">
              <Select
                value={instituteType && splitandjoin(instituteType)}
                onChange={(e) => setInstituteType(e.target.value)}
                className="text-white font-semibold shadow-md border-1 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full sm:w-auto"
              >
                {instituteType === "" && (
                  <option value="" disabled hidden>
                    Type
                  </option>
                )}
                {type.map((type) => (
                  <option
                    key={type}
                    value={type}
                    className="hover:bg-blue-500 hover:text-white transition-all duration-200 ease-in-out rounded-[0]"
                  >
                    {splitandjoin(type)}
                  </option>
                ))}
              </Select>

              <Link
                to={getLinkPath(instituteType)}
                onClick={(e) => {
                  if (instituteType === "") {
                    e.stopPropagation();
                    console.log("Showing toast message"); // Debug line
                    toast.error("Please Select a type of Institution.", {
                      position: "top-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      style: {
                        backgroundColor: "#f8d7da",
                        color: "#721c24",
                      },
                    });
                  }
                }}
                className="hover:no-underline"
              >
                <button className="flex items-center gap-2 p-2 bg-[#48d6e0] font-semibold text-sm rounded-md hover:bg-[#3ae1f7] focus:outline-none focus:ring-2 focus:ring-[#6cebff] transition duration-300 ease-in-out transform hover:scale-105 shadow-md w-full sm:w-auto">
                  <p className="text-white">Create New Institution</p>
                </button>
              </Link>
            </div>
          </div>
          <div className="w-[78%] mt-4 rounded-md flex flex-col justify-center bg-white py-3 flowbite-table">
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
            {/* {isUserAdd && (
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
                        value="Pending"
                        className="ml-3"
                        checked={status === "Pending"}
                        onChange={() => setStatus("Pending")}
                      />
                      <p className="text-[#ff1010d9]">Pending</p>
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
            )} */}

            {/* Headings */}
            <div className="overflow-x-auto w-full mb-4 max-h-[600px] md:max-h-[600px] overflow-y-auto">
              <Table className="w-full text-sm text-left text-gray-500">
                <Table.Head className="text-xs text-[#6B7280] bg-[#F9FAFB]">
                  {/* <Table.HeadCell></Table.HeadCell> */}
                  <Table.HeadCell className="px-6 py-2 text-center text-xs font-medium text-gray-500 uppercase">
                    Institution
                  </Table.HeadCell>
                  <Table.HeadCell className="px-6 py-2 text-center text-xs font-medium text-gray-500 uppercase">
                    Type
                  </Table.HeadCell>
                  <Table.HeadCell className="px-6 py-2 text-center text-xs font-medium text-gray-500 uppercase">
                    Status
                  </Table.HeadCell>
                  <Table.HeadCell className="px-6 py-2 text-center text-xs font-medium text-gray-500 uppercase">
                    Is Delivered
                  </Table.HeadCell>
                  <Table.HeadCell className="px-6 py-2 text-center text-xs font-medium text-gray-500 uppercase">
                    Payment
                  </Table.HeadCell>
                  {/* <Table.HeadCell className=" uppercase font-semibold text-[14px]">
                Revenue
              </Table.HeadCell> */}
                  <Table.HeadCell className="px-6 py-2 text-center text-xs font-medium text-gray-500 uppercase">
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
                      } px-6 py-2 text-center text-xs font-medium text-gray-500 uppercase`}
                  >
                    Created By
                  </Table.HeadCell>
                </Table.Head>

                <Table.Body className="bg-white">
                  {clientsToDisplay.map(([key, client], index) => (
                    <Table.Row
                      key={client.institutionid}
                      className="clients-data-table border-b hover:bg-gray-100 hover:cursor-pointer"
                    >
                      <Table.Cell
                        className="whitespace-nowrap text-sm font-medium text-gray-900 hover:underline text-center bg-white"
                        onClick={(e) => handleRowClick(client.institutionid, e)}
                      >
                        <Link onClick={() => handleInstitutionClick(client)}>
                          <div className="email-hover uppercase font-semibold text-[#11192B]">
                            {client.institutionid}
                          </div>
                        </Link>
                      </Table.Cell>

                      <Table.Cell className="whitespace-nowrap text-sm text-gray-500 text-center bg-white">
                        {splitandjoin(client.institutionType)}
                      </Table.Cell>

                      <Table.Cell className="whitespace-nowrap text-sm text-gray-500 text-center bg-white">
                        {(() => {
                          const { text, color } = getBadgeProps(
                            client.isFormFilled,
                            client.payment,
                            client.isDelivered
                          );
                          return (
                            <Badge
                              color={color}
                              size="sm"
                              className="flex justify-center items-center"
                            >
                              {text}
                            </Badge>
                          );
                        })()}
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap text-sm text-gray-500 text-center bg-white">
                        {client.payment ? (
                          <select
                            value={client.isDelivered ? "Delivered" : "Not Delivered"}
                            onChange={(e) => handleDropdownChange(client, e.target.value)}
                            className="bg-white border border-gray-300 rounded-md p-1 text-gray-900"
                          >
                            <option value="Not Delivered">Not Delivered</option>
                            <option value="Delivered">Delivered</option>
                          </select>
                        ) : (
                          <select
                            value="Not Delivered"
                            disabled
                            className="bg-gray-200 border border-gray-300 rounded-md p-1 text-gray-500"
                          >
                            <option value="Not Delivered">Not Delivered</option>
                          </select>
                        )}
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap text-sm text-gray-500 text-center bg-white">
                        {client.payment ? "Paid" : "Not Paid"}
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap text-sm text-gray-500 text-center bg-white">
                        {client.recentMonthMembers}
                      </Table.Cell>
                      <Table.Cell
                        className={`${showHiddenContent ? "" : "max1008:hidden"
                          } whitespace-nowrap text-sm text-gray-500 text-center bg-white`}
                      >
                        {/* {client.createdBy} */}
                        {client.createdBy
                          ? getUsernameByCognitoId(client.createdBy)
                          : "Unknown"}{" "}
                        {/* Fallback for undefined createdBy */}
                      </Table.Cell>
                      <Link
                        onClick={() => handleInstitutionClick(client)}
                        className="hidden change-page"
                      ></Link>
                      {/* <div
                    className={`${showHiddenContent ? "" : "max1008:hidden"
                      } h-full p-2 flex space-x-2 justify-center items-center lg:justify-start `}
                  >
                    <Table.Cell className="px-2 py-2 font-semibold text-gray-900 text-center">
                      {client.recentMonthLeads}
                    </Table.Cell>
                  </div> */}
                      <Table.Cell
                        className="whitespace-nowrap text-sm text-gray-500 text-center bg-white"
                      // onClick={handleMoreClick}
                      >
                        <Link onClick={() => handleInstitutionClick(client)}>
                          {isMoreVisible ? <FaChevronRight /> : ""}
                        </Link>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>

            {clientsToDisplay.map(([key, client], index) => (
              <div key={client.institutionid}>
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
            <div className="py-2 flex justify-between items-center px-4">
              {/* Dynamic "Showing X-Y of Z" */}
              <div className="text-sm text-gray-600">
                Showing{" "}
                <strong>
                  {startIndex + 1}-{startIndex + clientsToDisplay.length}
                </strong>{" "}
                of <strong>{filteredClients.length}</strong>
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
        </div>
      ) : (
        <Index tempInstitution={tempInstitution} />
      )}
    </>
  );
};

export default Panel;
