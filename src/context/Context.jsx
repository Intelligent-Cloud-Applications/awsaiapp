import { createContext } from "react";

const Context = createContext({
  util: {
    loader: false,
    setLoader: () => {},
  },
  clients: {
    data: {},
    fetchClients: () => {},
  },
  member: {
    data: [],
    fetchmember: () => {},
  },
  user: { 
    profile: {},
    fetchUserProfile: () => {},
  },
});

export default Context;
