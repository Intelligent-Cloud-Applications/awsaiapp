import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import DashBoard from "./pages/DashBoard";
import Pricing from "./pages/Pricing.jsx";

const RoutesContainer = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<DashBoard />} />
      <Route path="/Pricing" element={<Pricing />} />
    </Routes>
  );
};

export default RoutesContainer;
