import React, { useState, useEffect } from "react";
import Context from "./Context";
import { API } from "aws-amplify";

const ContextProvider = (props) => {
  const [loader, setLoader] = useState(false);
  const [clients, setClients] = useState({});
  const [member, setmember] = useState([]);

  useEffect(() => {
    fetchClients();
    fetchmember();
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
  
  // Function to fetch the list of member of a given institution
  const fetchmember = async (institution) => {
    try {
      setLoader(true);
      const response = await API.get("member",`/admin/list-member/${institution}`); 
      console.log("Memberlist",response)
      setmember(response);
    } catch (error) {
      console.error("Error fetching member:", error);
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
    member: {
      data: member,
      fetchmember: fetchmember,
    },
  };

  return (
    <Context.Provider value={ContextData}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
