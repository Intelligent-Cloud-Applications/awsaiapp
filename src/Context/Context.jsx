import { createContext } from "react";

const Context = createContext({
  isAuth: "",
  setIsAuth: () => {},
  userData: "",
  setUserData: () => {},
  util: {
    loader: false,
    setLoader: () => {},
  },
  upcomingClasses: [],
  setUpcomingClasses: () => {},
  previousClasses: [],
  setPreviousClasses: () => {},
  userList: [],
  setUserList: () => {},
  productList: [],
  setProductList: () => {},
});

export default Context;
