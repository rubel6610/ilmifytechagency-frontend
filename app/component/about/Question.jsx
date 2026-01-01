"use client"; // required for Framer Motion

import { motion } from "motion/react";
import Link from "next/link";
const MotionLink = motion(Link);

export default function Question() {
  const slideUpVariants = {
    hidden: { y: 50, opacity: 0 }, // start 50px below and invisible
    visible: {
      y: 0, // final position
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }, // smooth animation
    },
  };
  return (
    <div className="mt-16 relative w-full">
      <div
        className="relative bg-cover bg-center py-44 flex flex-col items-center justify-center text-center"
        style={{ backgroundImage: "url('/contact-bg.png')" }}
      >
        {/* Overlay (behind content) */}
        <div className="absolute inset-0 bg-[#585858]/60 z-0"></div>

        {/* Content (above overlay) */}
        <div className="relative z-10">
        

          <motion.h2
            className="text-2xl md:text-4xl lg:text-5xl font-semibold text-white text-center px-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }} // animate once when 60% visible
            variants={slideUpVariants}
          >
            PLEASE SEND US YOUR{" "}
            <span className="text-green-500">QUESTIONS</span> AND
            <br />
            <br />
            WE CAN <span className="text-green-500">HELP</span> YOU BETTER
          </motion.h2>

          {/* Framer Motion Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-block mt-16"
          >
            <MotionLink
              href="/contact"
              className="
            relative
            overflow-hidden
          bg-linear-to-r
              from-[#0ddaa0]
              to-[#8ce064]
              text-white
            px-8
            py-4
            rounded-full
            text-sm
            tracking-wide
            shadow-xl
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

              <span className="relative z-10">CONTACT US</span>
            </MotionLink>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
