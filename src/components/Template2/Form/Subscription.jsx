import React, { useState, useEffect, useContext } from 'react';
import { Label, TextInput, Select } from 'flowbite-react';
import { FiDollarSign, FiPlus, FiX, FiPackage, FiClock } from 'react-icons/fi';
import { API } from "aws-amplify";
import Currency from "../../Auth/Currency";
import Context from "../../../context/Context";

function Subscription({ subscriptions, setSubscriptions, country, setCountry, countryCode, setCountryCode }) {
  const [provides, setProvides] = useState([]);
  const [activeSubscriptionIndex, setActiveSubscriptionIndex] = useState(null);
  const [subscriptionTypes, setSubscriptionTypes] = useState(Array(subscriptions.length).fill('monthly'));
  const [countryCodes, setCountryCodes] = useState(Array(subscriptions.length).fill(''));
  const { util } = useContext(Context);

  useEffect(() => {
    const savedSubscriptionTypes = JSON.parse(localStorage.getItem('subscriptionTypes')) || Array(subscriptions.length).fill('monthly');
    const savedCountryCodes = JSON.parse(localStorage.getItem('countryCodes')) || Array(subscriptions.length).fill('');
    const savedProvides = JSON.parse(localStorage.getItem('provides')) || Array(subscriptions.length).fill([]);

    setSubscriptionTypes(savedSubscriptionTypes);
    setCountryCodes(savedCountryCodes);
    setProvides(savedProvides);
  }, [subscriptions.length]);

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

  const handleSubscriptionChange = (subscriptionIndex, e) => {
    const { name, value } = e.target;
    const updatedSubscriptions = [...subscriptions];

    if (name === 'currency') {
      setCountryCodes(prev => {
        const newCodes = [...prev];
        newCodes[subscriptionIndex] = value;
        return newCodes;
      });

      const selectedCountry = e.target.selectedOptions[0].textContent.split(' ')[0];
      updatedSubscriptions[subscriptionIndex] = {
        ...updatedSubscriptions[subscriptionIndex],
        countryCode: value,
        country: selectedCountry,
        currency: value,
      };
    } else if (name === 'subscriptionType') {
      setSubscriptionTypes(prev => {
        const newTypes = [...prev];
        newTypes[subscriptionIndex] = value;
        return newTypes;
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
      duration: calculateDuration('monthly'),
      durationText: 'Monthly',
      india: true,
    };
    setSubscriptions([...subscriptions, newSubscription]);
  };

  const removeSubscription = async (indexToRemove) => {
    const subscription = subscriptions[indexToRemove];
    if (subscription.productId) {
      try {
        util.setLoader(true);
        await API.del("clients", `/user/development-form/delete-subscription/${subscription.institution}`, {
          body: {
            cognitoId: Context.userData.cognitoId,
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
          Create compelling subscription plans that showcase your services' value and attract potential customers.
        </p>
      </div>

      <div className="space-y-8">
        {subscriptions.map((subscription, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <FiPackage className="w-5 h-5 text-teal-600" />
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
              {/* Subscription Details */}
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-1">
                  Plan Name <span className="text-red-500">*</span>
                </Label>
                <TextInput
                  name="heading"
                  value={subscription.heading}
                  onChange={(e) => handleSubscriptionChange(index, e)}
                  placeholder="Enter plan name"
                  className="w-full bg-gray-50 border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Subscription Type */}
                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-1">
                    Duration <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    name="subscriptionType"
                    value={subscriptionTypes[index]}
                    onChange={(e) => handleSubscriptionChange(index, e)}
                    className="w-full bg-gray-50 border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 rounded-lg"
                  >
                    <option value="monthly">Monthly</option>
                    <option value="weekly">Weekly</option>
                    <option value="yearly">Yearly</option>
                    <option value="quarterly">Quarterly</option>
                  </Select>
                </div>

                {/* Currency Selection */}
                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-1">
                    Currency <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    name="currency"
                    value={countryCodes[index]}
                    onChange={(e) => handleSubscriptionChange(index, e)}
                    className="w-full bg-gray-50 border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 rounded-lg"
                  >
                    <Currency />
                  </Select>
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
                  placeholder="Enter amount"
                  type="number"
                  className="w-full bg-gray-50 border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 rounded-lg"
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
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      subscription.india 
                        ? 'bg-teal-600 text-white' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => updateIndiaAttribute(index, false)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      !subscription.india 
                        ? 'bg-teal-600 text-white' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    No
                  </button>
                </div>
              </div>

              {/* Services */}
              <div className="space-y-4">
                <Label className="block text-sm font-medium text-gray-700">
                  Included Services
                </Label>
                {subscription.provides.map((service, serviceIndex) => (
                  <div key={serviceIndex} className="relative">
                    <TextInput
                      name={`provides.${serviceIndex}`}
                      value={service}
                      onChange={(e) => handleSubscriptionChange(index, e)}
                      placeholder={`Service ${serviceIndex + 1}`}
                      className="w-full bg-gray-50 border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 rounded-lg pr-10"
                    />
                    <button
                      onClick={() => removeService(index, serviceIndex)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <FiX className="w-5 h-5" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addService(index)}
                  className="w-full py-3 border-2 border-dashed border-teal-200 rounded-lg text-teal-600 hover:border-teal-600 hover:text-teal-700 transition-colors flex items-center justify-center gap-2"
                >
                  <FiPlus className="w-5 h-5" />
                  Add Service
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Add Subscription Button */}
        <button
          onClick={addSubscription}
          className="w-full py-4 border-2 border-dashed border-teal-200 rounded-xl text-teal-600 hover:border-teal-600 hover:text-teal-700 transition-colors flex items-center justify-center gap-2 bg-white"
        >
          <FiPlus className="w-5 h-5" />
          Add New Subscription Plan
        </button>
      </div>
    </div>
  );
}

export default Subscription;