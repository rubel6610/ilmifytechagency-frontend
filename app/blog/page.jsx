import Image from "next/image";
import React from "react";

const Blog = () => {
  const blogs = [
    {
      title: "Marketing Ideas",
      date: "May 24, 2018",
      author: "tufael4736@gmail.com",
      image:
        "/serious-businesswoman-with-documents-talking-on-P9Q6LX6-768x576.png",
    },
    {
      title: "Rest During Working Hours",
      date: "June 10, 2018",
      author: "tufael4736@gmail.com",
      image: "/Businessman-at-the-desk-in-his-office-resting-768x576.png",
    },
    {
      title: "Develop Your Startup Idea ",
      date: "July 02, 2018",
      author: "tufael4736@gmail.com",
      image: "/simple-home-office-with-tree-PBXRXYB-large-768x576.png",
    },
    {
      title: "Travel and Work During Spring",
      date: "August 15, 2018",
      author: "tufael4736@gmail.com",
      image: "/rainbow-mountain-PUWHUHP-768x576.png",
    },
    {
      title: "Plan Your Business ",
      date: "September 01, 2018",
      author: "tufael4736@gmail.com",
      image: "/business-PG3SVDZ-768x576.png",
    },
    {
      title: "Diversity in the Workplace ",
      date: "October 20, 2018",
      author: "tufael4736@gmail.com",
      image:
        "/diversity-young-teens-people-friends-concept-PTZ4RGN-768x576.png",
    },
    {
      title: "Women in Business ",
      date: "November 11, 2018",
      author: "tufael4736@gmail.com",
      image: "/person-with-long-curly-hair-PZ99QM2@2x-768x576.png",
    },
    {
      title: "Hardest Things in Programming ",
      date: "December 05, 2018",
      author: "tufael4736@gmail.com",
      image:
        "/woman-freelancer-female-hands-with-pen-writing-on-P369BAX1-768x576.png",
    },
  ];
  return (
    <div>
      {/* HEADER */}
      <h1 className="text-center font-bold bg-[#F9F9F9] text-[43px] text-[#00D9A6] py-12">
        Blog
      </h1>

      {/* BLOG GRID */}
      <div className="bg-background py-16">
        <div className="max-w-400 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {blogs.map((blog, index) => (
              <div key={index} className="relative my-20 group rounded-2xl">
                {/* IMAGE */}
                <Image
                  src={blog.image}
                  alt="Business woman"
                  width={600}
                  height={600}
                  className="rounded-md shadow-2xl  w-full h-auto
      transition-transform duration-700
      ease-[cubic-bezier(0.16,1,0.3,1)]
      scale-100
      group-hover:scale-102
"
                />

                {/* CARD */}
                <div
                  className="absolute left-6 right-6 -bottom-10 bg-white p-6 rounded-md shadow-xl transition-all duration-700 ease-out
                  group-hover:translate-y-5
                  group-hover:bg-linear-to-tr
                  group-hover:from-[#0ddaa0]
                  group-hover:to-[#8ce064]"
                >
                  <p className="text-sm ml-6 text-gray-500  transition-colors duration-300
                         group-hover:text-white">
                    {blog.date} by {blog.author}
                  </p>
                  <h2 className="flex items-center gap-3 text-xl font-semibold mt-2 transition-colors duration-300
                         group-hover:text-white">
                    {/* DISC */}
                    <span
                      className="
                         w-3 h-3 rounded-full bg-[#00D9A6]
                         transition-colors duration-700
                         group-hover:bg-white"
                    />
                    {blog.title}
                  </h2>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
