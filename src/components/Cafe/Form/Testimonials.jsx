import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Label, TextInput } from 'flowbite-react';
import { FiUpload, FiAlertCircle } from 'react-icons/fi';
import PropTypes from 'prop-types';

// Constants
const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];
const DEFAULT_TESTIMONIAL = { customerName: '', text: '', rating: '', image: null, imagePreview: null };
const MAX_NAME_LENGTH = 50;
const MAX_TEXT_LENGTH = 500;
const RATING_REGEX = /^[1-5]$/;

// Styles
const styles = {
    uploadArea: "flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:border-[#30afbc] hover:bg-gray-50/80 transition-all duration-200",
    imagePreview: "relative group aspect-square rounded-lg overflow-hidden bg-gray-50",
    imageHover: "absolute inset-0 bg-[#30afbc]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
};

// Error Messages
const ERROR_MESSAGES = {
    fileSize: 'File size should not exceed 4MB',
    fileType: 'Please upload a valid image file (JPG, JPEG, or PNG)',
    required: 'This field is required',
    ratingRange: 'Rating must be between 1 and 5',
    maxLength: (field, max) => `${field} must be less than ${max} characters`
};

// TestimonialCard Component
const TestimonialCard = ({ index, testimonial, onUpdate, onImageChange }) => {
    const [errors, setErrors] = useState({});

    const validateField = (field, value) => {
        if (!value || value.trim() === '') {
            return ERROR_MESSAGES.required;
        }
        switch (field) {
            case 'customerName':
                return value.length > MAX_NAME_LENGTH ? 
                    ERROR_MESSAGES.maxLength('Name', MAX_NAME_LENGTH) : '';
            case 'text':
                return value.length > MAX_TEXT_LENGTH ? 
                    ERROR_MESSAGES.maxLength('Text', MAX_TEXT_LENGTH) : '';
            case 'rating':
                return !RATING_REGEX.test(value) ? ERROR_MESSAGES.ratingRange : '';
            default:
                return '';
        }
    };

    const handleChange = (field, value) => {
        const error = validateField(field, value);
        setErrors(prev => ({ ...prev, [field]: error }));
        onUpdate(index, field, value);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file size
        if (file.size > MAX_FILE_SIZE) {
            setErrors(prev => ({ ...prev, image: ERROR_MESSAGES.fileSize }));
            return;
        }

        // Validate file type
        if (!ALLOWED_FILE_TYPES.includes(file.type)) {
            setErrors(prev => ({ ...prev, image: ERROR_MESSAGES.fileType }));
            return;
        }

        // Clear error if validation passes
        setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors.image;
            return newErrors;
        });

        onImageChange(index, file);
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
                Testimonial {index + 1}
            </h3>

            {/* Image Upload */}
            <div className="mb-6">
                <Label className="block text-sm font-medium text-gray-700 mb-2">
                    Customer Photo <span className="text-red-500">*</span>
                </Label>
                <label
                    htmlFor={`testimonial-image-${index}`}
                    className={`${styles.uploadArea} ${errors.image ? 'border-red-500' : ''}`}
                >
                    {!testimonial.imagePreview ? (
                        <div className="flex flex-col items-center justify-center space-y-2">
                            <FiUpload className={`w-8 h-8 ${errors.image ? 'text-red-400' : 'text-gray-400'}`} />
                            <p className={`text-sm ${errors.image ? 'text-red-500' : 'text-gray-500'}`}>
                                Click to upload photo
                            </p>
                            <p className="text-xs text-gray-500">
                                PNG, JPEG, or JPG (max. 4MB)
                            </p>
                        </div>
                    ) : (
                        <div className={styles.imagePreview}>
                            <img
                                src={testimonial.imagePreview}
                                alt="Customer"
                                className="w-full h-full object-cover"
                            />
                            <div className={styles.imageHover}>
                                <p className="text-white text-sm">Click to change photo</p>
                            </div>
                        </div>
                    )}
                    <input
                        id={`testimonial-image-${index}`}
                        type="file"
                        accept={ALLOWED_FILE_TYPES.join(',')}
                        onChange={handleImageChange}
                        className="hidden"
                    />
                </label>
                {errors.image && (
                    <p className="mt-1 text-sm text-red-500">{errors.image}</p>
                )}
            </div>

            {/* Customer Name */}
            <div className="mb-4">
                <Label htmlFor={`customer-name-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                    Customer Name <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                    <TextInput
                        id={`customer-name-${index}`}
                        type="text"
                        value={testimonial.customerName}
                        onChange={(e) => handleChange('customerName', e.target.value)}
                        placeholder="Enter customer name"
                        maxLength={MAX_NAME_LENGTH}
                        className={errors.customerName ? 'border-red-500' : ''}
                    />
                    {errors.customerName && (
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <FiAlertCircle className="h-5 w-5 text-red-500" />
                        </div>
                    )}
                </div>
                {errors.customerName && (
                    <p className="mt-1 text-sm text-red-500">{errors.customerName}</p>
                )}
                <p className="mt-1 text-sm text-gray-500">
                    {testimonial.customerName?.length || 0}/{MAX_NAME_LENGTH} characters
                </p>
            </div>

            {/* Testimonial Text */}
            <div className="mb-4">
                <Label htmlFor={`testimonial-text-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                    Testimonial Text <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                    <TextInput
                        id={`testimonial-text-${index}`}
                        type="text"
                        value={testimonial.text}
                        onChange={(e) => handleChange('text', e.target.value)}
                        placeholder="Enter customer testimonial"
                        maxLength={MAX_TEXT_LENGTH}
                        className={errors.text ? 'border-red-500' : ''}
                    />
                    {errors.text && (
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <FiAlertCircle className="h-5 w-5 text-red-500" />
                        </div>
                    )}
                </div>
                {errors.text && (
                    <p className="mt-1 text-sm text-red-500">{errors.text}</p>
                )}
                <p className="mt-1 text-sm text-gray-500">
                    {testimonial.text?.length || 0}/{MAX_TEXT_LENGTH} characters
                </p>
            </div>

            {/* Rating */}
            <div>
                <Label htmlFor={`rating-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                    Rating (1-5) <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                    <TextInput
                        id={`rating-${index}`}
                        type="number"
                        min="1"
                        max="5"
                        value={testimonial.rating}
                        onChange={(e) => handleChange('rating', e.target.value)}
                        placeholder="Enter rating (1-5)"
                        className={errors.rating ? 'border-red-500' : ''}
                    />
                    {errors.rating && (
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <FiAlertCircle className="h-5 w-5 text-red-500" />
                        </div>
                    )}
                </div>
                {errors.rating && (
                    <p className="mt-1 text-sm text-red-500">{errors.rating}</p>
                )}
            </div>
        </div>
    );
};

TestimonialCard.propTypes = {
    index: PropTypes.number.isRequired,
    testimonial: PropTypes.shape({
        customerName: PropTypes.string,
        text: PropTypes.string,
        rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        image: PropTypes.object,
        imagePreview: PropTypes.string
    }).isRequired,
    onUpdate: PropTypes.func.isRequired,
    onImageChange: PropTypes.func.isRequired
};

// Main Testimonials Component
const Testimonials = ({ testimonials, setTestimonials }) => {
    const handleTestimonialChange = useCallback((index, field, value) => {
        setTestimonials(prev => {
            const newTestimonials = [...prev];
            newTestimonials[index] = {
                ...newTestimonials[index],
                [field]: value
            };
            return newTestimonials;
        });
    }, [setTestimonials]);

    const handleImageChange = useCallback((index, file) => {
        try {
            setTestimonials(prev => {
                const newTestimonials = [...prev];
                newTestimonials[index] = {
                    ...newTestimonials[index],
                    image: file,
                    imagePreview: URL.createObjectURL(file)
                };
                return newTestimonials;
            });
        } catch (error) {
            console.error('Error handling image change:', error);
        }
    }, [setTestimonials]);

    // Initialize testimonials
    useEffect(() => {
        if (!testimonials?.length || testimonials.length !== 3) {
            const newTestimonials = Array(3).fill(DEFAULT_TESTIMONIAL);
            testimonials?.slice(0, 3).forEach((t, i) => {
                if (t) newTestimonials[i] = t;
            });
            setTestimonials(newTestimonials);
        }
    }, [testimonials, setTestimonials]);

    const testimonialCards = useMemo(() => (
        testimonials?.map((testimonial, index) => (
            <TestimonialCard
                key={index}
                index={index}
                testimonial={testimonial}
                onUpdate={handleTestimonialChange}
                onImageChange={handleImageChange}
            />
        ))
    ), [testimonials, handleTestimonialChange, handleImageChange]);

    return (
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Customer Testimonials</h1>
                <p className="text-gray-600">
                    Share three testimonials from your satisfied customers
                </p>
            </div>

            <div className="space-y-8">
                {testimonialCards}
            </div>
        </div>
    );
};

Testimonials.propTypes = {
    testimonials: PropTypes.arrayOf(PropTypes.shape({
        customerName: PropTypes.string,
        text: PropTypes.string,
        rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        image: PropTypes.object,
        imagePreview: PropTypes.string
    })),
    setTestimonials: PropTypes.func.isRequired
};

export default Testimonials;
