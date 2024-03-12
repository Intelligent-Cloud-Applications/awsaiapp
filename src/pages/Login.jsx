import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Auth, API } from "aws-amplify";
import Context from "../context/Context";
import Swal from "sweetalert2";
import Navbar from "../components/Home/Navbar";
import LockIcon from "../utils/Assets/Dashboard/images/SVG/LockIcon.svg";
// import GoogleIcon from '../utils/png/Google.png';
// import FacebookIcon from '../utils/png/Facebook.png';
import LoginPng from "../utils/Assets/Login.png";
import Country from "../components/Auth/Country";
import "./Login.css";

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("91");
  const [isPhoneNumberLoginValid, setIsPhoneNumberLoginValid] = useState(true);
  const [error, setError] = useState("");
  const UtilCtx = useContext(Context).util;
  const UserCtx = useContext(Context);
  const [otp, setOtp] = useState("");
  const [signinResponse, setSigninResponse] = useState(null);
  const [email, setEmail] = useState("");
  const Navigate = useNavigate();
  const [resendTimeout, setResendTimeout] = useState(null);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);

  useEffect(() => {
    if (resendTimer === 0) {
      clearTimeout(resendTimeout);
      setResendDisabled(false);
      setResendTimer(30);
    }
  }, [resendTimer, resendTimeout]);

  const startResendTimer = () => {
    setResendDisabled(true);
    const intervalId = setInterval(() => {
      setResendTimer((prevTimer) => prevTimer - 1);
    }, 1000);
    setResendTimeout(intervalId);
  };

  const sendOTP = async (event) => {
    event.preventDefault();
    UtilCtx.setLoader(true);
    try {
      const response = await Auth.signIn(`+${countryCode}${phoneNumber}`);
      setSigninResponse(response);
      startResendTimer(); // Start the resend timer
    } catch (e) {
      setError(e.message);
    } finally {
      UtilCtx.setLoader(false);
    }
  };
  const handelSubmit = async (event) => {
    event.preventDefault();
    UtilCtx.setLoader(true);
    try {
      const user = await Auth.sendCustomChallengeAnswer(signinResponse, otp);
      // console.log(await Auth.currentSession());
      if (user) {
        console.log(user)
        const userdata = await API.get("clients", '/self/read-self/awsaiapp');
        console.log("User data:", userdata);
        if (userdata.userType === "admin" && userdata.institution === 'awsaiapp' && userdata.institutionName === "awsaiapp" && userdata.web === true && userdata.isVerified === true && userdata.isDelivered === true) {
          localStorage.setItem('institution', userdata.institutionName);
          UserCtx.setUserData(userdata);
          UserCtx.setIsAuth(true);
          UtilCtx.setLoader(false);
          await UserCtx.clients.onReload();
          Swal.fire({
            icon: "success",
            title: "Welcome Back",
          });
          Navigate("/dashboard");
        } else if (userdata.userType === "admin" && userdata.institution === 'awsaiapp' && userdata.institutionName && userdata.web === true && userdata.isVerified === false && userdata.isDelivered === false) {
          localStorage.setItem('institution', userdata.institutionName);
          UserCtx.setUserData(userdata);
          UserCtx.setIsAuth(true);
          UtilCtx.setLoader(false);
          await UserCtx.clients.onReload();
          Swal.fire({
            icon: "success",
            title: "Welcome Back",
          });
          Navigate(`/pay`);
        }else if (userdata.userType === "admin" && userdata.institution === 'awsaiapp' && userdata.institutionName && userdata.web === true && userdata.isVerified === true && userdata.isDelivered === false) {
          localStorage.setItem('institution', userdata.institutionName);
          UserCtx.setUserData(userdata);
          UserCtx.setIsAuth(true);
          UtilCtx.setLoader(false);
          await UserCtx.clients.onReload();
          Swal.fire({
            icon: "success",
            title: "Welcome Back",
          });
          Navigate(`/complete`);
        }
        else if (userdata.userType === "admin" && userdata.institution === 'awsaiapp' && userdata.institutionName && userdata.web === true && userdata.isVerified === true && userdata.isDelivered === true) {
          localStorage.setItem('institution', userdata.institutionName);
          UserCtx.setUserData(userdata);
          UserCtx.setIsAuth(true);
          UtilCtx.setLoader(false);
          await UserCtx.clients.onReload();
          Swal.fire({
            icon: "success",
            title: "Welcome Back",
          });
          Navigate(`/Dashboard`);
        }
        else if (userdata.userType === "admin" && userdata.institution === 'awsaiapp' && userdata.institutionName && userdata.web === false) {
          const continueResult = await Swal.fire({
            title: 'Continue?',
            text: 'Do you want to continue where you left off?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Continue',
            cancelButtonText: 'Not Now'
          });
          if (continueResult.isConfirmed) {
            localStorage.setItem('institution', userdata.institutionName);
            UserCtx.setUserData(userdata);
            UserCtx.setIsAuth(true);
            UtilCtx.setLoader(false);
            Navigate("/template");
          } else if (!continueResult.isConfirmed) {
            localStorage.setItem('institution', userdata.institutionName);
            UserCtx.setUserData(userdata);
            UserCtx.setIsAuth(true);
            UtilCtx.setLoader(false);
            Navigate("/");
          }
        } else {
          console.log("Invalid user:", userdata);
          Navigate("/");
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Please enter a valid Id",
          });
          UtilCtx.setLoader(false);
        }
      } else {
        setError(`Incorrect`);
        UtilCtx.setLoader(false);
      }
    } catch (e) {
      console.error("Error during login:", e);
      console.log("Error code:", e.code); // Log the error code
      if (e.toString().split(" code ")[1]?.trim() === "404") {
        console.log("User Not Found");
        alert("Contact us for login");
        Navigate("/Query?newuser=false");
        setError("");
      } else {
        setError(e.message);
      }
      UtilCtx.setLoader(false);
    }
  };



  return (
    <>
      <Navbar />
      <div className=" bg-[#f7f7f7] flex justify-center items-center h-[100vh] pt-[2rem]">
        <div className="flex max767:flex-col h-[35rem]">
          <div
            className=" mobile1 flex flex-col justify-evenly items-center Inter bg-[#30AFBC] p-8 rounded-tl-[2rem] rounded-bl-[2rem] shadow-md w-[30rem] max767:bg-transparent max1050:w-[48vw]"
            style={{ boxShadow: "0 9px 14px rgba(48, 175, 188, 0.5)" }}
          >
            <img src={LoginPng} alt="" />
            <h1 className="font-[900] text-[2rem] max767:text-[5vw] text-white Laila max767:text-black">
              Let’s Get Started
            </h1>
          </div>
          <div
            className=" mobile2 Inter flex flex-col justify-evenly bg-white p-8 rounded-tr-[2rem] rounded-br-[2rem] shadow-md w-[30rem] max1050:w-[48vw]"
            style={{ boxShadow: "12px 9px 14px rgba(48, 175, 188, 0.5)" }}
          >
            <h2 className="Inter text-center text-2xl font-semibold mb-4">
              Login
            </h2>
            <form className="flex flex-col items-center">
              {/* <select
                className="Inter text-[#a0a0a0] pl-2 w-[20rem] p-2 border rounded-[0.5rem] mb-6"
                value={institution}
                onChange={(e) => handleInstitutionChange(e.target.value)}

              >
                <option value="">Select your Institution</option>
                {institutionName.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select> */}
              {isPhoneNumberLoginValid && (
                <select
                  name="countryCode"
                  id=""
                  value={countryCode}
                  className="Inter text-[#a0a0a0] pl-2 w-[20rem] p-2 border rounded-[0.5rem] mb-6"
                  onChange={(e) => {
                    setCountryCode(e.target.value.toString());
                  }}
                >
                  {<Country />}
                </select>
              )}
              <div className="mb-4 relative flex flex-col items-end">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="absolute left-3 top-3 h-[1rem] w-[1rem] pointer-events-none opacity-70"
                >
                  <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
                </svg>
                {/* <input
                  type="text"
                  name="email"
                  value={phoneNumber}
                  onChange={handleInputChange}
                  className="Inter pl-10 w-[20rem] p-2 border rounded-[0.5rem] mb-2"
                  placeholder="phone number"
                /> */}
                <input
                  className="Inter pl-10 w-[20rem] p-2 border rounded-[0.5rem] mb-2"
                  type="text"
                  placeholder="Enter Phone"
                  value={isPhoneNumberLoginValid ? phoneNumber : email}
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    if (/^\d+$/.test(inputValue)) {
                      if (inputValue.length >= 0 && inputValue.length <= 10) {
                        setIsPhoneNumberLoginValid(true);
                        setPhoneNumber(inputValue);
                      }
                    } else {
                      setIsPhoneNumberLoginValid(false);
                      setEmail(inputValue);
                    }
                  }}
                />
              </div>
              <div className="mb-2 relative flex items-center">
                <img
                  src={LockIcon}
                  alt="Lock Icon"
                  className="absolute left-3 top-3 h-[1rem] w-[1rem] pointer-events-none"
                />
                <input
                  // type={passwordVisible ? "password" : "text"}
                  name="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="Inter pl-10 w-[20rem] p-2 border rounded-[0.5rem]"
                  placeholder="otp"
                />
                {/* <button
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-3"
                >
                  {passwordVisible ? <AiFillEyeInvisible /> : <AiFillEye />}
                </button> */}
              </div>
              <div className="w-[20rem] mb-6">
                {/* <a
                  href="/forgot-password"
                  className="text-[#017E2B] text-[0.8rem] font-[600] hover:underline"
                >
                  Forgot Password?
                </a> */}
              </div>
              <div className="flex flex-col gap-4">
                <button
                  className="w-[20rem] bg-[#3ec084] text-[1.1rem] text-white p-2 rounded-[0.5rem] max767:bg-white max767:text-[#30AFBC] max767:text-[1.2rem] max767:font-bold"
                  onClick={sendOTP}
                  disabled={resendDisabled}
                >
                  {resendDisabled ? `Resend OTP in ${resendTimer} seconds` : "Send OTP"}
                </button>
                <button
                  className="w-[20rem] bg-[#30AFBC] text-[1.1rem] text-white p-2 rounded-[0.5rem] max767:bg-white max767:text-[#30AFBC] max767:text-[1.2rem] max767:font-bold"
                  // style={{
                  //   backgroundColor: InstitutionData.LightPrimaryColor,
                  //   opacity:otp ? 1 : 0.5,
                  // }}
                  onClick={handelSubmit}
                // disabled={!otp}
                >
                  Submit
                </button>
              </div>
              {/* <button
                type="submit"
                onClick={handelSubmit}
                className="w-[20rem] bg-[#30AFBC] text-[1.1rem] text-white p-2 rounded-[0.5rem] max767:bg-white max767:text-[#30AFBC] max767:text-[1.2rem] max767:font-bold"
              >
                Login
              </button> */}
              <p
                className="text-green cursor-pointer pt-2"
                onClick={() => {
                  Navigate("/signup");
                }}
              >
                Create a New Account {" "}
              </p>
              {error && (
                <div className=" mt-[1rem] font-bold text-[#db3d3d] text-center K2D">
                  {error}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
