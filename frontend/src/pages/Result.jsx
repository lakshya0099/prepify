import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useInterview } from '../context/InterviewContext';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

function Result() {
  const { interviewData, score } = useInterview();
  const navigate = useNavigate();
  const location = useLocation();
  const { analysisReport } = location.state || {};

  useEffect(() => {
    if (!interviewData || !interviewData.questions) {
      navigate('/setup');
    }
  }, [interviewData, navigate]);

  if (!interviewData || !interviewData.questions) return null;

  const total = interviewData.questions.length;

  const handleRestart = () => {
    navigate('/setup');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <Card className="max-w-3xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl text-blue-600">Interview Summary</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="text-center">
            <Badge variant="outline" className="text-lg px-4 py-2">
              Score: {score} / {total}
            </Badge>
          </div>

          <Alert>
            <AlertTitle>Performance Feedback</AlertTitle>
            <AlertDescription>
              {score / total >= 0.7
                ? "Well done! You performed well. Keep practicing to improve further."
                : "Don't worry! Review your answers and try again to improve."}
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700">
            <p><strong>Domain:</strong> {interviewData.domain}</p>
            <p><strong>Difficulty:</strong> {interviewData.level}</p>
            <p><strong>Time Taken:</strong> {interviewData.timer} minute(s)</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mt-6 mb-4">Your Answers:</h3>
            <div className="space-y-4">
              {interviewData.answers.map((ans, index) => (
                <Card key={index} className="p-4 border">
                  <p className="font-medium mb-2">
                    {index + 1}. {ans.question}
                  </p>
                  <p>
                    Your Answer:{" "}
                    <span className={ans.isCorrect ? "text-green-600" : "text-red-600"}>
                      {ans.selectedAnswer}
                    </span>
                  </p>
                  {!ans.isCorrect && (
                    <p className="text-gray-600">
                      Correct Answer: <strong>{ans.correctAnswer}</strong>
                    </p>
                  )}
                  <p className="text-2xl mt-2">{ans.isCorrect ? "✅" : "❌"}</p>
                </Card>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <Button onClick={() => navigate('/')}>Go to Home</Button>
            <Button variant="success" onClick={handleRestart}>Try Again</Button>
            <Button variant="secondary" onClick={() => navigate('/analysis-report')}>View Analysis Report</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Result;
