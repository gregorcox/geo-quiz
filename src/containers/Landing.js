import React, { useState } from 'react';

import CountryContainer from "./CountryContainer";

const Landing = () => {
  const [region, setRegion] = useState('all');
  const [categories, setCategories] = useState(["capital", "population", "flag"]);
  const [loadQuiz, setLoadQuiz] = useState(false);
  const [numberOfQuestions, setNumber] = useState(5);
  const [error, setError] = useState(false);

  const handleChange = ({ target }) => {
    if (target.name === "region") setRegion(target.value);
    if (target.name === "numberOfQuestions") setNumber(target.value);
  }

  const handleCategoryChange = evt => {
    const { name } = evt.target;

    if (categories.includes(name)) {
      setCategories(categories.filter(category => category !== name));
    } else {
      setCategories([...categories, name]);
    }
  }

  const handleClick = () => {
    if (categories.length) {
      setLoadQuiz(true);
    } else {
      setError(true);
    }
  }

  // Load quiz if the user clicks the continue button and there are no errors
  if (loadQuiz) {
    return <CountryContainer region={region} categories={categories} number={parseInt(numberOfQuestions, 10)} />
  }

  const regionSelector = (
    <div className="category-options">
      <label>Select a region:</label>
      <select name="region" onChange={handleChange}>
        <option value="all">All</option>
        <option value="africa">Africa</option>
        <option value="americas">Americas</option>
        <option value="asia">Asia</option>
        <option value="europe">Europe</option>
        <option value="oceania">Oceania</option>
      </select>
    </div>
  );

  const categorySelector = (
    <div className="category-options">
      <label>Select categories:</label>
      <div>
        <input type="checkbox" name="capital" value="capital"
          checked={categories.includes("capital")}
          onChange={handleCategoryChange} />
        Capital cities

        <input type="checkbox" name="flag" value="flag"
          checked={categories.includes("flag")}
          onChange={handleCategoryChange} />
        Flags

        <input type="checkbox" name="population" value="population"
          checked={categories.includes("population")}
          onChange={handleCategoryChange} />
        Populations
      </div>
    </div>
  )

  const questions = (
    <>
      <label>How many questions would you like?</label>
      <select name="numberOfQuestions" onChange={handleChange}>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="25">25</option>
      </select>
    </>
  );

  return (
    <div className="quiz-options">

      {regionSelector}

      {categorySelector}

      {questions}

      <button onClick={handleClick}>Continue</button>

      {error ? <p>Please select at least 1 category</p> : null}
    </div>
  )
}

export default Landing;
