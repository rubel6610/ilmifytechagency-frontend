"use client";

import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import CustomBorder from "./customBorder/CustomBorder";
import { motion } from "motion/react";

function Counter({ end, duration = 1500, suffix = "" }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end, duration]);

  return (
    <>
      {count.toLocaleString()}
      {suffix}
    </>
  );
}


export default function WeLoveWhatWeDo() {
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

  const titleWords = "We Love What We Do".split(" ");
  return (
    <section className="w-full bg-[#F9F9F9] py-10 md:py-20 xl:pt-30 xl:pb-50">
      <div className="max-w-400 mx-auto px-5 md:px-8.75">
        <div className="flex flex-col lg:flex-row relative gap-10 items-stretch">

          {/* LEFT CARD */}
          <div className="relative rounded-2xl overflow-hidden shadow-xl min-h-105 flex items-center justify-center w-full lg:w-[60%] z-10">
            
            {/* Background Image */}
            <Image
              src="/WeLove.jpg"
              alt="Team"
              fill
              priority
              className="object-cover"
            />

            {/* Green Overlay */}
            <div className="absolute inset-0 bg-linear-to-br from-green-400/40 to-emerald-600/90"></div>

            {/* Content */}
            <div className="relative z-10 text-white text-center px-6 md:px-14">
              <h2 className="text-5xl md:text-6xl font-bold">
                <Counter end={500} suffix="+" />
              </h2>

              <p className="uppercase tracking-widest mt-2 text-sm">
                Projects
              </p>

              <div className="mt-10 grid grid-cols-2 gap-6 text-left">
                <div>
                  <h3 className="text-3xl font-semibold">
                    +<Counter end={3500} />
                  </h3>
                  <p className="text-sm opacity-90 mt-1">
                    Users&rsquo; Comments
                  </p>
                </div>

                <div>
                  <h3 className="text-3xl font-semibold">
                    <Counter end={100} suffix="%" />
                  </h3>
                  <p className="text-sm opacity-90 mt-1">
                    Happy Clients
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT CARD */}
          <motion.div
          initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          className="bg-white rounded-2xl shadow-xl p-8 md:p-12 h-full relative z-20 w-full lg:w-[50%] lg:ml-[-10%] mt-12.5 lg:mt-0 top-17.5">
            <motion.h2 variants={fadeInUpVariants} className="text-4xl md:text-5xl mb-4 font-bold text-gray-900">

              We <span className="text-green-500">Love</span> What <br />

              We Do

            </motion.h2>

            <motion.div variants={fadeInUpVariants}>
               <CustomBorder/>
            </motion.div>

            <motion.p variants={fadeInUpVariants} className="text-gray-600 mt-6 leading-relaxed font-ubuntu">
              At LIMIFY, passion drives everything we do. We&rsquo;re not just
              about building websites or developing digital solutions—we&rsquo;re
              about creating meaningful experiences that make a real impact.
            </motion.p>

            <ul className="mt-8 space-y-3 font-ubuntu">
              {[
                "Custom Web Design & Development",
                "UI/UX Design",
                "Mobile App Development",
                "Digital Marketing & SEO",
                "E-Commerce Solutions",
                "CMS Solutions",
              ].map((item, index) => (
                <motion.li
                  key={index}
                  variants={fadeInUpVariants}
                  className="flex items-center gap-3 text-gray-700"
                >
                  <FaCheckCircle className="text-green-500 text-lg" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
