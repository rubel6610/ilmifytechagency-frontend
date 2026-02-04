// app/api/submit-quiz/route.ts
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

interface QuizAnswer {
  questionId: string;
  question: string;
  options: string[];
  userAnswer: number | null;
  selectedOption: string | null;
  isCorrect: boolean;
  timedOut: boolean;
  timeTaken: number;
  correctAnswer: number;
  correctOption: string;
}

interface SubmissionData {
  jobId: string;
  jobTitle: string;
  candidateId: string;
  skills: string[];
  experienceLevel: string;
  name: string;
  email: string;
  phone: string;
  quizData: QuizAnswer[];
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  timedOutAnswers: number;
  quizScore: number;
  submittedAt: string;
  resumeFileName: string;
  resumeFilePath: string;
}

export const POST = async (req: NextRequest) => {
  try {
    // Verify authentication token
    const token = req.headers.get("token");
    if (!token) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: No token provided" },
        { status: 401 }
      );
    }

    // Parse form data
    const formData = await req.formData();

    // Extract all fields
    const jobId = formData.get("jobId") as string;
    const jobTitle = formData.get("jobTitle") as string;
    const candidateId = formData.get("candidateId") as string;
    const skillsString = formData.get("skills") as string;
    const experienceLevel = formData.get("experienceLevel") as string;
    
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    
    const quizDataString = formData.get("quizData") as string;
    const totalQuestions = parseInt(formData.get("totalQuestions") as string);
    const correctAnswers = parseInt(formData.get("correctAnswers") as string);
    const incorrectAnswers = parseInt(formData.get("incorrectAnswers") as string);
    const timedOutAnswers = parseInt(formData.get("timedOutAnswers") as string);
    const quizScore = parseFloat(formData.get("quizScore") as string);
    const submittedAt = formData.get("submittedAt") as string;
    
    const resumeFile = formData.get("resume") as File;

    // Validate required fields
    if (!jobId || !jobTitle || !name || !email || !quizDataString || !resumeFile) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Parse JSON fields
    let skills: string[];
    let quizData: QuizAnswer[];
    
    try {
      skills = JSON.parse(skillsString);
      quizData = JSON.parse(quizDataString);
    } catch (parseError) {
      console.error("JSON parse error:", parseError);
      return NextResponse.json(
        { success: false, error: "Invalid data format" },
        { status: 400 }
      );
    }

    // Validate quiz data
    if (!Array.isArray(quizData) || quizData.length === 0) {
      return NextResponse.json(
        { success: false, error: "Invalid quiz data" },
        { status: 400 }
      );
    }

    // Create uploads directory if it doesn't exist
    const uploadsDir = join(process.cwd(), "public", "uploads", "resumes");
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true });
    }

    // Save resume file
    const bytes = await resumeFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const timestamp = Date.now();
    const safeFileName = resumeFile.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const fileName = `${candidateId}_${timestamp}_${safeFileName}`;
    const filePath = join(uploadsDir, fileName);
    
    await writeFile(filePath, buffer);
    console.log(`Resume saved: ${fileName}`);

    // Prepare submission data
    const submissionData: SubmissionData = {
      jobId,
      jobTitle,
      candidateId,
      skills,
      experienceLevel,
      name,
      email,
      phone: phone || "",
      quizData,
      totalQuestions,
      correctAnswers,
      incorrectAnswers,
      timedOutAnswers,
      quizScore,
      submittedAt: submittedAt || new Date().toISOString(),
      resumeFileName: fileName,
      resumeFilePath: `/uploads/resumes/${fileName}`,
    };

    // Calculate additional statistics
    const avgTimeTaken = quizData.reduce((sum, q) => sum + q.timeTaken, 0) / quizData.length;
    const correctPercentage = ((correctAnswers / totalQuestions) * 100).toFixed(2);

    // Create submissions directory if it doesn't exist
    const submissionsDir = join(process.cwd(), "data", "submissions");
    if (!existsSync(submissionsDir)) {
      await mkdir(submissionsDir, { recursive: true });
    }

    // Save submission data to JSON file
    const submissionFileName = `${candidateId}_${timestamp}.json`;
    const submissionFilePath = join(submissionsDir, submissionFileName);
    
    const completeSubmission = {
      ...submissionData,
      statistics: {
        correctPercentage: parseFloat(correctPercentage),
        averageTimeTaken: avgTimeTaken,
        questionsAnswered: correctAnswers + incorrectAnswers,
        questionsSkipped: timedOutAnswers,
      },
      metadata: {
        submissionId: `SUB_${timestamp}`,
        ipAddress: req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown",
        userAgent: req.headers.get("user-agent") || "unknown",
      },
    };

    await writeFile(
      submissionFilePath,
      JSON.stringify(completeSubmission, null, 2),
      "utf-8"
    );

    console.log(`Submission saved: ${submissionFileName}`);

    // Here you would typically:
    // 1. Save to database (MongoDB, PostgreSQL, etc.)
    // 2. Send confirmation email to candidate
    // 3. Notify hiring manager
    // 4. Update application tracking system

    // Example: Save to database (pseudo-code)
    /*
    await db.collection("applications").insertOne({
      ...completeSubmission,
      createdAt: new Date(),
      status: "pending_review",
    });
    */

    // Log detailed quiz performance
    console.log("=== Quiz Submission Summary ===");
    console.log(`Candidate: ${name} (${email})`);
    console.log(`Job: ${jobTitle}`);
    console.log(`Score: ${quizScore.toFixed(2)}%`);
    console.log(`Correct: ${correctAnswers}/${totalQuestions}`);
    console.log(`Incorrect: ${incorrectAnswers}`);
    console.log(`Timed Out: ${timedOutAnswers}`);
    console.log(`Average Time: ${avgTimeTaken.toFixed(2)}s per question`);
    console.log("==============================");

    // Return success response
    return NextResponse.json({
      success: true,
      message: "Application submitted successfully",
      data: {
        submissionId: completeSubmission.metadata.submissionId,
        candidateId,
        score: quizScore,
        correctAnswers,
        totalQuestions,
        resumeUploaded: true,
      },
    });

  } catch (error: any) {
    console.error("Submission error:", error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: "Failed to submit application. Please try again.",
        details: error.message 
      },
      { status: 500 }
    );
  }
};

// Optional: GET endpoint to retrieve submission data
export const GET = async (req: NextRequest) => {
  try {
    const token = req.headers.get("token");
    if (!token) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const candidateId = searchParams.get("candidateId");
    const submissionId = searchParams.get("submissionId");

    if (!candidateId && !submissionId) {
      return NextResponse.json(
        { success: false, error: "candidateId or submissionId required" },
        { status: 400 }
      );
    }

    // Here you would fetch from database
    // For now, return a placeholder
    
    return NextResponse.json({
      success: true,
      message: "Submission retrieved successfully",
      data: {
        // submission data would go here
      },
    });

  } catch (error: any) {
    console.error("Retrieval error:", error);
    
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
};