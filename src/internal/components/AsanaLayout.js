// AsanaLayout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import AsanaNavBar from './AsanaNavBar';
import PendingTasksProvider from "../context/PendingTasksProvider";
import "./AsanaLayout.css";

const AsanaLayout = () => {
  return (
    <div className="asana-layout"> {/* Add this div with class */}
    <PendingTasksProvider>
      <AsanaNavBar />
      <Outlet />
    </PendingTasksProvider>
    </div>
  );
};

export default AsanaLayout;