import React from "react";
import logo from "../../utils/awsaiappLogo.png";
import logo1 from "../../utils/Assets/logo2.png";
function Navbar() {
  
  return (
    <nav className="hidden md:block bg-black text-white p-4 h-[8vh] font-inter ">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-2xl font-bold">
          <img
            className="relative h-[3rem] w-full shrink-0 object-contain rounded ml-[1.5rem] dark:block"
            alt=""
            src={logo}
          />
        </a>
        <ul className="flex space-x-8 text-lg">
          <li>
            <a href="/" className="hover:text-blue-500">
              Home
            </a>
          </li>
          <li>
            <a href="/aboutus" className="hover:text-blue-500">
              About
            </a>
          </li>
          <li >
            <a href="/Pricing" className="hover:text-blue-500">
              Pricing
            </a>
          </li>
          <li>
            <a href="/team" className="hover:text-blue-500">
              Our Team
            </a>
          </li>
          <li>
            <a
              href="/contact"
              className="w-[10vw] bg-white text-[#30AFBC] px-4 py-2 rounded font-bold"
            >
              Login
            </a>
          </li>
          <li>
            <a
              href="/query"
              className="w-[10vw] bg-[#30AFBC] px-4 py-2 rounded font-bold"
            >
              Contact Us
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
