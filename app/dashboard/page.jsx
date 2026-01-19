"use client";


import AdminDashboard from "./components/adminDashboard/AdminDashboard";
import UserDashboard from "./components/userDashboard/UserDashboard";

export const role = "user";

const Page = () => {
  return role === "admin" ? <AdminDashboard /> : <UserDashboard />;
};

export default Page;
