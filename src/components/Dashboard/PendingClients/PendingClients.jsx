import React, { useState, useContext } from "react";
import Context from "../../../context/Context";


// import Pagination from "@mui/material/Pagination";
// import Bworkz from "../../../utils/Assets/Dashboard/images/SVG/Bworkz.svg";
import SearchIcon from "../../../utils/Assets/Dashboard/images/SVG/Search.svg";
import Arrow from "../../../utils/Assets/Dashboard/images/SVG/EnterArrow.svg";

const PendingClients = () => {
  // const itemsPerPage = 6;
  const [status] = useState();
  const [memberCount] = useState();
  // const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRow] = useState([]);

  const [data, setData] = useState([
    {
      deliveryStatus: "Not Delivered",
    },
  ]);
  
  const { pending } = useContext(Context);
  const clientsData = Object.entries(pending.data);
  console.log(clientsData);
  const [name] = useState("");
  const [email] = useState("");
  const [Country] = useState("");
  const [TotalIncome] = useState("");
  const [TotalAttendance] = useState("");
  const [TotalLeads] = useState("");
  // eslint-disable-next-line
  const [Revenue, setRevenue] = useState("");
  // eslint-disable-next-line
  // const [userCheck, setUserCheck] = useState(0);
  const [JoiningDate] = useState("");

  const [selectedUser] = useState(null);
  const [showDetails, setShowDetails] = useState(false);


 

  const handleStatusChange = (newStatus, index) => {
    if (index >= 0 && index < data.length) {
      const updatedData = [...data];
      updatedData[index] = {
        ...updatedData[index],
        deliveryStatus: newStatus,
      };
      setData(updatedData);
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
      const institution = client.institution ? client.institution.toLowerCase() : '';
      const emailId = client.emailId ? client.emailId.toLowerCase() : '';
  
      const matches =
        institution.includes(query) ||
        emailId.includes(query);
  
      return matches;
    });
  
    console.log("Filtered Clients:", filtered);
    return filtered;
  };
  
  const filteredClients = filterClients();
  console.log("Type = ", typeof filteredClients);



  // const startIndex = (currentPage - 1) * itemsPerPage;
  // const endIndex = Math.min(startIndex + itemsPerPage, filteredClients.length);
  // const clientsToDisplay = filteredClients.slice(startIndex, endIndex);

  const selectedRowCount = selectedRow.length;

  function formatEpochToReadableDate(epochDate) {
    const date = new Date(epochDate);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }

  // const handlePageChange = (event, value) => {
  //   setCurrentPage(value);
  // };
  return (
    <div className="w-[85vw] flex flex-col items-center pt-6 gap-10 mx-[4rem] max1050:mr-[8rem]">
      <div className={`w-[90%] rounded-3xl p-3 `}>
        <div className="flex flex-row justify-between max850:justify-end pb-2">
          <h1 className="text-[1.4rem] K2D font-[600] pl-5 drop  max850:hidden">
            Welcome, Boss👋
          </h1>
          <div className="relative">
            {/* <img src={AdminPic} alt="" /> */}
            {/* <div className="absolute w-[9px] h-[8px] top-[0.45rem] right-[-0.3rem] bg-black rounded-[4px]" /> */}
          </div>
        </div>
        <div className=" w-[102%] bg-[#96969680] h-[0.095rem] mb-2 max850:hidden"></div>

        <h2 className=" w-[22rem] pl-5 text-[2.3125rem] K2D mb-[-1rem] font-[600] max850:text-[2rem] moveRight max850:mt-[-3rem] max850:ml-[-2.5rem] ">
          Pending Clients
        </h2>

        <div className="flex flex-row justify-evenly ml-[2.5rem] mt-[1rem]  max850:flex-col max850:justify-center max850:items-center">
          {/* searchBar */}
          <div className="flex justify-center items-center max850:w-[80vw]">
            <div className="flex w-[28.25rem] border-2 border-solid border-[#000] border-opacity-20 rounded-[0.1875rem] p-[0.1rem] mb-8 mt-6 max850:mb-4 ">
              <img
                className="w-[1.9rem] h-[1.9rem] opacity-60 ml-2"
                src={SearchIcon}
                alt=""
              />
              <input
                className="flex-1 outline-none rounded-md K2D text-[#000] text-[0.9rem] tracking-[1px] font-[600] max600:text-[0.8rem]"
                type="text"
                placeholder="Search “Name, Email, Number”"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <img
                className="w-[1rem] h-[1.5rem] mt-1 mr-[0.8rem] opacity-50"
                src={Arrow}
                alt=""
              />
            </div>
          </div>
        </div>

        {/* form of creating new client */}

        {/* Headings */}
        <div className=" w-[75vw] items-center relative text-[0.9rem] border-2 border-solid border-[#757575] gap-[0] mb-2 max1050:hidden">
          <div className="absolute w-[8px] h-[8px] top-[0.45rem] left-3 bg-black rounded-[4px]" />
          <div className="flex flex-row justify-between">
            <div className="flex gap-[6rem]">
              <div className=" font-[700] pl-[2rem] ">Serial No.</div>
              <div className=" font-[700]  ">Company(Owner's detail)</div>
              <div className="font-[700]  max600:hidden">Country</div>

              <div className="flex gap-[8rem]">
                <div className="font-[700]">Status</div>
                <div className="font-[700] ">Paymeent</div>
                <div className="font-[700] ">Product</div>
              </div>
            </div>

            {/* <div className="flex justify-between w-[14vw] max1300:w-[13rem] pl-[1rem]"> */}
            {/* <div className="font-[700] ">Paymeent</div>
              <div className="font-[700] mr-9">Attendance</div> */}
            {/* <div className="font-[700] mr-[-3rem] max1300:hidden">Leads</div> */}
            {/* </div> */}
            <div></div>
          </div>
        </div>

        <div className="w-[76vw] min-h-[45vh] relative overflow-y-auto max-h-[48vh] scroll-container ml-[rem] pl-[7px] max1050:w-[90vw]">
        {filteredClients.map(([key, pending], index) => (
            <div
              key={pending.institution}
              className={`w-[75vw] mb-3 p-2 border-2 border-solid rounded-[0.5rem] item-center relative max1050:w-[83vw] ${
                isRowSelected(pending.institution)
                  ? "my-2 border-[#30AFBC] transform scale-y-[1.18] transition-transform duration-500 ease-in-out"
                  : "border-[#a2a2a280]"
              }`}
              style={{
                margin: isRowSelected(pending.institution)
                  ? "1rem 0"
                  : "0.5rem 0",
                boxShadow: isRowSelected(pending.institution)
                  ? "0px -7px 9px rgba(0, 0, 0, 0.2), 0px 7px 9px rgba(0, 0, 0, 0.2)"
                  : "none",
              }}
            >
              <div className="flex flex-row K2D items-center">
                <div className="pl-[2rem] flex gap-[2rem] items-center">
                  {index + 1}
                  <div className="grid ml-[8rem] grid-cols-12 items-center w-[55vw]">
                    <div className="col-span-3 flex flex-col max600:w-[10rem]">
                      <div className="font-[900]  email-hover cursor-pointer">
                        {pending.institution}
                      </div>
                      <div className="overflow-auto text-[0.8rem] font-[600] email-hover cursor-pointer">
                        {pending.userType}
                      </div>
                      <div className="overflow-auto text-[0.8rem] font-[600]">
                        {pending.phoneNumber}
                      </div>
                    </div>
                    <div className="col-span-3 ml-[3rem] font-semibold text-sm max600:hidden">
                      {pending.country}
                    </div>
                    <div className="col-span-2 ml-[-4rem] relative max1008:hidden">
                      {/* <div className={`border-2 flex flex-row gap-[0.5rem] text-center rounded-[1.5rem] w-[6rem] pl-2 K2D ${pending.status === "Active" ? "border-[#99EF72] text-[#99EF72]" : "border-[#FF4343AB] text-[#FF4343AB]"}`}>
                        <div className={`w-3 h-3 mt-[0.4rem] ${pending.status === "Active" ? "bg-[#99EF72]" : "bg-[#FF4343AB]"} rounded-full transform K2D`}></div>
                        <div>{pending.status === "Active" ? "Active" : "Inactive"}</div>
                      </div> */}
                      <div
                        className={`border-2 flex flex-row gap-[0.5rem] text-center rounded-[1.5rem] w-[10rem] pl-2 K2D ${
                          pending.deliveryStatus === "Delivered"
                            ? "border-[#99EF72] text-[#99EF72]"
                            : "border-[#FF4343AB] text-[#FF4343AB]"
                        }`}
                      >
                        <div
                          className={`w-3 h-3 mt-[0.4rem] ${
                            pending.deliveryStatus === "Delivered"
                              ? "bg-[#99EF72]"
                              : "bg-[#FF4343AB]"
                          } rounded-full transform K2D`}
                        ></div>
                        <div>
                          <select
                            value={pending.deliveryStatus}
                            onChange={(e) =>
                              handleStatusChange(e.target.value, index)
                            }
                           
                          >
                            <option value="Delivered">Delivered</option>
                            <option value="Not Delivered">Not Delivered</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-3 ml-[1rem] font-semibold text-sm max850:ml-[1rem] max600:hidden">
                      {pending.country === "USA"
                        ? `$${pending.recentMonthIncome}`
                        : `₹${pending.recentMonthIncome}`}
                    </div>
                    <div className="flex flex-row justify-between w-[17vw]">
                      <div className="ml-[-1rem] relative font-semibold text-sm max850:ml-[1rem] max600:hidden">
                        {pending.recentMonthMembers}
                      </div>
                      <div className="w-[10rem] ml-[4rem] text-center font-semibold text-sm max600:hidden">
                        {pending.recentMonthAttendance}
                      </div>
                      <div className="w-[10rem] font-semibold text-center text-sm max1300:hidden">
                        {pending.recentMonthLeads}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {showDetails && selectedUser && (
          <div
            class=" mt-[-38rem] rounded-lg right-[4%] w-[22rem] h-[40rem] relative bg-white"
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

        <div className="flex flex-row gap-2">
          {selectedRowCount > 0 && (
            <div className="text-[0.8rem] font-[600] K2D pt-5">
              {selectedRowCount} Item{selectedRowCount > 1 ? "s" : ""} selected
            </div>
          )}

          {/* Pagination */}
          <div className="flex justify-start pt-4 ml-[2rem]">
            {/* <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              className="custom-pagination"
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingClients;
