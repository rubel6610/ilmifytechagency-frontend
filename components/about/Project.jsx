"use client";
import { motion } from "framer-motion";

export default function Project() {
  // Variants for left-to-right animation
  const slideInVariants = {
    hidden: { x: -200, opacity: 0 }, // start 200px left and invisible
    visible: {
      x: 0, // final position
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div className="bg-[#FFFFFF] pt-10 max-w-400 mx-auto">
      <motion.div
        className="bg-[#373737] py-26 mx-10 mt-32 mb-16 rounded-3xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
        variants={slideInVariants}
      >
        <p className="text-gray-200 text-center">Are You Ready?</p>
        <h1 className="text-white text-center text-2xl md:text-4xl font-semibold">
          Start a New Project
        </h1>
      </motion.div>
    </div>
  );
}
