import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const POST = async (req) => {
  try {
    const { jobTitle, skills, experienceLevel } = await req.json();

    // Validate inputs
    if (!jobTitle || !skills || !experienceLevel) {
      return NextResponse.json(
        { error: "Missing required fields: jobTitle, skills, experienceLevel" },
        { status: 400 },
      );
    }

    // Build a very explicit prompt
    const prompt = `You are a technical hiring assistant. Generate exactly 21 multiple-choice quiz questions.

Job Title: ${jobTitle}
Experience Level: ${experienceLevel}
Key Skills to Focus On: ${Array.isArray(skills) ? skills.join(", ") : skills}

CRITICAL INSTRUCTIONS:
- Return ONLY valid JSON, nothing else
- Do NOT include markdown formatting, code blocks, or explanations
- Do NOT wrap in triple backticks
- Each question must have exactly 4 options
- The "answer" field must be the index (0, 1, 2, or 3) of the correct option

Return this exact JSON structure:
{
  "questions": [
    {
      "question": "What is the first question?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "answer": 0
    },
    {
      "question": "What is the second question?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "answer": 2
    }
  ]
}

Generate all 21 questions now in the format above:`;

    console.log(
      "Sending request to Gemini with prompt:",
      prompt.substring(0, 200) + "...",
    );

    // Call Gemini API
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        maxOutputTokens: 4000,
        temperature: 0.3,
      },
    });

    console.log("Gemini response received, processing...");

    // Extract text from response - handle different response structures
    let raw = "";

    if (response.text) {
      raw = response.text;
    } else if (response.candidates && response.candidates[0]) {
      const candidate = response.candidates[0];
      if (
        candidate.content &&
        candidate.content.parts &&
        candidate.content.parts[0]
      ) {
        raw = candidate.content.parts[0].text;
      }
    } else if (response.outputs && response.outputs[0]) {
      raw = response.outputs[0].text;
    }

    // Check if we got any response
    if (!raw || raw.trim() === "") {
      console.error(
        "Empty response from Gemini API. Full response object:",
        JSON.stringify(response, null, 2),
      );
      throw new Error(
        "Gemini API returned an empty response. Check API key and quota.",
      );
    }

    console.log(
      "Raw response from Gemini (first 500 chars):",
      raw.substring(0, 500),
    );

    // Clean the response - remove markdown formatting if present
    let cleaned = raw
      .replace(/```json\s*/g, "")
      .replace(/```\s*/g, "")
      .trim();

    // Also try to extract JSON if it's wrapped in other text
    const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      cleaned = jsonMatch[0];
    }

    console.log(
      "Cleaned response (first 500 chars):",
      cleaned.substring(0, 500),
    );

    // Parse JSON
    let data;
    try {
      data = JSON.parse(cleaned);
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError.message);
      console.error("Failed to parse:", cleaned.substring(0, 1000));
      throw new Error(`Invalid JSON from Gemini: ${parseError.message}`);
    }

    // Validate the structure
    if (!data.questions || !Array.isArray(data.questions)) {
      throw new Error("Response missing 'questions' array");
    }

    if (data.questions.length === 0) {
      throw new Error("No questions were generated");
    }

    console.log(`Successfully generated ${data.questions.length} questions`);

    return NextResponse.json(data.questions);
  } catch (error) {
    console.error("Error in generate-quiz endpoint:", error.message);
    console.error("Full error:", error);

    return NextResponse.json(
      {
        error: error.message || "Failed to generate quiz",
        details:
          process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
      { status: 500 },
    );
  }
};
