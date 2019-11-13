import React from 'react';
import Question from "../components/Question";

class CountryContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [],
      random: {},
      categories: ["capital", "flag", "population"],
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
            <div className ="loader"/>
        );
    }
    
    const randomCategory = this.state.categories[Math.floor(
        Math.random() * this.state.categories.length
    )];

    return(
        <Question countries={this.state.countries} category={randomCategory} />
    )
  }
}

export default CountryContainer;

