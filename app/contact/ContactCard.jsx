"use client";

import React from "react";
import { motion } from "framer-motion";
import { VscLocation } from "react-icons/vsc";
import { TfiMobile } from "react-icons/tfi";
import { IoMdTime } from "react-icons/io";

const cards = [
  {
    title: "ADDRESS",
    icon: VscLocation,
    paragraph: "30 N GOULD ST STE R, SHERIDAN, WY 82801",
  },
  {
    title: "PHONE & EMAIL",
    icon: TfiMobile,
    paragraph: "+1 307 269 6920",
    paragraph2: "info@ilmifytech.com",
  },
  {
    title: "WORKING HOURS",
    icon: IoMdTime,
    paragraph: "Monday - Friday 09.00 - 23.00",
    paragraph2: "Sunday 09.00 - 16.00",
  },
];

// Parent container animation (stagger)
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

// Individual card animation (right → left)
const cardVariants = {
  hidden: {
    opacity: 0,
    x: 80,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const ContactCard = () => {
  return (
    <div className="px-4">
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-350 mx-auto "
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        {cards.map((card, index) => {
          const Icon = card.icon;

          return (
            <motion.div
              key={index}
              variants={cardVariants}
              className="
                  bg-white
                  shadow-2xl
                 flex flex-col lg:flex-row
                 items-center
                 text-center lg:text-left
                 p-8
                 min-h-45 lg:min-h-80
              "
            >
              <span className="text-primary text-7xl mb-4 lg:mb-0 lg:mr-4">
                <Icon />
              </span>

              <div>
                <h1 className="text-xl lg:text-[28px] mb-2">
                  {card.title}
                </h1>
                <p className="text-sm lg:text-base">{card.paragraph}</p>
                {card.paragraph2 && (
                  <p className="text-sm lg:text-base mt-1">
                    {card.paragraph2}
                  </p>
                )}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default ContactCard;

