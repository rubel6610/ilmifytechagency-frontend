"use client";

import { Button } from "../ui/button";
import Image from "next/image";
import { motion } from "motion/react";
import Link from "next/link";
import CustomBorder from "../customBorder/CustomBorder";
const MotionLink = motion(Link);

export default function Agency() {
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
    <div className="bg-[#F9F9F9]">
      <div className="max-w-400 mx-auto my-28 px-8 md:px-12 py-24 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-12 lg:items-center">
        {/* Left Content */}
        <div className="order-2 md:order-1">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-semibold leading-tight text-center lg:text-left mb-6">
            {/* Line 1 */}
            <motion.span
              className="block text-gray-800 overflow-hidden whitespace-nowrap"
              variants={typingVariant}
              initial="hidden"
              animate="visible"
              custom={1.6}
            >
              We are a creative
            </motion.span>

            {/* Line 2 */}
            <motion.span
              className="block overflow-hidden whitespace-nowrap"
              variants={typingVariant}
              initial="hidden"
              animate="visible"
              custom={2}
            >
              <span className="text-gray-800">web </span>
              <span className="text-green-500">design agency</span>
            </motion.span>
          </h1>

<<<<<<< HEAD
          <motion.div
        className="flex justify-center lg:justify-start"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
        variants={fadeInRight}
      >
        <CustomBorder />
      </motion.div>
=======
          <div className="flex space-x-2 py-8">
           <CustomBorder/>
          </div>
>>>>>>> 33ec3a0573cdc17a4e2b8ff8af186cfb6e572012

          <div className="text-justify">
            <motion.p
              className="text-gray-600 md:leading-relaxed items-start"
              initial={{ y: 60, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              At iLMiFY, we transform ideas into powerful digital solutions. Our
              team of creative designers, skilled developers, and strategic
              marketers works together to deliver modern websites, mobile apps,
              branding, and digital marketing services that help businesses grow
              and stand out.
            </motion.p>
            
            <br />
            <motion.p
              className="text-gray-600 md:leading-relaxed"
              initial={{ y: 60, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              We believe in innovation, transparency, and results. Every project
              is a partnership, where we focus on understanding your goals and
              turning them into impactful digital experiences. With iLMiFY by
              your side, you don’t just get a service. You gain a trusted
              technology partner for your business success.
            </motion.p>
          </div>

          <MotionLink
            href="/contact"
            className="
             relative
             overflow-hidden
           bg-linear-to-r
               from-[#0ddaa0]
               to-[#8ce064]
               text-white
               mt-12
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

            <span className="relative z-10">GET IN TOUCH</span>
          </MotionLink>
        </div>

        {/* Right Image (Animated Reveal) */}
        <motion.div
          className="relative w-full h-55 md:h-125 rounded-lg overflow-hidden order-1 md:order-2 px-4"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{
            duration: 1.2,
            ease: "easeInOut",
          }}
        >
          <Image
            src="/team1.jpg"
            alt="Team discussion"
            fill
            className="object-cover rounded-lg"
            priority
          />
        </motion.div>
      </div>
    </div>
  );
}
