"use client";


import Sidebar from "./components/sidebar/SideBar";
import { role } from "./page";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="relative min-h-screen bg-slate-100">
      {/* Sidebar - Fixed position */}
      <Sidebar role={role} />

      {/* Main content - with margin for mini sidebar on mobile */}
      <main className="min-h-screen ml-16 lg:ml-64">
        {children}
      </main>
    </div>
  );
}