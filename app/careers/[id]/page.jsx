"use client";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { 
  MdDoNotDisturbAlt, 
  MdOutlineHourglassEmpty, 
  MdLocationOn, 
  MdWork, 
  MdEvent 
} from "react-icons/md";
import { FiCheckCircle, FiClock, FiUsers, FiTarget } from "react-icons/fi";
import ApplyJobForm from "./components/ApplyJobForm";
import { useEffect, useState } from "react";
import Image from "next/image";

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
        // Matching by slug or id
        const singleJob = data.find((j) => j.slug === params?.id || String(j.id) === String(params?.id));
        setJob(singleJob);
      } catch (error) {
        console.error("Error fetching job:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [params?.id]);

  if (loading) return (
    <div className="flex flex-col h-screen items-center justify-center space-y-4">
      <MdOutlineHourglassEmpty className="animate-spin text-5xl text-[#0ddaa0]" />
      <p className="text-gray-500 animate-pulse">Loading Job Details...</p>
    </div>
  );

  if (!job) return (
    <div className="text-center py-40 font-bold text-red-500">
      <MdDoNotDisturbAlt className="mx-auto text-6xl mb-4" /> 
      <h2 className="text-2xl">Job Not Found</h2>
    </div>
  );

  const sectionVariant = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

  return (
    <motion.div 
      initial="hidden" 
      animate="visible" 
      className="mx-auto mt-32 p-4 sm:p-6 md:p-10 max-w-400 rounded-3xl my-20 bg-white shadow-2xl border border-gray-100"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* LEFT SIDE: 8 Columns */}
        <div className="lg:col-span-8">
          
          {/* 1. Header Section */}
          <div className="flex flex-col md:flex-row items-center gap-6 mb-10 pb-8 border-b border-gray-100">
            <Image width={100} height={100} 
              src={job.company.logo} 
              alt={job.company.name} 
              className="w-20 h-20 rounded-2xl object-cover shadow-lg border-2 border-gray-50"
            />
            <div>
              <h1 className="text-2xl text-center md:text-4xl font-extrabold text-gray-900 leading-tight">
                {job.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 mt-2 text-gray-500 font-medium">
                <span className="flex items-center  gap-1 text-[#0ddaa0]"><MdWork /> {job.company.name}</span>
                <span className="flex items-center gap-1"><MdLocationOn /> {job.employmentInfo.jobLocation.city}, {job.employmentInfo.jobLocation.district}</span>
                <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-bold uppercase">{job.jobType}</span>
              </div>
            </div>
          </div>

          {/* 2. Job Summary Grid */}
          <motion.div variants={sectionVariant} className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10 items-center">
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <p className="text-[10px] uppercase text-gray-400 font-bold mb-1">Salary Range</p>
              <p className="text-[13px] md:text-sm font-bold text-gray-800">{job.salaryAndBenefits.salary.range}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <p className="text-[10px] uppercase text-gray-400 font-bold mb-1">Experience</p>
              <p className="text-sm font-bold text-gray-800">{job.jobSummary.experienceRequired}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <p className="text-[10px] uppercase text-gray-400 font-bold mb-1">Vacancy</p>
              <p className="text-sm font-bold text-gray-800">{job.vacancy} Positions</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <p className="text-[10px] uppercase text-gray-400 font-bold mb-1">Deadline</p>
              <p className="text-sm font-bold text-red-500">{job.jobSummary.applicationDeadline}</p>
            </div>
          </motion.div>

          {/* 3. Skills & Expertise */}
          <motion.div variants={sectionVariant} className="mb-10">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#0ddaa0] rounded-full"></span> Skills & Expertise
            </h3>
            <div className="flex flex-wrap gap-2">
              {job.skillsAndExpertise.map((skill, i) => (
                <span key={i} className="px-4 py-2 bg-[#0ddaa0]/5 text-[#008a61] rounded-xl text-sm font-bold border border-[#0ddaa0]/10">
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>

              {/* 5. Detailed Requirements */}
          <motion.div variants={sectionVariant} className="mb-10 p-6 bg-[#f8fdfb] rounded-3xl border border-[#0ddaa0]/10">
           <h3 className="text-xl font-bold mb-4">Job Overview</h3>
            <p className="text-gray-600 leading-relaxed mb-6">{job.jobDescription.overview}</p>
            <h3 className="text-xl font-bold mb-4">Requirements</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-bold text-gray-800 mb-2">Mandatory Skills</p>
                <p className="text-sm text-gray-600 italic">{job.jobDescription.requirements.mandatorySkills.join(" • ")}</p>
              </div>
              <div>
                <p className="text-sm font-bold text-gray-800 mb-2">Education</p>
                <p className="text-sm text-gray-600">{job.jobDescription.requirements.education}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-bold text-[#0ddaa0] uppercase mb-1">Nice to have</p>
                  <p className="text-sm text-gray-600">{job.jobDescription.requirements.niceToHave.join(", ")}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 4. Description & Responsibilities */}
          <motion.div variants={sectionVariant} className="mb-10">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
               <span className="w-1.5 h-6 bg-[#0ddaa0] rounded-full"> </span> Key Responsibilities
               </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {job.jobDescription.responsibilities.map((item, i) => (
                <li key={i} className="flex gap-3 text-gray-600 text-sm leading-relaxed">
                  <FiCheckCircle className="text-[#0ddaa0] shrink-0 mt-1" /> {item}
                </li>
              ))}
            </ul>
          </motion.div>

      

          {/* 6. Compensation & Company Culture */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <motion.div variants={sectionVariant}>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2"> 
                 <span className="w-1.5 h-6 bg-[#0ddaa0] rounded-full"></span>  Benefits</h3>
              <ul className="space-y-2">
                {job.salaryAndBenefits.bonuses.map((bonus, i) => <li key={i} className="text-sm text-gray-600 flex items-center gap-2">💰 {bonus}</li>)}
                {job.salaryAndBenefits.additionalBenefits.map((benefit, i) => <li key={i} className="text-sm text-gray-600 flex items-center gap-2">✨ {benefit}</li>)}
              </ul>
            </motion.div>
            {/* company mission */}
            {/* <motion.div variants={sectionVariant}>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><FiTarget className="text-[#0ddaa0]" /> Company Mission</h3>
              <p className="text-sm text-gray-600 italic leading-relaxed border-l-4 border-gray-100 pl-4">
                {job.company.mission}
              </p>
            </motion.div> */}
 {/* Quick Employment Info Card */}
            <div className="  ">
              <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                 <span className="w-1.5 h-6 bg-[#0ddaa0] rounded-full"></span>  Employment Details</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <FiClock className="text-[#0ddaa0]" />
                  <div>
                    <p className="text-gray-400 text-sm font-bold uppercase">Working Hours</p>
                    <p className="text-gray-700 font-bold">{job.employmentInfo.workingHours}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MdEvent className="text-[#0ddaa0]" />
                  <div>
                    <p className="text-gray-400 text-[10px] font-bold uppercase">Office Days</p>
                    <p className="text-gray-700 font-semibold">{job.employmentInfo.officeDays}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <FiUsers className="text-[#0ddaa0]" />
                  <div>
                    <p className="text-gray-400 text-[10px] font-bold uppercase">Workplace Type</p>
                    <p className="text-gray-700 font-semibold">{job.employmentInfo.workplaceType}</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT SIDE: 4 Columns (Sidebar) */}
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-42 space-y-6">
            
            {/* The Application/Quiz Form */}
            <ApplyJobForm job={job} />

            {/* Support Info */}
            <div className="text-center">
              <p className="text-xs text-gray-400">Questions about this role?</p>
              <a href={`mailto:${job.company.email}`} className="text-[#0ddaa0] text-sm font-bold hover:underline">
                {job.company.email}
              </a>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default JobDetails;