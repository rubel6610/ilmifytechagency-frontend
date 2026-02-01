import { motion, AnimatePresence } from "framer-motion";
import { HiX, HiCamera } from "react-icons/hi";
import { CgSpinner } from "react-icons/cg";
import Image from "next/image";
import { useRef, ChangeEvent } from "react";
import { UseFormRegister, UseFormHandleSubmit, FieldErrors, UseFormSetValue } from "react-hook-form";
import { BlogFormData } from "../types";

interface AddBlogModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleSubmit: UseFormHandleSubmit<BlogFormData>;
  onAddSubmit: (data: BlogFormData) => Promise<void>;
  register: UseFormRegister<BlogFormData>;
  errors: FieldErrors<BlogFormData>;
  preview: string | null;
  setPreview: (preview: string | null) => void;
  setValue: UseFormSetValue<BlogFormData>;
  isSubmitting: boolean;
}

const AddBlogModal = ({
  isOpen,
  onClose,
  handleSubmit,
  onAddSubmit,
  register,
  errors,
  preview,
  setPreview,
  setValue,
  isSubmitting,
}: AddBlogModalProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // @ts-ignore - Handle FileList vs File discrepancy if any, though react-hook-form usually handles this
    setValue("photo", e.target.files); 
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-70 flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-[2px]"
          />
          
          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative bg-white w-full max-w-xl rounded-4xl p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.15)] z-10 border border-gray-100"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-all duration-200"
            >
              <HiX className="text-2xl" />
            </button>

            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-extrabold text-gray-800">
                Create <span className="text-emerald-500">New Blog</span>
              </h2>
            </div>

            <form onSubmit={handleSubmit(onAddSubmit)} className="space-y-6">
              {/* Title Field */}
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Blog Title</label>
                <input
                  {...register("title", { required: "Title required" })}
                  placeholder="Enter a catchy title..."
                  className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white transition-all duration-300 placeholder:text-gray-400"
                />
                {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
              </div>

              {/* Image Upload Field */}
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Thumbnail</label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className={`relative group border-2 border-dashed rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 flex flex-col items-center justify-center
                    ${preview ? 'border-emerald-500 h-48' : 'border-gray-200 hover:border-emerald-400 h-32 bg-gray-50 hover:bg-emerald-50/30'}`}
                >
                  {preview ? (
                    <>
                      <Image
                        src={preview}
                        alt="preview"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <p className="text-white font-medium flex items-center gap-2">
                          <HiCamera /> Change Photo
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className="text-center">
                      <div className="bg-emerald-100 p-3 rounded-full inline-block mb-2 group-hover:scale-110 transition-transform duration-300">
                        <HiCamera className="text-emerald-600 text-2xl" />
                      </div>
                      <p className="text-sm font-medium text-gray-500">Click to upload image</p>
                    </div>
                  )}
                  <input
                    type="file"
                    ref={fileInputRef}
                    hidden
                    onChange={handleImageChange}
                    accept="image/*"
                  />
                </div>
                {errors.photo && <p className="text-red-500 text-xs mt-1">{errors.photo.message}</p>}
              </div>

               {/* Category Field */}
               <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Category</label>
                <input
                  {...register("category", { required: "Category required" })}
                  placeholder="e.g. Technology, Lifestyle..."
                  className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white transition-all duration-300 placeholder:text-gray-400"
                />
                {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
              </div>

              {/* Content Field */}
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Content</label>
                <textarea
                  {...register("content", { required: "Content required" })}
                  className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white transition-all duration-300 placeholder:text-gray-400 resize-none"
                  rows={5}
                  placeholder="Write your blog content here..."
                />
                {errors.content && <p className="text-red-500 text-xs mt-1">{errors.content.message}</p>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-300 text-white font-bold rounded-2xl shadow-[0_10px_20px_rgba(16,185,129,0.2)] hover:shadow-[0_10px_25px_rgba(16,185,129,0.3)] transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <CgSpinner className="animate-spin text-xl" />
                    <span>Publishing...</span>
                  </>
                ) : (
                  "Publish Blog Post"
                )}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AddBlogModal;
