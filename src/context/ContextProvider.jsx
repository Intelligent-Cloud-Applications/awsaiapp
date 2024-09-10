import React, { useState, useEffect } from "react";
import Context from "./Context";
import { API } from "aws-amplify";

const ContextProvider = (props) => {
  const [loader, setLoader] = useState(false);
  const [clients, setClients] = useState({});
  // const [pending, setPending] = useState({});
  const [products, setProducts] = useState([]);
  const [userProfile, setUserProfile] = useState({});
  const [isAuth, setIsAuth] = useState(false);
  const [templateDetails, setTemplateDetails] = useState({});
  const [subscriptionDetails, setSubscriptionDetails] = useState();
  const [instructordetails, setInstructordetails] = useState({})
  const [userData, setUserData] = useState({});
  const institutionId = localStorage.getItem('institution');

  useEffect(() => {
    fetchClients();
    fetchUserProfile();
    fetchProducts();
    fetchTemplateDetails();
    fetchInstructorDetails()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   if (isAuth) {
  //     fetchPending();
  //   }
  // }, [isAuth]);

  const fetchProducts = async () => {
    try {
      setLoader(true);
      const response = await API.get("clients", "/any/list-products",
      );
      setProducts(response);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoader(false);
    }
  };

  // const fetchPending = async () => {
  //   try {
  //     setLoader(true);
  //     const response = await API.get("clients", "/admin/list-pending_clients");
  //     setPending(response);
  //   } catch (error) {
  //     console.error("Error fetching pending clients:", error);
  //   } finally {
  //     setLoader(false);
  //   }
  // };

  const fetchClients = async () => {
    try {
      setLoader(true);
      let response;
      if (userData.role === "sales") {
        // Call the API specific to the sales role
        response = await API.get("clients", "/admin/list-institutionForSales");
      } else {
        // Call the API specific to other roles, e.g., admin
        response = await API.get("clients", "/admin/list-institution");
      }
      setClients(response);
    } catch (error) {
      console.error("Error fetching clients:", error);
    } finally {
      setLoader(false);
    }
  };

  const fetchUserProfile = async () => {
    try {
      setLoader(true);
      const response = await API.get("clients", "/self/read-self/awsaiapp");
      setUserProfile(response);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    } finally {
      setLoader(false);
    }
  };

  const fetchTemplateDetails = async () => {
    try {
      const response = await API.get("clients", `/user/development-form/get-user/${institutionId}`);
      console.log("response", response)
      setTemplateDetails(response)
    } catch (error) {
      console.error("Error fetching template details:", error);
    } finally {
      setLoader(false);
    }
  };

  const fetchProductDetails = async () => {
    try {
      const response = await API.get("clients", `/user/development-form/get-product/${institutionId}`);
      setSubscriptionDetails(response)
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  const fetchInstructorDetails = async () => {
    try {
      const response = await API.get("clients", `/user/development-form/get-instructor/${institutionId}`);
      console.log("zvfwsefwsfwsef", response)
      setInstructordetails(response)
    } catch (error) {
      console.error("Error fetching instructor details:", error);
    }
  };

  const setLoaderFn = (data) => {
    setLoader(data);
  };

  const setIsAuthFn = (data) => {
    setIsAuth(data);
  };

  const setUserDataFn = (data) => {
    setUserData(data);
  };

  const ContextData = {
    isAuth: isAuth,
    setIsAuth: setIsAuthFn,
    userData: userData,
    setUserData: setUserDataFn,
    util: {
      loader: loader,
      setLoader: setLoaderFn,
    },
    clients: {
      data: clients,
      fetchClients: fetchClients,
      onReload: fetchClients,
    },
    products: products,
    fetchProducts: () => { },
    // pending: {
    //   data: pending,
    //   fetchPending: fetchPending,
    //   onReload: fetchPending,
    // },
    user: {
      profile: userProfile,
      fetchUserProfile: fetchUserProfile,
    },
    templateDetails: {
      details: templateDetails,
      fetchTemplateDetails: fetchTemplateDetails,
    },
    subscriptionDetails: subscriptionDetails,
    instructorDetails: instructordetails,
    fetchProductDetails: fetchProductDetails,
    fetchInstructorDetails: fetchInstructorDetails,
  };

  return (
    <Context.Provider value={ContextData}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;