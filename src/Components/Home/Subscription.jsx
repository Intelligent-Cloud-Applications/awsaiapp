import React, { useContext } from "react";
import { useNavigate } from "react-router";
import "../comp/Subscription.css";
import BworkzInstructorMonthly from "../Subscription/BworkzInstructorMonthly";
import BworkzInstructorYearly from "../Subscription/BworkzInstructorYearly";
import Context from "../../Context/Context";

export default function Subscription() {
  const Ctx = useContext(Context);

  const Navigate = useNavigate();

  return (
    <>
      <section className="Back  text-[1.5rem]  flex  flex-col items-center h-[50rem] max1414:h-[auto] justify-center gap-[5rem] pb-20 ">
        <div className="text-center text-[white] text-[3.4rem] mt-20 font-bebas-neue ">
          <h1>check out our exclusive offers!</h1>
          <h3 className="text-[1.5rem]">see what are the pricing in details</h3>
        </div>
        <div className="flex flex-wrap justify-center items-center w-[90vw] max-w-[80rem] gap-28 ">
          {/* <BworkzInstructorMonthly />
          <BworkzInstructorYearly /> */}
                <div className="bg-white w-[20rem] max450:w-[18rem]  h-[24rem] max450:h-[20rem] rounded-[2rem]  flex flex-col justify-center items-center gap-8 shadowSubscribe   max450:w-[90vw] max450:gap-[1.2rem] max450:text-[1rem]   max450:p-12  border-[0.1rem]">
                  <p className="font-gidugu leading-[1.5rem] h-[1rem] text-[3.2rem] mb-[1.2rem]">Basic</p>
                  <p className="font-poppins text-[1.2rem]  text-center">Basic Static Website</p>
                  <h1 className="text-center text-[1rem] font-russo w-[100%]">₹ 1,000 / monthly</h1>
                
                    <button
                      onClick={() => {
                        Navigate("/signup");
                      }}
                      className="w-[15rem] bg-[#FDCF08] text-black px-12 py-2 font-russo rounded- px] hover:text-[#FDCF08] hover:bg-white hover:border-[#FDCF08] hover:border-[0.3rem] h-[3rem] flex justify-center items-center  max450:w-[40vw]"
                    >
                      Subscribe
                    </button>
                
                </div>
                <div className="bg-white w-[20rem] max450:w-[18rem]  h-[24rem] max450:h-[25rem] rounded-[2rem]  flex flex-col justify-center items-center gap-8 shadowSubscribe   max450:w-[90vw] max450:gap-[1.2rem] max450:text-[1rem]   max450:p-12  border-[0.1rem]">
                  <p className="font-gidugu leading-[1.5rem] h-[1rem] max450:mb-[1.2rem] text-[3.2rem]">Advance</p>
                  <p className="font-poppins text-[1.2rem] text-center w-[80%] max450:w-[100%] ">Website with user access to scheduling and class recording and attendance</p>
                  <h1 className="text-center text-[1rem] font-russo w-[100%]">₹ 5,000 / monthly</h1>
                
                    <button
                      onClick={() => {
                        Navigate("/signup");
                      }}
                      className="w-[15rem] bg-[#FDCF08] text-black px-12 py-2 font-russo  hover:text-[#FDCF08] hover:bg-white hover:border-[#FDCF08] hover:border-[0.3rem] h-[3rem] flex justify-center items-center  max450:w-[40vw]"
                    >
                      Subscribe
                    </button>
                
                </div>
                <div className="bg-white w-[20rem] max450:w-[18rem]  h-[24rem] max450:h-[20rem] rounded-[2rem]  flex flex-col justify-center items-center gap-8 shadowSubscribe   max450:w-[90vw] max450:gap-[1.2rem] max450:text-[1rem]   max450:p-12  border-[0.1rem]">
                  <p className="font-gidugu leading-[1.5rem] h-[1rem] max450:mb-[1.2rem] text-[3.2rem]">Standard</p>
                  <p className="font-poppins text-[1.2rem] text-center w-[80%]">Website with Member Management  </p>
                  <h1 className="text-center text-[1rem] font-russo w-[100%]">₹ 2,500 / monthly</h1>
                
                    <button
                      onClick={() => {
                        Navigate("/signup");
                      }}
                      className="w-[15rem] bg-[#FDCF08] text-black px-12 py-2 font-russo  hover:text-[#FDCF08] hover:bg-white hover:border-[#FDCF08] hover:border-[0.3rem] h-[3rem] flex justify-center items-center  max450:w-[40vw]"
                    >
                      Subscribe
                    </button>
                
                </div>
          
        </div>
      </section>
    </>
  );
}
