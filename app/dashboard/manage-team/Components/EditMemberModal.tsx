"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { TeamMember } from '@/redux/service/teamApi';

const DEPARTMENTS = [
  'Management',
  'Human Resources',
  'CMS',
  'Custom Development',
  'Shopify',
  'Finance',
  'Operations',
  'Marketing',
  'Graphics Design',
  'App Development',
];

interface FormDataState {
  name: string;
  fullName: string;
  position: string;
  avatar?: string | File;
  avatarPreview?: string;
  description: string;
  experience: string;
  department: string;
  email: string;
  phone: string;
  linkedin: string;
  skills: string;
}

interface EditMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: TeamMember | null;
  onSubmit: (formData: FormData) => Promise<void>;
}

export default function EditMemberModal({ 
  isOpen, 
  onClose, 
  member, 
  onSubmit 
}: EditMemberModalProps) {
  const [formData, setFormData] = useState<FormDataState>({
    name: '',
    fullName: '',
    position: '',
    avatar: '',
    avatarPreview: '',
    description: '',
    experience: '',
    department: '',
    email: '',
    phone: '',
    linkedin: '',
    skills: '',
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (member) {
      setFormData({
        name: member.name || '',
        fullName: member.fullName || '',
        position: member.position || '',
        avatar: member.profilePhoto || '',
        avatarPreview: member.profilePhoto || '',
        description: member.description || '',
        experience: String(member.experience || ''),
        department: member.department || '',
        email: member.email || '',
        phone: String(member.phone || ''),
        linkedin: member.linkedin || '',
        skills: member.skills?.join(', ') || '',
      });
    }
  }, [member]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          avatar: file,
          avatarPreview: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!member) return;
    
    setIsSubmitting(true);
    try {
      const submitData = new FormData();
      submitData.append('name', formData.name);
      submitData.append('fullName', formData.fullName || formData.name);
      submitData.append('position', formData.position);
      submitData.append('department', formData.department);
      submitData.append('experience', formData.experience);
      submitData.append('description', formData.description);
      submitData.append('email', formData.email);
      submitData.append('phone', formData.phone);
      submitData.append('linkedin', formData.linkedin);
      submitData.append('skills', formData.skills);
      submitData.append('status', member.status || 'ACTIVE');
      
      if (formData.avatar instanceof File) {
        submitData.append('profilePhoto', formData.avatar);
      }

      console.log("Edit form data prepared, calling onSubmit...");
      // Log FormData contents
      for (let pair of submitData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }

      await onSubmit(submitData);
    } catch (error) {
      console.error("Error in EditMemberModal:", error);
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

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
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col"
          >
            <div className="sticky top-0 flex justify-between items-center p-6 border-b-2 border-slate-200 bg-gradient-to-r from-[#0ddaa0]/10 to-[#8ce064]/10">
              <h2 className="text-2xl font-bold text-slate-900">Edit Member</h2>
              <motion.button 
                onClick={onClose} 
                type="button"
                className="p-2 hover:bg-slate-200 rounded-lg"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </div>
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
            <div className="p-6 space-y-3">
              {errorMessage && (
                <div className="p-4 bg-red-100 border-2 border-red-400 rounded-lg text-red-700 text-sm font-semibold">
                  {errorMessage}
                </div>
              )}
              
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Profile Photo</label>
                <div className="flex items-center gap-4">
                  <div onClick={() => fileInputRef.current?.click()} className="cursor-pointer">
                    <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-[#0ddaa0]/20 to-[#8ce064]/20 border-2 border-dashed border-[#0ddaa0] flex items-center justify-center overflow-hidden">
                      {formData.avatarPreview ? (
                        <Image 
                          height={80} 
                          width={80} 
                          src={formData.avatarPreview} 
                          alt="Preview" 
                          className="w-full h-full object-cover" 
                        />
                      ) : (
                        <svg className="w-8 h-8 text-[#0ddaa0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <div>
                    <button 
                      type="button" 
                      onClick={() => fileInputRef.current?.click()} 
                      className="text-xs font-medium text-[#0ddaa0] hover:text-[#8ce064]"
                    >
                      Change Photo
                    </button>
                  </div>
                  <input 
                    ref={fileInputRef} 
                    type="file" 
                    accept="image/*" 
                    onChange={handleAvatarUpload} 
                    className="hidden" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Full Name</label>
                  <input 
                    type="text" 
                    name="name" 
                    value={formData.name || ''} 
                    onChange={handleInputChange} 
                    className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-[#0ddaa0] text-sm" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Position</label>
                  <input 
                    type="text" 
                    name="position" 
                    value={formData.position || ''} 
                    onChange={handleInputChange} 
                    className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-[#0ddaa0] text-sm" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Email</label>
                  <input 
                    type="email" 
                    name="email" 
                    value={formData.email || ''} 
                    onChange={handleInputChange} 
                    className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-[#0ddaa0] text-sm" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Phone</label>
                  <input 
                    type="tel" 
                    name="phone" 
                    value={formData.phone || ''} 
                    onChange={handleInputChange} 
                    className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-[#0ddaa0] text-sm" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Department</label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className={`w-full px-4 py-2 rounded-lg font-semibold text-sm text-left border-2 flex items-center justify-between ${
                        isDropdownOpen ? 'bg-gradient-to-r from-[#0ddaa0] to-[#8ce064] text-white' : 'bg-white border-slate-200'
                      }`}
                    >
                      <span>{formData.department || 'Select'}</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </button>
                    <AnimatePresence>
                      {isDropdownOpen && (
                        <motion.div 
                          initial={{ opacity: 0, y: -10 }} 
                          animate={{ opacity: 1, y: 0 }} 
                          className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-slate-200 rounded-lg z-50 max-h-48 overflow-y-auto"
                        >
                          {DEPARTMENTS.map((dept) => (
                            <button 
                              key={dept} 
                              type="button" 
                              onClick={() => { 
                                setFormData((prev) => ({ ...prev, department: dept })); 
                                setIsDropdownOpen(false); 
                              }} 
                              className="w-full px-4 py-2 text-left text-sm hover:bg-slate-50"
                            >
                              {dept}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Experience</label>
                  <input 
                    type="text" 
                    name="experience" 
                    value={formData.experience || ''} 
                    onChange={handleInputChange} 
                    className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-[#0ddaa0] text-sm" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">LinkedIn Profile</label>
                <input 
                  type="url" 
                  name="linkedin" 
                  value={formData.linkedin || ''} 
                  onChange={handleInputChange} 
                  className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-[#0ddaa0] text-sm" 
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Skills (comma-separated)</label>
                <input 
                  type="text" 
                  name="skills" 
                  value={formData.skills || ''} 
                  onChange={handleInputChange} 
                  className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-[#0ddaa0] text-sm" 
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Description</label>
                <textarea 
                  name="description" 
                  value={formData.description || ''} 
                  onChange={handleInputChange} 
                  rows={3} 
                  className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-[#0ddaa0] text-sm resize-none" 
                />
              </div>

              <div className="flex gap-4 pt-4 border-t-2 border-slate-200">
                <button 
                  type="submit"
                  disabled={isSubmitting} 
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-[#0ddaa0] to-[#8ce064] text-white rounded-lg font-semibold disabled:opacity-50"
                >
                  {isSubmitting ? 'Updating...' : 'Update Member'}
                </button>
                <button 
                  type="button"
                  onClick={onClose} 
                  className="px-6 py-3 bg-slate-200 text-slate-900 rounded-lg font-semibold"
                >
                  Cancel
                </button>
              </div>
            </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}