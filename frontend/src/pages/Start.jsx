import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useInterview } from '../context/InterviewContext';
import { useQuery } from '@tanstack/react-query';

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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          domain: formData?.domain,
          level: formData?.level,
          numQuestions: formData?.questions,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch interview questions');
      }

      return response.json();
    },
    enabled: !!formData,
  });

  useEffect(() => {
    if (!formData) {
      navigate('/setup');
      return;
    }

    if (formData?.sessionId) {
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
    if (submitted) return;
    setSubmitted(true);

    let score = 0;
    const userAnswers = [];

    questions.forEach((q) => {
      const id = q.id || q._id;
      const selected = answers[id]?.selectedOption;
      const isCorrect = selected === q.answer;
      if (isCorrect) score++;

      userAnswers.push({
        question: q.question,
        selectedAnswer: selected || "Not Answered",
        correctAnswer: q.answer,
        isCorrect,
        timestamp: answers[id]?.timestamp,
      });
    });

    setInterviewData({
      ...formData,
      questions,
      answers: userAnswers,
    });

    setScore(score);

    try {
      console.log("Submitting to backend:", {
        sessionId: formData.sessionId,
        answers: userAnswers,
        metadata: formData
      });

      const res = await fetch("http://localhost:5000/api/storeResponses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionId: formData.sessionId,
          answers: userAnswers,
          metadata: formData
        }),
      });

      if (!res.ok) {
        const errText = await res.text();
        console.error("Backend error:", errText);
        throw new Error("Failed to store responses");
      }
    } catch (err) {
      console.error("Failed to store responses:", err);
      setError("Failed to submit your answers. Please try again.");
    }

    navigate('/result');
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  if (loading || isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-center bg-white p-8 rounded-lg shadow-md w-[90%] max-w-md">
          <h2 className="text-3xl font-bold text-blue-600 mb-4">Loading Interview...</h2>
          <p>Loading questions...</p>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 overflow-y-auto transition-opacity duration-500">
      <div className="text-center bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-blue-600 mb-4">Interview in Progress...</h2>

        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
          <div
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
        <p className="text-sm text-gray-600 mb-2">
          Question {currentQuestionIndex + 1} of {questions.length}
        </p>

        <div className="flex flex-col items-center mb-4">
          <p className="text-lg text-gray-700 mb-2"><strong>Domain:</strong> {formData.domain}</p>
          <p className="text-lg text-gray-700 mb-2"><strong>Questions:</strong> {formData.questions}</p>
          <p className="text-lg text-gray-700 mb-2"><strong>Difficulty:</strong> {formData.level}</p>
          <p className="text-lg text-gray-700 mb-2"><strong>Time:</strong> {formData.timer} minute(s)</p>
          <p className="text-sm px-3 py-1 bg-red-100 text-red-600 rounded-full mb-2">
            Time Left: {formatTime(timeLeft)}
          </p>
        </div>

        <h3 className="mt-4 text-xl font-bold">Interview Questions:</h3>
        <ul className="mt-4 text-left">
          {currentQuestion && (
            <li key={currentQuestion.id || currentQuestion._id} className="mb-4">
              <p className="font-semibold text-black dark:text-white mb-2">{currentQuestionIndex + 1}. {currentQuestion.question}</p>
              <ul className="space-y-2">
                {currentQuestion.options?.length > 0 ? (
                  currentQuestion.options.map((opt, i) => (
                    <li key={i}>
                      <label className={`block p-3 border rounded-lg cursor-pointer transition ${answers[currentQuestion.id]?.selectedOption === opt ? 'bg-blue-100 border-blue-500 text-blue-700 font-semibold' : 'bg-white hover:bg-gray-100'}`}>
                        <input
                          type="radio"
                          name={`question-${currentQuestion.id}`}
                          value={opt}
                          onChange={() => handleOptionChange(currentQuestion.id, opt)}
                          className="mr-2"
                          checked={answers[currentQuestion.id]?.selectedOption === opt}
                        />
                        {opt}
                      </label>
                    </li>
                  ))
                ) : (
                  <li>
                    <input
                      type="text"
                      placeholder="Type your answer here"
                      value={answers[currentQuestion.id]?.selectedOption || ''}
                      onChange={(e) => handleOptionChange(currentQuestion.id, e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  </li>
                )}
              </ul>
            </li>
          )}
        </ul>

        <div className="flex justify-between mt-6">
          {currentQuestionIndex > 0 && (
            <button
              onClick={handlePrevious}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
            >
              Previous
            </button>
          )}
          <div className="flex-grow"></div>
          {currentQuestionIndex < questions.length - 1 && (
            <button
              onClick={handleNext}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
            >
              Next
            </button>
          )}
        </div>

        <button
          onClick={handleSubmit}
          className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Submit
        </button>

        {error && <p className="text-red-600 mt-4">{error}</p>}
        <p className="mt-6 text-gray-500 text-sm">Redirecting to results after interview ends...</p>
      </div>
    </div>
  );
}

export default Start;
