import React from 'react';

function PaymentUpdateModal({ 
  isOpen, 
  onClose, 
  onSubmit, 
  newLog, 
  setNewLog 
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
      <div className="relative w-full max-w-md mx-auto my-6 max600:w-[92vw]">
        <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-2xl">
          {/* Modal Header */}
          <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-gray-300">
            <h3 className="text-xl font-semibold text-gray-800">
              Update Payment Details
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Modal Body */}
          <div className="relative p-6 space-y-4">
            {/* Transaction ID */}
            <div>
              <label className="block mb-2 ml-2 text-sm font-medium text-gray-700">
                Transaction ID
              </label>
              <input
                type="text"
                value={newLog.transactionId}
                onChange={(e) => setNewLog({...newLog, transactionId: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Transaction ID"
                required
              />
            </div>

            {/* Amount */}
            <div>
              <label className="block mb-2 ml-2 text-sm font-medium text-gray-700">
                Amount
              </label>
              <input
                type="number"
                value={newLog.amount}
                onChange={(e) => setNewLog({...newLog, amount: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Amount"
                required
              />
            </div>

            {/* Currency */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Currency
              </label>
              <select
                value={newLog.currency}
                onChange={(e) => setNewLog({...newLog, currency: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="INR">INR</option>
                <option value="USD">USD</option>
              </select>
            </div>

            {/* Date */}
            <div>
              <label className="block mb-2 ml-2 text-sm font-medium text-gray-700">
                Date
              </label>
              <input
                type="date"
                value={newLog.date}
                onChange={(e) => setNewLog({...newLog, date: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Status */}
            <div>
              <label className="block mb-2 ml-2 text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                value={newLog.status}
                onChange={(e) => setNewLog({...newLog, status: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Transferred">Transferred</option>
                <option value="Pending">Pending</option>
                <option value="Failed">Failed</option>
              </select>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex justify-end p-6 border-t border-gray-300 space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 bg-[#ffd3d3] rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={onSubmit}
              className="px-4 py-2 text-white bg-[#2396b3] rounded-md hover:bg-blue-700"
            >
              Add Payment
            </button>
          </div>
        </div>
      </div>
      {/* Background overlay */}
      <div className="fixed inset-0 z-[-1] bg-black opacity-25"></div>
    </div>
  );
}

export default PaymentUpdateModal;