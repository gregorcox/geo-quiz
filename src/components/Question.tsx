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
      <Suspense
        fallback={
          <div
            className="mx-auto h-12 w-12 animate-spin-slow rounded-full border-4 border-slate-200 border-t-sky-600 dark:border-slate-700 dark:border-t-sky-400"
            aria-label="Loading results"
          />
        }
      >
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
    <section
      aria-labelledby="question-heading"
      className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
    >
      <span className="absolute right-4 top-4 rounded-full bg-sky-600 px-3 py-1 text-xs font-semibold text-white dark:bg-sky-500">
        {questionsAnswered + 1}/{number}
      </span>

      <h2 id="question-heading" className="mt-6 text-center text-xl font-semibold sm:text-2xl">
        What is the {category} of{" "}
        <span className="text-sky-700 dark:text-sky-300">
          {selectedCountry.name.common}
        </span>
        ?
      </h2>

      <div className="mt-8">
        <AnswerOptions
          key={`${selectedCountry.name.common}-${category}-${questionsAnswered}`}
          category={category}
          correctCountry={selectedCountry}
          countries={countries}
          onNextQuestion={handleNextQuestion}
        />
      </div>
    </section>
  );
};

export default Question;
