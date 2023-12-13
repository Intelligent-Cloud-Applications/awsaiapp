import React, { useState, useEffect, useContext } from "react";
import Mnagement from "../../../utils/Assets/Dashboard/images/SVG/PendingPayments.svg";
import graph from "../../../utils/Assets/Dashboard/images/PNG/Graph.png";
import Members from "../../../utils/Assets/Dashboard/images/PNG/Members.png";
import Bit from "../../../utils/Assets/Dashboard/images/SVG/ClientsPayment.svg";
import Home from "../../../utils/Assets/Dashboard/images/SVG/Home.svg"
import "./LeftBanner.css";
import context from "../../../context/Context";
// import { Navigate } from "react-router-dom";

const LeftBanner = ({ displayAfterClick }) => {
  const [click, setClick] = useState(0);
  const Ctx = useContext(context);
  const isSuperAdmin = Ctx.userData.institution === "awsaiapp";
  const isNotSuperAdmin = Ctx.userData.institution !== "awsaiapp";

  useEffect(() => {
    const selectedPage = localStorage.getItem("selectedPage");
    if (selectedPage) {
      setClick(parseInt(selectedPage));
    }
  }, []);

  return (
    <div className="min-w-[4rem] p-3 bg-[#75757529] rounded-[17px] overflow-auto">
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
                  src={Home}
                  alt=""
                  style={{
                    width: "1.9rem",
                    minWidth: "1.9rem",
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
                  src={graph}
                  alt=""
                  style={{
                    width: "1.3rem",
                    minWidth: "1.3rem",
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
  );
};

export default LeftBanner;
