import React from "react";
import Faq from "react-faq-component";
import "./Faq.css";
import plus from "../../utils/plus.svg";

const data = {                                               
  rows: [
    {
      title: "  How do I connect with your website development team?",
      content: `Connecting with our website development team is easy! Simply fill out the form on our website and pay the first month's fee. Our team will get to work on developing a prototype of your website within 15 days of receiving your completed form. Once the prototype is approved, we will work to have your website fully developed and ready to launch within a month.`,
    },
    {
      title: "What if I want changes made to my website after it has launched?",
      content: `We offer ongoing website maintenance and support services to our clients. If you need changes made to your website after it has launched, simply contact our team and we will work with you to make the necessary updates.`,
    },
    {
      title: "Do you offer website hosting services?",
      content: `Yes, we offer website hosting services to our clients. Our hosting services include website backups, security updates, and ongoing support to ensure that your website is always up and running smoothly.`,
    },
    {
      title: " What if I have questions during the website development process?",
      content: `We pride ourselves on providing excellent customer service and support to our clients. If you have any questions or concerns during the website development process, simply reach out to our team and we will be happy to assist you.`,
    },
  ],
};

const styles = {
  bgColor: "#ffffff",
  rowTitleColor: "#151618",
  rowContentColor: "#555555",
  arrowColor: "#30AFBC",
};

const config = {
  animate: true,
  arrowIcon: <img className="" src={plus} alt="Arrow" />,
  tabFocus: true,
  arrowColor:"#30AFBC"
};

export default function FAQ() {
  return (
    
      <div className="home-faq flex flex-col  items-center justify-center gap-[5rem] max800:py-[20rem] h-[100vh]">
      <div className=" flex flex-col p-[2rem] max800:px-[5rem]">
      <div className="rounded-6xl box-border w-[18.88rem] h-[3.06rem] shrink-0 flex flex-row  items-center justify-center">
        <div className="flex flex-row p-[0.53rem] items-center justify-center">
          <div className="relative textfont font-bold text-[4rem] max600:text-[2rem]">
            FAQs
          </div>
        </div>
      </div>
    </div>

        <Faq data={data} styles={styles} config={config} className="FAQ"/>
      </div>
    
  );
}