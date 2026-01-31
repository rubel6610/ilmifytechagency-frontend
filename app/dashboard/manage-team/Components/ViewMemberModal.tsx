"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { TeamMember } from '@/redux/service/teamApi';

interface ViewMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: TeamMember | null;
}

export default function ViewMemberModal({ 
  isOpen, 
  onClose, 
  member 
}: ViewMemberModalProps) {
  return (
    <AnimatePresence>
      {isOpen && member && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }} 
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" 
          onClick={onClose}
        >
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            exit={{ scale: 0.95, opacity: 0 }} 
            onClick={(e) => e.stopPropagation()} 
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full"
          >
            <div className="flex justify-between items-center p-6 border-b-2 border-slate-200 bg-gradient-to-r from-[#0ddaa0]/10 to-[#8ce064]/10">
              <h2 className="text-2xl font-bold text-slate-900">Member Details</h2>
              <motion.button 
                onClick={onClose} 
                whileHover={{ scale: 1.1 }} 
                className="p-2 hover:bg-slate-200 rounded-lg"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 rounded-lg overflow-hidden border-2 border-[#0ddaa0]">
                    {member.profilePhoto && (
                      <Image 
                        height={96} 
                        width={96} 
                        src={member.profilePhoto} 
                        alt={member.name} 
                        className="w-full h-full object-cover" 
                      />
                    )}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-slate-900">{member.name}</h3>
                  {member.fullName && member.fullName !== member.name && (
                    <p className="text-sm text-slate-500 font-medium">{member.fullName}</p>
                  )}
                  <p className="text-[#0ddaa0] font-semibold">{member.position}</p>
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
                    <p><span className="font-semibold text-slate-700">Department:</span> {member.department}</p>
                    <p><span className="font-semibold text-slate-700">Experience:</span> {member.experience} years</p>
                    {member.email && <p><span className="font-semibold text-slate-700">Email:</span> {member.email}</p>}
                    {member.phone && <p><span className="font-semibold text-slate-700">Phone:</span> {member.phone}</p>}
                    {member.linkedin && (
                      <p>
                        <span className="font-semibold text-slate-700">LinkedIn:</span>{' '}
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-[#0ddaa0] hover:underline">
                          Profile
                        </a>
                      </p>
                    )}
                    <p><span className="font-semibold text-slate-700">Status:</span> {member.status}</p>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Description</h4>
                <p className="text-slate-600">{member.description}</p>
              </div>
              {member.skills && member.skills.length > 0 && (
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {member.skills.map((skill, index) => (
                      <span 
                        key={index} 
                        className="px-3 py-1 bg-[#0ddaa0]/10 text-[#0ddaa0] rounded-full text-xs font-semibold"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}