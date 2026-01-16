"use client";
import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import Image from "next/image";
import { role } from "../page";
import { HiX } from "react-icons/hi";
import { CgSpinner } from "react-icons/cg";

const AddBlog = () => {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      category: "",
      photo: null,
      content: "",
    },
  });

  /** img handling and preview */
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setError("photo", {
        type: "manual",
        message: "Only JPEG, PNG, or WebP allowed",
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("photo", {
        type: "manual",
        message: "File size must be less than 5MB",
      });
      return;
    }

    clearErrors("photo");
    setValue("photo", file);

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setPreview(null);
    setValue("photo", null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  /** img upload and data submit handler */
  const onSubmit = async (data) => {
    if (!data.photo) {
      setError("photo", { type: "manual", message: "Please upload an image" });
      return;
    }

    setIsSubmitting(true);

    try {
      // 1.make form data for imgBB and append image file
      const formData = new FormData();
      formData.append("image", data.photo);

      // 2. img upload post request to imgBB
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        {
          method: "POST",
          body: formData,
        }
      );
      const imgData = await response.json();

      if (imgData.success) {
        // 3. prepare final data object with img URL
        const finalBlogData = {
          title: data.title,
          category: data.category,
          content: data.content,
          photo: imgData.data.url,
          author: role,
          date: new Date().toLocaleDateString("en-GB"),
        };

        console.log("Blog Post Data ", finalBlogData);

        alert("Blog post created successfully!");
        reset();
        removeImage();
      } else {
        alert("Image upload failed. Please check your API Key.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Something went wrong during upload.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-3 md:mx-8 xl:mx-auto my-10 p-8 bg-white rounded-3xl w-full shadow-xl border border-gray-100"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Create a <span className="text-emerald-500">New Blog</span>
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Blog Title
            </label>
            <input
              {...register("title", { required: "Title is required" })}
              className={`w-full p-4 bg-gray-50 border ${
                errors.title ? "border-red-500" : "border-gray-200"
              } rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500`}
              placeholder="Enter blog title"
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <div className="">
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Category
              </label>
              <input
                {...register("category", { required: "Category required" })}
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="e.g. business"
              />
            </div>
          </div>

          {/* IMAGE UPLOAD SECTION */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-600">
              Blog Thumbnail
            </label>
            <div
              onClick={() => fileInputRef.current.click()}
              className={`border-2 border-dashed rounded-2xl p-6 transition-all cursor-pointer bg-gray-50 text-center ${
                errors.photo
                  ? "border-red-500"
                  : "border-gray-200 hover:border-emerald-500"
              }`}
            >
              {preview ? (
                <div className="relative w-full h-48">
                  <Image
                    src={preview}
                    alt="Preview"
                    fill
                    className="object-cover rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeImage();
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-lg"
                  >
                    <HiX className="h-5 w-5" />
                  </button>
                </div>
              ) : (
                <div className="py-4">
                  <div className="text-4xl mb-2">📸</div>
                  <p className="text-gray-500 font-medium">
                    Click to upload image
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    JPEG, PNG or WebP (Max 5MB)
                  </p>
                </div>
              )}
              <input
                type="file"
                ref={fileInputRef}
                hidden
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            {errors.photo && (
              <p className="text-red-500 text-xs mt-1">
                {errors.photo.message}
              </p>
            )}
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Blog Content
            </label>
            <textarea
              {...register("content", { required: "Content is required" })}
              rows="5"
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
              placeholder="Write blog description..."
            ></textarea>
            {errors.content && (
              <p className="text-red-500 text-xs mt-1">
                {errors.content.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-4 bg-linear-to-r from-emerald-500 to-lime-500 text-white font-bold text-lg rounded-2xl shadow-lg transition-all active:scale-95 ${
              isSubmitting
                ? "opacity-50 cursor-not-allowed"
                : "hover:shadow-emerald-500/40 transform hover:-translate-y-1"
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <CgSpinner className="animate-spin h-5 w-5 text-white" />
                Uploading to Cloud...
              </span>
            ) : (
              "Add Blog Post"
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddBlog;
