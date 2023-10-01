// import React from 'react';
// import Navbar from "../components/Home/Navbar";
// import FOOTER from "../components/Home/Footer";
// import Harsh from'../utils/team/Harsh.png';
// import Sambhunath from'../utils/team/Sambhunath.png';
// import Shreetam from'../utils/team/Shreetam.png';
// import Bikash from'../utils/team/Bikash.png';
// import Subham from'../utils/team/Subham.png';
// import Santosh from'../utils/team/Santosh.png';
// import Ananta from'../utils/team/Ananta.png';
// import Avishek from'../utils/team/Avishek.png';
// import Bhabesh from'../utils/team/Bhabesh.png';
// import Lokanath from'../utils/team/Lokanath.png';
// import Soumya from'../utils/team/Soumya.png';
// import Rohit from'../utils/team/Rohit.png';
// import Akash from'../utils/team/Akash.png';
// import Jogalaxmi from'../utils/team/Jogalaxmi.png';
// import Anchal from'../utils/team/Anchal.png';
// import Sanjita from'../utils/team/Sanjita.png';
// import line1 from '../utils/Line 16.svg'
// import line2 from '../utils/Line 17.svg'


// const teamMembers = [
//   {
//     name: 'Harsh Kesari',
//     role: 'Full-Stack Developer (TL)',
//     imageSrc: Harsh, 
//   },
//   {
//     name: 'Avishek Mishra',
//     role: 'Full-Stack Developer',
//     imageSrc: Avishek, 
//   },
//   {
//     name: 'Bhabesh Pradhan',
//     role: 'Full-Stack Developer',
//     imageSrc: Bhabesh, 
//   },
//   {
//     name: 'Sambhunath Meher',
//     role: 'Full-Stack Developer',
//     imageSrc: Sambhunath, 
//   },

//   {
//     name: 'Bikash Marandi',
//     role: 'UI/UX Designer (TL)',
//     imageSrc: Bikash, 
//   },
//   {
//     name: 'Santosh Pati',
//     role: 'UI/UX Designer',
//     imageSrc: Santosh, 
//   },
//   {
//     name: 'Shreetam Mishra',
//     role: 'UI/UX Designer',
//     imageSrc: Shreetam, 
//   },
//   {
//     name: 'Ananta Nag',
//     role: 'UI/UX Designer',
//     imageSrc: Ananta, 
//   },
//   {
//     name: 'Lokanath Panda',
//     role: 'DSA Team (TL)',
//     imageSrc: Lokanath, 
//   },
//   {
//     name: 'Subham Mallik',
//     role: 'DSA Team (TL)',
//     imageSrc: Subham, 
//   },
//   {
//     name: 'Akash Kumar Panda',
//     role: 'DSA Team',
//     imageSrc: Akash, 
//   },
//   {
//     name: 'Rohit Kumar Barada',
//     role: 'DSA Team',
//     imageSrc: Rohit, 
//   },
//   {
//     name: 'Soumya Ranjan Sahu',
//     role: 'DevOps Team (TL)',
//     imageSrc: Soumya, 
//   },
//   {
//     name: 'Jogalakshmi Rath',
//     role: 'DevOps Team (TL)',
//     imageSrc: Jogalaxmi, 
//   },
//   {
//     name: 'Anchal Mahana',
//     role: 'DevOps Team',
//     imageSrc: Anchal, 
//   },
//   {
//     name: 'Sanjita Nayak',
//     role: 'DevOps Team',
//     imageSrc: Sanjita, 
//   },
// ];

// const TeamPage = () => {
//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4  md:ml-24 mr-2 md:mr-[110px]">
//   {teamMembers.map((member, index) => (
//     <div key={index} className="relative flex flex-col w-48 items-center pb-20 px-6">
//       <div className="w-48 h-32 bg-[#7ccad7] absolute top-24 left-0 right-0 mx-auto flex flex-col justify-end pt-20 pb-10 px-8">
//         <div className="text-center font-['Inter'] font-medium leading-[30px] absolute top-16 left-5 right-5 h-16">
//           {member.name}
//           <br />
//           <div className="text-xs leading-[25px] contents">{member.role}</div>
//         </div>
//         <div className="border-solid relative mr-px h-px shrink-0 border-t border-b-0 border-black border-x-0" />
//       </div>
//       <img src={member.imageSrc} className="relative" alt={member.name} />
//     </div>
//   ))}
// </div>


//   );
// };

// export default TeamPage;