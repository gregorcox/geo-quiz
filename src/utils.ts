export const getRandomItem = <T,>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

export const shuffle = <T,>(array: T[]): T[] => {
  const shuffled = [...array];

  for (let index = shuffled.length - 1; index > 0; index--) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [
      shuffled[randomIndex],
      shuffled[index],
    ];
  }

  return shuffled;
};

export const hasDuplicates = <T,>(array: T[]): boolean => {
  return new Set(array).size !== array.length;
};

export const hasEmptyValue = (array: Array<string | number | undefined>): boolean => {
  return array.some((value) => value === "" || value === undefined);
};

export const buildMultipleChoiceAnswers = <T,>(
  correct: T,
  pool: T[],
  choiceCount = 4
): T[] | null => {
  const distinctWrong = [...new Set(pool.filter((value) => value !== correct))];

  if (distinctWrong.length < choiceCount - 1) {
    return null;
  }

  const wrongChoices = shuffle(distinctWrong).slice(0, choiceCount - 1);
  return shuffle([...wrongChoices, correct]);
};
