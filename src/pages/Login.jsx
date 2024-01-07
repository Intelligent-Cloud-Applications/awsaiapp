import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Auth, API } from "aws-amplify";
import Context from "../context/Context";
import Swal from "sweetalert2";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Navbar from "../components/Home/Navbar";
import EmailIcon from "../utils/Assets/Dashboard/images/SVG/EmailIcon.svg";
import LockIcon from "../utils/Assets/Dashboard/images/SVG/LockIcon.svg";
// import GoogleIcon from '../utils/png/Google.png';
// import FacebookIcon from '../utils/png/Facebook.png';
import LoginPng from "../utils/Assets/Login.png";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [error, setError] = useState("");
  const UtilCtx = useContext(Context).util;
  const UserCtx = useContext(Context);
  const institutionName = ["happyprancer", "bworkz", "awsaiapp"];
  const [institution, setInstitution] = useState("");

  const handleInstitutionChange = (selectedInstitution) => {
    if (selectedInstitution !== 'awsaiapp') {
      setInstitution(selectedInstitution);
      localStorage.setItem('institution', selectedInstitution);
    } else {
      setInstitution(selectedInstitution);
      localStorage.removeItem('institution', selectedInstitution)
    }
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const Navigate = useNavigate();

  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    setPasswordVisible(!passwordVisible);
  };

  const handelSubmit = async (event) => {
    event.preventDefault();

    UtilCtx.setLoader(true);

    try {
      const user = await Auth.signIn(formData.email, formData.password);

      if (user) {
        const userdata = await API.get(
          "clients",
          `/self/read-self/${institution}`
        );
        if (
          userdata.userType === "admin" &&
          userdata.institution === "awsaiapp"
        ) {
          UserCtx.setUserData(userdata);
          UserCtx.setIsAuth(true);
          UtilCtx.setLoader(false);
          console.log(userdata);
          await UserCtx.clients.onReload();
          Swal.fire({
            icon: "success",
            title: "Welcome Back",
          });
          Navigate("/dashboard", { state: { institution: institution } });
        } else if (userdata.userType === "admin") {
          UserCtx.setUserData(userdata);
          UserCtx.setIsAuth(true);
          UtilCtx.setLoader(false);
          await UserCtx.clients.onReload();
          Swal.fire({
            icon: "success",
            title: "Welcome Back",
          });
          Navigate(`/dashboard`, { state: { institution: institution } });
        } else {
          Navigate("/");
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Please enter a valid Id",
          });
          UtilCtx.setLoader(false);
        }
      } else {
        setError(`Incorrect ${formData.email} or password`);
        UtilCtx.setLoader(false);
      }
    } catch (e) {
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
              <select
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
              </select>
              <div className="mb-4 relative flex items-center">
                <img
                  src={EmailIcon}
                  alt="Email Icon"
                  className="absolute left-3 top-3 pointer-events-none w-[1rem] h-[1rem]"
                />
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="Inter pl-10 w-[20rem] p-2 border rounded-[0.5rem] mb-2"
                  placeholder="Email"
                />
              </div>
              <div className="mb-2 relative flex items-center">
                <img
                  src={LockIcon}
                  alt="Lock Icon"
                  className="absolute left-3 top-3 h-[1rem] w-[1rem] pointer-events-none"
                />
                <input
                  type={passwordVisible ? "password" : "text"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="Inter pl-10 w-[20rem] p-2 border rounded-[0.5rem]"
                  placeholder="Password"
                />
                <button
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-3"
                >
                  {passwordVisible ? <AiFillEyeInvisible /> : <AiFillEye />}
                </button>
              </div>
              <div className="w-[20rem] mb-6">
                <a
                  href="/forgot-password"
                  className="text-[#017E2B] text-[0.8rem] font-[600] hover:underline"
                >
                  Forgot Password?
                </a>
              </div>
              <button
                type="submit"
                onClick={handelSubmit}
                className="w-[20rem] bg-[#30AFBC] text-[1.1rem] text-white p-2 rounded-[0.5rem] max767:bg-white max767:text-[#30AFBC] max767:text-[1.2rem] max767:font-bold"
              >
                Login
              </button>
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
