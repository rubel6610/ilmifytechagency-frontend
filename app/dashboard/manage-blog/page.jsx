"use client";
import React from "react";
import { HiPlus, HiSearch, HiOutlineNewspaper } from "react-icons/hi";
import { CgSpinner } from "react-icons/cg";
import { AnimatePresence } from "framer-motion";


import AddBlogModal from "./components/AddBlogModal";
import BlogCard from "./components/BlogCard";
import EditBlogModal from "./components/EditBlogModal";
import BlogDetailsModal from "./components/BlogDetailsModal";
import { useBlogLogic } from "./components/useBlogLogic";

const ManageBlog = () => {
  const {
    loading,
    filteredBlogs,
    currentBlogs,
    searchQuery,
    setSearchQuery,
    setCurrentPage,
    isAddModalOpen,
    setIsAddModalOpen,
    editBlog,
    setEditBlog,
    selectedBlog,
    setSelectedBlog,
    handleDelete,
    handleEditSubmit,
    isSubmitting,
    preview,
    setPreview,
    register,
    handleSubmit,
    onAddSubmit,
    errors,
    setValue,
    totalPages,
    currentPage,
  } = useBlogLogic();

  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-4">
        <CgSpinner className="text-5xl text-emerald-500 animate-spin" />
        <p className="text-gray-500 font-medium">
          Fetching Blogs from Database...
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen relative font-sans">
      {/* Header Section */}
      <div className="max-w-400 mx-auto mb-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-100 rounded-lg">
            <HiOutlineNewspaper className="text-2xl md:text-3xl text-emerald-600" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">
              Blog Management
            </h1>
            <p className="text-gray-500 text-sm font-medium">
              Total{" "}
              <span className="text-emerald-600 font-bold">
                {filteredBlogs.length}
              </span>{" "}
              blogs found
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          {/* Search Field */}
          <div className="relative grow md:grow-0">
            <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-9 pr-3 py-2 w-full md:w-64 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm text-sm"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center justify-center gap-1 bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-2 md:px-5 md:py-2.5 rounded-xl font-semibold shadow-md transition-all active:scale-95 text-sm"
          >
            <HiPlus className="text-xl md:text-lg" />
            <span>Add <span className="hidden">Blog</span></span>
          </button>
        </div>
      </div>

      {/* Blogs Grid */}
      <div className="max-w-400 mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <AnimatePresence mode="wait">
          {currentBlogs.length > 0 ? (
            currentBlogs.map((blog) => (
              <BlogCard
                key={blog.id}
                blog={blog}
                onEdit={() => setEditBlog(blog)}
                onDelete={() => handleDelete(blog.id)}
                onView={() => setSelectedBlog(blog)}
              />
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-400">
              <p className="text-xl">No blogs found!</p>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Pagination (Optional - if you want to keep it in main file) */}
      {totalPages > 1 && (
        <div className="max-w-7xl mx-auto mt-8 flex justify-center gap-2">
          {/* Pagination Buttons logic stays here for now */}
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-10 h-10 rounded-lg border font-semibold ${
                currentPage === i + 1
                  ? "bg-emerald-500 text-white"
                  : "bg-white text-gray-600"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {/* All Modals */}
      <AddBlogModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        handleSubmit={handleSubmit}
        onAddSubmit={onAddSubmit}
        register={register}
        errors={errors}
        preview={preview}
        setPreview={setPreview}
        setValue={setValue}
        isSubmitting={isSubmitting}
      />

      <EditBlogModal
        editBlog={editBlog}
        setEditBlog={setEditBlog}
        handleEditSubmit={handleEditSubmit}
      />

      <BlogDetailsModal
        blog={selectedBlog}
        onClose={() => setSelectedBlog(null)}
      />
    </div>
  );
};

export default ManageBlog;
