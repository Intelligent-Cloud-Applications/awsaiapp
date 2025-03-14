import React, { useState, useEffect, useCallback } from 'react';
import { Label, TextInput, Textarea } from 'flowbite-react';
import { FiUpload } from 'react-icons/fi';
import PropTypes from 'prop-types';
import { convertFileToBase64, base64ToFile } from '../../../utils/imageUtils';
import { FiStar } from 'react-icons/fi';

// Constants
const MAX_NAME_LENGTH = 50;
const MAX_TEXT_LENGTH = 500;
const MAX_FILE_SIZE_MB = 50;
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/gif'];

const compressImage = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Set maximum dimensions
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 800;

        let width = img.width;
        let height = img.height;

        // Calculate new dimensions
        if (width > height) {
          if (width > MAX_WIDTH) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width = Math.round((width * MAX_HEIGHT) / height);
            height = MAX_HEIGHT;
          }
        }

        // Set canvas dimensions
        canvas.width = width;
        canvas.height = height;

        // Draw and compress
        ctx.drawImage(img, 0, 0, width, height);
        
        // Convert to JPEG with 0.7 quality
        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
        
        // Verify the size is under 1MB
        const sizeInMB = (compressedBase64.length * 0.75) / (1024 * 1024);
        if (sizeInMB > 1) {
          // If still too large, compress more
          resolve(canvas.toDataURL('image/jpeg', 0.5));
        } else {
          resolve(compressedBase64);
        }
      };

      img.onerror = reject;
    };

    reader.onerror = reject;
  });
};

// Validation functions
const validateImageFile = (file) => {
  if (!file) {
    return 'Please select a file';
  }

  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    return `Invalid file type. Allowed types: ${ALLOWED_FILE_TYPES.map(type => type.split('/')[1]).join(', ')}`;
  }

  const fileSizeMB = file.size / (1024 * 1024);
  if (fileSizeMB > MAX_FILE_SIZE_MB) {
    return `File size exceeds ${MAX_FILE_SIZE_MB}MB. Please choose a smaller file.`;
  }

  return null;
};

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
    }, [setTestimonials]); // Add setTestimonials to dependency array

    const validateTestimonial = useCallback((testimonial) => {
        const errors = {};
        
        // Customer Name validation
        if (!testimonial.customerName?.trim()) {
            errors.customerName = 'Customer name is required';
        } else if (testimonial.customerName.length > MAX_NAME_LENGTH) {
            errors.customerName = `Name must be ${MAX_NAME_LENGTH} characters or less`;
        } else if (!/^[a-zA-Z\s]*$/.test(testimonial.customerName)) {
            errors.customerName = 'Name can only contain letters and spaces';
        }

        // Testimonial text validation
        if (!testimonial.text?.trim()) {
            errors.text = 'Testimonial text is required';
        } else if (testimonial.text.length > MAX_TEXT_LENGTH) {
            errors.text = `Text must be ${MAX_TEXT_LENGTH} characters or less`;
        }

        // Image validation
        if (!testimonial.imgSrc) {
            errors.image = 'Customer image is required';
        }

        return errors;
    }, []);

    const handleChange = useCallback((index, field, value) => {
        setTestimonials(prev => {
            const updated = [...prev];
            updated[index] = {
                ...updated[index],
                [field]: value
            };
            return updated;
        });

        // Validate the changed testimonial
        const testimonial = testimonials[index];
        const testimonialErrors = validateTestimonial({
            ...testimonial,
            [field]: value
        });

        // Update errors
        setErrors(prev => {
            const newErrors = { ...prev };
            // Clear existing errors for this testimonial
            Object.keys(newErrors)
                .filter(key => key.startsWith(`testimonial${index}`))
                .forEach(key => delete newErrors[key]);
            // Add new errors if any
            Object.entries(testimonialErrors).forEach(([key, value]) => {
                newErrors[`testimonial${index}${key}`] = value;
            });
            return newErrors;
        });
    }, [setTestimonials, testimonials, validateTestimonial]);

    const handleImageChange = useCallback(async (index, file) => {
        if (!file) return;

        try {
            // Show loading state
            setTestimonials(prev => {
                const updated = [...prev];
                updated[index] = {
                    ...updated[index],
                    imgSrc: 'loading'
                };
                return updated;
            });

            // Validate file
            const validationError = validateImageFile(file);
            if (validationError) {
                throw new Error(validationError);
            }

            // Compress the image
            const compressedBase64 = await compressImage(file);
            console.log('Image compressed successfully');

            // Create preview URL
            setTestimonials(prev => {
                const updated = [...prev];
                updated[index] = {
                    ...updated[index],
                    uploadedFile: file,
                    imgSrc: compressedBase64
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
                [`testimonial${index}Image`]: error.message || 'Error processing image. Please try again.'
            }));
            
            // Reset image on error
            setTestimonials(prev => {
                const updated = [...prev];
                updated[index] = {
                    ...updated[index],
                    imgSrc: ''
                };
                return updated;
            });
        }
    }, [setTestimonials]);

    // Add renderImagePreview function
    const renderImagePreview = (testimonial, index) => {
        if (!testimonial.imgSrc) {
            return (
                <div className="flex flex-col items-center justify-center space-y-2 w-32 h-32 border-[2.5px] border-dashed border-gray-300 rounded-lg hover:border-[#30afbc] transition-all duration-300">
                    <FiUpload className={`w-6 h-6 ${errors[`testimonial${index}Image`] ? 'text-red-400' : 'text-[#30afbc]'}`} />
                    <p className="text-xs text-gray-500 text-center">
                        Click to upload
                    </p>
                </div>
            );
        }

        if (testimonial.imgSrc === 'loading') {
            return (
                <div className="w-32 h-32 border-[2.5px] border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#30afbc]"></div>
                </div>
            );
        }

        return (
            <div className="relative w-32 h-32">
                <img
                    src={testimonial.imgSrc}
                    alt="Customer"
                    className="w-full h-full object-cover rounded-lg"
                    onError={(e) => {
                        console.error('Error loading image:', e);
                        e.target.src = '';
                    }}
                />
                <div className="absolute inset-0 bg-[#30afbc]/10 opacity-0 hover:opacity-100 transition-all duration-300 flex items-center justify-center rounded-lg">
                    <div className="bg-white/95 px-3 py-1.5 rounded-md shadow-lg">
                        <p className="text-[#30afbc] text-xs font-medium">
                            Change Image
                        </p>
                    </div>
                </div>
            </div>
        );
    };

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
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-50 mb-6">
          <FiStar className="w-8 h-8 text-teal-600" />
        </div>
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
                                onChange={(e) => {
                                    const newName = e.target.value;
                                    if (newName.length <= MAX_NAME_LENGTH) {
                                        handleChange(index, 'customerName', newName);
                                    }
                                }}
                                placeholder="Enter customer name"
                                className={errors[`testimonial${index}CustomerName`] ? 'border-red-500' : ''}
                            />
                            <div className="mt-1 flex justify-between items-center">
                                {errors[`testimonial${index}CustomerName`] && (
                                    <p className="text-sm text-red-500">
                                        {errors[`testimonial${index}CustomerName`]}
                                    </p>
                                )}
                                <p className="text-sm text-gray-500">
                                    {testimonial.customerName?.length || 0}/{MAX_NAME_LENGTH} characters
                                </p>
                            </div>
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
                                {renderImagePreview(testimonial, index)}
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
