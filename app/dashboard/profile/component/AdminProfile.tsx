"use client";

import Image from "next/image";
import React from "react";
import { FaEdit, FaEnvelope, FaPhone, FaMapMarkerAlt, FaGlobe } from "react-icons/fa";

interface UserData {
  name: string;
  role: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  bio?: string; // optional
  skills: string[];
}

const AdminProfile = () => {
  const userData: UserData = {
    name: "John Doe",
    role: "Admin",
    email: "john.doe@example.com",
    phone: "+1 307 269 6920",
    location: "New York, USA",
    website: "www.johndoe.com",
    // bio: "A passionate full-stack developer with 5+ years of experience...", // uncomment if needed
    skills: ["React", "Next.js", "Tailwind CSS", "Figma", "TypeScript"],
  };

  return (
    <div className="min-h-screen text-black py-10 px-5 md:px-10">
      <div className="max-w-4xl mx-auto">
        
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
            <button 
              className="absolute bottom-2 right-2 bg-[#35CB92] text-white p-2 rounded-full shadow-lg hover:scale-110 transition"
              aria-label="Edit profile picture"
            >
              <FaEdit size={16} />
            </button>
          </div>

          <div className="text-center md:text-left flex-1">
            <h1 className="text-3xl md:text-4xl font-bold">{userData.name}</h1>
            <p className="text-[#35CB92] font-semibold text-lg">{userData.role}</p>
            {userData.bio && (
              <p className="mt-3 text-gray-500 leading-relaxed max-w-lg">
                {userData.bio}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">
          <div className="md:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold border-l-4 border-[#35CB92] pl-4">Personal Information</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
                <FaEnvelope className="text-[#35CB92] text-lg" />
                <div>
                  <p className="text-xs text-gray-400">Email Address</p>
                  <p className="font-medium">{userData.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
                <FaPhone className="text-[#35CB92] text-lg" />
                <div>
                  <p className="text-xs text-gray-400">Phone Number</p>
                  <p className="font-medium">{userData.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
                <FaMapMarkerAlt className="text-[#35CB92] text-lg" />
                <div>
                  <p className="text-xs text-gray-400">Location</p>
                  <p className="font-medium">{userData.location}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
                <FaGlobe className="text-[#35CB92] text-lg" />
                <div>
                  <p className="text-xs text-gray-400">Website</p>
                  <p className="font-medium">{userData.website}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Skills Section (optional) */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold border-l-4 border-[#35CB92] pl-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {userData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-[#35CB92]/10 text-[#35CB92] rounded-full text-sm font-medium"
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

export default AdminProfile;