"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { projectsData } from "../components/projectData";
import {
  FaRegHeart,
  FaHeart,
  FaStumbleupon,
  FaWhatsapp,
  FaInstagram,
} from "react-icons/fa";
import { MdOutlineMarkEmailRead, MdShare } from "react-icons/md";
import { useState, useEffect } from "react";
import { TiSocialFacebook } from "react-icons/ti";
import { FiPocket } from "react-icons/fi";
import { RiTelegram2Line } from "react-icons/ri";
import { IoLogoLinkedin } from "react-icons/io5";
import Link from "next/link";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi2";
import { GrYoutube } from "react-icons/gr";
import { BsGrid3X3GapFill } from "react-icons/bs";
import RelatedProjects from "../components/RelatedProjects";

const CardDetails = () => {
  const [social, setSocial] = useState(false);
  const [liked, setLiked] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { id } = useParams();

  const currentIndex = projectsData.findIndex(
    (item) => item.id === Number(id)
  );

  const project = projectsData[currentIndex];
  const prevProject = projectsData[currentIndex - 1];
  const nextProject = projectsData[currentIndex + 1];

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!project) {
    return (
      <div className="py-20 text-center text-xl min-h-screen flex items-center justify-center">
        <div>
          <p className="text-gray-400 text-6xl mb-4">404</p>
          <p className="text-gray-600">Project not found</p>
          <Link 
            href="/showcase" 
            className="inline-block mt-6 text-primary hover:underline"
          >
            ← Back to Showcase
          </Link>
        </div>
      </div>
    );
  }

  const socialLinks = (
    <ul
      className={`
        absolute top-full right-0 mt-4
        flex flex-col lg:flex-row items-center gap-3
        bg-white text-gray-700
        px-5 py-4
        rounded-2xl
        shadow-[0_10px_40px_rgba(0,0,0,0.12)]
        border border-gray-100
        z-50
        transform transition-all duration-300 ease-out
        ${social ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-2 scale-95 pointer-events-none'}
      `}
    >
      {[
        { icon: TiSocialFacebook, href: "https://www.facebook.com/ilmifyTech", hover: "hover:text-blue-600" },
        { icon: FaInstagram, href: "https://www.instagram.com/ilmifytech.agency", hover: "hover:text-pink-500" },
        { icon: GrYoutube, href: "https://www.youtube.com/@ilmifyTechAgency", hover: "hover:text-red-500" },
        { icon: IoLogoLinkedin, href: "https://bd.linkedin.com/company/ilmifytechagency", hover: "hover:text-blue-700" },
        { icon: FaWhatsapp, href: "#", hover: "hover:text-green-500" },
        { icon: RiTelegram2Line, href: "#", hover: "hover:text-blue-400" },
        { icon: MdOutlineMarkEmailRead, href: "#", hover: "hover:text-orange-500" },
      ].map((item, index) => (
        <li key={index}>
          <a 
            href={item.href} 
            target="_blank"
            className={`block p-2 rounded-full transition-all duration-200 hover:bg-gray-50 ${item.hover}`}
          >
            <item.icon className="text-lg" />
          </a>
        </li>
      ))}
    </ul>
  );

  const handlepaginate = () => {
  window.scrollTo({ top: 150, behavior: 'smooth' });
  }

  // Phase data
  const phases = [
    {
      title: "Phase 1: Discovery & Planning",
      content: "The project began with a thorough consultation to understand Mackkalam's business goals, target audience, and desired features for the app. We discussed key functionalities like user registration, service booking, push notifications, and real-time updates. The planning phase helped establish the scope of the project, ensuring that the app would meet Mackkalam's needs while offering a smooth user experience."
    },
    {
      title: "Phase 2: Backend Development",
      content: "During the design phase, I created wireframes and prototypes that visualized the app's layout, navigation, and overall user interface. The design focused on simplicity and ease of use, ensuring that the app would be intuitive for both new and existing users. After receiving feedback from Mackkalam, we refined the design to align with their brand identity, ensuring a cohesive look and feel throughout the app."
    },
    {
      title: "Phase 3: Design & Prototyping",
      content: "The mobile app was developed using [iOS/Android/Flutter], ensuring smooth functionality and seamless performance. I focused on building key features such as real-time service tracking, user account management, and a secure payment gateway. The app was designed to be highly responsive and fast, with easy navigation to enhance the user experience."
    },
    {
      title: "Phase 4: Development & Customization",
      content: "Once the development was complete, I conducted extensive testing across various devices and screen sizes to ensure compatibility and performance. The app was tested for bugs, security vulnerabilities, and UI/UX consistency. After refining the app based on the feedback, I optimized it for performance, ensuring quick load times and smooth transitions between screens."
    },
    {
      title: "Phase 5: Content Integration & Optimization",
      content: "After testing and final approvals, the app was launched on [Google Play Store/Apple App Store]. I handled the app submission process, ensuring it met all the necessary requirements for deployment. I also set up tracking tools to monitor the app's performance, allowing for continuous improvement and updates."
    },
    {
      title: "Phase 6: Payment Gateway & Security Integration",
      content: "Post-launch, I provided Mackkalam with ongoing support to ensure the app remained functional and up-to-date. Regular updates were made to improve features, fix any issues, and ensure compatibility with the latest mobile operating systems. I also offered assistance with user feedback, implementing changes and updates as needed."
    },
    {
      title: "Conclusion",
      content: "The AkiMed™ Science website project was successfully delivered on time, meeting all the client's objectives for a modern, professional online presence. The site is now a key digital asset for HarryBlaq, providing their audience with easy access to product information and services while reinforcing their position as a leader in the scientific field."
    }
  ];

  return (
    <div 
      className={`
        mx-auto flex flex-col lg:flex-row justify-center 
        mt-25 px-6 py-20 lg:max-w-400 
        overflow-x-hidden lg:overflow-x-visible
        transition-all duration-700 ease-out
        ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
      `}
    >
      {/* LEFT CONTENT */}
      <div className="w-full lg:w-197.5 lg:mx-20 mx-auto max-w-full">
        
        {/* Main Image */}
        <div 
          className={`
            relative overflow-hidden rounded-2xl
            transition-all duration-700 delay-100
            ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `}
        >
          <div className={`
            absolute inset-0 bg-linear-to-br from-gray-100 to-gray-200
            transition-opacity duration-500
            ${imageLoaded ? 'opacity-0' : 'opacity-100'}
          `}>
            <div className="absolute inset-0 animate-pulse bg-gray-200" />
          </div>
          
          <Image
            src={project.image}
            alt={project.title}
            width={790}
            height={400}
            className={`
              w-full h-auto object-contain mx-auto max-w-full
              transition-all duration-700 ease-out
              hover:scale-[1.02]
              ${imageLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'}
            `}
            onLoad={() => setImageLoaded(true)}
            priority
          />
        </div>

        {/* Phases Content */}
        <div className="mt-16 space-y-16">
          {phases.map((phase, index) => (
            <div 
              key={index}
              className={`
                w-full md:w-170 lg:max-w-5xl mx-auto max-w-full
                transition-all duration-700 ease-out
                ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
              `}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              <h3 className="text-xl font-semibold mb-4 text-gray-900 relative inline-block">
                {phase.title}
                <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-primary rounded-full" />
              </h3>
              <p className="text-gray-600 leading-relaxed text-[15px]">
                {phase.content}
              </p>
            </div>
          ))}
        </div>

        {/* Navigation - Desktop */}
        <div 
          className={`
            hidden lg:block mt-16 bg-[#F8F8F8] rounded-2xl
            transition-all duration-700 delay-500
            ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `}
        >
          <div className="max-w-5xl mx-auto px-8 py-8 flex items-center justify-between">
            {/* Previous */}
            {prevProject ? (
              <Link
                href={`/showcase/${prevProject.id}`}
                className="group flex items-center gap-3 text-sm font-semibold tracking-wide uppercase text-gray-700 hover:text-primary transition-colors duration-300"
              >
                <HiArrowLeft className="text-xl transition-transform duration-300 group-hover:-translate-x-2" />
                <span>Previous Portfolio</span>
              </Link>
            ) : (
              <div />
            )}

            {/* Center Grid */}
            <Link
              href="/showcase"
              className="p-3 rounded-full bg-white shadow-sm hover:shadow-md hover:scale-110 transition-all duration-300"
              aria-label="All portfolios"
            >
              <BsGrid3X3GapFill className="text-gray-600" />
            </Link>

            {/* Next */}
            {nextProject ? (
              <Link
                href={`/showcase/${nextProject.id}`}
                className="group flex items-center gap-3 text-sm font-semibold tracking-wide uppercase text-gray-700 hover:text-primary transition-colors duration-300"
              >
                <span>Next Portfolio</span>
                <HiArrowRight className="text-xl transition-transform duration-300 group-hover:translate-x-2" />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>

      {/* RIGHT SECTION - Sidebar */}
      <div 
        className={`
          lg:w-85 lg:sticky top-32 self-start mx-auto max-w-full
          transition-all duration-700 delay-200
          ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        `}
      >
        <div className="flex flex-col md:flex-row-reverse lg:flex-col gap-9">
          
          {/* Project Info */}
          <div className="flex-1">
            <h1 
              className="
                text-2xl md:text-3xl lg:text-[48px] 
                font-semibold my-4 
                leading-tight
                text-gray-900
              "
            >
              {project.title}
            </h1>
            
            <p className="py-6 text-gray-500 md:w-140 lg:w-full leading-relaxed">
              I had the privilege of designing and developing the AkiMed™
              Science website for HarryBlaq, with a focus on creating a
              professional, informative, and visually engaging platform for the
              brand's scientific products and services.
            </p>
            
            <Link
              href="/contact"
              className="
                inline-block font-medium uppercase tracking-widest text-sm
                text-gray-900 hover:text-primary
                relative group
                transition-colors duration-300
              "
            >
              Launch Project
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
            
            {/* Action Buttons */}
            <div className="flex text-2xl gap-5 my-8 items-center relative">
              <button
                onClick={() => setLiked(!liked)}
                className={`
                  p-3 rounded-full border-2 
                  transition-all duration-300 
                  hover:scale-110 active:scale-95
                  ${liked 
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-500' 
                    : 'border-gray-200 text-gray-400 hover:border-emerald-200 hover:text-emerald-400'
                  }
                `}
              >
                {liked ? <FaHeart /> : <FaRegHeart />}
              </button>
              
              <button
                onClick={() => setSocial(!social)}
                className={`
                  p-3 rounded-full border-2 
                  transition-all duration-300 
                  hover:scale-110 active:scale-95
                  ${social 
                    ? 'bg-primary/10 border-primary text-primary' 
                    : 'border-gray-200 text-gray-400 hover:border-primary hover:text-primary'
                  }
                `}
              >
                <MdShare />
              </button>
              
              {/* Social Links Dropdown */}
              {socialLinks}
            </div>
          </div>
          
          {/* Client Info */}
          <div className="md:ml-8 md:mt-8 lg:mt-0 lg:ml-0 space-y-4">
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-xs uppercase tracking-wider text-gray-400 mb-1">Client</p>
              <p className="font-medium text-gray-900">{project.author}</p>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-xs uppercase tracking-wider text-gray-400 mb-1">Release Date</p>
              <p className="font-medium text-gray-900">{project.date}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation - Mobile */}
      <div 
        className={`
          block lg:hidden mt-24 bg-[#F8F8F8] rounded-2xl w-full
          transition-all duration-700 delay-300
          ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        `}
      >
        <div className="max-w-5xl mx-auto px-6 py-8 flex items-center justify-between">
          {/* Previous */}
          {prevProject ? (
            <Link
              href={`/showcase/${prevProject.id}`}
              onClick={handlepaginate}
              className="group flex items-center gap-2 text-xs md:text-sm font-semibold tracking-wide uppercase text-gray-700 hover:text-primary transition-colors duration-300"
            >
              <HiArrowLeft className="text-lg transition-transform duration-300 group-hover:-translate-x-1" />
              <span className="hidden sm:inline">Previous</span>
            </Link>
          ) : (
            <div />
          )}

          {/* Center Grid */}
          <Link
            href="/showcase"
            className="p-3 rounded-full bg-white shadow-sm hover:shadow-md hover:scale-110 transition-all duration-300"
            aria-label="All portfolios"
          >
            <BsGrid3X3GapFill className="text-gray-600" />
          </Link>

          {/* Next */}
          {nextProject ? (
            <Link
              href={`/showcase/${nextProject.id}`}
              onClick={handlepaginate}
              className="group flex items-center gap-2 text-xs md:text-sm font-semibold tracking-wide uppercase text-gray-700 hover:text-primary transition-colors duration-300"
            >
              <span className="hidden sm:inline">Next</span>
              <HiArrowRight className="text-lg transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
};

export default CardDetails;