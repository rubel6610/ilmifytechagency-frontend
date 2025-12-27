"use client"
import React from 'react';
import Image from 'next/image';

const LogoSlider = () => {
  const logoImages = [
    "/assets/Slider-1.png", "/assets/Slider-2.png", "/assets/Slider-3.png", "/assets/Slider-4.png", 
    "/assets/Slider-5.png", "/assets/Slider-6.png", "/assets/Slider-7.png", "/assets/Slider-8.png", 
    "/assets/Slider-9.png", "/assets/Slider-10.png", "/assets/Slider-11.png", "/assets/Slider-12.png", 
    "/assets/Slider-13.png", "/assets/Slider-14.png", "/assets/Slider-15.png", "/assets/Slider-16.png", 
    "/assets/Slider-17.png"          
  ];

  return (
    <div className="w-full pb-20 bg-white overflow-hidden">
      <div className="max-w-400 mx-auto px-5 md:px-8.75">
        {/* Container with overflow hidden */}
        <div className="relative flex overflow-hidden group">
          
          {/* Infinite Scroll Wrapper - Using Tailwind animate class */}
          <div className="flex animate-loop-scroll whitespace-nowrap group-hover:[animation-play-state:paused]">
            
            {/* Double the list for a seamless loop */}
            {[...logoImages, ...logoImages].map((logo, index) => (
              <div 
                key={index} 
                className="shrink-0 flex items-center justify-center px-4 w-[50%] sm:w-[33.33%] md:w-[25%] lg:w-[20%] xl:w-[14.28%]"
              >
                <div className="relative w-full h-20">
                  <Image
                    src={logo} 
                    alt={`Partner Logo ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 15vw"
                    className="grayscale hover:grayscale-0 transition-all duration-500 opacity-60 hover:opacity-100 object-contain cursor-pointer px-2"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoSlider;