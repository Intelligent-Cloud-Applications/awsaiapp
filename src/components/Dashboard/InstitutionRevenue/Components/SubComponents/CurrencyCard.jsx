const CurrencyCard = ({ currency, data, paidAmount }) => {
  // Ensure paidAmount is a number, default to 0 if undefined or null
  const paidAmountNumber = Number(paidAmount) || 0;

  // Calculate remaining amount
  const remainingAmount = data.total - paidAmountNumber;

  // Determine currency symbol
  const currencySymbol = currency === "USD" ? "$" : "₹";

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-md p-3 sm:p-5 transform transition-all hover:scale-104 hover:shadow-xl">
      <div className="flex items-center mb-4">
        <div className="bg-blue-100 p-2 rounded-full mr-3">
          <svg className="h-4 w-4 sm:h-6 sm:w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        </div>
        <h3 className="text-sm sm:text-lg font-semibold text-gray-700">{currency} Financial Summary</h3>
      </div>
      <div className="text-center">
        <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-4">
          <div>
            <div className="text-xs sm:text-sm text-gray-500 mb-1">Total Collected</div>
            <div className="text-lg sm:text-2xl font-bold text-blue-600">
              {currencySymbol}{data.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </div>
          </div>
          <div>
            <div className="text-xs sm:text-sm text-gray-500 mb-1">Total Paid</div>
            <div className="text-lg sm:text-2xl font-bold text-green-600">
              {currencySymbol}{paidAmountNumber.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600 bg-gray-50 p-2 sm:p-3 rounded-lg">
          <div className="text-center">
            <div className="font-bold text-blue-600">{data.count}</div>
            <div>Transactions</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-orange-600">
              {currencySymbol}{remainingAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </div>
            <div>Remaining Amount</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyCard;