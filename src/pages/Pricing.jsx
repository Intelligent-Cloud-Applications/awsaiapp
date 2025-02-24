import Navbar from "../components/Home/Navbar";
import React, { useContext } from "react";
import "./Pricing.css";
import Footer from "../components/Home/Footer";
import { Box } from "@mui/system";
import Context from "../context/Context";
// import { useNavigate } from "react-router-dom";
// import { API } from "aws-amplify";

const Pricing = () => {
  const Ctx = useContext(Context);
  const SecondaryColor = "0000";
  const PrimaryColor = "30afbc";
  // const Navigate = useNavigate();
  // const Ctx = useContext(Context);
  // const Ctx = useContext(Context);

  // const UtilCtx = useContext(Context).util;

  // const handleSubscribe = async (productId) => {
  //   UtilCtx.setLoader(true);
  //   let response;
  //   try {
  //     console.log("before");
  //     response = await API.put("clients", "/user/billing/subscription", {
  //       body: {
  //         productId: productId,
  //       },
  //     });
  //     if (response.error) {
  //       if (response.message === "Subscription already active") {
  //         UtilCtx.setLoader(false);
  //         alert("Subscription Already Active. Please Contact Support");
  //         return;
  //       }
  //     }
  //     console.log(response);
  //   } catch (e) {
  //     UtilCtx.setLoader(false);
  //   }
  //   console.log(response.paymentId);
  //   console.log("started");
  //   try {
  //     const options = {
  //       key: "rzp_test_1nTmB013tmcWZS",
  //       subscription_id: response.paymentId,
  //       name: "AWSAIAPP",
  //       description: response.subscriptionType,
  //       handler: function (r) {
  //         console.log(r);
  //         const verify = async () => {
  //           console.log("EARLY");
  //           UtilCtx.setLoader(true);
  //           try {
  //             const res = await API.put(
  //               "clients",
  //               "/user/billing/subscription/verify",
  //               {
  //                 body: {
  //                   subscriptionId: response.paymentId,
  //                 },
  //               }
  //             );
  //             const tempUserdata = await API.get(
  //               "clients",
  //               "/self/read-self/awsaiapp"
  //             );
  //             Ctx.setUserData(tempUserdata);
  //             console.log(res);
  //             if (res.signatureIsValid) {
  //               console.log(res.signatureIsValid);
  //               Navigate("/dashboard", { state: { isReload: true } });
  //             } else {
  //               alert(
  //                 "Transaction Failed If your Amount was Deducted then Contact us"
  //               );
  //             }
  //             // alert(res);
  //             UtilCtx.setLoader(false);
  //           } catch (e) {
  //             console.log(e);
  //             UtilCtx.setLoader(false);
  //           }
  //         };
  //         verify();
  //       },
  //       prefill: {
  //         name: Ctx.userName,
  //         email: Ctx.emailId,
  //         contact: Ctx.phoneNumber,
  //       },
  //       theme: {
  //         color: "#00b4bb",
  //       },
  //     };
  //     console.log("started 2");
  //     const rzp1 = new window.Razorpay(options);
  //     console.log("started 3");
  //     rzp1.on("payment.failed", function (response) {
  //       // alert(response.error.code);
  //       // alert(response.error.description);
  //       // alert(response.error.source);
  //       // alert(response.error.step);
  //       // alert(response.error.reason);
  //       // alert(response.error.metadata.order_id);
  //       // alert(response.error.metadata.payment_id);
  //       console.log(response);
  //       UtilCtx.setLoader(false);
  //     });
  //     const fields = rzp1.open();
  //     console.log(fields);
  //     UtilCtx.setLoader(false);
  //   } catch (e) {
  //     console.log(e.message);
  //     console.log(e);
  //     UtilCtx.setLoader(false);
  //   }
  // };

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
              <h4 className="text-xl xl:text-2xl font-semibold pb-2">Features</h4>
              <ul className="text-sm p-2 flex-grow">
                {product.provides.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              <button
                onClick={() => {
                  window.open(
                    `https://happyprancer.com/allpayment/awsaiapp/${Ctx.userData.cognitoId}/${Ctx.userData.emailId}?primary=${encodeURIComponent(PrimaryColor)}&secondary=${encodeURIComponent(SecondaryColor)}`,
                    "_blank",
                    "noopener,noreferrer"
                  );
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
