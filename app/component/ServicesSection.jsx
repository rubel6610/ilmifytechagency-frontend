import Image from 'next/image';
import React from 'react';
import CustomBorder from './customBorder/CustomBorder';

const ServicesSection = () => {
  const services = [
    {
      id: 1,
      title: 'CMS Services',
      description: 'Flexible, secure, and scalable content management for your business...',
      icon: '/icons/cms.png',
    },
    {
      id: 2,
      title: 'Digital Marketing',
      description: 'Reach the right audience with targeted SEO, ads and build on database campaigns...',
      icon: '/icons/marketing.png',
    },
    {
      id: 3,
      title: 'Custom Development',
      description: 'Custom web and app solutions built for performance and growth...',
      icon: '/icons/dev.png',
    },
    {
      id: 4,
      title: 'Graphics Design',
      description: 'Far far away, behind the word mountains, far from the countries Vokalia Separated...',
      icon: '/icons/design.png',
    },
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden w-full border-2 ">

        {/* Vertical Text Side Decoration */}
          <div className="hidden xl:block absolute -right-26 top-1/2 -translate-y-1/2 -rotate-90 origin-center">
            <p className="text-[#00D9A5] font-extrabold text-sm whitespace-nowrap">
              5 years of experience helping people for best solutions
            </p>
          </div>

      <div className="max-w-400 mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center px-8.75">
        
        {/* Left Side Content */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-[42px] font-bold text-[#1A1A1A] leading-tight">
              We Are Here To <br />
              Make Your <span className="text-[#00D9A5]">Website</span> <br />
              Look More <span className="text-[#00D9A5]">Elegant</span> And Stylish!
            </h2>
          </div>
          
          <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-md">
            We provide end-to-end digital solutions designed to help your business grow smarter. 
            Whether you're launching a new product or refreshing your brand, our team is here 
            to bring your vision to life efficiently, beautifully, and with purpose.
          </p>

          <CustomBorder/>

          <button className="mt-4 px-8 py-3 bg-linear-to-r from-[#8FE481] to-[#00D9A5] text-white font-bold rounded-full shadow-[0_10px_20px_rgba(0,217,165,0.3)] hover:scale-105 transition-transform text-xs uppercase tracking-widest">
            View All
          </button>
        </div>

        {/* Right Side Cards Grid */}
        <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8 relative">
          
          

          {services.map((service) => (
            <div 
              key={service.id} 
              className="bg-white p-10 rounded-xl text-gray-800 border border-gray-50 flex flex-col items-start space-y-5 shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-300 ease-out
         hover:shadow-[0_0_40px_rgba(0,255,160,0.6)]
         hover:bg-linear-to-r
         hover:from-[#00E5A8]
         hover:to-[#6CFF9E] hover:text-white"
            >
              {/* Icon placeholder - Replace with actual Image or SVG */}
              <div className="w-12 h-12 flex items-center justify-center">
                 <Image src={service.icon} alt={service.title} height={50} width={50} className="w-full h-auto object-contain" />
              </div>
              
              <div className="space-y-3">
                <h3 className="text-xl  font-bold">{service.title}</h3>
                <p className=" text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;