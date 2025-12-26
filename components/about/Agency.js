import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";

export default function Agency() {
  return (
    <div className="container mx-auto my-28  px-4 md:px-12 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-[#F9F9F9]">
      {/* Left Content */}
      <div>
        <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
          We are a creative <br />
          web <span className="text-green-500">design agency</span>
        </h1>
        <div className="flex space-x-2 py-10">
          <div className="border-3 rounded-2xl border-green-500 w-3"></div>
          <div className="border-3 rounded-2xl border-green-500 w-10"></div>
        </div>

        <p className=" text-gray-600 leading-relaxed">
          At iLMiFY, we transform ideas into powerful digital solutions. Our
          team of creative designers, skilled developers, and strategic
          marketers works together to deliver modern websites, mobile apps,
          branding, and digital marketing services that help businesses grow and
          stand out.
        </p>
        <p className="mt-6 text-gray-600 leading-relaxed">
          We believe in innovation, transparency, and results. Every project is
          a partnership, where we focus on understanding your goals and turning
          them into impactful digital experiences. With iLMiFY by your side, you
          don’t just get a service. You gain a trusted technology partner for
          your business success.
        </p>

        <Button className="mt-8 bg-green-500 hover:bg-green-600 text-white rounded-full px-8 py-6">
          GET IN TOUCH
        </Button>
      </div>

      {/* Right Image */}
      <div className="relative w-full h-[300px] md:h-[400px]">
        <Image
          src="/team1.jpg" // replace with your image path
          alt="Team discussion"
          fill
          className="object-cover rounded-lg"
          priority
        />
      </div>
    </div>
  );
}
