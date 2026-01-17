// "use client";

// import { useState } from "react";
// import { motion } from "motion/react";
// import { FiUser, FiMail, FiPhone, FiFileText, FiSend } from "react-icons/fi";

// export default function ApplyJobForm({ job, onClose, isInline = false }) {
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     const formData = new FormData(e.target);
//     setTimeout(() => {
//       setLoading(false);
//       alert("Application submitted successfully!");
//       if (onClose) onClose();
//     }, 1200);
//   };

//   const containerStyle = isInline 
//     ? "relative w-full" 
//     : "fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4";

//   return (
//     <div className={containerStyle}>
//       <motion.div
//         initial={isInline ? { opacity: 0, x: 20 } : { scale: 0.9, opacity: 0 }}
//         animate={{ opacity: 1, scale: 1, x: 0 }}
//         className="relative group w-full max-w-180"
//       >
//         {/* Decorative Background Glow */}
//         <div className="absolute -inset-1 bg-linear-to-r from-[#86e062] to-[#00c389] rounded-2xl blur-md opacity-25 group-hover:opacity-40 transition duration-1000"></div>
        
//         <form
//           onSubmit={handleSubmit}
//           className="relative bg-white/90 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl p-8"
//         >
//           <div className="mb-6">
//             <h2 className="text-2xl font-extrabold bg-linear-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
//               Apply for Position
//             </h2>
//             <p className="text-sm font-semibold text-[#00c389] mt-1">{job.companyName}</p>
//           </div>

//           <div className="space-y-5">
//             {/* Full Name */}
//             <div className="relative">
//               <label className="text-xs font-bold uppercase text-gray-500 ml-1 mb-1 block">Full Name</label>
//               <div className="relative">
//                 <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//                 <input
//                   name="fullName"
//                   required
//                   placeholder="John Doe"
//                   className="w-full pl-10 pr-4 py-3 bg-gray-50/50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#86e062] focus:border-transparent outline-none transition-all placeholder:text-gray-300"
//                 />
//               </div>
//             </div>

//             {/* Email */}
//             <div className="relative">
//               <label className="text-xs font-bold uppercase text-gray-500 ml-1 mb-1 block">Email Address</label>
//               <div className="relative">
//                 <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//                 <input
//                   name="email"
//                   type="email"
//                   required
//                   placeholder="john@example.com"
//                   className="w-full pl-10 pr-4 py-3 bg-gray-50/50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#86e062] focus:border-transparent outline-none transition-all placeholder:text-gray-300"
//                 />
//               </div>
//             </div>

//             {/* Phone */}
//             <div className="relative">
//               <label className="text-xs font-bold uppercase text-gray-500 ml-1 mb-1 block">Phone Number</label>
//               <div className="relative">
//                 <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//                 <input
//                   name="phone"
//                   required
//                   placeholder="+1 234 567 890"
//                   className="w-full pl-10 pr-4 py-3 bg-gray-50/50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#86e062] focus:border-transparent outline-none transition-all placeholder:text-gray-300"
//                 />
//               </div>
//             </div>

//             {/* Resume Upload */}
//             <div className="relative">
//               <label className="text-xs font-bold uppercase text-gray-500 ml-1 mb-1 block">Your Resume</label>
//               <div className="flex items-center justify-center w-full">
//                 <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer bg-gray-50/50 hover:bg-[#86e062]/5 hover:border-[#86e062] transition-all">
//                   <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                     <FiFileText className="text-2xl text-gray-400 mb-1" />
//                     <p className="text-xs text-gray-400">PDF, DOCX up to 10MB</p>
//                   </div>
//                   <input name="resume" type="file" required className="hidden" />
//                 </label>
//               </div>
//             </div>
//           </div>

//           <div className="mt-8 flex items-center gap-4">
//             {!isInline && (
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-gray-600 font-bold hover:bg-gray-50 transition-all"
//               >
//                 Back
//               </button>
//             )}
//             <motion.button
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               disabled={loading}
//               className="flex-2 relative flex items-center justify-center gap-2 px-6 py-3 bg-linear-to-r from-[#86e062] to-[#00c389] text-white font-bold rounded-xl shadow-lg shadow-green-200 hover:shadow-green-300 transition-all disabled:opacity-70"
//             >
//               {loading ? (
//                 <span className="flex items-center gap-2">
//                   <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   Processing...
//                 </span>
//               ) : (
//                 <>
//                   Submit Application <FiSend />
//                 </>
//               )}
//             </motion.button>
//           </div>
//         </form>
//       </motion.div>
//     </div>
//   );
// }