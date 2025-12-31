// pages/applied-jobs.jsx
"use client";
import { useState } from "react";
import AppliedJobCard from "./components/AppliedJobCard";
import { appliedJobsData } from "./components/AppliedJobData";


const AppliedJobs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Items per page

  // Filter jobs based on search query
  const filteredJobs = appliedJobsData.filter(
    (job) =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination Logic
  const indexOfLastJob = currentPage * itemsPerPage;
  const indexOfFirstJob = indexOfLastJob - itemsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Applied Jobs</h1>
      <div className="mb-6 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search by title, company, or location"
          className="rounded-md border border-primary h-10 px-4 w-1/3 focus:outline-none placeholder:text-sm"
          value={searchQuery}
          onChange={handleSearch}
        />
        <p className="text-sm text-gray-600">
          Total Applied Jobs: {filteredJobs.length}
        </p>
      </div>

      {/* Applied Jobs Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentJobs.map((job) => (
          <AppliedJobCard key={job.id} job={job} />
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center gap-3">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded-md ${
              currentPage === index + 1
                ? "bg-teal-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AppliedJobs;
