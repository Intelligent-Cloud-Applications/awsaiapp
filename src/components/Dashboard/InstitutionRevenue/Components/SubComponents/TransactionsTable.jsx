const TransactionsTable = ({ currentItems, currentPage, totalPages, onPageChange }) => (
  <div className="shadow-md border border-gray-200 rounded-md overflow-hidden">
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-50">
          <tr>
            {["Transaction ID", "Amount", "Date", "Status"].map(header => (
              <th key={header} className="px-2 sm:px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-900 uppercase tracking-wider">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentItems.map((log, index) => (
            <tr key={index} className="border-b border-[#ebebeb] hover:bg-gray-50">
              <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-700 truncate max-w-[120px] sm:max-w-none">
                {log.transactionId}
              </td>
              <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-700">
                {log.currency === "USD" ? "$" : "₹"}{log.amount}
              </td>
              <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-700">
                {new Date(log.date).toLocaleDateString()}
              </td>
              <td className="px-2 sm:px-4 py-2 sm:py-3">
                <span className={`px-2 py-1 rounded-lg text-xs font-medium whitespace-nowrap ${
                  log.status === "Transferred" ? "bg-green-100 text-green-800" :
                  log.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                  "bg-red-100 text-red-800"
                }`}>
                  {log.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {totalPages > 1 && (
      <div className="flex items-center p-2 sm:p-4">
        <div className="w-full flex flex-wrap items-center justify-end gap-1 sm:gap-2">
          {/* Previous Button */}
          {currentPage > 1 && (
            <button
              onClick={() => onPageChange(currentPage - 1)}
              className="px-2 sm:px-3 py-1 rounded-lg text-black hover:bg-blue-200 transition-colors duration-200 flex items-center"
            >
              <svg className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          )}

          {/* Page Numbers */}
          <div className="flex flex-wrap gap-1 sm:gap-2">
            {[...Array(totalPages)].map((_, index) => {
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
                    onClick={() => onPageChange(pageNum)}
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
                (pageNum === currentPage + 2 && currentPage < totalPages - 2)
              ) {
                return (
                  <span key={index} className="px-2 py-1 text-gray-500">
                    ...
                  </span>
                );
              }
              return null;
            })}
          </div>

          {/* Next Button */}
          {currentPage < totalPages && (
            <button
              onClick={() => onPageChange(currentPage + 1)}
              className="px-2 sm:px-3 py-1 rounded-lg text-black hover:bg-blue-200 transition-colors duration-200 flex items-center"
            >
              <svg className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          )}
        </div>
      </div>
    )}
  </div>
);

export default TransactionsTable;
