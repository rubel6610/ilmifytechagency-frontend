"use client";

import React, { useState } from "react";
import JobCard from "./components/JobCard";
import { jobs } from "./components/JobData";


const ITEMS_PER_PAGE = 12;

const Careers = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  //  Search + Filter logic
  const filteredJobs = jobs.filter((job) => {
    const matchSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.companyInfo.address.toLowerCase().includes(search.toLowerCase()) ||
      job.companyName.toLowerCase().includes(search.toLowerCase());

    const matchFilter = filter === "All" || job.compensationAndBenefits.employmentStatus === filter || job.summary.jobStatus.toLowerCase() === filter.toLowerCase();

    return matchSearch && matchFilter;
  });

  //  Pagination logic
  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedJobs = filteredJobs.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <div className="max-w-400 mx-auto px-6 my-10  ">
      {/* 🔹 Top Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center mb-6">
        
        {/* Left */}
        <h3 className="text-primary font-semibold text-lg lg:text-2xl">
          Total Jobs <span className="text-gray-500 text-base">| {filteredJobs.length}+</span>
        </h3>

        {/* Center */}
        <input
          className="rounded-md border border-primary h-10 px-4 w-full  focus:outline-none placeholder:text-sm"
          type="search"
          placeholder="Search Vacancies"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />

        {/* Right */}
        <select
          className="rounded-md border border-primary h-10 px-4 w-full md:w-auto justify-self-end"
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="All">All Jobs</option>
          <option value="Full Time">Full Time</option>
          <option value="Part Time">Part Time</option>
          <option value="Active">Active</option>
        </select>
      </div>

      {/*  Job Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {paginatedJobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>

      {/*  Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-10">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-4 py-2 rounded-md  transition ${
                currentPage === index + 1
                  ? "bg-emerald-500 text-white"
                : "bg-gray-200 text-gray-700"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Careers;
