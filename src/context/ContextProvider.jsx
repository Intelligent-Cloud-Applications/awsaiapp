import React, { useState, useEffect, useCallback } from "react";
import Context from "./Context";
import { API } from "aws-amplify";

const ContextProvider = (props) => {
  const [loader, setLoader] = useState(false);
  const [clients, setClients] = useState({});
  const [products, setProducts] = useState([]);
  const [userProfile, setUserProfile] = useState({});
  const [isAuth, setIsAuth] = useState(false);
  const [templateDetails, setTemplateDetails] = useState({});
  const [subscriptionDetails, setSubscriptionDetails] = useState();
  const [instructordetails, setInstructordetails] = useState({});
  const [userData, setUserData] = useState({});
  const [saleData, setSaleData] = useState([]);
  const institutionId = localStorage.getItem("institution");

  // Memoize the fetch functions to prevent re-creation on every render
  const fetchProducts = useCallback(async () => {
    try {
      setLoader(true);
      const response = await API.get("clients", "/any/list-products");
      setProducts(response);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoader(false);
    }
  }, []);

  const fetchUserProfile = useCallback(async () => {
    try {
      setLoader(true);
      const response = await API.get("clients", "/self/read-self/awsaiapp");
      setUserProfile(response);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    } finally {
      setLoader(false);
    }
  }, []);

  const fetchClients = useCallback(async () => {
    try {
      setLoader(true);
      let response;

      if (userProfile.role === "owner" || userProfile.role === "operation") {
        try {
          response = await API.get("clients", "/admin/list-institution");
        } catch (error) {
          // Log the error if there is an issue with the API calls
          console.error("Error fetching data:", error);
        }
      } else {
        try {
          // Fetch data from both APIs
          response = await API.get("clients", "/admin/list-institutionForSales");
        } catch (error) {
          // Log the error if there is an issue with the API calls
          console.error("Error fetching data:", error);
        }
      }
      console.log("Fetched clients data:", response); // Log the response for debugging
      setClients(response);

    } catch (error) {
      console.error("Error fetching clients:", error);
    } finally {
      setLoader(false);
    }
  }, [userProfile.role]);

  const fetchUserData = useCallback(async () => {
    try {
      setLoader(true);
      const response = await API.get("clients", "/admin/list-clients");
      setSaleData(response);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoader(false);
    }
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const fetchTemplateDetails = useCallback(async () => {
    try {
      const response = await API.get(
        "clients",
        `/user/development-form/get-user/${institutionId}`
      );
      setTemplateDetails(response);
    } catch (error) {
      console.error("Error fetching template details:", error);
    } finally {
      setLoader(false);
    }
  }, [institutionId]);

  const fetchProductDetails = async () => {
    try {
      const response = await API.get("clients", `/user/development-form/get-product/${institutionId}`);
      setSubscriptionDetails(response)
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };
  const fetchInstructorDetails = useCallback(async () => {
    try {
      const response = await API.get(
        "clients",
        `/user/development-form/get-instructor/${institutionId}`
      );
      setInstructordetails(response);
    } catch (error) {
      console.error("Error fetching instructor details:", error);
    }
  }, [institutionId]);

  const [payments, setPayments] = useState([]);

  const fetchPaymentHistory = async () => {
    try {
      const response = await API.get('beta_dance', `/payment-history/awsaiapp`);
      const payments = response?.payments || [];
      setPayments(payments);
    } catch (error) {
      console.error('Error fetching payment history:', error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
    fetchProducts();
    fetchTemplateDetails();
    fetchInstructorDetails();
    fetchUserData();
    fetchPaymentHistory();
  }, [
    fetchUserProfile,
    fetchProducts,
    fetchTemplateDetails,
    fetchInstructorDetails,
    fetchUserData,
  ]);

  useEffect(() => {
    if (userProfile && userProfile.role) {
      fetchClients();
    }
  }, [userProfile, fetchClients]);

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
      setClients: setClients,
    },
    products: products,
    fetchProducts: () => { },
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
    saleData: saleData,
    setSaleData: setSaleData,
    payments: payments,
  };

  return (
    <Context.Provider value={ContextData}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
