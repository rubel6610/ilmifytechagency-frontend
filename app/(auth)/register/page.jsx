"use client";

import Lottie from "lottie-react";
import registerAnimation from "../../../public/assets/lotties/register"; // your lottie json
import Image from "next/image";
import Link from "next/link";
const MotionLink = motion(Link);
import { motion } from "motion/react";

const Register = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-5xl w-full bg-white rounded-xl shadow-lg grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        {/* LEFT: FORM */}
        <div className="p-8 md:p-12">
          <h2 className="text-3xl font-semibold mb-6">Register your account</h2>

          <form className="space-y-4">
            <div>
              <label className="text-sm text-gray-600">Name</label>
              <input
                type="text"
                placeholder="Name"
                className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Email</label>
              <input
                type="email"
                placeholder="Email"
                className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Photo URL</label>
              <input
                type="text"
                placeholder="Photo URL"
                className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Password</label>
              <input
                type="password"
                placeholder="Password"
                className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
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
          </form>

          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <span className="text-blue-600 cursor-pointer font-medium">
              Login
            </span>
          </p>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow border-t"></div>
            <span className="px-3 text-sm text-gray-500">OR</span>
            <div className="flex-grow border-t"></div>
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
          <Lottie
            animationData={registerAnimation}
            loop={true}
            className="w-96"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
