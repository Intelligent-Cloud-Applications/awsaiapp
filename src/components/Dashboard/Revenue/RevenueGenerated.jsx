// import React, { useState, useEffect, useRef } from "react";
// import Chart from "chart.js/auto";
// import ChartDataLabels from "chartjs-plugin-datalabels";
// // import addTextInsideSegments from './addTextInsideSegmentsPlugin';
// import Dollar from "../../../utils/Assets/Dashboard/images/SVG/dollar.svg";
// import shopIcon from "../../../utils/Assets/Dashboard/images/SVG/Shopicon.svg";
// import SearchIcon from "../../../utils/Assets/Dashboard/images/SVG/Search.svg";
// import Arrow from "../../../utils/Assets/Dashboard/images/SVG/EnterArrow.svg";
// import Add from "../../../utils/Assets/Dashboard/images/SVG/Add-Client.svg";
// import CSV from "../../../utils/Assets/Dashboard/images/SVG/CSV.svg";
// import Selections from "../../../utils/Assets/Dashboard/images/SVG/Selections.svg";
// import Filter from "../../../utils/Assets/Dashboard/images/SVG/Filter.svg";
// import Bworkz from "../../../utils/Assets/Dashboard/images/SVG/Bworkz.svg";
// import personIcon from "../../../utils/Assets/Dashboard/images/SVG/ProfilEdit.svg";
// import Select from "../../../utils/Assets/Dashboard/images/SVG/Thunder.svg";
// import Pagination from "@mui/material/Pagination";
// import AdminPic from '../../../utils/Assets/Dashboard/images/PNG/Adminuser.png';
// import './revenue.css'

// const PieChart = ({ data }) => {
//   const chartRef = useRef(null);

//   useEffect(() => {
//     const ctx = chartRef.current.getContext("2d");

//     const pieChart = new Chart(ctx, {
//       type: "doughnut",
//       data,
//       options: {
//         borderWidth: 0,
//         plugins: {
//           legend: {
//             display: true,
//             position: 'bottom',
//             align: 'start',
//             labels: {
//               font: {
//                 size: 10,
//                 weight: 'bold',
//               },
//               boxWidth: 15,
//               boxHeight: 15,
//               padding: 10,
//             },
//           },
//           datalabels: {
//             color: 'white',
//             font: {
//               size: 12,
//               weight: 700,
//             },
//             borderWidth: 1,
//             borderColor: "#fff",
//             borderRadius: 25,
//             backgroundColor: (context) => {
//               return context.dataset.backgroundColor
//             },
//             formatter: (value, context) => {
//               const dataset = context.chart.data.datasets[0];
//               const total = dataset.data.reduce((a, b) => a + b, 0);
//               const percentage = ((value / total) * 100).toFixed(2) + "%";
//               return percentage;
//             },
//             anchor: 'end',
//             align: 'start',
//             offset: -10,
//           },
//         },
//         elements: {
//           arc: {
//             borderWidth: 7,
//           },
//         },
//         shadowBlur: 10,
//         shadowColor: 'black',
//       },
//       plugins: [ChartDataLabels],
//     });

//     return () => {
//       pieChart.destroy();
//     };
//   }, [data]);

//   return (
//       <canvas ref={chartRef} className="custom-chart"></canvas>
//   )
// };

// const BarChart = ({ data }) => {
//   const chartRef = useRef(null);

//   useEffect(() => {
//     const ctx = chartRef.current.getContext("2d");
//     const barChart = new Chart(ctx, {
//       type: "bar",
//       data,
//       options: {
//         plugins: {
//           legend: {
//             labels: {
//               color: "white",
//             },
//           },
//         },
//         scales: {
//           x: {
//             ticks: {
//               color: 'white',
//             },
//           },
//           y: {
//             ticks: {
//               color: 'white',
//             },
//           },
//         },
//       },
//     });

//     return () => {
//       barChart.destroy();
//     };
//   }, [data]);

//   return <canvas className="p" ref={chartRef}></canvas>;
// };

// const RevenueGenerated = () => {
//   const [currentPage, setCurrentPage] = useState(2);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedRow, setSelectedRow] = useState([]);
//   const handleCheckboxChange = (userId) => {
//     if (selectedRow.includes(userId)) {
//       setSelectedRow(selectedRow.filter((id) => id !== userId));
//     } else {
//       setSelectedRow([...selectedRow, userId]);
//     }
//   };

//   const isRowSelected = (userId) => {
//     return selectedRow.includes(userId);
//   };

//   const barChartData = {
//     labels: [
//       "Jan",
//       "Feb",
//       "Mar",
//       "Apr",
//       "May",
//       "Jun",
//       "Jul",
//       "Aug",
//       "Sep",
//       "Oct",
//       "Nov",
//       "Dec",
//     ],
//     datasets: [
//       {
//         label: "Revenue",
//         data: [10, 20, 15, 55, 30, 35, 30, 65, 30, 55, 20, 45],
//         backgroundColor: "white",
//         barPercentage: 0.45
//       },
//     ],
//   };

//   const pieChartData = {
//     labels: [
//       "Jan",
//       "Feb",
//       "Mar",
//       "Apr",
//       "May",
//       "Jun",
//       "Jul",
//       "Aug",
//       "Sep",
//       "Oct",
//       "Nov",
//       "Dec",
//     ],
//     datasets: [
//       {
//         label: "Revenue",
//         data: [60, 50, 30, 70, 25, 20, 20, 5, 10, 10,],
//         backgroundColor: [
//           "#3A5EDE",
//           "#6C4B4B",
//           "#CB5A5A",
//           "#30AFBC",
//           "#5ACB6C",
//           "#AA5AFB",
//           "#FB5AE1",
//           "#522D36",
//           "#3D2581",
//           "#554669",
//           "#99cc00",
//           "#FB5A80",
//         ],
//         shadow: true,
//         shadowColor:"#3A5EDE", 
//         shadowBlur: 50,

//       },
//     ],
//   };

//   const [windowWidth, setWindowWidth] = useState(window.innerWidth);

//   useEffect(() => {
//     const handleResize = () => {
//       setWindowWidth(window.innerWidth);
//     };

//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   const itemsPerPage = 8;
//   const totalPages = (currentPage - 1) * itemsPerPage;
//   const startIndex = 1;
//   // eslint-disable-next-line
//   const endIndex = startIndex + itemsPerPage;

//   return (
//     <div className="flex flex-col items-center pt-6 max536:pt-0 gap-10 mx-[10rem]">
//       <div
//         className={`w-[83vw] max536:bg-transparent mt-[2rem] max600:mr-[3rem]
//         } rounded-3xl p-3 m`}
//       >
//         <div className="flex justify-between w-[72vw] pl-5 ml-[6.4rem] text-[2.3125rem] max536:mb-3 K2D mb-[-1rem] font-[600] max850:text-[2rem] max1300:ml-0">
//           <h2 className="moveRight ">
//             Revenue Generated
//           </h2>
//           <div className="relative">
//             <img src={AdminPic} alt="" />
//             <div className="absolute w-[9px] h-[8px] top-[0.45rem] right-[-0.3rem] bg-black rounded-[4px]" />
//           </div>
//         </div>
//         <div className="flex flex-row justify-evenly items-center gap-[4rem] max1300:flex-col max1300:gap-[1rem]">
//           <div
//             className="flex items-center border-1 rounded-[20px] border-[#545454] w-[35rem] h-[20rem] mt-[2rem] ml-6 max800:hidden "
//             style={{
//               background: "linear-gradient(180deg, #30AFBC 0%, #000 100%)",
//             }}
//           >
//             <BarChart data={barChartData} />
//           </div>
//           <div className="w-[17rem] min800:hidden ml-[-6rem] mt-[1rem]">
//             {windowWidth <= 768 && <PieChart data={pieChartData} />}
//           </div>


//           <div className="flex flex-col items-center max1300:flex-row flex-col-sm">
//             <div className="flex flex-col justify-center items-center border-2 border-[#545454] rounded-[0.4rem] w-[25rem] h-[9rem] mt-[2rem] ml-6 max500:w-[80vw]"
//               style={{
//                 boxShadow: "0px 0px 18px #ffe39e, 0px 0px 4px 0px rgba(0, 0, 0, 0.01)",
//               }}
//             >
//               <img className='w-[3rem]' src={Dollar} alt="" />
//               <div className="fontlex text-[2rem]">$50000</div>
//               <div className="fontlex text-[0.9rem]">Total payment this year</div>
//             </div>
//             <div className="flex flex-col justify-center items-center border-2 border-[#545454] rounded-[0.4rem] w-[25rem] h-[9rem] mt-[2rem] ml-6 max500:w-[80vw]"
//             // style={{
//             //   boxShadow: "0px 0px 18px #ffe39e, 0px 0px 4px 0px rgba(0, 0, 0, 0.01)",
//             // }}
//             >
//               <img className='w-[3rem]' src={shopIcon} alt="" />
//               <div className="fontlex text-[2rem]">$50k/$45k</div>
//               <div className="fontlex text-[0.9rem]">This Month/Previous Month</div>
//             </div>
//           </div>
//         </div>

//         <div className="flex flex-row justify-start gap-[3rem] ml-[4rem] max600:ml-[-0.5rem]">

//           {/* searchBar */}
//           <div className="flex items-center ">
//             <div className="flex w-[28.25rem] border-2 border-solid border-[#000] border-opacity-20 rounded-[0.1875rem] p-[0.1rem] mb-8 mt-6 max1050:w-[40vw]">
//               <img className="w-[1.9rem] h-[1.9rem] opacity-60 ml-2" src={SearchIcon} alt="" />
//               <input
//                 className="flex-1 outline-none rounded-md K2D text-[#000] text-[0.9rem] tracking-[1px] font-[600] max1050:text-[1vw] "
//                 type="text"
//                 placeholder={window.innerWidth >= 600 ? "Search “Name, Email, Number”" : ""}
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//               <img className="w-[1rem] h-[1.5rem] mt-1 mr-[0.8rem] opacity-50" src={Arrow} alt="" />
//             </div>
//           </div>

//           {/* functionalities */}
//           <div className=" relative border border-black min-w-[9rem] rounded-[1.3125rem] h-8 mt-[1.56rem] bg-white">
//             <div className="flex flex-row justify-center gap-3 p-[0.3rem] px-5">
//               <button><img className="w-[1.2rem]" src={CSV} alt="" /></button>
//               <button><img className="w-[1rem]" src={Add} alt="" /></button>
//               <button><img className="w-[1.2rem]" src={Filter} alt="" /></button>
//               <button><img className="w-[1.1rem]" src={Selections} alt="" /></button>
//             </div>
//             <div className=" absolute right-[4px] bottom-[-7px] border border-[#989898b8] w-[9rem] rounded-[1.3125rem] h-8 mt-6 z-[-1]"></div>
//           </div>
//         </div>

//         {/* pagination */}
//         <div className="flex justify-end mt-[-3rem] mr-[3rem] mb-[1rem] max1300:hidden">
//           <Pagination
//             count={totalPages}
//             page={currentPage}
//             onChange={(event, value) => setCurrentPage(value)}
//             className="custom-pagination"
//           />
//         </div>

//         <div className="flex flex-col justify-center items-center">
//           {/* Headings */}
//           <div className=" w-[77vw] items-center relative text-[0.9rem] border-2 border-solid border-[#757575] gap-[0] mb-2 max1050:hidden ">
//             <div className="absolute w-[8px] h-[8px] top-[0.45rem] left-3 bg-black rounded-[4px]" />
//             <div className="flex flex-row justify-between">
//               <div className="font-[700] pl-[5rem]">Company (Owner’s Details)</div>
//               <div className="font-[700]">Country</div>
//               <div className="font-[700] ml-[3rem]">Revnue ($)</div>
//               <div className="font-[700]">Due</div>
//               <div className="font-[700]"></div>
//               <div></div>
//               <div></div>
//             </div>
//             <div className="absolute w-[8px] h-[8px] top-[0.45rem] right-3 bg-black rounded-[4px]" />
//           </div>
//           <div className=" w-[77vw] bg-[#757575] h-[0.095rem] mb-4 max1050:hidden "></div>

//           <div className="flex justify-center w-[77vw] relative overflow-y-auto max-h-[48vh] scroll-container pl-[7px] max1050:w-[101vw]">
//             <div
//               className={`w-[76.5vw] mb-3 p-2 border-2 border-solid rounded-[0.5rem] item-center relative max600:w-[90vw] max600:ml-5 ${isRowSelected()
//                 ? "my-2 border-[#30AFBC] transform scale-y-[1.18] transition-transform duration-500 ease-in-out"
//                 : "border-[#a2a2a280]"
//                 }`}
//             >
//               {/* checkbox */}
//               <label className="relative">
//                 <input
//                   type="checkbox"
//                   className="hidden"
//                   onChange={() => handleCheckboxChange()}
//                   checked={isRowSelected()}
//                 />
//                 <div className="absolute mt-5 w-[1rem] h-[1rem] border-2 border-[#757575] cursor-pointer">
//                   {isRowSelected() && (
//                     <img
//                       src={Select}
//                       alt="Selected"
//                       className="w-full h-full"
//                     />
//                   )}
//                 </div>
//               </label>

//               <div className="absolute right-2 mt-5"><img src={personIcon} alt="" /></div>
//               <div className="flex flex-row K2D items-center">
//                 <div className=" flex gap-[1rem] pl-[2rem] items-center">
//                   <div className="rounded-[50%] overflow-hidden w-[3.7rem] h-[3.4rem]">
//                     <img src={Bworkz} alt="Avishek" className="w-full h-full object-cover" />
//                   </div>
//                   <div className="grid grid-cols-12 items-center w-[60vw]">
//                     <div className="col-span-3 flex flex-col max600:w-[10rem]">
//                       <div className="font-[900] email-hover cursor-pointer">
//                         Avishek
//                       </div>
//                       <div className="overflow-auto text-[0.8rem] font-[600] email-hover cursor-pointer">avishek@gmail.com</div>
//                       <div className="overflow-auto text-[0.8rem] font-[600]">7735227398</div>
//                     </div>
//                     <div className="col-span-3 ml-[2rem] font-semibold text-sm max767:hidden">USA</div>
//                     <div className="col-span-3 ml-[1rem] font-semibold text-sm max767:hidden">$45k/$50k</div>
//                     <div className="col-span-2 font-semibold text-sm ml-[-1.5rem] max767:hidden">0</div>
//                     <div className="col-span-2 relative max850:hidden">
//                       <div >
//                         <div></div>
//                         <div></div>
//                       </div>
//                     </div>
//                     <div className="font-[600] ml-[-1rem] text-[0.9rem] pr-[6rem] max850:hidden"></div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//     </div>
//   )
// }

// export default RevenueGenerated