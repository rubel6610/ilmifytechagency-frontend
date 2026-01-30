"use client";
import { useSelector } from "react-redux";
import AdminDashboard from "./components/adminDashboard/AdminDashboard";
import UserDashboard from "./components/userDashboard/UserDashboard";
import { RootState } from "@/redux/store";

const Page = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  // Admin sees AdminDashboard, User sees UserDashboard
  return user?.role === "admin" ? <AdminDashboard /> : <UserDashboard />;
};

export default Page;
