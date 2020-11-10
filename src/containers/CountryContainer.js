import React, { useState, useEffect } from 'react';
import Question from "../components/Question";

const CountryContainer = (props) => {
  const [countries, setCounties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set the API url depending on the region the user has selected
    let url = 'https://restcountries.eu/rest/v2/all';
    if (props.region !== "all") {
      url = `https://restcountries.eu/rest/v2/region/${props.region}`
    }

    fetch(url)
      .then((res) => res.json())
      .then((countries) => {
        setCounties(countries);
        setLoading(false);
      });
  }, [props.region]);

  if (loading) {
    return <div className ="loader"/>
  }

  return (
    <>
      <button className="restart-button" onClick={() => { window.location.reload() }}>Start over</button>

      <Question countries={countries} categories={props.categories} number={props.number} />
    </>
  );
}

export default CountryContainer;

