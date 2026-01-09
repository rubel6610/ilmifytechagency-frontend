"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, LogOut, Home, ArrowLeftToLine } from "lucide-react";
import { userLinks, adminLinks } from "./sidebarLinks";
import Image from "next/image";

export default function Sidebar({ role = "user" }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links = role === "admin" ? adminLinks : userLinks;

  return (
    <>
      {/* ---------- Mobile Top Bar ---------- */}
      <div className="lg:hidden px-4 py-3 bg-[#00c389] text-white z-50">
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
              className="fixed inset-0  bg-black z-40 "
            />

            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 25 }}
              className="fixed z-50  left-0 w-64 min-h-[calc(100vh-30px)] md:min-h-[calc(100vh-70px)]
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
        className="hidden  lg:flex w-64 
          bg-linear-to-b from-[#00c389] to-[#86e062]
          text-white p-5 flex-col z-40"
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
      <div className="flex items-center justify-between mb-8 relative">
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
      <div className="border-t border-white/30 absolute bottom-5 w-50 flex flex-col align-center">
        <Link
          href="/dashboard/profile"
          onClick={close}
          className="flex items-center gap-3 mb-3 px-4 py-2 rounded-lg hover:bg-white/20"
        >
          <Image src="/hero.png" height={150} width={150} alt="profile" className="w-8 h-8 rounded-full bg-white/30" />
          Profile
        </Link>
        <Link
          href="/"
          onClick={close}
          className="flex items-center gap-3 mb-3 px-4 py-2 rounded-lg hover:bg-white/20"
        >
         <ArrowLeftToLine />
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
