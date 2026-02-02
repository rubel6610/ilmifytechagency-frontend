// app/components/ApplyJobForm.tsx
"use client";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiFileText,
  FiChevronRight,
  FiCheckCircle,
  FiUploadCloud,
  FiX,
  FiClock,
  FiUser,
  FiMail,
  FiPhone,
} from "react-icons/fi";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";

interface Job {
  id: string;
  title: string;
  mandatorySkills: string[];
  experience: string;
}

interface QuizQuestion {
  id: string;
  question: string;
  options: [string, string, string, string];
  correctAnswer: number;
}

interface QuizAnswer {
  id: string;
  question: string;
  userAnswer: number | null;
  selectedOption: string | null;
  isCorrect: boolean;
  timedOut?: boolean;
  timeTaken?: number;
  correctAnswer: number;
}

interface CandidateInfo {
  name: string;
  email: string;
  phone: string;
}

interface ApiResponse {
  questions: QuizQuestion[];
  success?: boolean;
  fallback?: boolean;
  modelUsed?: string;
  count?: number;
  error?: string;
}

export default function ApplyJobForm({ job }: { job: Job }) {
  const [step, setStep] = useState<
    "initial" | "prompt" | "loading" | "quiz" | "form" | "success"
  >("initial");
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, QuizAnswer>>({});
  const [loading, setLoading] = useState(false);
  const [fileError, setFileError] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [timeLeft, setTimeLeft] = useState(15);
  const [candidateInfo, setCandidateInfo] = useState<CandidateInfo>({
    name: "",
    email: "",
    phone: "",
  });
  const [quizScore, setQuizScore] = useState<{ score: number; correct: number; total: number } | null>(null);
  const { token } = useSelector((state: RootState) => state.auth);

  // Timer effect - Reset timer when question changes
  useEffect(() => {
    if (step !== "quiz") return;
    
    // Reset timer for new question
    setTimeLeft(15);

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleNextQuestion(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [step, currentIdx]);

  // Generate quiz
  const startAIGeneration = async () => {
    setStep("loading");
    setLoading(true);
    
    try {
      const res = await fetch("/api/generate-quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          jobTitle: job.title,
          skills: job.mandatorySkills,
          experienceLevel: job.experience,
        }),
      });
      
      const data: ApiResponse = await res.json();
      
      if (data.questions && data.questions.length > 0) {
        setQuestions(data.questions);
        setCurrentIdx(0);
        setTimeLeft(15);
        setQuizAnswers({});
        setStep("quiz");
      } else {
        throw new Error("No questions generated");
      }
      
      if (data.fallback) {
        console.warn("Using fallback questions");
      }
    } catch (err) {
      console.error("Failed to generate quiz:", err);
      // Still proceed to form if quiz fails
      setStep("form");
    } finally {
      setLoading(false);
    }
  };

  // File validation
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileError("");
    
    if (!file) return;

    // Validate file type
    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    
    if (!validTypes.includes(file.type)) {
      setFileError("Only PDF, DOC, or DOCX files are allowed");
      setSelectedFile(null);
      e.target.value = "";
      return;
    }

    // Validate file size (3MB max)
    if (file.size > 3 * 1024 * 1024) {
      setFileError("File size must be less than 3MB");
      setSelectedFile(null);
      e.target.value = "";
      return;
    }

    setSelectedFile(file);
    setFileError("");
  };

  const removeFile = () => {
    setSelectedFile(null);
    setFileError("");
  };

  // Handle answer selection
  const handleAnswer = (optionIdx: number) => {
    if (timeLeft === 0 || !questions[currentIdx]) return;
    
    const currentQuestion = questions[currentIdx];
    const isCorrect = currentQuestion.correctAnswer === optionIdx;
    
    setQuizAnswers({
      ...quizAnswers,
      [currentIdx]: {
        id: currentQuestion.id,
        question: currentQuestion.question,
        userAnswer: optionIdx,
        selectedOption: currentQuestion.options[optionIdx],
        isCorrect,
        timeTaken: 15 - timeLeft,
        correctAnswer: currentQuestion.correctAnswer,
      },
    });
  };

  // Move to next question
  const handleNextQuestion = (isTimeout = false) => {
    if (isTimeout && !quizAnswers[currentIdx]) {
      const currentQuestion = questions[currentIdx];
      setQuizAnswers({
        ...quizAnswers,
        [currentIdx]: {
          id: currentQuestion.id,
          question: currentQuestion.question,
          userAnswer: null,
          selectedOption: null,
          isCorrect: false,
          timedOut: true,
          timeTaken: 15,
          correctAnswer: currentQuestion.correctAnswer,
        },
      });
    }

    if (currentIdx < questions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      // Timer will be reset by useEffect when currentIdx changes
    } else {
      calculateScore();
      setStep("form");
    }
  };

  // Calculate quiz score
  const calculateScore = () => {
    const answers = Object.values(quizAnswers);
    const correct = answers.filter(a => a.isCorrect).length;
    const total = questions.length;
    const score = (correct / total) * 100;
    
    setQuizScore({
      score,
      correct,
      total,
    });
  };

  // Submit application
  const handleSubmitApplication = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate required fields
    if (!candidateInfo.name || !candidateInfo.email) {
      setFileError("Name and email are required");
      return;
    }
    
    if (!selectedFile) {
      setFileError("Please upload a resume");
      return;
    }
    
    setLoading(true);
    
    try {
      const formData = new FormData();
      
      // Add job and candidate metadata
      formData.append("jobId", job.id);
      formData.append("jobTitle", job.title);
      formData.append("candidateId", `candidate_${Date.now()}`);
      formData.append("skills", JSON.stringify(job.mandatorySkills));
      formData.append("experienceLevel", job.experience);
      
      // Add complete quiz data with all questions, options, and answers
      const completeQuizData = questions.map((q, idx) => {
        const userAnswerData = quizAnswers[idx];
        return {
          questionId: q.id,
          question: q.question,
          options: q.options, // All 4 options
          correctAnswer: q.correctAnswer,
          correctOption: q.options[q.correctAnswer],
          userAnswer: userAnswerData?.userAnswer ?? null,
          userSelectedOption: userAnswerData?.selectedOption ?? null,
          isCorrect: userAnswerData?.isCorrect ?? false,
          timeTaken: userAnswerData?.timeTaken ?? 0,
          timedOut: userAnswerData?.timedOut ?? false,
        };
      });
      
      formData.append("quizData", JSON.stringify(completeQuizData));
      formData.append("totalQuestions", questions.length.toString());
      formData.append("correctAnswers", quizScore?.correct.toString() || "0");
      formData.append("quizScore", quizScore?.score.toString() || "0");
      
      // Add candidate personal info
      formData.append("name", candidateInfo.name);
      formData.append("email", candidateInfo.email);
      formData.append("phone", candidateInfo.phone || "");
      
      // Add resume file
      formData.append("resume", selectedFile);
      
      const response = await fetch("/api/submit-quiz", {
        method: "POST",
        headers: {
          token: `${token}`,
        },
        body: formData,
      });
      
      const result = await response.json();
      
      if (result.success) {
        setStep("success");
      } else {
        setFileError(result.error || "Submission failed. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setFileError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Get current question options
  const currentQuestion = questions[currentIdx];
  const currentOptions = currentQuestion?.options || [];

  return (
    <div className="w-full bg-white rounded-3xl shadow-xl border border-gray-100 ">
      <div className="p-6 md:p-8">
        <AnimatePresence mode="wait">
          {/* INITIAL BUTTON */}
          {step === "initial" && (
            <motion.button
              key="apply-btn"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={() => setStep("prompt")}
              className="w-full py-4 bg-gradient-to-r from-[#86e062] to-[#00c389] text-white font-bold rounded-2xl shadow-lg hover:shadow-xl hover:from-[#78d054] hover:to-[#00ab78] transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Apply for this Position
            </motion.button>
          )}

          {/* PROMPT SCREEN */}
          {step === "prompt" && (
            <motion.div
              key="prompt"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center space-y-6"
            >
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-gray-800">
                  Technical Assessment Required
                </h3>
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Position:</strong> {job.title}
                  </p>
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Experience:</strong> {job.experience}
                  </p>
                
                </div>
                <p className="text-gray-600 text-sm">
                  You will answer {questions.length || 20} technical questions. 
                  Each question has a 15-second time limit.
                </p>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                  <FiClock className="text-[#00c389]" />
                  <span>Approx. 5 minutes total</span>
                </div>
              </div>
              <div className="space-y-3">
                <button
                  onClick={startAIGeneration}
                  className="w-full py-4 bg-gradient-to-r from-[#86e062] to-[#00c389] text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all"
                >
                  Start Quiz Now
                </button>
                <button
                  onClick={() => setStep("initial")}
                  className="w-full py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Go Back
                </button>
              </div>
            </motion.div>
          )}

          {/* LOADING SCREEN */}
          {step === "loading" && (
            <motion.div
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-12 text-center space-y-6"
            >
              <div className="relative">
                <div className="animate-spin h-16 w-16 border-4 border-[#00c389] border-t-transparent rounded-full mx-auto" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-8 w-8 bg-gradient-to-r from-[#86e062] to-[#00c389] rounded-full animate-pulse" />
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-gray-700 font-semibold">
                  Generating customized questions...
                </p>
                <p className="text-sm text-gray-500 italic">
                  Tailoring questions for {job.title} role
                </p>
              </div>
            </motion.div>
          )}

          {/* QUIZ SCREEN */}
          {step === "quiz" && currentQuestion && (
            <motion.div
              key="quiz"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="space-y-6"
            >
              {/* Progress bar */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-[#00c389] uppercase">
                    Question {currentIdx + 1} of {questions.length}
                  </span>
                  <div className="flex items-center gap-1">
                    <div className={`text-sm font-bold ${timeLeft < 6 ? "text-red-500 animate-pulse" : "text-gray-600"}`}>
                      {formatTime(timeLeft)}
                    </div>
                    <FiClock className={timeLeft < 6 ? "text-red-500" : "text-gray-500"} />
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-[#86e062] to-[#00c389] h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question */}
              <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 leading-relaxed">
                  {currentQuestion.question}
                </h3>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {currentOptions.map((option, index) => {
                  const isSelected = quizAnswers[currentIdx]?.userAnswer === index;
                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswer(index)}
                      disabled={timeLeft === 0}
                      className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                        isSelected
                          ? "border-[#00c389] bg-gradient-to-r from-[#86e062]/10 to-[#00c389]/10 transform scale-[1.02]"
                          : "border-gray-200 hover:border-[#00c389]/50 hover:bg-gray-50"
                      } ${timeLeft === 0 ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}`}
                    >
                      <div className="flex items-center">
                        <div className={`flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center mr-3 ${
                          isSelected
                            ? "bg-[#00c389] border-[#00c389]"
                            : "border-gray-300"
                        }`}>
                          {isSelected && (
                            <div className="w-2 h-2 bg-white rounded-full" />
                          )}
                        </div>
                        <span className="text-gray-800">{option}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Navigation */}
              <div className="pt-4">
                <button
                  onClick={() => handleNextQuestion(false)}
                  disabled={!quizAnswers[currentIdx] && timeLeft > 0}
                  className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 ${
                    quizAnswers[currentIdx] || timeLeft === 0
                      ? "bg-gradient-to-r from-[#86e062] to-[#00c389] text-white shadow-lg hover:shadow-xl"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  } transition-all`}
                >
                  {currentIdx === questions.length - 1 ? "Complete Quiz" : "Next Question"}
                  <FiChevronRight className="text-lg" />
                </button>
              </div>

              {/* Question navigation dots */}
              <div className="flex flex-wrap gap-2 justify-center pt-4">
                {questions.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentIdx(index);
                      // Timer will be reset by useEffect
                    }}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentIdx
                        ? "bg-[#00c389] scale-110"
                        : quizAnswers[index]
                        ? "bg-green-400"
                        : "bg-gray-300"
                    }`}
                    title={`Question ${index + 1}`}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* APPLICATION FORM */}
          {step === "form" && (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
              onSubmit={handleSubmitApplication}
            >
              {/* Quiz Score Display */}
              {quizScore && (
                <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-100 rounded-2xl p-5">
                  <div className="flex items-center gap-3 text-[#00c389] font-bold text-sm mb-3">
                    <FiCheckCircle className="text-lg" />
                    <span>Quiz Completed!</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-800">{quizScore.correct}</div>
                      <div className="text-xs text-gray-500">Correct</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-800">{quizScore.total}</div>
                      <div className="text-xs text-gray-500">Total</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-800">{quizScore.score.toFixed(1)}%</div>
                      <div className="text-xs text-gray-500">Score</div>
                    </div>
                  </div>
                </div>
              )}

              <h3 className="text-lg font-bold text-gray-800">Personal Information</h3>

              {/* Personal Info Fields */}
              <div className="space-y-4">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <FiUser className="text-gray-400" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={candidateInfo.name}
                    onChange={(e) => setCandidateInfo({...candidateInfo, name: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00c389]/30 focus:border-[#00c389] transition-all"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <FiMail className="text-gray-400" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={candidateInfo.email}
                    onChange={(e) => setCandidateInfo({...candidateInfo, email: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00c389]/30 focus:border-[#00c389] transition-all"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <FiPhone className="text-gray-400" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={candidateInfo.phone}
                    onChange={(e) => setCandidateInfo({...candidateInfo, phone: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00c389]/30 focus:border-[#00c389] transition-all"
                    placeholder="+1 (123) 456-7890"
                  />
                </div>
              </div>

              {/* Resume Upload */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700">
                  Resume Upload *
                </label>
                
                <AnimatePresence mode="wait">
                  {!selectedFile ? (
                    <motion.label
                      key="upload-box"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:border-[#00c389] hover:bg-gray-50 transition-all group"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <FiUploadCloud className="text-3xl text-gray-400 group-hover:text-[#00c389] transition-colors mb-3" />
                        <p className="text-sm text-gray-600">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          PDF, DOC, or DOCX (Max 3MB)
                        </p>
                      </div>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </motion.label>
                  ) : (
                    <motion.div
                      key="file-preview"
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="relative flex items-center p-4 w-full bg-gradient-to-r from-[#86e062]/5 to-[#00c389]/5 border border-[#00c389]/30 rounded-2xl"
                    >
                      <div className="flex items-center gap-4 w-full">
                        <div className="p-3 bg-white rounded-xl shadow-sm text-[#00c389]">
                          <FiFileText className="text-2xl" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-800 truncate">
                            {selectedFile.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • {
                              selectedFile.type.includes('pdf') ? 'PDF' : 
                              selectedFile.type.includes('word') ? 'Word' : 'Document'
                            }
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
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm font-medium px-2"
                  >
                    {fileError}
                  </motion.p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:scale-95 ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-[#86e062] to-[#00c389] text-white"
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                      Submitting Application...
                    </span>
                  ) : (
                    "Submit Application"
                  )}
                </button>
              </div>
            </motion.form>
          )}

          {/* SUCCESS SCREEN */}
          {step === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 space-y-6"
            >
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-r from-[#86e062]/20 to-[#00c389]/20 rounded-full mx-auto flex items-center justify-center">
                  <FiCheckCircle className="text-5xl text-[#00c389]" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#86e062] to-[#00c389] rounded-full animate-ping opacity-20" />
                </div>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-gray-800">
                  Application Submitted!
                </h3>
                <p className="text-gray-600">
                  Thank you for applying to the {job.title} position.
                </p>
                {quizScore && (
                  <p className="text-sm text-gray-500">
                    Your quiz score: <span className="font-bold">{quizScore.score.toFixed(1)}%</span>
                  </p>
                )}
              </div>
              
              <div className="pt-6">
                <button
                  onClick={() => window.location.reload()}
                  className="px-8 py-3 border-2 border-[#00c389] text-[#00c389] font-semibold rounded-xl hover:bg-[#00c389] hover:text-white transition-all"
                >
                  Apply for Another Position
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}