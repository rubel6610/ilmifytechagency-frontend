import { motion, AnimatePresence } from "framer-motion";
import { HiX, HiCamera } from "react-icons/hi";
import Image from "next/image";
import { useRef, ChangeEvent, FormEvent } from "react";
import { Blog } from "../types";

interface EditBlogModalProps {
  editBlog: Blog | null;
  setEditBlog: (blog: Blog | null) => void;
  handleEditSubmit: (e: FormEvent) => void;
}

const EditBlogModal = ({ editBlog, setEditBlog, handleEditSubmit }: EditBlogModalProps) => {
  const editFileInputRef = useRef<HTMLInputElement>(null);

  if (!editBlog) return null;

  const handleEditImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setEditBlog({ ...editBlog, image: imageUrl });
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-70 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setEditBlog(null)}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative bg-white w-full max-w-lg rounded-3xl p-8 shadow-2xl z-10"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Blog Post</h2>
          <form onSubmit={handleEditSubmit} className="space-y-4">
            {/* Image Section */}
            <div
              className="relative w-full h-40 rounded-2xl overflow-hidden border border-gray-200 group cursor-pointer"
              onClick={() => editFileInputRef.current?.click()}
            >
              <Image src={editBlog.image} alt="Edit" fill className="object-cover" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                <HiCamera className="text-white text-3xl" />
              </div>
              <input
                type="file"
                ref={editFileInputRef}
                hidden
                accept="image/*"
                onChange={handleEditImageChange}
              />
            </div>

            {/* Title Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">Title</label>
              <input
                type="text"
                value={editBlog.title}
                onChange={(e) => setEditBlog({ ...editBlog, title: e.target.value })}
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                required
              />
            </div>

            {/* Description Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">Description</label>
              <textarea
                rows={4}
                value={editBlog.description}
                onChange={(e) => setEditBlog({ ...editBlog, description: e.target.value })}
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
                required
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setEditBlog(null)}
                className="flex-1 py-3 bg-gray-100 text-gray-600 font-bold rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-3 bg-emerald-500 text-white font-bold rounded-xl shadow-lg hover:bg-emerald-600 transition-all"
              >
                Update
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default EditBlogModal;
