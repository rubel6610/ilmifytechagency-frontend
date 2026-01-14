"use client";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion"; // Note: 'motion/react' works, but 'framer-motion' is the standard import
import { MdDoNotDisturbAlt, MdOutlineHourglassEmpty } from "react-icons/md";
import ApplyJobForm from "./components/ApplyJobForm";
import { useEffect, useState } from "react";

const JobDetails = () => {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch("/jobs.json");
        const data = await res.json();
        // Ensure ID comparison is safe by converting both to Strings
        const singleJob = data.find((j) => String(j.id) === String(params?.id));
        setJob(singleJob);
      } catch (error) {
        console.error("Error fetching job:", error);
      } finally {
        setLoading(false);
      }
    };

    if (params?.id) {
      fetchData();
    }
  }, [params?.id]);

  // 1. Loading State
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="text-5xl text-[#0ddaa0]"
        >
          <MdOutlineHourglassEmpty />
        </motion.div>
        <p className="mt-4 text-gray-500 font-medium">Loading job details...</p>
      </div>
    );
  }

  // 2. Not Found State (Only shows after loading is finished)
  if (!job) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center mx-auto my-40 p-8 max-w-lg rounded-xl bg-red-50 border border-red-200 shadow-lg text-center space-y-4"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-6xl text-red-500"
        >
          <MdDoNotDisturbAlt />
        </motion.div>
        <h2 className="text-2xl font-bold text-red-700">Job Not Found</h2>
        <p className="text-gray-600">
          We couldn’t find the job you’re looking for. It may have expired or the link is incorrect.
        </p>
        <button
          className="mt-4 px-6 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition"
          onClick={() => window.history.back()}
        >
          Go Back
        </button>
      </motion.div>
    );
  }

  // Animation Variants
  const sectionVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const listItemVariant = {
    hidden: { opacity: 0, x: -10 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.05 },
    }),
  };

  return (
    <motion.div
      className="mx-auto mt-35 p-4 sm:p-6 md:p-10 max-w-400 rounded-2xl my-28 bg-white shadow-xl border border-gray-100"
      initial="hidden"
      animate="visible"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* LEFT SIDE: Content */}
        <div className="lg:col-span-2">
          {/* Company Header */}
          <motion.div className="flex flex-col sm:flex-row items-center mb-8" variants={sectionVariant}>
            {job.companyImage && (
              <motion.img
                src={job.companyImage}
                alt={job.companyName}
                className="w-24 h-24 rounded-2xl object-cover border-4 border-[#0ddaa0]/20 mb-4 sm:mb-0 sm:mr-6 shadow-md"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              />
            )}
            <div className="text-center sm:text-left">
              <h1 className="text-3xl font-extrabold text-gray-900">{job.title}</h1>
              <p className="text-xl text-[#0ddaa0] font-semibold">{job.companyName}</p>
            </div>
          </motion.div>

          <hr className="mb-8 border-gray-100" />

          {/* Summary Section */}
          <motion.div variants={sectionVariant} className="mb-10">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
              <span className="w-2 h-8 bg-[#0ddaa0] rounded-full"></span>
              Job Summary
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-xl">
              {Object.entries(job.summary || {}).map(([key, value], i) => (
                <motion.div key={key} custom={i} variants={listItemVariant} initial="hidden" animate="visible">
                  <span className="block text-xs uppercase tracking-wider text-gray-400 font-bold">{key}</span>
                  <span className="text-gray-700 font-medium">{String(value)}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Requirements */}
          <motion.div className="mb-10" variants={sectionVariant}>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Requirements</h2>
            <div className="text-gray-700 space-y-3 leading-relaxed">
              <p><b className="text-gray-900">Education:</b> {job.requirements?.education}</p>
              <p><b className="text-gray-900">Experience:</b> {job.requirements?.experience}</p>
              <p><b className="text-gray-900">Business Areas:</b> {job.requirements?.businessAreas?.join(", ")}</p>
              {job.requirements?.freshers && (
                <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">
                  Freshers Welcome
                </span>
              )}
            </div>
          </motion.div>

          {/* Responsibilities */}
          <motion.div className="mb-10" variants={sectionVariant}>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Responsibilities</h2>
            <ul className="space-y-3">
              {job.responsibilities?.map((item, i) => (
                <motion.li 
                  key={i} custom={i} variants={listItemVariant} 
                  className="flex items-start gap-3 text-gray-700"
                >
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-[#0ddaa0] shrink-0" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Benefits */}
          <motion.div className="mb-10" variants={sectionVariant}>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Compensation & Benefits</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
              <p><b>Workplace:</b> {job.compensationAndBenefits?.workplace}</p>
              <p><b>Status:</b> {job.compensationAndBenefits?.employmentStatus}</p>
              <p><b>Location:</b> {job.compensationAndBenefits?.jobLocation}</p>
            </div>
          </motion.div>
        </div>

        {/* RIGHT SIDE: Sticky Form */}
        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-28">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <ApplyJobForm job={job} isInline={true} />
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <p className="text-sm text-blue-800">
                  <b>Deadline:</b> {job.deadline}
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  Make sure to submit your application before the closing date.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default JobDetails;