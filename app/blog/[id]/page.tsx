"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useGetBlogByIdQuery } from "@/redux/service/blogApi";
import BlogNotFound from "../components/BlogNotFound";
import { CgSpinner } from "react-icons/cg";

const BlogPage = () => {
  const { id } = useParams();
  const { user } = useSelector((state: RootState) => state.auth);
  const role = user?.role;

  // Fetch blog detail from API
  const { data: blogResponse, isLoading, isError } = useGetBlogByIdQuery(id as string);
  const blog = blogResponse?.data;

  // Like functionality states (Local only for now as per previous logic)
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (blog) {
      // Initialize likes from localStorage if available, else use a base value
      const storedLikes = JSON.parse(localStorage.getItem("blogLikes") || "{}");
      const likedBlogs = JSON.parse(localStorage.getItem("likedBlogs") || "{}");
      
      setLikeCount(storedLikes[blog.id] || 0);
      setIsLiked(likedBlogs[blog.id] || false);
    }
  }, [blog]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleLike = () => {
    if (!blog) return;

    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);

    const likedBlogs = JSON.parse(localStorage.getItem("likedBlogs") || "{}");
    const storedLikes = JSON.parse(localStorage.getItem("blogLikes") || "{}");

    let newCount;
    if (isLiked) {
      newCount = Math.max(0, likeCount - 1);
      setIsLiked(false);
      delete likedBlogs[blog.id];
    } else {
      newCount = likeCount + 1;
      setIsLiked(true);
      likedBlogs[blog.id] = true;
    }

    setLikeCount(newCount);
    storedLikes[blog.id] = newCount;

    localStorage.setItem("likedBlogs", JSON.stringify(likedBlogs));
    localStorage.setItem("blogLikes", JSON.stringify(storedLikes));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <CgSpinner className="animate-spin text-6xl text-emerald-500" />
          <p className="text-gray-500 font-medium animate-pulse">Loading article...</p>
        </div>
      </div>
    );
  }

  if (isError || !blog) {
    return (
      <div className="text-center">
        <BlogNotFound />
      </div>
    );
  }

  return (
    <>
      <div className="my-10 md:my-20 bg-background mx-auto w-full max-w-360 px-4 sm:px-6 lg:px-8 overflow-hidden mt-30 md:mt-40">
        {/* HERO IMAGE */}
        <div className="relative w-full overflow-hidden rounded-2xl shadow-2xl">
          <Image
            src={blog.images?.[0] || "/placeholder-blog.png"}
            alt={blog.title}
            width={1400}
            height={500}
            className="w-full lg:h-150 object-cover"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent pointer-events-none" />
        </div>

        {/* HEADER CONTENT */}
        <div className="text-center mt-12 md:mt-16 w-full max-w-300 mx-auto px-2">
          <h1 className="text-primary text-[26px] sm:text-[32px] md:text-[45px] font-quicksand font-bold leading-tight wrap-break-word">
            {blog.title}
          </h1>

          {/* META DATA */}
          <div className="flex flex-col sm:flex-row flex-wrap justify-center font-ubuntu mt-6 mb-12 md:mb-20 text-[11px] sm:text-xs md:text-sm font-bold uppercase tracking-widest gap-x-4 gap-y-2 w-full text-emerald-600">
            <div className="flex items-center gap-2">
              <span className="opacity-50 text-gray-400 font-normal italic">Published on</span>
              <span>{blog.createdAt ? new Date(blog.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }) : 'Recently'}</span>
            </div>
            <span className="opacity-30 hidden sm:inline text-gray-300">|</span>
            <div className="flex items-center gap-2">
              <span className="opacity-50 text-gray-400 font-normal italic">By</span>
              <span className="text-gray-800">{blog.admin?.name || "Professional"}</span>
            </div>
          </div>

          {/* SUBTITLE */}
          <div className="mb-10 text-center max-w-2xl mx-auto">
             <p className="text-lg md:text-xl text-gray-500 font-medium italic leading-relaxed border-l-4 border-emerald-500 pl-6 py-2">
               "{blog.subTitle}"
             </p>
          </div>

          {/* MAIN BODY TEXT */}
          <div className="text-left w-full max-w-300 mx-auto text-gray-700 leading-relaxed space-y-8 text-base sm:text-lg md:text-xl overflow-hidden font-ubuntu font-light">
             <div className="whitespace-pre-line wrap-break-word overflow-wrap-anywhere">
               {blog.des || "The content for this article is being polished and will be available shortly."}
             </div>
          </div>
        </div>

        {/* ENGAGEMENT BAR */}
        <div className="w-full max-w-300 mx-auto my-16 md:my-24 px-3 md:px-5">
          <div className="bg-white border border-gray-100 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                {role ? (
                  <>
                    <div className="relative">
                      <Image
                        src="/diversity-young-teens-people-friends-concept-PTZ4RGN-768x576.png"
                        alt="User"
                        width={64}
                        height={64}
                        className="h-12 w-12 md:h-14 md:w-14 object-cover rounded-full ring-4 ring-emerald-50"
                      />
                      <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></span>
                    </div>
                    <div className="flex flex-col">
                      <h3 className="font-bold text-gray-800 text-sm md:text-base">
                        {role}
                      </h3>
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Active Reader</span>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                      <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-500 font-bold">Guest Navigator</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3 md:gap-4">
                <div className={`px-4 py-2 rounded-2xl text-xs md:text-sm font-bold transition-all duration-300 ${isLiked ? "bg-emerald-500 text-white shadow-lg shadow-emerald-200" : "bg-gray-50 text-gray-400"}`}>
                  <span className="tabular-nums">{likeCount.toLocaleString()}</span>
                  <span className="ml-1 hidden sm:inline">{likeCount === 1 ? "like" : "likes"}</span>
                </div>

                <button
                  onClick={handleLike}
                  className={`relative p-3.5 rounded-2xl transition-all duration-300 cursor-pointer ${isAnimating ? "scale-125" : "hover:scale-110 active:scale-95"} ${isLiked ? "bg-emerald-500 text-white shadow-xl shadow-emerald-500/30" : "bg-gray-100 text-gray-400 hover:bg-emerald-50 hover:text-emerald-500"}`}
                >
                  {isLiked ? <FaHeart className="w-5 h-5" /> : <FaRegHeart className="w-5 h-5" />}
                  {isAnimating && <span className="absolute inset-0 rounded-2xl bg-emerald-400 animate-ping opacity-30"></span>}
                </button>
              </div>
            </div>

            <div className="h-px bg-linear-to-r from-transparent via-gray-100 to-transparent my-6"></div>

            <form onSubmit={handleSubmit} className="relative">
              <div className="flex items-center gap-3">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Contribute your perspective..."
                    className="w-full py-4 pl-6 pr-14 text-sm md:text-base text-gray-700 bg-gray-50 border border-transparent rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:bg-white focus:border-emerald-300 transition-all duration-300"
                  />
                  <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-500 transition-colors p-1">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                </div>

                <button
                  type="submit"
                  className="group relative px-6 md:px-10 py-4 bg-emerald-500 hover:bg-emerald-600 text-white text-sm md:text-base font-bold rounded-2xl shadow-lg shadow-emerald-200 transition-all active:scale-95 flex items-center gap-2"
                >
                  <span className="hidden sm:inline">Publish</span>
                  <svg className="w-5 h-5 rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </form>
          </div>

          <div className="flex items-center justify-center gap-8 mt-8 text-xs md:text-sm text-gray-400 font-bold uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span>{blog.views || 0} Readers</span>
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-gray-200"></div>
            <div className="flex items-center gap-2 text-lime-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span>{likeCount > 5 ? Math.floor(likeCount * 0.3) : 0} Discussions</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPage;
