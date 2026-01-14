"use client";
import React, { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { Users, Briefcase, Star, Award } from "lucide-react";

// Counter Component for Smooth Animation
const Counter = ({ value }) => {
  const ref = useRef(null);
  const inView = useInView(ref);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 40,
    stiffness: 60,
  });

  useEffect(() => {
    if (inView) {
      motionValue.set(value);
    }else{
      motionValue.set(0);
    }
  }, [inView, value, motionValue]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.floor(latest);
      }
    });
  }, [springValue]);

  return <span ref={ref}>0</span>;
};

const OverviewSection = () => {
  const stats = [
    {
      label: "Happy Clients",
      value: 250,
      suffix: "+",
      icon: <Users className="w-7 h-7" />,
      description: "Global clients trusted our expertise.",
    },
    {
      label: "Projects Completed",
      value: 480,
      suffix: "+",
      icon: <Briefcase className="w-7 h-7" />,
      description: "Successfully delivered high-end solutions.",
    },
    {
      label: "Positive Reviews",
      value: 100,
      suffix: "%",
      icon: <Star className="w-7 h-7" />,
      description: "Client satisfaction is our top priority.",
    },
    {
      label: "Global Awards",
      value: 15,
      suffix: "+",
      icon: <Award className="w-7 h-7" />,
      description: "Recognized for excellence in IT services.",
    },
  ];

  return (
    <section className="py-10 md:py-20 xl:py-30 bg-white">
      <div className="max-w-400 mx-auto px-5 md:px-8.75">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          {/* Left Side: Title & Subtitle */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <motion.h4
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-green-500 font-bold uppercase tracking-[3px] text-xs md:text-sm mb-3"
            >
              Company Overview
            </motion.h4>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-[1.2] md:leading-tight"
            >
              Our Success Story Driven <br className="hidden md:block" /> By
              Client Results
            </motion.h2>
          </div>

          {/* Right Side: Description */}
          <div className="w-full lg:max-w-md">
            <motion.p
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-500 text-base md:text-lg text-center lg:text-right font-ubuntu leading-relaxed"
            >
              We don&lsquo;t just build software; we build long-term
              partnerships that empower businesses to lead in the digital era.
            </motion.p>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {stats.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="relative overflow-hidden bg-[#F9FAFB] p-10 rounded-[40px] border border-gray-100 group transition-all duration-500"
            >
              {/* Background Decoration */}
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-green-500/5 rounded-full group-hover:scale-150 transition-transform duration-700" />

              {/* Icon */}
              <div className="w-16 h-16 bg-white shadow-sm text-green-500 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-green-500 group-hover:text-white transition-all duration-300">
                {item.icon}
              </div>

              {/* Numbers */}
              <div className="text-3xl md:text-4xl font-bold text-gray-900">
                <Counter value={item.value} />
                <span className="text-green-500">{item.suffix}</span>
              </div>

              {/* Text */}
              <h3 className="text-[18px] font-bold text-gray-800 mb-2 uppercase tracking-tight">
                {item.label}
              </h3>
              <p className="text-gray-500 leading-relaxed font-normal font-ubuntu">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OverviewSection;
