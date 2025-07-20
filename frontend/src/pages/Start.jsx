import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useInterview } from '../context/InterviewContext';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

function Start() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state;

  const { setInterviewData, setScore } = useInterview();

  const { data, isLoading, error: queryError } = useQuery({
    queryKey: ['interview', formData],
    queryFn: async () => {
      const response = await fetch("http://localhost:5000/api/interview/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          domain: formData?.domain,
          level: formData?.level,
          numQuestions: formData?.questions,
        }),
      });
      if (!response.ok) throw new Error("Failed to fetch interview questions");
      return response.json();
    },
    enabled: !!formData,
    retry: 2,
  });

  useEffect(() => {
    if (!formData) {
      navigate('/setup');
      return;
    }
    if (formData.sessionId) {
      localStorage.setItem('sessionId', formData.sessionId);
    }

    const interviewDuration = formData.timer * 60;
    setTimeLeft(interviewDuration);

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [formData, navigate]);

  useEffect(() => {
    if (data?.questions) {
      setQuestions(data.questions);
      setLoading(false);
    } else if (queryError) {
      setError(queryError.message);
      setLoading(false);
    }
  }, [data, queryError]);

  const handleOptionChange = (questionId, selectedOption) => {
    const timestamp = new Date().toISOString();
    setAnswers((prev) => ({
      ...prev,
      [questionId]: { selectedOption, timestamp },
    }));
  };

  const handleNext = () => {
    setCurrentQuestionIndex((prevIndex) => Math.min(prevIndex + 1, questions.length - 1));
  };

  const handlePrevious = () => {
    setCurrentQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleSubmit = async () => {
    if (submitted || !questions.length) return;
    setSubmitted(true);

    try {
      let score = 0;
      const userAnswers = questions.map((q) => {
        const id = q.id || q._id;
        const selected = answers[id]?.selectedOption;
        const isCorrect = selected === q.answer;
        if (isCorrect) score++;

        return {
          question: q.question,
          selectedAnswer: selected || "Not Answered",
          correctAnswer: q.answer,
          isCorrect,
          timestamp: answers[id]?.timestamp,

          // 🧠 For analysis
          topic: q.topic || formData.domain,
          type: q.type || "MCQ",
          difficulty: q.difficulty || formData.level,
        };
      });

      setInterviewData({
        ...formData,
        questions,
        answers: userAnswers,
      });

      setScore(score);

      const response = await fetch("http://localhost:5000/api/storeResponses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: formData.sessionId,
          answers: userAnswers,
          metadata: formData,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to store responses');
      }

      navigate('/result');
    } catch (err) {
      console.error("Submission Error:", err);
      setError(err.message || "Failed to submit your answers. Please try again.");
      setSubmitted(false);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  if (loading || isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-200 dark:border-gray-800"
        >
          <h2 className="text-2xl font-medium text-gray-900 dark:text-gray-100 mb-4">
            Preparing Your Interview
          </h2>
          <p className="text-gray-600 dark:text-gray-400">Generating tailored questions...</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-200 dark:border-gray-800"
        >
          <h2 className="text-2xl font-medium text-gray-900 dark:text-gray-100 mb-4">
            Error Loading Interview
          </h2>
          <p className="text-red-600 dark:text-red-400 mb-6">{error}</p>
          <Button onClick={() => navigate('/setup')}>Return to Setup</Button>
        </motion.div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl bg-white dark:bg-gray-900/95 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 p-6"
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-medium text-gray-900 dark:text-gray-100">{formData.domain}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {formData.level} • {formData.questions} questions
            </p>
          </div>
          <div className="bg-red-100 dark:bg-red-900/30 px-3 py-1 rounded-full">
            <span className="text-red-600 dark:text-red-400 font-medium">
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>

        <Progress value={((currentQuestionIndex + 1) / questions.length) * 100} className="h-2 mb-6" />

        <div className="mb-8">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
            Question {currentQuestionIndex + 1} of {questions.length}
          </p>
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            {currentQuestion?.question}
          </h3>

          <ul className="space-y-3">
            {currentQuestion?.options?.map((opt, i) => (
              <li key={i}>
                <button
                  onClick={() => handleOptionChange(currentQuestion.id, opt)}
                  className={`w-full text-left p-4 rounded-lg border transition-all ${
                    answers[currentQuestion.id]?.selectedOption === opt
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                      : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  {opt}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-between">
          <Button onClick={handlePrevious} variant="outline" disabled={currentQuestionIndex === 0}>
            Previous
          </Button>
          {currentQuestionIndex < questions.length - 1 ? (
            <Button onClick={handleNext}>Next</Button>
          ) : (
            <Button onClick={handleSubmit} disabled={submitted}>
              {submitted ? 'Submitting...' : 'Submit Interview'}
            </Button>
          )}
        </div>

        {error && (
          <div className="mt-4 text-red-600 dark:text-red-400 text-sm">{error}</div>
        )}
      </motion.div>
    </div>
  );
}

export default Start;
