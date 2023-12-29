import { useContext, useState } from "react";
import Navbar from "../components/Home/Navbar";
import { useNavigate } from "react-router-dom";
import Context from "../context/Context";
import PayItem from "../components/Pay/PayItem";
import { API } from "aws-amplify";
const Pay = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const Ctx = useContext(Context);
  const navigate = useNavigate();
  const UtilCtx = useContext(Context).util;
  const UserCtx = useContext(Context).user;
  const Navigate = useNavigate();
  const handleLearnMoreClick = (plan) => {
    setSelectedPlan(plan);
  };
  const navigateToPricing = () => {
    Navigate("/pricing");
  };

  const handleSubscribe = async (productId) => {
    UtilCtx.setLoader(true);
    let response;
    try {
      console.log("before");
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
      console.log(response);
    } catch (e) {
      console.log(e);
      UtilCtx.setLoader(false);
    }
    console.log(response.paymentId);
    console.log("started");
    try {
      const options = {
        key: "rzp_test_1nTmB013tmcWZS",
        subscription_id: response.paymentId,
        name: "AWSAIAPP",
        description: response.subscriptionType,
        handler: function (r) {
          console.log(r);
          const verify = async () => {
            console.log("EARLY");
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
              console.log(res);
              if (res.signatureIsValid) {
                console.log(res.signatureIsValid);
                Navigate("/dashboard", { state: { isReload: true } });
              } else {
                alert(
                  "Transaction Failed If your Amount was Deducted then Contact us"
                );
              }
              // alert(res);
              UtilCtx.setLoader(false);
            } catch (e) {
              console.log(e);
              UtilCtx.setLoader(false);
            }
          };
          verify();
        },
        prefill: {
          name: UserCtx.userName,
          email: UserCtx.emailId,
          contact: UserCtx.phoneNumber,
        },
        theme: {
          color: "#00b4bb",
        },
      };
      console.log("started 2");
      const rzp1 = new window.Razorpay(options);
      console.log("started 3");
      rzp1.on("payment.failed", function (response) {
        // alert(response.error.code);
        // alert(response.error.description);
        // alert(response.error.source);
        // alert(response.error.step);
        // alert(response.error.reason);
        // alert(response.error.metadata.order_id);
        // alert(response.error.metadata.payment_id);
        console.log(response);
        UtilCtx.setLoader(false);
      });
      const fields = rzp1.open();
      console.log(fields);
      UtilCtx.setLoader(false);
    } catch (e) {
      console.log(e.message);
      console.log(e);
      UtilCtx.setLoader(false);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center overflow-hidden">
      <div className="w-full">
        <Navbar />
      </div>
      <div className="flex flex-col lg:w-1/3 xl:w-1/3 mx-8 gap-6 lg:mr-20 mt-[9rem]">
        <div className="flex flex-col gap-6 max1008:w-[32rem] max600:w-[22rem] max406:w-[15rem]">
          {Ctx.products.map((product) => {
            return (
              <PayItem
                product={product}
                setSelectedPlan={setSelectedPlan}
                handleLearnMoreClick={handleLearnMoreClick}
                selectedPlan={selectedPlan}
              />
            );
          })}
        </div>
      </div>
      {selectedPlan && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => handleSubscribe(selectedPlan)}
            className="bg-[#30AFBC] hover:bg-slate-900 text-white py-2 px-6 rounded duration-300 hover:scale-105 shadow-lg"
          >
            Pay
          </button>
        </div>
      )}
    </div>
  );
};

export default Pay;
