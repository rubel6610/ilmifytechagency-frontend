"use client";

import AdminDashboard from "./components/adminDashboard";
import Sidebar from "./components/SideBar";
import UserDashboard from "./components/userDashbaord";

// DEMO ROLE (replace later with auth logic)
export const role = "user"; // "user" | "admin"

export default function DashboardLayout({ children }) {
  return (
    <div className="flex  bg-slate-100">
      {/* Sidebar */}
      <Sidebar role={role} />

      <div className="flex-1 ml-16 p-6"> {/* ml-16 is for small screens, md:ml-64 for larger */}
        {/* Show dashboard based on role */}
        {role === "admin" ? <AdminDashboard /> : <UserDashboard />}
        
        {/* Nested routes */}
        {children}
      </div>
    </div>
  );
}
