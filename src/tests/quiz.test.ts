import { expect, test } from "vitest";
import { getCountriesByRegion } from "../data/loadCountries";
import {
  isQuizRegion,
  validateQuizSetup,
  type Country,
} from "../types/quiz";

test("isQuizRegion accepts known regions", () => {
  expect(isQuizRegion("all")).toBe(true);
  expect(isQuizRegion("europe")).toBe(true);
  expect(isQuizRegion("invalid")).toBe(false);
});

test("validateQuizSetup requires at least one category", () => {
  const countries = getCountriesByRegion("all");

  expect(validateQuizSetup(countries, [])).toEqual({
    ok: false,
    message: "Please select at least one category.",
  });
});

test("validateQuizSetup rejects categories without enough unique values", () => {
  const countries: Country[] = [
    {
      name: { common: "A" },
      capital: ["Alpha"],
      population: 1,
      flag: "🇦",
    },
    {
      name: { common: "B" },
      capital: ["Beta"],
      population: 2,
      flag: "🇧",
    },
    {
      name: { common: "C" },
      capital: ["Gamma"],
      population: 3,
      flag: "🇨",
    },
  ];

  expect(validateQuizSetup(countries, ["capital"])).toEqual({
    ok: false,
    message: "Not enough unique capitals in this region to build questions.",
  });
});

test("validateQuizSetup accepts a viable quiz configuration", () => {
  const countries: Country[] = [
    {
      name: { common: "A" },
      capital: ["Alpha"],
      population: 1000,
      flag: "🇦",
    },
    {
      name: { common: "B" },
      capital: ["Beta"],
      population: 2000,
      flag: "🇧",
    },
    {
      name: { common: "C" },
      capital: ["Gamma"],
      population: 3000,
      flag: "🇨",
    },
    {
      name: { common: "D" },
      capital: ["Delta"],
      population: 4000,
      flag: "🇩",
    },
  ];

  expect(validateQuizSetup(countries, ["population", "flag"])).toEqual({
    ok: true,
  });
});

test("validateQuizSetup accepts population for all regions", () => {
  const countries = getCountriesByRegion("all");

  expect(validateQuizSetup(countries, ["population"]).ok).toBe(true);
});
