import React, { useState, useContext } from "react";
import Context from "../../../context/Context";
import { Link } from 'react-router-dom';
import { API } from "aws-amplify";
import Pagination from "@mui/material/Pagination";
import Bworkz from "../../../utils/Assets/Dashboard/images/SVG/Bworkz.svg";
import SearchIcon from "../../../utils/Assets/Dashboard/images/SVG/Search.svg";
import Arrow from "../../../utils/Assets/Dashboard/images/SVG/EnterArrow.svg";
import personIcon from '../../../utils/Assets/Dashboard/images/SVG/ProfilEdit.svg';
import AdminPic from '../../../utils/Assets/Dashboard/images/PNG/Adminuser.png';
import Select from '../../../utils/Assets/Dashboard/images/SVG/Thunder.svg';
import Add from '../../../utils/Assets/Dashboard/images/SVG/Add-Client.svg';
import CSV from '../../../utils/Assets/Dashboard/images/SVG/CSV.svg';
import Selections from '../../../utils/Assets/Dashboard/images/SVG/Selections.svg';
import Filter from '../../../utils/Assets/Dashboard/images/SVG/Filter.svg';
import "./Panel.css";

const Panel = () => {
  const itemsPerPage = 7;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRow, setSelectedRow] = useState([]);
  // eslint-disable-next-line
  const [isMemberList, setisMemberList] = useState("");
  const { clients, util } = useContext(Context);
  const clientsData = Object.entries(clients.data);
  const [isUserAdd, setIsUserAdd] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [Country, setCountry] = useState("")
  const [cognitoId, setcognitoId] = useState("")
  const [balance, setBalance] = useState("");
  // eslint-disable-next-line
  const [userCheck, setUserCheck] = useState(0);
  const [JoiningDate, setJoiningDate] = useState("")

  // Function to handle checkbox changes
  const handleCheckboxChange = (institution) => {
    if (selectedRow.includes(institution)) {
      setSelectedRow(selectedRow.filter((id) => id !== institution));
    } else {
      setSelectedRow([...selectedRow, institution]);
    }
  };

  // Function to check if a row is selected
  const isRowSelected = (institution) => {
    return selectedRow.includes(institution);
  };

  const filterClients = () => {
    if (!searchQuery) {
      return clientsData;
    }

    const query = searchQuery.toLowerCase();

    const filtered = clientsData?.filter((client) => {
      const matches = (
        client[1].institution.toLowerCase().includes(query) ||
        client[1].emailId.toLowerCase().includes(query) ||
        client[1].phoneNumber.toLowerCase().includes(query)
      );
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
  // eslint-disable-next-line
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
      const path = '/admin/create-client';
      const myInit = {
        body: {
          cognitoId: cognitoId,
          institution: name,
          emailId: email,
          phoneNumber: phoneNumber,
          country: Country,
          balance: balance,
          joiningDate: JoiningDate,
        },
      };
      const response = await API.post(apiName, path, myInit);
      console.log("Client added successfully:", response);
      setName("");
      setEmail("");
      setPhoneNumber("");
      setCountry("");
      setBalance("");
      setJoiningDate("");
      setcognitoId("");
      // Close the form
      toggleAddUserForm();
      util.setLoader(false);

    } catch (error) {
      console.error("Error adding client:", error);
      util.setLoader(false);
    }
  };


  return (
    <div className="w-[85vw] flex flex-col items-center pt-6 gap-10 mx-[4rem] max1050:mr-[8rem]">
      <div
        className={`w-[90%] mt-[1rem] rounded-3xl p-3 `}
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

        <div className="flex flex-row justify-evenly ml-[2.5rem] mt-[1rem] max850:mt-[4rem] max850:flex-col max850:justify-center max850:items-center">
          {/* searchBar */}
          <div className="flex justify-center items-center max850:w-[80vw]">
            <div className="flex w-[28.25rem] border-2 border-solid border-[#000] border-opacity-20 rounded-[0.1875rem] p-[0.1rem] mb-8 mt-6 max850:mb-4 ">
              <img className="w-[1.9rem] h-[1.9rem] opacity-60 ml-2" src={SearchIcon} alt="" />
              <input
                className="flex-1 outline-none rounded-md K2D text-[#000] text-[0.9rem] tracking-[1px] font-[600] max1050:text-[1vw] "
                type="text"
                placeholder={window.innerWidth >= 600 ? "Search “Name, Email, Number”" : ""}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <img className="w-[1rem] h-[1.5rem] mt-1 mr-[0.8rem] opacity-50" src={Arrow} alt="" />
            </div>
          </div>

          {/* functionalities */}
          <div className=" relative border border-black w-[9rem] rounded-[1.3125rem] h-8 mt-[1.56rem] ml-[4rem] bg-white max850:mt-0 max850:mb-6">
            <div className="flex flex-row justify-center gap-3 p-[0.3rem] px-5">
              <button><img className="w-[1.2rem]" src={CSV} alt="" /></button>
              <button onClick={() => setIsUserAdd(true)}><img className="w-[1rem]" src={Add} alt="" /></button>
              <button><img className="w-[1.2rem]" src={Filter} alt="" /></button>
              <button><img className="w-[1.1rem]" src={Selections} alt="" /></button>
            </div>
            <div className=" absolute right-[4px] bottom-[-7px] border border-[#989898b8] w-[9rem] rounded-[1.3125rem] h-8 mt-6 z-[-1]"></div>
          </div>
        </div>

        {/* form of creating new client */}
        {isUserAdd && (
          <div className=" absolute top-[21%] flex w-[78vw] h-[70vh] bg-[#ffffff60] backdrop-blur-sm z-[1] max1050:w-[85vw]">
            <form className="relative m-auto flex flex-col gap-10 p-6 border-[0.118rem] border-x-[#404040] border-y-[1.2rem] border-[#2297a7] items-center justify-center w-[22rem] h-[35rem] max900:w-[auto] Poppins bg-[#ffffff] z-[1]">
              <input
                required
                placeholder="Name"
                className="bg-[#e9e9e9] text-[#000] K2D px-4 py-2 rounded-[6px] w-full focus:border-opacity-20  "
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <input
                required
                placeholder="Email Address"
                className="bg-[#e9e9e9] text-[#000] K2D px-4 py-2 rounded-[6px] w-full focus:border-opacity-20  "
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <input
                required
                placeholder="Phone Number"
                className="bg-[#e9e9e9] text-[#000] K2D px-4 py-2 rounded-[6px] w-full focus:border-opacity-20  "
                type="number"
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                }}
              />
              <input
                required
                placeholder="Joining date"
                className="bg-[#e9e9e9] text-[#000] K2D px-4 py-2 rounded-[6px] w-full focus:border-opacity-20  "
                type="date"
                value={JoiningDate}
                onChange={(e) => {
                  setJoiningDate(e.target.value);
                }}
              />
              <div className="flex flex-col  gap-3 w-full justify-center items-center">
                <button
                  className="K2D font-[600] tracking-[1.2px] bg-[#2297a7] text-white w-full rounded-[4px] py-2 hover:border-[2px] hover:border-[#2297a7] hover:bg-[#ffffff] hover:text-[#2297a7]"
                  onClick={handleAddClient}
                >
                  Create
                </button>
                <button
                  className="K2D font-[600] tracking-[1.2px] bg-[#333333] text-white w-full rounded-[4px] py-2 hover:border-[2px] hover:border-[#222222] hover:bg-[#ffffff] hover:text-[#222222]"
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
        <div className=" w-[75vw] items-center relative text-[0.9rem] border-2 border-solid border-[#757575] gap-[0] mb-2 max1050:w-[83vw]">
          <div className="absolute w-[8px] h-[8px] top-[0.45rem] left-3 bg-black rounded-[4px]" />
          <div className="flex flex-row justify-between">
            <div className="col-span-4 font-[700] pl-[5rem] ">Name, Phone, Email</div>
            <div className="font-[700] col-span-2 max600:hidden">Country</div>
            <div className="font-[700] col-span-6 max600:hidden">Joining Date</div>
            <div className="font-[700]"></div>
            <div className="font-[700]"></div>
            <div></div>
            <div></div>
          </div>
          <div className="absolute w-[8px] h-[8px] top-[0.45rem] right-3 bg-black rounded-[4px]" />
        </div>
        <div className=" w-[75vw] bg-[#757575] h-[0.095rem] mb-4 max1050:w-[83vw] max850:hidden"></div>

        <div className="w-[76vw] relative overflow-y-auto max-h-[48vh] scroll-container ml-[-0.5rem] pl-[7px] max1050:w-[90vw]">
          {clientsData.map(([key, client], index) => (
            <div
              key={client.institution}
              onClick={() => {
                setisMemberList(clients.institution);
              }}
              className={`w-[75vw] mb-3 p-2 border-2 border-solid rounded-[0.5rem] item-center relative max1050:w-[83vw] ${isRowSelected(client.institution)
                ? "my-2 border-[#30AFBC] transform scale-y-[1.18] transition-transform duration-500 ease-in-out"
                : "border-[#a2a2a260]"
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
                  {isRowSelected(`${client.institution}-${client.emailId}`) && (
                    <img
                      src={Select}
                      alt="Selected"
                      className="w-full h-full"
                    />
                  )}
                </div>
              </label>

              <Link to={`/memberlist?institution=${client.institution} `}>
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
                    <div className="col-span-3 flex flex-col max600:w-[8.5rem]">
                      <div className="font-[900] email-hover cursor-pointer">
                        {client.institution}
                      </div>
                      <div className="overflow-auto text-[0.8rem] font-[600] email-hover cursor-pointer">{client.emailId}</div>
                      <div className="overflow-auto text-[0.8rem] font-[600]">{client.phoneNumber}</div>
                    </div>
                    <div className="col-span-3 ml-[2rem] font-semibold text-sm max600:hidden">{client.country}</div>
                    <div className="col-span-3 ml-[0rem] font-semibold text-sm max600:hidden">{formatEpochToReadableDate(client.joiningDate)}
                    </div>
                    <div className="col-span-2 font-semibold text-sm"></div>
                    <div className="col-span-2 ml-[-2rem] relative max850:hidden">
                      <div >
                        <div></div>
                        <div></div>
                      </div>
                    </div>
                    <div className="font-[600] ml-[-1rem] text-[0.9rem] pr-[6rem] max850:hidden"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

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
