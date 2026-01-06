"use client";
import AdminDashboard from "./admindashboard/AdminDashboard";
import UserDashboard from "./userdashboard/UserDashboard";
export const role = "user";

const Page = () => {
  return role === "admin" ? <AdminDashboard /> : <UserDashboard />;
};

export default Page;
