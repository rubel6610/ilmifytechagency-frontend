// app/api/generate-quiz/route.ts
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";



interface QuizQuestion {
  id: string;
  question: string;
  options: [string, string, string, string];
  correctAnswer: number;
  userAnswer?: number;
  isCorrect?: boolean;
}

export const POST = async (req: NextRequest) => {
  const { jobTitle, skills, experienceLevel } = await req.json();
  try {
    if (!jobTitle || !skills?.length || !experienceLevel) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Enhanced prompt for better JSON response
    const prompt = `Generate exactly 20 multiple-choice technical interview questions for a ${experienceLevel} ${jobTitle} position.
    
Required Skills: ${skills.join(", ")}

INSTRUCTIONS:
1. Create exactly 20 questions
2. Each question must have 4 options labeled A, B, C, D
3. Mark the correct answer with an index (0 for A, 1 for B, 2 for C, 3 for D)
4. Questions should range from basic to advanced based on ${experienceLevel} level
5. Focus on practical, real-world scenarios

OUTPUT FORMAT (JSON ONLY):
{
  "questions": [
    {
      "id": "q1",
      "question": "Question text here?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": 0
    }
  ]
}

Begin JSON output:`;

    // Try different model names - one of these should work
    const modelNames = [
      "gemini-1.5-pro", // Most reliable
      "gemini-1.0-pro", // Alternative
      "gemini-pro", // Basic model
      "gemini-1.5-flash-exp", // Experimental flash
      "gemini-1.5-flash-latest", // Latest flash
      "gemini-1.5-flash", // Original attempt
    ];

    let result;
    let lastError;

    // Try each model until one works
    for (const modelName of modelNames) {
      try {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
           throw new Error("GEMINI_API_KEY is not set");
        }
        const genAI = new GoogleGenerativeAI(apiKey);
        console.log(`Trying model: ${modelName}`);

        const model = genAI.getGenerativeModel({
          model: modelName,
          generationConfig: {
            temperature: 0.7,
            topP: 0.9,
            topK: 40,
            maxOutputTokens: 4096,
          },
        });

        const generationResult = await model.generateContent(prompt);
        result = generationResult;
        console.log(`Success with model: ${modelName}`);
        break; // Exit loop if successful
      } catch (modelError: any) {
        lastError = modelError;
        console.log(`Model ${modelName} failed: ${modelError.message}`);
        continue; // Try next model
      }
    }

    // If all models failed
    if (!result) {
      throw new Error(`All models failed. Last error: ${lastError?.message}`);
    }

    const text = result.response.text();

    if (!text || text.trim() === "") {
      throw new Error("Empty response from AI");
    }

    // Enhanced JSON extraction
    let jsonString = text.trim();

    // Remove markdown code blocks if present
    jsonString = jsonString.replace(/```json\n?/g, "").replace(/```\n?/g, "");

    // Extract JSON object
    const jsonMatch = jsonString.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error("No JSON found in response:", text);
      throw new Error("AI response is not valid JSON");
    }

    jsonString = jsonMatch[0];

    // Parse JSON
    const parsed = JSON.parse(jsonString);

    // Validate structure
    if (!parsed.questions || !Array.isArray(parsed.questions)) {
      throw new Error("Invalid response structure: missing questions array");
    }

    // Ensure we have exactly 20 questions
    let questions = parsed.questions.slice(0, 20);

    // Add missing properties
    questions = questions.map((q: any, i: number) => ({
      id: q.id || `q${i + 1}`,
      question: q.question || `Question ${i + 1}`,
      options: q.options || ["Option A", "Option B", "Option C", "Option D"],
      correctAnswer: typeof q.correctAnswer === "number" ? q.correctAnswer : 0,
    }));

    // If we got less than 20 questions, fill with mock data
    if (questions.length < 20) {
      const needed = 20 - questions.length;
      for (let i = 0; i < needed; i++) {
        questions.push({
          id: `q${questions.length + 1}`,
          question: `What is an important aspect of ${skills[0]} for a ${experienceLevel} position?`,
          options: [
            "Understanding basic principles",
            "Advanced optimization techniques",
            "Team collaboration",
            "All of the above",
          ],
          correctAnswer: 3,
        });
      }
    }

    return NextResponse.json({
      success: true,
      questions,
      count: questions.length,
    });
  } catch (error: any) {
    console.error("Quiz generation error:", error);

    // Comprehensive fallback with mock questions
    const mockQuestions: QuizQuestion[] = Array.from({ length: 20 }, (_, i) => {
      const skill = skills?.[i % skills.length] || "technical skills";
      return {
        id: `q${i + 1}`,
        question: `${i + 1}. What is an important consideration for ${skill} in a ${experienceLevel} ${jobTitle} role?`,
        options: [
          `Basic understanding of ${skill}`,
          `Advanced implementation of ${skill}`,
          `Integration with other technologies`,
          `All of the above are important`,
        ],
        correctAnswer: Math.floor(Math.random() * 4),
      };
    });

    return NextResponse.json({
      success: false,
      error: error.message,
      fallback: true,
      questions: mockQuestions,
      count: mockQuestions.length,
    });
  }
};
