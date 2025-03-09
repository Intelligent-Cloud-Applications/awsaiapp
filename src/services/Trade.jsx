/* eslint-disable jsx-a11y/alt-text */
import Navbar from "../components/Home/Navbar";
import Footer from "../components/Home/Footer";
import Serv_img from "../utils/Assets/Services_Trade.png";
import "./Services.css";
import { React, useState, useEffect } from "react";
import plus from "../utils/Assets/p2.png";
import cross from "../utils/Assets/cross.png";
import Common from "./Common";
import { Link } from "react-router-dom";

const Trade = () => {
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
                <img src={plus} alt="plus" />
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
                <img src={cross} alt="cross" />
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
        <div className="flex flex-wrap item-center px-[3rem] pt-[7rem] nor">
          <div className="xl:flex-col pb-5">
            <h1 className="text-[25px] font-bold pb-[1rem] max767:text-center">
              Trade Specific features
            </h1>
            <img
              src={Serv_img}
              alt="services for user interface"
              className="item-center justify-center"
            />
          </div>
          <p className="text-[20px] pb-[2rem] max500:px-4 max500:text-[15px] justify-center">
            Every industry has unique requirements, and our Trade Specific
            Features service ensures that your web application is tailored to
            meet the specific needs of your trade. Whether you operate in
            e-commerce, healthcare, education, or any other industry, our team
            customizes your web application with industry-specific
            functionalities and compliance features. From inventory management
            tools and real-time data updates to specialized reporting and
            analytics, our trade-specific approach positions your web
            application as a powerful asset, driving growth and success in your
            niche.
          </p>
          <div className="bullet">
            <ul className="styled-list gap-3 item-center flex flex-wrap">
              <li>
                <h1>Industry-Specific Customization:</h1>
                <p>
                  {" "}
                  Tailor your web app to meet the unique needs of your industry,
                  ensuring it becomes a valuable asset for your trade.
                </p>
              </li>
              <li>
                <h1>Real-Time Data Updates:</h1>
                <p>
                  {" "}
                  Provide real-time information on pricing, availability, and
                  product updates for timely decision-making.
                </p>
              </li>
              <li>
                <h1>Compliance and Regulations:</h1>
                <p>
                  {" "}
                  Incorporate industry-specific compliance and regulatory
                  features to ensure adherence to relevant guidelines.
                </p>
              </li>
              <li>
                <h1>Reporting and Analytics:</h1>
                <p>
                  {" "}
                  Gain valuable insights with AWS AI's powerful Reporting &
                  Analytics service. Unlock data-driven decision-making for your
                  business success
                </p>
              </li>
              <li>
                <h1>Inventory Management:</h1>
                <p>
                  {" "}
                  Optimize your business operations with our Inventory
                  Management service. Effectively track, manage, and control
                  your inventory, ensuring seamless supply chain management.
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

export default Trade;
