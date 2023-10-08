import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../utils/awsaiappLogo.png";
import cross from "../../utils/Assets/icons8-cross-100.png";
import Menu from "../../utils/Assets/icons8-menu-100.png";

const Navbar = () => {
  const Navigate = useNavigate();

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
      <div className="md:flex items-center justify-between bg-black py-2 md:px-10 px-7">
        <div
          className="font-bold text-2xl cursor-pointer flex items-center font-[Poppins] 
      text-gray-800"
        >
          <img
            onClick={() => Navigate("/")}
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
          className={`bg-black md:flex md:items-center md:pb-0 pb-12 absolute md:static md:z-auto z-[1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? "top-[4.5rem] " : "top-[-490px]"
          }`}
        >
          {Links.map((link) => (
            <li key={link.name} className="md:ml-8 text-xl md:my-0 my-7">
              <a
                href={link.link}
                className="text-white max670:text- mx-2 hover:text-gray-400 duration-500"
              >
                {link.name}
              </a>
            </li>
          ))}
          <li><button
            onClick={() => {
              Navigate("/login");
            }}
            className="bg-white text-black font-[Poppins] py-2 px-6 rounded md:ml-8 hover:scale-105 transition-all hover:shadow-lg focus:bg-black max800:mb-5"
          >
            Login
          </button></li>
          
          <li><button
            onClick={() => {
              Navigate("/query");
            }}
            className="bg-[#30AFBC] text-white font-[Poppins] py-2 px-6 rounded md:ml-8 hover:bg-[#67B2BA]"
          >
            Contact Us
          </button></li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
