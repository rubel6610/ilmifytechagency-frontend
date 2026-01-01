"use client";

import Lottie from "lottie-react";
import loginAnimation from "../../../public/assets/lotties/login";
import Image from "next/image";
import Link from "next/link";
const MotionLink = motion(Link);
import { motion } from "motion/react";


export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-5xl w-full grid md:grid-cols-2 gap-10 bg-white rounded-2xl shadow-xl p-8">
        {/* LEFT: LOGIN FORM */}
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-6">Login your account</h2>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="Email"
              className="w-full border rounded-lg px-4 py-2 focus:border-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Password */}
          <div className="mb-2">
            <label className="block text-sm font-medium mb-1">Password</label>
            <div className="relative">
              <input
                type="password"
                placeholder="Password"
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:border-none focus:ring-emerald-500"
              />
              <span className="absolute right-3 top-2.5 text-gray-400 cursor-pointer">
                👁
              </span>
            </div>
          </div>

          <div className="text-sm text-primary mb-4 cursor-pointer">
            Forgot password?
          </div>

          <MotionLink
            href="/contact"
            className="
              w-full
              text-center
             relative
             overflow-hidden
           bg-linear-to-r
               from-[#0ddaa0]
               to-[#8ce064]
               text-white
               mt-12
             px-8
             py-3
             rounded-lg
             text-sm
             tracking-wide
             shadow-xl
             inline-block
           "
            initial="rest"
            whileHover="hover"
            animate="rest"
          >
            {/* Hover Gradient */}
            <motion.span
              variants={{
                rest: { scale: 0 },
                hover: { scale: 1 },
              }}
              transition={{ duration: 0.17, ease: "easeOut" }}
              className="
               absolute
               inset-0
              bg-linear-to-r
               from-[#3D3D3D]
               to-[#151515]
             text-white
               rounded-lg
               z-0
             "
              style={{ originX: 0.5, originY: 0.5 }}
            />

            <span className="relative z-10">Register</span>
          </MotionLink>

          {/* Register */}
          <p className="text-sm text-center mt-4">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-primary font-medium">
              Register
            </Link>
          </p>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="grow h-px bg-gray-300"></div>
            <span className="px-3 text-sm text-gray-500">OR</span>
            <div className="grow h-px bg-gray-300"></div>
          </div>

          {/* Social Login */}
          <button
            type="button"
            aria-label="Continue with Google"
            className="w-full flex items-center justify-center gap-3 rounded-md border border-gray-300 bg-white py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <Image
              src="/assets/google.png"
              alt="Google logo"
              width={20}
              height={20}
              className="object-contain"
            />
            <span>Continue with Google</span>
          </button>
        </div>

        {/* RIGHT: LOTTIE */}
        <div className="hidden md:flex items-center justify-center bg-gray-50">
          <Lottie animationData={loginAnimation} loop={true} className="w-96" />
        </div>
      </div>
    </div>
  );
}
