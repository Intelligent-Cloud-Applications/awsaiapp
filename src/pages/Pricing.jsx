import Navbar from "../components/Home/Navbar";
import React, { useContext } from "react";
import "./Pricing.css";
import Footer from "../components/Home/Footer";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import Context from "../context/Context";
import { API } from "aws-amplify";
// import { toast, ToastContainer } from 'react-toastify';
const Pricing = () => {
  const Navigate = useNavigate();
  const UserCtx = useContext(Context).userData
  const Ctx = useContext(Context);
  const UtilCtx = useContext(Context).util;

  const handleSubscribe = async (productId) => {
    UtilCtx.setLoader(true);
    let response;
    try {
      // console.log("before");
      response = await API.put("clients", "/user/billing/subscription", {
        body: {
          productId: productId,
        },
      });
      if (response.error) {
        if (response.message === "Subscription already active") {
          UtilCtx.setLoader(false);
          alert("Subscription Already Active. Please Contact Support");
          return;
        }
      }
      UtilCtx.setLoader(false);
      // console.log(response);
    } catch (e) {
      UtilCtx.setLoader(false);
    }
    // console.log(response.paymentId);

    try {
      const options = {
        key: "rzp_live_KBQhEinczOWwzs",
        // amount: response.amount,
        subscription_id: response.paymentId,
        name: "AWSAIAPP",
        description: response.subscriptionType,
        handler: function (r) {
          // console.log(r);
          const verify = async () => {
            // console.log("EARLY");
            UtilCtx.setLoader(true);
            try {
              const res = await API.put(
                "clients",
                "/user/billing/subscription/verify",
                {
                  body: {
                    subscriptionId: response.paymentId,
                  },
                }
              );
              const tempUserdata = await API.get(
                "clients",
                "/self/read-self/awsaiapp"
              );
              Ctx.setUserData(tempUserdata);
              // console.log(res);
              if (res.signatureIsValid) {
                // console.log(res.signatureIsValid);
                Navigate("/dashboard", { state: { isReload: true } });
              } else {
                alert(
                  "Transaction Failed If your Amount was Deducted then Contact us"
                );
              }
              // alert(res);
              UtilCtx.setLoader(false);
            } catch (e) {
              // console.log(e);
              UtilCtx.setLoader(false);
            }
          };
          verify();
        },
        prefill: {
          name: UserCtx.userName,
          email: UserCtx.emailId,
          contact: UserCtx.phoneNumber,
          // contact:"9999999999"
        },
        theme: {
          color: "#00b4bb",
        },modal: {
          ondismiss: async function () {
            try {
              // const subscriptionIds = response.map(subscription => subscription.paymentId);
              // console.log(UserCtx.cognitoId)
              await API.del('clients', `/cancel/payment`, {
                body: {
                  cognitoId:UserCtx.cognitoId,
                  
                  subscriptionIds:[response.paymentId]
                },
              })  
              alert('Payment process was cancelled.');
            } catch (error) {
              console.error('Error during payment cancellation:', error);
           alert('Failed to cancel payment process.');
            }
            // setIsLoading(false);
            // setIsLoading1(false);
          }
        }
      };

      // console.log("started 2");
      const rzp1 = new window.Razorpay(options);
      // console.log("started 3");
      rzp1.on("payment.failed", function (response) {
        // alert(response.error.code);
        // alert(response.error.description);
        // alert(response.error.source);
        // alert(response.error.step);
        // alert(response.error.reason);
        // alert(response.error.metadata.order_id);
        // alert(response.error.metadata.payment_id);
        // console.log(response);
        UtilCtx.setLoader(false);
      });
      const fields = rzp1.open();
      console.log(fields);
      UtilCtx.setLoader(false);
    } catch (e) {
      // console.log(e.message);
      // console.log(e);
      UtilCtx.setLoader(false);
    }
  };

  return (
    <div className="flex flex-col">
      <Navbar />
      <div className=" background flex flex-col items-center w-full pb-[5rem]">
        <div className="gap-6 p-20 pt-40 max-w-5xl mx-auto text-center head max600:pt-20">
          <h1 className="font-bold text-center justify-center text-15xl md:text-10xl lg:text-15xl xl:text-18xl text-black max767:text-white ">
            Find the plan that is right{" "}
            <span className="text-white">for you</span>
          </h1>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-5 pb-10 mx-auto pos xl:gap-10">
          {Ctx.products.map((product) => {
            return (
              <Box
                key={product.productId}
                sx={{
                  height: {
                    sm: "48rem",
                    md: "45rem",
                    lg: "52rem",
                  },
                }}
                className="box flex flex-col bg-white xl:w-[25rem] rounded-lg shadow-lg"
              >
                <h3 className="font-semibold text-2xl xl:text-3xl pb-2">
                  {product.heading}
                </h3>
                <p className="text-2xl xl:text-3xl font-semibold">
                  ₹ {product.amount / 100}
                </p>
                <p className="text-sm xl:text-base pb-4">
                  Per {product.durationText}
                </p>
                <h4 className="text-lg xl:text-xl font-semibold pb-2">
                  Features
                </h4>
                <ul className="text-sm p-2">
                  {product.provides.map((feature) => {
                    return <li>{feature}</li>;
                  })}
                </ul>
                <button
                  onClick={() => {
                    handleSubscribe(product.productId.toString());
                  }}
                  className="text-white text-lg xl:text-xl font-semibold bg-black hover:bg-[#30AFBC] hover:text-black py-2 px-4 rounded-lg"
                >
                  Get Started
                </button>
              </Box>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Pricing;
