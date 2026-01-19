// components/projects/ProjectDetailsModal.jsx

import React, { useEffect } from 'react';
import Image from 'next/image';
import { 
    FiX, 
    FiCalendar, 
    FiUser, 
    FiTag, 
    FiCheckCircle, 
    FiCircle,
    FiExternalLink
} from 'react-icons/fi';

const ProjectDetailsModal = ({ isOpen, onClose, project }) => {
    
    // Prevent background scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen || !project) return null;

    // Helper to format date
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
                onClick={onClose}
            />

            {/* Modal Container */}
            <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
                
                {/* Close Button (Floating) */}
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-md transition-colors"
                >
                    <FiX size={20} />
                </button>

                {/* Header Image */}
                <div className="relative h-64 w-full shrink-0 bg-gray-100">
                    {project.projectImage ? (
                        <Image 
                            src={project.projectImage} 
                            alt={project.name} 
                            fill 
                            className="object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                            <FiExternalLink size={48} className="mb-2 opacity-50"/>
                            <span>No Cover Image</span>
                        </div>
                    )}
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                    
                    {/* Title Overlay */}
                    <div className="absolute bottom-0 left-0 w-full p-6 text-white">
                        <div className="flex items-center gap-2 mb-2">
                            {project.status === 'published-to-showcase' ? (
                                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/90 text-xs font-semibold backdrop-blur-sm flex items-center gap-1">
                                    <FiCheckCircle size={12} /> Published
                                </span>
                            ) : (
                                <span className="px-2.5 py-0.5 rounded-full bg-gray-500/90 text-xs font-semibold backdrop-blur-sm flex items-center gap-1">
                                    <FiCircle size={12} /> Not Published
                                </span>
                            )}
                        </div>
                        <h2 className="text-3xl font-bold leading-tight">{project.name}</h2>
                    </div>
                </div>

                {/* Content - Scrollable */}
                <div className="p-6 overflow-y-auto custom-scrollbar">
                    
                    {/* Meta Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                        <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                            <div className="flex items-center gap-2 text-gray-500 text-xs font-medium uppercase tracking-wider mb-1">
                                <FiUser /> Client
                            </div>
                            <div className="font-semibold text-gray-800 truncate">
                                {project.client || 'Internal Project'}
                            </div>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                            <div className="flex items-center gap-2 text-gray-500 text-xs font-medium uppercase tracking-wider mb-1">
                                <FiCalendar /> Published
                            </div>
                            <div className="font-semibold text-gray-800">
                                {formatDate(project.publishingDate)}
                            </div>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                            <div className="flex items-center gap-2 text-gray-500 text-xs font-medium uppercase tracking-wider mb-1">
                                <FiTag /> Type
                            </div>
                            <div className="font-semibold text-gray-800">
                                {project.status === 'published-to-showcase' ? 'Showcase' : 'Standard'}
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-3">
                        <h3 className="text-lg font-bold text-gray-800 border-l-4 border-emerald-500 pl-3">
                            About this Project
                        </h3>
                        <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed">
                            <p>
                                {project.description || "No detailed description provided for this project."}
                            </p>
                        </div>
                    </div>

                    {/* Additional Details (Optional Placeholder) */}
                    {project.manager && (
                         <div className="mt-8 pt-6 border-t border-gray-100">
                            <p className="text-sm text-gray-500">
                                <span className="font-semibold text-gray-700">Project Manager:</span> {project.manager}
                            </p>
                         </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectDetailsModal;