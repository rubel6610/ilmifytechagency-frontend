"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import type { TeamMember } from "@/redux/service/teamApi";

interface Props {
  member: TeamMember;
  index: number;
}

export default function TeamGridCard({ member, index }: Props) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: (index % 4) * 0.08 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="rounded-xl border p-4 text-center bg-white hover:shadow-xl transition"
    >
      <div className="relative w-24 h-24 mx-auto mb-4">
        {member.avatar ? (
          <Image
            src={member.avatar}
            alt={member.name}
            fill
            className="rounded-full object-cover"
          />
        ) : (
          <div className="w-full h-full rounded-full bg-gradient-to-r from-[#0ddaa0] to-[#8ce064] flex items-center justify-center text-white font-bold">
            {member.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
        )}
      </div>

      <h3 className="font-bold text-sm">{member.name}</h3>
      <p className="text-xs text-[#0284c7] font-semibold">
        {member.position}
      </p>

      {member.department && (
        <span className="inline-block mt-2 text-xs px-3 py-1 rounded-full bg-[#0ddaa0]/10 text-[#0ddaa0]">
          {member.department}
        </span>
      )}

      <p className="text-xs text-slate-600 mt-3">
        {member.description}
      </p>

      <p className="text-xs font-bold mt-4 text-transparent bg-clip-text bg-gradient-to-r from-[#0ddaa0] to-[#8ce064]">
        {member.experience}
      </p>
    </motion.div>
  );
}
