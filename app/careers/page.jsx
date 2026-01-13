"use client";

import React, { useState, useEffect, useRef } from "react";
import JobCard from "./components/JobCard";
import {jobs} from "./components/JobData";
import CountUp from "react-countup";
import JobFilters from "./components/JobFilters";
import {
  Search,
  MapPin,
  Briefcase,
  Clock,
  Users,
  ChevronLeft,
  ChevronRight,
  Filter,
  X,
} from "lucide-react";
import TypingText from "../component/TypingText";

const ITEMS_PER_PAGE = 10;

const Careers = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [locationFilter, setLocationFilter] = useState("All");
  const [salaryFilter, setSalaryFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        if (window.innerWidth < 1024) {
          setSidebarOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close sidebar when resizing to larger screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Locations
  const locations = [
    "All",
    ...new Set(jobs.map((job) => job.summary.location)),
  ];

  // Filter logic
  const filteredJobs = jobs.filter((job) => {
    const matchSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.summary.location.toLowerCase().includes(search.toLowerCase());

    const matchJobType =
      filter === "All" ||
      (filter === "Remote" &&
      job.compensationAndBenefits.workplace?.toLowerCase() === "remote") ||
      job.compensationAndBenefits.employmentStatus === filter;

    const getSalaryValue = (salary) => {
      if (!salary || salary === "Negotiable") return null;
      if (salary.includes("-")) return Number(salary.split("-")[1]);
      return Number(salary);
    };

    const salaryValue = getSalaryValue(job.summary.salary);

    const matchSalary =
      salaryFilter === "All" ||
      (salaryFilter === "High" && salaryValue >= 50000) ||
      (salaryFilter === "Medium" &&
        salaryValue >= 30000 &&
        salaryValue < 50000) ||
      (salaryFilter === "Low" && salaryValue < 29000);

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

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to top of job listings
    setTimeout(() => {
      const jobListings = document.querySelector(".job-listings-container");
      if (jobListings) {
        window.scrollTo({
          top: jobListings.offsetTop - 100,
          behavior: "smooth",
        });
      }
    }, 10);
  };

  // Generate page numbers
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      const start = Math.max(1, currentPage - 2);
      const end = Math.min(totalPages, start + maxVisiblePages - 1);

      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }
    }

    return pageNumbers;
  };

  const resetFilters = () => {
    setFilter("All");
    setSalaryFilter("All");
    setLocationFilter("All");
    setSearch("");
    setCurrentPage(1);
  };

  return (
    <>
      {/* Mobile Filter Button */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 z-50 bg-emerald-500 text-white p-4 rounded-full shadow-lg hover:bg-emerald-600 transition-colors"
      >
        <Filter size={24} />
      </button>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
          data-lenis-prevent
        />
      )}

      {/* HERO */}
      <div className="relative bg-[#0ddaa0] text-white py-12 md:py-20 px-4 mt-16 md:mt-20">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
            Find Your Dream{" "}
            <span className="text-yellow-300">
              <TypingText text="Career" colors={["#fff"]} />
            </span>
          </h1>
          <p className="text-base md:text-xl mb-6 md:mb-10 opacity-90 px-2">
            Discover amazing opportunities that match your skills
          </p>

          <div className="max-w-4xl mx-auto bg-white rounded-xl p-2 shadow-2xl">
            <div className="flex flex-col md:flex-row gap-2">
              <div className="flex-1 flex items-center px-3 md:px-4">
                <Search className="text-gray-400 mr-2 md:mr-3" size={18} />
                <input
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Job title, Address "
                  className="w-full py-3 md:py-4 text-gray-800 focus:outline-none text-sm md:text-base"
                />
              </div>

              {/* <div className="flex-1 flex items-center px-3 md:px-4 border-l">
                <MapPin className="text-gray-400 mr-2 md:mr-3" size={18} />
                <select
                  value={locationFilter}
                  onChange={(e) => {
                    setLocationFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full py-3 md:py-4 text-gray-800 bg-transparent text-sm md:text-base"
                >
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="max-w-400 mx-auto mt-6 md:mt-10 px-4 grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {[
          { label: "Total Jobs", value: stats.total, icon: Briefcase },
          { label: "Full Time", value: stats.fullTime, icon: Users },
          { label: "Part Time", value: stats.partTime, icon: Clock },
        ].map(({ label, value, icon: Icon }) => (
          <div key={label} className="bg-white p-4 md:p-6 rounded-xl shadow-lg">
            <div className="flex items-center">
              <Icon className="mr-3 md:mr-4 text-emerald-600" size={20} />
              <div>
                <p className="text-xl md:text-2xl lg:text-3xl font-bold">
                  <CountUp end={value} duration={2} />+
                </p>
                <p className="text-gray-600 text-sm md:text-base">{label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CONTENT */}
      <div className="max-w-400 mx-auto px-4 py-8 md:py-16 flex flex-col lg:flex-row gap-6 md:gap-8">
        {/* Sidebar */}
        <div
          ref={sidebarRef}
          className={`${
            sidebarOpen
              ? "fixed inset-y-0 left-0 w-80 z-50 bg-white p-6 overflow-y-auto shadow-2xl"
              : "hidden"
          } lg:block lg:w-1/4 lg:relative lg:z-auto lg:shadow-none lg:p-0 lg:bg-transparent`}
        >
          {/* Close button for mobile */}
          <div className="flex justify-between items-center mb-6 lg:hidden">
            <h3 className="text-xl font-bold text-gray-800">Filters</h3>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X size={24} />
            </button>
          </div>

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
            resetFilters={resetFilters}
          />
        </div>

        {/* Main Content */}
        <div className="lg:w-3/4">
          {/* Results Count */}
          <div className="mb-6 md:mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">
              {filteredJobs.length} Job{filteredJobs.length !== 1 ? "s" : ""}{" "}
              Found
            </h2>
            {filteredJobs.length === 0 && (
              <p className="text-gray-600 mt-2">
                Try adjusting your filters to find more jobs
              </p>
            )}
          </div>

          {/* Job Listings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 job-listings-container">
            {paginatedJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div
              className="mt-8 md:mt-12 flex justify-center items-center space-x-1 md:space-x-2"
              data-lenis-prevent
            >
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
              >
                <ChevronLeft size={20} />
              </button>

              {getPageNumbers().map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-8 h-8 md:w-10 md:h-10 rounded-lg text-sm md:text-base ${
                    currentPage === page
                      ? "bg-emerald-500 text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              ))}

              {currentPage < totalPages - 2 && totalPages > 5 && (
                <>
                  <span className="px-1 md:px-2">...</span>
                  <button
                    onClick={() => handlePageChange(totalPages)}
                    className={`w-8 h-8 md:w-10 md:h-10 rounded-lg hover:bg-gray-100 text-sm md:text-base ${
                      currentPage === totalPages
                        ? "bg-emerald-500 text-white"
                        : ""
                    }`}
                  >
                    {totalPages}
                  </button>
                </>
              )}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Careers;
