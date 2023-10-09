/* eslint-disable jsx-a11y/alt-text */
import Navbar from "../components/Home/Navbar";
import Footer from "../components/Home/Footer";
import Serv_img from "../utils/Assets/Services_Login.png";
import "./Services.css";
import { React, useState, useEffect } from 'react';
import plus from "../utils/Assets/p2.png";
import cross from "../utils/Assets/cross.png";
import Common from "./Common";

const Login_IdentityManagment = () => {
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
                                <img src={cross} alt="cross" />
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
                    <h1 className="text-[25px] font-bold text-center pb-[1rem]">Login And identity managment</h1>
                    <img src={Serv_img} alt="services for user interface" className="item-center justify-center pb-[3rem]" />
                    <p className="text-[15px] pb-[2rem] max500:px-4 max500:text-[13px]" >
                    Security is paramount in the digital world, and our Login & Identity Management service guarantees robust user authentication and access control. Through secure authentication mechanisms, such as two-factor authentication (2FA) and single sign-on (SSO), we safeguard user accounts from unauthorized access and potential threats. Our identity verification processes add an extra layer of protection, ensuring a trustworthy user base. Additionally, we provide seamless password management options, making it convenient for users to reset and recover their login credentials securely.
                    </p>
                    <div className="bullet w-[700px]">
                        <ul className="styled-list gap-3 justify-center item-center flex flex-wrap">
                            <li>
                                <h1>Secure Authentication:</h1>
                                <p> Implement strong authentication mechanisms, such as two-factor authentication to safeguard user accounts.</p>
                            </li>
                            <li>
                                <h1>Single Sign-On (SSO):</h1>
                                <p> Streamline user access with SSO, allowing users to log in once and access multiple services seamlessly.</p>
                            </li>
                            <li>
                                <h1>Identity Verification:</h1>
                                <p> Verify user identities through various methods, ensuring a trustworthy user base and reducing fraudulent activities.</p>
                            </li>
                            <li>
                                <h1>Password Management:</h1>
                                <p> Offer password reset and recovery options to enhance user account security and convenience.</p>
                            </li>
                            <li>
                                <h1>User Access Control:</h1>
                                <p> Define user roles and permissions to control access to specific features and information within the web app.</p>
                            </li>
                        </ul>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
};
export default Login_IdentityManagment;