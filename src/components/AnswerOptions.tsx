import { useMemo, useState } from "react";
import {
  answerButtonClassName,
  primaryButtonSmClassName,
} from "../styles";
import { buildMultipleChoiceAnswers } from "../utils";
import {
  formatCategoryValue,
  getCategoryValue,
  isValidCategoryValue,
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
    if (!isValidCategoryValue(category, correctAnswer)) {
      return null;
    }

    const answerPool = countries
      .map((country) => getCategoryValue(country, category))
      .filter((value): value is CategoryValue =>
        isValidCategoryValue(category, value)
      );

    return buildMultipleChoiceAnswers(correctAnswer, answerPool);
  }, [category, correctAnswer, countries]);

  const checkAnswer = (answer: CategoryValue) => {
    setShowResult(true);
    setButtonsDisabled(true);
    setIsCorrect(answer === correctAnswer);
  };

  const getAnswerButtonClassName = () => {
    if (category === "flag") {
      return `${answerButtonClassName} py-6 text-6xl sm:text-7xl`;
    }

    return `${answerButtonClassName} min-h-[3.5rem]`;
  };

  if (!answers) {
    return (
      <p className="text-center text-sm text-red-600 dark:text-red-400" role="alert">
        Not enough unique answers available for this question.
      </p>
    );
  }

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
            className={getAnswerButtonClassName()}
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
            className={primaryButtonSmClassName}
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
