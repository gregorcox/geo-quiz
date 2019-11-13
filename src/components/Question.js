import React from 'react';

import { getRandomCountry } from "../utils";
import AnswerOptions from "./AnswerOptions";

class Question extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    const selectedCountry = getRandomCountry(this.props.countries);

    let correctAnswer;
    switch (this.props.category) {
        case "capital":
            correctAnswer = (
                <h1>{selectedCountry.capital}</h1>
            )
            break;
        
        case "population":
            correctAnswer = (
                <h1>{selectedCountry.population}</h1>
            )
            break;
        
        case "flag":
            correctAnswer = (
                <img className="flag" src={selectedCountry.flag} alt="flag"></img>
            )
            break;
        
        default:
            correctAnswer = "";
    }

    return(
      <div>
        <h1>What is the {this.props.category} of {selectedCountry.name}?</h1>
        {correctAnswer}
        <AnswerOptions category={this.props.category} countries={this.props.countries} />
      </div>
    )
  }
}

export default Question;
