"use client";

import React, { useState, useEffect } from "react";
import { HiOutlineUsers, HiSearch, HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { CgSpinner } from "react-icons/cg";
import { role } from "../page";

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
}

const ManageUser = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const usersPerPage = 10;

  const currentUserRole: "admin" | "user" = role; 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch("/json/users.json");
        const data: User[] = await response.json();
        setTimeout(() => {
          setUsers(data);
          setLoading(false);
        }, 600);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const currentUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const toggleRole = (id: string) => {
    if (currentUserRole !== "admin") {
      alert("Access Denied! You do not have permission to perform this action.");
      return;
    }
    setUsers(users.map(u => 
      u.id === id ? { ...u, role: u.role === "admin" ? "user" : "admin" } : u
    ));
  };

  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-white">
        <CgSpinner className="text-5xl text-emerald-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-4 md:p-6 lg:p-12 text-black font-sans">
      <div className="max-w-400 mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <HiOutlineUsers className="text-2xl text-primary" />
              <h1 className="text-2xl md:text-3xl font-medium text-gray-800 tracking-tight">
                User <span className="text-primary">Management</span>
              </h1>
            </div>
            <p className="text-xs text-gray-500 font-medium tracking-wide uppercase">
              {filteredUsers.length} total members
            </p>
          </div>

          <div className="relative w-full sm:w-64 md:w-80">
            <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              onChange={(e) => { 
                setSearchQuery(e.target.value); 
                setCurrentPage(1); 
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
                  <th className="px-4 py-4 text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {currentUsers.length > 0 ? (
                  currentUsers.map((user) => (
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
                          user.role === "admin" 
                          ? "bg-emerald-600 text-white border-emerald-600" 
                          : "bg-emerald-50 text-emerald-700 border-emerald-100"
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => toggleRole(user.id)}
                          className="px-3 py-1.5 text-[9px] md:text-[10px] font-black uppercase rounded-lg border border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all active:scale-95 whitespace-nowrap"
                        >
                          {user.role === "admin" ? "Make User" : "Make Admin"}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-20 text-center text-gray-400 text-xs uppercase font-bold tracking-widest">No users found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="px-6 py-4 bg-white border-t border-gray-100 flex justify-center items-center">
            <div className="flex items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => p - 1)}
                className="p-1.5 border border-gray-100 rounded-lg hover:border-emerald-500 hover:text-emerald-600 disabled:opacity-20 transition-all"
              >
                <HiChevronLeft className="text-lg" />
              </button>

              <div className="flex items-center gap-1 mx-2">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-7 h-7 text-[10px] font-bold rounded-lg transition-all ${
                      currentPage === i + 1 
                      ? "bg-emerald-600 text-white" 
                      : "text-gray-400 hover:text-emerald-600 hover:bg-emerald-50"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={() => setCurrentPage(p => p + 1)}
                className="p-1.5 border border-gray-100 rounded-lg hover:border-emerald-500 hover:text-emerald-600 disabled:opacity-20 transition-all"
              >
                <HiChevronRight className="text-lg" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageUser;