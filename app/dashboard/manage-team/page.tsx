"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import AddMemberModal from "./Components/AddMemberModal";
import ViewMemberModal from "./Components/ViewMemberModal";
import EditMemberModal from "./Components/EditMemberModal";
import DeleteConfirmModal from "./Components/DeleteConfirmModal";
import {
  useGetTeamMembersQuery,
  useCreateTeamMemberMutation,
  useUpdateTeamMemberMutation,
  useDeleteTeamMemberMutation,
  TeamMember as APITeamMember,
} from "@/redux/service/teamApi";

export const DEPARTMENTS = [
  "Management",
  "Human Resources",
  "CUSTOM_DEVELOPMENT",
  "CMS",
  "Shopify",
  "Finance",
  "Operations",
  "Marketing",
  "Graphics Design",
  "App Development",
] as const;

export type Department = (typeof DEPARTMENTS)[number];

export type TeamMember = APITeamMember;

export interface AddMemberFormData {
  name: string;
  fullName?: string;
  position: string;
  department: string;
  experience: number | string;
  description: string;
  profilePhoto?: File | string;
  email?: string;
  phone?: number;
  linkedin?: string;
  skills?: string[];
  startDate?: string | null;
  endDate?: string | null;
  reportingTo?: string | null;
  status?: "ACTIVE" | "INACTIVE";
}

export default function TeamManagement() {
  const router = useRouter();
  const { user, token } = useSelector((state: RootState) => state.auth);

  // Redirect non-admin users
  useEffect(() => {
    if (!token || !user) {
      router.push("/login");
    } else if (user.role !== "ADMIN") {
      router.push("/dashboard");
    }
  }, [token, user, router]);

  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [departmentFilter, setDepartmentFilter] = useState<"All" | Department>("All");

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  // Redux hooks
  const { data: teamResponse, isLoading: loading, error: queryError } = useGetTeamMembersQuery({
    page: 1,
    limit: 100,
  });
  const [createTeamMember] = useCreateTeamMemberMutation();
  const [updateTeamMember] = useUpdateTeamMemberMutation();
  const [deleteTeamMember] = useDeleteTeamMemberMutation();

  const teamData = teamResponse?.data || [];

  // Debug logging
  useEffect(() => {
    console.log("Team data loaded:", teamData.length, "members");
    console.log("Loading:", loading);
    console.log("Query error:", queryError);
    console.log("User role:", user?.role);
    console.log("Token present:", !!token);
  }, [teamData, loading, queryError, user, token]);

  // Show loading while checking authentication
  if (!user || !token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#0ddaa0]"></div>
          <p className="mt-4 text-slate-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Show access denied for non-admin users
  if (user.role !== "ADMIN") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-50 px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl border border-red-200 p-8 text-center">
          <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-6">
            Only administrators can manage team members.
          </p>
          <button
            onClick={() => router.push("/dashboard")}
            className="px-6 py-3 bg-gradient-to-r from-[#0ddaa0] to-[#8ce064] text-white rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const handleAddMember = async (formData: FormData) => {
    try {
      console.log("Creating team member...");
      const result = await createTeamMember(formData).unwrap();
      console.log("Team member created successfully:", result);
      setSuccessMessage("Team member added successfully!");
      setIsAddModalOpen(false);
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error: any) {
      console.error("Error creating team member:", error);
      const message = error?.data?.message || error?.message || "Failed to add team member";
      setErrorMessage(`✕ ${message}`);
      setTimeout(() => setErrorMessage(""), 3000);
    }
  };

  const handleEditMember = async (formData: FormData) => {
    if (!selectedMember) return;

    try {
      console.log("Updating team member with ID:", selectedMember.id);
      const result = await updateTeamMember({
        id: Number(selectedMember.id),
        formData,
      }).unwrap();
      console.log("Team member updated successfully:", result);
      setSuccessMessage("Team member updated successfully!");
      setIsEditModalOpen(false);
      setSelectedMember(null);
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error: any) {
      console.error("Error updating team member:", error);
      const message = error?.data?.message || error?.message || "Failed to update team member";
      setErrorMessage(` ${message}`);
      setTimeout(() => setErrorMessage(""), 3000);
    }
  };

  const handleDeleteMember = async () => {
    if (!selectedMember) return;

    try {
      console.log("Deleting team member with ID:", selectedMember.id);
      const result = await deleteTeamMember(Number(selectedMember.id)).unwrap();
      console.log("Team member deleted successfully:", result);
      setSuccessMessage("✓ Team member deleted successfully!");
      setIsDeleteModalOpen(false);
      setSelectedMember(null);
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error: any) {
      console.error("Error deleting team member:", error);
      const message = error?.data?.message || error?.message || "Failed to delete team member";
      setErrorMessage(`✕ ${message}`);
      setTimeout(() => setErrorMessage(""), 3000);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, departmentFilter]);

  const filteredData = teamData.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(member.experience).toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment =
      departmentFilter === "All" || member.department === departmentFilter;

    return matchesSearch && matchesDepartment;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 py-5 px-4 sm:px-6 lg:px-8">
      {/* Background Animation */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 opacity-30">
        <motion.div
          animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
          transition={{ duration: 25, repeat: Infinity, repeatType: "reverse" }}
          className="w-full h-full"
          style={{
            background:
              "linear-gradient(135deg, rgba(13, 218, 160, 0.05), rgba(140, 224, 100, 0.05), rgba(2, 132, 199, 0.05))",
            backgroundSize: "400% 400%",
          }}
        />
      </div>

      <div className="max-w-400 mx-auto relative z-10">
        {/* Messages */}
        <AnimatePresence>
          {successMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6 p-4 bg-green-100 border-2 border-green-400 rounded-lg text-green-700 font-semibold text-center shadow-lg"
            >
              {successMessage}
            </motion.div>
          )}
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6 p-4 bg-red-100 border-2 border-red-400 rounded-lg text-red-700 font-semibold text-center shadow-lg"
            >
              {errorMessage}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row gap-4 justify-between items-center mb-2"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#0ddaa0] to-[#8ce064]">
              Team Management
            </h1>
            <p className="text-slate-600 mt-2 text-center md:text-left">
              Total Members:{" "}
              <span className="font-bold text-[#0ddaa0]">{teamData.length}</span>
            </p>
          </div>
          <motion.button
            onClick={() => setIsAddModalOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-2 py-2 bg-gradient-to-r from-[#0ddaa0] to-[#8ce064] text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-1 md:gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Member
          </motion.button>
        </motion.div>

        {/* Search & Filter */}
        <div className="flex justify-between sm:flex-row gap-4 mb-2">
          <input
            type="text"
            placeholder="Search by name, position, experience..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-1/2 px-4 py-3 rounded-lg border-2 border-slate-200 focus:outline-none focus:border-[#0ddaa0] transition"
          />
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value as "All" | Department)}
            className="w-full sm:w-1/4 px-4 py-3 rounded-lg border-2 border-slate-200 focus:outline-none focus:border-[#0ddaa0] transition bg-white"
          >
            <option value="All">All Departments</option>
            {DEPARTMENTS.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-xl border-2 border-slate-200 shadow-xl overflow-hidden"
        >
          {loading ? (
            <div className="flex items-center justify-center h-96">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 border-4 border-slate-200 border-t-[#0ddaa0] rounded-full"
              />
            </div>
          ) : teamData.length === 0 ? (
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <svg className="w-16 h-16 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.856-1.487M15 10a3 3 0 11-6 0 3 3 0 016 0zM6 20H1v-2a6 6 0 016-6v0" />
                </svg>
                <p className="text-slate-500 font-semibold">No team members yet</p>
              </div>
            </div>
          ) : (
            <div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-[#0ddaa0]/10 to-[#8ce064]/10 border-b-2 border-slate-200">
                      <th className="px-4 py-4 text-left text-sm font-bold text-slate-900 w-12">#</th>
                      <th className="px-4 py-4 text-left text-sm font-bold text-slate-900 min-w-[150px]">Name</th>
                      <th className="px-4 py-4 text-left text-sm font-bold text-slate-900 min-w-[140px]">Position</th>
                      <th className="px-4 py-4 text-left text-sm font-bold text-slate-900 min-w-[140px]">Department</th>
                      <th className="px-4 py-4 text-left text-sm font-bold text-slate-900 min-w-[120px]">Experience</th>
                      <th className="px-4 py-4 text-center text-sm font-bold text-slate-900 min-w-[150px]">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData.map((member, index) => (
                      <motion.tr
                        key={member.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b border-slate-200 hover:bg-slate-50 transition-colors"
                      >
                        <td className="px-4 py-4 text-sm text-slate-600 font-semibold">{index + 1}</td>
                        <td className="px-4 py-4 text-sm font-semibold text-slate-900">{member.name}</td>
                        <td className="px-4 py-4 text-sm text-slate-700">{member.position}</td>
                        <td className="px-4 py-4 text-sm">
                          <span className="px-3 py-1 bg-[#0ddaa0]/10 text-[#0ddaa0] rounded-full text-xs font-semibold whitespace-nowrap">
                            {member.department}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-sm text-slate-700">{member.experience}</td>
                        <td className="px-4 py-4 text-center">
                          <div className="flex gap-2 justify-center flex-wrap">
                            <motion.button
                              onClick={() => {
                                setSelectedMember(member);
                                setIsViewModalOpen(true);
                              }}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                              title="View"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            </motion.button>
                            <motion.button
                              onClick={() => {
                                setSelectedMember(member);
                                setIsEditModalOpen(true);
                              }}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              className="p-2 rounded-lg bg-green-100 text-green-600 hover:bg-green-200 transition-colors"
                              title="Edit"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </motion.button>
                            <motion.button
                              onClick={() => {
                                setSelectedMember(member);
                                setIsDeleteModalOpen(true);
                              }}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                              title="Delete"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </motion.button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>

                {/* Pagination */}
                <div className="flex justify-between items-center px-6 py-3 border-t bg-slate-50">
                  <p className="text-sm text-slate-600">
                    Page <span className="font-semibold">{currentPage}</span> of{" "}
                    <span className="font-semibold">{totalPages}</span>
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 text-sm font-semibold rounded-lg border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100 transition"
                    >
                      Prev
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-4 py-2 text-sm font-semibold rounded-lg border transition ${
                          currentPage === i + 1
                            ? "bg-[#0ddaa0] text-white border-[#0ddaa0]"
                            : "hover:bg-slate-100"
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 text-sm font-semibold rounded-lg border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100 transition"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Modals */}
      <AddMemberModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddMember}
      />
      <ViewMemberModal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false);
          setSelectedMember(null);
        }}
        member={selectedMember}
      />
      <EditMemberModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedMember(null);
        }}
        member={selectedMember}
        onSubmit={handleEditMember}
      />
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedMember(null);
        }}
        member={selectedMember}
        onConfirm={handleDeleteMember}
      />
    </div>
  );
}