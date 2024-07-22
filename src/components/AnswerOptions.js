import React, { useCallback, useEffect, useState } from "react";
import { getRandomItem, hasDuplicates, hasEmptyValue, shuffle } from "../utils";

const AnswerOptions = ({
  category,
  correctCountry,
  countries,
  generateNewQuestion,
}) => {
  const [isCorrect, toggleIsCorrect] = useState(null);
  const [buttonsDisabled, toggleButton] = useState(false);
  const [answers, setAnswersArray] = useState([]);

  const generateAnswers = useCallback(() => {
    let answersArray = [];
    answersArray[0] = getRandomItem(countries)[category];
    answersArray[1] = getRandomItem(countries)[category];
    answersArray[2] = getRandomItem(countries)[category];
    answersArray[3] = correctCountry[category];

    setAnswersArray(answersArray);

    // Regenerate the array if there are duplicates or it contains an empty value
    if (hasDuplicates(answersArray) || hasEmptyValue(answersArray)) {
      generateAnswers();
    }

    // Randomise the order in which the answers apear
    shuffle(answersArray);
  }, [category, correctCountry, countries]);

  useEffect(() => {
    generateAnswers();

    toggleIsCorrect(null);
    toggleButton(false);

    // Hide the result from the previous question
    document.getElementsByClassName("result")[0].style.display = "none";
  }, [correctCountry, category, countries, generateAnswers]);

  const checkAnswer = (answer) => {
    document.getElementsByClassName("result")[0].style.display = "flex";
    toggleButton(true);
    toggleIsCorrect(answer === correctCountry[category]);
  };

  const answerButtons = answers.map((answer) => (
    <button
      className={
        category === "flag"
          ? "answer-option answer-flag"
          : "answer-option text-button"
      }
      disabled={buttonsDisabled}
      key={answer}
      onClick={() => checkAnswer(answer)}
    >
      {answer.toLocaleString()}
    </button>
  ));

  return (
    <>
      <div className="answer-options">{answerButtons}</div>

      {isCorrect ? (
        <div className="result result--correct">Correct!</div>
      ) : (
        <div className="result result--incorrect">Wrong!</div>
      )}

      {isCorrect !== null && (
        <button
          className="restart-button"
          onClick={() => {
            generateNewQuestion(isCorrect);
          }}
        >
          Next
        </button>
      )}
    </>
  );
};

export default AnswerOptions;
