import React, { useContext } from "react";
import Context from "../context/Context";

const LoaderProvider = (props) => {
  const UtilCtx = useContext(Context).util;

  return (
    <div>
      {UtilCtx.loader && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-[#0000006e] z-[20]">
          <div className="flex flex-col items-center justify-center w-screen h-screen">
            <p className="loader"></p>
            <p className="font-[400] K2D text-[1.2rem]">Please Wait... </p>
          </div>
        </div>
      )}
      {props.children}
    </div>
  );
};

export default LoaderProvider;