import React from 'react';
import image1 from '../../../utils/Template/section1-items/section-1-item-1.png';
import image2 from '../../../utils/Template/section1-items/section-1-item-2.png';
import image3 from '../../../utils/Template/section1-items/section-1-item-3.png';

const Home2 = ({ services, src_Components_Home_Header3__h1, src_Components_Home_Header3__h2 }) => {
    // Default data in case services data is not provided or incomplete
    const defaultData = [
        {
            title: 'Stay Home Stay Fit',
            description: 'Free online classes via Google meet/Zoom for continuous workout.',
        },
        {
            title: 'Instructor Led Classes',
            description: 'Online classes are conducted by Zumba Internationally Certified instructors.',
        },
        {
            title: 'Personal & Group Exercise',
            description: 'Personal (person-to-person trainer based) and Group exercise with friends.',
        },
    ];

    // Merge default data with provided services data
    const mergedData = defaultData.map((defaultItem, index) => {
        const serviceItem = services[index] || {};
        return {
            title: serviceItem.title || defaultItem.title,
            description: serviceItem.description || defaultItem.description,
        };
    });

    return (
        <>
            <div className="bg-white flex justify-center flex-col items-center min-h-[20vh] max850:h-auto fixed w-[78%] ml-[7.56%] py-12 relative">
                <h3 className="text-[#999999] font-semibold text-[0.6rem]">
                    {src_Components_Home_Header3__h1 || 'A Fitness Movement'}
                </h3>
                <h4 className="text-[#131212d8] font-semibold text-[1.5rem]">
                    {src_Components_Home_Header3__h2 || 'Why HAPPYPRANCER ?'}
                </h4>
                <div>
                    <ul className="flex justify-center flex-row items-center gap-5 text-[0.8rem] max1250:gap-2 max1250:flex-col">
                        {mergedData.map((item, index) => (
                            <li key={index} className="flex flex-col items-center w-[12rem] ">
                                <img
                                    src={index === 0 ? image1 : index === 1 ? image2 : image3}
                                    alt=""
                                    className="w-[110px] h-[80px] object-contain"
                                />
                                <h5>{item.title}</h5>
                                <p className="text-center">{item.description}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Home2;
