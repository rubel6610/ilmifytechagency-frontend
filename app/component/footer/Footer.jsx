"use client";
import React, { useState, useEffect } from "react";
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
import { usePathname } from "next/navigation";

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  if ( pathname.includes("/dashboard") ||
    pathname.includes("/login") ||
    pathname.includes("/register")) {
    return null;
  }

  return (
    <footer className="bg-[#FFFFFF] font-sans text-gray-600 mt-6 overflow-x-hidden">
      {/* Top Section */}
      <div className="max-w-400 mx-auto px-5 md:px-8.75 pb-20 xl:pb-33.75">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 w-full items-start">
          {/* 1. Logo & About */}
          <div className="space-y-5">
            <div className="flex items-center">
              <Link href="/" className=" xl:mx-0">
                <Image
                  className="logo w-45.25 h-auto md:w-42.75 lg:w-57.75 xl:w-37 2xl:w-47"
                  height={50}
                  width={150}
                  src="/logo.png"
                  alt="website logo"
                  priority
                />
              </Link>
            </div>
            <p className="leading-relaxed text-[15px] font-ubuntu">
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
            <ul className="space-y-3 text-[16px] font-ubuntu">
              {[
                "Home",
                "About",
                "Services",
                "Showcase",
                "Blog",
                "Contact",
                "Careers",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    className="hover:text-[#00D9A5] transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Contact Info */}
          <div className="w-full">
            <h3 className="text-[23px] font-bold text-gray-600 uppercase tracking-wider">
              Contact
            </h3>
            <CustomBorder />
            <ul className="space-y-4 text-[15px] font-ubuntu">
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
                 17/1 Ahmed Sarker Road, Trishal, Mymensingh, Bangladesh
                </span>
              </li>
            </ul>
            {/* Social Icons */}
            <div className="flex gap-2.5 mt-6">
              {[
                {
                  Icon: FaFacebookF,
                  link: "https://www.facebook.com/ilmifyTech",
                },
                { Icon: FaTwitter, link: "https://twitter.com" },
                {
                  Icon: FaLinkedinIn,
                  link: "https://bd.linkedin.com/company/ilmifytechagency",
                },
                {
                  Icon: FaInstagram,
                  link: "https://www.instagram.com/ilmifytech.agency",
                },
                {
                  Icon: FaYoutube,
                  link: "https://www.youtube.com/@ilmifyTechAgency",
                },
              ].map(({ Icon, link }, idx) => (
                <Link
                  key={idx}
                  href={link}
                  target="_blank"
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
            <h3 className="text-[23px] font-bold text-gray-600 uppercase tracking-wider font-ubuntu">
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
        <div className="max-w-400 mx-auto flex flex-col md:flex-row md:justify-between items-center md:items-center gap-6 py-8.75 pt-8.5 pb-9.5 px-5 md:px-8.75">
          {/* Left Side: Copyright Text */}
          <p className="text-gray-400 text-[16px] tracking-wide order-1 font-ubuntu text-center md:text-left">
            © 2025 ilmifyTech LLC . ALL RIGHTS RESERVED.
          </p>

          <div className="flex flex-col md:flex-row items-center md:items-center gap-5 order-2">
            {/* Social Icons Container */}
            <div className="flex gap-6 text-gray-400">
              <Link href="https://www.facebook.com/ilmifyTech">
                <FaFacebookF className="cursor-pointer hover:text-white transition-colors text-[16px]" />
              </Link>
              <Link href="https://www.instagram.com/ilmifytech.agency">
                <FaInstagram className="cursor-pointer hover:text-white transition-colors text-[16px]" />
              </Link>
              <Link href="https://bd.linkedin.com/company/ilmifytechagency">
                <FaLinkedinIn className="cursor-pointer hover:text-white transition-colors text-[16px]" />
              </Link>
              <Link href="https://twitter.com">
                <FaTwitter className="cursor-pointer hover:text-white transition-colors text-[16px]" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* --- SCROLL TO TOP BUTTON (Fixed Position) --- */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-8 right-5 md:right-8 z-50 bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:bg-[#00D9A5] hover:text-white transition-all duration-300 group active:scale-90 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        }`}
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
    </footer>
  );
};

export default Footer;