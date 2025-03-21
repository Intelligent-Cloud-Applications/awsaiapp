/* eslint-disable jsx-a11y/alt-text */
import Navbar from "../components/Home/Navbar";
import Footer from "../components/Home/Footer";
import Serv_img from "../utils/Assets/Services_User.png";
import "./Services.css";
import React, { useState, useEffect } from "react";
import plus from "../utils/Assets/p2.png";
import cross from "../utils/Assets/cross.png";
import Common from "./Common";
import { Link } from "react-router-dom";

const User_Interface = () => {
  const [screensize, setScreensize] = useState({ width: window.innerWidth });

  useEffect(() => {
    const handleResize = () => {
      setScreensize({ width: window.innerWidth });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const shouldDisplayContainer = screensize.width <= 600;
  return (
    <div className="h-full">
      <Navbar />
      <div className="pb-[5rem]">
        <div className="">
          {shouldDisplayContainer ? (
            <div className="relat">
              <Common />
            </div>
          ) : (
            <div className="flex flex-col serv h-269 w-231 pl-[4rem] pt-[7rem] description p-[5%] gap-2 max800:w-[150px] max800:pt-[15%] max800:p-[2%]">
              <h2 className="text-[29px] pb-[1rem] max800:text-[22px]">
                Our Services
              </h2>
              <Link to="/User_interface" className="justify-space-between">
                <p>User interface & User experience</p>
                <img src={cross} alt="cross" />
              </Link>
              <Link to="/Personalization" className="justify-spacebetween">
                <p>Personalization</p>
                <img src={plus} alt="plus" />
              </Link>
              <Link to="/identity">
                <p>Login And identity management</p>
                <img src={plus} alt="plus" />
              </Link>
              <Link to="/trade">
                <p>Trade Specific features</p>
                <img src={plus} alt="plus" />
              </Link>
              <Link to="/customer">
                <p>Leads & customer tracking</p>
                <img src={plus} alt="plus" />
              </Link>
              <Link to="/payment">
                <p>Payments</p>
                <img src={plus} alt="plus" />
              </Link>
            </div>
          )}
        </div>
        <div className="flex flex-wrap item-center px-[3rem] pt-[7rem] nor ">
          <div className="xl:flex-col pb-5">
            <h1 className="text-[25px] font-bold pb-[1rem] max767:text-center">
              User interface & User experience
            </h1>
            <img
              src={Serv_img}
              alt="services for user interface"
              className=" item-center justify-center"
            />
          </div>
          <p className="text-[20px] pb-[2rem] max500:px-4 justify-center max500:text-[15px]">
            At Intelligent Cloud Applications, we understand that the success of
            your web application hinges on delivering a delightful user
            experience. Our User Interface and User Experience service are
            dedicated to crafting intuitive, visually appealing, and
            user-friendly interfaces that captivate your audience from the
            moment they land on your site. Our team of skilled designers
            leverages the latest design trends and usability principles to
            create seamless interactions, ensuring that your users can navigate
            your web application effortlessly across various devices. With a
            focus on accessibility and responsive design, we guarantee that
            every user, regardless of their device or abilities, enjoys an
            exceptional experience that drives engagement and enhances
            satisfaction.
          </p>
          <div className="bullet ">
            <ul className="styled-list gap-3 flex flex-wrap">
              <li>
                <h1>Intuitive UI Design:</h1>
                <p>
                  We create user interfaces that are intuitive, visually
                  appealing, and easy to navigate. A well-designed UI enhances
                  user engagement and satisfaction.
                </p>
              </li>
              <li>
                <h1>Responsive Web Design:</h1>
                <p>
                  Our web applications adapt seamlessly to different devices,
                  ensuring a consistent user experience across desktops,
                  tablets, and smartphones.
                </p>
              </li>
              <li>
                <h1>Accessibility:</h1>
                <p>
                  We prioritize accessibility, making sure that all users,
                  including those with disabilities, can access and interact
                  with your web app comfortably.
                </p>
              </li>
              <li>
                <h1>Interactive Elements:</h1>
                <p>
                  Engage your users with interactive elements such as
                  animations, sliders, and buttons, enhancing the overall user
                  experience.
                </p>
              </li>
              <li>
                <h1>User Journey Mapping:</h1>
                <p>
                  We analyze user behavior and preferences to map out optimized
                  user journeys, leading to higher conversions and increased
                  user retention.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default User_Interface;
