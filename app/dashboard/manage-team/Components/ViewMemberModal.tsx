"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { TeamMember } from '@/redux/service/teamApi';
import QRCode from "react-qr-code";

export interface ViewMemberModalProps {
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
        data-lenis-prevent
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
           className="bg-white rounded-2xl shadow-2xl w-full max-w-md sm:max-w-lg md:max-w-2xl max-h-[90vh] overflow-y-auto"

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
                        alt={member.fullName} 
                        className="w-full h-full object-cover" 
                      />
                    )}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-slate-900">{member.fullName}</h3>
                  <p className="text-[#0ddaa0] font-semibold">{member.position}</p>
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
                    <p><span className="font-semibold text-slate-700">Employee ID:</span> {member.employeeId}</p>
                    <p><span className="font-semibold text-slate-700">Department:</span> {member.department}</p>
                    <p><span className="font-semibold text-slate-700">Experience:</span> {member.experience} years</p>
                    {member.startDate && <p><span className="font-semibold text-slate-700">Start Date:</span> {new Date(member.startDate).toLocaleDateString()}</p>}
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
                <p className="text-slate-600">{member.memberDescription}</p>
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
              
              <div className="border-t-2 border-slate-100 pt-6 mt-6">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="bg-white p-4 rounded-xl shadow-lg border-2 border-slate-100">
                    <QRCode
                      value={`${typeof window !== 'undefined' ? window.location.origin : ''}/scan/${member.employeeId}`}
                      size={128}
                      style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                      viewBox={`0 0 256 256`}
                    />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h4 className="text-lg font-bold text-slate-900 mb-2">Employee ID Card</h4>
                    <p className="text-slate-600 mb-4 text-sm">Scan this QR code to view the full digital profile of {member.fullName}.</p>
                
                  </div>
                </div>
              </div>
            </div>

            {/* Printable Area - Hidden on Screen */}
            <div className="hidden print:flex print:fixed print:inset-0 print:z-[100] print:bg-white print:items-center print:justify-center p-8 flex-col text-center">
              <h1 className="text-4xl font-bold text-slate-900 mb-2">{member.fullName}</h1>
              <p className="text-xl text-slate-600 mb-8 font-mono">{member.employeeId}</p>
              <div className="w-[400px] h-[400px] mx-auto border-4 border-slate-900 p-4 rounded-xl">
                <QRCode
                  value={`${typeof window !== 'undefined' ? window.location.origin : ''}/scan/${member.employeeId}`}
                  size={256}
                  style={{ height: "100%", maxWidth: "100%", width: "100%" }}
                  viewBox={`0 0 256 256`}
                />
              </div>
              <p className="mt-8 text-xl text-slate-500">Scan to view profile</p>
              <style jsx global>{`
                @media print {
                  body * {
                    visibility: hidden;
                  }
                  .print\\:flex, .print\\:flex * {
                    visibility: visible;
                  }
                  .print\\:fixed {
                    position: fixed;
                    left: 0;
                    top: 0;
                    width: 100vw;
                    height: 100vh;
                  }
                }
              `}</style>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}