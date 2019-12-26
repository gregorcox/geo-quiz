import React from 'react';

import AnswerOptions from "./AnswerOptions";
import QuizEnd from './QuizEnd';

import { getRandomItem } from "../utils";

class Question extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newQuestionGenerated: false,
      questionsAnswered: 0,
      correctAnswers: 0
    }

    this.generateNewQuestion = this.generateNewQuestion.bind(this);
  }

  generateNewQuestion(prevResult) {
    let { questionsAnswered, correctAnswers } = this.state;
    questionsAnswered++;

    // Add one to the score if the answer was correct
    if (prevResult) correctAnswers++;

    this.setState({
      newQuestionGenerated: true,
      questionsAnswered,
      correctAnswers
    });
  }

  render(){
    const { categories, countries, number } = this.props;

    let selectedCountry = getRandomItem(countries);
    let category = getRandomItem(categories);

    if (!selectedCountry[category]) {
      selectedCountry = getRandomItem(countries);
      category = getRandomItem(categories);
    };

    // Check if the user has answered every question
    if (this.state.questionsAnswered === number) {
      return (
        <QuizEnd score={this.state.correctAnswers} questionsAnswered={this.state.questionsAnswered} />
      )
    }

    return(
      <div className="question-container">
        <h1 className="title">What is the {category} of {selectedCountry.name}?</h1>
        <AnswerOptions
          correctCountry={selectedCountry}
          category={category}
          countries={countries}
          generateNewQuestion={this.generateNewQuestion}
        />
      </div>
    )
  }
}

export default Question;
