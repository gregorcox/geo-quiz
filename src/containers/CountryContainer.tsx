import { useMemo } from "react";
import Question from "../components/Question";
import { getCountriesByRegion } from "../data/loadCountries";
import { primaryButtonSmClassName } from "../styles";
import type { QuizCategory, QuizRegion } from "../types/quiz";

interface CountryContainerProps {
  region: QuizRegion;
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
      <section className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <p className="text-slate-700 dark:text-slate-300">
          No countries found for this region. Please try another selection.
        </p>
        <button
          type="button"
          className={`${primaryButtonSmClassName} mt-4`}
          onClick={onRestart}
        >
          Go back
        </button>
      </section>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button type="button" className={primaryButtonSmClassName} onClick={onRestart}>
          Start over
        </button>
      </div>

      <Question countries={countries} categories={categories} number={number} />
    </div>
  );
};

export default CountryContainer;
