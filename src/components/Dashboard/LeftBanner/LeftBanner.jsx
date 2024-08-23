import React, { useState, useEffect, useContext } from "react";
import Mnagement from "../../../utils/Assets/Dashboard/images/SVG/PendingPayments.svg";
import graph from "../../../utils/Assets/Dashboard/images/PNG/Graph.png";
import lead from '../../../utils/Assets/Dashboard/images/PNG/leads.png'
import Members from "../../../utils/Assets/Dashboard/images/PNG/Members.png";
import Bit from "../../../utils/Assets/Dashboard/images/SVG/ClientsPayment.svg";
// import Home from "../../../utils/Assets/Dashboard/images/SVG/Home.svg"
import "./LeftBanner.css";
import context from "../../../context/Context";
// import { Navigate } from "react-router-dom";

const LeftBanner = ({ displayAfterClick }) => {
  const [click, setClick] = useState(0);
  const Ctx = useContext(context);
  const isSuperAdmin = Ctx.userData.institutionName === "awsaiapp";
  const isNotSuperAdmin = Ctx.userData.institutionName !== "awsaiapp";
  console.log(Ctx.userData.institutionName)

  useEffect(() => {
    const selectedPage = localStorage.getItem("selectedPage");
    if (selectedPage) {
      setClick(parseInt(selectedPage));
    }
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-white max1300:h-0 ">
      <div className="flex justify-center items-center">
        <div className="min-w-[4rem] p-3 bg-[#30AFBC] rounded-[17px] overflow-auto max1300:w-screen max1300:fixed max1300:bottom-[0] max1300:left-0 max1300:items-center max1300:z-30">
          <div className="rounded-r-[7rem] rounded-b-none flex flex-col items-center justify-between">
            <ul className="gap-[3rem] text-center flex flex-col items-center max1300:flex-row">
              {isSuperAdmin && (
                <li
                  className={`relative z-[2] gap-1 py-[0.3rem] items-center text-[1.1rem] w-[auto] p-2 font-bold rounded-md cursor-pointer `}
                  onClick={() => {
                    setClick(0);
                    displayAfterClick(0);
                  }}
                >
                  <img
                    src={Members}
                    alt=""
                    style={{
                      width: "1.9rem",
                      minWidth: "1.9rem",
                      filter:
                        click === 0 ? "drop-shadow(#30AFBC 0px 3px 3px)" : "none",
                    }}
                  />
                </li>
              )}
              {isSuperAdmin && (
                <li
                  className={`relative z-[2] gap-1 py-[0.3rem] items-center text-[1.1rem] w-[auto] p-2 font-bold rounded-md cursor-pointer`}
                  onClick={() => {
                    setClick(1);
                    displayAfterClick(1);
                  }}
                >
                  <img
                    src={graph}
                    alt=""
                    style={{
                      width: "1.3rem",
                      minWidth: "1.3rem",
                      filter:
                        click === 1 ? "drop-shadow(#30AFBC 0px 3px 3px)" : "none",
                    }}
                  />
                </li>
              )}
              {isSuperAdmin && (
                <li
                  className={`relative z-[2] gap-1 py-[0.3rem] items-center text-[1.1rem] w-[auto] p-2 font-bold rounded-md cursor-pointer `}
                  onClick={() => {
                    setClick(2);
                    displayAfterClick(2);
                  }}
                >
                  <img
                    src={Bit}
                    alt=""
                    style={{
                      width: "1.5rem",
                      minWidth: "1.5rem",
                      filter:
                        click === 2 ? "drop-shadow(#30AFBC 0px 3px 3px)" : "none",
                    }}
                  />
                </li>
              )}
              {isSuperAdmin && (
                <li
                  className={`relative z-[2] gap-1 items-center text-[1.1rem] w-[86%] p-2 font-bold rounded-md`}
                  onClick={() => {
                    setClick(3);
                    displayAfterClick(3);
                  }}
                >
                  <img
                    src={Mnagement}
                    alt=""
                    style={{
                      width: "1.9rem",
                      minWidth: "1.9rem",
                      filter:
                        click === 3 ? "drop-shadow(#30AFBC 0px 3px 3px)" : "none",
                    }}
                  />
                </li>
              )}
              {isNotSuperAdmin && (
                <>
                  <li
                    className={`relative z-[2] gap-1 py-[0.3rem] items-center text-[1.1rem] w-[auto] p-2 font-bold rounded-md cursor-pointer `}
                    onClick={() => {
                      setClick(0);
                      displayAfterClick(0);
                      // Navigate(``)
                    }}
                  >
                    <img
                      src={graph}
                      alt=""
                      style={{
                        width: "1.3rem",
                        minWidth: "1.3rem",
                        filter:
                          click === 0 ? "drop-shadow(#30AFBC 0px 3px 3px)" : "none",
                      }}
                    />
                  </li>
                  <li
                    className={`relative z-[2] gap-1 py-[0.3rem] items-center text-[1.1rem] w-[auto] p-2 font-bold rounded-md cursor-pointer `}
                    onClick={() => {
                      setClick(1);
                      displayAfterClick(1);
                      // Navigate(``)
                    }}
                  >
                    <img
                      src={Members}
                      alt=""
                      style={{
                        width: "1.9rem",
                        minWidth: "1.9rem",
                        filter:
                          click === 1 ? "drop-shadow(#30AFBC 0px 3px 3px)" : "none",
                      }}
                    />
                  </li>
                  <li
                    className={`relative z-[2] gap-1 py-[0.3rem] items-center text-[1.1rem] w-[auto] p-2 font-bold rounded-md cursor-pointer`}
                    onClick={() => {
                      setClick(2);
                      displayAfterClick(2);
                    }}
                  >
                    <img
                      src={lead}
                      alt=""
                      style={{
                        width: "2rem",
                        minWidth: "2rem",
                        filter:
                          click === 2 ? "drop-shadow(#30AFBC 0px 3px 3px)" : "none",
                      }}
                    />
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftBanner;

// import React, { useState, useEffect, useContext } from "react";
// import { Sidebar } from "flowbite-react";
// import { HiChartPie, HiShoppingBag, HiInbox } from "react-icons/hi";
// import context from "../../../context/Context";
// import "./LeftBanner.css"; // Add your custom CSS here

// const LeftBanner = ({ displayAfterClick }) => {
//   const [click, setClick] = useState(0);
//   const Ctx = useContext(context);
//   const isSuperAdmin = Ctx.userData.institutionName === "awsaiapp";
//   const isNotSuperAdmin = Ctx.userData.institutionName !== "awsaiapp";

//   useEffect(() => {
//     const selectedPage = localStorage.getItem("selectedPage");
//     if (selectedPage) {
//       setClick(parseInt(selectedPage));
//     }
//   }, []);

//   return (
//     <div className="flex justify-center items-center h-screen bg-white max1300:h-9 min1150::fixed min1150:top-0 min1150:left-0 ">
//       <Sidebar aria-label="Sidebar with icons example" className="custom-sidebar z-20">
//         <Sidebar.Items>
//           <Sidebar.ItemGroup className="flex flex-col ">
//             {isSuperAdmin && (
//               <>
//                 <Sidebar.Item
//                   href="#"
//                   icon={HiChartPie}
//                   onClick={() => {
//                     setClick(0);
//                     displayAfterClick(0);
//                   }}
//                   className={`custom-sidebar-item ${click === 0 ? "active" : ""}`}
//                 >
//                   <span className="hidden md:inline">Client Panel</span>
//                 </Sidebar.Item>
//                 <Sidebar.Item
//                   href="#"
//                   icon={HiShoppingBag}
//                   onClick={() => {
//                     setClick(1);
//                     displayAfterClick(1);
//                   }}
//                   className={`custom-sidebar-item ${click === 1 ? "active" : ""}`}
//                 >
//                   <span className="hidden md:inline">Graph</span>
//                 </Sidebar.Item>
//                 <Sidebar.Item
//                   href="#"
//                   icon={HiInbox}
//                   onClick={() => {
//                     setClick(2);
//                     displayAfterClick(2);
//                   }}
//                   className={`custom-sidebar-item ${click === 2 ? "active" : ""}`}
//                 >
//                   <span className="hidden md:inline">Bit</span>
//                 </Sidebar.Item>
//               </>
//             )}
//             {isNotSuperAdmin && (
//               <>
//                 <Sidebar.Item
//                   href="#"
//                   icon={HiChartPie}
//                   onClick={() => {
//                     setClick(0);
//                     displayAfterClick(0);
//                   }}
//                   className={`custom-sidebar-item ${click === 0 ? "active" : ""}`}
//                 >
//                   <span className="hidden md:inline">Graph</span>
//                 </Sidebar.Item>
//                 <Sidebar.Item
//                   href="#"
//                   icon={HiShoppingBag}
//                   onClick={() => {
//                     setClick(1);
//                     displayAfterClick(1);
//                   }}
//                   className={`custom-sidebar-item ${click === 1 ? "active" : ""}`}
//                 >
//                   <span className="hidden md:inline">Members</span>
//                 </Sidebar.Item>
//                 <Sidebar.Item
//                   href="#"
//                   icon={HiInbox}
//                   onClick={() => {
//                     setClick(2);
//                     displayAfterClick(2);
//                   }}
//                   className={`custom-sidebar-item ${click === 2 ? "active" : ""}`}
//                 >
//                   <span className="hidden md:inline">Leads</span>
//                 </Sidebar.Item>
//               </>
//             )}
//           </Sidebar.ItemGroup>
//         </Sidebar.Items>
//       </Sidebar>
//     </div>
//   );
// };

// export default LeftBanner;

