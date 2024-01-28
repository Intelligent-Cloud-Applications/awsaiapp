import React, { useState } from 'react';
import Currency from "../../Auth/Currency";
function Subscription({ subscriptions, setSubscriptions, country, setCountry, countryCode, setCountryCode }) {
  const [activeSubscriptionIndex, setActiveSubscriptionIndex] = useState(null);
  const [subscriptionTypes, setSubscriptionTypes] = useState(Array(subscriptions.length).fill('monthly'));


  const [countryCodes, setCountryCodes] = useState(Array(subscriptions.length).fill(''));
  const handleSubscriptionChange = (subscriptionIndex, e) => {
    const { name, value } = e.target;
    const updatedSubscriptions = [...subscriptions];

    if (name === 'countryCode') {
      setCountryCodes((prevCountryCodes) => {
        const newCountryCodes = [...prevCountryCodes];
        newCountryCodes[subscriptionIndex] = value;
        return newCountryCodes;
      });

      const countries = e.target.options;
      const selectedCountry = countries[countries.selectedIndex].text;
      
      updatedSubscriptions[subscriptionIndex] = {
        ...updatedSubscriptions[subscriptionIndex],
        countryCode: value,
        country: selectedCountry,
      };
    } 
    else if (name === 'subscriptionType') {
      setSubscriptionTypes((prevSubscriptionTypes) => {
        const newSubscriptionTypes = [...prevSubscriptionTypes];
        newSubscriptionTypes[subscriptionIndex] = value;
        return newSubscriptionTypes;
      });
  
      updatedSubscriptions[subscriptionIndex] = {
        ...updatedSubscriptions[subscriptionIndex],
        subscriptionType: value,
      };
    }  else if (name.includes('services')) {
      const [, serviceIndex, serviceProperty] = name.split('.');
      updatedSubscriptions[subscriptionIndex].services[serviceIndex][serviceProperty] = value;
    } else {
      updatedSubscriptions[subscriptionIndex] = {
        ...updatedSubscriptions[subscriptionIndex],
        [name]: value,
      };
    }
  
    setSubscriptions(updatedSubscriptions);
  };

  const addService = (index) => {
    const updatedSubscriptions = [...subscriptions];
    updatedSubscriptions[index].services.push({ description: '' });
    setSubscriptions(updatedSubscriptions);
  };

  const removeService = (subscriptionIndex, serviceIndex) => {
    const updatedSubscriptions = [...subscriptions];
    updatedSubscriptions[subscriptionIndex].services.splice(serviceIndex, 1);
    setSubscriptions(updatedSubscriptions);
  };


  return (
    <div className="mx-auto max-w-[800px] px-8" style={{ overflowY: 'auto', maxHeight: '510px' }}>
      <h1 className="font-medium text-7xl">SUBSCRIPTION SECTION</h1>
      <h5 className="w-[28rem] max950:w-[15rem] text-[#cc3f3f] text-[13px]">
        ** The subscription model shown is just an example of how your given data will look like for the subscription; it will not change on giving your input.**
      </h5>
      <h5 className="w-[28rem] max950:w-[17rem] text-[#939393]">
        Outline subscription plans clearly, emphasizing features and benefits to aid user decision-making.
      </h5>
      <div className="mt-4">
        {subscriptions.map((subscription, index) => (
          <div key={index} className="mt-2">
            <h2 className="font-medium text-xl">Subscription {index + 1}</h2>
            <div className="relative">
              <input
                type="text"
                name="heading"
                value={subscription.heading}
                onChange={(e) => handleSubscriptionChange(index, e)}
                placeholder="Subscription Heading"
                className="w-full max-w-[28rem] text-black border-none outline-none bg-transparent mt-2"
                onFocus={() => setActiveSubscriptionIndex(index)}
                onBlur={() => setActiveSubscriptionIndex(null)}
              />
               <div
          className="absolute left-0 right-0  h-[1px] bg-[#939393]"
          
        ></div>
            </div>
            <div className="relative">
      <select
        value={subscriptionTypes[index]}
        name="subscriptionType"
        id=""
        className="w-[19.5rem] mr-[1.5rem] border-[2px] px-[1rem] py-2 border-[#9d9d9d78] max500:w-[80vw] mt-6"
        onChange={(e) => {
          handleSubscriptionChange(index, e);
        }}
      >
        <option value="monthly">Monthly</option>
        <option value="weekly">Weekly</option>
        <option value="yearly">Yearly</option>
      </select>
    </div>
            <div className="relative">
            <li className="flex gap-20 max500:flex-col max500:gap-2 max500:items-start relative ">
                <select
                value={countryCodes[index]}
                name="countryCode"
                id=""
                className="w-[19.5rem] mr-[1.5rem] border-[2px] px-[1rem] py-2 border-[#9d9d9d78]   max500:w-[80vw] mt-6"
                onChange={(e) => {
                  handleSubscriptionChange(index, e);
                }}
                >
                  {<Currency />}
                </select>
              </li>
            </div>
            
            <div className="relative">
              <input
                type="text"
                name="priceAndBilling"
                value={subscription.priceAndBilling}
                onChange={(e) => handleSubscriptionChange(index, e)}
                placeholder="Pricing and Billing (e.g.100)"
                className={`w-full max-w-[28rem] text-black border-none outline-none bg-transparent mt-2 ${
                  index === activeSubscriptionIndex ? 'resize-none' : 'resize-y'
                }`}
                rows={index === activeSubscriptionIndex ? 3 : 1}
                onFocus={() => setActiveSubscriptionIndex(index)}
                onBlur={() => setActiveSubscriptionIndex(null)}
              />
               <div
          className="absolute left-0 right-0  h-[1px] bg-[#939393]"
          
        ></div>
            </div>
            <div className="relative">
              {subscription.services.map((service, serviceIndex) => (
                <div key={serviceIndex} className="mt-2">
                    <button
      type="button"
      onClick={() => removeService(index, serviceIndex)}
      className="absolute top-[12px] right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white px-1 rounded-full text-sm mr-[12px] "
    >
      <span>✕</span>
    </button>
                  <textarea
                    name={`services.${serviceIndex}.description`}
                    value={service.description}
                    onChange={(e) => handleSubscriptionChange(index, e)}
                    placeholder={`Service ${serviceIndex + 1} Description`}
                    className="w-full max-w-[28rem] text-black border-none outline-none bg-transparent mt-2 resize-none"
                    rows={1}
                    onFocus={() => setActiveSubscriptionIndex(index)}
                    onBlur={() => setActiveSubscriptionIndex(null)}
                  />
                  <div
          className="absolute left-0 right-0  h-[1px] bg-[#939393]"
          
        ></div>
                </div>
              ))}
              <div className="mb-10 flex justify-center ">
              <button type="button" onClick={() => addService(index)} className="bg-[#30AFBC] text-white px-4 py-2 mt-4 rounded-md">
                Add Service
              </button>
            </div> </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Subscription;
