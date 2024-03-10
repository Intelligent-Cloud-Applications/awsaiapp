import React from 'react';

function Policy({policies, setPolicies}) {
//  const [policies, setPolicies] = useState({
//    'Privacy Policy': '',
//    'About Us': '',
//    'Refund Policy': [{ heading: '', content: '' }],
//    'Terms and Conditions': [{ title: '', content: '' }]
//  });

  const handlePolicyChange = (type, field, value, index) => {
    if (type === 'Refund Policy') {
      const updatedRefunds = [...policies['Refund Policy']];
      updatedRefunds[index][field] = value;
      setPolicies({ ...policies, 'Refund Policy': updatedRefunds });
    } else if (type === 'Terms and Conditions') {
      const updatedTerms = [...policies['Terms and Conditions']];
      updatedTerms[index][field] = value;
      setPolicies({ ...policies, 'Terms and Conditions': updatedTerms });
    } else {
      setPolicies({ ...policies, [type]: value });
    }
  };

  const addRefundPolicy = () => {
    const updatedRefunds = [...policies['Refund Policy'], { heading: '', content: '' }];
    setPolicies({ ...policies, 'Refund Policy': updatedRefunds });
  };

  const addTermsAndConditions = () => {
    const updatedTerms = [...policies['Terms and Conditions'], { heading: '', content: '' }];
    setPolicies({ ...policies, 'Terms and Conditions': updatedTerms });
  };


  const removePolicy = (type, index) => {
    if (type === 'Refund Policy') {
      const updatedRefunds = [...policies['Refund Policy']];
      updatedRefunds.splice(index, 1);
      setPolicies({ ...policies, 'Refund Policy': updatedRefunds });
    } else if (type === 'Terms and Conditions') {
      const updatedTerms = [...policies['Terms and Conditions']];
      updatedTerms.splice(index, 1);
      setPolicies({ ...policies, 'Terms and Conditions': updatedTerms });
    } else {
      const updatedPolicies = { ...policies };
      delete updatedPolicies[type];
      setPolicies(updatedPolicies);
    }
  };

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
        {Object.entries(policies).map(([type, value], index) => (
          <div key={index} className="mt-4">
            <h2 className="font-medium text-xl">{type}</h2>
            {type === 'Refund Policy' || type === 'Terms and Conditions' ? (
              value.map((item, itemIndex) => (
                <div key={itemIndex} className="mt-4">
                  <div className="relative">
                    <button
                      onClick={() => removePolicy(type, itemIndex)}
                      className="absolute top-0 right-0 m-1 px-[6px] rounded-full bg-red-500 text-white transform text-sm"
                      >
                      X
                    </button>
                  </div>
                  <input
                    type="text"
                    value={item.heading}
                    onChange={(e) => handlePolicyChange(type, 'heading', e.target.value, itemIndex)}
                    placeholder={type === 'Refund Policy' ? "Refund Heading" : "Title"}
                    className="w-full max-w-[28rem] text-black border-none outline-none bg-transparent mt-2 resize-none placeholder-border-b-2 policy-textarea"
                  />
                  <textarea
                    value={item.content}
                    onChange={(e) => handlePolicyChange(type, 'content', e.target.value, itemIndex)}
                    placeholder={type === 'Refund Policy' ? "Refund Content" : "Content"}
                    className="w-full max-w-[28rem] text-black border-none outline-none bg-transparent mt-2 resize-none placeholder-border-b-2 policy-textarea"
                    rows={3}
                  />
                </div>
                ))
                ) : (
                  <textarea
                    value={value}
                    onChange={(e) => handlePolicyChange(type, 'content', e.target.value)}
                    placeholder={`${type} Content`}
                    className="w-full max-w-[28rem] text-black border-none outline-none bg-transparent mt-2 resize-none placeholder-border-b-2 policy-textarea"
                    rows={3}
                  />
                  )}
            {type !== 'About Us' && type !== 'Privacy Policy' && (
              <div className="mt-2 flex justify-center">
                {type === 'Refund Policy' && (
                  <button onClick={addRefundPolicy} className="bg-[#30AFBC] text-white px-4 py-2 rounded-md">Add Refund Policy</button>
                  )}
                {type === 'Terms and Conditions' && (
                  <button onClick={addTermsAndConditions} className="bg-[#30AFBC] text-white px-4 py-2 rounded-md">Add Terms and Conditions</button>
                  )}
              </div>
              )}
          </div>
          ))}
      </div>
    </div>
    );
}

export default Policy;