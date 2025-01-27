import React, { useState } from 'react';
import RevenueTab from './Components/RevenueTab';
import CashoutTab from './Components/CashoutTab';

function InstitutionRevenue({ institution }) {
  const [activeTab, setActiveTab] = useState("revenue");

  return (
    <div className="w-[75vw] bg-white max-w-full">
      <div className="border-b border-gray-200">
        <div className="flex border-b mb-4">
          <button
            onClick={() => setActiveTab("revenue")}
            className={`px-4 py-2 ${
              activeTab === "revenue"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Revenue
          </button>
          <button
            onClick={() => setActiveTab("cashout")}
            className={`px-4 py-2 ${
              activeTab === "cashout"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Cashout
          </button>
        </div>

        {activeTab === "revenue" && <RevenueTab institution={institution} />}
        {activeTab === "cashout" && <CashoutTab institution={institution} />}
      </div>
    </div>
  );
}

export default InstitutionRevenue;