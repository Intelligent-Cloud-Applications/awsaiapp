import React, { useState, useRef } from 'react';
import { Label, TextInput } from 'flowbite-react';
import { FiHelpCircle, FiPlus, FiX } from 'react-icons/fi';

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
  const faqsContainerRef = useRef(null);

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

  const removeFAQ = (indexToRemove) => {
    const updatedFaqs = faqs.filter((_, index) => index !== indexToRemove);
    setFaqs(updatedFaqs);
  };

  const addFAQ = () => {
    if (faqs.length < 5) {
      setFaqs([...faqs, { question: '', answer: '' }]);
      // Scroll to the new FAQ after it's added
      setTimeout(() => {
        faqsContainerRef.current?.lastElementChild?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-50 mb-6">
          <FiHelpCircle className="w-8 h-8 text-teal-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Address common inquiries efficiently, ensuring users find answers to their most pressing questions.
        </p>
      </div>

      <div className="space-y-6" ref={faqsContainerRef}>
        {faqs.map((faq, index) => (
          <div 
            key={index}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 relative"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">FAQ {index + 1}</h2>
              {index >= 3 && (
                <button
                  onClick={() => removeFAQ(index)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                  title="Remove FAQ"
                >
                  <FiX className="w-5 h-5" />
                </button>
              )}
            </div>

            <div className="space-y-4">
              {/* Question Input */}
              <div>
                <Label 
                  htmlFor={`question-${index}`}
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Question <span className="text-red-500">*</span>
                </Label>
                <TextInput
                  id={`question-${index}`}
                  name="question"
                  value={faq.question}
                  onChange={(e) => handleFAQChange(index, e)}
                  placeholder="Enter your question here"
                  className="w-full bg-gray-50 border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 rounded-lg"
                  onFocus={() => toggleActiveFAQ(index)}
                  onBlur={() => toggleActiveFAQ(null)}
                />
              </div>

              {/* Answer Input */}
              <div>
                <Label 
                  htmlFor={`answer-${index}`}
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Answer <span className="text-red-500">*</span>
                </Label>
                <TextInput
                  id={`answer-${index}`}
                  name="answer"
                  value={faq.answer}
                  onChange={(e) => handleFAQChange(index, e)}
                  placeholder="Enter your answer here"
                  className="w-full bg-gray-50 border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 rounded-lg"
                  onFocus={() => toggleActiveFAQ(index)}
                  onBlur={() => toggleActiveFAQ(null)}
                />
              </div>
            </div>
          </div>
        ))}

        {/* Add FAQ Button */}
        {faqs.length < 5 && (
          <button
            onClick={addFAQ}
            className="w-full py-4 border-2 border-dashed border-teal-200 rounded-xl text-teal-600 hover:border-teal-600 hover:text-teal-700 transition-colors flex items-center justify-center gap-2 bg-white"
          >
            <FiPlus className="w-5 h-5" />
            Add New FAQ
          </button>
        )}

        {/* Maximum FAQs Notice */}
        {faqs.length >= 5 && (
          <p className="text-center text-sm text-gray-500 mt-4">
            Maximum number of FAQs reached (5)
          </p>
        )}
      </div>
    </div>
  );
}

export default FAQs;