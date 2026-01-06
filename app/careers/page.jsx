"use client";

import React, { useState } from "react";
import JobCard from "./components/JobCard";
import { jobs } from "./components/JobData";
import PageWrapper from "../component/PageWrapper";
import { 
  Search, 
  Filter, 
  MapPin, 
  Briefcase, 
  TrendingUp,
  Clock,
  DollarSign,
  Users,
  Building
} from "lucide-react";

const ITEMS_PER_PAGE = 10;

const Careers = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [locationFilter, setLocationFilter] = useState("All");
  const [salaryFilter, setSalaryFilter] = useState("All");
  const [experienceFilter, setExperienceFilter] = useState("All");

  // Extract unique locations
  const locations = ["All", ...new Set(jobs.map(job => job.companyInfo.address.split(",")[0]))];
  
  // Search + Filter logic
  const filteredJobs = jobs.filter((job) => {
    const matchSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.companyInfo.address.toLowerCase().includes(search.toLowerCase()) ||
      job.companyName.toLowerCase().includes(search.toLowerCase());

    const matchJobType = filter === "All" || 
      job.compensationAndBenefits.employmentStatus === filter ||
      job.summary.jobStatus.toLowerCase() === filter.toLowerCase();

    const matchLocation = locationFilter === "All" || 
      job.companyInfo.address.toLowerCase().includes(locationFilter.toLowerCase());

    const matchSalary = salaryFilter === "All" || (
      salaryFilter === "High" && job.compensationAndBenefits.salary > 80000 ||
      salaryFilter === "Medium" && job.compensationAndBenefits.salary >= 50000 && job.compensationAndBenefits.salary <= 80000 ||
      salaryFilter === "Low" && job.compensationAndBenefits.salary < 50000
    );

    return matchSearch && matchJobType && matchLocation && matchSalary;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedJobs = filteredJobs.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  // Job statistics
  const stats = {
    total: jobs.length,
    fullTime: jobs.filter(j => j.compensationAndBenefits.employmentStatus === "Full Time").length,
    partTime: jobs.filter(j => j.compensationAndBenefits.employmentStatus === "Part Time").length,
    remote: jobs.filter(j => j.companyInfo.address.toLowerCase().includes("remote")).length,
  };

  return (
    <PageWrapper>
      {/* Hero Section */}
      <div className="relative bg-[#0ddaa0]   text-white py-20 px-4 mt-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Find Your Dream <span className="text-yellow-300">Career</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 opacity-90 max-w-3xl mx-auto">
            Discover amazing opportunities that match your skills and aspirations
          </p>
          
          {/* Main Search Bar */}
          <div className="max-w-4xl mx-auto bg-white rounded-xl p-2 shadow-2xl">
            <div className="flex flex-col md:flex-row gap-2">
              <div className="flex-1 flex items-center px-4">
                <Search className="text-gray-400 mr-3" size={20} />
                <input
                  type="text"
                  placeholder="Job title, keywords, or company"
                  className="w-full py-4 text-gray-800 placeholder-gray-400 focus:outline-none text-lg"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
              <div className="flex-1 flex items-center px-4 border-l">
                <MapPin className="text-gray-400 mr-3" size={20} />
                <select
                  className="w-full py-4 text-gray-800 focus:outline-none text-lg bg-transparent"
                  value={locationFilter}
                  onChange={(e) => {
                    setLocationFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="All">All Locations</option>
                  {locations.slice(1).map((loc, index) => (
                    <option key={index} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>
              <button 
                onClick={() => {
                  // Trigger search
                }}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105"
              >
                Search Jobs
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto   mt-10 px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-emerald-100 text-emerald-600 mr-4">
                <Briefcase size={24} />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-800">{stats.total}+</p>
                <p className="text-gray-600">Total Jobs</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-blue-100 text-blue-600 mr-4">
                <Users size={24} />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-800">{stats.fullTime}+</p>
                <p className="text-gray-600">Full Time</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-purple-100 text-purple-600 mr-4">
                <Clock size={24} />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-800">{stats.partTime}+</p>
                <p className="text-gray-600">Part Time</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-orange-100 text-orange-600 mr-4">
                <Building size={24} />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-800">{stats.remote}+</p>
                <p className="text-gray-600">Remote Jobs</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-24">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <Filter className="mr-2" size={20} />
                Filters
              </h3>
              
              {/* Job Type Filter */}
              <div className="mb-8">
                <h4 className="font-semibold text-gray-700 mb-4">Job Type</h4>
                <div className="space-y-2">
                  {["All", "Full Time", "Part Time", "Active"].map((type) => (
                    <button
                      key={type}
                      onClick={() => {
                        setFilter(type);
                        setCurrentPage(1);
                      }}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                        filter === type
                          ? "bg-emerald-500 text-white shadow-md"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Salary Filter */}
              <div className="mb-8">
                <h4 className="font-semibold text-gray-700 mb-4 flex items-center">
                  <DollarSign size={16} className="mr-2" />
                  Salary Range
                </h4>
                <div className="space-y-2">
                  {["All", "Low (< $50k)", "Medium ($50k-$80k)", "High (> $80k)"].map((range) => (
                    <button
                      key={range}
                      onClick={() => {
                        setSalaryFilter(range.split(" ")[0]);
                        setCurrentPage(1);
                      }}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                        salaryFilter === range.split(" ")[0]
                          ? "bg-emerald-500 text-white shadow-md"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>

              {/* Location Filter */}
              <div>
                <h4 className="font-semibold text-gray-700 mb-4 flex items-center">
                  <MapPin size={16} className="mr-2" />
                  Location
                </h4>
                <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                  {locations.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => {
                        setLocationFilter(loc);
                        setCurrentPage(1);
                      }}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                        locationFilter === loc
                          ? "bg-emerald-500 text-white shadow-md"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  setFilter("All");
                  setLocationFilter("All");
                  setSalaryFilter("All");
                  setSearch("");
                  setCurrentPage(1);
                }}
                className="w-full mt-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          </div>

          {/* Job Listings */}
          <div className="lg:w-3/4">
            {/* Results Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  Latest Job Openings
                </h2>
                <p className="text-gray-600">
                  Showing {filteredJobs.length} of {jobs.length} jobs
                  {search && ` for "${search}"`}
                </p>
              </div>
              
              <div className="flex items-center space-x-4 mt-4 md:mt-0">
                <span className="text-gray-600">Sort by:</span>
                <select className="border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:border-emerald-500">
                  <option>Most Relevant</option>
                  <option>Newest First</option>
                  <option>Salary: High to Low</option>
                  <option>Salary: Low to High</option>
                </select>
              </div>
            </div>

            {/* Job Cards Grid */}
            {paginatedJobs.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {paginatedJobs.map((job) => (
                    <div key={job.id} className="transform transition-transform duration-300 hover:-translate-y-1">
                      <JobCard job={job} />
                    </div>
                  ))}
                </div>

                {/* Enhanced Pagination */}
                {totalPages > 1 && (
                  <div className="flex flex-col md:flex-row items-center justify-between mt-12 pt-8 border-t border-gray-200">
                    <p className="text-gray-600 mb-4 md:mb-0">
                      Page {currentPage} of {totalPages} • {filteredJobs.length} jobs
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 rounded-lg flex items-center ${
                          currentPage === 1
                            ? "text-gray-400 cursor-not-allowed"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        ← Previous
                      </button>
                      
                      <div className="flex items-center gap-1">
                        {Array.from({ length: Math.min(5, totalPages) }).map((_, index) => {
                          let pageNum;
                          if (totalPages <= 5) {
                            pageNum = index + 1;
                          } else if (currentPage <= 3) {
                            pageNum = index + 1;
                          } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 4 + index;
                          } else {
                            pageNum = currentPage - 2 + index;
                          }
                          
                          return (
                            <button
                              key={pageNum}
                              onClick={() => setCurrentPage(pageNum)}
                              className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                currentPage === pageNum
                                  ? "bg-emerald-500 text-white shadow-md"
                                  : "text-gray-700 hover:bg-gray-100"
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        })}
                        
                        {totalPages > 5 && currentPage < totalPages - 2 && (
                          <>
                            <span className="px-2">...</span>
                            <button
                              onClick={() => setCurrentPage(totalPages)}
                              className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                currentPage === totalPages
                                  ? "bg-emerald-500 text-white shadow-md"
                                  : "text-gray-700 hover:bg-gray-100"
                              }`}
                            >
                              {totalPages}
                            </button>
                          </>
                        )}
                      </div>
                      
                      <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 rounded-lg flex items-center ${
                          currentPage === totalPages
                            ? "text-gray-400 cursor-not-allowed"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        Next →
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              /* No Results State */
              <div className="text-center py-20">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                  <Search className="text-gray-400" size={48} />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  No jobs found
                </h3>
                <p className="text-gray-600 max-w-md mx-auto mb-8">
                  We couldnot find any jobs matching your criteria. Try adjusting your filters or search terms.
                </p>
                <button
                  onClick={() => {
                    setFilter("All");
                    setLocationFilter("All");
                    setSalaryFilter("All");
                    setSearch("");
                    setCurrentPage(1);
                  }}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CTA Banner */}
      <div className="bg-linear-to-r from-emerald-500 to-teal-600 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <TrendingUp size={64} className="mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-6">
            Ready to take the next step in your career?
          </h2>
          <p className="text-xl mb-10 opacity-90">
            Join thousands of professionals who found their dream job through us
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-emerald-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105">
              Upload Your Resume
            </button>
            <button className="bg-transparent border-2 border-white hover:bg-white/10 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105">
              Subscribe to Job Alerts
            </button>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Careers;