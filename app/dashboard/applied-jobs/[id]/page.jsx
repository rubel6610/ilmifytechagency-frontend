"use client";

import {
  MapPin,
  DollarSign,
  Briefcase,
  Clock,
  Calendar,
  FileText,
  User,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const JobDetailsPage = () => {
  const params = useParams();
  const [appliedJobsData, setAppliedJobsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/appliedjob.json")
      .then((res) => res.json())
      .then((data) => {
        setAppliedJobsData(data);
        setLoading(false);
      })
      .catch((err) => console.error("Failed to load jobs.json", err));
  }, []);

  const jobId = params.id;
  const job = appliedJobsData.find((j) => j.id === jobId);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold text-gray-500">Job not found</p>
      </div>
    );
  }

  return (
    <div data-lenis-prevent className="min-h-screen bg-gray-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-400 mx-auto overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-6">
          <h1 className="text-2xl font-bold text-white">{job.title}</h1>
          <p className="text-emerald-100">{job.company.name}</p>
        </div>

        {/* Body */}
        <div className="p-6 space-y-2">
          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-4">
            <Info
              icon={MapPin}
              label="Location"
              value={`${job.employmentInfo.jobLocation.city}, ${job.employmentInfo.jobLocation.district}, ${job.employmentInfo.jobLocation.country}`}
            />
            <Info
              icon={DollarSign}
              label="Salary"
              value={`${job.salaryAndBenefits.salary.range} ${job.salaryAndBenefits.salary.type}`}
            />
            <Info icon={Briefcase} label="Job Type" value={job.jobType} />
            <Info icon={Clock} label="Experience" value={job.jobSummary.experienceRequired} />
            <Info
              icon={Calendar}
              label="Published On"
              value={new Date(job.jobSummary.publishedDate).toLocaleDateString()}
            />
            <Info
              icon={Calendar}
              label="Deadline"
              value={new Date(job.jobSummary.applicationDeadline).toLocaleDateString()}
            />
          </div>

          {/* Description */}
          <Section icon={FileText} title="About the Position">
            {job.jobDescription.overview}
          </Section>

          {/* Responsibilities */}
          <Section icon={Briefcase} title="Responsibilities">
            <ul className="list-disc ml-5">
              {job.jobDescription.responsibilities.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </Section>

          {/* Requirements */}
          <Section icon={User} title="Requirements">
            <ul className="list-disc  ml-5">
              <li>Education: {job.jobDescription.requirements.education}</li>
              <li>Experience: {job.jobDescription.requirements.experience}</li>
              <li>
                Mandatory Skills:{" "}
                {job.jobDescription.requirements.mandatorySkills.join(", ")}
              </li>
              <li>
                Additional Skills:{" "}
                {job.jobDescription.requirements.additionalSkills.join(", ")}
              </li>
              <li>
                Nice to Have: {job.jobDescription.requirements.niceToHave.join(", ")}
              </li>
            </ul>
          </Section>

          {/* Application Status */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
            <p className="text-sm font-semibold text-gray-600">Application Status</p>
            <span className="inline-block mt-3 px-4 py-2 bg-emerald-100 text-emerald-700 font-semibold rounded-lg">
              {job.applicationStatus}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;

/* ---------------- HELPERS ---------------- */

const Info = ({ icon: Icon, label, value }) => (
  <div className="bg-emerald-50 rounded-lg p-4 border">
    <div className="flex items-center gap-2 mb-1">
      <Icon size={18} className="text-emerald-600" />
      <span className="text-sm font-semibold text-gray-600">{label}</span>
    </div>
    <p className="font-medium">{value}</p>
  </div>
);

const Section = ({ icon: Icon, title, children }) => (
  <div>
    <h3 className="flex items-center gap-2 text-lg font-bold mb-2">
      <Icon size={20} className="text-emerald-600" />
      {title}
    </h3>
    <div className="text-gray-700">{children}</div>
  </div>
);
