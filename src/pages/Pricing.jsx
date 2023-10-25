import Navbar from "../components/Home/Navbar";
import "./Pricing.css";
import Footer from "../components/Home/Footer";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";

const Pricing = () => {
    const Navigate = useNavigate();
    return (
        <div className="flex flex-col">
            <Navbar />
            <div className=" background flex flex-col items-center w-full pb-[5rem]">
                <div className="gap-6 p-20 pt-40 max-w-5xl mx-auto text-center head max600:pt-20">
                    <h1 className="font-bold text-center justify-center text-15xl md:text-10xl lg:text-15xl xl:text-18xl text-black max767:text-white ">
                        Find the plan that is right <span className="text-white">for you</span>
                    </h1>
                </div>

                <div className="flex flex-col md:flex-row justify-center items-center gap-5 pb-10 mx-auto pos xl:gap-10">
                    <Box sx={{
                        height: {
                            sm: "48rem",
                            md: "45rem",
                            lg: "41rem",
                        },
                    }} className="box flex flex-col bg-white xl:w-[25rem] rounded-lg shadow-lg">
                        <h3 className="font-semibold text-2xl xl:text-3xl pb-2">Basic</h3>
                        <p className="text-2xl xl:text-3xl font-semibold">₹ 1,000</p>
                        <p className="text-sm xl:text-base pb-4">Per Month</p>
                        <h4 className="text-lg xl:text-xl font-semibold pb-2">Features</h4>
                        <ul className="text-sm p-2">
                            <li>Establish a strong online presence.</li>
                            <li>Stunning static website design.</li>
                            <li>User-responsive and user-friendly interface.</li>
                            <li>Web hosting included.</li>
                            <li>Regular website maintenance.</li>
                            <li>Fast and easy page loading.</li>
                            <li>SSL certificate for secure data transmission</li>
                            <li>Monthly billing for flexibility.</li>
                            <li>Customization options available.</li>
                        </ul>
                        <button
                            onClick={() => {
                                Navigate("/query");
                            }} className="text-white text-lg xl:text-xl font-semibold bg-black hover:bg-[#30AFBC] hover:text-black py-2 px-4 rounded-lg">
                            Get Started
                        </button>
                    </Box>
                    {/* Middle Box */}
                    <Box sx={{
                        height: {
                            sm: "54rem",
                            md: "50rem",
                            lg: "45rem",
                        },
                    }} className="flex flex-col bg-[#1D1D1D] box box2 text-white xl:w-[27rem] rounded-lg shadow-lg">
                        <h3 className="font-semibold text-2xl xl:text-3xl pb-4">Standard</h3>
                        <p className="text-2xl xl:text-3xl font-semibold">₹ 2,500</p>
                        <p className="text-sm xl:text-base pb-4">Per Month</p>
                        <h4 className="text-lg xl:text-xl font-semibold pb-2">Features</h4>
                        <ul className="text-sm p-2">
                            <li>Establish strong online presence.</li>
                            <li>Stunning static website design.</li>
                            <li>User-responsive and user-friendly interface.</li>
                            <li>Cutting-edge technology implementation.</li>
                            <li>Web hosting included.</li>
                            <li>Regular website maintenance.</li>
                            <li>Fast and easy page loading.</li>
                            <li>Professional Contact Us page.</li>
                            <li>SSL certificate for secure data transmission.</li>
                            <li>Identity Management System.</li>
                            <li>Admin and User Member Panel.</li>
                            <li>Professional Dashboard for members .</li>
                            <li>Efficient data management for admins.</li>
                        </ul>
                        <button
                            onClick={() => {
                                Navigate("/query");
                            }} className="text-black text-lg xl:text-xl font-semibold bg-[#30AFBC] hover:bg-white hover:text-black py-2 px-4 rounded-lg">
                            Get Started
                        </button>
                    </Box>
                    <Box sx={{
                        height: {
                            sm: "48rem",
                            md: "45rem",
                            lg: "41rem",
                        },
                    }} className="flex flex-col bg-white box xl:w-[25rem] rounded-lg shadow-lg">
                        <h3 className="font-semibold text-2xl xl:text-3xl pb-1">Advance</h3>
                        <p className="text-1xl xl:text-3xl font-semibold">₹ 5,000</p>
                        <p className="text-sm xl:text-1x1 p-1">Per Month</p>
                        <h4 className="text-lg xl:text-xl font-semibold p-1">Features</h4>
                        <ul className="text-[12px]">
                            <li>Unlock true potential of your business.</li>
                            <li>Stunning static website design.</li>
                            <li>User-responsive and user-friendly interface.</li>
                            <li>Complete Paperless Ecosystems.</li>
                            <li>Cutting-edge technology implementation.</li>
                            <li>Web hosting included.</li>
                            <li>Regular website maintenance.</li>
                            <li>Fast and easy page loading.</li>
                            <li>Professional Contact Us page.</li>
                            <li>SSL certificate for secure data transmission.</li>
                            <li>Identity Management System.</li>
                            <li>Admin and User Member Panel.</li>
                            <li>Efficient data management for admins.</li>
                            <li>Admin and User Member Panel.</li>
                            <li>Google and Facebook Ads Management</li>
                            <li>Digital Marketing, data Analysis and SEO Integration.</li>
                        </ul>

                        <button
                            onClick={() => {
                                Navigate("/query");
                            }} className="text-white text-lg xl:text-xl font-semibold bg-black hover:bg-[#30AFBC] hover:text-black py-2 px-4 rounded-lg">
                            Get Started
                        </button>

                    </Box>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Pricing;
