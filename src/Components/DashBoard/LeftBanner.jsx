// import React, { useState,useContext } from "react";
// import Context from "../../Context/Context";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
// import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons';

// const LeftBanner = ({ displayAfterClick, selectedPlan, expirationDate }) => {
//   const UserCtx = useContext(Context);
//   const [userData, setUserData] = useState({});
//   const subscriptionType = console.log(userData.userType);

//   return (
//     <div className="h-[calc(100vh-3rem)] w-64 bg-black max1050:bg-transparent  rounded-3xl  flex flex-col overflow-hidden max1050:h-auto max1050:w-screen max1050:fixed max1050:bottom-2 max1050:left-0 max1050:items-center max1050:z-30">
//       <div className="flex flex-col items-center p-6 pt-12 text-white max1050:hidden">
//         <img
//           alt="profile"
//           src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyuNFyw05KSucqjifL3PhDFrZLQh7QAS-DTw&usqp=CAU80-804949_profile-icon-for-the-politics-category-circle-hd.png"
//           className="h-24 w-24 rounded-[50%] "
//         />
//         <p className="pt-3 font-bold">{UserCtx.userData.userName}</p>
//         <button
//           className="px-3 py-1 mt-2 text-black bg-gray-400 rounded-xl"
//           onClick={() => {
//             displayAfterClick(3);
//           }}
//         >
//           Profile
//         </button>
//       </div>
//       <div className="bg-[#d9d9d944] max1050:bg-black w-[100%] h-[100%] rounded-r-[7rem] rounded-b-none flex flex-col items-center justify-between py-12 max1050:p-0  max1050:max-w-[20rem] max1050:rounded-[6rem] max536:w-[90vw]">
//         <div className="w-[60%] bg-[#fff] h-[10rem] rounded-3xl flex flex-col justify-center items-center max1050:hidden">
//           <div className="flex flex-col items-center justify-center gap-2 h-[8rem] ">
//             <h2 className="font-bold font-bebas-neue text-[1.2rem]">PLAN</h2>
//            {/* {selectedPlan ? (    */}
//            {(subscriptionType === "admin") ?
//               <div className="flex items-center justify-center flex-col gap-3 ">
//                 <FontAwesomeIcon
//                   icon={faCalendarCheck}
//                   style={{ color: "#71b48d", fontSize: "4.2rem" }}
//                 />
//                 <p>
//                   {subscriptionType} Selected 
//                 </p>
//                 {/*<p className="text-[20px]">
//                   Selected Plan: <strong>{selectedPlan}</strong>{" "}
//                 </p>
//                 <p className="text-[18px]">
//                   Expiration Date: <strong>{expirationDate}</strong>{" "}
//             </p> */}
//               </div>
//             ) : (
//               <div className="flex items-center  flex-col gap-3">
//                 <FontAwesomeIcon
//                   icon={faCircleExclamation}
//                   style={{ color: "#ffbb00", fontSize: "4.2rem" }}
//                 />
//                 <p className="text-[12px]">No plan selected</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LeftBanner;


import React, { useContext } from "react";
import Context from "../../Context/Context";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons';

const LeftBanner = ({ displayAfterClick }) => {
  const { userData } = useContext(Context);
  const { userType } = userData;

  return (
    <div className="h-[calc(100vh-3rem)] w-64 bg-black max1050:bg-transparent  rounded-3xl  flex flex-col overflow-hidden max1050:h-auto max1050:w-screen max1050:fixed max1050:bottom-2 max1050:left-0 max1050:items-center max1050:z-30">
      <div className="flex flex-col items-center p-6 pt-12 text-white max1050:hidden">
        <img
          alt="profile"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyuNFyw05KSucqjifL3PhDFrZLQh7QAS-DTw&usqp=CAU80-804949_profile-icon-for-the-politics-category-circle-hd.png"
          className="h-24 w-24 rounded-[50%]"
        />
        <p className="pt-3 font-bold">{userData.userName}</p>
        <button
          className="px-3 py-1 mt-2 text-black bg-gray-400 rounded-xl"
          onClick={() => {
            displayAfterClick(3);
          }}
        >
          Profile
        </button>
      </div>
      <div className="bg-[#d9d9d944] max1050:bg-black w-[100%] h-[100%] rounded-r-[7rem] rounded-b-none flex flex-col items-center justify-between py-12 max1050:p-0  max1050:max-w-[20rem] max1050:rounded-[6rem] max536:w-[90vw]">
        <div className="w-[60%] bg-[#fff] h-[10rem] rounded-3xl flex flex-col justify-center items-center max1050:hidden">
          <div className="flex flex-col items-center justify-center gap-2 h-[8rem] ">
            <h2 className="font-bold font-bebas-neue text-[1.2rem]">PLAN</h2>
            {userType === "admin" ? (
              <div className="flex items-center justify-center flex-col gap-3 ">
                <FontAwesomeIcon
                  icon={faCalendarCheck}
                  style={{ color: "#71b48d", fontSize: "4.2rem" }}
                />
                <p className="font-poppins text-[0.81rem]">
                  Admin Selected
                </p>
              </div>
            ) : (
              <div className="flex items-center  flex-col gap-3">
                <FontAwesomeIcon
                  icon={faCircleExclamation}
                  style={{ color: "#ffbb00", fontSize: "4.2rem" }}
                />
                <p className="text-[12px]">No plan selected</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftBanner;


