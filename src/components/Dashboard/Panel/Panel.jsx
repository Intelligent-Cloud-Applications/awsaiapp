import React, { useState, useContext } from "react";
import Context from "../../../context/Context";
import { Link, useLocation } from "react-router-dom";
import { API } from "aws-amplify";
import Swal from "sweetalert2";
import Pagination from "@mui/material/Pagination";
// import Bworkz from "../../../utils/Assets/Dashboard/images/SVG/Bworkz.svg";
import SearchIcon from "../../../utils/Assets/Dashboard/images/SVG/Search.svg";
// import Arrow from "../../../utils/Assets/Dashboard/images/SVG/EnterArrow.svg";
// import personIcon from "../../../utils/Assets/Dashboard/images/SVG/ProfilEdit.svg";
// import AdminPic from '../../../utils/Assets/Dashboard/images/PNG/Adminuser.png';
import Select from "../../../utils/Assets/Dashboard/images/SVG/Thunder.svg";
import Add from "../../../utils/Assets/Dashboard/images/SVG/Add-Client.svg";
// import CSV from '../../../utils/Assets/Dashboard/images/SVG/CSV.svg';
// import Selections from "../../../utils/Assets/Dashboard/images/SVG/Selections.svg";
// import Filter from '../../../utils/Assets/Dashboard/images/SVG/Filter.svg';
import { FaChevronRight } from "react-icons/fa";
import Update from "../../../utils/Assets/Dashboard/images/SVG/Update.svg";
import { Table, Badge } from "flowbite-react";
import "./Panel.css";
import { useEffect } from "react";

const Panel = () => {
  const itemsPerPage = 6;
  const [status, setStatus] = useState();
  const [memberCount, setMemberCount] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRow, setSelectedRow] = useState([]);
  // eslint-disable-next-line
  const [isMonthlyReport, setisMonthlyReport] = useState("");
  const { clients, util, userData, setUserData } = useContext(Context);
  const clientsData = Object.entries(clients.data);
  console.log(clientsData);
  console.log(userData);
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

  useEffect(() => {
    const handleResize = () => {
      const max670Hidden = window.innerWidth <= 670;
      const max600Hidden = window.innerWidth <= 600;
      const max800Hidden = window.innerWidth <= 800;
      const max1008Hidden = window.innerWidth <= 1008;

      setIsMoreVisible(max670Hidden || max600Hidden || max800Hidden || max1008Hidden);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const showDetailForm = (institution) => {
    const userDetail = clientsData.find(
      ([key, client]) => client.institution === institution
    );
    setSelectedUser(userDetail);
    setName(userDetail[1].institution);
    setEmail(userDetail[1].emailId);
    setCountry(userDetail[1].country);
    setPhoneNumber(userDetail[1].phoneNumber);
    setTotalLeads(userDetail[1].recentMonthLeads);
    setTotalAttendance(userDetail[1].recentMonthAttendance);
    setTotalIncome(userDetail[1].recentMonthIncome);
    setMemberCount(userDetail[1].recentMonthMembers);
    setStatus(userDetail[1].status);
    setCountry(userDetail[1].country);
    setJoiningDate(userDetail[1].JoiningDate);
    setShowDetails(true);
  };

  const handleCheckboxChange = (institution) => {
    if (selectedRow.includes(institution)) {
      setSelectedRow(selectedRow.filter((id) => id !== institution));
    } else {
      setSelectedRow([...selectedRow, institution]);
    }
  };

  const isRowSelected = (institution) => {
    return selectedRow.includes(institution);
  };

  const filterClients = () => {
    if (!searchQuery) {
      return clientsData;
    }

    const query = searchQuery.toLowerCase();
    const filtered = clientsData?.filter(([key, client]) => {
      const institution = client.institution
        ? client.institution.toLowerCase()
        : "";
      const emailId = client.emailId ? client.emailId.toLowerCase() : "";

      const matches = institution.includes(query) || emailId.includes(query);

      return matches;
    });

    console.log("Filtered Clients:", filtered);
    return filtered;
  };

  const filteredClients = filterClients();
  console.log("Type = ", typeof filteredClients);
  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredClients.length);
  const clientsToDisplay = filteredClients.slice(startIndex, endIndex);

  const selectedRowCount = selectedRow.length;

  function formatEpochToReadableDate(epochDate) {
    const date = new Date(epochDate);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }
  const location = useLocation();
  console.log("path", location.pathname);
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

  const showUpdateForm = (institution) => {
    const userToUpdate = clientsData.find(
      ([key, client]) => client.institution === institution
    );
    setSelectedUser(userToUpdate);
    setName(userToUpdate[1].institution);
    setEmail(userToUpdate[1].emailId);
    setPhoneNumber(userToUpdate[1].phoneNumber);
    setMemberCount(userToUpdate[1].memberCount);
    setStatus(userToUpdate[1].status);
    setCountry(userToUpdate[1].country);
    setIsUpdateFormVisible(true);
  };
  const getColor = (status) => {
    if (status === "Active") {
      return "success";
    } else if (status === "InActive") {
      return "failure";
    } else {
      return "indigo";
    }
  };

  const handleMoreClick = () => {
    setShowHiddenContent(!showHiddenContent);
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center mt-[-5rem] mx-[4rem]  max1300:mt-0 shadow-xl rounded-lg bg-[#e6e4e4]">
      <div className="w-[90%] mt-4 rounded-md flex flex-col justify-center items-center bg-white py-3">
      <div className="flex flex-row justify-between w-[95%] items-center  mt-[1rem] my-10 md:my-0 max850:flex-col max850:justify-center max850:items-center">
        {/* Search Bar */}
        <div className="">
          <div className="flex w-full items-center border-2 border-solid border-gray-300 rounded- p-1 mb-8 mt-6 max850:mb-4 shadow-md bg-[#F9FAFB]">
            <img
              className="w-6 h-8 opacity-60 ml-2"
              src={SearchIcon}
              alt="Search Icon"
            />
            <input
              className="w-64 flex-1 outline-none rounded-md px-2 py-1 K2D text-gray-700 text-[0.9rem] tracking-wide font-semibold max600:text-[0.8rem] border-none bg-transparent"
              type="text"
              placeholder="Search “Name, Email, Number”"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Functionalities */}
        <div className=" flex flex-col md:flex-row space-y-2 md:space-x-2 justify-between items-center">
          <div className="flex flex-row justify-center items-center gap-3 px-5 py-1 bg-white rounded-full h-14 ">
            <button onClick={() => setIsUserAdd(true)}>
              <img className="w-5 h-5" src={Add} alt="Add" />
            </button>
            {/* <button>
              <img className="w-4 h-4" src={Selections} alt="Selections" />
            </button> */}
          </div>
          <div className="absolute right-[4px] bottom-[-7px] border border-gray-300 w-[9rem] rounded-2xl h-8 mt-6 z-[-1]"></div>
        {/* WebDevelopment Form Link */}
        <div className="">
          <Link to="/template">
            <button className="flex items-center gap-2 p-2 bg-[#48d6e0] text-white font-semibold text-sm rounded-md hover:bg-[#3ae1f7] focus:outline-none focus:ring-2 focus:ring-[#6cebff]">
              <p>Web Development</p>
            </button>
          </Link>
        </div>
        </div>
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
      <div className="overflow-x-auto w-full mb-4">
        <Table className="w-full text-sm text-left text-gray-500">
          <Table.Head className="text-xs text-[#6B7280] bg-[#F9FAFB]">
            <Table.HeadCell></Table.HeadCell>
            <Table.HeadCell className=" uppercase font-semibold text-[14px]">
              Company Name
            </Table.HeadCell>
            <Table.HeadCell className="max670:hidden uppercase font-semibold text-[14px]">
              Country
            </Table.HeadCell>
            <Table.HeadCell className="max600:hidden uppercase font-semibold text-[14px]">
              Status
            </Table.HeadCell>
            <Table.HeadCell className="max600:hidden uppercase font-semibold text-[14px]">
              Revenue
            </Table.HeadCell>
            <Table.HeadCell className="max1008:hidden uppercase font-semibold text-[14px]">
              Members
            </Table.HeadCell>
            <Table.HeadCell className={`${showHiddenContent ? '' : 'max1008:hidden'} uppercase font-semibold text-[14px]`}>
              Attendance
            </Table.HeadCell>
            <Table.HeadCell className={`${showHiddenContent ? '' : 'max1008:hidden'} uppercase font-semibold text-[14px]`}>
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
                className="clients-data-table border-b"
                onClick={() => setisMonthlyReport(client.institution)}
              >
                {/* Checkbox */}
                <Table.Cell className="px-4 py-2">
                  <label className="relative">
                    <input
                      type="checkbox"
                      className="hidden"
                      onChange={() => handleCheckboxChange(client.institution)}
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
                </Table.Cell>
                <Table.Cell className="px-4 py-2 font-semibold text-gray-900">
                  <Link
                    to={`/Dashboard?institution=${client.institution}`}
                    onClick={() => handlePersonIconClick(client.institution)}
                  >
                    <div className="email-hover uppercase font-semibold text-[#11192B]">
                      {client.institution}
                    </div>
                  </Link>
                </Table.Cell>

                <Table.Cell className="px-4 py-2 font-semibold text-[#9095A0] max670:hidden pl-12">
                  {client.country}
                </Table.Cell>

                <Table.Cell className="max600:hidden px-4 py-2 font-semibold text-gray-900">
                  <Badge color={getColor(client.status)} size="sm" className="flex justify-center items-center">
                    {client.status}
                  </Badge>
                </Table.Cell>

                <Table.Cell className="px-4 py-2 font-semibold text-gray-900 max600:hidden">
                  {client.country === "USA"
                    ? `$${client.recentMonthIncome}`
                    : `₹${client.recentMonthIncome}`}
                </Table.Cell>

                <Table.Cell className="max1008:hidden px-4 py-2 font-semibold text-gray-900">
                  {client.recentMonthMembers}
                </Table.Cell>

                <Table.Cell className={`${showHiddenContent ? '' : 'max1008:hidden'} px-4 py-2 font-semibold text-gray-900`}>
                  {client.recentMonthAttendance}
                </Table.Cell>
                <div className={`${showHiddenContent ? '' : 'max1008:hidden'} h-full p-2 flex space-x-2 justify- items-center`}>
                  <Table.Cell className="px-4 py-2 font-semibold text-gray-900 ">
                    {client.recentMonthLeads}
                  </Table.Cell>

                  <Table.Cell className="px-4 py-2">
                    <Link to={`/Dashboard?institution=${client.institution}`}>
                      <img
                        src={
                          isRowSelected(client.institution)
                            ? Update
                             : ""//{personIcon}
                        }
                        alt=""
                        className={
                          isRowSelected(client.institution)
                            ? `scale-150 w-12 mix-blend-color-multiply bg-transparent`
                            : ""//`w-8 cursor-pointer opacity-90`
                        }
                        onClick={
                          isRowSelected(client.institution)
                            ? () => showUpdateForm(client.institution)
                            : "" //() => handlePersonIconClick(client.institution)
                        }
                      />
                    </Link>
                  </Table.Cell>
                </div>
                  <Table.Cell className="more" onClick={handleMoreClick}>{isMoreVisible ? <FaChevronRight /> : ''}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

      {clientsToDisplay.map(([key, client], index) => (
        <div key={client.institution}>
          {isRowSelected(client.institution) && (
            <p
              className="cursor-pointer w-[10rem] K2D text-[#13838d] font-[600] ml-[11rem] min600:hidden"
              onClick={() => showDetailForm(client.institution)}
            >
              -- See Details --
            </p>
          )}
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

      <div className="flex flex-row gap-2">
        {selectedRowCount > 0 && (
          <div className="text-[0.8rem] font-[600] K2D pt-5">
            {selectedRowCount} Item{selectedRowCount > 1 ? "s" : ""} selected
          </div>
        )}

        {/* Pagination */}
        {itemsPerPage > 7 && (
          <div className="flex justify-start pt-4 ml-[2rem]">
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(event, value) => setCurrentPage(value)}
              className="custom-pagination"
            />
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default Panel;
