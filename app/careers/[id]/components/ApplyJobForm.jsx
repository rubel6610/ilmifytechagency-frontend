"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FiUser, FiMail, FiPhone, FiFileText, FiSend, FiChevronRight, FiCheckCircle } from "react-icons/fi";

export default function ApplyJobForm({ job, onClose, isInline = false }) {
  const [step, setStep] = useState("loading"); // loading | quiz | form
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [loading, setLoading] = useState(false);

  // Fetch Quiz on Load
  useEffect(() => {
    async function getQuiz() {
      try {
        const res = await fetch("/api/generate-quiz", {
          method: "POST",
          body: JSON.stringify({ jobTitle: job.title || "Software Engineer", }),
        });
        const data = await res.json();
        setQuestions(data);
        setStep("quiz");
      } catch (err) {
        setStep("form"); // Fallback if AI fails
      }
    }
    getQuiz();
  }, [job.title]);

  const handleAnswer = (optionIdx) => {
    setQuizAnswers({ ...quizAnswers, [currentIdx]: optionIdx });
  };

  const nextStep = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setStep("form");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Final Data: Quiz Results + Form Data
    const formData = new FormData(e.target);
    const finalData = {
      ...Object.fromEntries(formData),
      quizResults: quizAnswers
    };

    console.log("Submitting:", finalData);

    setTimeout(() => {
      setLoading(false);
      alert("Application & Quiz submitted successfully!");
      if (onClose) onClose();
    }, 1500);
  };

  const containerStyle = isInline 
    ? "relative w-full" 
    : "fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4";

  return (
    <div className={containerStyle}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
      >
        <div className="p-8">
          
          {/* PROGRESS HEADER */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-gray-800">Apply for {job.title}</h2>
            <div className="flex gap-1">
              {[1, 2, 3].map((s) => (
                <div 
                  key={s} 
                  className={`h-1.5 w-6 rounded-full transition-colors ${
                    (step === 'loading' && s === 1) || 
                    (step === 'quiz' && s <= 2) || 
                    (step === 'form' && s <= 3) 
                    ? "bg-[#00c389]" : "bg-gray-100"
                  }`} 
                />
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {/* STEP 1: LOADING AI */}
            {step === "loading" && (
              <motion.div key="loader" exit={{ opacity: 0 }} className="py-12 text-center space-y-4">
                <div className="animate-spin h-10 w-10 border-4 border-[#86e062] border-t-transparent rounded-full mx-auto" />
                <p className="text-gray-500 font-medium italic">Loading....</p>
              </motion.div>
            )}

            {/* STEP 2: QUIZ */}
            {step === "quiz" && (
              <motion.div key="quiz" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                  <span className="text-[10px] font-bold text-[#00c389] uppercase tracking-widest">Question {currentIdx + 1}/{questions.length}</span>
                  <h3 className="text-lg font-semibold text-gray-800 mt-1">{questions[currentIdx]?.question}</h3>
                </div>
                <div className="space-y-3">
                  {questions[currentIdx]?.options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleAnswer(i)}
                      className={`w-full text-left p-4 rounded-xl border transition-all ${
                        quizAnswers[currentIdx] === i 
                        ? "border-[#00c389] bg-[#86e062]/10 text-[#008a61] font-bold" 
                        : "border-gray-200 hover:border-[#86e062]"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                <button
                  disabled={quizAnswers[currentIdx] === undefined}
                  onClick={nextStep}
                  className="w-full py-4 bg-linear-to-r from-[#86e062] to-[#00c389] text-white font-bold rounded-2xl shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {currentIdx === questions.length - 1 ? "Complete Assessment" : "Next Question"} <FiChevronRight />
                </button>
              </motion.div>
            )}

            {/* STEP 3: FINAL FORM */}
            {step === "form" && (
              <motion.form key="form" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} onSubmit={handleSubmit} className="space-y-5">
                <div className="flex items-center gap-2 text-[#00c389] font-bold text-sm mb-2">
                  <FiCheckCircle /> Assessment Completed
                </div>

                <div className="space-y-4">
                  <div className="relative">
                    <FiUser className="absolute left-3 top-10 text-gray-400" />
                    <label className="text-xs font-bold text-gray-400 uppercase ml-1">Full Name</label>
                    <input name="fullName" required placeholder="John Doe" className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#86e062]" />
                  </div>

                  <div className="relative">
                    <FiMail className="absolute left-3 top-10 text-gray-400" />
                    <label className="text-xs font-bold text-gray-400 uppercase ml-1">Email</label>
                    <input name="email" type="email" required placeholder="john@example.com" className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#86e062]" />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase ml-1 mb-1 block">Your Resume</label>
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-200 rounded-2xl cursor-pointer hover:bg-gray-50 transition-all">
                      <FiFileText className="text-3xl text-gray-300 mb-2" />
                      <span className="text-xs text-gray-400">PDF, DOCX up to 10MB</span>
                      <input name="resume" type="file" required className="hidden" />
                    </label>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  {!isInline && (
                    <button type="button" onClick={onClose} className="flex-1 py-4 text-gray-500 font-bold hover:bg-gray-50 rounded-2xl transition-all">Back</button>
                  )}
                  <button 
                    disabled={loading}
                    className="flex-2 py-4 bg-linear-to-r from-[#86e062] to-[#00c389] text-white font-bold rounded-2xl shadow-lg disabled:opacity-50"
                  >
                    {loading ? "Processing..." : "Submit Application"}
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}