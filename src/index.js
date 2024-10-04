import React from "react";
import ReactDOMClient from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Amplify } from "aws-amplify";
import ContextProvider from "./context/ContextProvider";
import "./index.css";
import App from "./App";

const process = {
  env: {
    STAGE: "DEV",
  },
};

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: process.env.REACT_APP_STAGE === "PROD" ? "us-east-1": "us-east-2",
    userPoolId:
      process.env.REACT_APP_STAGE === "PROD"
        ? process.env.REACT_APP_PROD_USER_POOL_ID
        : process.env.REACT_APP_DEV_USER_POOL_ID,
    identityPoolId:
      process.env.REACT_APP_STAGE === "PROD"
        ? process.env.REACT_APP_PROD_IDENTITY_POOL_ID
        : process.env.REACT_APP_DEV_IDENTITY_POOL_ID,
    userPoolWebClientId:
      process.env.REACT_APP_STAGE === "PROD"
        ? process.env.REACT_APP_PROD_CLIENT_ID
        : process.env.REACT_APP_DEV_CLIENT_ID,
    oauth: {
      responseType: "token",
    },
  },
  Storage: {
    region: "us-east-1",
    bucket: "institution-utils",
    identityPoolId:
      process.env.STAGE === "PROD"
        ? process.env.REACT_APP_PROD_IDENTITY_POOL_ID
        : process.env.REACT_APP_DEV_IDENTITY_POOL_ID,
    additionalIdentityPoolId: process.env.REACT_APP_DEV_IDENTITY_POOL_ID
  },
  API: {
    endpoints: [
      {
        name: "clients",
        endpoint:
          process.env.STAGE === "PROD"
            ? "https://er9zh7i7md.execute-api.us-east-1.amazonaws.com/dev"
            : "https://gn41h453j1.execute-api.us-east-2.amazonaws.com/dev",
        region: process.env.STAGE === "PROD" ? "us-east-1" : "us-east-2",
      },
      {
        name: 'beta_dance',
        endpoint: ' https://ikticbkaxh.execute-api.us-east-2.amazonaws.com/dev',
        region: 'us-east-2',
    },
    ],
  },  
});

// ReactDOM.render(<App />, document.getElementById('root'));

const root = ReactDOMClient.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ContextProvider>
      <App />
    </ContextProvider>
  </BrowserRouter>
);
