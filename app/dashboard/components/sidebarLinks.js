import {
  Briefcase,
  LayoutDashboard,
  Plus,
  Dock,

} from "lucide-react";

export const userLinks = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Applied Jobs",
    href: "/dashboard/userdashboard/applied-jobs",
    icon:  Dock,
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
    href: "/dashboard/admindashboard/post-job",
    icon: Plus,
  },
  
];
