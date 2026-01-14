"use client";
import { motion } from "motion/react";
import {appliedJobsData as jobs} from "../components/AppliedJobData";
import { MdLocationOn } from "react-icons/md"; // Location icon
import { FaCheckCircle } from "react-icons/fa"; // Applied check icon
import Image from "next/image"; // For the company image
import { useParams } from "next/navigation";

const AppliedJobs = () => {
  const params = useParams();
  const job  = jobs.find(job=>job.id == params.id); // For demonstration, using the first job
  return (
    <div className="max-w-7xl mx-auto p-6 lg:px-12">
      {/* Grid Layout for Job Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
       
          <motion.div
           
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-lg shadow-lg p-6 flex flex-col"
          >
            {/* Company Image and Info */}
            <div className="flex items-center mb-4">
              <Image
                height={150}
                width={150}
                src={job.companyImage}
                alt={job.companyName}
                className="w-16 h-16 rounded-full object-cover mr-4"
              />
              <div>
                <h4 className="text-lg font-bold text-gray-800">{job.companyName}</h4>
                <p className="text-sm text-gray-600">{job.title}</p>
              </div>
            </div>

            {/* Job Details */}
            <div className="flex flex-col space-y-3 mb-4">
              <div className="flex items-center gap-2">
                <MdLocationOn className="text-[#0ddaa0]" />
                <span className="text-sm text-gray-700">{job.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-700">Salary:</span>
                <span className="text-sm text-gray-600">{job.salary}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-700">Deadline:</span>
                <span className="text-sm text-gray-600">{job.deadline}</span>
              </div>
            </div>

            {/* Status and Apply Button */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-between mt-auto"
            >
              {job.status === "Applied" ? (
                <div className="flex items-center text-[#8ce064] gap-2">
                  <FaCheckCircle className="text-xl" />
                  <span className="text-sm">Applied</span>
                </div>
              ) : (
                <button className="bg-[#0ddaa0] text-white px-4 py-2 rounded-lg">
                  Apply Now
                </button>
              )}
            </motion.div>
          </motion.div>
       
      </div>
    </div>
  );
};

export default AppliedJobs;
