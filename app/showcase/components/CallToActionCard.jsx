"use client";

import Link from "next/link";
import { motion } from "motion/react";

const MotionLink = motion(Link);

const CallToActionCard = () => {
  return (
    <div className="w-full px-4">
      {/* Card Animation */}
      <motion.div
        initial={{ x: 200, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="
          max-w-365
          mx-auto
          rounded-2xl
          bg-linear-to-r
          from-[#0ddaa0]
          to-[#8ce064]
          py-20
          px-6
          flex
          flex-col
          items-center
          text-center
          text-white
       
        "
        style={{
          boxShadow: "10px 20px 20px rgba(13, 218, 160, 0.25) ",
        }}
      >
        <p className="text-sm md:text-base opacity-90 mb-3">
          What Are You Waiting for?
        </p>

        <h2 className="text-3xl md:text-5xl font-semibold mb-10">
          Let&apos;s Talk About Work
        </h2>

        {/* Animated Link Button */}
        <MotionLink
          href="/contact"
          className="
            relative
            overflow-hidden
            bg-black
            text-white
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
              from-[#0ddaa0]
              to-[#8ce064]
              rounded-full
              z-0
            "
            style={{ originX: 0.5, originY: 0.5 }}
          />

          <span className="relative z-10">START NOW</span>
        </MotionLink>
      </motion.div>
    </div>
  );
};

export default CallToActionCard;
