"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import Image from "next/image";
import CustomBorder from "./customBorder/CustomBorder";
import Link from "next/link";

const MotionLink = motion(Link);
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  };

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="bg-[#F9F9F9] py-10 md:py-20 xl:py-30">
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

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="w-full xl:w-[40%] xl:pl-16 flex flex-col items-start"
        >
          <div className="mb-8">
            <motion.h2
              variants={fadeInUpVariants}
              className="text-4xl md:text-5xl font-bold text-[#222] leading-tight"
            >
              Who <span className="text-[#00c389]">We Are</span>
            </motion.h2>

            <CustomBorder />

            <div className="space-y-6 text-gray-600 text-base md:text-lg leading-relaxed text-justify font-ubuntu">
              <motion.p variants={fadeInUpVariants}>
                At{" "}
                <span className="font-semibold text-black italic">iLMiFY</span>,
                we transform ideas into powerful digital solutions. Our team of
                creative designers, skilled developers, and strategic marketers
                works together to deliver modern websites, mobile apps,
                branding, and digital marketing services that help businesses
                grow and stand out.
              </motion.p>
              <motion.p variants={fadeInUpVariants}>
                We believe in innovation, transparency, and results. Every
                project is a partnership, where we focus on understanding your
                goals and turning them into impactful digital experiences. With
                iLMiFY by your side, you don&rsquo;t just get a service. You
                gain a trusted technology partner for your business success.
              </motion.p>
            </div>

            {/* romantic button */}
            <div className="">
              <MotionLink
                href="/about"
                className=" font-bold
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
                   shadow-[0px_0px_20px_5px_rgba(16,185,129,0.4)]
                   hover:shadow-[0_0_0_0_rgba(0,0,0,0)]
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

                <span className="relative z-10">READ MORE</span>
              </MotionLink>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default WhoWeAre;
