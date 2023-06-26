import React, { useState, useEffect, useContext } from "react";
import Context from "../../Context/Context";
import { useNavigate } from "react-router-dom";
import RtigerRazorpay from "./RtigerRazorpay";
import LeftBanner from "../DashBoard/LeftBanner"

const Product = (product) => {
  const Ctx = useContext(Context);
  const UserCtx = useContext(Context).userData;

  const Navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [expirationDate, setExpirationDate] = useState(null); 

  
  const handlePlanSelection = (plan, expiration) => {
    setSelectedPlan(plan); // Update the selected plan
    setExpirationDate(expiration); // Update the expiration date
  };
  
  const handleDashboardSubmit = () => {
    // Logic to handle submitting the selected plan and expiration date to the server
    // You can make an API call or perform any other necessary action here
    // For demonstration purposes, let's just console log the values
    console.log("Selected Plan:", selectedPlan);
    console.log("Expiration Date:", expirationDate);
  };
  useEffect(() => {
    setSelectedPlan(null); // Reset the selected plan when the product changes
    setExpirationDate(null); // Reset the expiration date when the product changes
  }, [product]);
  
  return (
    <li className="bg-white w-[20rem] h-[24rem] max450:h-[25rem] rounded-[2rem]  flex flex-col justify-center items-center gap-8 shadowSubscribe   max450:w-[90vw] max450:gap-[1.2rem] max450:text-[1rem]   max450:p-12  border-[0.1rem]">
      <p className="font-gidugu leading-[1.5rem] h-[1rem] max450:mb-[1.2rem] text-[3.2rem]">
        {product.heading}
      </p>
      <p className="font-poppins text-[1.2rem] text-center w-[80%] max450:w-[100%] ">
        {product.description}
      </p>
      <h1 className="text-center text-[1rem] font-russo w-[100%]">
        {(product.currency === "INR" ? "₹" : "$") +
          product.amount / 100 +
          " / " +
          product.subscriptionType}
      </h1>
      {Ctx.isAuth ? (
        <div>
          {UserCtx.status === "Active" ? (
            <p className="w-[15rem] px-12 py-2 font-russo  text-[#FDCF08] bg-white border-[#FDCF08] border-[0.3rem] h-[3rem] flex justify-center items-center  max450:w-[40vw]">
              Subscribed
            </p>
          ) : (
            <>
              {product.currency === "INR" ? (
                <RtigerRazorpay
                  productId={product.productId}
                  handlePlanSelection={handlePlanSelection} // Pass the handlePlanSelection function as a prop
                />
              ) : (
                <div></div>
              )}
            </>
          )}
        </div>
      ) : (
        <button
          onClick={() => {
            Navigate("/signup");
          }}
          className="w-[15rem] bg-[#FDCF08] text-black px-12 py-2 font-russo  hover:text-[#FDCF08] hover:bg-white hover:border-[#FDCF08] hover:border-[0.3rem] h-[3rem] flex justify-center items-center  max450:w-[40vw]"
        >
          Sign Up
        </button>
      )}

      {selectedPlan && expirationDate && (
        <LeftBanner
          selectedPlan={selectedPlan}
          expirationDate={expirationDate}
          handleSubmit={handleDashboardSubmit} // Pass the handleDashboardSubmit function as a prop
        />
      )}
    </li>
  );
};

export default Product;
