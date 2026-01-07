"use client";

import React, { useState } from "react";
import JobCard from "./components/JobCard";
import { jobs } from "./components/JobData";
import PageWrapper from "../component/PageWrapper";
import CountUp from "react-countup";
import JobFilters from "./components/JobFilters";
import {
  Search,
  MapPin,
  Briefcase,
  Clock,
  Users,
  Building,
} from "lucide-react";

const ITEMS_PER_PAGE = 10;

const Careers = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [locationFilter, setLocationFilter] = useState("All");
  const [salaryFilter, setSalaryFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  // Locations
  const locations = [
    "All",
    ...new Set(jobs.map((job) => job.summary.location)),
  ];

  // Filter logic
  const filteredJobs = jobs.filter((job) => {
    const matchSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.companyName.toLowerCase().includes(search.toLowerCase()) ||
      job.companyInfo.address.toLowerCase().includes(search.toLowerCase());

    const matchJobType =
      filter === "All" ||
      job.compensationAndBenefits.employmentStatus === filter ||
      (filter === "Remote" &&
        job.summary.location.toLowerCase().includes("remote"));

    const getSalaryValue = (salary) => {
      if (!salary || salary === "Negotiable") return null;
      if (salary.includes("-")) return Number(salary.split("-")[1]);
      return Number(salary);
    };

    const salaryValue = getSalaryValue(job.summary.salary);

    const matchSalary =
      salaryFilter === "All" ||
      (salaryFilter === "High" && salaryValue > 80000) ||
      (salaryFilter === "Medium" &&
        salaryValue >= 50000 &&
        salaryValue <= 80000) ||
      (salaryFilter === "Low" && salaryValue < 50000);

    const matchLocation =
      locationFilter === "All" || job.summary.location === locationFilter;

    return matchSearch && matchJobType && matchSalary && matchLocation;
  });

  // Pagination
  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedJobs = filteredJobs.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  // Stats
  const stats = {
    total: jobs.length,
    fullTime: jobs.filter(
      (j) => j.compensationAndBenefits.employmentStatus === "Full Time"
    ).length,
    partTime: jobs.filter(
      (j) => j.compensationAndBenefits.employmentStatus === "Part Time"
    ).length,
    remote: jobs.filter(
      (j) =>
        j.companyInfo.address.toLowerCase().includes("remote") ||
        j.summary.location.toLowerCase().includes("remote")
    ).length,
  };

  return (
    <PageWrapper>
      {/* HERO */}
      <div className="relative bg-[#0ddaa0] text-white py-20 px-4 mt-20">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Find Your Dream <span className="text-yellow-300">Career</span>
          </h1>
          <p className="text-xl mb-10 opacity-90">
            Discover amazing opportunities that match your skills
          </p>

          <div className="max-w-4xl mx-auto bg-white rounded-xl p-2 shadow-2xl">
            <div className="flex flex-col md:flex-row gap-2">
              <div className="flex-1 flex items-center px-4">
                <Search className="text-gray-400 mr-3" size={20} />
                <input
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Job title, keywords, or company"
                  className="w-full py-4 text-gray-800 focus:outline-none"
                />
              </div>

              <div className="flex-1 flex items-center px-4 border-l">
                <MapPin className="text-gray-400 mr-3" size={20} />
                <select
                  value={locationFilter}
                  onChange={(e) => {
                    setLocationFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full py-4 text-gray-800 bg-transparent"
                >
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="max-w-400 mx-auto mt-10 px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { label: "Total Jobs", value: stats.total, icon: Briefcase },
          { label: "Full Time", value: stats.fullTime, icon: Users },
          { label: "Part Time", value: stats.partTime, icon: Clock },
          { label: "Remote Jobs", value: stats.remote, icon: Building },
        ].map(({ label, value, icon: Icon }) => (
          <div key={label} className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center">
              <Icon className="mr-4 text-emerald-600" />
              <div>
                <p className="text-3xl font-bold">
                  <CountUp end={value} duration={2} />+
                </p>
                <p className="text-gray-600">{label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CONTENT */}
      <div className="max-w-400 mx-auto px-4 py-16 flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/4">
          <JobFilters
            filter={filter}
            setFilter={(v) => {
              setFilter(v);
              setCurrentPage(1);
            }}
            salaryFilter={salaryFilter}
            setSalaryFilter={(v) => {
              setSalaryFilter(v);
              setCurrentPage(1);
            }}
            locationFilter={locationFilter}
            setLocationFilter={(v) => {
              setLocationFilter(v);
              setCurrentPage(1);
            }}
            locations={locations}
            resetFilters={() => {
              setFilter("All");
              setSalaryFilter("All");
              setLocationFilter("All");
              setSearch("");
              setCurrentPage(1);
            }}
          />
        </div>

        <div className="lg:w-3/4 grid grid-cols-1 md:grid-cols-2 gap-6">
          {paginatedJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </PageWrapper>
  );
};

export default Careers;
