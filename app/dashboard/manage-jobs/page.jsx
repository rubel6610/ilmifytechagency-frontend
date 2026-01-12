"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  MoreVertical,
  Eye,
  Edit3,
  Trash2,
  Briefcase,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import EditJobModal from "./components/EditJobModal";

export default function JobManagementPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [activeMenu, setActiveMenu] = useState(null);
  const [editingJob, setEditingJob] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("/jobs.json");
        const data = await res.json();
        setJobs(data);
      } catch (err) {
        console.error("Failed to fetch jobs", err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || job.summary.jobStatus === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
  const indexOfLastJob = currentPage * itemsPerPage;
  const indexOfFirstJob = indexOfLastJob - itemsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const handleUpdate = async (updatedJob) => {
    setJobs(jobs.map((j) => (j.id === updatedJob.id ? updatedJob : j)));
    setEditingJob(null);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this job?")) return;
    setJobs(jobs.filter((j) => j.id !== id));
    setActiveMenu(null);
  };

  if (loading)
    return (
      <div className="p-20 text-center font-bold">Loading Dashboard...</div>
    );

  return (
    <div className="min-h-screen bg-gray-50/50 px-4 flex flex-col">
      <div className="max-w-8xl mx-auto flex-1 w-full">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
              <Briefcase className="text-[#0ddaa0]" /> Job Management
            </h1>
            <p className="text-gray-500 mt-1 italic">
              Showing {indexOfFirstJob + 1}-
              {Math.min(indexOfLastJob, filteredJobs.length)} of{" "}
              {filteredJobs.length} Positions
            </p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-3 rounded-2xl shadow-sm flex flex-col sm:flex-row gap-3 mb-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by job title..."
              className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-[#86e062]"
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <select
            className="px-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-[#86e062]"
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

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-xl  overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-400 uppercase text-[10px] font-black tracking-widest border-b">
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Position</th>
                <th className="px-4 py-3 text-center hidden md:table-cell">
                  Posted At
                </th>
                <th className="px-4 py-3 text-center hidden lg:table-cell">
                  Applicants
                </th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {currentJobs.map((job, idx) => (
                <tr key={job.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-bold text-gray-800">
                    {idx < 9 ? `0${idx + 1}` : idx + 1}
                  </td>

                  <td className="px-4 py-3">
                    <div className="font-bold text-gray-800">{job.title}</div>
                    <div className="text-xs text-gray-400">
                      {job.summary.location}
                    </div>
                  </td>

                  <td className="px-4 py-3 text-center hidden md:table-cell">
                    {job.summary.published}
                  </td>

                  <td className="px-4 py-3 text-center hidden lg:table-cell">
                    <span className="bg-gray-100 px-3 py-1 rounded-lg">12</span>
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`text-[11px] font-bold px-3 py-1 rounded-md uppercase ${
                        job.summary.jobStatus === "active"
                          ? "bg-emerald-100 text-emerald-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {job.summary.jobStatus}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-right relative">
                    <button
                      onClick={() =>
                        setActiveMenu(activeMenu === job.id ? null : job.id)
                      }
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <MoreVertical size={18} />
                    </button>

                    {activeMenu === job.id && (
                      <div className="absolute right-8 top-10 w-40 bg-white shadow-2xl rounded-xl border z-50 py-2">
                        <Link
                          href={`/careers/${job.id}`}
                          className="flex items-center gap-2 px-4 py-3 hover:bg-gray-50 text-sm"
                        >
                          <Eye size={14} /> View
                        </Link>

                        <button
                          onClick={() => {
                            setEditingJob(job);
                            setActiveMenu(null);
                          }}
                          className="w-full flex items-center gap-2 px-4 py-3 hover:bg-gray-50 text-sm"
                        >
                          <Edit3 size={14} /> Edit
                        </button>

                        <button
                          onClick={() => handleDelete(job.id)}
                          className="w-full flex items-center gap-2 px-4 py-3 hover:bg-red-50 text-red-600 text-sm"
                        >
                          <Trash2 size={14} /> Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="p-4 border-t flex items-center justify-between">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="p-2 border rounded-lg disabled:opacity-30"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex gap-2">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-9 h-9 rounded-lg font-bold ${
                    currentPage === i + 1
                      ? "bg-[#0ddaa0] text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="p-2 border rounded-lg disabled:opacity-30"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {editingJob && (
        <EditJobModal
          job={editingJob}
          onClose={() => setEditingJob(null)}
          onSave={handleUpdate}
        />
      )}
    </div>
  );
}
