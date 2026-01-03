"use client";
import PageWrapper from "../component/PageWrapper";
import Sidebar from "./components/SideBar";
import { role } from "./page";

export default function DashboardLayout({children}) {
  return (
    <PageWrapper>
      <div className="flex  bg-slate-100 min-h-screen ">
      {/* Sidebar */}
      <Sidebar role={role} />

      <div className="flex-1  p-6 "> 
        {/* Nested routes */}
                 {children}
      </div>
    </div>
    </PageWrapper>
    
  );
}
