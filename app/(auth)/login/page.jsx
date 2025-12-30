"use client" 

import Lottie from "lottie-react";
import loginAnimation from "../../../public/assets/lotties/login"; 

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
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div className="mb-2">
            <label className="block text-sm font-medium mb-1">Password</label>
            <div className="relative">
              <input
                type="password"
                placeholder="Password"
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="absolute right-3 top-2.5 text-gray-400 cursor-pointer">
                👁
              </span>
            </div>
          </div>

          <div className="text-sm text-blue-600 mb-4 cursor-pointer">
            Forgot password?
          </div>

          {/* Login Button */}
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
            Login
          </button>

          {/* Register */}
          <p className="text-sm text-center mt-4">
            Don&apos;t have an account?{" "}
            <span className="text-blue-600 cursor-pointer">Register</span>
          </p>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="px-3 text-sm text-gray-500">OR</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          {/* Social Login */}
          <button className="w-full flex items-center justify-center gap-2 border py-2 rounded-lg hover:bg-gray-50 transition">
            <img src="/assets/google.svg" alt="Google" className="w-5 h-5" />
            Continue with Google
          </button>
        </div>

        {/* RIGHT: LOTTIE */}
        <div className="hidden md:flex items-center justify-center bg-gray-50">
          <Lottie
            animationData={loginAnimation}
            loop={true}
            className="w-96"
          />
        </div>
      </div>
    </div>
  );
}
