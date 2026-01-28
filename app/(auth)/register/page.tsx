"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Lottie from "lottie-react";
import registerAnimation from "../../../public/assets/lotties/register.json";
// import Image from "next/image"; // Commented out: no longer needed
import Link from "next/link";
import { motion } from "framer-motion";
import { useRegisterMutation } from "redux/api/authApi";
import Swal from 'sweetalert2'
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface FormData {
  name: string;
  email: string;
  password: string;
  // photo: FileList; // COMMENTED OUT: Profile upload disabled per requirements
}

const Register = () => {
  // const [preview, setPreview] = useState<string | null>(null); // COMMENTED OUT
  // const [loading, setLoading] = useState<boolean>(false); // Replaced with RTK Query state
  const [registerUser, { isLoading: isRegistering }] = useRegisterMutation();
  const role = "ADMIN"; // Hardcoded per backend requirements
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    // setError, // COMMENTED OUT: no longer needed for photo validation
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      // photo: undefined as unknown as FileList, // COMMENTED OUT
    },
  });

  // // COMMENTED OUT: Image validation + preview handler
  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (!file) return;
  //   if (!file.type.startsWith("image/")) {
  //     setError("photo", { message: "Only image files allowed" });
  //     return;
  //   }
  //   if (file.size > 2 * 1024 * 1024) {
  //     setError("photo", { message: "Image must be under 2MB" });
  //     return;
  //   }
  //   setPreview(URL.createObjectURL(file));
  // };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      // PAYLOAD ADJUSTED PER BACKEND REQUIREMENTS:
      // - Includes "role" field
      // - EXCLUDES photo/upload logic
      const userPayload = {
        name: data.name,
        email: data.email,
        password: data.password,
        // role, 
      };

     const res = await registerUser(userPayload).unwrap();

     if(res.status == true ){
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful',
        text: res.message || 'You have registered successfully!',
        position: 'center',
      });
        reset();
        router.push('/login');
  
     }else{
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: res.message || 'Registration failed. Please check console for details.',
        position: 'center',
      });
     }
    

    } catch (err) {
      console.error("Registration error:", err);
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: 'An unexpected error occurred. Please try again later.',
        position: 'center',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 pt-20">
      <div className="max-w-5xl w-full bg-white rounded-xl shadow-lg grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        {/* LEFT */}
        <div className="p-8 md:p-12">
          <h2 className="text-3xl font-semibold mb-6">Register your account</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <div>
              <label className="text-sm text-gray-600">Name</label>
              <input
                placeholder="Your full name"
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                })}
                className="w-full mt-1 px-4 py-2 border rounded-md focus:border-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="text-sm text-gray-600">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
                className="w-full mt-1 px-4 py-2 border rounded-md focus:border-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* 
              PROFILE PHOTO SECTION COMMENTED OUT PER REQUIREMENTS
              Backend payload no longer includes photo field
            */}
            {/* 
            <div>
              <label className="text-sm text-gray-600">Profile Photo</label>
              <label className="mt-2 flex items-center gap-4 cursor-pointer border border-dashed border-gray-300 p-4 rounded-md hover:border-emerald-500 transition">
                <div className="w-12 h-12 rounded-full border flex items-center justify-center overflow-hidden bg-gray-100">
                  {preview ? (
                    <Image
                      src={preview}
                      width={80}
                      height={80}
                      alt="Preview"
                      className="object-cover"
                    />
                  ) : (
                    <span className="text-gray-400 text-sm">Upload</span>
                  )}
                </div>
                <span className="text-sm text-gray-500">
                  Click to select image
                </span>
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  {...register("photo", { required: "Photo is required" })}
                  onChange={handleImageChange}
                />
              </label>
              {errors.photo && (
                <p className="text-red-500 text-sm">{errors.photo.message}</p>
              )}
            </div>
            */}

            {/* Password */}
 {/* Password Field with Toggle */}
            <div>
              <label htmlFor="password" className="text-sm text-gray-600 block mb-1">Password</label>
              <div className="relative mt-1">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="At least 6 characters"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Minimum 6 characters",
                    },
                    pattern: {
                      value: /^(?=.*\d).+$/,
                      message: "Must include at least one number",
                    },
                  })}
                  className="w-full px-4 py-2 border rounded-md focus:border-none focus:outline-none focus:ring-2 focus:ring-emerald-500 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff size={20} className="text-emerald-600" />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={isRegistering} // Uses RTK Query loading state
              whileHover={{ scale: 1.02 }}
              className="w-full mt-4 bg-gradient-to-r from-[#0ddaa0] to-[#8ce064] text-white py-3 rounded-lg shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isRegistering ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Creating Account...
                </>
              ) : (
                "Register"
              )}
            </motion.button>
          </form>

          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link href="/login" className="text-emerald-600 font-medium hover:underline">
              Login
            </Link>
          </p>
        </div>

        {/* RIGHT */}
        <div className="hidden md:flex items-center justify-center bg-gray-50">
          <Lottie animationData={registerAnimation} loop className="w-96" />
        </div>
      </div>
    </div>
  );
};

export default Register;