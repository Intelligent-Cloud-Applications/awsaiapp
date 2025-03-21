import React, { useState, useEffect, useContext } from 'react';
import Select from 'react-select';
import { API } from "aws-amplify";
import Currency from "../../Auth/Currency";
import Context from "../../../context/Context";
import { TextInput, Label } from 'flowbite-react';
import { FiDollarSign, FiPackage, FiPlusCircle, FiX, FiToggleRight } from 'react-icons/fi';

// function Subscription({ subscriptions, setSubscriptions, country, setCountry, countryCode, setCountryCode }) {
  function Subscription({ subscriptions, setSubscriptions}) {
  const [provides, setProvides] = useState([]);
  const [subscriptionTypes, setSubscriptionTypes] = useState(Array(subscriptions.length).fill('monthly'));
  const [classType, setclassType] = useState([]);
  const [selectedclassType, setSelectedclassType] = useState(Array(subscriptions.length).fill([]));
  const [countryCodes, setCountryCodes] = useState(Array(subscriptions.length).fill(''));
  const Ctx = useContext(Context);
  const util = useContext(Context).util;

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

  useEffect(() => {
    localStorage.setItem('subscriptionTypes', JSON.stringify(subscriptionTypes));
    localStorage.setItem('countryCodes', JSON.stringify(countryCodes));
    localStorage.setItem('provides', JSON.stringify(provides));
  }, [subscriptionTypes, countryCodes, provides]);

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

      updatedSubscriptions[subscriptionIndex] = {
        ...updatedSubscriptions[subscriptionIndex],
        subscriptionType: value,
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
      duration: 0,
      durationText: "",
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
        console.log(e);
      } finally {
        util.setLoader(false);
      }
    }
    const updatedSubscriptions = subscriptions.filter((_, index) => index !== indexToRemove);
    setSubscriptions(updatedSubscriptions);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-50 mb-6">
          <FiDollarSign className="w-8 h-8 text-teal-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Subscription Plans</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Clearly outline your subscription options, highlighting key features and benefits to help users make informed decisions.
        </p>
      </div>

      <div className="space-y-8">
        {subscriptions.map((subscription, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <FiPackage className="w-5 h-5 text-teal-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Subscription {index + 1}
                </h2>
              </div>
              {index >= 3 && (
                <button
                  onClick={() => removeSubscription(index)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                  title="Remove Subscription"
                >
                  <FiX className="w-5 h-5" />
                </button>
              )}
            </div>

            <div className="space-y-6">
              {/* Subscription Title */}
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-1">
                  Subscription Title
                </Label>
                <TextInput
                  type="text"
                  name="heading"
                  value={subscription.heading}
                  onChange={(e) => handleSubscriptionChange(index, e)}
                  placeholder="Enter subscription title"
                  className="w-full bg-gray-50"
                />
              </div>

              {/* Class Types */}
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-1">
                  Class Types
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

              {/* Duration */}
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration (Months)
                </Label>
                <TextInput
                  type="number"
                  name="duration"
                  value={subscription.duration}
                  onChange={(e) => handleSubscriptionChange(index, e)}
                  placeholder="Enter duration in months (e.g., 1, 2, 3)"
                  className="w-full bg-gray-50"
                />
              </div>

              {/* Duration Text */}
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration Text
                </Label>
                <TextInput
                  type="text"
                  name="durationText"
                  value={subscription.durationText}
                  onChange={(e) => handleSubscriptionChange(index, e)}
                  placeholder="Enter duration text (e.g., January - April)"
                  className="w-full bg-gray-50"
                />
              </div>

              {/* Currency Selection */}
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-1">
                  Currency
                </Label>
                <select
                  value={countryCodes[index]}
                  name="currency"
                  onChange={(e) => handleSubscriptionChange(index, e)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                >
                  {<Currency />}
                </select>
              </div>

              {/* Amount */}
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount
                </Label>
                <TextInput
                  type="text"
                  name="amount"
                  value={subscription.amount}
                  onChange={(e) => handleSubscriptionChange(index, e)}
                  placeholder="Enter amount (e.g., 100)"
                  className="w-full bg-gray-50"
                />
              </div>

              {/* India Toggle */}
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">
                  Available in India
                </Label>
                <div className="flex items-center gap-8">
                  <button
                    onClick={() => updateIndiaAttribute(index, true)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                      subscription.india 
                        ? 'bg-teal-50 border-teal-500 text-teal-700' 
                        : 'border-gray-300 text-gray-700'
                    }`}
                  >
                    <FiToggleRight className={`w-4 h-4 ${subscription.india ? 'text-teal-500' : 'text-gray-400'}`} />
                    Yes
                  </button>
                  <button
                    onClick={() => updateIndiaAttribute(index, false)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                      !subscription.india 
                        ? 'bg-teal-50 border-teal-500 text-teal-700' 
                        : 'border-gray-300 text-gray-700'
                    }`}
                  >
                    <FiToggleRight className={`w-4 h-4 ${!subscription.india ? 'text-teal-500' : 'text-gray-400'}`} />
                    No
                  </button>
                </div>
              </div>

              {/* Services */}
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">
                  Services
                </Label>
                <div className="space-y-3">
                  {subscription.provides.map((service, serviceIndex) => (
                    <div key={serviceIndex} className="relative">
                      <TextInput
                        name={`provides.${serviceIndex}.description`}
                        value={service}
                        onChange={(e) => handleSubscriptionChange(index, e)}
                        placeholder={`Enter service ${serviceIndex + 1} description`}
                        className="w-full bg-gray-50"
                      />
                      <button
                        onClick={() => removeService(index, serviceIndex)}
                        className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors"
                        title="Remove Service"
                      >
                        <FiX className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => addService(index)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                  >
                    <FiPlusCircle className="w-4 h-4" />
                    Add Service
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="flex justify-center">
          <button
            onClick={addSubscription}
            className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            <FiPlusCircle className="w-5 h-5" />
            Add Subscription Plan
          </button>
        </div>
      </div>

      <style jsx>{`
        .react-select-container {
          width: 100%;
        }
        .react-select__control {
          background-color: #F9FAFB !important;
          border-color: #D1D5DB !important;
          border-radius: 0.5rem !important;
          min-height: 42px !important;
        }
        .react-select__control:hover {
          border-color: #9CA3AF !important;
        }
        .react-select__control--is-focused {
          border-color: #14B8A6 !important;
          box-shadow: 0 0 0 1px #14B8A6 !important;
        }
        .react-select__menu {
          background-color: white !important;
          border-radius: 0.5rem !important;
          border: 1px solid #D1D5DB !important;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
        }
        .react-select__option {
          background-color: white !important;
          color: #374151 !important;
          cursor: pointer !important;
        }
        .react-select__option:hover {
          background-color: #F3F4F6 !important;
        }
        .react-select__option--is-selected {
          background-color: #14B8A6 !important;
          color: white !important;
        }
        .react-select__multi-value {
          background-color: #E6FFFA !important;
          border-radius: 0.375rem !important;
        }
        .react-select__multi-value__label {
          color: #0F766E !important;
        }
        .react-select__multi-value__remove {
          color: #0F766E !important;
          cursor: pointer !important;
        }
        .react-select__multi-value__remove:hover {
          background-color: #99F6E4 !important;
          color: #134E4A !important;
        }
      `}</style>
    </div>
  );
}

export default Subscription;