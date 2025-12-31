import React from "react";

// import { role } from "./layout";
import AdminDashboard from "./admindashboard/AdminDashboard";
import UserDashboard from "./userdashboard/UserDashboard";
const role = "user"; // "user" | "admin"
const page = () => {
 return role === "admin" ? <AdminDashboard /> : <UserDashboard />;
};

export default page;
