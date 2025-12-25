import Image from "next/image";
// import { Button } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import OurTeam from "@/components/about/OurTeam";
import SendQuestion from "@/components/about/SendQuestion";

export default function AboutPage() {
  return (
    <main className="w-full">

      {/* ===== Top Heading ===== */}
      <section className="py-10 text-center">
        <h2 className="text-green-500 font-medium">About Page</h2>
      </section>

      {/* ===== About Section ===== */}
      <section className="container mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Left Content */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight">
            We are a creative <br />
            web <span className="text-green-500">design</span> agency
          </h1>

          <p className="mt-6 text-gray-600 text-sm leading-relaxed">
            At ILMIFY, we transform ideas into visually compelling and
            user-friendly digital experiences. Our team focuses on innovation,
            creativity, and performance-driven solutions.
          </p>

          <Button className="mt-8 bg-green-500 hover:bg-green-600 text-white rounded-full px-8">
            Get Started
          </Button>
        </div>

        {/* Right Image */}
        <div className="relative w-full h-[300px] md:h-[360px]">
          <Image
            src="/team1.jpg" // replace with your image path
            alt="Team discussion"
            fill
            className="object-cover rounded-lg"
            priority
          />
        </div>
      </section>

      {/* ===== Vision & Mission Section ===== */}
      <section className="bg-gradient-to-r from-green-400 to-green-500 py-20 text-white">
        <div className="container mx-auto px-6">

          <h2 className="text-center text-3xl font-semibold">
            Our Visions Mission
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mt-14 text-sm">

            <div>
              <h4 className="font-semibold mb-3">Our Mission</h4>
              <p className="opacity-90 leading-relaxed">
                To empower businesses with innovative web solutions that
                drive growth, engagement, and digital success.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Our Vision</h4>
              <p className="opacity-90 leading-relaxed">
                To become a trusted digital agency recognized for creativity,
                reliability, and cutting-edge technology.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Our Values</h4>
              <p className="opacity-90 leading-relaxed">
                Integrity, collaboration, innovation, and continuous
                improvement guide everything we do.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Our Approach</h4>
              <p className="opacity-90 leading-relaxed">
                We follow a user-first, data-driven approach to deliver
                scalable and impactful digital products.
              </p>
            </div>

          </div>
        </div>
      </section>

      <OurTeam />
      <SendQuestion />

    </main>
  );
}
