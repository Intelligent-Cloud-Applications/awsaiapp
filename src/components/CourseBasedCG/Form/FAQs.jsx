import { TextInput } from 'flowbite-react';
import React, { useState, useRef } from 'react';
import { FiHelpCircle, FiPlus, FiX, FiMessageSquare, FiMessageCircle } from 'react-icons/fi';

function FAQs({ faqs, setFaqs }) {
  const [activeFAQIndex, setActiveFAQIndex] = useState(null);
  const [errors, setErrors] = useState({});
  const faqsContainerRef = useRef(null);

  const handleFAQChange = (index, e) => {
    const { name, value } = e.target;
    const updatedFaqs = [...faqs];
    updatedFaqs[index] = {
      ...updatedFaqs[index],
      [name]: value,
    };
    setFaqs(updatedFaqs);

    // Validate the FAQ
    const newErrors = { ...errors };
    if (!value.trim()) {
      newErrors[`${index}-${name}`] = `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
    } else {
      delete newErrors[`${index}-${name}`];
    }
    setErrors(newErrors);
  };

  const toggleActiveFAQ = (index) => {
    setActiveFAQIndex(index === activeFAQIndex ? null : index);
  };

  const removeFAQ = (indexToRemove) => {
    const updatedFaqs = faqs.filter((_, index) => index !== indexToRemove);
    setFaqs(updatedFaqs);
    
    // Clear any errors for the removed FAQ
    const newErrors = { ...errors };
    delete newErrors[`${indexToRemove}-question`];
    delete newErrors[`${indexToRemove}-answer`];
    setErrors(newErrors);
  };

  const addFAQ = () => {
    if (faqs.length < 5) {
      setFaqs([...faqs, { question: '', answer: '' }]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-50 mb-6">
          <FiHelpCircle className="w-8 h-8 text-teal-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">FAQs Section</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Address common inquiries efficiently, ensuring users find answers to their most pressing questions.
        </p>
      </div>

      <div className="space-y-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <FiMessageSquare className="w-5 h-5 text-teal-600" />
            Frequently Asked Questions
          </h2>

          <div className="space-y-6" ref={faqsContainerRef}>
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`relative p-4 rounded-lg border ${
                  activeFAQIndex === index
                    ? 'border-teal-200 bg-teal-50/30'
                    : 'border-gray-100 hover:border-gray-200'
                } transition-all duration-200`}
              >
                {index >= 3 && (
                  <button
                    onClick={() => removeFAQ(index)}
                    className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500 transition-colors"
                    title="Remove FAQ"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                )}

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <FiMessageCircle className="w-4 h-4 text-teal-600" />
                      <span className="text-sm font-medium text-gray-700">
                        Question {index + 1}
                      </span>
                    </div>
                    <TextInput
                      type="text"
                      name="question"
                      value={faq.question}
                      onChange={(e) => handleFAQChange(index, e)}
                      placeholder="Enter your question"
                      className="w-full bg-white"
                      onFocus={() => toggleActiveFAQ(index)}
                      onBlur={() => toggleActiveFAQ(null)}
                    />
                    {errors[`${index}-question`] && (
                      <p className="mt-1 text-sm text-red-500">{errors[`${index}-question`]}</p>
                    )}
                  </div>

                  <div>
                    <TextInput
                      type="text"
                      name="answer"
                      value={faq.answer}
                      onChange={(e) => handleFAQChange(index, e)}
                      placeholder="Enter your answer"
                      className="w-full bg-white"
                      onFocus={() => toggleActiveFAQ(index)}
                      onBlur={() => toggleActiveFAQ(null)}
                    />
                    {errors[`${index}-answer`] && (
                      <p className="mt-1 text-sm text-red-500">{errors[`${index}-answer`]}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {faqs.length < 5 && (
              <div className="flex justify-center pt-4">
                <button
                  onClick={addFAQ}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-200"
                >
                  <FiPlus className="w-5 h-5" />
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