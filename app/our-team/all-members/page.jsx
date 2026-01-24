'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TeamGridCard from './components/TeamGridCard';
import Link from 'next/link';

export default function AllTeamMembersPage() {
  const [teamData, setTeamData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [departments, setDepartments] = useState(['All']);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    fetch('/json/team-data.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch team data');
        return res.json();
      })
      .then((data) => {
        const team = data.team || data;
        setTeamData(team);

        // Extract unique departments
        const uniqueDepts = ['All', ...new Set(team.map((member) => member.department))];
        setDepartments(uniqueDepts.filter(Boolean));
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter team members based on selected department
  const filteredTeamData =
    selectedDepartment === 'All'
      ? teamData
      : teamData.filter((member) => member.department === selectedDepartment);

  const handleDepartmentSelect = (dept) => {
    setSelectedDepartment(dept);
    setIsDropdownOpen(false);
  };

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
    <div className="max-w-full mx-auto w-full min-h-screen mt-20 bg-white text-slate-900 overflow-x-hidden">
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

        {/* Department Filter Dropdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="px-4 py-8 max-w-400 mx-auto"
        >
          <div className="flex flex-row-reverse justify-between items-center gap-6 ">
            {/* Dropdown Filter */}
            <div className="flex items-center gap-4 flex-wrap justify-center">
              <span className="text-sm font-semibold text-slate-700">Filter by Department:</span>
              
              {/* Custom Dropdown */}
              <div className="relative w-full sm:w-auto" ref={dropdownRef}>
                <motion.button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full sm:w-64 px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center justify-between border-2 ${
                    isDropdownOpen
                      ? 'bg-gradient-to-r from-[#0ddaa0] to-[#8ce064] text-white border-[#0ddaa0] shadow-lg'
                      : 'bg-white border-slate-200 text-slate-900 hover:border-[#0ddaa0]'
                  }`}
                >
                  <span>{selectedDepartment}</span>
                  <motion.svg
                    animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </motion.svg>
                </motion.button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-slate-200 rounded-lg shadow-xl z-50 overflow-hidden"
                    >
                      {departments.map((dept, index) => (
                        <motion.button
                          key={dept}
                          onClick={() => handleDepartmentSelect(dept)}
                          whileHover={{ backgroundColor: 'rgba(13, 218, 160, 0.1)' }}
                          className={`w-full px-6 py-3 text-left font-semibold text-sm transition-all duration-200 flex items-center justify-between ${
                            selectedDepartment === dept
                              ? 'bg-gradient-to-r from-[#0ddaa0]/10 to-[#8ce064]/10 text-[#0ddaa0] border-l-4 border-[#0ddaa0]'
                              : 'text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <span>{dept}</span>
                          {selectedDepartment === dept && (
                            <motion.svg
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-5 h-5 text-[#0ddaa0]"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </motion.svg>
                          )}
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Results Count */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <p className="text-sm text-slate-600">
                Total <span className="font-bold text-[#0ddaa0]">{filteredTeamData.length}</span> team{' '}
                {filteredTeamData.length === 1 ? 'member' : 'members'}
                {selectedDepartment !== 'All' && (
                  <span> in <span className="font-bold text-slate-900">{selectedDepartment}</span></span>
                )}
              </p>
            </motion.div>
          </div>
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
          ) : filteredTeamData.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-center text-slate-500 py-20"
            >
              <p className="text-lg">No team members found in this department</p>
            </motion.div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedDepartment}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {filteredTeamData.map((member, index) => (
                  <TeamGridCard
                    key={member.id}
                    member={member}
                    index={index}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
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
          <Link href="/careers">
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