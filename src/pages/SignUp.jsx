import React, { useContext, useState, useEffect } from "react";
import { Auth, API } from "aws-amplify";
import NavBar from "../components/Home/Navbar";
// import DanceAuth from "../Utils/Png/danceAuth.png";
import Context from "../context/Context";
import { useNavigate } from "react-router-dom";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Country from "../components/Auth/Country";
import signUpPng from "../utils/Signup.png";
import Swal from "sweetalert2";

import "./Login.css";

const SignUp = () => {
  const [firstName, setFirstName] = useState(""); // Added for first name
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("91");
  const [country, setCountry] = useState("India");
  const [institutionName, setInstitutionName] = useState("");
  // const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  const [newUser, setNewUser] = useState(null);
  const [signinResponse, setSigninResponse] = useState(null);
  const [confirmationCode, setConfirmationCode] = useState(0);
  const [err, setErr] = useState("");
  // const [passwordVisible, setPasswordVisible] = useState(false);
  // eslint-disable-next-line
  const [isNewUser, setIsNewUser] = useState(true);
  const data = {
    Otp_Msg: `An OTP has been sent to ${email}. Please check your inbox, and in case you don’t find it there, kindly review the spam folder.`,
  };
  // const data = {
  //   Otp_Msg: `An OTP has been sent to +${countryCode}${phoneNumber}. Please check your inbox, and in case you don’t find it there, kindly review the spam folder.`,
  // };
  const UtilCtx = useContext(Context).util;
  const UserCtx = useContext(Context);
  const Navigate = useNavigate();

  const [counter, setCounter] = useState(60); // Timer counter
  const [resendVisible, setResendVisible] = useState(false); // Resend OTP visibility

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);

    if (query.get("newuser") === "false") {
      setIsNewUser(false);
    }
  }, []);

  if(isNewUser){}
  // Function to handle resend OTP
  const resendOTP = async (event) => {
    event.preventDefault();
    try {
      if (phoneNumber) {
        await Auth.resendSignUp(`+${countryCode}${phoneNumber}`);
        setCounter(60); // Reset the timer
        setResendVisible(false); // Hide the resend button
        setErr("OTP resent successfully."); // Provide appropriate feedback to the user
      } else {
        // setErr("Please enter your Phone Number."); // Provide appropriate feedback to the user
        setErr("Please enter your Email Id."); // Provide appropriate feedback to the user
      }
    } catch (error) {
      setErr(error.message);
    }
  };

  useEffect(() => {
    let timer = null;
    if (counter > 0) {
      timer = setInterval(
        () => setCounter((prevCounter) => prevCounter - 1),
        1000
      );
    } else {
      setResendVisible(true);
    }

    return () => {
      clearInterval(timer);
    };
  }, [counter]);

  // const passwordVisibilityChange = () => {
  //   setPasswordVisible((prevState) => !prevState);
  // };

  const checkInstitutionName = async (institutionName) => {
    const instituteArray = (UserCtx?.clients?.data).map((e)=> e.institution)
    if(instituteArray.includes(institutionName)){
      setErr("Institution Name already exists")
    }else{
      setErr("")
    }
  }

  const form1Validator = () => {
    console.log(phoneNumber.length);

    if (firstName.length === 0) {
      setErr("Enter the Name");
      return false;
    } else if (phoneNumber.length < 10) {
      setErr("Enter a Valid Phone Number");
      return false;
    } else if (countryCode.length === 0) {
      setErr("Choose Country");
      return false;
    } else if (!(email.includes("@") && email.includes("."))) {
      setErr("Enter a Valid Email");
      return false;
    } else if (country.length === 0) {
      setErr("Enter a Country Name");
      return false;
    } else if (institutionName.length === 0) { // Added validation for institutionName
      setErr("Enter the Institution Name");
      return false;
    } else {
      setErr("");
      return true;
    }
  };

  const form2Validator = () => {
    if (confirmationCode.length === 0) {
      setErr("Enter a Valid Code");
      return false;
    } else {
      setErr("");
      return true;
    }
  };

  const userExistPhoneNumberSignUp = async () => {
    try {
      console.log("Sign in");
      await Auth.signIn(`+${countryCode}${phoneNumber}`);
      console.log("post");
      const userdata = await API.post("clients", "/user/signup-members/awsaiapp", {
        body: {
          emailId: email,
          userName: `${firstName} ${lastName}`,
          phoneNumber: `${countryCode}${phoneNumber}`,
          country: country,
          institutionName: institutionName
        },
      });
      //Temporary
      // userdata.Status = true;
      UserCtx.setUserData(userdata);
      UserCtx.setIsAuth(true);
      UtilCtx.setLoader(false);
      alert("Signed Up");
      // client dashboard
      if (userdata.status === "Active") {
        UtilCtx.setLoader(false);
        Navigate("/dashboard");
      }
      UtilCtx.setLoader(false);
      Navigate("/Pricing");
    } catch (error) {
      UtilCtx.setLoader(false);
      if (error.message === "Incorrect username or password.") {
        console.log("Phone Number User Doesn't Exist");
        await userExistEmailIdSignUp();
      }
      throw error;
    } finally {
      UtilCtx.setLoader(false);
    }
  };
  if(1<0){userExistPhoneNumberSignUp()}
  
  const userExistEmailIdSignUp = async () => {
    try {
      console.log("Sign in");
      await Auth.signIn(`+${countryCode}${phoneNumber}`);
      console.log("post");
      const userdata = await API.post("clients", "/user/signup-members/awsaiapp", {
        body: {
          emailId: email,
          userName: `${firstName} ${lastName}`,
          phoneNumber: `${countryCode}${phoneNumber}`,
          country: country,
          institutionName: institutionName
        },
      });
      //Temporary
      // userdata.Status = true;
      UserCtx.setUserData(userdata);
      UserCtx.setIsAuth(true);
      UtilCtx.setLoader(false);
      alert("Signed Up");
      if (userdata.status === "Active") {
        UtilCtx.setLoader(false);
        Navigate("/dashboard");
      }
      UtilCtx.setLoader(false);
      Navigate("/Pricing");
    } catch (error) {
      UtilCtx.setLoader(false);
      console.log("Error:", error.message);
      throw error;
    } finally {
      UtilCtx.setLoader(false);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    UtilCtx.setLoader(true);

    try {
        // Check if phone number exists
        const checkResponse = await API.get("clients", `/user/check-phone?phoneNumber=${institutionName}`);
        console.log("Check response:", checkResponse);

        if (checkResponse.exists) {
            Swal.fire({
                icon: "error",
                title: "This Company is Already Registered,Please use another Company Name",
            });
            UtilCtx.setLoader(false);
            return;
        }

        // Validate form
        if (form1Validator()) {
            try {
                // Sign up with Auth
                await Auth.signUp({
                    username: `+${countryCode}${phoneNumber}`,
                    password: "Avishek@123",
                    institutionName: institutionName,
                    attributes: {
                        phone_number: `+${countryCode}${phoneNumber}`,
                        name: `${firstName} ${lastName}`,
                        email: email,
                    },
                });

                // Check if phone number already exists
                const phoneResponse = await API.post(
                    'clients',
                    '/any/phone-exists',
                    {
                        body: {
                            phoneNumber: `+${countryCode}${phoneNumber}`,
                        },
                    }
                );

                if (phoneResponse.exists) {
                  Swal.fire({
                    icon: "error",
                    title: "An account with this phone number already exists. Please login or sign up with a different number.",
                });  
                } else {
                    const response = await Auth.signIn(`+${countryCode}${phoneNumber}`);
                    setSigninResponse(response);
                    setNewUser(true);
                }
            } catch (signUpError) {
                Swal.fire({
                  icon: "error",
                  title: "An account with this phone number already exists. Please login or sign up with a different number.",
              });  
            
                console.error("Sign up error:", signUpError);
                // Handle specific sign up errors here
            }
        }

    } catch (e) {
        setErr(e.message);
    } finally {
        UtilCtx.setLoader(false);
    }
};


  const onConfirmationSubmit = async (event) => {
    event.preventDefault();

    UtilCtx.setLoader(true);

    try {
      if (form2Validator()) {
        // await Auth.confirmSignUp(
        //   `+${countryCode}${phoneNumber}`,
        //   confirmationCode
        // );
        // // await Auth.signIn(`+${countryCode}${phoneNumber}`, password);
        // const uses = await Auth.signIn(`+${countryCode}${phoneNumber}`);
        // console.log(uses)
        await Auth.sendCustomChallengeAnswer(signinResponse, `${confirmationCode}`);
        await Auth.currentSession();
        const userdata = await API.post("clients", "/user/signup-members/awsaiapp", {
          body: {
            emailId: email,
            userName: `${firstName} ${lastName}`,
            phoneNumber: `${countryCode}${phoneNumber}`,
            country: country,
            institutionName: institutionName,
          },
        });
        //Temporary
        // userdata.Status = true;
        UserCtx.setUserData(userdata);
        UserCtx.setIsAuth(true);
        UtilCtx.setLoader(false);
        alert("Signed Up");
        if (userdata.status === "Active") {
          Navigate("/dashboard");
        }
        Navigate("/template");
      } else {
        UtilCtx.setLoader(false);
      }
      UtilCtx.setLoader(false);
    } catch (e) {
      setErr(e.message);
      UtilCtx.setLoader(false);
    }
  };

  const form1 = () => {
    return (
      <form >
        <div className="flex max767:flex-col">
          <div
            className=" mobile1 flex flex-col justify-evenly items-center Inter bg-[#30AFBC] p-8 rounded-tl-[2rem] rounded-bl-[2rem] shadow-md w-[30rem] max767:bg-transparent max1050:w-[48vw]"
            style={{ boxShadow: "0 9px 14px rgba(48, 175, 188, 0.5)" }}
          >
            <img src={signUpPng} alt="" />
            <div className="text-center">
              <p className="Inter font-[500] my-1 text-[1rem] text-white">
                Unlock Success Online! Sign Up for Your Professional Website Today.
              </p>
            </div>
          </div>
          <div className=" mobile2 Inter flex flex-col justify-evenly bg-white p-8 rounded-tr-[2rem] rounded-br-[2rem] shadow-md w-[30rem] max1050:w-[48vw] text-center"
            style={{ boxShadow: "12px 9px 14px rgba(48, 175, 188, 0.5)" }}>
            <h3 className="text-[1.1rem] font-[700] text-center">Sign Up</h3>
            <ul className="flex flex-col items-center px-0 pb-5">
              <li className="flex items-center gap-1 mt-8 max500:flex-col max500:gap-2 max500:items-start">
                <input
                  className="w-[9.5rem] border-[2px] px-3 py-2 border-[#9d9d9d78] rounded-[0.5rem] max500:w-[80vw] max500:mb-4"
                  value={firstName}
                  placeholder="First Name"
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
                <input
                  className="w-[9.5rem] border-[2px] px-3 py-2 border-[#9d9d9d78]  rounded-[0.5rem] max500:w-[80vw]"
                  value={lastName}
                  placeholder="Last Name"
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </li>
              <li className="flex gap-20 mt-8  max500:flex-col max500:gap-2 max500:items-start relative">
                <input
                  className="w-[19.5rem] border-[2px] px-6 py-2 border-[#9d9d9d78] rounded-[0.5rem] max500:w-[80vw]"
                  type="text"
                  placeholder="Enter Institution Name" // Input field for institutionName
                  value={institutionName}
                  onChange={(e) => {
                    setInstitutionName(e.target.value);
                  }}
                  onBlur={(e) => {
                    checkInstitutionName(e.target.value)
                  }}
                />
              </li>
              <li className="flex gap-20 mt-8  max500:flex-col max500:gap-2 max500:items-start relative">
                <div className="relative">
                  <input
                    className="w-[19.5rem] border-[2px] px-6 py-2 border-[#9d9d9d78] rounded-[0.5rem] max500:w-[80vw]"
                    type="text"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      setEmail(inputValue);
                    }}
                  />
                </div>
              </li>
              <li className="flex gap-20 mt-2 ml-6 max500:flex-col max500:gap-2 max500:items-start relative ">
                <select
                  value={countryCode}
                  name="countryCode"
                  id=""
                  className="w-[19.5rem] mr-[1.5rem] border-[2px] px-[1.5rem] py-2 border-[#9d9d9d78]  rounded-[0.5rem] max500:w-[80vw] mt-6"
                  onChange={(e) => {
                    let countries = e.target.innerText.split("\n");
                    const countryCodes = [];
                    countries = countries.map((item) => {
                      countryCodes.push(item.split(" (")[1].split(")")[0]);
                      return item.split(" (")[0];
                    });

                    setCountry(
                      countries[countryCodes.indexOf(`+${e.target.value}`)]
                    );
                    setCountryCode(e.target.value.toString());
                  }}
                >
                  {<Country />}
                </select>
              </li>
              <li className="flex gap-20 mt-8  max500:flex-col max500:gap-2 max500:items-start relative">
                <div className="relative">
                  <input
                    className="w-[19.5rem] border-[2px] px-6 py-2 border-[#9d9d9d78]  rounded-[0.5rem] max500:w-[80vw]"
                    type="number"
                    placeholder="Enter Phone Number"
                    value={phoneNumber}
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      if (inputValue.length >= 0 && inputValue.length <= 10) {
                        setPhoneNumber(inputValue.toString());
                      }
                    }}
                  />
                </div>
              </li>
              <li className="flex items-center gap-1 mt-6 max500:flex-col max500:gap-2 max500:items-start">
                {/* <input
                  className="w-[19.5rem] border-[2px] px-3 py-2 border-[#9d9d9d78]  rounded-[0.5rem] max500:w-[80vw]"
                  type={"password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                /> */}
              </li>
              <li className="flex items-center gap-1 mt-6 max500:flex-col max500:gap-2 max500:items-start relative">
                {/* <input
                  className="w-[19.5rem] border-[2px] px-3 py-2 border-[#9d9d9d78] rounded-[0.5rem] max500:w-[80vw]"
                  type={!passwordVisible && "password"}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                /> */}
                {/* {passwordVisible ? (
                  <AiFillEye
                    onClick={passwordVisibilityChange}
                    className="absolute right-4 "
                    size={"1.25rem"}
                  />
                ) : (
                  <AiFillEyeInvisible
                    onClick={passwordVisibilityChange}
                    className="absolute right-4 "
                    size={"1.25rem"}
                  />
                )} */}
              </li>
            </ul>
            {err && <p className="text-[0.8rem]  mt-2 text-red-500">{err}</p>}
            <div className="item-center pb-5">
              <button
                className="w-[19.5rem] max500:w-[80vw] bg-[#30AFBC] text-[1.1rem] text-white p-1 rounded-[0.5rem] max767:bg-white max767:text-[#30AFBC] max767:text-[1.2rem] max767:font-bold"
                onClick={onSubmit}
              >
                Sign Up
              </button>
            </div>
            <p
              className=" text-[0.85rem] text-black cursor-pointer"
              onClick={() => {
                Navigate("/login");
              }}
            >
              Already logged In ?{" "}
              <span className="font-[500] text-[#225c59] max767:text-[#ffff]">Log In</span>{" "}
            </p>
          </div>
        </div>
      </form>
    );
  };

  const form2 = () => {
    return (
      <form className="w-[50vw] max800:w-[90vw] max-w-[35rem] bg-[#FFFFFF] shadow-2xl rounded-2xl p-4 flex flex-col items-center ">
        <h3 className="text-[1.2rem] font-roboto font-bold">Sign Up</h3>
        <ul className="flex flex-col items-center">
          <li className="flex items-center gap-20 mt-8 max500:flex-col max500:gap-2 max500:items-start">
            <label className="w-20 max500:ml-3">OTP Code</label>
            <ValidatorForm>
              <TextValidator
                label={
                  <span style={{ color: "#225c59" }}>Enter 6 Digit OTP</span>
                }
                variant="outlined"
                inputProps={{ maxLength: 6 }}
                name="otp"
                size="small"
                type="text"
                fullWidth
                validators={["required"]}
                errorMessages={["OTP is required"]}
                value={confirmationCode === 0 ? "" : confirmationCode}
                onChange={(e) => {
                  setConfirmationCode(e.target.value);
                }}
              />
            </ValidatorForm>
          </li>
          {resendVisible ? (
            <button className="mt-[1rem] ml-[5rem]" onClick={resendOTP}>
              Resend OTP
            </button>
          ) : (
            <p className="mt-[1rem]">
              Resend OTP in{" "}
              <span className="text-[#225c59] font-bold">{counter}</span>{" "}
              seconds
            </p>
          )}
        </ul>
        {err && <p className="text-[0.8rem] mt-2 text-red-500">{err}</p>}
        <p className="text-center w-[80%] text-[0.81rem]">
          <strong className="text-red-500">Note*</strong>
          {data.Otp_Msg}
        </p>
        <button
          className="p-4 py-1 mt-6 mb-3 text-white bg-[#30AFBC] rounded-lg"
          onClick={onConfirmationSubmit}
        >
          Confirm code
        </button>
      </form>
    );
  };

  return (
    <div className="w-screen min-h-screen bg-[#f0efef]">
      <NavBar />
      <div className="flex flex-col items-center mt-8 text-black">
        <div className="flex w-[100%] gap-16 justify-center items-end mt-20 ">
          {!newUser ? form1() : form2()}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
