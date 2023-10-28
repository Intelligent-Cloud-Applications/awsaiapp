import React, { useState, useContext } from "react";
import LeftBanner from "../components/Dashboard/LeftBanner/LeftBanner";
import Context from "../context/Context";
import ClientsPayments from "../components/Dashboard/ClientsPayment/ClientsPayments";
import PendingClients from "../components/Dashboard/PendingClients/PendingClients";
import NavBar from "../components/Home/Navbar";
import Panel from "../components/Dashboard/Panel/Panel";
import RevenueGenerated from "../components/Dashboard/Revenue/RevenueGenerated";

const DashBoard = () => {
  const [click, setClick] = useState(0);
  // eslint-disable-next-line
  const Ctx = useContext(Context);
  const [userCheck, setUserCheck] = useState(0);
  const displayAfterClick = () => {
    if (Ctx.userData.userType !== "admin") {
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
          return <div>Sorry the server is down please try after sometimes</div>;
      }
    } else if (Ctx.userData.userType !== "client") {
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
          return <div>Sorry the server is down please try after sometimes</div>;
      }
    }
  };

  return (
    <div className="flex flex-col items-center w-screen h-screen ">
      <div className="w-[100vw]">
        <NavBar />
      </div>
      <div className="flex flex-row rounded-3xl items-center max1300:flex-col-reverse">
        {/* Center the LeftBanner below 1300 pixels */}
        <div className=" bg-white">
          <LeftBanner
            displayAfterClick={(data) => {
              setClick(data);
            }}
          />
        </div>
        <div className="flex flex-col justify-center items-center pt-8  max800:justify-center w-[85vw] max1050:ml-[1rem]">
          <div className="min-h-[88vh]">
            {displayAfterClick()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
