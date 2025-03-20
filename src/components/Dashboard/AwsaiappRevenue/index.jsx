import React, { useContext, useEffect, useState } from 'react';
import { Dropdown, Table } from "flowbite-react";
import Context from '../../../context/Context';
import "./Revenue.css";

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
  const [paymentGateway, setPaymentGateway] = useState("all"); // "all", "razorpay", or "paypal"

  // Collection stats for different time periods
  const [currentMonthStats, setCurrentMonthStats] = useState({
    usd: { totalPayment: 0, totalReceived: 0, transactions: 0 },
    inr: { totalPayment: 0, totalReceived: 0, transactions: 0 },
    total: { totalPayment: 0, totalReceived: 0, transactions: 0 }
  });

  const [lastMonthStats, setLastMonthStats] = useState({
    usd: { totalPayment: 0, totalReceived: 0, transactions: 0 },
    inr: { totalPayment: 0, totalReceived: 0, transactions: 0 },
    total: { totalPayment: 0, totalReceived: 0, transactions: 0 }
  });

  const [currentYearStats, setCurrentYearStats] = useState({
    usd: { totalPayment: 0, totalReceived: 0, transactions: 0 },
    inr: { totalPayment: 0, totalReceived: 0, transactions: 0 },
    total: { totalPayment: 0, totalReceived: 0, transactions: 0 }
  });

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const calculateStats = (paymentsList) => {
    // Filter based on payment gateway
    let filteredList = [...paymentsList];
    if (paymentGateway === "razorpay") {
      filteredList = paymentsList.filter(p => p.currency === "INR" && p.paymentMode === "online");
    } else if (paymentGateway === "paypal") {
      filteredList = paymentsList.filter(p => p.currency === "USD" && p.paymentMode === "online");
    }

    // Current month stats
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    
    const currentMonthPayments = filteredList.filter(payment => {
      const paymentDate = new Date(payment.paymentDate);
      return paymentDate.getMonth() === currentMonth && 
             paymentDate.getFullYear() === currentYear;
    });
    
    // Last month stats
    let lastMonth = currentMonth - 1;
    let lastMonthYear = currentYear;
    if (lastMonth < 0) {
      lastMonth = 11;
      lastMonthYear--;
    }
    
    const lastMonthPayments = filteredList.filter(payment => {
      const paymentDate = new Date(payment.paymentDate);
      return paymentDate.getMonth() === lastMonth && 
             paymentDate.getFullYear() === lastMonthYear;
    });
    
    // Current year stats
    const currentYearPayments = filteredList.filter(payment => {
      const paymentDate = new Date(payment.paymentDate);
      return paymentDate.getFullYear() === currentYear;
    });

    // Calculate stats for each time period
    setCurrentMonthStats(calculatePeriodStats(currentMonthPayments));
    setLastMonthStats(calculatePeriodStats(lastMonthPayments));
    setCurrentYearStats(calculatePeriodStats(currentYearPayments));
    
    // Update filtered payments based on current time filter
    let displayPayments = [];
    if (timeFilter === "all") {
      displayPayments = filteredList;
    } else {
      // Filter for specific year and month
      displayPayments = filteredList.filter(payment => {
        const paymentDate = new Date(payment.paymentDate);
        return paymentDate.getFullYear() === selectedYear &&
               paymentDate.getMonth() === selectedMonth;
      });
    }
    
    setFilteredPayments(displayPayments);
  };

  const calculatePeriodStats = (periodPayments) => {
    // USD stats
    const usdPayments = periodPayments.filter(p => p.currency === "USD" && p.paymentMode === "online");
    const usdTotal = usdPayments.reduce((sum, p) => sum + (p.amount / 100), 0);
    const usdReceived = usdPayments.filter(p => p.status === "completed")
      .reduce((sum, p) => sum + (p.amount / 100), 0);
      
    // INR stats
    const inrPayments = periodPayments.filter(p => p.currency === "INR" && p.paymentMode === "online");
    const inrTotal = inrPayments.reduce((sum, p) => sum + (p.amount / 100), 0);
    const inrReceived = inrPayments.filter(p => p.status === "completed")
      .reduce((sum, p) => sum + (p.amount / 100), 0);
      
    // Combined stats
    return {
      usd: {
        totalPayment: usdTotal,
        totalReceived: usdReceived,
        transactions: usdPayments.length
      },
      inr: {
        totalPayment: inrTotal,
        totalReceived: inrReceived,
        transactions: inrPayments.length
      },
      total: {
        totalPayment: usdTotal + inrTotal,
        totalReceived: usdReceived + inrReceived,
        transactions: usdPayments.length + inrPayments.length
      }
    };
  };

  const updateAvailableYears = (payments) => {
    const uniqueYears = [...new Set(payments.map((payment) =>
      new Date(payment.paymentDate).getFullYear()))];
    setYears(uniqueYears);
  };

  useEffect(() => {
    if (payments) {
      updateAvailableYears(payments);
      calculateStats(payments);
    }
  }, [payments, selectedYear, selectedMonth, timeFilter, paymentGateway]);

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

  // Get current month name
  const currentMonthName = months[new Date().getMonth()];
  
  // Get last month name
  let lastMonthIndex = new Date().getMonth() - 1;
  if (lastMonthIndex < 0) lastMonthIndex = 11;
  const lastMonthName = months[lastMonthIndex];
  
  // Get current year
  const currentYear = new Date().getFullYear();

  return (
    <div className='p-2 ml-[10rem] sm:p-4 w-[120vh] wholeRevenue'>
      <div className='w-full responsive-container'>
        {/* Filter Section */}
        <div className='flex justify-between mb-4 flex-col sm:flex-row items-center space-y-2 sm:space-y-0 filter-container'>
          {/* Time Filter - Original dropdowns preserved */}
          <div className='flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 responsive-dropdown'>
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

          {/* Payment Gateway Filter */}
          <div className='responsive-dropdown'>
            <Dropdown
              label={paymentGateway === "all" ? "All Gateways" : paymentGateway === "razorpay" ? "Razorpay" : "PayPal"}
              className="custom-dropdown-button"
              style={{ backgroundColor: "#30afbc", color: "white" }}
            >
              <div>
                <CustomDropdownItem onClick={() => setPaymentGateway("all")}>
                  All Gateways
                </CustomDropdownItem>
                <CustomDropdownItem onClick={() => setPaymentGateway("razorpay")}>
                  Razorpay (INR)
                </CustomDropdownItem>
                <CustomDropdownItem onClick={() => setPaymentGateway("paypal")}>
                  PayPal (USD)
                </CustomDropdownItem>
              </div>
            </Dropdown>
          </div>
        </div>

        {/* Collection Panels */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 tabs">
          {/* Current Month Revenue */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-gray-200 p-2 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 3a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                </svg>
              </span>
              <h3 className="text-lg font-medium">{currentMonthName} Revenue</h3>
            </div>

            <div className="mb-3">
              <p className="text-sm text-gray-500">Total Payment</p>
              <div className="flex items-center justify-between">
                <p className="text-lg font-bold text-blue-600">
                  ${currentMonthStats.usd.totalPayment.toFixed(2)} + ₹{currentMonthStats.inr.totalPayment.toFixed(2)}
                </p>
              </div>
            </div>

            <div className="mb-3">
              <p className="text-sm text-gray-500">Total Received</p>
              <div className="flex items-center justify-between">
                <p className="text-lg font-bold text-green-600">
                  ${currentMonthStats.usd.totalReceived.toFixed(2)} + ₹{currentMonthStats.inr.totalReceived.toFixed(2)}
                </p>
              </div>
            </div>

            <div className="bg-gray-50 p-2 rounded text-center mb-2">
              <div className="flex justify-around">
                <div>
                  <p className="text-sm font-medium text-blue-600">{currentMonthStats.usd.transactions}</p>
                  <p className="text-xs text-gray-500">USD Trans</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-600">{currentMonthStats.inr.transactions}</p>
                  <p className="text-xs text-gray-500">INR Trans</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-600">{currentMonthStats.total.transactions}</p>
                  <p className="text-xs text-gray-500">Total</p>
                </div>
              </div>
            </div>
          </div>

          {/* Last Month Revenue */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-gray-200 p-2 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 3a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                </svg>
              </span>
              <h3 className="text-lg font-medium">{lastMonthName} Revenue</h3>
            </div>

            <div className="mb-3">
              <p className="text-sm text-gray-500">Total Payment</p>
              <div className="flex items-center justify-between">
                <p className="text-lg font-bold text-blue-600">
                  ${lastMonthStats.usd.totalPayment.toFixed(2)} + ₹{lastMonthStats.inr.totalPayment.toFixed(2)}
                </p>
              </div>
            </div>

            <div className="mb-3">
              <p className="text-sm text-gray-500">Total Received</p>
              <div className="flex items-center justify-between">
                <p className="text-lg font-bold text-green-600">
                  ${lastMonthStats.usd.totalReceived.toFixed(2)} + ₹{lastMonthStats.inr.totalReceived.toFixed(2)}
                </p>
              </div>
            </div>

            <div className="bg-gray-50 p-2 rounded text-center mb-2">
              <div className="flex justify-around">
                <div>
                  <p className="text-sm font-medium text-blue-600">{lastMonthStats.usd.transactions}</p>
                  <p className="text-xs text-gray-500">USD Trans</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-600">{lastMonthStats.inr.transactions}</p>
                  <p className="text-xs text-gray-500">INR Trans</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-600">{lastMonthStats.total.transactions}</p>
                  <p className="text-xs text-gray-500">Total</p>
                </div>
              </div>
            </div>
          </div>

          {/* Current Year Revenue */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-gray-200 p-2 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 3a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                </svg>
              </span>
              <h3 className="text-lg font-medium">{currentYear} Revenue</h3>
            </div>

            <div className="mb-3">
              <p className="text-sm text-gray-500">Total Payment</p>
              <div className="flex items-center justify-between">
                <p className="text-lg font-bold text-blue-600">
                  ${currentYearStats.usd.totalPayment.toFixed(2)} + ₹{currentYearStats.inr.totalPayment.toFixed(2)}
                </p>
              </div>
            </div>

            <div className="mb-3">
              <p className="text-sm text-gray-500">Total Received</p>
              <div className="flex items-center justify-between">
                <p className="text-lg font-bold text-green-600">
                  ${currentYearStats.usd.totalReceived.toFixed(2)} + ₹{currentYearStats.inr.totalReceived.toFixed(2)}
                </p>
              </div>
            </div>

            <div className="bg-gray-50 p-2 rounded text-center mb-2">
              <div className="flex justify-around">
                <div>
                  <p className="text-sm font-medium text-blue-600">{currentYearStats.usd.transactions}</p>
                  <p className="text-xs text-gray-500">USD Trans</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-600">{currentYearStats.inr.transactions}</p>
                  <p className="text-xs text-gray-500">INR Trans</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-600">{currentYearStats.total.transactions}</p>
                  <p className="text-xs text-gray-500">Total</p>
                </div>
              </div>
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
                <Table.HeadCell className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">Payment Gateway</Table.HeadCell>
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

                  // Determine payment gateway
                  const gateway = payment.paymentMode === "offline" 
                                ? "Offline" 
                                : payment.currency === "USD" 
                                  ? "PayPal" 
                                  : "Razorpay";

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
                      <Table.Cell className="px-4 py-3 whitespace-nowrap text-sm text-center">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          gateway === "PayPal" 
                            ? "bg-blue-100 text-blue-800" 
                            : gateway === "Razorpay" 
                              ? "bg-purple-100 text-purple-800" 
                              : "bg-gray-100 text-gray-800"
                        }`}>
                          {gateway}
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