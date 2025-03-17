import React, { useState, useEffect, useCallback } from 'react';
import { Label, TextInput, Textarea } from 'flowbite-react';
import { FiImage, FiAlertCircle, FiHome, FiType } from 'react-icons/fi';
import PropTypes from 'prop-types';

// Constants
const MAX_TAGLINE_LENGTH = 100;
const MAX_FILE_SIZE_MB = 50;
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/gif'];
const MAX_MISSION_TITLE_LENGTH = 100;
const MAX_MISSION_DESCRIPTION_LENGTH = 500;
const MAX_MISSION_POINT_LENGTH = 150;

// Validation functions
const validateTaglines = (taglines) => {
    // Remove all validation errors since we don't want to show them
    return {};
};

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

const Home = ({
    tagLine1,
    settagLine1,
    tagLine2,
    settagLine2,
    heroImage,
    setHeroImage,
    selectedMedia,
    setSelectedMedia,
    ourMissionBg,
    setourMissionBg,
    selectedMissionBg,
    setSelectedMissionBg,
    productTagline,
    setProductTagline
}) => {
    const [errors, setErrors] = useState({});
    const [ourMission, setourMission] = useState({
        title: '',
        description: '',
        points: ['', '', '']
    });

    // Handle tagline change with validation
    const handleTaglineChange = useCallback((value, setter, field) => {
        // Remove any leading/trailing whitespace
        const trimmedValue = value.trim();
        
        // Validate length
        if (trimmedValue.length > MAX_TAGLINE_LENGTH) {
            setErrors(prev => ({
                ...prev,
                [field.toLowerCase()]: `${field} must be less than ${MAX_TAGLINE_LENGTH} characters`
            }));
            return;
        }

        // Update the value
        setter(value);

        // Only show error for productTagline
        if (field === 'productTagline') {
            if (trimmedValue) {
                setErrors(prev => {
                    const newErrors = { ...prev };
                    delete newErrors[field.toLowerCase()];
                    return newErrors;
                });
            } else {
                setErrors(prev => ({
                    ...prev,
                    [field.toLowerCase()]: `${field} is required`
                }));
            }
        }

        // Save to localStorage immediately
        try {
            const currentData = JSON.parse(localStorage.getItem('cafeFormData') || '{}');
            const updatedData = {
                ...currentData,
                [field]: value,
                lastUpdated: Date.now()
            };
            localStorage.setItem('cafeFormData', JSON.stringify(updatedData));
            
            // Also save to a separate taglines storage for redundancy
            const taglinesData = {
                tagLine1: field === 'tagLine1' ? value : currentData.tagLine1 || '',
                tagLine2: field === 'tagLine2' ? value : currentData.tagLine2 || '',
                productTagline: field === 'productTagline' ? value : currentData.productTagline || '',
                lastUpdated: Date.now()
            };
            localStorage.setItem('cafeFormTaglines', JSON.stringify(taglinesData));
        } catch (error) {
            console.error('Error saving tagline to localStorage:', error);
        }
    }, []);

    // Load initial data from localStorage
    useEffect(() => {
        try {
            const savedData = JSON.parse(localStorage.getItem('cafeFormData') || '{}');
            const heroImageData = JSON.parse(localStorage.getItem('cafeFormHeroImage') || '{}');
            const taglinesData = JSON.parse(localStorage.getItem('cafeFormTaglines') || '{}');
            
            // Load taglines with priority to taglines storage
            if (taglinesData.tagLine1) {
                settagLine1(taglinesData.tagLine1);
            } else if (savedData.tagLine1) {
                settagLine1(savedData.tagLine1);
            }
            
            if (taglinesData.tagLine2) {
                settagLine2(taglinesData.tagLine2);
            } else if (savedData.tagLine2) {
                settagLine2(savedData.tagLine2);
            }
            
            if (taglinesData.productTagline) {
                setProductTagline(taglinesData.productTagline);
            } else if (savedData.productTagline) {
                setProductTagline(savedData.productTagline);
            }

            // Load hero image data - prioritize heroImageData but fallback to savedData
            const heroImage = heroImageData.heroImage || savedData.heroImage;
            if (heroImage) {
                setSelectedMedia(heroImage);
                setHeroImage(heroImage);
            }

            // Load other data
            if (savedData.ourMission) {
                setourMission(savedData.ourMission);
            }
            if (savedData.ourMissionBg) {
                setSelectedMissionBg(savedData.ourMissionBg);
            }
        } catch (error) {
            console.error('Error loading data from localStorage:', error);
        }
    }, [settagLine1, settagLine2, setProductTagline, setSelectedMedia, setSelectedMissionBg, setHeroImage]);

    // Save data to localStorage whenever it changes
    useEffect(() => {
        try {
            const currentData = JSON.parse(localStorage.getItem('cafeFormData') || '{}');
            
            // Update data in localStorage
            const updatedData = {
                ...currentData,
                tagLine1: tagLine1 || '',
                tagLine2: tagLine2 || '',
                productTagline: productTagline || '',
                ourMission,
                ourMissionBg: selectedMissionBg,
                heroImage: heroImage, // Store the File object directly
                lastUpdated: Date.now()
            };
            
            // Save to localStorage
            localStorage.setItem('cafeFormData', JSON.stringify(updatedData));
            
            // Also save taglines separately
            localStorage.setItem('cafeFormTaglines', JSON.stringify({
                tagLine1: tagLine1 || '',
                tagLine2: tagLine2 || '',
                productTagline: productTagline || '',
                lastUpdated: Date.now()
            }));
            
            // Validate taglines and update errors
            const validationErrors = validateTaglines({
                tagLine1,
                tagLine2,
                productTagline
            });
            setErrors(prev => ({ ...prev, ...validationErrors }));
            
        } catch (error) {
            console.error('Error saving data to localStorage:', error);
        }
    }, [tagLine1, tagLine2, productTagline, selectedMedia, ourMission, selectedMissionBg, heroImage]);

    const compressImage = useCallback((file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target.result;

                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');

                    const MAX_WIDTH = 800;
                    const MAX_HEIGHT = 800;

                    let width = img.width;
                    let height = img.height;

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

                    canvas.width = width;
                    canvas.height = height;
                    ctx.drawImage(img, 0, 0, width, height);
                    
                    const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
                    
                    const sizeInMB = (compressedBase64.length * 0.75) / (1024 * 1024);
                    if (sizeInMB > 1) {
                        resolve(canvas.toDataURL('image/jpeg', 0.5));
                    } else {
                        resolve(compressedBase64);
                    }
                };

                img.onerror = reject;
            };

            reader.onerror = reject;
        });
    }, []);

    // Handle hero image change
    const handleHeroImageChange = useCallback(async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            setSelectedMedia('loading');

            // Validate file
            const validationError = validateImageFile(file);
            if (validationError) {
                throw new Error(validationError);
            }

            const compressedBase64 = await compressImage(file);
            console.log('Image compressed successfully');

            try {
                // Update state with both the file and preview
                setSelectedMedia(compressedBase64); // For preview
                setHeroImage(file); // Store the actual file for upload

                // Save preview to localStorage for display purposes
                const storageData = {
                    heroImage: compressedBase64,
                    fileName: file.name,
                    timestamp: Date.now()
                };
                localStorage.setItem('cafeFormHeroImage', JSON.stringify(storageData));

                // Also update the main form data with the preview
                const savedData = JSON.parse(localStorage.getItem('cafeFormData') || '{}');
                localStorage.setItem('cafeFormData', JSON.stringify({
                    ...savedData,
                    heroImage: file // Store the file object for upload
                }));

                setErrors(prev => ({ ...prev, heroImage: null }));
            } catch (storageError) {
                console.error('Failed to save to localStorage:', storageError);
                throw new Error('Failed to save image');
            }

        } catch (error) {
            console.error('Error handling hero image:', error);
            setErrors(prev => ({
                ...prev,
                heroImage: error.message || 'Error processing image. Please try again.'
            }));
            setSelectedMedia(null);
            setHeroImage(null);
        }
    }, [compressImage, setHeroImage, setSelectedMedia]);

    const handleMissionBgChange = useCallback(async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            setSelectedMissionBg('loading');

            // Validate file
            const validationError = validateImageFile(file);
            if (validationError) {
                throw new Error(validationError);
            }

            const compressedBase64 = await compressImage(file);
            console.log('Mission background image compressed successfully');

            try {
                setSelectedMissionBg(compressedBase64);
                setourMissionBg(file);
                setErrors(prev => ({ ...prev, missionBg: null }));
            } catch (storageError) {
                console.error('Failed to save mission background to localStorage:', storageError);
                throw new Error('Failed to save image');
            }

        } catch (error) {
            console.error('Error handling mission background image:', error);
            setErrors(prev => ({
                ...prev,
                missionBg: error.message || 'Error processing image. Please try again.'
            }));
            setSelectedMissionBg(null);
        }
    }, [compressImage, setourMissionBg, setSelectedMissionBg]);

    const renderHeroImagePreview = useCallback(() => {
        if (!selectedMedia) {
            return (
                <div className="flex flex-col items-center justify-center space-y-2">
                    <FiImage className={`w-8 h-8 ${errors.heroImage ? 'text-red-400' : 'text-[#30afbc]'}`} />
                    <p className={`text-sm ${errors.heroImage ? 'text-red-500' : 'text-gray-500'}`}>
                        Click to upload hero image
                    </p>
                    <p className="text-xs text-gray-500">
                        Maximum file size: 50MB
                    </p>
                    <p className="text-xs text-gray-500">
                        Image will be compressed automatically
                    </p>
                </div>
            );
        }

        if (selectedMedia === 'loading') {
            return (
                <div className="flex items-center justify-center h-full">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#30afbc]"></div>
                </div>
            );
        }

        return (
            <div className="relative w-full h-64 flex items-center justify-center">
                <div className="w-full h-full flex items-center justify-center p-4">
                    <img
                        src={selectedMedia}
                        alt="Hero Preview"
                        className="max-w-full max-h-full object-contain"
                        onError={() => {
                            console.error('Error loading image');
                            setSelectedMedia(null);
                        }}
                    />
                </div>
                <div className="absolute inset-0 bg-[#30afbc]/10 opacity-0 hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                    <div className="bg-white/95 px-4 py-2 rounded-md shadow-lg">
                        <p className="text-[#30afbc] text-sm font-medium">
                            Click to change image
                        </p>
                    </div>
                </div>
            </div>
        );
    }, [selectedMedia, errors.heroImage, setSelectedMedia]);

    const renderMissionBgPreview = useCallback(() => {
        if (!selectedMissionBg) {
            return (
                <div className="flex flex-col items-center justify-center space-y-2">
                    <FiImage className={`w-8 h-8 ${errors.missionBg ? 'text-red-400' : 'text-[#30afbc]'}`} />
                    <p className={`text-sm ${errors.missionBg ? 'text-red-500' : 'text-gray-500'}`}>
                        Click to upload mission background
                    </p>
                    <p className="text-xs text-gray-500">
                        Maximum file size: 50MB
                    </p>
                    <p className="text-xs text-gray-500">
                        Image will be compressed automatically
                    </p>
                </div>
            );
        }

        if (selectedMissionBg === 'loading') {
            return (
                <div className="flex items-center justify-center h-full">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#30afbc]"></div>
                </div>
            );
        }

        return (
            <div className="relative w-full h-64 flex items-center justify-center">
                <div className="w-full h-full flex items-center justify-center p-4">
                    <img
                        src={selectedMissionBg}
                        alt="Mission Background Preview"
                        className="max-w-full max-h-full object-contain"
                        onError={() => {
                            console.error('Error loading mission background image');
                            setSelectedMissionBg(null);
                        }}
                    />
                </div>
                <div className="absolute inset-0 bg-[#30afbc]/10 opacity-0 hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                    <div className="bg-white/95 px-4 py-2 rounded-md shadow-lg">
                        <p className="text-[#30afbc] text-sm font-medium">
                            Click to change image
                        </p>
                    </div>
                </div>
            </div>
        );
    }, [selectedMissionBg, errors.missionBg, setSelectedMissionBg]);

    return (
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-50 mb-6">
                    <FiHome className="w-8 h-8 text-teal-600" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Journey Starts Here</h1>
                <p className="text-gray-600">
                    Create engaging content for your website's homepage.
                </p>
            </div>

            <div className="space-y-8">
                {/* Taglines */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                        <FiType className="w-5 h-5 text-teal-600" />
                        Taglines <span className="text-red-500">*</span>
                    </h2>
                    <div className="space-y-6">
                        {[
                            { value: tagLine1, setter: settagLine1, label: 'Additional Tagline 1', field: 'tagLine1', required: true, showRequired: false, showError: false },
                            { value: tagLine2, setter: settagLine2, label: 'Additional Tagline 2', field: 'tagLine2', required: true, showRequired: false, showError: false },
                            { value: productTagline, setter: setProductTagline, label: 'Product Tagline', field: 'productTagline', required: true, showRequired: false, showError: false }
                        ].map(({ value, setter, label, field, required, showRequired, showError }) => (
                            <div key={field}>
                                <Label htmlFor={field} className="block text-sm font-medium text-gray-700 mb-1">
                                    {label} {showRequired && required && <span className="text-red-500">*</span>}
                                </Label>
                                <div className="relative">
                                    <TextInput
                                        id={field}
                                        type="text"
                                        value={value || ''}
                                        onChange={(e) => handleTaglineChange(e.target.value, setter, field)}
                                        placeholder={`Enter your ${label.toLowerCase()}`}
                                        required={required}
                                        maxLength={MAX_TAGLINE_LENGTH}
                                        className={showError && errors[field.toLowerCase()] ? 'border-red-500' : ''}
                                    />
                                    {showError && errors[field.toLowerCase()] && (
                                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                            <FiAlertCircle className="h-5 w-5 text-red-500" />
                                        </div>
                                    )}
                                </div>
                                {showError && errors[field.toLowerCase()] && (
                                    <p className="mt-1 text-sm text-red-500">{errors[field.toLowerCase()]}</p>
                                )}
                                <p className="mt-1 text-sm text-gray-500">
                                    {(value || '').length}/{MAX_TAGLINE_LENGTH} characters
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Hero Image Upload Section */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                        <FiImage className="w-5 h-5 text-teal-600" />
                        Hero Image
                    </h2>
                    
                    <div>
                        <Label className="block text-sm font-medium text-gray-700 mb-2">
                            Upload Hero Image <span className="text-red-500">*</span>
                        </Label>
                        <label
                            htmlFor="hero-image-upload"
                            className={`flex flex-col items-center justify-center w-full h-64 ${
                                errors.heroImage 
                                    ? 'border-red-500' 
                                    : 'border-[#e5e7eb] hover:border-[#30afbc]'
                            } border-[2.5px] border-dashed rounded-lg cursor-pointer bg-gray-50/50 transition-all duration-300`}
                        >
                            <input
                                id="hero-image-upload"
                                type="file"
                                accept="image/*"
                                onChange={handleHeroImageChange}
                                className="hidden"
                            />
                            {renderHeroImagePreview()}
                        </label>
                        {errors.heroImage && (
                            <p className="mt-2 text-sm text-red-500">{errors.heroImage}</p>
                        )}
                    </div>
                </div>

                {/* Our Mission Section */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Our Mission</h2>
                    
                    <div className="space-y-6">
                        {/* Mission Background Image */}
                        <div>
                            <Label className="block text-sm font-medium text-gray-700 mb-2">
                                Mission Background Image <span className="text-red-500">*</span>
                            </Label>
                            <label
                                htmlFor="mission-bg-upload"
                                className={`flex flex-col items-center justify-center w-full h-64 ${
                                    errors.missionBg 
                                        ? 'border-red-500' 
                                        : 'border-[#e5e7eb] hover:border-[#30afbc]'
                                } border-[2.5px] border-dashed rounded-lg cursor-pointer bg-gray-50/50 transition-all duration-300`}
                            >
                                <input
                                    id="mission-bg-upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleMissionBgChange}
                                    className="hidden"
                                />
                                {renderMissionBgPreview()}
                            </label>
                            {errors.missionBg && (
                                <p className="mt-2 text-sm text-red-500">{errors.missionBg}</p>
                            )}
                        </div>

                        {/* Mission Title */}
                        <div>
                            <Label htmlFor="mission-title" className="block text-sm font-medium text-gray-700 mb-1">
                                Mission Title <span className="text-red-500">*</span>
                            </Label>
                            <div>
                                <TextInput
                                    id="mission-title"
                                    value={ourMission.title}
                                    onChange={(e) => {
                                        const newTitle = e.target.value;
                                        if (newTitle.length <= MAX_MISSION_TITLE_LENGTH) {
                                            setourMission(prev => ({
                                                ...prev,
                                                title: newTitle
                                            }));
                                            // Clear error if exists
                                            if (errors.missionTitle) {
                                                setErrors(prev => {
                                                    const newErrors = { ...prev };
                                                    delete newErrors.missionTitle;
                                                    return newErrors;
                                                });
                                            }
                                        }
                                    }}
                                    placeholder="Enter mission title"
                                    required
                                    className={errors.missionTitle ? 'border-red-500' : ''}
                                />
                                <p className="mt-1 text-sm text-gray-500 flex justify-between">
                                    <span>{errors.missionTitle || ''}</span>
                                    <span>{ourMission.title.length}/{MAX_MISSION_TITLE_LENGTH} characters</span>
                                </p>
                            </div>
                        </div>

                        {/* Mission Description */}
                        <div>
                            <Label htmlFor="mission-description" className="block text-sm font-medium text-gray-700 mb-1">
                                Mission Description <span className="text-red-500">*</span>
                            </Label>
                            <div>
                                <Textarea
                                    id="mission-description"
                                    value={ourMission.description}
                                    onChange={(e) => {
                                        const newDescription = e.target.value;
                                        if (newDescription.length <= MAX_MISSION_DESCRIPTION_LENGTH) {
                                            setourMission(prev => ({
                                                ...prev,
                                                description: newDescription
                                            }));
                                            // Clear error if exists
                                            if (errors.missionDescription) {
                                                setErrors(prev => {
                                                    const newErrors = { ...prev };
                                                    delete newErrors.missionDescription;
                                                    return newErrors;
                                                });
                                            }
                                        }
                                    }}
                                    placeholder="Enter mission description"
                                    required
                                    rows={4}
                                    className={errors.missionDescription ? 'border-red-500' : ''}
                                />
                                <p className="mt-1 text-sm text-gray-500 flex justify-between">
                                    <span>{errors.missionDescription || ''}</span>
                                    <span>{ourMission.description.length}/{MAX_MISSION_DESCRIPTION_LENGTH} characters</span>
                                </p>
                            </div>
                        </div>

                        {/* Mission Points */}
                        <div>
                            <Label className="block text-sm font-medium text-gray-700 mb-3">
                                Key Points <span className="text-red-500">*</span>
                            </Label>
                            <div className="space-y-3">
                                {ourMission.points.map((point, index) => (
                                    <div key={index}>
                                        <TextInput
                                            value={point}
                                            onChange={(e) => {
                                                const newPoint = e.target.value;
                                                if (newPoint.length <= MAX_MISSION_POINT_LENGTH) {
                                                    const newPoints = [...ourMission.points];
                                                    newPoints[index] = newPoint;
                                                    setourMission(prev => ({
                                                        ...prev,
                                                        points: newPoints
                                                    }));
                                                    // Clear error if exists
                                                    if (errors[`missionPoint${index}`]) {
                                                        setErrors(prev => {
                                                            const newErrors = { ...prev };
                                                            delete newErrors[`missionPoint${index}`];
                                                            return newErrors;
                                                        });
                                                    }
                                                }
                                            }}
                                            placeholder={`Enter point ${index + 1}`}
                                            required
                                            className={errors[`missionPoint${index}`] ? 'border-red-500' : ''}
                                        />
                                        <p className="mt-1 text-sm text-gray-500 flex justify-between">
                                            <span>{errors[`missionPoint${index}`] || ''}</span>
                                            <span>{point.length}/{MAX_MISSION_POINT_LENGTH} characters</span>
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

Home.propTypes = {
    tagLine1: PropTypes.string.isRequired,
    settagLine1: PropTypes.func.isRequired,
    tagLine2: PropTypes.string.isRequired,
    settagLine2: PropTypes.func.isRequired,
    productTagline: PropTypes.string.isRequired,
    setProductTagline: PropTypes.func.isRequired,
    heroImage: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    setHeroImage: PropTypes.func.isRequired,
    selectedMedia: PropTypes.string,
    setSelectedMedia: PropTypes.func.isRequired,
    ourMissionBg: PropTypes.object,
    setourMissionBg: PropTypes.func.isRequired,
    selectedMissionBg: PropTypes.string,
    setSelectedMissionBg: PropTypes.func.isRequired
};

export default Home;