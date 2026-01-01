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
    href: "/dashboard",
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
    href: "/dashboard/admin",
    icon: Shield,
  },
  {
    name: "Manage Users",
    href: "/dashboard/admin/users",
    icon: Users,
  },
];
