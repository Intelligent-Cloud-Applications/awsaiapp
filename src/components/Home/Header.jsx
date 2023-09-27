import React from 'react';
import './Header.css'; // You'll need to create this CSS file for styling.

const Header = () => {
  return (
    <div className="showed bg-blue-500 h-screen flex justify-center items-center">
     <div className='flex flex-col w-[40vw] h-[100vh] justify-center align-center'>
      <h1 className="text-6xl text-white text-[3rem]">Unlock Your Business Potential with</h1>
      <p className="text-xl text-white mt-4">
      We are your strategic partners, offering intelligent cloud apps, digital marketing, personalised dashboard and secure payment solutions.
      </p>
      <button className="w-[10vw] bg-white text-black font-bold hover:bg-blue-500 hover:text-white px-6 py-2 mt-8 rounded-full text-[1.2rem]">
        Get Started
      </button>
     </div>
     <div className='heropic flex w-[40vw] h-[80vh]'></div> 
    </div>
  );
};

export default Header;
