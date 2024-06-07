import React from "react";
import ReactDOMClient from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Amplify } from "aws-amplify";
import ContextProvider from "./context/ContextProvider";
import "./index.css";
import App from "./App";

const process = {
  env: {
    STAGE: "PROD",
  },
};

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: "us-east-1",
    userPoolId:
      process.env.STAGE === "PROD"
        ? "us-east-1_a3Fk5S3hh"
        : "us-east-2_L3E5BSjIf",
    identityPoolId:
      process.env.STAGE === "PROD"
        ? "us-east-1:a68cac30-d7f7-4f73-9b1f-ca6a4f86eba6"
        : "us-east-2:9b1fda39-3231-4606-b32f-7ba24edcb53d",
    userPoolWebClientId:
      process.env.STAGE === "PROD"
        ? "jevucp6v2ehehqerq0rlgn4d8"
        : "5pqia04a65b3ef6fbmpoccj4vl",
    oauth: {
      responseType: "token",
    },
  },
  Storage: {
    region: "us-east-1",
    bucket: "institution-utils",
    identityPoolId:
      process.env.STAGE === "PROD"
        ? "us-east-1:a68cac30-d7f7-4f73-9b1f-ca6a4f86eba6"
        : "us-east-2:9b1fda39-3231-4606-b32f-7ba24edcb53d",
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
      {
        name: "user",
        endpoint: process.env.STAGE === "PROD" ? "https://7sh8wrjmm2.execute-api.us-east-1.amazonaws.com/dev" : "https://r5dp21mb28.execute-api.us-east-2.amazonaws.com/dev",
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

const root = ReactDOMClient.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ContextProvider>
      <App />
    </ContextProvider>
  </BrowserRouter>
);
