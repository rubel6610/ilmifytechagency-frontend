"use client";

import { RootState } from "@/redux/store";
import Sidebar from "./components/sidebar/SideBar";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

type UserRole = "ADMIN" | "USER";

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, token } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!token || !user) {
      router.push("/login");
    }
  }, [token, user, router]);

  // Determine user role with proper type checking
  // Backend returns role in uppercase (ADMIN, USER), convert to lowercase for internal use
  const role: UserRole | undefined = 
    user?.role === "ADMIN" || user?.role === "USER" 
      ? (user.role === "ADMIN" ? "ADMIN" : "USER") 
      : undefined;

  // Show loading or redirect if no valid role
  if (!token || !user || !role) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#00c389]"></div>
          <p className="mt-4 text-slate-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-slate-100">
      {/* Sidebar - Fixed position */}
      <Sidebar role={role} />
      {/* Main content - with margin for mini sidebar on mobile */}
      <main className="min-h-screen ml-16 lg:ml-64">{children}</main>
    </div>
  );
}
