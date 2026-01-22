"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Lottie from "lottie-react";
import registerAnimation from "../../../public/assets/lotties/register";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const Register = () => {
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // Image validation + preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("photo", { message: "Only image files allowed" });
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setError("photo", { message: "Image must be under 2MB" });
      return;
    }

    setPreview(URL.createObjectURL(file));
  };

  // Submit handler
  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const imageFile = data.photo[0];

      // 1️⃣ Upload image
      const formData = new FormData();
      formData.append("image", imageFile);

      const uploadRes = await fetch("/api/upload-image", {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadRes.json();
      if (!uploadRes.ok) throw new Error("Image upload failed");

      // 2️⃣ Save user to DB
      const userPayload = {
        name: data.name,
        email: data.email,
        password: data.password,
        photo: uploadData.url,
      };

      const userRes = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userPayload),
      });

      if (!userRes.ok) throw new Error("User creation failed");

      reset();
      setPreview(null);
      alert("Registration successful 🎉");
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
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
                className="w-full mt-1 px-4 py-2  border rounded-md focus:border-none focus:outline-none  focus:ring-2 focus:ring-emerald-500"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Photo Upload */}
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

            {/* Password */}
            <div>
              <label className="text-sm text-gray-600">Password</label>
              <input
                type="password"
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
                className="w-full mt-1 px-4 py-2 border rounded-md focus:border-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              className="w-full mt-4 bg-linear-to-r from-[#0ddaa0] to-[#8ce064] text-white py-3 rounded-lg shadow-lg"
            >
              {loading ? "Creating Account..." : "Register"}
            </motion.button>
          </form>

          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-medium">
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
