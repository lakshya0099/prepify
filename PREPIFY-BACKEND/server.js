import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import interviewRoutes from './routes/interviewRoutes.js';
import storeResponsesRoutes from './routes/storeResponses.js';
import analysisRoutes from './routes/analysis.js';




const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api', storeResponsesRoutes);
app.use('/api', analysisRoutes);

app.use("/api/interview/", interviewRoutes);

app.get('/', (req, res) => {
  res.send('Prepify backend is running');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
