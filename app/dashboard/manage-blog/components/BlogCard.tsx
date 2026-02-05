import Image from "next/image";
import { motion } from "framer-motion";
import { HiOutlinePencilAlt, HiOutlineTrash, HiOutlineEye } from "react-icons/hi";
import { Blog } from "../types";

interface BlogCardProps {
  blog: Blog;
  onEdit: () => void;
  onDelete: () => void;
  onView: () => void;
}

const BlogCard = ({ blog, onEdit, onDelete, onView }: BlogCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.9 }}
    className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group flex flex-col h-full"
  >
    <div className="relative h-48 w-full bg-gray-100">
      <Image 
        src={blog.images?.[0] || "/placeholder-blog.png"} 
        alt={blog.title} 
        fill 
        className="object-cover group-hover:scale-105 transition-transform duration-500" 
      />
      {!blog.active && (
        <div className="absolute top-3 right-3 bg-gray-900/80 text-white text-[10px] font-bold px-2 py-1 rounded-md backdrop-blur-sm">
          DRAFT
        </div>
      )}
    </div>
    <div className="p-5 flex flex-col grow">
      <div className="mb-3">
        <h3 className="font-bold text-gray-800 line-clamp-1 mb-1 group-hover:text-emerald-600 transition-colors uppercase tracking-tight">
          {blog.title}
        </h3>
        <p className="text-gray-500 text-xs line-clamp-2 leading-relaxed">
          {blog.subTitle}
        </p>
      </div>
      
      <div className="flex justify-between items-center mb-4 pt-3 border-t border-gray-50">
        <div className="flex items-center gap-2">
          {blog.admin?.photo ? (
            <div className="relative w-5 h-5 rounded-full overflow-hidden border border-gray-100">
              <Image src={blog.admin.photo} alt={blog.admin.name} fill className="object-cover" />
            </div>
          ) : (
            <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-[10px] font-bold text-emerald-600">
              {blog.admin?.name?.charAt(0) || "A"}
            </div>
          )}
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
            {blog.admin?.name || "Admin"}
          </span>
        </div>
        <span className="text-[10px] text-gray-400 font-medium">
          {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : "Recently"}
        </span>
      </div>

      <div className="mt-auto space-y-2">
        <div className="flex items-center gap-2">
          <button onClick={onEdit} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all text-xs font-bold">
            <HiOutlinePencilAlt size={16} /> Edit
          </button>
          <button onClick={onDelete} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all text-xs font-bold">
            <HiOutlineTrash size={16} /> Delete
          </button>
        </div>
        <button onClick={onView} className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gray-900 text-white hover:bg-emerald-600 transition-all text-xs font-bold shadow-lg shadow-gray-200">
          <HiOutlineEye size={16} /> View Details
        </button>
      </div>
    </div>
  </motion.div>
);

export default BlogCard;
