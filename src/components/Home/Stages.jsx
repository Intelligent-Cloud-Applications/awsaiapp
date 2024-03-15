import React from 'react'
import stages from '../../utils/stages1.png'
import { useNavigate } from 'react-router-dom'
import '../Home/Stages.css'
import stages1 from '../../utils/stagesMob.png'
import { useInView } from 'react-intersection-observer'

const Stages = () => {
  const Navigate = useNavigate()

  const [ref, inView] = useInView()
  const [ref1, inView1] = useInView()

  return (
    <div className="w-full bg-[#30AFBC] overflow-hidden">
      <h1 className="w-full flex justify-center items-end text-9xl md:text-11xl h-[15vh] text-white font-poppins font-semibold tracking-widest">
        How it Works?
      </h1>
      <div className="w-full h-[85vh] px-52 py-20 max800:hidden">
        <div className="relative flex flex-col justify-around items-center bg-white w-full h-full shadow-full rounded-lg p-2 overflow-hidden">
          <img className="w-[90%]" src={stages} alt="stages" />
          <div
            className={`absolute top-0 w-full h-[55%] bg-white ${
              inView ? 'animated-svg' : ''
            }`}
            ref={ref}
          ></div>
          <div className="flex justify-center items-center h-[15vh]">
            <button
              onClick={() => {
                Navigate('/query')
              }}
              className="bg-[#30AFBC] text-white px-4 py-2 rounded-full font-semibold text-base md:text-xl hover:bg-slate-800 hover:scale-105 duration-200"
            >
              Let's build your dream website
            </button>
          </div>
        </div>
      </div>

      <div className="relative w-full h-[90%] px-10 my-20 min800:hidden flex flex-col justify-center items-center overflow-hidden">
        {' '}
        <div className="bg-white rounded-lg py-5">
          <div className="flex flex-col justify-center items-center bg-white h-full px-20 py-5 pb-16">
            <img className=" min:w-full" src={stages1} alt="" />
            <div
              className={`absolute max500:top-24 top-36 w-[55%] h-[80%] bg-white ${
                inView1 ? 'animated-svg2' : ''
              }`}
              ref={ref1}
            ></div>
          </div>
          <div className="flex justify-center items-center">
            <button
              onClick={() => {
                Navigate('/query')
              }}
              className="bg-[#30AFBC] text-white px-4 py-2 rounded-full font-semibold text-sm max375:text-[.5rem]  hover:bg-slate-800 hover:scale-105 duration-200 z-10"
            >
              Let's build your dream website
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Stages
