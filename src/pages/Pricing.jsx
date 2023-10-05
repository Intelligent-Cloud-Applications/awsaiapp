import Navbar from "../components/Home/Navbar";
import "./Pricing.css";
import Footer from "../components/Home/Footer";

const Pricing = () => {
    return (
        <div className="background h-screen flex flex-col justify-between">
            <Navbar />
            <div className="flex flex-col items-center justify-center pos">
                <div className="gap-6 p-20 max-w-5xl mx-auto text-center">
                    <h1 className="font-bold text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-black">
                        Find the plan that is right <span className="text-white">for you</span>
                    </h1>
                </div>

                <div className="flex flex-col md:flex-row justify-center items-center gap-5 pb-10 max-w-5xl mx-auto">
                    <div className="box bg-white p-4 md:p-8 md:w-[calc(100%/3)] xl:w-[calc(100%/3)] rounded-lg shadow-lg mb-[1rem] md:h-[45rem]">
                        <h3 className="font-semibold text-2xl xl:text-3xl pb-2">Basic</h3>
                        <p className="text-2xl xl:text-3xl font-semibold">₹ 1,000</p>
                        <p className="text-sm xl:text-base pb-4">Per Month</p>
                        <h4 className="text-lg xl:text-xl font-semibold pb-2">Features</h4>
                        <ul className="text-sm xl:text-base p-2">
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
                        <div className="flex justify-center items-center pt-4">
                            <button className="text-white text-lg xl:text-xl font-semibold bg-black hover:bg-[#30AFBC] hover:text-black py-2 px-4 rounded-lg">
                                Get Started
                            </button>
                        </div>
                    </div>
                    {/* Middle Box */}
                    <div className="bg-[#1D1D1D] p-4 box text-white md:p-8 md:w-[calc(100%/3)] xl:w-[calc(100%/2.5)] rounded-lg shadow-lg">
                        <h3 className="font-semibold text-2xl xl:text-3xl pb-4">Standard</h3>
                        <p className="text-2xl xl:text-3xl font-semibold">₹ 2,500</p>
                        <p className="text-sm xl:text-base pb-4">Per Month</p>
                        <h4 className="text-lg xl:text-xl font-semibold pb-2">Features</h4>
                        <ul className="text-sm xl:text-base p-2">
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
                        <div className="flex justify-center items-center pt-4">
                            <button className="text-black text-lg xl:text-xl font-semibold bg-[#30AFBC] hover:bg-white hover:text-black py-2 px-4 rounded-lg">
                                Get Started
                            </button>
                        </div>
                    </div>
                    <div className="bg-white box p-1 md:p-1 md:w-[calc(100%/3)] xl:w-[calc(100%/3)] rounded-lg shadow-lg mb-[1rem] md:h-[45rem]">
                        <h3 className="font-semibold text-2xl xl:text-3xl pb-2">Advance</h3>
                        <p className="text-1xl xl:text-3xl font-semibold">₹ 5,000</p>
                        <p className="text-sm xl:text-base p-1">Per Month</p>
                        <h4 className="text-lg xl:text-xl font-semibold p-1">Features</h4>
                        <ul className="text-[10px] xl:text-base">
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
                        <div className="flex justify-center items-center pt-4">
                            <button className="text-white text-lg xl:text-xl font-semibold bg-black hover:bg-[#30AFBC] hover:text-black py-2 px-4 rounded-lg">
                                Get Started
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Pricing;
