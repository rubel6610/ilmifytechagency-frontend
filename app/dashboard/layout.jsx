"use client";



import Sidebar from "./components/SideBar";
import { role } from "./page";

export default function DashboardLayout({children}) {
  return (
    <div className="flex  bg-slate-100 min-h-screen lg:min-h-[100vh - 100px]:">
      {/* Sidebar */}
      <Sidebar role={role} />

      <div className="flex-1  p-6"> 
        {/* Nested routes */}
        {children}
      </div>
    </div>
  );
}
