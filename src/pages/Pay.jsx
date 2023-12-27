import { useContext, useState } from "react";
import Navbar from "../components/Home/Navbar";
import { useNavigate } from "react-router-dom";
import Context from "../context/Context";
const Pay = () => {
  const [selectedPlan, setSelectedPlan] = useState(null); // To keep track of the selected plan
  const Ctx = useContext(Context);
  const navigate = useNavigate();
  const handlePayment = (plan) => {
    setSelectedPlan(plan); // Update the selected plan
  };
  const handleLearnMoreClick = (plan) => {
    handlePayment(plan);
    // handleApiCall(plan);
    navigateToPricing();
  };
  const navigateToPricing = () => {
    navigate("/pricing"); // Navigate to the "/pricing" route using navigate
  };

  const handleApiCall = async (plan) => {
    try {
      let apiEndpoint = "";

      switch (plan) {
        case "Basic":
          apiEndpoint = "/user/development-form/get-time/basicApi";
          console.log(`API Response for plan:1000`);
          break;
        case "Standard":
          apiEndpoint = "/user/development-form/get-time/standardApi";
          console.log(`API Response for plan:2500`);
          break;
        case "Advance":
          apiEndpoint = "/user/development-form/get-time/advanceApi";
          console.log(`API Response for plan:5000`);
          break;
        default:
          break;
      }

      if (apiEndpoint) {
        // Dummy API call - replace this with your actual API call
        const response = await fetch(apiEndpoint);
        const data = await response.json();

        console.log(`API Response for ${plan} plan:`, data);

        // No redirection for demonstration purposes
      }
    } catch (error) {
      console.error("Payment failed:", error);
      // Handle payment failure/error here
    }
  };

  return (
    <div className="flex flex-col items-center justify-center overflow-hidden">
      <div className="w-full">
        <Navbar />
      </div>
      <div className="flex flex-col lg:w-1/3 xl:w-1/3 mx-8 gap-6 lg:mr-20 mt-[9rem]">
        <div className="flex flex-col gap-6 max1008:w-[32rem] max600:w-[22rem] max406:w-[15rem]">
          {/* Basic Plan */}
          <div
            onClick={() => {
              handlePayment("Basic");
              //   handleApiCall('Basic');
            }}
            className={`flex flex-col gap-6 bg-white p-4 rounded-md shadow relative cursor-pointer ${
              selectedPlan === "Basic" ? "border-2 border-blue-500" : ""
            }`}
          >
            <div className="absolute -left-4 top-4 w-6 h-6 rounded-full border-2 ml-5 border-gray-400"></div>
            {selectedPlan === "Basic" && (
              <div className="absolute -left-4 top-4 w-6 h-6 rounded-full border-2 ml-5 border-blue-500 bg-blue-500"></div>
            )}
            <div className="flex justify-between items-center ml-5">
              <h3>Basic</h3>
              <h3>₹1,000</h3>
            </div>
            <button
              onClick={() => handleLearnMoreClick("Basic")} // Use handleLearnMoreClick function here
              className="bg-[#30AFBC] hover:bg-slate-900 text-white py-1 px-3 rounded duration-300 hover:scale-105 shadow-lg"
            >
              Learn More
            </button>
          </div>

          {/* Standard Plan */}
          <div
            onClick={() => {
              handlePayment("Standard");
              //   handleApiCall('Standard');
            }}
            className={`flex flex-col gap-6 bg-white p-4 rounded-md shadow relative cursor-pointer ${
              selectedPlan === "Standard" ? "border-2 border-blue-500" : ""
            }`}
          >
            <div className="absolute -left-4 top-4 w-6 h-6 rounded-full border-2 ml-5 border-gray-400"></div>
            {selectedPlan === "Standard" && (
              <div className="absolute -left-4 top-4 w-6 h-6 rounded-full border-2 ml-5 border-blue-500 bg-blue-500"></div>
            )}
            <div className="flex justify-between items-center ml-5">
              <h3>Standard</h3>
              <h3>₹2,500</h3>
            </div>
            <button
              onClick={() => handleLearnMoreClick("Basic")} // Use handleLearnMoreClick function here
              className="bg-[#30AFBC] hover:bg-slate-900 text-white py-1 px-3 rounded duration-300 hover:scale-105 shadow-lg"
            >
              Learn More
            </button>
          </div>

          {/* Advance Plan */}
          <div
            onClick={() => {
              handlePayment("Advance");
              //   handleApiCall('Advance');
            }}
            className={`flex flex-col gap-6 bg-white p-4 rounded-md shadow relative cursor-pointer ${
              selectedPlan === "Advance" ? "border-2 border-blue-500" : ""
            }`}
          >
            <div className="absolute -left-4 top-4 w-6 h-6 rounded-full border-2 border-gray-400 ml-5"></div>
            {selectedPlan === "Advance" && (
              <div className="absolute -left-4 top-4 w-6 h-6 rounded-full border-2 ml-5 border-blue-500 bg-blue-500"></div>
            )}
            <div className="flex justify-between items-center ml-5">
              <h3>Advance</h3>
              <h3>₹5,000</h3>
            </div>
            <button
              onClick={() => handleLearnMoreClick("Basic")} // Use handleLearnMoreClick function here
              className="bg-[#30AFBC] hover:bg-slate-900 text-white py-1 px-3 rounded duration-300 hover:scale-105 shadow-lg"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
      {selectedPlan && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => handleApiCall(selectedPlan)}
            className="bg-[#30AFBC] hover:bg-slate-900 text-white py-2 px-6 rounded duration-300 hover:scale-105 shadow-lg"
          >
            Pay
          </button>
        </div>
      )}
    </div>
  );
};

export default Pay;
