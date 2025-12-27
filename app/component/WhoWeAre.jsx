"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import Image from "next/image";
import CustomBorder from "./customBorder/CustomBorder";

const WhoWeAre = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const frontImageY = useTransform(smoothProgress, [0, 1], [20, -60]); 
  const frontImageX = useTransform(smoothProgress, [0, 1], [0, -40]);

  const backImageY = useTransform(smoothProgress, [0, 1], [0, 60]);
  const backImageX = useTransform(smoothProgress, [0, 1], [0, 40]);

  return (
    <div className="bg-[#F9F9F9] py-10 md:py-20 xl:py-30 2xl:py-40">
      <div
        ref={containerRef}
        className="relative flex flex-col xl:flex-row items-center justify-between max-w-400 mx-auto gap-12 xl:gap-0 px-5 md:px-8.75"
      >
        
        <div className="relative md:h-100 lg:h-120 xl:h-auto w-full xl:w-[60%] aspect-4/3 md:aspect-square lg:aspect-4/3">
         
          <motion.div
            style={{ y: backImageY, x: backImageX }}
            className="absolute top-0 left-0 w-[85%] h-[85%] rounded-[30px] md:rounded-[40px] overflow-hidden z-10"
          >
            <div className="absolute inset-0 bg-linear-to-r from-[#86e062] to-[#00c389] mix-blend-multiply z-20 opacity-70"></div>
            <Image
              src="/WeAre-2.jpg"
              fill
              alt="Background Team"
              className="object-cover"
            />
          </motion.div>

          <motion.div
            style={{ y: frontImageY, x: frontImageX }}
            className="absolute bottom-0 right-0 z-30 w-[85%] h-[85%] rounded-[30px] md:rounded-[40px] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.15)]"
          >
            <Image
              src="/WeAre-1.jpg"
              fill
              alt="Main Team"
              className="object-cover"
            />
          </motion.div>
        </div>

        <div className="w-full xl:w-[40%] xl:pl-16 flex flex-col items-start">
          <div className="mb-8">
            <h2 className="text-4xl md:text-5xl font-bold text-[#222] leading-tight">
              Who <span className="text-[#00c389]">We Are</span>
            </h2>
            
            <CustomBorder/>

          <div className="space-y-6 text-gray-600 text-base md:text-lg leading-relaxed text-justify">
            <p>
              At <span className="font-semibold text-black italic">iLMiFY</span>, we transform ideas into powerful digital solutions. Our team of creative designers, skilled developers, and strategic marketers works together to deliver modern websites, mobile apps, branding, and digital marketing services that help businesses grow and stand out.
            </p>
            <p>
              We believe in innovation, transparency, and results. Every project is a partnership, where we focus on understanding your goals and turning them into impactful digital experiences. With iLMiFY by your side, you don't just get a service. You gain a trusted technology partner for your business success.
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-10 px-12 py-4 bg-linear-to-r from-[#98e670] to-[#00d696] text-white font-bold rounded-full shadow-[0_10px_30px_rgba(0,195,137,0.4)] uppercase tracking-wider text-sm transition-all duration-500 ease-in-out hover:bg-[#181818] hover:bg-none"
          >
            Read More
          </motion.button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default WhoWeAre;