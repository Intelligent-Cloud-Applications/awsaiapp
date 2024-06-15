import React, { useState, useEffect, useCallback } from "react";
import Context from "./Context";
import { API } from "aws-amplify";

const ContextProvider = (props) => {
  // State definitions
  const [loader, setLoader] = useState(false);
  const [clients, setClients] = useState({});
  const [pending, setPending] = useState({});
  const [products, setProducts] = useState([]);
  const [userProfile, setUserProfile] = useState({});
  const [isAuth, setIsAuth] = useState(false);
  const [templateDetails, setTemplateDetails] = useState({});
  const [subscriptionDetails, setSubscriptionDetails] = useState();
  const [instructordetails, setInstructordetails] = useState({});
  const [userData, setUserData] = useState({});
  const [itemCount, setItemCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [cartState, setCartState] = useState({
    subtotal: 0,
    productItems: [],
    quantities: [],
    currencySymbol: '$',
  });
  const institutionId = localStorage.getItem('institution');

  // Fetch functions
  useEffect(() => {
    fetchClients();
    fetchUserProfile();
    fetchProducts();
    fetchTemplateDetails();
    fetchInstructorDetails();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isAuth) {
      fetchPending();
    }
  }, [isAuth]);

  const fetchProducts = async () => {
    try {
      setLoader(true);
      const response = await API.get("clients", "/any/list-products");
      setProducts(response);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoader(false);
    }
  };

  const fetchPending = async () => {
    try {
      setLoader(true);
      const response = await API.get("clients", "/admin/list-pending_clients");
      setPending(response);
    } catch (error) {
      console.error("Error fetching pending clients:", error);
    } finally {
      setLoader(false);
    }
  };

  const fetchClients = async () => {
    try {
      setLoader(true);
      const response = await API.get("clients", "/admin/list-institution");
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
      setTemplateDetails(response);
    } catch (error) {
      console.error("Error fetching template details:", error);
    } finally {
      setLoader(false);
    }
  };

  const fetchProductDetails = async () => {
    try {
      const response = await API.get("clients", `/user/development-form/get-product/${institutionId}`);
      setSubscriptionDetails(response);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  const fetchInstructorDetails = async () => {
    try {
      const response = await API.get("clients", `/user/development-form/get-instructor/${institutionId}`);
      setInstructordetails(response);
    } catch (error) {
      console.error("Error fetching instructor details:", error);
    }
  };

  const getCartItems = async (institution, cognitoId) => {
    try {
      const response = await API.get('clients', `/any/getcartitems/${institution}/${cognitoId}`);
      setCartItems(response);
      setItemCount(response.length);
      if (Array.isArray(response) && response.length > 0) {
        const quantities = response.map(() => 1);
        const subtotal = response.reduce((total, item, index) => total + (item.amount / 100) * quantities[index], 0);
        const currencySymbol = response[0].currency === 'INR' ? '₹' : '$';
        setCartState({ productItems: response, quantities, subtotal, currencySymbol });
      }
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const removeCartItem = async (productId, institution, cognitoId) => {
    try {
      await API.del('clients', `/any/deleteCartItem/${institution}/${cognitoId}`, {
        body: { productId },
      });
      getCartItems(institution, cognitoId);
    } catch (error) {
      console.error('Error removing product:', error);
    }
  };

  const addCartItem = async (item, institution, cognitoId) => {
    try {
      await API.post('clients', '/any/addtocart', {
        body: { institution, cognitoId, cart: [item] },
      });
      getCartItems(institution, cognitoId);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  // New function to check if a product is in the cart
  const isProductInCart = useCallback((productId) => {
    return Array.isArray(cartItems) && cartItems.some(item => item.planId === productId);
  }, [cartItems]);

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
    pending: {
      data: pending,
      fetchPending: fetchPending,
      onReload: fetchPending,
    },
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
    getCartItems: getCartItems,
    cartState: cartState,
    setCartState: setCartState,
    removeCartItem: removeCartItem,
    addCartItem: addCartItem,
    setCartItems:setCartItems,
    cartItems,
    itemCount,
    isProductInCart // Add the new function to context data
  };

  return (
    <Context.Provider value={ContextData}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
