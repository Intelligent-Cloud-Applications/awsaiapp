import React, { useState, useEffect, useContext } from 'react';
import Select from 'react-select';
import { API } from "aws-amplify";
import Currency from "../../Auth/Currency";
import Context from "../../../context/Context";
import { TextInput } from 'flowbite-react';

function Subscription({ subscriptions, setSubscriptions, country, setCountry, countryCode, setCountryCode }) {
  const [provides, setProvides] = useState([]);
  const [activeSubscriptionIndex, setActiveSubscriptionIndex] = useState(null);
  const [subscriptionTypes, setSubscriptionTypes] = useState(Array(subscriptions.length).fill('monthly'));
  const [classType, setclassType] = useState([]); // Holds the class types fetched from localStorage
  const [selectedclassType, setSelectedclassType] = useState(Array(subscriptions.length).fill([]));
  const [countryCodes, setCountryCodes] = useState(Array(subscriptions.length).fill(''));
  const Ctx = useContext(Context);

  useEffect(() => {
    // Load class types from localStorage and set them correctly
    const savedclassType = JSON.parse(localStorage.getItem('classTypes')) || [];
    setclassType(savedclassType);
  }, []);

  useEffect(() => {
    // Save class types to localStorage whenever they change
    localStorage.setItem('classTypes', JSON.stringify(classType));
  }, [classType]);


  const handleClassTypeChange = (subscriptionIndex, selectedOptions) => {
    const updatedSelectedclassType = [...selectedclassType];
    updatedSelectedclassType[subscriptionIndex] = selectedOptions ? selectedOptions.map(option => option.value) : [];
    setSelectedclassType(updatedSelectedclassType);

    const updatedSubscriptions = [...subscriptions];
    updatedSubscriptions[subscriptionIndex].classType = updatedSelectedclassType[subscriptionIndex];
    setSubscriptions(updatedSubscriptions);
  };

  useEffect(() => {
    const savedSubscriptionTypes = JSON.parse(localStorage.getItem('subscriptionTypes')) || Array(subscriptions.length).fill('monthly');
    const savedCountryCodes = JSON.parse(localStorage.getItem('countryCodes')) || Array(subscriptions.length).fill('');
    const savedProvides = JSON.parse(localStorage.getItem('provides')) || Array(subscriptions.length).fill([]);

    setSubscriptionTypes(savedSubscriptionTypes);
    setCountryCodes(savedCountryCodes);
    setProvides(savedProvides);
  }, [subscriptions.length]);

  const util = useContext(Context).util;

  const handleSubscriptionChange = (subscriptionIndex, e) => {
    const { name, value } = e.target;
    const updatedSubscriptions = [...subscriptions];

    if (name === 'currency') {
      setCountryCodes((prevCountryCodes) => {
        const newCountryCodes = [...prevCountryCodes];
        newCountryCodes[subscriptionIndex] = value;
        return newCountryCodes;
      });

      const selectedCountry = e.target.selectedOptions[0].textContent.split(' ')[0];

      updatedSubscriptions[subscriptionIndex] = {
        ...updatedSubscriptions[subscriptionIndex],
        countryCode: value,
        country: selectedCountry,
        currency: value,
      };
    } else if (name === 'subscriptionType') {
      setSubscriptionTypes((prevSubscriptionTypes) => {
        const newSubscriptionTypes = [...prevSubscriptionTypes];
        newSubscriptionTypes[subscriptionIndex] = value;
        return newSubscriptionTypes;
      });

      const duration = calculateDuration(value);

      updatedSubscriptions[subscriptionIndex] = {
        ...updatedSubscriptions[subscriptionIndex],
        subscriptionType: value,
        durationText: value.charAt(0).toUpperCase() + value.slice(1), // capitalize first letter
        duration,
      };
    } else if (name.includes('provides')) {
      const [, serviceIndex] = name.split('.');
      const serviceArray = [...updatedSubscriptions[subscriptionIndex].provides];

      // Update the value in the provides array
      const updatedService = value;
      serviceArray[serviceIndex] = updatedService;

      // Update the provides array in the subscription object
      updatedSubscriptions[subscriptionIndex] = {
        ...updatedSubscriptions[subscriptionIndex],
        provides: serviceArray,
      };
    } else {
      updatedSubscriptions[subscriptionIndex] = {
        ...updatedSubscriptions[subscriptionIndex],
        [name]: value,
      };
    }

    setSubscriptions(updatedSubscriptions);
  };

  const calculateDuration = (subscriptionType) => {
    const daysInMonth = 30;
    if (subscriptionType === 'monthly') {
      return daysInMonth * 24 * 60 * 60 * 1000;
    } else if (subscriptionType === 'weekly') {
      return 7 * 24 * 60 * 60 * 1000;
    } else if (subscriptionType === 'yearly') {
      return 365 * 24 * 60 * 60 * 1000;
    }
    else if (subscriptionType === 'quarterly') {
      return 3 * daysInMonth * 24 * 60 * 60 * 1000;
    }

    return 0;
  };

  const addService = (index) => {
    const updatedSubscriptions = [...subscriptions];
    updatedSubscriptions[index].provides.push('');
    setSubscriptions(updatedSubscriptions);
  };

  const removeService = (subscriptionIndex, serviceIndex) => {
    const updatedSubscriptions = [...subscriptions];
    updatedSubscriptions[subscriptionIndex].provides.splice(serviceIndex, 1);
    setSubscriptions(updatedSubscriptions);
  };

  const updateIndiaAttribute = (index, value) => {
    const updatedSubscriptions = [...subscriptions];
    updatedSubscriptions[index] = {
      ...updatedSubscriptions[index],
      india: value,
    };
    setSubscriptions(updatedSubscriptions);
  };

  const addSubscription = () => {
    const newSubscription = {
      heading: '',
      amount: '',
      currency: '',
      country: 'INDIA',
      subscriptionType: 'monthly',
      provides: [''],
      classType: [''],
      duration: calculateDuration('monthly'),
      durationText: 'Monthly',
      india: true,
      cognitoId: Ctx.userData.cognitoId,
    };

    setSubscriptions([...subscriptions, newSubscription]);
    setSelectedclassType([...selectedclassType, []]);
  };

  const removeSubscription = async (indexToRemove) => {
    const subscription = subscriptions[indexToRemove]
    if (subscription.productId) {
      try {
        util.setLoader(true);
        await API.del("clients", `/user/development-form/delete-subscription/${subscription.institution}`, {
          body: {
            cognitoId: Ctx.userData.cognitoId,
            productId: subscription.productId,
          }
        });
      } catch (e) {
        console.log(e);
      } finally {
        util.setLoader(false);
      }
    }
    const updatedSubscriptions = subscriptions.filter((_, index) => index !== indexToRemove);
    setSubscriptions(updatedSubscriptions);
  }

  useEffect(() => {
    localStorage.setItem('subscriptionTypes', JSON.stringify(subscriptionTypes));
    localStorage.setItem('countryCodes', JSON.stringify(countryCodes));
    localStorage.setItem('provides', JSON.stringify(provides));
  }, [subscriptionTypes, countryCodes, provides]);
  return (
    <div className="mx-[2%] [@media(max-width:1024px)]:m-0">
      <h1 className="font-medium text-7xl pb-[1rem] text-center">SUBSCRIPTION PLANS</h1>
      <h5 className="text-[#939393] text-center mx-[10%]">
        Clearly outline your subscription options, highlighting key features and benefits to help users make informed decisions.</h5>
      <div className="flex justify-center ml-[8%] [@media(max-width:1024px)]:ml-0">
        <div className="w-[60%] p-8 [@media(max-width:1024px)]:w-full [@media(max-width:1024px)]:p-0">
          <div className="mt-4">
            {subscriptions.map((subscription, index) => (
              <div key={index} className="mt-2">
                <div className="mt-2 flex items-center justify-between">
                  <h2 className="font-medium text-xl">Subscription {index + 1}</h2>
                  {index >= 3 && (
                    <button
                      onClick={() => removeSubscription(index)}
                      className="bg-red-500 text-white px-1 rounded-full text-sm mr-[12px]"
                    >
                      <span>✕</span>
                    </button>
                  )}</div>
                <div className="relative">
                  <TextInput
                    type="text"
                    name="heading"
                    value={subscription.heading}
                    onChange={(e) => handleSubscriptionChange(index, e)}
                    placeholder="Subscription Heading"
                    className="w-ful "
                    style={{
                      borderColor: "#D1D5DB",
                      backgroundColor: "#F9FAFB",
                      borderRadius: "8px",
                    }}
                    onFocus={() => setActiveSubscriptionIndex(index)}
                    onBlur={() => setActiveSubscriptionIndex(null)}
                  />
                </div>
                {/* Multi-select for class types */}
                <div className="relative">
                  <Select
                    isMulti
                    value={
                      selectedclassType[index].map(value => ({
                        value,
                        label: value,
                      })) || []
                    }
                    options={classType.map((type) => ({
                      value: type,
                      label: type,
                    }))}
                    onChange={(selectedOptions) =>
                      handleClassTypeChange(index, selectedOptions)
                    }
                    placeholder="Select Class Types"
                    className="w-[19.5rem] mr-[1.5rem] border-[2px] border-[#9d9d9d78] max500:w-[80vw] mt-6"
                  />
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
                    <option value="quarterly">Quarterly</option>
                  </select>
                </div>
                <div className="relative">
                  <li className="flex gap-20 max500:flex-col max500:gap-2 max500:items-start relative ">
                    <select
                      value={countryCodes[index]}
                      name="currency"
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
                  <TextInput
                    type="text"
                    name="amount"
                    value={subscription.amount}
                    onChange={(e) => handleSubscriptionChange(index, e)}
                    placeholder="Pricing and Billing (e.g.100)"
                    className={`w-full text-black border-none outline-none bg-transparent mt-2 ${index === activeSubscriptionIndex ? 'resize-none' : 'resize-y'}`}
                    style={{
                      borderColor: "#D1D5DB",
                      backgroundColor: "#F9FAFB",
                      borderRadius: "8px",
                    }} 
                    rows={index === activeSubscriptionIndex ? 3 : 1}
                    onFocus={() => setActiveSubscriptionIndex(index)}
                    onBlur={() => setActiveSubscriptionIndex(null)}
                  />
                </div>
                <div className="relative mt-2">
                  <label className="mr-2">India:</label>
                  <div className="flex items-center">
                    <div
                      className={`w-6 h-6 rounded-full border border-gray-500 flex items-center justify-center cursor-pointer ${subscription.india ? 'bg-[#30AFBC]' : 'bg-gray-300'
                        }`}
                      onClick={() => updateIndiaAttribute(index, true)}
                    >
                      {subscription.india && <div className="w-full h-full bg-[#30AFBC] rounded-full" />}
                      <span className="text-xs font-semibold ml-14 ">True</span>
                    </div>
                    <div
                      className={`w-6 h-6 rounded-full border border-gray-500 ml-10 flex items-center justify-center cursor-pointer ${!subscription.india ? 'bg-[#30AFBC]' : 'bg-gray-300'
                        }`}
                      onClick={() => updateIndiaAttribute(index, false)}
                    >
                      {!subscription.india && <div className="w-full h-full bg-transparent rounded-full" />}
                      <span className="text-xs font-semibold ml-14">False</span>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  {subscription.provides.map((service, serviceIndex) => (
                    <div key={serviceIndex} className="mt-2">
                      <button
                        type="button"
                        onClick={() => removeService(index, serviceIndex)}
                        className="absolute top-[12px] right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white px-1 rounded-full text-sm mr-[12px] z-10 "
                      >
                        <span>✕</span>
                      </button>
                      <TextInput
                        name={`provides.${serviceIndex}.description`}
                        value={service}
                        onChange={(e) => handleSubscriptionChange(index, e)}
                        placeholder={`Service ${serviceIndex + 1} Description`}
                        className="w-full text-black border-none outline-none bg-transparent mt-2 resize-none"
                        style={{
                          borderColor: "#D1D5DB",
                          backgroundColor: "#F9FAFB",
                          borderRadius: "8px",
                        }}    
                        rows={1}
                        onFocus={() => setActiveSubscriptionIndex(index)}
                        onBlur={() => setActiveSubscriptionIndex(null)}
                      />
                    </div>
                  ))}
                  <div className="mb-10 flex justify-center ">

                    <button type="button" onClick={() => addService(index)} className="bg-[#30AFBC] text-white px-4 py-2 mt-4 rounded-md">
                      Add Service
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mb-10 flex justify-center ">
            <button type="button" onClick={addSubscription} className="bg-[#30AFBC] text-white px-4 py-2 mt-4 rounded-md">
              Add Subscription
            </button></div>
        </div>
      </div>
    </div>
  );
}

export default Subscription;