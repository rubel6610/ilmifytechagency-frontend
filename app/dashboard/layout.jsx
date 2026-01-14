"use client";

import Sidebar from "./components/sidebar/SideBar";
import { role } from "./page";

export default function DashboardLayout({children}) {
  return (

      <div className="flex  bg-slate-100 min-h-screen ">
      {/* Sidebar */}
      <Sidebar role={role} />

      <div className="flex-1"> 
        {/* Nested routes */}
                 {children}
      </div>
    </div>
    
  );
}
