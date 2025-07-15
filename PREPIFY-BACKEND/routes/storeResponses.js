import express from 'express';
import connectToDatabase from '../database/mongoConnection.js';

const router = express.Router();

router.post('/storeResponses', async (req, res) => {
  const { answers, sessionId, metadata } = req.body;

  try {
    const db = await connectToDatabase();
    const collection = db.collection('responses');

    // Store responses in the database
    await collection.insertOne({ sessionId, answers, metadata, createdAt: new Date() });

    // Generate analysis report for the user
    const correctAnswers = answers.filter(answer => answer.isCorrect).length;
    const totalQuestions = answers.length;
    const scorePercentage = (correctAnswers / totalQuestions) * 100;

    const analysisReport = {
      correctAnswers,
      totalQuestions,
      scorePercentage,
      responses: answers,
    };

    res.status(200).json({ message: 'Responses stored successfully', analysisReport });
  } catch (error) {
    console.error("Error storing responses:", error);
    res.status(500).json({ message: 'Failed to store responses', error });
  }
});

export default router;