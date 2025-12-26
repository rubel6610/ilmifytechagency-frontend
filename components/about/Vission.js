import React from "react";

export default function Vission() {
  return (
    <div className="bg-gradient-to-r from-green-400 to-green-500 py-20 md:py-32 text-white">
      <div className="container mx-auto px-6">
        <h2 className="text-center text-2xl md:text-5xl font-semibold">
          Our Visions Mission
        </h2>

        <div className="flex space-x-2 py-10 justify-center">
          <div className="border-3 rounded-2xl border-white w-3"></div>
          <div className="border-3 rounded-2xl border-white w-10"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mt-14 text-sm">
          <div className="hover:bg-green-300 hover:rounded-2xl px-6 py-12">
            <h4 className="text-2xl md:text-3xl text-center font-semibold mb-3">
              Our Mission
            </h4>
            <p className="pt-6 opacity-90 leading-relaxed text-justify font-medium">
              At iLMiFY, our mission is to empower businesses by providing
              innovative digital solutions that drive growth and success. We are
              committed to delivering high-quality websites, mobile apps,
              branding, and digital marketing strategies tailored to meet the
              unique needs of each client. Our goal is to help businesses
              transform their ideas into impactful online experiences that
              connect with their audience and achieve measurable results.
            </p>
          </div>

          <div className="hover:bg-green-300 hover:rounded-2xl px-6 py-12">
            <h4 className="text-2xl md:text-3xl text-center font-semibold mb-3">
              Our Vision
            </h4>
            <p className="pt-6 opacity-90 leading-relaxed text-justify font-medium">
              Our vision is to become a global leader in digital transformation,
              shaping the future of businesses through cutting-edge technology
              and creative solutions. We aim to build long-lasting relationships
              with our clients by consistently delivering value, fostering
              innovation, and driving success. At iLMiFY, we strive to create a
              world where businesses, regardless of size, can leverage digital
              tools to reach their full potential.
            </p>
          </div>
          <div className="hover:bg-green-300 hover:rounded-2xl px-6 py-12">
            <h4 className="pt-6 opacity-90 leading-relaxed text-justify font-medium">
              Our Mission
            </h4>
            <p className="pt-6 opacity-90 leading-relaxed text-justify font-medium">
              At iLMiFY, our core values are the driving force behind everything
              we do. We prioritize creativity, collaboration, and integrity in
              every project. We believe in creating meaningful relationships
              with our clients and delivering solutions that not only meet
              expectations but exceed them. With a focus on innovation, we
              ensure that each project is a reflection of our dedication to
              quality and a passion for making a difference in the digital
              world.
            </p>
          </div>
          <div className="hover:bg-green-300 hover:rounded-2xl px-6 py-12">
            <h4 className="text-2xl md:text-3xl text-center font-semibold mb-3">
              Our Mission
            </h4>
            <p className="pt-6 opacity-90 leading-relaxed text-justify font-medium">
              Our approach is rooted in understanding. We take the time to
              listen to your unique needs and challenges, ensuring that we
              provide tailored solutions that align with your business
              objectives. Through a seamless blend of strategy, design, and
              technology, we bring your vision to life. Whether it’s a website,
              mobile app, or digital marketing campaign, we adopt a
              results-driven mindset that ensures every initiative contributes
              to your business growth and success.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
