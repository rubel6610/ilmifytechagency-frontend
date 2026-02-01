"use client";

import Image from "next/image";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useGetBlogsQuery } from "@/redux/service/blogApi";
import { CgSpinner } from "react-icons/cg";

/* Fade up animation */
const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut" as const,
      delay: index * 0.1, // Stagger effect
    },
  }),
  exit: { opacity: 0, y: -20 },
};

const BLOGS_PER_PAGE = 6;

const Blog = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Fetch blogs from API
  const { data: blogResponse, isLoading, isFetching } = useGetBlogsQuery({
    page: currentPage,
    limit: BLOGS_PER_PAGE,
  });

  const blogs = blogResponse?.data?.blogs || [];
  const totalPages = blogResponse?.data?.totalPages || 0;
  const totalBlogs = blogResponse?.data?.total || 0;

  // Handle page changes
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 150, behavior: "smooth" });
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  // Generate page numbers to display
  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <section className="my-30">
      {/* HEADER */}
      <h1 className="text-center font-bold bg-[#F9F9F9] text-[32px] sm:text-[43px] text-[#00D9A6] py-10 uppercase tracking-tight">
        Insightful <span className="text-gray-800">Articles</span>
      </h1>

      {/* BLOG GRID */}
      <div className="bg-background py-16 min-h-[600px] relative">
        {/* Loading Overlay for Pagination */}
        {isFetching && !isLoading && (
          <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] z-10 flex items-center justify-center">
            <CgSpinner className="animate-spin text-4xl text-emerald-500" />
          </div>
        )}

        <div className="max-w-345 mx-auto px-4 md:px-10 lg:px-6">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <CgSpinner className="animate-spin text-5xl text-emerald-500" />
              <p className="text-gray-500 font-medium animate-pulse">Loading amazing stories...</p>
            </div>
          ) : (
            <>
              {/* AnimatePresence for smooth page transitions */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-x-12 md:gap-y-24"
                >
                  {blogs.length > 0 ? (
                    blogs.map((blog, index) => (
                      <Link key={blog.id} href={`/blog/${blog.id}`}>
                        <motion.div
                          custom={index}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          variants={fadeUp}
                          whileTap={{ scale: 0.98 }}
                          className="relative group cursor-pointer"
                        >
                          {/* IMAGE */}
                          <div className="relative w-full aspect-4/3 overflow-hidden rounded-2xl shadow-xl border border-gray-100/50">
                            <Image
                              src={blog.images?.[0] || "/placeholder-blog.png"}
                              alt={blog.title}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 50vw"
                              className="
                                object-cover
                                transition-transform duration-700
                                ease-[cubic-bezier(0.16,1,0.3,1)]
                                group-hover:scale-105
                              "
                            />
                            <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
                          </div>

                          {/* CARD */}
                          <div
                            className="
                              absolute left-4 right-4 md:left-8 md:right-8
                              -bottom-12 md:-bottom-16
                              bg-white
                              px-6 py-7 md:px-10 md:py-10
                              rounded-2xl
                              shadow-[0_15px_40px_rgba(0,0,0,0.08)]
                              transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]
                              group-hover:translate-y-6
                              group-hover:shadow-[0_25px_50px_rgba(16,185,129,0.15)]
                              group-hover:bg-linear-to-tr
                              group-hover:from-emerald-500
                              group-hover:to-lime-400
                              border border-gray-50
                            "
                          >
                            <div className="flex items-center gap-3 mb-3">
                              <span className="text-[10px] md:text-xs font-bold text-emerald-500 group-hover:text-white/90 uppercase tracking-widest bg-emerald-50 group-hover:bg-white/10 px-2 py-0.5 rounded-md transition-colors">
                                {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Recent'}
                              </span>
                              <span className="w-1 h-1 rounded-full bg-gray-300 group-hover:bg-white/40" />
                              <span className="text-[10px] md:text-xs text-gray-400 group-hover:text-white/80 font-bold uppercase tracking-wider">
                                By {blog.admin?.name || 'Team'}
                              </span>
                            </div>
                              
                            <h2 className="text-xl md:text-2xl font-bold text-gray-800 group-hover:text-white transition-colors line-clamp-2 leading-snug">
                              {blog.title}
                            </h2>

                            <div className="mt-4 pt-4 border-t border-gray-100 group-hover:border-white/20 flex items-center justify-between">
                                <p className="text-[10px] md:text-xs text-gray-500 group-hover:text-white/80 line-clamp-1 max-w-[70%] italic">
                                  {blog.subTitle}
                                </p>
                                <div className="flex items-center gap-1.5 text-gray-400 group-hover:text-white/80">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                  </svg>
                                  <span className="text-xs font-bold">{blog.views || 0}</span>
                                </div>
                            </div>
                          </div>
                        </motion.div>
                      </Link>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                      <p className="text-gray-400 text-lg font-medium">
                        No articles found at the moment.
                      </p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* PAGINATION */}
              {totalPages > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex justify-center items-center gap-2 mt-32"
                >
                  {/* Previous Button */}
                  <button
                    onClick={handlePrevious}
                    disabled={currentPage === 1}
                    className={`
                      flex items-center justify-center
                      w-10 h-10 md:w-12 md:h-12
                      rounded-full
                      border-2 border-emerald-500/20
                      transition-all duration-300
                      ${
                        currentPage === 1
                          ? "opacity-30 cursor-not-allowed"
                          : "hover:bg-emerald-500 hover:text-white hover:border-emerald-500 cursor-pointer text-emerald-500 shadow-sm"
                      }
                    `}
                    aria-label="Previous page"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>

                  {/* Page Numbers */}
                  <div className="flex items-center gap-1 md:gap-2">
                    {getPageNumbers().map((page, index) => (
                      <React.Fragment key={index}>
                        {page === "..." ? (
                          <span className="px-2 text-gray-300 font-bold">...</span>
                        ) : (
                          <button
                            onClick={() => handlePageChange(page as number)}
                            className={`
                              w-10 h-10 md:w-12 md:h-12
                              rounded-full
                              font-bold
                              transition-all duration-300
                              cursor-pointer
                              text-sm
                              ${
                                currentPage === page
                                  ? "bg-linear-to-tr from-emerald-500 to-lime-400 text-white shadow-[0_8px_20px_rgba(16,185,129,0.3)] scale-110"
                                  : "bg-white border-2 border-gray-100 text-gray-400 hover:border-emerald-500 hover:text-emerald-500"
                              }
                            `}
                            aria-label={`Go to page ${page}`}
                            aria-current={currentPage === page ? "page" : undefined}
                          >
                            {page}
                          </button>
                        )}
                      </React.Fragment>
                    ))}
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className={`
                      flex items-center justify-center
                      w-10 h-10 md:w-12 md:h-12
                      rounded-full
                      border-2 border-emerald-500/20
                      transition-all duration-300
                      ${
                        currentPage === totalPages
                          ? "opacity-30 cursor-not-allowed"
                          : "hover:bg-emerald-500 hover:text-white hover:border-emerald-500 cursor-pointer text-emerald-500 shadow-sm"
                      }
                    `}
                    aria-label="Next page"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </motion.div>
              )}
              
              {/* Blog count info */}
              <div className="text-center mt-10">
                <p className="text-gray-400 text-sm font-medium tracking-tight">
                  Showing <span className="text-gray-600 font-bold">{(currentPage - 1) * BLOGS_PER_PAGE + 1}</span> to{" "}
                  <span className="text-gray-600 font-bold">{Math.min(currentPage * BLOGS_PER_PAGE, totalBlogs)}</span> of{" "}
                  <span className="text-emerald-500 font-extrabold">{totalBlogs}</span> insightful articles
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Blog;
