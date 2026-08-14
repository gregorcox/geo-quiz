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

  const answerButtons = answers.map((answer) => (
    <button
      type="button"
      className={
        category === "flag"
          ? "answer-option answer-flag"
          : "answer-option text-button"
      }
      disabled={buttonsDisabled}
      key={`${category}-${String(answer)}`}
      onClick={() => checkAnswer(answer)}
    >
      {formatCategoryValue(answer)}
    </button>
  ));

  return (
    <>
      <div className="answer-options">{answerButtons}</div>

      {showResult &&
        (isCorrect ? (
          <div className="result result--correct">Correct!</div>
        ) : (
          <div className="result result--incorrect">Wrong!</div>
        ))}

      {isCorrect !== null && (
        <button
          type="button"
          className="restart-button"
          onClick={() => onNextQuestion(isCorrect)}
        >
          Next
        </button>
      )}
    </>
  );
};

export default AnswerOptions;
