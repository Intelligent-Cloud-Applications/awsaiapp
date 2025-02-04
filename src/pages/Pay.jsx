import { useContext, useState } from "react";
import Navbar from "../components/Home/Navbar";
// import { useNavigate } from "react-router-dom";
import Context from "../context/Context";
import PayItem from "../components/Pay/PayItem";
// import { API } from "aws-amplify";
const Pay = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const Ctx = useContext(Context);

  // const UtilCtx = useContext(Context).util;
  // const Ctx = useContext(Context).user;
  // const Ctx = useContext(Context).user;
  // const Navigate = useNavigate();
  const handleLearnMoreClick = (plan) => {
    setSelectedPlan(plan);
  };

  const SecondaryColor = "#0000";
  const PrimaryColor = "#30afbc";
  return (
    <div className="flex flex-col items-center justify-center overflow-hidden">
      <div className="w-full">
        <Navbar />
      </div>
      <div className="flex flex-col lg:w-1/3 xl:w-1/3 mx-8 gap-6 lg:mr-20 mt-[9rem]">
        <div className="flex flex-col gap-6 max1008:w-[32rem] max600:w-[22rem] max406:w-[15rem]">
          {Ctx.products.map((product) => {
            return (
              <PayItem
                product={product}
                setSelectedPlan={setSelectedPlan}
                handleLearnMoreClick={handleLearnMoreClick}
                selectedPlan={selectedPlan}
              />
            );
          })}
        </div>
      </div>
      {selectedPlan && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => {
              window.open(
                `const url = https://happyprancer.com/allpayment/awsaiapp/${
                  Ctx.userData.cognitoId
                }/${Ctx.userData.emailId}?primary=${encodeURIComponent(
                  PrimaryColor
                )}&secondary=${encodeURIComponent(
                  SecondaryColor
                )}}`,
                "_blank",
                "noopener,noreferrer"
              );
            }}
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
