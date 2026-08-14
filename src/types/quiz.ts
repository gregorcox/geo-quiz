export type QuizCategory = "capital" | "population" | "flag";

export interface Country {
  name: {
    common: string;
  };
  capital?: string[];
  population: number;
  flag: string;
}

export type CategoryValue = string | number;

export function getCategoryValue(
  country: Country,
  category: QuizCategory
): CategoryValue | undefined {
  if (category === "capital") {
    return country.capital?.[0];
  }

  return country[category];
}

export function formatCategoryValue(value: CategoryValue): string {
  return value.toLocaleString();
}
