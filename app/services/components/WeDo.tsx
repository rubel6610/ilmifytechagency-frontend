"use client";

import Link from "next/link";
import { motion } from "framer-motion";
// import { Card, CardContent } from "@/app/about/components/ui/card";
import servicesData, { Service } from "./servicesData";
import CustomBorder from "../../component/customBorder/CustomBorder";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/src/components/ui/card";


/* ------------------ Animation Variants ------------------ */
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    x: 60,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" as const },
  },
};

export default function WeDo() {
  const router = useRouter();
  
  return (
    <section className="w-full  py-10 md:py-20 mb-10 lg:mb-30">
      <div className="container px-4 mx-auto">
        {/* ---------------- Heading ---------------- */}
        <div className="mb-14 text-center">
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-semibold"
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" as const }}
            viewport={{ once: true }}
          >
            We have <span className="text-[#00D9A6]">everything</span>
            <br />
            you <span className="text-[#00D9A6]">need</span>
          </motion.h2>

          <motion.div
            className="flex justify-center mt-8"
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
          >
            <CustomBorder />
          </motion.div>
        </div>

        {/* ---------------- Cards ---------------- */}
        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {servicesData.map((service) => (
            <motion.div key={service.id} variants={cardVariants}>
              <Link href={`/services/${service.slug}`} className="block h-full">
                <Card
                  className="
                    h-full
                    cursor-pointer
                    rounded-xl
                    border-none
                    bg-white
                    shadow-2xl
                    transition-all
                    duration-300
                    ease-out
                    hover:-translate-y-4
                    hover:shadow-xl
                    hover:bg-linear-to-b
                    hover:from-[#86e062]
                    hover:to-[#00c389]
                    hover:text-white
                  "
                >
                  <CardContent className="flex flex-col h-full p-6 text-center">
                    {/* Title */}
                    <h3 className="mb-4 text-2xl font-semibold text-left px-4">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="grow text-sm leading-relaxed text-justify text-muted-foreground py-4 px-4">
                      {service.description}
                    </p>

                    <div className="w-40 flex mx-4">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          router.push(`/services/${service.slug}`);
                        }}
                        className="
                          relative
                          overflow-hidden
                          rounded-full
                          px-8
                          py-4
                          text-sm
                          tracking-wide
                          text-white
                          shadow-xl
                          bg-linear-to-r
                          from-[#0ddaa0]
                          to-[#8ce064]
                          transition-all
                          duration-300
                          hover:from-black
                          hover:to-black
                        "
                      >
                        Read More
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}