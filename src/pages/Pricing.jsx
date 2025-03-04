import Navbar from "../components/Home/Navbar";
import React, { useContext } from "react";
import "./Pricing.css";
import Footer from "../components/Home/Footer";
import { Box } from "@mui/system";
import Context from "../context/Context";
import { useLocation } from "react-router-dom";

const Pricing = () => {
  const Ctx = useContext(Context);
  const location = useLocation();

  // Get institutionId and cognitoId from navigation state or URL params
  const { search } = location;
  const params = new URLSearchParams(search);
  const institutionIdFromUrl = params.get("institutionId");
  const { institutionId: institutionIdFromState, cognitoId } =
    location.state || {};
  const institutionId = institutionIdFromUrl || institutionIdFromState;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="background flex flex-col items-center w-full pb-20 px-4 lg:px-20 md:mt-[5rem]">
        <div className="text-center max-w-5xl mx-auto py-20">
          <h1 className="font-bold text-center text-5xl md:text-6xl lg:text-7xl text-black md:text-black">
            Find the plan that is right for you
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-7xl">
          {Ctx.products.map((product) => (
            <Box
              key={product.productId}
              sx={{ height: "100%" }}
              className="box flex flex-col bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105"
            >
              <h3 className="font-bold text-3xl xl:text-4xl pb-2 text-center">
                {product.heading}
              </h3>
              <p className="text-2xl xl:text-3xl font-bold text-center">
                ₹ {product.amount / 100}
              </p>
              <p className="text-xl xl:text-2xl pb-4 text-center">
                Per {product.durationText}
              </p>
              <h4 className="text-xl xl:text-2xl font-semibold pb-2">
                Features
              </h4>
              <ul className="text-sm p-2 flex-grow">
                {product.provides.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              <button
                onClick={() => {
                  const userCognitoId = cognitoId || Ctx.userData.cognitoId;

                  const url =
                    process.env.REACT_APP_STAGE === "PROD"
                      ? `https://payment.happyprancer.com/awsaiapp/${
                          product.productId
                        }/${encodeURIComponent(
                          userCognitoId
                        )}?childInstitution=${institutionId || ""}`
                      : `https://betapayment.happyprancer.com/awsaiapp/${
                          product.productId
                        }/${encodeURIComponent(
                          userCognitoId
                        )}?childInstitution=${institutionId || ""}`;

                  window.location.href = url;
                }}
                className="mt-auto text-white text-lg font-semibold bg-black hover:bg-[#30AFBC] hover:text-black py-2 px-4 rounded-lg w-full"
              >
                Get Started
              </button>
            </Box>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Pricing;
