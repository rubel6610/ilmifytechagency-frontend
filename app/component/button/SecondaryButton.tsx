"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const MotionLink = motion(Link);

interface SecondaryButtonProps {
  address: string;
  label: string;
}

const SecondaryButton = ({ address, label }: SecondaryButtonProps) => {
  return (
    <MotionLink
      href={address}
      className="
        relative
        overflow-hidden
        bg-gradient-to-r
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
        transition-all
        duration-300
      "
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      {/* Hover Overlay */}
      <motion.span
        variants={{
          rest: { scale: 0 },
          hover: { scale: 2.5 }, // Increased scale for full coverage
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="
          absolute
          inset-0
          bg-black/20
          rounded-full
          z-0
        "
      />

      <span className="relative z-10 font-medium">{label}</span>
    </MotionLink>
  );
};

export default SecondaryButton;