/* eslint-disable jsx-a11y/alt-text */
import Navbar from "../components/Home/Navbar";
import Footer from "../components/Home/Footer";
import Serv_img from "../utils/Assets/Services_Coustmer.png";
import "./Services.css";
import { React, useState, useEffect } from 'react';
import plus from "../utils/Assets/p2.png";
import cross from "../utils/Assets/cross.png";
import Common from "./Common";

const Coustmer = () => {
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
            <div className="pb-[5rem]">
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
                                <img src={plus} alt="plus" />
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
                                <img src={cross} alt="cross" />
                            </a>
                            <a href="/payment">
                                <p>Payments</p>
                                <img src={plus} alt="plus" />
                            </a>
                        </div>
                    )}
                </div>
                <div className="flex flex-wrap item-center px-[3rem] pt-[7rem] nor">
                    <div className="xl:flex-col pb-5"><h1 className="text-[25px] font-bold max767:text-center pb-[1rem]">Leads & customer tracking</h1>
                        <img src={Serv_img} alt="services for user interface" className="item-center justify-center" /></div>
                    <p className="text-[15px] pb-[2rem] max500:px-4 max500:text-[13px] justify-center" >
                        Understanding your customers and leads is vital for driving business growth, and our Leads & Customer Tracking service equips you with the tools to do just that. From lead capture forms and lead scoring systems to automated lead nurturing campaigns, we help you gather valuable customer data, prioritize leads effectively, and nurture them through the sales funnel. By monitoring customer interactions and tracking user behavior within your web application, we empower you to make data-driven decisions, optimize marketing strategies, and deliver personalized experiences that resonate with your audience.
                    </p>
                    <div className="bullet">
                        <ul className="styled-list gap-3 flex flex-wrap">
                            <li>
                                <h1>Customer Activity Tracking:</h1>
                                <p> Monitor customer interactions and behavior within your web app to identify trends and areas for improvement.</p>
                            </li>
                            <li>
                                <h1>Lead Scoring:</h1>
                                <p> Assign scores to leads based on their engagement levels and potential, allowing you to prioritize follow-ups effectively.</p>
                            </li>
                            <li>
                                <h1>Performance Analytics:</h1>
                                <p> Gain insights into lead conversion rates, customer acquisition costs, and customer lifetime value to optimize marketing strategies.</p>
                            </li>
                            <li>
                                <h1>SEO-Analytics Integration:</h1>
                                <p> We align lead and customer tracking data with SEO analytics to identify high-performing keywords and optimize your content strategy.</p>
                            </li>
                            <li>
                                <h1>Lead Capture Forms:</h1>
                                <p> Implement lead capture forms on your web app to gather valuable customer information and generate potential leads.</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};
export default Coustmer;