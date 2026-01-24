'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function TeamGridCard({ member, index }) {
  const [isHovered, setIsHovered] = useState(false);

  // Staggered animation for grid items
  const containerVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: (index % 4) * 0.08,
        duration: 0.6,
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  // Avatar scale animation
  const avatarVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.15, rotate: 5 },
  };

  // Content reveal animation
  const contentVariants = {
    rest: { opacity: 0, y: 10 },
    hover: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.05,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group h-full"
    >
      <motion.div
        animate={{
          background: isHovered ? 'rgba(255, 255, 255, 0.98)' : 'rgba(255, 255, 255, 0.9)',
          boxShadow: isHovered
            ? '0 20px 40px rgba(13, 218, 160, 0.15)'
            : '0 10px 20px rgba(0, 0, 0, 0.08)',
        }}
        transition={{ duration: 0.3 }}
        className="relative rounded-xl border-2 border-white hover:border-[#0ddaa0] p-4 h-full flex flex-col items-center transition-all duration-300 overflow-hidden"
      >
        {/* Animated Background Gradient Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[#0ddaa0]/5 to-[#8ce064]/5 rounded-xl"
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          style={{ pointerEvents: 'none' }}
        />

        {/* Glow Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-[#0ddaa0]/20 to-[#8ce064]/20 blur-3xl rounded-full"
          animate={{
            opacity: isHovered ? 0.6 : 0,
            scale: isHovered ? 1.2 : 0.8,
          }}
          transition={{ duration: 0.4 }}
          style={{ pointerEvents: 'none', top: '-50%', left: '-50%' }}
        />

        {/* Content Container */}
        <div className="relative z-10 w-full flex flex-col items-center">
          {/* Avatar Container with Logo Background */}
          <motion.div
            variants={avatarVariants}
            initial="rest"
            animate={isHovered ? 'hover' : 'rest'}
            className="mb-4 relative"
          >
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-3 border-gradient-to-r from-[#0ddaa0] to-[#8ce064] shadow-lg">
              {/* Logo Background Layer */}
              <div className="absolute inset-0 rounded-full overflow-hidden bg-slate-900/80">
                <motion.img
                  src="/assets/ilmify_logo.jpg"
                  alt="Logo Background"
                  className="w-full h-full object-cover rounded-full"
                  animate={{
                    opacity: isHovered ? 0.4 : 0.1,
                    scale: isHovered ? 1.2 : 1,
                  }}
                  transition={{ duration: 0.4 }}
                />
              </div>

              {/* Avatar Image Layer */}
              {member.avatar ? (
                <div className="absolute inset-0 w-full h-full relative overflow-hidden rounded-full">
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    fill
                    className="object-cover w-full h-full rounded-full"
                    sizes="96px"
                    priority={index < 4}
                  />
                </div>
              ) : (
                <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#0ddaa0] to-[#8ce064] flex items-center justify-center rounded-full">
                  <span className="text-lg font-bold text-white">
                    {member.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Name */}
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: (index % 4) * 0.08 + 0.2 }}
            viewport={{ once: true }}
            className="text-center font-bold text-slate-900 text-sm leading-tight mb-1"
          >
            {member.name}
          </motion.h3>

          {/* Position */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: (index % 4) * 0.08 + 0.25 }}
            viewport={{ once: true }}
            animate={{
              color: isHovered ? '#0ddaa0' : '#0284c7',
            }}
            className="text-center text-xs font-semibold mb-2"
          >
            {member.position}
          </motion.p>

          {/* Department Badge */}
          {member.department && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: (index % 4) * 0.08 + 0.3 }}
              viewport={{ once: true }}
              className="mb-2"
            >
              <span className="text-xs font-semibold px-3 py-1 bg-gradient-to-r from-[#0ddaa0]/10 to-[#8ce064]/10 border border-[#0ddaa0]/30 text-[#0ddaa0] rounded-full">
                {member.department}
              </span>
            </motion.div>
          )}

          {/* Description - Shows on Hover */}
          <motion.div
            variants={contentVariants}
            initial="rest"
            animate={isHovered ? 'hover' : 'rest'}
            className="text-center mb-3 min-h-12 flex items-center"
          >
            <p className="text-xs text-slate-900 leading-relaxed">
              {member.description}
            </p>
          </motion.div>

          {/* Experience */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: (index % 4) * 0.08 + 0.35 }}
            viewport={{ once: true }}
            className="w-full pt-3 border-t border-slate-200 text-center"
          >
            <p className="text-xs text-slate-500 mb-1">Experience</p>
            <p className="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#0ddaa0] to-[#8ce064]">
              {member.experience}
            </p>
          </motion.div>
        </div>

        {/* Hover Border Glow */}
        <motion.div
          className="absolute inset-0 rounded-xl border-2 border-transparent bg-gradient-to-r from-[#0ddaa0]/30 to-[#8ce064]/30 opacity-0 pointer-events-none"
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
}