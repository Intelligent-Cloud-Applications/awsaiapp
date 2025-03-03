import React, { useState, useEffect, useCallback } from 'react';
import { Label, TextInput, Textarea } from 'flowbite-react';
import { FiImage, FiAlertCircle, FiHome } from 'react-icons/fi';
import PropTypes from 'prop-types';

// Constants
const MAX_TAGLINE_LENGTH = 100;

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
    setSelectedMedia,
    OurMissionBg,
    setOurMissionBg,
    selectedMissionBg,
    setSelectedMissionBg
}) => {
    const [errors, setErrors] = useState({});
    const [OurMission, setOurMission] = useState({
        title: '',
        description: '',
        points: ['', '', '']
    });

    // Define validateTagline first since it has no dependencies
    const validateTagline = useCallback((value, field) => {
        if (!value || value.trim() === '') {
            return `${field} is required`;
        }
        if (value.length > MAX_TAGLINE_LENGTH) {
            return `${field} must be less than ${MAX_TAGLINE_LENGTH} characters`;
        }
        return '';
    }, []);

    // Now handleTaglineChange can use validateTagline
    const handleTaglineChange = useCallback((value, setter, field) => {
        setter(value);
        const error = validateTagline(value, field);
        setErrors(prev => ({ ...prev, [field.toLowerCase()]: error }));
    }, [validateTagline]);

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
                    resolve(compressedBase64);
                };

                img.onerror = reject;
            };

            reader.onerror = reject;
        });
    }, []);

    // Load initial data from localStorage
    useEffect(() => {
        const savedData = localStorage.getItem('cafeFormData');
        if (savedData) {
            const parsedData = JSON.parse(savedData);
            setTagLine(parsedData.TagLine || '');
            setTagLine1(parsedData.TagLine1 || '');
            setTagLine2(parsedData.TagLine2 || '');
            setTagLine3(parsedData.TagLine3 || '');
            if (parsedData.heroImageData) {
                setSelectedMedia(parsedData.heroImageData);
            }
            if (parsedData.OurMission) {
                setOurMission(parsedData.OurMission);
            }
            if (parsedData.OurMissionBg) {
                setSelectedMissionBg(parsedData.OurMissionBg);
            }
        }
    }, [setTagLine, setTagLine1, setTagLine2, setTagLine3, setSelectedMedia, setOurMission, setSelectedMissionBg]);

    // Save data to localStorage whenever it changes
    useEffect(() => {
        const currentData = JSON.parse(localStorage.getItem('cafeFormData') || '{}');
        localStorage.setItem('cafeFormData', JSON.stringify({
            ...currentData,
            TagLine,
            TagLine1,
            TagLine2,
            TagLine3,
            heroImageData: selectedMedia,
            OurMission,
            OurMissionBg: selectedMissionBg
        }));
    }, [TagLine, TagLine1, TagLine2, TagLine3, selectedMedia, OurMission, selectedMissionBg]);

    const handleHeroImageChange = useCallback(async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            setSelectedMedia('loading');

            if (!file.type.startsWith('image/')) {
                throw new Error('Please upload an image file');
            }

            const compressedBase64 = await compressImage(file);
            console.log('Image compressed successfully');

            const storageData = {
                heroImage: compressedBase64,
                fileName: file.name,
                timestamp: Date.now()
            };

            try {
                const currentData = JSON.parse(localStorage.getItem('cafeFormData') || '{}');
                localStorage.setItem('cafeFormData', JSON.stringify({
                    ...currentData,
                    heroImageData: storageData
                }));

                setSelectedMedia(compressedBase64);
                setHeroImage(file);
                setErrors(prev => ({ ...prev, heroImage: null }));
            } catch (storageError) {
                console.error('Failed to save to localStorage:', storageError);
                throw new Error('Failed to save image');
            }

        } catch (error) {
            console.error('Error handling hero image:', error);
            setErrors(prev => ({
                ...prev,
                heroImage: error.message || 'Error processing image. Please try a different file.'
            }));
            setSelectedMedia(null);
        }
    }, [compressImage, setHeroImage, setSelectedMedia]);

    const handleMissionBgChange = useCallback(async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            setSelectedMissionBg('loading');

            if (!file.type.startsWith('image/')) {
                throw new Error('Please upload an image file');
            }

            const compressedBase64 = await compressImage(file);
            console.log('Mission background image compressed successfully');

            try {
                setSelectedMissionBg(compressedBase64);
                setOurMissionBg(file);
                setErrors(prev => ({ ...prev, missionBg: null }));
            } catch (storageError) {
                console.error('Failed to save mission background to localStorage:', storageError);
                throw new Error('Failed to save image');
            }

        } catch (error) {
            console.error('Error handling mission background image:', error);
            setErrors(prev => ({
                ...prev,
                missionBg: error.message || 'Error processing image. Please try a different file.'
            }));
            setSelectedMissionBg(null);
        }
    }, [compressImage, setOurMissionBg, setSelectedMissionBg]);

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
                            <TextInput
                                id="mission-title"
                                value={OurMission.title}
                                onChange={(e) => setOurMission(prev => ({
                                    ...prev,
                                    title: e.target.value
                                }))}
                                placeholder="Enter mission title"
                                required
                            />
                        </div>

                        {/* Mission Description */}
                        <div>
                            <Label htmlFor="mission-description" className="block text-sm font-medium text-gray-700 mb-1">
                                Mission Description <span className="text-red-500">*</span>
                            </Label>
                            <Textarea
                                id="mission-description"
                                value={OurMission.description}
                                onChange={(e) => setOurMission(prev => ({
                                    ...prev,
                                    description: e.target.value
                                }))}
                                placeholder="Enter mission description"
                                required
                                rows={4}
                            />
                        </div>

                        {/* Mission Points */}
                        <div>
                            <Label className="block text-sm font-medium text-gray-700 mb-3">
                                Key Points <span className="text-red-500">*</span>
                            </Label>
                            <div className="space-y-3">
                                {OurMission.points.map((point, index) => (
                                    <TextInput
                                        key={index}
                                        value={point}
                                        onChange={(e) => {
                                            const newPoints = [...OurMission.points];
                                            newPoints[index] = e.target.value;
                                            setOurMission(prev => ({
                                                ...prev,
                                                points: newPoints
                                            }));
                                        }}
                                        placeholder={`Enter point ${index + 1}`}
                                        required
                                    />
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
    setSelectedMedia: PropTypes.func.isRequired,
    OurMissionBg: PropTypes.object,
    setOurMissionBg: PropTypes.func.isRequired,
    selectedMissionBg: PropTypes.string,
    setSelectedMissionBg: PropTypes.func.isRequired
};

export default Home;