"use client"
import Image from 'next/image';
import CustomBorder from './customBorder/CustomBorder';
import { motion } from "motion/react";

const Support = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };
  return (
    <section className="py-10 md:py-20 xl:py-30 2xl:py-40 bg-white">
      <div className="max-w-400 mx-auto flex flex-col-reverse xl:flex-row items-center gap-12 px-5 md:px-8.75">
        
        {/* Left Side: Content */}
        <motion.div
        initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
        className="w-full xl:w-1/2 order-2 xl:order-1">
          <div className="mb-6 mt-20 md:mt-0">
            <motion.h2 variants={fadeInUpVariants} className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              With <span className="text-[#00D9A6]">Live Chat</span> <br />
              <span className='text-[#00D9A6]'>24/7</span> Support
            </motion.h2>

            <motion.div variants={fadeInUpVariants}>
               <CustomBorder/>
            </motion.div>

          </div>

          <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
            <motion.p variants={fadeInUpVariants}>
              At iLMIFY, we understand that exceptional customer service is crucial to building trust 
              and long-lasting relationships. That’s why we offer Live Chat and 24/7 Support to 
              ensure your needs are met at any time, day or night.
            </motion.p>
            <motion.p variants={fadeInUpVariants}>
              Our dedicated support team is always ready to assist you with any questions, concerns, 
              or technical issues you may have. Whether you need real-time help with navigating your 
              website, troubleshooting, or getting advice on our services, our live chat feature 
              ensures you’ll never have to wait long for assistance.
            </motion.p>
          </div>
        </motion.div>

        {/* Right Side: Image */}
        <div className="w-full xl:w-1/2 order-1 xl:order-2 flex justify-center">
          <div className="relative w-full h-75 md:h-112.5">
            <Image
              src="/WeLove.jpg" 
              alt="Support Team Illustration"
              layout="fill"
              objectFit="contain"
              priority
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Support;