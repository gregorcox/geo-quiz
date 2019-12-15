import React from 'react';

import { getRandomCountry } from "../utils";
import AnswerOptions from "./AnswerOptions";

class Question extends React.Component {
  render(){
    const selectedCountry = getRandomCountry(this.props.countries);

    const {categories} = this.props;
    const randomCategory = categories[Math.floor(
      Math.random() * categories.length
    )];

    return(
      <div className="question-container">
        <h1>What is the {randomCategory} of {selectedCountry.name}?</h1>
        <AnswerOptions correctCountry={selectedCountry} category={randomCategory} categoryOptions={categories} countries={this.props.countries} />
      </div>
    )
  }
}

export default Question;
