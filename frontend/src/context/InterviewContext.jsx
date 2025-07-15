// src/context/InterviewContext.js
import { createContext, useState, useContext } from "react";

const InterviewContext = createContext();

export const InterviewProvider = ({ children }) => {
  const [interviewData, setInterviewData] = useState({
    domain: "",
    questionsCount: 5,
    level: "easy",
    timer: 30,
    questions: [],  // Store fetched questions
    answers: [],    // Store user-selected answers
  });

  const [score, setScore] = useState(0); // Track correct answers

  return (
    <InterviewContext.Provider
      value={{ interviewData, setInterviewData, score, setScore }}
    >
      {children}
    </InterviewContext.Provider>
  );
};

export const useInterview = () => useContext(InterviewContext);
