import React, { useEffect, useState } from 'react';
import { API } from 'aws-amplify';
import { Dropdown, Table } from "flowbite-react";
import ChartComponent2 from '../MonthlyReport/ChartComponents/ChartComponent2';
import PieChartComponent from '../MonthlyReport/ChartComponents/PieChartComponent';

function AwsaiappRevenue() {
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
        const response = await API.get('beta_dance', `/payment-history/awsaiapp`);
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
            online += payment.amount / 100 || 0;
          } else if (payment.paymentMode === 'offline') {
            offline += payment.amount / 100 || 0;
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
  }, [selectedYear]);

  const handleYearChange = (event) => {
    setSelectedYear(parseInt(event.target.value));
  };

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
    <div className='p-4 w-[70vw] h-[70vh] ml-[8rem] max600:ml-0'>
      <div className='w-full'>
        <h2 className='text-2xl font-bold text-center Poppins'>Revenue Generated</h2>
        {/* Dropdown for Year Selection */}
        <div className='Poppins border flex gap-2 items-center justify-center w-[8rem] py-1 rounded-md max600:w-full'>
          <div className="font-[400] text-[1.1rem]">Year</div>
          <Dropdown label={selectedYear} inline>
            <div className="font-[500] Poppins flex flex-col items-center ">
              {years?.map(year => (
                <Dropdown.Item className='text-[1.1rem] px-[4rem] hover:bg-[#b9b9b9]' key={year} onClick={() => setSelectedYear(year)}>{year}</Dropdown.Item>
              ))}
            </div>
          </Dropdown>
        </div>

        <div className="flex justify-center gap-[4rem] w-[70vw] items-center flex-wrap-reverse max600:w-full">
          <div className=' mt-6 bg-white max-w-full mx-auto rounded-b-md max600:min-w-[90vw]'>
            <div className='scrollbar-none overflow-x-auto border rounded-[1rem]'>
              <Table hoverable className='min-w-full'>
                <Table.Head>
                  <Table.HeadCell className='px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase'>Name</Table.HeadCell>
                  <Table.HeadCell className='px-6 py-2 text-center text-xs font-medium text-gray-500 uppercase'>Phone Number</Table.HeadCell>
                  <Table.HeadCell className='px-6 py-2 text-center text-xs font-medium text-gray-500 uppercase'>Products</Table.HeadCell>
                  <Table.HeadCell className='px-6 py-2 text-center text-xs font-medium text-gray-500 uppercase'>Subscription Type</Table.HeadCell>
                  <Table.HeadCell className='px-6 py-2 text-center text-xs font-medium text-gray-500 uppercase'>Payment Mode</Table.HeadCell>
                  <Table.HeadCell className='px-6 py-2 text-center text-xs font-medium text-gray-500 uppercase'>Payment Date</Table.HeadCell>
                  <Table.HeadCell className='px-6 py-2 text-center text-xs font-medium text-gray-500 uppercase'>Amount</Table.HeadCell>
                </Table.Head>
                <Table.Body className='divide-y'>
                  {payments?.map((payment) => (
                    <Table.Row
                      key={payment.paymentId}
                      className='hover:bg-gray-200 cursor-pointer'
                    // onClick={() => handleRowClick(payment)}
                    >
                      <Table.Cell className='whitespace-nowrap text-sm text-gray-500 text-center bg-white'>
                        {payment.userDetails?.userName}
                      </Table.Cell>
                      <Table.Cell className='whitespace-nowrap text-sm text-gray-500 text-center bg-white'>
                        {payment.userDetails?.phoneNumber}
                      </Table.Cell>
                      <Table.Cell className='whitespace-nowrap text-sm text-gray-500 text-center bg-white'>
                        {payment.userDetails?.products?.length > 0 ? (
                          payment.userDetails.products?.map((product, index) => (
                            <p key={index}>{product.S}
                            </p>
                          ))
                        ) : 'N/A'}
                      </Table.Cell>
                      <Table.Cell className='whitespace-nowrap text-sm text-gray-500 text-center bg-white'>
                        {payment.subscriptionType}
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap text-sm text-gray-500 text-center bg-white">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${payment.paymentMode === "offline" ? "bg-purple-100 text-purple-600" : "bg-green-100 text-green-600"}`}>
                          {payment.paymentMode === "offline" ? "Offline" : "Razorpay"}
                        </span>
                      </Table.Cell>
                      <Table.Cell className='whitespace-nowrap text-sm text-gray-500 text-center bg-white'>
                        {/* {formatEpochToReadableDate(payment.paymentDate)} */}
                      </Table.Cell>
                      <Table.Cell className='whitespace-nowrap text-sm text-gray-500 text-center bg-white'>
                        {/* {formatAmountWithCurrency(payment.amount, payment.currency)} */}
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>
          </div>

          {/* Bar Chart */}
          <div className='mt-6 w-[40vw] min-w-[40rem] max600:min-w-[95vw]'>
            <h3 className='text-xl font-semibold text-center'>Monthly Revenue</h3>
            <ChartComponent2 data={barChartData} type="bar" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AwsaiappRevenue;
