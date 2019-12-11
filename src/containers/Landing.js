import React from 'react';

import CountryContainer from "./CountryContainer";

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        region: 'all',
        loadQuiz: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(evt) {
    const { state } = this;
    state[evt.target.name] = evt.target.value;
    this.setState(state);
  }

  handleClick() {
      this.setState({
        loadQuiz: true
      });
  }


  render(){
    if (this.state.loading) {
        return (
            <div className ="loader"/>
        );
    }

    if (this.state.loadQuiz) {
        return <CountryContainer region={this.state.region}/>
    }

    return(
        <div className="quiz-options">
            <label>Select a region:</label>
            <select name="region" onChange={this.handleChange}>
                <option value="all">All</option>
                <option value="africa">Africa</option>
                <option value="americas">Americas</option>
                <option value="asia">Asia</option>
                <option value="europe">Europe</option>
                <option value="oceania">Oceania</option>
            </select>

            <button onClick={this.handleClick}>Continue</button>
        </div>
    )
  }
}

export default Landing;

