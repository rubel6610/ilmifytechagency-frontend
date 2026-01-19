// components/projects/ProjectModal.jsx

import Image from 'next/image';
import React, { useEffect, useState, useCallback } from 'react';
import { 
    FiAlertTriangle, 
    FiX, 
    FiCheck, 
    FiChevronRight, 
    FiChevronLeft,
    FiTrash2,
    FiImage,
    FiZoomIn
} from 'react-icons/fi';

// ==========================================
// CONSTANTS
// ==========================================

const INITIAL_FORM = {
    name: '',
    description: '',
    client: '',
    status: 'draft',
    progress: 0,
    image: '',
    publishingDate: '',
    phases: [
        { name: '', description: '', deadline: '' },
        { name: '', description: '', deadline: '' },
        { name: '', description: '', deadline: '' },
        { name: '', description: '', deadline: '' },
        { name: '', description: '', deadline: '' },
        { name: '', description: '', deadline: '' },
    ],
    conclusion: '',
    finalNotes: '',
    lessonsLearned: '',
};

const STEPS = [
    { number: 1, title: 'Project Details' },
    { number: 2, title: 'Project Phases' },
    { number: 3, title: 'Conclusion' },
];

const IMGBB_API_KEY = 'your_imgbb_api_key_here';

// ==========================================
// MAIN COMPONENT
// ==========================================

const ProjectModal = ({ isOpen, onClose, onSubmit, project, isLoading }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState(INITIAL_FORM);
    const [errors, setErrors] = useState({});
    const [imageUploading, setImageUploading] = useState(false);
    const [imagePreview, setImagePreview] = useState('');
    const [showImagePreview, setShowImagePreview] = useState(false);

    // ==========================================
    // EFFECTS
    // ==========================================

    useEffect(() => {
        if (!isOpen) return; // Only run when modal opens
        
        const today = new Date().toISOString().slice(0, 10);

        if (project) {
            setFormData({
                name: project.name || '',
                description: project.description || '',
                status: 'draft',
                client: project.client || '',
                progress: project.progress || 0,
                image: project.image || '',
                phases: project.phases || INITIAL_FORM.phases,
                conclusion: project.conclusion || '',
                finalNotes: project.finalNotes || '',
                lessonsLearned: project.lessonsLearned || '',
                publishingDate: project.publishingDate
                    ? project.publishingDate.split('T')[0]
                    : '',
            });
            setImagePreview(project.image || '');
        } else {
            setFormData({ ...INITIAL_FORM, publishingDate: today });
            setImagePreview('');
        }

        setErrors({});
        setCurrentStep(1);
    }, [project, isOpen]);

    // Lock body scroll
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    // ==========================================
    // HANDLERS
    // ==========================================

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'progress' ? parseInt(value) : value
        }));
        setErrors(prev => {
            if (prev[name]) {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            }
            return prev;
        });
    }, []);

    const handlePhaseChange = useCallback((index, field, value) => {
        setFormData(prev => {
            const updatedPhases = [...prev.phases];
            updatedPhases[index] = { ...updatedPhases[index], [field]: value };
            return { ...prev, phases: updatedPhases };
        });
    }, []);

    // Image Upload with Preview
    const handleImageUpload = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate
        if (!file.type.startsWith('image/')) {
            setErrors(prev => ({ ...prev, image: 'Please select an image file' }));
            return;
        }

        if (file.size > 3 * 1024 * 1024) {
            setErrors(prev => ({ ...prev, image: 'Image must be less than 3MB' }));
            return;
        }

        // Show local preview immediately
        const localPreview = URL.createObjectURL(file);
        setImagePreview(localPreview);

        setImageUploading(true);
        setErrors(prev => ({ ...prev, image: '' }));

        try {
            const formDataImg = new FormData();
            formDataImg.append('image', file);

            const response = await fetch(
                `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
                { method: 'POST', body: formDataImg }
            );

            const data = await response.json();

            if (data.success) {
                URL.revokeObjectURL(localPreview);
                setFormData(prev => ({ ...prev, image: data.data.url }));
                setImagePreview(data.data.url);
            }
        } catch (error) {
            console.error('Image upload error:', error);
            setErrors(prev => ({ ...prev, image: 'Failed to upload. Using local preview.' }));
            setFormData(prev => ({ ...prev, image: localPreview }));
        } finally {
            setImageUploading(false);
        }
    };

    const removeImage = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (imagePreview.startsWith('blob:')) {
            URL.revokeObjectURL(imagePreview);
        }
        setFormData(prev => ({ ...prev, image: '' }));
        setImagePreview('');
    }, [imagePreview]);

    // ==========================================
    // VALIDATION
    // ==========================================

    const validateStep1 = useCallback(() => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Project name is required';
        if (!formData.description.trim()) newErrors.description = 'Description is required';
        if (!formData.client.trim()) newErrors.client = 'Client is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [formData.name, formData.description, formData.client]);

    const validateStep2 = useCallback(() => {
        const newErrors = {};
        formData.phases.forEach((phase, index) => {
            if (!phase.name.trim()) {
                newErrors[`phase_${index}_name`] = `Phase ${index + 1} name is required`;
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [formData.phases]);

    const validateStep3 = useCallback(() => {
        const newErrors = {};
        if (!formData.conclusion.trim()) {
            newErrors.conclusion = 'Conclusion is required';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [formData.conclusion]);

    // ==========================================
    // NAVIGATION
    // ==========================================

    const handleNext = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        
        let isValid = false;
        if (currentStep === 1) isValid = validateStep1();
        if (currentStep === 2) isValid = validateStep2();
        
        if (isValid && currentStep < 3) {
            setCurrentStep(prev => prev + 1);
        }
    }, [currentStep, validateStep1, validateStep2]);

    const handleBack = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (currentStep > 1) {
            setCurrentStep(prev => prev - 1);
        }
    }, [currentStep]);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (validateStep3()) {
            onSubmit(formData);
        }
    }, [formData, onSubmit, validateStep3]);

    // Handle modal close
    const handleClose = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        onClose();
    }, [onClose]);

    // Handle backdrop click
    const handleBackdropClick = useCallback((e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }, [onClose]);

    // Prevent click propagation from modal content
    const handleModalClick = useCallback((e) => {
        e.stopPropagation();
    }, []);

    // ==========================================
    // RENDER
    // ==========================================

    if (!isOpen) return null;

    return (
        <>
            {/* ===== MAIN MODAL ===== */}
            <div 
                className="fixed inset-0 z-50 overflow-hidden"
                onClick={handleBackdropClick}
            >
                {/* Backdrop */}
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
                
                {/* Modal Wrapper - Centers the modal */}
                <div className="fixed inset-0 flex items-center justify-center p-0 sm:p-4">
                    
                    {/* Modal Container */}
                    <div 
                        data-lenis-prevent
                        className="relative bg-white w-full h-full sm:h-auto sm:max-h-[85vh] sm:max-w-3xl sm:rounded-2xl shadow-2xl flex flex-col"
                        onClick={handleModalClick}
                    >
                        
                        {/* ===== HEADER (Fixed) ===== */}
                        <div className="flex-none px-4 sm:px-6 py-4 border-b border-gray-200 bg-white sm:rounded-t-2xl">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                                    {project ? 'Edit Project' : 'New Project'}
                                </h2>
                                <button 
                                    type="button"
                                    onClick={handleClose}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <FiX size={22} />
                                </button>
                            </div>
                            <StepIndicator currentStep={currentStep} steps={STEPS} />
                        </div>

                        {/* ===== SCROLLABLE CONTENT ===== */}
                        <div className="flex-1 overflow-y-auto min-h-0 overscroll-contain">
                            <div className="p-4 sm:p-6">
                                {/* Remove the form wrapper from here - we'll handle submission via button */}
                                {currentStep === 1 && (
                                    <Step1ProjectDetails
                                        formData={formData}
                                        errors={errors}
                                        handleChange={handleChange}
                                        imagePreview={imagePreview}
                                        imageUploading={imageUploading}
                                        handleImageUpload={handleImageUpload}
                                        removeImage={removeImage}
                                        onPreviewClick={() => setShowImagePreview(true)}
                                    />
                                )}

                                {currentStep === 2 && (
                                    <Step2Phases
                                        phases={formData.phases}
                                        errors={errors}
                                        handlePhaseChange={handlePhaseChange}
                                    />
                                )}

                                {currentStep === 3 && (
                                    <Step3Conclusion
                                        formData={formData}
                                        errors={errors}
                                        handleChange={handleChange}
                                    />
                                )}
                            </div>
                        </div>

                        {/* ===== FOOTER (Fixed) ===== */}
                        <div className="flex-none px-4 sm:px-6 py-4 border-t border-gray-200 bg-gray-50 sm:rounded-b-2xl">
                            <div className="flex justify-between items-center">
                                <button
                                    type="button"
                                    onClick={handleBack}
                                    disabled={currentStep === 1}
                                    className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-5 py-2.5 rounded-xl font-medium transition-colors ${
                                        currentStep === 1
                                            ? 'text-gray-300 cursor-not-allowed'
                                            : 'text-gray-600 hover:bg-gray-200'
                                    }`}
                                >
                                    <FiChevronLeft size={18} />
                                    <span className="hidden sm:inline">Back</span>
                                </button>

                                <span className="text-xs sm:text-sm font-medium text-gray-400">
                                    {currentStep} / 3
                                </span>

                                {currentStep < 3 ? (
                                    <button
                                        type="button"
                                        onClick={handleNext}
                                        className="flex items-center gap-1 sm:gap-2 px-4 sm:px-6 py-2.5 bg-emerald-400 text-white rounded-xl hover:bg-emerald-500 font-medium transition-colors"
                                    >
                                        <span className="hidden sm:inline">Next</span>
                                        <FiChevronRight size={18} />
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={handleSubmit}
                                        disabled={isLoading}
                                        className="flex items-center gap-2 px-4 sm:px-6 py-2.5 bg-emerald-400 text-white rounded-xl hover:bg-emerald-500 font-medium transition-colors disabled:opacity-50"
                                    >
                                        {isLoading ? (
                                            <>
                                                <LoadingSpinner />
                                                <span className="hidden sm:inline">Saving...</span>
                                            </>
                                        ) : (
                                            <>
                                                <FiCheck size={18} />
                                                <span className="hidden sm:inline">
                                                    {project ? 'Update' : 'Create'}
                                                </span>
                                            </>
                                        )}
                                    </button>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* ===== FULLSCREEN IMAGE PREVIEW ===== */}
            <ImagePreviewModal
                isOpen={showImagePreview}
                imageUrl={imagePreview}
                onClose={() => setShowImagePreview(false)}
            />
        </>
    );
};

// ==========================================
// FULLSCREEN IMAGE PREVIEW MODAL
// ==========================================

const ImagePreviewModal = ({ isOpen, imageUrl, onClose }) => {
    const handleClose = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        onClose();
    }, [onClose]);

    if (!isOpen || !imageUrl) return null;

    return (
        <div 
            className="fixed inset-0 z-60 bg-black/90 flex items-center justify-center p-4"
            onClick={handleClose}
        >
            <button
                type="button"
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            >
                <FiX size={24} />
            </button>
            
            <div 
                className="relative max-w-4xl max-h-[90vh] w-full"
                onClick={(e) => e.stopPropagation()}
            >
                <Image
                    src={imageUrl}
                    alt="Preview"
                    width={1200}
                    height={800}
                    className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
                />
            </div>
        </div>
    );
};

// ==========================================
// STEP INDICATOR
// ==========================================

const StepIndicator = React.memo(({ currentStep, steps }) => {
    return (
        <div className="flex items-center justify-between">
            {steps.map((step, index) => (
                <React.Fragment key={step.number}>
                    <div className="flex flex-col items-center">
                        <div
                            className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                                currentStep > step.number
                                    ? 'bg-emerald-500 text-white'
                                    : currentStep === step.number
                                    ? 'bg-emerald-400 text-white ring-4 ring-blue-100'
                                    : 'bg-gray-200 text-gray-400'
                            }`}
                        >
                            {currentStep > step.number ? <FiCheck size={16} /> : step.number}
                        </div>
                        <span className={`text-xs mt-1 hidden sm:block font-medium ${
                            currentStep >= step.number ? 'text-gray-700' : 'text-gray-400'
                        }`}>
                            {step.title}
                        </span>
                    </div>
                    
                    {index < steps.length - 1 && (
                        <div className={`flex-1 h-1 mx-2 sm:mx-4 rounded-full transition-colors ${
                            currentStep > step.number ? 'bg-emerald-500' : 'bg-gray-200'
                        }`} />
                    )}
                </React.Fragment>
            ))}
        </div>
    );
});

StepIndicator.displayName = 'StepIndicator';

// ==========================================
// STEP 1: PROJECT DETAILS
// ==========================================

const Step1ProjectDetails = React.memo(({
    formData,
    errors,
    handleChange,
    imagePreview,
    imageUploading,
    handleImageUpload,
    removeImage,
    onPreviewClick,
}) => {
    const handlePreviewClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        onPreviewClick();
    };

    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-800">Basic Information</h3>
                <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Step 1</span>
            </div>

            {/* Image Upload with Preview */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Project Cover
                </label>
                
                {imagePreview ? (
                    <div className="relative w-full h-70 rounded-2xl overflow-hidden border-2 border-gray-200 group">
                        <Image
                            src={imagePreview}
                            alt="Project Cover"
                            fill
                            className="object-cover"
                        />
                        
                        {/* Overlay on Hover */}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                            <button
                                type="button"
                                onClick={handlePreviewClick}
                                className="flex items-center gap-2 px-4 py-2 bg-white text-gray-800 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                <FiZoomIn size={16} />
                                <span className="text-sm font-medium">Preview</span>
                            </button>
                            <button
                                type="button"
                                onClick={removeImage}
                                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                            >
                                <FiTrash2 size={16} />
                                <span className="text-sm font-medium">Remove</span>
                            </button>
                        </div>

                        {/* Upload Progress Indicator */}
                        {imageUploading && (
                            <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center">
                                <LoadingSpinner />
                                <span className="text-white text-sm mt-2">Uploading...</span>
                            </div>
                        )}
                    </div>
                ) : (
                    <label className="flex flex-col items-center justify-center w-full h-48 md:h-70 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:border-emerald-400 hover:bg-blue-50/50 transition-all group">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            disabled={imageUploading}
                        />
                        
                        {imageUploading ? (
                            <div className="flex flex-col items-center gap-2">
                                <LoadingSpinner />
                                <span className="text-sm font-medium text-emerald-400">Uploading...</span>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center gap-3 text-gray-500">
                                <div className="p-4 bg-gray-100 rounded-full group-hover:bg-blue-100 group-hover:text-emerald-400 transition-colors">
                                    <FiImage size={28} />
                                </div>
                                <div className="text-center">
                                    <p className="text-sm">
                                        <span className="font-medium text-primary">Click to upload</span>
                                        <span className="hidden sm:inline"> or drag and drop</span>
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1">PNG, JPG, GIF up to 3MB</p>
                                </div>
                            </div>
                        )}
                    </label>
                )}
                
                {errors.image && <ErrorMessage message={errors.image} />}
            </div>

            {/* Project Name & client */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Project Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl outline-none transition-all ${
                            errors.name 
                                ? 'border-red-400 bg-red-50' 
                                : 'border-gray-200 focus:border-emerald-400 focus:bg-white'
                        }`}
                        placeholder="e.g. Website Redesign"
                    />
                    {errors.name && <ErrorMessage message={errors.name} />}
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Client <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="client"
                        value={formData.client}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl outline-none transition-all ${
                            errors.client 
                                ? 'border-red-400 bg-red-50' 
                                : 'border-gray-200 focus:border-emerald-400 focus:bg-white'
                        }`}
                        placeholder="e.g. John Doe"
                    />
                    {errors.client && <ErrorMessage message={errors.client} />}
                </div>
            </div>

            {/* Description */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description <span className="text-red-500">*</span>
                </label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={6}
                    className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl outline-none transition-all resize-none ${
                        errors.description 
                            ? 'border-red-400 bg-red-50' 
                            : 'border-gray-200 focus:border-emerald-400 focus:bg-white'
                    }`}
                    placeholder="Describe the Short description of the project"
                />
                {errors.description && <ErrorMessage message={errors.description} />}
            </div>
        </div>
    );
});

Step1ProjectDetails.displayName = 'Step1ProjectDetails';

// ==========================================
// STEP 2: PROJECT PHASES
// ==========================================

const Step2Phases = React.memo(({ phases, errors, handlePhaseChange }) => {
    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-bold text-gray-800">Project Phases</h3>
                    <p className="text-sm text-gray-500">Define the 6 core stages</p>
                </div>
                <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Step 2</span>
            </div>

            <div className="space-y-4">
                {phases.map((phase, index) => (
                    <div 
                        key={index} 
                        className="p-4 border border-gray-200 rounded-xl bg-gray-50/50 hover:bg-white hover:shadow-sm hover:border-blue-200 transition-all"
                    >
                        {/* Phase Header */}
                        <div className="flex items-center gap-3 mb-3">
                            <span className="w-7 h-7 bg-blue-100 text-primary rounded-lg flex items-center justify-center text-sm font-bold">
                                {index + 1}
                            </span>
                            <span className="font-semibold text-gray-700">Phase {index + 1}</span>
                        </div>

                        {/* Phase Fields */}
                        <div className="grid grid-cols-1">
                            <div className="sm:col-span-2">
                                <input
                                    type="text"
                                    value={phase.name}
                                    onChange={(e) => handlePhaseChange(index, 'name', e.target.value)}
                                    className={`w-full px-3 py-2.5 bg-white border-2 rounded-lg text-sm outline-none transition-all ${
                                        errors[`phase_${index}_name`] 
                                            ? 'border-red-400 bg-red-50' 
                                            : 'border-gray-200 focus:border-emerald-400'
                                    }`}
                                    placeholder="Phase Name *"
                                />
                            </div>

                            <input
                                type="text"
                                value={phase.description}
                                onChange={(e) => handlePhaseChange(index, 'description', e.target.value)}
                                className="w-full px-3 mt-3 py-2.5 bg-white border-2 border-gray-200 rounded-lg text-sm outline-none focus:border-emerald-400"
                                placeholder="Description (optional)"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
});

Step2Phases.displayName = 'Step2Phases';

// ==========================================
// STEP 3: CONCLUSION
// ==========================================

const Step3Conclusion = React.memo(({ formData, errors, handleChange }) => {
    const completedPhases = formData.phases.filter(p => p.status === 'completed').length;

    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-800">Final Overview</h3>
                <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Step 3</span>
            </div>

            {/* Project Summary Card */}
            <div className="p-4 bg-linear-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl">
                <div className="flex gap-4">
                    <div className="w-16 h-16 bg-white rounded-xl shadow-sm overflow-hidden shrink-0">
                        {formData.image ? (
                            <Image
                                src={formData.image}
                                alt="Project"
                                width={64}
                                height={64}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                <FiImage size={24} className="text-gray-300" />
                            </div>
                        )}
                    </div>
                    <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-gray-800 truncate">
                            {formData.name || 'Untitled Project'}
                        </h4>
                        <p className="text-sm text-gray-500 line-clamp-1">
                            {formData.description || 'No description'}
                        </p>
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                            <span className="text-xs font-medium text-gray-500 bg-white px-2 py-1 rounded-full">
                                👤 {formData.client || 'No client'}
                            </span>
                            <span className="text-xs font-medium text-blue-600 bg-white px-2 py-1 rounded-full">
                                {completedPhases}/6 Phases Done
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Phases Overview */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phases Status</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {formData.phases.map((phase, index) => (
                        <div 
                            key={index}
                            className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg"
                        >
                            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                                phase.status === 'completed' 
                                    ? 'bg-emerald-500 text-white' 
                                    : phase.status === 'in-progress'
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-200 text-gray-500'
                            }`}>
                                {phase.status === 'completed' ? '✓' : index + 1}
                            </span>
                            <span className="text-xs font-medium text-gray-600 truncate">
                                {phase.name || `Phase ${index + 1}`}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Conclusion */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Conclusion <span className="text-red-500">*</span>
                </label>
                <textarea
                    name="conclusion"
                    value={formData.conclusion}
                    onChange={handleChange}
                    rows={4}
                    className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl outline-none transition-all resize-none ${
                        errors.conclusion 
                            ? 'border-red-400 bg-red-50' 
                            : 'border-gray-200 focus:border-emerald-500 focus:bg-white'
                    }`}
                    placeholder="Summarize the project outcome..."
                />
                {errors.conclusion && <ErrorMessage message={errors.conclusion} />}
            </div>

            {/* Publishing Date */}
            <div className="mt-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Publishing Date</label>
                <input
                    type="date"
                    name="publishingDate"
                    value={formData.publishingDate ?? ''}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none focus:border-emerald-500 focus:bg-white"
                />
            </div>
        </div>
    );
});

Step3Conclusion.displayName = 'Step3Conclusion';

// ==========================================
// HELPER COMPONENTS
// ==========================================

const ErrorMessage = React.memo(({ message }) => (
    <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1 font-medium">
        <FiAlertTriangle size={12} />
        {message}
    </p>
));

ErrorMessage.displayName = 'ErrorMessage';

const LoadingSpinner = React.memo(() => (
    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
        <circle 
            className="opacity-25" 
            cx="12" cy="12" r="10" 
            stroke="currentColor" 
            strokeWidth="4" 
            fill="none" 
        />
        <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" 
        />
    </svg>
));

LoadingSpinner.displayName = 'LoadingSpinner';

export default ProjectModal;