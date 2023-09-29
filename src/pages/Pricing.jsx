import Navbar from "../components/Home/Navbar";
import "./Pricing.css";
import Footer from "../components/Home/Footer";

const Pricing = () => {
    return (
        <div className="background">
            <Navbar />
            <div className="justify-center items-center max500:bg-black ">
                <div className="max500:bg-[#30AFBC] max500:h-[10rem]"
                style={{borderBottomLeftRadius: 20,
                    borderBottomRightRadius: 20, height:"12rem",}}>
                    <div className="justify-center item-center gap-6 pb-20 max500:pb-2">
                        <h1 className="text-center font-bold text-[2.5rem] justify-center items-center pt-10 max500:text-[1.2rem] max500:text-white max500:w-[85%] max500:pl-[5rem] max800:pl-[2rem] max500:flex-col">
                            Find the plan that is right<span className="text-white m-3 max400:m-[2rem]">for you</span>
                        </h1>
                    </div>
                </div>
                <div className="flex justify-center items-start gap-6 pb-10 max1050:gap-4 max800:flex-col max500:flex-col max500:pt-[-2rem] overflow-visible">
                    <div className="flex flex-row max800:flex-row max500:flex-col">
                        <div className="pt-[1.8rem] p-[1.5rem] max800:p-[2rem] max800:pt-0">
                            <div className=" box p-[2rem] bg-[#FFFFFF] h-[740px] w-[340px] max1050:w-[300px] max1050:p-[0.5rem] max500:w-[100px]">
                                <h3 className="font-semi-bold text-[34px] pb-[1rem]">Basic</h3>
                                <p className="text-[32px] font-semi-bold">₹ 1,000</p>
                                <p className="text-[12px] pb-[3rem]">Per Month</p>
                                <h4 className="text-[15px] font-bold pb-[1rem]">Features</h4>
                                <ul className="text-[11px] p-[2rem]">
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
                                <div className="flex w-full justify-center items-center pt-[2rem]">
                                    <button className="text-white text-[20px] font-semi-bold bg-[#000000] w-60 hover:bg-[#30AFBC] hover:text-black">
                                        Get Started
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* Middle Box */}
                        <div className="flex-col text-white box p-[2rem] bg-[#1D1D1D] h-[800px] w-[380px] max1050:w-[350px] max800:h-[740px] max1050:w-[300px]">
                            <h3 className="font-semi-bold text-[34px] pb-[2rem]">Standard</h3>
                            <p className="text-[32px] font-semi-bold">₹ 2,500</p>
                            <p className="text-[12px] pb-[2.5rem]">Per Month</p>
                            <h4 className="text-[15px] font-bold pb-[1rem]">Features</h4>
                            <ul className="text-[11px] p-[1rem]">
                                <li>Establish strong online presence .</li>
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
                            <div className="flex w-full justify-center items-center">
                                <button className="text-black text-[20px] font-semi-bold bg-[#30AFBC] w-60 hover:bg-white hiver:text-black">
                                    Get Started
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="pt-[1.8rem] max800:pl-[30%]">
                        <div className="flex-col box p-[2rem] bg-[#FFFFFF] h-[740px] w-[340px] max1050:w-[300px] max1050:p-[0.5rem]">
                            <h3 className="font-semi-bold text-[34px] pb-[1rem]">Advance</h3>
                            <p className="text-[32px] font-semi-bold">₹ 5,000</p>
                            <p className="text-[12px] pb-[0.6rem]">Per Month</p>
                            <h4 className="text-[15px] font-bold pb-[0.6rem]">Features</h4>
                            <ul className="text-[11px] p-[0.6rem]">
                                <li>Unlock true potential of your business .</li>
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
                            <div className="flex w-full justify-center items-center">
                                <button className="text-white text-[20px] font-semi-bold bg-[#000000] w-60 hover:bg-[#30AFBC] hover:text-black">
                                    Get Started
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Pricing;
