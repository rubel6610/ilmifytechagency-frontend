'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import TeamGridCard from './components/TeamGridCard';
import Image from 'next/image';
import Link from 'next/link';


export default function AllTeamMembersPage() {
  const [teamData, setTeamData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/team-data.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch team data');
        return res.json();
      })
      .then((data) => {
        setTeamData(data.team || data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (error) {
    return (
      <div className="w-full min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-2">Error loading team data</p>
          <p className="text-slate-400 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className=" max-w-400 mx-auto w-full min-h-screen mt-20 bg-white text-slate-900 overflow-x-hidden">
      {/* Subtle Background Gradient */}
      <div className="fixed top-0 left-0 w-full h-screen -z-10 opacity-40">
        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="w-full h-full"
          style={{
            background:
              'linear-gradient(135deg, rgba(13, 218, 160, 0.05), rgba(140, 224, 100, 0.05), rgba(2, 132, 199, 0.05))',
            backgroundSize: '400% 400%',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: 'spring' }}
          className="text-center pt-20 px-4 pb-16"
        >
       
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#0ddaa0] to-[#8ce064]">
            Our Complete Team
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-slate-600 max-w-2xl mx-auto"
          >
            Discover all the talented individuals who make ilmifyTech exceptional. Each team member brings unique expertise and passion to our mission.
          </motion.p>
        </motion.div>

        {/* Team Grid */}
        <div className="px-4 py-20 max-w-400 mx-auto">
          {loading ? (
            <div className="flex items-center justify-center min-h-96">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="w-12 h-12 border-4 border-slate-200 border-t-[#0ddaa0] rounded-full"
              />
            </div>
          ) : teamData.length === 0 ? (
            <div className="text-center text-slate-500">
              <p className="text-lg">No team members found</p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 "
            >
              {teamData.map((member, index) => (
                <TeamGridCard key={member.id} member={member} index={index} />
              ))}
            </motion.div>
          )}
        </div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center py-20 px-4 border-t border-slate-200"
        >
          <p className="text-slate-600 mb-6">Ready to join our amazing team?</p>
        <Link
            href="/careers"
        >
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: '0px 0px 25px 8px rgba(13, 218, 160, 0.2)',
            }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gradient-to-r from-[#0ddaa0] to-[#8ce064] text-white rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            View Opportunities
          </motion.button>
        </Link>
        </motion.div>
      </div>
    </div>
  );
}