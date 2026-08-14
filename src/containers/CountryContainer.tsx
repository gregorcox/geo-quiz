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

const primaryButtonClassName =
  "rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 dark:bg-sky-500 dark:hover:bg-sky-400";

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
        <button type="button" className={`${primaryButtonClassName} mt-4`} onClick={onRestart}>
          Go back
        </button>
      </section>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button type="button" className={primaryButtonClassName} onClick={onRestart}>
          Start over
        </button>
      </div>

      <Question countries={countries} categories={categories} number={number} />
    </div>
  );
};

export default CountryContainer;
