import React from "react";

import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";

import yellow_star from "../../Utils/Assests/yellow star.png";
import Rtigers from "../../Utils/AWS/Logo/Logo.svg";
import Bworkz from "../../Utils/AWS/Logo/bworkz.png";
import happyprancer from "../../Utils/AWS/Logo/happyprancer.png";

import "./Testimonial.css";
import { useState } from "react";

const Testimonial = () => {
  
  const testi2 = {
    src: Rtigers,
    name: "Happy Prancer",
    description:
    "The Intelligent Cloud Applications team did an outstanding job understanding our online gym site requirements and creating a perfect home page and functional dashboard. We were impressed with their ability to grasp our needs and deliver a solution that exceeded our expectations. ",
  };
  const testi3 = {
    src: Bworkz,
    name: "R-Tigers",
    description:
    "The young team of developers did an exceptional job in building a website for our dance studio that caters to our marketing needs while efficiently managing our class schedules and member payments. They took the time to visit our studio, understand our requirements, and then developed the website precisely to our needs. We were impressed by their dedication and willingness to go the extra mile to ensure that we were satisfied with the end product. Overall, we are delighted with the website they have created for us.",
  };
  const testi4 = {
    src: happyprancer,
    name: "BWORKZ",
    description:
    " AWSAIAPP has done an excellent job creating a website design that effectively manages class schedules, displays class recordings, choreographies, and streamlines member subscription and attendance. Their ability to make custom changes was impressive, and they promptly responded to any queries. Overall, their work on the website was outstanding.",
  };
 
  const [testimonials, setTestimonials] = useState([
    
    testi2,
    testi3,
    testi4,
    
  ]);

  const styles = [ "ecllip2", "ecllip3", "ecllip4", ];

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
    <div className="RussoOne max500:h-[auto] z-10  ">
    <div className=" Background_Test flex flex-col item-center pb-10 ">
    <h1 className=" Test-text text-white-250 max478:text-white-[4rem]">
    TESTIMONIAL
    </h1>
    <div className="">
    <div className=""> 
        

    <ul className="feedback ">
    <div className="absolute w-screen flex justify-center flex-col min-h-[15rem] ">
        </div>
            {testimonials.map((test, i) => {
              return (
                <li key={styles[i]}>
                  <img src={test.src} alt="" className={styles[i]} />
                </li>
              );
            })}
            <BsArrowLeftCircle
            color="white"
            size={"2rem"}
            className="absolute left-16 cursor-pointer max536:left-6 max500:left-2 max406:h-[1.5rem]"
            onClick={leftClicked}
            />
            <BsArrowRightCircle
              color="white"
              size={"2rem"}
              className="absolute right-16  cursor-pointer max536:right-6 max500:right-2 max406:h-[1.5rem]"
              onClick={rightClicked}
            />
          </ul>
        </div>
        <h1 className="mona h-[auto] w-[100%]">{testimonials[2].name}</h1>
        <div className="flex relative z-2 object-cover  justify-center max1050:pl-8 max1050:pr-8 ">
          <h2 className="text-[1rem]  z-2 des text-white w-[45rem] max800:text-[1rem] py-[2rem] max478:text-[0.9rem] text-center font-sans"><span className="text-[1.4rem]">"</span>
            {testimonials[2].description} <span className="text-[1.4rem]">"</span>
          </h2>
        </div>

        
    </div>
    
    
   
      </div>
    </div>
    );
  };
  
export default Testimonial;
