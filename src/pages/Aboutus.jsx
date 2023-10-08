import React from "react";
import arrow from "../utils/arrow mark.png";
import Rubikfont from "../assets/fonts/Rubik_Mono_One.zip";
import about1 from "../utils/about1.png";
import about2 from "../utils/about2.png";
import about3 from "../utils/about3.png";
import cloud from "../utils/cloud.png";
import value from "../utils/value.png";
import right from "../utils/right.png";
import left from "../utils/left.png";
import full from "../utils/full.png";
import Tick from "../utils/Tick.png";
import "./Aboutus.css";
import Navbar from "../components/Home/Navbar";
import FOOTER from "../components/Home/Footer";



export default function AboutUs() {
  const fontStyles = `
    @font-face {
      font-family: 'Rubik_Mono_One'; 
      src: url('${Rubikfont}') format('truetype');
    }
  `;
  
  
  return (
    <div>
      <Navbar />
      <div className="overflow-hidden bg-white flex flex-col pb-1 gap-2 w-full">
        <div className="overflow-hidden bg-black flex flex-col mb-5 pt-1 gap-8  ">
          <div className="flex flex-col">
            <div className="w-full flex flex-col md:flex-row md:justify-between max800:justify-center items-center ">
              <style>{fontStyles}</style>
              <div
                className="pl-[4rem] max800:pt-[7rem] max800:w-full text-[48px] md:text-[84px] font-family-[Rubik_Mono_One] text-[#30afbc] font-bold max800:text-[3rem]"
              >
                ABOUT <span className="text-white contents">US</span>
              </div>
              <img
                src={arrow}
                className="arrow self-start mt-2rem md:mt-0 ml-2rem"
                alt="Arrow"
              />
            </div>
            <div className="Container1 md:pb-[12rem] max800:pb-[23rem] max767:mb-[2rem] max450:pb-[1rem]  md:px-2">
              <div className=" wrapper flex flex-col md:flex-row justify-between items-start p-[1rem] gap-2">
                <img
                  src={about3}
                  alt="About 3"
                  className="about3 w-[100%] md:w-[27rem] rounded-[10px] max800:mt-[10rem] max800:ml-[3rem]"
                />
                <img
                  src={about2}
                  alt="About 2"
                  className="about2 w-[100%] md:w-[28.5rem] rounded-[10px] max800:mt-[10rem]  max800:ml-[3rem]"
                />
                <img
                  src={about1}
                  alt="About 1"
                  className="about2 w-[100%] md:w-[28.5rem] rounded-[10px] max800:mt-[10rem]  max800:ml-[3rem] "
                />
                
              </div>
            </div>
          </div>
        </div>


          <div className="max767:flex max767:justify-center max767:px-[2rem] ">
        <div className=" flex flex-col md:flex-row justify-between items-start ">
          <div className="flex flex-col md:flex-row gap-3 w-full md:w-2/5 items-start">
            <img
              src={left}
              className="left relative hidden sm:block max800:block"
              alt="left"
            />
            <div className="self-start md:self-end flex flex-col mt-3 md:mt-0 gap-5 w-full md:w-[498px] items-start">
              <div className="text-3xl font-inter font-bold tracking-[3.2] w-full max980:text-[25px] max767:text-[20px]">
                Welcome to Intelligent Cloud Applications!
              </div>
              <div className="text-xl font-['Inter'] text-[#545454] leading-[25px] w-full max980:w-[302px] max980:text-[16px] max767:w-full">
                At Intelligent Cloud Applications, we are not just a digital
                consulting company; we are your partners in propelling your
                business into the digital age. Our mission is to empower your
                business with cutting-edge technologies, innovative web
                applications, personalized dashboards, seamless payment
                solutions, and comprehensive digital marketing strategies.
              </div>
            </div>
          </div>
          <div className="self-start md:self-end relative flex flex-col justify-start md:justify-end w-full md:w-2/5 items-end">
            
            <img
              src={cloud}
              className="w-full md:w-[518px] h-auto absolute top-0 left-0  max980:w-[400px]"
              alt="Cloud"
            />
            <img
              src={right}
              className="right relative hidden sm:block "
              alt="Right"
            />
          </div>
        </div>
        </div> 


        <div className="who text-4xl font-['Inter'] font-bold self-center md:mt-[120px] max767:pt-[1.5rem] ">
          Who<span className="text-[#30afbc] contents"> We </span>Are
        </div>
        <div className="text-xl font-['Inter'] font-medium leading-[29.4px] text-[#545454] self-center mb-[109px] w-4/5   max800:text-[15px]  ">
          We are a team of passionate technologists, creative designers, and
          strategic thinkers who believe in the transformative power of
          technology. With a deep understanding of the digital landscape, we
          specialize in crafting tailor-made solutions that align with your
          business goals and drive growth.
        </div>

        <div class=" our overflow-hidden bg-black flex flex-col md:flex-row justify-between mb-6 md:mb-24 items-start p-4 md:p-24 py-12 ">
          <div class="flex flex-col mb-4 md:mb-8 lg:mb-16 gap-4 lg:gap-24 w-full md:w-3/5 h-auto lg:h-auto ">
            <div class="value text-lg md:text-2xl lg:text-4xl font-inter font-bold text-white self-start mb-2 mt-2 lg:mb-4  ">
              Our Values
            </div>
            <div class="flex flex-col md:flex-row gap-4 lg:gap-12 items-start ml-0 md:ml-10 lg:ml-0 mr-0 md:mr-8 lg:mr-0 w-full  lg:w-[60rem]  md:w-[50rem]">
              <div class="flex flex-col mt-1 gap-2 md:gap-6 lg:gap-8 w-full md:w-2/5 lg:w-1/3 items-start ">
                <div class="text-base md:text-lg lg:text-xl font-inter font-bold text-[#30afbc]">
                  Innovation
                </div>
                <div class="font-inter leading-[23.5px] md:leading-[28px] lg:leading-[27px] text-[#d8d1d1] w-full">
                  We thrive on innovation, constantly exploring emerging
                  technologies to provide you with solutions that keep you ahead
                  of the curve.
                </div>
              </div>
              <div class="flex flex-col gap-2 md:gap-6 lg:gap-8 w-full md:w-2/5 lg:w-1/3 items-start">
                <div class="text-base md:text-lg lg:text-xl font-inter font-bold text-[#30afbc]">
                  Expertise
                </div>
                <div class="font-inter leading-[23.5px] md:leading-[28px] lg:leading-[27px] text-[#d8d1d1] w-full">
                  Our team comprises experts from diverse fields who are
                  dedicated to pushing the boundaries of what's possible in the
                  digital world.
                </div>
              </div>
            </div>
            <div class="flex flex-col md:flex-row gap-2 md:gap-6 lg:gap-8 items-start ml-0 md:ml-10 lg:ml-0 w-full lg:w-[63rem]  md:w-[50rem]">
              <div class="flex flex-col mb-2 md:mb-3 lg:mb-4 gap-2 md:gap-6 lg:gap-8 w-full md:w-2/5 lg:w-1/3 items-start">
                <div class="text-base md:text-lg lg:text-xl font-inter font-bold text-[#30afbc]">
                  Collaboration
                </div>
                <div class="font-inter leading-[23.5px] md:leading-[28px] lg:leading-[27px] text-[#d8d1d1] w-full">
                  We consider ourselves an extension of your team. We
                  collaborate closely with you throughout the process to ensure
                  the end result exceeds expectations.
                </div>
              </div>
              <div class="flex flex-col gap-2 md:gap-6 lg:gap-8 w-full md:w-1/2 lg:w-1/3 items-start ">
                <div class="text-base md:text-lg lg:text-xl font-inter font-bold text-[#30afbc]">
                  Results
                </div>
                <div class="font-inter leading-[23.5px] md:leading-[28px] lg:leading-[27px] text-[#d8d1d1] w-full">
                  Your success is our success. We measure our achievements by
                  the growth and achievements of your business in the digital
                  landscape.
                </div>
              </div>
            </div>
          </div>
          <div class="flex justify-center items-center lg:items-end w-full  ">
            <img
              src={value}
              class="self-end mt-4 lg:mt-[160px] lg:ml-[17rem] md:w-[12rem] md:mt-[28rem] md:mr-[39rem] lg:w-full  "
              alt="Value"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 lg:gap-12 items-start mb-4 lg:mb-12 mx-4 lg:mx-16">
          <img src={full} className="mt-2 lg:mt-3" alt="Background" />
          <div className="flex flex-col justify-between gap-2 lg:gap-6 w-full lg:w-1/2 items-start">
            <div className="text-xl lg:text-5xl font-['Mulish'] font-bold leading-[40px] lg:leading-[52.8px] text-[#2f2f2f] ml-px">
              Our Mission
            </div>
            <div className="text-lg lg:text-xl font-['Mulish'] leading-[30.1px] lg:leading-[30.1px] text-[#808080] ml-px w-full">
              Building an enterprise-level site doesn't need a nightmare or cost
              you tens of thousands. Our mission is to revolutionize businesses
              through the seamless integration of cutting-edge technologies.
            </div>

            <div className="lg:self-stretch flex flex-row lg:mr-10 gap-2 items-start">
              <div className="flex flex-col mt-1 gap-4 w-6 shrink-0 items-start">
                <img src={Tick} className="mb-px w-6" alt="Tick" />
                <img src={Tick} className="w-6" alt="Tick" />
                <img src={Tick} className="w-6" alt="Tick" />
              </div>
              <div className="flex flex-col justify-between gap-2 w-full lg:w-[520px] items-start">
                <div className="text-lg font-['Mulish'] leading-[30.1px] text-[#2f2f2f]">
                  Empowering clients through advanced applications.
                </div>
                <div className="text-lg font-['Mulish'] leading-[30.1px] text-[#2f2f2f]">
                  Crafting advanced apps for confident navigation.
                </div>
                <div className="text-lg font-['Mulish'] leading-[30.1px] text-[#2f2f2f] ml-0 w-full">
                  Providing end-to-end digital solutions encompassing tech,
                  payments, and marketing.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FOOTER />
    </div>
  );
}
