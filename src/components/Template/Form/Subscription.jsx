import React, { useState, useEffect, useContext } from 'react';
import { Label, TextInput } from 'flowbite-react';
import Select from 'react-select';
import { API } from "aws-amplify";
import Currency from "../../Auth/Currency";
import Context from "../../../context/Context";
import { FiDollarSign, FiPlus, FiX, FiPackage, FiToggleRight } from 'react-icons/fi';

function Subscription({ 
  subscriptions, 
  setSubscriptions, 
  country, 
  setCountry, 
  countryCode, 
  setCountryCode 
}) {
  const [provides, setProvides] = useState([]);
  const [activeSubscriptionIndex, setActiveSubscriptionIndex] = useState(null);
  const [subscriptionTypes, setSubscriptionTypes] = useState(Array(subscriptions.length).fill('monthly'));
  const [classType, setclassType] = useState([]);
  const [selectedclassType, setSelectedclassType] = useState(Array(subscriptions.length).fill([]));
  const [countryCodes, setCountryCodes] = useState(Array(subscriptions.length).fill(''));
  const Ctx = useContext(Context);
  const util = Ctx.util;

  useEffect(() => {
    const savedclassType = JSON.parse(localStorage.getItem('classTypes')) || [];
    setclassType(savedclassType);
  }, []);

  useEffect(() => {
    localStorage.setItem('classTypes', JSON.stringify(classType));
  }, [classType]);

  useEffect(() => {
    const savedSubscriptionTypes = JSON.parse(localStorage.getItem('subscriptionTypes')) || Array(subscriptions.length).fill('monthly');
    const savedCountryCodes = JSON.parse(localStorage.getItem('countryCodes')) || Array(subscriptions.length).fill('');
    const savedProvides = JSON.parse(localStorage.getItem('provides')) || Array(subscriptions.length).fill([]);

    setSubscriptionTypes(savedSubscriptionTypes);
    setCountryCodes(savedCountryCodes);
    setProvides(savedProvides);
  }, [subscriptions.length]);

  const handleClassTypeChange = (subscriptionIndex, selectedOptions) => {
    const updatedSelectedclassType = [...selectedclassType];
    updatedSelectedclassType[subscriptionIndex] = selectedOptions ? selectedOptions.map(option => option.value) : [];
    setSelectedclassType(updatedSelectedclassType);

    const updatedSubscriptions = [...subscriptions];
    updatedSubscriptions[subscriptionIndex].classType = updatedSelectedclassType[subscriptionIndex];
    setSubscriptions(updatedSubscriptions);
  };

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
        durationText: value.charAt(0).toUpperCase() + value.slice(1),
        duration,
      };
    } else if (name.includes('provides')) {
      const [, serviceIndex] = name.split('.');
      const serviceArray = [...updatedSubscriptions[subscriptionIndex].provides];
      serviceArray[serviceIndex] = value;
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
    switch (subscriptionType) {
      case 'monthly': return daysInMonth * 24 * 60 * 60 * 1000;
      case 'weekly': return 7 * 24 * 60 * 60 * 1000;
      case 'yearly': return 365 * 24 * 60 * 60 * 1000;
      case 'quarterly': return 3 * daysInMonth * 24 * 60 * 60 * 1000;
      default: return 0;
    }
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
    const subscription = subscriptions[indexToRemove];
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
        console.error(e);
      } finally {
        util.setLoader(false);
      }
    }
    const updatedSubscriptions = subscriptions.filter((_, index) => index !== indexToRemove);
    setSubscriptions(updatedSubscriptions);
  };

  useEffect(() => {
    localStorage.setItem('subscriptionTypes', JSON.stringify(subscriptionTypes));
    localStorage.setItem('countryCodes', JSON.stringify(countryCodes));
    localStorage.setItem('provides', JSON.stringify(provides));
  }, [subscriptionTypes, countryCodes, provides]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-50 mb-6">
          <FiDollarSign className="w-8 h-8 text-teal-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Subscription Plans</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Create compelling subscription options that showcase the value of your dance studio's offerings.
        </p>
      </div>

      <div className="space-y-8">
        {subscriptions.map((subscription, index) => (
          <div 
            key={index}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Subscription {index + 1}
              </h2>
              {index >= 3 && (
                <button
                  onClick={() => removeSubscription(index)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                  title="Remove subscription"
                >
                  <FiX className="w-5 h-5" />
                </button>
              )}
            </div>

            <div className="space-y-6">
              {/* Subscription Title */}
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-1">
                  Plan Name <span className="text-red-500">*</span>
                </Label>
                <TextInput
                  name="heading"
                  value={subscription.heading}
                  onChange={(e) => handleSubscriptionChange(index, e)}
                  placeholder="Enter subscription name"
                />
              </div>

              {/* Class Types */}
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-1">
                  Available Classes <span className="text-red-500">*</span>
                </Label>
                <Select
                  isMulti
                  value={selectedclassType[index].map(value => ({
                    value,
                    label: value,
                  })) || []}
                  options={classType.map((type) => ({
                    value: type,
                    label: type,
                  }))}
                  onChange={(selectedOptions) => handleClassTypeChange(index, selectedOptions)}
                  placeholder="Select class types"
                  className="react-select-container"
                  classNamePrefix="react-select"
                />
              </div>

              {/* Subscription Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-1">
                    Duration <span className="text-red-500">*</span>
                  </Label>
                  <select
                    value={subscriptionTypes[index]}
                    name="subscriptionType"
                    onChange={(e) => handleSubscriptionChange(index, e)}
                    className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-teal-500 focus:ring-teal-500"
                  >
                    <option value="monthly">Monthly</option>
                    <option value="weekly">Weekly</option>
                    <option value="yearly">Yearly</option>
                    <option value="quarterly">Quarterly</option>
                  </select>
                </div>

                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-1">
                    Currency <span className="text-red-500">*</span>
                  </Label>
                  <select
                    value={countryCodes[index]}
                    name="currency"
                    onChange={(e) => handleSubscriptionChange(index, e)}
                    className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-teal-500 focus:ring-teal-500"
                  >
                    {<Currency />}
                  </select>
                </div>
              </div>

              {/* Amount */}
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount <span className="text-red-500">*</span>
                </Label>
                <TextInput
                  name="amount"
                  value={subscription.amount}
                  onChange={(e) => handleSubscriptionChange(index, e)}
                  placeholder="Enter amount (e.g. 100)"
                  icon={FiDollarSign}
                />
              </div>

              {/* India Toggle */}
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">
                  Available in India
                </Label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => updateIndiaAttribute(index, true)}
                    className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors
                      ${subscription.india 
                        ? 'bg-teal-100 text-teal-700 border-2 border-teal-200' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                  >
                    <FiToggleRight className={`w-5 h-5 ${subscription.india ? 'text-teal-600' : ''}`} />
                    Yes
                  </button>
                  <button
                    onClick={() => updateIndiaAttribute(index, false)}
                    className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors
                      ${!subscription.india 
                        ? 'bg-teal-100 text-teal-700 border-2 border-teal-200' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                  >
                    <FiToggleRight className={`w-5 h-5 ${!subscription.india ? 'text-teal-600' : ''}`} />
                    No
                  </button>
                </div>
              </div>

              {/* Features */}
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">
                  Plan Features
                </Label>
                <div className="space-y-3">
                  {subscription.provides.map((service, serviceIndex) => (
                    <div key={serviceIndex} className="relative">
                      <TextInput
                        name={`provides.${serviceIndex}.description`}
                        value={service}
                        onChange={(e) => handleSubscriptionChange(index, e)}
                        placeholder="Enter feature description"
                      />
                      <button
                        onClick={() => removeService(index, serviceIndex)}
                        className="absolute -right-2 -top-2 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <FiX className="w-5 h-5" />
                      </button>
                    </div>
                  ))}

                  <button
                    onClick={() => addService(index)}
                    className="w-full py-2 border-2 border-dashed border-teal-200 rounded-lg text-teal-600 hover:border-teal-600 hover:text-teal-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <FiPlus className="w-4 h-4" />
                    Add Feature
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Add Subscription Button */}
        <button
          onClick={addSubscription}
          className="w-full py-4 border-2 border-dashed border-teal-200 rounded-xl text-teal-600 hover:border-teal-600 hover:text-teal-700 transition-colors flex items-center justify-center gap-2 bg-white"
        >
          <FiPackage className="w-5 h-5" />
          Add New Subscription Plan
        </button>
      </div>
    </div>
  );
}

export default Subscription;