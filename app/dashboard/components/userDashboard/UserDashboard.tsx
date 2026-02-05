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
    <div className="min-h-screen bg-[#f8fafc] relative overflow-hidden py-8 px-4 sm:px-6 lg:px-8">
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100/40 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-100/40 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[20%] right-[10%] w-[20%] h-[20%] bg-purple-100/30 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-2">
            <div className="h-10 w-2 bg-blue-500 rounded-full" />
            <h1 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tight">
              Welcome back, {user?.name || "User"}! 👋
            </h1>
          </div>
          <p className="text-slate-500 font-medium ml-6">
            Here's an overview of your career activity and latest opportunities.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {/* My Applications */}
          <div className="group bg-white/60 backdrop-blur-xl rounded-[2rem] p-6 shadow-xl shadow-slate-200/50 border border-white/80 hover:bg-white/80 transition-all duration-500">
            <div className="flex items-center justify-between mb-6">
              <div className="bg-blue-500/10 p-4 rounded-2xl group-hover:scale-110 transition-transform duration-500">
                <Send className="text-blue-600" size={28} />
              </div>
              <div className="flex items-center gap-1 bg-blue-50 px-3 py-1 rounded-full">
                <TrendingUp className="text-blue-600" size={14} />
                <span className="text-[10px] font-bold text-blue-700 uppercase">Live</span>
              </div>
            </div>
            <h3 className="text-slate-500 text-sm font-bold mb-1 uppercase tracking-wider">My Applications</h3>
            <div className="flex items-baseline gap-2">
              <p className="text-4xl font-black text-slate-800">
                <CountUp end={myApplications} duration={2} />
              </p>
              <span className="text-orange-600 text-xs font-bold uppercase">{pendingApplications} Pending</span>
            </div>
          </div>

          {/* Available Jobs */}
          <div className="group bg-white/60 backdrop-blur-xl rounded-[2rem] p-6 shadow-xl shadow-slate-200/50 border border-white/80 hover:bg-white/80 transition-all duration-500">
            <div className="flex items-center justify-between mb-6">
              <div className="bg-emerald-500/10 p-4 rounded-2xl group-hover:scale-110 transition-transform duration-500">
                <Briefcase className="text-emerald-600" size={28} />
              </div>
              <CheckCircle2 className="text-emerald-600" size={20} />
            </div>
            <h3 className="text-slate-500 text-sm font-bold mb-1 uppercase tracking-wider">Available Jobs</h3>
            <div className="flex items-baseline gap-2">
              <p className="text-4xl font-black text-slate-800">
                <CountUp end={activeJobs} duration={2} />
              </p>
              <div className="flex items-center gap-1 text-[10px] text-slate-500 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                ACTIVE POSITIONS
              </div>
            </div>
          </div>

          {/* Accepted */}
          <div className="group bg-white/60 backdrop-blur-xl rounded-[2rem] p-6 shadow-xl shadow-slate-200/50 border border-white/80 hover:bg-white/80 transition-all duration-500">
            <div className="flex items-center justify-between mb-6">
              <div className="bg-green-500/10 p-4 rounded-2xl group-hover:scale-110 transition-transform duration-500">
                <CheckCircle2 className="text-green-600" size={28} />
              </div>
              <Clock className="text-green-500" size={20} />
            </div>
            <h3 className="text-slate-500 text-sm font-bold mb-1 uppercase tracking-wider">Accepted</h3>
            <div className="flex items-baseline gap-2">
              <p className="text-4xl font-black text-slate-800">
                <CountUp end={acceptedApplications} duration={2} />
              </p>
              <span className="text-slate-400 text-xs font-medium">Offers</span>
            </div>
          </div>

          {/* Total Blogs */}
          <div className="group bg-white/60 backdrop-blur-xl rounded-[2rem] p-6 shadow-xl shadow-slate-200/50 border border-white/80 hover:bg-white/80 transition-all duration-500">
            <div className="flex items-center justify-between mb-6">
              <div className="bg-purple-500/10 p-4 rounded-2xl group-hover:scale-110 transition-transform duration-500">
                <FileText className="text-purple-600" size={28} />
              </div>
              <Eye className="text-purple-600" size={20} />
            </div>
            <h3 className="text-slate-500 text-sm font-bold mb-1 uppercase tracking-wider">Latest Articles</h3>
            <div className="flex items-baseline gap-2">
              <p className="text-4xl font-black text-slate-800">
                <CountUp end={totalBlogs} duration={2} />
              </p>
              <span className="text-slate-400 text-xs font-medium">New Posts</span>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
          {/* Application Activity Chart */}
          <div className="xl:col-span-2 bg-white/70 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 border border-white/80">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-black text-slate-800">Activity Timeline</h3>
                <p className="text-slate-500 text-sm">Monthly application tracking</p>
              </div>
              <div className="bg-slate-100 p-2 rounded-xl">
                <Calendar className="text-slate-600" size={20} />
              </div>
            </div>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={recentActivity} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                      borderRadius: '16px', 
                      border: 'none', 
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' 
                    }}
                  />
                  <Area type="monotone" dataKey="applications" stroke="#3b82f6" strokeWidth={4} fillOpacity={1} fill="url(#colorApps)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Application Status Distribution */}
          <div className="bg-white/70 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 border border-white/80">
            <h3 className="text-xl font-black text-slate-800 mb-2">Application Status</h3>
            <p className="text-slate-500 text-sm mb-8">Success rate distribution</p>
            <div className="h-[300px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={applicationStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {applicationStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3 mt-4">
              {applicationStatusData.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx] }} />
                    <span className="font-semibold text-slate-600">{item.name}</span>
                  </div>
                  <span className="font-black text-slate-800">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Personal Summary Banner */}
          <div className="bg-slate-900 rounded-[2.5rem] p-8 shadow-2xl text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px] -mr-32 -mt-32" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-white/10 rounded-2xl">
                  <CheckCircle2 size={24} className="text-blue-400" />
                </div>
                <h3 className="text-2xl font-black">Career Snapshot</h3>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                  <p className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-2">Applications</p>
                  <p className="text-4xl font-black">{myApplications}</p>
                </div>
                <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                  <p className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-2">Acceptance</p>
                  <p className="text-4xl font-black">{((acceptedApplications/myApplications)*100).toFixed(0)}%</p>
                </div>
              </div>
              <div className="mt-8 flex items-center justify-between p-6 bg-blue-600 rounded-[2rem]">
                <div>
                  <p className="text-blue-100/70 text-xs font-bold uppercase">Ready for more?</p>
                  <p className="text-white text-xl font-black">Browse New Jobs</p>
                </div>
                <TrendingUp size={40} className="text-white/20" />
              </div>
            </div>
          </div>

          {/* Job Categories & Opportunities */}
          <div className="bg-white/70 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 border border-white/80">
            <h3 className="text-xl font-black text-slate-800 mb-6">Target Sectors</h3>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={jobCategoriesData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                >
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }} />
                  <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none' }} />
                  <Bar dataKey="value" fill="url(#colorBarUser)" radius={[10, 10, 10, 10]} barSize={40}>
                    <defs>
                      <linearGradient id="colorBarUser" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                      </linearGradient>
                    </defs>
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
