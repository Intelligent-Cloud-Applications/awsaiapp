import React, { useState, useRef } from 'react';

function FAQs() {
  const [faqs, setFaqs] = useState([
    {
      question: '',
      answer: '',
    },
    {
      question: '',
      answer: '',
    },
    {
      question: '',
      answer: '',
    },
  ]);

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

  const addNewFAQ = () => {
    setFaqs([
      ...faqs,
      { question: '', answer: '' },
    ]);
    
    // Scroll to the newly added FAQ
    faqsContainerRef.current.scrollTo({
      top: faqsContainerRef.current.scrollHeight,
      behavior: 'smooth',
    });
  };

  return (
    <div className="mx-auto max-w-[800px] px-8">
      <h1 className="font-medium text-7xl">FAQs SECTION</h1>
      <h5 className="w-[28rem] max950:w-[17rem] text-[#939393]">
        Address common inquiries efficiently, ensuring users find answers to their most pressing questions.
      </h5>
      <div className="mt-6 max-h-[480px] overflow-y-auto" ref={faqsContainerRef}>
        {faqs.map((faq, index) => (
          <div key={index} className="mt-4">
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
              className="w-full max-w-[28rem] text-black border-none outline-none bg-transparent mt-2 resize-none"
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
        {/* Add FAQ Button */}
        <div className="mt-4 mb-6 flex justify-center max950:mt-0">
          <button onClick={addNewFAQ} className="bg-[#30AFBC] text-white px-4 py-2 rounded-md">
            Add FAQ
          </button>
        </div>
      </div>
    </div>
  );
}

export default FAQs;
