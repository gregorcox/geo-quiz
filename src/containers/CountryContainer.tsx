import React, { useEffect, useState } from "react";
import Question from "../components/Question";

interface IProps {
  region: string;
  categories: string[];
  number: number;
}

const CountryContainer = ({ region, categories, number }: IProps) => {
  const [countries, setCounties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set the API url depending on the region the user has selected
    let url: string =
      "https://restcountries.com/v3.1/independent?status=true&fields=languages,capital,flag,population,name";
    if (region !== "all") {
      url = `https://restcountries.com/v3.1/region/${region}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((countries) => {
        setCounties(countries);
        setLoading(false);
      });
  }, [region]);

  if (loading) {
    return <div className="loader" />;
  }

  return (
    <>
      <button
        className="restart-button"
        onClick={() => {
          window.location.reload();
        }}
      >
        Start over
      </button>

      <Question countries={countries} categories={categories} number={number} />
    </>
  );
};

export default CountryContainer;
