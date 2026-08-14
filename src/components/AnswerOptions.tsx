import { useMemo, useState } from "react";
import { getRandomItem, hasDuplicates, hasEmptyValue, shuffle } from "../utils";
import {
  formatCategoryValue,
  getCategoryValue,
  type CategoryValue,
  type Country,
  type QuizCategory,
} from "../types/quiz";

interface AnswerOptionsProps {
  category: QuizCategory;
  correctCountry: Country;
  countries: Country[];
  onNextQuestion: (wasCorrect: boolean) => void;
}

const primaryButtonClassName =
  "rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 dark:bg-sky-500 dark:hover:bg-sky-400";

const AnswerOptions = ({
  category,
  correctCountry,
  countries,
  onNextQuestion,
}: AnswerOptionsProps) => {
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const correctAnswer = getCategoryValue(correctCountry, category);

  const answers = useMemo(() => {
    if (correctAnswer === undefined) {
      return [];
    }

    const wrongAnswers = countries
      .map((country) => getCategoryValue(country, category))
      .filter(
        (value): value is CategoryValue => value !== undefined && value !== ""
      );

    const buildAnswers = (): CategoryValue[] => {
      while (true) {
        const nextAnswers = [
          getRandomItem(wrongAnswers),
          getRandomItem(wrongAnswers),
          getRandomItem(wrongAnswers),
          correctAnswer,
        ];

        if (!hasDuplicates(nextAnswers) && !hasEmptyValue(nextAnswers)) {
          return nextAnswers;
        }
      }
    };

    return shuffle(buildAnswers());
  }, [category, correctAnswer, countries]);

  const checkAnswer = (answer: CategoryValue) => {
    setShowResult(true);
    setButtonsDisabled(true);
    setIsCorrect(answer === correctAnswer);
  };

  const answerButtonClassName =
    "rounded-xl border border-slate-200 bg-white px-4 py-3 text-left font-medium transition hover:border-sky-400 hover:bg-sky-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 disabled:cursor-default disabled:opacity-70 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-sky-500 dark:hover:bg-slate-700/80";

  return (
    <div className="space-y-6">
      <div
        className={
          category === "flag"
            ? "grid grid-cols-1 gap-4 sm:grid-cols-2"
            : "grid grid-cols-1 gap-3 sm:grid-cols-2"
        }
        role="group"
        aria-label="Answer options"
      >
        {answers.map((answer) => (
          <button
            type="button"
            className={`${answerButtonClassName} ${
              category === "flag" ? "py-6 text-center text-6xl sm:text-7xl" : ""
            }`}
            disabled={buttonsDisabled}
            key={`${category}-${String(answer)}`}
            onClick={() => checkAnswer(answer)}
          >
            {formatCategoryValue(answer)}
          </button>
        ))}
      </div>

      {showResult ? (
        <p
          role="status"
          className={`rounded-lg px-4 py-2 text-center text-sm font-semibold text-white ${
            isCorrect ? "bg-emerald-600" : "bg-red-600"
          }`}
        >
          {isCorrect ? "Correct!" : "Wrong!"}
        </p>
      ) : null}

      {isCorrect !== null ? (
        <div className="flex justify-center">
          <button
            type="button"
            className={primaryButtonClassName}
            onClick={() => onNextQuestion(isCorrect)}
          >
            Next
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default AnswerOptions;
