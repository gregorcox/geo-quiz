import React from 'react';

import AnswerOptions from "./AnswerOptions";

import { getRandomItem } from "../utils";

class Question extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newQuestionGenerated: false
    }

    this.generateNewQuestion = this.generateNewQuestion.bind(this);
  }

  generateNewQuestion() {
    this.setState({
      newQuestionGenerated: true
    });
  }

  render(){
    const { categories, countries } = this.props;

    const selectedCountry = getRandomItem(countries);
    const category = getRandomItem(categories);

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
