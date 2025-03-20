import React, { useContext, useEffect, useState } from 'react';
import { Dropdown, Table } from "flowbite-react";
import Context from '../../../context/Context';
import "./Revenue.css";

// Custom styles for dropdowns
const customDropdownStyles = {
  button: {
    backgroundColor: "#30afbc",
    color: "white",
    borderRadius: "0.375rem",
    padding: "0.5rem 1rem",
    fontSize: "0.875rem",
    fontWeight: "500",
    border: "none",
    width: "100%",
  },
  item: {
    display: "block",
    width: "100%",
    padding: "0.5rem 1rem",
    clear: "both",
    fontWeight: "400",
    textAlign: "inherit",
    whiteSpace: "nowrap",
    backgroundColor: "white",
    border: "0",
  }
};

// Custom Dropdown component with our styling
const CustomDropdown = ({ label, children, className }) => {
  return (
    <Dropdown
      label={label}
      className={`custom-dropdown-button ${className}`}
      style={customDropdownStyles.button}>
      {children}
    </Dropdown>
  );
};

// Custom Dropdown Item with our styling
const CustomDropdownItem = ({ onClick, children }) => {
  return (
    <Dropdown.Item
      onClick={onClick}
      className="custom-dropdown-item hover:bg-[#30afbc] hover:text-white transition-colors duration-200">
      {children}
    </Dropdown.Item>
  );
};

function AwsaiappRevenue() {
  const { payments } = useContext(Context);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [timeFilter, setTimeFilter] = useState("all"); // "all" or "specific"
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [years, setYears] = useState([new Date().getFullYear()]);

  // Collection stats
  const [usdCollection, setUsdCollection] = useState({
    totalPayment: 0,
    totalReceived: 0,
    pending: 0,
    transactions: 0
  });

  const [inrCollection, setInrCollection] = useState({
    totalPayment: 0,
    totalReceived: 0,
    pending: 0,
    transactions: 0,
    lastCashout: "1/31/2025"
  });

  const [offlineCollection, setOfflineCollection] = useState({
    totalCollected: 0,
    transactions: 0
  });

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const processPaymentData = () => {
    // Filter payments based on selected time period
    let filtered = [];

    if (timeFilter === "all") {
      filtered = [...payments];
    } else {
      // Filter for specific year and month
      filtered = payments.filter(payment => {
        const paymentDate = new Date(payment.paymentDate);
        return paymentDate.getFullYear() === selectedYear &&
          paymentDate.getMonth() === selectedMonth;
      });
    }

    setFilteredPayments(filtered);

    // Calculate USD online collection stats
    const usdPayments = filtered.filter(p => p.currency === "USD" && p.paymentMode === "online");
    const usdTotal = usdPayments.reduce((sum, p) => sum + (p.amount / 100), 0);
    const usdReceived = usdPayments.filter(p => p.status === "completed")
      .reduce((sum, p) => sum + (p.amount / 100), 0);

    setUsdCollection({
      totalPayment: usdTotal,
      totalReceived: usdReceived,
      pending: usdTotal - usdReceived,
      transactions: usdPayments.length
    });

    // Calculate INR online collection stats
    const inrPayments = filtered.filter(p => p.currency === "INR" && p.paymentMode === "online");
    const inrTotal = inrPayments.reduce((sum, p) => sum + (p.amount / 100), 0);
    const inrReceived = inrPayments.filter(p => p.status === "completed")
      .reduce((sum, p) => sum + (p.amount / 100), 0);

    setInrCollection({
      totalPayment: inrTotal,
      totalReceived: inrReceived,
      pending: inrTotal - inrReceived,
      transactions: inrPayments.length,
      lastCashout: "1/31/2025" // Hardcoded as shown in the images
    });

    // Calculate offline collection stats
    const offlinePayments = filtered.filter(p => p.paymentMode === "offline");
    const offlineTotal = offlinePayments.reduce((sum, p) => sum + (p.amount / 100), 0);

    setOfflineCollection({
      totalCollected: offlineTotal,
      transactions: offlinePayments.length
    });
  };

  const updateAvailableYears = (payments) => {
    const uniqueYears = [...new Set(payments.map((payment) =>
      new Date(payment.paymentDate).getFullYear()))];
    setYears(uniqueYears);
  };

  useEffect(() => {
    if (payments) {
      updateAvailableYears(payments);
      processPaymentData();
    }
  }, [payments, selectedYear, selectedMonth, timeFilter]);

  // Helper function to format currency
  const formatCurrency = (amount, currency) => {
    if (currency === "USD") return `$${amount.toFixed(2)}`;
    if (currency === "INR") return `₹${amount.toFixed(2)}`;
    return amount.toFixed(2);
  };

  // Format date as MM/DD/YYYY
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

  return (
    <div className='p-2 ml-[10rem] sm:p-4 w-[120vh] wholeRevenue'>
      <div className='w-full responsive-container'>
        {/* Time Filter Selection */}
        <div className='flex justify-center mb-4 flex-col sm:flex-row items-center space-y-2 sm:space-y-0 filter-container'>
          <div className='responsive-dropdown'>
            <Dropdown
              label={timeFilter === "all" ? "All time" : `${selectedYear}`}
              className="custom-dropdown-button"
              style={{ backgroundColor: "#30afbc", color: "white" }}
            >
              <div>
                <CustomDropdownItem onClick={() => setTimeFilter("all")}>
                  All time
                </CustomDropdownItem>
                <Dropdown.Divider />
                {years.map(year => (
                  <CustomDropdownItem key={year} onClick={() => {
                    setSelectedYear(year);
                    setTimeFilter("specific");
                  }}>
                    {year}
                  </CustomDropdownItem>
                ))}
              </div>
            </Dropdown>
          </div>

          {timeFilter === "specific" && (
            <div className='sm:w-40 sm:ml-2 responsive-dropdown'>
              <Dropdown
                label={months[selectedMonth]}
                className="custom-dropdown-button"
                style={{ backgroundColor: "#30afbc", color: "white" }}
              >
                <div>
                  {months.map((month, index) => (
                    <CustomDropdownItem key={month} onClick={() => setSelectedMonth(index)}>
                      {month}
                    </CustomDropdownItem>
                  ))}
                </div>
              </Dropdown>
            </div>
          )}
        </div>

        {/* Collection Panels */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 tabs">
          {/* USD Online Collection */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-gray-200 p-2 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 3a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                </svg>
              </span>
              <h3 className="text-lg font-medium">USD Online Collection</h3>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-4">
              <div>
                <p className="text-sm text-gray-500">Total Payment</p>
                <p className="text-xl font-bold text-blue-600">${usdCollection.totalPayment.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Received</p>
                <p className="text-xl font-bold text-green-600">${usdCollection.totalReceived.toFixed(2)}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 bg-gray-50 p-2 rounded">
              <div className="text-center">
                <p className="text-xl font-medium text-blue-600">{usdCollection.transactions}</p>
                <p className="text-xs text-gray-500">Transactions</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-medium text-red-600">${usdCollection.pending.toFixed(2)}</p>
                <p className="text-xs text-gray-500">Amount Pending</p>
              </div>
            </div>
          </div>

          {/* INR Online Collection */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-gray-200 p-2 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 3a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                </svg>
              </span>
              <h3 className="text-lg font-medium">INR Online Collection</h3>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-4">
              <div>
                <p className="text-sm text-gray-500">Total Payment</p>
                <p className="text-xl font-bold text-blue-600">₹{inrCollection.totalPayment.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Received</p>
                <p className="text-xl font-bold text-green-600">₹{inrCollection.totalReceived.toFixed(2)}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 bg-gray-50 p-2 rounded">
              <div className="text-center">
                <p className="text-xl font-medium text-blue-600">{inrCollection.transactions}</p>
                <p className="text-xs text-gray-500">Transactions</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-medium text-red-600">₹{inrCollection.pending.toFixed(2)}</p>
                <p className="text-xs text-gray-500">Amount Pending</p>
              </div>
            </div>

            <div className="mt-2 text-xs text-gray-500 text-center">
              Last cashout on {inrCollection.lastCashout}
            </div>
          </div>

          {/* Offline Collection */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-gray-200 p-2 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 3a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                </svg>
              </span>
              <h3 className="text-lg font-medium">Offline Collection</h3>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-500">Total Collected</p>
              <p className="text-xl font-bold text-blue-600">₹{offlineCollection.totalCollected.toFixed(2)}</p>
            </div>

            <div className="bg-gray-50 p-2 rounded text-center">
              <p className="text-xl font-medium text-blue-600">{offlineCollection.transactions}</p>
              <p className="text-xs text-gray-500">Transactions</p>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-lg shadow overflow-hidden table-container">
          <div className="table-responsive">
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">Name</Table.HeadCell>
                <Table.HeadCell className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">Phone Number</Table.HeadCell>
                <Table.HeadCell className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">Subscription Type</Table.HeadCell>
                <Table.HeadCell className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">Payment Mode</Table.HeadCell>
                <Table.HeadCell className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">Payment Date</Table.HeadCell>
                <Table.HeadCell className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">Renew Date</Table.HeadCell>
                <Table.HeadCell className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">Amount</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {filteredPayments.map((payment, index) => {
                  // Calculate renewal date (1 month after payment date)
                  const paymentDate = new Date(payment.paymentDate);
                  const renewDate = new Date(paymentDate);
                  renewDate.setMonth(renewDate.getMonth() + 1);

                  return (
                    <Table.Row key={payment.paymentId || index} className="bg-white">
                      <Table.Cell className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {payment.userDetails?.userName || 'N/A'}
                      </Table.Cell>
                      <Table.Cell className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {payment.userDetails?.phoneNumber || 'N/A'}
                      </Table.Cell>
                      <Table.Cell className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {payment.subscriptionType || 'N/A'}
                      </Table.Cell>
                      <Table.Cell className="px-4 py-3 whitespace-nowrap text-sm text-center">
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {payment.paymentMode === "offline" ? "Offline" : "Online"}
                        </span>
                      </Table.Cell>
                      <Table.Cell className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(payment.paymentDate)}
                      </Table.Cell>
                      <Table.Cell className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(renewDate)}
                      </Table.Cell>
                      <Table.Cell className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {formatCurrency(payment.amount / 100, payment.currency)}
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table>
          </div>

          {/* Pagination */}
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 flex-col sm:flex-row space-y-2 sm:space-y-0 pagination-container">
            <div className="text-sm text-gray-700">
              Showing 1-{filteredPayments.length} of {filteredPayments.length}
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  disabled
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  Previous
                </button>
                <button
                  disabled
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AwsaiappRevenue;