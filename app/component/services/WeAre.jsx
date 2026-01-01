"use client";
import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import CustomBorder from "../customBorder/CustomBorder";

export default function WeAre() {
  const typingVariant = {
    hidden: { width: 0 },
    visible: (duration) => ({
      width: "100%",
      transition: {
        duration,
        ease: "linear",
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

  return (
    <div className="container mx-auto my-28  px-4 md:px-12 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      {/* Left Content */}
      <div>
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-semibold leading-tight text-center lg:text-left">
          {/* Line 1 */}
          <motion.span
            className="block text-gray-800 overflow-hidden whitespace-nowrap"
            variants={typingVariant}
            initial="hidden"
            animate="visible"
            custom={1.6}
          >
            Who We Are &
          </motion.span>

          {/* Line 2 */}
          <motion.span
            className="block overflow-hidden whitespace-nowrap"
            variants={typingVariant}
            initial="hidden"
            animate="visible"
            custom={2}
          >
            <span className="text-gray-800">What </span>
            <span className="text-green-500">We Do</span>
          </motion.span>
        </h1>

        <motion.div
        className="flex justify-center lg:justify-start mt-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
        variants={fadeInRight}
      >
        <CustomBorder />
      </motion.div>

        <div className="text-justify">
          <motion.p
            className="text-gray-600 md:leading-relaxed items-start px-8 md:px-0"
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            At iLMiFY, we are a passionate team of designers, developers, and
            digital strategists committed to transforming businesses through
            innovative digital solutions. Our expertise spans web development,
            mobile app creation, branding, and digital marketing. We pride
            ourselves on building strong relationships with our clients,
            understanding their goals, and delivering results-driven experiences
            that drive success and growth.
          </motion.p>

          <br />
          <motion.p
            className="text-gray-600 md:leading-relaxed px-8 md:px-0"
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            We help businesses navigate the digital landscape by offering
            comprehensive services designed to elevate their online presence.
            From creating visually stunning websites and mobile applications to
            developing powerful branding strategies and executing digital
            marketing campaigns, we provide everything you need to stand out in
            today’s competitive market. At iLMiFY, we are dedicated to turning
            your ideas into impactful digital experiences that engage your
            audience and drive business success.
          </motion.p>
        </div>
      </div>

      {/* Right Image */}
      <div>
        <motion.div
          className="relative w-full h-55 md:h-125 rounded-lg overflow-hidden order-1 md:order-2 "
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{
            duration: 1.2,
            ease: "easeInOut",
          }}
        >
          <Image
            src="/outside.jpg"
            alt="Team discussion"
            fill
            className="object-cover  px-8 md:px-0 "
            priority
          />
        </motion.div>
      </div>
    </div>
  );
}
