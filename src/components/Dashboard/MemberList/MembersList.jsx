import React, { useContext, useState, useEffect, useCallback } from "react";
import Context from "../../../context/Context";
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
import "./MembersList.css";


const MemberList = ({ institutionId }) => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [userStatus, setUserStatus] = useState("all");
  const [selectedRow, setSelectedRow] = useState([]);
    // eslint-disable-next-line
  const [activeUserList, setActiveUserList] = useState([]);
    // eslint-disable-next-line
  const [inactiveUserList, setInactiveUserList] = useState([]);
  const [users, setUsers] = useState([]);
  const { userHappy, userModa, userLissome, userBworkz, userIconic } = useContext(Context);

  const getUsersByInstitution = useCallback(() => {
    switch (institutionId) {
      case "happyprancer":
        return userHappy;
      case "moda":
        return userModa;
      case "lissome":
        return userLissome;
      case "Bworkz":
        return userBworkz;
      case "iconic":
        return userIconic;
      default:
        return [];
    }
  }, [institutionId, userHappy, userModa, userLissome, userBworkz, userIconic]);

  useEffect(() => {
    console.log("institutionId:", institutionId);
    const userData = getUsersByInstitution();
    console.log("userData:", userData);
    setUsers(userData);
  }, [institutionId, getUsersByInstitution]);

  const totalPages = Math.ceil(users.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
    // eslint-disable-next-line
  const endIndex = startIndex + itemsPerPage;


  const handleCheckboxChange = (institutionId) => {
    if (selectedRow.includes(institutionId)) {
      setSelectedRow(selectedRow.filter((id) => id !== institutionId));
    } else {
      setSelectedRow([...selectedRow, institutionId]);
    }
  };

  const isRowSelected = (institutionId) => {
    return selectedRow.includes(institutionId);
  };



  const selectedRowCount = selectedRow.length;
  const inactiveUserCount = inactiveUserList.length;
  const activeUserCount = activeUserList.length;

  return (
    <div className="w-[100%] flex flex-col items-center pt-6 max536:pt-0 gap-10 ml-[10rem]">
      <div
        className={`w-[90%] max536:bg-transparent max536:w-[100%] mt-[-1rem] max600:mr-[3rem]
        } rounded-3xl p-3 m`}
      >
        <div className="flex flex-row justify-between pb-2 max850:hidden">
          <h1 className="text-[1.4rem] K2D font-[600] pl-5">Welcome, Boss👋</h1>
          <div className="relative">
            <img src={AdminPic} alt="" />
            <div className="absolute w-[9px] h-[8px] top-[0.45rem] right-[-0.3rem] bg-black rounded-[4px]" />
          </div>
        </div>

        <div className=" w-[109%] bg-[#96969680] h-[0.095rem] mb-2"></div>

        <h2 className=" w-[22rem] pl-5 text-[2.3125rem] max536:mb-3 K2D mb-[-1rem] font-[600] max850:text-[2rem] moveRight">
          Memberlists
        </h2>


        <div className="flex flex-row justify-end gap-[23rem] ml-10 max1600:gap-[6rem] max1250:justify-between">
          {/* searchBar */}
          <div className="flex justify-center items-center">
            <div className="flex w-[28.25rem] border-2 border-solid border-[#000] border-opacity-20 rounded-[0.1875rem] gap-6 p-[0.1rem] mb-8 mt-6 max1050:w-[30vw]">
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
          <div className=" relative border border-black min-w-[9rem] rounded-[1.3125rem] h-8 mt-7 ml-[4rem] bg-white ">
            <div className="flex flex-row justify-center gap-3 p-[0.3rem] px-5">
              <button><img className="w-[1.2rem]" src={CSV} alt="" /></button>
              <button><img className="w-[1rem]" src={Add} alt="" /></button>
              <button><img className="w-[1.2rem]" src={Filter} alt="" /></button>
              <button><img className="w-[1.1rem]" src={Selections} alt="" /></button>
            </div>
            <div className=" absolute right-[4px] bottom-[-7px] border border-[#989898b8] w-[9rem] rounded-[1.3125rem] h-8 mt-6 z-[-1]"></div>
          </div>
        </div>

        <div className="flex flex-row gap-6 ml-[3rem] relative mb-3">
          <div
            className={`Poppins tracking-[0.4px] font-[600] text-[0.9rem] cursor-pointer ${userStatus === "all" ? "text-[#30afbc] border-b-2 border-[#30AFBC]" : "text-[#000] hover:text-[#30afbc]"
              }`}
            onClick={() => {
              setUserStatus("all");
            }}
          >
            All
          </div>
          <div
            className={`Poppins tracking-[0.4px] font-[600] text-[0.9rem] cursor-pointer ${userStatus === "active" ? "text-[#30afbc] border-b-2 border-[#30AFBC]" : "text-[#000] hover:text-[#30afbc]"
              }`}
            onClick={() => {
              setUserStatus("active");
            }}
          >
            Active ({activeUserCount})
          </div>
          <div
            className={`Poppins tracking-[0.4px] font-[600] text-[0.9rem] cursor-pointer ${userStatus === "inactive" ? "text-[#30afbc] border-b-2 border-[#30AFBC]" : "text-[#000] hover:text-[#30afbc]"
              }`}
            onClick={() => {
              setUserStatus("inactive");
            }}
          >
            Inactive ({inactiveUserCount})
          </div>
          <div className=" absolute w-[74vw] bg-[#30afbc4d] h-[0.2rem] mb-4 left-[-2.5rem] top-[1.33rem]"></div>
        </div>



        {/* Headings */}
        <div className=" w-[75vw] flex items-center justify-between relative text-[0.9rem] border-2 border-solid border-[#757575] gap-[0] mb-2 max850:hidden">
          <div className="absolute w-[8px] h-[8px] top-[0.45rem] left-3 bg-black rounded-[4px]" />
          <div className="col-span-3 font-[700] pl-[5rem]">Name, Phone, Email</div>
          <div className="font-[700]">Country</div>
          <div className="font-[700]">Joining Date</div>
          <div className="font-[700]">Attendance</div>
          <div className="font-[700]">Status</div>
          <div className="font-[700] pr-[7rem]">Due</div>
          <div className="absolute w-[8px] h-[8px] top-[0.45rem] right-3 bg-black rounded-[4px]" />
        </div>
        <div className=" w-[75vw] bg-[#757575] h-[0.095rem] mb-4 max850:hidden"></div>

        <div className="w-[76vw] relative overflow-y-auto max-h-[48vh] scroll-container pl-[7px] max1050:w-[83vw] max536:w-[96vw]">
          {users.map((userData) => (
            <div
              key={userData.id}
              className={`w-[75vw] mb-3 p-2 border-2 border-solid rounded-[0.5rem] item-center relative max600:w-[93vw] ${isRowSelected(userData.id)
                ? "my-2 border-[#30AFBC] transform scale-y-[1.18] transition-transform duration-500 ease-in-out" // Increase the height of the container
                : "border-[#a2a2a280]"
                }`}
              style={{
                margin: isRowSelected(userData.id) ? "1rem 0" : "0.5rem 0", // Add vertical margin when selected
                boxShadow: isRowSelected(userData.id)
                  ? "0px -7px 9px rgba(0, 0, 0, 0.2), 0px 7px 9px rgba(0, 0, 0, 0.2)" // Spread shadow both above and below
                  : "none"
              }}
            >
              {/* checkbox */}
              <label className="relative">
                <input
                  type="checkbox"
                  className="hidden"
                  onChange={() => handleCheckboxChange(userData.id)}
                  checked={isRowSelected(userData.id)}
                />
                <div className="absolute mt-5 w-[1rem] h-[1rem] border-2 border-[#757575] cursor-pointer">
                  {isRowSelected(userData.id) && (
                    <img
                      src={Select}
                      alt="Selected"
                      className="w-full h-full"
                    />
                  )}
                </div>
              </label>

              <div className="absolute right-2 mt-5"><img src={personIcon} alt="" /></div>
              <div className="flex flex-row K2D items-center">
                <div className=" flex gap-[1rem] pl-[2rem] items-center">
                  <div className="rounded-[50%] overflow-hidden w-[3.7rem] h-[3.4rem]">
                    <img src={Bworkz} alt="Avishek" className="w-full h-full object-cover" />
                  </div>
                  <div className="grid grid-cols-12 items-center">
                    <div className="col-span-2 flex flex-col">
                      <div className="font-[900] email-hover cursor-pointer" title={userData.userName}>
                        {userData.name.split(' ')[0]}
                      </div>
                      <div className="overflow-auto text-[0.8rem] font-[600] email-hover cursor-pointer" title={userData.emailId.split("@")[0] + "@"}>
                        {userData.emailId}
                      </div>
                      <div className="overflow-auto text-[0.8rem] font-[600]">
                        ({userData.phoneNumber})
                      </div>
                    </div>
                    <div className="col-span-2 ml-[2rem] font-semibold text-sm">{userData.country}</div>
                    <div className="col-span-3 ml-[3rem] font-semibold text-sm">23/01/2003</div>
                    <div className="col-span-2 font-semibold text-sm">4/10</div>
                    <div className="col-span-2 ml-[-3rem] relative max850:hidden">
                      <div className={`border-2 flex flex-row gap-[0.5rem] text-center rounded-[1.5rem] w-[6rem] pl-2 K2D ${userData.status === "Active" ? "border-[#99EF72] text-[#99EF72]" : "border-[#FF4343AB] text-[#FF4343AB]"}`}>
                        <div className={`w-3 h-3 mt-[0.4rem] ${userData.status === "Active" ? "bg-[#99EF72]" : "bg-[#FF4343AB]"} rounded-full transform K2D`}></div>
                        <div>{userData.status === "Active" ? "Active" : "Inactive"}</div>
                      </div>
                    </div>
                    <div className="font-[600] ml-[-2rem] text-[0.9rem] pr-[6rem] max850:hidden">10/20</div>                         {/* user.balance should be use*/}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-row gap-2">
          {selectedRowCount > 0 && (
            <div className="text-[0.8rem] font-[600] K2D pt-5">
              {selectedRowCount} Items selected
            </div>
          )}
          {/* Pagination */}
          <div className="flex justify-start pt-4 ml--[2rem]">
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(event, value) => setCurrentPage(value)}
              className="custom-pagination"
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default MemberList;
