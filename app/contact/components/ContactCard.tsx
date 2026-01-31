"use client";

import React from "react";
import { motion } from "framer-motion";
import { VscLocation } from "react-icons/vsc";
import { TfiMobile } from "react-icons/tfi";
import { IoMdTime } from "react-icons/io";

const cards = [
  {
    title: "ADDRESS",
    icon: VscLocation,
    paragraph: "17/1 Ahmed Sarker Road, Trishal, Mymensingh, Bangladesh",
    gradient: "from-emerald-400 to-lime-400",
    bgGradient: "from-emerald-50 to-cyan-50",
  },
  {
    title: "PHONE & EMAIL",
    icon: TfiMobile,
    paragraph: "+1 307 269 6920",
    paragraph2: "info@ilmifytech.com",
    gradient: "from-emerald-400 to-lime-400",
    bgGradient: "from-emerald-50 to-cyan-50",
  },
  {
    title: "WORKING HOURS",
    icon: IoMdTime,
    paragraph: "Monday - Friday 09.00 - 23.00",
    paragraph2: "Sunday 09.00 - 16.00",
    gradient: "from-emerald-400 to-lime-400",
    bgGradient: "from-emerald-50 to-cyan-50",
  },
];

// Parent container animation (stagger)
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Individual card animation (right → left)
const cardVariants = {
  hidden: {
    opacity: 0,
    x: 300,
    scale: 1,
  },
  show: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 1.4,
      ease: "easeInOut" as const,
    },
  },
};

// Icon animation
const iconVariants = {
  hidden: { scale: 0, rotate: -180 },
  show: {
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring" as const,
      stiffness: 200,
      damping: 15,
      delay: 0.2,
    },
  },
};

const ContactCard = () => {
  return (
    <div className="px-4 py-16 bg-linear-to-br from-gray-50 via-white to-gray-100 flex items-center">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-400 mx-auto w-full relative z-10 "
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        {cards.map((card, index) => {
          const Icon = card.icon;

          return (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{
                y: -10,
                transition: { duration: 0.3 },
              }}
              className="group relative h-full"
            >
              {/* Card glow effect on hover */}
              <div
                className={`absolute -inset-1 bg-linear-to-r ${card.gradient} rounded-3xl blur-sm opacity-0 group-hover:opacity-15 transition-opacity duration-500 h-full`}
              />

              <div
                className={`
                  relative
                  bg-white
                  backdrop-blur-md
                  rounded-3xl
                  border border-gray-100
                  shadow-xl
                  hover:shadow-lg
                  flex flex-col
                  items-center
                  text-center
                  p-6 sm:p-8 md:p-10
                  h-full lg:h-82
                  transition-all duration-500
                  overflow-hidden
                `}
              >
                {/* Decorative corner gradient */}
                <div
                  className={`absolute -top-20 -right-20 w-40 h-40 bg-linear-to-br ${card.bgGradient} rounded-full opacity-60 group-hover:scale-150 transition-transform duration-700`}
                />

                {/* Icon container with gradient background */}
                <motion.div
                  variants={iconVariants}
                  className={`
                    relative z-10
                    w-11 h-11 sm:w-18 sm:h-18 md:w-18 md:h-18
                    bg-linear-to-br ${card.gradient}
                    rounded-2xl
                    flex items-center justify-center
                    shadow-lg
                    mb-4 sm:mb-5 md:mb-6
                    group-hover:scale-110
                    transition-all duration-300
                    shrink-0
                  `}
                >
                  <Icon className="text-white text-3xl sm:text-4xl md:text-[48px]" />

                  {/* Floating ring effect */}
                  <div
                    className={`absolute inset-0 rounded-2xl border-2 border-white/30 scale-110 opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500`}
                  />
                </motion.div>

                {/* Title with gradient text */}
                <h2
                  className={`
                    relative z-10
                    text-lg sm:text-xl font-bold
                    bg-linear-to-r ${card.gradient}
                    bg-clip-text text-transparent
                    mb-3 sm:mb-4
                    tracking-wide
                    shrink-0
                  `}
                >
                  {card.title}
                </h2>

                {/* Divider line */}
                <div
                  className={`w-12 sm:w-16 h-1 bg-linear-to-r ${card.gradient} rounded-full mb-3 lg:-mt-2 sm:mb-4 group-hover:w-20 sm:group-hover:w-20 transition-all duration-300 shrink-0`}
                />

                {/* Content - This will grow to fill remaining space */}
                <div className="relative z-10 space-y-1 sm:space-y-2 grow flex flex-col justify-center">
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                    {card.paragraph}
                  </p>
                  {card.paragraph2 && (
                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                      {card.paragraph2}
                    </p>
                  )}
                </div>

                {/* Spacer for bottom dots */}
                <div className="h-8 shrink-0" />

                {/* Bottom decorative dots */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span
                    className={`w-2 h-2 rounded-full bg-linear-to-r ${card.gradient}`}
                  />
                  <span
                    className={`w-2 h-2 rounded-full bg-linear-to-r ${card.gradient} opacity-60`}
                  />
                  <span
                    className={`w-2 h-2 rounded-full bg-linear-to-r ${card.gradient} opacity-30`}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default ContactCard;