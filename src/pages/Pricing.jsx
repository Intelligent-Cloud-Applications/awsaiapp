import Navbar from "../components/Home/Navbar";
import "./Pricing.css";

const Pricing = () => {
    return (
        <div className="background">
            <Navbar />
            <div className="justify-center items-center h-screen">
                <div>
                    <div className="justify-center item-center w-full gap-6 pb-20">
                        <h1 className="flex font-bold text-[2.5rem] justify-center items-center pt-10">
                            Find the plan that is right <p className="text-white pl-2">for you</p>
                        </h1>
                    </div>
                </div>
                <div className="flex justify-center items-start gap-6">
                    <div className="pt-[1.8rem]">
                        <div className="flex-col box p-[2rem] bg-[#FFFFFF] h-[740px] w-[340px]">
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
                            <div className="flex w-full justify-center items-center">
                                <button className="text-white text-[20px] font-semi-bold bg-[#000000] w-60">
                                    Get Started
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Middle Box */}
                    <div className="flex-col text-white box p-[2rem] bg-[#1D1D1D] h-[800px] w-[360px]">
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
                            <button className="text-[#00000] text-[20px] font-semi-bold bg-[#30AFBC] w-60">
                                Get Started
                            </button>
                        </div>
                    </div>
                    <div className="pt-[1.8rem]">
                        <div className="flex-col box p-[2rem] bg-[#FFFFFF] h-[740px] w-[340px]">
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
                                <button className="text-white text-[20px] font-semi-bold bg-[#000000] w-60">
                                    Get Started
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <Footer/> */}
        </div>
    );
};

export default Pricing;
