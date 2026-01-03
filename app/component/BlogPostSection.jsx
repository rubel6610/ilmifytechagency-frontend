"use client";
import Image from "next/image";
import React from "react";
import CustomBorder from "./customBorder/CustomBorder";
import Link from "next/link";
import { motion } from "motion/react";
import { blogs as blogsData } from "../blog/blogsData";
const MotionLink = motion(Link);
const BlogPostSection = () => {
const blogs = blogsData.slice(0, 3); // Get the first 3 blog posts

  return (
    <div>
      <div className="bg-background py-16">
        <div className="max-w-400 mx-auto px-5 sm:px-6 lg:px-8">
          <h1 className="text-center text-4xl md:text-5xl font-bold">
            Latest News & Our <span className="text-[#00D9A6]">Blog</span>
          </h1>
          <div className="flex justify-center mt-7">
            <CustomBorder></CustomBorder>
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-12  my-6">
            {blogs.map((blog, index) => (
              <Link
                href={`/blog/${blog.id}`}
                key={index}
                className="relative group rounded-2xl overflow-visible my-10"
              >
                {/* IMAGE */}
                <div className="relative w-full aspect-4/3 rounded-lg overflow-hidden shadow-2xl ">
                  <Image
                    src={blog.image}
                    alt="Business woman"
                    width={675}
                    height={506}
                    className="rounded-md shadow-2xl  w-full mx-auto h-62.75 md:w-136.5 md:h-101.75 lg:w-full lg:h-auto
       transition-transform duration-700
       ease-[cubic-bezier(0.16,1,0.3,1)]
       scale-100
       group-hover:scale-102
 "
                  />
                </div>

                {/* CARD */}
                <div
                  className="
                     absolute left-4 right-4 sm:left-6 sm:right-6
                     -bottom-10
                     bg-white
                     p-6 sm:p-8
                    rounded-md
                     shadow-xl
                     transition-all duration-700 ease-out
                    group-hover:translate-y-5
                     group-hover:bg-linear-to-tr
                     group-hover:from-[#0ddaa0]
                     group-hover:to-[#8ce064]
                   "
                >
                  <div className="ml-2 md:ml-0">
                    <p className="text-xs sm:text-sm ml-4 sm:ml-6 text-gray-500 transition-colors duration-300 group-hover:text-white font-ubuntu">
                      {blog.date} by
                    </p>
                    <p className="text-xs sm:text-sm ml-4 sm:ml-6 text-gray-500 transition-colors duration-300 group-hover:text-white font-ubuntu">
                      {blog.author}
                    </p>
                  </div>

                  <h2 className="flex items-center gap-3 text-lg sm:text-xl font-semibold mt-2 transition-colors duration-300 group-hover:text-white">
                    <span
                      className="
                         w-3 h-3 rounded-full bg-[#00D9A6]
                         transition-colors duration-700
                         group-hover:bg-white
                       "
                    />
                    {blog.title}
                  </h2>
                </div>
              </Link>
            ))}
          </div>
          {/* romantic button */}
          <div className="flex justify-center">
            <MotionLink
              href="/blog"
              className=" font-bold
             relative
             overflow-hidden
           bg-linear-to-r
               from-[#0ddaa0]
               to-[#8ce064]
               text-white
               mt-12
             px-8
             py-4
             rounded-full
             text-sm
             tracking-wide
             shadow-[0px_0px_20px_5px_rgba(16,185,129,0.4)]
                   hover:shadow-[0_0_0_0_rgba(0,0,0,0)]
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
                transition={{ duration: 0.17, ease: "easeOut" }}
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

              <span className="relative z-10">VIEW ALL POST</span>
            </MotionLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostSection;
