import {
  Briefcase,
  LayoutDashboard,
  Plus,
  Dock,
  Columns3Cog
} from "lucide-react";
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

];

export const adminLinks = [
  {
    name: "Admin Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
     name: "Manage Jobs",
    href: "/dashboard/manage-jobs",
    icon: Briefcase,
  },
  {
    name: "Manage Projects",
    href: "/dashboard/manage-projects",
    icon: Columns3Cog,
  },
  {  name: "Manage Blog",
    href: "/dashboard/manage-blog",
    icon: HiOutlineNewspaper,
  },
  
];
