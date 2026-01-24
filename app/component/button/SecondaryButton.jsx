"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const MotionLink = motion(Link);

const SecondaryButton = ({ address, label }) => {
  return (
    <MotionLink
      href={address}
      className="
        relative
        overflow-hidden
          bg-linear-to-r
          from-[#0ddaa0]
          to-[#8ce064]
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
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="
          absolute
          inset-0
        bg-black
          rounded-full
          z-0
        "
        style={{ originX: 0.5, originY: 0.5 }}
      />

      <span className="relative z-10">{label}</span>
    </MotionLink>
  );
};

export default SecondaryButton;
