"use client";

import { motion, useAnimation } from "framer-motion";
import { useRef } from "react";

export default function Section({ children }) {
  const controls = useAnimation();
  const hasAnimated = useRef(false);

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={controls}
      onViewportEnter={() => {
        if (!hasAnimated.current) {
          controls.start({
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" },
          });
          hasAnimated.current = true;
        }
      }}
      viewport={{ margin: "-120px" }}
    >
      {children}
    </motion.section>
  );
}
