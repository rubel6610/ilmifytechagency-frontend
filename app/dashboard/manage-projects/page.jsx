'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { VscProject } from "react-icons/vsc";
import { FiPlus, FiSearch, FiFilter, FiRefreshCw, FiAlertTriangle } from 'react-icons/fi';
import ProjectCard from './Components/ProjectCard';
import ProjectModal from './Components/ProjectModal';
import DeleteConfirmModal from './Components/DeleteConfirmModal';
import ProjectDetailsModal from './Components/ProjectDetailsModal';
import Pagination from './Components/Pagination';

const ITEMS_PER_PAGE = 6;

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
// MAIN PAGE COMPONENT
// ============================================
const ProjectsPage = () => {
    // State Management
    const [projects, setProjects] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    
    // Modal States
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    
    // Filter States
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    // ============================================
    // FETCH PROJECTS
    // ============================================
    const fetchProjects = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await fetch('/projectsData.json');
            
            if (!response.ok) {
                throw new Error('Failed to load projects');
            }

            const data = await response.json();

            const mappedData = data.map(item => ({
                _id: item.id,
                name: item.title,
                projectImage: item.image,
                description: item.description,
                status: item.status,
                client: item.client,
                publishingDate: item.date,
                progress: item.progress,
                manager: item.author
            }));

            setProjects(mappedData);
            setFilteredProjects(mappedData); 
        }
        catch (err) {
            setError('Failed to fetch projects. Please try again.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    // Initial Fetch
    useEffect(() => {
        fetchProjects();
    }, []);

    // Filter Projects
    useEffect(() => {
        const currentProjectsList = Array.isArray(projects) ? projects : [];
        let result = currentProjectsList;

        if (searchQuery) {
            result = result.filter(project =>
                (project.name && project.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (project.description && project.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (project.manager && project.manager.toLowerCase().includes(searchQuery.toLowerCase()))
            );
        }

        if (statusFilter !== 'all') {
            result = result.filter(project => project.status === statusFilter);
        }

        setFilteredProjects(result);
    }, [searchQuery, statusFilter, projects]);

    // ============================================
    // PAGINATION LOGIC
    // ============================================
    const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);

    const paginatedProjects = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        return filteredProjects.slice(startIndex, endIndex);
    }, [filteredProjects, currentPage]);

    useEffect(() => {
        if (currentPage > totalPages && totalPages > 0) {
            setCurrentPage(totalPages);
        }
    }, [currentPage, totalPages]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 300, behavior: 'smooth' });
    };

    // Reset to page 1 when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, statusFilter, projects.length]);

    // ============================================
    // HANDLERS
    // ============================================
    const handleAddProject = () => {
        setSelectedProject(null);
        setIsModalOpen(true);
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
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            if (selectedProject) {
                setProjects(prev => prev.map(p => 
                    p._id === selectedProject._id ? { ...p, ...formData } : p
                ));
            } else {
                const newProject = {
                    _id: Date.now().toString(),
                    ...formData,
                };
                setProjects(prev => [newProject, ...prev]);
                setCurrentPage(1); // Go to first page to see new project
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

    const handleViewDetails = (project) => {
        setSelectedProject(project);
        setIsViewModalOpen(true);
    };

    // Safe stats calculation
    const safeProjects = Array.isArray(projects) ? projects : [];
    const stats = {
        total: safeProjects.length,
        pending: safeProjects.filter(p => p.status === 'draft').length,
        inProgress: safeProjects.filter(p => p.status === 'in-progress').length,
        completed: safeProjects.filter(p => p.status === 'published-to-showcase').length,
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
            {/* Header Section */}
            <div className=" ">
                <div className="max-w-400 mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h1 className=" text-xl md:text-3xl font-bold flex gap-2 items-center text-gray-800">
                                <VscProject className="text-emerald-600" />
                                Projects <span className="text-emerald-600">Management</span>
                            </h1>
                            <p className='text-gray-500 mt-1'> Found Total <span className='font-bold text-gray-800'>{stats.total}</span> Projects</p>
                        </div>
                        
                        <button
                            onClick={handleAddProject}
                            className="flex items-center justify-center gap-2 px-6 py-3 bg-emerald-500 text-white rounded-xl transition-all font-semibold shadow-lg shadow-emerald-600/25 hover:shadow-emerald-600/40 hover:-translate-y-0.5"
                        >
                            <FiPlus size={20} />
                            Add Project
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-400 mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Search and Filter Bar */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search */}
                        <div className="flex-1 relative">
                            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search projects..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none"
                            />
                        </div>

                        {/* Status Filter */}
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                            <div className="flex items-center gap-2 text-gray-500">
                                <FiFilter size={18} />
                                <span className="hidden sm:inline text-sm font-medium">Status:</span>
                            </div>
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none bg-white font-medium"
                            >
                                <option value="all">All Projects</option>
                                <option value="published-to-showcase">Published</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Results Info */}
                {(searchQuery || statusFilter !== 'all') && !isLoading && (
                    <div className="mb-4 text-sm text-gray-500">
                        Showing <span className="font-semibold text-gray-700">{filteredProjects.length}</span> 
                        {filteredProjects.length === 1 ? ' project' : ' projects'}
                        {searchQuery && <span> for &ldquo;<span className="font-semibold text-gray-700">{searchQuery}</span>&rdquo;</span>}
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
                                ? "Try adjusting your search query or filter"
                                : 'Get started by creating your first project'}
                        </p>
                        {!searchQuery && statusFilter === 'all' && (
                            <button
                                onClick={handleAddProject}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-500 transition-colors font-semibold shadow-lg shadow-emerald-600/25"
                            >
                                <FiPlus size={20} />
                                Create Project
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
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {paginatedProjects.map((project) => (
                                <ProjectCard
                                    key={project._id}
                                    project={project}
                                    onEdit={handleEditProject}
                                    onDelete={handleDeleteClick}
                                    onViewDetails={handleViewDetails}
                                />
                            ))}
                        </div>

                        {/* Pagination */}
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                            totalItems={filteredProjects.length}
                            itemsPerPage={ITEMS_PER_PAGE}
                        />
                    </>
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

            <ProjectDetailsModal
                isOpen={isViewModalOpen}
                onClose={() => setIsViewModalOpen(false)}
                project={selectedProject}
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