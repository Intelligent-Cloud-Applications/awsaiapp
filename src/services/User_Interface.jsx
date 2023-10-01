/* eslint-disable jsx-a11y/alt-text */
import Navbar from "../components/Home/Navbar";
import Footer from "../components/Home/Footer";
import Serv_img from "../utils/Assets/Services_User.png";
import "./Services.css"
import plus from "../utils/Assets/p2.png";

const User_Interface = () => {
    return (
        <div className="h-full">
            <Navbar />
            <div className="">
                <div className="flex flex-col h-269 w-231 serv pl-[4rem] pt-[7rem] description p-[5%] gap-2">
                    <h2 className="text-[29px]">Our Services</h2>
                    <a href="/User_interface">
                        <p>User interface & User experience</p>
                        <img src={plus} alt="plus" />
                    </a>
                    <a href="/User_interface">
                        <p>Personalization</p>
                        <img src={plus} alt="plus"/>
                    </a>
                    <a href="/User_interface">
                        <p>Login And identity managment</p>
                        <img src={plus} alt="plus"/>
                    </a>
                    <a href="/User_interface">
                        <p>Trade Specific features</p>
                        <img src={plus} alt="plus"/>
                    </a>
                    <a href="/User_interface">
                        <p>Leads & customer tracking</p>
                        <img src={plus} alt="plus"/>
                    </a>
                    <a href="/User_interface">
                        <p>Payments</p>
                        <img src={plus} alt="plus"/>
                    </a>
                </div>
                <div className="flex flex-col item-center p-[5rem]">
                    <h1 className="text-[25px] font-bold text-center pb-[3rem]">User interface & User experience</h1>
                    <img src={Serv_img} alt="imag" className="h-[444px] w-[720px] item-center justify-center pb-[5rem]" />
                    <p className="text-[15px] pb-[2rem]">
                        At Intelligent Cloud Applications, we understand that the success of your web application hinges on delivering a delightful user experience. Our User Interface and User Experience service are dedicated to crafting intuitive, visually appealing, and user-friendly interfaces that captivate your audience from the moment they land on your site. Our team of skilled designers leverages the latest design trends and usability principles to create seamless interactions, ensuring that your users can navigate your web application effortlessly across various devices. With a focus on accessibility and responsive design, we guarantee that every user, regardless of their device or abilities, enjoys an exceptional experience that drives engagement and enhances satisfaction.
                    </p>
                    <div className="bullet flex w-[772px]">
                        <ul className="styled-list gap-3">
                            <li>
                                <h1>Intuitive UI Design:</h1>
                                <p>We create user interfaces that are intuitive, visually appealing, and easy to navigate. A well-designed UI enhances user engagement and satisfaction.</p>
                            </li>
                            <li>
                                <h1>Responsive Web Design:</h1>
                                <p>Our web applications adapt seamlessly to different devices, ensuring a consistent user experience across desktops, tablets, and smartphones.</p>
                            </li>
                            <li>
                                <h1>Accessibility:</h1>
                                <p>We prioritize accessibility, making sure that all users, including those with disabilities, can access and interact with your web app comfortably.</p>
                            </li>
                            <li>
                                <h1>Interactive Elements:</h1>
                                <p>Engage your users with interactive elements such as animations, sliders, and buttons, enhancing the overall user experience.</p>
                            </li>
                            <li>
                                <h1>User Journey Mapping:</h1>
                                <p>We analyze user behavior and preferences to map out optimized user journeys, leading to higher conversions and increased user retention.</p>
                            </li>
                        </ul>

                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
};
export default User_Interface;