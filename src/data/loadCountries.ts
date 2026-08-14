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

function withoutRegion({ region: _unused, ...country }: CountryRecord): Country {
  void _unused;
  return country;
}

export function getCountriesByRegion(region: string): Country[] {
  if (region === "all") {
    return allCountries.map(withoutRegion);
  }

  const regionName = REGION_MAP[region];

  if (!regionName) {
    return [];
  }

  return allCountries
    .filter((country) => country.region === regionName)
    .map(withoutRegion);
}
