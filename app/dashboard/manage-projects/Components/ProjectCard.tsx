// components/projects/ProjectCard.tsx

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
} from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi';

// ==========================================
// TYPES
// ==========================================

interface Project {
  id?: number;
  name: string;
  description?: string;
  client?: string;
  status: 'draft' | 'published-to-showcase' | 'archived';
  publishingDate?: string;
  projectImage?: string;
}

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (project: Project) => void;
  onViewDetails?: (project: Project) => void;
}

// ==========================================
// MAIN COMPONENT
// ==========================================

const ProjectCard = ({ project, onEdit, onDelete, onViewDetails }: ProjectCardProps) => {
    
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
            label: 'Not Published',
            icon: <FiEyeOff size={12} />,
        },
    };
    
    const status = statusConfig[project.status as keyof typeof statusConfig] || statusConfig['draft'];

    const handleAddToShowcase = () => {
        console.log('project added to showcase');
    };
    
    const handleRemoveFromShowcase = () => {
        console.log('project removed from showcase');
    };
    
    const formatDate = (date?: string) => {
        if (!date) return 'No date';
        return new Date(date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    return (
        <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 flex flex-col h-full">
            
            {/* Image Section */}
            <div className="relative w-full h-52 overflow-hidden shrink-0">
                {project.projectImage ? (
                    <Image
                        src={project.projectImage}
                        alt={project.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <div className="text-center text-gray-400">
                            <FiExternalLink size={32} className="mx-auto mb-2" />
                            <span className="text-sm">No Image</span>
                        </div>
                    </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="absolute top-3 left-3 z-10">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${status.bg} ${status.text} shadow-lg backdrop-blur-sm`}>
                        {status.icon}
                        {status.label}
                    </span>
                </div>

                <div className="absolute top-3 right-3 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <button 
                        onClick={() => onEdit(project)} 
                        className="p-2.5 bg-white/90 backdrop-blur-sm text-emerald-500 rounded-xl hover:bg-white hover:scale-110 transition-all shadow-lg"
                        aria-label="Edit project"
                    >
                        <FiEdit2 size={16} />
                    </button>
                    <button 
                        onClick={() => onDelete(project)} 
                        className="p-2.5 bg-white/90 backdrop-blur-sm text-red-500 rounded-xl hover:bg-white hover:scale-110 transition-all shadow-lg"
                        aria-label="Delete project"
                    >
                        <FiTrash2 size={16} />
                    </button>
                </div>

                {/* View Details Button */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                    <button 
                        onClick={() => onViewDetails && onViewDetails(project)} 
                        className="flex items-center gap-2 px-4 py-2 bg-white/95 backdrop-blur-sm text-gray-800 rounded-full text-sm font-medium hover:bg-white transition-colors shadow-lg"
                        aria-label="View project details"
                    >
                        <FiExternalLink size={14} />
                        View Details
                    </button>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-5 flex flex-col grow">
                <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-1 group-hover:text-emerald-600 transition-colors">
                    {project.name}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4 h-10">
                    {project.description || 'No description provided for this project.'}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-400 pb-4 border-b border-gray-100 mt-auto">
                    <div className="flex items-center gap-1.5">
                        <FiUser size={13} />
                        <span className="font-medium truncate max-w-[100px]">
                            {project.client || 'No Client'}
                        </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <FiCalendar size={13} />
                        <span>{formatDate(project.publishingDate)}</span>
                    </div>
                </div>
                <div className="pt-4 mt-auto">
                    {project.status !== 'published-to-showcase' ? (
                        <button 
                            onClick={handleAddToShowcase} 
                            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-medium text-sm hover:from-emerald-600 hover:to-teal-600 transition-all shadow-md shadow-emerald-500/20 hover:shadow-lg hover:shadow-emerald-500/30 hover:-translate-y-0.5"
                            aria-label="Add to showcase"
                        >
                            <HiSparkles size={16} /> Add to Showcase
                        </button>
                    ) : (
                        <button 
                            onClick={handleRemoveFromShowcase} 
                            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-gray-50 text-gray-600 rounded-xl font-medium text-sm hover:bg-red-50 hover:text-red-600 transition-all border border-gray-100 hover:border-red-200"
                            aria-label="Remove from showcase"
                        >
                            <FiEyeOff size={14} /> Remove from Showcase
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;