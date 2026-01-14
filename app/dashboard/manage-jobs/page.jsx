"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, MoreVertical, Briefcase, ChevronLeft, ChevronRight, Plus, Eye, Edit3, Trash2 } from "lucide-react";
import JobDetailsModal from "./Components/JobDetailsModal";
import EditJobModal from "./Components/EditJobModal";

export default function JobManagementPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [activeMenu, setActiveMenu] = useState(null);
  
  // Modals
  const [viewingJob, setViewingJob] = useState(null);
  const [editingJob, setEditingJob] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;


  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("/jobs.json"); // This will eventually be your API route
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

  // Filter Logic based on your specific JSON keys
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || job.jobSummary?.jobStatus.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const currentJobs = filteredJobs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleDelete = (id) => {
    if (confirm("Permanently delete this job listing?")) {
      setJobs(jobs.filter(j => j.id !== id));
      setActiveMenu(null);
    }
  };

  if (loading) return <div className="p-20 text-center font-bold text-[#0ddaa0]">Initializing Admin Dashboard...</div>;

  return (
    <div className="min-h-screen bg-white ">
      <div className="max-w-400 mx-auto py-6">
        {/* Header Area */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-black text-gray-900 flex items-center gap-2">
              <div className="bg-[#0ddaa0] p-2 rounded-lg text-white"><Briefcase size={20}/></div>
              JOB MANAGEMENT
            </h1>
            <p className="text-gray-500 text-sm mt-1">Found {filteredJobs.length} total positions in database</p>
          </div>
          
          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search jobs..." 
                className="pl-10 pr-4 py-2.5 border rounded-xl focus:border-none w-full bg-white focus:ring-2 focus:ring-[#0ddaa0]  outline-none"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select 
              className="border rounded-xl   px-4 py-2.5 bg-white font-medium text-gray-600 outline-none"
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                <th className="px-6 py-4">Position</th>
                <th className="px-6 py-4">Posted Date</th>
                <th className="px-6 py-4">Deadline</th>
                <th className="px-6 py-4 text-center">Application</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {currentJobs.map((job) => (
                <tr key={job.id} className="hover:bg-gray-50/50 transition-colors border-b border-gray-500">
                  <td className="px-6 py-4">
                    <div className="font-bold text-gray-800">{job.title}</div>
                    <div className="text-xs text-gray-400">{job.employmentInfo?.jobLocation.city}, {job.employmentInfo?.jobLocation.country}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{job.jobSummary?.publishedDate}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-orange-600">{job.jobSummary?.applicationDeadline}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-center">10</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                      job.jobSummary?.jobStatus.toLowerCase() === 'active' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-red-50 text-red-600 border border-red-100'
                    }`}>
                      {job.jobSummary?.jobStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right relative">
                    <button 
                      onClick={() => setActiveMenu(activeMenu === job.id ? null : job.id)}
                      className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      <MoreVertical size={18} className="text-gray-500" />
                    </button>

                    {/* 3-Dot Dropdown */}
                    {activeMenu === job.id && (
                      <div className="absolute right-12 -top-8 w-44 bg-white shadow-2xl border rounded-xl   animate-in fade-in zoom-in duration-100">
                        <button onClick={() => { setViewingJob(job); setActiveMenu(null); }} className="w-full text-left px-4 py-1 text-sm rounded-t-2xl hover:bg-gray-50 flex items-center gap-2"><Eye size={14}/> View Details</button>
                        <button onClick={() => { setEditingJob(job); setActiveMenu(null); }} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2"><Edit3 size={14}/> Edit Position</button>
                        <div className="h-px bg-gray-100 "></div>
                        <button onClick={() => handleDelete(job.id)} className="w-full text-left px-4 py-1 text-sm hover:bg-red-50 rounded-b-2xl text-red-600 flex items-center gap-2"><Trash2 size={14}/> Delete Job</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      {viewingJob && <JobDetailsModal job={viewingJob} onClose={() => setViewingJob(null)} />}
      {editingJob && <EditJobModal job={editingJob} onClose={() => setEditingJob(null)} onSave={(updated) => {
          setJobs(jobs.map(j => j.id === updated.id ? updated : j));
          setEditingJob(null);
      }} />}
    </div>
  );
} 