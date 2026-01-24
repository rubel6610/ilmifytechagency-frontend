"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function TeamMemberCard({ member, index, isVisible }) {
  const [isHovered, setIsHovered] = useState(false);
  const isEvenIndex = index % 2 === 0;

  // Card comes from left if even, right if odd
  const cardVariants = {
    hidden: {
      opacity: 0,
      x: isEvenIndex ? -150 : 150,
      y: 50,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.8,
        type: "spring",
        stiffness: 100,
      },
    },
    exit: {
      opacity: 0,
      x: isEvenIndex ? -150 : 150,
      y: 50,
      transition: {
        duration: 0.6,
      },
    },
  };

  // Avatar animation
  const avatarVariants = {
    hidden: { scale: 0, rotate: -180, opacity: 0 },
    visible: {
      scale: 1,
      rotate: 0,
      opacity: 1,
      transition: {
        delay: 0.3,
        duration: 0.6,
        type: "spring",
        stiffness: 120,
      },
    },
    exit: {
      scale: 0,
      rotate: -180,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  // Content animation
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.4 + i * 0.1,
        duration: 0.5,
      },
    }),
    exit: {
      opacity: 0,
      y: 20,
      transition: {
        delay: 0,
        duration: 0.3,
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "exit"}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative w-full flex items-center justify-center mb-24 ${
        isEvenIndex ? "flex-row" : "flex-row-reverse"
      }`}
    >
      {/* Card Container */}
      <div className="w-full md:w-1/2 px-4">
        <div className="relative group h-full">
          {/* Glow Effect on Hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-[#0ddaa0] to-[#8ce064] rounded-xl blur-2xl -z-10"
            animate={{
              opacity: isHovered ? 0.6 : 0,
              scale: isHovered ? 1.05 : 0.95,
            }}
            transition={{ duration: 0.3 }}
          />

          {/* Card Content */}
          <motion.div
            className="relative backdrop-blur-md p-8 rounded-xl border-2 transition-all duration-300 "
            animate={{
              backgroundColor: isHovered
                ? "rgba(255,255,255,0.95)"
                : "rgba(255,255,255,0.85)",
              borderColor: isHovered ? "#0ddaa0" : "#e5e7eb",
              boxShadow: isHovered
                ? "0 20px 40px rgba(0,0,0,0.08)"
                : "0 10px 20px rgba(0,0,0,0.05)",
            }}
          >
            {/* Name & Position */}
            <motion.div
              variants={contentVariants}
              initial="hidden"
              animate={isVisible ? "visible" : "exit"}
              custom={0}
            >
              <h3 className="text-2xl font-bold text-slate-900 mb-1">
                {member.name}
              </h3>
              <motion.p
                animate={{ color: isHovered ? "#0ddaa0" : "#0284c7" }}
                className="text-sm font-semibold mb-4"
              >
                {member.position}
              </motion.p>
            </motion.div>

            {/* Description */}
            <motion.p className="text-slate-600 text-sm mb-4 leading-relaxed">
              {member.description}
            </motion.p>

         
            {/* Experience Badge */}
            <motion.div
              variants={contentVariants}
              initial="hidden"
              animate={isVisible ? "visible" : "exit"}
              custom={3}
              className="pt-4 border-t border-slate-700"
            >
              <p className="text-xs text-slate-500">Experience</p>
              <p className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#0ddaa0] to-[#8ce064]">
                {member.experience}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Center Line and Avatar */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center relative md:px-4 py-8">
   
        {/* Avatar with Circle Pulse */}
        <motion.div
          variants={avatarVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "exit"}
          className="relative z-10"
        >
          {/* Outer Pulse Circle */}
          <motion.div
            className="absolute  inset-5 rounded-full bg-gradient-to-r from-[#0ddaa0] to-[#8ce064]"
            initial={{ scale: 0, opacity: 0 }}
            animate={
              isHovered
                ? { scale: 1.5, opacity: 0.5 }
                : { scale: 1.5, opacity: 0.1 }
            }
            transition={{
              duration: 3,
              repeat: isHovered ? 0 : Infinity,
              repeatType: "loop",
            }}
            style={{ width: "200px", height: "200px" }}
          />

          {/* Avatar Circle */}
          <div className="relative w-60 h-60 rounded-full bg-gradient-to-br from-[#0ddaa0] to-[#8ce064] p-1 overflow-hidden shadow-2xl">
            {/* Logo Background */}
            <div className="absolute inset-1 rounded-full bg-slate-900/80 overflow-hidden">
              <motion.img
                src="/assets/ilmify_logo.jpg"
                alt="Logo Background"
                className="w-full h-full object-cover rounded-full"
                animate={{
                  filter: isHovered ? "grayscale(0%)" : "grayscale(100%)",
                opacity: isHovered ? 0.25 : 0.1,
                  scale: isHovered ? 1.1 : 1,
                }}
                transition={{ duration: 0.4 }}
              />
            </div>

            {/* Avatar Image */}
            {member.avatar ? (
              <div className="absolute inset-1 rounded-full overflow-hidden ">
                <Image
                height={100}
                width={100}
                  src={member.avatar}
                  alt={member.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            ) : (
              <div className="absolute inset-1 rounded-full bg-gradient-to-br from-[#0ddaa0] to-[#8ce064] flex items-center justify-center text-3xl font-bold text-white">
                {member.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
