import React from "react";
import Navbar from "../components/Home/Navbar";
import FOOTER from "../components/Home/Footer";
import Bapuji from "../utils/team/Bapuji.png";
import Shubhasmita from "../utils/team/Shubhasmita.png";
import Harsh from "../utils/team/Harsh.png";
import Sambhunath from "../utils/team/Sambhunath.png";
import Shreetam from "../utils/team/Shreetam.png";
import Bikash from "../utils/team/Bikash.png";
import Subham from "../utils/team/Subham.png";
import Santosh from "../utils/team/Santosh.png";
import Ananta from "../utils/team/Ananta.png";
import Avishek from "../utils/team/Avishek.png";
import Bhabesh from "../utils/team/Bhabesh.png";
import Lokanath from "../utils/team/Lokanath.png";
import Soumya from "../utils/team/Soumya.png";
import Rohit from "../utils/team/Rohit.png";
import Akash from "../utils/team/Akash.png";
import Jogalaxmi from "../utils/team/Jogalaxmi.png";
import Anchal from "../utils/team/Anchal.png";
import Sanjita from "../utils/team/Sanjita.png";
import line1 from "../utils/Line 16.svg";
import line2 from "../utils/Line 17.svg";
import img1 from "../utils/hackathon/img1.png";
import img3 from "../utils/hackathon/img3.png";
import img4 from "../utils/hackathon/img4.png";
import img8 from "../utils/hackathon/image 24.png";
import "./Team.css";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const teamMembers = [
  {
    name: "Bapuji",
    role: "Customer Relationship Manager",
    imageSrc: Bapuji,
  },
  {
    name: "Shubhasmita",
    role: "Digital Marketing Manager",
    imageSrc: Shubhasmita,
  },
  {
    name: "Harsh",
    role: "SDE 1",
    imageSrc: Harsh,
  },

  {
    name: "Bikash",
    role: "SDE 1",
    imageSrc: Bikash,
  },
  {
    name: "Lokanath",
    role: "SDE 1",
    imageSrc: Lokanath,
  },
  {
    name: "Subham",
    role: "SDE 1",
    imageSrc: Subham,
  },
  {
    name: "Soumya",
    role: "SDE 1",
    imageSrc: Soumya,
  },
  {
    name: "Jogalaxmi",
    role: "SDE 1",
    imageSrc: Jogalaxmi,
  },
  {
    name: "Avishek",
    role: "SDE Intern",
    imageSrc: Avishek,
  },
  {
    name: "Bhabesh",
    role: "SDE Intern",
    imageSrc: Bhabesh,
  },
  {
    name: "Sambhunath",
    role: "SDE Intern",
    imageSrc: Sambhunath,
  },
  {
    name: "Santosh",
    role: "SDE Intern",
    imageSrc: Santosh,
  },
  {
    name: "Shreetam",
    role: "SDE Intern",
    imageSrc: Shreetam,
  },
  {
    name: "Ananta",
    role: "SDE Intern",
    imageSrc: Ananta,
  },
  {
    name: "Akash",
    role: "SDE Intern",
    imageSrc: Akash,
  },
  {
    name: "Rohit",
    role: "SDE Intern",
    imageSrc: Rohit,
  },
  {
    name: "Anchal",
    role: "SDE Intern",
    imageSrc: Anchal,
  },
  {
    name: "Sanjita",
    role: "SDE Intern",
    imageSrc: Sanjita,
  },
];

const TeamPage = () => {
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        staggerChildren: 0.2,
      },
    },
  };

  const memberVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const flipVariants = {
    hover: { rotateY: 180 },
  };

  const [ref, inView] = useInView({
    triggerOnce: true, // Trigger the animation only once when it comes into view
  });

  return (
    <div>
      <Navbar />

      <div className="relative flex flex-col pb-[482px] ">
        <div className="w-full h-[446px] overflow-hidden bg-[#30AFBC] absolute top-[400px] left-0 flex flex-row justify-between items-center pb-20 pl-12 pr-24 rounded-br-[80px] rounded-bl-[80px] max450:h-[25rem] ">
          <div className="flex flex-col gap-[2.5rem] w-2/3 items-end">
            <div className="text-center text-3xl font-['Inter'] font-semibold leading-[26px] w-1/2 mt-[8rem] max800:text-[1rem] max450:mt-[2rem]">
              Your Dreams are Fulfilled Here !
            </div>
            {/* <div className="self-stretch flex flex-row justify-between mr-20 items-start gap-[10rem]">
          <img
            src={img4}
            id="All2"
            className=""
            alt=''
          />
          <img
            src={img3}
            id="All1"
            className=""
            alt=''
          />
          <img
        src={img8}
        id="IMGWA"
        className="self-end"
        alt=''
      />
    </div> */}
            <div className="Container2 max800:mb-[15rem]">
              <div className="wrapper1 self-stretch flex flex-row justify-center md:mr-[2.2rem] lg:pl-[48rem]  gap-[10rem]">
                <img
                  src={img4}
                  alt=""
                  className="team3 w-[100%] md:w-[27rem] rounded-[10px] max800:mt-[10rem] max800:ml-[3rem]"
                />
                <img
                  src={img3}
                  alt=""
                  className="team2 w-[100%] md:w-[28.5rem] rounded-[10px] max800:mt-[10rem] mr-3  max800:ml-[3rem]"
                />
                <img
                  src={img8}
                  alt=""
                  className="team2 w-[100%] md:w-[28.5rem] rounded-[10px] max800:mt-[10rem]  max800:ml-[3rem] "
                />
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden bg-black bg-[linear-gradient(#000000,_#000000)] bg-cover bg-50%_50% bg-blend-normal bg-no-repeat relative flex flex-col justify-end items-end pt-48 pb-32 px-[111px] rounded-br-[80px] rounded-bl-[80px] max850:h-[30rem] max1050:h-[30rem]">
            <div className="text-center text-[3rem] font-['Inter'] font-bold text-white absolute top-48 left-[147px] h-20 w-1/6 max1250:text-[2.5rem] max1250:w-[30rem] max800:pr-[6rem] max800-center max1250:pr-[15rem] max1320:w-[20rem] max1320:pr-20 ">
              Our{" "}
              <div
                id="OurTeam"
                className="leading-[85px] text-[#30afbc] contents max1050:text-[2.5rem]"
              >
                Team
              </div>
            </div>
            <div className="text-sm font-['Inter'] leading-[18px] text-white absolute top-[311px] left-[147px] h-12 w-2/5 max800:w-[20rem] max800-center">
              Crafting Dreams into Code: Where Diverse Minds, Code
              Craftsmanship, AWS Mastery, and Small Business Advocacy Converge.
              Channeling Innovation: We're the Team that Dreams, Designs, and
              Deploys, United for Your Success.
            </div>

            <img
              src={line1}
              id="Line"
              className="line1 w-[831px] h-[504px] absolute top-0 left-[293px]"
              alt=""
            />
            <img
              src={line2}
              id="Line1"
              className="line1 w-[504px] h-[504px] absolute top-0 left-[786px]"
              alt=""
            />
            <img
              src={img1}
              id="All3"
              className="img1 relative hidden md:block "
              alt=""
            />
          </div>
        </div>
      </div>

      {/* <div class="flex flex-col md:flex-row md:justify-center items-center">
  
  <div class="relative flex flex-col w-64 shrink-0 items-center pb-20 px-6 md:mx-2">
    <div class="w-64 h-32 bg-[#7ccad7] absolute top-[144px] left-0" />
    <img
      src={}
      id="Ellipse"
      class="relative"
      alt=''
    />
  </div>


  <div class="relative flex flex-col w-64 shrink-0 items-center pb-20 px-6 md:mx-2">
    <div class="w-64 h-32 bg-[#7ccad7] absolute top-[144px] left-0" />
    <img
      src={}
      id="Ellipse1"
      class="relative"
      alt=''
    />
  </div>
</div> */}
      <div ref={ref} className="max850:flex max850:justify-center relative">
        {inView && (
          <motion.div
            className="grid grid-cols-1 max670:grid-cols-2 sm:grid-cols-3 max850:grid-cols-3 max850:px-[1rem] md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-4 mr-2 md:px-[7rem] pb-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {teamMembers.map((member, index) => (
              // <motion.div
              //   key={index}
              //   className="relative flex flex-col items-center border border-gray-200 rounded-lg p-2 md:p-4 hover:bg-[#30AFBC] hover:scale-105 transition-transform duration-300  hover:text-white"
              //   variants={memberVariants}
              //   whileHover={flipVariants}
              // >
              <motion.div
                key={index}
                className="custom-box-shadow relative flex flex-col items-center border border-gray-200 rounded-lg p-2 md:p-4 transition-transform duration-300"
                variants={memberVariants}
                whileHover={flipVariants}
                // style={{ boxShadow: "0 0 0 0 transparent", transition: "box-shadow 0.3s ease" }}
                // onMouseEnter={(e) => e.target.style.boxShadow = "0 0 10px 5px #30AFBC"}
                // onMouseLeave={(e) => e.target.style.boxShadow = "0 0 0 0 transparent"}
              >
                <img
                  src={member.imageSrc}
                  alt={member.name}
                  className="h-24 w-24 object-cover rounded-full border-2 border-[#7ccad7]"
                  style={{ boxShadow: "0 0 0 0 transparent" }}
                />
                <div className="mt-2 md:mt-3 text-center">
                  <h3
                    className="text-md md:text-lg font-semibold"
                    style={{ boxShadow: "0 0 0 0 transparent" }}
                  >
                    {member.name}
                  </h3>
                  <p
                    className="text-xs md:text-sm "
                    style={{ boxShadow: "0 0 0 0 transparent" }}
                  >
                    {member.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      <FOOTER />
    </div>
  );
};

export default TeamPage;