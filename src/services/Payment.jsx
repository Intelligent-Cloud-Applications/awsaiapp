/* eslint-disable jsx-a11y/alt-text */
import Navbar from "../components/Home/Navbar";
import Footer from "../components/Home/Footer";
import Serv_img from "../utils/Assets/Services_Payment.png";
import "./Services.css"
import plus from "../utils/Assets/p2.png";

const payment = () => {
    return (
        <div className="h-full">
            <Navbar />
            <div className="">
                <div className="flex flex-col h-269 w-231 serv pl-[4rem] pt-[7rem] description p-[5%] gap-2 max800:w-[200px] max800:pt-[5%] max800:p-[2%]">
                    <h2 className="text-[29px]">Our Services</h2>
                    <a href="/User_interface" className="justify-space-between">
                        <p>User interface & User experience</p>
                        <img src={plus} alt="plus" />
                    </a>
                    <a href="/Personalization" className="justify-spacebetween">
                        <p>Personalization</p>
                        <img src={plus} alt="plus"/>
                    </a>
                    <a href="/identity">
                        <p>Login And identity managment</p>
                        <img src={plus} alt="plus"/>
                    </a>
                    <a href="/trade">
                        <p>Trade Specific features</p>
                        <img src={plus} alt="plus"/>
                    </a>
                    <a href="/coustmer">
                        <p>Leads & customer tracking</p>
                        <img src={plus} alt="plus"/>
                    </a>
                    <a href="/payment">
                        <p>Payments</p>
                        <img src={plus} alt="plus"/>
                    </a>
                </div>
                <div className="flex flex-wrap item-center p-[7rem] nor">
                    <h1 className="text-[25px] font-bold text-center pb-[1rem]">Payment</h1>
                    <img src={Serv_img} alt="services for user interface" className="h-[444px] w-[720px] item-center justify-center pb-[3rem]" />
                    <p className="text-[15px] pb-[2rem] max500:px-4 max500:text-[13px]" >
                    Seamless and secure payment processing is fundamental to a successful web application. With our Payments service, we integrate robust and reliable payment gateways, enabling your users to make transactions with confidence. From credit card payments to digital wallets and recurring billing options, we offer a range of payment solutions that cater to diverse preferences. Our comprehensive payment tracking and reporting features provide valuable insights into your transaction data, empowering you to optimize your payment processes and enhance the overall customer experience.
                    </p>
                    <div className="bullet w-[700px]">
                        <ul className="styled-list gap-3 justify-center item-center flex flex-wrap">
                            <li>
                                <h1>Secure Payment Gateways:</h1>
                                <p> We integrate robust and secure payment gateways to facilitate smooth and secure transactions.</p>
                            </li>
                            <li>
                                <h1>Multiple Payment Options:</h1>
                                <p> Allow your customers to pay using various methods, such as credit cards, digital wallets, and bank transfers, catering to different preferences.</p>
                            </li>
                            <li>
                                <h1>Recurring Billing:</h1>
                                <p> Enable subscription-based models and recurring billing options for your services, enhancing customer convenience and retention.</p>
                            </li>
                            <li>
                                <h1>Payment Tracking and Reporting:</h1>
                                <p> Gain valuable insights into payment trends and performance through comprehensive tracking and reporting features.</p>
                            </li>
                            <li>
                                <h1>Invoice Generation:</h1>
                                <p> Automatically generate and send professional invoices to customers upon successful transactions, streamlining your billing process.</p>
                            </li>
                        </ul>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
};
export default payment;