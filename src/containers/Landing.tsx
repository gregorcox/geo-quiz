import { useState, type ChangeEvent } from "react";
import { FaCheckCircle, FaCity, FaRegFlag } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import CountryContainer from "./CountryContainer";
import type { QuizCategory } from "../types/quiz";

const categoryConfig: Array<{
  label: string;
  name: QuizCategory;
  Icon: typeof FaCity;
}> = [
  { label: "Capitals", name: "capital", Icon: FaCity },
  { label: "Flags", name: "flag", Icon: FaRegFlag },
  { label: "Populations", name: "population", Icon: FaPeopleGroup },
];

const selectClassName =
  "mt-2 w-full max-w-xs rounded-lg border border-slate-300 bg-white px-3 py-2 text-base text-slate-900 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100";

const primaryButtonClassName =
  "rounded-lg bg-sky-600 px-5 py-2.5 font-medium text-white transition hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-sky-500 dark:hover:bg-sky-400";

const Landing = () => {
  const [region, setRegion] = useState("all");
  const [categories, setCategories] = useState<QuizCategory[]>([
    "capital",
    "population",
    "flag",
  ]);
  const [loadQuiz, setLoadQuiz] = useState(false);
  const [numberOfQuestions, setNumber] = useState("5");
  const [error, setError] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;

    if (name === "region") {
      setRegion(value);
    }

    if (name === "numberOfQuestions") {
      setNumber(value);
    }
  };

  const handleCategoryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;
    const category = name as QuizCategory;

    if (categories.includes(category)) {
      setCategories(categories.filter((item) => item !== category));
      return;
    }

    setCategories([...categories, category]);
  };

  const handleClick = () => {
    if (categories.length) {
      setLoadQuiz(true);
      setError(false);
      return;
    }

    setError(true);
  };

  const handleRestart = () => {
    setLoadQuiz(false);
  };

  if (loadQuiz) {
    return (
      <CountryContainer
        region={region}
        categories={categories}
        number={parseInt(numberOfQuestions, 10)}
        onRestart={handleRestart}
      />
    );
  }

  return (
    <section
      aria-labelledby="quiz-setup-heading"
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
    >
      <h2 id="quiz-setup-heading" className="text-xl font-semibold">
        Set up your quiz
      </h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
        Pick a region, choose one or more categories, then start playing.
      </p>

      <form
        className="mt-8 space-y-8"
        onSubmit={(event) => {
          event.preventDefault();
          handleClick();
        }}
      >
        <div>
          <label htmlFor="region" className="block text-sm font-medium">
            Region
          </label>
          <select
            id="region"
            name="region"
            value={region}
            onChange={handleChange}
            className={selectClassName}
          >
            <option value="all">All</option>
            <option value="africa">Africa</option>
            <option value="americas">Americas</option>
            <option value="asia">Asia</option>
            <option value="europe">Europe</option>
            <option value="oceania">Oceania</option>
          </select>
        </div>

        <fieldset>
          <legend className="block text-sm font-medium">Categories</legend>
          <div className="mt-3 flex flex-wrap gap-3">
            {categoryConfig.map(({ label, name, Icon }) => {
              const isSelected = categories.includes(name);

              return (
                <label
                  key={name}
                  className="relative cursor-pointer"
                >
                  <input
                    type="checkbox"
                    name={name}
                    value={name}
                    checked={isSelected}
                    onChange={handleCategoryChange}
                    className="peer sr-only"
                  />
                  <span
                    className={`flex h-28 w-28 flex-col items-center justify-center rounded-xl border-2 transition focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-sky-600 ${
                      isSelected
                        ? "border-sky-500 bg-sky-50 dark:border-sky-400 dark:bg-sky-950/40"
                        : "border-slate-200 bg-slate-50 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-slate-600"
                    }`}
                  >
                    {isSelected ? (
                      <FaCheckCircle
                        className="absolute right-2 top-2 text-sky-500 dark:text-sky-400"
                        size={18}
                        aria-hidden="true"
                      />
                    ) : null}
                    <Icon
                      size={28}
                      className={
                        isSelected
                          ? "text-slate-900 dark:text-slate-100"
                          : "text-slate-400 dark:text-slate-500"
                      }
                      aria-hidden="true"
                    />
                    <span
                      className={`mt-2 text-sm font-medium ${
                        isSelected
                          ? "text-slate-900 dark:text-slate-100"
                          : "text-slate-500 dark:text-slate-400"
                      }`}
                    >
                      {label}
                    </span>
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>

        <div>
          <label htmlFor="numberOfQuestions" className="block text-sm font-medium">
            Number of questions
          </label>
          <select
            id="numberOfQuestions"
            name="numberOfQuestions"
            value={numberOfQuestions}
            onChange={handleChange}
            className={selectClassName}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
          </select>
        </div>

        {error ? (
          <p className="text-sm text-red-600 dark:text-red-400" role="alert">
            Please select at least one category.
          </p>
        ) : null}

        <button type="submit" className={primaryButtonClassName}>
          Continue
        </button>
      </form>
    </section>
  );
};

export default Landing;
