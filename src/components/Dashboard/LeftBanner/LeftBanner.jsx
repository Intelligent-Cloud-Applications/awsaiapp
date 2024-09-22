import React, { useState, useEffect, useContext } from "react";
import { Sidebar, Flowbite } from "flowbite-react";
import Context from "../../../context/Context";
import { HiChartPie, HiInbox, HiCash } from "react-icons/hi";
import { MdInsertPageBreak } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./LeftBanner.css";

const customTheme = {
  sidebar: {
    root: {
      inner: "h-full overflow-y-auto overflow-x-hidden rounded bg-[#30AFBC] lg:pt-5",
    },
  },
};

const LeftBanner = ({ displayAfterClick }) => {
  const { userData } = useContext(Context);
  const navigate = useNavigate();
  const [click, setClick] = useState(0);
  const Ctx = useContext(Context);
  const isSuperAdmin = Ctx.userData.role === "owner" && Ctx.userData.userType === "admin";
  const isNotSuperAdmin = Ctx.userData.institutionName !== "awsaiapp";
  const isSalesUser = Ctx.userData.role === "sales" && Ctx.userData.userType === "member";
  const location = useLocation();

  useEffect(() => {
    if (location.state && Object.keys(location.state).length > 0) {
      if (location.state.section === 'institution-draft') {
        setClick(3);  // "Institution Draft" is index 3
        displayAfterClick(3); // Show "Institution Draft"
      }

      // Clear the state to prevent repeated execution
      navigate('/dashboard', { state: {} });

    }
  }, [location.state, displayAfterClick, navigate]);
  // useEffect(() => {
  //   const selectedPage = localStorage.getItem("selectedPage");
  //   if (selectedPage) {
  //     setClick(parseInt(selectedPage));
  //   }
  // }, []);

  const getInitials = (name) => {
    const names = name.split(' ')
    const initials = names.map(name => name.charAt(0).toUpperCase()).join('')
    return initials
  }

  return (
    <Flowbite theme={{ theme: customTheme }}>
      <div className="flex justify-center items-center fixed bottom-0 left-0 w-full lg:w-auto lg:relative lg:flex lg:flex-col lg:items-start lg:justify-start z-20">
        <Sidebar
          aria-label="Sidebar"
          className="custom-sidebar lg:pt-16 lg:h-full w-full lg:w-auto lg:fixed lg:left-0 lg:top-0 z-20"
        >
          <div className="h-full w-full overflow-y-auto overflow-x-hidden rounded lg:px-6">
            <Sidebar.Items className="lg:pr-4">
              <Sidebar.ItemGroup className="flex flex-row justify-around items-center lg:items-start lg:flex-col lg:justify-start">
                {isSuperAdmin && (
                  <>
                    <Sidebar.ItemGroup className="hidden lg:block border-b-2 border-b-gray-500">
                      <div className="font-bold flex space-x-2 pb-3 items-center">
                        {(userData?.imgUrl) ? <img src={userData.imgUrl} alt="profile" className="w-12 h-12 rounded-full" /> : <div
                          className="w-full h-full rounded-full bg-gray-300 flex items-center justify-center cursor-pointer"
                        >
                          <span className="text-[3rem] font-bold text-gray-700">
                            {getInitials(userData.userName)}
                          </span>
                        </div>
                        }
                        <p className="text-white text-xl">{`Hello, ${userData.userName.split(" ")[0]}`}</p>
                      </div>
                    </Sidebar.ItemGroup>
                    <Sidebar.Item
                      icon={HiChartPie}
                      onClick={() => {
                        setClick(0);
                        displayAfterClick(0);
                      }}
                      className={`custom-sidebar-item ${click === 0 ? "active bg-white" : ""
                        } hover:text-black hover:bg-[#3c919b] hover:no-underline hover:cursor-pointer`}
                    >
                      <span className="hidden md:inline font-[Poppins] text-base">
                        Client Panel
                      </span>
                    </Sidebar.Item>
                    <Sidebar.Item
                      icon={MdInsertPageBreak}
                      onClick={() => {
                        setClick(3); // Set click to 3 for "Institute Draft"
                        displayAfterClick(3); // Redirect to Institute Draft
                      }}
                      className={`custom-sidebar-item ${click === 3 ? "active bg-white" : ""
                        } hover:text-black hover:bg-[#3c919b] hover:no-underline hover:cursor-pointer`}
                    >
                      <span className="hidden md:inline font-[Poppins] text-base">
                        Institute Draft
                      </span>
                    </Sidebar.Item>
                    <Sidebar.Item
                      icon={FaUser}
                      onClick={() => {
                        setClick(4); // Set click to 3 for "Institute Draft"
                        displayAfterClick(4); // Redirect to Institute Draft
                      }}
                      className={`custom-sidebar-item ${click === 4 ? "active bg-white" : ""
                        } hover:text-black hover:bg-[#3c919b] hover:no-underline hover:cursor-pointer`}
                    >
                      <span className="hidden md:inline font-[Poppins] text-base">
                        Members
                      </span>
                    </Sidebar.Item>
                    <Link to={`/dashboard`} className="hover:no-underline">
                      <Sidebar.Item
                        icon={HiInbox}
                        onClick={() => {
                          setClick(2);
                          displayAfterClick(2);
                        }}
                        className={`custom-sidebar-item ${click === 2 ? "active bg-white" : ""
                          } hover:text-black hover:bg-[#3c919b] hover:no-underline hover:cursor-pointer`}
                      >
                        <span className="hidden md:inline text-base font-[Poppins]">
                          Profile
                        </span>
                      </Sidebar.Item>
                    </Link>
                  </>
                )}
                {isSalesUser && (
                  <>
                    <Sidebar.ItemGroup className="hidden lg:block border-b-2 border-b-gray-500">
                      <div className="font-bold flex space-x-2 pb-3 items-center">
                        {
                          (userData?.imgUrl) ? <img src={userData.imgUrl} alt="profile" className="w-12 h-12 rounded-full" /> : <div
                            className="h-12 w-12 rounded-full bg-gray-300 flex items-center justify-center cursor-pointer"
                          >
                            <span className="text-3xl font-bold text-gray-700">
                              {getInitials(userData.userName)}
                            </span>
                          </div>
                        }
                        <p className="text-white text-xl">{`Hello, ${userData.userName.split(" ")[0]}`}</p>
                      </div>
                    </Sidebar.ItemGroup>
                    <Sidebar.Item
                      icon={HiChartPie}
                      onClick={() => {
                        setClick(0);
                        displayAfterClick(0);
                      }}
                      className={`custom-sidebar-item ${click === 0 ? "active bg-white" : ""
                        } hover:text-black hover:bg-[#3c919b] hover:no-underline hover:cursor-pointer`}
                    >
                      <span className="hidden md:inline font-[Poppins] text-base">
                        Client Panel
                      </span>
                    </Sidebar.Item>
                    <Sidebar.Item
                      icon={MdInsertPageBreak}
                      onClick={() => {
                        setClick(3); // Set click to 3 for "Institute Draft"
                        displayAfterClick(3); // Redirect to Institute Draft
                      }}
                      className={`custom-sidebar-item ${click === 3 ? "active bg-white" : ""
                        } hover:text-black hover:bg-[#3c919b] hover:no-underline hover:cursor-pointer`}
                    >
                      <span className="hidden md:inline font-[Poppins] text-base">
                        Institute Draft
                      </span>
                    </Sidebar.Item>
                    <Link to={`/dashboard`} className="hover:no-underline">
                      <Sidebar.Item
                        icon={HiInbox}
                        onClick={() => {
                          setClick(2);
                          displayAfterClick(2);
                        }}
                        className={`custom-sidebar-item ${click === 2 ? "active bg-white" : ""
                          } hover:text-black hover:bg-[#3c919b] hover:no-underline hover:cursor-pointer`}
                      >
                        <span className="hidden md:inline text-base font-[Poppins]">
                          Profile
                        </span>
                      </Sidebar.Item>
                    </Link>
                  </>
                )}
                {isNotSuperAdmin && (
                  <>
                    {/* <Sidebar.Item
                      icon={HiChartPie}
                      onClick={() => {
                        setClick(0);
                        displayAfterClick(0);
                      }}
                      className={`custom-sidebar-item ${click === 0 ? "active bg-white" : ""
                        } hover:text-black hover:bg-[#3c919b] hover:no-underline hover:cursor-pointer`}
                    >
                      <span className="hidden md:inline text-base font-[Poppins]">
                        Graph
                      </span>
                    </Sidebar.Item>
                    <Sidebar.Item
                      icon={HiShoppingBag}
                      onClick={() => {
                        setClick(1);
                        displayAfterClick(1);
                      }}
                      className={`custom-sidebar-item ${click === 1 ? "active bg-white" : ""
                        } hover:text-black hover:bg-[#3c919b] hover:no-underline hover:cursor-pointer`}
                    >
                      <span className="hidden md:inline font-[Poppins] text-base">
                        Members
                      </span>
                    </Sidebar.Item>
                    <Sidebar.Item
                      icon={HiInbox}
                      onClick={() => {
                        setClick(2);
                        displayAfterClick(2);
                      }}
                      className={`custom-sidebar-item ${click === 2 ? "active bg-white" : ""
                        } hover:text-black hover:bg-[#3c919b] hover:no-underline hover:cursor-pointer`}
                    >
                      <span className="hidden md:inline font-[Poppins] text-base">
                        Leads
                      </span>
                    </Sidebar.Item> */}
                  </>
                )}
                <Link to={`/dashboard`} className="hover:no-underline">
                  <Sidebar.Item
                    icon={HiCash}
                    onClick={() => {
                      setClick(5); // Set click to 1 for "Revenue"
                      displayAfterClick(5); // Redirect to Revenue
                    }}

                    className={`custom-sidebar-item ${click === 5 ? "active bg-white" : ""
                      } hover:text-black hover:bg-[#3c919b] hover:no-underline hover:cursor-pointer`}
                  >
                    <span className="hidden md:inline font-[Poppins] text-base">
                      Admin Revenue
                    </span>
                  </Sidebar.Item>
                </Link>
              </Sidebar.ItemGroup>
            </Sidebar.Items>
          </div>
        </Sidebar>
      </div>
    </Flowbite>
  );
};

export default LeftBanner;