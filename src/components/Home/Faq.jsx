import React from "react";
import Faq from "react-faq-component";
import "./Faq.css";

const data = {                                               
  rows: [
    {
      title: "  How do I connect with your website development team?",
      content: `Online Instructor led dance fitness community`,
    },
    {
      title: "What if I want changes made to my website after it has launched?",
      content: `HappyPrancer's mission is to bring dance as fitness activity and performance to people. And through dance, to create healthier people and more integrated communities.`,
    },
    {
      title: "Do you offer website hosting services?",
      content: `Currently, Indian members can enjoy a special discount and join Happyprancer Live Zumba sessions for just ₹499 per month, while international users can join for $12 per month.`,
    },
    {
      title: " What if I have questions during the website development process?",
      content: `If you're passionate about dance and interested in becoming a Happyprancer instructor, simply send us an email at admin@happyprancer.com with your work experience and we'll be in touch!`,
    },
  ],
};

const styles = {
  bgColor: "#ffffff",
  rowTitleColor: "#151618",
  rowContentColor: "#555555",
  arrowColor: "#151618",
};

const config = {
  animate: true,
  //arrowIcon: "V",
  tabFocus: true,
};

export default function FAQ() {
  return (
    
      <div className="home-faq flex flex-col  items-center justify-center gap-[5rem] max800:py-[20rem] h-[100vh] bg-black">
      <div className=" flex flex-col p-[2rem] max800:px-[5rem]">
      <div className="rounded-6xl box-border w-[18.88rem] h-[3.06rem] shrink-0 flex flex-row  items-center justify-center">
        <div className="flex flex-row p-[0.53rem] items-center justify-center">
          <div className="relative textfont font-bold text-[4rem] max600:text-[2rem]">
            FAQs
          </div>
        </div>
      </div>
    </div>

        <Faq data={data} styles={styles} config={config} />
      </div>
    
  );
}