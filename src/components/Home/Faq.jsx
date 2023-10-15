import {React, useState} from "react";
import Faq from "react-faq-component";
import "./Faq.css";
import plus from "../../utils/plus.svg";
import one from "../../utils/Assets/01.png";
import two from "../../utils/Assets/02.png";
import three from "../../utils/Assets/03.png";
import four from "../../utils/Assets/04.png";
import minus from "../../utils/minus.png";

const data = {
  rows: [
    {
      title: (
        <div className="flex items-center">
        <img className="w-10 max600:w-8 max-h-[100%] mr-3" src={one} alt="" />
        <span className="flex">
        How do I connect with your website development team?
        </span>
      </div>
      ),
      content: 
      `Connecting with our website development team is easy! Simply fill out the form on our website and pay the first month's fee. Our team will get to work on developing a prototype of your website within 15 days of receiving your completed form. Once the prototype is approved, we will work to have your website fully developed and ready to launch within a month.`,
    },
    {
      title: (
        <div className="flex items-center">
        <img className="w-10 max600:w-8 max-h-[100%] mr-3" src={two} alt="" />
        <span className="flex-grow">
        What if I want changes made to my website after it has launched?
        </span>
      </div>
      ),
      content: `We offer ongoing website maintenance and support services to our clients. If you need changes made to your website after it has launched, simply contact our team and we will work with you to make the necessary updates.`,
    },
    {
      title: (
        <div className="flex items-center">
          <img className="w-10 max600:w-8 max-h-[100%] mr-3" src={three} alt="" />
          <span className="flex-grow">
            Do you offer website hosting services?
          </span>
        </div>
      ),
      content: `Yes, we offer website hosting services to our clients. Our hosting services include website backups, security updates, and ongoing support to ensure that your website is always up and running smoothly.`,
    },
    {
      title: (
        <div className="flex items-center">
        <img className="w-10 max600:w-8 max-h-[100%] mr-3" src={four} alt="" />
        <span className="flex-grow">
        What if I have questions during the website development process?
        </span>
      </div>
      ),
      content: `We pride ourselves on providing excellent customer service and support to our clients. If you have any questions or concerns during the website development process, simply reach out to our team and we will be happy to assist you.`,
    },
  ],
};



export default function FAQ() {

  const [openRows, setOpenRows] = useState([]); // Maintain state for open rows

  const toggleRow = (index) => {
    if (openRows.includes(index)) {
      // Row is open, so close it
      setOpenRows(openRows.filter((item) => item !== index));
    } else {
      // Row is closed, so open it
      setOpenRows([...openRows, index]);
    }
  };

  const styles = {
    bgColor: "#ffffff",
    rowTitleColor: "#151618",
    rowContentColor: "#555555",
    arrowColor: "#30AFBC",
  };
  
  const config = {
    animate: true,
    tabFocus: true,
  };

  return (
    <div className="home-faq flex flex-col items-center justify-center gap-[5rem] max800:py-[20rem] mb-20">
      <div className=" flex flex-col p-[2rem] max800:px-[5rem]">
        <div className="rounded-6xl box-border w-[18.88rem] h-[3.06rem] shrink-0 flex flex-row items-center justify-center">
          <div className="flex flex-row p-[0.53rem] items-center justify-center">
            <div className="relative textfont font-bold text-[4rem] max600:text-[2rem]">
              FAQs
            </div>
          </div>
        </div>
      </div>
      {/* <Faq data={data} styles={styles} config={config} className="FAQ" />? */}
      <Faq
        data={data}
        styles={styles}
        config={config}
        className="FAQ"
        arrowIcon={(props) => (
          <img
            className="h-[1.5rem] max1008:h-[1rem]"
            src={openRows.includes(props.index) ? minus : plus}
            alt={openRows.includes(props.index) ? "Minus" : "Plus"}
            onClick={() => toggleRow(props.index)}
          />
        )}
      />
    </div>
  );
};