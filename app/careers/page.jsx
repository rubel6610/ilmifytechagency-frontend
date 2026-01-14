"use client";

import "./components/career.css"
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

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("/jobs.json");
        if (!response.ok) throw new Error(`Failed to fetch jobs: ${response.status}`);
        const data = await response.json();
        setJobs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  // Updated Locations extraction path
  const locations =
    jobs.length > 0
      ? ["All", ...new Set(jobs.map((job) => job.employmentInfo?.jobLocation?.city).filter(Boolean))]
      : ["All"];

  // Updated Filter logic for new JSON structure
  const filteredJobs = jobs.filter((job) => {
    const matchSearch =
      job.title?.toLowerCase().includes(search.toLowerCase()) ||
      job.employmentInfo?.jobLocation?.city?.toLowerCase().includes(search.toLowerCase()) ||
      job.company?.name?.toLowerCase().includes(search.toLowerCase());

    const matchJobType =
      filter === "All" || job.jobType === filter || (filter === "Remote" && job.employmentInfo?.remoteAllowed);

    // Salary Parsing for BDT 90,000 – 120,000 format
    const getSalaryValue = (salaryRange) => {
      if (!salaryRange || typeof salaryRange !== "string") return null;
      const numbers = salaryRange.match(/\d+/g);
      return numbers ? parseInt(numbers[numbers.length - 1].replace(/,/g, ""), 10) : null;
    };

    const salaryValue = getSalaryValue(job.salaryAndBenefits?.salary?.range);

    const matchSalary =
      salaryFilter === "All" ||
      (salaryFilter === "High" && salaryValue && salaryValue >= 80000) ||
      (salaryFilter === "Medium" && salaryValue && salaryValue >= 40000 && salaryValue < 80000) ||
      (salaryFilter === "Low" && salaryValue && salaryValue < 40000) ||
      (salaryFilter === "Negotiable" && job.salaryAndBenefits?.salary?.negotiable);

    const matchLocation =
      locationFilter === "All" || job.employmentInfo?.jobLocation?.city === locationFilter;

    return matchSearch && matchJobType && matchSalary && matchLocation;
  });

  // Updated Stats paths
  const stats = {
    total: jobs.length,
    fullTime: jobs.filter((j) => j.jobType === "Full Time").length,
    remote: jobs.filter((j) => j.employmentInfo?.remoteAllowed).length,
  };

  // ... (Keep existing Pagination, handlePageChange, toggleSidebar logic from your original code)
  
  // RESET FILTERS
  const resetFilters = () => {
    setFilter("All");
    setSalaryFilter("All");
    setLocationFilter("All");
    setSearch("");
    setCurrentPage(1);
    setSidebarOpen(false);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: jobListingsRef.current?.offsetTop - 100, behavior: "smooth" });
  };

  const handleFilterChange = () => {
    setCurrentPage(1);
    setSidebarOpen(false);
  };

  const getPageNumbers = () => {
    const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
    return pageNumbers;
  };

  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);
  const paginatedJobs = filteredJobs.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-emerald-500" size={48} /></div>;

  return (
    <>
      {/* Mobile Filter Button */}
      <button ref={filterButtonRef} onClick={() => setSidebarOpen(!sidebarOpen)} className={`lg:hidden fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg ${sidebarOpen ? "bg-gray-700" : "bg-emerald-500"} text-white`}>
        {sidebarOpen ? <X size={24} /> : <Filter size={24} />}
      </button>

      {/* Hero */}
      <div className="relative bg-emerald-500 text-white py-20 px-4 mt-20">
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Find Your Dream <span className="text-yellow-300"><TypingText text="Career" colors={["#fff"]} /></span></h1>
          <p className="text-xl mb-10 opacity-90">Discover {jobs.length} amazing opportunities at IlmifyTech</p>
          <div className="max-w-4xl mx-auto bg-white rounded-xl p-2 shadow-2xl">
            <div className="flex items-center px-4">
              <Search className="text-gray-400 mr-3" size={18} />
              <input value={search} onChange={(e) => {setSearch(e.target.value); setCurrentPage(1);}} placeholder="Job title, company, or location" className="w-full py-4 text-gray-800 focus:outline-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-400 mx-auto mt-10 px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Total Jobs", value: stats.total, icon: Briefcase },
          { label: "Full Time", value: stats.fullTime, icon: Users },
          { label: "Remote Allowed", value: stats.remote, icon: MapPin },
        ].map(({ label, value, icon: Icon }) => (
          <div key={label} className="bg-white p-6 rounded-xl shadow-lg flex items-center">
            <Icon className="mr-4 text-emerald-600" size={24} />
            <div>
              <p className="text-3xl font-bold"><CountUp end={value} duration={2} />+</p>
              <p className="text-gray-600 text-sm">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Content Area */}
      <div className="max-w-400 mx-auto px-4 py-16 flex flex-col lg:row gap-8 lg:flex-row">
        <div ref={sidebarRef} className={`${sidebarOpen ? "fixed inset-0 z-50 bg-white p-10" : "hidden"} lg:block lg:w-1/4`}>
           <JobFilters filter={filter} setFilter={setFilter} salaryFilter={salaryFilter} setSalaryFilter={setSalaryFilter} locationFilter={locationFilter} setLocationFilter={setLocationFilter} locations={locations} resetFilters={resetFilters} onFilterChange={handleFilterChange} />
        </div>

        <div className="lg:w-3/4" ref={jobListingsRef}>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">{filteredJobs.length} Positions Available</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {paginatedJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>

          {/* Simple Pagination Footer */}
          {totalPages > 1 && (
            <div className="mt-12 flex justify-center gap-2">
               {getPageNumbers().map(num => (
                 <button key={num} onClick={() => handlePageChange(num)} className={`w-10 h-10 rounded-lg ${currentPage === num ? "bg-emerald-500 text-white" : "bg-gray-100"}`}>{num}</button>
               ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Careers;