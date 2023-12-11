import { createContext } from "react";

const Context = createContext({
  util: {
    loader: false,
    setLoader: () => {},
  },
  clients: {
    data: {},
    fetchClients: () => {},
    onReload:() => {},
  },
  // member: {
  //   data: [],
  //   fetchMember: () => {},
  // },
  user: { 
    profile: {},
    fetchUserProfile: () => {},
  },
});

export default Context;