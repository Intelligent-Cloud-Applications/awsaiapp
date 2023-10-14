import { createContext } from "react";

const Context = createContext({
  util: {
    loader: false,
    setLoader: () => {},
  },
  clients:{
    data:{},
    fetchClients: () => {},
  },
  members:{
    data:[],
    fetchMembers: () => {},
  }
});

export default Context;
