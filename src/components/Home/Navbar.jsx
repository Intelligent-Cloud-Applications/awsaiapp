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
    { name: "About", link: "/aboutus" },
    { name: "Pricing", link: "/Pricing" },
  ];
  let [open, setOpen] = useState(false);
  return (
    <div className="shadow-md w-full fixed top-0 left-0 z-50">
      <div className="md:flex items-center justify-between bg-black py-2 lg:px-10 px-2">
        <div className="font-bold lg:text-2xl text-lg cursor-pointer flex items-center font-[Poppins] text-gray-800">
          <Link to="/">
            <img className="h-[4rem] max-md:h-[3.5rem]" src={logo} alt="" />
          </Link>
        </div>

        <div onClick={() => setOpen(!open)} className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden">
          {open ? (
            <img className="h-7" src={cross} alt="Close Menu" />
          ) : (
            <img className="h-7" src={Menu} alt="Open Menu" />
          )}
        </div>

        <ul className={`bg-black md:flex md:items-center md:pb-0 pb-12 absolute md:static md:z-auto z-[1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? "top-[4.5rem]" : "top-[-490px]"}`}>
          {Links.map((link) => (
            <li key={link.name} className="lg:ml-8 md:ml-2 text-xl md:my-0 my-7">
              <Link to={link.link} className="text-white max670:text- mx-2 hover:text-gray-400 duration-500">
                {link.name}
              </Link>
            </li>
          ))}
          <li className="[@media(max-width:767px)]:mb-5">
            {UserCtx.isAuth ? (
              <button
                onClick={() => {
                  UserCtx.userData.institutionName = "awsaiapp";
                  Navigate("/dashboard");
                }}
                className="bg-white cursor-pointer text-black font-[Poppins] py-2 px-6 rounded md:ml-4 hover:scale-105"
              >
                {UserCtx.userData.userName.split(' ')[0] + ' ' + UserCtx.userData.userName.split(' ').slice(-1)[0]}

              </button>
            ) : (
              <div className="flex flex-row">
                <button
                  className="bg-white cursor-pointer text-black font-[Poppins] py-2 px-6 rounded md:ml-4"
                  onClick={() => {
                    Navigate("/auth");
                  }}
                >
                  Login
                </button>
              </div>
            )}
          </li>
          <li>
            <button
              onClick={() => {
                Navigate("/query");
              }}
              className="bg-[#30AFBC] text-white font-[Poppins] py-2 px-6 rounded md:ml-4 hover:scale-105 duration-200"
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
