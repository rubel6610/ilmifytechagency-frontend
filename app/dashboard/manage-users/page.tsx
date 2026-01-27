"use client";

import React, { useState, useMemo } from "react";
import { HiOutlineUsers, HiSearch, HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { CgSpinner } from "react-icons/cg";
import { useAllUserQuery } from "redux/service/userApi";


// Match your actual API response structure


const ManageUser = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const usersPerPage = 10;

  // Fetch data from RTK Query
  const { 
    data: allUserData, 
    isLoading, 
    isError,
    refetch 
  } = useAllUserQuery({ 
    page: currentPage, 
    limit: usersPerPage 
  });


  console.log(allUserData,"allusr");
  
  // Filter users based on search query (client-side filtering)
  const filteredUsers = useMemo(() => {
    if (!allUserData?.data.users) return [];
    
    return allUserData.data.users.filter(user =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [allUserData, searchQuery]);

  // Loading state
  if (isLoading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-white">
        <CgSpinner className="text-5xl text-emerald-600 animate-spin" />
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB]">
        <div className="bg-white p-8 rounded-2xl shadow-sm text-center max-w-md">
          <h3 className="text-xl font-bold text-red-600 mb-2">Failed to load users</h3>
          <p className="text-gray-600 mb-4">Please try again later</p>
          <button 
            onClick={() => refetch()}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Calculate pagination values from API response
  const totalPages = allUserData?.data.totalPages || 1;
  const totalUsers = allUserData?.data.total || 0;

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-4 md:p-6 lg:p-12 text-black font-sans">
      <div className="max-w-400 mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <HiOutlineUsers className="text-2xl text-emerald-600" />
              <h1 className="text-2xl md:text-3xl font-medium text-gray-800 tracking-tight">
                User <span className="text-emerald-600">Management</span>
              </h1>
            </div>
            <p className="text-xs text-gray-500 font-medium tracking-wide uppercase">
              {totalUsers} total members
            </p>
          </div>

          <div className="relative w-full sm:w-64 md:w-80">
            <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => { 
                setSearchQuery(e.target.value); 
                setCurrentPage(1); // Reset to first page on search
              }}
              className="w-full pl-9 pr-4 py-2.5 bg-[#F9FAFB] border border-gray-200 rounded-xl outline-none focus:border-emerald-500 text-sm transition-all"
            />
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left table-auto border-collapse min-w-125 sm:min-w-full">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-100">
                  <th className="px-4 py-4 text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest">Member</th>
                  <th className="px-4 py-4 text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest">Email</th>
                  <th className="px-4 py-4 text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-emerald-50/10 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 shrink-0 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-[10px] border border-emerald-200 uppercase">
                            {user.name.charAt(0)}
                          </div>
                          <div className="font-bold text-gray-900 text-xs md:text-sm uppercase whitespace-nowrap">
                            {user.name}
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">
                        {user.email}
                      </td>

                      <td className="px-4 py-3 text-center">
                        <span className={`inline-block px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-tighter border ${
                          user.role === "ADMIN" 
                            ? "bg-emerald-600 text-white border-emerald-600" 
                            : "bg-gray-100 text-gray-700 border-gray-200"
                        }`}>
                          {user.role}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="py-20 text-center text-gray-400 text-xs uppercase font-bold tracking-widest">
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          {totalPages > 1 && (
            <div className="px-6 py-4 bg-white border-t border-gray-100 flex justify-center items-center">
              <div className="flex items-center gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  className="p-1.5 border border-gray-100 rounded-lg hover:border-emerald-500 hover:text-emerald-600 disabled:opacity-20 transition-all"
                >
                  <HiChevronLeft className="text-lg" />
                </button>

                <div className="flex items-center gap-1 mx-2">
                  {[...Array(Math.min(totalPages, 5))].map((_, i) => {
                    const pageNum = Math.min(
                      Math.max(currentPage - 2, 1),
                      totalPages - 4
                    ) + i;
                    
                    if (pageNum > totalPages) return null;
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-7 h-7 text-[10px] font-bold rounded-lg transition-all ${
                          currentPage === pageNum 
                            ? "bg-emerald-600 text-white" 
                            : "text-gray-400 hover:text-emerald-600 hover:bg-emerald-50"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  disabled={currentPage >= totalPages}
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  className="p-1.5 border border-gray-100 rounded-lg hover:border-emerald-500 hover:text-emerald-600 disabled:opacity-20 transition-all"
                >
                  <HiChevronRight className="text-lg" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageUser;