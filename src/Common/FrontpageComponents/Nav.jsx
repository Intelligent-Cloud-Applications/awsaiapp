import React from 'react';
import cartIcon from '../utils/cart.png';

function Nav({ institution, setActiveComponent, activeComponent }) {
  console.log("Props in Nav:", { institution, setActiveComponent, activeComponent });

  const handleBackClick = () => {
    const newWindow = window.open('https://happyprancer.com/', '_blank');
    if (newWindow) newWindow.focus();
    window.close();
  };

  const handleCartClick = () => {
    setActiveComponent('Cart');
  };

  const handleAllPaymentsClick = () => {
    setActiveComponent('AllPayment');
  };

  return (
    <div>
      <div className='bg-[#111111] w-full p-3 flex items-center justify-between absolute z-10'>
        <div className='flex gap-1 cursor-pointer' onClick={handleBackClick}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          <span className='text-[#e2e2e2] inter font-[300] max600:hidden'>back to {institution}</span>
        </div>
        <div className='flex items-center cursor-pointer gap-2'>
          <div className={'flex hover:bg-[#1e4b46] rounded-full cursor-pointer max600:-mb-2 max600:-mr-4' + (activeComponent === 'AllPayment' ? 'bg-[#1e4b46]' : '')} onClick={handleAllPaymentsClick}>
            <div className='text-[#cacaca] font-[500] py-2 px-4 inter cursor-pointer max600:text-[0.8rem]'>ALL PLANS</div>
          </div>
          <div className='flex items-end cursor-pointer' onClick={handleCartClick}>
            <img src={cartIcon} alt="Cart" />
            <div className={' font-[500] text-sm -ml-3 inter cursor-pointer ' + (activeComponent === 'Cart' ? 'text-[#30726a]' : 'text-[#cacaca]')}>CART</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nav;
