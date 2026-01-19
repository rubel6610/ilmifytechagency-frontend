// Components/Pagination.jsx

import React from 'react';
import { 
    FiChevronLeft, 
    FiChevronRight, 
    FiChevronsLeft, 
    FiChevronsRight 
} from 'react-icons/fi';

const Pagination = ({ 
    currentPage, 
    totalPages, 
    onPageChange,
    totalItems,
    itemsPerPage,
    showItemsInfo = true 
}) => {
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;
        
        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            pages.push(1);
            
            if (currentPage > 3) {
                pages.push('...');
            }
            
            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);
            
            for (let i = start; i <= end; i++) {
                if (!pages.includes(i)) {
                    pages.push(i);
                }
            }
            
            if (currentPage < totalPages - 2) {
                pages.push('...');
            }
            
            if (!pages.includes(totalPages)) {
                pages.push(totalPages);
            }
        }
        
        return pages;
    };

    if (totalPages <= 1) return null;

    return (
        <div className="flex flex-col items-center gap-4 mt-8 pt-6 mb-8 border-gray-200">
            {/* Pagination Controls - Centered */}
            <div className="flex items-center gap-1">
                {/* First Page Button */}
                <button
                    type="button"
                    onClick={() => onPageChange(1)}
                    disabled={currentPage === 1}
                    className={`hidden sm:flex p-2 rounded-lg transition-all ${
                        currentPage === 1
                            ? 'text-gray-300 cursor-not-allowed'
                            : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                    }`}
                    title="First page"
                    aria-label="Go to first page"
                >
                    <FiChevronsLeft size={18} />
                </button>

                {/* Previous Button */}
                <button
                    type="button"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`p-2 rounded-lg transition-all ${
                        currentPage === 1
                            ? 'text-gray-300 cursor-not-allowed'
                            : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                    }`}
                    title="Previous page"
                    aria-label="Go to previous page"
                >
                    <FiChevronLeft size={18} />
                </button>

                {/* Page Numbers */}
                <div className="flex items-center gap-1 mx-1 sm:mx-2">
                    {getPageNumbers().map((page, index) => (
                        <React.Fragment key={index}>
                            {page === '...' ? (
                                <span className="px-2 text-gray-400 select-none">...</span>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => onPageChange(page)}
                                    className={`min-w-10 h-10 rounded-xl font-medium text-sm transition-all ${
                                        currentPage === page
                                            ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30'
                                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                                    }`}
                                    aria-label={`Go to page ${page}`}
                                    aria-current={currentPage === page ? 'page' : undefined}
                                >
                                    {page}
                                </button>
                            )}
                        </React.Fragment>
                    ))}
                </div>

                {/* Next Button */}
                <button
                    type="button"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`p-2 rounded-lg transition-all ${
                        currentPage === totalPages
                            ? 'text-gray-300 cursor-not-allowed'
                            : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                    }`}
                    title="Next page"
                    aria-label="Go to next page"
                >
                    <FiChevronRight size={18} />
                </button>

                {/* Last Page Button */}
                <button
                    type="button"
                    onClick={() => onPageChange(totalPages)}
                    disabled={currentPage === totalPages}
                    className={`hidden sm:flex p-2 rounded-lg transition-all ${
                        currentPage === totalPages
                            ? 'text-gray-300 cursor-not-allowed'
                            : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                    }`}
                    title="Last page"
                    aria-label="Go to last page"
                >
                    <FiChevronsRight size={18} />
                </button>
            </div>

            {/* Items Info - Centered below */}
            {showItemsInfo && (
                <p className="text-sm text-gray-500">
                    Showing{' '}
                    <span className="font-semibold text-gray-700">{startItem}</span>
                    {' '}-{' '}
                    <span className="font-semibold text-gray-700">{endItem}</span>
                    {' '}of{' '}
                    <span className="font-semibold text-gray-700">{totalItems}</span>
                    {' '}projects
                </p>
            )}
        </div>
    );
};

export default Pagination;