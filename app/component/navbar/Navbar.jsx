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
import { motion, AnimatePresence } from "framer-motion";

import { role } from "../../dashboard/page";

const MotionLink = motion(Link);
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.1, 
        delayChildren: 0.2
      },
    },
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };
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
      <nav className="md:py-2.5 pt-5 pb-5 md:pt-6 md:pb-5 px-5 md:px-8.75 flex flex-col xl:flex-row justify-between items-center max-w-400 mx-auto relative">
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

          <div className="md:hidden flex gap-3 items-center">
            {role === "admin" ? (
              <Link href="/dashboard" className="bg-linear-to-r from-[#86e062] to-[#00c389] text-white px-4 py-2 rounded-full font-semibold text-xs">Admin Dashboard</Link>
            ) : role === "user" ? (
              <Link href="/dashboard" className="bg-linear-to-r from-[#86e062] to-[#00c389] text-white px-4 py-2 rounded-full font-semibold text-xs">User Dashboard</Link>
            ) : (
              <Link href="/login">
                <button className="bg-linear-to-r from-[#86e062] to-[#00c389] text-white px-4 py-2 rounded-full font-semibold text-xs">Login</button>
              </Link>
            )}
            <div className="text-xl block md:hidden cursor-pointer text-gray-400" onClick={toggleNav}>
              <FaBars />
            </div>
          </div>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 font-medium mt-6 xl:mt-0">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className={`uppercase text-[14px] tracking-wide transition duration-300 ${pathname === item.path ? "text-gray-600 font-bold" : "text-gray-500"}`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Side (Only XL) */}
          <div className="hidden xl:flex items-center gap-6">
            {role=== "admin" ? ( 
              <Link
                href="/dashboard"
                className="bg-linear-to-r from-[#86e062] to-[#00c389] text-white px-6 py-2 rounded-full font-semibold shadow-[5px_5px_15px_rgba(16,185,129,0.4)] hover:opacity-90 transition"
              >
                Admin Dashboard
              </Link>
            ) :  role=== "user" ? (
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

      

      {/* Mobile Menu & Backdrop Overlay */}
      <AnimatePresence>
        {nav && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleNav}
              className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-1250 md:hidden"
            />

            {/* Side Menu */}
            <motion.div
              className="fixed p-6 top-0 right-0 w-2/3 h-screen bg-white z-1300 flex flex-col items-start justify-start gap-7 shadow-2xl md:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.4, ease: "easeInOut" }}
            >
              {/* Top Section inside Sidebar */}
              <div className="flex flex-col items-start gap-6 w-full">
                <motion.div
                  onClick={toggleNav}
                  animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                  transition={{
                    rotate: { repeat: Infinity, duration: 8, ease: "linear" },
                    scale: { repeat: Infinity, duration: 2, ease: "easeInOut" },
                  }}
                  className="cursor-pointer p-2 bg-gray-100 hover:bg-red-50 text-gray-500 hover:text-red-500 rounded-full transition-all duration-300 shadow-sm hover:shadow-md border border-gray-200"
                >
                  <FaTimes className="text-gray-500 text-2xl" />
                </motion.div>

                <motion.div 
                 initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="flex items-center gap-10 w-full ">
                  <MotionLink variants={fadeInRight} href="/" onClick={() => setNav(false)}>
                    <Image className="logo-2 w-20 h-auto" height={50} width={150} src="/logo.png" alt="logo" priority />
                  </MotionLink>
                  <motion.div variants={fadeInRight} className="flex gap-3 text-gray-500">
                    <Link href="https://www.facebook.com/ilmifyTech"><FaFacebookF /></Link>
                    <Link href="https://www.instagram.com/ilmifytech.agency"><FaInstagram /></Link>
                    <Link href="https://bd.linkedin.com/company/ilmifytechagency"><FaLinkedinIn /></Link>
                    <Link href="https://linkedin.com"><FaTwitter /></Link>
                  </motion.div>
                </motion.div>
              </div>

              {/* Nav Links */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="flex flex-col gap-3 w-full border-t pt-5 border-gray-100"
              >
                {menuItems.map((item) => (
                  <motion.div key={item.path} variants={fadeInRight}>
                    <Link
                      href={item.path}
                      onClick={() => setNav(false)}
                      className={`uppercase text-[16px] font-semibold block transition-colors ${pathname === item.path ? "text-green-500" : "text-gray-600 hover:text-green-500"}`}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;