"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CustomBorder from "@/app/component/customBorder/CustomBorder";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    x: 80,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

// Input field icons
const inputIcons = {
  name: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  email: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  mobile: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  ),
  address: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
};

// Floating dots data (pre-defined to avoid hydration issues)
const floatingDots = [
  { id: 0, top: "20%", left: "10%", duration: 3, delay: 0 },
  { id: 1, top: "35%", left: "25%", duration: 4, delay: 0.5 },
  { id: 2, top: "50%", left: "40%", duration: 5, delay: 1 },
  { id: 3, top: "65%", left: "55%", duration: 6, delay: 1.5 },
  { id: 4, top: "80%", left: "70%", duration: 7, delay: 2 },
  { id: 5, top: "95%", left: "85%", duration: 8, delay: 2.5 },
];

export default function FormElement() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    message: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      await new Promise((r) => setTimeout(r, 2000));
      setLoading(false);
      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        mobile: "",
        address: "",
        message: "",
      });

      // Reset success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      setLoading(false);
      console.error("Form submission error:", error);
    }
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Input fields configuration - now with 4 fields
  const inputFields = [
    { label: "Full name*", field: "name", type: "text" },
    { label: "Email*", field: "email", type: "email" },
    { label: "Mobile number*", field: "mobile", type: "tel" },
    { label: "Address*", field: "address", type: "text" },
  ];

  // const contactInfo = [
  //   { icon: "📧", title: "Email Us", value: "hello@ilmify.com" },
  //   { icon: "📞", title: "Call Us", value: "+1 (555) 123-4567" },
  //   { icon: "📍", title: "Visit Us", value: "123 Innovation Street" },
  // ];

  // const trustBadges = [
  //   { icon: "⚡", text: "Fast Response" },
  //   { icon: "🛡️", text: "Secure" },
  //   { icon: "💯", text: "Satisfaction" },
  //   { icon: "🌟", text: "5-Star Rated" },
  // ];

  return (
    <div className="relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-linear-to-br from-slate-50 via-white to-emerald-50/30 pointer-events-none" />

      {/* Animated Background Shapes */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-20 left-10 w-72 h-72 bg-linear-to-br from-emerald-200/30 to-teal-200/30 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, -10, 10, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-20 right-10 w-96 h-96 bg-linear-to-br from-lime-200/30 to-green-200/30 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-linear-to-br from-emerald-100/20 to-transparent rounded-full blur-3xl pointer-events-none"
      />

      {/* Decorative Elements */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-32 right-20 w-20 h-20 border-2 border-dashed border-emerald-200 rounded-full opacity-40 pointer-events-none hidden md:block"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-32 left-20 w-16 h-16 border-2 border-dashed border-lime-200 rounded-full opacity-40 pointer-events-none hidden md:block"
      />

      {/* Small Floating Dots */}
      {floatingDots.map((dot) => (
        <motion.div
          key={dot.id}
          className="absolute w-2 h-2 bg-emerald-400/40 rounded-full pointer-events-none hidden lg:block"
          style={{
            top: dot.top,
            left: dot.left,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: dot.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: dot.delay,
          }}
        />
      ))}

      {/* Main Container */}
      <motion.div
        className="relative bg-white/70 backdrop-blur-xl rounded-3xl p-1 md:p-1 lg:p-12 mt-10 md:mt-20 max-w-400 mx-4 lg:mx-auto flex flex-col lg:flex-row gap-8 lg:gap-10 shadow-[0_8px_60px_-15px_rgba(16,185,129,0.2)] border border-white/50"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
      >
        {/* Decorative Corner Elements */}
        <div className="absolute top-0 left-0 w-24 md:w-32 h-24 md:h-32 bg-linear-to-br from-emerald-400/10 to-transparent rounded-tl-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-24 md:w-32 h-24 md:h-32 bg-linear-to-tl from-lime-400/10 to-transparent rounded-br-3xl pointer-events-none" />

        {/* LEFT SECTION */}
        <motion.div
          className="w-full lg:w-[40%] lg:mr-6 xl:mr-10 relative z-10"
          variants={fadeUp}
        >
          {/* Decorative Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-emerald-50 to-lime-50 rounded-full mb-6 border border-emerald-100"
          >
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-emerald-700">
              We&apos;re here to help
            </span>
          </motion.div>

          <motion.h1
            className="text-3xl md:text-4xl lg:text-5xl xl:text-[55px] font-bold text-center lg:text-left leading-tight"
            variants={fadeUp}
          >
            <span className="bg-linear-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Please get in
            </span>{" "}
            <span className="bg-linear-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
              touch
            </span>
            <br />
            <span className="bg-linear-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              with
            </span>{" "}
            <span className="bg-linear-to-r from-lime-500 to-emerald-500 bg-clip-text text-transparent">
              us
            </span>
          </motion.h1>

          <motion.div
            className="flex justify-center lg:justify-start lg:ml-3 items-center text-center lg:text-left my-6"
            variants={cardVariants}
          >
            <CustomBorder />
          </motion.div>

          <motion.p
            className="text-gray-600 leading-relaxed text-center lg:text-left text-base lg:text-lg"
            variants={fadeUp}
          >
            Our team at iLMiFY is ready to understand your needs and provide the
            perfect solution. Whether it&apos;s designing your brand identity,
            boosting your online presence, building custom websites or apps, or
            creating opmtimized solutions, we&apos;re here to bring your vision
            to life.
          </motion.p>

          {/* Contact Info Cards */}
          {/* <motion.div
            className="mt-8 lg:mt-10 space-y-3 md:space-y-4"
            variants={fadeUp}
          >
            {contactInfo.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + index * 0.1 }}
                whileHover={{ x: 10, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-4 p-4 bg-linear-to-r from-white to-emerald-50/50 rounded-2xl shadow-sm border border-emerald-50 cursor-pointer group transition-all duration-300"
              >
                <div className="w-11 h-11 md:w-12 md:h-12 bg-linear-to-br from-emerald-400 to-lime-400 rounded-xl flex items-center justify-center text-lg md:text-xl shadow-lg shadow-emerald-200/50 group-hover:scale-110 transition-transform shrink-0">
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-500">{item.title}</p>
                  <p className="font-semibold text-gray-700 truncate">
                    {item.value}
                  </p>
                </div>
                <svg
                  className="w-5 h-5 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </motion.div>
            ))}
          </motion.div> */}
        </motion.div>

        {/* RIGHT SECTION - FORM */}
        <motion.div
          className="w-full lg:w-[55%] xl:w-[60%] relative z-10"
          variants={fadeUp}
        >
          {/* Form Container */}
          <div className="bg-linear-to-br from-white to-emerald-50/30 rounded-3xl p-6 md:p-8 lg:p-10 shadow-xl border border-emerald-100/50 relative overflow-hidden">
            {/* Decorative Pattern */}
            <div className="absolute top-0 right-0 w-32 md:w-40 h-32 md:h-40 opacity-5 pointer-events-none">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <pattern
                  id="grid"
                  width="10"
                  height="10"
                  patternUnits="userSpaceOnUse"
                >
                  <circle cx="5" cy="5" r="1" fill="currentColor" />
                </pattern>
                <rect width="100" height="100" fill="url(#grid)" />
              </svg>
            </div>

            {/* Form Header */}
            <motion.div
              className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6 md:mb-8"
              variants={fadeUp}
            >
              <div className="w-12 h-12 md:w-14 md:h-14 bg-linear-to-br from-emerald-400 to-lime-400 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-200/50 shrink-0">
                <svg
                  className="w-6 h-6 md:w-7 md:h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl md:text-[28px] lg:text-[32px] font-bold bg-linear-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  Send us a message
                </h2>
                <p className="text-gray-500 text-sm md:text-base">
                  We&apos;ll respond you accordingly.
                </p>
              </div>
            </motion.div>

            {/* Success Message */}
            <AnimatePresence>
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  className="mb-6 p-4 bg-linear-to-r from-emerald-500 to-lime-500 rounded-2xl text-white flex items-center gap-3 shadow-lg shadow-emerald-200/50"
                >
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center shrink-0">
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
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold">Message sent successfully!</p>
                    <p className="text-sm text-white/80">
                      We&apos;ll get back to you soon.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
              {/* Input Fields - 2x2 Grid for 4 fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {inputFields.map((item) => (
                  <motion.div
                    key={item.field}
                    className="relative group"
                    variants={fadeUp}
                  >
                    {/* Glow Effect */}
                    <div
                      className={`absolute inset-0 bg-linear-to-r from-emerald-400 to-lime-400 rounded-2xl opacity-0 blur-xl transition-opacity duration-500 pointer-events-none ${
                        focusedField === item.field ? "opacity-30" : ""
                      }`}
                    />

                    {/* Input Container */}
                    <div
                      className={`relative bg-white rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
                        focusedField === item.field
                          ? "border-emerald-400 shadow-lg shadow-emerald-100"
                          : "border-gray-100 hover:border-emerald-200"
                      }`}
                    >
                      <div className="flex items-center gap-3 px-4">
                        <div
                          className={`transition-colors duration-300 shrink-0 ${
                            focusedField === item.field
                              ? "text-emerald-500"
                              : "text-gray-400"
                          }`}
                        >
                          {inputIcons[item.field]}
                        </div>
                        <div className="flex-1 relative py-2">
                          <input
                            type={item.type}
                            value={formData[item.field]}
                            onChange={(e) =>
                              handleInputChange(item.field, e.target.value)
                            }
                            onFocus={() => setFocusedField(item.field)}
                            onBlur={() => setFocusedField(null)}
                            placeholder=" "
                            className="peer w-full bg-transparent pt-5 pb-1 outline-none text-gray-700 font-medium"
                            required
                            aria-label={item.label}
                          />
                          <label
                            className={`absolute left-0 transition-all duration-300 pointer-events-none ${
                              formData[item.field] ||
                              focusedField === item.field
                                ? "top-1 text-xs text-emerald-500 font-medium"
                                : "top-4 text-gray-400"
                            }`}
                          >
                            {item.label}
                          </label>
                        </div>
                      </div>

                      {/* Progress indicator */}
                      <motion.div
                        className="h-0.5 bg-linear-to-r from-emerald-400 to-lime-400"
                        initial={{ scaleX: 0 }}
                        animate={{
                          scaleX: focusedField === item.field ? 1 : 0,
                        }}
                        style={{ transformOrigin: "left" }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Message Textarea */}
              <motion.div className="relative group" variants={fadeUp}>
                {/* Glow Effect */}
                <div
                  className={`absolute inset-0 bg-linear-to-r from-emerald-400 to-lime-400 rounded-2xl opacity-0 blur-xl transition-opacity duration-500 pointer-events-none ${
                    focusedField === "message" ? "opacity-30" : ""
                  }`}
                />

                {/* Textarea Container */}
                <div
                  className={`relative bg-white rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
                    focusedField === "message"
                      ? "border-emerald-400 shadow-lg shadow-emerald-100"
                      : "border-gray-100 hover:border-emerald-200"
                  }`}
                >
                  <div className="flex gap-3 px-4 pt-3">
                    <div
                      className={`transition-colors duration-300 mt-1 shrink-0 ${
                        focusedField === "message"
                          ? "text-emerald-500"
                          : "text-gray-400"
                      }`}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1 relative">
                      <textarea
                        rows={4}
                        value={formData.message}
                        onChange={(e) =>
                          handleInputChange("message", e.target.value)
                        }
                        onFocus={() => setFocusedField("message")}
                        onBlur={() => setFocusedField(null)}
                        placeholder=" "
                        maxLength={5000}
                        className="peer w-full bg-transparent pt-5 pb-2 outline-none resize-none text-gray-700 font-medium"
                        required
                        aria-label="Your message"
                      />
                      <label
                        className={`absolute left-0 transition-all duration-300 pointer-events-none ${
                          formData.message || focusedField === "message"
                            ? "top-0 text-xs text-emerald-500 font-medium"
                            : "top-0 text-gray-400"
                        }`}
                      >
                        Your message*
                      </label>
                    </div>
                  </div>

                  {/* Character count */}
                  <div className="px-4 pb-2 flex justify-between items-center gap-4">
                    <span
                      className={`text-xs ${
                        formData.message.length > 4500
                          ? "text-amber-500"
                          : "text-gray-400"
                      }`}
                    >
                      {formData.message.length}/5000 characters
                    </span>
                    <div className="h-0.5 flex-1 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full ${
                          formData.message.length > 4500
                            ? "bg-linear-to-r from-amber-400 to-orange-400"
                            : "bg-linear-to-r from-emerald-400 to-lime-400"
                        }`}
                        animate={{
                          width: `${Math.min(
                            (formData.message.length / 5000) * 100,
                            100
                          )}%`,
                        }}
                        transition={{ duration: 0.2 }}
                      />
                    </div>
                  </div>

                  {/* Progress indicator */}
                  <motion.div
                    className="h-0.5 bg-linear-to-r from-emerald-400 to-lime-400"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: focusedField === "message" ? 1 : 0 }}
                    style={{ transformOrigin: "left" }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>

              {/* Submit Button */}
              <motion.div
                className="flex flex-col sm:flex-row justify-between items-center gap-4"
                variants={fadeUp}
              >
                <p className="text-sm text-gray-400 flex items-center gap-2 order-2 sm:order-1">
                  <svg
                    className="w-4 h-4 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  <span>Your data is secure with us</span>
                </p>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={!loading ? { scale: 1.02, y: -2 } : {}}
                  whileTap={!loading ? { scale: 0.98 } : {}}
                  className="relative group w-full sm:w-auto bg-linear-to-r from-lime-500 to-emerald-500 text-white px-8 md:px-10 py-3 md:py-4 rounded-full font-bold text-base md:text-lg shadow-xl shadow-emerald-200/50 hover:shadow-2xl hover:shadow-emerald-300/50 transition-all duration-300 overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed order-1 sm:order-2"
                >
                  {/* Button shine effect */}
                  <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />

                  <span className="relative flex items-center justify-center gap-3">
                    {loading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>SEND MESSAGE</span>
                        <motion.svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </motion.svg>
                      </>
                    )}
                  </span>
                </motion.button>
              </motion.div>
            </form>

            {/* Trust Badges */}
            {/* <motion.div
              className="mt-8 md:mt-10 pt-6 md:pt-8 border-t border-gray-100"
              variants={fadeUp}
            >
              <div className="flex flex-wrap justify-center gap-3 md:gap-6 items-center">
                {trustBadges.map((badge) => (
                  <motion.div
                    key={badge.text}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    whileHover={{ y: -3 }}
                    className="flex items-center gap-2 px-3 md:px-4 py-2 bg-gray-50 rounded-full"
                  >
                    <span>{badge.icon}</span>
                    <span className="text-xs md:text-sm font-medium text-gray-600">
                      {badge.text}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div> */}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}