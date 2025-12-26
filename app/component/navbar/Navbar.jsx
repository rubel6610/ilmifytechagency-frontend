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
  FaSearch,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import Image from "next/image";

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
  ];

  return (
    <header className="w-full">
      {/* Top Black Bar */}
      <div className="bg-secondary max-w-8xl mx-auto">
        <div className=" text-white py-2 px-8.75 flex justify-between items-center text-sm ">
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
      <div className="bg-white shadow-sm">
        <nav className="py-6 px-4 flex flex-col xl:flex-row justify-between items-center max-w-7xl mx-auto relative">
          {/* Logo & Mobile Menu Button Section */}
          <div className="flex justify-between items-center w-full xl:w-auto">
            <Link href="/" className="md:mx-auto xl:mx-0">
              <Image height={50} width={150} src="/Logo-1-1.png" alt="website logo" priority />
            </Link>

           
            <div className="md:hidden text-2xl cursor-pointer text-black" onClick={toggleNav}>
              {nav ? <FaTimes /> : <FaBars />}
            </div>
          </div>

          {/* Menu for Tablet and Desktop */}
          <div className="mt-6 xl:mt-0">
            <ul className="hidden md:flex gap-8 font-medium">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className={`uppercase text-[13px] tracking-wide transition duration-300 ${
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
          </div>

          {/* Right Side: Login & Search (Only XL) */}
          <div className="hidden xl:flex items-center gap-6">
            <Link href="/contact">
              <button className="bg-linear-to-r from-[#86e062] to-[#00c389] text-white px-8 py-3 rounded-full font-semibold shadow-md hover:opacity-90 transition">
                Login
              </button>
            </Link>
            <FaSearch className="text-teal-500 cursor-pointer text-xl" />
          </div>

          {/* Mobile Menu Dropdown */}
          {nav && (
            <div className="absolute top-full left-0 w-full bg-white z-50 flex flex-col items-center py-6 gap-4 shadow-xl md:hidden">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setNav(false)}
                  className={`uppercase text-sm font-bold transition ${
                    pathname === item.path ? "text-green-500" : "text-gray-800"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;