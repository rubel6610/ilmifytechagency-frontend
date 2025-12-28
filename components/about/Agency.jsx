"use client";

import { Button } from "../ui/button";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
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
  return (
    <div className="bg-[#F9F9F9]">
      <div className="max-w-400 mx-auto my-28 px-4 md:px-12 py-24 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-12 items-center">
        {/* Left Content */}
        <div className="text-center">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-semibold leading-tight">
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

          <div className="flex space-x-2 py-10 justify-center">
            <div className="border-3 rounded-2xl border-green-500 w-3"></div>
            <div className="border-3 rounded-2xl border-green-500 w-10"></div>
          </div>

          <p className="text-gray-600 leading-relaxed">
            At iLMiFY, we transform ideas into powerful digital solutions. Our
            team of creative designers, skilled developers, and strategic
            marketers works together to deliver modern websites, mobile apps,
            branding, and digital marketing services that help businesses grow
            and stand out.
          </p>

          <p className="mt-6 text-gray-600 leading-relaxed">
            We believe in innovation, transparency, and results. Every project
            is a partnership, where we focus on understanding your goals and
            turning them into impactful digital experiences. With iLMiFY by your
            side, you don’t just get a service. You gain a trusted technology
            partner for your business success.
          </p>

        
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
          className="relative w-full h-[300px] md:h-[500px] rounded-lg overflow-hidden"
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
