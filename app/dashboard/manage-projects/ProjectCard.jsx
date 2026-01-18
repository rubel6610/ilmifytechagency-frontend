// components/projects/ProjectCard.jsx

import Image from 'next/image';
import React from 'react';
import { 
    FiCalendar, 
    FiEdit2, 
    FiTrash2, 
    FiUser, 
    FiExternalLink,
    FiEye,
    FiEyeOff,
    FiStar,
    FiMoreVertical
} from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi';

const ProjectCard = ({ project, onEdit, onDelete }) => {
    
    // Status Configuration
    const statusConfig = {
        'published-to-showcase': {
            bg: 'bg-emerald-500',
            text: 'text-white',
            label: 'Published',
            icon: <FiEye size={12} />,
        },
        'draft': {
            bg: 'bg-gray-500',
            text: 'text-white',
            label: 'Draft',
            icon: <FiEyeOff size={12} />,
        },
    };

    const status = statusConfig[project.status] || statusConfig['draft'];

    // Handlers
    const handleAddToShowcase = () => {
        alert(`Adding "${project.name}" to showcase`);
        console.log(`Adding project ${project.name} to showcase`);
    };

    const handleRemoveFromShowcase = () => {
        alert(`Removing "${project.name}" from showcase`);
        console.log(`Removing project ${project.name} from showcase`);
    };

    // Format Date
    const formatDate = (date) => {
        if (!date) return 'No date';
        return new Date(date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    return (
        <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200">
            
            {/* ===== IMAGE SECTION ===== */}
            <div className="relative w-full h-52 overflow-hidden">
                {/* Project Image */}
                {project.projectImage ? (
                    <Image
                        src={project.projectImage}
                        alt={project.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="w-full h-full bg-linear-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <div className="text-center text-gray-400">
                            <FiExternalLink size={32} className="mx-auto mb-2" />
                            <span className="text-sm">No Image</span>
                        </div>
                    </div>
                )}

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Status Badge - Top Left */}
                <div className="absolute top-3 left-3 z-10">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${status.bg} ${status.text} shadow-lg`}>
                        {status.icon}
                        {status.label}
                    </span>
                </div>

                {/* Action Buttons - Top Right */}
                <div className="absolute top-3 right-3 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <button
                        onClick={() => onEdit(project)}
                        className="p-2.5 bg-white/90 backdrop-blur-sm text-blue-600 rounded-xl hover:bg-white hover:scale-110 transition-all shadow-lg"
                        title="Edit Project"
                    >
                        <FiEdit2 size={16} />
                    </button>
                    <button
                        onClick={() => onDelete(project)}
                        className="p-2.5 bg-white/90 backdrop-blur-sm text-red-500 rounded-xl hover:bg-white hover:scale-110 transition-all shadow-lg"
                        title="Delete Project"
                    >
                        <FiTrash2 size={16} />
                    </button>
                </div>

                {/* Quick View Button - Bottom Center (on hover) */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white/95 backdrop-blur-sm text-gray-800 rounded-full text-sm font-medium hover:bg-white transition-colors shadow-lg">
                        <FiExternalLink size={14} />
                        View Details
                    </button>
                </div>
            </div>

            {/* ===== CONTENT SECTION ===== */}
            <div className="p-5">
                {/* Title */}
                <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
                    {project.name}
                </h3>

                {/* Description */}
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4 min-h--10">
                    {project.description || 'No description provided for this project.'}
                </p>

                {/* Meta Info */}
                <div className="flex items-center justify-between text-xs text-gray-400 pb-4 border-b border-gray-100">
                    <div className="flex items-center gap-1.5">
                        <FiUser size={13} />
                        <span className="font-medium truncate max-w-25">
                            {project.client || 'No Client'}
                        </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <FiCalendar size={13} />
                        <span>{formatDate(project.publishingDate)}</span>
                    </div>
                </div>

                {/* ===== SHOWCASE ACTION ===== */}
                <div className="pt-4">
                    {project.status !== 'published-to-showcase' ? (
                        <button
                            onClick={handleAddToShowcase}
                            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-linear-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-medium text-sm hover:from-emerald-600 hover:to-teal-600 transition-all shadow-md shadow-emerald-500/20 hover:shadow-lg hover:shadow-emerald-500/30 hover:-translate-y-0.5"
                        >
                            <HiSparkles size={16} />
                            Add to Showcase
                        </button>
                    ) : (
                        <button
                            onClick={handleRemoveFromShowcase}
                            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-gray-100 text-gray-600 rounded-xl font-medium text-sm hover:bg-red-50 hover:text-red-600 transition-all border border-transparent hover:border-red-200"
                        >
                            <FiEyeOff size={14} />
                            Remove from Showcase
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;