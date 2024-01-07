import React, { useContext } from "react";
import Context from "../context/Context";
import { useLocation } from "react-router-dom"; // Assuming you're using React Router

const LoaderProvider = (props) => {
  const UtilCtx = useContext(Context).util;
  const location = useLocation();

  // Check if the current URL contains "/dashboard"
  const isDashboard = location.pathname.includes("/dashboard");

  return (
    <div>
      {UtilCtx.loader && (
        <div className={`fixed top-0 left-0 w-screen h-screen z-[20] ${isDashboard ? 'bg-[#e7e7e7]' : 'bg-[#00000075]'}`}>
          <div className="flex flex-col items-center justify-center w-screen h-screen">
            <p className="loader"></p>
            <p className="font-[400] K2D text-[1.2rem] text-[#ffffff]">Please Wait... </p>
          </div>
        </div>
      )}
      {props.children}
    </div>
  );
};

export default LoaderProvider;
