"use client";

import { Card, CardContent } from "@/src/components/ui/card";
import { motion } from "framer-motion";

interface Step {
  number: string;
  title: string;
  description: string;
}

const steps: Step[] = [
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
  return (
    <section
      className="relative overflow-x-hidden px-4 py-16 md:py-20 text-white bg-center bg-cover md:bg-fixed"
      style={{
        backgroundImage: "url('/teammate.jpg')",
      }}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative mx-auto max-w-8xl grid grid-cols-1 lg:grid-cols-[40%_60%] gap-12 items-center">
        {/* Left Content */}
        <div>
          <h2 className="text-3xl text-center lg:text-start font-bold leading-tight md:text-4xl">
            Our team of experts do 
            their best
          </h2>

          <motion.div className="flex space-x-2 py-10 justify-center lg:justify-start">
            <div className="border-3 rounded-2xl border-gray-300 w-3" />
            <div className="border-3 rounded-2xl border-gray-300 w-10" />
          </motion.div>

          <p className="text-center lg:text-start mt-6 leading-relaxed text-white/70">
            Our team of experts puts in their best effort to deliver exceptional
            solutions that meet your business goals with precision and
            innovation.
          </p>
        </div>

        {/* Right Card */}
        <Card className="bg-white rounded-2xl shadow-xl w-full max-w-[85%]   mx-auto">
          <CardContent className="grid grid-cols-1 gap-8 px-6 py-6 md:grid-cols-2 ">
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
      </div>
    </section>
  );
}
