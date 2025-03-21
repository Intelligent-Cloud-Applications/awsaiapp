import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LeftBanner from "../components/Dashboard/LeftBanner/LeftBanner";
import Context from "../context/Context";
// import ClientsPayments from "../components/Dashboard/ClientsPayment/ClientsPayments";
// import PendingClients from "../components/Dashboard/PendingClients/PendingClients";
import NavBar from "../components/Home/Navbar";
import Panel from "../components/Dashboard/Panel/Panel";
import RevenueGenerated from "../components/Dashboard/Revenue/RevenueGenerated";
import MemberList from "../components/Dashboard/MemberList/Index"
import MonthlyReport from "../components/Dashboard/MonthlyReport/MonthlyReport";
import LeadsList from "../components/Dashboard/LeadsList/LeadsList";
import { IoMdArrowRoundBack } from "react-icons/io";
// import { Link } from "react-router-dom";
import Profile from "../components/Dashboard/Profile/Profile";
import InstitutionDraft from "../components/Dashboard/InstittionDraft/InstitutionDraft";
import AdminMemberlist from "../components/Dashboard/AdminMemberlist/AdminMemberlist";
import AwsaiappRevenue from "../components/Dashboard/AwsaiappRevenue";
const DashBoard = () => {
  const [click, setClick] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  // const location = useLocation();
  const Ctx = useContext(Context);
  console.log(Ctx);
  useEffect(() => {
    if (location.state && location.state.section === 'institution-draft') {
      setClick(3);  // Assuming 'Institution Draft' is at index 3
    }
  }, [location.state]);
  // useEffect(() => {
  //   const selectedPage = localStorage.getItem("selectedPage");
  //   if (selectedPage !== null) {
  //     setClick(parseInt(selectedPage));
  //   } else {
  //     // If there's no selected page, set the default to 0 (Panel)
  //     setClick(0);
  //   }
  // }, []);
  // const queryParams = new URLSearchParams(location.search);
  //eslint-disable-next-line
  // const institutionNames = queryParams.get("institution");
  // useEffect(() => {
  //   localStorage.setItem("selectedPage", click.toString());
  // }, [click]);

  const displayAfterClick = () => {
    if (Ctx.userData.institutionName === "awsaiapp") {
      switch (click) {
        case 0:
          return <Panel />;

        case 1:
          return <RevenueGenerated />;

        case 2:
          return <Profile />;

        case 3:
          return <InstitutionDraft />;

        case 4:
          return <AdminMemberlist />

        case 5:
          return <AwsaiappRevenue />

        default:
          return <div>Sorry, the server is down. Please try again later.</div>;
      }
    } else if (
      Ctx.userData.institutionName !== "awsaiapp"
      && (Ctx.userData.userType === "member" || Ctx.userData.userType === "admin")
    ) {
      switch (click) {
        case 0:
          return (
            <div className="mt-5">
              <MonthlyReport
                institution={localStorage.getItem("institutionName")}
              />
            </div>
          );

        case 1:
          return (
            <div className="ml-[8.5rem] ">
              <MemberList
                institution={localStorage.getItem("institutionName")}
              />
            </div>
          );
        // institution = "happyprancer"
        case 2:
          return (
            <div className="mt-[-10rem] max1300:mt-[0rem] max1300:pb-10">
              <LeadsList
                institution={localStorage.getItem("institutionName")}
              />
            </div>
          );
        default:
          return <div>Please try again later</div>;
      }
    } else {
      return <div className="bg-white w-[100vw] h-[200vh] z-6"></div>;
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <NavBar />
      <div>
        {Ctx.userData.userType === "admin" &&
          Ctx.userData.institutionName !== "awsaiapp" && (
            <>
              <div className="fixed left-10 mt-20 mb-4 lg:hidden">
                <IoMdArrowRoundBack
                  onClick={() => {
                    navigate(-2);
                    window.location.reload();
                  }}
                  className="text-5xl"
                />
              </div>
            </>
          )}
      </div>
      <div className="flex flex-row rounded-3xl items-center lg:ml-28">
        <div className="bg-[#ffffff] mt-[8rem] ml-[-4rem] max600:ml-0 ">
          <LeftBanner
            displayAfterClick={(data) => {
              setClick(data);
            }}
          />
        </div>

        <div className={` ${click === 1 ? "mt-0" : click === 0
          ? "mt-[34px]" : "flex flex-col mt-[6rem] justify-center items-center max800:justify-center w-[90vw]"
          }`}>
          <div className="">{displayAfterClick()}</div>
        </div>
      </div>
    </div>

  );
};

export default DashBoard;
