import React, { useState, useEffect } from "react";
import Context from "./Context";
import { API } from "aws-amplify";

const ContextProvider = (props) => {
  const [loader, setLoader] = useState(false);
  const [clients, setClients] = useState({});
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetchClients();
  }, []);

  // Function to fetch the list of clients
  const fetchClients = async () => {
    try {
      setLoader(true);
      const response = await API.get("clients", "/admin/list-clients");
      console.log("API Response:", response); 
      setClients(response);
    } catch (error) {
      console.error("Error fetching clients:", error);
    } finally {
      setLoader(false);
    }
  };
  
  // Function to fetch the list of members of a given institution
  const fetchMembers = async (institution) => {
    try {
      setLoader(true);
      const response = await API.get("members",`/admin/list-member/${institution}`); // Replace with your API URL
      console.log("Memberlist ",response)
      setMembers(response);
    } catch (error) {
      console.error("Error fetching members:", error);
    } finally {
      setLoader(false);
    }
  };

  const setLoaderFn = (data) => {
    setLoader(data);
  };

  const ContextData = {
    util: {
      loader: loader,
      setLoader: setLoaderFn,
    },
    clients: {
      data: clients,
      fetchClients: fetchClients,
    },
    members: {
      data: members,
      fetchMembers: fetchMembers,
    },
  };

  return (
    <Context.Provider value={ContextData}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
