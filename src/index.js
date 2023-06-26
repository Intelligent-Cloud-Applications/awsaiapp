import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Amplify } from "aws-amplify";
import ContextProvider from "./Context/ContextProvider";
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
    region: "us-east-2",
    userPoolId:
      process.env.STAGE === "PROD"
        ? "us-east-2_9joxeJ5EP"
        : "us-east-2_uwdNo4K2o",
    identityPoolId:
      process.env.STAGE === "PROD"
        ? "us-east-2:fcc57a23-9e12-4bd0-9266-3fa44581bebe"
        : "us-east-2:6a989bd3-6905-4c5d-b2ea-6101ccfbedd3",
    userPoolWebClientId:
      process.env.STAGE === "PROD"
        ? "5ej5844tf42rf77slua0a8q9o3"
        : "21hf8if0vuceksuds2o42ahsa3",
    oauth: {
      responseType: "token",
    },
  },
  API: {
    endpoints: [
      {
        name: "user",
        endpoint:
          process.env.STAGE === "PROD"
            ? "https://7sh8wrjmm2.execute-api.us-east-1.amazonaws.com/dev"
            : "https://r5dp21mb28.execute-api.us-east-2.amazonaws.com/dev",
        region: process.env.STAGE === "PROD" ? "us-east-1" : "us-east-2",
      },
    ],
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ContextProvider>
      <App />
    </ContextProvider>
  </BrowserRouter>
);
