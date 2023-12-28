import React from "react";
import Faq from "react-faq-component";
import "./FAQ.css";

const data = {
  rows: [
    {
      title: "What is Happyprancer?",
      content: `Online Instructor led dance fitness community`,
    },
    {
      title: "What is our mission?",
      content: `HappyPrancer's mission is to bring dance as fitness activity and performance to people. And through dance, to create healthier people and more integrated communities.`,
    },
    {
      title: "Do I have to pay any subscription charges ?",
      content: `Currently, Indian members can enjoy a special discount and join Happyprancer Live Zumba sessions for just ₹499 per month, while international users can join for $12 per month.`,
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

export default function FAQ1( faqs, setFaqs) {
  return (

    <div className="home-faq flex flex-col  items-center justify-center gap-[3rem] max800:py-[10rem] w-[78%] ml-[7.56%] h-[40rem]">
      <div className=" flex flex-col p-[1rem] max800:px-[5rem] ">
        <div className="rounded-6xl box-border w-[18.88rem] h-[3rem] shrink-0 overflow-hidden flex flex-row  items-center justify-center">
          <div className="flex flex-row p-[0.53rem] items-center justify-center">
            <div className="relative textfont font-bold">
              FAQs
            </div>
          </div>
        </div>
      </div>
      <Faq data={data} styles={styles} config={config} />
    </div>

  );
}
