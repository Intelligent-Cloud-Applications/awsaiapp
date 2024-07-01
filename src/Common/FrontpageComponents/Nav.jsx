import React, { useContext } from 'react';
import Context from '../../context/Context';
import colors from '../../color.json';

function Nav({ institution, setActiveComponent, activeComponent }) {
  const { itemCount } = useContext(Context);
  const color = colors[institution];

  const handleBackClick = () => {
    // if (window.confirm("Are you sure you want to close this tab?")) {
    window.close();
    // }
  };


  const handleCartClick = () => {
    setActiveComponent('Cart');
  };

  const handleAllPaymentsClick = () => {
    setActiveComponent('AllPayment');
  };

  const handleContactClick = () => {
    setActiveComponent('contact')
  }

  const handleHistoryClick = () => {
    setActiveComponent('history')
  }


  return (
    <div>
      <div className='bg-[#111111] w-full p-3 flex items-center justify-between absolute z-10'>
        <div className='flex gap-1 cursor-pointer' onClick={handleBackClick}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          <span className='text-[#e2e2e2] inter font-[300] max600:hidden'>back to {institution}</span>
        </div>
        <div className='flex items-center cursor-pointer gap-4 max600:gap-2'>
          <div
            className={` rounded-full cursor-pointer text-[#cacaca] font-[500] py-2 px-4 inter w-[8rem] text-center max600:text-[0.8rem] max600:-mb-2 max600:-mr-4 max600:w-[5rem]`}
            style={activeComponent === 'AllPayment' ? { backgroundColor: color.primary, hover: color.primary } : {}}
            onClick={handleAllPaymentsClick}
          >
            PLANS
          </div>
          <div
            onClick={
              handleContactClick
            }
            className={` rounded-full cursor-pointer text-[#cacaca] font-[500] py-2 px-4 inter text-center max600:text-[0.8rem] max600:-mb-2 max600:-mr-4 max600:w-[8rem]`}
            style={activeComponent === 'contact' ? { backgroundColor: color.primary, hover: color.primary } : {}}
          >
            CONTACT US
          </div>
          <div
            onClick={
              handleHistoryClick
            }
            className={` rounded-full cursor-pointer text-[#cacaca] font-[500] py-2 px-4 inter w-[8rem] text-center max600:text-[0.8rem] max600:-mb-2 max600:w-[5rem]`}
            style={activeComponent === 'history' ? { backgroundColor: color.primary, hover: color.primary } : {}}
          >
            ORDERS
          </div>
          <div className='flex items-end cursor-pointer relative' onClick={handleCartClick}>
            <svg
              className='max600:w-8 max600:-mb-2'
              width="48"
              height="40"
              viewBox="0 0 48 40"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M37.721 25L43.265 11.14L41.367 10.6125L36.279 23.3333H17.721L10.721 5.83334H5V7.50001H9.279L15.929 24.1233L11.461 32.5H39V30.8333H14.539L17.65 25H37.721Z" fill={activeComponent === 'Cart' ? color.primary : "white"} />
              <path d="M20 36.6667C21.1046 36.6667 22 35.9205 22 35C22 34.0795 21.1046 33.3333 20 33.3333C18.8954 33.3333 18 34.0795 18 35C18 35.9205 18.8954 36.6667 20 36.6667Z" fill={activeComponent === 'Cart' ? color.primary : "white"} />
              <path d="M32 36.6667C33.1046 36.6667 34 35.9205 34 35C34 34.0795 33.1046 33.3333 32 33.3333C30.8954 33.3333 30 34.0795 30 35C30 35.9205 30.8954 36.6667 32 36.6667Z" fill={activeComponent === 'Cart' ? color.primary : "white"} />
            </svg>

            {itemCount > 0 && (
              <span
                className={`absolute top-0 text-white rounded-[100%] right-[14px] p-[2px] px-[5px] text-[9px] font-bold bounce max600:right-[7px]`}
                style={{ backgroundColor: color.primary }}
              >
                {itemCount}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nav;