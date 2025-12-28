"use client";

import Link from "next/link";
import { Briefcase, LayoutDashboard, Plus } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-600 text-white min-h-screen p-5">
      <h2 className="text-2xl font-bold  mb-8">
        Admin Panel
      </h2>

      <nav className="space-y-4">
        <Link
          href="/dashboard"
          className="flex items-center gap-3 hover:text-sky-400"
        >
          <LayoutDashboard size={18} /> Dashboard
        </Link>

        <Link
          href="/dashboard/post-job"
          className="flex items-center gap-3 hover:text-sky-400"
        >
          <Plus size={18} /> Post Job
        </Link>

        <Link
          href="/careers"
          className="flex items-center gap-3 hover:text-sky-400"
        >
          <Briefcase size={18} /> All Jobs
        </Link>
      </nav>
    </aside>
  );
}
