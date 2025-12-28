"use client";
import Link from "next/link";
import { TbLocationFilled } from "react-icons/tb";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const JobCard = ({ job }) => {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{
        y: -8,
        scale: 1.02,
        boxShadow: "0px 10px 40px rgba(0,0,0,0.12)",
      }}
      className="bg-gray-100 border border-gray-200 rounded-xl p-5 transition-all duration-300 flex flex-col justify-between h-full cursor-pointer"
    >
      {/* Top */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
          {job.title}
        </h3>
      
        <p className="text-sm text-gray-600 font-medium">
          {job.companyName}
        </p>

        <motion.p
          whileHover={{ x: 4 }}
          transition={{ duration: 0.3 }}
          className="text-sm text-gray-500 flex items-center gap-1"
        >
          <TbLocationFilled className="text-primary" />
          {job.summary.location}
        </motion.p>
      </div>

      {/* Middle */}
      <div className="flex flex-wrap gap-2 mt-4">
        <motion.span
          whileHover={{ scale: 1.08 }}
          className="text-sm px-3 py-1 rounded-full bg-blue-50 text-blue-600"
        >
          {job.compensationAndBenefits.employmentStatus}
        </motion.span>

        <motion.span
          whileHover={{ scale: 1.08 }}
          className="text-sm px-3 py-1 rounded-full bg-green-50 text-green-600"
        >
          {job.summary.salary}
        </motion.span>
      </div>

      {/* Bottom */}
      <div className="mt-5 flex items-center justify-between">
        <p className="text-xs text-gray-400">
          Deadline: {job.deadline}
        </p>

        <motion.div whileHover={{ x: 6 }}>
          <Link
            href={`careers/${job.id}`}
            className="text-sm font-medium text-primary"
          >
            View Details →
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default JobCard;
