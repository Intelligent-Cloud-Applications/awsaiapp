// import React from 'react'

// const ClientsPayments = () => {
//   return (
//     <div>ClientsPayments</div>
//   )
// }

// export default ClientsPayments


import React, { useState, useContext, useEffect } from "react"
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
import PDF from '../../../utils/Assets/Dashboard/images/SVG/pdf.svg';
import "./ClientsPayment.css";

const ClientsPayments = () => {
  const itemsPerPage = 7;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRow, setSelectedRow] = useState([]);
    // eslint-disable-next-line
  const [isMemberList, setisMemberList] = useState("");
  const [users, setUsers] = useState([]);
  const { clients } = useContext(Context);
  const clientsData = clients.data;
  console.log("Clients data:", clients.data);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  // Function to handle checkbox changes
  const handleCheckboxChange = (userId) => {
    if (selectedRow.includes(userId)) {
      setSelectedRow(selectedRow.filter((id) => id !== userId));
    } else {
      setSelectedRow([...selectedRow, userId]);
    }
  };

  // Function to check if a row is selected
  const isRowSelected = (userId) => {
    return selectedRow.includes(userId);
  };

  // Pagination logic
  const totalPages = Math.ceil(clientsData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
      // eslint-disable-next-line
  const endIndex = startIndex + itemsPerPage;
  const selectedRowCount = selectedRow.length;

  return (
    <div className="w-[85vw] flex flex-col items-center pt-6 gap-10 mx-[4rem] max1050:mr-[8rem]">
      <div
        className={`w-[90%] mt-[2rem]
          } rounded-3xl p-3 m`}
      >
        <div className="flex justify-between w-[72vw] pl-5 text-[2.3125rem] max536:mb-3 K2D mb-[1rem] font-[600] max850:text-[2rem]">
          <h2 className="moveRight ">
            Clients Payment
          </h2>
          <div className="relative">
            <img src={AdminPic} alt="" />
            <div className="absolute w-[9px] h-[8px] top-[0.45rem] right-[-0.3rem] bg-black rounded-[4px]" />
          </div>
        </div>

        <div className="flex flex-row justify-evenly ml-[2rem]">
          {/* searchBar */}
          <div className="flex justify-center items-center">
            <div className="flex w-[28.25rem] border-2 border-solid border-[#000] border-opacity-20 rounded-[0.1875rem] p-[0.1rem] mb-8 mt-6 max1050:w-[30vw]">
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
          <div className=" relative border border-black min-w-[9rem] rounded-[1.3125rem] h-8 mt-[1.56rem] ml-[4rem] bg-white ">
            <div className="flex flex-row justify-center gap-3 p-[0.3rem] px-5">
              <button><img className="w-[1.2rem]" src={CSV} alt="" /></button>
              <button><img className="w-[1rem]" src={Add} alt="" /></button>
              <button><img className="w-[1.2rem]" src={Filter} alt="" /></button>
              <button><img className="w-[1.1rem]" src={Selections} alt="" /></button>
            </div>
            <div className=" absolute right-[4px] bottom-[-7px] border border-[#989898b8] w-[9rem] rounded-[1.3125rem] h-8 mt-6 z-[-1]"></div>
          </div>
        </div>

        {/* Headings */}
        <div className=" w-[75vw] items-center relative text-[0.9rem] border-2 border-solid border-[#757575] gap-[0] mb-2 max1050:hidden">
          <div className="absolute w-[8px] h-[8px] top-[0.45rem] left-3 bg-black rounded-[4px]" />
          <div className="flex flex-row justify-between">
            <div className=" font-[700] pl-[5rem] ">Company(Owner's detail)</div>
            <div className="font-[700] max600:hidden">Country</div>
            <div className="font-[700] max600:hidden ">Revenue ($)</div>
            <div className="font-[700]">Status</div>
            <div className="font-[700]">Due</div>
            <div className="font-[700]">Analytics</div>
            <div></div>
          </div>
          <div className="absolute w-[8px] h-[8px] top-[0.45rem] right-3 bg-black rounded-[4px]" />
        </div>
        <div className=" w-[76vw] bg-[#757575] h-[0.095rem] mb-4 max1050:w-[83vw] max850:hidden"></div>

        <div className="w-[76vw] relative overflow-y-auto max-h-[48vh] scroll-container pl-[7px] max1050:w-[90vw]">
          {users.map((user) => (
            <div
              key={user.id}
              onClick={() => {
                setisMemberList(user.name);
              }}
              className={`w-[75vw] mb-3 p-2 border-2 border-solid rounded-[0.5rem] item-center relative max1050:w-[85vw] ml-[-1rem] ${isRowSelected(user.id)
                ? "my-2 border-[#30AFBC] transform scale-y-[1.18] transition-transform duration-500 ease-in-out"
                : "border-[#a2a2a280]"
                }`}
              style={{
                margin: isRowSelected(user.id) ? "1rem 0" : "0.5rem 0",
                boxShadow: isRowSelected(user.id)
                  ? "0px -7px 9px rgba(0, 0, 0, 0.2), 0px 7px 9px rgba(0, 0, 0, 0.2)"
                  : "none",
              }}
            >
              {/* checkbox */}
              <label className="relative">
                <input
                  type="checkbox"
                  className="hidden"
                  onChange={() => handleCheckboxChange(user.id)}
                  checked={isRowSelected(user.id)}
                />
                <div className="absolute mt-5 w-[1rem] h-[1rem] border-2 border-[#757575] cursor-pointer">
                  {isRowSelected(user.id) && (
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

                  <div className="grid grid-cols-12 items-center w-[55vw]">
                    <div className="col-span-3 flex flex-col max600:w-[10rem]">
                      <div className="font-[900] email-hover cursor-pointer">
                        {user.name}
                      </div>
                      <div className="overflow-auto text-[0.8rem] font-[600] email-hover cursor-pointer">{user.email}</div>
                      <div className="overflow-auto text-[0.8rem] font-[600]">7735227398</div>
                    </div>
                    <div className="col-span-3 ml-[2rem] font-semibold text-sm max600:hidden">USA</div>
                    <div className="col-span-3 ml-[-1rem] font-semibold text-sm max600:hidden">40k/125k</div>
                    <div className="col-span-2 ml-[-5rem] relative max850:hidden">
                      <div className={`border-2 flex flex-row gap-[0.5rem] text-center rounded-[1.5rem] w-[6rem] pl-2 K2D ${user.status === "Active" ? "border-[#99EF72] text-[#99EF72]" : "border-[#FF4343AB] text-[#FF4343AB]"}`}>
                        <div className={`w-3 h-3 mt-[0.4rem] ${user.status === "Active" ? "bg-[#99EF72]" : "bg-[#FF4343AB]"} rounded-full transform K2D`}></div>
                        <div>{user.status === "Active" ? "Active" : "Inactive"}</div>
                      </div>
                    </div>
                    <div className="flex flex-row justify-between w-[16vw]">
                    <div className=" ml-[-2rem] relative max850:hidden">0</div>
                    <div className="w-[10rem] ml-[4rem] max850:hidden"><img className="max-w-[14rem]" src={PDF} alt="" /></div>
                    </div>
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
          <div className="flex justify-start pt-4 ml-[2rem] z-[-1]">
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

export default ClientsPayments;
