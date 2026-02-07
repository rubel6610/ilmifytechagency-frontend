"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { TeamMember } from "@/redux/service/teamApi";

const DEPARTMENTS = [
  "MANAGEMENT",
  "HUMAN_RESOURCE",
  "CMS",
  "CUSTOM_DEVELOPMENT",
  "SHOPIFY",
  "MARKETING",
  "SALES",
  "SUPPORT",
];

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const DEPARTMENT_SKILLS: Record<string, string[]> = {
  MANAGEMENT: [
    "Leadership",
    "Strategic Planning",
    "Budgeting",
    "Team Management",
    "Decision Making",
    "Project Management",
    "Communication",
  ],
  HUMAN_RESOURCE: [
    "Recruitment",
    "Employee Relations",
    "Training & Development",
    "Performance Management",
    "HR Policies",
    "Compensation & Benefits",
    "Conflict Resolution",
  ],
  CMS: [
    "WordPress",
    "Content Strategy",
    "SEO",
    "Web Analytics",
    "UI/UX Design",
    "HTML/CSS",
    "JavaScript",
  ],
  CUSTOM_DEVELOPMENT: [
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "Python",
    "Java",
    "PHP",
    "Database Design",
    "API Development",
    "System Architecture",
  ],
  SHOPIFY: [
    "Shopify Development",
    "Liquid",
    "E-commerce",
    "Theme Customization",
    "App Integration",
    "Payment Gateways",
    "Store Optimization",
  ],
  MARKETING: [
    "Digital Marketing",
    "SEO/SEM",
    "Content Creation",
    "Social Media",
    "Analytics",
    "Email Marketing",
    "Campaign Management",
    "Brand Strategy",
  ],
  SALES: [
    "Negotiation",
    "Client Relations",
    "CRM",
    "Sales Strategy",
    "Prospecting",
    "Presentation Skills",
    "Market Research",
  ],
  SUPPORT: [
    "Customer Service",
    "Technical Support",
    "Troubleshooting",
    "Communication",
    "Problem Solving",
    "Product Knowledge",
    "Ticketing Systems",
  ],
};

interface FormDataState {
  employeeId: string;
  fullName: string;
  position: string;
  avatar: File | null;
  avatarPreview: string | null;
  memberDescription: string;
  companyDescription: string;
  experience: number;
  department: string;
  email: string;
  phone: string;
  linkedin: string;
  facebook: string;
  instagram: string;
  skills: string[];
  startDate: string;
  bloodGroup: string;
  status: "ACTIVE" | "INACTIVE";
  active: boolean;
}

export interface EditMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: TeamMember | null;
  onSubmit: (data: any, photo?: File) => Promise<void>;
  existingEmployeeIds: string[];
}

export default function EditMemberModal({
  isOpen,
  onClose,
  member,
  onSubmit,
  existingEmployeeIds,
}: EditMemberModalProps) {
  const [formData, setFormData] = useState<FormDataState>({
    employeeId: "",
    fullName: "",
    position: "",
    avatar: null,
    avatarPreview: null,
    memberDescription: "",
    companyDescription: "",
    experience: 0,
    department: "",
    email: "",
    phone: "",
    linkedin: "",
    facebook: "",
    instagram: "",
    skills: [],
    startDate: new Date().toISOString().split("T")[0],
    bloodGroup: "",
    status: member?.status || "ACTIVE",
    active: member?.active !== false,
  });

  const [availableSkills, setAvailableSkills] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isBloodGroupOpen, setIsBloodGroupOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Calculate experience based on start date
  useEffect(() => {
    if (formData.startDate) {
      const startDate = new Date(formData.startDate);
      const today = new Date();
      const diffTime = Math.abs(today.getTime() - startDate.getTime());
      const diffYears = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365.25));
      setFormData((prev) => ({ ...prev, experience: diffYears }));
    }
  }, [formData.startDate]);

  // Update available skills when department changes
  useEffect(() => {
    if (formData.department && DEPARTMENT_SKILLS[formData.department]) {
      setAvailableSkills(DEPARTMENT_SKILLS[formData.department]);
    } else {
      setAvailableSkills([]);
    }
  }, [formData.department]);

  // Load member data when modal opens
  useEffect(() => {
    if (member && isOpen) {
      setFormData({
        employeeId: member.employeeId || "",
        fullName: member.fullName || "",
        position: member.position || "",
        avatar: null,
        avatarPreview: member.profilePhoto || null,
        memberDescription: member.memberDescription || "",
        companyDescription: member.companyDescription || "",
        experience: member.experience || 0,
        department: member.department || "",
        email: member.email || "",
        phone: member.phone || "",
        linkedin: member.linkedin || "",
        facebook: member.facebook || "",
        instagram: member.instagram || "",
        skills: member.skills || [],
        startDate: member.startDate
          ? member.startDate.split("T")[0]
          : new Date().toISOString().split("T")[0],
        bloodGroup: member.bloodGroup || "",
        status: member.status || "ACTIVE",
        active: member.active !== false,
      });

      // Reset messages
      setErrorMessage("");
      setSuccessMessage("");
    }
  }, [member, isOpen]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "employeeId") {
      if (
        value &&
        member &&
        value !== member.employeeId &&
        existingEmployeeIds.includes(value)
      ) {
        setErrorMessage(
          "⚠️ This Employee ID is already taken by another member",
        );
      } else if (value && !/^iLM-C-\d+$/.test(value)) {
        setErrorMessage(
          "⚠️ Employee ID format should be iLM-C-[number] (e.g., iLM-C-63)",
        );
      } else {
        setErrorMessage("");
      }
    } else {
      // Clear error message when user fixes their input
      if (errorMessage) setErrorMessage("");
    }
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrorMessage("⚠️ File size should be less than 5MB");
        return;
      }

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
    setFormData((prev) => ({
      ...prev,
      department: dept,
      skills: [], // Clear selected skills when department changes
    }));
    setIsDropdownOpen(false);
  };

  const handleBloodGroupSelect = (group: string) => {
    setFormData((prev) => ({ ...prev, bloodGroup: group }));
    setIsBloodGroupOpen(false);
  };

  const handleSkillToggle = (skill: string) => {
    setFormData((prev) => {
      const currentSkills = [...prev.skills];

      if (currentSkills.includes(skill)) {
        // Remove skill if already selected
        return { ...prev, skills: currentSkills.filter((s) => s !== skill) };
      } else {
        // Add skill if not already selected and limit to 5
        if (currentSkills.length < 5) {
          return { ...prev, skills: [...currentSkills, skill] };
        }
      }
      return prev;
    });
  };

  const handleStatusToggle = () => {
    setFormData((prev) => ({
      ...prev,
      status: prev.status === "ACTIVE" ? "INACTIVE" : "ACTIVE",
      active: prev.status === "ACTIVE" ? false : true,
    }));
  };

  const validateForm = (): boolean => {
    // Clear previous messages
    setErrorMessage("");
    setSuccessMessage("");

    // Required field validation
    if (!formData.employeeId.trim()) {
      setErrorMessage("❌ Employee ID is required");
      return false;
    }

    const employeeIdRegex = /^iLM-C-\d+$/;
    if (!employeeIdRegex.test(formData.employeeId)) {
      setErrorMessage(
        "❌ Employee ID format should be iLM-C-[number] (e.g., iLM-C-63)",
      );
      return false;
    }

    if (
      member &&
      formData.employeeId !== member.employeeId &&
      existingEmployeeIds.includes(formData.employeeId)
    ) {
      setErrorMessage("❌ This Employee ID is already taken by another member");
      return false;
    }

    if (!formData.fullName.trim()) {
      setErrorMessage("❌ Full Name is required");
      return false;
    }

    if (!formData.department) {
      setErrorMessage("❌ Department is required");
      return false;
    }

    // Optional field validations (only if filled)
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrorMessage("⚠️ Please enter a valid email address (optional)");
      return false;
    }

    if (
      formData.linkedin &&
      !formData.linkedin.startsWith("https://linkedin.com/") &&
      !formData.linkedin.startsWith("https://www.linkedin.com/")
    ) {
      setErrorMessage(
        "⚠️ LinkedIn URL should start with https://linkedin.com/ or https://www.linkedin.com/",
      );
      return false;
    }

    if (
      formData.facebook &&
      !formData.facebook.startsWith("https://facebook.com/") &&
      !formData.facebook.startsWith("https://www.facebook.com/")
    ) {
      setErrorMessage(
        "⚠️ Facebook URL should start with https://facebook.com/ or https://www.facebook.com/",
      );
      return false;
    }

    if (
      formData.instagram &&
      !formData.instagram.startsWith("https://instagram.com/") &&
      !formData.instagram.startsWith("https://www.instagram.com/")
    ) {
      setErrorMessage(
        "⚠️ Instagram URL should start with https://instagram.com/ or https://www.instagram.com/",
      );
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!member || !validateForm()) return;

    setIsSubmitting(true);
    try {
      const memberData = {
        employeeId: formData.employeeId,
        fullName: formData.fullName,
        position: formData.position || "",
        department: formData.department,
        experience: formData.experience || 0,
        memberDescription: formData.memberDescription || "",
        companyDescription: formData.companyDescription || "",
        email: formData.email || "",
        phone: formData.phone || "",
        linkedin: formData.linkedin || "",
        facebook: formData.facebook || "",
        instagram: formData.instagram || "",
        skills: formData.skills || [],
        startDate: formData.startDate,
        bloodGroup: formData.bloodGroup || "",
        status: member.status || "ACTIVE",
        active: member.active !== false,
      };

      await onSubmit(memberData, formData.avatar || undefined);

      setSuccessMessage("✅ Team member updated successfully!");
      setTimeout(() => {
        onClose();
        setSuccessMessage("");
      }, 1500);
    } catch (error) {
      console.error("Error in EditMemberModal:", error);
      setErrorMessage(
        error instanceof Error
          ? `❌ ${error.message}`
          : "❌ An error occurred while updating member",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    if (member) {
      setFormData({
        employeeId: member.employeeId || "",
        fullName: member.fullName || "",
        position: member.position || "",
        avatar: null,
        avatarPreview: member.profilePhoto || null,
        memberDescription: member.memberDescription || "",
        companyDescription: member.companyDescription || "",
        experience: member.experience || 0,
        department: member.department || "",
        email: member.email || "",
        phone: member.phone || "",
        linkedin: member.linkedin || "",
        facebook: member.facebook || "",
        instagram: member.instagram || "",
        skills: member.skills || [],
        startDate: member.startDate
          ? member.startDate.split("T")[0]
          : new Date().toISOString().split("T")[0],
        bloodGroup: member.bloodGroup || "",
        status: member.status || "ACTIVE",
        active: member.active !== false,
      });
    }
    setErrorMessage("");
    setSuccessMessage("");
  };

  if (!member) return null;

  return (
    <AnimatePresence>
      {isOpen && member && (
        <motion.div
          data-lenis-prevent
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col"
          >
            <div className="sticky top-0 flex justify-between items-center p-3 border-b-2 border-slate-200 bg-gradient-to-r from-[#0ddaa0]/10 to-[#8ce064]/10 z-10">
              <h2 className="text-2xl font-bold text-slate-900">
                Edit Team Member
              </h2>
              <motion.button
                onClick={onClose}
                type="button"
                whileHover={{ scale: 1.1 }}
                className="p-2 hover:bg-slate-200 rounded-lg transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </motion.button>
            </div>

            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
              <div className="p-6 space-y-3">
                {/* Success Message */}
                {successMessage && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-4 bg-green-100 border-2 border-green-400 rounded-lg text-green-700 text-sm font-semibold flex items-center gap-2"
                  >
                    <span className="text-lg">✅</span>
                    {successMessage}
                  </motion.div>
                )}

                {/* Error Message */}
                {errorMessage && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`p-4 border-2 rounded-lg text-sm font-semibold flex items-center gap-2 ${
                      errorMessage.startsWith("❌")
                        ? "bg-red-100 border-red-400 text-red-700"
                        : "bg-yellow-100 border-yellow-400 text-yellow-700"
                    }`}
                  >
                    <span className="text-lg">
                      {errorMessage.startsWith("❌") ? "❌" : "⚠️"}
                    </span>
                    {errorMessage.slice(2)}
                  </motion.div>
                )}

                {/* Profile Photo */}
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-1">
                    Profile Photo{" "}
                    <span className="text-slate-500 font-normal">
                      (Optional)
                    </span>
                  </label>
                  <div className="flex items-center gap-4">
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="cursor-pointer"
                    >
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
                          <svg
                            className="w-8 h-8 text-[#0ddaa0]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M12 4v16m8-8H4"
                            />
                          </svg>
                        )}
                      </motion.div>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-700">
                        Current Photo
                      </p>
                      <p className="text-xs text-slate-500">
                        Click to change photo (max 5MB)
                      </p>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="mt-2 text-xs font-medium text-[#0ddaa0] hover:text-[#8ce064]"
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

                {/* Required Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Employee ID <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="employeeId"
                        value={formData.employeeId}
                        onChange={handleInputChange}
                        placeholder="e.g., iLM-C-63"
                        required
                        className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none text-sm ${
                          formData.employeeId &&
                          formData.employeeId !== member.employeeId &&
                          existingEmployeeIds.includes(formData.employeeId)
                            ? "border-red-300 focus:border-red-500 bg-red-50"
                            : formData.employeeId &&
                                /^iLM-C-\d+$/.test(formData.employeeId)
                              ? "border-green-300 focus:border-green-500 bg-green-50"
                              : "border-slate-200 focus:border-[#0ddaa0]"
                        }`}
                      />
                      {formData.employeeId && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          {formData.employeeId !== member.employeeId &&
                          existingEmployeeIds.includes(formData.employeeId) ? (
                            <span className="text-[10px] font-bold text-red-600 uppercase">
                              ✗ Taken
                            </span>
                          ) : /^iLM-C-\d+$/.test(formData.employeeId) ? (
                            <span className="text-[10px] font-bold text-green-600 uppercase">
                              ✓ Available
                            </span>
                          ) : null}
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      Format: iLM-C-[number]
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="e.g., Siam Hossen Rifat"
                      required
                      className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-[#0ddaa0] text-sm"
                    />
                  </div>
                </div>

                {/* Optional Fields - Row 1 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Position{" "}
                      <span className="text-slate-500 font-normal">
                        (Optional)
                      </span>
                    </label>
                    <input
                      type="text"
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      placeholder="e.g., Founder & CEO"
                      className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-[#0ddaa0] text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Department <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className={`w-full px-4 py-2 rounded-lg font-semibold text-sm text-left border-2 flex items-center justify-between ${
                          isDropdownOpen
                            ? "bg-gradient-to-r from-[#0ddaa0] to-[#8ce064] text-white border-[#0ddaa0]"
                            : "bg-white border-slate-200 text-slate-900"
                        }`}
                      >
                        <span>
                          {formData.department || "Select Department"}
                        </span>
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 14l-7 7m0 0l-7-7m7 7V3"
                          />
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
                                className={`w-full px-4 py-2 text-left text-sm transition-colors ${formData.department === dept ? "bg-[#0ddaa0]/10 text-[#0ddaa0] border-l-4 border-[#0ddaa0]" : "text-slate-700 hover:bg-slate-50"}`}
                              >
                                {dept}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>

                {/* Optional Fields - Row 2 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Email{" "}
                      <span className="text-slate-500 font-normal">
                        (Optional)
                      </span>
                    </label>
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
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Phone{" "}
                      <span className="text-slate-500 font-normal">
                        (Optional)
                      </span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g., +1234567890"
                      className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-[#0ddaa0] text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Blood Group{" "}
                      <span className="text-slate-500 font-normal">
                        (Optional)
                      </span>
                    </label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setIsBloodGroupOpen(!isBloodGroupOpen)}
                        className={`w-full px-4 py-2 rounded-lg font-semibold text-sm text-left border-2 flex items-center justify-between ${
                          isBloodGroupOpen
                            ? "bg-gradient-to-r from-[#0ddaa0] to-[#8ce064] text-white border-[#0ddaa0]"
                            : "bg-white border-slate-200 text-slate-900"
                        }`}
                      >
                        <span>
                          {formData.bloodGroup || "Select Blood Group"}
                        </span>
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 14l-7 7m0 0l-7-7m7 7V3"
                          />
                        </svg>
                      </button>
                      <AnimatePresence>
                        {isBloodGroupOpen && (
                          <motion.div
                            data-lenis-prevent
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-slate-200 rounded-lg shadow-xl z-50 max-h-48 overflow-y-auto"
                          >
                            {BLOOD_GROUPS.map((group) => (
                              <button
                                key={group}
                                type="button"
                                onClick={() => handleBloodGroupSelect(group)}
                                className={`w-full px-4 py-2 text-left text-sm transition-colors ${formData.bloodGroup === group ? "bg-[#0ddaa0]/10 text-[#0ddaa0] border-l-4 border-[#0ddaa0]" : "text-slate-700 hover:bg-slate-50"}`}
                              >
                                {group}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>

                {/* Social Media Links */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      LinkedIn{" "}
                      <span className="text-slate-500 font-normal">
                        (Optional)
                      </span>
                    </label>
                    <input
                      type="url"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleInputChange}
                      placeholder="https://linkedin.com/in/username"
                      className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-[#0ddaa0] text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Facebook{" "}
                      <span className="text-slate-500 font-normal">
                        (Optional)
                      </span>
                    </label>
                    <input
                      type="url"
                      name="facebook"
                      value={formData.facebook}
                      onChange={handleInputChange}
                      placeholder="https://facebook.com/username"
                      className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-[#0ddaa0] text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Instagram{" "}
                      <span className="text-slate-500 font-normal">
                        (Optional)
                      </span>
                    </label>
                    <input
                      type="url"
                      name="instagram"
                      value={formData.instagram}
                      onChange={handleInputChange}
                      placeholder="https://instagram.com/username"
                      className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-[#0ddaa0] text-sm"
                    />
                  </div>
                </div>

                {/* Joining Date & Experience */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Joining Date{" "}
                      <span className="text-slate-500 font-normal">
                        (Optional)
                      </span>
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-[#0ddaa0] text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Experience{" "}
                      <span className="text-slate-500 font-normal">
                        (Auto-calculated)
                      </span>
                    </label>
                    <div className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg bg-slate-50 text-sm text-slate-700">
                      {formData.experience}{" "}
                      {formData.experience === 1 ? "year" : "years"} (calculated
                      from joining date)
                    </div>
                  </div>
                </div>

                {/* Skills Section */}
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Skills{" "}
                    <span className="text-slate-500 font-normal">
                      (Optional, max 5)
                    </span>
                  </label>

                  {/* Department Skills Preview */}
                  {formData.department && availableSkills.length > 0 && (
                    <div className="mb-3">
                      <p className="text-xs font-medium text-slate-600 mb-2">
                        Suggested skills for {formData.department}:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {availableSkills.map((skill) => (
                          <motion.button
                            key={skill}
                            type="button"
                            onClick={() => handleSkillToggle(skill)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                              formData.skills.includes(skill)
                                ? "bg-gradient-to-r from-[#0ddaa0] to-[#8ce064] text-white"
                                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                            }`}
                          >
                            {skill}
                            {formData.skills.includes(skill) && (
                              <span className="ml-1.5">✓</span>
                            )}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Descriptions */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Member Description{" "}
                      <span className="text-slate-500 font-normal">
                        (Optional)
                      </span>
                    </label>
                    <textarea
                      name="memberDescription"
                      value={formData.memberDescription}
                      onChange={handleInputChange}
                      placeholder="Member's personal comment or self-description..."
                      rows={2}
                      className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-[#0ddaa0] text-sm resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Company Description{" "}
                      <span className="text-slate-500 font-normal">
                        (Optional)
                      </span>
                    </label>
                    <textarea
                      name="companyDescription"
                      value={formData.companyDescription}
                      onChange={handleInputChange}
                      placeholder="Company's official description about the member..."
                      rows={2}
                      className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-[#0ddaa0] text-sm resize-none"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
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
                        Updating...
                      </>
                    ) : (
                      "Update Member"
                    )}
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={handleResetForm}
                    whileHover={{ scale: 1.05 }}
                    className="px-6 py-3 bg-slate-200 text-slate-900 rounded-lg font-semibold"
                  >
                    Reset
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-3 bg-red-100 text-red-700 rounded-lg font-semibold hover:bg-red-200"
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
