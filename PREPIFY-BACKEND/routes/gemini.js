import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function generateInterviewQuestions(domain, level, numQuestions) {
  try {
    const prompt = `Generate ${numQuestions} ${level} level interview questions on ${domain}.
Return the response strictly in this JSON format:
{
  "questions": [
    {
      "id": 1,
      "question": "question text",
      "options": ["option1", "option2", "option3", "option4"],
      "answer": "correct option text"
    }
  ]
}`;

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    const cleanText = text.replace(/```json|```/g, "").trim();
    const parsedResponse = JSON.parse(cleanText);

    if (!parsedResponse.questions || !Array.isArray(parsedResponse.questions)) {
      throw new Error("Invalid response format from Gemini");
    }

    return parsedResponse;
  } catch (error) {
    console.error("Error generating questions:", error);
    throw new Error(`Failed to generate questions: ${error.message}`);
  }
}
