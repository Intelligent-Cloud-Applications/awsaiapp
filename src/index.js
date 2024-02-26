import React from "react";
import ReactDOMClient from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { Amplify } from "aws-amplify";
import ContextProvider from "./context/ContextProvider";
import "./index.css";
import App from "./App";

const process = {
  env: {
    STAGE: "DEV",
  },
}

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: "us-east-1",
    userPoolId:
      process.env.STAGE === "PROD"
        ? "us-east-2_9joxeJ5EP"
        : "us-east-1_a3Fk5S3hh",
    identityPoolId:
      process.env.STAGE === "PROD"
        ? "us-east-2:fcc57a23-9e12-4bd0-9266-3fa44581bebe"
        : "us-east-1:a68cac30-d7f7-4f73-9b1f-ca6a4f86eba6",
    userPoolWebClientId:
      process.env.STAGE === "PROD"
        ? "5ej5844tf42rf77slua0a8q9o3"
        :"jevucp6v2ehehqerq0rlgn4d8",
    oauth: {
      responseType: "token",
    },
  },
  Storage: {
    region: "us-east-1",
    bucket: "institution-utils",
    identityPoolId:
      process.env.STAGE === "PROD"
        ? "us-east-2:fcc57a23-9e12-4bd0-9266-3fa44581bebe"
        : "us-east-2:6a989bd3-6905-4c5d-b2ea-6101ccfbedd3",
  },
  API: {
    endpoints: [
      {
        name: "clients",
        endpoint:
          process.env.STAGE === "PROD"
            ? "https://er9zh7i7md.execute-api.us-east-1.amazonaws.com/dev"
            : "https://lr9z4z29lk.execute-api.us-east-2.amazonaws.com/dev",
            region: process.env.STAGE === "PROD" ? "us-east-1" : "us-east-2",
          },
      // {
      //   name: "clients",
      //   endpoint: "https://lr9z4z29lk.execute-api.us-east-2.amazonaws.com/dev",
      //   region: "us-east-2",
      // },
    ],
  },
});

// ReactDOM.render(<App />, document.getElementById('root'));

const root = ReactDOMClient.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <ContextProvider>
      <App />
    </ContextProvider>
  </BrowserRouter>,
);