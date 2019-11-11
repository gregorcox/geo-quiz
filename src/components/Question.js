import React from 'react';

class Question extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){

    // Generate random country from API
    const randomCountry = this.props.countries[Math.floor(
        Math.random() * this.props.countries.length
    )];

    return(
      <div>
        <h1>What is the {this.props.category} of {randomCountry.name}?</h1>
      </div>
    )
  }
}

export default Question;
