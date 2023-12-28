import { createContext } from "react";

const Context = createContext({
  isAuth: "",
  setIsAuth: () => {},
  userData: "",
  setUserData: () => { },
  isUserDataLoaded: false,
  setIsUserDataLoaded: () => {},
  util: {
    loader: false,
    setLoader: () => {},
  },
  clients: {
    data: {},
    fetchClients: () => {},
    onReload:() => {},
  },
  pending: {
    data: {},
    fetchPending: () => {},
    onReload:() => {},
  },
  // member: {
  //   data: [],
  //   fetchMember: () => {},
  // },
  user: { 
    profile: {},
    fetchUserProfile: () => { },
  },
});

export default Context;