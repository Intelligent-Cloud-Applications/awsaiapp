import React, { useState, useEffect, useRef, useContext } from "react";
import InfoPng from '../../../utils/Assets/Dashboard/images/PNG/about.png'
import Chart from "chart.js/auto";
import Context from '../../../context/Context';
import { API } from "aws-amplify";
import './MonthlyReport.css'

const BarChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    const barChart = new Chart(ctx, {
      type: "bar",
      data,
      options: {
        plugins: {
          legend: {
            labels: {
              color: "white",
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: 'white',
            },
          },
          y: {
            ticks: {
              color: 'white',
            },
          },
        },
      },
    });

    return () => {
      barChart.destroy();
    };
  }, [data]);

  return <canvas className="p" ref={chartRef}></canvas>;
};

const BarChartAttendance = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    const barChart = new Chart(ctx, {
      type: "bar",
      data,
      options: {
        plugins: {
          legend: {
            labels: {
              color: "black",
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: 'black',
            },
            grid: {
              display: false
            },
          },
        },
        y: {
          ticks: {
            color: 'black',
          },
        },
      },
    });

    return () => {
      barChart.destroy();
    };
  }, [data]);

  return <canvas className="p" ref={chartRef}></canvas>;
};

const LineChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    const barChart = new Chart(ctx, {
      type: 'line',
      data,
      options: {
        plugins: {
          legend: {
            labels: {
              usePointStyle: true,
              color: "white",
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: 'white',
            },
          },
          y: {
            ticks: {
              color: 'white',
            },
          },
        },
      },
    });

    return () => {
      barChart.destroy();
    };
  }, [data]);

  return <canvas className="p" ref={chartRef}></canvas>;
};

const LineChartLeads = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    const barChart = new Chart(ctx, {
      type: 'line',
      data,
      options: {
        plugins: {
          legend: {
            labels: {
              usePointStyle: true,
              color: "black",
            },
          },
        },
        scales: {
          x: {
            grid: {
              display: false
            },
            ticks: {
              color: 'black',
            },
          },
          y: {
            ticks: {
              color: 'black',
            },
          },
        },
      },
    });

    return () => {
      barChart.destroy();
    };
  }, [data]);

  return <canvas className="p" ref={chartRef}></canvas>;
};


const MonthlyReport = ({ institution: tempInstitution }) => {
  console.log(window.location.search)
  const searchParams = new URLSearchParams(window.location.search);
  const institution = searchParams.get("institution") || tempInstitution;
  console.log(searchParams)
  const { clients } = useContext(Context);
  const item = clients.data;
  const selectedClient = Array.isArray(item) ? item.find(client => client.institution === institution) : null;

  let Country;
  if (selectedClient) {
    Country = selectedClient.country;
  } else {
    console.log(`Country information not available for institution: ${institution}`);
  }
  console.log(Country);

  const renderValue = (value) => {
    if (Country === 'USA') {
      return `$ ${value}`;
    } else {
      return `₹ ${value}`;
    }
  };

  const institutionData = Array.isArray(clients.data)
    ? clients.data.find(client => client.institution === institution)
    : null;
  const memberCountByMonth = institutionData ? institutionData.memberCountByMonth : null;
  console.log(memberCountByMonth);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [revenueReport, setRevenueReport] = useState([])
  const [attendance, setAttendance] = useState([])
  const [leads, setLeads] = useState([])
  const [memberscount, setMembersCount] = useState([])
  const [adsRunning, setAdsRunning] = useState("");
  const [instructorPayment, setInstructorPayment] = useState("")
  const [profit, setProfit] = useState("");
  const [totalIncome, setTotalIncome] = useState("");
  const [totalInvestement, setTotalInvestement] = useState("");
  const [Product, setProduct] = useState("");
  const [Protein, setProtein] = useState("");
  const [clientsPayment, setClientsPayment] = useState("");
  const [monthDetails, setMonthDetails] = useState({});
  console.log(selectedMonth)


  const [infoContent, setInfoContent] = useState("");

  const handleInfoClick = (infoNumber) => {
    const contentMap = {
      1: "This graph represents the total number of members for each month",
      2: "This graph shows the total number of Leads each month",
      3: "This graph shows the total revenue generated per month",
      4: "This graph shows the total attendance increase each month",
    };

    if (infoContent === contentMap[infoNumber]) {
      setInfoContent("");
    } else {
      setInfoContent(contentMap[infoNumber]);
    }
  };

  const fetchRevenueOfClients = async () => {
    try {
      const RevenueApi = await API.get("clients", `/user/monthly-report/${institution}?month=${selectedMonth}`);
      setRevenueReport(RevenueApi.Revenue)
      setAttendance(RevenueApi.Attendance)
      setLeads(RevenueApi.Leads)
      setMembersCount(RevenueApi.MembersCount)
      const revenueDetails = RevenueApi.Items[selectedMonth];
      console.log(RevenueApi)
      setMonthDetails(revenueDetails)
      setAdsRunning(revenueDetails.investments.adsRunning)
      setProfit(revenueDetails.profit);
      setClientsPayment(revenueDetails.incomes.clientPayment);
      setProtein(revenueDetails.incomes.protein);
      setProduct(revenueDetails.incomes.product);
      setTotalInvestement(revenueDetails.totalInvestment);
      setTotalIncome(revenueDetails.totalIncome);
      setInstructorPayment(revenueDetails.investments.instructorPayment)
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  useEffect(() => {
    fetchRevenueOfClients();
    // eslint-disable-next-line
  }, [institution, selectedMonth]);

  console.log(monthDetails);
  const lineChartData = {
    datasets: [{
      label: 'Revenue Generated',
      data: revenueReport,
      borderColor: 'white',
      borderWidth: 2,
      barPercentage: 0.45
    }],
  };

  const lineChartLeadsData = {
    datasets: [{
      label: 'Leads',
      data: leads,
      backgroundColor: "#079FB4",
      borderColor: '#079FB4',
      borderWidth: 2,
      barPercentage: 0.45
    }],
  }

  const barChartData = {
    datasets: [{
      label: 'Monthly members joined',
      data: memberscount,
      backgroundColor: "white",
      barPercentage: 0.37
    }],
  };

  const barChartAttendance = {
    datasets: [{
      label: 'Attendance',
      data: attendance,
      backgroundColor: "#079FB4",
      barPercentage: 0.3,
      borderRadius: 10
    }],
  };

  const monthsShort = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const detailsRef = useRef(null);

  const handleClick = () => {
    if (window.innerWidth > 600) {
      setShowDetails(true);
      scrollToTop();
    } else {
      setShowDetails(true);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center pt-6 max536:pt-0 gap-10">
      <div className={`w-[83vw] max536:bg-transparent rounded-3xl p-3 `}>
        <div className="flex flex-row justify-between max1300:flex-col max1300:items-center max1300:gap-[1rem] max850:justify-center max850:items-center ">
          <div className="relative">
            <div className="flex justify-between">
              <h2 className=" mb-[-1.5rem] ml-9 K2D font-[600] max850:text-[2rem] max1300:ml-0 text-[1.6rem] ">
                Total Members Trend
              </h2>
              <div>
                <img className="w-[1.7rem] mb-[-2rem] mt-[0.3rem] mr-[1rem] cursor-pointer opacity-[80%]" onClick={() => handleInfoClick(1)} src={InfoPng} alt="" />
                {infoContent === "This graph represents the total number of members for each month" && <p className="absolute K2D font-[600] p-2 right-[2rem] bg-white top-[3.5rem] rounded-[16px] max600:left-[1rem] max600:top-[4rem]">{infoContent}</p>}
              </div>
            </div>
            <div className="flex items-center border-1 px-2 rounded-[20px] border-[#545454] w-[35rem] h-[20rem] mt-[2rem] max600:w-[95vw] max600:h-[60vw] ml-6 max1300:ml-0 max600:mb-8 " style={{ background: "linear-gradient(180deg, #30AFBC 0%, #000 100%)" }}>
              <BarChart data={barChartData} />
            </div>
          </div>
          <div className="relative">
            <div className="flex justify-between">
              <h2 className=" mb-[-1.5rem] ml-9 K2D font-[600] max850:text-[2rem] max1300:ml-0 text-[1.6rem] ">
                Total Monthly Leads
              </h2>
              <div>
                <img className="w-[1.7rem] mb-[-2rem] mt-[0.3rem] mr-[1rem] cursor-pointer opacity-[80%]" onClick={() => handleInfoClick(2)} src={InfoPng} alt="" />
                {infoContent === "This graph shows the total number of Leads each month" && <p className="absolute K2D font-[600] p-2 right-[4.5rem] bg-white top-[3.5rem] rounded-[16px] max600:left-[2rem] max600:top-[4rem]">{infoContent}</p>}
              </div>
            </div>
            <div className="flex items-center border-1 px-2 rounded-[20px] border-[#545454] w-[35rem] h-[20rem] max600:w-[95vw] max600:h-[60vw] mt-[2rem] ml-8 max1300:ml-0 " style={{ background: "white", boxShadow: "0 4px 40px rgba(0, 0, 0, 0.3)" }}>
              <LineChartLeads data={lineChartLeadsData} />
            </div>
          </div>
        </div>
      </div>
      {
        showDetails && (
          <div
            className="flex items-center ml-4 flex-col w-[352px] h-[850px] absolute bg-white rounded-lg p-6 z-10 max600:ml-0 max600:top-[77%]"
            style={{
              boxShadow: "0 0 20px rgba(0, 0, 0, 0.4)",
            }}
          >
            <h2 className="text-center Inter text-[1.3rem] font-[600] mb-2">Details</h2>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="mb-4 border border-[#343434] w-[16rem] p-2 font-[600]"
            >
              <option value="">Select Month</option>
              {monthsShort.map((month, index) => (
                <option key={index} value={month}>
                  {month}
                </option>
              ))}
            </select>
            <div >
              <div class="w-[345px] h-[725px] relative bg-white rounded-[18px]">
                <div class="w-[92px] h-[17px] left-[17px] top-[421px] absolute text-black text-base font-semibold font-['Inter'] tracking-wide">Incomes :</div>
                <div class="w-[163px] h-[13px] left-[155px] top-[350px] absolute text-black text-xs font-semibold font-['Inter'] tracking-tight">Clients Payment: {renderValue(clientsPayment)}</div>
                <div class="w-[163px] h-[13px] left-[155px] top-[420px] absolute text-black text-xs font-semibold font-['Inter'] tracking-tight">Product: {Product}</div>
                <div class="w-[163px] h-[13px] left-[155px] top-[490px] absolute text-black text-xs font-semibold font-['Inter'] tracking-tight">Protein: {Protein}</div>
                <div class="w-[39px] h-[0px] left-[112px] top-[430px] absolute border border-black"></div>
                <div class="w-[141px] h-[0px] left-[124px] top-[359px] absolute origin-top-left rotate-90 border border-black"></div>
                <div class="w-[27px] h-[0px] left-[124px] top-[359px] absolute border border-black"></div>
                <div class="w-[26px] h-[0px] left-[124px] top-[500px] absolute border border-black"></div>
                <div class="w-[140px] h-[17px] left-[7px] top-[624px] absolute text-black text-base font-semibold font-['Inter'] tracking-wide">Total Income :</div>
                <div class="w-[184px] h-8 left-[128px] top-[617px] absolute bg-white border border-black"></div>
                <div class="w-[126px] left-[147px] top-[625px] absolute text-black text-base font-[600] font-['Inter'] tracking-wide">{renderValue(totalIncome)}</div>
                <div class="w-[140px] h-[17px] left-[17px] top-[571px] absolute text-black text-base font-semibold font-['Inter'] tracking-wide">Profit :</div>
                <div class="w-[184px] h-8 left-[128px] top-[563px] absolute bg-white border border-black"></div>
                <div class="w-[118px] left-[147px] top-[571px] absolute text-black text-base font-[600] font-['Inter'] tracking-wide">{renderValue(profit)}</div>
                <div class="w-[118px] h-[17px] left-[7px] top-[113px] absolute text-black text-base font-semibold font-['Inter'] tracking-wide">Investments :</div>
                <div class="w-[167px] h-[13px] left-[172px] top-[44px] absolute text-black text-xs font-semibold font-['Inter'] tracking-tight">Ads Running: {adsRunning}</div>
                <div class="w-[163px] h-[13px] left-[172px] top-[114px] absolute text-black text-xs font-semibold font-['Inter'] tracking-tight">Instructor Payment: {renderValue(instructorPayment)}</div>
                <div class="w-[163px] h-[13px] left-[172px] top-[184px] absolute text-black text-xs font-semibold font-['Inter'] tracking-tight">XYZ: 1000</div>
                <div class="w-10 h-[0px] left-[128px] top-[124px] absolute border border-black"></div>
                <div class="w-[141px] h-[0px] left-[140px] top-[53px] absolute origin-top-left rotate-90 border border-black"></div>
                <div class="w-[27px] h-[0px] left-[141px] top-[53px] absolute border border-black"></div>
                <div class="w-[26px] h-[0px] left-[141px] top-[194px] absolute border border-black"></div>
                <div class="w-[140px] h-[17px] left-[8px] top-[248px] absolute text-black text-base font-semibold font-['Inter'] tracking-wide">Total Invest :</div>
                <div class="w-[184px] h-8 left-[128px] top-[242px] absolute bg-white border border-black"></div>
                <div class="w-[110px] left-[147px] top-[250px] absolute text-black text-base font-[600] font-['Inter'] tracking-wide">{renderValue(totalInvestement)}</div>
              </div>
            </div>
            <div><button className="absolute right-0 bottom-0 border rounded-b-lg bg-[#13838d] text-white p-3 w-[22rem]" onClick={() => setShowDetails(false)}>Close</button></div>
          </div>
        )
      }
      <div className=" w-[80vw] bg-[#757575] h-[0.095rem] mb-4 max850:hidden"></div>

      <div className={`w-[83vw] max536:bg-transparent max600:mr-[2rem] rounded-3xl p-3  mt-[-2rem]`}>
        <div className="flex flex-row justify-between max1300:flex-col max1300:items-center max1300:gap-[1rem] max850:justify-center max850:items-center ">
          <div className="relative">
            <div className="flex justify-between">
              <h2 className=" mb-[-1.5rem] ml-9 K2D font-[600] max850:text-[2rem] text-[1.6rem] ">
                Total Revenue Trend
              </h2>
              <div>
                <img className="w-[1.7rem] mb-[-2rem] mt-[0.3rem] mr-[1rem] cursor-pointer opacity-[80%]" onClick={() => handleInfoClick(3)} src={InfoPng} alt="" />
                {infoContent === "This graph shows the total revenue generated per month" && <p className="absolute K2D font-[600] p-2 right-[4.5rem] bg-white top-[3.5rem] rounded-[16px] max600:left-[3rem] max600:top-[4rem] max600:right-[1rem]">{infoContent}</p>}
              </div>
            </div>
            <div className="flex items-center border-1 px-2 rounded-[20px] border-[#545454] w-[35rem] h-[20rem] max600:w-[95vw] max600:h-[60vw] mt-[2rem] ml-8 max600:mb-8" style={{ background: "linear-gradient(180deg, #30AFBC 0%, #000 100%)" }}>
              <LineChart data={lineChartData} />
            </div>
            <p className="text-end Inter text-[1.15rem] font-[600] text-[#1A8C9B] mr-3 mt-2 cursor-pointer"
              ref={detailsRef}
              onClick={handleClick}
            >
              Details
            </p>
          </div>
          <div className="relative">
            <div className="flex justify-between">
              <h2 className=" mb-[-1.5rem] ml-9 K2D font-[600] max850:text-[2rem] text-[1.6rem] ">
                Total Monthly Attendance
              </h2>
              <div>
                <img className="w-[1.7rem] mb-[-2rem] mt-[0.3rem] mr-[1rem] cursor-pointer opacity-[80%]" onClick={() => handleInfoClick(4)} src={InfoPng} alt="" />
                {infoContent === "This graph shows the total attendance increase each month" && <p className="absolute K2D font-[600] p-2 right-[4.5rem] bg-white top-[3.5rem] rounded-[16px] max600:left-[3rem] max600:top-[7rem] max600:right-[1rem]">{infoContent}</p>}
              </div>
            </div>
            <div className="flex items-center border-1 px-2 rounded-[20px] border-[#545454] w-[35rem] h-[20rem] max600:w-[95vw] max600:h-[60vw] mt-[2rem] ml-8 " style={{ background: "white", boxShadow: "0 4px 40px rgba(0, 0, 0, 0.3)" }}>
              <BarChartAttendance data={barChartAttendance} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}

export default MonthlyReport;