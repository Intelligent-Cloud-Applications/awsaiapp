import React, { useContext, useState, useEffect } from "react";
import { API } from "aws-amplify";
import Pagination from "@mui/material/Pagination";
import Context from "../../../context/Context";
import EditImage from '../../../utils/Assets/Dashboard/images/PNG/Edit.png';
import SearchIcon from "../../../utils/Assets/Dashboard/images/SVG/Search.svg";
import Arrow from "../../../utils/Assets/Dashboard/images/SVG/EnterArrow.svg";
import Swal from "sweetalert2";
import "./LeadsList.css";

const LeadsList = ({ institution: tempInstitution }) => {
  const { util, user } = useContext(Context);
  const searchParams = new URLSearchParams(window.location.search);
  let institution;
  if (user.profile.institution === "awsaiapp") {
    institution = searchParams.get("institution");
  } else {
    institution = tempInstitution || searchParams.get("institution");
  }
  const [leadsData, setLeadsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [name, setName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [date, setdate] = useState("");
  const [isEditUser, setIsEditUser] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const itemsPerPage = 9;
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [isUserAdd, setIsUserAdd] = useState(false);
  const [userCheck, setUserCheck] = useState(0);
  console.log(userCheck)

  useEffect(() => {
    setFilteredLeads(filterLeadsByNameEmailIdPhoneNumber(leadsData, searchInput));
  }, [leadsData, searchInput]);

  const filterLeadsByNameEmailIdPhoneNumber = (leads, query) => {
    const normalizedQuery = query.toLowerCase();
    return leads.filter(
      (lead) =>
        lead.name.toLowerCase().includes(normalizedQuery) ||
        lead.emailId.toLowerCase().includes(normalizedQuery) ||
        lead.phoneNumber.includes(normalizedQuery)
    );
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const fetchLeads = async (institution) => {
    try {
      const response = await API.get("clients", `/user/get-leads/${institution}`);
      console.log(response.Items);
      setLeadsData(response.Items);
    } catch (error) {
      console.error("Error fetching leads:", error);
      console.error("Error details:", error.response);
    } finally {
      util.setLoader(false);
    }
  };

  useEffect(() => {
    fetchLeads(institution);
    // eslint-disable-next-line
  },[institution]);

  const handleAddLeads = async (e) => {
    e.preventDefault();
    const apiName = "clients";
    const path = "/user/create-Leads";
    const myInit = {
      body: {
        institution: institution,
        name: name,
        emailId: emailId,
        phoneNumber: phoneNumber,
        date: new Date(date).getTime(),
      },
    };

    try {
      const create = await API.post(apiName, path, myInit);
      setLeadsData([
        ...leadsData,
        {
          institution: institution,
          name: name,
          emailId: emailId,
          phoneNumber: phoneNumber,
          date: date,
        },
      ]);
      console.log("User created successfully:", create);
      Swal.fire({
        icon: "success",
        title: "User Added",
      });
      await fetchLeads(institution);
      setIsUserAdd(false);
      setName("");
      setEmailId("");
      setPhoneNumber("");
      util.setLoader(false);
    } catch (e) {
      console.log(e);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while creating the user.",
      });
      util.setLoader(false);
    }
  };

  const handleEditUser = (user) => {
    setEditUser(user);
    setIsEditUser(true);
  };
  const handleCancelEdit = () => {
    setIsEditUser(false);
    setEditUser(null);
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const apiName = "clients";
    const path = `/user/update-Leads`;
    const myInit = {
      body: {
        institution: institution,
        name: name,
        emailId: emailId,
        phoneNumber: phoneNumber,
        date: new Date(date).getTime(),
      },
    };
    try {
      const update = await API.put(apiName, path, myInit);
      await fetchLeads(institution);
      console.log(update);
      Swal.fire({
        icon: "success",
        title: "User Updated",
      });
      util.setLoader(false);
    } catch (e) {
      console.log(e);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while updating the user.",
      });
      util.setLoader(false);
    }
  };

  useEffect(() => {
    if (editUser) {
      setName(editUser.name || "");
      setEmailId(editUser.emailId || "");
      setPhoneNumber(editUser.phoneNumber || "");
      // setCountry(editUser.country || "");
    }
  }, [editUser]);

  const indexOfLastLead = currentPage * itemsPerPage;
  const indexOfFirstLead = indexOfLastLead - itemsPerPage;
  const currentLeads = filteredLeads.slice(indexOfFirstLead, indexOfLastLead);

  const paginate = (event, pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredLeads])

  return (
    <div className="ml-[5rem] max1300:ml-0">
      <h2 className="text-[2.3125rem] K2D font-[600]">Leadslist</h2>
      <main
        className="w-[82vw] max-h-[45.5rem] min-h-[43rem] bg-[#fff5] max600:w-[90vw]"
        style={{
          boxShadow: "0px 0px 10px 10px rgba(0, 0, 0, 0.1)",
          borderRadius: "0.8rem",
        }}
      >
        <section className="w-full h-[7%] bg-[#2c2c2c] rounded-t-[0.8rem] flex items-center justify-end">
          <div className="flex bg-white mr-[4rem] w-[28.25rem] rounded-[0.1875rem] p-[0.1rem] max600:mr-[1.2rem] max600:my-[0.3rem] max600:w-[80vw]">
            <img
              className="w-[1.9rem] h-[1.9rem] opacity-60 ml-2"
              src={SearchIcon}
              alt=""
            />
            <input
              className="flex-1 outline-none rounded-md K2D text-[#000] text-[0.9rem] tracking-[1px] font-[600] max600:text-[0.8rem] "
              type="text"
              placeholder={"Search “Name, Email, Number”"}
              value={searchInput}
              onChange={handleSearchInputChange}
            />
            <img
              className="w-[1rem] h-[1.5rem] mt-1 mr-[0.8rem] opacity-50"
              src={Arrow}
              alt=""
            />
          </div>
          <button className="bg-[#3193b6] text-white py-3 px-4 flex items-center mr-8 max600:absolute max600:top-[13%] max600:right-[-2%] max600:p-1 max600:rounded-[7px] z-[-5]"
            onClick={() => setIsUserAdd(true)}
          >
            <span className="mr-2">+</span> Add Leads
          </button>
        </section>
        
        {isUserAdd && (
          <div className=" absolute top-[21%] flex w-[78vw] h-[75vh] bg-[#ffffff60] backdrop-blur-sm z-50 max1050:w-[85vw]">
            <form className="relative m-auto flex flex-col gap-8 p-6 border-[0.118rem] border-x-[#404040] border-y-[1.2rem] border-[#2297a7] items-center justify-center w-[22rem] h-[35rem] max900:w-[auto] Poppins bg-[#ffffff] z-[1]">
              <input
                required
                placeholder="Name"
                className="bg-[#f7f7f7] text-[#000] K2D px-4 py-2 rounded-[6px] w-full focus:border-opacity-20 border border-[#acacac]  "
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <input
                required
                placeholder="Email Address"
                className="bg-[#f7f7f7] text-[#000] K2D px-4 py-2 rounded-[6px] w-full focus:border-opacity-20 border border-[#acacac]  "
                type="email"
                value={emailId}
                onChange={(e) => {
                  setEmailId(e.target.value);
                }}
              />
              <input
                required
                placeholder="Phone Number"
                className="bg-[#f7f7f7] text-[#000] K2D px-4 py-2 rounded-[6px] w-full focus:border-opacity-20 border border-[#acacac]  "
                type="number"
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                }}
              />
              <input
                required
                placeholder="Joining date"
                className="bg-[#f7f7f7] text-[#000] K2D px-4 py-2 rounded-[6px] w-full focus:border-opacity-20 border border-[#acacac]  "
                type="date"
                value={date}
                onChange={(e) => {
                  setdate(e.target.value);
                }}
              />
              <div className="flex flex-col  gap-3 w-full justify-center items-center">
                <button
                  className="K2D font-[600] tracking-[1.2px] bg-[#2297a7] text-white w-full rounded-[4px] py-[7px] border-[2px] border-[#2297a7] hover:bg-[#ffffff] hover:text-[#2297a7]"
                  onClick={handleAddLeads}
                >
                  Create
                </button>
                <button
                  className="K2D font-[600] tracking-[1.2px] bg-[#333333] text-white w-full rounded-[4px] py-[7px] border-[2px] border-[#222222] hover:bg-[#ffffff] hover:text-[#222222]"
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
        <section className="table_body K2D w-[95%] border border-[#2e2e2e] rounded-[6px] overflow-auto bg-[#fffb] my-[0.8rem] mx-auto ">
          {filteredLeads.length === 0 ? (
            <p>No results found.</p>
          ) : (
            <table className="w-[100%]">
              <thead className="border-b text-[1.1rem] font-[600] border-[#2e2e2e]">
                <tr>
                  <th className="w-1/4 ">Name</th>
                  <th className="w-1/4 ">EmailId</th>
                  <th className="w-1/4">PhoneNumber</th>
                  <th className="w-1/4">date</th>
                  <th className="w-1/4"></th>
                </tr>
              </thead>
              <tbody>
                {currentLeads.map((lead, index) => (
                  <tr key={index} className="font-[500]">
                    <td className="w-1/4">{lead.name}</td>
                    <td className="w-1/4">{lead.emailId}</td>
                    <td className="w-1/4">{lead.phoneNumber}</td>
                    <td className="w-1/4">{lead.date}</td>
                    <td className="w-1/4" onClick={() => handleEditUser(lead)}>
                      <img src={EditImage} alt="Edit" width="100px" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {isEditUser && (
            <div className=" absolute top-[18%] flex w-[84vw] right-[5%] h-[75vh] bg-[#ffffff60] backdrop-blur-sm z-[1] max1050:w-[85vw]">
              <form className="relative h-auto m-auto flex flex-col gap-8 p-6 border-[0.118rem] border-x-[#404040] border-y-[1.2rem] border-[#2297a7] items-center justify-center w-[22rem] max900:w-[auto] Poppins bg-[#ffffff] z-[1]">
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
                {/* <input
                  required
                  placeholder="Email Address"
                  className="bg-[#f0f0f0] text-[#000] K2D px-4 py-2 rounded-[6px] w-full focus:border-opacity-20  "
                  type="email"
                  value={emailId}
                  onChange={(e) => {
                    setEmailId(e.target.value);
                  }}
                /> */}
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
                {/* <input
                  required
                  placeholder="date"
                  className="bg-[#f0f0f0] text-[#000] K2D px-4 py-2 rounded-[6px] w-full focus:border-opacity-20  "
                  type="date"
                  value={date}
                  onChange={(e) => {
                    setdate(e.target.value);
                  }}
                /> */}
                <div className="flex flex-col  gap-3 w-full justify-center items-center">
                  <button
                    className="K2D font-[600] tracking-[1.2px] bg-[#2297a7] text-white w-full rounded-[4px] py-[7px] border-[2px] border-[#2297a7] hover:bg-[#ffffff] hover:text-[#2297a7]"
                    onClick={handleEdit}
                  >
                    Update
                  </button>
                  <button
                    className="K2D font-[600] tracking-[1.2px] w-full rounded-[4px] py-2 border-[2px] border-[#222222] bg-[#ffffff] text-[#222222]"
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </section>
        <Pagination
          count={Math.ceil(filteredLeads.length / itemsPerPage)}
          page={currentPage}
          onChange={paginate}
          className="custom-pagination"
        />
      </main>
    </div>
  );
};

export default LeadsList;
