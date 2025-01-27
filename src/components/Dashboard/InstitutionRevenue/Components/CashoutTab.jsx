import React, { useEffect, useState } from "react";
import { API } from "aws-amplify";
import PaymentUpdateModal from "./paymentUpdateModal";

function CashoutTab({ institution }) {
  const [cashoutData, setCashoutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newLog, setNewLog] = useState({
    transactionId: "",
    amount: "",
    currency: "INR",
    date: "",
    status: "Transferred",
  });
  const itemsPerPage = 4;

  // Existing handlers and useEffect remain the same
  const handleUpdatePayment = async () => {
    try {
      if (!newLog.transactionId || !newLog.amount || !newLog.date) {
        alert("Please fill all required fields");
        return;
      }

      const payload = {
        clientId: institution,
        cashoutLogs: [
          {
            amount: parseFloat(newLog.amount),
            date: new Date(newLog.date).toISOString(),
            status: newLog.status,
            transactionId: newLog.transactionId,
            currency: newLog.currency,
          },
        ],
        lastUpdated: new Date().toISOString(),
      };

      await API.put("clients", "/cashout-payment-update", { body: payload });

      setCashoutData((prevData) => ({
        ...prevData,
        client: [
          {
            ...prevData.client[0],
            cashoutLogs: [
              ...prevData.client[0].cashoutLogs,
              payload.cashoutLogs[0],
            ],
            lastUpdated: payload.lastUpdated,
          },
        ],
      }));

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
      alert("Failed to update payment");
    }
  };

  useEffect(() => {
    const fetchCashoutData = async () => {
      try {
        setLoading(true);
        const response = await API.get(
          "clients",
          `/fetch-cashout-payment-data?clientId=${institution}`
        );
        setCashoutData(response);
      } catch (error) {
        console.error("Error fetching cashout data:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCashoutData();
  }, [institution]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =
    cashoutData?.client[0]?.cashoutLogs.slice(
      indexOfFirstItem,
      indexOfLastItem
    ) || [];

  const totalPages = Math.ceil(
    (cashoutData?.client[0]?.cashoutLogs.length || 0) / itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) return <div className="p-4 text-center">Loading...</div>;
  if (error)
    return <div className="p-4 text-red-500">Error fetching cashout data</div>;
  if (!cashoutData) return null;

  const { client, payments } = cashoutData;
  const clientData = client[0];

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

  return (
    <div className="p-2 sm:p-4 md:p-6 relative bg-white shadow-md max600:mb-10">
      {/* Add Payment Button - Responsive positioning */}
      <div
        className="absolute cursor-pointer right-2 sm:right-4 -top-8 z-50 bg-green-100 flex px-2 items-center rounded-lg justify-center text-green-700"
        onClick={() => setIsModalOpen(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
        <p className="text-green-700 text-sm sm:text-base">Add Payment</p>
      </div>

      {/* Currency Financial Overview - Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {Object.entries(currencyBreakdown).map(([currency, data]) => {
          const paidAmount = clientData.cashoutLogs
            .filter(
              (log) => log.currency === currency && log.status === "Transferred"
            )
            .reduce((total, log) => total + log.amount, 0);

          return (
            <div
              key={currency}
              className="bg-white border border-gray-200 rounded-xl shadow-md p-3 sm:p-5 transform transition-all hover:scale-104 hover:shadow-xl"
            >
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
                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-sm sm:text-lg font-semibold text-gray-700">
                    {currency} Financial Summary
                  </h3>
                </div>
              </div>

              <div className="text-center">
                <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-4">
                  <div>
                    <div className="text-xs sm:text-sm text-gray-500 mb-1">
                      Total Collected
                    </div>
                    <div className="text-lg sm:text-2xl font-bold text-blue-600">
                      {currency === "USD" ? "$" : "₹"}
                      {data.total.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm text-gray-500 mb-1">
                      Total Paid
                    </div>
                    <div className="text-lg sm:text-2xl font-bold text-green-600">
                      {currency === "USD" ? "$" : "₹"}
                      {paidAmount.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600 bg-gray-50 p-2 sm:p-3 rounded-lg">
                  <div className="text-center">
                    <div className="font-bold text-blue-600">{data.count}</div>
                    <div>Transactions</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-blue-600">
                      {currency === "USD" ? "$" : "₹"}
                      {data.minAmount.toFixed(2)} -{" "}
                      {currency === "USD" ? "$" : "₹"}
                      {data.maxAmount.toFixed(2)}
                    </div>
                    <div>Amount Range</div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Contact Details - Responsive */}
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
                Last Updated:{" "}
                {new Date(clientData.lastUpdated).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      <PaymentUpdateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleUpdatePayment}
        newLog={newLog}
        setNewLog={setNewLog}
      />

      <div className="shadow-md border border-gray-200 rounded-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                {["Transaction ID", "Amount", "Date", "Status"].map(
                  (header) => (
                    <th
                      key={header}
                      className="px-2 sm:px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-900 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {currentItems.map((log, index) => (
                <tr
                  key={index}
                  className={`border-b border-[#ebebeb] hover:bg-gray-${
                    index % 2 === 0 ? "50" : "50"
                  }`}
                >
                  <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-700 truncate max-w-[120px] sm:max-w-none">
                    {log.transactionId}
                  </td>
                  <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-700">
                    {log.currency === "USD" ? "$" : "₹"}
                    {log.amount}
                  </td>
                  <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-700">
                    {new Date(log.date).toLocaleDateString()}
                  </td>
                  <td className="px-2 sm:px-4 py-2 sm:py-3">
                    <span
                      className={`px-2 py-1 rounded-lg text-xs font-medium whitespace-nowrap ${
                        log.status === "Transferred"
                          ? "bg-green-100 text-green-800"
                          : log.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Responsive Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center p-2 sm:p-4">
            <div className="w-full flex flex-wrap items-center justify-end gap-1 sm:gap-2">
              {currentPage > 1 && (
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="px-2 sm:px-3 py-1 rounded-lg text-black hover:bg-blue-200 transition-colors duration-200 flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 sm:h-5 sm:w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              )}

              {/* Show limited page numbers on mobile */}
              <div className="flex flex-wrap gap-1 sm:gap-2">
                {[...Array(totalPages)].map((_, index) => {
                  // Show first page, current page, last page, and one page before and after current
                  const pageNum = index + 1;
                  if (
                    pageNum === 1 ||
                    pageNum === totalPages ||
                    pageNum === currentPage ||
                    pageNum === currentPage - 1 ||
                    pageNum === currentPage + 1
                  ) {
                    return (
                      <button
                        key={index}
                        onClick={() => handlePageChange(pageNum)}
                        className={`min-w-[32px] px-2 sm:px-3 py-1 sm:py-2 rounded-lg transition-all duration-200 ${
                          currentPage === pageNum
                            ? "bg-blue-100 text-blue-800 shadow-md"
                            : "bg-gray-50 text-gray-800 hover:bg-blue-200"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  } else if (
                    (pageNum === currentPage - 2 && currentPage > 3) ||
                    (pageNum === currentPage + 2 &&
                      currentPage < totalPages - 2)
                  ) {
                    // Show ellipsis
                    return (
                      <span key={index} className="px-2 py-1 text-gray-500">
                        ...
                      </span>
                    );
                  }
                  return null;
                })}
              </div>

              {currentPage < totalPages && (
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="px-2 sm:px-3 py-1 rounded-lg text-black hover:bg-blue-200 transition-colors duration-200 flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 sm:h-5 sm:w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CashoutTab;
