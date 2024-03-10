// NavBar1.jsx
import React, { useState, useEffect } from "react";
import logo1 from "../../../utils/Template/logo2.png";
import MenuPng from "../../../utils/NavBar/Menu.svg";
import CrossPng from "../../../utils/NavBar/cross.png";
import { useLocation } from "react-router-dom";
import "./nav.css";

const NavBar1 = ({ logo, setLogo }) => {
  const [isNavActive, setIsNavActive] = useState(false);
  const location = useLocation();

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };
//  console.log("Logo URL in navbar:", logo);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const navBarContent = [
    { label: "HOME", path: "/" },
    { label: "ABOUT US", path: "/aboutus" },
    { label: "INSTRUCTOR", path: "/instructor" },
    { label: "SETTINGS", path: "/settings" }, // Add the "Settings" option
  ];

  return (
    <div className="h-8">
      <div className="flex z-20 ml-[7.56%] malt relative items-center justify-between text-white w-[78%] bg-black border-b border-[#1b7571]  h-[3.8rem] px-10 left-0 max536:bg-black">
        <div className="w-[6rem] h-[2.4rem] rounded-xl flex items-center justify-center">
          {logo ? (
            <img
              className="relative w-full p-1 h-[2rem] object-contain "
              alt="you"
              src={logo}
            />
          ) : (
            <img
              className="relative bg-[#fff] rounded-301xl w-full p-1 h-[2rem] shrink-0 object-contain"
              alt=""
              src={logo1}
            />
          )}
        </div>
        <ul className="flex gap-6 max800:hidden font-sans-sarif mt-[1rem]">
          {navBarContent.map((item) =>
            windowWidth >= 536 && item.label === "SETTINGS" ? null : (
              <li
                key={item.path}
                className="flex items-center justify-center hover:text-[#1b7571]"
              >
                <p className="cursor-pointer">{item.label}</p>
              </li>
            )
          )}
          <p className="max800:hidden flex items-center justify-center p-0 m-0">
            <button className="mb-[0.7rem] max800:hidden bg-[#1b7571] w-[6.5rem] h-[2.63rem] rounded-md text-white font-sans">
              Login
            </button>
          </p>
        </ul>
        <div className={`min536:hidden max536:fixed top-0 left-0 z-40 bg-black`}>
          {isNavActive ? (
            <img
              src={CrossPng}
              alt=""
              className={` fixed top-10 right-6 z-60 cursor-pointer h-8 bg-[#1b7571]`}
              onClick={() => {
                setIsNavActive(!isNavActive);
              }}
            />
          ) : (
            <img
              src={MenuPng}
              alt=""
              className={`${location.pathname !== "/dashboard" ? "max536:hidden max536:bg-white" : ""} fixed top-4 right-6 z-60 cursor-pointer h-8 bg-transparent   `}
              onClick={() => {
                setIsNavActive(!isNavActive);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar1;
