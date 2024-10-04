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

REACT_APP_PROD_USER_POOL_ID = us-east-1_a3Fk5S3hh
REACT_APP_DEV_USER_POOL_ID = us-east-2_L3E5BSjIf
REACT_APP_PROD_IDENTITY_POOL_ID = us-east-1:a68cac30-d7f7-4f73-9b1f-ca6a4f86eba6
REACT_APP_DEV_IDENTITY_POOL_ID = us-east-2:9b1fda39-3231-4606-b32f-7ba24edcb53d
REACT_APP_PROD_CLIENT_ID = jevucp6v2ehehqerq0rlgn4d8
REACT_APP_DEV_CLIENT_ID = 5pqia04a65b3ef6fbmpoccj4vl

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
