import React, { useState, useEffect, useContext } from "react";
import { Sidebar, Flowbite, Button } from "flowbite-react";
import Context from "../../../context/Context";
import { HiChartPie, HiShoppingBag, HiInbox, HiPencil } from "react-icons/hi";
import context from "../../../context/Context";
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
  const [click, setClick] = useState(0);
  const Ctx = useContext(context);
  const isSuperAdmin = Ctx.userData.institutionName === "awsaiapp";
  const isNotSuperAdmin = Ctx.userData.institutionName !== "awsaiapp";
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const institutionNames = queryParams.get("institution");

  useEffect(() => {
    const selectedPage = localStorage.getItem("selectedPage");
    if (selectedPage) {
      setClick(parseInt(selectedPage));
    }
  }, []);

  return (
    <Flowbite theme={{ theme: customTheme }}>
      <div className="flex justify-center items-center lg:h-screen fixed bottom-0 left-0 w-full lg:w-auto lg:relative lg:flex lg:flex-col lg:items-start lg:justify-start z-20">
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
                      <div className="font-bold">
                        <p className="text-white text-xl">{`Hello, ${userData.userName.split(" ")[0]}`}</p>
                      </div>
                    </Sidebar.ItemGroup>
                    <Sidebar.Item
                      href="#"
                      icon={HiChartPie}
                      onClick={() => {
                        setClick(0);
                        displayAfterClick(0);
                      }}
                      className={`custom-sidebar-item ${
                        click === 0 ? "active bg-white" : ""
                      } hover:text-black hover:bg-[#3c919b] hover:no-underline hover:cursor-pointer`}
                    >
                      <span className="hidden md:inline font-[Poppins] text-base">
                        Client Panel
                      </span>
                    </Sidebar.Item>
                    <Sidebar.Item
                      icon={HiShoppingBag}
                      onClick={() => {
                        setClick(1);
                        displayAfterClick(1);
                      }}
                      className={`custom-sidebar-item ${
                        click === 1 ? "active bg-white" : ""
                      } hover:text-black hover:bg-[#3c919b] hover:no-underline hover:cursor-pointer`}
                    >
                      <span className="hidden md:inline font-[Poppins] text-base">
                        Revenue
                      </span>
                    </Sidebar.Item>
                    <Link to={`/dashboard`} className="hover:no-underline">
                      <Sidebar.Item
                        icon={HiInbox}
                        onClick={() => {
                          setClick(2);
                          displayAfterClick(2);
                        }}
                        className={`custom-sidebar-item ${
                          click === 2 ? "active bg-white" : ""
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
                    <Sidebar.Item
                      icon={HiChartPie}
                      onClick={() => {
                        setClick(0);
                        displayAfterClick(0);
                      }}
                      className={`custom-sidebar-item ${
                        click === 0 ? "active bg-white" : ""
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
                      className={`custom-sidebar-item ${
                        click === 1 ? "active bg-white" : ""
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
                      className={`custom-sidebar-item ${
                        click === 2 ? "active bg-white" : ""
                      } hover:text-black hover:bg-[#3c919b] hover:no-underline hover:cursor-pointer`}
                    >
                      <span className="hidden md:inline font-[Poppins] text-base">
                        Leads
                      </span>
                    </Sidebar.Item>
                    {/* Divider for large screens */}
                    <div className="hidden lg:block w-full border-t-2 border-gray-500 my-4"></div>
                    {/* Customise Website Button */}
                    <button
                      onClick={() => {
                        navigate({
                          pathname: '/full',
                          search: `?institutionName=${institutionNames}`,
                        });
                      }}
                      className={`custom-sidebar-item bg-blue-600 text-white px-4 py-2 mt-2 rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-all duration-150 ease-in-out `}
                    >
                      {/* Show pencil icon on smaller screens */}
                      <span className="lg:hidden">
                        <HiPencil />
                      </span>
                      {/* Show full text on larger screens */}
                      <span className="hidden lg:inline font-[Poppins] text-base">
                        Edit Website
                      </span>
                    </button>
                  </>
                )}
              </Sidebar.ItemGroup>
            </Sidebar.Items>
          </div>
        </Sidebar>
      </div>
    </Flowbite>
  );
};

export default LeftBanner;
