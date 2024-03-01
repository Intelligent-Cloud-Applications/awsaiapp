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
  products: [],
  fetchProducts: () => {},
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
  templateDetails: {
    details:{},
    fetchTemplateDetails: () => {},
  },
});

export default Context;