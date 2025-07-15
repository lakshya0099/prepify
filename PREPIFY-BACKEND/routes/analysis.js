import express from 'express';
import connectToDatabase from '../database/mongoConnection.js';

const router = express.Router();

router.post('/analysis', async (req, res) => {
  const { sessionId } = req.body;

  if (!sessionId) {
    return res.status(400).json({ message: 'Session ID is required' });
  }

  console.log("Requested sessionId:", sessionId); // For debugging

  try {
    const db = await connectToDatabase();
    const collection = db.collection('responses');

    const responses = await collection.find({ sessionId }).toArray();

    if (responses.length === 0) {
      return res.status(404).json({ message: 'No responses found for this sessionId' });
    }

    const analysisReport = responses.map(response => {
      const answers = response.answers || [];
      const correctAnswers = answers.filter(answer => answer.isCorrect).length;
      const totalQuestions = answers.length;
      const scorePercentage = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;

      return {
        sessionId: response.sessionId,
        correctAnswers,
        totalQuestions,
        scorePercentage,
        responses: answers,
      };
    });

    res.status(200).json({ analysisReport });
  } catch (error) {
    console.error("Error generating analysis report:", error);
    res.status(500).json({ message: 'Failed to generate analysis report', error });
  }
});

export default router;
