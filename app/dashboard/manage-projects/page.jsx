'use client';

import React, { useState, useEffect } from 'react';
import { VscProject } from "react-icons/vsc";
import { FiPlus, FiSearch, FiFilter, FiRefreshCw, FiEdit2, FiTrash2, FiCalendar, FiUser, FiX, FiAlertTriangle } from 'react-icons/fi';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';

// ============================================
// MOCK DATA - Replace with API calls later
// ============================================
const mockProjects = [
    {
        _id: '1',
        name: 'Website Redesign',
        projectImage: '/assets/insurance_pic.jpg',
        description: 'Complete overhaul of company website with modern design and improved UX',
        status: 'published-to-showcase',
        client: 'John Doe',
        publishingDate: '2024-03-15',
        progress: 65,
    },
    {
        _id: '2',
        name: 'Mobile App Development',
        projectImage: '/assets/woman_pic.jpg',
        description: 'Build iOS and Android applications for the e-commerce platform',
        status: 'published-to-showcase',
        client: 'Jane Smith',
        publishingDate: '2024-04-20',
        progress: 0,
    },
    {
        _id: '3',
        name: 'API Integration',
        projectImage: '/assets/helping_hand.webp',
        description: 'Connect third-party services with REST API endpoints',
        status: 'draft',
        client: 'Mike Johnson',
        publishingDate: '2024-02-28',
        progress: 100,
    },
    {
        _id: '4',
        name: 'Database Migration',
        projectImage: '/assets/store_design.jpg',
        description: 'Migrate legacy SQL database to MongoDB cluster for better scalability',
        status: 'published-to-showcase',
        client: 'Sarah Wilson',
        publishingDate: '2024-03-30',
        progress: 40,
    },
    {
        _id: '5',
        name: 'Security Audit',
        projectImage: '/customtrading_pic.jpg',
        description: 'Comprehensive security review and vulnerability assessment',
        status: 'draft',
        client: 'Tom Brown',
        publishingDate: '2024-04-01',
        progress: 0,
    },
    {
        _id: '6',
        name: 'UI/UX Improvements',
        projectImage: '/assets/shopping_pic.avif',
        description: 'Enhance user interface based on customer feedback and analytics',
        status: 'draft',
        client: 'Lisa Anderson',
        publishingDate: '2024-01-15',
        progress: 25,
    },
];

// ============================================
// DELETE CONFIRMATION MODAL
// ============================================
const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, projectName, isLoading }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />
            
            {/* Modal */}
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500"
                >
                    <FiX size={18} />
                </button>

                <div className="text-center">
                    <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                        <FiAlertTriangle className="text-red-600" size={32} />
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                        Delete Project
                    </h3>
                    
                    <p className="text-gray-600 mb-6">
                        Are you sure you want to delete <span className="font-semibold text-gray-800">&ldquo;{projectName}&ldquo;</span>? This action cannot be undone.
                    </p>

                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            className="flex-1 px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            disabled={isLoading}
                            className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-semibold disabled:opacity-50 shadow-lg shadow-red-600/25"
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Deleting...
                                </span>
                            ) : 'Delete'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ============================================
// SKELETON LOADER COMPONENT
// ============================================
const SkeletonCard = () => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 animate-pulse">
        <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
                <div className="h-5 bg-gray-200 rounded-lg w-3/4 mb-3"></div>
                <div className="h-6 bg-gray-200 rounded-full w-24"></div>
            </div>
        </div>
        <div className="space-y-2 mb-4">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
        <div className="pt-4 border-t border-gray-100">
            <div className="flex justify-between">
                <div className="h-4 bg-gray-200 rounded w-24"></div>
                <div className="h-4 bg-gray-200 rounded w-24"></div>
            </div>
        </div>
        <div className="mt-4">
            <div className="h-2 bg-gray-200 rounded-full w-full"></div>
        </div>
    </div>
);

// ============================================
// STAT CARD COMPONENT
// ============================================
const StatCard = ({ title, value, color, icon }) => (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm text-gray-500 font-medium">{title}</p>
                <p className={`text-3xl font-bold mt-1 ${color}`}>{value}</p>
            </div>
            <div className={`p-3 rounded-xl ${color.replace('text-', 'bg-').replace('600', '100').replace('800', '100')}`}>
                {icon}
            </div>
        </div>
    </div>
);

// ============================================
// MAIN PAGE COMPONENT
// ============================================
const ProjectsPage = () => {
    // State Management
    const [projects, setProjects] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    
    // Modal States
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    
    // Filter States
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    // Fetch Projects (Simulated)
    const fetchProjects = async () => {
        try {
            setIsLoading(true);
            setError(null);
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            setProjects(mockProjects);
            setFilteredProjects(mockProjects);
        } catch (err) {
            setError('Failed to fetch projects. Please try again.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    // Filter Projects
    useEffect(() => {
        let result = projects;

        if (searchQuery) {
            result = result.filter(project =>
                project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                project.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                project.manager?.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (statusFilter !== 'all') {
            result = result.filter(project => project.status === statusFilter);
        }

        setFilteredProjects(result);
    }, [searchQuery, statusFilter, projects]);

    // Handlers
    const handleAddProject = () => {
        setSelectedProject(null);
        setIsModalOpen(true);
        // window.scrollTo(0, 0);
    };

    const handleEditProject = (project) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    const handleDeleteClick = (project) => {
        setSelectedProject(project);
        setIsDeleteModalOpen(true);
    };

    const handleSubmitProject = async (formData) => {
        try {
            setIsSubmitting(true);
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            if (selectedProject) {
                // Update existing project
                setProjects(prev => prev.map(p => 
                    p._id === selectedProject._id ? { ...p, ...formData } : p
                ));
            } else {
                // Create new project
                const newProject = {
                    _id: Date.now().toString(),
                    ...formData,
                };
                setProjects(prev => [newProject, ...prev]);
            }
            setIsModalOpen(false);
        } catch (err) {
            console.error(err);
            alert('Failed to save project. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleConfirmDelete = async () => {
        try {
            setIsSubmitting(true);
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            setProjects(prev => prev.filter(p => p._id !== selectedProject._id));
            setIsDeleteModalOpen(false);
        } catch (err) {
            console.error(err);
            alert('Failed to delete project. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Stats Calculation
    const stats = {
        total: projects.length,
        pending: projects.filter(p => p.status === 'pending').length,
        inProgress: projects.filter(p => p.status === 'in-progress').length,
        completed: projects.filter(p => p.status === 'completed').length,
    };

    return (
        <div className="min-h-screen mx-auto bg-linear-to-br from-gray-50 to-gray-100">
            {/* Header Section */}
            <div className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-400 mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold flex gap-2 items-center text-gray-800">
                                <VscProject className="text-primary" />
                                Projects <span className="text-primary">Management</span>
                            </h1>
                            <p className='text-gray-500'> Found Total <span className='font-bold'>{stats.total}</span> Projects</p>

                        </div>
                        
                        <button
                            onClick={handleAddProject}
                            className="flex items-center justify-center gap-2 px-6 py-3 bg-emerald-500 text-white rounded-xl  transition-all font-semibold shadow-lg shadow-emerald-600/25 hover:shadow-emerald-600/40 hover:-translate-y-0.5"
                        >
                            <FiPlus size={20} />
                            Add Project
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Search and Filter Bar */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                        {/* Search */}
                        <div className="flex-1 relative">
                            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search projects by name, description, or manager..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none"
                            />
                        </div>

                        {/* Status Filter */}
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 text-gray-500">
                                <FiFilter size={18} />
                                <span className="hidden sm:inline text-sm font-medium">Status:</span>
                            </div>
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none bg-white font-medium"
                            >
                                <option value="all">All</option>
                                <option value="published-to-showcase">Published To Showcase</option>
                            </select>

                            {/* Refresh Button */}
                            <button
                                onClick={fetchProjects}
                                disabled={isLoading}
                                className="p-3 border-2 border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all disabled:opacity-50"
                                title="Refresh"
                            >
                                <FiRefreshCw className={isLoading ? 'animate-spin text-emerald-500' : 'text-gray-600'} size={20} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Results Count */}
                {(searchQuery || statusFilter !== 'all') && !isLoading && (
                    <div className="mb-4 text-sm text-gray-500">
                        Showing <span className="font-semibold text-gray-700">{filteredProjects.length}</span> 
                        {filteredProjects.length === 1 ? ' project' : ' projects'}
                        {searchQuery && <span> for &ldquo;<span className="font-semibold text-gray-700">{searchQuery}</span>&ldquo;</span>}
                        {statusFilter !== 'all' && <span> with status &ldquo;<span className="font-semibold text-gray-700">{statusFilter.replace('-', ' ')}</span>&ldquo;</span>}
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="bg-red-50 border-2 border-red-200 text-red-700 px-6 py-4 rounded-xl mb-6 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <FiAlertTriangle size={20} />
                            <span>{error}</span>
                        </div>
                        <button onClick={fetchProjects} className="font-semibold hover:underline">
                            Try again
                        </button>
                    </div>
                )}

                {/* Loading State */}
                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map((n) => (
                            <SkeletonCard key={n} />
                        ))}
                    </div>
                ) : filteredProjects.length === 0 ? (
                    /* Empty State */
                    <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-200">
                        <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-6">
                            <VscProject className="text-gray-400" size={40} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-700 mb-2">
                            {searchQuery || statusFilter !== 'all' 
                                ? 'No projects found' 
                                : 'No projects yet'}
                        </h3>
                        <p className="text-gray-500 mb-6 max-w-md mx-auto">
                            {searchQuery || statusFilter !== 'all'
                                ? "Try adjusting your search query or filter to find what you're looking for"
                                : 'Get started by creating your first project to track and manage your work'}
                        </p>
                        {!searchQuery && statusFilter === 'all' && (
                            <button
                                onClick={handleAddProject}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-500 transition-colors font-semibold shadow-lg shadow-emerald-600/25"
                            >
                                <FiPlus size={20} />
                                Create Your First Project
                            </button>
                        )}
                        {(searchQuery || statusFilter !== 'all') && (
                            <button
                                onClick={() => {
                                    setSearchQuery('');
                                    setStatusFilter('all');
                                }}
                                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
                            >
                                Clear Filters
                            </button>
                        )}
                    </div>
                ) : (
                    /* Projects Grid */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProjects.map((project) => (
                            <ProjectCard
                                key={project._id}
                                project={project}
                                onEdit={handleEditProject}
                                onDelete={handleDeleteClick}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Modals */}
            <ProjectModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmitProject}
                project={selectedProject}
                isLoading={isSubmitting}
            />

            <DeleteConfirmModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                projectName={selectedProject?.name}
                isLoading={isSubmitting}
            />
        </div>
    );
};

export default ProjectsPage; 