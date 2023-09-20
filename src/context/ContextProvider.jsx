import React, { useState } from "react";
import Context from "./Context";

const ContextProvider = (props) => {
  const [loader, setLoader] = useState(false);

  const setLoaderFn = (data) => {
    setLoader(data);
  };

  const ContextData = {
    util: {
      loader: loader,
      setLoader: setLoaderFn,
    },
  };

  return (
    <Context.Provider value={ContextData}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
