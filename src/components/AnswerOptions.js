import React, { useState, useEffect } from 'react';

import {
  getRandomItem,
  shuffle,
  hasDuplicates,
  hasEmptyValue
} from "../utils";

const AnswerOptions = ({ correctCountry, category, countries, generateNewQuestion }) => {
  const [isCorrect, toggleIsCorrect] = useState(null);
  const [buttonsDisabled, toggleButton] = useState(false);
  const [answers, setAnswersArray] = useState([]);

  useEffect(() => {
    generateAnswers();

    toggleIsCorrect(null);
    toggleButton(false);

    // Hide the result from the previous question
    document.getElementsByClassName('result')[0].style.display = "none";
  }, [correctCountry, category, countries]);

  const generateAnswers = () => {

    let answersArray = [];
    answersArray[0] = getRandomItem(countries)[category];
    answersArray[1] = getRandomItem(countries)[category];
    answersArray[2] = correctCountry[category];

    setAnswersArray(answersArray);

    // Regenerate the array if there are duplicates or it contains an empty value
    if (hasDuplicates(answersArray) || hasEmptyValue(answersArray)) {
      generateAnswers();
    }

    // Randomise the order in which the answers apear
    shuffle(answersArray);
  }

  const checkAnswer = (answer) => {
    document.getElementsByClassName('result')[0].style.display = "flex";
    toggleButton(true);
    toggleIsCorrect(answer === correctCountry[category])
  };

  const answerButtons = answers.map((answer) => {
    if (category !== "flag") {
      return (
        <button disabled={buttonsDisabled} className="answer-option text-button" key={answer} onClick={() => checkAnswer(answer)}>
          {answer.toLocaleString()}
        </button>
      )
    } else {
      return (
        <button disabled={buttonsDisabled} type="button" onClick={() => checkAnswer(answer)} className="answer-option" key={answer}>
          <img className="flag" src={answer} alt="flag"></img>
        </button>
      )
    }
  });

  let result = null;
  if (isCorrect) {
    result = <div className="result result--correct">Correct!</div>
  } else {
    result = <div className="result result--incorrect">Wrong!</div>
  }

  let nextButton = null;
  if (isCorrect !== null) {
    nextButton = (
      <button className="restart-button" onClick={() => { generateNewQuestion(isCorrect) }}>
        Next
      </button>
    );
  }

  return (
    <>
      <div className="answer-options">
        {answerButtons}
      </div>

      {result}
      {nextButton}
    </>
  )
};

export default AnswerOptions;
