import React, { useContext, useEffect, useState } from 'react';
import PaymentDetailModal from './PaymentDetailModal'; // Import the modal component
import { Dropdown, Table, Pagination } from "flowbite-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
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

const AwsaiappRevenue = () => {
  const { payments, products } = useContext(Context);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState({}); // State for selected payment
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const currentPayments = filteredPayments.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
  const [timeFilter, setTimeFilter] = useState("all"); // "all" or "specific"
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [years, setYears] = useState([new Date().getFullYear()]);
  const [paymentGateway, setPaymentGateway] = useState("all"); // "all", "razorpay", or "paypal"
  const [institutionPaymentHistory, setInstitutionPaymentHistory] = useState({});
  const [institutionReccuring, setInstitutionReccuring] = useState();
  const customTheme = {
    pages: {
      base: "bg-white xs:mt-0 mt-2 inline-flex items-center -space-x-px",
      showIcon: "inline-flex",
      active: "bg-blue-500 text-white",
      disabled: "bg-gray-200",
      previous: {
        base: "ml-0 rounded-l-md border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-[#30afbc] hover:text-white dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 hover:dark:bg-[#30afbc] hover:dark:text-white",
        icon: "h-5 w-5 text-gray-500 hover:text-white",
      },
      next: {
        base: "rounded-r-md border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-[#30afbc] hover:text-white dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 hover:dark:bg-[#30afbc] hover:dark:text-white",
        icon: "h-5 w-5 text-gray-500 hover:text-white",
      },
      selector: {
        base: "w-12 border border-gray-300 bg-white py-2 leading-tight text-gray-500 hover:bg-[#30afbc] hover:text-white dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 hover:dark:bg-[#30afbc] hover:dark:text-white",
        active: "bg-[#30afbc] text-white hover:bg-[#30afbc] hover:text-white",
        disabled: "cursor-not-allowed opacity-50",
      },
    },
  };
  // Collection stats for different time periods
  const [currentMonthStats, setCurrentMonthStats] = useState({
    usd: { totalPayment: 0, transactions: 0 },
    inr: { totalPayment: 0, transactions: 0 },
    total: { totalPayment: 0, transactions: 0 }
  });

  const [lastMonthStats, setLastMonthStats] = useState({
    usd: { totalPayment: 0, transactions: 0 },
    inr: { totalPayment: 0, transactions: 0 },
    total: { totalPayment: 0, transactions: 0 }
  });

  const [currentYearStats, setCurrentYearStats] = useState({
    usd: { totalPayment: 0, transactions: 0 },
    inr: { totalPayment: 0, transactions: 0 },
    total: { totalPayment: 0, transactions: 0 }
  });

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Function to build institution payment history
  const buildInstitutionPaymentHistory = (paymentsList) => {
    const history = {};

    // Sort payments by date (oldest first)
    const sortedPayments = [...paymentsList].sort((a, b) =>
      new Date(a.paymentDate) - new Date(b.paymentDate)
    );

    // Build payment history for each institution
    sortedPayments.forEach(payment => {
      const institution = payment.childInstitution || 'unknown';
      if (!history[institution]) {
        history[institution] = [];
      }
      history[institution].push({
        paymentId: payment.paymentId,
        paymentDate: payment.paymentDate
      });
    });

    setInstitutionPaymentHistory(history);
  };

  // Function to check if a payment is recurring
  const isPaymentRecurring = (payment) => {
    const institution = payment.childInstitution || 'unknown';
    const paymentDate = new Date(payment.paymentDate);

    // If the institution doesn't have payment history, it's not recurring
    if (!institutionPaymentHistory[institution] || institution === 'unknown') return false;

    // Check if there's a payment from this institution before the current one
    return institutionPaymentHistory[institution].some(prevPayment =>
      prevPayment.paymentId !== payment.paymentId &&
      new Date(prevPayment.paymentDate) < paymentDate
    );
  };

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
      buildInstitutionPaymentHistory(payments);
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
  // const currentYear = new Date().getFullYear();
  const totalPages = Math.ceil(filteredPayments.length / rowsPerPage);

  const nameProduct = (value) => {
    const product = products.find(product => product.productId === value);
    return product ? product.heading : null;
  }

  return (
    <div>
      {!isModalOpen ? (
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
                          setCurrentPage(1);
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
                    <CustomDropdownItem onClick={() => {
                      setPaymentGateway("razorpay");
                      setCurrentPage(1);
                    }}>
                      Razorpay (INR)
                    </CustomDropdownItem>
                    <CustomDropdownItem onClick={() => {
                      setPaymentGateway("paypal");
                      setCurrentPage(1);
                    }}>
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
                  <h3 className="text-lg font-medium">{currentMonthName} Collection</h3>
                </div>
                <div className="flex flex-row mb-2 justify-between gap-2">
                  <div className="flex flex-col items-center bg-gray-50 p-2 rounded text-center mb-2">
                    <p className="text-sm text-gray-500">Total Payment (USD)</p>
                    <p className="text-lg font-bold text-blue-600">
                      ${currentMonthStats.usd.totalPayment.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex flex-col items-center bg-gray-50 p-2 rounded text-center mb-2">
                    <p className="text-sm text-gray-500">Total Payment (INR)</p>
                    <p className="text-lg font-bold text-blue-600">
                      ₹{currentMonthStats.inr.totalPayment.toFixed(2)}
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
                  <h3 className="text-lg font-medium">{lastMonthName} Collection</h3>
                </div>
                <div className="flex flex-row mb-2 justify-between gap-2">
                  <div className="flex flex-col items-center bg-gray-50 p-2 rounded text-center mb-2">
                    <p className="text-sm text-gray-500">Total Payment (USD)</p>
                    <p className="text-lg font-bold text-blue-600">
                      ${lastMonthStats.usd.totalPayment.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex flex-col items-center bg-gray-50 p-2 rounded text-center mb-2">
                    <p className="text-sm text-gray-500">Total Payment (INR)</p>
                    <p className="text-lg font-bold text-blue-600">
                      ₹{lastMonthStats.inr.totalPayment.toFixed(2)}
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
                  <h3 className="text-lg font-medium">This Year Collection</h3>
                </div>
                <div className="flex flex-row mb-2 justify-between gap-2">
                  <div className="flex flex-col items-center bg-gray-50 p-2 rounded text-center mb-2">
                    <p className="text-sm text-gray-500">Total Payment (USD)</p>
                    <p className="text-lg font-bold text-blue-600">
                      ${currentYearStats.usd.totalPayment.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex flex-col items-center bg-gray-50 p-2 rounded text-center mb-2">
                    <p className="text-sm text-gray-500">Total Payment (INR)</p>
                    <p className="text-lg font-bold text-blue-600">
                      ₹{currentYearStats.inr.totalPayment.toFixed(2)}
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
                    <Table.HeadCell className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">Institution</Table.HeadCell>
                    <Table.HeadCell className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">Payer</Table.HeadCell>
                    <Table.HeadCell className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">Phone Number</Table.HeadCell>
                    <Table.HeadCell className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">Amount</Table.HeadCell>
                    <Table.HeadCell className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">Product</Table.HeadCell>
                    <Table.HeadCell className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">Payment Date</Table.HeadCell>
                    <Table.HeadCell className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">Payment Type</Table.HeadCell>
                    <Table.HeadCell className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">Payment Gateway</Table.HeadCell>
                    <Table.HeadCell className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">View</Table.HeadCell>
                  </Table.Head>
                  <Table.Body className="divide-y">
                    {currentPayments.map((payment, index) => {
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

                      // Check if payment is recurring based on institution history
                      const recurring = isPaymentRecurring(payment);

                      return (
                        <Table.Row key={payment.paymentId || index} className="bg-white">
                          <Table.Cell className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                            {payment.childInstitution || 'N/A'}
                          </Table.Cell>
                          <Table.Cell className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                            {payment.userDetails?.userName || 'N/A'}
                          </Table.Cell>
                          <Table.Cell className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                            {payment.userDetails?.phoneNumber || 'N/A'}
                          </Table.Cell>
                          <Table.Cell className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                            {formatCurrency(payment.amount / 100, payment.currency)}
                          </Table.Cell>
                          <Table.Cell className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                            {nameProduct(payment.productId)}
                          </Table.Cell>
                          <Table.Cell className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(payment.paymentDate)}
                          </Table.Cell>
                          <Table.Cell className="px-2 py-3 whitespace-nowrap text-sm">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                              ${recurring ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}`}>
                              {recurring ? "Recurring" : "New"}
                            </span>
                          </Table.Cell>
                          <Table.Cell className="px-1 py-3 whitespace-nowrap text-sm">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${gateway === "PayPal"
                              ? "bg-blue-100 text-blue-800"
                              : gateway === "Razorpay"
                                ? "bg-purple-100 text-purple-800"
                                : "bg-gray-100 text-gray-800"
                              }`}>
                              {gateway}
                            </span>
                          </Table.Cell>
                          <Table.Cell className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                            <button aria-label="View" onClick={() => {
                              setSelectedPayment(payment); // Set the selected payment
                              setIsModalOpen((prev) => !prev); // Toggle the modal visibility
                              setInstitutionReccuring(recurring);
                            }}>
                              <FontAwesomeIcon icon={faEye} className="text-[#30afbc]" />
                            </button>
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
                  Showing {(currentPage - 1) * rowsPerPage + 1}-{Math.min(currentPage * rowsPerPage, filteredPayments.length)} of {filteredPayments.length}
                </div>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                  className="flex justify-end"
                  showIcons
                  theme={customTheme}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <PaymentDetailModal payment={selectedPayment} onClose={() => setIsModalOpen(false)} isOpen={true} recurringValue={institutionReccuring} />
      )}
    </div>
  );
};

export default AwsaiappRevenue;
