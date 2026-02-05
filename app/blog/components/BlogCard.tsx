"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Blog } from "@/redux/service/blogApi";

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

interface BlogCardProps {
  blogs: Blog[];
  showAnimation?: boolean;
  gridCols?: "1" | "2" | "3";
  maxBlogs?: number;
}

const BlogCard: React.FC<BlogCardProps> = ({ 
  blogs, 
  showAnimation = true,
  gridCols = "2",
  maxBlogs
}) => {
  // Limit blogs if maxBlogs is provided
  const displayedBlogs = maxBlogs ? blogs.slice(0, maxBlogs) : blogs;

  // Grid column classes
  const gridColsClass = {
    "1": "grid-cols-1",
    "2": "grid-cols-1 lg:grid-cols-2",
    "3": "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  }[gridCols];

  return (
    <div className={`grid ${gridColsClass} gap-16 md:gap-x-12 md:gap-y-24`}>
      {displayedBlogs.length > 0 ? (
        displayedBlogs.map((blog, index) => (
          <Link key={blog.id} href={`/blog/${blog.id}`}>
            <motion.div
              custom={index}
              initial={showAnimation ? "hidden" : undefined}
              animate={showAnimation ? "visible" : undefined}
              exit={showAnimation ? "exit" : undefined}
              variants={showAnimation ? fadeUp : undefined}
              whileTap={{ scale: 0.98 }}
              className="relative group cursor-pointer"
            >
              {/* IMAGE */}
              <div className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl shadow-xl border border-gray-100/50">
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
                  group-hover:bg-gradient-to-tr
                  group-hover:from-emerald-500
                  group-hover:to-lime-400
                  border border-gray-50
                "
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[10px] md:text-xs font-bold text-emerald-500 group-hover:text-white/90 uppercase tracking-widest bg-emerald-50 group-hover:bg-white/10 px-2 py-0.5 rounded-md transition-colors">
                    {blog.createdAt 
                      ? new Date(blog.createdAt).toLocaleDateString('en-GB', { 
                          day: '2-digit', 
                          month: 'short', 
                          year: 'numeric' 
                        }) 
                      : 'Recent'}
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
    </div>
  );
};

export default BlogCard;
