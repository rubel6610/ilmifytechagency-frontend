"use client";

import React, { useEffect, useState } from "react";
import {
  Search,
  MoreVertical,
  Briefcase,
  Eye,
  Edit3,
  Trash2,
} from "lucide-react";
import JobDetailsModal from "./Components/JobDetailsModal";
import EditJobModal from "./Components/EditJobModal";

export default function JobManagementPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [activeMenu, setActiveMenu] = useState(null);

  const [viewingJob, setViewingJob] = useState(null);
  const [editingJob, setEditingJob] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("/jobs.json");
        const data = await res.json();
        setJobs(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterStatus === "all" ||
      job.jobSummary?.jobStatus?.toLowerCase() === filterStatus.toLowerCase();

    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="p-20 text-center font-bold text-[#0ddaa0]">
        Initializing Admin Dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1600px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4">
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row justify-between gap-4 mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-black flex items-center gap-2">
              <span className="bg-[#0ddaa0] p-2 rounded-lg text-white">
                <Briefcase size={18} />
              </span>
              JOB MANAGEMENT
            </h1>
            <p className="text-gray-500 text-xs sm:text-sm mt-1">
              Found {filteredJobs.length} total positions
            </p>
          </div>

          <div className="flex flex-col items-center justify-center sm:flex-row gap-2 w-full lg:w-auto">
            <div className="relative flex-1">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                className="w-full pl-9 pr-3 py-2 text-sm border rounded-lg outline-none focus:ring-2 focus:ring-[#0ddaa0]"
                placeholder="Search jobs..."
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <select
              className="border rounded-lg px-3 py-2 text-sm bg-white font-medium text-gray-600"
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white border rounded-xl shadow-sm overflow-x-auto ">
          <table className="lg:min-w-[750px]  w-full text-sm ">
            <thead className="hidden md:table-header-group bg-gray-50 border-b ">
              <tr className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                <th className="px-4 py-3 text-left">Position</th>
                <th className="px-4 py-3 text-left">Posted</th>
                <th className="px-4 py-3 text-left">Deadline</th>
                <th className="px-4 py-3 text-center">Application</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {filteredJobs.map((job) => (
                <tr
                  key={job.id}
                  className="block md:table-row hover:bg-gray-50 transition"
                >
                  {/* POSITION */}
                  <td className="px-3 py-2 md:px-4 md:py-3 block md:table-cell">
                    <div className="flex gap-2 md:block">
                      <span className="md:hidden w-20 text-[11px] text-gray-400 font-semibold">
                        Position:
                      </span>
                      <div>
                        <div className="font-semibold leading-tight">
                          {job.title}
                        </div>
                        <div className="text-[11px] text-gray-400">
                          {job.employmentInfo?.jobLocation.city},{" "}
                          {job.employmentInfo?.jobLocation.country}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* POSTED */}
                  <td className="px-3 py-2 md:px-4 md:py-3 block md:table-cell">
                    <div className="flex gap-2 md:block">
                      <span className="md:hidden w-20 text-[11px] text-gray-400 font-semibold">
                        Posted:
                      </span>
                      {job.jobSummary?.publishedDate}
                    </div>
                  </td>

                  {/* DEADLINE */}
                  <td className="px-3 py-2 md:px-4 md:py-3 block md:table-cell">
                    <div className="flex gap-2 md:block">
                      <span className="md:hidden w-20 text-[11px] text-gray-400 font-semibold">
                        Deadline:
                      </span>
                      <span className="font-semibold text-orange-600">
                        {job.jobSummary?.applicationDeadline}
                      </span>
                    </div>
                  </td>

                  {/* APPLICATIONS */}
                  <td className="px-3 py-2 md:px-4 md:py-3 block md:table-cell md:text-center">
                    <div className="flex gap-2 md:block md:text-center">
                      <span className="md:hidden w-20 text-[11px] text-gray-400 font-semibold">
                        Application:
                      </span>
                      10
                    </div>
                  </td>

                  {/* STATUS */}
                  <td className="px-3 pt-2 md:px-4 md:py-3 block md:table-cell md:text-center">
                  <div className="flex gap-2 md:block md:text-center">
                      <span className="md:hidden w-20 text-[11px] text-gray-400 font-semibold">
                        Application:
                      </span>
                    <span
                      className={`px-2 py-0.5 text-[9px] md:px-3 md:py-1 md:text-[10px] font-black uppercase rounded-full ${
                        job.jobSummary?.jobStatus === "active"
                          ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                          : "bg-red-50 text-red-600 border border-red-100"
                      }`}
                    >
                      
                      {job.jobSummary?.jobStatus}
                    </span>
                    </div>
                 
                  </td>

                  {/* ACTIONS */}
                  <td className="px-3  md:px-4 md:py-3 block md:table-cell text-right relative">
                    <button
                      onClick={() =>
                        setActiveMenu(activeMenu === job.id ? null : job.id)
                      }
                      className=" hover:bg-gray-200 rounded-md"
                    >
                      <MoreVertical size={16} />
                    </button>

                    {activeMenu === job.id && (
                      <div className="absolute right-7 md:right-10 -top-18 lg:-top-11 w-40 bg-white shadow-xl border rounded-lg z-60">
                        <button
                          onClick={() => {
                            setViewingJob(job);
                            setActiveMenu(null);
                          }}
                          className="w-full px-3 py-2  text-xs flex gap-2 hover:bg-gray-50"
                        >
                          <Eye size={12} /> View
                        </button>

                        <button
                          onClick={() => {
                            setEditingJob(job);
                            setActiveMenu(null);
                          }}
                          className="w-full px-3 py-2 text-xs flex gap-2 hover:bg-gray-50"
                        >
                          <Edit3 size={12} /> Edit
                        </button>

                        <button
                          onClick={() => {
                            setJobs(jobs.filter((j) => j.id !== job.id));
                            setActiveMenu(null);
                          }}
                          className="w-full px-3 py-2 text-xs flex gap-2 text-red-600 hover:bg-red-50"
                        >
                          <Trash2 size={12} /> Delete
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

      {/* MODALS */}
      {viewingJob && (
        <JobDetailsModal job={viewingJob} onClose={() => setViewingJob(null)} />
      )}

      {editingJob && (
        <EditJobModal
          job={editingJob}
          onClose={() => setEditingJob(null)}
          onSave={(updated) => {
            setJobs(jobs.map((j) => (j.id === updated.id ? updated : j)));
            setEditingJob(null);
          }}
        />
      )}
    </div>
  );
}
