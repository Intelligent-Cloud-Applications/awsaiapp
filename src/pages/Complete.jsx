import React from 'react';
import './Complete.css'; 
import Navbar from '../components/Home/Navbar';

import Timer from './Timer';

const Complete = () => {
  



  return (
    <div className='h-screen'>
      <Navbar />
      <div className="pyro">
        <div className="before"></div>
        <div className="h-screen w-screen flex items-center justify-center">
          <div className="bg-[#30AFBC] h-[15rem] w-[29rem] rounded-md shadow-2xl">
            {/* Pass the fetched timeInSeconds to CountdownTimer */}
            {/* <CountdownTimer timeInSeconds={getTime()} onTimerExpire={handleTimerExpire} /> */}
            <Timer />
          </div>
        </div>
        <div className="after"></div>
      </div>
    </div>
  );
};

export default Complete;
