"use client";
import Image from "next/image";
import React from "react";
import CustomBorder from "./customBorder/CustomBorder";
import { motion } from "motion/react";
import Link from "next/link";

const MotionLink = motion(Link);
const ServicesSection = () => {
  const services = [
    {
      id: 1,
      title: "CMS Services",
      description:
        "Flexible, secure, and scalable content management for your business...",
      icon: "/cms.png",
    },
    {
      id: 2,
      title: "Digital Marketing",
      description:
        "Reach the right audience with targeted SEO, ads and build on database campaigns...",
      icon: "/marketing-strategy.png",
    },
    {
      id: 3,
      title: "Custom Development",
      description:
        "Custom web and app solutions built for performance and growth...",
      icon: "/monitor.png",
    },
    {
      id: 4,
      title: "Graphics Design",
      description:
        "Far far away, behind the word mountains, far from the countries Vokalia Separated...",
      icon: "/pen-tool.png",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className="py-10 md:py-20 xl:py-30 bg-[#FFFFFF] relative overflow-hidden w-full">
      {/* Vertical Text Side Decoration */}
      <div className="hidden 2xl:block absolute -right-10 top-1/2 -translate-y-1/2 -rotate-90 origin-center">
        <p className="text-[#00D9A5] font-extrabold text-sm whitespace-nowrap">
          5 years of experience helping people for best solutions
        </p>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="max-w-400 mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center px-5 md:px-8.75"
      >
        {/* Left Side Content */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <motion.h2
              variants={fadeInRight}
              className="text-4xl md:text-5xl font-bold text-[#1A1A1A] leading-tight"
            >
              We Are Here To <br />
              Make Your <span className="text-[#00D9A5]">Website</span> <br />
              Look More <span className="text-[#00D9A5]">Elegant</span> And
              Stylish!
            </motion.h2>
          </div>

          <motion.p
            variants={fadeInRight}
            className="text-gray-500 text-sm md:text-base leading-relaxed max-w-md font-ubuntu"
          >
            We provide end-to-end digital solutions designed to help your
            business grow smarter. Whether you&rsquo;re launching a new product
            or refreshing your brand, our team is here to bring your vision to
            life efficiently, beautifully, and with purpose.
          </motion.p>

          <motion.div variants={fadeInRight}>
            <CustomBorder />
          </motion.div>

          {/* romantic button */}
          <div className="">
            <MotionLink
              href="/services"
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
                             shadow-xl
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

              <span className="relative z-10">VEIW ALL</span>
            </MotionLink>
          </div>
        </div>

        {/* Right Side Cards Grid */}
        <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8 relative items-stretch">
          {services.map((service) => (
            <motion.div
              variants={fadeInLeft}
              key={service.id}
              className="group hover:shadow-cyan-100 relative flex flex-col items-start min-h-full bg-white p-10 rounded-xl text-gray-800 border border-gray-50 shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-linear-to-r from-[#00E5A8] to-[#6CFF9E] opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out z-0"></div>

              <div className="relative z-10 w-12 h-12 flex items-center justify-center mb-5">
                <Image
                  src={service.icon}
                  alt={service.title}
                  height={50}
                  width={50}
                  className="w-full h-auto object-contain group-hover:brightness-0 group-hover:invert transition-all duration-300"
                />
              </div>

              <div className="relative z-10 space-y-3 group-hover:text-white bg-transparent transition-colors duration-500 grow w-full">
                <h3 className="text-2xl font-bold">{service.title}</h3>
                <p className="text-sm leading-relaxed opacity-80 group-hover:opacity-100 font-ubuntu">
                  {service.description}
                </p>
              </div>

            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default ServicesSection;
