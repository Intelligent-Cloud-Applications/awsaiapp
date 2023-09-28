import React from "react";
import logo from "../../utils/awsaiappLogo.png";
function Navbar() {
  return (
    <nav className="bg-gray-900 text-white p-4 h-[8vh] font-inter">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-2xl font-bold">
          <img
            className="relative w-full h-[2.5rem] shrink-0 object-contain rounded"
            alt=""
            src={logo}
          />
        </a>
        <ul className="flex space-x-4">
          <li>
            <a href="/" className="hover:text-blue-500">
              Home
            </a>
          </li>
          <li>
            <a href="/about" className="hover:text-blue-500">
              About
            </a>
          </li>
          <li >
            <a href="/Pricing" className="hover:text-blue-500">
              Pricing
            </a>
          </li>
          <li>
            <a href="/services" className="hover:text-blue-500">
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
              href="/contact"
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
