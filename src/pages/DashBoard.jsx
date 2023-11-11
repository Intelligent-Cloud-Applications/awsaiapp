import React, { useState, useContext, useEffect } from "react";
import LeftBanner from "../components/Dashboard/LeftBanner/LeftBanner";
import Context from "../context/Context";
import ClientsPayments from "../components/Dashboard/ClientsPayment/ClientsPayments";
import PendingClients from "../components/Dashboard/PendingClients/PendingClients";
import NavBar from "../components/Home/Navbar";
import Panel from "../components/Dashboard/Panel/Panel";
import RevenueGenerated from "../components/Dashboard/Revenue/RevenueGenerated";
import MemberList from '../components/Dashboard/Revenue/RevenueGenerated';

const DashBoard = () => {
  const [click, setClick] = useState(0);
  const Ctx = useContext(Context);
  
  useEffect(() => {
    const selectedPage = localStorage.getItem("selectedPage");
    if (selectedPage) {
      setClick(parseInt(selectedPage));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("selectedPage", click.toString());
  }, [click]);

  const displayAfterClick = () => {
    if (
      Ctx.userData.institution === "awsaiapp"
    ) {
      switch (click) {
        case 0:
          return <Panel />;

        case 1:
          return <RevenueGenerated />;

        case 2:
          return <ClientsPayments />;

        case 3:
          return <PendingClients />;

        default:
          return <div>Sorry, the server is down. Please try again later.</div>;
      }
    } else {
      switch (click) {
        case 0:
          return <MemberList />;
        default:
          return <div>Sorry, the server is down. Please try again later.</div>;
      }
    }
  };

  return (
    <div className="flex flex-col items-center w-screen h-screen">
      <div className="w-[100vw]">
        <NavBar />
      </div>
      <div className="flex flex-row rounded-3xl items-center max1300:flex-col-reverse">
        <div className="bg-white mt-[8rem] max850:mt-[0] ">
          <LeftBanner
            displayAfterClick={(data) => {
              setClick(data);
            }}
          />
        </div>
        <div className="flex flex-col justify-center items-center pt-8 max800:justify-center w-[85vw] max1050:ml-[1rem]">
          <div className="min-h-[88vh]">{displayAfterClick()}</div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
