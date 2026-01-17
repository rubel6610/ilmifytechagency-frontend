import React from 'react';
import { FiCalendar, FiEdit2, FiTrash2, FiUser } from 'react-icons/fi';

const ProjectCard = ({ project, onEdit, onDelete }) => {
     const statusColors = {
        'published-to-showcase': 'bg-green-100 text-green-800 border-green-200',
        'draft': 'bg-gray-100 text-gray-800 border-gray-200',
    };

    const statusLabels = {
        'published-to-showcase': 'Published to Showcase',
        'draft': 'Not Published',
    };

    // add to showcase handlers
    const handleAddToShowcase = () => {
        // Logic to add project to showcase
        //post request to server can be added here
        alert(`Adding project ${project.name} to showcase`);

        console.log(`Adding project ${project.name} to showcase`);
    };

    // remove from showccase handlers 
    const handleDeleteprojectFromShowcase = () => { 
        // Logic to remove project from showcase
        //DELETE request to server can be added here
        alert(`Removing project ${project.name} from showcase`);
        console.log(`Removing project ${project.name} from showcase`);
    };

   return (
        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 border border-gray-100 group">
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
                <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-gray-800 truncate mb-2">
                        {project.name}
                    </h3>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${statusColors[project.status]}`}>
                        {statusLabels[project.status]}
                    </span>
                </div>
                
                {/* Action Buttons */}
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={() => onEdit(project)}
                        className="p-2 text-primary hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit"
                    >
                        <FiEdit2 size={16} />
                    </button>
                    <button
                        onClick={() => onDelete(project)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                    >
                        <FiTrash2 size={16} />
                    </button>
                </div>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                {project.description || 'No description provided'}
            </p>

            {/* Footer Info */}
            <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-1.5">
                    <FiUser size={14} className="text-gray-400" />
                    <span className="truncate max-w-25">{project.client || 'Unassigned'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <FiCalendar size={14} className="text-gray-400" />
                    <span>{project.deadline ? new Date(project.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'No deadline'}</span>
                </div>
            </div>

            {/* add to showcase section */}
            <div className="mt-4 flex justify-end">
               {project.status !== 'published-to-showcase' && (
                    <button
                       onClick={() => handleAddToShowcase()}
                        className="bg-emerald-400 text-white px-4 py-2 rounded-full hover:bg-emerald-600 text-sm transition-colors"
                    >
                        Add To Showcase
                    </button>
                )}
                {project.status === 'published-to-showcase' && (
                      <button
                        onClick={() => handleDeleteprojectFromShowcase()}
                        className="bg-red-400 text-white px-4 py-2 rounded-full hover:bg-red-600 text-sm transition-colors"
                    >
                        Remove From Showcase
                    </button>
                )}
            </div>
        </div>
    );
};

export default ProjectCard;
