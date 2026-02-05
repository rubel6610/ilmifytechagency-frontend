// app/api/generate-quiz/route.ts
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
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

CRITICAL INSTRUCTIONS:
1. Create EXACTLY 20 questions
2. Each question MUST have EXACTLY 4 options
3. Options should be an array of 4 strings
4. correctAnswer should be the index (0, 1, 2, or 3) of the correct option
5. Questions should range from basic to advanced based on ${experienceLevel} level
6. Focus on practical, real-world scenarios related to ${skills.join(", ")}
7. Make questions clear and unambiguous
8. Ensure all options are plausible but only one is clearly correct

REQUIRED OUTPUT FORMAT (STRICT JSON):
{
  "questions": [
    {
      "id": "q1",
      "question": "What is the primary purpose of React Hooks?",
      "options": [
        "To replace class components entirely",
        "To add state and lifecycle features to functional components",
        "To improve CSS styling in React",
        "To manage database connections"
      ],
      "correctAnswer": 1
    }
  ]
}

IMPORTANT: 
- Return ONLY valid JSON, no markdown, no explanations
- Ensure exactly 20 questions
- Each question must have exactly 4 options as an array
- correctAnswer must be 0, 1, 2, or 3

Begin JSON output now:`;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not set in environment variables");
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    // Try different model names in order of preference
    const modelNames = [
      "gemini-1.5-pro-latest",
      "gemini-1.5-pro",
      "gemini-1.5-flash-latest", 
      "gemini-1.5-flash",
      "gemini-pro",
    ];

    let result;
    let lastError;
    let modelUsed = "";

    // Try each model until one works
    for (const modelName of modelNames) {
      try {
        console.log(`Attempting to use model: ${modelName}`);

        const model = genAI.getGenerativeModel({
          model: modelName,
          generationConfig: {
            temperature: 0.8,
            topP: 0.95,
            topK: 40,
            maxOutputTokens: 8192,
            responseMimeType: "application/json", // Request JSON response
          },
        });

        const generationResult = await model.generateContent(prompt);
        result = generationResult;
        modelUsed = modelName;
        console.log(`Successfully generated quiz with model: ${modelName}`);
        break;
      } catch (modelError: any) {
        lastError = modelError;
        console.log(`Model ${modelName} failed: ${modelError.message}`);
        continue;
      }
    }

    // If all models failed
    if (!result) {
      console.error("All models failed. Last error:", lastError);
      throw new Error(`AI generation failed: ${lastError?.message || "Unknown error"}`);
    }

    const text = result.response.text();

    if (!text || text.trim() === "") {
      throw new Error("Empty response from AI");
    }

    // Enhanced JSON extraction
    let jsonString = text.trim();

    // Remove markdown code blocks if present
    jsonString = jsonString.replace(/```json\n?/g, "").replace(/```\n?/g, "");

    // Remove any text before the first {
    const startIndex = jsonString.indexOf("{");
    if (startIndex > 0) {
      jsonString = jsonString.substring(startIndex);
    }

    // Remove any text after the last }
    const endIndex = jsonString.lastIndexOf("}");
    if (endIndex < jsonString.length - 1) {
      jsonString = jsonString.substring(0, endIndex + 1);
    }

    // Parse JSON
    let parsed;
    try {
      parsed = JSON.parse(jsonString);
    } catch (parseError) {
      console.error("JSON parse error. Response text:", text);
      throw new Error("Failed to parse AI response as JSON");
    }

    // Validate structure
    if (!parsed.questions || !Array.isArray(parsed.questions)) {
      console.error("Invalid response structure:", parsed);
      throw new Error("Invalid response structure: missing questions array");
    }

    // Process and validate questions
    let questions: QuizQuestion[] = parsed.questions.map((q: any, i: number) => {
      // Ensure options is an array with exactly 4 items
      let options: string[] = [];
      
      if (Array.isArray(q.options)) {
        options = q.options.slice(0, 4).map((opt: any) => String(opt));
      }
      
      // Fill missing options
      while (options.length < 4) {
        options.push(`Option ${String.fromCharCode(65 + options.length)}`);
      }

      // Validate and ensure correctAnswer is 0-3
      let correctAnswer = 0;
      if (typeof q.correctAnswer === 'number' && q.correctAnswer >= 0 && q.correctAnswer <= 3) {
        correctAnswer = q.correctAnswer;
      } else if (typeof q.correctAnswer === 'string') {
        const parsed = parseInt(q.correctAnswer, 10);
        if (!isNaN(parsed) && parsed >= 0 && parsed <= 3) {
          correctAnswer = parsed;
        }
      }

      return {
        id: q.id || `q${i + 1}`,
        question: q.question || `Question ${i + 1}?`,
        options,
        correctAnswer,
      };
    });

    // Ensure exactly 20 questions
    if (questions.length < 20) {
      console.warn(`Only ${questions.length} questions generated, filling to 20`);
      
      const fillQuestions: QuizQuestion[] = [];
      const needed = 20 - questions.length;
      
      for (let i = 0; i < needed; i++) {
        const skill = skills[i % skills.length];
        const qNum = questions.length + i + 1;
        
        fillQuestions.push({
          id: `q${qNum}`,
          question: `What is an important consideration when working with ${skill} in a ${experienceLevel} ${jobTitle} role?`,
          options: [
            `Understanding the fundamentals of ${skill}`,
            `Advanced optimization techniques for ${skill}`,
            `Integration of ${skill} with other technologies`,
            `All of the above are important considerations`,
          ],
          correctAnswer: 3,
        });
      }
      
      questions = [...questions, ...fillQuestions];
    } else if (questions.length > 20) {
      questions = questions.slice(0, 20);
    }

    console.log(`Returning ${questions.length} questions`);

    return NextResponse.json({
      success: true,
      questions,
      count: questions.length,
      modelUsed,
      fallback: false,
    });

  } catch (error: any) {
    console.error("Quiz generation error:", error);

    // Comprehensive fallback with properly structured mock questions
    const mockQuestions: QuizQuestion[] = Array.from({ length: 20 }, (_, i) => {
      const skill = skills?.[i % skills.length] || "technical skills";
      const questionTypes = [
        {
          question: `What is the best practice for implementing ${skill} in a ${experienceLevel} role?`,
          options: [
            `Follow industry standards and documentation`,
            `Use only the latest experimental features`,
            `Avoid testing to save time`,
            `Copy code without understanding it`,
          ],
          correctAnswer: 0,
        },
        {
          question: `When working with ${skill}, what should be prioritized?`,
          options: [
            `Code readability and maintainability`,
            `Using as many features as possible`,
            `Ignoring performance concerns`,
            `Avoiding documentation`,
          ],
          correctAnswer: 0,
        },
        {
          question: `How should errors be handled when using ${skill}?`,
          options: [
            `Ignore them and hope they don't occur`,
            `Use proper error handling and logging`,
            `Only log errors in production`,
            `Never show errors to users`,
          ],
          correctAnswer: 1,
        },
        {
          question: `What is essential for ${skill} project success?`,
          options: [
            `Working alone without collaboration`,
            `Proper planning and team communication`,
            `Rushing to complete tasks quickly`,
            `Avoiding code reviews`,
          ],
          correctAnswer: 1,
        },
      ];

      const template = questionTypes[i % questionTypes.length];
      
      return {
        id: `q${i + 1}`,
        question: template.question,
        options: template.options,
        correctAnswer: template.correctAnswer,
      };
    });

    return NextResponse.json({
      success: false,
      error: error.message,
      fallback: true,
      questions: mockQuestions,
      count: mockQuestions.length,
      modelUsed: "fallback",
    }, { status: 200 }); // Return 200 even for fallback so frontend can proceed
  }
};