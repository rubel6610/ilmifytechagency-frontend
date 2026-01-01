"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaPhoneAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import Image from "next/image";
import { IoSearchSharp } from "react-icons/io5";
import { motion } from "framer-motion"; // Importing motion for animations

import { role } from "../../dashboard/page";

const Header = () => {

  const [nav, setNav] = useState(false);
  const pathname = usePathname();

  const toggleNav = () => setNav(!nav);

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Showcase", path: "/showcase" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
    { name: "Careers", path: "/careers" },
  ];

  return (
    <header className="w-full bg-[#FFFFFF] shadow-xs sticky top-0 z-1200">
      {/* Top Black Bar */}
      {!nav && (
        <div className="bg-[#3C3C3C]">
          <div className="text-white py-1.25 px-8.75 flex justify-between items-center text-sm max-w-400 mx-auto">
            <div className="flex items-center gap-2">
              <FaPhoneAlt className="text-xs" />
              <span>+13072696920</span>
            </div>
            <div className="flex gap-4">
              <FaFacebookF className="cursor-pointer hover:text-green-400 transition" />
              <FaInstagram className="cursor-pointer hover:text-green-400 transition" />
              <FaLinkedinIn className="cursor-pointer hover:text-green-400 transition" />
              <FaTwitter className="cursor-pointer hover:text-green-400 transition" />
            </div>
          </div>
        </div>
      )}

      {/* Main Navigation */}
      <div className="">
        <nav className="md:py-2.5 pt-5 pb-0 md:pt-6 md:pb-5 px-5 md:px-8.75 flex flex-col xl:flex-row justify-between items-center max-w-400 mx-auto relative">
          <div className="flex justify-between items-center w-full xl:w-auto">
            <Link
              href="/"
              className={`${nav ? "invisible" : "visible"} md:mx-auto xl:mx-0`}
            >
              <Image
                className="logo w-28 h-auto md:w-35 xl:w-37 2xl:w-43"
                height={50}
                width={150}
                src="/logo.png"
                alt="website logo"
                priority
              />
            </Link>

            {/* Mobile Button: Admin, User, Login buttons beside Hamburger */}
            <div className="md:hidden flex gap-3 items-center">
              {role === "admin" ? (
                <Link
                  href="/dashboard"
                  className="bg-linear-to-r from-[#86e062] to-[#00c389] text-white px-4 py-2 rounded-full font-semibold shadow-[5px_5px_15px_rgba(16,185,129,0.4)] hover:opacity-90 text-xs"
                >
                  Admin Dashboard
                </Link>
              ) : role === "user" ? (
                <Link
                  href="/dashboard"
                  className="bg-linear-to-r from-[#86e062] to-[#00c389] text-white px-4 py-2 rounded-full font-semibold shadow-[5px_5px_15px_rgba(16,185,129,0.4)] hover:opacity-90 text-xs"
                >
                  User Dashboard
                </Link>
              ) : (
                <Link href="/login">
                  <button className="bg-linear-to-r from-[#86e062] to-[#00c389] text-white px-4 py-2 rounded-full font-semibold shadow-[5px_5px_15px_rgba(16,185,129,0.4)] hover:opacity-90 text-xs">
                    Login
                  </button>
                </Link>
              )}

              {/* Hamburger Icon */}
              <div
                className="text-xl cursor-pointer text-gray-400"
                onClick={toggleNav}
              >
                <FaBars />
              </div>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="mt-6 xl:mt-0">
            <ul className="hidden md:flex gap-8 font-medium">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className={`uppercase text-[14px] tracking-wide transition duration-300 ${
                      pathname === item.path
                        ? "text-gray-600 font-bold"
                        : "text-gray-500"
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Desktop: Admin, User, Login buttons */}
          <div className="hidden xl:flex items-center gap-6">
            {role === "admin" ? (
              <Link
                href="/dashboard"
                className="bg-linear-to-r from-[#86e062] to-[#00c389] text-white px-6 py-2 rounded-full font-semibold shadow-[5px_5px_15px_rgba(16,185,129,0.4)] hover:opacity-90 transition"
              >
                Admin Dashboard
              </Link>
            ) : role === "user" ? (
              <Link
                href="/dashboard"
                className="bg-linear-to-r from-[#86e062] to-[#00c389] text-white px-6 py-2 rounded-full font-semibold shadow-[5px_5px_15px_rgba(16,185,129,0.4)] hover:opacity-90 transition"
              >
                User Dashboard
              </Link>
            ) : (
              <Link href="/login">
                <button className="bg-linear-to-r from-[#86e062] to-[#00c389] text-white px-6 py-2 rounded-full font-semibold shadow-[5px_5px_15px_rgba(16,185,129,0.4)] hover:opacity-90 transition">
                  Login
                </button>
              </Link>
            )}
          </div>
        </nav>
      </div>

      {/* Mobile Menu Dropdown & Cancel Button */}
      {nav && (
        <motion.div
          className="fixed top-0 left-0 w-full h-screen bg-white/95 transition-all duration-300 z-50 flex flex-col items-center justify-center gap-4 shadow-xl md:hidden"
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div
            className="absolute top-6 text-3xl text-gray-600 cursor-pointer"
            onClick={toggleNav}
          >
            <FaTimes />
          </div>

          {menuItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              onClick={() => setNav(false)}
              className={`uppercase text-[22px] font-semibold transition ${
                pathname === item.path ? "text-green-500" : "text-gray-800"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </motion.div>
      )}
    </header>
  );
};

export default Header;
