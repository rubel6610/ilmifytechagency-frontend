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

import { role } from "../../dashboard/layout";
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
    <header className="w-full bg-[#FFFFFF] shadow-xs sticky top-0 z-50">
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
        <nav className="md:py-2.5 pt-2.5 pb-0 md:pt-6.5 md:pb-3.75 px-5 md:px-8.75 flex flex-col xl:flex-row justify-between items-center max-w-400 mx-auto relative ">
          <div className="flex justify-between items-center w-full xl:w-auto">
            <Link
              href="/"
              className={`${nav ? "invisible" : "visible"} md:mx-auto xl:mx-0`}
            >
              <Image
                className="logo w-28 h-auto md:w-35 xl:w-37 2xl:w-43 pb-2"
                height={50}
                width={150}
                src="/logo.png"
                alt="website logo"
                priority
              />
            </Link>

            {/* Hamburger icon */}
            {!nav && (
              <div
                className="md:hidden text-xl cursor-pointer text-gray-400"
                onClick={toggleNav}
              >
                <FaBars />
              </div>
            )}
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
            <IoSearchSharp className="text-teal-500 cursor-pointer text-[20px]" />
          </div>

          {/* Mobile Menu Dropdown & Cancel Button */}
          {nav && (
            <div className="fixed top-0 left-0 w-full h-screen bg-white z-60 flex flex-col items-center justify-center gap-4 shadow-xl md:hidden">
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
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
