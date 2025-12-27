"use client"
import React from 'react';
import Image from 'next/image';

const LogoSlider = () => {
  // Tomar /public folder e jodi 'logos' name e ekta folder thake,
  // tobe file name gulo nicher array te bosiye daw (e.g., logo1.png, logo2.svg)
  const logoImages = [
    "/assets/Slider-1.png", "/assets/Slider-2.png", "/assets/Slider-3.png", "/assets/Slider-4.png", "/assets/Slider-5.png", "/assets/Slider-6.png", "/assets/Slider-7.png",
    "/assets/Slider-8.png", "/assets/Slider-9.png", "/assets/Slider-10.png", "/assets/Slider-11.png", "/assets/Slider-12.png", "/assets/Slider-13.png", "/assets/Slider-14.png",
    "/assets/Slider-15.png", "/assets/Slider-16.png", "/assets/Slider-17.png"           
  ];

  return (
    <div className="w-full py-16 bg-white overflow-hidden">
      <div className="relative flex items-center">
        
        {/* Infinite Scroll Wrapper */}
        <div className="flex animate-infinite-scroll whitespace-nowrap">
          
          {/* Loop ti duibar render kora hoyeche seamless loop er jonno */}
          {[...logoImages, ...logoImages].map((logo, index) => (
            <div 
              key={index} 
              className="mx-10 flex-shrink-0 flex items-center justify-center w-[150px]"
            >
              <Image
                // Public folder theke image path
                src={`/logos/${logo}`} 
                alt={`Partner Logo ${index + 1}`}
                width={150}
                height={60}
                className="grayscale hover:grayscale-0 transition-all duration-500 opacity-60 hover:opacity-100 object-contain cursor-pointer"
              />
            </div>
          ))}
          
        </div>
      </div>

      {/* Tailwind and Framer-like CSS Animation */}
      <style jsx>{`
        @keyframes infinite-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-infinite-scroll {
          display: flex;
          width: max-content;
          animation: infinite-scroll 50s linear infinite;
        }
        /* Mouse hover korle slider theme jabe (optional) */
        .animate-infinite-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default LogoSlider;