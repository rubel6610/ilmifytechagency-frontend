"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import TeamGridCard from "./components/TeamGridCard";
import { useGetTeamMembersQuery } from "@/redux/service/teamApi";
import type { TeamMember } from "@/redux/service/teamApi";

export default function AllTeamMembersPage() {
  const { data, isLoading, isError, error } = useGetTeamMembersQuery({
    page: 1,
    limit: 100,
  });

  const teamData: TeamMember[] = data?.data ?? [];
  const sortedMembers = [...teamData].sort((a, b) => {
  if (!a.employeeId) return 1;
  if (!b.employeeId) return -1;

  return a.employeeId.localeCompare(b.employeeId, undefined, {
    numeric: true,
    sensitivity: "base",
  });
});

  const [selectedDepartment, setSelectedDepartment] = useState<string>("All");
  const [departments, setDepartments] = useState<string[]>(["All"]);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Extract departments
  useEffect(() => {
    if (!teamData.length) return;

    const uniqueDepartments = [
      "All",
      ...Array.from(new Set(teamData.map((m) => m.department))).filter(Boolean),
    ];

    setDepartments(uniqueDepartments);
  }, [teamData]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter logic
  const filteredTeam =
    selectedDepartment === "All"
      ? teamData
      : teamData.filter(
          (member) => member.department === selectedDepartment
        );

  if (isError) {
    return (
      <div className="w-full min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-2">Failed to load team</p>
          <p className="text-slate-500 text-sm">
            {(error as any)?.data?.message || "Something went wrong"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen mt-20 bg-white text-slate-900">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center pt-20 px-4"
      >
        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#0ddaa0] to-[#8ce064]">
          Our Complete Team
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto mt-4">
          Meet all the talented people behind ilmifyTech.
        </p>
      </motion.div>

      {/* Filter */}
      <div className="max-w-6xl mx-auto px-4 py-10 flex justify-between items-center gap-4">
        <div ref={dropdownRef} className="relative">
          <button
            onClick={() => setIsDropdownOpen((p) => !p)}
            className="px-6 py-3 border rounded-lg font-semibold flex items-center gap-2"
          >
            {selectedDepartment}
          </button>

          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute mt-2 w-56 bg-white border rounded-lg shadow-lg z-50"
              >
                {departments.map((dept) => (
                  <button
                    key={dept}
                    onClick={() => {
                      setSelectedDepartment(dept);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 hover:bg-slate-100 ${
                      selectedDepartment === dept
                        ? "text-[#0ddaa0] font-bold"
                        : ""
                    }`}
                  >
                    {dept}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <p className="text-sm text-slate-600">
          Total{" "}
          <span className="font-bold text-[#0ddaa0]">
            {filteredTeam.length}
          </span>{" "}
          members
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        {isLoading ? (
          <div className="flex justify-center py-40">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="w-12 h-12 border-4 border-slate-200 border-t-[#0ddaa0] rounded-full"
            />
          </div>
        ) : filteredTeam.length === 0 ? (
          <p className="text-center text-slate-500">
            No members found in this department
          </p>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedDepartment}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {sortedMembers.map((member, index) => (
                <TeamGridCard
                  key={member.id}
                  member={member}
                  index={index}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {/* Footer CTA */}
      <div className="text-center py-20 border-t">
        <p className="text-slate-600 mb-4">
          Want to be part of our journey?
        </p>
        <Link href="/careers">
          <button className="px-8 py-3 bg-gradient-to-r from-[#0ddaa0] to-[#8ce064] text-white rounded-lg font-semibold">
            View Careers
          </button>
        </Link>
      </div>
    </div>
  );
}
