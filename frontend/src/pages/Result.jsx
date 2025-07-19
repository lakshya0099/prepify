import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useInterview } from '../context/InterviewContext';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, XCircle, Trophy, Clock, Target, BookOpen, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

function Result() {
  const { theme, toggleTheme } = useTheme();
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
  const percentage = Math.round((score / total) * 100);
  const isExcellent = percentage >= 90;
  const isGood = percentage >= 70;
  const isAverage = percentage >= 50;

  const getScoreColor = () => {
    if (isExcellent) return 'text-emerald-600 border-emerald-200 bg-emerald-50 dark:bg-emerald-900/30';
    if (isGood) return 'text-blue-600 border-blue-200 bg-blue-50 dark:bg-blue-900/30';
    if (isAverage) return 'text-amber-600 border-amber-200 bg-amber-50 dark:bg-yellow-900/30';
    return 'text-red-600 border-red-200 bg-red-50 dark:bg-red-900/30';
  };

  const getPerformanceMessage = () => {
    if (isExcellent) return {
      title: "Outstanding Performance!",
      message: "Exceptional work! You've demonstrated mastery of the subject matter. Your expertise shines through in your responses."
    };
    if (isGood) return {
      title: "Strong Performance",
      message: "Well done! You've shown solid understanding and competency. Continue practicing to reach excellence."
    };
    if (isAverage) return {
      title: "Room for Improvement",
      message: "You're on the right track. Focus on strengthening your fundamentals and practice regularly to enhance your skills."
    };
    return {
      title: "Needs Attention",
      message: "This is a learning opportunity. Review the concepts thoroughly and practice more to build confidence and competency."
    };
  };

  const handleRestart = () => {
    navigate('/setup');
  };

  const performanceData = getPerformanceMessage();



  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-12 px-4 text-slate-800 dark:text-slate-100">
      
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-300 text-sm font-medium">
            <Trophy className="w-4 h-4" />
            Interview Assessment Complete
          </div>
          <h1 className="text-4xl font-bold tracking-tight">
            Performance Summary
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Comprehensive evaluation of your interview responses
          </p>
        </div>

        {/* Score Card */}
        <Card className="border-0 shadow-lg bg-white/70 dark:bg-slate-800/80 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-xl">
                <div className="text-center">
                  <div className="text-3xl font-bold">{percentage}%</div>
                  <div className="text-sm opacity-90">Score</div>
                </div>
              </div>

              <div className="space-y-2">
                <Badge className={`text-lg px-6 py-2 font-semibold ${getScoreColor()}`}>
                  {score} out of {total} questions correct
                </Badge>
                <p className="text-slate-600 dark:text-slate-300">
                  {performanceData.title}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance Alert */}
        <Alert className="border-0 shadow-md bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
          <Trophy className="h-5 w-5" />
          <AlertTitle className="text-lg font-semibold">
            {performanceData.title}
          </AlertTitle>
          <AlertDescription className="mt-2 text-slate-700 dark:text-slate-300">
            {performanceData.message}
          </AlertDescription>
        </Alert>

        {/* Interview Details */}
        <Card className="border-0 shadow-lg bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl font-semibold flex items-center gap-2">
              <Target className="w-5 h-5" />
              Interview Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                <BookOpen className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Domain</p>
                  <p className="font-semibold">{interviewData.domain}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                <Target className="w-5 h-5 text-purple-500" />
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Difficulty</p>
                  <p className="font-semibold capitalize">{interviewData.level}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                <Clock className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Duration</p>
                  <p className="font-semibold">{interviewData.timer} minute(s)</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Results */}
        <Card className="border-0 shadow-lg bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              Detailed Response Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {interviewData.answers.map((ans, index) => (
                <Card key={index} className="border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-700/50 hover:bg-white/70 dark:hover:bg-slate-700/70 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-600 flex items-center justify-center text-sm font-medium text-slate-600 dark:text-white">
                        {index + 1}
                      </div>
                      <div className="flex-1 space-y-3">
                        <h4 className="font-semibold leading-relaxed">
                          {ans.question}
                        </h4>

                        <div className="flex items-center gap-2">
                          <span className="text-sm text-slate-600 dark:text-slate-300">Your Answer:</span>
                          <span className={`font-medium ${ans.isCorrect ? 'text-emerald-600' : 'text-red-600'}`}>
                            {ans.selectedAnswer}
                          </span>
                          {ans.isCorrect ? (
                            <CheckCircle className="w-4 h-4 text-emerald-500" />
                          ) : (
                            <XCircle className="w-4 h-4 text-red-500" />
                          )}
                        </div>

                        {!ans.isCorrect && (
                          <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-lg border-l-4 border-blue-500">
                            <span className="text-sm text-slate-600 dark:text-slate-300">Correct Answer: </span>
                            <span className="font-semibold">{ans.correctAnswer}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 pt-6">
          <Button
            onClick={() => navigate('/')}
            variant="outline"
            className="px-6 py-3 font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            Return Home
          </Button>
          <Button
            onClick={handleRestart}
            className="px-6 py-3 font-medium bg-blue-600 hover:bg-blue-700 text-white transition-colors"
          >
            Take Another Interview
          </Button>
          <Button
            onClick={() => navigate('/analysis-report')}
            variant="outline"
            className="px-6 py-3 font-medium border-purple-300 text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/40 transition-colors"
          >
            View Detailed Analysis
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Result;
