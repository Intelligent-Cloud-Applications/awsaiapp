import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Context from "./Context";
import { API } from "aws-amplify";

const ContextProvider = (props) => {
  const [loader, setLoader] = useState(false);
  const [clients, setClients] = useState({});
  // const [member, setMember] = useState([]);
  const [userProfile, setUserProfile] = useState({});
  const [isAuth, setIsAuth] = useState(false);
  const [userData, setUserData] = useState({});
  const location = useLocation();
  const institution = new URLSearchParams(location.search).get("institution");

  useEffect(() => {
    fetchClients();
    fetchUserProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchClients = async (institution) => {
    try {
      setLoader(true);
      const response = await API.get("clients", "/admin/list-institution");
      console.log(response)
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
      const response = await API.get(`clients', '/self/read-self/${institution}`);
      setUserProfile(response);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    } finally {
      setLoader(false);
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
    // member: {
    //   data: member,
    //   fetchMember: fetchMember,
    // },
    user: {
      profile: userProfile,
      fetchUserProfile: fetchUserProfile,
    },
  };

  return (
    <Context.Provider value={ContextData}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;