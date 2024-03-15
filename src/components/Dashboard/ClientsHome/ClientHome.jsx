import React from 'react'
import Growth from '../../../utils/Assets/Dashboard/images//PNG/growth.png'

const ClientHome = () => {
  return (
    <div className="w-[83vw] ml-6 max1414:ml-0">
      <div className="flex justify-evenly items-center max1414:flex-col">
        <div className="flex flex-col ">
          {/* graph */}
          <div className="flex flex-row justify-between w-[50rem] ml-4 mt-[5rem]">
            <div className="flex ">
              <img width={30} src={Growth} alt="" />
              <p className="K2D font-[600] mt-1 ml-2 text-[1.3rem]">Growth</p>
            </div>
            <div className="flex justify-between w-[18rem]">
              <p className="K2D font-[600]">Income</p>
              <p className="K2D font-[600]">Last Year Income</p>
            </div>
          </div>
          <div className="w-[50rem] h-[25rem] border-2 border-black ml-9 mt-6 max1414:ml-0"></div>
        </div>

        {/* memberlist */}
        <div className="border-2 border-black w-[25rem] h-[35rem] max1414:mt-5"></div>
      </div>
      <div className="flex justify-evenly mt-8 items-center max1250:flex-col max1250:h-[44rem]">
        <div className="flex w-[20rem] h-[13rem] border-2 border-black"></div>
        <div className="flex w-[20rem] h-[13rem] border-2 border-black"></div>
        <div className="flex w-[23rem] h-[13rem] border-2 border-black"></div>
      </div>
    </div>
  )
}

export default ClientHome
