import { hasEmptyValue, hasDuplicates, shuffle } from "../utils";

// hasEmptyValue() Tests
test('array with empty value returns true', () => {
  expect(hasEmptyValue(["firstValue", "secondValue", ""])).toBe(true);
});

test('array with no empty values returns false', () => {
    expect(hasEmptyValue(["firstValue", "secondValue", "thirdValue"])).toBe(false);
});

// hasDuplicates() Tests
test('array with duplicates returns true', () => {
  expect(hasDuplicates([1, 2, 3, 3, 5])).toBe(true);
});

test('array with no duplicates returns false', () => {
  expect(hasDuplicates([1, 2, 3, 4, 5])).toBe(false);
});

// shuffle() Tests
test('shuffled array keeps the same length', () => {
  const shuffledArray = shuffle([1, 2, 3]);
  expect(shuffledArray).toHaveLength(3)
});

test('shuffled array keeps the same items', () => {
  const shuffledArray = shuffle(['Alice', 'Bob', 'Eve']);
  expect(shuffledArray).toEqual(expect.arrayContaining(['Eve', 'Alice', 'Bob']));
});
