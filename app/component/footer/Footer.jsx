"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
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
    <footer className="bg-[#FFFFFF] font-sans text-gray-600 mt-6 overflow-x-hidden -z-4">
      {/* Top Section */}
      <div className="max-w-400 mx-auto px-5 md:px-8.75">
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
      <div className="bg-[#FFFFFF]">
        <div className="max-w-400 mx-auto flex justify-center items-center gap-6 py-8.75 pt-8.5 pb-10 px-5 md:px-8.75">
          {/* Left Side: Copyright Text */}
          <p className="text-gray-400 text-[16px] tracking-wide order-1 font-ubuntu text-center md:text-left">
            © 2025 ilmifyTech LLC . ALL RIGHTS RESERVED.
          </p>

        </div>
      </div>
    </footer>
  );
};

export default Footer;