import express from 'express';
import connectToDatabase from '../database/mongoConnection.js';

const router = express.Router();

router.post('/analysis', async (req, res) => {
  const { sessionId } = req.body;

  if (!sessionId) {
    return res.status(400).json({ message: 'Session ID is required' });
  }

  console.log("Requested sessionId:", sessionId);

  try {
    const db = await connectToDatabase();
    const collection = db.collection('responses');

    const responses = await collection.find({ sessionId }).toArray();

    if (responses.length === 0) {
      return res.status(404).json({ message: 'No responses found for this sessionId' });
    }

    const allAnswers = responses.flatMap(r => r.answers || []);

    const correctAnswers = allAnswers.filter(a => a.isCorrect).length;
    const totalQuestions = allAnswers.length;
    const scorePercentage = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;

    const incorrectAnswers = allAnswers.filter(a => !a.isCorrect);

    // ✅ Breakdown objects
    const topicBreakdown = {};
    const typeBreakdown = {};
    const difficultyBreakdown = {};

incorrectAnswers.forEach(ans => {
  // Now access the nested question object
  const topic = ans.question?.topic || 'Untagged';
  const type = ans.question?.type || 'Unknown';
  const difficulty = ans.question?.difficulty || 'Unknown';

  topicBreakdown[topic] = (topicBreakdown[topic] || 0) + 1;
  typeBreakdown[type] = (typeBreakdown[type] || 0) + 1;
  difficultyBreakdown[difficulty] = (difficultyBreakdown[difficulty] || 0) + 1;
});

    const analysisReport = {
      sessionId,
      correctAnswers,
      totalQuestions,
      scorePercentage,
      topicBreakdown,
      typeBreakdown,
      difficultyBreakdown,
      responses: allAnswers,
    };

    res.status(200).json({ analysisReport,incorrectAnswers });

  } catch (error) {
    console.error("Error generating analysis report:", error);
    res.status(500).json({ message: 'Failed to generate analysis report', error });
  }
});

export default router;
