import express from 'express';
import connectToDatabase from '../database/mongoConnection.js';

const router = express.Router();

router.post('/storeResponses', async (req, res) => {
  const { answers, sessionId, metadata } = req.body;

  try {
    const db = await connectToDatabase();
    const collection = db.collection('responses');

    // Enhance answers with full question data
    const enhancedAnswers = answers.map(answer => ({
      ...answer,
      question: {  // Preserve all question metadata
        id: answer.questionId,
        text: answer.questionText,
        topic: answer.topic,
        type: answer.type,
        difficulty: answer.difficulty,
        options: answer.options
      },
      isCorrect: answer.isCorrect,
      selectedOption: answer.selectedOption
    }));

    await collection.insertOne({ 
      sessionId, 
      answers: enhancedAnswers, 
      metadata, 
      createdAt: new Date() 
    });

    const correctAnswers = enhancedAnswers.filter(answer => answer.isCorrect).length;
    const totalQuestions = enhancedAnswers.length;
    const scorePercentage = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;

    res.status(200).json({ 
      message: 'Responses stored successfully', 
      analysisReport: {
        correctAnswers,
        totalQuestions,
        scorePercentage
      }
    });
  } catch (error) {
    console.error("Error storing responses:", error);
    res.status(500).json({ message: 'Failed to store responses', error });
  }
});export default router;