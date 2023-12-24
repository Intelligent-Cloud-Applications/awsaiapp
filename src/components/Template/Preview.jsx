import React from 'react';
import Navbar1 from './Preview/Navbar1';
import Home1 from './Preview/Home1';

const Preview = ({ handleNextSection, handlePrevSection, currentSection }) => {
    return (
        <div style={{ position: 'relative', boxShadow:'30px 0 0 #0000' }}>
            <div className=" flex w-[65%] h-screen  bg-[#30AFBC] relative item-center">
                {currentSection === 0 && <Navbar1 />}
                {currentSection === 1 && <Home1 />}
            </div>
        </div>
    );
}

export default Preview;
