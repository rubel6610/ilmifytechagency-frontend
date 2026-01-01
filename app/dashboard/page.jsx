import React from "react";

// import { role } from "./layout";
import AdminDashboard from "./admindashboard/AdminDashboard";
import UserDashboard from "./userdashboard/UserDashboard";
export const role = ""; // "user" | "admin"
const page = () => {
 return role === "admin" ? <AdminDashboard /> : <UserDashboard />;
};

export default page;
