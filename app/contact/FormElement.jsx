"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import CustomBorder from "../component/customBorder/CustomBorder";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    x: 80,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

export default function FormElement() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSuccess(true);
    e.target.reset();
  }

  return (
    <motion.div
      className="bg-white rounded-xl p-8 mt-20 max-w-400 mx-auto flex flex-col lg:flex-row gap-10"
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* LEFT */}
      <motion.div
        className="w-full flex-col lg:w-[40%] mr-10"
        variants={fadeUp}
      >
        <motion.h1
          className="text-[33px] md:text-[45px] lg:text-[55px] font-semibold text-center lg:text-left mx-2"
          variants={fadeUp}
        >
          Please get in <span className="text-primary">touch</span>
          <br />
          with <span className="text-primary">us</span>
        </motion.h1>

        <motion.div
          className="flex justify-center lg:justify-start lg:ml-3 items-center text-center lg:text-left"
          variants={cardVariants}
        >
          <CustomBorder />
        </motion.div>

        <motion.p
          className="w-auto text-center lg:text-left"
          variants={fadeUp}
        >
          When, while the lovely valley teems with vapour around me, and the
          meridian sun strikes the upper surface of the impenetrable foliage of
          my trees, and but a few stray gleams steal into the inner sanctuary.
          When, while the lovely valley teems with vapour around me.
        </motion.p>
      </motion.div>

      {/* RIGHT */}
      <motion.div
        className="w-full lg:w-[55%] py-24 items-center"
        variants={fadeUp}
      >
        <motion.h2
          className="text-[32px] font-semibold mb-10"
          variants={fadeUp}
        >
          Send us a message
        </motion.h2>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-12"
          variants={containerVariants}
        >
          {/* Top Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {["Full name*", "Email*", "Phone number*"].map((label, i) => (
              <motion.div key={i} className="relative" variants={fadeUp}>
                <input
                  placeholder=" "
                  className="peer w-full border-b-2 border-black bg-transparent pt-6 pb-5 outline-none focus:border-primary"
                />
                <label
                  className="absolute left-0 top-2 transition-all
                    peer-placeholder-shown:top-6
                    peer-placeholder-shown:text-base
                    peer-focus:top-2
                    peer-focus:text-sm
                    peer-focus:text-primary"
                >
                  {label}
                </label>
              </motion.div>
            ))}
          </div>

          {/* Message */}
          <motion.div className="relative" variants={fadeUp}>
            <textarea
              rows="4"
              placeholder=" "
              className="peer w-full border-b-2 border-black bg-transparent pt-6 pb-2 outline-none focus:border-primary resize-y"
            />
            <label
              className="absolute left-0 top-2 transition-all
                peer-placeholder-shown:top-6
                peer-placeholder-shown:text-base
                peer-focus:top-2
                peer-focus:text-sm
                peer-focus:text-primary"
            >
              Message
            </label>
          </motion.div>

          {/* Button */}
          <motion.div
            className="flex justify-center lg:justify-end"
            variants={fadeUp}
          >
            <button
              type="submit"
              className="bg-linear-to-r from-[#86e062] to-[#00c389] text-white px-8 py-3 rounded-full font-semibold shadow-[5px_5px_15px_rgba(16,185,129,0.4)] hover:opacity-90 transition"
            >
              SEND NOW
            </button>
          </motion.div>
        </motion.form>
      </motion.div>
    </motion.div>
  );
}
