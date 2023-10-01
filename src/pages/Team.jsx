import React from 'react';
import Navbar from "../components/Home/Navbar";
import FOOTER from "../components/Home/Footer";
import Harsh from'../utils/team/Harsh.png';
import Sambhunath from'../utils/team/Sambhunath.png';
import Shreetam from'../utils/team/Shreetam.png';
import Bikash from'../utils/team/Bikash.png';
import Subham from'../utils/team/Subham.png';
import Santosh from'../utils/team/Santosh.png';
import Ananta from'../utils/team/Ananta.png';
import Avishek from'../utils/team/Avishek.png';
import Bhabesh from'../utils/team/Bhabesh.png';
import Lokanath from'../utils/team/Lokanath.png';
import Soumya from'../utils/team/Soumya.png';
import Rohit from'../utils/team/Rohit.png';
import Akash from'../utils/team/Akash.png';
import Jogalaxmi from'../utils/team/Jogalaxmi.png';
import Anchal from'../utils/team/Anchal.png';
import Sanjita from'../utils/team/Sanjita.png';
import line1 from '../utils/Line 16.svg';
import line2 from '../utils/Line 17.svg';
import img1 from '../utils/hackathon/img1.png';
// import img2 from '../utils/hackathon/img2.png';
import img3 from '../utils/hackathon/img3.png';
import img4 from '../utils/hackathon/img4.png';
// import img5 from '../utils/hackathon/img5.png';
// import img6 from '../utils/hackathon/img6.png';
// import img7 from '../utils/hackathon/img7.png';
import img8 from '../utils/hackathon/img8.png';
import "./Team.css";

const teamMembers = [
  {
    name: 'Harsh Kesari',
    role: 'Full-Stack Developer (TL)',
    imageSrc: Harsh, 
  },
  {
    name: 'Avishek Mishra',
    role: 'Full-Stack Developer',
    imageSrc: Avishek, 
  },
  {
    name: 'Bhabesh Pradhan',
    role: 'Full-Stack Developer',
    imageSrc: Bhabesh, 
  },
  {
    name: 'Sambhunath Meher',
    role: 'Full-Stack Developer',
    imageSrc: Sambhunath, 
  },

  {
    name: 'Bikash Marandi',
    role: 'UI/UX Designer (TL)',
    imageSrc: Bikash, 
  },
  {
    name: 'Santosh Pati',
    role: 'UI/UX Designer',
    imageSrc: Santosh, 
  },
  {
    name: 'Shreetam Mishra',
    role: 'UI/UX Designer',
    imageSrc: Shreetam, 
  },
  {
    name: 'Ananta Nag',
    role: 'UI/UX Designer',
    imageSrc: Ananta, 
  },
  {
    name: 'Lokanath Panda',
    role: 'DSA Team (TL)',
    imageSrc: Lokanath, 
  },
  {
    name: 'Subham Mallik',
    role: 'DSA Team (TL)',
    imageSrc: Subham, 
  },
  {
    name: 'Akash Kumar Panda',
    role: 'DSA Team',
    imageSrc: Akash, 
  },
  {
    name: 'Rohit Kumar Barada',
    role: 'DSA Team',
    imageSrc: Rohit, 
  },
  {
    name: 'Soumya Ranjan Sahu',
    role: 'DevOps Team (TL)',
    imageSrc: Soumya, 
  },
  {
    name: 'Jogalakshmi Rath',
    role: 'DevOps Team (TL)',
    imageSrc: Jogalaxmi, 
  },
  {
    name: 'Anchal Mahana',
    role: 'DevOps Team',
    imageSrc: Anchal, 
  },
  {
    name: 'Sanjita Nayak',
    role: 'DevOps Team',
    imageSrc: Sanjita, 
  },
];

const TeamPage = () => {
  return (
<div>
<Navbar />


     
<div className="relative flex flex-col pb-[482px] ">
    <div className="w-full h-[446px] overflow-hidden bg-[rgba(48,_175,_188,_0.7)] absolute top-[400px] left-0 flex flex-row justify-between items-center pb-20 pl-12 pr-24 rounded-br-[80px] rounded-bl-[80px] ">
      <div className="flex flex-col gap-16 w-2/3 items-end">
        <div className="text-center text-3xl font-['Inter'] font-semibold leading-[26px] w-1/2 mt-[8rem] max800:text-[1rem]">
          Your Dreams are Full Filled Here !
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
     <div className=" wrapper1 self-stretch flex flex-row justify-between mr-20 items-start gap-[10rem]">
                <img
                  src={img4}
                  alt=""
                  className="team3 w-[100%] md:w-[27rem] rounded-[10px] max800:mt-[10rem] max800:ml-[3rem]"
                />
                <img
                  src={img3}
                  alt=""
                  className="team2 w-[100%] md:w-[28.5rem] rounded-[10px] max800:mt-[10rem]  max800:ml-[3rem]"
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
  <div className="overflow-hidden bg-black bg-[linear-gradient(#000000,_#000000)] bg-cover bg-50%_50% bg-blend-normal bg-no-repeat relative flex flex-col justify-end items-end pt-48 pb-32 px-[111px] rounded-br-[80px] rounded-bl-[80px] max800:h-[30rem]">
  
  <div className="text-center text-[3rem] font-['Inter'] font-bold text-white absolute top-48 left-[147px] h-20 w-1/6 max1000:text-[1.5rem] max800:w-[30rem] max800:pr-[6rem] max800-center ">
    Our{" "}
    <div id="OurTeam" className="leading-[85px] text-[#30afbc] contents">
      Team
    </div>
  </div>
  <div className="text-sm font-['Inter'] leading-[18px] text-white absolute top-[311px] left-[147px] h-12 w-2/5 max800:w-[20rem] max800-center">
    Crafting Dreams into Code: Where Diverse Minds, Code Craftsmanship, AWS Mastery, and Small Business Advocacy Converge. Channeling Innovation: We're the Team that Dreams, Designs, and Deploys, United for Your Success.
  </div>


    <img
      src={line1}
      id="Line" 
      className="line1 w-[831px] h-[504px] absolute top-0 left-[293px]"
      alt=''
    />
    <img
      src={line2}
      id="Line1"
      className="line1 w-[504px] h-[504px] absolute top-0 left-[786px]"
      alt=''
    />
    <img
      src={img1}
      id="All3"
      className="relative hidden md:block"
      alt=''
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


{/* //Team member */}
    <div className='max850:flex max850:justify-center relative  '>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4  mr-2 lg:ml-[7rem] md:p-[3rem] ">
  {teamMembers.map((member, index) => (
    <div key={index} className="relative flex flex-col w-48 items-center pb-20 px-6 max800:gap-3">
      <div className="w-48 h-32 bg-[#7ccad7] absolute top-24 left-0 right-0 mx-auto flex flex-col justify-end pt-20 pb-10 px-8">
        <div className="text-center font-['Inter'] font-medium leading-[30px] absolute top-16 left-5 right-5 h-16 w-[10rem]">
          {member.name}
          <br />
          <div className="text-xs leading-[25px] contents">{member.role}</div>
        </div>
        <div className="border-solid relative mr-px h-px shrink-0 border-t border-b-0 border-black border-x-0" />
      </div>
      <img src={member.imageSrc} className="relative" alt={member.name} />
    </div>
  ))}
</div>
    </div>
  <FOOTER />
    </div>
  );
};

export default TeamPage;