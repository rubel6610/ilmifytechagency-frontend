import {
  Briefcase,
  LayoutDashboard,
  Users,
  User,
  Dock,
  Columns3Cog,
} from "lucide-react";
import { HiOutlineNewspaper } from "react-icons/hi";

// Define the type for Lucide React icons
type LucideIcon = typeof LayoutDashboard;

// Define the type for React Icons (like HiOutlineNewspaper)
type ReactIcon = typeof HiOutlineNewspaper;

// Union type for all supported icon types
type NavigationIcon = LucideIcon | ReactIcon;

export interface NavItem {
  name: string;
  href: string;
  icon: NavigationIcon;
}

export const userLinks: NavItem[] = [
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

export const adminLinks: NavItem[] = [
  {
    name: "Admin Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Manage Users",
    href: "/dashboard/manage-users",
    icon: User,
  },
  {
    name: "Manage Team",
    href: "/dashboard/manage-team",
    icon: Users,
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
  {
    name: "Manage Blog",
    href: "/dashboard/manage-blog",
    icon: HiOutlineNewspaper,
  },
];