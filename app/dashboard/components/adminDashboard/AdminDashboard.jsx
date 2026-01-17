"use client";

import React from "react";
import { Construction, BarChart3, Clock } from "lucide-react";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-amber-50 to-orange-100 px-4">
      <div className="max-w-xl w-full bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 sm:p-10 text-center">
        {/* Icon */}
        <div className="mx-auto mb-6 w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg">
          <Construction className="text-white" size={36} />
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-3">
          Dashboard Under Development
        </h1>

        {/* Description */}
        <p className="text-gray-500 text-sm sm:text-base mb-6 leading-relaxed">
          We are currently working on building powerful analytics and insights
          for your admin dashboard. All important statistics and reports will
          appear here soon.
        </p>

        {/* Feature Preview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="flex flex-col items-center gap-2 bg-gray-50 rounded-xl p-4 border border-gray-100">
            <BarChart3 className="text-emerald-500" size={22} />
            <span className="text-xs font-semibold text-gray-600">
              Live Statistics
            </span>
          </div>

          <div className="flex flex-col items-center gap-2 bg-gray-50 rounded-xl p-4 border border-gray-100">
            <Clock className="text-blue-500" size={22} />
            <span className="text-xs font-semibold text-gray-600">
              Real-time Updates
            </span>
          </div>

          <div className="flex flex-col items-center gap-2 bg-gray-50 rounded-xl p-4 border border-gray-100">
            <BarChart3 className="text-purple-500" size={22} />
            <span className="text-xs font-semibold text-gray-600">
              Smart Reports
            </span>
          </div>
        </div>

        {/* Footer Text */}
        <p className="text-xs text-gray-400">
          🚀 Please check back soon — exciting features are on the way!
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard;
