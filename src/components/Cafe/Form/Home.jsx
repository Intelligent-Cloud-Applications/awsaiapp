import React, { useState } from 'react';
import { Label, TextInput, Textarea } from 'flowbite-react';
import { FiImage, FiAlertCircle } from 'react-icons/fi';
import PropTypes from 'prop-types';

// Constants
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];
const MAX_TAGLINE_LENGTH = 100;

// Styles
const uploadAreaClasses = "flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:border-[#30afbc] hover:bg-gray-50/80 transition-all duration-200";
const imagePreviewClasses = "relative group aspect-square rounded-lg overflow-hidden bg-gray-50";
const imageHoverClasses = "absolute inset-0 bg-[#30afbc]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center";

const Home = ({
    TagLine,
    setTagLine,
    TagLine1,
    setTagLine1,
    TagLine2,
    setTagLine2,
    TagLine3,
    setTagLine3,
    heroImage,
    setHeroImage,
    selectedMedia,
    setSelectedMedia
}) => {
    const [errors, setErrors] = useState({});

    const validateTagline = (value, field) => {
        if (!value || value.trim() === '') {
            return `${field} is required`;
        }
        if (value.length > MAX_TAGLINE_LENGTH) {
            return `${field} must be less than ${MAX_TAGLINE_LENGTH} characters`;
        }
        return '';
    };

    const handleTaglineChange = (value, setter, field) => {
        setter(value);
        const error = validateTagline(value, field);
        setErrors(prev => ({ ...prev, [field.toLowerCase()]: error }));
    };

    const handleHeroImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file size
        if (file.size > MAX_FILE_SIZE) {
            setErrors(prev => ({
                ...prev,
                heroImage: 'File size should not exceed 10MB'
            }));
            return;
        }

        // Validate file type
        if (!ALLOWED_FILE_TYPES.includes(file.type)) {
            setErrors(prev => ({
                ...prev,
                heroImage: 'Please upload a valid image file (JPG, JPEG, or PNG)'
            }));
            return;
        }

        // Clear error if validation passes
        setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors.heroImage;
            return newErrors;
        });

        setSelectedMedia(URL.createObjectURL(file));
        setHeroImage(file);
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Journey Starts Here</h1>
                <p className="text-gray-600">
                    Create engaging content for your website's homepage.
                </p>
            </div>

            <div className="space-y-8">
                {/* Taglines */}
                <div>
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Taglines</h2>
                    <div className="space-y-6">
                        {[
                            { value: TagLine, setter: setTagLine, label: 'Main Tagline', field: 'TagLine' },
                            { value: TagLine1, setter: setTagLine1, label: 'Additional Tagline 1', field: 'TagLine1' },
                            { value: TagLine2, setter: setTagLine2, label: 'Additional Tagline 2', field: 'TagLine2' },
                            { value: TagLine3, setter: setTagLine3, label: 'Additional Tagline 3', field: 'TagLine3' }
                        ].map(({ value, setter, label, field }) => (
                            <div key={field}>
                                <Label htmlFor={field} className="block text-sm font-medium text-gray-700 mb-1">
                                    {label} <span className="text-red-500">*</span>
                                </Label>
                                <div className="relative">
                                    <TextInput
                                        id={field}
                                        type="text"
                                        value={value}
                                        onChange={(e) => handleTaglineChange(e.target.value, setter, field)}
                                        placeholder={`Enter your ${label.toLowerCase()}`}
                                        required
                                        maxLength={MAX_TAGLINE_LENGTH}
                                        className={errors[field.toLowerCase()] ? 'border-red-500' : ''}
                                    />
                                    {errors[field.toLowerCase()] && (
                                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                            <FiAlertCircle className="h-5 w-5 text-red-500" />
                                        </div>
                                    )}
                                </div>
                                {errors[field.toLowerCase()] && (
                                    <p className="mt-1 text-sm text-red-500">{errors[field.toLowerCase()]}</p>
                                )}
                                <p className="mt-1 text-sm text-gray-500">
                                    {value?.length || 0}/{MAX_TAGLINE_LENGTH} characters
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Hero Image */}
                <div>
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Hero Image</h2>
                    <div>
                        <Label className="block text-sm font-medium text-gray-700 mb-4">
                            Upload Image <span className="text-red-500">*</span>
                        </Label>
                        <div className="flex items-center justify-center w-full">
                            <label
                                htmlFor="hero-image-upload"
                                className={`${uploadAreaClasses} ${errors.heroImage ? 'border-red-500' : ''}`}
                            >
                                {!selectedMedia ? (
                                    <>
                                        <input
                                            id="hero-image-upload"
                                            type="file"
                                            accept={ALLOWED_FILE_TYPES.join(',')}
                                            onChange={handleHeroImageChange}
                                            className="hidden"
                                        />
                                        <div className="flex flex-col items-center justify-center space-y-2">
                                            <FiImage className={`w-12 h-12 ${errors.heroImage ? 'text-red-400' : 'text-gray-400'}`} />
                                            <h4 className={errors.heroImage ? 'text-red-500' : 'text-gray-500'}>
                                                Upload your hero image
                                            </h4>
                                            <p className="text-xs text-gray-500">
                                                PNG, JPEG, or JPG (max. 10MB)
                                            </p>
                                        </div>
                                    </>
                                ) : (
                                    <div className={imagePreviewClasses}>
                                        <img
                                            src={selectedMedia}
                                            alt="Hero Preview"
                                            className="w-full h-full object-cover"
                                        />
                                        <div className={imageHoverClasses}>
                                            <p className="text-white text-sm">Click to change image</p>
                                        </div>
                                    </div>
                                )}
                            </label>
                        </div>
                        {errors.heroImage && (
                            <p className="mt-2 text-sm text-red-500">{errors.heroImage}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

Home.propTypes = {
    TagLine: PropTypes.string.isRequired,
    setTagLine: PropTypes.func.isRequired,
    TagLine1: PropTypes.string.isRequired,
    setTagLine1: PropTypes.func.isRequired,
    TagLine2: PropTypes.string.isRequired,
    setTagLine2: PropTypes.func.isRequired,
    TagLine3: PropTypes.string.isRequired,
    setTagLine3: PropTypes.func.isRequired,
    heroImage: PropTypes.object,
    setHeroImage: PropTypes.func.isRequired,
    selectedMedia: PropTypes.string,
    setSelectedMedia: PropTypes.func.isRequired
};

export default Home;