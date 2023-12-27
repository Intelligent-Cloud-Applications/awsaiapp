import React from "react";
import image1 from "../../../utils/Template/section1-items/section-1-item-1.png";
import image2 from "../../../utils/Template/section1-items/section-1-item-2.png";
import image3 from "../../../utils/Template/section1-items/section-1-item-3.png";

const Home2 = ({ servicesData }) => {
    const defaultimage = [
        { image: image1 },
        { image: image2 },
        { image: image3 },
    ];
    const defaultData = [
        {
            heading: "Stay Home Stay Fit",
            paragraph: "Free online classes via Google meet/Zoom for continuous workout.",
        },
        {
            heading: "Instructor Led Classes",
            paragraph: "Online classes are conducted by Zumba Internationally Certified instructors.",
        },
        {
            heading: "Personal & Group Exercise",
            paragraph: "Personal (person-to-person trainer based) and Group exercise with friends.",
        },
    ];

    const items = servicesData.length > 0 ? servicesData.slice(0) : defaultData;
    

    return (
        <>
            <div className="bg-white flex justify-center flex-col items-center min-h-[20vh] max850:h-auto fixed w-[78%] ml-[7.56%] py-12 relative">
                <h3 className="text-[#999999] font-semibold text-[0.5rem]">A Fitness Movement</h3>
                <h4 className="text-[#131212d8] font-semibold text-[1.5rem]">Why HAPPYPRANCER ?</h4>
                <div>
                    <ul className="flex justify-center flex-row items-center gap-5 text-[0.8rem] max1250:gap-2 max1250:flex-col">
                        {items.map((item, index) => (
                            <li key={index} className="flex flex-col items-center w-[12rem]">
                                <img
                                    src={item.image || defaultimage[index].image}
                                    alt=""
                                    className="w-[110px] h-[80px] object-contain"
                                />
                                <>
                                    <h5>{item.heading}</h5>
                                    <p className="text-center">{item.paragraph}</p>
                                </>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}

export default Home2;
