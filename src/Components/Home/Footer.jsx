import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../../Utils/AWS/Logo.svg";
import facebook from "../../Utils/Assests/FB.png";
import instagram from "../../Utils/Assests/INSTA.png";
import youtube from "../../Utils/Assests/YOU.png";
import "./Footer.css";

const socialMediaLinks = [
  {
    platform: "Instagram",
    url: "https://www.instagram.com/rtigersfitnessstudio/",
    icon: instagram
  },
  {
    platform: "Facebook",
    url: "https://www.facebook.com/rtigersfitnessstudio?mibextid=ZbWKwL",
    icon: facebook
  },
  {
    platform: "Youtube",
    url: "https://www.youtube.com/@rtigersfitnessstudio",
    icon: youtube
  }
];

const affiliatedGyms = [
  {
    name: "HappyPrancer",
    url: "https://happyprancer.com/"
  },
  {
    name: "BWORKZ",
    url: "https://bworkzlive.com/"
  },
  {
    name: "AWSAIAPP",
    url: "http://awsaiapp.com.s3-website-us-east-1.amazonaws.com/"
  }
];

const usefulLinks = [
  {
    title: "Contact Us",
    onClick: (Navigate) => Navigate("/query")
  },
  {
    title: "Instructor",
    onClick: (Navigate) => Navigate("/instructor")
  },
  {
    title: "Youtube",
    url: "https://www.youtube.com/@rtigersfitnessstudio"
  }
];

const Footer = () => {
  const Navigate = useNavigate();

  // Scroll to top on content change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <div className="bg-black">
        <div className="flex flex-wrap justify-between p-12 gap-6 max1008:justify-center">
          <div className="mb-5">
            <a href="/" className="transition duration-200">
              <img src={logo} className="w-[8rem] max450:w-[10rem] " alt="" />           
            </a>  {/* Render logo */}
          </div>

          <ul className="flex gap-32 max950:gap-16 text-white flex-wrap max1050:justify-center text-left px-[10rem]">
            {/* About us quick links */}
            <li className="RussoOne flex flex-col gap-4 items-center text-left ">
              <h2 className="text-left">Useful Links</h2>
              <div className="w-[100%] h-[0.2rem] text-white bar"></div>
              
              {usefulLinks.map((link, index) => (
                <React.Fragment key={index}>
                  {link.onClick ? (
                    <p
                      className="cursor-pointer"
                      onClick={() => link.onClick(Navigate)}
                    >
                      {link.title}
                    </p>
                  ) : (
                    <a
                      className="cursor-pointer"
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {link.title}
                    </a>
                  )}
                </React.Fragment>
              ))}
            </li>

            {/* Affiliated Gyms */}
            <li className="RussoOne flex flex-col gap-4 items-center text-center">
              <h2>Affiliated Gyms</h2>
              <div className="w-[100%] h-[0.2rem] text-white bar"></div>
              
              {affiliatedGyms.map((gym, index) => (
                <a
                  key={index}
                  className="cursor-pointer"
                  href={gym.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {gym.name}
                </a>
              ))}
            </li>
          </ul>
        </div>

        <div className="py-[0.4rem] px-8 h-16 bg-[#404E7C]">
          {/* Social Contacts */}
          <div className="flex bg-white justify-between items-center w-[15%] min-w-[10rem] max-w-[12rem] rounded-2xl h-12 p-4">
            {socialMediaLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={link.icon}
                  alt=""
                  className="hover:mr-2 hover:w-10 hover:h-10 w-8 h-8"
                />
              </a>
            ))}
          </div>
        </div>

        <div className="RussoOne p-4 flex justify-center text-white gap-2">
          <div className="bg-[#404E7C] w-1 border-white rounded-md"></div>
          <h5>&copy; All Rights are Reserved By R-Tigers</h5>
        </div>
      </div>
    </div>
  );
};

export default Footer;
