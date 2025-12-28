"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Vission() {
  const cardVariants = {
    hidden: {
      opacity: 0,
      x: 80, // from right
    },
    visible: (index) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 3,
        delay: index * 0.2, // stagger effect
        ease: "easeOut",
      },
    }),
  };

  return (
    <section
      className="relative bg-fixed bg-center bg-cover"
      style={{
        backgroundImage: "url('/office.png')",
      }}
    >
      {/* Gradient Overlay */}
      <div className="absolute  inset-0  bg-gradient-to-tr from-[#00D9A6]/90 to-[#97DD60] to-99% " />

      {/* Content */}
      <div className="relative max-w-400 mx-auto py-20 md:py-32 text-white">
        <div className="container mx-auto">
          <motion.h2
            className="text-center text-2xl md:text-4xl lg:text-5xl font-semibold"
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            Our Vision & <span className="text-black">Mission</span>
          </motion.h2>

          <div className="flex space-x-2 py-10 justify-center">
            <div className="border-3 rounded-2xl border-white w-3"></div>
            <div className="border-3 rounded-2xl border-white w-10"></div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-10 mt-14 text-sm">
            {[
              {
                title: "Our Mission",
                text: "At iLMiFY, our mission is to empower businesses by providing innovative digital solutions that drive growth and success. We are committed to delivering high-quality websites, mobile apps, branding, and digital marketing strategies tailored to meet the unique needs of each client. Our goal is to help businesses transform their ideas into impactful online experiences that connect with their audience and achieve measurable results.",
              },
              {
                title: "Our Vision",
                text: "Our vision is to become a global leader in digital transformation, shaping the future of businesses through cutting-edge technology and creative solutions. We aim to build long-lasting relationships with our clients by consistently delivering value, fostering innovation, and driving success. At iLMiFY, we strive to create a world where businesses, regardless of size, can leverage digital tools to reach their full potential.",
              },
              {
                title: "Our Values",
                text: "At iLMiFY, our core values are the driving force behind everything we do. We prioritize creativity, collaboration, and integrity in every project. We believe in creating meaningful relationships with our clients and delivering solutions that not only meet expectations but exceed them. With a focus on innovation, we ensure that each project is a reflection of our dedication to quality and a passion for making a difference in the digital world.",
              },
              {
                title: "Our Approach",
                text: "Our approach is rooted in understanding. We take the time to listen to your unique needs and challenges, ensuring that we provide tailored solutions that align with your business objectives. Through a seamless blend of strategy, design, and technology, we bring your vision to life. Whether it’s a website, mobile app, or digital marketing campaign, we adopt a results-driven mindset that ensures every initiative contributes to your business growth and success.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.6 }}
                variants={cardVariants}
                className="hover:bg-white/20 rounded-2xl px-6 py-12 transition"
              >
                <h4 className="text-2xl md:text-3xl text-center font-semibold mb-3">
                  {item.title}
                </h4>

                <p className="pt-6 opacity-90 leading-relaxed text-justify font-medium">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
