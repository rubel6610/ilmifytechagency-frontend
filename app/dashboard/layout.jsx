"use client";



import Sidebar from "./components/SideBar";
import { role } from "./page";

export default function DashboardLayout({children}) {
  return (
    <div className="flex  bg-slate-100">
      {/* Sidebar */}
      <Sidebar role={role} />

      <div className="flex-1 ml-16 p-6"> {/* ml-16 is for small screens, md:ml-64 for larger */}
        {/* Nested routes */}
        {children}
      </div>
    </div>
  );
}
