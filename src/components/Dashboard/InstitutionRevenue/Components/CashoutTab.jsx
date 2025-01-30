// CashoutTab.jsx
import React, { useEffect, useState } from "react";
import { API } from "aws-amplify";
import TransactionsTable from "./SubComponents/TransactionsTable";
import CurrencyCard from "./SubComponents/CurrencyCard";
import PaymentUpdateModal from "./SubComponents/paymentUpdateModal";

function CashoutTab({ institution }) {
  const [cashoutData, setCashoutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newLog, setNewLog] = useState({
    transactionId: "",
    amount: "",
    currency: "INR",
    date: "",
    status: "Transferred",
  });

  const itemsPerPage = 2;
  const totalPages = Math.ceil(
    (cashoutData?.client[0]?.cashoutLogs.length || 0) / itemsPerPage
  );

  useEffect(() => {
    fetchCashoutData();
  }, [institution]);

  const fetchCashoutData = async () => {
    try {
      const response = await API.get(
        "clients",
        `/fetch-cashout-payment-data?clientId=${institution}`
      );
      setCashoutData(response);
    } catch (error) {
      console.error("Error fetching cashout data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-4 text-center">Loading...</div>;
  if (!cashoutData) return null;

  const { client, payments } = cashoutData;
  const clientData = client[0];

  // Sort the cashoutLogs by date in descending order and paginate
  const currentItems = clientData?.cashoutLogs
    .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort by date in descending order
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage); // Paginate the sorted array

  const currencyBreakdown = payments.items.reduce((acc, payment) => {
    if (!acc[payment.currency]) {
      acc[payment.currency] = {
        total: 0,
        count: 0,
        minAmount: payment.amount,
        maxAmount: payment.amount,
      };
    }
    acc[payment.currency].total += payment.amount;
    acc[payment.currency].count += 1;
    acc[payment.currency].minAmount = Math.min(
      acc[payment.currency].minAmount,
      payment.amount
    );
    acc[payment.currency].maxAmount = Math.max(
      acc[payment.currency].maxAmount,
      payment.amount
    );
    return acc;
  }, {});

  const handleUpdatePayment = async (newPayment) => {
    try {
      const payload = {
        clientId: institution,
        cashoutLogs: [
          {
            ...newPayment,
            amount: parseFloat(newPayment.amount),
            date: new Date(newPayment.date).toISOString(),
          },
        ],
        lastUpdated: new Date().toISOString(),
      };

      await API.put("clients", "/cashout-payment-update", { body: payload });

      // Update local state after successful API call
      setCashoutData((prev) => ({
        ...prev,
        client: [
          {
            ...prev.client[0],
            cashoutLogs: [
              ...prev.client[0].cashoutLogs,
              payload.cashoutLogs[0],
            ],
            lastUpdated: payload.lastUpdated,
          },
        ],
      }));

      // Reset form and close modal
      setNewLog({
        transactionId: "",
        amount: "",
        currency: "INR",
        date: "",
        status: "Transferred",
      });
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating payment:", error);
      alert("Failed to update payment. Please try again.");
    }
  };

  return (
    <div className="p-2 sm:p-4 md:p-6 relative bg-white shadow-md max600:mb-10">
      <button
        onClick={() => setIsModalOpen(true)}
        className="absolute right-2 sm:right-4 -top-8 z-40 bg-green-100 flex px-2 items-center rounded-lg justify-center text-green-700"
      >
        <svg
          className="w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
        <span className="text-sm sm:text-base">Add Payment</span>
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {Object.entries(currencyBreakdown).map(([currency, data]) => {
          const paidAmount = clientData.cashoutLogs
            .filter(
              (log) => log.currency === currency && log.status === "Transferred"
            )
            .reduce((total, log) => total + log.amount, 0);
          return (
            <CurrencyCard
              key={currency}
              currency={currency}
              data={data}
              paidAmount={paidAmount}
            />
          );
        })}

        {/* Contact Details Card */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-md p-3 sm:p-5 transform transition-all hover:scale-104 hover:shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <div className="bg-blue-100 p-2 rounded-full mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 sm:h-6 sm:w-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h3 className="text-sm sm:text-lg font-semibold text-gray-700">
                Contact Information
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600 bg-gray-50 p-2 sm:p-3 rounded-lg">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <span className="break-all">
                {clientData.contactDetails.phone}
              </span>
            </div>
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span className="break-all">
                {clientData.contactDetails.email}
              </span>
            </div>
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <span className="break-all">{clientData.upiId}</span>
            </div>
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="break-all">
                Last Updated: {new Date(clientData.lastUpdated).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      <TransactionsTable
        currentItems={currentItems}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <PaymentUpdateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleUpdatePayment}
        newLog={newLog}
        setNewLog={setNewLog}
      />
    </div>
  );
}

export default CashoutTab;
