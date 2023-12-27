import { createContext } from "react";

const Context = createContext({
  isAuth: "",
  setIsAuth: () => {},
  userData: "",
  setUserData: () => {},
  isUserDataLoaded: false,
  setIsUserDataLoaded: () => {},
  util: {
    loader: false,
    setLoader: () => {},
  },
  clients: {
    data: {},
    fetchClients: () => {},
    onReload: () => {},
  },
  products: [],
  fetchProducts: () => {},
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
