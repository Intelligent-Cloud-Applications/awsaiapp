import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import InfoPng from '../../../utils/Assets/Dashboard/images/PNG/about.png'
import BackImg from '../../../utils/Assets/Dashboard/images/PNG/Back.png'
import Chart from "chart.js/auto";
import NavBar from "../../Home/Navbar";
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
  const Navigate = useNavigate();
  const location = useLocation();
  const detailsRef = useRef(null);
  const { clients } = useContext(Context);
  const item = clients.data;
  const searchParams = new URLSearchParams(window.location.search);
  const institution = searchParams.get("institution") || tempInstitution;
  const selectedClient = Array.isArray(item) ? item.find(client => client.institution === institution) : null;
  const institutionData = Array.isArray(clients.data) ? clients.data.find(client => client.institution === institution) : null;
  const memberCountByMonth = institutionData ? institutionData.memberCountByMonth : null;
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, index) => currentYear - index);
  const monthsShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const [showDetails, setShowDetails] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState('');
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
  const [infoContent, setInfoContent] = useState("");
  const [IsDashboard, setIsDashboard] = useState(false);

  //Api call to retrive Monthly Report data
  const fetchRevenueOfClients = async (selectedYear, selectedMonth) => {
    try {
      let apiUrl = `/user/monthly-report/${institution}?year=${selectedYear}`;
      if (selectedMonth) {
        apiUrl += `&month=${selectedMonth}`;
      }
      const RevenueApi = await API.get("clients", apiUrl);
      setRevenueReport(RevenueApi.Revenue[selectedYear]);
      setAttendance(RevenueApi.Attendance[selectedYear]);
      setLeads(RevenueApi.Leads[selectedYear]);
      setMembersCount(RevenueApi.MembersCount[selectedYear]);

      if (RevenueApi && RevenueApi.Items && selectedYear && selectedMonth) {
        const itemsForSelectedYear = RevenueApi.Items[selectedYear];
        if (itemsForSelectedYear) {
          const revenueDetails = itemsForSelectedYear[selectedMonth];
          if (revenueDetails) {
            setMonthDetails(revenueDetails);
            setAdsRunning(revenueDetails.investments.adsRunning);
            setProfit(revenueDetails.profit);
            setClientsPayment(revenueDetails.incomes.clientPayment);
            setProtein(revenueDetails.incomes.protein);
            setProduct(revenueDetails.incomes.product);
            setTotalInvestement(revenueDetails.totalInvestment);
            setTotalIncome(revenueDetails.totalIncome);
            setInstructorPayment(revenueDetails.investments.instructorPayment);
          } else {
            console.log(`No data found for selected month: ${selectedMonth}`);
          }
        } else {
          console.log(`No data found for selected year: ${selectedYear}`);
        }
      } else {
        console.log('Incomplete data or invalid selection');
      }
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  useEffect(() => {
    if (!selectedYear) {
      fetchRevenueOfClients(currentYear, selectedMonth);
      setSelectedYear(currentYear);
    } else {
      fetchRevenueOfClients(selectedYear, selectedMonth);
    }
    // eslint-disable-next-line
  }, [institution, selectedYear, selectedMonth]);

  //function to change year in dropdown
  const handleYearChange = (e) => {
    const selectedYear = e.target.value;
    fetchRevenueOfClients(selectedYear, selectedMonth);
    setSelectedYear(selectedYear);
  };

  //function to change month in dropdown
  const handleMonthChange = (e) => {
    const selectedMonth = e.target.value;
    fetchRevenueOfClients(selectedYear, selectedMonth);
    setSelectedMonth(selectedMonth);
  };

  useEffect(() => {
    if (location.pathname.includes('dashboard')) {
      setIsDashboard(true);
    } else {
      setIsDashboard(false);
    }
  }, [location.pathname]);

  //function to scroll to top when clicked on details of revenue graph, handclick fuchtion will show the detail 
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleClick = () => {
    if (window.innerWidth > 600) {
      setShowDetails(true);
      scrollToTop();
    } else {
      setShowDetails(true);
    }
  };

  // function to go back to dashboard
  const renderButton = () => {
    if (IsDashboard) {
      return null;
    } else {
      return (
        <button
          onClick={() => Navigate("/dashboard")}
          className="top-[5.5rem] absolute z-10 ml-[-1rem] bg-[#ffffff] text-black px-4 py-2 rounded-md"
          style={{
            boxShadow: "0 0 20px rgba(0, 0, 0, 0.4)",
          }}
        >
          <img className="w-[1rem] ml-[1rem]" src={BackImg} alt="" />
        </button>
      );
    }
  };

  //function to so the description of graphs
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

  // revenue graph data 
  const lineChartData = {
    datasets: [{
      label: 'Revenue Generated',
      data: revenueReport,
      borderColor: 'white',
      borderWidth: 2,
      barPercentage: 0.45
    }],
  };

  // Leads graph data 
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

  // Monthly members joined graph data 
  const barChartData = {
    datasets: [{
      label: 'Monthly members joined',
      data: memberscount,
      backgroundColor: "white",
      barPercentage: 0.37
    }],
  };

  // Attendance graph data 
  const barChartAttendance = {
    datasets: [{
      label: 'Attendance',
      data: attendance,
      backgroundColor: "#079FB4",
      barPercentage: 0.3,
      borderRadius: 10
    }],
  };

  //check selected client country and display the currency value
  let Country;
  if (selectedClient) {
    Country = selectedClient.country;
  } else {
    console.log(`Country information not available for institution: ${institution}`);
  }

  const renderValue = (value) => {
    if (Country === 'USA') {
      return `$ ${value}`;
    } else {
      return `₹ ${value}`;
    }
  };

  console.log(searchParams)
  console.log(Country);
  console.log(memberCountByMonth);
  console.log("revenueReport", revenueReport)
  console.log(monthDetails);

  return (
    <>
      <NavBar />
      {renderButton()}
      {/* dropdown to select year */}
      <div className="flex w-[100%] justify-center mt-[5rem]">
        <div class="w-[90vw] h-14 relative rounded-2xl" style={{
          boxShadow: "0 0 15px rgba(0, 0, 0, 0.2)",
        }}>
          <div class="flex h-14 justify-center items-center text-stone-900 text-4xl font-bold font-['Inter'] leading-9">{selectedYear} REPORT</div>
          <div class="flex justify-end mt-[-2.7rem] mr-[4rem] ">
            <select
              className="text-left text-bold K2D text-[1.1rem] text-[#000000] w-[12rem] h-8 bg-[#ffffff] border border-[#717171] hover:border-gray-500 px-4 py-1rounded-[5px] max600:w-[60vw]"
              value={selectedYear}
              onChange={handleYearChange}
            >
              <option disabled value="" className="text-[#000000] text-left text-bold K2D text-[1.2rem]">
                Select a year
              </option>
              {years.map((year) => (
                <option className="text-left text-[#000000] text-bold K2D text-[1.1rem]" key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className={`flex flex-col justify-center items-center max536:pt-0 gap-1 ${IsDashboard ? 'flex flex-col justify-center items-center max536:pt-0 gap-1 mt-[5rem]' : ''}`}>
        {/* first two graph */}
        <div className={`w-[83vw] max536:bg-transparent rounded-3xl p-3 `}>
          <div className="flex mb-4 flex-row justify-between max1300:flex-col max1300:items-center max1300:gap-[1rem] max850:justify-center max850:items-center">
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

        {/* dropdow to select month and month wise detail */}
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
                onChange={handleMonthChange}
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
        <div className=" w-[80vw] bg-[#757575] h-[0.095rem] mb-8 max850:hidden"></div>

        {/* last two graph */}
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
    </>
  );

}

export default MonthlyReport;