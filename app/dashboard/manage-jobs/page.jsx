"use client";

import React, { useEffect, useState } from "react";
import {
  Search,
  MoreVertical,
  Briefcase,
  Eye,
  Edit3,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Plus,
  Calendar,
  MapPin,
  Users,
  TrendingUp,
} from "lucide-react";
import PostJob from "./Components/post-job/PostJob";
import EditJobModal from "./Components/EditJobModal";
import JobDetailsModal from "./Components/JobDetailsModal";

const ITEMS_PER_PAGE = 10;

export default function JobManagementPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [activeMenu, setActiveMenu] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [postJob, setPostJob] = useState(false);
  const [editJob, setEditJob] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [viewJob, setViewJob] = useState(null);
  const [isViewOpen, setIsViewOpen] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const res = await fetch("/jobs.json");
        const data = await res.json();
        setJobs(data);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleUpdateJob = (updatedJob) => {
  setJobs((prevJobs) =>
    prevJobs.map((job) =>
      job.id === updatedJob.id ? updatedJob : job
    )
  );

  setIsEditOpen(false);
  setEditJob(null);
};

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" ||
      job.jobSummary?.jobStatus?.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);
  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  // Stats
  const activeJobs = jobs.filter(
    (j) => j.jobSummary?.jobStatus === "active",
  ).length;
  const closedJobs = jobs.filter(
    (j) => j.jobSummary?.jobStatus === "closed",
  ).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-semibold text-gray-700">
            Loading Dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <div className="max-w-400 mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6">
        {/* HEADER */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start lg:items-center gap-4 mb-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-linear-to-br from-emerald-500 to-teal-600 p-3 rounded-2xl shadow-lg">
                <Briefcase className="text-white" size={28} />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-gray-800">
                  Job Management
                </h1>
                <p className="text-gray-500 text-sm">
                  Manage and track all job postings
                </p>
              </div>
            </div>

            <button
              onClick={() => setPostJob(!postJob)}
              className="bg-emerald-500 hover:from-emerald-600 hover:to-teal-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 cursor-pointer"
            >
              <Plus size={20} />
              Post New Job
            </button>
          </div>

          {/* Stats Cards */}
          <div className="mb-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 max-w-300 mx-auto">
              {/* Total Jobs */}
              <div className="bg-white rounded-2xl p-5 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium mb-1">
                      Total Jobs
                    </p>
                    <p className="text-3xl font-black text-gray-800">
                      {jobs.length}
                    </p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-xl ">
                    <Briefcase className="text-primary" size={24} />
                  </div>
                </div>
              </div>

              {/* Active Jobs */}
              <div className="bg-white rounded-2xl p-5 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium mb-1">
                      Active
                    </p>
                    <p className="text-3xl font-black text-emerald-600">
                      {activeJobs}
                    </p>
                  </div>
                  <div className="bg-emerald-50 p-3 rounded-xl">
                    <TrendingUp className="text-emerald-600" size={24} />
                  </div>
                </div>
              </div>

              {/* Closed Jobs */}
              <div className="bg-white rounded-2xl p-5 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium mb-1">
                      Closed
                    </p>
                    <p className="text-3xl font-black text-gray-600">
                      {closedJobs}
                    </p>
                  </div>
                  <div className="bg-gray-100 p-3 rounded-xl">
                    <Calendar className="text-gray-600" size={24} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Search & Filter */}
          <div className="bg-white rounded-2xl p-4 shadow-md border border-gray-100">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  className="w-full pl-11 pr-4 py-3 text-sm border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-gray-50 transition-all"
                  placeholder="Search by job title..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>

              <select
                className="border border-gray-200 rounded-xl px-4 py-3 text-sm bg-gray-50 font-medium text-gray-700 outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                value={filterStatus}
                onChange={(e) => {
                  setFilterStatus(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full md:table-fixed border-collapse">
              <colgroup>
                <col className="md:w-[30%]" />
                <col className="md:w-[15%]" />
                <col className="md:w-[15%]" />
                <col className="md:w-[5%]" />
                <col className="md:w-[15%]" />
                <col className="md:w-[10%]" />
              </colgroup>

              {/* Table Header */}
              <thead className="hidden md:table-header-group bg-linear-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-4 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Position
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Posted
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Deadline
                  </th>
                  <th className="px-4 py-4 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Applications
                  </th>
                  <th className="px-4 py-4 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-4 text-right text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-gray-100">
                {paginatedJobs.map((job) => (
                  <tr
                    key={job.id}
                    className="block md:table-row w-full hover:bg-linear-to-r hover:from-emerald-50/50 hover:to-teal-50/50 transition-all duration-200"
                  >
                    {/* POSITION */}
                    <td className="block md:table-cell px-4 py-4 md:px-6 w-full">
                      <div className="flex flex-col sm:flex-row sm:justify-between items-start md:block w-full">
                        <div>
                          <span className="md:hidden text-xs text-gray-500 font-semibold mb-1 block">
                            Position
                          </span>
                          <div className="font-semibold text-gray-800">
                            {job.title}
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-500 mt-1 sm:mt-0">
                          <MapPin size={12} className="text-emerald-500" />
                          {job.employmentInfo?.jobLocation.city},{" "}
                          {job.employmentInfo?.jobLocation.country}
                        </div>
                      </div>
                    </td>

                    {/* POSTED */}
                    <td className="block md:table-cell px-4 py-2 md:px-6 md:py-4 w-full">
                      <span className="md:hidden text-xs text-gray-500 font-semibold mb-1 block">
                        Posted
                      </span>
                      <span className="text-sm text-gray-700">
                        {job.jobSummary?.publishedDate}
                      </span>
                    </td>

                    {/* DEADLINE */}
                    <td className="block md:table-cell px-4 py-2 md:px-6 md:py-4 w-full">
                      <span className="md:hidden text-xs text-gray-500 font-semibold mb-1 block">
                        Deadline
                      </span>
                      <span className="font-semibold text-orange-600 text-sm bg-orange-50 px-3 py-1 rounded-lg inline-block">
                        {job.jobSummary?.applicationDeadline}
                      </span>
                    </td>

                    {/* APPLICATIONS */}
                    <td className="block md:table-cell px-4 py-2 md:px-6 md:py-4 w-full">
                      <span className="md:hidden text-xs text-gray-500 font-semibold mb-1 block">
                        Applications
                      </span>
                      <div className="flex items-center gap-1">
                        <Users size={14} className="text-purple-500" />
                        <span className="font-bold text-gray-800">12</span>
                      </div>
                    </td>

                    {/* STATUS */}
                    <td className="block md:table-cell px-4 py-2 md:px-6 md:py-4 w-full md:text-center">
                      <span className="md:hidden text-xs text-gray-500 font-semibold mb-1 block">
                        Status
                      </span>
                      <span
                        className={`px-3 py-1.5 text-xs font-bold uppercase rounded-full inline-block ${
                          job.jobSummary?.jobStatus === "active"
                            ? "bg-linear-to-r from-emerald-100 to-teal-100 text-emerald-700 border border-emerald-200"
                            : "bg-linear-to-r from-gray-100 to-gray-200 text-gray-700 border border-gray-300"
                        }`}
                      >
                        {job.jobSummary?.jobStatus}
                      </span>
                    </td>

                    {/* ACTIONS */}
                    <td className="block md:table-cell px-4 py-2 md:px-6 md:py-4 w-full text-right relative">
                      <button
                        onClick={() =>
                          setActiveMenu(activeMenu === job.id ? null : job.id)
                        }
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <MoreVertical size={18} className="text-gray-600" />
                      </button>

                      {activeMenu === job.id && (
                        <div className="absolute right-0 md:right-12 bottom-10 md:bottom-0 mb-2 w-44 bg-white shadow-2xl border border-gray-200 rounded-xl z-50 overflow-hidden">
                          <button
                            onClick={() => {
                              setViewJob(job);
                              setIsViewOpen(true);
                              setActiveMenu(null);
                            }}
                            className="w-full px-4 py-2 text-sm flex items-center gap-3 hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors"
                          >
                            <Eye size={16} />
                            <span className="font-medium">View Details</span>
                          </button>

                          <button
                            onClick={() => {
                              setEditJob(job);
                              setIsEditOpen(true);
                              setActiveMenu(null);
                            }}
                            className="w-full px-4 py-2 text-sm flex items-center gap-3 hover:bg-emerald-50 text-gray-700 hover:text-emerald-600 transition-colors"
                          >
                            <Edit3 size={16} />
                            <span className="font-medium">Edit Job</span>
                          </button>

                          <button
                            onClick={() => {
                              setJobs(jobs.filter((j) => j.id !== job.id));
                              setActiveMenu(null);
                            }}
                            className="w-full px-4 py-2 text-sm flex items-center gap-3 hover:bg-red-50 text-gray-700 hover:text-red-600 transition-colors border-t border-gray-100"
                          >
                            <Trash2 size={16} />
                            <span className="font-medium">Delete</span>
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-6">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="p-2.5 border border-gray-300 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors bg-white shadow-sm"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex gap-2">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all shadow-sm ${
                    currentPage === i + 1
                      ? "bg-linear-to-r from-emerald-500 to-teal-600 text-white shadow-lg scale-105"
                      : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="p-2.5 border border-gray-300 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors bg-white shadow-sm"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}

        {/* Modals */}
        {postJob && (
          <div className="fixed inset-0 z-50  ">
            <div className=" relative bg-black/40">
              {/* Close button */}
              <button
                onClick={() => setPostJob(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
              >
                ✕
              </button>

              {/* Modal Content */}
              <PostJob onClose={setPostJob} />
            </div>
          </div>
        )}
{isEditOpen && editJob && (
  <EditJobModal
    job={editJob}
    onClose={() => setIsEditOpen(false)}
    onSave={handleUpdateJob}
  />
)}

        {isViewOpen && viewJob && (
          <JobDetailsModal job={viewJob} onClose={() => setIsViewOpen(false)} />
        )}
      </div>
    </div>
  );
}
