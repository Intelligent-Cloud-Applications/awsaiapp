import React, { useContext, useState, useEffect } from "react";
import Context from "../../../Context/Context";
import Pagination from "@mui/material/Pagination";
import Avishek from "../../../Utils/Png/Avishek.png";
import SearchIcon from "../../assets/images/SVG/Search.svg";
import Arrow from "../../assets/images/SVG/EnterArrow.svg";
import personIcon from '../../assets/images/SVG/ProfilEdit.svg';
import AdminPic from '../../assets/images/PNG/Adminuser.png';
import Select from '../../assets/images/SVG/Thunder.svg';
import Add from '../../assets/images/SVG/Add-Client.svg';
import CSV from '../../assets/images/SVG/CSV.svg';
import Selections from '../../assets/images/SVG/Selections.svg';
import Filter from '../../assets/images/SVG/Filter.svg';
import './MembersList.css';


const MembersList = () => {
  const Ctx = useContext(Context);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [userStatus, setUserStatus] = useState("all");
  const [selectedRow, setSelectedRow] = useState([]);
  const [activeUserList, setActiveUserList] = useState([]);
  const [inactiveUserList, setInactiveUserList] = useState([]);

  useEffect(() => {
    if (userStatus === "all") {
      setActiveUserList(Ctx.userList.filter((user) => user.status === "Active"));
      setInactiveUserList(Ctx.userList.filter((user) => user.status === "Inactive"));   // All, Active, InActive

    } else {
      const filteredList = Ctx.userList.filter((user) => user.status === userStatus);
      if (userStatus === "Active") {
        setActiveUserList(filteredList);
      } else {
        setInactiveUserList(filteredList);
      }
    }
  }, [userStatus, Ctx.userList]);

  const totalPages = Math.ceil(Ctx.userList.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const displayedUserList = userStatus === "active" ? activeUserList : (userStatus === "inactive" ? inactiveUserList : Ctx.userList);

  const filterUserList = displayedUserList
    .filter((user) => {
      return (
        user?.userName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user?.emailId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user?.phoneNumber?.includes(searchQuery)
      );
    })
    .slice(startIndex, endIndex);

  const handleCheckboxChange = (cognitoId) => {            //Checkbox Function
    if (selectedRow.includes(cognitoId)) {
      setSelectedRow(selectedRow.filter((id) => id !== cognitoId));
    } else {
      setSelectedRow([...selectedRow, cognitoId]);
    }
  };

  const isRowSelected = (cognitoId) => {
    return selectedRow.includes(cognitoId);
  };

  const selectedRowCount = selectedRow.length;
  const inactiveUserCount = inactiveUserList.length;
  const activeUserCount = activeUserList.length;

  return (
    <div className="w-[100%] flex flex-col items-center pt-6 max536:pt-0 gap-10 ">
      <div
        className={`w-[90%] max536:bg-transparent max536:w-[100%] mt-[-1rem]
          } rounded-3xl p-3 m`}
      >
        <div className="flex flex-row justify-between pb-2">
          <h1 className="text-[1.4rem] K2D font-[600] pl-5">Welcome, Boss👋</h1>
          <div className="relative">
            <img src={AdminPic} alt="" />
            <div className="absolute w-[9px] h-[8px] top-[0.45rem] right-[-0.3rem] bg-black rounded-[4px]" />
          </div>
        </div>

        <div className=" w-[80vw] bg-[#96969680] h-[0.095rem] mb-2"></div>

        <h2 className="pl-5 text-[2.3125rem] max536:mb-3 K2D mb-[-1rem] font-[600]">
          Clients Panel
        </h2>

        <div className="flex flex-row justify-end gap-[23rem]">
          {/* searchBar */}
          <div className="flex justify-center">
            <div className="flex w-[28.25rem] border-2 border-solid border-[#000] border-opacity-20 rounded-[0.1875rem] gap-6 p-[0.1rem] mb-8 mt-6">
              <img className="w-[1.9rem] h-[1.9rem] opacity-60 ml-2" src={SearchIcon} alt="" />
              <input
                className="flex-1 outline-none rounded-md K2D text-[#000] text-[0.9rem] tracking-[1px] font-[600]"
                type="text"
                placeholder="Search “Name,Email,Number”"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <img className="w-[1rem] h-[1.5rem] mt-1 mr-[0.8rem] opacity-50" src={Arrow} alt="" />
            </div>
          </div>

          {/* functionalities */}
          <div className=" relative border border-black w-[9rem] rounded-[1.3125rem] h-8 mt-6 bg-white">
            <div className="flex flex-row justify-between p-[0.3rem] px-5">
              <button><img className="w-[1.2rem]" src={CSV} alt="" /></button>
              <button><img className="w-[1rem]" src={Add} alt="" /></button>
              <button><img className="w-[1.2rem]" src={Filter} alt="" /></button>
              <button><img className="w-[1.1rem]" src={Selections} alt="" /></button>
            </div>
            <div className=" absolute right-[4px] bottom-[-7px] border border-[#989898b8] w-[9rem] rounded-[1.3125rem] h-8 mt-6 z-[-1]"></div>
          </div>
        </div>

        {/* User Status */}
        <div className="flex flex-row gap-6 ml-[4rem] relative mb-3">
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
          <div className=" absolute w-[78vw] bg-[#30afbc4d] h-[0.2rem] mb-4 left-[-2.5rem] top-[1.33rem]"></div>
        </div>

        {/* Headings */}
        <div className=" w-[80vw] flex justify-between relative text-[0.9rem] border-2 border-solid border-[#757575] gap-[0] mb-2">
          <div className="absolute w-[8px] h-[8px] top-[0.45rem] left-3 bg-black rounded-[4px]" />
          <div className="font-[700] pl-[5rem]">Name, Phone, Email</div>
          <div className="font-[700]">Country</div>
          <div className="font-[700]">Joining Date</div>
          <div className="font-[700]">Attendance</div>
          <div className="font-[700]">Status</div>
          <div className="absolute w-[8px] h-[8px] top-[0.45rem] right-3 bg-black rounded-[4px]" />
          <div className="font-[700] pr-[7rem]">Due</div>
        </div>
        <div className=" w-[80vw] bg-[#757575] h-[0.095rem] mb-4"></div>

        {/* User Data */}
        <div className="w-[81vw] relative overflow-y-auto max-h-[54vh] scroll-container pl-[7px]">
          {filterUserList.map((user, i) => (
            <div
              key={user.cognitoId}
              className={`w-[80vw] mb-3 p-2 border-2 border-solid rounded-[0.5rem] item-center relative ${isRowSelected(user.cognitoId)
                ? "my-2 border-[#30AFBC] transform scale-y-[1.18] transition-transform duration-500 ease-in-out" // Increase the height of the container
                : "border-[#a2a2a280]"
                }`}
              style={{
                margin: isRowSelected(user.cognitoId) ? "1rem 0" : "mb-3", // Add vertical margin when selected
                boxShadow: isRowSelected(user.cognitoId)
                  ? "0px -7px 9px rgba(0, 0, 0, 0.2), 0px 7px 9px rgba(0, 0, 0, 0.2)" // Spread shadow both above and below when selected
                  : "none"
              }}
            >
              {/* checkbox */}
              <label className="relative">
                <input
                  type="checkbox"
                  className="hidden"
                  onChange={() => handleCheckboxChange(user.cognitoId)}
                  checked={isRowSelected(user.cognitoId)}
                />
                <div className="absolute mt-5 w-[1rem] h-[1rem] border-2 border-[#757575] cursor-pointer">
                  {isRowSelected(user.cognitoId) && (
                    <img
                      src={Select}
                      alt="Selected"
                      className="w-full h-full"
                    />
                  )}
                </div>
              </label>
              <div className="absolute right-2 mt-5"><img src={personIcon} alt="" /></div>
              <div className="flex flex-row K2D justify-between items-center">
                <div className=" flex gap-[1rem] pl-[2rem] items-center">
                  <div className="rounded-full overflow-hidden w-12 h-12">
                    <img src={Avishek} alt="Avishek" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col">
                    <div className="font-[900]"> Avishek</div>
                    <div className="overflow-auto text-[0.8rem] font-[600]">admin@gmail.com</div>
                    <div className="overflow-auto text-[0.8rem] font-[600]">(7735227398)</div>
                  </div>
                </div>
                <div className="font-[600] text-[0.9rem] ml-[1.5rem] ">India</div>
                <div className="font-[600] text-[0.9rem] ml-[1.5rem]">23/01/2003</div>
                <div className="font-[600] text-[0.9rem] ml-[1rem]">4/10</div>
                <div className="relative">
                  <div className={`border-2 flex flex-row gap-[0.5rem] text-center rounded-[1.5rem] w-[6rem] pl-2 K2D ${user.status === "Active" ? "border-[#99EF72] text-[#99EF72]" : "border-[#FF4343AB] text-[#FF4343AB]"}`}>
                    <div className={`w-3 h-3 mt-[0.4rem] ${user.status === "Active" ? "bg-[#99EF72]" : "bg-[#FF4343AB]"} rounded-full transform K2D`}></div>
                    <div>{user.status === "Active" ? "Active" : "Inactive"}</div>
                  </div>
                </div>
                <div className="font-[600] text-[0.9rem] pr-[6rem]">10/20</div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-row gap-2">
          {selectedRowCount > 0 && (
            <div className="text-[0.8rem] font-[600] K2D pt-5">
              {selectedRowCount} Items selected                {/* Pagination Count */}
            </div>
          )}
          {/* Pagination */}
          <div className="flex justify-start pt-4">
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

export default MembersList;
