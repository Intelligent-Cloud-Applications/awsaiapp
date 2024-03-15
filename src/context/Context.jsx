import { createContext } from 'react'

const Context = createContext({
  isAuth: '',
  setIsAuth: () => {},
  userData: '',
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
  pending: {
    data: {},
    fetchPending: () => {},
    onReload: () => {},
  },
  user: {
    profile: {},
    fetchUserProfile: () => {},
  },
  templateDetails: {
    details: {},
    fetchTemplateDetails: () => {},
  },
  subscriptionDetails: {},
  instructorDetails: {},
  fetchProductDetails: () => {},
  fetchInstructorDetails: () => {},
})

export default Context
