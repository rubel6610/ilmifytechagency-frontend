"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  MapPin,
  Clock,
  Calendar,
  DollarSign,
  Users,
  Building,
  TrendingUp,
} from "lucide-react";
import Image from "next/image";

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
  // Get job status color
  const getJobStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      case "closed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

 
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="group"
    >
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1  flex flex-col">
        {/* Card Header */}
        <div className="p-5 md:p-6 flex-1">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-start space-x-3">
              <motion.div
                className="w-12 h-12 md:w-14 md:h-14 rounded-lg bg-linear-to-br from-emerald-100 to-teal-100 flex items-center justify-center overflow-hidden border border-emerald-200"
                whileHover={{ rotate: 5, scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                {job.companyImage ? (
                  <Image
                    height={150}
                    width={150}
                    src={job.companyImage}
                    alt={job.companyName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Building className="text-emerald-600" size={24} />
                )}
              </motion.div>
              <div>
                <motion.h3
                  className="font-bold text-lg md:text-xl text-gray-800 group-hover:text-emerald-600 transition-colors line-clamp-1"
                  whileHover={{ scale: 1.02 }}
                >
                  {job.title}
                </motion.h3>
                <p className="text-emerald-600 font-medium text-sm md:text-base">
                  {job.companyName}
                </p>
              </div>
            </div>
          </div>

          {/* Job Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            <motion.span
              whileHover={{ scale: 1.05 }}
              className={`px-3 py-1 rounded-full text-xs font-medium bg-emerald-300`}
            >
              {job.compensationAndBenefits.employmentStatus}
            </motion.span>
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
            >
              {job.summary.experience}
            </motion.span>
            <motion.span
              whileHover={{ scale: 1.05 }}
              className={`px-3 py-1 rounded-full text-xs font-medium ${getJobStatusColor(
                job.summary.jobStatus
              )}`}
            >
              {job.summary.jobStatus?.toUpperCase()}
            </motion.span>
            {job.compensationAndBenefits.workplace && (
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
              >
                {job.compensationAndBenefits.workplace}
              </motion.span>
            )}
          </div>

          {/* Job Details Grid */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <motion.div
              className="flex items-center text-gray-600"
              whileHover={{ x: 4 }}
            >
              <MapPin size={16} className="mr-2 text-gray-400 shrink-0" />
              <span className="text-sm truncate">{job.summary.location}</span>
            </motion.div>

            <motion.div
              className="flex items-center text-gray-600"
              whileHover={{ x: 4 }}
            >
              <span className="mr-2 text-gray-400 shrink-0 text-sm">
                &#x09F3;
              </span>
              <span className="text-sm font-medium text-gray-800">
              {job.summary.salary}
              </span>
            </motion.div>

            <motion.div
              className="flex items-center text-gray-600"
              whileHover={{ x: 4 }}
            >
              <Users size={16} className="mr-2 text-gray-400 shrink-0" />
              <span className="text-sm">Vacancy: {job.summary.vacancy}</span>
            </motion.div>

            <motion.div
              className="flex items-center text-gray-600"
              whileHover={{ x: 4 }}
            >
              <Calendar size={16} className="mr-2 text-gray-400 shrink-0" />
              <span className="text-sm">Deadline: {job.deadline}</span>
            </motion.div>
          </div>

          {/* Age Requirement */}
          {job.summary.age && (
            <div className="mb-4">
              <div className="flex items-center text-gray-600">
                <Clock size={16} className="mr-2 text-gray-400" />
                <span className="text-sm">Age: {job.summary.age}</span>
              </div>
            </div>
          )}

          {/* Skills Preview */}
          {job.skillsAndExpertise && job.skillsAndExpertise.length > 0 && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {job.skillsAndExpertise.slice(0, 2).map((skill, index) => (
                  <motion.span
                    key={index}
                    whileHover={{ scale: 1.1 }}
                    className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs"
                  >
                    {skill}
                  </motion.span>
                ))}
                {job.skillsAndExpertise.length > 3 && (
                  <motion.span
                    whileHover={{ scale: 1.1 }}
                    className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs"
                  >
                    +{job.skillsAndExpertise.length - 3} more
                  </motion.span>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between items-center pt-4 border-t border-gray-100 mt-auto">
            <div className="flex items-center text-sm text-gray-500">
              <TrendingUp size={14} className="mr-1" />
              <span>Posted {job.summary.published}</span>
            </div>
            <div className="flex space-x-2">
              <motion.div whileHover={{ x: -4 }}>
                <Link
                  href={`/careers/${job.id}`}
                  className="px-4 py-2 border border-emerald-500 text-emerald-600 hover:bg-emerald-500 hover:text-white rounded-lg font-medium text-sm transition-colors inline-flex items-center"
                >
                  View Details
                </Link>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Hover Effect Line */}
        <motion.div
          className="h-1 bg-linear-to-r from-emerald-500 to-teal-500"
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
};

export default JobCard;
