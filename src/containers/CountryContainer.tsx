import { useMemo } from "react";
import Question from "../components/Question";
import { getCountriesByRegion } from "../data/loadCountries";
import type { QuizCategory } from "../types/quiz";

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
  const countries = useMemo(() => getCountriesByRegion(region), [region]);

  if (countries.length === 0) {
    return (
      <div className="quiz-options">
        <p>No countries found for this region. Please try another selection.</p>
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
