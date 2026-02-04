"use client";

import Image from "next/image";
import React from "react";
import CustomBorder from "./customBorder/CustomBorder";
import Link from "next/link";
import { motion } from "framer-motion";
import { useGetBlogsQuery } from "@/redux/service/blogApi";
import { CgSpinner } from "react-icons/cg";

const MotionLink = motion(Link);

const BlogPostSection = () => {
  // Fetch latest 3 blogs from API
  const { data: blogResponse, isLoading } = useGetBlogsQuery({
    page: 1,
    limit: 3,
  });

  const blogs = blogResponse?.data?.blogs || [];

  return (
    <div>
      <div className="bg-background py-16">
        <div className="max-w-400 mx-auto px-5 sm:px-6 lg:px-8">
          <h1 className="text-center text-4xl md:text-5xl font-bold">
            Latest News & Our <span className="text-[#00D9A6]">Blog</span>
          </h1>
          <div className="flex justify-center mt-7">
            <CustomBorder />
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <CgSpinner className="animate-spin text-5xl text-emerald-500" />
              <p className="text-gray-400 font-medium tracking-wide">Fetching latest insights...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-12 my-6">
              {blogs.length > 0 ? (
                blogs.map((blog, index) => (
                  <Link
                    href={`/blog/${blog.id}`}
                    key={blog.id}
                    className="relative group rounded-2xl overflow-visible my-10"
                  >
                    {/* IMAGE */}
                    <div className="relative w-full aspect-4/3 rounded-xl overflow-hidden shadow-2xl border border-gray-100">
                      <Image
                        src={blog.images?.[0] || "/placeholder-blog.png"}
                        alt={blog.title}
                        fill
                        className="
                          object-cover
                          transition-transform duration-700
                          ease-[cubic-bezier(0.16,1,0.3,1)]
                          scale-100
                          group-hover:scale-105"
                      />
                    </div>

                    {/* CARD */}
                    <div className="
                      absolute left-4 right-4 sm:left-6 sm:right-6
                      -bottom-10
                      bg-white
                      p-6 sm:p-8
                      rounded-xl
                      shadow-[0_15px_35px_rgba(0,0,0,0.06)]
                      border border-gray-50
                      transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]
                      group-hover:translate-y-5
                      group-hover:bg-linear-to-tr
                      group-hover:from-emerald-500
                      group-hover:to-lime-400
                      group-hover:shadow-[0_20px_40px_rgba(16,185,129,0.2)]
                    ">
                      <div className="flex flex-col mb-2">
                        <p className="text-[10px] sm:text-xs text-gray-400 group-hover:text-white/80 font-bold uppercase tracking-widest transition-colors mb-1">
                          {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Recent'}
                        </p>
                        <p className="text-[10px] sm:text-xs text-emerald-500 group-hover:text-white font-bold uppercase tracking-widest transition-colors">
                          By {blog.admin?.name || 'Admin'}
                        </p>
                      </div>

                      <h2 className="flex items-center gap-3 text-lg sm:text-xl font-bold mt-2 transition-colors duration-300 text-gray-800 group-hover:text-white line-clamp-2 leading-snug">
                        <span className="
                          w-2.5 h-2.5 shrink-0 rounded-full bg-[#00D9A6]
                          transition-all duration-700
                          group-hover:bg-white group-hover:scale-110
                        " />
                        {blog.title}
                      </h2>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="col-span-full text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                  <p className="text-gray-400 text-lg font-medium">No blog posts available.</p>
                </div>
              )}
            </div>
          )}

          {/* Romantic button */}
          <div className="flex justify-center">
            <MotionLink
              href="/blog"
              className="
                font-bold
                relative
                overflow-hidden
                bg-linear-to-r
                from-[#0ddaa0]
                to-[#8ce064]
                text-white
                mt-12
                px-10
                py-4
                rounded-full
                text-sm
                tracking-widest
                shadow-[0px_10px_25px_rgba(16,185,129,0.3)]
                transition-shadow duration-300
                hover:shadow-none
                inline-block
              "
              initial="rest"
              whileHover="hover"
              animate="rest"
            >
              {/* Hover Gradient */}
              <motion.span
                variants={{
                  rest: { scale: 0 },
                  hover: { scale: 1 },
                }}
                transition={{ duration: 0.25, ease: "easeOut" as const }}
                className="
                  absolute
                  inset-0
                  bg-linear-to-r
                  from-[#3D3D3D]
                  to-[#151515]
                  text-white
                  rounded-full
                  z-0
                "
                style={{ originX: 0.5, originY: 0.5 }}
              />

              <span className="relative z-10 flex items-center gap-2">
                EXPLORE ALL INSIGHTS
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </MotionLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostSection;
