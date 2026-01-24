"use client";

import React from "react";
import { motion } from "framer-motion";
import { TbTargetArrow } from "react-icons/tb";
import { GiStairsGoal } from "react-icons/gi";
import { FaHandsHelping } from "react-icons/fa";
import { MdOutlineRocketLaunch } from "react-icons/md";

export default function Vision() {
  const cardVariants = {
    hidden: {
      opacity: 0,
      x: 80,
    },
    visible: (index) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 1.2,
        delay: index * 0.2,
        ease: "easeOut",
      },
    }),
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: 0.3,
      },
    },
  };

  const cards = [
    {
      title: "Our Mission",
      icon: TbTargetArrow,
      text: "At iLMiFY, our mission is to empower businesses by providing innovative digital solutions that drive growth and success. We are committed to delivering high-quality websites, mobile apps, branding, and digital marketing strategies tailored to meet the unique needs of each client. Our goal is to help businesses transform their ideas into impactful online experiences that connect with their audience and achieve measurable results.",
    },
    {
      title: "Our Vision",
      icon: GiStairsGoal,
      text: "Our vision is to become a global leader in digital transformation, shaping the future of businesses through cutting-edge technology and creative solutions. We aim to build long-lasting relationships with our clients by consistently delivering value, fostering innovation, and driving success. At iLMiFY, we strive to create a world where businesses, regardless of size, can leverage digital tools to reach their full potential.",
    },
    {
      title: "Our Values",
      icon: FaHandsHelping,
      text: "At iLMiFY, our core values are the driving force behind everything we do. We prioritize creativity, collaboration, and integrity in every project. We believe in creating meaningful relationships with our clients and delivering solutions that not only meet expectations but exceed them. With a focus on innovation, we ensure that each project is a reflection of our dedication to quality and a passion for making a difference in the digital world.",
    },
    {
      title: "Our Approach",
      icon: MdOutlineRocketLaunch,
      text: "Our approach is rooted in understanding. We take the time to listen to your unique needs and challenges, ensuring that we provide tailored solutions that align with your business objectives. Through a seamless blend of strategy, design, and technology, we bring your vision to life. Whether it's a website, mobile app, or digital marketing campaign, we adopt a results-driven mindset that ensures every initiative contributes to your business growth and success.",
    },
  ];

  return (
    <section
      className="relative bg-fixed bg-center bg-cover"
      style={{
        backgroundImage: "url('/office.png')",
      }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-tr from-[#00D9A6]/60 to-[#000000] to-99%" />

      {/* Decorative floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            y: [0, -20, 0],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 left-[10%] w-32 h-32 bg-white/10 rounded-full blur-2xl"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-32 right-[15%] w-40 h-40 bg-white/10 rounded-full blur-2xl"
        />
        <motion.div
          animate={{
            y: [0, 15, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 left-[5%] w-24 h-24 bg-black/5 rounded-full blur-xl"
        />
      </div>

      {/* Content */}
      <div className="relative max-w-400 mx-auto px-4 md:px-12 py-20 md:py-32 text-white">
        <div className="container mx-auto">
          {/* Header */}
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-semibold">
              Our Vision &{" "}
              <span className="text-emerald-500 relative">
                Mission
                <motion.span
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  viewport={{ once: true }}
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-emerald-400 rounded-full origin-left"
                />
              </span>
            </h2>
          </motion.div>

          {/* Decorative divider */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
            variants={fadeInRight}
            className="flex space-x-2 py-10 justify-center"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="border-3 rounded-2xl border-white w-3"
            />
            <div className="border-3 rounded-2xl border-white w-10" />
          </motion.div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mt-14">
            {cards.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={index}
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.4 }}
                  variants={cardVariants}
                  whileHover={{
                    y: -8,
                    transition: { duration: 0.3 },
                  }}
                  className="group relative h-full"
                >
                  {/* Card glow on hover */}
                  <div className="absolute -inset-1 bg-black/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div
                    className="
                      relative
                      h-full
                      bg-white/10
                      backdrop-blur-sm
                      border border-white/20
                      rounded-3xl
                      px-6 py-8
                      transition-all duration-500
                      group-hover:bg-white/20
                      group-hover:border-white/40
                      overflow-hidden
                      flex flex-col
                    "
                  >
                    {/* Decorative corner gradient */}
                    <div className="absolute -top-10 -right-10 w-24 h-24 bg-white/10 rounded-full group-hover:scale-150 transition-transform duration-700" />

                    {/* Icon */}
                    <motion.div
                      variants={iconVariants}
                      className="
                        relative z-10
                        w-16 h-16
                        mx-auto
                        bg-white/20
                        backdrop-blur-sm
                        border border-white/30
                        rounded-2xl
                        flex items-center justify-center
                        mb-5
                        group-hover:bg-white/30
                        group-hover:scale-110
                        transition-all duration-300
                      "
                    >
                      <Icon className="text-white text-3xl " />

                      {/* Ring effect on hover */}
                      <div className="absolute inset-0 rounded-2xl border-2 border-white/30 scale-100 opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500" />
                    </motion.div>

                    {/* Title */}
                    <h4 className="relative z-10 text-xl md:text-2xl text-center font-semibold mb-4">
                      {item.title}
                    </h4>

                    {/* Divider */}
                    <div className="w-12 h-0.5 bg-white/40 rounded-full mx-auto mb-5 group-hover:w-20 group-hover:bg-white/60 transition-all duration-300" />

                    {/* Text */}
                    <p className="relative z-10 text-sm md:text-base text-white/90 text-justify font-medium leading-relaxed grow">
                      {item.text}
                    </p>

                    {/* Bottom decorative line */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
