"use client";

import AdminDashboard from "./admindashboard/page";
import Sidebar from "./components/SideBar";
import UserDashboard from "./userdashboard/page";


// DEMO ROLE (replace later with auth logic)
export const role = "admin"; // "user" | "admin"

export default function DashboardLayout() {
  return (
    <div className="flex  bg-slate-100">
      {/* Sidebar */}
      <Sidebar role={role} />

      <div className="flex-1 ml-16 p-6"> {/* ml-16 is for small screens, md:ml-64 for larger */}
        {/* Show dashboard based on role */}
        {role === "admin" ? <AdminDashboard /> : <UserDashboard />}
        

        {/* Nested routes
        {children} */}
      </div>
    </div>
  );
}
