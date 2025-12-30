"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, LogOut } from "lucide-react";
import { userLinks, adminLinks } from "./sidebarLinks";

export default function Sidebar({ role = "user" }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links =
    role === "admin"
      ? adminLinks
      : userLinks;

  return (
    <>
      {/* ---------- Mobile Top Bar ---------- */}
      <div className="lg:hidden px-4 py-3 bg-[#00c389] text-white">
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
              text-white p-5 flex flex-col"
            >
              <SidebarContent
                links={links}
                pathname={pathname}
                close={() => setOpen(false)}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ---------- Desktop Sidebar ---------- */}
      <aside
        className="hidden min-h-[calc(100vh-100px)] lg:flex w-64 
        bg-linear-to-b from-[#00c389] to-[#86e062]
        text-white p-5 flex-col"
      >
        <SidebarContent links={links} pathname={pathname} />
      </aside>
    </>
  );
}

/* ---------- Sidebar Content ---------- */
function SidebarContent({ links, pathname, close }) {
  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        {close && (
          <button onClick={close} className="lg:hidden">
            <X size={24} />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="space-y-3 flex-1">
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

      {/* Bottom Section */}
      <div className="border-t border-white/30 pt-4 flex flex-col align-center">
        <Link
          href="/dashboard/profile"
          onClick={close}
          className="flex items-center gap-3 mb-3 px-4 py-2 rounded-lg hover:bg-white/20"
        >
          <div className="w-8 h-8 rounded-full bg-white/30" />
          Profile
        </Link>

        <button
          onClick={() => alert("Logout logic here")}
          className="flex items-center gap-3 px-4 py-2 text-red-100 hover:bg-red-500/20 rounded-lg w-full"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </>
  );
}
