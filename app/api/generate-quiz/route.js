import { NextResponse } from "next/server";

import OpenAI from "openai";


const openai = new OpenAI({
    apiKey:process.env.OPENAI_API_KEY
})


export const POST = async (req) => {
    const experience_level = "junior";

  try {
    const { jobTitle } = await req.json();
   const completion = await openai.chat.completions.create({
    model:"gpt-4o-mini",
    messages:[
        {
            role:"system",
            content:"You are a technical hiring assistant. Generate 20 multiple choice questions quiz in JSON format."
        },
        {
            role: "user",
            content: `create a quiz for a ${jobTitle} position according to candidate level of experience ${experience_level}.
            Return only a JSON object with a "questions" array.
            Each object: {"question":"string","options":["a","b","c","d"], "answer": 0}
            `
        },
    ],

    response_format:{type:"json_object"}

   })

   const data = JSON.parse(completion.choices[0].message.content)
   return NextResponse.json(data.questions);

   
  } catch (error) {
   console.error("OpenAI Error:", error);
    return NextResponse.json({ error: "Failed to generate quiz" }, { status: 500 });
  }
};

