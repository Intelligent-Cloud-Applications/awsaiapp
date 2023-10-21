import React,{useState} from "react";
import stages from "../../utils/stages1.png";
import { useNavigate } from "react-router-dom";
import '../Home/Stages.css';
import stages1 from '../../utils/stagesMob.png';

const Stages = () => {
  const Navigate = useNavigate();
  const [isMouseInside, setIsMouseInside] = useState(false);

  return (
    <div className="h-[100vh] w-full bg-[#30AFBC] overflow-hidden"
    onMouseEnter={() => {
      setIsMouseInside(true);
    }}
    onMouseLeave={() => {
      setIsMouseInside(false);
    }}>
      <h1 className="w-full flex justify-center items-end text-11xl h-[15vh] text-white font-poppins font-semibold tracking-widest">
        How it Works?
      </h1>
      <div className="w-full h-[85vh] px-52 py-20 max800:hidden">
        <div className="relative flex flex-col justify-around items-center bg-white w-full h-full shadow-full rounded-lg p-2 overflow-hidden">
          <img className="w-[90%]" src={stages} alt="stages" />
          <div className={`absolute top-0 w-full h-[55%] bg-white ${ isMouseInside ? "animated-svg" : ""}`}></div>
          <div className="flex justify-center items-center h-[15vh]">
            <button
              onClick={() => {
                Navigate("/query");
              }}
              className="bg-[#30AFBC] text-white px-4 py-2 rounded-full font-semibold text-base md:text-xl hover:bg-[#57C3CE]"
            >
              Let's build your dream website
            </button>
          </div>
        </div>
      </div>

      <div className="w-full h-[80%] px-10 py-5 sm:px-20 sm:py-10 min800:hidden flex flex-col justify-center items-center">
        <img className=" min:w-full " src={stages1} alt="" />
      </div>
    </div>
  );
};

export default Stages;
