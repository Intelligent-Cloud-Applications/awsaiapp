import React, { useContext, useState } from "react";
// import { RiDashboardLine } from "react-icons/ri";
// import { BsFillPersonFill, BsGraphUp, BsPeopleFill } from "react-icons/bs";
// import { AiOutlineCompass } from "react-icons/ai";
import Context from "../../Context/Context";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons';


const LeftBanner = ({ displayAfterClick , selectedPlan, expirationDate  }) => {
  const click = useState(0);
  const UserCtx = useContext(Context);


  return (
    <div className="h-[calc(100vh-3rem)] w-64 bg-black max1050:bg-transparent  rounded-3xl  flex flex-col overflow-hidden max1050:h-auto max1050:w-screen max1050:fixed max1050:bottom-2 max1050:left-0 max1050:items-center max1050:z-30">
      <div className="flex flex-col items-center p-6 pt-12 text-white max1050:hidden">
        <img
          alt="profile"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyuNFyw05KSucqjifL3PhDFrZLQh7QAS-DTw&usqp=CAU80-804949_profile-icon-for-the-politics-category-circle-hd.png"
          className="h-24 w-24 rounded-[50%] "
        />
        <p className="pt-3 font-bold">{UserCtx.userData.userName}</p>
        <button
          className="px-3 py-1 mt-2 text-black bg-gray-400 rounded-xl"
          onClick={() => {
            click(3);
            displayAfterClick(3);
          }}
        >
          Profile
        </button>
      </div>
      <div className="bg-[#d9d9d944] max1050:bg-black w-[100%] h-[100%] rounded-r-[7rem] rounded-b-none flex flex-col items-center justify-between py-12 max1050:p-0  max1050:max-w-[20rem] max1050:rounded-[6rem] max536:w-[90vw]">
       {/* <ul className="w-[90%] flex flex-col items-center max1050:flex-row max1050:justify-between max1050:px-2">
          <li
            className={`flex items-center text-[1.1rem] w-[86%] ${
              click === 0 &&
              " bg-[#fdd0086b]  max1050:bg-[#FDCF08] max1050:rounded-[50%]"
            } my-3 p-2 font-bold text-white rounded-md cursor-pointer max1050:w-auto`}
            onClick={() => {
              click(0);
              displayAfterClick(0);
            }}
          >
            <RiDashboardLine
              color="white"
              size={"1.9rem"}
              className="mr-2 max1050:mr-0 min-w-[1.9rem]"
            />
            <p className="max1050:hidden">Upcoming Classes</p>
          </li>
          <li
            className={`flex items-center text-[1.1rem] w-[86%] my-3 p-2 font-bold text-white rounded-md  ${
              click === 1 &&
              " bg-[#fdd0086b]  max1050:bg-[#FDCF08] max1050:rounded-[50%]"
            } cursor-pointer max1050:w-auto`}
            onClick={() => {
              click(1);
              displayAfterClick(1);
            }}
          >
            <BsGraphUp
              color="white"
              size={"1.9rem"}
              className="mr-2 min-w-[1.9rem]  max1050:mr-0 "
            />
            <p className="max1050:hidden">Previous Classes</p>
          </li>
          <li
            className={`flex items-center text-[1.1rem] w-[86%] my-3 p-2 font-bold text-white rounded-md  ${
              click === 2 &&
              " bg-[#fdd0086b]  max1050:bg-[#FDCF08] max1050:rounded-[50%]"
            } cursor-pointer  max1050:w-auto`}
            onClick={() => {
              click(2);
              displayAfterClick(2);
            }}
          >
            <AiOutlineCompass
              color="white"
              size={"1.9rem"}
              className="mr-2 min-w-[1.9rem] max1050:mr-0 "
            />
            <p className="max1050:hidden">Choreography</p>
          </li> 
          <li
            className={`flex items-center text-[1.1rem] w-[86%] my-3 p-2 font-bold text-white rounded-md min1050:hidden ${
              click === 3 &&
              " bg-[#fdd0086b] max1050:bg-[#FDCF08] max1050:rounded-[50%] max1050:"
            } cursor-pointer max1050:w-auto`}
            onClick={() => {
              click(3);
              displayAfterClick(3);
            }}
          >
            <BsFillPersonFill
              color="white"
              size={"1.9rem"}
              className="mr-2 min-w-[1.9rem] max1050:mr-0 "
            />
          </li>
          {(UserCtx.userData.userType === "admin" ||
            UserCtx.userData.userType === "instructor") && (
              <li
                className={`flex items-center text-[1.1rem] w-[86%] my-3 p-2 font-bold text-white rounded-md  ${
                  click === 4 &&
                  " bg-[#fdd0086b] max1050:bg-[#FDCF08] max1050:rounded-[50%] max1050:"
                } cursor-pointer max1050:w-auto`}
                onClick={() => {
                  click(4);
                  displayAfterClick(4);
                }}
              >
                <BsPeopleFill
                  color="white"
                  size={"1.9rem"}
                  className="mr-2 min-w-[1.9rem] max1050:mr-0 "
                />

                <p className="max1050:hidden">Members</p>
              </li>
            )}
        </ul> */}
        <div className="w-[60%] bg-[#fff] h-[10rem] rounded-3xl flex flex-col justify-center items-center max1050:hidden">
        
        <div className="flex flex-col items-center justify-center gap-2 h-[8rem] ">
        
        <h2 className="font-bold font-bebas-neue text-[1.2rem]">PLAN</h2>
            {selectedPlan ? (
              <div className="flex items-center justify-center flex-col gap-3 ">
              <FontAwesomeIcon icon={faCalendarCheck} style={{color: "#71b48d",fontSize: '4.2rem' }} />
              <p className="text-[20px]">Selected Plan: <strong>{selectedPlan}</strong> </p>
              <p className="text-[18px]">Expiration Date: <strong>{expirationDate}</strong> </p>
              </div>
              ) : (
                <div className="flex items-center  flex-col gap-3">
              <FontAwesomeIcon icon={faCircleExclamation} style={{color: "#ffbb00",fontSize: '4.2rem' }} />
              <p className="text-[12px]">No plan selected</p>
              </div>
              )}
          
        </div>
        
        
        {/*<p className="font-semibold">Having some Trouble?</p>
          <p
            className="font-bold cursor-pointer"
            onClick={() => {
              Navigate("/query");
            }}
          >
            contact us
          </p>  */}
        </div>
      </div>
    </div>
  );
};

export default LeftBanner;
