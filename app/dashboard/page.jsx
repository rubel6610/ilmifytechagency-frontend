"use client";

import AdminDashboard from "./components/adminDashboard/JobManagementPage";
import UserDashboard from "./components/userDashboard/UserDashboard";

export const role = "admin";

const Page = () => {
  return role === "admin" ? <AdminDashboard /> : <UserDashboard />;
};

export default Page;
