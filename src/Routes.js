import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import DashBoard from "./pages/DashBoard";
import Pricing from "./pages/Pricing";
import Aboutus from "./pages/Aboutus";
import Team from "./pages/Team";
import Query from "./pages/Query";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import User from "./services/User_Interface";
import Personalization from "./services/Personalization";
import Identity from "./services/Login&IdentityManagment";
import Trade from "./services/Trade";
import Coustmer from "./services/Coustmer";
import Payment from "./services/Payment";
const RoutesContainer = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<DashBoard />} />
      <Route path="/Pricing" element={<Pricing />} />
      <Route path="/aboutus" element={<Aboutus />} />
      <Route path="/team" element={<Team />} />
      <Route path="/query" element={<Query />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/User_interface" element={<User />} />
      <Route path="/Personalization" element={<Personalization />} />
      <Route path="/identity" element={<Identity />} />
      <Route path="/trade" element={<Trade />} />
      <Route path="/coustmer" element={<Coustmer />} />
      <Route path="/payment" element={<Payment />} />
    </Routes>
    );
  };

export default RoutesContainer;
