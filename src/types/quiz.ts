export type QuizCategory = "capital" | "population" | "flag";

export const QUIZ_REGIONS = [
  "all",
  "africa",
  "americas",
  "asia",
  "europe",
  "oceania",
] as const;

export type QuizRegion = (typeof QUIZ_REGIONS)[number];

export const REGION_OPTIONS: Array<{ value: QuizRegion; label: string }> = [
  { value: "all", label: "All" },
  { value: "africa", label: "Africa" },
  { value: "americas", label: "Americas" },
  { value: "asia", label: "Asia" },
  { value: "europe", label: "Europe" },
  { value: "oceania", label: "Oceania" },
];

export interface Country {
  name: {
    common: string;
  };
  capital?: string[];
  population: number;
  flag: string;
}

export type CategoryValue = string | number;

export function isQuizRegion(value: string): value is QuizRegion {
  return QUIZ_REGIONS.includes(value as QuizRegion);
}

export function getCategoryValue(
  country: Country,
  category: QuizCategory
): CategoryValue | undefined {
  if (category === "capital") {
    return country.capital?.[0];
  }

  return country[category];
}

export function isValidCategoryValue(
  category: QuizCategory,
  value: CategoryValue | undefined
): value is CategoryValue {
  if (value === undefined || value === "") {
    return false;
  }

  if (category === "population") {
    return typeof value === "number" && value > 0;
  }

  return true;
}

export function formatCategoryValue(value: CategoryValue): string {
  return value.toLocaleString();
}

export function countrySupportsCategory(
  country: Country,
  category: QuizCategory
): boolean {
  return isValidCategoryValue(category, getCategoryValue(country, category));
}

const CATEGORY_LABELS: Record<QuizCategory, string> = {
  capital: "capitals",
  flag: "flags",
  population: "populations",
};

export type QuizSetupValidationResult =
  | { ok: true }
  | { ok: false; message: string };

export function validateQuizSetup(
  countries: Country[],
  categories: QuizCategory[]
): QuizSetupValidationResult {
  if (categories.length === 0) {
    return { ok: false, message: "Please select at least one category." };
  }

  if (countries.length === 0) {
    return { ok: false, message: "No countries found for this region." };
  }

  const eligibleCountries = countries.filter((country) =>
    categories.some((category) => countrySupportsCategory(country, category))
  );

  if (eligibleCountries.length === 0) {
    return {
      ok: false,
      message: "No countries in this region have data for the selected categories.",
    };
  }

  for (const category of categories) {
    const uniqueValues = new Set(
      countries
        .map((country) => getCategoryValue(country, category))
        .filter((value): value is CategoryValue =>
          isValidCategoryValue(category, value)
        )
    );

    if (uniqueValues.size < 4) {
      return {
        ok: false,
        message: `Not enough unique ${CATEGORY_LABELS[category]} in this region to build questions.`,
      };
    }
  }

  return { ok: true };
}
