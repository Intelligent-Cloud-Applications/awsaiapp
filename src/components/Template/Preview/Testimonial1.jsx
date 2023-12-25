import React from "react";

import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";

import yellow_star from "../../../utils/Template/yellow star.png";
import BapujiPng from "../../../utils/Template/Testimonial/Bapuji_Mallik.png";
import MonalishaPng from "../../../utils/Template/Testimonial/Monalisha_Sahoo.png";
import "./Testimonial1.css";
import { useState } from "react";

const Testimonial1 = () => {
    const testi1 = {
        src: MonalishaPng,
        name: "Monalisha Sahoo",
        description:
            "Honestly speaking at 1st it seemed little bit difficult Bt when I used to go regularly I came to knew it is the best way to workout. If u guys really want to improve your fitness then must step forward to happy prancer and I promise u will never regret once... Best platform to go through basics.. 💃💃",
    };
    const testi2 = {
        src: BapujiPng,
        name: "Bapuji Mallik",
        description:
            "If you're new to exercise, you aren't sure what types of exercise you like, or you feel intimidated when walking into a new workout environment, online training is an excellent reprieve from the traditional gym or studio.According to me dance is the best fitness and workout where you never get bored,dance is the fun way to express yourself so yes this platform will give you such experience. Every session is mind blowing. Quality is awesome. Trainers are best.It is easy to learn for from  beginners to advanced. Motivation by the trainers and their coaching can't be described by words.Trainers are really comes with utmost positivity throughout the session.its been a good journey with happyprancers.\nThank you happyprancer",
    };
    
    // {/*                Profile pics state                 */ }
    const [testimonials, setTestimonials] = useState([
        testi1,
        testi2,
    ]);

    const styles = ["ecllip4", "ecllip3"];

    const leftClicked = () => {
        setTestimonials((testi) => {
            const tempTesti = [];
            const firstTesti = testi.pop();

            tempTesti.push(firstTesti);

            testi.map((ts, i) => {
                tempTesti.push(ts);
                return ts;
            });

            return tempTesti;
        });
    };

    const rightClicked = () => {
        setTestimonials((testi) => {
            const tempTesti = [];
            const firstTesti = testi.slice(0, 1);

            testi.map((ts, i) => {
                if (i !== 0) {
                    tempTesti.push(ts);
                }
                return ts;
            });

            tempTesti.push(firstTesti[0]);

            return tempTesti;
        });
    };

    return (
        <div className="sans-sarif ml-[7.56%] max500:h-[20rem] max700:h-[40rem] size w-[78%]">
            <div className="Test-size bg-black py-[0.2rem] flex flex-col item-center">
                <h1 className=" Test-text m-2 text-white-250 max478:text-white-[4rem] font-bold">
                    TESTIMONIAL
                </h1>
                <div className=" m-0 p-0">
                    <div className="">
                        <ul className="feedback">
                            {testimonials.map((test, i) => {
                                return (
                                    <li key={styles[i]}>
                                        <img src={test.src} alt="" className={styles[i]} />
                                    </li>
                                );
                            })}
                            <BsArrowLeftCircle
                                color="white"
                                size={"1.5rem"}
                                className="absolute left-40 cursor-pointer max536:left-6 max500:left-2 max406:h-[1.5rem]"
                                onClick={leftClicked}
                            />
                            <BsArrowRightCircle
                                color="white"
                                size={"1.5rem"}
                                className="absolute right-40 cursor-pointer max536:right-6 max500:right-2 max406:h-[1.5rem] mr-[8%]"
                                onClick={rightClicked}
                            />
                        </ul>
                    </div>
                    <h1 className="mona h-[4.5rem] w-[100%] font-[400] " style={{ fontSize: '1.5rem' }}>{testimonials[1].name}</h1>
                    <div className="flex relative z-2 object-cover  justify-center max1050:pl-8 max1050:pr-8">
                        <h2 className="text-[1rem] z-2 pt-4  text-white w-[50rem] max478:text-[0.75rem] text-center font-sans" style={{ letterSpacing: '1.2px' }}>
                            <span className=" text-[1.2rem]">"</span>
                            {testimonials[1].description}
                            <span className="text-[1.2rem]">"</span>
                        </h2>

                    </div>

                    <div className="flex justify-center item-center mt-1">
                        <img
                            src={yellow_star}
                            className="h-[1.5rem] mt-[0.5rem] max800:mt-[0.3rem] max800:h-[1.5rem] max406:h-[1rem]"
                            alt=""
                        />
                        <img
                            src={yellow_star}
                            className="h-[1.5rem] mt-[0.5rem] max800:mt-[0.3rem] max800:h-[1.5rem] "
                            alt=""
                        />
                        <img
                            src={yellow_star}
                            className="h-[1.5rem] mt-[0.5rem] max800:mt-[0.3rem] max800:h-[1.5rem] "
                            alt=""
                        />
                        <img
                            src={yellow_star}
                            className="h-[1.5rem] mt-[0.5rem] max800:mt-[0.3rem] max800:h-[1.5rem] "
                            alt=""
                        />
                        <img
                            src={yellow_star}
                            className="h-[1.5rem] mt-[0.5rem] max800:mt-[0.3rem] max800:h-[1.5rem]  "
                            alt=""
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Testimonial1;
