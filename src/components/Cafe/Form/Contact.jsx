import React, { useState } from 'react';
import { Label, TextInput } from 'flowbite-react';
import { FiPhone, FiMail, FiPlus, FiTrash2 } from 'react-icons/fi';
import PropTypes from 'prop-types';

// Constants
const MAX_USEFUL_LINKS = 5;

// Validation
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\+?[\d\s-]{10,}$/;
const URL_REGEX = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

const Contact = ({
  email,
  setEmail,
  phone,
  setPhone,
  socialMediaLinks,
  setSocialMediaLinks,
  usefulLinks = [],
  setUsefulLinks,
  instagram,
  setInstagram,
  facebook,
  setFacebook,
  youTube,
  setYouTube
}) => {
  const [errors, setErrors] = useState({});

  // Validation function
  const validateField = (field, value) => {
    switch (field) {
      case 'email':
        return EMAIL_REGEX.test(value) ? '' : 'Invalid email format';
      case 'phone':
        return PHONE_REGEX.test(value) ? '' : 'Invalid phone number format';
      default:
        return '';
    }
  };

  const handleSocialMediaChange = (platform, value) => {
    const error = validateField('url', value);
    setErrors(prev => ({ ...prev, [platform]: error }));
    
    // Update both socialMediaLinks and individual platform states
    setSocialMediaLinks(prev => ({
      ...prev,
      [platform]: value
    }));

    // Update individual platform states
    switch(platform) {
      case 'instagram':
        setInstagram(value);
        break;
      case 'facebook':
        setFacebook(value);
        break;
      case 'youtube':
        setYouTube(value);
        break;
      default:
        break;
    }
  };

  const handleUsefulLinkChange = (index, field, value) => {
    const newLinks = [...(usefulLinks || [])];
    newLinks[index] = { 
      ...newLinks[index], 
      [field]: value,
      style: {
        color: "white",
        textDecoration: "none"
      }
    };
    
    if (field === 'url') {
      const error = validateField('url', value);
      setErrors(prev => ({ ...prev, [`usefulLink${index}`]: error }));
    }
    
    setUsefulLinks(newLinks);
  };

  const removeUsefulLink = (index) => {
    setUsefulLinks(prev => (prev || []).filter((_, i) => i !== index));
  };

  const validateContactData = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = "Email is required.";
    }
    if (!phone) {
      newErrors.phone = "Phone number is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Stay Connected</h1>
        <p className="text-gray-600">
          Provide your contact details and social media links for better connectivity.
        </p>
      </div>

      <div className="space-y-8">
        {/* Basic Contact Details */}
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">Basic Contact Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="h-5 w-5 text-gray-400" />
                </div>
                <TextInput
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    const error = validateField('email', e.target.value);
                    setErrors(prev => ({ ...prev, email: error }));
                  }}
                  placeholder="Enter your email"
                  required
                  className="pl-10"
                />
                {errors.email && <p className="text-red-500">{errors.email}</p>}
              </div>
            </div>

            <div>
              <Label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiPhone className="h-5 w-5 text-gray-400" />
                </div>
                <TextInput
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    const error = validateField('phone', e.target.value);
                    setErrors(prev => ({ ...prev, phone: error }));
                  }}
                  placeholder="Enter your phone number"
                  required
                  className="pl-10"
                />
                {errors.phone && <p className="text-red-500">{errors.phone}</p>}
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">Social Media Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="facebook" className="block text-sm font-medium text-gray-700 mb-1">
                Facebook
              </Label>
              <TextInput
                id="facebook"
                type="url"
                value={socialMediaLinks.facebook || ''}
                onChange={(e) => {
                  setSocialMediaLinks(prev => ({ ...prev, facebook: e.target.value }));
                  setFacebook(e.target.value);
                }}
                placeholder="Facebook profile URL"
              />
            </div>

            <div>
              <Label htmlFor="instagram" className="block text-sm font-medium text-gray-700 mb-1">
                Instagram
              </Label>
              <TextInput
                id="instagram"
                type="url"
                value={socialMediaLinks.instagram || ''}
                onChange={(e) => {
                  setSocialMediaLinks(prev => ({ ...prev, instagram: e.target.value }));
                  setInstagram(e.target.value);
                }}
                placeholder="Instagram profile URL"
              />
            </div>

            <div>
              <Label htmlFor="youtube" className="block text-sm font-medium text-gray-700 mb-1">
                YouTube
              </Label>
              <TextInput
                id="youtube"
                type="url"
                value={socialMediaLinks.youtube || ''}
                onChange={(e) => {
                  setSocialMediaLinks(prev => ({ ...prev, youtube: e.target.value }));
                  setYouTube(e.target.value);
                }}
                placeholder="YouTube profile URL"
              />
            </div>
          </div>
        </div>

        {/* Useful Links */}
        <div>
          <div className="space-y-4">
            {(usefulLinks || []).map((link, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`link-title-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                    Link Title
                  </Label>
                  <TextInput
                    id={`link-title-${index}`}
                    type="text"
                    value={link.title}
                    onChange={(e) => handleUsefulLinkChange(index, 'title', e.target.value)}
                    placeholder="Enter link title"
                  />
                </div>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <Label htmlFor={`link-url-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                      URL
                    </Label>
                    <TextInput
                      id={`link-url-${index}`}
                      type="url"
                      value={link.url}
                      onChange={(e) => handleUsefulLinkChange(index, 'url', e.target.value)}
                      placeholder="Enter URL"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeUsefulLink(index)}
                    className="mt-6 px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

Contact.propTypes = {
  email: PropTypes.string.isRequired,
  setEmail: PropTypes.func.isRequired,
  phone: PropTypes.string.isRequired,
  setPhone: PropTypes.func.isRequired,
  socialMediaLinks: PropTypes.object,
  setSocialMediaLinks: PropTypes.func.isRequired,
  usefulLinks: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    url: PropTypes.string,
    style: PropTypes.object
  })),
  setUsefulLinks: PropTypes.func.isRequired,
  instagram: PropTypes.string,
  setInstagram: PropTypes.func.isRequired,
  facebook: PropTypes.string,
  setFacebook: PropTypes.func.isRequired,
  youTube: PropTypes.string,
  setYouTube: PropTypes.func.isRequired
};

export default Contact;