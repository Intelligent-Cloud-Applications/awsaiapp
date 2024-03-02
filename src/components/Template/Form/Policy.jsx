import React, { useState, useEffect } from 'react';

const Policy = ({ refundPolicies, setRefundPolicies, privacyPolicy, setPrivacyPolicy }) => {

  const handleRefundPolicyChange = (index, e) => {
    const updatedPolicies = [...refundPolicies];
    updatedPolicies[index] = { ...updatedPolicies[index], content: e.target.value };
    setRefundPolicies(updatedPolicies);
  };

  const handlePrivacyPolicyChange = (e) => {
    setPrivacyPolicy({ content: e.target.value });
  };

  const [activePolicyIndex, setActivePolicyIndex] = useState(null);

  const toggleActivePolicy = (index) => {
    setActivePolicyIndex(index === activePolicyIndex ? null : index);
  };

  useEffect(() => {
    if (!Array.isArray(refundPolicies) || refundPolicies.length === 0) {
      setRefundPolicies([{ content: '' }]);
    }
    if (!privacyPolicy) {
      setPrivacyPolicy({ content: '' });
    }
  }, [refundPolicies, setRefundPolicies, privacyPolicy, setPrivacyPolicy]);

  return (
    <div className="mx-auto max-w-[800px] px-8" style={{ overflowY: 'auto', maxHeight: '500px' }}>
      <h1 className="font-medium text-7xl">POLICY AND TERMS</h1>
      <h5 className="w-[28rem] max950:w-[15rem] text-[#cc3f3f] text-[13px]">
        ** The Privacy page shown is just an example how your given data will look like for the Privacy page it will not change on giving your input.**
      </h5>
      <h5 className="w-[28rem] max950:w-[17rem] text-[#939393]">
        Establish transparent guidelines, sharing policies and terms for clarity and understanding.
      </h5>
      <div className="mt-8">
        <div className="mt-4">
          <h2 className="font-medium text-xl">Refund Policies</h2>
          {refundPolicies.map((policy, index) => (
            <div key={index} className="relative">
              <textarea
                name={`refundPolicy-${index}`}
                value={policy.content}
                onChange={(e) => handleRefundPolicyChange(index, e)}
                placeholder={`Refund Policy ${index + 1} Content`}
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
          ))}
        </div>
        <div className="mt-8">
          <h2 className="font-medium text-xl">Privacy Policy</h2>
          <div className="relative">
            <textarea
              name="privacyPolicy"
              value={privacyPolicy.content}
              onChange={handlePrivacyPolicyChange}
              placeholder="Privacy Policy Content"
              className="w-full max-w-[28rem] text-black border-none outline-none bg-transparent mt-2 resize-none"
              onFocus={() => toggleActivePolicy(refundPolicies.length)}
              onBlur={() => toggleActivePolicy(null)}
              rows={1}
              style={{
                height: activePolicyIndex === refundPolicies.length ? '4rem' : 'auto'
              }}
            />
            <div
              className={`absolute left-0 right-0 bottom-0 h-[1px] ${
                activePolicyIndex === refundPolicies.length ? 'bg-black' : 'bg-[#939393]'
              }`}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Policy;
