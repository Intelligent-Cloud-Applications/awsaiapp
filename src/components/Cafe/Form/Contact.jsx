import React, { useState, useEffect, useCallback } from 'react';
import { Label, TextInput } from 'flowbite-react';
import { FiPhone } from 'react-icons/fi';
import PropTypes from 'prop-types';

// Constants

// Validation
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\+?[\d\s-]{10,}$/;
const URL_REGEX = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

// Move validateContactData outside the component and update validation
const validateContactData = (contactData) => {
  console.log('Validating contact data:', contactData);
  
  if (!contactData) {
    console.log('Contact data is null or undefined');
    return false;
  }
  
  // Check all required fields
  const requiredFields = {
    firstName: contactData.firstName?.trim(),
    lastName: contactData.lastName?.trim(),
    emailId: contactData.emailId?.trim(),  // Changed from email
    phoneNumber: contactData.phoneNumber?.trim(),  // Changed from phone
    address: contactData.address?.trim()
  };

  // Check if any required field is empty
  const missingFields = Object.entries(requiredFields).filter(([_, value]) => !value);
  if (missingFields.length > 0) {
    return false;
  }

  // Validate email format
  if (!EMAIL_REGEX.test(contactData.emailId)) {
    return false;
  }

  // Validate phone format
  if (!PHONE_REGEX.test(contactData.phoneNumber)) {
    return false;
  }

  // Validate location map if provided
  if (contactData.visitUs?.locatemap && !URL_REGEX.test(contactData.visitUs.locatemap)) {
    return false;
  }

  const isValid = true; // All validations passed
  console.log('Validation result:', isValid);
  return isValid;
};

const Contact = ({
  contactInfo,
  setContactInfo
}) => {
  const [errors, setErrors] = useState({});

  // Load data from localStorage when component mounts
  useEffect(() => {
    try {
      const savedData = JSON.parse(localStorage.getItem('cafeFormData') || '{}');
      console.log('Loading saved data:', savedData); // Debug log
      
      // Create a properly structured contact info object with all fields
      const newContactInfo = {
        firstName: savedData.firstName || '',
        lastName: savedData.lastName || '',
        userName: savedData.userName || '',
        emailId: savedData.emailId || '',
        Query_PhoneNumber: savedData.Query_PhoneNumber || '',
        Query_Address: savedData.Query_Address || '',
        socialMediaLinks: {
          instagram: savedData.socialMediaLinks?.instagram || '',
          facebook: savedData.socialMediaLinks?.facebook || '',
          youtube: savedData.socialMediaLinks?.youtube || ''
        },
        visitUs: {
          locatemap: savedData.visitUs?.locatemap || ''
        }
      };

      console.log('Setting contact info to:', newContactInfo); // Debug log
      setContactInfo(newContactInfo);
      
    } catch (error) {
      console.error('Error loading contact data:', error);
    }
  }, [setContactInfo]); // Add setContactInfo to dependency array

  // Memoize handleInputChange to prevent unnecessary re-renders
  const handleInputChange = useCallback((field, value) => {
    const error = validateField(field, value);
    setErrors(prev => ({ ...prev, [field]: error }));

    setContactInfo(prev => {
      let updated = { ...prev };
      
      switch (field) {
        case 'locationMap':
          updated = {
            ...updated,
            visitUs: {
              ...updated.visitUs,
              locatemap: value
            }
          };
          break;
        case 'firstName':
          updated = {
            ...updated,
            firstName: value,
            userName: `${value} ${updated.lastName || ''}`.trim()
          };
          break;
        case 'lastName':
          updated = {
            ...updated,
            lastName: value,
            userName: `${updated.firstName || ''} ${value}`.trim()
          };
          break;
        case 'emailId':
          updated = {
            ...updated,
            emailId: value
          };
          break;
        case 'phoneNumber':
          updated = {
            ...updated,
            phoneNumber: value,
            Query_PhoneNumber: value
          };
          break;
        case 'address':
          updated = {
            ...updated,
            address: value,
            Query_Address: value
          };
          break;
        case 'social_instagram':
        case 'social_facebook':
        case 'social_youtube':
          const platform = field.split('_')[1];
          updated = {
            ...updated,
            socialMediaLinks: {
              ...updated.socialMediaLinks,
              [platform]: value
            }
          };
          break;
        default:
          updated[field] = value;
      }

      // Save to localStorage immediately
      try {
        const savedData = JSON.parse(localStorage.getItem('cafeFormData') || '{}');
        const dataToSave = {
          ...savedData,
          firstName: updated.firstName || '',
          lastName: updated.lastName || '',
          userName: updated.userName || '',
          emailId: updated.emailId || '',
          Query_PhoneNumber: updated.phoneNumber || updated.Query_PhoneNumber || '',
          Query_Address: updated.address || updated.Query_Address || '',
          socialMediaLinks: {
            instagram: updated.socialMediaLinks?.instagram || '',
            facebook: updated.socialMediaLinks?.facebook || '',
            youtube: updated.socialMediaLinks?.youtube || ''
          },
          visitUs: {
            locatemap: updated.visitUs?.locatemap || ''
          }
        };
        localStorage.setItem('cafeFormData', JSON.stringify(dataToSave));
      } catch (error) {
        console.error('Error saving to localStorage:', error);
      }
      
      return updated;
    });
  }, [setContactInfo]); // Add setContactInfo to dependency array

  // Validation function for all fields
  const validateField = (field, value) => {
    switch (field) {
      case 'firstName':
        return !value?.trim() ? 'First name is required' : '';
      case 'lastName':
        return !value?.trim() ? 'Last name is required' : '';
      case 'emailId':
        if (!value?.trim()) {
          return 'Email is required';
        } else if (!EMAIL_REGEX.test(value.trim())) {
          return 'Invalid email format';
        }
        return '';
      case 'phoneNumber':
        if (!value?.trim()) {
          return 'Phone number is required';
        } else if (!PHONE_REGEX.test(value.trim())) {
          return 'Invalid phone number format';
        }
        return '';
      case 'address':
        return !value?.trim() ? 'Address is required' : '';
      case 'locationMap':
        if (!value?.trim()) {
          return 'Location map URL is required';
        } else if (!URL_REGEX.test(value.trim())) {
          return 'Invalid URL format';
        }
        return '';
      default:
        return '';
    }
  };

  // Export both the component and the validation function
  Contact.validateContactData = validateContactData;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-50 mb-6">
          <FiPhone className="w-8 h-8 text-teal-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Stay Connected</h1>
        <p className="text-gray-600">
          Provide your contact details and social media links for better connectivity.
        </p>
      </div>

      <div className="space-y-8">
        {/* Name Fields */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Personal Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name */}
            <div>
              <Label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                First Name <span className="text-red-500">*</span>
              </Label>
              <TextInput
                id="firstName"
                type="text"
                value={contactInfo?.firstName || ''}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                placeholder="Enter your first name"
                required
                className={`w-full ${errors.firstName ? 'border-red-500' : ''}`}
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <Label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                Last Name <span className="text-red-500">*</span>
              </Label>
              <TextInput
                id="lastName"
                type="text"
                value={contactInfo?.lastName || ''}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                placeholder="Enter your last name"
                required
                className={`w-full ${errors.lastName ? 'border-red-500' : ''}`}
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
              )}
            </div>
          </div>
        </div>

        {/* Basic Contact Details */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Basic Contact Details
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email */}
            <div>
              <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-red-500">*</span>
              </Label>
              <TextInput
                id="email"
                type="email"
                value={contactInfo.emailId || ''}
                onChange={(e) => handleInputChange('emailId', e.target.value)}
                placeholder="Enter your email"
                required
                className={`w-full ${errors.emailId ? 'border-red-500' : ''}`}
              />
              {errors.emailId && (
                <p className="mt-1 text-sm text-red-500">{errors.emailId}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <Label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone <span className="text-red-500">*</span>
              </Label>
              <TextInput
                id="phone"
                type="tel"
                value={contactInfo.Query_PhoneNumber || ''}
                onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                placeholder="Enter your phone number"
                required
                className={`w-full ${errors.phoneNumber ? 'border-red-500' : ''}`}
              />
              {errors.phoneNumber && (
                <p className="mt-1 text-sm text-red-500">{errors.phoneNumber}</p>
              )}
            </div>
          </div>
        </div>

        {/* Address Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Address
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Address */}
            <div>
              <Label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Address <span className="text-red-500">*</span>
              </Label>
              <TextInput
                id="address"
                type="text"
                value={contactInfo.Query_Address || ''}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Enter your business address"
                required
                className={`w-full ${errors.address ? 'border-red-500' : ''}`}
              />
              {errors.address && (
                <p className="mt-1 text-sm text-red-500">{errors.address}</p>
              )}
            </div>
          </div>
        </div>

        {/* Location Map URL */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Location Map URL
          </h2>
          
          <div className="grid grid-cols-1 gap-6">
            <div>
              <Label htmlFor="locationMap" className="block text-sm font-medium text-gray-700 mb-1">
                Location Map URL <span className="text-red-500">*</span>
              </Label>
              <TextInput
                id="locationMap"
                type="url"
                value={contactInfo.visitUs?.locatemap || ''}
                onChange={(e) => handleInputChange('locationMap', e.target.value)}
                placeholder="Enter Google Maps or location URL"
                required
                className={`w-full ${errors.locationMap ? 'border-red-500' : ''}`}
              />
              {errors.locationMap && (
                <p className="mt-1 text-sm text-red-500">{errors.locationMap}</p>
              )}
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Social Media Links
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { platform: 'instagram', label: 'Instagram' },
              { platform: 'facebook', label: 'Facebook' },
              { platform: 'youtube', label: 'YouTube' }
            ].map(({ platform, label }) => (
              <div key={platform}>
                <Label htmlFor={platform} className="block text-sm font-medium text-gray-700 mb-1">
                  {label}
                </Label>
                <TextInput
                  id={platform}
                  type="url"
                  value={contactInfo.socialMediaLinks?.[platform] || ''}
                  onChange={(e) => handleInputChange(`social_${platform}`, e.target.value)}
                  placeholder={`${label} profile URL`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

Contact.propTypes = {
  contactInfo: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    userName: PropTypes.string,
    emailId: PropTypes.string,
    Query_PhoneNumber: PropTypes.string,
    Query_Address: PropTypes.string,
    socialMediaLinks: PropTypes.object,
    visitUs: PropTypes.shape({
      locatemap: PropTypes.string
    })
  }).isRequired,
  setContactInfo: PropTypes.func.isRequired
};

export default Contact;