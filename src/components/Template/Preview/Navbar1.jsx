import React, { useState, useEffect } from "react";
import logo from "../../../utils/Template/logo.png";
import "./nav.css";

const NavBar1 = ({ uploadedLogoUrl }) => {

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

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
    <div
      className="h-8 max1250:ml-[6.6%] w-[100%]"
    >
      <div className="flex z-20 ml-[7.56%] malt relative items-center justify-between text-white w-[78%] bg-black border-b border-[#1b7571]  h-[3.8rem] px-10 left-0 max536:bg-black">
      <a
      href="/"
      className={`logo w-[6rem] h-[2.4rem] rounded-xl flex items-center justify-center `}
    >
      <img
        className="relative rounded-3xl w-full p-1 h-[2rem] shrink-0 object-contain"
        alt=""
        src={uploadedLogoUrl || logo} // Use uploadedLogoUrl if available, otherwise use the default logo
      />
    </a>
        <ul className="flex gap-6 max800:hidden font-sans-sarif mt-[1rem]">
          {navBarContent.map((item) =>
            windowWidth >= 536 && item.label === "SETTINGS" ? null : (
              <li
                key={item.path}
                className="flex items-center justify-center hover:text-[#1b7571]"
              >
                <p
                  className="cursor-pointer"
                >
                  {item.label}
                </p>
              </li>
            )
          )}
          <p className="max800:hidden flex items-center justify-center p-0 m-0">
            
              <button
                className="mb-[0.7rem] max800:hidden bg-[#1b7571] w-[6.5rem] h-[2.63rem] rounded-md text-white font-sans"
              >
                Login
              </button>

          </p>
        </ul>
      </div>
    </div>
  );
};

export default NavBar1;
