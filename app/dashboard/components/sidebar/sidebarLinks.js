import {
  Briefcase,
  LayoutDashboard,
  Plus,
  Dock,
  Columns3Cog
} from "lucide-react";
import { HiOutlineViewGridAdd } from "react-icons/hi";
import { VscProject } from "react-icons/vsc";
import { HiOutlineNewspaper } from "react-icons/hi";

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
  },
  {
    name: "Manage Projects",
    href: "/dashboard/manage-projects",
    icon: VscProject,
  },
   { name: "Manage Blog",
    href: "/dashboard/manage-blog",
    icon: HiOutlineNewspaper,
  },
  
];
