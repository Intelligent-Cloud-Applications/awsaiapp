import React, { useState } from 'react';

function Policy() {
  const [policies, setPolicies] = useState([
    { title: 'Privacy Policy', content: '' },
    { title: 'Terms and Conditions', content: '' },
    { title: 'Cancellation/Refund Policy', content: '' },
    { title: 'About Us', content: '' },
  ]);

  const handlePolicyChange = (index, e) => {
    const updatedPolicies = [...policies];
    updatedPolicies[index] = { ...updatedPolicies[index], [e.target.name]: e.target.value };
    setPolicies(updatedPolicies);
  };

  const [activePolicyIndex, setActivePolicyIndex] = useState(null);

  const toggleActivePolicy = (index) => {
    setActivePolicyIndex(index === activePolicyIndex ? null : index);
  };

  return (
    <div className="mx-auto max-w-[800px] px-8">
      <h1 className="font-medium text-7xl">POLICY AND TERMS</h1>
      <h5 className="w-[28rem] text-[#939393]">
      Establish transparent guidelines, sharing policies and terms for clarity and understanding.
      </h5>
      <div className="mt-8">
        {policies.map((policy, index) => (
          <div key={index} className="mt-4">
            <h2 className="font-medium text-xl">{policy.title}</h2>
            <div className="relative">
              <textarea
                name="content"
                value={policy.content}
                onChange={(e) => handlePolicyChange(index, e)}
                placeholder={`${policy.title} Content`}
                className="w-full max-w-[28rem] text-black border-none outline-none bg-transparent mt-2 resize-none"
                onFocus={() => toggleActivePolicy(index)}
                onBlur={() => toggleActivePolicy(null)}
                rows={1}
                style={{
                  height: activePolicyIndex === index ? '4rem' : 'auto'
                }}
              />
              <div
                className={`absolute left-0 right-0 bottom-0 h-[1px] ${
                  activePolicyIndex === index ? 'bg-black' : 'bg-[#939393]'
                }`}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Policy;
