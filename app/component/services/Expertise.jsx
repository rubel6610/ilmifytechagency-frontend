<<<<<<< HEAD
"use client"
=======

"use client";
>>>>>>> 33ec3a0573cdc17a4e2b8ff8af186cfb6e572012
import { Card, CardContent } from "@/app/component/ui/card";
import { motion } from "motion/react";

const steps = [
  {
    number: "01",
    title: "Understanding Your Needs",
    description:
      "Our experts first understand your business goals and challenges to deliver impactful and relevant solutions.",
  },
  {
    number: "02",
    title: "Thinking & Planning",
    description:
      "We analyze your challenges, develop a strategic plan, and deliver impactful solutions.",
  },
  {
    number: "03",
    title: "Execution",
    description:
      "We implement the plan with precision, ensuring seamless results that align with your goals.",
  },
  {
    number: "04",
    title: "Support",
    description:
      "We offer continuous support to ensure optimal performance and long-term success.",
  },
];

export default function Expertise() {
  const fadeInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };
  return (
    <section
      className="relative py-20 pr-8 text-white bg-fixed bg-center bg-cover"
      style={{
        backgroundImage: "url('/teammate.jpg')",
      }}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative max-w-400 mx-auto grid grid-cols-1 lg:grid-cols-[30%_70%] gap-12 items-center px-16 py-24">
        {/* Left Content */}
        <div>
          <h2 className="text-3xl font-bold leading-tight md:text-4xl">
            Our team of <br />
            experts do <br />
            their best
          </h2>

<<<<<<< HEAD
          <motion.div 
          initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
        variants={fadeInRight}
          className="flex space-x-2 py-10">
            <div className="border-3 rounded-2xl border-gray-300 w-3"></div>
            <div className="border-3 rounded-2xl border-gray-300 w-10"></div>
          </motion.div>
=======
          <div className="flex py-10 space-x-2">
            <div className="w-3 border-gray-300 border-3 rounded-2xl"></div>
            <div className="w-10 border-gray-300 border-3 rounded-2xl"></div>
          </div>
>>>>>>> 33ec3a0573cdc17a4e2b8ff8af186cfb6e572012

          <p className="max-w-md mt-6 leading-relaxed text-white/70">
            Our team of experts puts in their best effort to deliver exceptional
            solutions that meet your business goals with precision and
            innovation.
          </p>
        </div>

        {/* Right Card */}
        <motion.div
          initial={{ opacity: 0, x: 60 }} // start from right
          whileInView={{ opacity: 1, x: 0 }} // move to original position
          transition={{
            duration: 1,
            ease: "easeOut",
          }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <Card className="bg-[#FFFFFF] rounded-2xl shadow-xl">
            <CardContent className="grid grid-cols-1 gap-4 px-6 py-4 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((step) => (
                <div key={step.number}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="h-0.5 w-4 bg-emerald-400 mt-5" />
                    <span className="text-3xl font-medium text-gray-600">
                      {step.number}
                    </span>
                  </div>

                  <h4 className="mb-3 text-xl font-medium text-emerald-500">
                    {step.title}
                  </h4>

                  <p className="leading-relaxed text-gray-400">
                    {step.description}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
