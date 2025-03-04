import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Label, TextInput } from 'flowbite-react';
import { FiPhone } from 'react-icons/fi';
import PropTypes from 'prop-types';

// Constants
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\+?[\d\s-]{10,}$/;
const URL_REGEX = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

// Validation functions
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

const validateContactData = (contactData) => {
  if (!contactData) return false;
  
  const requiredFields = {
    firstName: contactData.firstName?.trim(),
    lastName: contactData.lastName?.trim(),
    emailId: contactData.emailId?.trim(),
    phoneNumber: contactData.phoneNumber?.trim(),
    address: contactData.address?.trim()
  };

  const missingFields = Object.entries(requiredFields).filter(([_, value]) => !value);
  if (missingFields.length > 0) return false;

  if (!EMAIL_REGEX.test(contactData.emailId)) return false;
  if (!PHONE_REGEX.test(contactData.phoneNumber)) return false;
  if (contactData.visitUs?.locatemap && !URL_REGEX.test(contactData.visitUs.locatemap)) return false;

  return true;
};

const Contact = ({ contactInfo, setContactInfo }) => {
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Memoize the initial contact info structure
  const initialContactInfo = useMemo(() => ({
    firstName: '',
    lastName: '',
    userName: '',
    emailId: '',
    phoneNumber: '',
    Query_PhoneNumber: '',
    address: '',
    Query_Address: '',
    socialMediaLinks: {
      instagram: '',
      facebook: '',
      youtube: ''
    },
    visitUs: {
      locatemap: ''
    }
  }), []);

  // Load data from localStorage
  const loadFromLocalStorage = useCallback(async () => {
    try {
      setIsLoading(true);
      const savedData = JSON.parse(localStorage.getItem('cafeFormData') || '{}');
      
      const newContactInfo = {
        ...initialContactInfo,
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

      setContactInfo(newContactInfo);
    } catch (error) {
      console.error('Error loading contact data:', error);
      // Set default values on error
      setContactInfo(initialContactInfo);
    } finally {
      setIsLoading(false);
    }
  }, [setContactInfo, initialContactInfo]);

  // Load data on mount
  useEffect(() => {
    loadFromLocalStorage();
  }, [loadFromLocalStorage]);

  // Handle input changes with validation
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

      // Save to localStorage
      try {
        const savedData = JSON.parse(localStorage.getItem('cafeFormData') || '{}');
        const dataToSave = {
          ...savedData,
          ...updated,
          socialMediaLinks: updated.socialMediaLinks,
          visitUs: updated.visitUs
        };
        localStorage.setItem('cafeFormData', JSON.stringify(dataToSave));
      } catch (error) {
        console.error('Error saving to localStorage:', error);
      }
      
      return updated;
    });
  }, [setContactInfo]);

  // Memoize social media platforms configuration
  const socialPlatforms = useMemo(() => [
    { id: 'instagram', label: 'Instagram', icon: 'instagram' },
    { id: 'facebook', label: 'Facebook', icon: 'facebook' },
    { id: 'youtube', label: 'YouTube', icon: 'youtube' }
  ], []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
      </div>
    );
  }

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
        {/* Personal Information */}
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
                aria-label="First Name"
                aria-invalid={!!errors.firstName}
                aria-describedby={errors.firstName ? "firstName-error" : undefined}
                className={errors.firstName ? 'border-red-500' : ''}
              />
              {errors.firstName && (
                <p id="firstName-error" className="mt-1 text-sm text-red-500" role="alert">
                  {errors.firstName}
                </p>
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
                aria-label="Last Name"
                aria-invalid={!!errors.lastName}
                aria-describedby={errors.lastName ? "lastName-error" : undefined}
                className={errors.lastName ? 'border-red-500' : ''}
              />
              {errors.lastName && (
                <p id="lastName-error" className="mt-1 text-sm text-red-500" role="alert">
                  {errors.lastName}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Contact Details */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Contact Details
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
                aria-label="Email Address"
                aria-invalid={!!errors.emailId}
                aria-describedby={errors.emailId ? "email-error" : undefined}
                className={errors.emailId ? 'border-red-500' : ''}
              />
              {errors.emailId && (
                <p id="email-error" className="mt-1 text-sm text-red-500" role="alert">
                  {errors.emailId}
                </p>
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
                aria-label="Phone Number"
                aria-invalid={!!errors.phoneNumber}
                aria-describedby={errors.phoneNumber ? "phone-error" : undefined}
                className={errors.phoneNumber ? 'border-red-500' : ''}
              />
              {errors.phoneNumber && (
                <p id="phone-error" className="mt-1 text-sm text-red-500" role="alert">
                  {errors.phoneNumber}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Address
          </h2>
          
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
              aria-label="Business Address"
              aria-invalid={!!errors.address}
              aria-describedby={errors.address ? "address-error" : undefined}
              className={errors.address ? 'border-red-500' : ''}
            />
            {errors.address && (
              <p id="address-error" className="mt-1 text-sm text-red-500" role="alert">
                {errors.address}
              </p>
            )}
          </div>
        </div>

        {/* Location Map */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Location Map
          </h2>
          
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
              aria-label="Location Map URL"
              aria-invalid={!!errors.locationMap}
              aria-describedby={errors.locationMap ? "locationMap-error" : undefined}
              className={errors.locationMap ? 'border-red-500' : ''}
            />
            {errors.locationMap && (
              <p id="locationMap-error" className="mt-1 text-sm text-red-500" role="alert">
                {errors.locationMap}
              </p>
            )}
          </div>
        </div>

        {/* Social Media Links */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Social Media Links
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {socialPlatforms.map(({ id, label }) => (
              <div key={id}>
                <Label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
                  {label}
                </Label>
                <TextInput
                  id={id}
                  type="url"
                  value={contactInfo.socialMediaLinks?.[id] || ''}
                  onChange={(e) => handleInputChange(`social_${id}`, e.target.value)}
                  placeholder={`${label} profile URL`}
                  aria-label={`${label} Profile URL`}
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
    socialMediaLinks: PropTypes.shape({
      instagram: PropTypes.string,
      facebook: PropTypes.string,
      youtube: PropTypes.string
    }),
    visitUs: PropTypes.shape({
      locatemap: PropTypes.string
    })
  }).isRequired,
  setContactInfo: PropTypes.func.isRequired
};

// Export both the component and the validation function
Contact.validateContactData = validateContactData;

export default Contact;