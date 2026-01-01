"use client";
import { useParams } from "next/navigation";
import { motion } from "motion/react";
import { jobs } from "../components/JobData";
import { MdDoNotDisturbAlt } from "react-icons/md";


const JobDetails = () => {
  const params = useParams();
  const job = jobs.find((j) => j.id === params.id);

  if (!job) {
    return  <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      className="flex flex-col items-center justify-center p-8 rounded-xl bg-linear-to-r from-red-100 to-red-200 shadow-lg text-center space-y-4"
    >
      <motion.div
        animate={{ rotate: [0, 10, -10, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="text-6xl"
      >
       <MdDoNotDisturbAlt />
      </motion.div>
      <h2 className="text-2xl font-bold text-red-700">No Jobs Found</h2>
      <p className="text-gray-600">
        We couldn’t find any jobs matching your search or filters. Try adjusting your search criteria.
      </p>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="mt-4 px-6 py-2 bg-red-500 text-white font-semibold rounded-md shadow hover:bg-red-600 transition"
        onClick={() => window.location.reload()}
      >
        Refresh
      </motion.button>
    </motion.div>
  }

  // Motion variants for sections
  const sectionVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const listItemVariant = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1 },
    }),
  };

  return (
 
      <motion.div
      className="mx-auto p-4 sm:p-6 md:p-8  max-w-400  rounded-2xl md:my-10"
      style={{ backgroundColor: "#f4f9f9" }}
      initial="hidden"
      animate="visible"
    >
      {/* Company Section */}
      <motion.div className="flex flex-col sm:flex-row items-center mb-6" variants={sectionVariant}>
        {job.companyImage && (
          <motion.img
            src={job.companyImage}
            alt={job.companyName}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-[#0ddaa0] mb-2 sm:mb-0 sm:mr-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          />
        )}
        <motion.h1
          className="text-2xl sm:text-3xl font-bold text-gray-800 text-center sm:text-left"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {job.companyName}
        </motion.h1>
      </motion.div>

      {/* Deadline & Apply */}
      <motion.div className="flex flex-col sm:flex-row justify-between items-center mb-8" variants={sectionVariant}>
        <motion.p
          className="text-gray-700 font-medium mb-2 sm:mb-0"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="font-bold">Application Deadline:</span> {job.deadline}
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.05, backgroundColor: "#8ce064" }}
          whileTap={{ scale: 0.95 }}
          className="bg-linear-to-r from-[#86e062] to-[#00c389] text-white px-6 py-2 rounded-lg font-medium shadow-lg hover:shadow-xl transition-colors"
        >
          Apply Now
        </motion.button>
      </motion.div>

      {/* Summary */}
      <motion.div variants={sectionVariant} className="mb-8">
        <motion.h2
          className="text-xl sm:text-2xl font-semibold mb-4 text-[#0ddaa0]"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Summary
        </motion.h2>
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-gray-700">
          {Object.entries(job.summary).map(([key, value], i) => (
            <motion.p
              key={key}
              custom={i}
              variants={listItemVariant}
              initial="hidden"
              animate="visible"
            >
              <span className="font-bold capitalize">{key}:</span> {value}
            </motion.p>
          ))}
        </motion.div>
      </motion.div>

      {/* Requirements */}
      <motion.div className="mt-8 mb-8" variants={sectionVariant}>
        <motion.h2 className="text-xl sm:text-2xl font-semibold mb-4 text-[#8ce064]">
          Requirements
        </motion.h2>
        <motion.div
          className="text-gray-700 space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p>
            <span className="font-bold">Education:</span> {job.requirements.education}
          </p>
          <p>
            <span className="font-bold">Experience:</span> {job.requirements.experience}
          </p>
          <p>
            <span className="font-bold">Business Areas:</span>{" "}
            {job.requirements.businessAreas.join(", ")}
          </p>
          {job.requirements.freshers && <p>Freshers are encouraged to apply.</p>}
          <p>{job.requirements.additional}</p>
        </motion.div>
      </motion.div>

      {/* Responsibilities */}
      <motion.div className="mt-8 mb-8" variants={sectionVariant}>
        <motion.h2 className="text-xl sm:text-2xl font-semibold mb-4 text-[#0ddaa0]">
          Responsibilities
        </motion.h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          {job.responsibilities.map((item, i) => (
            <motion.li
              key={i}
              custom={i}
              variants={listItemVariant}
              initial="hidden"
              animate="visible"
            >
              {item}
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* Skills & Expertise */}
      <motion.div className="mt-8 mb-8" variants={sectionVariant}>
        <motion.h2 className="text-xl sm:text-2xl font-semibold mb-4 text-[#8ce064]">
          Skills & Expertise
        </motion.h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          {job.skillsAndExpertise.map((skill, i) => (
            <motion.li
              key={i}
              custom={i}
              variants={listItemVariant}
              initial="hidden"
              animate="visible"
            >
              {skill}
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* Compensation & Benefits */}
      <motion.div className="mt-8 mb-8" variants={sectionVariant}>
        <motion.h2 className="text-xl sm:text-2xl font-semibold mb-4 text-[#0ddaa0]">
          Compensation & Benefits
        </motion.h2>
        <motion.div
          className="text-gray-700 space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <p>
            <span className="font-bold">Workplace:</span> {job.compensationAndBenefits.workplace}
          </p>
          <p>
            <span className="font-bold">Employment Status:</span>{" "}
            {job.compensationAndBenefits.employmentStatus}
          </p>
          <p>
            <span className="font-bold">Gender:</span> {job.compensationAndBenefits.gender}
          </p>
          <p>
            <span className="font-bold">Job Location:</span> {job.compensationAndBenefits.jobLocation}
          </p>
        </motion.div>
      </motion.div>

      {/* Company Info */}
      <motion.div className="mt-8 mb-8" variants={sectionVariant}>
        <motion.h2 className="text-xl sm:text-2xl font-semibold mb-4 text-[#8ce064]">
          Company Information
        </motion.h2>
        <motion.div
          className="text-gray-700 space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <p>
            <span className="font-bold">Company Name:</span> {job.companyInfo.name}
          </p>
          <p>
            <span className="font-bold">Address:</span> {job.companyInfo.address}
          </p>
          <p>
            <span className="font-bold">Business:</span> {job.companyInfo.business}
          </p>
        </motion.div>
      </motion.div>
    </motion.div>

    
  );
};

export default JobDetails;
