"use client";

import { useMemo, useState } from "react";

const questions = [
  {
    id: "auth",
    question: "Does the client need user authentication?",
    options: ["Email & Password", "Google OAuth", "Both"],
  },
  {
    id: "gateway",
    question: "What payment gateway should be integrated?",
    options: ["Midtrans", "Xendit", "Bank Transfer"],
  },
  {
    id: "roles",
    question: "Does the admin dashboard need role-based access?",
    options: ["Owner only", "Admin + Staff", "Custom roles"],
  },
  {
    id: "mobile",
    question: "Should the app support mobile (PWA or native)?",
    options: ["Responsive web", "PWA", "Native later"],
  },
];

export const useAiAssistant = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const currentQuestion = questions[currentIndex] ?? questions[questions.length - 1];

  const upcomingQuestions = useMemo(() => {
    return questions.slice(currentIndex + 1).map((item) => item.question);
  }, [currentIndex]);

  const selectedAnswer = answers[currentQuestion.id];

  const chooseAnswer = (answer: string) => {
    setAnswers((current) => ({
      ...current,
      [currentQuestion.id]: answer,
    }));

    setTimeout(() => {
      setCurrentIndex((value) => Math.min(value + 1, questions.length - 1));
    }, 250);
  };

  return {
    answers,
    currentQuestion,
    selectedAnswer,
    upcomingQuestions,
    chooseAnswer,
  };
};
