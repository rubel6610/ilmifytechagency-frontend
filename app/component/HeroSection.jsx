"use client";

import Image from "next/image";
import { HiArrowSmallLeft, HiArrowSmallRight } from "react-icons/hi2";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";

export default function HeroSection() {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = [
    {
      title: "We Are a",
      highlight: "Web Design",
      subHighlight: "Agency",
      subtitle: "5 YEARS OF EXPERIENCE",
      description:
        "At iLMiFY, we are more than just a web design agency - we are your strategic partner in crafting unique, engaging, and user-friendly websites that drive results.",
      image: "/hero.png",
      btnText: "READ MORE",
    },
    {
      title: "A Group of",
      highlight: "Expert",
      subHighlight: "Planners",
      subtitle: "5 YEARS OF EXPERIENCE",
      description:
        "At iLMiFY, we pride ourselves on being team of seasoned professionals, each with a unique skill set that complements our shared goal: bring your visions to life.",
      image: "/hero-2.png",
      btnText: "READ MORE",
    },
    {
      title: "Business",
      highlight: "Faster",
      subHighlight: "With us",
      subtitle: "5 YEARS OF EXPERIENCE",
      description:
        "At iLMiFY, we harness innovation to drive growth by integrating cutting-edge technology with actionable strategies. Our scalable solutions ensure your business thrives in an ever-evolving digital landscape.",
      image: "/blog-2.png",
      btnText: "Contact Us",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -80 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 80 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className="relative w-full min-h-[80vh] bg-[#FAFAFA] flex items-center py-10 lg:py-0 overflow-hidden">
      <Swiper
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        modules={[Navigation, Autoplay]}
        speed={1000}
        loop={true}
        autoplay={false}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          // FIX: key sudhu index hobe
          <SwiperSlide key={index}>
            {({ isActive }) => (
              <motion.div
                // FIX: Key activeIndex thakle slide change animation hoy na
                initial="hidden"
                animate={isActive ? "visible" : "hidden"}
                variants={containerVariants}
                className="max-w-400 mx-auto px-5 md:px-8.75 grid grid-cols-1 xl:grid-cols-2 gap-10 xl:gap-20 items-center min-h-[85vh] relative"
              >
                {/* LEFT CONTENT */}
                <div className="order-2 xl:order-1 text-left relative z-10">
                  <motion.h3 
                    variants={fadeInLeft} 
                    className="text-emerald-400 font-bold tracking-[0.2em] text-[14px] uppercase mb-6 block"
                  >
                    {slide.subtitle}
                  </motion.h3>

                  <motion.h1 
                    variants={fadeInUpVariants} 
                    className="text-4xl md:text-6xl xl:text-[70px] font-bold text-[#1a1a1a] leading-[1.1] mb-8"
                  >
                    {slide.title}
                    <br></br>
                    <span className="text-black">{slide.highlight}</span>
                    <span className="text-emerald-400 ml-5">
                      {slide.subHighlight}
                    </span>
                  </motion.h1>

                  <motion.p 
                    variants={fadeInUpVariants} 
                    className="text-gray-500 text-sm md:text-base max-w-lg leading-relaxed mb-10"
                  >
                    {slide.description}
                  </motion.p>

                  <motion.button 
                    variants={fadeInUpVariants} 
                    className="bg-[#1a1a1a] text-white px-10 py-4 rounded-full font-medium hover:bg-[#00D9A6] transition-all text-[11px] tracking-widest shadow-lg"
                  >
                    {slide.btnText}
                  </motion.button>

                  <div className="mt-20 flex flex-col md:flex-row md:items-center justify-between gap-8">
                    {/* Socials - Agertai Rakha Hoyeche */}
                    <motion.div variants={fadeInRight} className="flex gap-5 text-[12px] font-bold text-gray-600 uppercase tracking-widest">
                      <a href="#" className="hover:text-emerald-400 transition-colors">Facebook</a>
                      <a href="#" className="hover:text-emerald-400 transition-colors">Instagram</a>
                      <a href="#" className="hover:text-emerald-400 transition-colors">Twitter</a>
                      <a href="#" className="hover:text-emerald-400 transition-colors">YouTube</a>
                    </motion.div>

                    <div className="flex gap-4 z-50">
                      <button
                        onClick={() => swiperRef.current?.slidePrev()}
                        className="w-12 h-12 rounded-full bg-[#F3F4F6] flex items-center justify-center hover:bg-emerald-500 text-gray-500 hover:text-white transition-all shadow-sm active:scale-90"
                      >
                        <HiArrowSmallLeft size={24} />
                      </button>
                      <button
                        onClick={() => swiperRef.current?.slideNext()}
                        className="w-12 h-12 rounded-full bg-[#F3F4F6] flex items-center justify-center hover:bg-emerald-500 text-gray-500 hover:text-white transition-all shadow-sm active:scale-90"
                      >
                        <HiArrowSmallRight size={24} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* RIGHT IMAGE - Agertai Rakha Hoyeche */}
                <div className="relative flex justify-center items-center order-1 xl:order-2 lg:mt-10 xl:mt-0">
                  <div className="relative w-75 h-75 sm:w-112.5 sm:h-112.5 xl:w-190 xl:h-190">
                    <div className="absolute inset-0 rounded-full border-20 sm:border-35 lg:border-50 border-[#D8D8D8] z-20 pointer-events-none"></div>

                    <motion.div
                      className="absolute inset-5 sm:inset-8.75 xl:inset-12.5 z-10 overflow-hidden"
                      initial={{ clipPath: "circle(50% at 50% 50%)" }}
                      animate={isActive ? {
                        clipPath: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)"
                      } : {
                        clipPath: "circle(50% at 50% 50%)"
                      }}
                      transition={{ duration: 1.5, ease: "easeInOut" }}
                    >
                      <div className="relative w-full h-full">
                        <Image
                          src={slide.image}
                          alt="Hero Image"
                          fill
                          className="object-cover scale-110"
                          priority
                        />
                      </div>
                    </motion.div>
                    
                    {/* Decorative Background Shapes */}
                    <div className="absolute -left-10 xl:-left-20 top-1/4 w-32 xl:w-48 h-10 xl:h-14 bg-[#F2F2F2] rounded-full -z-10" />
                    <div className="absolute -left-5 xl:-left-10 top-[38%] w-24 xl:w-36 h-10 xl:h-14 bg-[#F2F2F2] rounded-full -z-10" />
                  </div>
                </div>
              </motion.div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}