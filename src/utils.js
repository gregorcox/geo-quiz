// Generate a random item from array
export const getRandomItem = (array) => {
    return array[Math.floor(
        Math.random() * array.length
    )];
}

// Shuffle an array
export const shuffle = (array) => {
    return array.sort(() => Math.random() - 0.5);
}

// Check if an array has duplicate items
export const hasDuplicates = (array) => {
    return (new Set(array)).size !== array.length;
}

// Check if an array contains an empty value
export const hasEmptyValue = (array) => {
    return array.includes("");
}