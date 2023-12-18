import React, { useState, useContext, useEffect } from "react";
import LeftBanner from "../components/Dashboard/LeftBanner/LeftBanner";
import Context from "../context/Context";
import ClientsPayments from "../components/Dashboard/ClientsPayment/ClientsPayments";
import PendingClients from "../components/Dashboard/PendingClients/PendingClients";
import NavBar from "../components/Home/Navbar";
import Panel from "../components/Dashboard/Panel/Panel";
import RevenueGenerated from "../components/Dashboard/Revenue/RevenueGenerated";
import MemberList from '../components/Dashboard/MemberList/MembersList';
import MonthlyReport from '../components/Dashboard/MonthlyReport/MonthlyReport';


const DashBoard = () => {
  const [click, setClick] = useState(0);
  const Ctx = useContext(Context);
 console.log(Ctx)
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
    } else if (Ctx.userData.institution !== "awsaiapp" && Ctx.userData.userType === "admin") {
      switch (click) {
        case 0:
          return <MonthlyReport institution={localStorage.getItem('institution')} />

        case 1:
          return <div className="mr-[5rem] max850:mr-7"><MemberList institution={localStorage.getItem('institution')} /></div>
        // institution = "happyprancer"

        default:
          return <div>Please try again later</div>;
      }
    } else {
      return ( 
        <div className="bg-white w-[100vw] h-[200vh] z-6"></div>
      )
    }
  };

  return (
    <div className="flex flex-col items-center w-screen h-screen">
      <div className="w-[100vw]">
        <NavBar />
      </div>
      <div className="flex flex-row rounded-3xl items-center max1300:flex-col-reverse">

        <div className="bg-[#ffffff] mt-[8rem] ml-[-4rem] max600:ml-0 max850:mt-[0] ">
          <LeftBanner
            displayAfterClick={(data) => {
              setClick(data);
            }}
          />
        </div>

        <div className="flex flex-col mt-[6rem] justify-center items-center max800:justify-center w-[85vw]">
          <div className="">{displayAfterClick()}</div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
