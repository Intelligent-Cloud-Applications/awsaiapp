import React, { useState } from 'react';
import Arrow from "../utils/Assets/common_icon.png";

const Common = () => {
    const arrowStyle = {
        width: '30px',  // Set the desired width
        height: '30px', // Set the desired height
        position: 'absolute',
    };

    const [isPanelOpen, setIsPanelOpen] = useState(false);

    const togglePanel = () => {
        setIsPanelOpen(!isPanelOpen);
    };

    const containerStyle = {
        width: isPanelOpen ? '200px' : '20px', 
        transition: 'width 0.3s ease', // Add a transition effect for the container width
        position: 'relative',
    };

    const panelStyle = {
        background:'white',
        width: '200px', // Set the width of the panel
        position: 'relative',
        left: isPanelOpen ? '40px' : '-170px', // Adjust the initial left position to hide the panel
        top: '0',
        height: '100%',
        transition: 'left 0.3s ease', // Add a transition effect for the left position
        boxShadow: '2px 2px 4px #353535',
        borderRadius:'10px',
    };

    return (
        <div className="flex flex-row" style={containerStyle}>
            <div className=' h-[30px] w-[30px] absolute' style={{boxShadow: '2px 2px 4px #353535', borderTopRightRadius: '10px', borderBottomRightRadius: '10px'}}>
                <img
                    src={Arrow}
                    alt="arrow"
                    style={arrowStyle}
                    className="p-2 cursor-pointer"
                    onClick={togglePanel}
                />
            </div>
            <div style={panelStyle}>
                <ul className='gap-6 p-4 sty'>
                    <li><a href="/User_interface">User interface & User experience</a></li>
                    <li><a href="/Personalization">Personalization</a></li>
                    <li><a href="/identity">Login And identity managment</a></li>
                    <li><a href="/trade">Trade Specific features</a></li>
                    <li><a href="/coustmer">Leads & customer tracking</a></li>
                    <li><a href="/payment">Payments</a></li>
                </ul>
            </div>
        </div>
    );
};

export default Common;
