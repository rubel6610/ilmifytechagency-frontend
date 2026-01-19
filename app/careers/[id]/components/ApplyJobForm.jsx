"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiFileText,
  FiChevronRight,
  FiCheckCircle,
  FiUploadCloud,
  FiX,
  FiClock, // Added icon for the timer
} from "react-icons/fi";

export default function ApplyJobForm({ job }) {
  const [step, setStep] = useState("initial");
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [fileError, setFileError] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  
  // New state for timer
  const [timeLeft, setTimeLeft] = useState(60);

  // --- 1. QUIZ TIMER LOGIC ---
  useEffect(() => {
    let interval;
    if (step === "quiz") {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            // Time is up
            clearInterval(interval);
            handleNextQuestion(true); // true indicates forced by timeout
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, currentIdx ]); // Re-run when step or question index changes

  // --- 2. API: GENERATE QUIZ ---
  const startAIGeneration = async () => {
    setStep("loading");
    try {
      const res = await fetch("/api/generate-quiz", {
        method: "POST",
        body: JSON.stringify({
          jobTitle: job.title,
          skills: job.skillsAndExpertise,
          experienceLevel: job.jobLevel,
        }),
      });
      const data = await res.json();
      setQuestions(data);
      setCurrentIdx(0); // Ensure start at 0
      setTimeLeft(15);  // Reset timer for first question
      setStep("quiz");
    } catch (err) {
      // Fallback or error handling
      setStep("form");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileError("");

    if (file) {
      const validTypes = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!validTypes.includes(file.type)) {
        setFileError("Only PDF or DOCX allowed");
        setSelectedFile(null);
        e.target.value = "";
      } else if (file.size > 3 * 1024 * 1024) {
        setFileError("File size must be less than 3MB");
        setSelectedFile(null);
        e.target.value = "";
      } else {
        setSelectedFile(file);
      }
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setFileError("");
  };

  const handleAnswer = (optionIdx) => {
    // Prevent answering if time is 0 (though UI usually handles next immediately)
    if (timeLeft === 0) return;

    setQuizAnswers({
      ...quizAnswers,
      [currentIdx]: {
        question: questions[currentIdx].question,
        selected: questions[currentIdx].options[optionIdx],
        isCorrect: questions[currentIdx].answer === optionIdx,
        timeTaken: 60 - timeLeft, // Optional: track how long they took
      },
    });
  };

  // --- 3. HANDLE NEXT / TIMEOUT LOGIC ---
  const handleNextQuestion = (isTimeout = false) => {
    // If timeout occurred and no answer was selected, record it as missed
    if (isTimeout && !quizAnswers[currentIdx]) {
      setQuizAnswers((prev) => ({
        ...prev,
        [currentIdx]: {
          question: questions[currentIdx].question,
          selected: null,
          isCorrect: false,
          timedOut: true,
        },
      }));
    }

    if (currentIdx < questions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setTimeLeft(15); // Reset timer for next question
    } else {
      setStep("form");
    }
  };

  // --- 4. FINAL SUBMISSION TO API ---
  const handleSubmitApplication = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setFileError("Please upload a resume");
      return;
    }
    
    setLoading(true);

    try {
      // Create FormData to send file + JSON data
      const formData = new FormData();
      formData.append("resume", selectedFile);
      formData.append("quizData", JSON.stringify(quizAnswers));
      formData.append("jobId", job?.id || "unknown");

      // Demo API address
      const response = await fetch("/api/submit-application", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Application Submitted Successfully!");
        // Reset or redirect logic here
      } else {
        alert("Submission failed.");
      }
    } catch (error) {
      console.error("Error submitting:", error);
    } finally {
      setLoading(false);
    }
  };

  // Helper to format time (e.g. 0:59)
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="w-full bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="p-8">
        <AnimatePresence mode="wait">
          {/* STEP 0: INITIAL APPLY BUTTON */}
          {step === "initial" && (
            <motion.button
              key="apply-btn"
              onClick={() => setStep("prompt")}
              className="w-full py-4 bg-[#00c389] text-white font-bold rounded-2xl shadow-lg hover:bg-[#00ab78] transition-all"
            >
              Apply for this Position
            </motion.button>
          )}

          {/* STEP 1: READINESS PROMPT */}
          {step === "prompt" && (
            <motion.div
              key="prompt"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center space-y-4"
            >
              <h3 className="text-lg font-bold text-gray-800">
                Ready to start?
              </h3>
              <p className="text-gray-600 text-sm">
                You need to answer 20 technical questions for this position.
                This helps us evaluate your skill match. For each question you will have 15 seconds.
              </p>
              <button
                onClick={startAIGeneration}
                className="w-full py-4 bg-linear-to-r from-[#86e062] to-[#00c389] text-white font-bold rounded-2xl"
              >
                Start Quiz
              </button>
            </motion.div>
          )}

          {/* STEP 2: LOADING */}
          {step === "loading" && (
            <motion.div key="loader" className="py-12 text-center space-y-4">
              <div className="animate-spin h-10 w-10 border-4 border-[#86e062] border-t-transparent rounded-full mx-auto" />
              <p className="text-gray-500 font-medium italic">
                Generating customized quiz based on your skills...
              </p>
            </motion.div>
          )}

          {/* STEP 3: QUIZ */}
          {step === "quiz" && (
            <motion.div
              key="quiz"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="space-y-6"
            >
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-bold text-[#00c389] uppercase">
                    Question {currentIdx + 1}/{questions.length}
                  </span>
                  {/* TIMER DISPLAY */}
                  <div className={`flex items-center gap-1 text-xs font-bold ${timeLeft < 10 ? 'text-red-500' : 'text-gray-500'}`}>
                    <FiClock />
                    <span>{formatTime(timeLeft)}</span>
                  </div>
                </div>
                
                <h3 className="text-md font-semibold text-gray-800 mt-1">
                  {questions[currentIdx]?.question}
                </h3>
              </div>
              <div className="space-y-2">
                {questions[currentIdx]?.options.map((opt, i) => (
                  <button
                    key={i}
                    // Disable options if time is out (handled by auto-skip, but for safety)
                    disabled={timeLeft === 0} 
                    onClick={() => handleAnswer(i)}
                    className={`w-full text-left p-3 rounded-xl border text-sm transition-all ${
                      quizAnswers[currentIdx]?.selected === opt
                        ? "border-[#00c389] bg-[#86e062]/10"
                        : "border-gray-200 hover:border-[#00c389]/50"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              <button
                // Button is disabled if no answer selected AND time is still remaining
                // If time runs out, the effect handles the transition automatically
                disabled={!quizAnswers[currentIdx]}
                onClick={() => handleNextQuestion(false)}
                className="w-full py-4 bg-[#00c389] text-white font-bold rounded-2xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {currentIdx === questions.length - 1 ? "Complete Quiz" : "Next"}{" "}
                <FiChevronRight />
              </button>
            </motion.div>
          )}

          {/* STEP 4: FINAL FORM */}
          {step === "form" && (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
              onSubmit={handleSubmitApplication}
            >
              <div className="flex items-center gap-2 text-[#00c389] font-bold text-sm">
                <FiCheckCircle /> Assessment Completed
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  Your Resume
                </label>

                <AnimatePresence mode="wait">
                  {!selectedFile ? (
                    // UPLOAD BOX
                    <motion.label
                      key="upload-box"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-200 rounded-2xl cursor-pointer hover:bg-gray-50 hover:border-[#00c389]/50 transition-all group"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <FiUploadCloud className="text-3xl text-gray-300 group-hover:text-[#00c389] transition-colors mb-2" />
                        <p className="text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-400">
                          PDF or DOCX (Max 3MB)
                        </p>
                      </div>
                      <input
                        type="file"
                        accept=".pdf,.docx"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </motion.label>
                  ) : (
                    // FILE PREVIEW BOX
                    <motion.div
                      key="file-preview"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="relative flex items-center p-4 w-full bg-[#00c389]/5 border border-[#00c389]/20 rounded-2xl"
                    >
                      <div className="flex items-center gap-4 w-full">
                        <div className="p-3 bg-white rounded-xl shadow-sm text-[#00c389]">
                          <FiFileText className="text-2xl" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-gray-800 truncate">
                            {selectedFile.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={removeFile}
                          className="p-2 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-lg transition-colors"
                        >
                          <FiX className="text-xl" />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {fileError && (
                  <p className="text-red-500 text-[11px] font-medium flex items-center gap-1">
                    {fileError}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-[#00c389] text-white font-bold rounded-2xl shadow-lg hover:shadow-xl hover:bg-[#00ab78] transition-all transform active:scale-[0.98] disabled:bg-gray-400 disabled:shadow-none"
              >
                {loading ? "Submitting..." : "Submit Application"}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}