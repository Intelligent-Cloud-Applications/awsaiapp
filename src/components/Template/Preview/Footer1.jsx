import React, { useEffect } from "react";
import logo from "../../../utils/Template/logo2.png";
import facebook from "../../../utils/Template/FB.png";
import instagram from "../../../utils/Template/INSTA.png";
import { Link } from "react-router-dom";
import './Footer.css';

const Footer1 = ({ uploadedLogoUrl }) => { // Destructure props correctly
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div>
            <div className="bg-black w-[78%] ml-[7.56%]">
                <div className="footerheight flex flex-col justify-between sm:flex-row h-[15rem] max600:flex-col max600:justify-center p-12 gap-6 max1358:justify-center w-[100%]">
                    <div className="mb-5">
                        <a href="/" className="transition duration-200 flex justify-center">
                            <img className="w-[15rem]" src={uploadedLogoUrl || logo} alt="" />
                        </a>
                    </div>

                    <ul className="flex flex-col gap-4 sm:flex-row sm:gap-8 max950:gap-4 text-[1.2rem] text-white flex-wrap max1050:justify-center">
                        <li className="flex flex-col gap-[0.7rem] items-center text-center">
                            <h2 className="text-[1rem] mb-[0]">Useful Links</h2>
                            <hr className="text-white mb-[0]" />

                            <p className="cursor-pointer mb-[0]">Contact Us</p>
                            <a
                                className="cursor-pointer text-white text-decoration-none"
                                href="https://bworkzlive.com/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                BWorkz
                            </a>
                            <a
                                className="cursor-pointer text-decoration-none text-white"
                                href="https://Zumba.com/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Zumba
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="h-10 bg-[#225c59] flex w-full items-center justify-center px-[2rem] sm:justify-start">
                    <div className="flex bg-black justify-between items-center w-[6rem] rounded-2xl h-8 p-4">
                        <a
                            href="https://instagram.com/HappyPrancer"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <img
                                src={instagram}
                                alt=""
                                className="hover:mr-2 hover:w-10 hover:h-10 w-8 h-8"
                            />
                        </a>
                        <a
                            href="https://www.facebook.com/HappyPrancer"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <img
                                src={facebook}
                                alt=""
                                className="hover:mr-2 hover:w-10 hover:h-10 w-8 h-8"
                            />
                        </a>
                    </div>
                </div>

                <div className="p-[0.5rem] flex justify-center text-white gap-2 font-sans max1050:flex-col max1050:text-center">
                    <Link className="text-white text-decoration-none">Privacy Policy</Link>
                    <div className="bg-[#225c59] w-1 border-white rounded-md"></div>
                    <Link className="text-white text-decoration-none">Terms and Condition</Link>
                    <div className="bg-[#225c59] w-1 border-white rounded-md"></div>
                    <Link className="text-white text-decoration-none">Cancellation/Refund Policy</Link>
                    <div className="bg-[#225c59] w-1 border-white rounded-md"></div>
                    <h5 className="text-[1rem] sans-serif mb-0 font-[400]">All rights reserved. © 2023 happyprancer.com</h5>
                </div>
            </div>
        </div>
    );
};

export default Footer1;
