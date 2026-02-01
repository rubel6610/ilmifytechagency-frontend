"use client";

import React from "react";
import {
  Briefcase,
  FileText,
  CheckCircle2,
  Clock,
  TrendingUp,
  Calendar,
  Send,
  Eye,
} from "lucide-react";
import CountUp from "react-countup";
import {
  AreaChart,
  Area,
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
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useGetJobsQuery } from "@/redux/service/jobApi";
import { useGetBlogsQuery } from "@/redux/service/blogApi";

const UserDashboard = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  
  // Fetch data from APIs
  const { data: jobsData, isLoading: jobsLoading } = useGetJobsQuery({ page: 1, limit: 100 });
  const { data: blogsData, isLoading: blogsLoading } = useGetBlogsQuery({ page: 1, limit: 100 });

  const isLoading = jobsLoading || blogsLoading;

  // Calculate statistics
  const totalJobs = jobsData?.meta?.total || 0;
  const activeJobs = jobsData?.data?.filter(job => job.applicationStatus === "OPEN").length || 0;
  const totalBlogs = blogsData?.data?.total || 0;
  
  // Mock user-specific data (you can replace with actual API calls)
  const myApplications = 5;
  const pendingApplications = 2;
  const acceptedApplications = 2;
  const rejectedApplications = 1;

  // Application status data
  const applicationStatusData = [
    { name: "Pending", value: pendingApplications },
    { name: "Accepted", value: acceptedApplications },
    { name: "Rejected", value: rejectedApplications },
  ];

  // Recent activity data (mock)
  const recentActivity = [
    { month: "Jan", applications: 2 },
    { month: "Feb", applications: 3 },
    { month: "Mar", applications: 1 },
    { month: "Apr", applications: 4 },
    { month: "May", applications: 3 },
    { month: "Jun", applications: 5 },
  ];

  // Job categories you applied for (mock)
  const jobCategoriesData = [
    { name: "IT", value: 3 },
    { name: "Design", value: 1 },
    { name: "Marketing", value: 1 },
  ];

  const COLORS = ["#f59e0b", "#10b981", "#ef4444", "#3b82f6"];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-semibold text-gray-700">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-black text-gray-800 mb-2">
            Welcome back, {user?.name || "User"}! 👋
          </h1>
          <p className="text-gray-600">Here's an overview of your activity and available opportunities.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* My Applications */}
          <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 shadow-md border border-gray-200/50 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100/80 p-3 rounded-xl shadow-sm">
                <Send className="text-blue-600" size={24} />
              </div>
              <TrendingUp className="text-green-500" size={20} />
            </div>
            <h3 className="text-gray-500 text-sm font-medium mb-1">My Applications</h3>
            <p className="text-3xl font-black text-gray-800">
              <CountUp end={myApplications} duration={2} />
            </p>
            <p className="text-xs text-gray-500 mt-2">
              <span className="text-orange-600 font-semibold">{pendingApplications} Pending</span>
            </p>
          </div>

          {/* Available Jobs */}
          <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 shadow-md border border-gray-200/50 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/80 p-3 rounded-xl shadow-sm">
                <Briefcase className="text-emerald-600" size={24} />
              </div>
              <CheckCircle2 className="text-emerald-500" size={20} />
            </div>
            <h3 className="text-gray-500 text-sm font-medium mb-1">Available Jobs</h3>
            <p className="text-3xl font-black text-gray-800">
              <CountUp end={activeJobs} duration={2} />
            </p>
            <p className="text-xs text-gray-500 mt-2">
              <span className="text-emerald-600 font-semibold">Active positions</span>
            </p>
          </div>

          {/* Accepted */}
          <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 shadow-md border border-gray-200/50 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-br from-green-50 to-green-100/80 p-3 rounded-xl shadow-sm">
                <CheckCircle2 className="text-green-600" size={24} />
              </div>
              <Clock className="text-green-500" size={20} />
            </div>
            <h3 className="text-gray-500 text-sm font-medium mb-1">Accepted</h3>
            <p className="text-3xl font-black text-gray-800">
              <CountUp end={acceptedApplications} duration={2} />
            </p>
          </div>

          {/* Total Blogs */}
          <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 shadow-md border border-gray-200/50 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-br from-purple-50 to-purple-100/80 p-3 rounded-xl shadow-sm">
                <FileText className="text-purple-600" size={24} />
              </div>
              <Eye className="text-purple-500" size={20} />
            </div>
            <h3 className="text-gray-500 text-sm font-medium mb-1">Latest Blogs</h3>
            <p className="text-3xl font-black text-gray-800">
              <CountUp end={totalBlogs} duration={2} />
            </p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Application Activity */}
          <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 shadow-md border border-gray-200/50">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Calendar className="text-blue-600" size={20} />
              Your Application Activity
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={recentActivity}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="applications" stroke="#3b82f6" fill="#93c5fd" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Application Status */}
          <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 shadow-md border border-gray-200/50">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <CheckCircle2 className="text-blue-600" size={20} />
              Application Status
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={applicationStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {applicationStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Additional Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Job Categories */}
          <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 shadow-md border border-gray-200/50">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Briefcase className="text-blue-600" size={20} />
              Applied Job Categories
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={jobCategoriesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Quick Actions & Stats */}
          <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 shadow-md border border-gray-200/50">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Statistics</h3>
            
            <div className="space-y-4">
              {/* Stat Item */}
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50/80 to-indigo-50/80 backdrop-blur-sm rounded-xl shadow-sm border border-blue-200/50">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Send className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Applications</p>
                    <p className="text-2xl font-black text-gray-800">{myApplications}</p>
                  </div>
                </div>
              </div>

              {/* Stat Item */}
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50/80 to-teal-50/80 backdrop-blur-sm rounded-xl shadow-sm border border-emerald-200/50">
                <div className="flex items-center gap-3">
                  <div className="bg-emerald-100 p-2 rounded-lg">
                    <CheckCircle2 className="text-emerald-600" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Accepted</p>
                    <p className="text-2xl font-black text-gray-800">{acceptedApplications}</p>
                  </div>
                </div>
              </div>

              {/* Stat Item */}
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50/80 to-amber-50/80 backdrop-blur-sm rounded-xl shadow-sm border border-orange-200/50">
                <div className="flex items-center gap-3">
                  <div className="bg-orange-100 p-2 rounded-lg">
                    <Clock className="text-orange-600" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Pending</p>
                    <p className="text-2xl font-black text-gray-800">{pendingApplications}</p>
                  </div>
                </div>
              </div>

              {/* Stat Item */}
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-red-50/80 to-rose-50/80 backdrop-blur-sm rounded-xl shadow-sm border border-red-200/50">
                <div className="flex items-center gap-3">
                  <div className="bg-red-100 p-2 rounded-lg">
                    <Clock className="text-red-600" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Rejected</p>
                    <p className="text-2xl font-black text-gray-800">{rejectedApplications}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Info Banner */}
        <div className="mt-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-6 shadow-lg text-white">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h3 className="text-xl font-bold mb-2">🚀 Keep Going!</h3>
              <p className="text-blue-100">You have {activeJobs} active job opportunities waiting for you. Apply now!</p>
            </div>
            <button className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors">
              Browse Jobs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;