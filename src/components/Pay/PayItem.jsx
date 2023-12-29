import React from "react";

const PayItem = ({
  product,
  setSelectedPlan,
  handleLearnMoreClick,
  selectedPlan,
}) => {
  return (
    <div
      onClick={() => {
        setSelectedPlan(product.productId.toString());
      }}
      className={`flex flex-col gap-6 bg-white p-4 rounded-md shadow relative cursor-pointer ${
        selectedPlan === product.productId.toString()
          ? "border-2 border-blue-500"
          : ""
      }`}
    >
      <div className="absolute -left-4 top-4 w-6 h-6 rounded-full border-2 ml-5 border-gray-400"></div>
      {selectedPlan === product.productId.toString() && (
        <div className="absolute -left-4 top-4 w-6 h-6 rounded-full border-2 ml-5 border-blue-500 bg-blue-500"></div>
      )}
      <div className="flex justify-between items-center ml-5">
        <h3>{product.heading}</h3>
        <h3>₹{product.amount / 100}</h3>
      </div>
      <button
        onClick={() => handleLearnMoreClick(product.productId.toString())} // Use handleLearnMoreClick function here
        className="bg-[#30AFBC] hover:bg-slate-900 text-white py-1 px-3 rounded duration-300 hover:scale-105 shadow-lg"
      >
        Learn More
      </button>
    </div>
  );
};

export default PayItem;