import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";

export default function WeAre() {
  return (
    <div className="container mx-auto my-28  px-4 md:px-12 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      {/* Left Content */}
      <div>
        <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
          Who We Are &
          <br />
          What <span className="text-green-500">We Do</span>
        </h1>

        <div className="flex space-x-2 py-10">
          <div className="border-3 rounded-2xl border-green-500 w-3"></div>
          <div className="border-3 rounded-2xl border-green-500 w-10"></div>
        </div>

        <p className="mt-6 text-gray-600 text-sm leading-relaxed">
          At iLMiFY, we are a passionate team of designers, developers, and
          digital strategists committed to transforming businesses through
          innovative digital solutions. Our expertise spans web development,
          mobile app creation, branding, and digital marketing. We pride
          ourselves on building strong relationships with our clients,
          understanding their goals, and delivering results-driven experiences
          that drive success and growth.
        </p>
        <p className="mt-6 text-gray-600 text-sm leading-relaxed">
          We help businesses navigate the digital landscape by offering
          comprehensive services designed to elevate their online presence. From
          creating visually stunning websites and mobile applications to
          developing powerful branding strategies and executing digital
          marketing campaigns, we provide everything you need to stand out in
          today’s competitive market. At iLMiFY, we are dedicated to turning
          your ideas into impactful digital experiences that engage your
          audience and drive business success.
        </p>
      </div>

      {/* Right Image */}
      <div className="relative w-full h-[300px] md:h-[500px]">
        <Image
          src="/outside.jpg" // replace with your image path
          alt="Team discussion"
          fill
          className="object-cover rounded-lg"
          priority
        />
      </div>
    </div>
  );
}
