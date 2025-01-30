import { TextInput } from 'flowbite-react';
import React, { useState, useRef } from 'react';

function FAQs({ faqs, setFaqs }) {
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
    <div className="mx-[2%] mb-[5%] [@media(max-width:1024px)]:mb-10">
      <h1 className="font-medium text-7xl pb-[1rem] text-center">FAQs SECTION</h1>
      <h5 className="text-[#939393] text-center">
        Address common inquiries efficiently, ensuring users find answers to their most pressing questions.
      </h5>
      <div className="flex justify-center ml-[8%] ">
        <div className="w-[60%] p-8 [@media(max-width:1024px)]:w-full [@media(max-width:1024px)]:p-0">
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
                <div className="relative py-4">
                  <TextInput
                    type="text"
                    name="question"
                    value={faq.question}
                    onChange={(e) => handleFAQChange(index, e)}
                    placeholder="Question"
                    className="w-full"
                    style={{
                      borderColor: "#D1D5DB",
                      backgroundColor: "#F9FAFB",
                      borderRadius: "8px",
                    }}
                    onFocus={() => toggleActiveFAQ(index)}
                    onBlur={() => toggleActiveFAQ(null)}
                  />
                </div>
                <TextInput
                  name="answer"
                  value={faq.answer}
                  onChange={(e) => handleFAQChange(index, e)}
                  placeholder="Answer"
                  className="w-full"
                  style={{
                    borderColor: "#D1D5DB",
                    backgroundColor: "#F9FAFB",
                    borderRadius: "8px",
                  }}
                  rows={activeFAQIndex === index ? 2 : 1}
                  onFocus={() => toggleActiveFAQ(index)}
                  onBlur={() => toggleActiveFAQ(null)}
                />
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
      </div>
    </div>
  );
}

export default FAQs;