"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

/* Fade up animation */
const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const Blog = () => {
  const blogs = [
    {
      id: 1,
      title: "Marketing Ideas",
      date: "May 24, 2018",
      author: "tufael4736@gmail.com",
      image: "/serious-businesswoman-with-documents-talking-on-P9Q6LX6-768x576.png",
    },
    {
      id: 2,
      title: "Rest During Working Hours",
      date: "June 10, 2018",
      author: "tufael4736@gmail.com",
      image: "/Businessman-at-the-desk-in-his-office-resting-768x576.png",
    },
    {
      id: 3,
      title: "Develop Your Startup Idea",
      date: "July 02, 2018",
      author: "tufael4736@gmail.com",
      image: "/simple-home-office-with-tree-PBXRXYB-large-768x576.png",
    },
    {
      id: 4,
      title: "Travel and Work During Spring",
      date: "August 15, 2018",
      author: "tufael4736@gmail.com",
      image: "/rainbow-mountain-PUWHUHP-768x576.png",
    },
    {
      id: 5,
      title: "Plan Your Business",
      date: "September 01, 2018",
      author: "tufael4736@gmail.com",
      image: "/business-PG3SVDZ-768x576.png",
    },
    {
      id: 6,
      title: "Diversity in the Workplace",
      date: "October 20, 2018",
      author: "tufael4736@gmail.com",
      image: "/diversity-young-teens-people-friends-concept-PTZ4RGN-768x576.png",
    },
    {
      id: 7,
      title: "Women in Business",
      date: "November 11, 2018",
      author: "tufael4736@gmail.com",
      image: "/person-with-long-curly-hair-PZ99QM2@2x-768x576.png",
    },
    {
      id: 8,
      title: "Hardest Things in Programming",
      date: "December 05, 2018",
      author: "tufael4736@gmail.com",
      image: "/woman-freelancer-female-hands-with-pen-writing-on-P369BAX1-768x576.png",
    },
  ];

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {/* HEADER */}
      <h1 className="text-center font-bold bg-[#F9F9F9] text-[32px] sm:text-[43px] text-[#00D9A6] py-10">
        Blog
      </h1>

      {/* BLOG GRID */}
      <div className="bg-background py-16">
        <div className="max-w-345 mx-auto px-4 md:px-10 lg:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {blogs.map((blog, index) => (
            <Link key={index} href={`/blog/${blog.id}`}>
                            <motion.div
                key={index}
                variants={fadeUp}
                // whileTap causes the "active" state to trigger on mobile touch
                whileTap={{ scale: 0.98 }}
                className="relative group my-10 cursor-pointer"
              >
                {/* IMAGE */}
                <div className="relative w-full aspect-4/3 overflow-hidden rounded-lg shadow-2xl">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 50vw"
                    className="
                      object-cover
                      transition-transform duration-700
                      ease-[cubic-bezier(0.16,1,0.3,1)]
                      group-hover:scale-105
                      group-active:scale-105
                    "
                  />
                </div>

                {/* CARD */}
                <div
                  className="
                    absolute left-4 right-4 md:left-8 md:right-8
                    -bottom-12
                    bg-white
                    px-8 py-9 md:px-11 md:py-11.75
                    rounded-md
                    shadow-xl
                    transition-all duration-700 ease-out
                    
                    /* Desktop Hover & Mobile Tap Effects */
                    group-hover:translate-y-6
                    group-active:translate-y-6
                    
                    group-hover:bg-gradient-to-tr
                    group-active:bg-gradient-to-tr
                    
                    group-hover:from-[#0ddaa0]
                    group-hover:to-[#8ce064]
                    group-active:from-[#0ddaa0]
                    group-active:to-[#8ce064]
                  "
                >
                  <div className=" md:flex lg:flex ml-6 ">
                                      <p className="text-xs  md:text-sm text-gray-500 group-hover:text-white">
                    {blog.date} ● by 
                  </p>
                       <p className="text-xs lg:ml-2 md:text-sm text-gray-500 group-hover:text-white">
                    {blog.author}
                  </p>
                  </div>

                  <h2 className="flex items-center gap-3 text-lg md:text-xl font-semibold mt-3 group-hover:text-white">
                    <span className="w-3 h-3 rounded-full bg-[#00D9A6] group-hover:bg-white" />
                    {blog.title}
                  </h2>
                </div>
              </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Blog;




// "use client";

// import Image from "next/image";
// import React from "react";
// import { motion } from "framer-motion";

// /* Fade up animation */
// const fadeUp = {
//   hidden: { opacity: 0, y: 60 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.7, ease: "easeOut" },
//   },
// };

// const Blog = () => {
//  const blogs = [
//     {
//       title: "Marketing Ideas",
//       date: "May 24, 2018",
//       author: "tufael4736@gmail.com",
//       image:
//         "/serious-businesswoman-with-documents-talking-on-P9Q6LX6-768x576.png",
//     },
//     {
//       title: "Rest During Working Hours",
//       date: "June 10, 2018",
//       author: "tufael4736@gmail.com",
//       image: "/Businessman-at-the-desk-in-his-office-resting-768x576.png",
//     },
//     {
//       title: "Develop Your Startup Idea",
//       date: "July 02, 2018",
//       author: "tufael4736@gmail.com",
//       image: "/simple-home-office-with-tree-PBXRXYB-large-768x576.png",
//     },
//     {
//       title: "Travel and Work During Spring",
//       date: "August 15, 2018",
//       author: "tufael4736@gmail.com",
//       image: "/rainbow-mountain-PUWHUHP-768x576.png",
//     },
//     {
//       title: "Plan Your Business",
//       date: "September 01, 2018",
//       author: "tufael4736@gmail.com",
//       image: "/business-PG3SVDZ-768x576.png",
//     },
//     {
//       title: "Diversity in the Workplace",
//       date: "October 20, 2018",
//       author: "tufael4736@gmail.com",
//       image:
//         "/diversity-young-teens-people-friends-concept-PTZ4RGN-768x576.png",
//     },
//     {
//       title: "Women in Business",
//       date: "November 11, 2018",
//       author: "tufael4736@gmail.com",
//       image: "/person-with-long-curly-hair-PZ99QM2@2x-768x576.png",
//     },
//     {
//       title: "Hardest Things in Programming",
//       date: "December 05, 2018",
//       author: "tufael4736@gmail.com",
//       image:
//         "/woman-freelancer-female-hands-with-pen-writing-on-P369BAX1-768x576.png",
//     },
//   ];

//   return (
//     <motion.section
//        variants={fadeUp}
//   initial="hidden"
//   animate="visible"
//     >
//       {/* HEADER */}
//       <h1 className="text-center font-bold bg-[#F9F9F9] text-[32px] sm:text-[43px] text-[#00D9A6] py-10">
//         Blog
//       </h1>

//       {/* BLOG GRID */}
//       <div className="bg-background py-16">
//         <div className="max-w-345 mx-auto px-4 md:px-10 lg:px-6">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
//             {blogs.map((blog, index) => (
//               <motion.div
//                 key={index}
//                 variants={fadeUp}
//                 className="relative group my-10"
//               >
//                 {/* IMAGE */}
//                 <div className="relative w-full aspect-4/3 overflow-hidden rounded-lg shadow-2xl">
//                   <Image
//                     src={blog.image}
//                     alt={blog.title}
//                     fill
//                     sizes="(max-width: 768px) 100vw,
//                            (max-width: 1024px) 90vw,
//                            50vw"
//                     className="
//                       object-cover
//                       transition-transform duration-700
//                       ease-[cubic-bezier(0.16,1,0.3,1)]
//                       group-hover:scale-105
//                       active:scale-105
//                     "
//                   />
//                 </div>

//                 {/* CARD */}
//                 <div
//                   className="
    //                     absolute left-4 right-4 md:left-8 md:right-8
    // -bottom-12
    // bg-white
    // px-8 py-9 md:px-11 md:py-11.75
    // rounded-md
    // shadow-xl
//     transition-all duration-700 ease-out
//     group-hover:translate-y-6
//     active:translate-y-6
//     group-hover:bg-linear-to-tr
//     group-hover:from-[#0ddaa0]
//     group-hover:to-[#8ce064]
//                   "
//                 >
                //   <div className=" md:flex lg:flex ml-6 ">
                //                       <p className="text-xs  md:text-sm text-gray-500 group-hover:text-white">
                //     {blog.date} ● by 
                //   </p>
                //        <p className="text-xs lg:ml-2 md:text-sm text-gray-500 group-hover:text-white">
                //     {blog.author}
                //   </p>
                //   </div>

                //   <h2 className="flex items-center gap-3 text-lg md:text-xl font-semibold mt-3 group-hover:text-white">
                //     <span className="w-3 h-3 rounded-full bg-[#00D9A6] group-hover:bg-white" />
                //     {blog.title}
                //   </h2>
                // </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </motion.section>
//   );
// };

// export default Blog;




// import Image from "next/image";
// import React from "react";

// const Blog = () => {
//   const blogs = [
//     {
//       title: "Marketing Ideas",
//       date: "May 24, 2018",
//       author: "tufael4736@gmail.com",
//       image:
//         "/serious-businesswoman-with-documents-talking-on-P9Q6LX6-768x576.png",
//     },
//     {
//       title: "Rest During Working Hours",
//       date: "June 10, 2018",
//       author: "tufael4736@gmail.com",
//       image: "/Businessman-at-the-desk-in-his-office-resting-768x576.png",
//     },
//     {
//       title: "Develop Your Startup Idea ",
//       date: "July 02, 2018",
//       author: "tufael4736@gmail.com",
//       image: "/simple-home-office-with-tree-PBXRXYB-large-768x576.png",
//     },
//     {
//       title: "Travel and Work During Spring",
//       date: "August 15, 2018",
//       author: "tufael4736@gmail.com",
//       image: "/rainbow-mountain-PUWHUHP-768x576.png",
//     },
//     {
//       title: "Plan Your Business ",
//       date: "September 01, 2018",
//       author: "tufael4736@gmail.com",
//       image: "/business-PG3SVDZ-768x576.png",
//     },
//     {
//       title: "Diversity in the Workplace ",
//       date: "October 20, 2018",
//       author: "tufael4736@gmail.com",
//       image:
//         "/diversity-young-teens-people-friends-concept-PTZ4RGN-768x576.png",
//     },
//     {
//       title: "Women in Business ",
//       date: "November 11, 2018",
//       author: "tufael4736@gmail.com",
//       image: "/person-with-long-curly-hair-PZ99QM2@2x-768x576.png",
//     },
//     {
//       title: "Hardest Things in Programming ",
//       date: "December 05, 2018",
//       author: "tufael4736@gmail.com",
//       image:
//         "/woman-freelancer-female-hands-with-pen-writing-on-P369BAX1-768x576.png",
//     },
//   ];
//   return (
//     <div>
//       {/* HEADER */}
//       <h1 className="text-center font-bold bg-[#F9F9F9] text-[43px] text-[#00D9A6] py-12">
//         Blog
//       </h1>

//       {/* BLOG GRID */}
//       <div className="bg-background py-16 w-345 mx-auto">
//         <div className="max-w-400 mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//             {blogs.map((blog, index) => (
//               <div key={index} className="relative my-20 group rounded-2xl">
//                 {/* IMAGE */}
//                 <Image
//                   src={blog.image}
//                   alt="Business woman"
//                   width={675}
//                   height={506}
//                   className="rounded-md shadow-2xl  w-78.5 h-62.75 md:w-136.5 md:h-102.25 lg:w-full lg:h-auto
//       transition-transform duration-700
//       ease-[cubic-bezier(0.16,1,0.3,1)]
//       scale-100
//       group-hover:scale-102
// "
//                 />

//                 {/* CARD */}
//                 <div
//                   className="absolute left-6 right-6 -bottom-10 bg-white  p-6 lg:p-8 lg:py-11 rounded-md shadow-xl transition-all duration-700 ease-out
//                   group-hover:translate-y-5
//                   group-hover:bg-linear-to-tr
//                   group-hover:from-[#0ddaa0]
//                   group-hover:to-[#8ce064]"
//                 >
//                   <p className="text-sm ml-6 text-gray-500  transition-colors duration-300
//                          group-hover:text-white">
//                     {blog.date} by {blog.author}
//                   </p>
//                   <h2 className="flex items-center gap-3 text-xl font-semibold mt-2 transition-colors duration-300
//                          group-hover:text-white">
//                     {/* DISC */}
//                     <span
//                       className="
//                          w-3 h-3 rounded-full bg-[#00D9A6]
//                          transition-colors duration-700
//                          group-hover:bg-white"
//                     />
//                     {blog.title}
//                   </h2>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Blog;


// import Image from "next/image";
// import React from "react";

// const Blog = () => {
//   const blogs = [
//     {
//       title: "Marketing Ideas",
//       date: "May 24, 2018",
//       author: "tufael4736@gmail.com",
//       image:
//         "/serious-businesswoman-with-documents-talking-on-P9Q6LX6-768x576.png",
//     },
//     {
//       title: "Rest During Working Hours",
//       date: "June 10, 2018",
//       author: "tufael4736@gmail.com",
//       image: "/Businessman-at-the-desk-in-his-office-resting-768x576.png",
//     },
//     {
//       title: "Develop Your Startup Idea",
//       date: "July 02, 2018",
//       author: "tufael4736@gmail.com",
//       image: "/simple-home-office-with-tree-PBXRXYB-large-768x576.png",
//     },
//     {
//       title: "Travel and Work During Spring",
//       date: "August 15, 2018",
//       author: "tufael4736@gmail.com",
//       image: "/rainbow-mountain-PUWHUHP-768x576.png",
//     },
//     {
//       title: "Plan Your Business",
//       date: "September 01, 2018",
//       author: "tufael4736@gmail.com",
//       image: "/business-PG3SVDZ-768x576.png",
//     },
//     {
//       title: "Diversity in the Workplace",
//       date: "October 20, 2018",
//       author: "tufael4736@gmail.com",
//       image:
//         "/diversity-young-teens-people-friends-concept-PTZ4RGN-768x576.png",
//     },
//     {
//       title: "Women in Business",
//       date: "November 11, 2018",
//       author: "tufael4736@gmail.com",
//       image: "/person-with-long-curly-hair-PZ99QM2@2x-768x576.png",
//     },
//     {
//       title: "Hardest Things in Programming",
//       date: "December 05, 2018",
//       author: "tufael4736@gmail.com",
//       image:
//         "/woman-freelancer-female-hands-with-pen-writing-on-P369BAX1-768x576.png",
//     },
//   ];

//   return (
//     <div>
//       {/* HEADER */}
//       <h1 className="text-center font-bold bg-[#F9F9F9] text-[32px] sm:text-[43px] text-[#00D9A6] py-10">
//         Blog
//       </h1>

//       {/* BLOG GRID */}
//       <div className="bg-background py-16">
//         <div className="max-w-345 mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12  my-6">
//             {blogs.map((blog, index) => (
//               <div
//                 key={index}
//                 className="relative group rounded-2xl overflow-visible my-10"
//               >
//                 {/* IMAGE */}
//                 <div className="relative w-full aspect-4/3 rounded-lg overflow-hidden shadow-2xl ">
//                 <Image
//                   src={blog.image}
//                   alt="Business woman"
//                   width={675}
//                   height={506}
//                   className="rounded-md shadow-2xl  w-78.5 h-62.75 md:w-136.5 md:h-101.75 lg:w-full lg:h-auto
//       transition-transform duration-700
//       ease-[cubic-bezier(0.16,1,0.3,1)]
//       scale-100
//       group-hover:scale-102
// "
//                 />
//                 </div>

//                 {/* CARD */}
//                 <div
//                   className="
//                     absolute left-4 right-4 sm:left-6 sm:right-6
//                     -bottom-10
//                     bg-white
//                     p-6 sm:p-8
//                     rounded-md
//                     shadow-xl
//                     transition-all duration-700 ease-out
//                     group-hover:translate-y-5
//                     group-hover:bg-linear-to-tr
//                     group-hover:from-[#0ddaa0]
//                     group-hover:to-[#8ce064]
//                   "
//                 >
//          <div className="ml-2 md:ml-0">
//                             <p className="text-xs sm:text-sm ml-4 sm:ml-6 text-gray-500 transition-colors duration-300 group-hover:text-white">
//                     {blog.date} by 
//                   </p>
//                   <p className="text-xs sm:text-sm ml-4 sm:ml-6 text-gray-500 transition-colors duration-300 group-hover:text-white">{blog.author}</p>
//          </div>

//                   <h2 className="flex items-center gap-3 text-lg sm:text-xl font-semibold mt-2 transition-colors duration-300 group-hover:text-white">
//                     <span
//                       className="
//                         w-3 h-3 rounded-full bg-[#00D9A6]
//                         transition-colors duration-700
//                         group-hover:bg-white
//                       "
//                     />
//                     {blog.title}
//                   </h2>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Blog;