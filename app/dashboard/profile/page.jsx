"use client";

import Image from "next/image";
import React from "react";
import { FaEdit, FaEnvelope, FaPhone, FaMapMarkerAlt, FaGlobe } from "react-icons/fa";

const ProfilePage = () => {
  // ১. ইউজার ডাটা অবজেক্ট (এখান থেকেই ম্যাপ করে ডেটা শো করা হচ্ছে)
  const userData = {
    name: "John Doe",
    role: "Senior UX/UI Designer",
    email: "john.doe@example.com",
    phone: "+1 307 269 6920",
    location: "New York, USA",
    website: "www.johndoe.com",
    bio: "Passionate designer with over 8 years of experience in creating user-centric digital products. Expert in Tailwind CSS, React, and Next.js.",
    stats: [
      { label: "Projects", value: "45" },
      { label: "Rating", value: "4.9" },
    ],
    skills: ["React", "Next.js", "Tailwind CSS", "Figma", "TypeScript"],
  };

  return (
    <div className="min-h-screen bg-white text-black py-10 px-5 md:px-10">
      <div className="max-w-4xl mx-auto">
        
        {/* ২. প্রোফাইল হেডার সেকশন */}
        <div className="flex flex-col md:flex-row items-center gap-8 border-b border-gray-100 pb-10">
          <div className="relative">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-[#35CB92] overflow-hidden shadow-xl">
              <Image
                src="/hero-2.png"
                width={200}
                height={200}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <button className="absolute bottom-2 right-2 bg-[#35CB92] text-white p-2 rounded-full shadow-lg hover:scale-110 transition">
              <FaEdit size={16} />
            </button>
          </div>

          <div className="text-center md:text-left flex-1">
            <h1 className="text-3xl md:text-4xl font-bold">{userData.name}</h1>
            <p className="text-[#35CB92] font-semibold text-lg">{userData.role}</p>
            <p className="mt-3 text-gray-500 leading-relaxed max-w-lg">
              {userData.bio}
            </p>
            
            {/* Stats Mapping */}
            <div className="flex justify-center md:justify-start gap-8 mt-6">
              {userData.stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="text-xl font-bold">{stat.value}</p>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ৩. কন্টেন্ট গ্রিড (Details and Skills) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">
          
          {/* ইনফরমেশন কার্ড */}
          <div className="md:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold border-l-4 border-[#35CB92] pl-4">Personal Information</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
                <FaEnvelope className="text-[#35CB92]" />
                <div>
                  <p className="text-xs text-gray-400">Email Address</p>
                  <p className="font-medium">{userData.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
                <FaPhone className="text-[#35CB92]" />
                <div>
                  <p className="text-xs text-gray-400">Phone Number</p>
                  <p className="font-medium">{userData.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
                <FaMapMarkerAlt className="text-[#35CB92]" />
                <div>
                  <p className="text-xs text-gray-400">Location</p>
                  <p className="font-medium">{userData.location}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
                <FaGlobe className="text-[#35CB92]" />
                <div>
                  <p className="text-xs text-gray-400">Website</p>
                  <p className="font-medium">{userData.website}</p>
                </div>
              </div>
            </div>
          </div>

          {/* ৪. স্কিল সেকশন */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold border-l-4 border-[#35CB92] pl-4">Expertise</h2>
            <div className="flex flex-wrap gap-2 pt-4">
              {userData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#35CB92] transition-colors cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;