"use client";
import React from "react";
import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import CustomBorder from "../customBorder/CustomBorder";
import Image from "next/image";
import { PiDeviceMobileLight } from "react-icons/pi";
import { IoLocationOutline } from "react-icons/io5";

const Footer = () => {
  return (
    <footer className="bg-[#FFFFFF] pt-20 xl:pt-25 font-sans text-gray-600">
      {/* Top Section */}
      <div className="max-w-400 mx-auto px-5 md:px-10 pb-20 xl:pb-33.75">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 w-full items-start">
          {/* 1. Logo & About */}
          <div className="space-y-5">
            <div className="flex items-center">
              <Link href="/" className="md:mx-auto xl:mx-0">
                <Image
                  className="logo w-45.25 h-auto md:w-42.75 lg:w-57.75 xl:w-37 2xl:w-47"
                  height={50}
                  width={150}
                  src="/Logo-1-1.png"
                  alt="website logo"
                  priority
                />
              </Link>
            </div>
            <p className="leading-relaxed text-[15px]">
              At iLMIFY, we re passionate about delivering innovative digital
              solutions that drive business growth. We combine cutting-edge
              technology with tailored strategies to create stunning web
              designs, mobile apps, and AI-driven systems that help businesses
              thrive in the digital world.
            </p>
          </div>

          {/* 2. Quick Links */}
          <div className="w-full">
            <h3 className="text-[23px] font-bold text-gray-600 uppercase tracking-wider">
              Quick Links
            </h3>
            <CustomBorder />
            <ul className="space-y-3 text-[16px]">
              {["Home", "About", "Services", "Showcase", "Blog", "Contact"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href={`/${item.toLowerCase()}`}
                      className="hover:text-[#00D9A5] transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* 3. Contact Info */}
          <div className="w-full">
            <h3 className="text-[23px] font-bold text-gray-600 uppercase tracking-wider">
              Contact
            </h3>
            <CustomBorder />
            <ul className="space-y-4 text-[15px]">
              <li className="flex items-center gap-3">
                <MdOutlineMail className="text-[#8FE481] text-xl shrink-0" />
                <a
                  href="mailto:info@ilmifytech.com"
                  className="hover:text-[#00D9A5] break-all"
                >
                  info@ilmifytech.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <PiDeviceMobileLight className="text-[#8FE481] text-xl shrink-0" />
                <span>+13072696920</span>
              </li>
              <li className="flex items-start gap-3">
                <IoLocationOutline className="text-[#8FE481] text-2xl shrink-0" />
                <span className="leading-tight">
                  30 N GOULD ST STE R, SHERIDAN, WY 82801
                </span>
              </li>
            </ul>
            {/* Social Icons */}
            <div className="flex gap-2.5 mt-6">
              {[
                FaFacebookF,
                FaTwitter,
                FaLinkedinIn,
                FaInstagram,
                FaYoutube,
              ].map((Icon, idx) => (
                <Link
                  key={idx}
                  href="#"
                  className="w-6 h-6 rounded-full bg-[#00D9A5] text-white flex items-center justify-center 
           transition-all duration-300 
           hover:bg-[#A5E46D]
           hover:translate-y-2 
           active:translate-y-0"
                >
                  <Icon size={12} />
                </Link>
              ))}
            </div>
          </div>

          {/* 4. Policy */}
          <div className="w-full">
            <h3 className="text-[23px] font-bold text-gray-600 uppercase tracking-wider">
              Policy
            </h3>
            <CustomBorder />
            <ul className="space-y-3 text-[15px]">
              {[
                "Refund Policy",
                "Privacy policy",
                "Terms and Conditions",
                "Payment partners",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="hover:text-[#00D9A5] transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Black Bar */}
      <div className="bg-linear-to-r from-[#5a5757] to-[#111111]">
        <div className="max-w-400 mx-auto flex flex-col md:flex-row md:justify-between items-start md:items-center gap-6 py-8.75 pt-8.5 pb-9.5 px-8.75">
          {/* Left Side: Copyright Text */}
          <p className="text-gray-400 text-[16px] tracking-wide order-1">
            © 2025 ilmifyTech LLC . ALL RIGHTS RESERVED.
          </p>

          {/* Right Side: Social Icons & Scroll Button */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-5 order-2">
            {/* Social Icons Container */}
            <div className="flex gap-6 text-gray-400">
              <FaFacebookF className="cursor-pointer hover:text-white transition-colors text-[16px]" />
              <FaInstagram className="cursor-pointer hover:text-white transition-colors text-[16px]" />
              <FaLinkedinIn className="cursor-pointer hover:text-white transition-colors text-[16px]" />
              <FaTwitter className="cursor-pointer hover:text-white transition-colors text-[16px]" />
            </div>

            {/* Scroll Top Button (Optional: Mobile-e hide rakhte chaile 'hidden md:flex' dite paren) */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-md hover:bg-[#00D9A5] hover:text-white transition-all group self-end md:self-auto"
            >
              <svg
                className="w-5 h-5 text-black group-hover:text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
