import React, { useEffect } from "react";
import QR from "../utils/Assets/QR.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { useNavigate } from "react-router-dom";

const SubscriptionPopup = () => {
    const handleWhatsAppChat = () => {
        const currentMonth = new Date().toLocaleString('default', { month: 'long' });
        const message = `Payment screenshot for ${currentMonth}`;

        const whatsappUrl = `https://wa.me/7077993547?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, "_blank");
    };
    useEffect(() => {
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    const navigate = useNavigate();

    const handleBack = () => {
        navigate("/pricing");
    };

    return (
        <div className="fixed inset-0 z-0 flex items-center justify-center bg-black bg-opacity-50 p-4 ">
            <div className="bg-white w-full sm:w-[22rem] md:w-[24rem] lg:w-[28rem] py-10 px-6 rounded-2xl shadow-lg  ">
                <button
                    className="top-2 right-2 text-gray-600 hover:text-gray-800"
                    onClick={handleBack}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
                <h2 className="text-[1.5rem] sm:text-2xl md:text-2.5xl lg:text-3xl text-center font-bold mb-4 -mt-3.5">Subscribe</h2>
                <div className="mb-2 flex justify-center items-center">
                    <img
                        src={QR}
                        alt="QR Code"
                        className="w-[10rem]"
                    />
                </div>
                <div className="mb-4 text-center">
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-2 font-bold">Rs 1000</p>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-2 font-bold">Sai Swaroop Bedamatta</p>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-2"><span className="font-bold">UPI ID:</span> 8249675567@paytm</p>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-2"><span className="font-bold">Payment Number:</span> 8249675567</p>
                </div>

                <div className="mb-3 text-center text-sm sm:text-base md:text-lg lg:text-base ">
                    <p className="font-semibold mb-1">Step 1: Scan the QR Code and pay Rs 1000</p>
                    <p className="font-semibold mb-1">Step 2: Take a Screenshot of the Payment</p>
                    <p className="font-semibold mb-1">Step 3: Send the Screenshot on WhatsApp <br /> by Clicking the Button Below</p>
                </div>
                <div className="flex justify-center items-center mb-2 sm:mb-6">
                    <button
                        className="bg-[#30AFBC] rounded-2xl text-white px-6 py-2 sm:px-8 sm:py-3 hover:bg-[#000]  cursor-pointer"
                        onClick={handleWhatsAppChat}
                    >
                        <FontAwesomeIcon icon={faWhatsapp} className="mr-2" />
                        Share Screenshot
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SubscriptionPopup;