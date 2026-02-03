"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { useGetTeamMembersQuery } from '@/redux/service/teamApi';
import { motion } from 'framer-motion';

export default function ScanResultPage() {
  const params = useParams();
  const employeeId = params.id as string;
  const { data: teamResponse, isLoading, error } = useGetTeamMembersQuery({ limit: 1000 });
  
  const [member, setMember] = useState<any>(null);

  useEffect(() => {
    if (teamResponse?.data) {
      const foundMember = teamResponse.data.find((m: any) => m.employeeId === employeeId);
      setMember(foundMember);
    }
  }, [teamResponse, employeeId]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0ddaa0]"></div>
      </div>
    );
  }

  if (error || (!isLoading && !member)) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4 text-center">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-4">
          <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Member Not Found</h1>
        <p className="text-slate-600">The employee ID "{decodeURIComponent(employeeId)}" does not exist or could not be loaded.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100"
      >
        <div className="relative h-32 bg-gradient-to-r from-[#0ddaa0] to-[#8ce064]">
          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
            <div className="w-32 h-32 rounded-2xl border-4 border-white shadow-lg overflow-hidden bg-white">
              {member.profilePhoto ? (
                <Image 
                  src={member.profilePhoto} 
                  alt={member.fullName} 
                  width={128} 
                  height={128} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="pt-20 pb-8 px-6 text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-1">{member.fullName}</h1>
          <p className="text-[#0ddaa0] font-semibold mb-4">{member.position}</p>
          
          <div className="flex justify-center gap-2 mb-6">
            <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-semibold">
              {member.department}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              member.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {member.status}
            </span>
          </div>

          <div className="space-y-4 text-left">
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
              <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-[#0ddaa0]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0h4" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase font-bold">Employee ID</p>
                <p className="font-semibold text-slate-900">{member.employeeId}</p>
              </div>
            </div>

            {member.email && (
              <a href={`mailto:${member.email}`} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl hover:bg-[#0ddaa0]/5 transition-colors group">
                <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-[#0ddaa0] group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-bold">Email</p>
                  <p className="font-semibold text-slate-900 truncate">{member.email}</p>
                </div>
              </a>
            )}

            {member.phone && (
              <a href={`tel:${member.phone}`} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl hover:bg-[#0ddaa0]/5 transition-colors group">
                <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-[#0ddaa0] group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-bold">Phone</p>
                  <p className="font-semibold text-slate-900">{member.phone}</p>
                </div>
              </a>
            )}
            
            {member.linkedin && (
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl hover:bg-[#0ddaa0]/5 transition-colors group">
                <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-[#0ddaa0] group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-bold">LinkedIn</p>
                  <p className="font-semibold text-slate-900 truncate">View Profile</p>
                </div>
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
