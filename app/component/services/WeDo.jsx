"use client";
import Image from "next/image";
import { Card, CardContent } from "@/app/component/ui/card";
import { motion } from "framer-motion";
import servicesData from "./servicesData";
import Link from "next/link";
import { Button } from "../ui/button";
import CustomBorder from "../customBorder/CustomBorder";

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
      ease: "easeOut",
    },
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

export default function WeDo() {
  return (
    <section className="w-full py-20">
      <div className="container px-4 mx-auto">
        {/* Heading */}
        <div className="text-center mb-14">
          <motion.h2
            className="text-3xl font-semibold text-center md:text-5xl"
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            We have <span className="text-[#00D9A6]">everything</span>
            <br />
            you <span className="text-[#00D9A6]">need</span>
          </motion.h2>

<<<<<<< HEAD
          <motion.div
        className="flex justify-center mt-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
        variants={fadeInRight}
      >
        <CustomBorder />
      </motion.div>
=======
          <motion.div className="flex justify-center py-10 space-x-2">
            <div className="border-3 rounded-2xl border-[#00C950] w-3"></div>
            <div className="border-3 rounded-2xl border-[#00C950] w-10"></div>
          </motion.div>
>>>>>>> 33ec3a0573cdc17a4e2b8ff8af186cfb6e572012
        </div>

        {/* Cards */}
        <motion.div
          className="grid items-stretch grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {servicesData.map((service, index) => (
            <motion.div key={index} variants={cardVariants}>
              <Card
                className="
                h-full
    relative
    rounded-xl
    border-none
    bg-white
    shadow-2xl
    transform-gpu
    transition-transform
    duration-300
    ease-out
    hover:-translate-y-4
    hover:z-10
    hover:shadow-md
    hover:bg-linear-to-b
    from-[#86e062]
    to-[#00c389]
    hover:text-white
  "
              >
                <CardContent className="flex flex-col items-center h-full p-6 text-center">
                  {/* IMAGE CARD */}
                  {service.isImageCard ? (
                    <div className="w-full h-84">
                      <div className="relative w-full h-40 px-8 mb-6 overflow-hidden rounded-xl">
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>

                      <h3 className="pt-12 text-2xl font-semibold">
                        {service.title}
                      </h3>
                    </div>
                  ) : (
                    <div className="w-full h-84 ">
                      {/* NORMAL CARD */}
                      <h3 className="mb-3 text-3xl font-medium">
                        {service.title}
                      </h3>

<<<<<<< HEAD
                      <p className="pb-12 pt-8 text-sm leading-relaxed text-justify text-muted-foreground h-50">
=======
                      <p className="pt-8 pb-12 text-sm leading-relaxed text-justify text-muted-foreground">
>>>>>>> 33ec3a0573cdc17a4e2b8ff8af186cfb6e572012
                        {service.description}
                      </p>

                      <div className="pt-6 mt-auto">
                        <Link href={`/services/${service.id}`}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="px-6 mb-2 rounded-full"
                          >
                            {/* {service.button} */}
                            Read More
                          </Button>
                        </Link>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
