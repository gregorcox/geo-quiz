import { useCallback, useEffect, useState } from "react";
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
  const [answers, setAnswers] = useState<CategoryValue[]>([]);
  const [showResult, setShowResult] = useState(false);

  const correctAnswer = getCategoryValue(correctCountry, category);

  const generateAnswers = useCallback(() => {
    if (correctAnswer === undefined) {
      return;
    }

    let answersArray: CategoryValue[] = [];

    do {
      const wrongAnswers = countries
        .map((country) => getCategoryValue(country, category))
        .filter((value): value is CategoryValue => value !== undefined && value !== "");

      answersArray = [
        getRandomItem(wrongAnswers),
        getRandomItem(wrongAnswers),
        getRandomItem(wrongAnswers),
        correctAnswer,
      ];
    } while (hasDuplicates(answersArray) || hasEmptyValue(answersArray));

    setAnswers(shuffle(answersArray));
  }, [category, correctAnswer, countries]);

  useEffect(() => {
    generateAnswers();
    setIsCorrect(null);
    setButtonsDisabled(false);
    setShowResult(false);
  }, [correctCountry, category, countries, generateAnswers]);

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
