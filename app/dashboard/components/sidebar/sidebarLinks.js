import {
  Briefcase,
  LayoutDashboard,
  Plus,
  Dock,
  Columns3Cog
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
    icon: Dock,
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
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Post Job",
    href: "/dashboard/post-job",
    icon: Plus,
  },
  {
    name: "Manage Jobs",
    href: "/dashboard/manage-jobs",
    icon: Briefcase,
  }

];
