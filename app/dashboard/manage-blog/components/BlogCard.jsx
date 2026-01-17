import Image from "next/image";
import { motion } from "framer-motion";
import { HiOutlinePencilAlt, HiOutlineTrash, HiOutlineEye } from "react-icons/hi";

const BlogCard = ({ blog, onEdit, onDelete, onView }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.9 }}
    className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group flex flex-col"
  >
    <div className="relative h-44 w-full bg-gray-100">
      <Image src={blog.image} alt={blog.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
    </div>
    <div className="p-5 flex flex-col grow">
      <h3 className="font-bold text-gray-800 line-clamp-1 mb-1">{blog.title}</h3>
      <div className="flex justify-between items-center mb-3">
        <p className="text-[10px] text-gray-400 font-bold uppercase">{blog.date}</p>
        <span className="text-[10px] bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full font-bold">{blog.bussiness}</span>
      </div>
      <div className="mt-auto space-y-2 pt-3 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <button onClick={onEdit} className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all text-sm font-medium">
            <HiOutlinePencilAlt /> Edit
          </button>
          <button onClick={onDelete} className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all text-sm font-medium">
            <HiOutlineTrash /> Delete
          </button>
        </div>
        <button onClick={onView} className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-800 hover:text-white transition-all text-sm font-medium">
          <HiOutlineEye /> View Details
        </button>
      </div>
    </div>
  </motion.div>
);

export default BlogCard;