"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from "framer-motion";

const LogoSlider = () => {
  const logoImages = [
    "/assets/Slider-1.png", "/assets/Slider-3.png", "/assets/Slider-4.png", 
    "/assets/Slider-5.png", "/assets/Slider-6.png", "/assets/Slider-7.png", "/assets/Slider-8.png", 
    "/assets/Slider-9.png", "/assets/Slider-10.png", "/assets/Slider-11.png", "/assets/Slider-12.png", 
    "/assets/Slider-13.png", "/assets/Slider-14.png", "/assets/Slider-15.png", "/assets/Slider-16.png", 
    "/assets/Slider-17.png"          
  ];

  const duplicatedLogos = [...logoImages, ...logoImages];

  return (
    <div className="w-full pb-20 bg-white overflow-hidden">
      <div className="max-w-400 mx-auto px-5 md:px-8.75">
        <div className="relative flex overflow-hidden">
          
          <motion.div 
            className="flex"
            animate={{
              x: ["0%", "-50%"] 
            }}
            transition={{
              duration: 50, 
              ease: "linear",
              repeat: Infinity, // আজীবন চলতে থাকবে
            }}
            style={{ 
               display: 'flex',
               width: 'fit-content' // কন্টেন্ট অনুযায়ী উইডথ নিবে
            }}
          >
            {duplicatedLogos.map((logo, idx) => (
              <div 
                key={idx} 
                // রেসপনসিভ উইডথ: XL এ ৭টি, LG তে ৫টি ইত্যাদি
                className="shrink-0 flex items-center justify-center px-4 
                           w-[150px] sm:w-[200px] md:w-[250px] lg:w-[180px] xl:w-[200px]"
              >
                <div className="relative w-full h-16 md:h-20">
                  <Image
                    src={logo} 
                    alt={`Partner Logo ${idx + 1}`}
                    fill
                    sizes="200px"
                    className="grayscale hover:grayscale-0 transition-all duration-500 opacity-60 hover:opacity-100 object-contain cursor-pointer px-2"
                  />
                </div>
              </div>
            ))}
          </motion.div>
          
          {/* দুই পাশে শ্যাডো মাস্ক যাতে লোগোগুলো হঠাৎ করে উধাও না হয় (Optional) */}
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent z-10"></div>
          
        </div>
      </div>
    </div>
  );
};

export default LogoSlider;