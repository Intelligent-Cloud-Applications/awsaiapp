import React, { useEffect, useState } from 'react';
import { API } from 'aws-amplify';
import { Dropdown } from "flowbite-react";
import ChartComponent2 from '../MonthlyReport/ChartComponents/ChartComponent2';
import PieChartComponent from '../MonthlyReport/ChartComponents/PieChartComponent';

function InstitutionRevenue({ institution }) {
  // eslint-disable-next-line
  const [payments, setPayments] = useState([]);
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [paymentModeDistribution, setPaymentModeDistribution] = useState({
    online: 0,
    offline: 0,
  });
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [years, setYears] = useState([new Date().getFullYear()]);

  useEffect(() => {
    const fetchPaymentHistory = async () => {
      try {
        const response = await API.get('beta_dance', `/payment-history/${institution}`);
        const payments = response?.payments || [];
        setPayments(payments);
        updateAvailableYears(payments);
        processPaymentData(payments, selectedYear);
      } catch (error) {
        console.error('Error fetching payment history:', error);
      }
    };

    const processPaymentData = (payments, year) => {
      const months = Array(12).fill(0);
      let online = 0;
      let offline = 0;

      payments
        .filter((payment) => new Date(payment.paymentDate).getFullYear() === year)
        .forEach((payment) => {
          const date = new Date(payment.paymentDate);
          const month = date.getMonth(); // get month index (0-11)
          months[month] += payment.amount / 100 || 0;

          if (payment.paymentMode === 'online') {
            online += payment.amount/100 || 0;
          } else if (payment.paymentMode === 'offline') {
            offline += payment.amount/100 || 0;
          }
        });

      setMonthlyRevenue(months);
      setPaymentModeDistribution({ online, offline });
    };

    const updateAvailableYears = (payments) => {
      const uniqueYears = [...new Set(payments.map((payment) => new Date(payment.paymentDate).getFullYear()))];
      setYears(uniqueYears);
    };

    fetchPaymentHistory();
    // eslint-disable-next-line
  }, [selectedYear]);

  
  // const handleYearChange = (event) => {
  //   setSelectedYear(parseInt(event.target.value));
  // };

  console.log(monthlyRevenue)
  const barChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Monthly Revenue',
        data: monthlyRevenue,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const pieChartData = {
    labels: ['Online', 'Offline'],
    datasets: [
      {
        label: 'Payment Mode Distribution',
        data: [paymentModeDistribution.online, paymentModeDistribution.offline],
        backgroundColor: ['rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)'],
        borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className='p-4 w-[70vw] h-[70vh] bg-white mt-[5rem] max600:ml-0'>
      <div className='w-full'>
        <h2 className='text-2xl font-bold text-center Poppins'>Payment Details</h2>
        {/* Dropdown for Year Selection */}
        <div className='Poppins border flex gap-2 items-center justify-center w-[8rem] py-1 rounded-md max600:w-full'>
          <div className="font-[400] text-[1.1rem]">Year</div>
            <Dropdown label={selectedYear} inline>
              <div className="font-[500] Poppins flex flex-col items-center ">
                {years?.map(year => (
                  <Dropdown.Item className='text-[1.1rem] px-[4rem] hover:bg-[#e4e4e4]' key={year} onClick={() => setSelectedYear(year)}>{year}</Dropdown.Item>
                ))}
              </div>
            </Dropdown>
          </div>

        <div className="flex justify-center gap-[4rem] w-[70vw] items-center flex-wrap-reverse max600:w-full">
          {/* Bar Chart */}
          <div className='mt-6 w-[40vw] min-w-[40rem] max600:min-w-[95vw]'>
            <h3 className='text-xl font-semibold text-center'>Monthly Revenue</h3>
            <ChartComponent2 data={barChartData} type="bar" />
          </div>

          {/* Pie Chart */}
          <div className='mt-6 w-[15vw] min-w-[15rem] max600:min-w-[80vw]'>
            <h3 className='text-xl font-semibold text-center'>Payment Mode Distribution</h3>
            <PieChartComponent data={pieChartData} type="pie" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default InstitutionRevenue;
