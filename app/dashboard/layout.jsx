"use client";
import Sidebar from "./components/SideBar";
export const role = "admin"; // this is a demo role , replace with actual role
export default function DashboardLayout({ children }) {
    return (
        <div className="flex min-h-screen bg-slate-100">
            <Sidebar />
            <div className="flex-1">
                <div className="p-6">{children}</div>
            </div>
        </div>

    );
}
