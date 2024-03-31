import React, { useState, useContext } from "react";
import Context from "../../../context/Context"
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import personIcon from '../../../utils/Assets/Dashboard/images/SVG/ProfilEdit.svg';
// import Pagination from "@mui/material/Pagination";
// import Bworkz from "../../../utils/Assets/Dashboard/images/SVG/Bworkz.svg";
import SearchIcon from "../../../utils/Assets/Dashboard/images/SVG/Search.svg";
import Arrow from "../../../utils/Assets/Dashboard/images/SVG/EnterArrow.svg";

import { API } from "aws-amplify";

import { Link } from "react-router-dom";

const PendingClients = (props) => {
  // const itemsPerPage = 6;
 
  // const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRow] = useState([]);

 

  const [setData] = useState([
    {
      isDelivered: false,
    },
  ]);

  const { userData,setUserData,pending } = useContext(Context);
  const UtilCtx = useContext(Context).util;
  const clientsData = Object.entries(pending.data);
  async function updateDelivery(paymentId, isDelivered, cognitoId) {
    try {
      const response = await API.put("clients", "/admin/update-delivery", {
        body: {
          paymentId,
          isDelivered,
          cognitoId,
        },
      });
      return response; // Return the response if needed
    } catch (error) {
      console.error("Error updating delivery status:", error);
      throw error; // Throw the error for further handling
    }
  }

  const handleStatusChanged = async (newStatus, index) => {
    UtilCtx.setLoader(true);
    if (index >= 0 && index < clientsData.length) {
      try {
        const updatedClients = [...clientsData];
        const selectedClient = updatedClients[index][1];
        selectedClient.isDelivered = newStatus;
  
        await updateDelivery(
          selectedClient.productId,
          newStatus,
          selectedClient.cognitoId
        );
  
        // Update userData context
        const updatedUserData = { ...userData }; // Make a copy of userData
        // Find the user in userData by cognitoId
        const userToUpdateIndex = updatedUserData.findIndex(
          (user) => user.cognitoId === selectedClient.cognitoId
        );
        if (userToUpdateIndex !== -1) {
          // Update isDelivered property of the user
          updatedUserData[userToUpdateIndex].isDelivered = newStatus;
          // Update userData context with modified user information
          setUserData(updatedUserData); // Assuming setUserData is a function to update the userData context
        }
  
        UtilCtx.setLoader(false);
        setData(updatedClients); // Update state after successful API call
      } catch (error) {
        UtilCtx.setLoader(false);
        console.error("Error updating delivery status:", error);
        // Handle error, show a message, or revert changes if needed
      }
    }
  };
  


  // const Navigate = useNavigate();

  // eslint-disable-next-line

  // eslint-disable-next-line


  const [selectedUser] = useState(null);
  const [showDetails] = useState(false);


  // console.log("dfdfdfdfdfd", pending.isDelivered);

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

  // async function updateDelivery(paymentId, isDelivered, cognitoId) {
  //   return await API.put("clients", "/admin/update-delivery", {
  //     body: {
  //       paymentId,
  //       isDelivered,
  //       cognitoId,
  //     },
  //   });
  // }
  const selectedRowCount = selectedRow.length;

 


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
                placeholder="Search “Email”"
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

      

        {/* Headings */}
        <div className=" w-[75vw] items-center relative text-[0.9rem] border-2 border-solid border-[#757575] gap-[0] mb-2 max1050:hidden">
          <div className="absolute w-[8px] h-[8px] top-[0.45rem] left-3 bg-black rounded-[4px]" />
          <div className="flex flex-row justify-between">
            <div className="flex gap-[6rem] ">
              <div className=" font-[700] pl-[2rem]">Serial No.</div>
              <div className=" font-[700]  ">Company(Owner's detail)</div>
              {/* <div className="font-[700]  max600:hidden">Country</div> */}

              <div className="flex gap-[8rem]">
                <div className="font-[700]">Paymeent Status</div>
                <div className="font-[700] ">Payment Id</div>
                <div className="font-[700] ">Website Status</div>
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
                <div className="pl-[2rem] flex gap-[2rem] items-center max1320:p-0">
                  {index + 1}
                  <div className="grid ml-[8rem] grid-cols-12 items-center w-[55vw] max1250:ml-12">
                    <div className="col-span-3 flex flex-col max600:w-[10rem] max600:ml-[-3rem] max450:ml-[-4rem] max375:ml-[-3.5rem] ">
                      <div className="font-[900]  email-hover cursor-pointer">
                        {pending.institutionName}
                      </div>
                      <div className="overflow-auto text-[0.8rem] font-[600]">
                        {pending.emailId}
                      </div>
                    </div>
                    {/* <div className="col-span-3 ml-[3rem] font-semibold text-sm max600:hidden">
                      {pending.country}
                    </div> */}
                    
                    <div className="col-span-2 ml-[-4rem] relative max1008:hidden pl-[7rem]">
                      
                      <div
                        className={`border-2 flex flex-row gap-[0.5rem] text-center rounded-[1.5rem] w-[7rem] pl-2 K2D ${
                          pending.isVerified === true
                            ? "border-[#99EF72] text-[#99EF72]"
                            : "border-[#FF4343AB] text-[#FF4343AB]"
                        }`}
                      >
                        <div
                          className={`w-3 h-3 mt-[0.4rem] ${
                            pending.isVerified === true
                              ? "bg-[#99EF72]"
                              : "bg-[#FF4343AB]"
                          } rounded-full transform K2D`}
                        ></div>
                        <div>
                          {pending.isVerified === true
                            ? "Complete"
                            : "Pending"}
                        </div>
                        
                      </div>
                      
                    </div>
                 
                    {/* <div className="col-span-3 ml-[1rem] font-semibold text-sm max850:ml-[1rem] max600:hidden">
                      {pending.country}
                    </div> */}
                    
                    <div className="ml-[9rem] relative font-semibold text-sm max850:ml-[1rem] max600:hidden">
                        {pending.paymentId}
                      </div>
                      
                    <div className="flex flex-row justify-between w-[17vw]">
                      
                      <div className="w-[10rem] ml-[17rem] text-center font-semibold text-sm ">
                    

                        <div className="w-[95%] flex  justify-end m-[0.8rem] max600:ml-[-3rem] max450:mr-[-3rem] max375:ml-[-3rem] gap-3 ">
                          
                          <div className=" ml-[-4rem] relative max950:mr-[3rem] max800:mr-28 h-6 max450:hidden">
                            <FormControl className=" flex flex-row gap-[0.5rem] text-center rounded-[1.5rem] w-[10rem] max600:w-[8rem]  max450:w-[6rem] max375:w-[5rem]  max800:font-[1px] ">
                              <Select
                                value={
                                  pending.isDelivered
                                    ? "Delivered"
                                    : "Not Delivered"
                                }
                                onChange={(e) =>
                                  handleStatusChanged(
                                    e.target.value === "Delivered",
                                    index
                                  )
                                }
                                className="h-7"
                                displayEmpty
                              >
                                <MenuItem value="Not Delivered">
                                  Not Delivered
                                </MenuItem>
                                <MenuItem value="Delivered">Delivered</MenuItem>
                              </Select>
                            </FormControl>
                          </div>
                        </div>
                      </div>
                      {/* <div className="w-[10rem] font-semibold text-center text-sm max1300:hidden">
                        {pending.recentMonthLeads}
                      </div> */}
                    </div>
                    
                  </div>
                </div>
                <Link
  to={{
    pathname: "/full",
    search: `?institutionName=${pending.institutionName}`,
  }}
  // to={{
  //   pathname: "/full",
  //   search: `?institutionName=happyprancer`,
  // }}
  className="ml-8 focus:outline-none "
>
  <img
    className="w-6 h-6 max478:w-10 "
    src={personIcon}
    alt="Track"
    
  />
</Link>





              
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
