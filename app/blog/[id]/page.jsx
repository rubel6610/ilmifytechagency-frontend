"use client";

import React, { useState } from 'react';
import { blogsData } from '../blogsData';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { FaRegHeart, FaGooglePlusG, FaPinterestP, FaWhatsapp, FaInstagram } from 'react-icons/fa';
import { MdShare } from "react-icons/md";
import { TiSocialFacebook, TiSocialTwitter } from "react-icons/ti";
import { RiTelegram2Line } from "react-icons/ri";
import { IoLogoLinkedin } from "react-icons/io5";
import CommentForm from '../CommentForm';
import { GrYoutube } from 'react-icons/gr';

const BlogPage = () => {
    const { id } = useParams();
    const blogs = blogsData.find((blog) => blog.id == id);
    const [social, setSocial] = useState(false);

    if (!blogs) {
        return <div className="text-center py-20">Blog not found</div>;
    }

    const SocialLinks = () => (
        <ul className="absolute bottom-full right-0 mb-4 flex flex-wrap justify-end gap-2 sm:gap-3 
                       bg-black text-white px-3 py-2 rounded-xl shadow-2xl z-50 
                       w-[200px] sm:w-max sm:max-w-none
                       animate-in fade-in zoom-in duration-300">
            <li><a href="https://www.facebook.com/ilmifyTech" target="_blank" className="hover:text-primary transition-colors"><TiSocialFacebook  /></a></li>
            <li>
        <a href="https://www.instagram.com/ilmifytech.agency" target="_blank">
          <FaInstagram  />
        </a>
      </li>
      <li>
        <a href="https://www.youtube.com/@ilmifyTechAgency" target="_blank">
          <GrYoutube />
        </a>
      </li>
      <li>
        <a href="https://bd.linkedin.com/company/ilmifytechagency" target="_blank">
          <IoLogoLinkedin />
        </a>
      </li>
        </ul>
    );

    return (
        <>
            {/* Global overflow fix - add this to prevent any horizontal scroll */}
            <style jsx global>{`
                html, body {
                    overflow-x: hidden;
                }
            `}</style>
            
            <div className='my-10 md:my-20 bg-background mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 overflow-hidden'>
                
                {/* HERO IMAGE */}
                <div className="relative w-full overflow-hidden rounded-xl">
                    <Image 
                        src={blogs.image} 
                        alt={blogs.title} 
                        width={1400} 
                        height={800} 
                        className='w-full h-auto object-cover' 
                        priority
                    />
                </div>

                {/* HEADER CONTENT */}
                <div className='text-center mt-8 md:mt-12 w-full max-w-[1200px] mx-auto px-2'>
                    <h1 className='text-primary text-[22px] sm:text-[28px] md:text-[37px] font-quicksand font-semibold leading-tight break-words hyphens-auto'>
                        {blogs.title}
                    </h1>
                    
                    {/* META DATA - Fixed responsive layout */}
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

                    {/* MAIN BODY TEXT - Fixed overflow */}
                    <div className='text-left w-full max-w-[1200px] mx-auto text-gray-700 leading-relaxed space-y-6 text-sm sm:text-base md:text-lg overflow-hidden font-ubuntu font-light'>
                        <p className="whitespace-pre-line break-words overflow-wrap-anywhere">
                            When, while the lovely valley teems with vapor around me, and the meridian sun strikes the upper surface of the impenetrable foliage of my trees, and but a few stray gleams steal into the inner sanctuary, I throw myself down among the tall grass by the trickling stream; and, as I lie close to the earth, a thousand unknown plants are noticed by me: when I hear the buzz of the little world among the stalks, and grow familiar with the countless indescribable forms of the insects and flies, then I feel the presence of the Almighty, who formed us in his own image, and the breath of that universal love which bears and sustains us, as it floats around us in an eternity of bliss; and then, my friend, when darkness overspreads my eyes, and heaven and earth seem to dwell in my soul and absorb its power, like the form of a beloved mistress, then I often think with longing, Oh, would I could describe these conceptions, could impress upon paper all that is living so full and warm within me, that it might be the mirror of my soul, as my soul is the mirror of the infinite God!
                        </p>
                        <p className="whitespace-pre-line break-words overflow-wrap-anywhere">
                            O my friend — but it is too much for my strength — I sink under the weight of the splendor of these visions! A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence in this spot, which was created for the bliss of souls like mine.
                        </p>
                        <p className="whitespace-pre-line break-words overflow-wrap-anywhere">
                            I am so happy, my dear friend, so absorbed in the exquisite sense of mere tranquil existence, that I neglect my talents. I should be incapable of drawing a single stroke at the present moment; and yet I feel that I never was a greater artist than now.
                        </p>
                        <p className="whitespace-pre-line break-words overflow-wrap-anywhere">
                            When, while the lovely valley teems with vapor around me, and the meridian sun strikes the upper surface of the impenetrable foliage of my trees, and but a few stray gleams steal into the inner sanctuary, I throw myself down among the tall grass by the trickling stream; and, as I lie close to the earth, a thousand unknown plants are noticed by me: when I hear the buzz of the little world among the stalks, and grow familiar with the countless indescribable forms of the insects and flies, then I feel the presence of the Almighty, who formed us in his own image, and the breath of that universal love which bears and sustains us, as it floats around us in an eternity of bliss; and then, my friend, when darkness overspreads my eyes, and heaven and earth seem to dwell in my soul and absorb its power, like the form of a beloved mistress, then I often think with longing, Oh, would I could describe these conceptions, could impress upon paper all that is living so full and warm within me.
                        </p>
                    </div>
                </div>

                {/* TAGS & SHARE BAR - Fixed responsive layout */}
                <div className='my-12 mt-10 md:my-16 py-4 sm:py-6 border-y flex flex-row justify-between items-center w-full max-w-[1200px] mx-auto gap-2 sm:gap-4 px-2'>
                    <h2 className='text-[14px] sm:text-[16px] md:text-[22px] font-bold truncate flex-1 min-w-0'>Tags: No tags</h2>
                    
                    <div className='flex gap-3 sm:gap-4 md:gap-6 text-[18px] sm:text-[20px] md:text-[26px] shrink-0 items-center'>
                        <button aria-label="Like" className="hover:scale-110 transition-transform text-gray-400 hover:text-primary">
                            <FaRegHeart />
                        </button>

                        <div className="relative flex items-center">
                            {social && SocialLinks()}
                            <button
                                onClick={() => setSocial(!social)}
                                className={`cursor-pointer transition-all duration-300 ${social ? 'text-primary scale-110' : 'text-gray-600 hover:text-primary'}`}
                                aria-label="Toggle Social Share"
                            >
                                <MdShare />
                            </button>
                        </div>
                    </div>
                </div>

                {/* COMMENT SECTION */}
                <section className='text-left w-full -mt-8 max-w-[1200px] mx-auto mb-20 overflow-hidden px-2'>
                    <CommentForm />
                </section>
            </div>
        </>
    );
};

export default BlogPage;