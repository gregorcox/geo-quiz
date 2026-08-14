import { useState } from "react";
import { getRandomItem } from "../utils";
import AnswerOptions from "./AnswerOptions";
import QuizEnd from "./QuizEnd";
import {
  getCategoryValue,
  type Country,
  type QuizCategory,
} from "../types/quiz";

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
    return <QuizEnd score={correctAnswers} questionsAnswered={number} />;
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
