import React from 'react';

const DigitalFutures = () => {
  return (
    <section 
      className="relative w-full h-[60vh] md:h-[80vh] flex items-center justify-center bg-fixed bg-cover bg-center bg-no-repeat overflow-hidden "
      style={{
        // Tomar image link
        backgroundImage: `url('https://i.ibb.co.com/JwcDnrt1/46830.jpg')`,
      }}
    >
      {/* 1. Static Blur & Green Overlay Layer */}
      {/* 'absolute' hobar karone eta image er upor static thakbe */}
      <div className="absolute inset-0 bg-linear-to-r from-[#059669]/80 via-[#10b981]/70 to-[#34d399]/80 z-0"></div>
      
      {/* 2. Scrolling Text Container */}
      {/* Container hobe full width kintu height hobe background er pray 1/3 */}
      <div className="relative z-10 w-full h-1/3 flex items-center justify-center p-6">
        <div className="max-w-4xl text-center text-white">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight drop-shadow-lg">
            Innovating Digital Futures
          </h2>
          <p className="text-[24px] font-medium opacity-95 max-w-2xl mx-auto">
            At iLMIFY, we don’t just create websites and apps we build digital experiences 
            that inspire growth and success. From web development and mobile apps to 
            branding and marketing.
          </p>
        </div>
      </div>
    </section>
  );
};

export default DigitalFutures;