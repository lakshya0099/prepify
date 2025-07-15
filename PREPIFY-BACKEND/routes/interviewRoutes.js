import express from "express";
import generateInterviewQuestions from "./gemini.js";

const router = express.Router();

router.post("/generate", async (req, res) => {
  const { domain, level, numQuestions } = req.body;

  if (!domain || !level || !numQuestions) {
    return res.status(400).json({ 
      success: false, 
      message: "Missing required fields" 
    });
  }

  try {
    const questions = await generateInterviewQuestions(domain, level, parseInt(numQuestions));
    res.json({ success: true, questions: questions.questions });
  } catch (err) {
    console.error("Error in generate route:", err);
    res.status(500).json({ 
      success: false, 
      message: err.message || "Internal server error"
    });
  }
});

export default router;
