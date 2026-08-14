import { lazy, Suspense, useState } from "react";
import { getRandomItem } from "../utils";
import AnswerOptions from "./AnswerOptions";
import {
  getCategoryValue,
  type Country,
  type QuizCategory,
} from "../types/quiz";

const QuizEnd = lazy(() => import("./QuizEnd"));

interface QuestionProps {
  categories: QuizCategory[];
  countries: Country[];
  number: number;
}

const Question = ({ categories, countries, number }: QuestionProps) => {
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const handleNextQuestion = (wasCorrect: boolean) => {
    if (wasCorrect) {
      setCorrectAnswers((previous) => previous + 1);
    }

    setQuestionsAnswered((previous) => previous + 1);
  };

  if (questionsAnswered >= number) {
    return (
      <Suspense fallback={<div className="loader" aria-label="Loading results" />}>
        <QuizEnd score={correctAnswers} questionsAnswered={number} />
      </Suspense>
    );
  }

  let selectedCountry = getRandomItem(countries);
  let category = getRandomItem(categories);

  for (let attempt = 0; attempt < 20; attempt++) {
    if (getCategoryValue(selectedCountry, category)) {
      break;
    }

    selectedCountry = getRandomItem(countries);
    category = getRandomItem(categories);
  }

  return (
    <div className="question-container">
      <span className="score-count">
        {questionsAnswered + 1}/{number}
      </span>
      <h3 className="title">
        What is the {category} of {selectedCountry.name.common}?
      </h3>

      <AnswerOptions
        key={`${selectedCountry.name.common}-${category}-${questionsAnswered}`}
        category={category}
        correctCountry={selectedCountry}
        countries={countries}
        onNextQuestion={handleNextQuestion}
      />
    </div>
  );
};

export default Question;
