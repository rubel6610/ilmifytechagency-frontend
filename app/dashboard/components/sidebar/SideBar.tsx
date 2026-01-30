"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, LogOut, ArrowLeftToLine, User } from "lucide-react";
import { userLinks, adminLinks, NavItem } from "./sidebarLinks";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { logout } from "@/redux/features/authSlice";

interface SidebarProps {
  role?: "user" | "admin";
}

export default function Sidebar({ role = "user" }: SidebarProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  const links: NavItem[] = role === "admin" ? adminLinks : userLinks;

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  return (
    <>
      {/* Mini Sidebar for Mobile - Fixed and Always Visible */}
      <div
        className="lg:hidden fixed left-0 top-0 bottom-0 w-14 bg-gradient-to-b from-[#00c389] to-[#86e062] text-white z-30"
        style={{ height: "100vh" }}
      >
        <div className="h-full flex flex-col">
          <button
            onClick={() => setOpen(true)}
            className="p-3 mt-3 mx-auto hover:bg-white/20 rounded-lg transition-colors flex-shrink-0"
            aria-label="Open menu"
          >
            <Menu size={26} />
          </button>

          <nav className="flex-1 flex flex-col items-center py-4 space-y-3 overflow-y-auto">
            {links.map((link) => {
              const Icon = link.icon;
              const active = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`
                    p-2.5 rounded-lg transition-all duration-300 flex-shrink-0
                    ${
                      active
                        ? "bg-white text-[#00c389] shadow-lg"
                        : "hover:bg-white/20"
                    }
                  `}
                  title={link.name}
                >
                  <Icon size={20} />
                </Link>
              );
            })}
          </nav>

          {/* Mini Bottom Section */}
          <div className="border-t border-white/30 py-3 flex flex-col items-center space-y-2 flex-shrink-0">
            <Link
              href="/dashboard/profile"
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              title="Profile"
            >
              <div className="w-7 h-7 rounded-full bg-white/30 flex items-center justify-center text-xs font-bold">
                <User />
              </div>
            </Link>
            <Link
              href="/"
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              title="Go to Website"
            >
              <div className="w-7 h-7 rounded-full bg-white/30 flex items-center justify-center text-xs font-bold">
                <ArrowLeftToLine size={18} />
              </div>
            </Link>

            <button
              onClick={handleLogout}
              className="p-2 text-red-100 hover:bg-red-500/20 rounded-lg transition-colors"
              title="Logout"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Full Sidebar - Slide-in on Mobile, Always Visible on Desktop */}
      <aside
        className={`
          fixed left-0 top-0 bottom-0 z-50
          w-64 bg-linear-to-b from-[#00c389] to-[#86e062]
          text-white
          transition-transform duration-300 ease-in-out
          lg:translate-x-0
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
        style={{ height: "100vh" }}
      >
        <SidebarContent
          links={links}
          pathname={pathname}
          close={() => setOpen(false)}
        />
      </aside>
    </>
  );
}

/* Sidebar Content Component */
interface SidebarContentProps {
  links: NavItem[];
  pathname: string;
  close?: () => void;
  handleLogout?: () => void;
}

function SidebarContent({ links, pathname, close }: SidebarContentProps) {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  const handleClose = () => {
    if (typeof close === "function") close();
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b border-white/20 flex-shrink-0">
        <Link href="/" className="text-2xl font-bold">
          Dashboard
        </Link>
        {close && (
          <button
            onClick={handleClose}
            className="lg:hidden p-1 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        )}
      </div>

      {/* Navigation - Scrollable if needed */}
      <nav className="flex-1 overflow-y-auto p-5 space-y-2">
        {links.map((link) => {
          const Icon = link.icon;
          const active = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={handleClose}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-lg
                transition-all duration-300 text-[16px]
                ${
                  active
                    ? "bg-white text-[#00c389] shadow-lg font-semibold"
                    : "hover:bg-white/20"
                }
              `}
            >
              <Icon size={18} />
              {link.name}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="border-t border-white/30 p-5 space-y-2 flex-shrink-0">
        <Link
          href="/dashboard/profile"
          onClick={handleClose}
          className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/20 transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-white/30 flex items-center justify-center text-sm font-bold">
            AD
          </div>
          Profile
        </Link>

        <Link
          href="/"
          onClick={handleClose}
          className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/20 transition-colors"
        >
          <ArrowLeftToLine size={18} />
          Go to Website
        </Link>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2 text-red-100 hover:bg-red-500/20 rounded-lg w-full transition-colors"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
}
