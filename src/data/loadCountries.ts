import countriesData from "./countries.json";
import type { Country } from "../types/quiz";

interface CountryRecord extends Country {
  region: string;
}

const REGION_MAP: Record<string, string> = {
  africa: "Africa",
  americas: "Americas",
  asia: "Asia",
  europe: "Europe",
  oceania: "Oceania",
};

const allCountries = countriesData as CountryRecord[];

export function getCountriesByRegion(region: string): Country[] {
  if (region === "all") {
    return allCountries.map(({ region: _region, ...country }) => country);
  }

  const regionName = REGION_MAP[region];

  if (!regionName) {
    return [];
  }

  return allCountries
    .filter((country) => country.region === regionName)
    .map(({ region: _region, ...country }) => country);
}
