import {
  LayoutDashboard,
  Users,
  Settings,
  Shield
} from "lucide-react";

export const userRoutes = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Profile",
    href: "/dashboard/profile",
    icon: Settings,
  },
];

export const adminRoutes = [
  {
    label: "Admin Dashboard",
    href: "/dashboard/admin",
    icon: Shield,
  },
  {
    label: "Manage Users",
    href: "/dashboard/admin/users",
    icon: Users,
  },
];
