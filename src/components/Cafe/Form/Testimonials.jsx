import React, { useState, useEffect, useCallback } from 'react';
import { Label, TextInput, Textarea } from 'flowbite-react';
import { FiUpload, FiAlertCircle } from 'react-icons/fi';
import PropTypes from 'prop-types';
import { convertFileToBase64, base64ToFile } from '../../../utils/imageUtils';

// Constants
const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];
const MAX_NAME_LENGTH = 50;
const MAX_TEXT_LENGTH = 500;

const Testimonials = ({ testimonials, setTestimonials }) => {
    const [errors, setErrors] = useState({});

    // Save to localStorage whenever testimonials change
    useEffect(() => {
        const saveTestimonials = async () => {
            if (!testimonials?.length) return;

            try {
                const savedData = JSON.parse(localStorage.getItem('cafeFormData') || '{}');
                
                // Process testimonials with images
                const processedTestimonials = await Promise.all(testimonials.map(async (t) => {
                    let imageBase64 = '';
                    if (t.uploadedFile) {
                        imageBase64 = await convertFileToBase64(t.uploadedFile);
                    } else if (t.imgSrc && t.imgSrc.startsWith('data:image')) {
                        imageBase64 = t.imgSrc;
                    }

                    return {
                        customerName: t.customerName || '',
                        text: t.text || '',
                        rating: t.rating || 5,
                        imgSrc: t.imgSrc || '',
                        imageBase64
                    };
                }));

                localStorage.setItem('cafeFormData', JSON.stringify({
                    ...savedData,
                    testimonials: processedTestimonials
                }));
            } catch (error) {
                console.error('Error saving testimonials:', error);
            }
        };

        saveTestimonials();
    }, [testimonials]);

    // Initialize testimonials if needed
    useEffect(() => {
        const loadSavedTestimonials = async () => {
            try {
                const savedData = JSON.parse(localStorage.getItem('cafeFormData') || '{}');
                
                if (savedData.testimonials?.length > 0) {
                    const loadedTestimonials = savedData.testimonials.map(t => {
                        let imgSrc = t.imgSrc || '';
                        let uploadedFile = null;

                        // If we have a base64 image, convert it to a File
                        if (t.imageBase64) {
                            imgSrc = t.imageBase64;
                            try {
                                uploadedFile = base64ToFile(
                                    t.imageBase64,
                                    `testimonial_${Date.now()}.jpg`,
                                    'image/jpeg'
                                );
                            } catch (error) {
                                console.error('Error converting base64 to file:', error);
                            }
                        }

                        return {
                            customerName: t.customerName || '',
                            text: t.text || '',
                            rating: t.rating || 5,
                            imgSrc,
                            uploadedFile
                        };
                    });
                    setTestimonials(loadedTestimonials);
                } else {
                    // Initialize with empty testimonials
                    const emptyTestimonials = Array(5).fill().map(() => ({
                        customerName: '',
                        text: '',
                        rating: 5,
                        imgSrc: '',
                        uploadedFile: null
                    }));
                    setTestimonials(emptyTestimonials);
                }
            } catch (error) {
                console.error('Error loading testimonials:', error);
            }
        };

        loadSavedTestimonials();
    }, []); // Run only on mount

    const validateTestimonial = (testimonial) => {
        const errors = {};
        
        if (!testimonial.customerName?.trim()) {
            errors.customerName = 'Customer name is required';
        } else if (testimonial.customerName.length > MAX_NAME_LENGTH) {
            errors.customerName = `Name must be less than ${MAX_NAME_LENGTH} characters`;
        }

        if (!testimonial.text?.trim()) {
            errors.text = 'Testimonial text is required';
        } else if (testimonial.text.length > MAX_TEXT_LENGTH) {
            errors.text = `Text must be less than ${MAX_TEXT_LENGTH} characters`;
        }

        if (!testimonial.imgSrc) {
            errors.image = 'Customer image is required';
        }

        return errors;
    };

    const validateAllTestimonials = () => {
        let allErrors = {};
        let isValid = true;

        testimonials.forEach((testimonial, index) => {
            const testimonialErrors = validateTestimonial(testimonial);
            if (Object.keys(testimonialErrors).length > 0) {
                isValid = false;
                Object.keys(testimonialErrors).forEach(key => {
                    allErrors[`testimonial${index}${key}`] = testimonialErrors[key];
                });
            }
        });

        setErrors(allErrors);
        return isValid;
    };

    const handleChange = useCallback((index, field, value) => {
        setTestimonials(prev => {
            const updated = [...prev];
            updated[index] = {
                ...updated[index],
                [field]: value
            };
            return updated;
        });

        // Clear errors for this field
        setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors[`testimonial${index}${field}`];
            return newErrors;
        });
    }, [setTestimonials]);

    const handleImageChange = useCallback(async (index, file) => {
        if (!file) return;

        if (file.size > MAX_FILE_SIZE) {
            setErrors(prev => ({
                ...prev,
                [`testimonial${index}Image`]: 'File size must be less than 4MB'
            }));
            return;
        }

        if (!ALLOWED_FILE_TYPES.includes(file.type)) {
            setErrors(prev => ({
                ...prev,
                [`testimonial${index}Image`]: 'Please upload a JPG or PNG file'
            }));
            return;
        }

        try {
            // Create a blob URL for preview
            const previewUrl = URL.createObjectURL(file);
            
            setTestimonials(prev => {
                const updated = [...prev];
                updated[index] = {
                    ...updated[index],
                    uploadedFile: file,
                    imgSrc: previewUrl
                };
                return updated;
            });

            // Clear any previous errors
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[`testimonial${index}Image`];
                return newErrors;
            });
        } catch (error) {
            console.error('Error handling image:', error);
            setErrors(prev => ({
                ...prev,
                [`testimonial${index}Image`]: 'Error processing image. Please try again.'
            }));
        }
    }, [setTestimonials]);

    // Add cleanup for blob URLs
    useEffect(() => {
        return () => {
            testimonials.forEach(testimonial => {
                if (testimonial.imgSrc && testimonial.imgSrc.startsWith('blob:')) {
                    URL.revokeObjectURL(testimonial.imgSrc);
                }
            });
        };
    }, [testimonials]);

    return (
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Customer Testimonials</h1>
                <p className="text-gray-600">Share five testimonials from your satisfied customers</p>
                <p className="text-sm text-red-500 mt-2">* All fields are required</p>
            </div>

            <div className="space-y-8">
                {testimonials.map((testimonial, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <h3 className="text-lg font-semibold mb-4">Testimonial #{index + 1}</h3>

                        {/* Customer Name Input */}
                        <div className="mb-4">
                            <Label htmlFor={`customerName-${index}`}>
                                Customer Name <span className="text-red-500">*</span>
                            </Label>
                            <TextInput
                                id={`customerName-${index}`}
                                value={testimonial.customerName}
                                onChange={(e) => handleChange(index, 'customerName', e.target.value)}
                                placeholder="Enter customer name"
                                className={errors[`testimonial${index}CustomerName`] ? 'border-red-500' : ''}
                            />
                            {errors[`testimonial${index}CustomerName`] && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors[`testimonial${index}CustomerName`]}
                                </p>
                            )}
                        </div>

                        {/* Testimonial Text Input */}
                        <div className="mb-4">
                            <Label htmlFor={`text-${index}`}>
                                Testimonial Text <span className="text-red-500">*</span>
                            </Label>
                            <Textarea
                                id={`text-${index}`}
                                value={testimonial.text}
                                onChange={(e) => handleChange(index, 'text', e.target.value)}
                                placeholder="Enter customer testimonial"
                                rows={4}
                                className={errors[`testimonial${index}Text`] ? 'border-red-500' : ''}
                            />
                            {errors[`testimonial${index}Text`] && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors[`testimonial${index}Text`]}
                                </p>
                            )}
                            <p className="mt-1 text-sm text-gray-500">
                                {testimonial.text?.length || 0}/{MAX_TEXT_LENGTH} characters
                            </p>
                        </div>

                        {/* Image Upload */}
                        <div className="mb-4">
                            <Label>
                                Customer Image <span className="text-red-500">*</span>
                            </Label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageChange(index, e.target.files[0])}
                                className="hidden"
                                id={`image-${index}`}
                            />
                            <label
                                htmlFor={`image-${index}`}
                                className="cursor-pointer block"
                            >
                                {testimonial.imgSrc ? (
                                    <div className="relative w-32 h-32">
                                        <img
                                            src={testimonial.imgSrc}
                                            alt="Preview"
                                            className="w-full h-full object-cover rounded-lg"
                                            onError={(e) => {
                                                console.error('Error loading image:', e);
                                                e.target.src = ''; // Clear the broken image
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-lg">
                                            <p className="text-white text-sm">Change Image</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-gray-400 transition-colors">
                                        <FiUpload className="w-6 h-6 text-gray-400" />
                                    </div>
                                )}
                            </label>
                            {errors[`testimonial${index}Image`] && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors[`testimonial${index}Image`]}
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mb-8 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-700 mb-2">Validation Status</h3>
                {testimonials.map((t, index) => (
                    <div key={index} className="flex items-center gap-2 mb-1">
                        <div className={`w-2 h-2 rounded-full ${
                            t.customerName?.trim() && t.text?.trim() 
                            ? 'bg-green-500' 
                            : 'bg-red-500'
                        }`} />
                        <span className="text-sm text-gray-600">
                            Testimonial #{index + 1}: {
                                t.customerName?.trim() && t.text?.trim() 
                                ? 'Complete' 
                                : 'Incomplete'
                            }
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

Testimonials.propTypes = {
    testimonials: PropTypes.arrayOf(PropTypes.shape({
        customerName: PropTypes.string,
        text: PropTypes.string,
        imgSrc: PropTypes.string,
        uploadedFile: PropTypes.object,
        rating: PropTypes.number
    })).isRequired,
    setTestimonials: PropTypes.func.isRequired
};

export default Testimonials;
