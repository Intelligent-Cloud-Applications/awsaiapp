import React, { useState, useContext, useEffect } from "react";
import { Button } from "flowbite-react";
import { IoMdCash, IoMdPerson } from "react-icons/io";
import { HiUserGroup, HiUserAdd } from "react-icons/hi";
import { MdEdit } from "react-icons/md";
import { RiContactsBookUploadFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import Context from "../../context/Context";

const ButtonGroup = ({ onTabChange, institutionNames, institutionType }) => {
  const [activeTab, setActiveTab] = useState("members");
  const navigate = useNavigate();
  const { userData } = useContext(Context);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    onTabChange(tab);
    setIsMenuOpen(false); 
  };

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      {screenWidth > 1025 ? (
        <div className="flex flex-row items-center justify-between ml-[2rem] w-full">
          <Button.Group className="flex h-12">
            <Button
              style={{
                backgroundColor: activeTab === "members" ? "#30afbc" : "#fff",
                color: activeTab === "members" ? "#fff" : "#000",
                borderColor: activeTab === "members" ? "#30afbc" : "#ccc",
              }}
              onClick={() => handleTabChange("members")}
              className="items-center hover:bg-[#30afbc] hover:text-white border rounded-l-md"
            >
              <HiUserGroup className="mr-3 h-4 w-4" />
              Members List
            </Button>
            <Button
              style={{
                backgroundColor: activeTab === "economy" ? "#30afbc" : "#fff",
                color: activeTab === "economy" ? "#fff" : "#000",
                borderColor: activeTab === "economy" ? "#30afbc" : "#ccc",
              }}
              onClick={() => handleTabChange("economy")}
              className="items-center hover:bg-[#30afbc] hover:text-white border"
            >
              <IoMdCash className="mr-3 h-4 w-4 mt-0.5" />
              Revenue
            </Button>
            <Button
              style={{
                backgroundColor: activeTab === "leads" ? "#30afbc" : "#fff",
                color: activeTab === "leads" ? "#fff" : "#000",
                borderColor: activeTab === "leads" ? "#30afbc" : "#ccc",
              }}
              onClick={() => handleTabChange("leads")}
              className="items-center hover:bg-[#30afbc] hover:text-white border"
            >
              <HiUserAdd className="mr-3 h-4 w-4" />
              Leads
            </Button>
            {(userData.role === "operation" || userData.role === "owner") && (
              <Button
                style={{
                  backgroundColor: activeTab === "batch" ? "#30afbc" : "#fff",
                  color: activeTab === "batch" ? "#fff" : "#000",
                  borderColor: activeTab === "batch" ? "#30afbc" : "#ccc",
                }}
                onClick={() => handleTabChange("batch")}
                className="items-center hover:bg-[#30afbc] hover:text-white border"
              >
                <RiContactsBookUploadFill className="mr-3 h-4 w-4 mt-0.5" />
                Batch Jobs
              </Button>
            )}
            <Button
              style={{
                backgroundColor: activeTab === "client" ? "#30afbc" : "#fff",
                color: activeTab === "client" ? "#fff" : "#000",
                borderColor: activeTab === "client" ? "#30afbc" : "#ccc",
              }}
              onClick={() => handleTabChange("client")}
              className="rounded-r-md items-center hover:bg-[#30afbc] hover:text-white border"
            >
              <IoMdPerson className="mr-3 h-4 w-4" />
              Profile
            </Button>
          </Button.Group>

          <Button
            style={{
              backgroundColor: "#30afbc",
              color: "#fff",
            }}
            className="flex items-center rounded-md ml-[10rem]"
            onClick={() => {
              const targetPath =
                institutionType === "DanceStudio" ? "/full" : "/completeDraft";
              navigate({
                pathname: targetPath,
                search: `?institutionName=${institutionNames}`,
              });
            }}
          >
            <MdEdit className="mr-2 h-4 w-4 mt-0.5" />
            Edit Website
          </Button>
        </div>
      ) : (
        <div className="relative mt-10 flex items-center space-x-4">
        {/* Menu Button */}
        <button
          className="p-2 text-white bg-[#30afbc] rounded-md flex items-center"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
          <span className="ml-2">Menu</span>
        </button>
      
        {/* Dropdown Menu */}
        {isMenuOpen && (
          <div className="absolute top-12 left-0 bg-white shadow-lg rounded-lg w-full p-4 z-10">
            <div className="flex flex-col space-y-2">
              <button
                className={`flex items-center p-2 rounded-md ${
                  activeTab === "members" ? "bg-[#30afbc] text-white" : ""
                }`}
                onClick={() => handleTabChange("members")}
              >
                <HiUserGroup className="mr-2" />
                Members List
              </button>
              <button
                className={`flex items-center p-2 rounded-md ${
                  activeTab === "economy" ? "bg-[#30afbc] text-white" : ""
                }`}
                onClick={() => handleTabChange("economy")}
              >
                <IoMdCash className="mr-2" />
                Economy
              </button>
              <button
                className={`flex items-center p-2 rounded-md ${
                  activeTab === "leads" ? "bg-[#30afbc] text-white" : ""
                }`}
                onClick={() => handleTabChange("leads")}
              >
                <HiUserAdd className="mr-2" />
                Leads
              </button>
              {(userData.role === "operation" || userData.role === "owner") && (
                <button
                  className={`flex items-center p-2 rounded-md ${
                    activeTab === "batch" ? "bg-[#30afbc] text-white" : ""
                  }`}
                  onClick={() => handleTabChange("batch")}
                >
                  <RiContactsBookUploadFill className="mr-2" />
                  Batch Jobs
                </button>
              )}
              <button
                className={`flex items-center p-2 rounded-md ${
                  activeTab === "client" ? "bg-[#30afbc] text-white" : ""
                }`}
                onClick={() => handleTabChange("client")}
              >
                <IoMdPerson className="mr-2" />
                Profile
              </button>
            </div>
          </div>
        )}
      
        {/* Separate "Edit Website" Button */}
        <div className="">
          <button
            className="flex items-center p-2 rounded-md bg-[#30afbc] text-white"
            onClick={() => {
              const targetPath =
                institutionType === "DanceStudio" ? "/full" : "/completeDraft";
              navigate({
                pathname: targetPath,
                search: `?institutionName=${institutionNames}`,
              });
            }}
          >
            <MdEdit className="mr-2" />
            Edit Website
          </button>
        </div>
      </div>
      
      )}
    </div>
  );
};

export default ButtonGroup;
