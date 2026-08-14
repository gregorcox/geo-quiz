import { useEffect, useState } from "react";
import Question from "../components/Question";
import type { Country, QuizCategory } from "../types/quiz";

interface CountryContainerProps {
  region: string;
  categories: QuizCategory[];
  number: number;
  onRestart: () => void;
}

const CountryContainer = ({
  region,
  categories,
  number,
  onRestart,
}: CountryContainerProps) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let url =
      "https://restcountries.com/v3.1/independent?status=true&fields=languages,capital,flag,population,name";

    if (region !== "all") {
      url = `https://restcountries.com/v3.1/region/${region}`;
    }

    setLoading(true);
    setError(null);

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load country data. Please try again.");
        }

        return response.json() as Promise<Country[]>;
      })
      .then((countryData) => {
        setCountries(countryData);
        setLoading(false);
      })
      .catch((fetchError: Error) => {
        setError(fetchError.message);
        setLoading(false);
      });
  }, [region]);

  if (loading) {
    return <div className="loader" />;
  }

  if (error) {
    return (
      <div className="quiz-options">
        <p>{error}</p>
        <button type="button" onClick={onRestart}>
          Go back
        </button>
      </div>
    );
  }

  return (
    <>
      <button type="button" className="restart-button" onClick={onRestart}>
        Start over
      </button>

      <Question
        countries={countries}
        categories={categories}
        number={number}
      />
    </>
  );
};

export default CountryContainer;
