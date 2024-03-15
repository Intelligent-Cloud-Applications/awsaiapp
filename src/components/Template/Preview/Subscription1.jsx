import React from 'react'

const Subscription1 = () => {
  return (
    <div className="Back text-[1.5rem] flex flex-col items-center h-[49rem] max980:h-[auto] justify-center gap-[5rem] bg-[#f5f5f5] ml-[7.56%] w-[78%]">
      <div className="text-center mt-20 sans-sarif ">
        <h1 class="font-bold ">Monthly Membership Subscription </h1>
        <h3 class="text-[1rem] font-[600]">
          see what are the pricing in details
        </h3>
      </div>
      <ul class="flex flex-wrap justify-center w-[90vw] max-w-[80rem] gap-28 ">
        <li class="bg-white w-[24rem] h-auto p-10 rounded-[2rem] z-0  flex flex-col items-center gap-8 shadowSubscribe  max1050:w-[30vw] max1050:gap-4 max1050:text-[1rem] max1050:min-h-[28rem] max450:h-auto max1050:p-12 border-[#225c59] border-[0.1rem]">
          <p class="text-[1.6rem] font-bold">Hybrid Monthly Subscription</p>
          <ul class=" text-[1rem] h-auto pl-0 flex flex-col">
            <li>
              <p>$20 for Registration and $20 for Monthly</p>
            </li>
            <li>
              <p>Instructors: Certified Zumba & BWORKZ</p>
            </li>
            <li>
              <p>
                Plan: 40+ Monthly Online and in-person Dance Fitness Classes
              </p>
            </li>
          </ul>
          <h1 class="text-left w-[100%]">$ 20/Month</h1>
          <div class="z-1">
            <button class="w-[15rem] bg-[#225c59] text-white px-12 py-2 rounded-2xl hover:text-[#225c59] hover:bg-[#205552] hover:border-[#225c59] hover:border-[0.2rem] h-[3rem] flex justify-center items-center mt-16 max450:w-[60vw] cursor-pointer ">
              Subscribe
            </button>
          </div>
        </li>
      </ul>
    </div>
  )
}

export default Subscription1
