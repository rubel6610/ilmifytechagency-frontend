"use client";

import React, { useState,  } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { FaRegHeart, FaHeart,  } from "react-icons/fa";

import BlogNotFound from "../components/BlogNotFound";
import { blogsData } from "../components/blogsData";
import { role } from "../../dashboard/page";

const BlogPage = () => {
  const { id } = useParams();
  const blogs = blogsData.find((blog) => blog.id == id);

  // Like functionality states
  const [likeCount, setLikeCount] = useState(blogs ? blogs.like_count : 0);

  const [isLiked, setIsLiked] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // Handle like button click
  const handleLike = () => {
    if (!blogs) return;

    // Trigger animation
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);

    const likedBlogs = JSON.parse(localStorage.getItem("likedBlogs") || "{}");
    const storedLikes = JSON.parse(localStorage.getItem("blogLikes") || "{}");

    let newCount;

    if (isLiked) {
      // Unlike
      newCount = likeCount - 1;
      setIsLiked(false);
      delete likedBlogs[blogs.id];
    } else {
      // Like
      newCount = likeCount + 1;
      setIsLiked(true);
      likedBlogs[blogs.id] = true;
    }

    setLikeCount(newCount);
    storedLikes[blogs.id] = newCount;

    localStorage.setItem("likedBlogs", JSON.stringify(likedBlogs));
    localStorage.setItem("blogLikes", JSON.stringify(storedLikes));
  };

  if (!blogs) {
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
        <div className="relative w-full overflow-hidden rounded-xl">
          <Image
            src={blogs.image}
            alt={blogs.title}
            width={1400}
            height={500}
            className="w-full lg:h-150 object-cover"
            priority
          />
        </div>

        {/* HEADER CONTENT */}
        <div className="text-center mt-8 md:mt-12 w-full max-w-300 mx-auto px-2">
          <h1 className="text-primary text-[22px] sm:text-[28px] md:text-[37px] font-quicksand font-semibold leading-tight wrap-break-word hyphens-auto">
            {blogs.title}
          </h1>

          {/* META DATA */}
          <div className="flex flex-col sm:flex-row flex-wrap justify-center font-ubuntu mt-4 mb-10 md:mb-16 text-[10px] sm:text-xs md:text-sm font-extralight uppercase tracking-wide opacity-80 gap-x-2 gap-y-1 w-full">
            <div className="flex flex-wrap justify-center gap-x-2">
              <span>{blogs.date}</span>
              <span className="opacity-40 hidden sm:inline">|</span>
              <span>BY {blogs.author}</span>
            </div>
            <div className="flex flex-wrap justify-center gap-x-2">
              <span className="opacity-40 hidden sm:inline">|</span>
              <span>{blogs.bussiness}</span>
              <span className="opacity-40 hidden sm:inline">|</span>
              <span>{blogs.category}</span>
            </div>
          </div>

          {/* MAIN BODY TEXT */}
          <div className="text-left w-full max-w-300 mx-auto text-gray-700 leading-relaxed space-y-6 text-sm sm:text-base md:text-lg overflow-hidden font-ubuntu font-light">
            <p className="whitespace-pre-line wrap-break-word overflow-wrap-anywhere">
              When, while the lovely valley teems with vapor around me, and the
              meridian sun strikes the upper surface of the impenetrable foliage
              of my trees, and but a few stray gleams steal into the inner
              sanctuary, I throw myself down among the tall grass by the
              trickling stream; and, as I lie close to the earth, a thousand
              unknown plants are noticed by me: when I hear the buzz of the
              little world among the stalks, and grow familiar with the
              countless indescribable forms of the insects and flies, then I
              feel the presence of the Almighty, who formed us in his own image,
              and the breath of that universal love which bears and sustains us,
              as it floats around us in an eternity of bliss; and then, my
              friend, when darkness overspreads my eyes, and heaven and earth
              seem to dwell in my soul and absorb its power, like the form of a
              beloved mistress, then I often think with longing, Oh, would I
              could describe these conceptions, could impress upon paper all
              that is living so full and warm within me, that it might be the
              mirror of my soul, as my soul is the mirror of the infinite God!
            </p>
            <p className="whitespace-pre-line wrap-break-word overflow-wrap-anywhere">
              O my friend — but it is too much for my strength — I sink under
              the weight of the splendor of these visions! A wonderful serenity
              has taken possession of my entire soul, like these sweet mornings
              of spring which I enjoy with my whole heart. I am alone, and feel
              the charm of existence in this spot, which was created for the
              bliss of souls like mine.
            </p>
            <p className="whitespace-pre-line wrap-break-word overflow-wrap-anywhere">
              I am so happy, my dear friend, so absorbed in the exquisite sense
              of mere tranquil existence, that I neglect my talents. I should be
              incapable of drawing a single stroke at the present moment; and
              yet I feel that I never was a greater artist than now.
            </p>
            <p className="whitespace-pre-line wrap-break-word overflow-wrap-anywhere">
              When, while the lovely valley teems with vapor around me, and the
              meridian sun strikes the upper surface of the impenetrable foliage
              of my trees, and but a few stray gleams steal into the inner
              sanctuary, I throw myself down among the tall grass by the
              trickling stream; and, as I lie close to the earth, a thousand
              unknown plants are noticed by me: when I hear the buzz of the
              little world among the stalks, and grow familiar with the
              countless indescribable forms of the insects and flies, then I
              feel the presence of the Almighty, who formed us in his own image,
              and the breath of that universal love which bears and sustains us,
              as it floats around us in an eternity of bliss; and then, my
              friend, when darkness overspreads my eyes, and heaven and earth
              seem to dwell in my soul and absorb its power, like the form of a
              beloved mistress, then I often think with longing, Oh, would I
              could describe these conceptions, could impress upon paper all
              that is living so full and warm within me.
            </p>
          </div>
        </div>

        {/* TAGS & SHARE BAR - With Like Functionality */}
        {/* ENGAGEMENT BAR - User, Comment & Like */}
        <div className="w-full max-w-300 mx-auto my-12 md:my-16 px-3 md:px-5">
          {/* Main Card Container */}
          <div className="bg-white/80 backdrop-blur-sm border border-gray-100 rounded-2xl md:rounded-3xl shadow-sm hover:shadow-md transition-shadow duration-300 p-4 md:p-6">
            {/* Top Row - User Info & Like */}
            <div className="flex items-center justify-between mb-4">
              {/* User Info */}
              <div className="flex items-center gap-3">
                {role ? (
                  <>
                    <div className="relative">
                      <Image
                        src="/diversity-young-teens-people-friends-concept-PTZ4RGN-768x576.png"
                        alt="User Image"
                        width={56}
                        height={56}
                        className="h-10 w-10 md:h-12 md:w-12 object-cover rounded-full ring-2 ring-emerald-400 ring-offset-2"
                      />
                      {/* Online Indicator */}
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
                    </div>
                    <div className="flex flex-col">
                      <h3 className="font-semibold text-gray-800 text-sm md:text-base">
                        {role}
                      </h3>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center gap-3">
                    <Image
                      src="/office.png"
                      alt="User Avatar"
                      width={48}
                      height={48}
                      className="h-10 w-10 md:h-12 md:w-12 object-cover rounded-full ring-2 ring-gray-200 ring-offset-2"
                    />
                    <span className="text-sm text-gray-500">Guest User</span>
                  </div>
                )}
              </div>

              {/* Like Section */}
              <div className="flex items-center gap-2 md:gap-3">
                {/* Like Count */}
                <div
                  className={`
                    px-3 py-1.5 rounded-full text-xs md:text-sm font-medium transition-all duration-300
                    ${
                      isLiked
                        ? "bg-linear-to-r from-emerald-50 to-lime-50 text-emerald-600"
                        : "bg-gray-50 text-gray-500"
                    }
                `}
                >
                  <span className="tabular-nums">
                    {likeCount.toLocaleString()}
                  </span>
                  <span className="ml-1 hidden sm:inline">
                    {likeCount === 1 ? "like" : "likes"}
                  </span>
                </div>

                {/* Like Button */}
                <button
                  onClick={handleLike}
                  aria-label={isLiked ? "Unlike" : "Like"}
                  className={`
                        relative p-2.5 md:p-3 rounded-full transition-all duration-300 cursor-pointer
                        ${
                          isAnimating
                            ? "scale-125"
                            : "hover:scale-110 active:scale-95"
                        }
                        ${
                          isLiked
                            ? "bg-linear-to-r from-emerald-500 to-lime-500 text-white shadow-lg shadow-emerald-500/30"
                            : "bg-gray-100 text-gray-400 hover:bg-emerald-50 hover:text-emerald-500"
                        }
                    `}
                >
                  {isLiked ? (
                    <FaHeart className="w-4 h-4 md:w-5 md:h-5" />
                  ) : (
                    <FaRegHeart className="w-4 h-4 md:w-5 md:h-5" />
                  )}

                  {/* Ripple Effect on Like */}
                  {isAnimating && (
                    <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-30"></span>
                  )}
                </button>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-linear-to-r from-transparent via-gray-200 to-transparent my-4"></div>

            {/* Comment Input Section */}
            <form onSubmit={handleSubmit} className="relative">
              <div className="flex items-center gap-2 md:gap-3">
                {/* Comment Input */}
                <div className="relative flex-1">
                  <input
                    type="text"
                    name="comment"
                    placeholder="Share your thoughts..."
                    className="
                            w-full py-3 md:py-3.5 pl-4 md:pl-5 pr-12
                            text-sm md:text-base text-gray-700 
                            placeholder-gray-400
                            bg-gray-50/80 hover:bg-gray-50
                            border border-gray-200 
                            rounded-xl md:rounded-2xl
                            focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-400
                            transition-all duration-300 ease-out
                        "
                  />

                  {/* Emoji Button (Optional Decoration) */}
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-500 transition-colors p-1"
                    aria-label="Add emoji"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
                </div>

                {/* Send Button */}
                <button
                  type="submit"
                  className="
                        group relative overflow-hidden
                        px-5 md:px-7 py-3 md:py-3.5
                        bg-linear-to-r from-[#86e062] to-[#00c389]
                        hover:from-emerald-600 hover:to-lime-600
                        text-white text-sm md:text-base font-semibold
                        rounded-full
                        shadow-md hover:shadow-lg hover:shadow-emerald-500/25
                        transform hover:-translate-y-0.5 active:translate-y-0
                        transition-all duration-300 ease-out
                        flex items-center gap-2
                    "
                >
                  {/* Shine Effect */}
                  <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>

                  <span className="relative hidden sm:inline items-center">
                    Send
                  </span>
                  <svg
                    className="relative w-4 h-4 md:w-5 md:h-5 transform rotate-45"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 30 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </button>
              </div>
            </form>
          </div>

          {/* Engagement Stats Bar (Optional - Below Card) */}
          <div className="flex items-center justify-center gap-6 mt-4 text-xs md:text-sm text-gray-400">
            <div className="flex items-center gap-1.5">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              <span>{blogs.views || "1.2k"} views</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-gray-300"></div>
            <div className="flex items-center gap-1.5">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <span>{blogs.comments || "24"} comments</span>
            </div>
          </div>
        </div>
        <div className="-mt-12 my-20 px-2 md:hidden">
        </div>
      </div>
    </>
  );
};

export default BlogPage;
