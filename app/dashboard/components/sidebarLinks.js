import {
  Briefcase,
  LayoutDashboard,
  Plus,
  Shield,
  Users,

} from "lucide-react";

export const userLinks = [
  {
    name: "Dashboard",
    href: "/dashboard/userdashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Applied Jobs",
    href: "/dashboard/applied-jobs",
    icon: Plus,
  },
  {
    name: "All Jobs",
    href: "/careers",
    icon: Briefcase,
  },

];

export const adminLinks = [
  {
    name: "Admin Dashboard",
    href: "/dashboard/admindashboard",
    icon: Shield,
  },
  {
    name: "Post job",
    href: "/dashboard/admindashboard/post-job",
    icon: Shield,
  },
  {
    name: "Manage Users",
    href: "/dashboard/admin/users",
    icon: Users,
  },
];
