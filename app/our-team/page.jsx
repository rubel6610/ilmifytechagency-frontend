"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import TeamMemberCard from "./components/TeamMemberCard";
import Link from "next/link";
// Main Component with Scroll Detection
export default function TeamPage() {
  const [teamData, setTeamData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleIndices, setVisibleIndices] = useState(new Set());
  const MotionLink = motion(Link);

  useEffect(() => {
    // Fetch team data from public/team-data.json
    fetch("/json/team-data.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch team data");
        return res.json();
      })
      .then((data) => {
        setTeamData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Scroll detection for showing cards one by one
  useEffect(() => {
    const handleScroll = () => {
      const cards = document.querySelectorAll("[data-card-index]");
      const newVisibleIndices = new Set();

      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        // If card is in viewport (65% from top), mark it as visible
        if (
          rect.top < window.innerHeight * 0.65 &&
          rect.bottom > window.innerHeight * 0.1
        ) {
          newVisibleIndices.add(index);
        }
      });

      setVisibleIndices(newVisibleIndices);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Call on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, [teamData.length]);

  if (error) {
    return (
      <div className="w-full min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-2">Error loading team data</p>
          <p className="text-slate-400 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
   <div className="w-full min-h-screen mt-20 bg-white text-slate-900 overflow-x-hidden">

      {/* Animated Background */}
    <div className="fixed top-0 left-0 w-full h-screen -z-10">
  <motion.div
    animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
    transition={{ duration: 25, repeat: Infinity, repeatType: "reverse" }}
    className="w-full h-full"
    style={{
      background:
        "linear-gradient(-45deg, #f0fdf4, #ecfeff, #f8fafc, #f0fdf4)",
      backgroundSize: "400% 400%",
    }}
  />
</div>


      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-center pt-20 px-4"
        >
         <h1 className="text-5xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#0ddaa0] via-[#8ce064] to-emerald-600">
  Our Team
</h1>

<motion.p className="text-lg text-slate-600 max-w-2xl mx-auto">
  Meet the talented people behind ilmifyTech.
</motion.p>
        </motion.div>

        {/* Team Timeline */}
        <div className="px-4 py-20 max-w-6xl mx-auto">
          {loading ? (
            <div className="flex items-center justify-center min-h-96">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 border-4 border-slate-600 border-t-[#0ddaa0] rounded-full"
              />
            </div>
          ) : teamData.length === 0 ? (
            <div className="text-center text-slate-400">
              <p>No team members found</p>
            </div>
          ) : (
            <div className="relative">
              {teamData.slice(0,4).map((member, index) => (
                <div key={member.id} data-card-index={index}>
                  <TeamMemberCard
                    member={member}
                    index={index}
                    isVisible={visibleIndices.has(index)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center pb-30   px-4"
        >
          <p className="text-slate-400 mb-6">Meet Our All Team Member</p>
          <Link href="/our-team/all-members">
            <motion.div
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 0px 25px 8px rgba(13, 218, 160, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-8 py-3 bg-gradient-to-r from-[#0ddaa0] to-[#8ce064] text-white rounded-lg font-semibold transition-all duration-300 hover:shadow-lg"
            >
              View All Members
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
