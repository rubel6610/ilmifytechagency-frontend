"use client";
import {
  MapPin,
  Briefcase,
  DollarSign,
  Calendar,
} from "lucide-react";

import Image from "next/image";
import Link from "next/link";


// Applied Job Card Component
const AppliedJobCard = ({job}) => {

  return (
    <div className="group bg-white rounded-lg shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden border border-gray-100">
      {/* Card Header with Company Image */}

      {/* Card Body */}
      <div className="p-5 relative ">
        {/* Company Image */}
        <div className="mb-4">
          <Image
            width={100}
            height={100}
            src={job.company.logo}
            alt="Company Logo"
            className="w-16 h-16 rounded-lg shadow-md border-4 border-white object-cover"
          />
        </div>

        {/* Job Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-2 group-hover:text-emerald-600 transition-colors">
          {job.title}
        </h3>

        {/* Company Name */}
        <p className="text-sm font-medium text-emerald-600 mb-3">
          {job.company.name}
        </p>

        {/* Job Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin size={16} className="text-teal-500 flex-shrink-0" />
            <span className="line-clamp-1">{`${job.employmentInfo.jobLocation.city}, ${job.employmentInfo.jobLocation.district}`}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <DollarSign size={16} className="text-teal-500 flex-shrink-0" />
            <span className="font-medium text-gray-900">{job.salaryAndBenefits.salary.range}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Briefcase size={16} className="text-teal-500 flex-shrink-0" />
            <span>{job.jobType}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar size={16} className="text-teal-500 flex-shrink-0" />
            <span>Deadline: {job.jobSummary.applicationDeadline}</span>
          </div>
        </div>

        {/* Status Badge */}
        <div className="mb-4">
          <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full">
            {job.applicationStatus.charAt(0).toUpperCase() + job.applicationStatus.slice(1)}
          </span>
        </div>

        {/* View Details Button */}
        <Link href={`/dashboard/applied-jobs/${job.id}`}>
          <button className="w-full px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};
export default AppliedJobCard;
