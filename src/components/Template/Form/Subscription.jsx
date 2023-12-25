import React, { useState } from 'react';

function Subscription() {
  const [subscriptions, setSubscriptions] = useState([
    {
      heading: '',
      description: '',
      priceAndBilling: '',
    },
    {
      heading: '',
      description: '',
      priceAndBilling: '',
    },
    {
      heading: '',
      description: '',
      priceAndBilling: '',
    },
  ]);

  const [activeSubscriptionIndex, setActiveSubscriptionIndex] = useState(null);

  const handleSubscriptionChange = (index, e) => {
    const updatedSubscriptions = [...subscriptions];
    updatedSubscriptions[index] = {
      ...updatedSubscriptions[index],
      [e.target.name]: e.target.value,
    };
    setSubscriptions(updatedSubscriptions);
  };

  const toggleActiveSubscription = (index) => {
    setActiveSubscriptionIndex(index === activeSubscriptionIndex ? null : index);
  };

  return (
    <div className="mx-auto max-w-[800px] px-8">
      <h1 className="font-medium text-7xl">SUBSCRIPTION SECTION</h1>
      <h5 className="w-[28rem] text-[#939393]">
      Outline subscription plans clearly, emphasizing features and benefits to aid user decision-making.
      </h5>
      <div className="mt-6">
        {subscriptions.map((subscription, index) => (
          <div key={index} className="mt-4">
            <h2 className="font-medium text-xl">Subscription {index + 1}</h2>
            <div className="relative">
              <input
                type="text"
                name="heading"
                value={subscription.heading}
                onChange={(e) => handleSubscriptionChange(index, e)}
                placeholder="Subscription Heading"
                className="w-full max-w-[28rem] text-black border-none outline-none bg-transparent mt-2"
                onFocus={() => toggleActiveSubscription(index)}
                onBlur={() => toggleActiveSubscription(null)}
              />
              <div
                className={`absolute left-0 right-0 bottom-0 h-[0.5px] ${
                  activeSubscriptionIndex === index ? 'bg-black' : 'bg-[#939393]'
                }`}
              ></div>
            </div>
            <textarea
              name="description"
              value={subscription.description}
              onChange={(e) => handleSubscriptionChange(index, e)}
              placeholder="Services Included - Short Description"
              className="w-full max-w-[28rem] text-black border-none outline-none bg-transparent mt-2 resize-none"
              rows={1}
              onFocus={() => toggleActiveSubscription(index)}
              onBlur={() => toggleActiveSubscription(null)}
            />
            <div
              className={`h-[0.5px] ${
                activeSubscriptionIndex === index ? 'bg-black' : 'bg-[#939393]'
              }`}
            ></div>
            <input
              type="text"
              name="priceAndBilling"
              value={subscription.priceAndBilling}
              onChange={(e) => handleSubscriptionChange(index, e)}
              placeholder="Pricing and Billing (e.g., $25/month)"
              className={`w-full max-w-[28rem] text-black border-none outline-none bg-transparent mt-2 ${
                index === activeSubscriptionIndex ? 'resize-none' : 'resize-y'
              }`}
              rows={index === activeSubscriptionIndex ? 3 : 1}
              onFocus={() => toggleActiveSubscription(index)}
              onBlur={() => toggleActiveSubscription(null)}
            />
            
              <div  className={`h-[0.5px] ${
                activeSubscriptionIndex === index ? 'bg-black' : 'bg-[#939393]'
              }`}></div>
            
          </div>
        ))}
      </div>
    </div>
  );
}

export default Subscription;
