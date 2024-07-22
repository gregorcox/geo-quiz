import React, { useState } from 'react';

import AnswerOptions from "./AnswerOptions";
import QuizEnd from './QuizEnd';
import { getRandomItem } from "../utils";

interface IProps {
  categories: string[]
  countries: string[]
  number: number
}

const Question = ({ categories, countries, number } : IProps) => {
  let [questionsAnswered, addQuestionAnswered] = useState(0);
  let [correctAnswers, addCorrectAnswer] = useState(0);

  const generateNewQuestion = (prevResult: Boolean) => {
    questionsAnswered++;

    // Add one to the score if the answer was correct
    if (prevResult) correctAnswers++;

    addQuestionAnswered(questionsAnswered)
    addCorrectAnswer(correctAnswers);
  }

  let selectedCountry = getRandomItem(countries);
  let category : string = getRandomItem(categories);

  if (!selectedCountry[category]) {
    selectedCountry = getRandomItem(countries);
    category = getRandomItem(categories);
  };

  // Check if the user has answered every question
  if (questionsAnswered === number) {
    return (
      <QuizEnd score={correctAnswers} questionsAnswered={questionsAnswered} />
    )
  }

  return (
    <div className="question-container">
      <p>{questionsAnswered + 1}/{number}</p>
      <h1 className="title">What is the {category} of {selectedCountry.name}?</h1>

      <AnswerOptions
        correctCountry={selectedCountry}
        category={category}
        countries={countries}
        generateNewQuestion={generateNewQuestion}
      />
    </div>
  )
}

export default Question;
