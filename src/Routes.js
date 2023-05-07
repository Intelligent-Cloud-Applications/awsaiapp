import React from "react";
import { Route, Routes } from "react-router-dom";
import DashBoard from "./pages/DashBoard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import About from "./pages/AboutUs";
import Teams from "./pages/Teams";
import Services from "./pages/Services";
import Query from "./pages/Query";
import ForgotPassword from "./pages/ForgotPassword";
import PaymentFailed from "./pages/PaymentFailed";
import PaymentSuccessful from "./pages/PaymentSuccessful";

const RoutesContainer = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<DashBoard />} />
      <Route path="/aboutus" element={<About />} />
      <Route path="/teams" element={<Teams />} />
      <Route path="/services" element={<Services />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/query" element={<Query />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/paymentsuccessful" element={<PaymentSuccessful />} />
      <Route path="/paymentfailed" element={<PaymentFailed />} />
    </Routes>
  );
};

export default RoutesContainer;
