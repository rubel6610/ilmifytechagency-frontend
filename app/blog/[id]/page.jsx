"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { FaRegHeart, FaHeart, FaInstagram } from 'react-icons/fa';
import { MdShare } from "react-icons/md";
import { TiSocialFacebook } from "react-icons/ti";
import { IoLogoLinkedin } from "react-icons/io5";
import CommentForm from '../components/CommentForm';
import { GrYoutube } from 'react-icons/gr';
import BlogNotFound from '../components/BlogNotFound';
import { blogsData } from '../components/blogsData';
import { role } from "../../dashboard/page";

const BlogPage = () => {
    const { id } = useParams();
    const blogs = blogsData.find((blog) => blog.id == id);
 
    
    // Like functionality states
    const [likeCount, setLikeCount] = useState(blogs ? blogs.like_count : 0);

    const [isLiked, setIsLiked] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault(); }

    // Initialize like count and check if user has already liked
    // useEffect(() => {
    //     if (blogs) {
    //         // Get stored like count or use default from blog data
    //         const storedLikes = JSON.parse(localStorage.getItem('blogLikes') || '{}');
    //         const initialCount = storedLikes[blogs.id] ?? blogs.like_count ?? 0;
    //         setLikeCount(initialCount);

    //         // Check if user has already liked this blog
    //         const likedBlogs = JSON.parse(localStorage.getItem('likedBlogs') || '{}');
    //         setIsLiked(!!likedBlogs[blogs.id]);
    //     }
    // }, [blogs, setLikeCount, setIsLiked]);

    
    // Handle like button click
    const handleLike = () => {
        if (!blogs) return;

        // Trigger animation
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 300);

        const likedBlogs = JSON.parse(localStorage.getItem('likedBlogs') || '{}');
        const storedLikes = JSON.parse(localStorage.getItem('blogLikes') || '{}');
        
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
        
        localStorage.setItem('likedBlogs', JSON.stringify(likedBlogs));
        localStorage.setItem('blogLikes', JSON.stringify(storedLikes));
    };

    if (!blogs) {
        return <div className="text-center"><BlogNotFound /></div>;
    }

    // const SocialLinks = () => (
    //     <ul className="absolute bottom-full right-0 mb-4 flex flex-wrap justify-end gap-2 sm:gap-3 
    //                    bg-black text-white px-3 py-2 rounded-xl shadow-2xl z-50 
    //                    w-50 sm:w-max sm:max-w-none
    //                    animate-in fade-in zoom-in duration-300">
    //         <li>
    //             <a href="https://www.facebook.com/ilmifyTech" target="_blank" className="hover:text-primary transition-colors">
    //                 <TiSocialFacebook />
    //             </a>
    //         </li>
    //         <li>
    //             <a href="https://www.instagram.com/ilmifytech.agency" target="_blank">
    //                 <FaInstagram />
    //             </a>
    //         </li>
    //         <li>
    //             <a href="https://www.youtube.com/@ilmifyTechAgency" target="_blank">
    //                 <GrYoutube />
    //             </a>
    //         </li>
    //         <li>
    //             <a href="https://bd.linkedin.com/company/ilmifytechagency" target="_blank">
    //                 <IoLogoLinkedin />
    //             </a>
    //         </li>
    //     </ul>
    // );

    return (
        <>
            <div className='my-10 md:my-20 bg-background mx-auto w-full max-w-360 px-4 sm:px-6 lg:px-8 overflow-hidden mt-30 md:mt-40'>
                
                {/* HERO IMAGE */}
                <div className="relative w-full overflow-hidden rounded-xl">
                    <Image 
                        src={blogs.image} 
                        alt={blogs.title} 
                        width={1400} 
                        height={500} 
                        className='w-full lg:h-150 object-cover' 
                        priority
                    />
                </div>

                {/* HEADER CONTENT */}
                <div className='text-center mt-8 md:mt-12 w-full max-w-300 mx-auto px-2'>
                    <h1 className='text-primary text-[22px] sm:text-[28px] md:text-[37px] font-quicksand font-semibold leading-tight wrap-break-word hyphens-auto'>
                        {blogs.title}
                    </h1>
                    
                    {/* META DATA */}
                    <div className='flex flex-col sm:flex-row flex-wrap justify-center font-ubuntu mt-4 mb-10 md:mb-16 text-[10px] sm:text-xs md:text-sm font-extralight uppercase tracking-wide opacity-80 gap-x-2 gap-y-1 w-full'> 
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
                    <div className='text-left w-full max-w-300 mx-auto text-gray-700 leading-relaxed space-y-6 text-sm sm:text-base md:text-lg overflow-hidden font-ubuntu font-light'>
                        <p className="whitespace-pre-line wrap-break-word overflow-wrap-anywhere">
                            When, while the lovely valley teems with vapor around me, and the meridian sun strikes the upper surface of the impenetrable foliage of my trees, and but a few stray gleams steal into the inner sanctuary, I throw myself down among the tall grass by the trickling stream; and, as I lie close to the earth, a thousand unknown plants are noticed by me: when I hear the buzz of the little world among the stalks, and grow familiar with the countless indescribable forms of the insects and flies, then I feel the presence of the Almighty, who formed us in his own image, and the breath of that universal love which bears and sustains us, as it floats around us in an eternity of bliss; and then, my friend, when darkness overspreads my eyes, and heaven and earth seem to dwell in my soul and absorb its power, like the form of a beloved mistress, then I often think with longing, Oh, would I could describe these conceptions, could impress upon paper all that is living so full and warm within me, that it might be the mirror of my soul, as my soul is the mirror of the infinite God!
                        </p>
                        <p className="whitespace-pre-line wrap-break-word overflow-wrap-anywhere">
                            O my friend — but it is too much for my strength — I sink under the weight of the splendor of these visions! A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence in this spot, which was created for the bliss of souls like mine.
                        </p>
                        <p className="whitespace-pre-line wrap-break-word overflow-wrap-anywhere">
                            I am so happy, my dear friend, so absorbed in the exquisite sense of mere tranquil existence, that I neglect my talents. I should be incapable of drawing a single stroke at the present moment; and yet I feel that I never was a greater artist than now.
                        </p>
                        <p className="whitespace-pre-line wrap-break-word overflow-wrap-anywhere">
                            When, while the lovely valley teems with vapor around me, and the meridian sun strikes the upper surface of the impenetrable foliage of my trees, and but a few stray gleams steal into the inner sanctuary, I throw myself down among the tall grass by the trickling stream; and, as I lie close to the earth, a thousand unknown plants are noticed by me: when I hear the buzz of the little world among the stalks, and grow familiar with the countless indescribable forms of the insects and flies, then I feel the presence of the Almighty, who formed us in his own image, and the breath of that universal love which bears and sustains us, as it floats around us in an eternity of bliss; and then, my friend, when darkness overspreads my eyes, and heaven and earth seem to dwell in my soul and absorb its power, like the form of a beloved mistress, then I often think with longing, Oh, would I could describe these conceptions, could impress upon paper all that is living so full and warm within me.
                        </p>
                    </div>
                </div>

                {/* TAGS & SHARE BAR - With Like Functionality */}
                <div className='my-12 mt-10 md:my-16 py-4 sm:py-6 flex flex-row justify-between items-center w-full max-w-300 mx-auto gap-2 sm:gap-4 px-3 md:px-5'>
                    <div>
                        <>
                        {role ? (
                               <div className='flex items-center gap-3'>
                                <Image 
                            src="/diversity-young-teens-people-friends-concept-PTZ4RGN-768x576.png" 
                            alt="user Image" 
                            width={500} 
                            height={500} 
                            className=' h-10 w-10  md:h-14 md:w-14 object-cover border-2 rounded-full border-emerald-500' 
                        />
                        <h1 className='font-bold lg:text-xl '>{role}</h1>
                               </div>
                        ) :  (
                            <Image 
                            src="/office.png" 
                            alt="user Avatar" 
                            width={30} 
                            height={30} 
                            className=' h-10 w-10  md:h-14 md:w-14 object-cover border-2 rounded-full border-emerald-500' 
                        />
                        )}
                        </>
                    </div>
                    <div>
                        <form onSubmit={handleSubmit} className='hidden md:flex gap-1 lg:gap-2'>
                            <input type="text" name="textarea" placeholder="Write a comment..." className="w-full text-gray-700 placeholder-gray-400 bg-gray-50 border border-gray-200 rounded-full p-4 px-28 lg:px-70 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm md:text-base resize-none transition-all duration-200 ease-in-out" />
                            <input type="submit" value="send" className='bg-linear-to-r from-[#86e062] to-[#00c389] md:px-8 lg:px-12 hover:bg-emerald-600 text-white text-lg font-semibold  py-2 rounded-full transition-colors duration-200' />
                        </form>
                    </div>
                  <div className='flex gap-5'>
                      {/* Like Count Display */}
                    <div className='flex items-center gap-2 flex-1 min-w-0'>
                        <span className={`text-[14px] sm:text-[11px] md:text-[18px] font-semibold transition-all duration-300 ${isLiked ? 'text-lime-500' : 'text-gray-700'}`}>
                            {likeCount.toLocaleString()} {likeCount === 1 ? 'like' : ''}
                        </span>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className='flex gap-3 sm:gap-4 md:gap-6 text-[18px] sm:text-[20px] md:text-[26px] shrink-0 items-center'>
                        
                        {/* Like Button */}
                        <button 
                            onClick={handleLike}
                            aria-label={isLiked ? "Unlike" : "Like"} 
                            className={`
                                transition-all duration-300 cursor-pointer
                                ${isAnimating ? 'scale-125' : 'hover:scale-110'}
                                ${isLiked ? 'text-emerald-500' : 'text-gray-400 hover:text-emerald-500'}
                            `}
                        >
                            {isLiked ? <FaHeart /> : <FaRegHeart />}
                        </button>

                        {/* Share Button */}
                        {/* <div className="relative flex items-center">
                            {social && SocialLinks }

                            <button
                                onClick={() => setSocial(!social)}
                                className={`cursor-pointer transition-all duration-300 ${social ? 'text-primary scale-110' : 'text-gray-600 hover:text-primary'}`}
                                aria-label="Toggle Social Share"
                            >
                                <MdShare />
                            </button>
                        </div> */}
                    </div>
                  </div>
                </div>
<div className='-mt-12 my-20 px-2 md:hidden'>
                                        <form onSubmit={handleSubmit} className='flex  md:hidden gap-1'>
                            <input type="text" name="textarea" placeholder="Write a comment..." className="w-full text-gray-700 placeholder-gray-400 bg-gray-50 border border-gray-200 rounded-full p-2 px-20 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm md:text-base resize-none transition-all duration-200 ease-in-out" />
                            <input type="submit" value="send" className='bg-linear-to-r from-[#86e062] to-[#00c389] px-6 hover:bg-emerald-600 text-white text-sm font-semibold  py-4 rounded-full transition-colors duration-200' />
                        </form>
</div>
                        
                {/* COMMENT SECTION */}
                {/* <section className='text-left w-full -mt-8 max-w-300 mx-auto mb-20 overflow-hidden px-2'>
                    <CommentForm />
                </section> */}
            </div>
        </>
    );
};

export default BlogPage;