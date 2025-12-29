"use client";


import { useParams } from "next/navigation";
import Image from "next/image";
import { projectsData } from "../components/projectData";
import { FaGooglePlusG, FaPinterestP, FaRegHeart, FaStumbleupon, FaWhatsapp } from "react-icons/fa";
import { MdOutlineMarkEmailRead, MdShare } from "react-icons/md";
import { useState } from "react";
import { TiSocialFacebook, TiSocialTwitter } from "react-icons/ti";
import { FiPocket } from "react-icons/fi";
import { RiTelegram2Line } from "react-icons/ri";
import { IoLogoLinkedin } from "react-icons/io5";



const CardDetails = () => {
  const [social, setSocial]= useState(false)
  const { id } = useParams();

  const project = projectsData.find(
    (item) => item.id === Number(id)
  );

  if (!project) {
    return (
      <div className="py-20 text-center text-xl">
        Project not found
      </div>
    );
  }

  const socialLinks = <>
  <div className="absolute right-0 top-17.5
    flex items-center gap-4
    bg-black text-white
    px-6 py-3
    rounded-full
    shadow-lg
    transition-all duration-300">
    <TiSocialFacebook />
    <TiSocialTwitter />
    <FaGooglePlusG />
    <FaPinterestP />
    <IoLogoLinkedin />
    <FaStumbleupon />
    <FaWhatsapp />
    <FiPocket />
    <MdOutlineMarkEmailRead />
    <RiTelegram2Line />
  </div>
  </>

  return (
    <div className="mx-auto flex justify-center px-6 py-20 lg:max-w-400">
     <div className="w-197.5 mx-20 ">
      
        <Image
          src={project.image}
          alt={project.title}
          height={400}
          width={790}
          className=""
        />
         <div className="mt-20 max-w-5xl">
        <h3 className="text-xl font-semibold mb-4">
          Phase 1: Discovery & Planning
        </h3>

        <p className="text-gray-600 leading-relaxed">
         The project began with an in-depth discussion to understand Charme’s brand identity, product offerings, and target market. This helped to define the site’s structure, product categories, and essential features. Together with the client, we set clear goals to improve customer engagement, streamline the shopping experience, and increase sales through effective design and e-commerce functionality.
        </p>
      </div>
      <div className="mt-20 max-w-5xl">
        <h3 className="text-xl font-semibold mb-4">
          Phase 2: Backend Development
        </h3>

        <p className="text-gray-600 leading-relaxed">
        I developed the backend using Shopify’s API and other relevant technologies to integrate essential functionalities such as inventory management, user authentication, and order processing. Key features such as secure checkout, real-time inventory updates, and automatic notifications for order updates were built to ensure a seamless experience for both the business and customers.
        </p>
      </div>
      <div className="mt-20 max-w-5xl">
        <h3 className="text-xl font-semibold mb-4">
         Phase 3: Design & Prototyping
        </h3>

        <p className="text-gray-600 leading-relaxed">
         During the design phase, I focused on creating a modern and visually appealing layout that was aligned with Charme’s brand image. Wireframes and design prototypes were created to showcase the homepage, product pages, and checkout flow. The design included custom graphics, clean typography, and a minimalist color palette to give the website a professional and elegant look
        </p>
      </div>
      <div className="mt-20 max-w-5xl">
        <h3 className="text-xl font-semibold mb-4">
         Phase 4: Development & Customization
        </h3>

        <p className="text-gray-600 leading-relaxed">
         Using Shopify, I developed a fully customized e-commerce website that met the client’s needs. This included setting up product categories, payment gateways, shipping options, and an intuitive product search function. I also integrated key features like product recommendations, user reviews, and discount codes to enhance the shopping experience. The website was fully optimized for mobile and desktop devices, ensuring customers could shop seamlessly across all platforms.
        </p>
      </div>
      <div className="mt-20 max-w-5xl">
        <h3 className="text-xl font-semibold mb-4">
         Phase 5: Content Integration & Optimization
        </h3>

        <p className="text-gray-600 leading-relaxed">
         Once the website structure was in place, I integrated high-quality product images, descriptions, and pricing information. SEO optimization was implemented to ensure better visibility on search engines, and I ensured the website’s performance was optimized for fast loading times. I also set up social media integrations and email marketing tools to help Charme engage with customers and drive traffic to the site..
        </p>
      </div>
      <div className="mt-20 max-w-5xl">
        <h3 className="text-xl font-semibold mb-4">
          Phase 6: Payment Gateway & Security Integration
        </h3>

        <p className="text-gray-600 leading-relaxed">
I integrated multiple secure payment gateways to facilitate smooth transactions. The system ensures secure handling of sensitive customer data, adhering to the highest standards of security (e.g., SSL encryption, PCI-DSS compliance). I also set up automated fraud detection measures and robust user authentication to protect both customers and the business.
        </p>
      </div>
      <div className="mt-20 max-w-5xl">
        <h3 className="text-xl font-semibold mb-4">
          Phase 7: Testing & Feedback
        </h3>

        <p className="text-gray-600 leading-relaxed">
        Before launching, I conducted rigorous testing to ensure the website was fully functional across multiple devices and browsers. The website’s user interface was tested for responsiveness, ease of navigation, and smooth checkout processes. After receiving feedback from Charme, I made the necessary adjustments to improve user experience and address any concerns.
        </p>
      </div>
      <div className="mt-20 max-w-5xl">
      </div>
      <div className="mt-20 max-w-5xl">
        <p className="text-gray-600 leading-relaxed">
         For this project, I created a custom database structure to manage product inventories, customer information, order histories, and payment records. The database was optimized for performance, ensuring quick access and updates for all e-commerce operations, from browsing products to processing transactions.
        </p>
      </div>

      </div>
      {/* right sectiuon */}
{/* right section */}
<div className="w-84.75 sticky top-24 self-start">
  <div className="relative">

    {/* SOCIAL BAR */}
    {social && socialLinks}

    <h1 className="text-[54px] font-semibold my-4">
      {project.title}
    </h1>

    <p className="py-6 text-gray-600">
      I had the opportunity to design and develop a custom Shopify website for Charme,
      an e-commerce store focused on delivering high-quality products
    </p>

    <h1 className="font-ubuntu uppercase my-3 tracking-widest">
      Launch Project
    </h1>

    <span className="flex text-4xl gap-7 my-8 items-center">
      <FaRegHeart className="text-primary cursor-pointer" />

      <button
        onClick={() => setSocial(!social)}
        className="cursor-pointer"
      >
        <MdShare />
      </button>
    </span>

    <p className="font-bold">Client</p>
    <p className="mb-4">{project.author}</p>

    <p className="font-bold">Release Date</p>
    <p>{project.date}</p>
  </div>
</div>

       
    </div>
  );
};

export default CardDetails;
