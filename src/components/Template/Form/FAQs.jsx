import React, { useState, useRef } from 'react';

function FAQs({ faqs, setFaqs }) {
  // const [faqs, setFaqs] = useState([
  //   {
  //     question: '',
  //     answer: '',
  //   },
  //   {
  //     question: '',
  //     answer: '',
  //   },
  //   {
  //     question: '',
  //     answer: '',
  //   },
  // ]);

  const [activeFAQIndex, setActiveFAQIndex] = useState(null);

  const handleFAQChange = (index, e) => {
    const updatedFaqs = [...faqs];
    updatedFaqs[index] = {
      ...updatedFaqs[index],
      [e.target.name]: e.target.value,
    };
    setFaqs(updatedFaqs);
  };

  const toggleActiveFAQ = (index) => {
    setActiveFAQIndex(index === activeFAQIndex ? null : index);
  };

  const faqsContainerRef = useRef(null);

  const removeFAQ = (indexToRemove) => {
    const updatedFaqs = faqs.filter((_, index) => index !== indexToRemove);
    setFaqs(updatedFaqs);
  };

  return (
    <div className="mx-auto max-w-[800px] max-h-screen overflow-y-auto">
      <h1 className="font-medium text-7xl">FAQs SECTION</h1>
      <h5 className="w-[28rem] max950:w-[17rem] text-[#939393]">
        Address common inquiries efficiently, ensuring users find answers to their most pressing questions.
      </h5>
      <div className="mt-4 pb-4  " ref={faqsContainerRef}>
        {faqs.map((faq, index) => (
          <div key={index} className="mt-4 relative">
            {index >= 3 && (
              <button
                onClick={() => removeFAQ(index)}
                className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white px-1  rounded-full text-sm mr-[12px] mt-4 " 

                >
                <span>✕</span>
              </button>
              )}
            <h2 className="font-medium text-xl">FAQ {index + 1}</h2>
            <div className="relative">
              <input
                type="text"
                name="question"
                value={faq.question}
                onChange={(e) => handleFAQChange(index, e)}
                placeholder="Question"
                className="w-full max-w-[28rem] text-black border-none outline-none bg-transparent mt-2"
                onFocus={() => toggleActiveFAQ(index)}
                onBlur={() => toggleActiveFAQ(null)}
              />
              <div
                className={`absolute left-0 right-0 bottom-0 h-[0.5px] ${
                activeFAQIndex === index ? 'bg-black' : 'bg-[#939393]'
              }`}
                ></div>
            </div>
            <textarea
              name="answer"
              value={faq.answer}
              onChange={(e) => handleFAQChange(index, e)}
              placeholder="Answer"
              className="w-full max-w-[28rem] text-black border-none outline-none bg-transparent mt-2 resize-none "
              rows={activeFAQIndex === index ? 2 : 1}
              onFocus={() => toggleActiveFAQ(index)}
              onBlur={() => toggleActiveFAQ(null)}
            />
            <div
              className={`h-[0.5px] ${
              activeFAQIndex === index ? 'bg-black' : 'bg-[#939393]'
            }`}
              ></div>
          </div>
          ))}
        {faqs.length < 5 && (
          <div className="mt-4 flex justify-center">
            <button onClick={() => setFaqs([...faqs, { question: '', answer: '' }])} className="bg-[#30AFBC] text-white px-4 py-2 rounded-md">
              Add FAQ
            </button>
          </div>
          )}
      </div>
    </div>
    );
}

export default FAQs;