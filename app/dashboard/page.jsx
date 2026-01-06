"use client";
import AdminDashboard from "./admindashboard/AdminDashboard";
import UserDashboard from "./userdashboard/UserDashboard";
export const role = "admin";

const Page = () => {
  return role === "admin" ? <AdminDashboard /> : <UserDashboard />;
};

export default Page;
