"use client";

import Image from "next/image";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { blogsData, BlogPost } from "./components/blogsData";

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

  // Calculate pagination values
  const totalPages = Math.ceil(blogsData.length / BLOGS_PER_PAGE);
  const startIndex = (currentPage - 1) * BLOGS_PER_PAGE;
  const endIndex = startIndex + BLOGS_PER_PAGE;
  const currentBlogs = blogsData.slice(startIndex, endIndex);

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
      <h1 className="text-center font-bold bg-[#F9F9F9] text-[32px] sm:text-[43px] text-[#00D9A6] py-10">
        Blog
      </h1>

      {/* BLOG GRID */}
      <div className="bg-background py-16">
        <div className="max-w-345 mx-auto px-4 md:px-10 lg:px-6">
          {/* AnimatePresence for smooth page transitions */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage} // Important: forces re-render on page change
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-16"
            >
              {currentBlogs.length > 0 ? (
                currentBlogs.map((blog, index) => (
                  <Link key={blog.id} href={`/blog/${blog.id}`}>
                    <motion.div
                      custom={index}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={fadeUp}
                      whileTap={{ scale: 0.98 }}
                      className="relative group my-10 cursor-pointer"
                    >
                      {/* IMAGE */}
                      <div className="relative w-full aspect-4/3 overflow-hidden rounded-lg shadow-2xl">
                        <Image
                          src={blog.image}
                          alt={blog.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 50vw"
                          className="
                            object-cover
                            transition-transform duration-700
                            ease-[cubic-bezier(0.16,1,0.3,1)]
                            group-hover:scale-105
                            group-active:scale-105
                          "
                        />
                      </div>

                      {/* CARD */}
                      <div
                        className="
                          absolute left-4 right-4 md:left-8 md:right-8
                          -bottom-12
                          bg-white
                          px-8 py-9 md:px-11 md:py-11.75
                          rounded-md
                          shadow-xl
                          transition-all duration-700 ease-out
                          group-hover:translate-y-6
                          group-active:translate-y-6
                          group-hover:bg-linear-to-tr
                          group-active:bg-linear-to-tr
                          group-hover:from-[#0ddaa0]
                          group-hover:to-[#8ce064]
                          group-active:from-[#0ddaa0]
                          group-active:to-[#8ce064]
                        "
                      >
                        <div className="md:flex lg:flex ml-6">
                          <p className="text-xs md:text-sm text-gray-500 group-hover:text-white group-active:text-white">
                            {blog.date} ● by
                          </p>
                          <p className="text-xs lg:ml-2 md:text-sm text-gray-500 group-hover:text-white group-active:text-white">
                            {blog.author}
                          </p>
                        </div>
                          
                        <h2 className="flex items-center gap-3 text-lg md:text-xl font-semibold mt-3 group-hover:text-white group-active:text-white">
                          <span className="w-3 h-3 rounded-full bg-[#00D9A6] group-hover:bg-white group-active:bg-white" />
                          {blog.title}
                        </h2>
                        <div>
                            <p className="justify-end flex -mr-5 -mt-18 pb-12 md:pb-7 md:-mt-10 items-center gap-0.5 ml-6 md:ml-2 text-[10px] md:text-sm  text-gray-500 group-hover:text-white group-active:text-white"> 
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                            <span>{blog.views || "1.2k"} </span>
                          </p>
                        </div>
                      </div>
                      
                    </motion.div>
                  </Link>
                ))
              ) : (
                <div className="col-span-2 text-center py-20">
                  <p className="text-gray-500 text-lg">
                    No blogs found on this page.
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
              className="flex justify-center items-center gap-2 mt-24"
            >
              {/* Previous Button */}
              <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className={`
                  flex items-center justify-center
                  w-10 h-10 md:w-12 md:h-12
                  rounded-full
                  border-2 border-[#00D9A6]
                  transition-all duration-300
                  ${
                    currentPage === 1
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-[#00D9A6] hover:text-white cursor-pointer"
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
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              {/* Page Numbers */}
              <div className="flex items-center gap-1 md:gap-2">
                {getPageNumbers().map((page, index) => (
                  <React.Fragment key={index}>
                    {page === "..." ? (
                      <span className="px-2 text-gray-400">...</span>
                    ) : (
                      <button
                        onClick={() => handlePageChange(page as number)}
                        className={`
                          w-10 h-10 md:w-12 md:h-12
                          rounded-full
                          font-semibold
                          transition-all duration-300
                          cursor-pointer
                          ${
                            currentPage === page
                              ? "bg-linear-to-tr from-[#0ddaa0] to-[#8ce064] text-white shadow-lg"
                              : "border-2 border-gray-200 hover:border-[#00D9A6] hover:text-[#00D9A6]"
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
                  border-2 border-[#00D9A6]
                  transition-all duration-300
                  ${
                    currentPage === totalPages
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-[#00D9A6] hover:text-white cursor-pointer"
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
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </motion.div>
          )}
          {/* Blog count info */}
          <div className="text-center mt-8">
            <p className="text-gray-500">
              Showing {startIndex + 1}-{Math.min(endIndex, blogsData.length)} of{" "}
              {blogsData.length} articles
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;