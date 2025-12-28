"use client"
import React from 'react';
import { motion } from "motion/react";

const DigitalFutures = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };
  return (
    <section 
      className="relative w-full h-[60vh] md:h-[80vh] flex items-center justify-center bg-fixed bg-cover bg-center bg-no-repeat overflow-hidden "
      style={{
        backgroundImage: `url('https://i.ibb.co.com/JwcDnrt1/46830.jpg')`,
      }}
    >
      {/* 1. Static Blur & Green Overlay Layer */}
      <div className="absolute inset-0 bg-linear-to-r from-[#059669]/80 via-[#10b981]/70 to-[#34d399]/80 z-0"></div>
      
      {/* 2. Scrolling Text Container */}
      <div className="relative z-10 w-full h-1/3 flex items-center justify-center p-6">
        <motion.div
        initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
        className="max-w-4xl text-center text-white">
          <motion.h2 variants={fadeInUpVariants} className="text-3xl md:text-5xl font-bold mb-4 leading-tight drop-shadow-lg">
            Innovating Digital Futures
          </motion.h2>
          <motion.p variants={fadeInUpVariants} className="text-[24px] font-medium opacity-95 max-w-2xl mx-auto">
            At iLMIFY, we don’t just create websites and apps we build digital experiences 
            that inspire growth and success. From web development and mobile apps to 
            branding and marketing.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default DigitalFutures;