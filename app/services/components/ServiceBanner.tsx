"use client";

import servicesData from "./servicesData";

export default function ServiceBanner({ slug }: { slug: string }) {
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) return null;

  return (
    <>
      {/* Details */}
      <section className="w-full pt-60 pb-20 bg-white">
        <div className="container mx-auto px-8 flex flex-col lg:flex-row items-center gap-10">
          <div className="lg:w-1/2 space-y-6 text-gray-700">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              Empowering Your Business with{" "}
              <span className="text-[#00D9A6]">{service.title}</span>
            </h2>

            <p className="text-base md:text-lg leading-relaxed">
              {service.description2}
            </p>

            <p className="text-base md:text-lg leading-relaxed">
              {service.description3}
            </p>
          </div>

          <div className="lg:w-1/2 w-full">
            <video
              src="/assets/videos/demo-video1.mp4" // public/assets/videos/...
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-auto rounded-xl shadow-lg"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>
    </>
  );
}
