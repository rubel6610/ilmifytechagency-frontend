"use client";

import Image from "next/image";
import Link from "next/link";
import { projectsData } from "../components/projectData";

const RelatedProjects = () => {
  // take only first 3 projects (static)
  const relatedProjects = projectsData.slice(0, 3);

  return (
    <section className="mt-32">
      {/* Title */}
      <h2 className="text-center text-sm tracking-[0.4em] uppercase mb-16">
        Related Projects
      </h2>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto px-6">
        {relatedProjects.map((project) => (
          <Link
            key={project.id}
            href={`/showcase/${project.id}`}
            className="group"
          >
            <div className="overflow-hidden">
              {/* Image */}
              <Image
                src={project.image}
                alt={project.title}
                width={500}
                height={350}
                className="w-full h-70 object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Content */}
            <div className="mt-6 text-center">
              <h3 className="text-lg font-semibold leading-snug">
                {project.title}
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                by {project.author}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RelatedProjects;
