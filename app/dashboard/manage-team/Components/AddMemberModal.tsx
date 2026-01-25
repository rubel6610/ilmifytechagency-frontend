"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { AddMemberFormData } from '../page';

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

interface FormData {
  name: string;
  position: string;
  avatar: File | null;
  avatarPreview: string | null;
  description: string;
  experience: string;
  department: string;
}

interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: AddMemberFormData) => Promise<void>;
}

export default function AddMemberModal({ 
  isOpen, 
  onClose, 
  onSubmit 
}: AddMemberModalProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    position: '',
    avatar: null,
    avatarPreview: null,
    description: '',
    experience: '',
    department: '',
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrorMessage('');
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

  const handleDepartmentSelect = (dept: string) => {
    setFormData((prev) => ({ ...prev, department: dept }));
    setIsDropdownOpen(false);
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      setErrorMessage('Name is required');
      return false;
    }
    if (!formData.position.trim()) {
      setErrorMessage('Position is required');
      return false;
    }
    if (!formData.description.trim()) {
      setErrorMessage('Description is required');
      return false;
    }
    if (!formData.experience.trim()) {
      setErrorMessage('Experience is required');
      return false;
    }
    if (!formData.department) {
      setErrorMessage('Department is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await onSubmit(formData as AddMemberFormData);
      setFormData({
        name: '',
        position: '',
        avatar: null,
        avatarPreview: null,
        description: '',
        experience: '',
        department: '',
      });
      onClose(); // Close modal after successful submission
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
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
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="sticky top-0 flex justify-between items-center p-6 border-b-2 border-slate-200 bg-gradient-to-r from-[#0ddaa0]/10 to-[#8ce064]/10 z-10">
              <h2 className="text-2xl font-bold text-slate-900">Add Team Member</h2>
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.1 }}
                className="p-2 hover:bg-slate-200 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </div>

            <div className="p-6 space-y-3">
              {errorMessage && (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  className="p-4 bg-red-100 border-2 border-red-400 rounded-lg text-red-700 text-sm font-semibold"
                >
                  {errorMessage}
                </motion.div>
              )}

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-3">Profile Photo</label>
                <div className="flex items-center gap-4">
                  <div onClick={() => fileInputRef.current?.click()} className="cursor-pointer">
                    <motion.div 
                      whileHover={{ scale: 1.05 }} 
                      className="w-20 h-20 rounded-lg bg-gradient-to-br from-[#0ddaa0]/20 to-[#8ce064]/20 border-2 border-dashed border-[#0ddaa0] flex items-center justify-center overflow-hidden"
                    >
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
                    </motion.div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-700">Upload Photo</p>
                    <p className="text-xs text-slate-500">JPG, PNG — max 5MB</p>
                    <button 
                      type="button" 
                      onClick={() => fileInputRef.current?.click()} 
                      className="mt-2 text-xs font-medium text-[#0ddaa0] hover:text-[#8ce064]"
                    >
                      Choose Photo
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
                    value={formData.name} 
                    onChange={handleInputChange} 
                    placeholder="e.g., Saruar Jahan" 
                    className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-[#0ddaa0] text-sm" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Position</label>
                  <input 
                    type="text" 
                    name="position" 
                    value={formData.position} 
                    onChange={handleInputChange} 
                    placeholder="e.g., Founder & CEO" 
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
                        isDropdownOpen ? 'bg-gradient-to-r from-[#0ddaa0] to-[#8ce064] text-white border-[#0ddaa0]' : 'bg-white border-slate-200 text-slate-900'
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
                          data-lenis-prevent 
                          initial={{ opacity: 0, y: -10 }} 
                          animate={{ opacity: 1, y: 0 }} 
                          exit={{ opacity: 0, y: -10 }} 
                          className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-slate-200 rounded-lg shadow-xl z-50 max-h-48 overflow-y-auto"
                        >
                          {DEPARTMENTS.map((dept) => (
                            <button 
                              key={dept} 
                              type="button" 
                              onClick={() => handleDepartmentSelect(dept)} 
                              className={`w-full px-4 py-2 text-left text-sm transition-colors ${formData.department === dept ? 'bg-[#0ddaa0]/10 text-[#0ddaa0] border-l-4 border-[#0ddaa0]' : 'text-slate-700 hover:bg-slate-50'}`}
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
                    value={formData.experience} 
                    onChange={handleInputChange} 
                    placeholder="e.g., 10+ years" 
                    className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-[#0ddaa0] text-sm" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Description</label>
                <textarea 
                  name="description" 
                  value={formData.description} 
                  onChange={handleInputChange} 
                  placeholder="Brief description..." 
                  rows={3} 
                  className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-[#0ddaa0] text-sm resize-none" 
                />
              </div>

              <div className="flex gap-4 pt-4 border-t-2 border-slate-200">
                <motion.button 
                  onClick={handleSubmit} 
                  disabled={isSubmitting} 
                  whileHover={{ scale: 1.05 }} 
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-[#0ddaa0] to-[#8ce064] text-white rounded-lg font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <motion.div 
                        animate={{ rotate: 360 }} 
                        transition={{ duration: 1, repeat: Infinity }} 
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full" 
                      />
                      Adding...
                    </>
                  ) : (
                    'Add Member'
                  )}
                </motion.button>
                <motion.button 
                  onClick={onClose} 
                  className="px-6 py-3 bg-slate-200 text-slate-900 rounded-lg font-semibold"
                >
                  Cancel
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}