"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Active link check korar jonno
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaPhoneAlt,
  FaSearch,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const Header = () => {
  const [nav, setNav] = useState(false);
  const pathname = usePathname(); // Bortoman URL path nibe

  const toggleNav = () => setNav(!nav);

  // Menu Items Array (Zate code repeat na hoy)
  const menuItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Showcase", path: "/showcase" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="">
      {/* Top Black Bar */}
      <div className="bg-[#222]">
        <div className=" text-white py-2 px-[35px] flex justify-between items-center text-sm sm:w-[540px] md:w-[720px] lg:w-[960px] xl:w-[1140px] 2xl:w-[1320px] mx-auto">
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

      {/* Main Navigation */}
      <div className="bg-white shadow-xs">
        <nav className="py-4 px-[10px] md:px-[35px] flex justify-between items-center relative sticky sm:w-[540px] md:w-[720px] lg:w-[960px] xl:w-[1140px] 2xl:w-[1320px] mx-auto">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center gap-2">
            <img className="" src="/Logo-1-1.png" alt="website log" />
          </div>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex gap-8 font-medium">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className={`uppercase text-sm transition duration-300 ${
                  pathname === item.path
                    ? "text-green-500 font-bold"
                    : "text-gray-700 hover:text-green-500"
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Side: Button & Search */}
        <div className="flex items-center gap-6">
          <Link href="/contact" className="hidden md:block">
            <button className="bg-gradient-to-r from-[#86e062] to-[#00c389] text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:opacity-90 transition">
              Login
            </button>
          </Link>
          <FaSearch className="text-teal-500 cursor-pointer text-xl hidden md:block" />

          <div
            className="md:hidden text-2xl cursor-pointer text-black"
            onClick={toggleNav}
          >
            {nav ? <FaTimes /> : <FaBars />}
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {nav && (
          <div className="absolute top-full left-0 w-full bg-white z-50 flex flex-col items-center py-6 gap-4 shadow-xl md:hidden">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setNav(false)} // Click korle menu bondho hoye jabe
                className={`uppercase text-sm font-bold transition ${
                  pathname === item.path ? "text-green-500" : "text-gray-800"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link href="/contact" onClick={() => setNav(false)}>
              <button className="bg-gradient-to-r from-[#86e062] to-[#00c389] text-white px-6 py-2 rounded-full text-sm">
                GET IN TOUCH
              </button>
            </Link>
          </div>
        )}
      </nav>
      </div>
    </header>
  );
};

export default Header;
