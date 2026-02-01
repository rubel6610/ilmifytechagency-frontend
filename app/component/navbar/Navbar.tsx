"use client";

import { useState } from "react";
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
  FaYoutube,
} from "react-icons/fa";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { logout } from "@/redux/features/authSlice";
import { FaUserCircle, FaSignOutAlt, FaTachometerAlt, FaCaretDown } from "react-icons/fa";

const MotionLink = motion(Link);



const Header = () => {
  const [nav, setNav] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();
  const dispatch = useDispatch();

  const { token, user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    setDropdownOpen(false);
  };

  const toggleNav = () => setNav(!nav);

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Showcase", path: "/showcase" },
    { name: "Blog", path: "/blog" },
    { name: "Our Team", path: "/our-team" },
    { name: "Contact", path: "/contact" },
    { name: "Careers", path: "/careers" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  // Hide header on dashboard pages
  if (pathname === "/dashboard" || pathname.startsWith("/dashboard/")) {
    return null;
  }

  return (
    <header className="w-full bg-[#FFFFFF] shadow-xs fixed left-0 top-0 z-50">
      {/* Top Black Bar */}
      {!nav && (
        <div className="bg-[#3C3C3C]">
          <div className="text-white py-2 px-8.75 flex justify-between items-center text-sm max-w-400 mx-auto">
            <div className="flex items-center gap-2">
              <FaPhoneAlt className="text-xs" />
              <span>+13072696920</span>
            </div>
            {/* Social Icons */}
            <div className="flex gap-4">
              {[
                { Icon: FaFacebookF, link: "https://www.facebook.com/ilmifyTech" },
                { Icon: FaTwitter, link: "https://twitter.com" },
                { Icon: FaLinkedinIn, link: "https://bd.linkedin.com/company/ilmifytechagency" },
                { Icon: FaInstagram, link: "https://www.instagram.com/ilmifytech.agency" },
                { Icon: FaYoutube, link: "https://www.youtube.com/@ilmifyTechAgency" },
              ].map(({ Icon, link }, idx) => (
                <Link
                  key={idx}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer hover:text-green-400 transition"
                >
                  <Icon size={14} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Navigation */}
      <nav className="md:py-2.5 lg:py-6 pt-5 pb-5 md:pt-6 px-5 md:px-8.75 flex flex-col xl:flex-row justify-between items-center max-w-400 mx-auto relative">
        <div className="flex justify-between items-center w-full xl:w-auto max-w-150">
          <div>
            <Link href="/" className={`${nav ? "invisible" : "visible"} xl:mx-0`}>
              <Image
                className="logo w-28 h-auto md:w-35 xl:w-37 2xl:w-43"
                height={50}
                width={150}
                src="/logo.png"
                alt="website logo"
                priority
              />
            </Link>
          </div>

          <div className="xl:hidden flex gap-3 items-center">
            {token ? (
              <div className="flex items-center gap-3">
                 <Link
                  href="/dashboard"
                  className="bg-linear-to-r from-[#86e062] to-[#00c389] text-white px-3 py-1.5 rounded-full font-semibold text-xs flex items-center gap-1"
                >
                  <FaTachometerAlt /> Dashboard
                </Link>
              </div>
            ) : (
              <Link href="/login">
                <button className="bg-linear-to-r from-[#86e062] to-[#00c389] text-white px-4 py-2 rounded-full font-semibold text-xs">
                  Login
                </button>
              </Link>
            )}
            <div
              className="text-xl block lg:hidden cursor-pointer text-gray-400"
              onClick={toggleNav}
            >
              <FaBars />
            </div>
          </div>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex gap-8 font-medium mt-6 xl:mt-0">
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

        {/* Right Side (Only XL) */}
        <div className="hidden xl:flex items-center gap-6">
          {token ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 px-4 py-2 rounded-full transition-all duration-300"
              >
                <div className="w-8 h-8 rounded-full bg-linear-to-r from-[#00c389] to-[#86e062] flex items-center justify-center text-white">
                  <FaUserCircle size={18} />
                </div>
                <span className="font-semibold text-gray-700 text-sm">
                  {user?.name?.split(" ")[0] || "Account"}
                </span>
                <FaCaretDown 
                  className={`text-gray-400 transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} 
                />
              </button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden py-1 z-50"
                  >
                    <div className="px-4 py-3 border-b border-gray-50 bg-gray-50/50">
                      <p className="text-xs text-gray-500 font-medium">Signed in as</p>
                      <p className="text-sm font-bold text-gray-800 truncate">{user?.email || "User"}</p>
                    </div>
                    
                    <div className="p-1">
                      <Link
                        href="/dashboard"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 w-full px-3 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg transition-colors"
                      >
                        <FaTachometerAlt className="text-gray-400 group-hover:text-emerald-500" />
                        Dashboard
                      </Link>
                      
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors mt-1"
                      >
                        <FaSignOutAlt />
                        Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
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
              className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-1250 lg:hidden"
            />

            {/* Side Menu */}
            <motion.div
              className="fixed p-6 top-0 right-0 w-2/3 md:w-1/3 h-screen bg-white z-1300 flex flex-col items-start justify-start gap-7 shadow-2xl lg:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.4, ease: "easeInOut" as const }}
            >
              {/* Top Section inside Sidebar */}
              <div className="flex flex-col items-start gap-6 w-full">
                <motion.div
                  onClick={toggleNav}
                  animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                  transition={{
                    rotate: { repeat: Infinity, duration: 8, ease: "linear" as const },
                    scale: { repeat: Infinity, duration: 2, ease: "easeInOut" as const },
                  }}
                  className="cursor-pointer p-2 bg-gray-100 hover:bg-red-50 text-gray-500 hover:text-red-500 rounded-full transition-all duration-300 shadow-sm hover:shadow-md border border-gray-200"
                >
                  <FaTimes className="text-gray-500 text-lg" />
                </motion.div>

                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={containerVariants}
                  className="flex items-center gap-10 w-full"
                >
                  <MotionLink
                    variants={fadeInRight}
                    href="/"
                    onClick={() => setNav(false)}
                  >
                    <Image
                      className="logo-2 w-20 h-auto"
                      height={50}
                      width={150}
                      src="/logo.png"
                      alt="logo"
                      priority
                    />
                  </MotionLink>
                  <motion.div variants={fadeInRight} className="flex gap-3 text-gray-500">
                    <Link target="_blank" href="https://www.facebook.com/ilmifyTech" rel="noopener noreferrer">
                      <FaFacebookF />
                    </Link>
                    <Link target="_blank" href="https://www.instagram.com/ilmifytech.agency" rel="noopener noreferrer">
                      <FaInstagram />
                    </Link>
                    <Link target="_blank" href="https://bd.linkedin.com/company/ilmifytechagency" rel="noopener noreferrer">
                      <FaLinkedinIn />
                    </Link>
                    <Link target="_blank" href="https://twitter.com" rel="noopener noreferrer">
                      <FaTwitter />
                    </Link>
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
                      className={`uppercase text-[16px] font-semibold block transition-colors ${
                        pathname === item.path
                          ? "text-green-500"
                          : "text-gray-600 hover:text-green-500"
                      }`}
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