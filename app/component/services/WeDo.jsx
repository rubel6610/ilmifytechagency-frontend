
"use client";
import Image from "next/image";
import { Card, CardContent } from "@/app/component/ui/card";
import { Button } from "@/app/component/ui/button";
import { motion } from "framer-motion";
import servicesData from "./servicesData";
import Link from "next/link";

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

export default function WeDo() {
  return (
    <section className="w-full py-20">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="mb-14 text-center">
          <motion.h2
            className="text-center text-3xl md:text-5xl  font-semibold"
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            We have <span className="text-[#00D9A6]">everything</span>
            <br />
            you <span className="text-[#00D9A6]">need</span>
          </motion.h2>

          <motion.div className="flex space-x-2 py-10 justify-center">
            <div className="border-3 rounded-2xl border-[#00C950] w-3"></div>
            <div className="border-3 rounded-2xl border-[#00C950] w-10"></div>
          </motion.div>
        </div>

        {/* Cards */}
        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {servicesData.map((service, index) => (
            <motion.div key={index} variants={cardVariants}>
              <Card
                className="
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
                <CardContent className="flex h-full flex-col items-center p-6 text-center">
                  {/* IMAGE CARD */}
                  {service.isImageCard ? (
                    <div className="w-full h-84">
                      <div className="relative mb-6 h-40 w-full overflow-hidden rounded-xl px-8">
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

                      <p className="pb-12 pt-8 text-sm leading-relaxed text-justify text-muted-foreground">
                        {service.description}
                      </p>

                      {/* <Button
                        variant="outline"
                        size="sm"
                        className="mb-2 rounded-full px-6"
                      >
                        {service.button}
                      </Button> */}
                      <Link href={`/services/${service.id}`}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mb-2 rounded-full px-6"
                        >
                          {/* {service.button} */}
                          Read More
                        </Button>
                      </Link>
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
