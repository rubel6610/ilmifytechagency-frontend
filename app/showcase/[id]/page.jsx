"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { projectsData } from "../components/projectData";
import {
  FaGooglePlusG,
  FaPinterestP,
  FaRegHeart,
  FaStumbleupon,
  FaWhatsapp,
} from "react-icons/fa";
import { MdOutlineMarkEmailRead, MdShare } from "react-icons/md";
import { useState } from "react";
import { TiSocialFacebook, TiSocialTwitter } from "react-icons/ti";
import { FiPocket } from "react-icons/fi";
import { RiTelegram2Line } from "react-icons/ri";
import { IoLogoLinkedin } from "react-icons/io5";
import Link from "next/link";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi2";
import { BsGrid3X3GapFill } from "react-icons/bs";

const CardDetails = () => {
  const [social, setSocial] = useState(false);
  const { id } = useParams();

   const currentIndex = projectsData.findIndex(
    (item) => item.id === Number(id)
  );

  const project = projectsData[currentIndex];

  const prevProject = projectsData[currentIndex - 1];
  const nextProject = projectsData[currentIndex + 1];

  if (!project) {
    return (
      <div className="py-20 text-center text-xl">
        Project not found
      </div>
    );
  }                                        


  const socialLinks = (
    <ul
      className="absolute top-950 right-50  md:right-100 lg:right-17 lg:top-83
      flex flex-col  lg:flex-row items-center gap-4
      bg-black text-white
      px-6 py-3
      rounded-full
      shadow-lg
      max-w-[95vw]
      overflow-x-auto
      transform transition-all duration-500 ease-out
      opacity-100 translate-y-0 scale-100
      animate-social-float"
    >
      <li>
        <a href="https://www.facebook.com/" target="_blank">
          <TiSocialFacebook />
        </a>
      </li>
      <li>
        <a href="" target="_blank">
          <TiSocialTwitter />
        </a>
      </li>
      <li>
        <a href="" target="_blank">
          <FaGooglePlusG />
        </a>
      </li>
      <li>
        <a href="" target="_blank">
          <FaPinterestP />
        </a>
      </li>
      <li>
        <a href="" target="_blank">
          <IoLogoLinkedin />
        </a>
      </li>
      <li>
        <a href="" target="_blank">
          <FaStumbleupon />
        </a>
      </li>
      <li>
        <a href="" target="_blank">
          <FaWhatsapp />
        </a>
      </li>
      <li>
        <a href="" target="_blank">
          <FiPocket />
        </a>
      </li>
      <li>
        <a href="" target="_blank">
          <MdOutlineMarkEmailRead />
        </a>
      </li>
      <li>
        <a href="" target="_blank">
          <RiTelegram2Line />
        </a>
      </li>
    </ul>
  );

  return (
    <div className="mx-auto flex flex-col lg:flex-row justify-center px-6 py-20 lg:max-w-400 overflow-x-hidden lg:overflow-x-visible">
      {/* LEFT CONTENT */}
      <div className="w-197.5 lg:mx-20 mx-auto max-w-full">
        <Image
          src={project.image}
          alt={project.title}
          width={790}
          height={400}
          className="w-68 md:w-167 lg:w-197.5 h-auto object-contain mx-auto max-w-full"
        />

        <div className="mt-20 w-68 md:w-170 lg:max-w-5xl mx-auto max-w-full">
          <h3 className="text-xl font-semibold mb-4">
            Phase 1: Discovery & Planning
          </h3>
          <p className="text-gray-600 leading-relaxed">
            The project began with a thorough consultation to understand
            Mackkalam’s business goals, target audience, and desired features
            for the app. We discussed key functionalities like user
            registration, service booking, push notifications, and real-time
            updates. The planning phase helped establish the scope of the
            project, ensuring that the app would meet Mackkalam’s needs while
            offering a smooth user experience.
          </p>
        </div>

        <div className="mt-20 w-68 md:w-170 lg:max-w-5xl mx-auto max-w-full">
          <h3 className="text-xl font-semibold mb-4">
            Phase 2: Backend Development
          </h3>
          <p className="text-gray-600 leading-relaxed">
            During the design phase, I created wireframes and prototypes that
            visualized the app’s layout, navigation, and overall user interface.
            The design focused on simplicity and ease of use, ensuring that the
            app would be intuitive for both new and existing users. After
            receiving feedback from Mackkalam, we refined the design to align
            with their brand identity, ensuring a cohesive look and feel
            throughout the app.
          </p>
        </div>

        <div className="mt-20 w-68 md:w-170 lg:max-w-5xl mx-auto max-w-full">
          <h3 className="text-xl font-semibold mb-4">
            Phase 3: Design & Prototyping
          </h3>
          <p className="text-gray-600 leading-relaxed">
            The mobile app was developed using [iOS/Android/Flutter], ensuring
            smooth functionality and seamless performance. I focused on building
            key features such as real-time service tracking, user account
            management, and a secure payment gateway. The app was designed to be
            highly responsive and fast, with easy navigation to enhance the user
            experience. I also integrated analytics tools to track user behavior
            and app performance, providing valuable insights to Mackkalam.
          </p>
        </div>

        <div className="mt-20 w-68 md:w-170 lg:max-w-5xl mx-auto max-w-full">
          <h3 className="text-xl font-semibold mb-4">
            Phase 4: Development & Customization
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Once the development was complete, I conducted extensive testing
            across various devices and screen sizes to ensure compatibility and
            performance. The app was tested for bugs, security vulnerabilities,
            and UI/UX consistency. After refining the app based on the feedback,
            I optimized it for performance, ensuring quick load times and smooth
            transitions between screens.
          </p>
        </div>

        <div className="mt-20 w-68 md:w-170 lg:max-w-5xl mx-auto max-w-full">
          <h3 className="text-xl font-semibold mb-4">
            Phase 5: Content Integration & Optimization
          </h3>
          <p className="text-gray-600 leading-relaxed">
            After testing and final approvals, the app was launched on [Google
            Play Store/Apple App Store]. I handled the app submission process,
            ensuring it met all the necessary requirements for deployment. I
            also set up tracking tools to monitor the app’s performance,
            allowing for continuous improvement and updates.
          </p>
        </div>

        <div className="mt-20 w-68 md:w-170 lg:max-w-5xl mx-auto max-w-full">
          <h3 className="text-xl font-semibold mb-4">
            Phase 6: Payment Gateway & Security Integration
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Post-launch, I provided Mackkalam with ongoing support to ensure the
            app remained functional and up-to-date. Regular updates were made to
            improve features, fix any issues, and ensure compatibility with the
            latest mobile operating systems. I also offered assistance with user
            feedback, implementing changes and updates as needed.
          </p>
        </div>

        <div className="mt-20 w-68 md:w-170 lg:max-w-5xl mx-auto max-w-full">
          <h3 className="text-xl font-semibold mb-4">Conclusion</h3>
          <p className="text-gray-600 leading-relaxed">
            The AkiMed™ Science website project was successfully delivered on
            time, meeting all the client’s objectives for a modern, professional
            online presence. The site is now a key digital asset for HarryBlaq,
            providing their audience with easy access to product information and
            services while reinforcing their position as a leader in the
            scientific field. The website is optimized for both user experience
            and search engine visibility, ensuring it reaches the right audience
            effectively.
          </p>
        </div>
    <div className="hidden lg:block mt-10 bg-[#F8F8F8]">
      <div className="max-w-5xl mx-auto px-6 py-10 flex items-center justify-between">

        {/* PREVIOUS */}
        {prevProject ? (
          <Link
            href={`/showcase/${prevProject.id}`}
            className="group flex items-center gap-3 text-sm font-semibold tracking-wide uppercase"
          >
            <HiArrowLeft className="text-xl transition-transform group-hover:-translate-x-1" />
            <span>Previous Portfolio</span>
          </Link>
        ) : (
          <div />
        )}

        {/* CENTER GRID */}
        <Link
          href="/showcase"
          className="text-xl hover:scale-110 transition-transform"
          aria-label="All portfolios"
        >
         <BsGrid3X3GapFill />
        </Link>

        {/* NEXT */}
        {nextProject ? (
          <Link
            href={`/showcase/${nextProject.id}`}
            className="group flex items-center gap-3 text-sm font-semibold tracking-wide uppercase"
          >
            <span>Next Portfolio</span>
            <HiArrowRight className="text-xl transition-transform group-hover:translate-x-1" />
          </Link>
        ) : (
          <div />
        )}

      </div>
    </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="lg:w-84.75 lg:sticky top-24 self-start mx-auto max-w-full">
        {" "}
        <div className="flex-col md:flex-row-reverse lg:flex-col gap-9 flex lg:relative">
          {" "}
          {social && socialLinks}{" "}
          <div className="">
            {" "}
            <h1 className="text-xl md:text-3xl lg:text-[54px] font-semibold my-4">
              {" "}
              {project.title}{" "}
            </h1>{" "}
            <p className="py-6 text-gray-600 md:w-140 ">
              {" "}
              I had the privilege of designing and developing the AkiMed™
              Science website for HarryBlaq, with a focus on creating a
              professional, informative, and visually engaging platform for the
              brand’s scientific products and services.{" "}
            </p>{" "}
            <h1 className="font-ubuntu uppercase my-3 tracking-widest">
              {" "}
              Launch Project{" "}
            </h1>{" "}
            <span className="flex text-4xl gap-7 my-8 items-center">
              {" "}
              <FaRegHeart className="text-primary cursor-pointer" />{" "}
              <button
                onClick={() => setSocial(!social)}
                className="cursor-pointer"
              >
                {" "}
                <MdShare />{" "}
              </button>{" "}
            </span>{" "}
          </div>{" "}
          <div className="md:ml-8 md:mt-8 lg:mt-0 lg:ml-0">
            {" "}
            <p className="font-bold">Client</p>{" "}
            <p className="mb-4">{project.author}</p>{" "}
            <p className="font-bold">Release Date</p> <p>{project.date}</p>{" "}
          </div>{" "}
        </div>{" "}
      </div>
          <div className="block lg:hidden mt-24 bg-[#F8F8F8]">
      <div className="max-w-5xl mx-auto px-6 py-10 flex items-center justify-between">

        {/* PREVIOUS */}
        {prevProject ? (
          <Link
            href={`/showcase/${prevProject.id}`}
            className="group flex items-center gap-3 text-sm font-semibold tracking-wide uppercase"
          >
            <HiArrowLeft className="text-xl transition-transform group-hover:-translate-x-1" />
            <span>Previous Portfolio</span>
          </Link>
        ) : (
          <div />
        )}

        {/* CENTER GRID */}
        <div
          className="text-xl hover:scale-110 pr-8 md:pr-0 transition-transform"
          aria-label="All portfolios"
        >
         <BsGrid3X3GapFill className="" />
        </div>

        {/* NEXT */}
        {nextProject ? (
          <Link
            href={`/showcase/${nextProject.id}`}
            className="group flex items-center gap-3 text-sm font-semibold tracking-wide uppercase"
          >
            <span>Next Portfolio</span>
            <HiArrowRight className="text-xl transition-transform group-hover:translate-x-1" />
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
