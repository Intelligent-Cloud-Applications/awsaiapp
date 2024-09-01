import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../../context/Context";
import logo from "../../utils/awsaiappLogo.png";
import cross from "../../utils/Assets/icons8-cross-100.png";
import Menu from "../../utils/Assets/icons8-menu-100.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  const Navigate = useNavigate();
  const UserCtx = useContext(Context);
  console.log(UserCtx)


  let Links = [
    { name: "Home", link: "/" },
    { name: "About Us", link: "/aboutus" },
    { name: "Pricing", link: "/Pricing" },
    { name: "Team", link: "/team" },
    // {name:"C",link:"/"},
  ];
  let [open, setOpen] = useState(false);
  return (
    <div className="shadow-md w-full fixed top-0 left-0 z-50">
      <div className="md:flex items-center justify-between bg-black py-2 lg:px-10 px-2">
        <div
          className="font-bold lg:text-2xl text-lg cursor-pointer flex items-center font-[Poppins] 
      text-gray-800"
        >
          <img
            className="h-[3.5rem]"
            src={logo}
            alt=""
          />
        </div>

        <div
          onClick={() => setOpen(!open)}
          className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
        >
          {open ? (
            <img
              className="h-7"
              src={cross}
              alt="Close Menu"
              onClick={() => {
                // Handle the click event for the "close" image
              }}
            />
          ) : (
            <img
              className="h-7"
              src={Menu}
              alt="Open Menu"
              onClick={() => {
                // Handle the click event for the "menu" image
              }}
            />
          )}
        </div>

        <ul
          className={`bg-black md:flex md:items-center md:pb-0 pb-12 absolute md:static md:z-auto z-[1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? "top-[4.5rem] " : "top-[-490px]"
            }`}
        >
          {Links.map((link) => (
            <li key={link.name} className="lg:ml-8 md:ml-2 text-xl md:my-0 my-7">
              <Link
                to={link.link}
                className="text-white max670:text- mx-2 hover:text-gray-400 duration-500"
              >
                {link.name}
              </Link>
            </li>
          ))}
          <li>
            {UserCtx.isAuth ? (
              <button
                onClick={() => {
                  console.log("User data:", UserCtx.userData);
                  if (UserCtx.userData.userType === "admin" && UserCtx.userData.institution === 'awsaiapp' && UserCtx.userData.institutionName && UserCtx.userData.web === true && UserCtx.userData.isVerified === true && UserCtx.userData.isDelivered === true) {
                    console.log("Navigating to /Dashboard");
                    Navigate("/Dashboard");
                  } else if (UserCtx.userData.userType === "admin" && UserCtx.userData.institution === 'awsaiapp' && UserCtx.userData.institutionName && UserCtx.userData.web === false) {
                    console.log("Navigating to /template");
                    Navigate("/template");
                  } else if (UserCtx.userData.userType === "admin" &&
                    UserCtx.userData.institution === 'awsaiapp' &&
                    UserCtx.userData.institutionName &&
                    UserCtx.userData.web === true &&
                    UserCtx.userData.isVerified === false &&
                    UserCtx.userData.isDelivered === false) {
                    Navigate(`/pay`);
                  } else if (UserCtx.userData.userType === "admin" && UserCtx.userData.institution === 'awsaiapp' && UserCtx.userData.institutionName && UserCtx.userData.web === true && UserCtx.userData.isVerified === true && UserCtx.userData.isDelivered === false) {
                    console.log("Navigating to /template");
                    Navigate("/complete");
                  } else if (UserCtx.userData.userType === "admin" && UserCtx.userData.institution === 'awsaiapp' && UserCtx.userData.institutionName === "awsaiapp" && UserCtx.userData.web === true && UserCtx.userData.isVerified === true && UserCtx.userData.isDelivered === true) {
                    console.log("Navigating to /dashboard");
                    Navigate("/dashboard");
                  }
                }}
                className="bg-white cursor-pointer text-black font-[Poppins] py-2 px-6 rounded md:ml-8 hover:scale-105 duration-200 hover:shadow-lg focus:bg-black max800:mb-5"
              >
                {UserCtx.userData.userName}
              </button>
            ) : (
              <div className="flex flex-row">
                <button
                  className="bg-white cursor-pointer text-black font-[Poppins] py-2 px-6 rounded md:ml-8 hover:scale-105 duration-200 hover:shadow-lg focus:bg-black max800:mb-5"
                  onClick={() => {
                    Navigate("/auth");
                  }}
                >
                 Login/Signup
                </button>
              </div>
            )}
          </li>
          <li>
            <button
              onClick={() => {
                Navigate("/query");
              }}
              className="bg-[#30AFBC] text-white font-[Poppins] py-2 px-6 rounded md:ml-8 hover:scale-105 duration-200"
            >
              Contact Us
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
