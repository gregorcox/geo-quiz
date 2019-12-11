import React from 'react';

import { getRandomCountry } from "../utils";
import AnswerOptions from "./AnswerOptions";

class Question extends React.Component {
  render(){
    const selectedCountry = getRandomCountry(this.props.countries);

    return(
      <div className="question-container">
        <h1>What is the {this.props.category} of {selectedCountry.name}?</h1>
        <AnswerOptions correctCountry={selectedCountry} category={this.props.category} countries={this.props.countries} />
      </div>
    )
  }
}

export default Question;
