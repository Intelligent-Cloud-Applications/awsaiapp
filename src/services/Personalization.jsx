/* eslint-disable jsx-a11y/alt-text */
import Navbar from "../components/Home/Navbar";
import Footer from "../components/Home/Footer";
import Serv_img from "../utils/Assets/Services_Personalization.png";
import "./Services.css";
import { React, useState, useEffect } from 'react';
import plus from "../utils/Assets/p2.png";
import cross from "../utils/Assets/cross.png";
import Common from "./Common";

const Personalization = () => {
    const [screensize, setScreensize] = useState({ width: window.innerWidth });

    useEffect(() => {
        const handleResize = () => {
            setScreensize({ width: window.innerWidth });
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    const shouldDisplayContainer = screensize.width <= 600;
    return (
        <div className="h-full">
            <Navbar />
            <div className="">
                <div className="">
                    {shouldDisplayContainer ? (
                        <div className="relat">
                            <Common />
                        </div>
                    ) : (
                        <div className="flex flex-col serv h-269 w-231 pl-[4rem] pt-[7rem] description p-[5%] gap-2 max800:w-[150px] max800:pt-[15%] max800:p-[2%]">
                            <h2 className="text-[29px] pb-[1rem] max800:text-[22px]">Our Services</h2>
                            <a href="/User_interface" className="justify-space-between">
                                <p>User interface & User experience</p>
                                <img src={plus} alt="plus" />
                            </a>
                            <a href="/Personalization" className="justify-spacebetween">
                                <p>Personalization</p>
                                <img src={cross} alt="cross" />
                            </a>
                            <a href="/identity">
                                <p>Login And identity managment</p>
                                <img src={plus} alt="plus" />
                            </a>
                            <a href="/trade">
                                <p>Trade Specific features</p>
                                <img src={plus} alt="plus" />
                            </a>
                            <a href="/coustmer">
                                <p>Leads & customer tracking</p>
                                <img src={plus} alt="plus" />
                            </a>
                            <a href="/payment">
                                <p>Payments</p>
                                <img src={plus} alt="plus" />
                            </a>
                        </div>
                    )}
                </div>
                <div className="flex flex-wrap item-center px-[3rem] pt-[7rem] nor">
                    <div className="xl:flex-col"><h1 className="text-[25px] font-bold text-center pb-[1rem] md:text-left xl:text-left">Personalization</h1>
                    <img src={Serv_img} alt="services for user interface" className=" item-center justify-center" /></div>
                    <p className="text-[15px] pb-[2rem] max500:px-4 max500:text-[13px]" >
                    Customization is key to building lasting connections with your users, and our Personalization service is designed to deliver just that. Through sophisticated algorithms and data-driven insights, we personalize your web application to cater to each user's unique preferences, behavior, and context. Whether it's a personalized dashboard, tailored content recommendations, or adaptive user interfaces, we ensure that your users feel valued and engaged at every interaction. By providing a highly personalized experience, you can boost user satisfaction, drive conversions, and cultivate loyalty, setting your web application apart from the competition.
                    </p>
                    <div className="bullet w-[700px]">
                        <ul className="styled-list gap-3 justify-center item-center flex flex-wrap">
                            <li>
                                <h1>Dynamic Content Personalization:</h1>
                                <p> We use data-driven insights to deliver personalized content, product recommendations, and notifications tailored to each user's interests and behavior.</p>
                            </li>
                            <li>
                                <h1>Segmentation:</h1>
                                <p> Group your users based on demographics, behavior, or preferences, allowing you to target specific segments with personalized experiences.</p>
                            </li>
                            <li>
                                <h1>Contextual Recommendations:</h1>
                                <p> Our algorithms consider the user's current context, location, and previous interactions to offer real-time personalized recommendations.</p>
                            </li>
                            <li>
                                <h1>User Preference Management:</h1>
                                <p> Empower users to customize their settings, enabling them to control the level of personalization they receive.</p>
                            </li>
                            <li>
                                <h1>Adaptive User Interfaces:</h1>
                                <p> Personalize the user interface based on user preferences and roles, ensuring each user sees the most relevant information and features.</p>
                            </li>
                        </ul>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
};
export default Personalization;