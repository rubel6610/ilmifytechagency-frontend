"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import {
  Briefcase,
  LayoutDashboard,
  Plus,
  Menu,
  X,
} from "lucide-react";

/* ---------- Sidebar Links ---------- */
const links = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Post Job",
    href: "/dashboard/post-job",
    icon: Plus,
  },
  {
    name: "All Jobs",
    href: "/careers",
    icon: Briefcase,
  },
];

/* ---------- Main Sidebar ---------- */
export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href) => pathname === href;

  return (
    <>
      {/* ---------- Mobile Top Bar ---------- */}
      <div className="lg:hidden  px-4 py-3 bg-[#00c389] text-white">
        <button onClick={() => setOpen(true)}>
          <Menu size={26} />
        </button>
      </div>

      {/* ---------- Mobile Overlay ---------- */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black z-40"
            />

            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 25 }}
              className="fixed z-50 top-0 left-0 w-64 min-h-screen
              bg-linear-to-b from-[#00c389] to-[#86e062]
              text-white p-5"
            >
              <SidebarContent
                pathname={pathname}
                close={() => setOpen(false)}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ---------- Desktop Sidebar ---------- */}
      <aside
        className="hidden lg:block w-64 min-h-screen
        bg-linear-to-b from-[#00c389] to-[#86e062]
        text-white p-5"
      >
        <SidebarContent pathname={pathname} />
      </aside>
    </>
  );
}

/* ---------- Sidebar Content ---------- */
function SidebarContent({ pathname, close }) {
  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">Admin Panel</h2>
        {close && (
          <button onClick={close} className="lg:hidden">
            <X size={24} />
          </button>
        )}
      </div>

      <nav className="space-y-3">
        {links.map((link, idx) => {
          const Icon = link.icon;
          const active = pathname === link.href;

          return (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.08 }}
            >
              <Link
                href={link.href}
                onClick={close}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg
                  transition-all duration-300
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
            </motion.div>
          );
        })}
      </nav>
    </>
  );
}
