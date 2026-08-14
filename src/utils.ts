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

export const hasEmptyValue = (array: Array<string | number>): boolean => {
  return array.some((value) => value === "");
};
