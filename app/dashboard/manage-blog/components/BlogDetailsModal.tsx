import { motion, AnimatePresence } from "framer-motion";
import { HiX } from "react-icons/hi";
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
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          className="relative bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 bg-black/20 text-white p-2 rounded-full hover:bg-black/40 transition-all"
          >
            <HiX className="text-2xl" />
          </button>
          
          <div className="relative h-64 w-full">
            <Image src={blog.image} alt={blog.title} fill className="object-cover" />
          </div>

          <div className="p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">{blog.title}</h2>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 p-3 rounded-xl">
                <p className="text-[10px] uppercase text-gray-400 font-bold">Author</p>
                <p className="text-sm font-semibold">{blog.author}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-xl">
                <p className="text-[10px] uppercase text-gray-400 font-bold">Date</p>
                <p className="text-sm font-semibold">{blog.date}</p>
              </div>
            </div>

            <h4 className="font-bold mb-2">Description</h4>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
              {blog.description || "No description available."}
            </p>

            <div className="mt-8 flex justify-end">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-gray-100 font-bold rounded-xl hover:bg-gray-200 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default BlogDetailsModal;
