import React from 'react';

class CountryContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [],
    };
  }

  componentDidMount(){
    const url = 'https://restcountries.eu/rest/v2/all';
    fetch(url)
      .then((res) => res.json())
      .then((countries) => this.setState({ countries }));
  }

  render(){
    console.log(this.state);
    return(
      <div>
        <h1>Country</h1>
      </div>
    )
  }
}

export default CountryContainer;

