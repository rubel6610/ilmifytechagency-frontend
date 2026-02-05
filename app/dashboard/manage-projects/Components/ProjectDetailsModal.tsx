"use client";

import React, { useEffect } from 'react';
import Image from 'next/image';
import { 
    FiX, 
    FiCalendar, 
    FiUser, 
    FiMessageSquare,
    FiExternalLink,
    FiGlobe,
    FiLayers,
    FiCpu
} from 'react-icons/fi';
import { Project } from '@/redux/service/projectApi';

// ==========================================
// TYPES
// ==========================================

interface ProjectDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    project: Project | null;
}

const ProjectDetailsModal: React.FC<ProjectDetailsModalProps> = ({ 
    isOpen, 
    onClose, 
    project 
}) => {
    // Prevent scroll when modal is open
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

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all duration-300">
            <div 
                className="bg-white w-full max-w-4xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl relative flex flex-col animate-in fade-in zoom-in duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 z-50 p-2 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full text-white transition-all border border-white/30 hover:scale-110 active:scale-95"
                >
                    <FiX size={20} />
                </button>

                {/* Header Image */}
                <div className="relative h-64 w-full shrink-0 bg-gray-100">
                    {project.coverImage ? (
                        <Image 
                            src={project.coverImage} 
                            alt={project.name} 
                            fill 
                            className="object-cover"
                            priority
                        />
                    ) : (
                        <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                            <span className="text-slate-500">No header image</span>
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    
                    {/* Project Title and Client in Header */}
                    <div className="absolute bottom-6 left-8 right-8">
                        <div className="flex items-center gap-2 mb-2">
                             <span className="bg-emerald-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-lg">
                                {project.client}
                            </span>
                             <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border border-white/30">
                                {new Date(project.publishingDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long' })}
                            </span>
                        </div>
                        <h2 className="text-3xl font-bold text-white tracking-tight drop-shadow-md">
                            {project.name}
                        </h2>
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-white">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Description */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Summary Section */}
                            {project.summary && (
                                <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100/50">
                                    <h4 className="text-sm font-semibold text-emerald-900 mb-2 flex items-center gap-2">
                                        <FiMessageSquare size={16} />
                                        Executive Summary
                                    </h4>
                                    <p className="text-emerald-800 text-sm leading-relaxed">
                                        {project.summary}
                                    </p>
                                </div>
                            )}

                            <div>
                                <h4 className="text-gray-900 font-bold mb-4 flex items-center gap-2 text-lg">
                                    <div className="w-1.5 h-6 bg-emerald-500 rounded-full" />
                                    Project Description
                                </h4>
                                <div className="text-gray-600 text-sm leading-relaxed prose prose-slate">
                                    {project.description}
                                </div>
                            </div>

                            {/* Phases */}
                            {project.phases && project.phases.length > 0 && (
                                <div>
                                    <h4 className="text-gray-900 font-bold mb-6 flex items-center gap-2 text-lg">
                                        <div className="w-1.5 h-6 bg-emerald-500 rounded-full" />
                                        Project Roadmap
                                    </h4>
                                    <div className="space-y-4">
                                        {project.phases.map((phase, idx) => (
                                            <div key={idx} className="relative pl-8 pb-8 last:pb-0 border-l-2 border-slate-100 last:border-transparent">
                                                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-emerald-500 border-4 border-white shadow-sm" />
                                                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <h5 className="font-bold text-gray-900">{phase.name}</h5>
                                                        <span className="text-[10px] font-bold text-slate-400 bg-white px-2 py-1 rounded-lg border border-slate-100 uppercase tracking-wider">
                                                            {new Date(phase.startDate).toLocaleDateString()} - {new Date(phase.endDate).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                    <p className="text-gray-600 text-xs leading-relaxed">{phase.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sidebar info */}
                        <div className="space-y-6">
                            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-6">
                                {project.website && (
                                    <div>
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">Project Website</label>
                                        <a 
                                            href={project.website} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold text-sm transition-colors group"
                                        >
                                            <FiGlobe size={16} />
                                            {project.website.replace(/^https?:\/\//, '')}
                                            <FiExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </a>
                                    </div>
                                )}

                                {project.platforms && project.platforms.length > 0 && (
                                    <div>
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Available On</label>
                                        <div className="flex flex-wrap gap-2">
                                            {project.platforms.map((p, i) => (
                                                <span key={i} className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-100 rounded-xl text-xs font-semibold text-slate-700 shadow-sm">
                                                    <FiLayers size={12} className="text-emerald-500" />
                                                    {p}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {project.technologies && project.technologies.length > 0 && (
                                    <div>
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Tech Stack</label>
                                        <div className="flex flex-wrap gap-2">
                                            {project.technologies.map((t, i) => (
                                                <span key={i} className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-100 rounded-xl text-xs font-semibold text-slate-700 shadow-sm">
                                                    <FiCpu size={12} className="text-emerald-500" />
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Release Date</label>
                                    <p className="text-slate-900 font-bold text-sm flex items-center gap-2">
                                        <FiCalendar className="text-emerald-500" />
                                        {new Date(project.publishingDate).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetailsModal;