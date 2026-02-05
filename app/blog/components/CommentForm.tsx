"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CommentFormProps {
  postId?: string | number | null;
  postTitle?: string;
  onCommentSubmitted?: (data: any) => void;
  apiEndpoint?: string;
}

interface FormData {
  name: string;
  email: string;
  website: string;
  comment: string;
  saveInfo: boolean;
}

interface ValidationErrors {
  name?: string;
  email?: string;
  website?: string;
  comment?: string;
}

// Add this at the top (after imports)
interface FormData {
  name: string;
  email: string;
  website: string;
  comment: string;
  saveInfo: boolean;
}

type StringField = 'name' | 'email' | 'website' | 'comment';
// or:
// type StringField = Exclude<keyof FormData, 'saveInfo'>;

export default function CommentForm({
  postId = null,
  postTitle = "",
  onCommentSubmitted,
  apiEndpoint = "/api/comments",
}: CommentFormProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    website: "",
    comment: "",
    saveInfo: false,
  });
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

  // Load saved info from localStorage on mount
  useEffect(() => {
    const savedInfo = localStorage.getItem("commentFormInfo");
    if (savedInfo) {
      try {
        const parsed = JSON.parse(savedInfo);
        setFormData((prev) => ({
          ...prev,
          name: parsed.name || "",
          email: parsed.email || "",
          website: parsed.website || "",
          saveInfo: true,
        }));
      } catch (e) {
        console.error("Error parsing saved info:", e);
      }
    }
  }, []);

const handleInputChange = (field: StringField, value: string) => {
  setFormData((prev) => ({ ...prev, [field]: value }));
  if (validationErrors[field]) {
    setValidationErrors((prev) => ({ ...prev, [field]: undefined }));
  }
  if (error) setError(null);
};

  // Validation function
  const validateForm = (): boolean => {
    const errors: ValidationErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      errors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    // Website validation (optional but must be valid if provided)
    if (formData.website.trim()) {
      try {
        new URL(formData.website.startsWith("http") ? formData.website : `https://${formData.website}`);
      } catch {
        errors.website = "Please enter a valid URL";
      }
    }

    // Comment validation
    if (!formData.comment.trim()) {
      errors.comment = "Comment is required";
    } else if (formData.comment.trim().length < 3) {
      errors.comment = "Comment must be at least 3 characters";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Prepare the payload
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        website: formData.website.trim() || null,
        comment: formData.comment.trim(),
        postId: postId,
        postTitle: postTitle,
        submittedAt: new Date().toISOString(),
        userAgent: typeof window !== "undefined" ? window.navigator.userAgent : null,
      };

      // Send to backend API
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit comment");
      }

      // Save info to localStorage if checkbox is checked
      if (formData.saveInfo) {
        localStorage.setItem(
          "commentFormInfo",
          JSON.stringify({
            name: formData.name,
            email: formData.email,
            website: formData.website,
          })
        );
      } else {
        localStorage.removeItem("commentFormInfo");
      }

      setSuccess(true);
      
      // Reset form (keep saved info if checkbox was checked)
      setFormData((prev) => ({
        name: prev.saveInfo ? prev.name : "",
        email: prev.saveInfo ? prev.email : "",
        website: prev.saveInfo ? prev.website : "",
        comment: "",
        saveInfo: prev.saveInfo,
      }));

      // Callback for parent component
      if (onCommentSubmitted) {
        onCommentSubmitted(data);
      }

      // Hide success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);

    } catch (err) {
      console.error("Comment submission error:", err);
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const inputFields = [
    {
      name: "name",
      label: "Your Name",
      type: "text",
      required: true,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
    {
      name: "email",
      label: "Email Address",
      type: "email",
      required: true,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      name: "website",
      label: "Website (optional)",
      type: "url",
      required: false,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      ),
    },
  ];

  return (
    <div className="relative py-16 px-0 md:px-1 lg:px-2">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-teal-200/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-lime-200/20 to-green-200/20 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative max-w-3xl mx-auto"
      >
        {/* Main Card */}
        <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-3 md:p-12 shadow-[0_20px_80px_-20px_rgba(16,185,129,0.15)] border border-white/60 overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-emerald-100/10 to-transparent rounded-tl-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-lime-100/10 to-transparent rounded-br-3xl pointer-events-none" />
          
          {/* Animated Border */}
          <div className="absolute inset-0 rounded-3xl p-px overflow-hidden pointer-events-none">
            <motion.div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(16,185,129,0.18), transparent)",
              }}
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-center mb-10"
          >
            {/* Icon */}
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-400 to-lime-400 rounded-2xl shadow-lg shadow-emerald-500/30 mb-6"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </motion.div>

            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Leave a
              </span>{" "}
              <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                Comment
              </span>
            </h2>
            <p className="text-gray-500 text-sm md:text-base">
              Your email address will not be published. Required fields are marked{" "}
              <span className="text-emerald-500">*</span>
            </p>
          </motion.div>

          {/* Success Message */}
          <AnimatePresence>
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                className="mb-8 p-5 bg-gradient-to-r from-emerald-500 to-lime-500 rounded-2xl text-white flex items-center gap-4 shadow-lg shadow-emerald-500/30"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                  className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center shrink-0"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <motion.path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    />
                  </svg>
                </motion.div>
                <div>
                  <p className="font-semibold text-lg">Comment submitted!</p>
                  <p className="text-white/80 text-sm">Thank you for your feedback.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                className="mb-8 p-5 bg-gradient-to-r from-red-500 to-rose-500 rounded-2xl text-white flex items-center gap-4 shadow-lg shadow-red-500/30"
              >
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-lg">Error</p>
                  <p className="text-white/80 text-sm">{error}</p>
                </div>
                <button
                  onClick={() => setError(null)}
                  className="ml-auto p-2 hover:bg-white/20 rounded-full transition-colors"
                  aria-label="Dismiss error"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8" noValidate>
            {/* Input Fields */}
            <div className="space-y-6">
              {inputFields.map((field, index) => (
                <motion.div
                  key={field.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                  className="relative group"
                >
                  {/* Glow Effect */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-lime-400 rounded-2xl opacity-0 blur-xl transition-opacity duration-500 pointer-events-none ${
                      focusedField === field.name ? "opacity-20" : ""
                    }`}
                  />

                  {/* Input Container */}
                  <div
                    className={`relative bg-white rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
                      validationErrors[field.name as keyof ValidationErrors]
                        ? "border-red-400"
                        : focusedField === field.name
                        ? "border-emerald-400 shadow-lg shadow-emerald-100"
                        : "border-gray-100 hover:border-emerald-200"
                    }`}
                  >
                    <div className="flex items-center gap-4 px-5">
                      {/* Icon */}
                      <div
                        className={`shrink-0 transition-colors duration-300 ${
                          validationErrors[field.name as keyof ValidationErrors]
                            ? "text-red-500"
                            : focusedField === field.name
                            ? "text-emerald-500"
                            : "text-gray-400"
                        }`}
                      >
                        {field.icon}
                      </div>

                      {/* Input */}
                      <div className="flex-1 relative py-3">
                        <input
                          type={field.type}
                          value={typeof formData[field.name as keyof FormData] === 'boolean' ? String(formData[field.name as keyof FormData]) : (formData[field.name as keyof FormData] as string | number | readonly string[] | undefined)}
                           onChange={(e) => handleInputChange(field.name as StringField, e.target.value)}
                          onFocus={() => setFocusedField(field.name)}
                          onBlur={() => setFocusedField(null)}
                          className="peer w-full bg-transparent pt-4 pb-1 outline-none text-gray-700 font-medium"
                          placeholder=" "
                          aria-invalid={!!validationErrors[field.name as keyof ValidationErrors]}
                          aria-describedby={validationErrors[field.name as keyof ValidationErrors] ? `${field.name}-error` : undefined}
                        />
                        <label
                          className={`absolute left-0 transition-all duration-300 pointer-events-none ${
                            formData[field.name as keyof FormData] || focusedField === field.name
                              ? `top-0 text-xs font-medium ${validationErrors[field.name as keyof ValidationErrors] ? "text-red-500" : "text-emerald-500"}`
                              : "top-4 text-gray-400"
                          }`}
                        >
                          {field.label}
                          {field.required && <span className="text-emerald-500 ml-1">*</span>}
                        </label>
                      </div>

                      {/* Validation Icon */}
                      <AnimatePresence>
                        {formData[field.name as keyof FormData] && !validationErrors[field.name as keyof ValidationErrors] && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                            className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center shrink-0"
                          >
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </motion.div>
                        )}
                        {validationErrors[field.name as keyof ValidationErrors] && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                            className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center shrink-0"
                          >
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Bottom Line Animation */}
                    <motion.div
                      className={`h-0.5 ${validationErrors[field.name as keyof ValidationErrors] ? "bg-red-400" : "bg-gradient-to-r from-emerald-400 to-lime-400"}`}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: focusedField === field.name || validationErrors[field.name as keyof ValidationErrors] ? 1 : 0 }}
                      style={{ transformOrigin: "left" }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>

                  {/* Validation Error Message */}
                  <AnimatePresence>
                    {validationErrors[field.name as keyof ValidationErrors] && (
                      <motion.p
                        id={`${field.name}-error`}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mt-2 text-sm text-red-500 flex items-center gap-1"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {validationErrors[field.name as keyof ValidationErrors]}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            {/* Comment Textarea */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="relative group"
            >
              {/* Glow Effect */}
              <div
                className={`absolute inset-0 bg-gradient-to-r from-emerald-700 to-lime-400 rounded-2xl opacity-0 blur-xl transition-opacity duration-500 pointer-events-none ${
                  focusedField === "comment" ? "opacity-20" : ""
                }`}
              />

              {/* Textarea Container */}
              <div
                className={`relative bg-white rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
                  validationErrors.comment
                    ? "border-red-400"
                    : focusedField === "comment"
                    ? "border-emerald-400 shadow-lg shadow-emerald-100"
                    : "border-gray-100 hover:border-emerald-200"
                }`}
              >
                <div className="flex gap-4 px-5 pt-4">
                  {/* Icon */}
                  <div
                    className={`shrink-0 transition-colors duration-300 mt-1 ${
                      validationErrors.comment
                        ? "text-red-500"
                        : focusedField === "comment"
                        ? "text-emerald-500"
                        : "text-gray-400"
                    }`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                    </svg>
                  </div>

                  {/* Textarea */}
                  <div className="flex-1 relative">
                    <textarea
                      rows={5}
                      value={formData.comment}
                      onChange={(e) => handleInputChange("comment", e.target.value)}
                      onFocus={() => setFocusedField("comment")}
                      onBlur={() => setFocusedField(null)}
                      maxLength={3000}
                      className="peer w-full bg-transparent pt-4 pb-2 outline-none resize-none text-gray-700 font-medium"
                      placeholder=" "
                      aria-invalid={!!validationErrors.comment}
                      aria-describedby={validationErrors.comment ? "comment-error" : undefined}
                    />
                    <label
                      className={`absolute left-0 transition-all duration-300 pointer-events-none ${
                        formData.comment || focusedField === "comment"
                          ? `top-0 text-xs font-medium ${validationErrors.comment ? "text-red-500" : "text-emerald-500"}`
                          : "top-4 text-gray-400"
                      }`}
                    >
                      Your Comment <span className="text-emerald-500">*</span>
                    </label>
                  </div>
                </div>

                {/* Character Counter */}
                <div className="px-5 pb-3 flex justify-between items-center">
                  <span className={`text-xs ${formData.comment.length > 3000 ? "text-amber-500" : "text-gray-400"}`}>
                    {formData.comment.length}/3000 characters
                  </span>
                  <div className="h-1 w-32 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${
                        formData.comment.length > 2800
                          ? "bg-gradient-to-r from-amber-400 to-orange-400"
                          : "bg-gradient-to-r from-emerald-400 to-lime-400"
                      }`}
                      animate={{ width: `${Math.min((formData.comment.length / 3000) * 100, 100)}%` }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                </div>

                {/* Bottom Line Animation */}
                <motion.div
                  className={`h-0.5 ${validationErrors.comment ? "bg-red-400" : "bg-gradient-to-r from-emerald-400 to-lime-400"}`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: focusedField === "comment" || validationErrors.comment ? 1 : 0 }}
                  style={{ transformOrigin: "left" }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Validation Error Message */}
              <AnimatePresence>
                {validationErrors.comment && (
                  <motion.p
                    id="comment-error"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-2 text-sm text-red-500 flex items-center gap-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {validationErrors.comment}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="pt-4"
            >
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={!loading ? { scale: 1.02, y: -3 } : {}}
                whileTap={!loading ? { scale: 0.98 } : {}}
                className="relative w-full group overflow-hidden bg-gradient-to-r from-[#86e062] to-[#00c389] text-white py-4 px-8 rounded-2xl font-bold text-lg shadow-xl shadow-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/40 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />

                {/* Button Content */}
                <span className="relative flex items-center justify-center gap-3">
                  {loading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full"
                      />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Post Comment</span>
                      <motion.svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </motion.svg>
                    </>
                  )}
                </span>
              </motion.button>
            </motion.div>
          </form>

          {/* Footer Note */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mt-8 pt-6 border-t border-gray-100 text-center"
          >
            <p className="text-sm text-gray-400 flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Your comment will be reviewed before publishing
            </p>
          </motion.div>
        </div>

        {/* Decorative Bottom Elements */}
        <div className="flex justify-center gap-2 mt-6">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-400 to-lime-400"
              initial={{ opacity: 0.3 }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}