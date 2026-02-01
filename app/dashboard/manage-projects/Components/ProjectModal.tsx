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
    FiZoomIn,
    FiGlobe,
    FiLayers,
    FiCpu,
    FiCalendar
} from 'react-icons/fi';
import { 
    Project, 
    ProjectPhase 
} from '@/redux/service/projectApi';

// ==========================================
// TYPES
// ==========================================

interface ProjectFormData {
  name: string;
  client: string;
  description: string;
  website: string;
  summary: string;
  publishingDate: string;
  platforms: string[]; // comma separated in UI, array in payload
  technologies: string[]; // comma separated in UI, array in payload
  phases: Array<{
    name: string;
    description: string;
    startDate: string;
    endDate: string;
  }>;
  coverImage: File | string | null;
}

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: FormData) => void;
  project?: Project | null;
  isLoading?: boolean;
}

// ==========================================
// CONSTANTS
// ==========================================

const INITIAL_FORM: ProjectFormData = {
    name: '',
    client: '',
    description: '',
    website: '',
    summary: '',
    publishingDate: new Date().toISOString().split('T')[0],
    platforms: [],
    technologies: [],
    phases: [
        { name: 'Planning', description: '', startDate: new Date().toISOString().split('T')[0], endDate: new Date().toISOString().split('T')[0] },
        { name: 'Design', description: '', startDate: new Date().toISOString().split('T')[0], endDate: new Date().toISOString().split('T')[0] },
    ],
    coverImage: null,
};

const STEPS = [
    { number: 1, title: 'Project Details' },
    { number: 2, title: 'Project Phases' },
    { number: 3, title: 'Conclusion' },
];

// ==========================================
// MAIN COMPONENT
// ==========================================

const ProjectModal = ({
  isOpen,
  onClose,
  onSubmit,
  project,
  isLoading = false,
}: ProjectModalProps) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<ProjectFormData>(INITIAL_FORM);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [imagePreview, setImagePreview] = useState('');
    const [showImagePreview, setShowImagePreview] = useState(false);

    // ==========================================
    // EFFECTS
    // ==========================================

    useEffect(() => {
        if (!isOpen) return;
        
        const today = new Date().toISOString().split('T')[0];

        if (project) {
            setFormData({
                name: project.name,
                client: project.client,
                description: project.description,
                website: project.website || '',
                summary: project.summary || '',
                publishingDate: project.publishingDate 
                    ? project.publishingDate.split('T')[0] 
                    : today,
                platforms: project.platforms || [],
                technologies: project.technologies || [],
                phases: project.phases && project.phases.length > 0 
                    ? project.phases.map(phase => ({
                        name: phase.name,
                        description: phase.description,
                        startDate: phase.startDate ? phase.startDate.split('T')[0] : today,
                        endDate: phase.endDate ? phase.endDate.split('T')[0] : today,
                    }))
                    : INITIAL_FORM.phases,
                coverImage: project.coverImage || null,
            });
            setImagePreview(project.coverImage || '');
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

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
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

    const handlePhaseChange = useCallback((index: number, field: string, value: string) => {
        setFormData(prev => {
            const updatedPhases = [...prev.phases];
            updatedPhases[index] = { ...updatedPhases[index], [field]: value };
            return { ...prev, phases: updatedPhases };
        });
    }, []);

    // Image Upload with Preview
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            setErrors(prev => ({ ...prev, image: 'Please select an image file' }));
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setErrors(prev => ({ ...prev, image: 'Image must be less than 5MB' }));
            return;
        }

        const localPreview = URL.createObjectURL(file);
        setImagePreview(localPreview);
        setFormData(prev => ({ ...prev, coverImage: file }));
        setErrors(prev => ({ ...prev, image: '' }));
    };

    const removeImage = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (imagePreview.startsWith('blob:')) {
            URL.revokeObjectURL(imagePreview);
        }
        setFormData(prev => ({ ...prev, coverImage: null }));
        setImagePreview('');
    }, [imagePreview]);

    // ==========================================
    // VALIDATION
    // ==========================================

    const validateStep1 = useCallback(() => {
        const newErrors: Record<string, string> = {};
        if (!formData.name.trim()) newErrors.name = 'Project name is required';
        if (!formData.client.trim()) newErrors.client = 'Client is required';
        if (!formData.summary.trim()) newErrors.summary = 'Summary is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [formData.name, formData.client, formData.summary]);

    const validateStep2 = useCallback(() => {
        const newErrors: Record<string, string> = {};
        formData.phases.forEach((phase, index) => {
            if (!phase.name.trim()) {
                newErrors[`phase_${index}_name`] = `Phase ${index + 1} name is required`;
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [formData.phases]);

    const validateStep3 = useCallback(() => {
        const newErrors: Record<string, string> = {};
        if (!formData.description.trim()) {
            newErrors.description = 'Full description is required';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [formData.description]);

    // ==========================================
    // NAVIGATION
    // ==========================================

    const handleNext = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        
        let isValid = false;
        if (currentStep === 1) isValid = validateStep1();
        if (currentStep === 2) isValid = validateStep2();
        
        if (isValid && currentStep < 3) {
            setCurrentStep(prev => prev + 1);
        }
    }, [currentStep, validateStep1, validateStep2]);

    const handleBack = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (currentStep > 1) {
            setCurrentStep(prev => prev - 1);
        }
    }, [currentStep]);

    const handleSubmit = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (validateStep3()) {
            const submitFormData = new FormData();
            
            const projectData = {
                name: formData.name,
                client: formData.client,
                description: formData.description,
                website: formData.website,
                summary: formData.summary,
                publishingDate: new Date(formData.publishingDate).toISOString(),
                platforms: Array.isArray(formData.platforms) ? formData.platforms : [],
                technologies: Array.isArray(formData.technologies) ? formData.technologies : [],
                phases: formData.phases.map(p => ({
                    name: p.name,
                    description: p.description,
                    startDate: new Date(p.startDate).toISOString(),
                    endDate: new Date(p.endDate).toISOString(),
                }))
            };

            submitFormData.append('data', JSON.stringify(projectData));
            
            if (formData.coverImage instanceof File) {
                submitFormData.append('coverImage', formData.coverImage);
            }

            onSubmit(submitFormData);
        }
    }, [formData, onSubmit, validateStep3]);

    // Handle modal close
    const handleClose = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onClose();
    }, [onClose]);

    // Handle backdrop click
    const handleBackdropClick = useCallback((e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }, [onClose]);

    // Prevent click propagation from modal content
    const handleModalClick = useCallback((e: React.MouseEvent) => {
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
                                {currentStep === 1 && (
                                    <Step1ProjectDetails
                                        formData={formData}
                                        errors={errors}
                                        handleChange={handleChange}
                                        imagePreview={imagePreview}
                                        handleImageUpload={handleImageUpload}
                                        removeImage={removeImage}
                                        onPreviewClick={() => setShowImagePreview(true)}
                                        setFormData={setFormData}
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

const ImagePreviewModal = ({ isOpen, imageUrl, onClose }: { isOpen: boolean; imageUrl: string; onClose: () => void }) => {
    const handleClose = useCallback((e: React.MouseEvent) => {
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

const StepIndicator = React.memo(({ currentStep, steps }: { currentStep: number; steps: typeof STEPS }) => {
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
    handleImageUpload,
    removeImage,
    onPreviewClick,
    setFormData,
}: {
    formData: ProjectFormData;
    errors: Record<string, string>;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    imagePreview: string;
    handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    removeImage: (e: React.MouseEvent) => void;
    onPreviewClick: () => void;
    setFormData: React.Dispatch<React.SetStateAction<ProjectFormData>>;
}) => {
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
                        
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                            <button
                                type="button"
                                onClick={onPreviewClick}
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
                    </div>
                ) : (
                    <label className="flex flex-col items-center justify-center w-full h-48 md:h-70 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:border-emerald-400 hover:bg-blue-50/50 transition-all group">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                        />
                        <div className="flex flex-col items-center gap-3 text-gray-500">
                            <div className="p-4 bg-gray-100 rounded-full group-hover:bg-blue-100 group-hover:text-emerald-400 transition-colors">
                                <FiImage size={28} />
                            </div>
                            <div className="text-center">
                                <p className="text-sm">
                                    <span className="font-medium text-emerald-400">Click to upload</span>
                                    <span className="hidden sm:inline"> or drag and drop</span>
                                </p>
                                <p className="text-xs text-gray-400 mt-1">PNG, JPG, GIF up to 5MB</p>
                            </div>
                        </div>
                    </label>
                )}
                {errors.image && <ErrorMessage message={errors.image} />}
            </div>

            {/* Project Name & Client */}
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
                            errors.name ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-emerald-400 focus:bg-white'
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
                            errors.client ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-emerald-400 focus:bg-white'
                        }`}
                        placeholder="e.g. Acme Corp"
                    />
                    {errors.client && <ErrorMessage message={errors.client} />}
                </div>
            </div>

            {/* Website & Platforms */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        <FiGlobe className="text-gray-400" /> Website URL
                    </label>
                    <input
                        type="text"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none focus:border-emerald-400 focus:bg-white transition-all"
                        placeholder="https://example.com"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        <FiLayers className="text-gray-400" /> Platforms
                    </label>
                    <input
                        type="text"
                        placeholder="web, mobile (comma separated)"
                        value={formData.platforms.join(', ')}
                        onChange={(e) => setFormData(prev => ({ ...prev, platforms: e.target.value.split(',').map(s => s.trim()).filter(Boolean) }))}
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none focus:border-emerald-400 focus:bg-white transition-all"
                    />
                </div>
            </div>

            {/* Technologies */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <FiCpu className="text-gray-400" /> Technologies
                </label>
                <input
                    type="text"
                    placeholder="React, Node.js, Prisma (comma separated)"
                    value={formData.technologies.join(', ')}
                    onChange={(e) => setFormData(prev => ({ ...prev, technologies: e.target.value.split(',').map(s => s.trim()).filter(Boolean) }))}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none focus:border-emerald-400 focus:bg-white transition-all"
                />
            </div>

            {/* Short Summary */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Short Summary <span className="text-red-500">*</span>
                </label>
                <textarea
                    name="summary"
                    value={formData.summary}
                    onChange={handleChange}
                    rows={2}
                    className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl outline-none transition-all resize-none ${
                        errors.summary ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-emerald-400 focus:bg-white'
                    }`}
                    placeholder="Briefly summarize the project..."
                />
                {errors.summary && <ErrorMessage message={errors.summary} />}
            </div>
        </div>
    );
});

Step1ProjectDetails.displayName = 'Step1ProjectDetails';

// ==========================================
// STEP 2: PROJECT PHASES
// ==========================================

const Step2Phases = React.memo(({ phases, errors, handlePhaseChange }: {
    phases: any[];
    errors: Record<string, string>;
    handlePhaseChange: (index: number, field: string, value: string) => void;
}) => {
    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-bold text-gray-800">Project Phases</h3>
                    <p className="text-sm text-gray-500">Define the core project stages</p>
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
                            <span className="w-7 h-7 bg-blue-100 text-emerald-400 rounded-lg flex items-center justify-center text-sm font-bold">
                                {index + 1}
                            </span>
                            <span className="font-semibold text-gray-700">Phase {index + 1}</span>
                        </div>

                        {/* Phase Fields */}
                        <div className="space-y-3">
                            <input
                                type="text"
                                value={phase.name}
                                onChange={(e) => handlePhaseChange(index, 'name', e.target.value)}
                                className={`w-full px-3 py-2.5 bg-white border-2 rounded-lg text-sm outline-none transition-all ${
                                    errors[`phase_${index}_name`] ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-emerald-400'
                                }`}
                                placeholder="Phase Name *"
                            />
                            
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Start Date</label>
                                    <input
                                        type="date"
                                        value={phase.startDate}
                                        onChange={(e) => handlePhaseChange(index, 'startDate', e.target.value)}
                                        className="w-full px-3 py-2 bg-white border-2 border-gray-200 rounded-lg text-sm outline-none focus:border-emerald-400"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">End Date</label>
                                    <input
                                        type="date"
                                        value={phase.endDate}
                                        onChange={(e) => handlePhaseChange(index, 'endDate', e.target.value)}
                                        className="w-full px-3 py-2 bg-white border-2 border-gray-200 rounded-lg text-sm outline-none focus:border-emerald-400"
                                    />
                                </div>
                            </div>

                            <textarea
                                value={phase.description}
                                onChange={(e) => handlePhaseChange(index, 'description', e.target.value)}
                                className="w-full px-3 py-2 bg-white border-2 border-gray-200 rounded-lg text-sm outline-none focus:border-emerald-400 resize-none"
                                rows={2}
                                placeholder="Phase description (optional)"
                            />
                        </div>
                    </div>
                ))}
            </div>
            
            <button 
                type="button"
                onClick={() => handlePhaseChange(phases.length, 'add', '')}
                className="w-full py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 hover:border-emerald-400 hover:text-emerald-400 transition-all font-medium flex items-center justify-center gap-2"
            >
                Add Another Phase
            </button>
        </div>
    );
});

Step2Phases.displayName = 'Step2Phases';

// ==========================================
// STEP 3: CONCLUSION
// ==========================================

const Step3Conclusion = React.memo(({ formData, errors, handleChange }: {
    formData: ProjectFormData;
    errors: Record<string, string>;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}) => {
    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-800">Project Conclusion</h3>
                <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Step 3</span>
            </div>

            {/* Project Summary Card */}
            <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl">
                <div className="flex gap-4">
                    <div className="w-16 h-16 bg-white rounded-xl shadow-sm overflow-hidden shrink-0 relative">
                        {formData.coverImage ? (
                            <Image
                                src={typeof formData.coverImage === 'string' ? formData.coverImage : URL.createObjectURL(formData.coverImage)}
                                alt="Project"
                                fill
                                className="object-cover"
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
                            {formData.summary || 'No summary'}
                        </p>
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                            <span className="text-xs font-medium text-gray-500 bg-white px-2 py-1 rounded-full">
                                👤 {formData.client || 'No client'}
                            </span>
                            <span className="text-xs font-medium text-blue-600 bg-white px-2 py-1 rounded-full">
                                {formData.phases.length} Phases Defined
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Full Description */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Project Description <span className="text-red-500">*</span>
                </label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={8}
                    className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl outline-none transition-all resize-none ${
                        errors.description ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-emerald-400 focus:bg-white'
                    }`}
                    placeholder="Provide a detailed description of the final outcome and results..."
                />
                {errors.description && <ErrorMessage message={errors.description} />}
            </div>

            {/* Publishing Date */}
            <div className="mt-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <FiCalendar className="text-gray-400" /> Publishing Date
                </label>
                <input
                    type="date"
                    name="publishingDate"
                    value={formData.publishingDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none focus:border-emerald-400 focus:bg-white transition-all"
                />
            </div>
        </div>
    );
});

Step3Conclusion.displayName = 'Step3Conclusion';

// ==========================================
// HELPER COMPONENTS
// ==========================================

const ErrorMessage = React.memo(({ message }: { message: string }) => (
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