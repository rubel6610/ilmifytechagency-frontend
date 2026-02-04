"use client";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  MdDoNotDisturbAlt,
  MdOutlineHourglassEmpty,
  MdLocationOn,
  MdWork,
  MdEvent,
} from "react-icons/md";
import { FiCheckCircle, FiClock, FiUsers } from "react-icons/fi";
import Image from "next/image";
import ApplyJobForm from "./components/ApplyJobForm";
import { useGetJobByIdQuery } from "@/redux/service/jobApi";

const JobDetails = () => {
  const { id } = useParams();
  const {
    data: response,
    isLoading,
    isError,
  } = useGetJobByIdQuery(id as string);

  const job = response?.data;

  /* -------------------- LOADING -------------------- */
  if (isLoading) {
    return (
      <div className="flex flex-col h-screen items-center justify-center space-y-4">
        <MdOutlineHourglassEmpty className="animate-spin text-5xl text-[#0ddaa0]" />
        <p className="text-gray-500 animate-pulse">Loading Job Details...</p>
      </div>
    );
  }

  /* -------------------- ERROR -------------------- */
  if (isError || !job) {
    return (
      <div className="text-center py-40 font-bold text-red-500">
        <MdDoNotDisturbAlt className="mx-auto text-6xl mb-4" />
        <h2 className="text-2xl">Job Not Found</h2>
      </div>
    );
  }

  const sectionVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="mx-auto mt-32 p-4 sm:p-6 md:p-10 max-w-400 rounded-3xl my-20 bg-white shadow-2xl border border-gray-100"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* LEFT SIDE */}
        <div className="lg:col-span-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-center gap-6 mb-10 pb-8 border-b">
            <Image
              src={job.thumbnail || "/default-job-thumbnail.png"}
              alt={job.title}
              width={100}
              height={100}
              className="w-20 h-20 rounded-2xl object-cover shadow-lg"
            />

            <div>
              <h1 className="text-2xl md:text-4xl font-extrabold">
                {job.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 mt-2 text-gray-500">
                <span className="flex items-center gap-1 text-[#0ddaa0]">
                  <MdWork /> {job.employmentType}
                </span>

                <span className="flex items-center gap-1">
                  <MdLocationOn /> {job.location}
                </span>

                <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-bold uppercase">
                  {job.jobType}
                </span>
              </div>
            </div>
          </div>

          {/* Summary */}
          <motion.div
            variants={sectionVariant}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10"
          >
            <SummaryCard label="Salary Range" value={job.salary} />
            <SummaryCard label="Experience" value={job.experience} />
            <SummaryCard label="Vacancy" value={`${job.vacancy} Positions`} />
            <SummaryCard
              label="Deadline"
              value={job.applicationDeadline ? new Date(job.applicationDeadline).toLocaleDateString() : "Open"}
              highlight
            />
          </motion.div>

          {/* Skills */}
          <Section title="Skills & Expertise">
            <div className="flex flex-wrap gap-2">
              {job.mandatorySkills.map((skill: string) => (
                <SkillBadge key={skill} label={skill} />
              ))}
              {job.niceToHave.map((skill: string) => (
                <SkillBadge key={skill} label={skill} />
              ))}
            </div>
          </Section>

          {/* Overview */}
          <Section title="Job Overview">
            <p className="text-gray-600">{job.overview}</p>
          </Section>

          {/* Responsibilities */}
          <Section title="Key Responsibilities">
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {job.responsibilities.map((item: string, i: number) => (
                <li key={i} className="flex gap-2 text-sm text-gray-600">
                  <FiCheckCircle className="text-[#0ddaa0] mt-1" />
                  {item}
                </li>
              ))}
            </ul>
          </Section>

          {/* Benefits */}
          <Section title="Benefits">
            <ul className="space-y-2">
              {job.benefits.map((benefit: string) => (
                <li key={benefit} className="text-sm text-gray-600">
                  ✨ {benefit}
                </li>
              ))}
            </ul>
          </Section>

          {/* Employment Info */}
          <Section title="Employment Details">
            <InfoRow
              icon={<FiClock />}
              label="Working Hours"
              value={job.workingHours}
            />
            <InfoRow
              icon={<MdEvent />}
              label="Office Days"
              value={job.officeDays}
            />
            <InfoRow
              icon={<FiUsers />}
              label="Work Mode"
              value={job.workMode}
            />
          </Section>
        </div>

        {/* RIGHT SIDE */}
        <div className="lg:col-span-4">
          <div className="sticky top-32 self-start">
            <ApplyJobForm job={job} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default JobDetails;

/* -------------------- SMALL COMPONENTS -------------------- */

const Section = ({ title, children }: any) => (
  <motion.div className="mb-10">
    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
      <span className="w-1.5 h-6 bg-[#0ddaa0] rounded-full" />
      {title}
    </h3>
    {children}
  </motion.div>
);

const SummaryCard = ({ label, value, highlight }: any) => (
  <div className="p-4 bg-gray-50 rounded-2xl border">
    <p className="text-[10px] uppercase text-gray-400 font-bold mb-1">
      {label}
    </p>
    <p
      className={`text-sm font-bold ${
        highlight ? "text-red-500" : "text-gray-800"
      }`}
    >
      {value}
    </p>
  </div>
);

const SkillBadge = ({ label }: any) => (
  <span className="px-4 py-2 bg-[#0ddaa0]/5 text-[#008a61] rounded-xl text-sm font-bold border border-[#0ddaa0]/10">
    {label}
  </span>
);

const InfoRow = ({ icon, label, value }: any) => (
  <div className="flex items-center gap-3 text-sm mb-3">
    <span className="text-[#0ddaa0]">{icon}</span>
    <div>
      <p className="text-gray-400 text-xs font-bold uppercase">{label}</p>
      <p className="text-gray-700 font-semibold">{value}</p>
    </div>
  </div>
);
