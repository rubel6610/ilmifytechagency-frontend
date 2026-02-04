"use client";
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const DEPARTMENTS = [
  'MANAGEMENT',
  'HUMAN_RESOURCE',
  'CMS',
  'CUSTOM_DEVELOPMENT',
  'SHOPIFY',
  'MARKETING',
  'SALES',
  'SUPPORT',
];

interface FormDataState {
  employeeId: string;
  fullName: string;
  position: string;
  avatar: File | null;
  avatarPreview: string | null;
  description: string;
  experience: string;
  department: string;
  email: string;
  phone: string;
  linkedin: string;
  skills: string;
  startDate: string;
}

interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any, photo?: File) => Promise<void>;
  existingEmployeeIds: string[];
}

export default function AddMemberModal({ 
  isOpen, 
  onClose, 
  onSubmit,
  existingEmployeeIds
}: AddMemberModalProps) {
  const [formData, setFormData] = useState<FormDataState>({
    employeeId: '',
    fullName: '',
    position: '',
    avatar: null,
    avatarPreview: null,
    description: '',
    experience: '',
    department: '',
    email: '',
    phone: '',
    linkedin: '',
    skills: '',
    startDate: new Date().toISOString().split('T')[0],
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    if (name === 'employeeId') {
      if (value && existingEmployeeIds.includes(value)) {
        setErrorMessage('This Employee ID already exists');
      } else if (value && !/^iLM-C-\d+$/.test(value)) {
        setErrorMessage('Format must be iLM-C-[number]');
      } else {
        setErrorMessage('');
      }
    } else {
      setErrorMessage('');
    }
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
    if (!formData.employeeId.trim()) {
      setErrorMessage('Employee ID is required');
      return false;
    }
    const employeeIdRegex = /^iLM-C-\d+$/;
    if (!employeeIdRegex.test(formData.employeeId)) {
      setErrorMessage('Employee ID must follow the format iLM-C-[number] (e.g., iLM-C-63)');
      return false;
    }
    if (existingEmployeeIds.includes(formData.employeeId)) {
      setErrorMessage('This Employee ID already exists');
      return false;
    }
    if (!formData.fullName.trim()) {
      setErrorMessage('Full Name is required');
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
      const memberData = {
        employeeId: formData.employeeId,
        fullName: formData.fullName,
        position: formData.position,
        department: formData.department,
        experience: Number(formData.experience) || 0,
        description: formData.description,
        email: formData.email,
        phone: formData.phone,
        linkedin: formData.linkedin,
        skills: formData.skills.split(',').map(s => s.trim()).filter(s => s !== ''),
        startDate: formData.startDate,
        status: 'ACTIVE',
        active: true
      };

      await onSubmit(memberData, formData.avatar || undefined);
      
      // Reset form
      setFormData({
        employeeId: '',
        fullName: '',
        position: '',
        avatar: null,
        avatarPreview: null,
        description: '',
        experience: '',
        department: '',
        email: '',
        phone: '',
        linkedin: '',
        skills: '',
        startDate: new Date().toISOString().split('T')[0],
      });
      onClose();
    } catch (error) {
      console.error("Error in AddMemberModal:", error);
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
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col"
          >
            <div className="sticky top-0 flex justify-between items-center p-3 border-b-2 border-slate-200 bg-gradient-to-r from-[#0ddaa0]/10 to-[#8ce064]/10 z-10">
              <h2 className="text-2xl font-bold text-slate-900">Add Team Member</h2>
              <motion.button
                onClick={onClose}
                type="button"
                whileHover={{ scale: 1.1 }}
                className="p-2 hover:bg-slate-200 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </div>

            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
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
                <label className="block text-sm font-semibold text-slate-900 mb-1">Profile Photo</label>
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
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Employee ID</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      name="employeeId" 
                      value={formData.employeeId} 
                      onChange={handleInputChange} 
                      placeholder="e.g., iLM-C-63" 
                      className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none text-sm ${
                        formData.employeeId && existingEmployeeIds.includes(formData.employeeId)
                          ? 'border-red-300 focus:border-red-500 bg-red-50'
                          : formData.employeeId && /^iLM-C-\d+$/.test(formData.employeeId)
                            ? 'border-green-300 focus:border-green-500 bg-green-50'
                            : 'border-slate-200 focus:border-[#0ddaa0]'
                      }`} 
                    />
                    {formData.employeeId && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        {existingEmployeeIds.includes(formData.employeeId) ? (
                          <span className="text-[10px] font-bold text-red-600 uppercase">Already Exists</span>
                        ) : /^iLM-C-\d+$/.test(formData.employeeId) ? (
                          <span className="text-[10px] font-bold text-green-600 uppercase">Available</span>
                        ) : null}
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Start Date</label>
                  <input 
                    type="date" 
                    name="startDate" 
                    value={formData.startDate} 
                    onChange={handleInputChange} 
                    className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-[#0ddaa0] text-sm" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Full Name</label>
                  <input 
                    type="text" 
                    name="fullName" 
                    value={formData.fullName} 
                    onChange={handleInputChange} 
                    placeholder="e.g., Siam Hossen Rifat" 
                    className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-[#0ddaa0] text-sm" 
                  />
                </div>
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Email</label>
                  <input 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleInputChange} 
                    placeholder="e.g., john@example.com" 
                    className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-[#0ddaa0] text-sm" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Phone</label>
                  <input 
                    type="tel" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleInputChange} 
                    placeholder="e.g., +1234567890" 
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
                    placeholder="e.g., 10+ years or 10" 
                    className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-[#0ddaa0] text-sm" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">LinkedIn Profile</label>
                <input 
                  type="url" 
                  name="linkedin" 
                  value={formData.linkedin} 
                  onChange={handleInputChange} 
                  placeholder="e.g., https://linkedin.com/in/username" 
                  className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-[#0ddaa0] text-sm" 
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Skills (comma-separated)</label>
                <input 
                  type="text" 
                  name="skills" 
                  value={formData.skills} 
                  onChange={handleInputChange} 
                  placeholder="e.g., React, Node.js, TypeScript" 
                  className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-[#0ddaa0] text-sm" 
                />
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
                  type="submit"
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
                  type="button"
                  onClick={onClose} 
                  className="px-6 py-3 bg-slate-200 text-slate-900 rounded-lg font-semibold"
                >
                  Cancel
                </motion.button>
              </div>
            </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}