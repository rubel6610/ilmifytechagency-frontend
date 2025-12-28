"use client";
import Image from "next/image";
import { motion } from "motion/react";
import Link from "next/link";

export const projectsData = [
  {
    id: 1,
    image: "/assets/insurance.jpg",
    title: "Insurance website for",
    author: "yas_som",
    type: "CMS",
  },
  {
    id: 2,
    image: "/assets/science.jpg",
    title: "AkiMed™ Science Website",
    author: "Harry Blaq",
    type: "CMS",
  },
  {
    id: 3,
    image: "/assets/promise.webp",
    title: "Hopes Promise Respite",
    author: "LLC Hopejekakye",
    type: "CMS",
  },
  {
    id: 4,
    image: "/assets/shopifystore.jpg",
    title: "Shopify Store Design",
    author: "CHARM",
    type: "CMS",
  },
  {
    id: 5,
    image: "/assets/custom-trading.jpg",
    title: "Custom Trading Website",
    author: "John",
    type: "Costum",
  },
  {
    id: 6,
    image: "/assets/custom-ecommerce.jpeg",
    title: "Custom E-Commerce",
    author: "Website Daneal",
    type: "Costum",
  },
  {
    id: 7,
    image: "/assets/tour-travels.jpg",
    title: "Tour Travel Website",
    author: "Monalisa",
    type: "Costum",
  },
  {
    id: 8,
    image: "/assets/mobile-app.jpg",
    title: "Mobile App Development",
    author: "Mackkalam",
    type: "App",
  },
];

const Cards = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-7 md:gap-3">
        {projectsData.map((project) => (
          <Link key={project.id} href={`showcase/${project.id}`}>
            <motion.div
              whileHover={{
                scale: 1.1,
                zIndex: 1,
                transition: { duration: 0.6, ease: "easeOut" },
              }}
              className="group relative h-90 rounded overflow-hidden cursor-pointer"
            >
              {/* Image */}
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition duration-500 group-hover:scale-110"
              />

              {/* Overlay */}
              <div
                className="
                  absolute inset-0
                  opacity-0 group-hover:opacity-100
                  transition-all duration-1000
                  flex items-end
                "
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(13, 218, 160, 0.7), rgba(140, 224, 100, 0.7))",
                }}
              >
                <div className="p-6 z-10 text-white translate-y-6 group-hover:translate-y-0 transition-all duration-1500 space-y-2">
                  <h3 className="text-2xl font-semibold">{project.title}</h3>
                  <h4 className="text-xl">{project.author}</h4>
                  <span className="text-sm opacity-80">{project.type}</span>
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Cards;
