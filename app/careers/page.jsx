"use client";

import "./components/career.css";
import React, { useState, useEffect, useRef } from "react";
import JobCard from "./components/JobCard";
import CountUp from "react-countup";
import JobFilters from "./components/JobFilters";
import {
  Search,
  MapPin,
  Briefcase,
  Users,
  ChevronLeft,
  ChevronRight,
  Filter,
  X,
  Loader2,
  AlertCircle,
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
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sidebarRef = useRef(null);
  const filterButtonRef = useRef(null);
  const jobListingsRef = useRef(null);

  // Fetch jobs from JSON file
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("/jobs.json");
        if (!response.ok) {
          throw new Error(`Failed to fetch jobs: ${response.status}`);
        }
        const data = await response.json();
        setJobs(data);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterButtonRef.current && filterButtonRef.current.contains(event.target)) {
        return;
      }
      
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

  // Get unique locations from jobs
  const locations =
    jobs.length > 0
      ? ["All", ...new Set(jobs.map((job) => job.employmentInfo.jobLocation.district))]
      : ["All"];

  // Salary parsing utility - fixed for your format
  const getSalaryValue = (salaryRange) => {
    if (!salaryRange || typeof salaryRange !== "string") return null;
    
    try {
      // Remove commas and get the highest value from range "10,000 – 20,000"
      const cleanRange = salaryRange.replace(/,/g, '').replace(' ', '');
      const parts = cleanRange.split('–');
      
      if (parts.length === 2) {
        const highValue = parseInt(parts[1].trim(), 10);
        return isNaN(highValue) ? null : highValue;
      } else {
        // Try to parse single value
        const num = parseInt(cleanRange.replace(/[^\d]/g, ''), 10);
        return isNaN(num) ? null : num;
      }
    } catch (err) {
      return null;
    }
  };

  // Filter logic - FIXED
  const filteredJobs = jobs.filter((job) => {
    // Search across multiple fields
    const matchSearch =
      search === "" ||
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.name.toLowerCase().includes(search.toLowerCase()) ||
      job.employmentInfo.jobLocation.city.toLowerCase().includes(search.toLowerCase()) ||
      job.employmentInfo.jobLocation.district.toLowerCase().includes(search.toLowerCase()) 

    // Job type filter - FIXED
    const matchJobType =
      filter === "All" ||
      (filter === "Remote" && job.employmentInfo.remoteAllowed === true) ||
      (filter === "Full Time" && job.jobType === "Full Time") ||
      (filter === "Part Time" && job.jobType === "Part Time");

    // Salary filter - FIXED
    const salaryValue = getSalaryValue(job.salaryAndBenefits.salary.range);
    const salaryNegotiable = job.salaryAndBenefits.salary.negotiable;

    const matchSalary =
      salaryFilter === "All" ||
      (salaryFilter === "High" && salaryValue && salaryValue >= 50000) ||
      (salaryFilter === "Medium" && salaryValue && salaryValue >= 30000 && salaryValue < 50000) ||
      (salaryFilter === "Low" && salaryValue && salaryValue < 30000) ||
      (salaryFilter === "Negotiable" && salaryNegotiable === true);

    // Location filter - FIXED
    const matchLocation =
      locationFilter === "All" || 
      job.employmentInfo.jobLocation.district === locationFilter;

    return matchSearch && matchJobType && matchSalary && matchLocation;
  });

  // Pagination
  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedJobs = filteredJobs.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  // Stats - FIXED
  const stats = {
    total: jobs.length,
    fullTime: jobs.filter(job => job.jobType === "Full Time").length,
    partTime: jobs.filter(job => job.jobType === "Part Time").length,
    remote: jobs.filter(job => job.employmentInfo.remoteAllowed === true).length,
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    setTimeout(() => {
      if (jobListingsRef.current) {
        window.scrollTo({
          top: jobListingsRef.current.offsetTop - 100,
          behavior: "smooth",
        });
      }
    }, 10);
  };

  // Handle filter change - scroll to top
  const handleFilterChange = () => {
    setCurrentPage(1);
    setSidebarOpen(false); // Close sidebar on mobile
    
    setTimeout(() => {
      if (jobListingsRef.current) {
        window.scrollTo({
          top: jobListingsRef.current.offsetTop - 100,
          behavior: "smooth",
        });
      }
    }, 50);
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
    setSidebarOpen(false);
    
    setTimeout(() => {
      if (jobListingsRef.current) {
        window.scrollTo({
          top: jobListingsRef.current.offsetTop - 100,
          behavior: "smooth",
        });
      }
    }, 50);
  };

  // Toggle mobile sidebar
  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  // Handle search input change - WITHOUT scroll
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1); // Only reset to page 1, no scroll
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 mt-20">
        <Loader2 className="h-12 w-12 text-emerald-500 animate-spin mb-4" />
        <p className="text-gray-600 text-lg">Loading job opportunities...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 mt-20 px-4">
        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Error Loading Jobs
        </h2>
        <p className="text-gray-600 mb-4 text-center">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Mobile Filter Button */}
      <button
        ref={filterButtonRef}
        onClick={toggleSidebar}
        className={`lg:hidden fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg transition-colors ${
          sidebarOpen 
            ? "bg-gray-700 text-white hover:bg-gray-800" 
            : "bg-emerald-500 text-white hover:bg-emerald-600"
        }`}
      >
        {sidebarOpen ? <X size={24} /> : <Filter size={24} />}
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
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
            Find Your Dream{" "}
            <span className="text-yellow-300">
              <TypingText text="Career" colors={["#fff"]} />
            </span>
          </h1>
          <p className="text-base md:text-xl mb-6 md:mb-10 opacity-90 px-2">
            Discover {jobs.length} amazing opportunities that match your skills
          </p>

          <div className="max-w-4xl mx-auto bg-white rounded-xl p-2 shadow-2xl">
            <div className="flex flex-col md:flex-row gap-2">
              <div className="flex-1 flex items-center px-3 md:px-4">
                <Search className="text-gray-400 mr-2 md:mr-3" size={18} />
                <input
                  value={search}
                  onChange={handleSearchChange}
                  placeholder="Job title, company, or location"
                  className="w-full py-3 md:py-4 text-gray-800 focus:outline-none text-sm md:text-base"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="max-w-400 mx-auto mt-6 md:mt-10 px-4 grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {[
          { label: "Total Jobs", value: stats.total, icon: Briefcase },
          { label: "Full Time", value: stats.fullTime, icon: Users },
          { label: "Remote Jobs", value: stats.remote, icon: MapPin },
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
              ? "fixed inset-y-0 left-0 w-80 z-50 bg-white  px-6 py-2 md:p-6 mt-5 md:mt-8 lg:mt-0 overflow-y-auto shadow-2xl animate-slide-in"
              : "hidden"
          } lg:block lg:w-1/4 lg:relative lg:z-auto lg:shadow-none lg:p-0 lg:bg-transparent lg:animate-none`}
        >
          {/* Close button for mobile */}
          <div className="flex justify-between items-center mb-3 lg:hidden">
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
            setFilter={setFilter}
            salaryFilter={salaryFilter}
            setSalaryFilter={setSalaryFilter}
            locationFilter={locationFilter}
            setLocationFilter={setLocationFilter}
            locations={locations}
            resetFilters={resetFilters}
            onFilterChange={handleFilterChange}
          />
        </div>

        {/* Main Content */}
        <div className="lg:w-3/4" ref={jobListingsRef}>
          {/* Results Count */}
          <div className="mb-6 md:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                {filteredJobs.length} Job{filteredJobs.length !== 1 ? "s" : ""}{" "}
                Found
              </h2>
            </div>

            {filteredJobs.length === 0 && (
              <div className="mt-6 p-8 bg-gray-50 rounded-xl text-center">
                <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  No jobs found
                </h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your filters or search terms
                </p>
                <button
                  onClick={resetFilters}
                  className="bg-emerald-500 text-white px-6 py-2 rounded-lg hover:bg-emerald-600 transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>

          {/* Job Listings */}
          {filteredJobs.length > 0 && (
            <>
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
                      className={`w-8 h-8 md:w-10 md:h-10 rounded-lg text-sm md:text-base transition-colors ${
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
                      <span className="px-1 md:px-2 text-gray-500">...</span>
                      <button
                        onClick={() => handlePageChange(totalPages)}
                        className={`w-8 h-8 md:w-10 md:h-10 rounded-lg hover:bg-gray-100 text-sm md:text-base transition-colors ${
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
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Careers;