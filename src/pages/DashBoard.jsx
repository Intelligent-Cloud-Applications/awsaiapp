import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LeftBanner from "../components/Dashboard/LeftBanner/LeftBanner";
import ClientsPayments from "../components/Dashboard/ClientsPayment/ClientsPayments";
import MemberList from "../components/Dashboard/MemberList/MembersList";
import NavBar from "../components/Home/Navbar";
import Context from "../context/Context";
import Panel from "../components/Dashboard/Panel/Panel";
import RevenueGenerated from "../components/Dashboard/Revenue/RevenueGenerated";

const DashBoard = () => {
  const [click, setClick] = useState(0);
  const Ctx = useContext(Context);
  const [userCheck, setUserCheck] = useState(0);

  const Navigate = useNavigate();
  useEffect(() => {
    if (Ctx.isUserDataLoaded) {
      if (Ctx.userData.userType !== "admin") {
        Navigate("/");
      }
    }
  }, [Ctx, Navigate]);

  const displayAfterClick = () => {
    switch (click) {
      case 0:
        return <Panel />;

      case 1:
        return <RevenueGenerated />;

      case 2:
        return <ClientsPayments />;

      case 3:
        return <MemberList />;

      default:
        return <div>Sorry the server is down please try after sometimes</div>;
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
