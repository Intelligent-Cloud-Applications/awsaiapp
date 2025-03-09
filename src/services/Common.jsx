import React, { useState } from "react";
import Arrow from "../utils/Assets/common_icon.png";
import { Link } from "react-router-dom";

const Common = () => {
  const arrowStyle = {
    width: "30px", // Set the desired width
    height: "30px", // Set the desired height
    position: "absolute",
  };

  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  const containerStyle = {
    width: isPanelOpen ? "250px" : "20px",
    transition: "width 0.3s ease", // Add a transition effect for the container width
    position: "relative",
  };

  const panelStyle = {
    width: "300px", // Set the width of the panel
    position: "relative",
    left: isPanelOpen ? "40px" : "-300px", // Adjust the initial left position to hide the panel
    top: "0",
    height: "100%",
    transition: "left 0.3s ease", // Add a transition effect for the left position
    boxShadow: "2px 2px 4px #353535",
    borderRadius: "10px",
  };

  return (
    <div className="flex flex-row " style={containerStyle}>
      <div
        className=" h-[30px] w-[30px] absolute bg-[#30AFBC] mt-[2rem]"
        style={{
          boxShadow: "2px 2px 4px #353535",
          borderTopRightRadius: "10px",
          borderBottomRightRadius: "10px",
        }}
      >
        <img
          src={Arrow}
          alt="arrow"
          style={arrowStyle}
          className="p-2 cursor-pointer"
          onClick={togglePanel}
        />
      </div>
      <div style={panelStyle} className=" mt-[2rem] w-[90%]">
        <ul className="gap-6 sty">
          <div>
            <Link to="/User_interface">User interface & User experience</Link>
          </div>
          <div>
            <Link to="/Personalization">Personalization</Link>
          </div>
          <div>
            <Link to="/identity">Login And identity managment</Link>
          </div>
          <div>
            <Link to="/trade">Trade Specific features</Link>
          </div>
          <div>
            <Link to="/customer">Leads & customer tracking</Link>
          </div>
          <div>
            <Link to="/payment">Payments</Link>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Common;
