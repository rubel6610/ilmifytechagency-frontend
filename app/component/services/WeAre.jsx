"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

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
  return (
    <div className="container mx-auto my-28  px-4 md:px-12 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      {/* Left Content */}
      <div>
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-semibold leading-tight text-center md:text-left">
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

        <div className="flex space-x-2 py-10 items-center justify-center md:justify-start">
          <div className="border-3 rounded-2xl border-green-500 w-3"></div>
          <div className="border-3 rounded-2xl border-green-500 w-10"></div>
        </div>

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
          className="relative w-full h-[220px] md:h-[500px] rounded-lg overflow-hidden order-1 md:order-2 "
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
