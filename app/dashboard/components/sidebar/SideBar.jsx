"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogOut, ArrowLeftToLine } from "lucide-react";
import { userLinks, adminLinks } from "./sidebarLinks";
import Image from "next/image";

export default function Sidebar({ role = "user" }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links = role === "admin" ? adminLinks : userLinks;

  return (
    <>
      {/* ---------- Mobile Top Bar ---------- */}
      <div className="lg:hidden px-3 py-3 bg-[#00c389] text-white  z-50">
       
        <nav className="space-y-3 flex-1">
           <button
           className="ms-1"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={26} />
        </button>
        {links.map((link, idx) => {
          const Icon = link.icon;
          const active = pathname === link.href;

          return (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Link
                href={link.href}
            
                className={`
                  flex items-center gap-3 p-2 rounded-lg
                  transition-all duration-300 text-[16px]
                  ${
                    active
                      ? "bg-white text-[#00c389] shadow-lg font-semibold"
                      : "hover:bg-white/20"
                  }
                `}
              >
                <Icon size={18} />
             
              </Link>
            </motion.div>
          );
        })}
      </nav>


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
              className="fixed z-50 left-0 w-64 min-h-screen
              bg-gradient-to-b from-[#00c389] to-[#86e062]
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
        className="hidden lg:flex w-64 min-h-screen
        bg-gradient-to-b from-[#00c389] to-[#86e062]
        text-white p-5 flex flex-col z-40"
      >
        <SidebarContent links={links} pathname={pathname} />
      </aside>
    </>
  );
}

/* ---------- Sidebar Content ---------- */
function SidebarContent({ links, pathname, close }) {
  const handleClose = () => {
    if (typeof close === "function") close();
  };

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        {close && (
          <button onClick={handleClose} aria-label="Close menu">
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
              transition={{ delay: idx * 0.05 }}
            >
              <Link
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
            </motion.div>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="border-t border-white/30 pt-4">
        <Link
          href="/dashboard/profile"
          onClick={handleClose}
          className="flex items-center gap-3 mb-3 px-4 py-2 rounded-lg hover:bg-white/20"
        >
          <Image
            src="/hero.png"
            width={32}
            height={32}
            alt="Profile picture"
            className="w-8 h-8 rounded-full bg-white/30"
          />
          Profile
        </Link>

        <Link
          href="/"
          onClick={handleClose}
          className="flex items-center gap-3 mb-3 px-4 py-2 rounded-lg hover:bg-white/20"
        >
          <ArrowLeftToLine size={18} />
          Go to Website
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
