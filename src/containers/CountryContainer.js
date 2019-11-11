import React from 'react';
import Question from "../components/Question";

class CountryContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [],
      random: {},
      loading: true
    };
  }

  componentDidMount(){
    const url = 'https://restcountries.eu/rest/v2/all';
    fetch(url)
      .then((res) => res.json())
      .then((countries) => this.setState({ 
          countries,
          loading: false 
        }));
  }

  render(){
    if (this.state.loading) {
        return (
            // TODO: Create loading spinner
            <div />
        );
    }
    
    const randomCountry = this.state.countries[Math.floor(
        Math.random() * this.state.countries.length)];
    console.log(randomCountry);
    return(
      <div>
        <h1>Country</h1>
        <Question country={randomCountry} />
      </div>
    )
  }
}

export default CountryContainer;

