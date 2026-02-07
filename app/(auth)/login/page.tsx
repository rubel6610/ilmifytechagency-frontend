"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Lottie from "lottie-react";
import loginAnimation from "../../../public/assets/lotties/login.json";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useLoginMutation } from "redux/api/authApi";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { setCredentials } from "redux/features/authSlice";
import { useRouter } from "next/navigation";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const router = useRouter();

  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: any) => {
    try {
      const res = await login(data).unwrap();

      if (res?.status === true && res?.data) {
        const { token, refreshToken, ...user } = res.data;

        // Save to Redux + cookies
        dispatch(
          setCredentials({
            token,
            refreshToken,
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
              isEmailVerified: user.isEmailVerified,
            },
          }),
        );

        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "Welcome back!",
          timer: 2000,
          showConfirmButton: false,
        });

        if (user.role === "ADMIN") {
          router.push("/dashboard");
        } else {
          router.push("/");
        }
      }
    } catch (error: any) {
      console.error("Login failed:", error);
      const message =
        error?.data?.message || "Login failed. Please check your credentials.";
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: message,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 ">
      <div className="max-w-5xl w-full grid md:grid-cols-2 gap-10 bg-white rounded-2xl shadow-xl p-8 mt-30 lg:mt-50 xl:mt-30">
        {/* LEFT: LOGIN FORM */}
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-6">Login your account</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                placeholder="Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
                className="w-full border rounded-md focus:border-none px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Minimum 6 characters required",
                    },
                  })}
                  className="w-full border rounded-md focus:border-none focus:outline-none px-4 py-2 focus:ring-2 focus:ring-emerald-500 pr-10"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="text-sm text-emerald-600 cursor-pointer hover:underline">
              Forgot password?
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full mt-4 bg-linear-to-r from-[#0ddaa0] to-[#8ce064] text-white py-3 rounded-lg text-sm tracking-wide shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </motion.button>
          </form>

          {/* Register */}
          <p className="text-sm text-center mt-4">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-emerald-600 font-medium hover:underline"
            >
       {isLoading ? "Loading..." : "Register"}
            </Link>
          </p>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="grow h-px bg-gray-300" />
            <span className="px-3 text-sm text-gray-500">OR</span>
            <div className="grow h-px bg-gray-300" />
          </div>

          {/* Google Login */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 rounded-md border border-gray-300 bg-white py-2.5 text-sm font-medium text-gray-700 hover:shadow-sm"
          >
            <Image
              src="/assets/google.png"
              alt="Google logo"
              width={20}
              height={20}
            />
            Continue with Google
          </button>
        </div>

        {/* RIGHT: LOTTIE */}
        <div className="hidden md:flex items-center justify-center bg-gray-50">
          <Lottie animationData={loginAnimation} loop className="w-96" />
        </div>
      </div>
    </div>
  );
}
