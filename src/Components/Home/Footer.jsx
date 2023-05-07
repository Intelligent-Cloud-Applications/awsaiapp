import logo from "../../Utils/AWS/Logo.svg";
import facebook from "../../Utils/Assests/FB.png";
import instagram from "../../Utils/Assests/INSTA.png";
import youtube from "../../Utils/Assests/YOU.png";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import "./Footer.css"


const Footer = (props) => {
  const Navigate = useNavigate();
  const [content, setContent] = useState(props.initialContent);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [content]);

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  return (
    <div>
      <div className="bg-black">
        <div className="flex flex-wrap justify-between p-12 gap-6 max550:justify-center  ">
          <div className="mb-5">
            <a href="/" className="transition duration-200 ">
              <img src={logo} className="w-[8rem] max450:w-[10rem] " alt="" />
            </a>
          </div>

          <ul className=" flex gap-32 max950:gap-16 text-white flex-wrap max1050:justify-center text-left">
            

            
            
            <li className="RussoOne flex flex-col gap-3 items-center text-center">
            <h2>Usefull Link</h2>
            <div className="w-[100%] h-[0.2rem] text-white bar" ></div>
            <a className="cursor-pointer" href="https://docs.google.com/forms/d/18-R7cEujDwrN8hP1Io2AyTJBPCy3K6dOZ9JXXc9J1Ww/edit" target={"_blank"}>
               Web Dev Form
              </a>
              <p
              className="cursor-pointer"
              onClick={() => {
                Navigate("/query");
              }}
            >
              Contact Us
            </p>
            </li>

            <li className="RussoOne flex flex-col gap-4 items-center text-center">
              <h2>Affiliated Gyms</h2>
              <div className="w-[100%] h-[0.2rem] text-white bar" ></div>
              
              {/* <p
                className="cursor-pointer"
                onClick={() => {
                  Navigate("/aboutus");
                }}
              >
                More Workout and less Dance
              </p>
              <p
                className="cursor-pointer"
                onClick={() => {
                  Navigate("/");
                }}
              >
                Online Instructor Training
              </p>
              <p
                className="cursor-pointer"
                onClick={() => {
                  Navigate("/");
                }}
              >
                Online Free Jam Sessinons
              </p>
              <p
                className="cursor-pointer"
                onClick={() => {
                  Navigate("/");
                }}
              >
                Online Free Choreography
              </p>
              <p
                className="cursor-pointer"
                onClick={() => {
                  Navigate("/");
                }}
              >
                Community Support
              </p> */}
              <a className="cursor-pointer" href="https://happyprancer.com/" target={"_blank"}>
                HappyPrancer
              </a>
              <a className="cursor-pointer" href="https://rtigers.happyprancer.com/" target={"_blank"}>
                R-Tigers
              </a>
              <a className="cursor-pointer" href="https://bworkzlive.com/" target={"_blank"}>
                BWORKZ
              </a>
            </li>
          </ul>
        </div>

        <div className="py-[0.4rem] px-8 h-16 bg-[#404E7C]">
          <div className="flex bg-black justify-between items-center w-[15%] min-w-[10rem] max-w-[12rem] rounded-2xl h-12 p-4">
            <a
              href="https://www.instagram.com/amazonwebservices/?hl=en"
              target={"_blank"}
            >
              <img
                src={instagram}
                alt=""
                className="hover:mr-2 hover:w-10 hover:h-10 w-8 h-8"
              />
            </a>
            <a
              href="https://www.facebook.com/amazonwebservices/"
              target={"_blank"}
            >
              <img
                src={facebook}
                alt=""
                className="hover:mr-2 hover:w-10 hover:h-10 w-8 h-8"
              />
            </a> 
            <a href="https://www.youtube.com/user/AmazonWebServices/Cloud" target={"_blank"}>
              <img
                src={youtube}
                alt=""
                className="hover:mr-1 hover:w-10 hover:h-10 w-8 h-8"
              />
            </a>
          </div>
        </div>

        <div className="RussoOne p-4 flex justify-center text-white gap-2">
          <div className="bg-[#404E7C] w-1 border-white rounded-md"></div>
          <h5>&copy; All Rights are Reserved By AWSAIAPP</h5>
        </div>
      </div>
    </div>
  );
};

export default Footer;
