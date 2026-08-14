import { expect, test } from "vitest";
import {
  buildMultipleChoiceAnswers,
  hasDuplicates,
  hasEmptyValue,
  shuffle,
} from "../utils";

test("array with empty value returns true", () => {
  expect(hasEmptyValue(["firstValue", "secondValue", ""])).toBe(true);
});

test("array with undefined returns true", () => {
  expect(hasEmptyValue(["firstValue", undefined])).toBe(true);
});

test("array with no empty values returns false", () => {
  expect(hasEmptyValue(["firstValue", "secondValue", "thirdValue"])).toBe(
    false
  );
});

test("array with duplicates returns true", () => {
  expect(hasDuplicates([1, 2, 3, 3, 5])).toBe(true);
});

test("array with no duplicates returns false", () => {
  expect(hasDuplicates([1, 2, 3, 4, 5])).toBe(false);
});

test("shuffled array keeps the same length", () => {
  const shuffledArray = shuffle([1, 2, 3]);
  expect(shuffledArray).toHaveLength(3);
});

test("shuffled array keeps the same items", () => {
  const shuffledArray = shuffle(["Alice", "Bob", "Eve"]);
  expect(shuffledArray).toEqual(
    expect.arrayContaining(["Eve", "Alice", "Bob"])
  );
});

test("buildMultipleChoiceAnswers returns four unique choices", () => {
  const answers = buildMultipleChoiceAnswers(10, [1, 2, 3, 4, 5, 10]);

  expect(answers).toHaveLength(4);
  expect(new Set(answers).size).toBe(4);
  expect(answers).toContain(10);
});

test("buildMultipleChoiceAnswers returns null when choices are impossible", () => {
  expect(buildMultipleChoiceAnswers(0, [0, 0, 0])).toBeNull();
});
