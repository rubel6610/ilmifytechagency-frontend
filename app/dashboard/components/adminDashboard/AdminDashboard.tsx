"use client";

import React from "react";
import {
  Briefcase,
  Users,
  FileText,
  FolderOpen,
  TrendingUp,
  Activity,
  UserCheck,
  Calendar,
} from "lucide-react";
import CountUp from "react-countup";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useGetJobsQuery } from "@/redux/service/jobApi";
import { useGetBlogsQuery } from "@/redux/service/blogApi";
import { useGetProjectsQuery } from "@/redux/service/projectApi";
import { useAllUserQuery } from "@/redux/service/userApi";

const AdminDashboard = () => {
  // Fetch data from APIs
  const { data: jobsData, isLoading: jobsLoading } = useGetJobsQuery({ page: 1, limit: 100 });
  const { data: blogsData, isLoading: blogsLoading } = useGetBlogsQuery({ page: 1, limit: 100 });
  const { data: projectsData, isLoading: projectsLoading } = useGetProjectsQuery({ page: 1, limit: 100 });
  const { data: usersData, isLoading: usersLoading } = useAllUserQuery({ page: 1, limit: 100 });

  const isLoading = jobsLoading || blogsLoading || projectsLoading || usersLoading;

  // Calculate statistics
  const totalJobs = jobsData?.meta?.total || 0;
  const totalBlogs = blogsData?.data?.total || 0;
  const totalProjects = projectsData?.meta?.total || 0;
  const totalUsers = usersData?.data?.total || 0;

  const activeJobs = jobsData?.data?.filter(job => job.applicationStatus === "OPEN").length || 0;
  const closedJobs = jobsData?.data?.filter(job => job.applicationStatus === "CLOSED").length || 0;

  // Chart data - Jobs by type
  const jobTypeData = [
    { name: "Full Time", value: jobsData?.data?.filter(j => j.employmentType === "FULL_TIME").length || 0 },
    { name: "Part Time", value: jobsData?.data?.filter(j => j.employmentType === "PART_TIME").length || 0 },
    { name: "Internship", value: jobsData?.data?.filter(j => j.employmentType === "INTERNSHIP").length || 0 },
  ];

  // Chart data - Projects status
  const projectStatusData = [
    { name: "Published", value: projectsData?.data?.filter(p => p.status === "published-to-showcase").length || 0 },
    { name: "Draft", value: projectsData?.data?.filter(p => p.status === "draft").length || 0 },
  ];

  // Monthly activity data (mock data for demonstration)
  const monthlyData = [
    { month: "Jan", jobs: 12, blogs: 8, projects: 5 },
    { month: "Feb", jobs: 15, blogs: 12, projects: 7 },
    { month: "Mar", jobs: 18, blogs: 15, projects: 9 },
    { month: "Apr", jobs: 22, blogs: 18, projects: 11 },
    { month: "May", jobs: 25, blogs: 20, projects: 14 },
    { month: "Jun", jobs: 28, blogs: 24, projects: 16 },
  ];

  const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#8b5cf6"];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-semibold text-gray-700">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

 return (
  <div className="min-h-screen  py-8 px-4 sm:px-6 lg:px-8">
    <div className="max-w-400 mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-black text-gray-800 mb-2">
          Admin Dashboard
        </h1>
        <p className="text-gray-700">Welcome back! Here is what is happening with your platform.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Users */}
        <div className="bg-gradient-to-br bg-white/10   rounded-3xl p-6 shadow-lg border border-white/40 hover:shadow-xl hover:border-white/60 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-white/40 backdrop-blur-sm p-3 rounded-2xl shadow-sm border border-white/50">
              <Users className="text-blue-600" size={24} />
            </div>
            <TrendingUp className="text-green-600" size={20} />
          </div>
          <h3 className="text-gray-800 text-sm font-medium mb-1">Total Users</h3>
          <p className="text-3xl font-black text-gray-800">
            <CountUp end={totalUsers} duration={2} />
          </p>
        </div>

        {/* Total Jobs */}
        <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/40 hover:shadow-xl hover:border-white/60 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-white/40 backdrop-blur-sm p-3 rounded-2xl shadow-sm border border-white/50">
              <Briefcase className="text-emerald-600" size={24} />
            </div>
            <Activity className="text-emerald-600" size={20} />
          </div>
          <h3 className="text-gray-800 text-sm font-medium mb-1">Total Jobs</h3>
          <p className="text-3xl font-black text-gray-800">
            <CountUp end={totalJobs} duration={2} />
          </p>
          <p className="text-xs text-gray-800 mt-2">
            <span className="text-emerald-600 font-semibold">{activeJobs} Active</span> · {closedJobs} Closed
          </p>
        </div>

        {/* Total Blogs */}
        <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/40 hover:shadow-xl hover:border-white/60 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-white/40 backdrop-blur-sm p-3 rounded-2xl shadow-sm border border-white/50">
              <FileText className="text-purple-600" size={24} />
            </div>
            <Activity className="text-purple-600" size={20} />
          </div>
          <h3 className="text-gray-800 text-sm font-medium mb-1">Total Blogs</h3>
          <p className="text-3xl font-black text-gray-800">
            <CountUp end={totalBlogs} duration={2} />
          </p>
        </div>

        {/* Total Projects */}
        <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/40 hover:shadow-xl hover:border-white/60 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-white/40 backdrop-blur-sm p-3 rounded-2xl shadow-sm border border-white/50">
              <FolderOpen className="text-orange-600" size={24} />
            </div>
            <Activity className="text-orange-600" size={20} />
          </div>
          <h3 className="text-gray-800 text-sm font-medium mb-1">Total Projects</h3>
          <p className="text-3xl font-black text-gray-800">
            <CountUp end={totalProjects} duration={2} />
          </p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Monthly Activity Chart */}
        <div className="bg-gradient-to-br from-gray-100/60 to-gray-50/40 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/40">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Calendar className="text-emerald-600" size={20} />
            Monthly Activity
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="jobs" stroke="#10b981" strokeWidth={2} />
              <Line type="monotone" dataKey="blogs" stroke="#8b5cf6" strokeWidth={2} />
              <Line type="monotone" dataKey="projects" stroke="#f59e0b" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Job Types Distribution */}
        <div className="bg-gradient-to-br from-gray-100/60 to-gray-50/40 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/40">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Briefcase className="text-emerald-600" size={20} />
            Job Types Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={jobTypeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {jobTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Additional Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Content Overview */}
        <div className="bg-gradient-to-br from-gray-100/60 to-gray-50/40 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/40">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Activity className="text-emerald-600" size={20} />
            Content Overview
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={[
                { name: "Jobs", count: totalJobs },
                { name: "Blogs", count: totalBlogs },
                { name: "Projects", count: totalProjects },
                { name: "Users", count: totalUsers },
              ]}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Bar dataKey="count" fill="#10b981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Project Status */}
        <div className="bg-gradient-to-br from-gray-100/60 to-gray-50/40 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/40">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <FolderOpen className="text-emerald-600" size={20} />
            Project Status
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={projectStatusData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis type="number" stroke="#6b7280" />
              <YAxis dataKey="name" type="category" stroke="#6b7280" />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-gradient-to-br from-gray-100/60 to-gray-50/40 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/40">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <UserCheck className="text-emerald-600" size={20} />
          Quick Statistics
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 backdrop-blur-sm rounded-2xl shadow-md border border-white/50">
            <p className="text-2xl font-black text-emerald-600">
              <CountUp end={activeJobs} duration={2} />
            </p>
            <p className="text-xs text-gray-800 mt-1">Active Jobs</p>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-blue-500/20 to-blue-600/10 backdrop-blur-sm rounded-2xl shadow-md border border-white/50">
            <p className="text-2xl font-black text-blue-600">
              <CountUp end={totalUsers} duration={2} />
            </p>
            <p className="text-xs text-gray-800 mt-1">Total Users</p>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-purple-500/20 to-purple-600/10 backdrop-blur-sm rounded-2xl shadow-md border border-white/50">
            <p className="text-2xl font-black text-purple-600">
              <CountUp end={totalBlogs} duration={2} />
            </p>
            <p className="text-xs text-gray-800 mt-1">Published Blogs</p>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-orange-500/20 to-orange-600/10 backdrop-blur-sm rounded-2xl shadow-md border border-white/50">
            <p className="text-2xl font-black text-orange-600">
              <CountUp end={projectsData?.data?.filter(p => p.status === "published-to-showcase").length || 0} duration={2} />
            </p>
            <p className="text-xs text-gray-800 mt-1">Showcased Projects</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);
};

export default AdminDashboard;
