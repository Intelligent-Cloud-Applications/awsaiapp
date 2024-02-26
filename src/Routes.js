import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import DashBoard from "./pages/DashBoard";
import MemberList from "./components/Dashboard/MemberList/MembersList";
import MonthlyReport from "./components/Dashboard/MonthlyReport/MonthlyReport";
import Pricing from "./pages/Pricing";
import Aboutus from "./pages/Aboutus";
import Team from "./pages/Team";
import Query from "./pages/Query";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import User from "./services/User_Interface";
import Personalization from "./services/Personalization";
import Identity from "./services/Login&IdentityManagment";
import Trade from "./services/Trade";
import Customer from "./services/Customer";
import Payment from "./services/Payment";
import Terms from "./pages/Terms";
import Refund from "./pages/Refund";
import SignUp from "./pages/SignUp";
import SubscriptionPopup from "./pages/Subscribe_POPUP";
import SubscriptionPopup1 from "./pages/Subscribe_POPUP1";
import SubscriptionPopup2 from "./pages/Subscribe_POPUP2";
import Template from "./pages/Template";
import Complete from "./pages/Complete";
import Pay from "./pages/Pay";
import Context from "./context/Context";

const RoutesContainer = () => {
  const Ctx = useContext(Context);
  const { institutionName,web, isVerified, isDelivered } = Ctx.userData;
  console.log("routes", Ctx.userData.institutionName)

  const redirectToDashboard = !web || !isVerified || !isDelivered;

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/subpopup" element={<SubscriptionPopup />} />
      <Route path="/subpopup1" element={<SubscriptionPopup1 />} />
      <Route path="/subpopup2" element={<SubscriptionPopup2 />} />
      <Route path="/logout" element={<Logout />} />
      { institutionName !== 'awsaiapp' && redirectToDashboard ? (
        <Route path="/dashboard" element={<DashBoard />} />
      ) : (
        <Route path="/Dashboard" element={<DashBoard />} />
      )}
      <Route path="/memberlist" element={<MemberList institution={null} />} />
      <Route path="/MonthlyReport" element={<MonthlyReport institution={null} />} />
      <Route path="/Pricing" element={<Pricing />} />
      <Route path="/aboutus" element={<Aboutus />} />
      <Route path="/team" element={<Team />} />
      <Route path="/query" element={<Query />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/User_interface" element={<User />} />
      <Route path="/Personalization" element={<Personalization />} />
      <Route path="/identity" element={<Identity />} />
      <Route path="/trade" element={<Trade />} />
      <Route path="/customer" element={<Customer />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/term" element={<Terms />} />
      <Route path="/refund" element={<Refund />} />
      <Route path="/template" element={<Template />} />
      <Route path="/complete" element={<Complete />} />
      <Route path="/pay" element={<Pay />} />
    </Routes>
  );
};

export default RoutesContainer;
