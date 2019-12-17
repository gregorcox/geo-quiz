// Generate a random item from array
export const getRandomItem = (array) => {
    return array[Math.floor(
        Math.random() * array.length
    )];
}

// Shuffle an array
export const shuffle = (array) => {
    array.sort(() => Math.random() - 0.5);
}

// Check if an array has duplicate items
export const hasDuplicates = (array) => {
    return (new Set(array)).size !== array.length;
}

export const hasEmptyValue = (array) => {
    return array.includes("");
}