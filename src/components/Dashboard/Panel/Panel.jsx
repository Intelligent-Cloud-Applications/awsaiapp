import React, { useState, useContext } from "react";
import Context from "../../../context/Context";
import { Link } from 'react-router-dom';
import { API } from "aws-amplify";
import Swal from 'sweetalert2';
import Pagination from "@mui/material/Pagination";
import Bworkz from "../../../utils/Assets/Dashboard/images/SVG/Bworkz.svg";
import SearchIcon from "../../../utils/Assets/Dashboard/images/SVG/Search.svg";
import Arrow from "../../../utils/Assets/Dashboard/images/SVG/EnterArrow.svg";
import personIcon from '../../../utils/Assets/Dashboard/images/SVG/ProfilEdit.svg';
import AdminPic from '../../../utils/Assets/Dashboard/images/PNG/Adminuser.png';
import Select from '../../../utils/Assets/Dashboard/images/SVG/Thunder.svg';
import Add from '../../../utils/Assets/Dashboard/images/SVG/Add-Client.svg';
// import CSV from '../../../utils/Assets/Dashboard/images/SVG/CSV.svg';
import Selections from '../../../utils/Assets/Dashboard/images/SVG/Selections.svg';
// import Filter from '../../../utils/Assets/Dashboard/images/SVG/Filter.svg';
import Update from '../../../utils/Assets/Dashboard/images/SVG/Update.svg';
import "./Panel.css";

const Panel = () => {
  const itemsPerPage = 6;
  const [status, setStatus] = useState();
  const [memberCount, setMemberCount] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRow, setSelectedRow] = useState([]);
  // eslint-disable-next-line
  const [isMemberList, setisMemberList] = useState("");
  const { clients, util } = useContext(Context);
  const clientsData = Object.entries(clients.data);
  console.log(clientsData)
  const [isUserAdd, setIsUserAdd] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [Country, setCountry] = useState("")
  const [TotalIncome, setTotalIncome] = useState("")
  const [TotalAttendance, setTotalAttendance] = useState("")
  const [TotalLeads, setTotalLeads] = useState("")
  // eslint-disable-next-line
  const [Revenue, setRevenue] = useState("");
  // eslint-disable-next-line
  const [userCheck, setUserCheck] = useState(0);
  const [JoiningDate, setJoiningDate] = useState("")
  const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const showDetailForm = (institution) => {
    const userDetail = clientsData.find(([key, client]) => client.institution === institution);
    setSelectedUser(userDetail);
    setName(userDetail[1].institution);
    setEmail(userDetail[1].emailId);
    setCountry(userDetail[1].country)
    setPhoneNumber(userDetail[1].phoneNumber);
    setTotalLeads(userDetail[1].recentMonthLeads)
    setTotalAttendance(userDetail[1].recentMonthAttendance)
    setTotalIncome(userDetail[1].recentMonthIncome)
    setMemberCount(userDetail[1].recentMonthMembers)
    setStatus(userDetail[1].status)
    setCountry(userDetail[1].country)
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
      const matches =
        client.institution.toLowerCase().includes(query) ||
        client.emailId.toLowerCase().includes(query) ||
        client.phoneNumber.toLowerCase().includes(query) ||
        client.country.toLowerCase().includes(query) ||
        formatEpochToReadableDate(client.joiningDate).includes(query);
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
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }


  const handlePersonIconClick = (institution) => {
    setisMemberList(institution);
  };

  const toggleAddUserForm = () => {
    setIsUserAdd(!isUserAdd);
  };

  // Function to add a new client
  const handleAddClient = async (e) => {
    e.preventDefault()
    try {
      const apiName = 'clients';
      const path = '/admin/create-clients';
      const myInit = {
        body: {
          institution: name,
          emailId: email,
          phoneNumber: phoneNumber,
          country: Country,
          JoiningDate: JoiningDate,
          status: status
        },
      };
      const response = await API.post(apiName, path, myInit);
      Swal.fire({
        icon: 'success',
        title: 'User Added',
      });
      clients.onReload();
      console.log("Client added successfully:", response);
      setName("");
      setEmail("");
      setPhoneNumber("");
      setCountry("");
      setRevenue("");
      setJoiningDate("");
      setStatus("")
      toggleAddUserForm();
      util.setLoader(false);

    } catch (error) {
      console.error("Error adding client:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while creating the user.',
      });
      util.setLoader(false);
    }
  };



  const handleUpdateClient = async (e) => {
    setIsUpdateFormVisible(true);
    try {
      const apiName = 'clients';
      const path = '/admin/update-clients';
      const myInit = {
        body: {
          // cognitoId: selectedUser[1].cognitoId,
          institution: name,
          emailId: email,
          phoneNumber: phoneNumber,
          country: Country,
          status: status
        },
      };
      console.log("my init", myInit);
      const response = await API.put(apiName, path, myInit);
      Swal.fire({
        icon: 'success',
        title: 'User Updated',
      });
      clients.onReload();
      console.log("Client updated successfully:", response);
      setIsUpdateFormVisible(false);
      setSelectedUser(null);
      setName("");
      setEmail("");
      setPhoneNumber("");
      setCountry("")
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while updating the user.',
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
    const userToUpdate = clientsData.find(([key, client]) => client.institution === institution);
    setSelectedUser(userToUpdate);
    setName(userToUpdate[1].institution);
    setEmail(userToUpdate[1].emailId);
    setPhoneNumber(userToUpdate[1].phoneNumber);
    setMemberCount(userToUpdate[1].memberCount)
    setStatus(userToUpdate[1].status)
    setCountry(userToUpdate[1].country)
    setIsUpdateFormVisible(true);
  };

  return (
    <div className="w-[85vw] flex flex-col items-center pt-6 gap-10 mx-[4rem] max1050:mr-[8rem]">
      <div
        className={`w-[90%] rounded-3xl p-3 `}
      >
        <div className="flex flex-row justify-between max850:justify-end pb-2">
          <h1 className="text-[1.4rem] K2D font-[600] pl-5 drop  max850:hidden">Welcome, Boss👋</h1>
          <div className="relative">
            <img src={AdminPic} alt="" />
            <div className="absolute w-[9px] h-[8px] top-[0.45rem] right-[-0.3rem] bg-black rounded-[4px]" />
          </div>
        </div>
        <div className=" w-[102%] bg-[#96969680] h-[0.095rem] mb-2 max850:hidden"></div>

        <h2 className=" w-[22rem] pl-5 text-[2.3125rem] K2D mb-[-1rem] font-[600] max850:text-[2rem] moveRight max850:mt-[-3rem] max850:ml-[-2.5rem] ">
          Clients Panel
        </h2>

        <div className="flex flex-row justify-evenly ml-[2.5rem] mt-[1rem]  max850:flex-col max850:justify-center max850:items-center">
          {/* searchBar */}
          <div className="flex justify-center items-center max850:w-[80vw]">
            <div className="flex w-[28.25rem] border-2 border-solid border-[#000] border-opacity-20 rounded-[0.1875rem] p-[0.1rem] mb-8 mt-6 max850:mb-4 ">
              <img className="w-[1.9rem] h-[1.9rem] opacity-60 ml-2" src={SearchIcon} alt="" />
              <input
                className="flex-1 outline-none rounded-md K2D text-[#000] text-[0.9rem] tracking-[1px] font-[600] max600:text-[0.8rem]"
                type="text"
                placeholder="Search “Name, Email, Number”"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <img className="w-[1rem] h-[1.5rem] mt-1 mr-[0.8rem] opacity-50" src={Arrow} alt="" />
            </div>
          </div>

          {/* functionalities */}
          <div className=" relative border border-black min-w-[9rem] rounded-[1.3125rem] h-8 mt-[1.56rem] ml-[4rem] bg-white max850:mt-0 max850:mb-6 max600:ml-[2rem]">
            <div className="flex flex-row justify-evenly gap-3 p-[0.3rem] px-5">
              {/* <button><img className="w-[1.2rem]" src={CSV} alt="" /></button> */}
              <button onClick={() => setIsUserAdd(true)}><img className="w-[1rem]" src={Add} alt="" /></button>
              {/* <button><img className="w-[1.2rem]" src={Filter} alt="" /></button> */}
              <button><img className="w-[1.1rem]" src={Selections} alt="" /></button>
            </div>
            <div className=" absolute right-[4px] bottom-[-7px] border border-[#989898b8] w-[9rem] rounded-[1.3125rem] h-8 mt-6 z-[-1]"></div>
          </div>
        </div>

        {/* form of creating new client */}
        {isUserAdd && (
          <div className=" absolute top-[21%] flex w-[78vw] h-[70vh] bg-[#ffffff60] backdrop-blur-sm z-[1] max1050:w-[85vw]">
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
                className="bg-[#f0f0f0] text-[#000] K2D px-4 py-5 rounded-[6px] w-full focus:border-opacity-20  "
                type="date"
                value={JoiningDate}
                onChange={(e) => {
                  setJoiningDate(e.target.value);
                }}
              />
              <div className="flex mt-[-1.5rem] mb-[-1rem] ml-[-4rem]">
                <label>Status:</label>
                <input
                  type="radio"
                  name="memberStatus"
                  value="Active"
                  className="ml-3"
                  checked={status === "Active"}
                  onChange={() => setStatus("Active")}
                />{" "}
                <p className="ml-1"> Active</p>
                <input
                  type="radio"
                  name="memberStatus"
                  value="InActive"
                  className="ml-3"
                  checked={status === "InActive"}
                  onChange={() => setStatus("InActive")}
                />{" "}
                <p className="ml-1">InActive</p>
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
        <div className=" w-[75vw] items-center relative text-[0.9rem] border-2 border-solid border-[#757575] gap-[0] mb-2 max1050:hidden">
          <div className="absolute w-[8px] h-[8px] top-[0.45rem] left-3 bg-black rounded-[4px]" />
          <div className="flex flex-row justify-between">
            <div className=" font-[700] pl-[5rem] ">Company(Owner's detail)</div>
            <div className="font-[700] max600:hidden">Country</div>
            <div className="font-[700]">Status</div>
            <div className="font-[700] max600:hidden ">Revenue</div>
            <div className="flex justify-between w-[17rem] max1300:w-[13rem]">
              <div className="font-[700]">Members</div>
              <div className="font-[700]">Attendance</div>
              <div className="font-[700] mr-[-3rem] max1300:hidden">Leads</div>
            </div>
            <div></div>
          </div>
          <div className="absolute w-[8px] h-[8px] top-[0.45rem] right-3 bg-black rounded-[4px]" />
        </div>
        <div className=" w-[75vw] bg-[#757575] h-[0.095rem] mb-4 max1050:w-[83vw] max850:hidden"></div>

        <div className="w-[76vw] min-h-[45vh] relative overflow-y-auto max-h-[48vh] scroll-container ml-[-0.5rem] pl-[7px] max1050:w-[90vw]">
          {clientsToDisplay.map(([key, client], index) => (
            <div
              key={client.institution}
              onClick={() => {
                setisMemberList(clients.institution);
              }}
              className={`w-[75vw] mb-3 p-2 border-2 border-solid rounded-[0.5rem] item-center relative max1050:w-[83vw] ${isRowSelected(client.institution)
                ? "my-2 border-[#30AFBC] transform scale-y-[1.18] transition-transform duration-500 ease-in-out"
                : "border-[#a2a2a280]"
                }`}
              style={{
                margin: isRowSelected(client.institution) ? "1rem 0" : "0.5rem 0",
                boxShadow: isRowSelected(client.institution)
                  ? "0px -7px 9px rgba(0, 0, 0, 0.2), 0px 7px 9px rgba(0, 0, 0, 0.2)"
                  : "none",
              }}
            >
              {/* checkbox */}
              <label className="relative">
                <input
                  type="checkbox"
                  className="hidden"
                  onChange={() => handleCheckboxChange(client.institution)}
                  checked={isRowSelected(client.institution)}
                />
                <div className="absolute mt-5 w-[1rem] h-[1rem] border-2 border-[#757575] cursor-pointer">
                  {isRowSelected(client.institution) && (
                    <img
                      src={Select}
                      alt="Selected"
                      className="w-full h-full"
                    />
                  )}
                </div>
              </label>

              <Link to={`/MonthlyReport?institution=${client.institution} `}>
                <div className="absolute right-2 mt-5">
                  <img
                    src={personIcon}
                    alt=""
                    className="cursor-pointer"
                    onClick={() => handlePersonIconClick(client.institution)}
                  />
                </div>
              </Link>

              <div className="flex flex-row K2D items-center">
                <div className=" flex gap-[1rem] pl-[2rem] items-center">
                  <div className="rounded-[50%] overflow-hidden w-[3.7rem] h-[3.4rem]">
                    <img src={Bworkz} alt="Avishek" className="w-full h-full object-cover" />
                  </div>
                  <div className="grid grid-cols-12 items-center w-[55vw]">
                    <div className="col-span-3 flex flex-col max600:w-[10rem]">
                      <div className="font-[900] email-hover cursor-pointer">
                        {client.institution}
                      </div>
                      <div className="overflow-auto text-[0.8rem] font-[600] email-hover cursor-pointer">{client.emailId}</div>
                      <div className="overflow-auto text-[0.8rem] font-[600]">{client.phoneNumber}</div>
                    </div>
                    <div className="col-span-3 ml-[2rem] font-semibold text-sm max600:hidden">{client.country}</div>
                    <div className="col-span-2 ml-[-4rem] relative max1008:hidden">
                      <div className={`border-2 flex flex-row gap-[0.5rem] text-center rounded-[1.5rem] w-[6rem] pl-2 K2D ${client.status === "Active" ? "border-[#99EF72] text-[#99EF72]" : "border-[#FF4343AB] text-[#FF4343AB]"}`}>
                        <div className={`w-3 h-3 mt-[0.4rem] ${client.status === "Active" ? "bg-[#99EF72]" : "bg-[#FF4343AB]"} rounded-full transform K2D`}></div>
                        <div>{client.status === "Active" ? "Active" : "Inactive"}</div>
                      </div>
                    </div>
                    <div className="col-span-3 ml-[-1rem] font-semibold text-sm max850:ml-[1rem] max600:hidden">
                      {client.country === 'USA' ? `$${client.recentMonthIncome}` : `₹${client.recentMonthIncome}`}
                    </div>
                    <div className="flex flex-row justify-between w-[16vw]">
                      <div className="ml-[-4rem] relative font-semibold text-sm max850:ml-[1rem] max600:hidden">{client.recentMonthMembers}</div>
                      <div className="w-[10rem] ml-[4rem] text-center font-semibold text-sm max600:hidden">{client.recentMonthAttendance}</div>
                      <div className="w-[10rem] font-semibold text-center text-sm max1300:hidden">{client.recentMonthLeads}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute right-0 bottom-[1rem] bg-white">
                {isRowSelected(client.institution) && (
                  <img
                    className="w-[3rem] cursor-pointer opacity-[90%] max600:w-[3rem] "
                    src={Update}
                    alt=""
                    onClick={() => showUpdateForm(client.institution)}
                  />
                )}</div>
            </div>

          ))}
        </div>
        {clientsToDisplay.map(([key, client], index) => (
          <div key={client.institution}>
            {isRowSelected(client.institution) && (
              <p className="cursor-pointer w-[10rem] K2D text-[#13838d] font-[600] ml-[11rem] min600:hidden" onClick={() => showDetailForm(client.institution)}>-- See Details --</p>
            )}
          </div>
        ))}

        {showDetails && selectedUser && (
          <div class=" mt-[-38rem] rounded-lg right-[4%] w-[22rem] h-[40rem] relative bg-white" style={{
            boxShadow: "0 0 20px rgba(0, 0, 0, 0.3)",
          }}>
            <div class="w-[20rem] h-[595px] relative bg-white rounded-[18px] ">
              <div class="w-[20rem] h-[488px] left-[41px] top-[69px] absolute">
                <div class="w-[79px] h-7 left-[-21px] top-0 absolute text-black text-base font-semibold font-['Inter'] tracking-wide">Email Id:</div>
                <div class="w-[129px] h-[35px] left-[68px] top-0 absolute text-zinc-800 text-[13px] font-semibold font-['Inter'] tracking-tight">{email}</div>
                <div class="w-[79px] h-[27px] left-[-21px] top-[67px] absolute text-black text-base font-semibold font-['Inter'] tracking-wide">Country:</div>
                <div class="w-[134px] h-[35px] left-[68px] top-[68px] absolute text-zinc-800 text-[13px] font-semibold font-['Inter'] tracking-tight">{Country}</div>
                <div class="w-[79px] h-7 left-[-21px] top-[133px] absolute text-black text-base font-semibold font-['Inter'] tracking-wide">Status:</div>
                <div class="w-[120px] h-[34px] left-[68px] top-[135px] absolute text-zinc-800 text-[13px] font-semibold font-['Inter'] tracking-tight">{status}</div>
                <div class="w-[89px] h-[29px] left-[-21px] top-[198px] absolute text-black text-base font-semibold font-['Inter'] tracking-wide">Revenue:</div>
                <div class="w-[169px] h-[35px] left-[68px] top-[198px] absolute text-zinc-800 text-[13px] font-semibold font-['Inter'] tracking-tight">{TotalIncome}</div>
                <div class="w-[89px] h-7 left-[-21px] top-[265px] absolute text-black text-base font-semibold font-['Inter'] tracking-wide">Members:</div>
                <div class="w-[185px] h-[34px] left-[68px] top-[266px] absolute text-zinc-800 text-[13px] font-semibold font-['Inter'] tracking-tight">{memberCount}</div>
                <div class="w-[114px] h-[27px] left-[-21px] top-[332px] absolute text-black text-base font-semibold font-['Inter'] tracking-wide">Attendance:</div>
                <div class="w-[204px] h-[34px] left-[86px] top-[334px] absolute text-zinc-800 text-[13px] font-semibold font-['Inter'] tracking-tight">{TotalAttendance}</div>
                <div class="w-[66px] h-7 left-[-21px] top-[398px] absolute text-black text-base font-semibold font-['Inter'] tracking-wide">Leads:</div>
                <div class="w-[158px] h-[35px] left-[68px] top-[399px] absolute text-zinc-800 text-[13px] font-semibold font-['Inter'] tracking-tight">{TotalLeads}</div>
              </div>
              <div class="w-[89px] h-[17px] left-[121px] top-[13px] absolute text-black text-[23px] font-semibold font-['Inter'] tracking-wide">{name}</div>
            </div>
            <div><button className="absolute right-0 bottom-0 rounded-b-lg bg-[#13838d] text-white p-3 w-[22rem]" onClick={() => setShowDetails(false)}>Close</button></div>
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
              <div className="flex mt-[-1.5rem] mb-[-1rem] ml-[-4rem]">
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
              </div>

              {/* Add other fields for updating user details */}
              <div className="flex flex-col gap-3 w-full justify-center items-center">
                <button
                  className="K2D font-[600] tracking-[1.2px] bg-[#2297a7] text-white w-full rounded-[4px] py-2 border-[2px] border-[#2297a7] hover:bg-[#ffffff] hover:text-[#2297a7]"
                  onClick={(e) => {
                    e.preventDefault()
                    handleUpdateClient(selectedUser)
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
              {selectedRowCount} Item{selectedRowCount > 1 ? 's' : ''} selected
            </div>
          )}

          {/* Pagination */}
          <div className="flex justify-start pt-4 ml-[2rem]">
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(event, value) => setCurrentPage(value)} className="custom-pagination"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Panel;
