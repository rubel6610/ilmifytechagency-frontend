"use client";

import { useState } from "react";
import { HiSearch, HiOutlineBriefcase } from "react-icons/hi";
import { useGetJobsQuery, JobListItem } from "@/redux/service/jobApi";
import AppliedJobCard from "./components/AppliedJobCard";

const AppliedJobs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  
  // Fetch jobs from API
  const { data, isLoading, isError } = useGetJobsQuery({ 
    page: 1, 
    limit: 100 // Get all jobs for now, can implement server-side pagination later
  });

  const ITEMS_PER_PAGE = 8;
  const appliedJobsData: JobListItem[] = data?.data || [];

  // 🔍 Filter jobs
  const filteredJobs = appliedJobsData.filter((job) =>
    `${job.title ?? ''} ${job.location ?? ''}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase()),
  );

  // 📄 Pagination
  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);
  const currentJobs = filteredJobs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Loading jobs...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">Failed to load jobs. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans">
      {/* ===== HEADER (Same as ManageBlog) ===== */}
      <div className="max-w-400 mx-auto mb-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-100 rounded-lg">
            <HiOutlineBriefcase className="text-2xl md:text-3xl text-emerald-600" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">
              Applied Jobs
            </h1>
            <p className="text-gray-500 text-sm font-medium">
              Total{" "}
              <span className="text-emerald-600 font-bold">
                {filteredJobs.length}
              </span>{" "}
              applications
            </p>
          </div>
        </div>

        {/* ===== SEARCH ===== */}
        <div className="relative w-full md:w-64">
          <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
          <input
            type="text"
            placeholder="Search jobs..."
            className="pl-9 pr-3 py-2 w-full bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm text-sm"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      {/* ===== GRID ===== */}
      <div className="max-w-400 mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {currentJobs.length > 0 ? (
          currentJobs.map((job) => (
            <div key={job.id}>
              <AppliedJobCard job={job} />
            </div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-400">
            <p className="text-xl">No jobs found!</p>
          </div>
        )}
      </div>

      {/* ===== PAGINATION ===== */}
      {totalPages > 1 && (
        <div className="max-w-7xl mx-auto mt-8 flex justify-center gap-2">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-10 h-10 rounded-lg border font-semibold transition ${
                currentPage === i + 1
                  ? "bg-emerald-500 text-white"
                  : "bg-white text-gray-600 hover:border-emerald-500"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppliedJobs;
