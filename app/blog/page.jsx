"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import PageWrapper from "../component/PageWrapper";
import { blogs } from "./blogsData";
/* Fade up animation */
const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const Blog = () => {
 

  return (
    <PageWrapper>
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="my-30"
      >
        {/* HEADER */}
        <h1 className="text-center font-bold bg-[#F9F9F9] text-[32px] sm:text-[43px] text-[#00D9A6] py-10 ">
          Blog
        </h1>

        {/* BLOG GRID */}
        <div className="bg-background py-16">
          <div className="max-w-345 mx-auto px-4 md:px-10 lg:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {blogs.map((blog, index) => (
                <Link key={index} href={`/blog/${blog.id}`}>
                  <motion.div
                    key={index}
                    variants={fadeUp}
                    // whileTap causes the "active" state to trigger on mobile touch
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
    
    /* Desktop Hover & Mobile Tap Effects */
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
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </motion.section>
    </PageWrapper>
  );
};

export default Blog;
