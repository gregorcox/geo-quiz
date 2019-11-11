import React from 'react';

class Question extends React.Component {
  constructor(props) {
    super(props);

    this.getRandomCountry = this.getRandomCountry.bind(this);
  }

  // Generate random country from API
  getRandomCountry() {
    return this.props.countries[Math.floor(
        Math.random() * this.props.countries.length
    )];
  }

  render(){
    const selectedCountry = this.getRandomCountry();

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
                <img src={selectedCountry.flag}></img>
            )
            break;
        
        default:
            correctAnswer = "";
    }

    return(
      <div>
        <h1>What is the {this.props.category} of {selectedCountry.name}?</h1>
        {correctAnswer}
      </div>
    )
  }
}

export default Question;
