import React from "react";
import Faq from "react-faq-component";
import "./FAQ.css";

const defaultData = {
  rows: [
    {
      question: "What is Happyprancer?",
      answer: "Online Instructor led dance fitness community",
    },
    {
      question: "What is our mission?",
      answer:
        "HappyPrancer's mission is to bring dance as a fitness activity and performance to people. And through dance, to create healthier people and more integrated communities.",
    },
    {
      question: "Do I have to pay any subscription charges?",
      answer:
        "Currently, Indian members can enjoy a special discount and join Happyprancer Live Zumba sessions for just ₹499 per month, while international users can join for $12 per month.",
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
  tabFocus: true,
};

const FAQ1 = ({ faqs = [] }) => {
  const data = {
    rows: faqs ? faqs.map(({ question, answer }) => ({ title: question, content: answer })) : defaultData.rows,
  };

  return (
    <div className="home-faq flex flex-col items-center justify-center gap-[3rem] max800:py-[10rem] w-[78%] ml-[7.56%] h-[40rem]">
      <div className="flex flex-col p-[1rem] max800:px-[5rem] ">
        <div className="rounded-6xl box-border w-[18.88rem] h-[3rem] shrink-0 overflow-hidden flex flex-row items-center justify-center">
          <div className="flex flex-row p-[0.53rem] items-center justify-center">
            <div className="relative textfont font-bold">FAQs</div>
          </div>
        </div>
      </div>
      <Faq data={data} styles={styles} config={config} />
    </div>
  );
};

export default FAQ1;
