import { motion, AnimatePresence } from "framer-motion";
import { HiX, HiOutlineUser, HiOutlineCalendar, HiOutlineEye } from "react-icons/hi";
import Image from "next/image";
import { Blog } from "../types";

interface BlogDetailsModalProps {
  blog: Blog | null;
  onClose: () => void;
}

const BlogDetailsModal = ({ blog, onClose }: BlogDetailsModalProps) => {
  if (!blog) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        />
        <motion.div
          initial={{ y: 50, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 50, opacity: 0, scale: 0.95 }}
          className="relative bg-white w-full max-w-3xl rounded-4xl overflow-hidden shadow-2xl z-10 max-h-[90vh] overflow-y-auto border border-gray-100"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-20 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full backdrop-blur-md transition-all border border-white/20"
          >
            <HiX className="text-2xl" />
          </button>
          
          <div className="relative h-72 md:h-96 w-full">
            <Image 
              src={blog.images?.[0] || "/placeholder-blog.png"} 
              alt={blog.title} 
              fill 
              className="object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60" />
            <div className="absolute bottom-8 left-8 right-8">
              <span className="inline-block bg-emerald-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4 shadow-lg">
                Blog Article
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight drop-shadow-md">
                {blog.title}
              </h2>
            </div>
          </div>

          <div className="p-8 md:p-10">
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-3 bg-gray-50 px-4 py-2.5 rounded-2xl border border-gray-100">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <HiOutlineUser className="text-lg" />
                </div>
                <div>
                  <p className="text-[10px] uppercase text-gray-400 font-bold tracking-wider leading-none mb-1">Author</p>
                  <p className="text-sm font-bold text-gray-700">{blog.admin?.name || "Team Member"}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-gray-50 px-4 py-2.5 rounded-2xl border border-gray-100">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <HiOutlineCalendar className="text-lg" />
                </div>
                <div>
                  <p className="text-[10px] uppercase text-gray-400 font-bold tracking-wider leading-none mb-1">Published</p>
                  <p className="text-sm font-bold text-gray-700">
                    {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString(undefined, { dateStyle: 'long' }) : "Recently"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-gray-50 px-4 py-2.5 rounded-2xl border border-gray-100">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                  <HiOutlineEye className="text-lg" />
                </div>
                <div>
                  <p className="text-[10px] uppercase text-gray-400 font-bold tracking-wider leading-none mb-1">Views</p>
                  <p className="text-sm font-bold text-gray-700">{blog.views || 0}</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
                  <div className="w-1.5 h-6 bg-emerald-500 rounded-full" />
                  Summary
                </h4>
                <p className="text-gray-500 font-medium leading-relaxed italic">
                  "{blog.subTitle}"
                </p>
              </div>

              <div className="border-t border-gray-100 pt-6">
                <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <div className="w-1.5 h-6 bg-emerald-500 rounded-full" />
                  Content
                </h4>
                <div className="text-gray-600 leading-relaxed whitespace-pre-line text-lg font-sans">
                  {blog.des || "No content available."}
                </div>
              </div>
            </div>

            <div className="mt-12 flex justify-end">
              <button
                onClick={onClose}
                className="px-8 py-3 bg-gray-900 text-white font-bold rounded-2xl hover:bg-emerald-600 transition-all shadow-xl shadow-gray-200"
              >
                Close Article
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default BlogDetailsModal;
