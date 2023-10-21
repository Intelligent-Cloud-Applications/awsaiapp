import React, { useState, useEffect } from "react";
import Context from "./Context";
import { API } from "aws-amplify";

const ContextProvider = (props) => {
  const [loader, setLoader] = useState(false);
  const [clients, setClients] = useState({});
  const [member, setMember] = useState([]);
  const [userProfile, setUserProfile] = useState({});
  const [isAuth, setIsAuth] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    fetchClients();
    fetchMember({ institution: "happyprancer" });
    fetchUserProfile(); // Fetch user profile when the component mounts
  }, []);

  // Function to fetch the list of clients
  const fetchClients = async () => {
    try {
      setLoader(true);
      const response = await API.get("clients", "/admin/list-clients");
      setClients(response);
    } catch (error) {
      console.error("Error fetching clients:", error);
    } finally {
      setLoader(false);
    }
  };

  const fetchMember = async ({ institution = "happyprancer" }) => {
    try {
      setLoader(true);
      const response = await API.get(
        "clients",
        `/user/list-member/${institution}`
      );
      console.log("members", response);
      setMember(response);
    } catch (error) {
      console.error("Error fetching member:", error);
      console.error("Error details:", error.response);
    } finally {
      setLoader(false);
    }
  };

  // Function to fetch the user profile
  const fetchUserProfile = async () => {
    try {
      setLoader(true);
      const response = await API.get('clients', '/self/read-self/awsaiapp');
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
    },
    member: {
      data: member,
      fetchMember: fetchMember,
    },
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
