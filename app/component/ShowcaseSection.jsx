"use client";
import React from "react";
import CustomBorder from "./customBorder/CustomBorder";
import Cards from "../showcase/component/Cards";
import { motion } from "motion/react";

const ShowcaseSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };
  return (
    <div className="max-w-400 mx-auto py-10 md:py-20 xl:py-30">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 gap-5 md:pb-34 pb-4 px-5 md:px-8.75"
      >
        <div className="flex flex-col gap-10">
          <motion.h1
            variants={fadeInRight}
            className="font-semibold text-4xl md:text-5xl mb-10 md:mb-0  tracking-wide leading-10 md:leading-14 "
          >
            Our recent <span className="text-primary">web designs</span> &{" "}
            <br /> some examples of <br /> past{" "}
            <span className="text-primary">projects</span>{" "}
          </motion.h1>
          <motion.div variants={fadeInRight}>
            <CustomBorder />
          </motion.div>
        </div>
        <div className="opacity-80 md:text-lg">
          <motion.p variants={fadeInRight}>
            At iLMiFY, we take pride in delivering modern, responsive, and
            user-friendly web designs that reflect the unique identity of each
            business. Our recent projects showcase our expertise in creating
            visually appealing websites that engage users and drive results.
          </motion.p>
          <br />
          <motion.p variants={fadeInRight}>
            From e-commerce platforms to corporate websites, our portfolio
            highlights a diverse range of successful projects. Each one
            demonstrates our commitment to innovation, functionality, and client
            satisfaction. Explore our work and see how we’ve helped businesses
            grow and succeed online.
          </motion.p>
        </div>
      </motion.div>

      {/* card */}
      <div className="px-5 md:px-8.75">
        <Cards />
      </div>

      <div className="flex justify-center mt-10">
        <motion.button
        variants={fadeInRight}
        className="mt-4 px-8 py-3 bg-linear-to-r from-[#8FE481] to-[#00D9A5] text-white font-bold rounded-full shadow-[0_10px_20px_rgba(0,217,165,0.3)] transition-transform text-xs uppercase tracking-widest duration-500 ease-in-out hover:bg-[#181818] hover:bg-none"
      >
        View All
      </motion.button>
      </div>
    </div>
  );
};

export default ShowcaseSection;
