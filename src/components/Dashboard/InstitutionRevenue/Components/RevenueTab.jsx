import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import ChartComponent2 from "../../MonthlyReport/ChartComponents/ChartComponent2";
import PieChartComponent from "../../MonthlyReport/ChartComponents/PieChartComponent";

function RevenueTab({ institution }) {
  const [payments, setPayments] = useState([]);
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [paymentModeDistribution, setPaymentModeDistribution] = useState({
    online: 0,
    offline: 0,
  });
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [years, setYears] = useState([new Date().getFullYear()]);
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchPaymentHistory = async () => {
      try {
        const response = await API.get(
          "beta_dance",
          `/payment-history/${institution}`
        );
        const payments = response?.payments || [];
        setPayments(payments);
        updateAvailableYears(payments);
        processPaymentData(payments, selectedYear);
      } catch (error) {
        console.error("Error fetching payment history:", error);
      }
    };

    const processPaymentData = (payments, year) => {
      const months = Array(12).fill(0);
      let online = 0;
      let offline = 0;

      payments
        .filter(
          (payment) => new Date(payment.paymentDate).getFullYear() === year
        )
        .forEach((payment) => {
          const date = new Date(payment.paymentDate);
          const month = date.getMonth();
          months[month] += payment.amount / 100 || 0;

          if (payment.paymentMode === "online") {
            online += payment.amount / 100 || 0;
          } else if (payment.paymentMode === "offline") {
            offline += payment.amount / 100 || 0;
          }
        });

      setMonthlyRevenue(months);
      setPaymentModeDistribution({ online, offline });
    };

    const updateAvailableYears = (payments) => {
      const uniqueYears = [
        ...new Set(
          payments.map((payment) => new Date(payment.paymentDate).getFullYear())
        ),
      ];
      setYears(uniqueYears);
    };

    fetchPaymentHistory();
  }, [selectedYear, institution]);

  const barChartData = {
    labels: [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ],
    datasets: [
      {
        label: "Monthly Revenue",
        data: monthlyRevenue,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const pieChartData = {
    labels: ["Online", "Offline"],
    datasets: [
      {
        label: "Payment Mode Distribution",
        data: [paymentModeDistribution.online, paymentModeDistribution.offline],
        backgroundColor: ["rgba(54, 162, 235, 0.2)", "rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-full m-3">
      <h2 className="text-2xl font-bold text-center">Payment Details</h2>
      <div className="relative inline-block">
        <div
          onClick={() => setIsYearDropdownOpen(!isYearDropdownOpen)}
          className="cursor-pointer border rounded flex items-center gap-2 px-3 py-1 hover:bg-gray-100"
        >
          <span>Year: {selectedYear}</span>
          <svg
            className="w-4 h-4"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        {isYearDropdownOpen && (
          <div className="absolute z-10 mt-1 bg-white border rounded shadow-lg">
            {years.map((year) => (
              <div
                key={year}
                onClick={() => {
                  setSelectedYear(year);
                  setIsYearDropdownOpen(false);
                }}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {year}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-center gap-[4rem] w-full items-center flex-wrap-reverse">
        <div className="mt-6 w-[40vw] min-w-[40rem] max-w-full mb-20">
          <h3 className="text-xl font-semibold text-center">
            Monthly Revenue
          </h3>
          <ChartComponent2 data={barChartData} type="bar" />
        </div>

        <div className="mt-6 w-[15vw] min-w-[15rem] max-w-full">
          <h3 className="text-xl font-semibold text-center">
            Payment Mode Distribution
          </h3>
          <PieChartComponent data={pieChartData} type="pie" />
        </div>
      </div>
    </div>
  );
}

export default RevenueTab;