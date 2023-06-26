// import { API } from "aws-amplify";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LeftBanner from "../Components/DashBoard/LeftBanner";
import ProfileUpdate from "../Components/DashBoard/ProfileUpdate";
import UsersList from "../Components/DashBoard/UsersList";
import NavBar from "../Components/NavBar";
import Context from "../Context/Context";

const DashBoard = () => {
  const [click, setClick] = useState(0);
  // const [isUserAdd, setIsUserAdd] = useState(false);
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [phoneNumber, setPhoneNumber] = useState("");
  // const [status, setStatus] = useState("Active");
  // const [balance, setBalance] = useState("");
  // const [attandance, setAttandance] = useState("");
  const Ctx = useContext(Context);
  // const UtilCtx = useContext(Context).util;
  const [userCheck, setUserCheck] = useState(0);
  // const [displayProfile, setDisplayProfile] = useState(false);

  const Navigate = useNavigate();

  const displayAfterClick = () => {
    switch (click) {
  

     
      case 3:
        return <ProfileUpdate />;

      case 4:
        return <UsersList userCheck={userCheck} setUserCheck={setUserCheck} />;

      default:
        return <div></div>;
    }
  };
  useEffect(() => {
    if (Ctx.isUserDataLoaded) {
      if (Ctx.userData.userType !== "admin") {
        Navigate("/");
      }
    }
  }, [Ctx, Navigate]);
  // const toggleProfile = () => {
  //   setDisplayProfile(!displayProfile);
  // };

  // const onCreateUser = async (e) => {
  //   e.preventDefault();

  //   if (!(name && email && phoneNumber && status && balance && attandance)) {
  //     alert("Fill all Fields");
  //     return;
  //   }
  //   if (!name) {
  //     alert("Fill Name");
  //     return;
  //   } else if (!email) {
  //     alert("Fill email");
  //     return;
  //   } else if (!phoneNumber) {
  //     alert("Fill Phone Number");
  //     return;
  //   } else if (!status) {
  //     alert("Fill Status");
  //     return;
  //   } else if (!balance) {
  //     alert("Fill Balance");
  //     return;
  //   } else if (!attandance) {
  //     alert("Fill Attandance");
  //     return;
  //   }

  //   UtilCtx.setLoader(true);

  //   try {
  //     console.log("started");

  //     await API.post("user", "/admin/create-user/awsaiapp", {
  //       body: {
  //         emailId: email,
  //         userName: name,
  //         phoneNumber: phoneNumber,
  //         status: status,
  //         attandance: attandance,
  //         balance: balance,
  //       },
  //     });
  //     Ctx.setUserList();

  //     alert("User Added");

  //     setName("");
  //     setEmail("");
  //     setPhoneNumber("");
  //     setStatus("");
  //     setAttandance("");
  //     setBalance("");

  //     UtilCtx.setLoader(false);
  //   } catch (e) {
  //     console.log(e);
  //     UtilCtx.setLoader(false);
  //   }
  // };

  return (
    <div className="flex flex-col items-center w-screen overflow-hidden  h-screen bg-gradient-to-b min536:from-[#fafafa] max536:from-[#404e7c9f] min536:via-[#404e7c5c] max536:via-[#2C73EB42] max536:to-[#404E7C] min536:to-[#404E7C]">
      <NavBar />
      <div className="w-[calc(100vw-1rem)] ml-4 rounded-3xl mt-[2rem] flex max1050:w-screen max1050:ml-0 max536:rounded-none max536:mt-10 items-center">
        <LeftBanner
          displayAfterClick={(data) => {
            setClick(data);
          }}
        />

        <div className="relative flex flex-col pt-8 max536:pt-0 justify-start max800:justify-center w-[calc(100vw-16rem)] max1050:w-screen  max1050:items-center">
          <span className="absolute z-0 text-[2rem] flex items-center justify-center h-full w-full">Thank you for chooseing us we will conctact you soon!</span> 
          <div className="min-h-[calc(100vh-4rem)] max1050:flex ">
          {displayAfterClick()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
