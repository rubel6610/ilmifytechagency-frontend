"use client";

import servicesData from "./servicesData";

export default function ServiceExample({ serviceId }) {
  const service = servicesData.find((s) => String(s.id) === String(serviceId));

  if (!service) return null;

  return (
    <>
      {/* Title */}
      <section className="w-full bg-gradient-to-r from-[#00D9A6] to-[#2EE59D] py-14">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            {service.title}
          </h1>
        </div>
      </section>

      {/* Details */}
      <section className="w-full py-20 bg-white">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-10">
          <div className="md:w-1/2 space-y-6 text-gray-700">
            <h2 className="text-3xl md:text-4xl font-semibold">
              Empowering Your Business with Seamless Website{" "}
              <span className="text-[#00D9A6]">{service.subtitle}</span>
            </h2>

            <p className="text-base md:text-lg leading-relaxed">
              {service.description2}
            </p>

            <p className="text-base md:text-lg leading-relaxed">
              {service.description3}
            </p>
          </div>
     
          <div className="md:w-1/2 w-full">
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
