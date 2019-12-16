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