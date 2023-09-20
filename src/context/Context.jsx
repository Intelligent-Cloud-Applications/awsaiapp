import { createContext } from "react";

const Context = createContext({
  util: {
    loader: false,
    setLoader: () => {},
  },
});

export default Context;
